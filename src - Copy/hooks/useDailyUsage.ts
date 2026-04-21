import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DAILY_LIMIT = 20;

export function useDailyUsage() {
  const { user } = useAuth();
  const [used, setUsed] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!user) { setLoading(false); return; }
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    setUsed(count || 0);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, [user]);

  return {
    used,
    limit: DAILY_LIMIT,
    remaining: Math.max(0, DAILY_LIMIT - used),
    loading,
    isAtLimit: used >= DAILY_LIMIT,
    refresh,
  };
}
