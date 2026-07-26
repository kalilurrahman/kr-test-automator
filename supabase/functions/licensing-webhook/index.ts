import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Gumroad Ping / resource-subscription receiver.
//
// Gumroad POSTs application/x-www-form-urlencoded payloads and does not sign
// them, so authentication is a shared secret in the URL:
//   https://<project>.supabase.co/functions/v1/licensing-webhook?secret=<LICENSING_WEBHOOK_SECRET>
// Configure that URL in Gumroad under Settings → Advanced → Ping, and register
// resource subscriptions ("refund", "dispute", "dispute_won", "cancellation")
// via PUT /v2/resource_subscriptions pointing at the same URL.
//
// Sales provision a license row ahead of activation; refunds/disputes revoke
// entitlements immediately so a refunded key stops working within seconds.

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  if (req.method !== "POST") return new Response("method_not_allowed", { status: 405 });

  const url = new URL(req.url);
  const secret = Deno.env.get("LICENSING_WEBHOOK_SECRET");
  if (!secret || url.searchParams.get("secret") !== secret) {
    return new Response("forbidden", { status: 403 });
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const contentType = req.headers.get("content-type") ?? "";
    let payload: Record<string, string>;
    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      payload = Object.fromEntries((await req.formData()).entries()) as Record<string, string>;
    }

    const resource = url.searchParams.get("resource") ?? payload.resource_name ?? "sale";
    const saleId = payload.sale_id ?? payload.id ?? null;
    const licenseKey = payload.license_key ?? null;
    const keyHash = licenseKey ? await sha256Hex(licenseKey.trim()) : null;

    const findLicense = async () => {
      if (keyHash) {
        const { data } = await admin.from("licenses").select("id,status")
          .eq("license_key_hash", keyHash).maybeSingle();
        if (data) return data;
      }
      if (saleId) {
        const { data } = await admin.from("licenses").select("id,status")
          .eq("merchant_order_id", saleId).maybeSingle();
        if (data) return data;
      }
      return null;
    };

    const revoke = async (status: "refunded" | "chargeback" | "revoked", event: string) => {
      const license = await findLicense();
      if (!license) {
        await admin.from("license_events").insert({
          event: `${event}_unmatched`,
          detail: { sale_id: saleId, resource },
        });
        return;
      }
      await admin.from("licenses").update({ status, updated_at: new Date().toISOString() })
        .eq("id", license.id);
      await admin.from("entitlements").update({ revoked_at: new Date().toISOString() })
        .eq("license_id", license.id).is("revoked_at", null);
      await admin.from("license_events").insert({
        license_id: license.id,
        event,
        detail: { sale_id: saleId, resource },
      });
    };

    switch (resource) {
      case "sale": {
        // Provision ahead of activation so support can look the key up by sale.
        if (keyHash && payload.product_id) {
          const { data: product } = await admin.from("license_products").select("id,seats")
            .eq("merchant_product_id", payload.product_id).maybeSingle();
          if (product) {
            await admin.from("licenses").upsert({
              license_key_hash: keyHash,
              key_hint: licenseKey!.slice(-4),
              product_id: product.id,
              merchant_order_id: saleId,
              purchaser_email: payload.email ?? null,
              status: "provisioned",
              seats: product.seats,
            }, { onConflict: "license_key_hash", ignoreDuplicates: true });
          }
        }
        await admin.from("license_events").insert({
          event: "sale_webhook",
          detail: { sale_id: saleId, product_id: payload.product_id, email: payload.email },
        });
        break;
      }
      case "refund":
        await revoke("refunded", "refund_webhook");
        break;
      case "dispute":
        await revoke("chargeback", "dispute_webhook");
        break;
      case "dispute_won": {
        // Chargeback resolved in our favor: reinstate.
        const license = await findLicense();
        if (license) {
          await admin.from("licenses").update({ status: "active", updated_at: new Date().toISOString() })
            .eq("id", license.id);
          await admin.from("entitlements").update({ revoked_at: null })
            .eq("license_id", license.id);
          await admin.from("license_events").insert({
            license_id: license.id, event: "dispute_won_webhook", detail: { sale_id: saleId },
          });
        }
        break;
      }
      case "cancellation": {
        // Subscription cancelled: access runs until the paid period ends.
        const license = await findLicense();
        if (license) {
          const endsAt = payload.subscription_ended_at ?? payload.cancelled_at ?? new Date().toISOString();
          await admin.from("licenses").update({ expires_at: endsAt, updated_at: new Date().toISOString() })
            .eq("id", license.id);
          await admin.from("entitlements").update({ expires_at: endsAt })
            .eq("license_id", license.id).is("revoked_at", null);
          await admin.from("license_events").insert({
            license_id: license.id, event: "cancellation_webhook", detail: { ends_at: endsAt },
          });
        }
        break;
      }
      default:
        await admin.from("license_events").insert({
          event: "unknown_webhook",
          detail: { resource, sale_id: saleId },
        });
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("licensing-webhook error:", error);
    // 200 so Gumroad doesn't retry-storm; the event log captures failures.
    return new Response("error_logged", { status: 200 });
  }
});
