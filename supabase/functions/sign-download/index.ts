import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Entitlement-checked delivery for premium files.
//
// Premium payloads live in the PRIVATE Supabase Storage bucket "premium"
// (they must be deleted from public/ and the viteStaticCopy targets — a file
// that ships in the static bundle is world-readable no matter what this
// function does). Layout convention, mapped to entitlement keys:
//   premium/vault/<file>            -> requires 'vault:e2e'
//   premium/packs/<platformId>/<f>  -> requires 'pack:<platformId>'
// 'all-access' satisfies everything (mirrors useEntitlements superset logic).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BUCKET = "premium";
const URL_TTL_SECONDS = 300;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function requiredEntitlement(path: string): string | null {
  if (path.startsWith("vault/")) return "vault:e2e";
  const packMatch = path.match(/^packs\/([a-z0-9_-]+)\//);
  if (packMatch) return `pack:${packMatch[1]}`;
  return null; // unknown prefix: never served
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const authHeader = req.headers.get("Authorization") ?? "";
    const { data: userData, error: userError } = await admin.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (userError || !userData?.user) return json({ ok: false, error: "auth_required" }, 401);
    const user = userData.user;

    const { path } = await req.json();
    if (typeof path !== "string" || path.includes("..") || path.startsWith("/")) {
      return json({ ok: false, error: "invalid_path" }, 400);
    }

    const needed = requiredEntitlement(path);
    if (!needed) return json({ ok: false, error: "unknown_asset" }, 404);

    const nowIso = new Date().toISOString();
    const { data: ents, error: entError } = await admin
      .from("entitlements")
      .select("entitlement")
      .eq("user_id", user.id)
      .in("entitlement", [needed, "all-access"])
      .is("revoked_at", null)
      .or(`expires_at.is.null,expires_at.gt.${nowIso}`);
    if (entError) throw entError;
    if (!ents || ents.length === 0) {
      return json({ ok: false, error: "entitlement_required", required: needed }, 403);
    }

    const { data: signed, error: signError } = await admin.storage
      .from(BUCKET)
      .createSignedUrl(path, URL_TTL_SECONDS);
    if (signError || !signed?.signedUrl) {
      console.error("sign-download storage error:", signError);
      return json({ ok: false, error: "file_unavailable" }, 404);
    }

    // Download trail: supports abuse heuristics and chargeback disputes.
    await admin.from("license_events").insert({
      user_id: user.id,
      event: "download",
      detail: { path, entitlement: needed },
    });

    return json({ ok: true, url: signed.signedUrl, expires_in: URL_TTL_SECONDS });
  } catch (error) {
    console.error("sign-download error:", error);
    return json({ ok: false, error: "internal_error" }, 500);
  }
});
