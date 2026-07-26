import { useState } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const KIT_BASE = "/samplers/sap-starter-kit";
const FILES = [
  { href: `${KIT_BASE}/sap-starter-kit.csv`, label: "CSV" },
  { href: `${KIT_BASE}/sap-starter-kit.json`, label: "JSON" },
  { href: `${KIT_BASE}/sap-starter-kit.feature`, label: "Gherkin" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// The lead magnet: 40 real cases at the same quality as the paid pack, because
// the sample is the sales argument. The files stay directly downloadable — the
// email ask sits alongside them rather than in front, so a mistyped address
// never costs someone the download (and us the trust).
const StarterKitCta = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const subscribe = async () => {
    if (!EMAIL_RE.test(email.trim())) {
      setError("That doesn't look like an email address.");
      return;
    }
    setError(null);
    setState("saving");
    const { error: insertError } = await (supabase as unknown as {
      from: (t: string) => {
        insert: (row: Record<string, unknown>) => Promise<{ error: { code?: string } | null }>;
      };
    })
      .from("leads")
      .insert({
        email: email.trim().toLowerCase(),
        source: "sap-starter-kit",
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
        user_id: user?.id ?? null,
      });

    // 23505 = already on the list, which is a success from the visitor's view.
    if (insertError && insertError.code !== "23505") {
      setState("idle");
      setError("Couldn't save that just now — the download works regardless.");
      return;
    }
    setState("done");
  };

  return (
    <Card className="p-5 border-primary/30 bg-primary/5">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Download className="w-4 h-4 text-primary" />
            Free: SAP S/4HANA UAT Starter Kit
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            40 real test cases from the SAP Enterprise Test Repository — the same
            rows, at the same quality, as the paid pack. Real transaction codes,
            checkable preconditions, falsifiable expected results.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILES.map((f) => (
            <Button key={f.label} asChild size="sm" variant="outline">
              <a href={f.href} download>
                {f.label}
              </a>
            </Button>
          ))}
        </div>

        {state === "done" ? (
          <p className="text-sm text-primary flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            You're on the list — you'll get new modules and release updates.
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email for pack updates"
              className="bg-background"
            />
            <Button onClick={subscribe} disabled={state === "saving"} className="gap-2 shrink-0">
              {state === "saving" && <Loader2 className="w-4 h-4 animate-spin" />}
              Email me updates
            </Button>
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-xs text-muted-foreground">
          Optional — the files above download without it. Updates only, no resale of your address.
        </p>
      </div>
    </Card>
  );
};

export default StarterKitCta;
