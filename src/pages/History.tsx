import { useState, useEffect } from "react";
import { Search, Star, Trash2, Eye, Copy, Download, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useGeneratorStore, Platform, TestScope } from "@/store/generatorStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import SkeletonRows from "@/components/SkeletonRows";
import { DeleteConfirmDialog, useDeleteConfirm } from "@/components/DeleteConfirmDialog";

interface Generation {
  id: string;
  title: string;
  platform: string;
  framework: string;
  language: string;
  business_case: string;
  script: string;
  test_cases: any;
  test_scopes: string[] | null;
  test_count: number | null;
  prerequisites: string[] | null;
  coverage_notes: string | null;
  known_limitations: string[] | null;
  is_starred: boolean | null;
  created_at: string;
}

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
  mobile_ios: "iOS", mobile_android: "Android",
};

const History = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const store = useGeneratorStore();
  const [search, setSearch] = useState("");
  const [starredOnly, setStarredOnly] = useState(false);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Generation | null>(null);
  const deleteConfirm = useDeleteConfirm();

  const fetchGenerations = async () => {
    if (!user) { setLoading(false); return; }
    const { data } = await supabase
      .from("generations")
      .select("*")
      .order("created_at", { ascending: false });
    setGenerations((data as Generation[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchGenerations(); }, [user]);

  const toggleStar = async (id: string, current: boolean | null) => {
    await supabase.from("generations").update({ is_starred: !current }).eq("id", id);
    setGenerations((prev) => prev.map((g) => g.id === id ? { ...g, is_starred: !current } : g));
  };

  const handleDelete = async (id: string) => {
    await supabase.from("generations").delete().eq("id", id);
    setGenerations((prev) => prev.filter((g) => g.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("Script deleted");
  };

  const handleRerun = (g: Generation) => {
    store.setPlatform(g.platform as Platform);
    store.setFramework(g.framework);
    store.setLanguage(g.language);
    store.setBusinessCase(g.business_case);
    if (g.test_scopes?.length) store.setTestScopes(g.test_scopes as TestScope[]);
    if (g.test_count) store.setTestCount(g.test_count);
    store.setResult(null);
    navigate("/");
    toast.success("Parameters loaded — ready to generate");
  };

  const copyScript = (script: string) => {
    navigator.clipboard.writeText(script);
    toast.success("Copied to clipboard");
  };

  const extMap: Record<string, string> = {
    typescript: ".ts", javascript: ".js", python: ".py", java: ".java",
    csharp: ".cs", robot: ".robot", gherkin: ".feature", swift: ".swift",
    kotlin: ".kt", scala: ".scala", xml: ".xml", json: ".json",
  };

  const downloadScript = (g: Generation) => {
    const ext = extMap[g.language] || ".txt";
    const blob = new Blob([g.script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${g.title.toLowerCase().replace(/\s+/g, "-")}${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  const filtered = generations.filter((g) => {
    if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (starredOnly && !g.is_starred) return false;
    return true;
  });

  const formatDate = (d: string) => {
    const date = new Date(d);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-muted-foreground">Sign in to view your generated scripts.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          My Generated Scripts
        </h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scripts..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setStarredOnly(!starredOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
              starredOnly ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Star className="w-3.5 h-3.5" fill={starredOnly ? "currentColor" : "none"} />
            Starred
          </button>
        </div>

        {loading ? (
          <SkeletonRows rows={4} columns={5} />
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-8">★</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">Platform</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">Framework</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Generated</th>
                  <th className="px-4 py-3 w-28"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => (
                  <tr key={g.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStar(g.id, g.is_starred)}>
                        <Star className={`w-4 h-4 ${g.is_starred ? "text-primary" : "text-muted-foreground/30"}`} fill={g.is_starred ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-foreground font-medium cursor-pointer" onClick={() => setSelected(g)}>
                      {g.title}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="px-2 py-0.5 rounded bg-accent text-xs text-muted-foreground">
                        {platformLabels[g.platform] || g.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{g.framework}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground text-xs">{formatDate(g.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleRerun(g)} className="p-1 text-muted-foreground hover:text-primary" title="Re-run with same parameters">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setSelected(g)} className="p-1 text-muted-foreground hover:text-foreground">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => downloadScript(g)} className="p-1 text-muted-foreground hover:text-foreground">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteConfirm.requestDelete(g.id)} className="p-1 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                {generations.length === 0 ? "No scripts yet. Generate your first test script!" : "No matching scripts found."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pr-8">{selected?.title}</DialogTitle>
          </DialogHeader>
          {selected && (
            <Tabs defaultValue="code">
              <TabsList className="bg-accent">
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="coverage">Coverage</TabsTrigger>
                <TabsTrigger value="setup">Setup</TabsTrigger>
              </TabsList>
              <TabsContent value="code" className="mt-3">
                <div className="flex justify-end gap-2 mb-2">
                  <button onClick={() => selected && handleRerun(selected)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
                    <RotateCcw className="w-3.5 h-3.5" /> Re-run
                  </button>
                  <button onClick={() => selected && downloadScript(selected)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button onClick={() => copyScript(selected.script)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                </div>
                <pre className="p-4 rounded-lg bg-background border border-border text-xs overflow-x-auto whitespace-pre-wrap font-mono text-foreground">
                  {selected.script}
                </pre>
              </TabsContent>
              <TabsContent value="coverage" className="mt-3 space-y-3">
                {selected.coverage_notes && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">Coverage Notes</h3>
                    <p className="text-sm text-muted-foreground">{selected.coverage_notes}</p>
                  </div>
                )}
                {selected.known_limitations && selected.known_limitations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">Known Limitations</h3>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                      {selected.known_limitations.map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="setup" className="mt-3">
                {selected.prerequisites && selected.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">Prerequisites</h3>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                      {selected.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
