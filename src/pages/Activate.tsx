import { useState } from "react";
import { KeyRound, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useEntitlements } from "@/hooks/useEntitlements";
import { activateLicense, ACTIVATION_ERRORS } from "@/lib/licensing";

// Keep in sync with license_products seed rows (see docs/premium/06-implementation-guide.md).
const SKUS = [
  { sku: "pack-sap", label: "SAP Premium Pack" },
  { sku: "pack-salesforce", label: "Salesforce Premium Pack" },
  { sku: "pack-workday", label: "Workday Premium Pack" },
  { sku: "all-access", label: "All-Access Library" },
  { sku: "team-5", label: "Team License (5 seats)" },
];

const Activate = () => {
  const { user, loading: authLoading } = useAuth();
  const { entitlements, refresh } = useEntitlements();
  const [authOpen, setAuthOpen] = useState(false);
  const [sku, setSku] = useState<string>("");
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<string[] | null>(null);

  const submit = async () => {
    setError(null);
    setUnlocked(null);
    if (!sku) { setError("Pick the product this key belongs to."); return; }
    if (!key.trim()) { setError("Paste your license key."); return; }
    setBusy(true);
    try {
      const result = await activateLicense({ licenseKey: key, sku });
      if (result.ok) {
        setUnlocked(result.entitlements ?? []);
        refresh();
      } else {
        setError(ACTIVATION_ERRORS[result.error ?? ""] ?? "Activation failed. Please contact support.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-start justify-center px-4 py-12">
      <SeoHead
        title="Activate License · TestForge AI"
        description="Activate your TestForge AI premium license key to unlock validated test-case libraries and runnable automation packs."
        canonical="/activate"
      />
      <Card className="w-full max-w-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <KeyRound className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Activate your license</h1>
            <p className="text-xs text-muted-foreground">
              Your key arrived in the purchase receipt email.
            </p>
          </div>
        </div>

        {!authLoading && !user ? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">
              Sign in first so the license attaches to your account.
            </p>
            <Button onClick={() => setAuthOpen(true)}>Sign in to continue</Button>
          </div>
        ) : unlocked ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="font-medium mb-1">License activated</p>
            <p className="text-sm text-muted-foreground mb-4">
              Unlocked: {unlocked.length > 0 ? unlocked.join(", ") : "existing access confirmed"}
            </p>
            <Button asChild className="gap-1.5">
              <Link to="/downloads"><Sparkles className="w-4 h-4" /> Go to your content</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Product</label>
              <Select value={sku} onValueChange={setSku}>
                <SelectTrigger><SelectValue placeholder="Which product did you buy?" /></SelectTrigger>
                <SelectContent>
                  {SKUS.map((s) => (
                    <SelectItem key={s.sku} value={s.sku}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">License key</label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={submit} disabled={busy} className="w-full gap-2">
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {busy ? "Verifying…" : "Activate"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No key yet? <Link to="/pricing" className="text-primary hover:underline">See pricing</Link>
              {entitlements.length > 0 && " · Your account already has active entitlements."}
            </p>
          </div>
        )}
      </Card>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
};

export default Activate;
