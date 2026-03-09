import { useState, useEffect } from "react";
import { GitCompareArrows, ChevronDown } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ScriptOption {
  id: string;
  title: string;
  platform: string;
  framework: string;
  language: string;
  script: string;
  created_at: string;
}

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
  mobile_ios: "iOS", mobile_android: "Android",
};

const ScriptSelector = ({
  scripts,
  selected,
  onSelect,
  label,
}: {
  scripts: ScriptOption[];
  selected: ScriptOption | null;
  onSelect: (s: ScriptOption) => void;
  label: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground hover:border-primary/30 transition-colors"
      >
        <span className="truncate">
          {selected ? selected.title : `Select ${label}...`}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
          {scripts.map((s) => (
            <button
              key={s.id}
              onClick={() => { onSelect(s); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-accent/50 transition-colors ${
                selected?.id === s.id ? "bg-primary/10 text-primary" : "text-foreground"
              }`}
            >
              <div className="font-medium truncate">{s.title}</div>
              <div className="text-xs text-muted-foreground">
                {platformLabels[s.platform] || s.platform} · {s.framework}
              </div>
            </button>
          ))}
          {scripts.length === 0 && (
            <div className="px-3 py-4 text-sm text-muted-foreground text-center">No scripts available</div>
          )}
        </div>
      )}
    </div>
  );
};

const Compare = () => {
  const { user } = useAuth();
  const [scripts, setScripts] = useState<ScriptOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [left, setLeft] = useState<ScriptOption | null>(null);
  const [right, setRight] = useState<ScriptOption | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("generations")
        .select("id, title, platform, framework, language, script, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      setScripts((data as ScriptOption[]) || []);
      setLoading(false);
    };
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-muted-foreground">Sign in to compare scripts.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <GitCompareArrows className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Compare Scripts
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <ScriptSelector scripts={scripts} selected={left} onSelect={setLeft} label="Script A" />
              <ScriptSelector scripts={scripts.filter((s) => s.id !== left?.id)} selected={right} onSelect={setRight} label="Script B" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left panel */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                {left ? (
                  <>
                    <div className="px-4 py-3 border-b border-border bg-accent/30">
                      <div className="text-sm font-medium text-foreground truncate">{left.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {platformLabels[left.platform] || left.platform} · {left.framework} · {left.language}
                      </div>
                    </div>
                    <div className="max-h-[600px] overflow-auto">
                      <SyntaxHighlighter
                        language={left.language === "typescript" ? "typescript" : left.language === "python" ? "python" : "javascript"}
                        style={atomOneDark}
                        customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.7rem", padding: "1rem", minHeight: "400px" }}
                        wrapLongLines
                      >
                        {left.script}
                      </SyntaxHighlighter>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center min-h-[400px] text-sm text-muted-foreground">
                    Select Script A above
                  </div>
                )}
              </div>

              {/* Right panel */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                {right ? (
                  <>
                    <div className="px-4 py-3 border-b border-border bg-accent/30">
                      <div className="text-sm font-medium text-foreground truncate">{right.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {platformLabels[right.platform] || right.platform} · {right.framework} · {right.language}
                      </div>
                    </div>
                    <div className="max-h-[600px] overflow-auto">
                      <SyntaxHighlighter
                        language={right.language === "typescript" ? "typescript" : right.language === "python" ? "python" : "javascript"}
                        style={atomOneDark}
                        customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.7rem", padding: "1rem", minHeight: "400px" }}
                        wrapLongLines
                      >
                        {right.script}
                      </SyntaxHighlighter>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center min-h-[400px] text-sm text-muted-foreground">
                    Select Script B above
                  </div>
                )}
              </div>
            </div>

            {/* Comparison summary */}
            {left && right && (
              <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Quick Comparison</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-muted-foreground font-medium">Metric</div>
                  <div className="text-muted-foreground font-medium">Script A</div>
                  <div className="text-muted-foreground font-medium">Script B</div>

                  <div className="text-muted-foreground">Lines of Code</div>
                  <div className="text-foreground">{left.script.split("\n").length}</div>
                  <div className="text-foreground">{right.script.split("\n").length}</div>

                  <div className="text-muted-foreground">Characters</div>
                  <div className="text-foreground">{left.script.length.toLocaleString()}</div>
                  <div className="text-foreground">{right.script.length.toLocaleString()}</div>

                  <div className="text-muted-foreground">Platform</div>
                  <div className="text-foreground">{platformLabels[left.platform] || left.platform}</div>
                  <div className="text-foreground">{platformLabels[right.platform] || right.platform}</div>

                  <div className="text-muted-foreground">Framework</div>
                  <div className="text-foreground">{left.framework}</div>
                  <div className="text-foreground">{right.framework}</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Compare;
