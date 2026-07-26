import { supabase } from "@/integrations/supabase/client";

// Entitlement keys are the single vocabulary shared by license_products rows,
// edge functions, and UI gates. Platform packs use `pack:<platformId>` so
// PlatformPage can derive its gate key from the route param.
export const ENTITLEMENTS = {
  ALL_ACCESS: "all-access",
  GENERATOR_PRO: "generator:pro",
  E2E_VAULT: "vault:e2e",
  pack: (platformId: string) => `pack:${platformId}`,
} as const;

export interface Entitlement {
  entitlement: string;
  granted_at: string;
  expires_at: string | null;
}

export interface VerifyLicenseResult {
  ok: boolean;
  error?: string;
  grace?: boolean;
  entitlements?: string[];
  license?: { key_hint: string; expires_at: string | null };
}

// The new tables aren't in the auto-generated Database types until
// `supabase gen types` runs post-migration, hence this localized structural cast
// covering exactly the two call shapes used below.
const db = supabase as unknown as {
  from: (table: string) => {
    select: (columns: string) => {
      is: (column: string, value: null) => {
        or: (filter: string) => Promise<{ data: unknown; error: unknown }>;
      };
    };
  };
  functions: {
    invoke: (fn: string, opts: { body: unknown }) => Promise<{ data: unknown; error: unknown }>;
  };
};

export async function fetchEntitlements(): Promise<Entitlement[]> {
  const nowIso = new Date().toISOString();
  const { data, error } = await db
    .from("entitlements")
    .select("entitlement, granted_at, expires_at")
    .is("revoked_at", null)
    .or(`expires_at.is.null,expires_at.gt.${nowIso}`);
  if (error) throw error;
  return (data ?? []) as Entitlement[];
}

export async function activateLicense(params: {
  licenseKey: string;
  sku: string;
  mode?: "activate" | "validate";
}): Promise<VerifyLicenseResult> {
  const { data, error } = await db.functions.invoke("verify-license", {
    body: {
      license_key: params.licenseKey,
      sku: params.sku,
      mode: params.mode ?? "activate",
      device_fingerprint: deviceFingerprint(),
    },
  });
  if (error) {
    // supabase-js surfaces non-2xx as an error; the function body still carries
    // the machine-readable reason when available.
    const context = (error as { context?: { body?: VerifyLicenseResult } }).context;
    return context?.body ?? { ok: false, error: "network_error" };
  }
  return data as VerifyLicenseResult;
}

// Requests a short-lived signed URL for a premium file (private Storage bucket
// "premium"). Path convention: "vault/<file>" or "packs/<platformId>/<file>".
// Throws with a machine-readable error code on denial.
export async function getSignedDownloadUrl(path: string): Promise<string> {
  const { data, error } = await db.functions.invoke("sign-download", { body: { path } });
  if (error) {
    const context = (error as { context?: { body?: { error?: string } } }).context;
    throw new Error(context?.body?.error ?? "network_error");
  }
  const result = data as { ok: boolean; url?: string; error?: string };
  if (!result.ok || !result.url) throw new Error(result.error ?? "download_failed");
  return result.url;
}

// Coarse, privacy-light fingerprint: enough to enforce activation caps,
// not enough to track anyone.
function deviceFingerprint(): string {
  const raw = [
    navigator.platform ?? "",
    navigator.language ?? "",
    screen.width,
    screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
  ].join("|");
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash * 31 + raw.charCodeAt(i)) | 0;
  }
  return `web-${Math.abs(hash).toString(36)}`;
}

export const ACTIVATION_ERRORS: Record<string, string> = {
  invalid_key: "That license key wasn't recognized. Check for typos and make sure you picked the product you bought.",
  refunded: "This license was refunded, so it can no longer be activated.",
  chargeback: "This license was disputed with the card issuer and is disabled.",
  subscription_ended: "The subscription behind this license has ended. Renew to restore access.",
  key_bound_to_another_account: "This key is already in use by a different account. Contact support if you own it.",
  activation_limit_reached: "This key has reached its device limit. Deactivate an old device or contact support.",
  seat_limit_reached: "All seats on this license are taken. Ask your license admin to free a seat or upgrade.",
  merchant_unavailable: "The license service is temporarily unreachable. Please try again in a few minutes.",
  auth_required: "Sign in first so we can attach the license to your account.",
  unknown_sku: "Pick the product this key belongs to.",
  network_error: "Couldn't reach the license service. Check your connection and retry.",
};
