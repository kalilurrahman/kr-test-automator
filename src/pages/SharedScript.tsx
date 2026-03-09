import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface SharedGeneration {
  title: string;
  platform: string;
  framework: string;
  language: string;
  script: string;
  test_cases: any;
  prerequisites: string[] | null;
  coverage_notes: string | null;
  known_limitations: string[] | null;
  created_at: string;
}

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
  mobile_ios: "iOS", mobile_android: "Android",
};

const extMap: Record<string, string> = {
  typescript: ".ts", javascript: ".js", python: ".py", java: ".java",
  csharp: ".cs", robot: ".robot", gherkin: ".feature",
};

const SharedScript = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [script, setScript] = useState<SharedGeneration | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchShared = async () => {
      if (!shareId) { setNotFound(true); setLoading(false); return; }
      const { data, error } = await supabase
        .from("generations")
        .select("title, platform, framework, language, script, test_cases, prerequisites, coverage_notes, known_limitations, created_at")
        .eq("share_id", shareId)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setScript(data as SharedGeneration);
      }
      setLoading(false);
    };
    fetchShared();
  }, [shareId]);

  const copyScript = () => {
    if (!script) return;
    navigator.clipboard.writeText(script.script);
    toast.success("Copied to clipboard");
  };

  const downloadScript = () => {
    if (!script) return;
    const ext = extMap[script.language] || ".txt";
    const blob = new Blob([script.script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${script.title.toLowerCase().replace(/\s+/g, "-")}${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-muted-foreground">Loading shared script...</p>
      </div>
    );
  }

  if (notFound || !script) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Script Not Found
          </h2>
          <p className="text-muted-foreground">This shared link may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {script.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="px-2 py-0.5 rounded bg-accent text-xs">
              {platformLabels[script.platform] || script.platform}
            </span>
            <span>{script.framework}</span>
            <span>·</span>
            <span>{new Date(script.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex justify-end gap-2 mb-3">
            <button onClick={downloadScript} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button onClick={copyScript} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={script.language === "typescript" ? "typescript" : script.language === "python" ? "python" : script.language === "java" ? "java" : "javascript"}
            style={atomOneDark}
            customStyle={{ borderRadius: "0.5rem", fontSize: "0.75rem", padding: "1rem" }}
            wrapLongLines
          >
            {script.script}
          </SyntaxHighlighter>
        </div>

        {script.coverage_notes && (
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-foreground mb-1">Coverage Notes</h3>
            <p className="text-sm text-muted-foreground">{script.coverage_notes}</p>
          </div>
        )}

        {script.prerequisites && script.prerequisites.length > 0 && (
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-foreground mb-1">Prerequisites</h3>
            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
              {script.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedScript;
