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
      // Grace only for re-validation by the user the license is already bound
      // to (their entitlement rows exist) — a first-time activation would show
      // success while granting nothing.
      const { data: cached } = await admin
        .from("licenses").select("id,status,user_id").eq("license_key_hash", keyHash).maybeSingle();
      if (cached?.status === "active" && cached.user_id === user.id) {
        await logEvent("verify_merchant_down_grace", cached.id, { error: String(e) });
        return json({ ok: true, grace: true, entitlements: product.entitlements });
      }
      await logEvent("verify_merchant_down_fail", null, { error: String(e) });
      return json({ ok: false, error: "merchant_unavailable" }, 503);
    }

    // 2. Invalid / refunded / ended keys: record it and revoke anything we
    // granted — including downgrading the cached status so the outage grace
    // path can't resurrect a key that normal verification rejects.
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
      } else if (existing && verdict.reason === "subscription_ended") {
        await admin.from("licenses").update({
          status: "expired",
          updated_at: new Date().toISOString(),
        }).eq("id", existing.id);
        await admin.from("entitlements").update({ expires_at: new Date().toISOString() })
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
      // Only a manual revocation is terminal. A refunded/chargeback status is
      // overridden by the FRESH merchant verdict we just received — Gumroad
      // says the purchase is good again (refund reversed, dispute resolved),
      // and the merchant is the source of truth for payment state.
      if (existingLicense.status === "revoked") {
        await logEvent("verify_rejected", licenseId, { reason: existingLicense.status });
        return json({ ok: false, error: existingLicense.status }, 403);
      }
      if (["refunded", "chargeback"].includes(existingLicense.status)) {
        await logEvent("reinstated_by_merchant_verdict", licenseId, { was: existingLicense.status });
      }
      await admin.from("licenses").update({
        status: "active",
        activated_at: existingLicense.activated_at ?? new Date().toISOString(),
        // The merchant verdict REPLACES the stored expiry: a cancelled-then-
        // restarted subscription reports no cancellation date anymore, and the
        // stale one must not survive (?? would keep it forever).
        expires_at: verdict.expiresAt ?? null,
        merchant_order_id: verdict.orderId ?? existingLicense.merchant_order_id,
        purchaser_email: verdict.purchaserEmail ?? existingLicense.purchaser_email,
        updated_at: new Date().toISOString(),
      }).eq("id", licenseId);
      // First-writer-wins binding: the conditional update is atomic, so two
      // concurrent first activations can't both claim the key.
      if (!existingLicense.user_id) {
        await admin.from("licenses").update({ user_id: user.id })
          .eq("id", licenseId).is("user_id", null);
      }
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

    // 4. Enforce seat and device caps — in every mode, so "validate" can't be
    // used to acquire entitlements while dodging enforcement.
    const fingerprint = (device_fingerprint || "unknown").slice(0, 128);
    const { data: acts } = await admin
      .from("license_activations")
      .select("user_id, device_fingerprint")
      .eq("license_id", licenseId);
    const existingActs = acts ?? [];

    // Seats cap DISTINCT ACCOUNTS: a 5-seat key admits 5 users, not
    // "any users until 15 device rows exist".
    const seatHolders = new Set(existingActs.map((a) => a.user_id));
    if (!seatHolders.has(user.id) && seatHolders.size >= product.seats) {
      await logEvent("seat_limit_reached", licenseId, { seats: product.seats });
      return json({ ok: false, error: "seat_limit_reached" }, 403);
    }

    // Device cap applies PER USER (max_activations devices each).
    const myDevices = existingActs.filter((a) => a.user_id === user.id);
    const isNewDevice = !myDevices.some((a) => a.device_fingerprint === fingerprint);
    if (isNewDevice && myDevices.length >= product.max_activations) {
      await logEvent("cap_exceeded", licenseId, {
        devices: myDevices.length,
        cap: product.max_activations,
      });
      return json({ ok: false, error: "activation_limit_reached" }, 403);
    }

    await admin.from("license_activations").upsert(
      {
        license_id: licenseId,
        user_id: user.id,
        device_fingerprint: fingerprint,
        user_agent: req.headers.get("user-agent")?.slice(0, 256),
      },
      { onConflict: "license_id,user_id,device_fingerprint", ignoreDuplicates: true },
    );

    // Post-insert recount closes the concurrent-activation race: order users by
    // first activation (earliest wins deterministically on both sides of the
    // race); anyone ranked past the seat count deletes their own rows and is
    // rejected before entitlements are granted.
    const { data: postActs } = await admin
      .from("license_activations")
      .select("user_id, created_at, id")
      .eq("license_id", licenseId)
      .order("created_at", { ascending: true })
      .order("id", { ascending: true });
    const orderedUsers: string[] = [];
    for (const a of postActs ?? []) {
      if (!orderedUsers.includes(a.user_id)) orderedUsers.push(a.user_id);
    }
    if (orderedUsers.indexOf(user.id) >= product.seats) {
      await admin.from("license_activations").delete()
        .eq("license_id", licenseId).eq("user_id", user.id);
      await logEvent("seat_limit_reached", licenseId, { seats: product.seats, race: true });
      return json({ ok: false, error: "seat_limit_reached" }, 403);
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
    // Sync existing rows to the merchant's current verdict: reinstate anything
    // previously revoked (refund reversed) and refresh the expiry so a
    // cancelled-then-restarted subscription doesn't keep its stale cutoff.
    await admin.from("entitlements")
      .update({ revoked_at: null, expires_at: verdict.expiresAt ?? null })
      .eq("license_id", licenseId).eq("user_id", user.id);

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
