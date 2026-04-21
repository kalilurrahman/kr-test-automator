import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Loader2, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SeoHead from "@/components/SeoHead";
import { findCaseById, type IndexedCase } from "@/lib/globalIndex";
import { toast } from "sonner";

const priorityTone = (p: string) => {
  const lower = (p || "").toLowerCase();
  if (lower === "high" || lower === "critical")
    return "bg-destructive/15 text-destructive border-destructive/30";
  if (lower === "medium") return "bg-primary/15 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
};

const TestCaseDetail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tc, setTc] = useState<IndexedCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    findCaseById(id)
      .then((hit) => !cancelled && setTc(hit))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [id]);

  const sendToGenerator = () => {
    if (!tc) return;
    // For non-SAP/SF platforms, stash the row exactly like PlatformRepository does
    if (tc.source !== "sap" && tc.source !== "salesforce") {
      try {
        sessionStorage.setItem(
          `prefill:${tc.source}:${tc.id}`,
          JSON.stringify({ row: tc.raw, platformLabel: tc.sourceLabel, moduleLabel: tc.module }),
        );
      } catch {
        toast.error("Could not stash case for generator");
      }
    }
    navigate(`/?platform=${tc.source}&prefill=${encodeURIComponent(tc.id)}`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] max-w-4xl mx-auto px-4 py-8">
      <SeoHead
        title={tc ? `${tc.id} · ${tc.scenario || "Test case"}` : `Test case ${id}`}
        description={tc?.scenario || `Direct link to test case ${id}.`}
        canonical={`/t/${id}`}
      />

      <button
        onClick={() => navigate(-1)}
        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-4"
      >
        <ArrowLeft className="w-3 h-3" /> Back
      </button>

      {loading ? (
        <Card className="p-12 bg-card border-border flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Resolving {id} across all platforms…
        </Card>
      ) : !tc ? (
        <Card className="p-8 bg-card border-border text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Test case not found
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-mono">{id}</span> isn&apos;t in the global index. It may belong to a CSV
            that hasn&apos;t loaded yet, or the ID may be mistyped.
          </p>
          <Link to="/dashboard" className="text-primary text-sm inline-flex items-center gap-1">
            Open dashboard <ArrowRight className="w-3 h-3" />
          </Link>
        </Card>
      ) : (
        <>
          <header className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                {tc.sourceLabel}
              </Badge>
              {tc.module && (
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-muted/30">
                  {tc.module}
                </Badge>
              )}
              {tc.testType && (
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-muted/30">
                  {tc.testType}
                </Badge>
              )}
              {tc.priority && (
                <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${priorityTone(tc.priority)}`}>
                  {tc.priority}
                </Badge>
              )}
            </div>
            <h1
              className="text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {tc.scenario || tc.id}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-mono">{tc.id}</p>
          </header>

          <div className="grid gap-4 mb-6">
            {tc.preconditions && (
              <Card className="p-5 bg-card border-border">
                <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Pre-conditions</h2>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">{tc.preconditions}</p>
              </Card>
            )}
            {tc.steps && (
              <Card className="p-5 bg-card border-border">
                <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Steps</h2>
                <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans">
                  {tc.steps.replace(/\\n/g, "\n")}
                </pre>
              </Card>
            )}
            {tc.expected && (
              <Card className="p-5 bg-card border-border">
                <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Expected result</h2>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">{tc.expected}</p>
              </Card>
            )}

            {/* Raw fields not already shown */}
            {Object.entries(tc.raw).some(([k]) =>
              !["Test Case ID", "Test Scenario", "Scenario", "Steps", "Expected Result", "Expected", "Preconditions", "Pre-conditions", "Priority", "Module", "Test Type", "Type"].includes(k),
            ) && (
              <Card className="p-5 bg-card border-border">
                <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Additional metadata</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(tc.raw)
                    .filter(([k, v]) =>
                      v &&
                      !["Test Case ID", "Test Scenario", "Scenario", "Steps", "Expected Result", "Expected", "Preconditions", "Pre-conditions", "Priority", "Module", "Test Type", "Type"].includes(k),
                    )
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="text-foreground/90 mt-0.5 break-words">{v}</dd>
                      </div>
                    ))}
                </dl>
              </Card>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={sendToGenerator} className="gap-2">
              <Wand2 className="w-4 h-4" /> Send to generator
            </Button>
            <Link
              to={tc.moduleId ? `${tc.productRoute}?tab=repository&module=${tc.moduleId}` : tc.productRoute}
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" /> View in {tc.sourceLabel} repo
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default TestCaseDetail;
