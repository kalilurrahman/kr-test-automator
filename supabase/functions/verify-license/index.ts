import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Merchant adapters: given a product + key, return a normalized verdict.
// Gumroad is the launch merchant; add Lemon Squeezy / Polar here later without
// touching the rest of the flow.
interface MerchantVerdict {
  valid: boolean;
  reason?: string;
  orderId?: string;
  purchaserEmail?: string;
  uses?: number;
  expiresAt?: string | null;
}

async function verifyWithGumroad(
  merchantProductId: string,
  licenseKey: string,
  incrementUses: boolean,
): Promise<MerchantVerdict> {
  const resp = await fetch("https://api.gumroad.com/v2/licenses/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      product_id: merchantProductId,
      license_key: licenseKey,
      increment_uses_count: incrementUses ? "true" : "false",
    }),
  });

  if (resp.status === 404) return { valid: false, reason: "invalid_key" };
  if (!resp.ok) throw new Error(`gumroad_unavailable:${resp.status}`);

  const data = await resp.json();
  if (!data.success) return { valid: false, reason: "invalid_key" };

  const p = data.purchase ?? {};
  if (p.refunded) return { valid: false, reason: "refunded" };
  if (p.chargebacked) return { valid: false, reason: "chargeback" };
  if (p.subscription_ended_at || p.subscription_failed_at) {
    return { valid: false, reason: "subscription_ended" };
  }

  return {
    valid: true,
    orderId: p.sale_id,
    purchaserEmail: p.email,
    uses: data.uses,
    // A cancelled-but-paid-up subscription stays valid until the period ends.
    expiresAt: p.subscription_cancelled_at ?? null,
  };
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Entitlements bind to a signed-in account, so activation requires auth.
    const authHeader = req.headers.get("Authorization") ?? "";
    const { data: userData, error: userError } = await admin.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (userError || !userData?.user) return json({ ok: false, error: "auth_required" }, 401);
    const user = userData.user;

    const { license_key, sku, device_fingerprint, mode } = await req.json();
    if (!license_key || !sku) return json({ ok: false, error: "missing_params" }, 400);
    const isActivation = mode !== "validate";

    const { data: product } = await admin
      .from("license_products")
      .select("*")
      .eq("sku", sku)
      .eq("active", true)
      .maybeSingle();
    if (!product) return json({ ok: false, error: "unknown_sku" }, 400);

    const keyHash = await sha256Hex(license_key.trim());

    const logEvent = (event: string, licenseId: string | null, detail: Record<string, unknown> = {}) =>
      admin.from("license_events").insert({
        license_id: licenseId,
        user_id: user.id,
        event,
        detail: { sku, key_hint: license_key.slice(-4), ...detail },
      });

    // 1. Ask the merchant of record whether this key is (still) good.
    let verdict: MerchantVerdict;
    try {
      verdict = await verifyWithGumroad(product.merchant_product_id, license_key.trim(), isActivation);
    } catch (e) {
      // Merchant API down: fall back to our own records so paying customers
      // aren't locked out by a Gumroad outage (grace behavior).
      const { data: cached } = await admin
        .from("licenses").select("id,status").eq("license_key_hash", keyHash).maybeSingle();
      if (cached?.status === "active") {
        await logEvent("verify_merchant_down_grace", cached.id, { error: String(e) });
        return json({ ok: true, grace: true });
      }
      await logEvent("verify_merchant_down_fail", null, { error: String(e) });
      return json({ ok: false, error: "merchant_unavailable" }, 503);
    }

    // 2. Invalid / refunded / ended keys: record it and revoke anything we granted.
    if (!verdict.valid) {
      const { data: existing } = await admin
        .from("licenses").select("id").eq("license_key_hash", keyHash).maybeSingle();
      if (existing && (verdict.reason === "refunded" || verdict.reason === "chargeback")) {
        await admin.from("licenses").update({
          status: verdict.reason === "refunded" ? "refunded" : "chargeback",
          updated_at: new Date().toISOString(),
        }).eq("id", existing.id);
        await admin.from("entitlements").update({ revoked_at: new Date().toISOString() })
          .eq("license_id", existing.id).is("revoked_at", null);
      }
      await logEvent("verify_rejected", existing?.id ?? null, { reason: verdict.reason });
      return json({ ok: false, error: verdict.reason }, 403);
    }

    // 3. Upsert the license record and bind it to this account on first activation.
    const { data: existingLicense } = await admin
      .from("licenses").select("*").eq("license_key_hash", keyHash).maybeSingle();

    let licenseId: string;
    if (existingLicense) {
      licenseId = existingLicense.id;
      const boundToOther = existingLicense.user_id && existingLicense.user_id !== user.id;
      if (boundToOther && existingLicense.seats <= 1) {
        await logEvent("key_sharing_blocked", licenseId, {});
        return json({ ok: false, error: "key_bound_to_another_account" }, 403);
      }
      if (["refunded", "chargeback", "revoked"].includes(existingLicense.status)) {
        await logEvent("verify_rejected", licenseId, { reason: existingLicense.status });
        return json({ ok: false, error: existingLicense.status }, 403);
      }
      await admin.from("licenses").update({
        status: "active",
        user_id: existingLicense.user_id ?? user.id,
        activated_at: existingLicense.activated_at ?? new Date().toISOString(),
        expires_at: verdict.expiresAt ?? existingLicense.expires_at,
        merchant_order_id: verdict.orderId ?? existingLicense.merchant_order_id,
        purchaser_email: verdict.purchaserEmail ?? existingLicense.purchaser_email,
        updated_at: new Date().toISOString(),
      }).eq("id", licenseId);
    } else {
      const { data: inserted, error: insertError } = await admin.from("licenses").insert({
        license_key_hash: keyHash,
        key_hint: license_key.slice(-4),
        product_id: product.id,
        merchant: product.merchant,
        merchant_order_id: verdict.orderId,
        purchaser_email: verdict.purchaserEmail,
        status: "active",
        seats: product.seats,
        user_id: user.id,
        activated_at: new Date().toISOString(),
        expires_at: verdict.expiresAt,
      }).select("id").single();
      if (insertError) throw insertError;
      licenseId = inserted.id;
    }

    // 4. Enforce the activation cap (devices per seat).
    if (isActivation) {
      const fingerprint = (device_fingerprint || "unknown").slice(0, 128);
      await admin.from("license_activations").upsert(
        {
          license_id: licenseId,
          user_id: user.id,
          device_fingerprint: fingerprint,
          user_agent: req.headers.get("user-agent")?.slice(0, 256),
        },
        { onConflict: "license_id,user_id,device_fingerprint", ignoreDuplicates: true },
      );
      const { count } = await admin
        .from("license_activations")
        .select("*", { count: "exact", head: true })
        .eq("license_id", licenseId);
      const cap = product.max_activations * product.seats;
      if ((count ?? 0) > cap) {
        await logEvent("cap_exceeded", licenseId, { count, cap });
        return json({ ok: false, error: "activation_limit_reached" }, 403);
      }
    }

    // 5. Grant entitlements (idempotent).
    const rows = (product.entitlements as string[]).map((entitlement) => ({
      user_id: user.id,
      entitlement,
      license_id: licenseId,
      expires_at: verdict.expiresAt,
    }));
    await admin.from("entitlements").upsert(rows, {
      onConflict: "user_id,entitlement,license_id",
      ignoreDuplicates: true,
    });
    // Reinstate anything previously revoked for this license (e.g. refund reversed).
    await admin.from("entitlements").update({ revoked_at: null })
      .eq("license_id", licenseId).eq("user_id", user.id).not("revoked_at", "is", null);

    await logEvent(isActivation ? "activated" : "revalidated", licenseId, { uses: verdict.uses });

    return json({
      ok: true,
      entitlements: product.entitlements,
      license: { key_hint: license_key.slice(-4), expires_at: verdict.expiresAt ?? null },
    });
  } catch (error) {
    console.error("verify-license error:", error);
    return json({ ok: false, error: "internal_error" }, 500);
  }
});
