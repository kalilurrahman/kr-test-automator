import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEntitlements } from "@/hooks/useEntitlements";
import { ENTITLEMENTS } from "@/lib/licensing";

// Display mirror of the limits enforced server-side in generate-test-script
// (GEN_LIMIT_* env vars there are the source of truth).
const ANON_LIMIT = 5;
const FREE_LIMIT = 20;
const PRO_LIMIT = 100;

export function useDailyUsage() {
  const { user } = useAuth();
  const { hasEntitlement } = useEntitlements();
  const [used, setUsed] = useState(0);
  const [loading, setLoading] = useState(true);

  // Anonymous usage is metered per IP server-side; we can't count it here, but
  // the ceiling shown must match what the server will enforce.
  const limit = !user
    ? ANON_LIMIT
    : hasEntitlement(ENTITLEMENTS.GENERATOR_PRO) ? PRO_LIMIT : FREE_LIMIT;

  const refresh = useCallback(async () => {
    if (!user) { setUsed(0); setLoading(false); return; }
    // UTC day to match the server-side quota window.
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    // generation_usage is the server-enforced ledger (RLS: own rows). Fall back
    // to the legacy generations count until the metering migration is applied.
    const { count, error } = await supabase
      .from("generation_usage" as never)
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    if (error) {
      // Explicit user filter: generations has an anonymous-readable share path,
      // so an unfiltered count could include other users' shared rows.
      const { count: legacyCount } = await supabase
        .from("generations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", todayStart.toISOString());
      setUsed(legacyCount || 0);
    } else {
      setUsed(count || 0);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  return {
    used,
    limit,
    remaining: Math.max(0, limit - used),
    loading,
    isAtLimit: used >= limit,
    refresh,
  };
}
