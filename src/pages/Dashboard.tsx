import { useEffect, useState, FormEvent, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Search, ArrowRight, Sparkles, Package, Layers, FileCode2, BookMarked, History as HistoryIcon, FolderOpen, GitCompare, Info, MessageSquare, Database, Loader2, Fingerprint, Copy, Clock } from "lucide-react";
import {
  PRODUCT_CATALOG,
  TOTAL_PRODUCTS,
  TOTAL_MODULES,
  ACCENT_CLASSES,
} from "@/data/productCatalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { getGlobalStats, type GlobalStats } from "@/lib/globalStats";
import { findCaseById, guessSourceFromId } from "@/lib/globalIndex";

// Defer the heavy global browser — its first render builds the entire index.
const GlobalCaseBrowser = lazy(() =>
  import("@/components/GlobalCaseBrowser").then((m) => ({ default: m.GlobalCaseBrowser })),
);

const PRIORITY_COLORS: Record<string, string> = {
  High: "hsl(var(--destructive))",
  Medium: "hsl(var(--primary))",
  Low: "hsl(var(--muted-foreground))",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [idQuery, setIdQuery] = useState("");
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    getGlobalStats()
      .then((s) => !cancelled && setGlobalStats(s))
      .finally(() => !cancelled && setStatsLoading(false));
    return () => { cancelled = true; };
  }, []);

  const handleIdLookup = async (e: FormEvent) => {
    e.preventDefault();
    const id = idQuery.trim();
    if (!id) return;
    // Prefer the global index — it knows about every CSV row, not just prefixes.
    const hit = await findCaseById(id);
    if (hit) {
      navigate(`/t/${encodeURIComponent(hit.id)}`);
      return;
    }
    // Fall back to prefix guess so unknown IDs still route to a sensible product.
    const source = await guessSourceFromId(id);
    if (source) {
      navigate(`/t/${encodeURIComponent(id)}`);
      toast.message(`No exact match — opening best guess from ${source}.`);
      return;
    }
    toast.error(`Unknown ID "${id}". Try SF-HC-00005, SAP-FI-001, WD-PAY-042…`);
  };

  const stats = [
    { label: "Platforms", value: TOTAL_PRODUCTS, icon: Package },
    { label: "Modules", value: TOTAL_MODULES, icon: Layers },
    {
      label: "Unique test IDs",
      value: globalStats ? globalStats.uniqueIds.toLocaleString() : "…",
      icon: Fingerprint,
    },
    {
      label: "Live test cases",
      value: globalStats ? globalStats.totalCases.toLocaleString() : "…",
      icon: Database,
    },
    {
      label: "Duplicates removed",
      value: globalStats ? globalStats.duplicatesRemoved.toLocaleString() : "…",
      icon: Copy,
    },
    {
      label: "Index updated",
      value: globalStats ? new Date(globalStats.lastUpdated).toLocaleTimeString() : "…",
      icon: Clock,
    },
  ];

  const quickLinks = [
    { to: "/", label: "Generator", icon: Sparkles },
    { to: "/templates", label: "Templates", icon: BookMarked },
    { to: "/history", label: "History", icon: HistoryIcon },
    { to: "/collections", label: "Collections", icon: FolderOpen },
    { to: "/compare", label: "Compare", icon: GitCompare },
    { to: "/about", label: "About", icon: Info },
    { to: "/feedback", label: "Feedback", icon: MessageSquare },
  ];

  return (
    <>
      <SeoHead
        title="Dashboard · TestForge AI Enterprise Test Hub"
        description={`Master dashboard for ${TOTAL_PRODUCTS}+ enterprise test platforms — SAP, Salesforce, Workday, ServiceNow, Veeva, Dynamics 365, Oracle, Snowflake, Datadog, Jira and more.`}
        canonical="/dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Enterprise Test Automation Hub
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            One launcher for every test pack — generate, browse, deep-link by ID, or jump straight into a platform repository.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {stats.map((s) => (
            <Card
              key={s.label}
              className="p-3 sm:p-4 bg-card border-border flex items-center gap-2 sm:gap-3 min-w-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="font-bold text-foreground leading-tight break-words"
                  style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)" }}
                  title={typeof s.value === "string" ? s.value : String(s.value)}
                >
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5 leading-tight break-words">
                  {s.label}
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* Live charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          <Card className="p-5 bg-card border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Cases by priority (all platforms)
            </h2>
            <div className="h-56">
              {statsLoading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…
                </div>
              ) : globalStats && globalStats.byPriority.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={globalStats.byPriority}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={2}
                      label={(e) => `${e.name}: ${e.value.toLocaleString()}`}
                    >
                      {globalStats.byPriority.map((d) => (
                        <Cell key={d.name} fill={PRIORITY_COLORS[d.name] ?? "hsl(var(--muted))"} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                  No data
                </div>
              )}
            </div>
          </Card>

          <Card className="p-5 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Top platforms by case volume
              </h2>
              {globalStats && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  {globalStats.topPlatforms.length} platforms
                </span>
              )}
            </div>
            <div className="h-72 sm:h-80">
              {statsLoading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…
                </div>
              ) : globalStats && globalStats.topPlatforms.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={globalStats.topPlatforms}
                    margin={{ top: 5, right: 10, left: -10, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                      interval={0}
                      angle={-55}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                  No data
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Find by ID */}
        <section className="mb-6">
          <Card className="p-5 bg-card border-border">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Find by ID</h2>
            </div>
            <form onSubmit={handleIdLookup} className="flex gap-2 flex-col sm:flex-row">
              <Input
                value={idQuery}
                onChange={(e) => setIdQuery(e.target.value)}
                placeholder="e.g. SF-HC-00005, SAP-FI-001, WD-PAY-042"
                className="flex-1 bg-background"
                aria-label="Test case ID lookup"
              />
              <Button type="submit" className="gap-2">
                Open <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              Resolves the ID against the global index across every product and opens its detail view.
            </p>
          </Card>
        </section>

        {/* Global search */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" /> Search every product
          </h2>
          <Suspense
            fallback={
              <div className="rounded-xl border border-border bg-card p-12 flex items-center justify-center text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Preparing search…
              </div>
            }
          >
            <GlobalCaseBrowser />
          </Suspense>
        </section>

        {/* Quick links */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Quick links</h2>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors"
              >
                <q.icon className="w-3.5 h-3.5" />
                {q.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">All platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_CATALOG.map((p) => {
              const cardContent = (
                <Card
                  className={`p-5 bg-card border-2 transition-all h-full flex flex-col ${ACCENT_CLASSES[p.accent]}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-lg font-semibold text-foreground"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {p.label}
                    </h3>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded">
                      {p.modules.length} mods
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.modules.slice(0, 5).map((m) => (
                      <span key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                        {m}
                      </span>
                    ))}
                    {p.modules.length > 5 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                        +{p.modules.length - 5}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground">{p.idPrefix}-*</span>
                    <span className="text-primary inline-flex items-center gap-1">
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Card>
              );

              return (
                <Link key={p.key} to={p.route} className="block">{cardContent}</Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
