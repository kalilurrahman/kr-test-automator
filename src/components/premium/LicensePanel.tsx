import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, KeyRound, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEntitlements } from "@/hooks/useEntitlements";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OwnedLicense {
  key_hint: string;
  status: string;
  seats: number;
  activated_at: string | null;
  expires_at: string | null;
}

const STATUS_STYLES: Record<string, string> = {
  active: "border-primary/40 text-primary",
  provisioned: "border-muted-foreground/40 text-muted-foreground",
  refunded: "border-destructive/40 text-destructive",
  chargeback: "border-destructive/40 text-destructive",
  revoked: "border-destructive/40 text-destructive",
  expired: "border-muted-foreground/40 text-muted-foreground",
};

// Licenses/entitlements are readable via RLS (own rows only); the tables enter
// the generated Database types after `supabase gen types`, hence the cast.
const db = supabase as unknown as {
  from: (table: string) => {
    select: (columns: string) => Promise<{ data: OwnedLicense[] | null; error: unknown }>;
  };
};

const LicensePanel = () => {
  const { user } = useAuth();
  const { entitlements, isPremium } = useEntitlements();
  const [licenses, setLicenses] = useState<OwnedLicense[]>([]);

  useEffect(() => {
    if (!user) return;
    db.from("licenses")
      .select("key_hint, status, seats, activated_at, expires_at")
      .then(({ data }) => setLicenses(data ?? []))
      // Table absent until the licensing migration is applied — panel stays empty.
      .catch(() => setLicenses([]));
  }, [user]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-primary" /> Licenses &amp; Premium Access
        </h2>
        <Button asChild size="sm" variant="outline">
          <Link to="/activate">Activate a key</Link>
        </Button>
      </div>

      {isPremium ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {entitlements.map((e) => (
              <Badge key={e.entitlement} variant="outline" className="border-primary/40 text-primary gap-1">
                <BadgeCheck className="w-3 h-3" /> {e.entitlement}
              </Badge>
            ))}
          </div>
          {licenses.length > 0 && (
            <ul className="space-y-2">
              {licenses.map((l) => (
                <li
                  key={`${l.key_hint}-${l.activated_at}`}
                  className="flex items-center justify-between text-sm border border-border rounded-lg px-3 py-2"
                >
                  <span className="font-mono text-muted-foreground">····{l.key_hint}</span>
                  <span className="text-xs text-muted-foreground">
                    {l.seats > 1 ? `${l.seats} seats · ` : ""}
                    {l.expires_at
                      ? `updates until ${new Date(l.expires_at).toLocaleDateString()}`
                      : "lifetime"}
                  </span>
                  <Badge variant="outline" className={STATUS_STYLES[l.status] ?? ""}>
                    {l.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-muted-foreground flex-1">
            No premium access yet. Unlock validated test-case libraries, runnable
            automation packs, and higher generator limits.
          </p>
          <Button asChild size="sm" className="gap-1.5 shrink-0">
            <Link to="/pricing"><Sparkles className="w-3.5 h-3.5" /> See pricing</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default LicensePanel;
