import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGeneratorStore } from "@/store/generatorStore";
import { progressSteps } from "@/data/platforms";
import { Progress } from "@/components/ui/progress";
import { Copy, Download, Save, Star, Check, Loader2, Circle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const langMap: Record<string, string> = {
  typescript: "typescript", javascript: "javascript", python: "python",
  java: "java", csharp: "csharp", robot: "python", gherkin: "gherkin",
  swift: "swift", kotlin: "kotlin", scala: "scala", xml: "xml", json: "json",
  vbscript: "vbnet", groovy: "groovy", "model-based": "yaml",
};

const extMap: Record<string, string> = {
  typescript: ".ts", javascript: ".js", python: ".py", java: ".java",
  csharp: ".cs", robot: ".robot", gherkin: ".feature", swift: ".swift",
  kotlin: ".kt", scala: ".scala", xml: ".xml", json: ".json",
  vbscript: ".vbs", groovy: ".groovy", "model-based": ".tosca.yaml",
};

const OutputPanel = () => {
  const { isGenerating, progress, progressStep, result, language } = useGeneratorStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.script);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const ext = extMap[result.language] || extMap[language] || ".txt";
    const blob = new Blob([result.script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `testforge-${result.title.toLowerCase().replace(/\s+/g, "-")}${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Empty state
  if (!isGenerating && !result) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
        <div className="text-primary text-2xl mb-2">✦</div>
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          TestForge AI
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure your test on the left.<br />Or browse Templates to get started.
        </p>
        <Link
          to="/templates"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors mb-6"
        >
          Browse Templates <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <div className="text-xs text-muted-foreground mb-3">─── or try a quick example ───</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Salesforce Lead", "SAP Purchase Order", "Veeva Vault Doc", "REST API CRUD"].map((ex) => (
            <button
              key={ex}
              className="px-3 py-1.5 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Generating state
  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-full min-h-[400px] px-6"
      >
        <p className="text-sm text-muted-foreground mb-4">Generating script…</p>
        <Progress value={progress} className="w-full max-w-sm mb-6 h-2" />
        <div className="space-y-2 w-full max-w-sm">
          {progressSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: i <= progressStep ? 1 : 0.3, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-xs"
            >
              {i < progressStep ? (
                <Check className="w-3.5 h-3.5 text-primary" />
              ) : i === progressStep ? (
                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              <span className={i <= progressStep ? "text-foreground" : "text-muted-foreground"}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Result state
  if (!result) return null;

  const syntaxLang = langMap[result.language] || langMap[language] || "typescript";

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      {/* Title bar */}
      <div>
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          ✦ {result.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {result.test_cases.length} test cases ·
          P1: {result.test_cases.filter((t) => t.priority === "P1").length} ·
          P2: {result.test_cases.filter((t) => t.priority === "P2").length} ·
          P3: {result.test_cases.filter((t) => t.priority === "P3").length}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button onClick={handleDownload} className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors">
          <Download className="w-3 h-3" />
          Download {extMap[result.language] || extMap[language] || ".ts"}
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors">
          <Save className="w-3 h-3" /> Save
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors">
          <Star className="w-3 h-3" /> Star
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="testcases">Test Cases</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="mt-3">
          <div className="rounded-lg overflow-hidden border border-border">
            <SyntaxHighlighter
              language={syntaxLang}
              style={vscDarkPlus}
              customStyle={{ margin: 0, padding: "1rem", fontSize: "0.8rem", lineHeight: 1.6, background: "hsl(220, 33%, 7%)" }}
              showLineNumbers
            >
              {result.script}
            </SyntaxHighlighter>
          </div>
        </TabsContent>

        <TabsContent value="testcases" className="mt-3">
          <div className="rounded-lg border border-border overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-3 py-2 text-left text-muted-foreground font-medium">ID</th>
                  <th className="px-3 py-2 text-left text-muted-foreground font-medium">Priority</th>
                  <th className="px-3 py-2 text-left text-muted-foreground font-medium">Name</th>
                  <th className="px-3 py-2 text-left text-muted-foreground font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {result.test_cases.map((tc) => (
                  <tr key={tc.id} className="border-b border-border last:border-0 hover:bg-accent/50">
                    <td className="px-3 py-2 font-code text-muted-foreground">{tc.id}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        tc.priority === "P1" ? "bg-primary/20 text-primary" :
                        tc.priority === "P2" ? "bg-accent text-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {tc.priority}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-foreground">{tc.name}</td>
                    <td className="px-3 py-2 text-muted-foreground capitalize">{tc.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="coverage" className="mt-3">
          <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
            {result.coverage_notes}
            {result.known_limitations.length > 0 && (
              <>
                {"\n\n"}KNOWN LIMITATIONS:{"\n"}
                {result.known_limitations.map((l, i) => `• ${l}`).join("\n")}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="setup" className="mt-3">
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Prerequisites</h4>
            <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1">
              {result.prerequisites.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default OutputPanel;
