import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useEntitlements } from "@/hooks/useEntitlements";

interface PremiumGateProps {
  /** Entitlement key required, e.g. ENTITLEMENTS.pack("sap") */
  entitlement: string;
  /** Shown blurred behind the lock so buyers can see what they're getting. */
  children: ReactNode;
  /** Short label for the locked asset, e.g. "SAP Premium Pack" */
  label?: string;
}

// Client-side gate for premium UI. This controls presentation only — real
// protection comes from gated delivery (signed URLs / edge functions); anything
// bundled as a public static asset is NOT protected by this component.
const PremiumGate = ({ entitlement, children, label = "Premium content" }: PremiumGateProps) => {
  const { user } = useAuth();
  const { hasEntitlement, loading } = useEntitlements();

  if (loading) return <>{children}</>;
  if (user && hasEntitlement(entitlement)) return <>{children}</>;

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="pointer-events-none select-none blur-sm opacity-40" aria-hidden>
        {children}
      </div>
      <Card className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-[2px] border-primary/30 p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Lock className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm font-medium">{label} is part of the premium library</p>
        <p className="text-xs text-muted-foreground max-w-sm">
          Unlock validated test cases, runnable scripts, and living updates with a one-time license.
        </p>
        <div className="flex gap-2">
          <Button asChild size="sm" className="gap-1.5">
            <Link to="/pricing"><Sparkles className="w-3.5 h-3.5" /> See pricing</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/activate">I have a license key</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PremiumGate;
