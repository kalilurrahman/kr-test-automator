import { useEffect, useState, FormEvent, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Search, ArrowRight, Sparkles, Package, Layers, BookMarked, History as HistoryIcon, FolderOpen, GitCompare, Info, MessageSquare, Database, Loader2, Fingerprint, Copy, Clock, Factory, Cpu } from "lucide-react";
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
  ResponsiveContainer, Tooltip, Cell,
  BarChart, Bar, XAxis, YAxis,
  Treemap,
} from "recharts";
import { getGlobalStats, type GlobalStats } from "@/lib/globalStats";
import { findCaseById, guessSourceFromId } from "@/lib/globalIndex";
import { ProductLogo } from "@/components/ProductLogo";
import { getIndustryIndex, type IndustryIndex } from "@/data/industryScenarios";
import { INDUSTRY_BY_NAME, AUTOMATION_SCRIPT_OPTIONS } from "@/data/industryMeta";

// Defer the heavy global browser — its first render builds the entire index.
const GlobalCaseBrowser = lazy(() =>
  import("@/components/GlobalCaseBrowser").then((m) => ({ default: m.GlobalCaseBrowser })),
);

const PRIORITY_COLORS: Record<string, string> = {
  High: "hsl(var(--destructive))",
  Medium: "hsl(var(--primary))",
  Low: "hsl(var(--muted-foreground))",
};

/**
 * Vivid, evenly-spaced hues used to colour heatmap tiles. We sweep around the
 * colour wheel so neighbouring tiles always contrast, then modulate lightness
 * by rank so the densest tile still feels "hottest". Picked to stay legible
 * on both the dark default theme and the new light mode.
 */
const HEATMAP_HUES = [
  12, 28, 45, 95, 140, 165, 190, 210, 235, 260, 285, 310, 330, 355,
];

const tileColor = (index: number, total: number) => {
  const hue = HEATMAP_HUES[index % HEATMAP_HUES.length];
  const t = total > 1 ? index / (total - 1) : 0;
  const saturation = Math.round(78 - t * 18); // 78 → 60
  const lightness = Math.round(58 + t * 10); // 58 → 68 — bright enough that dark text stays legible
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};

/**
 * Custom Treemap tile that renders the platform name and case count directly
 * inside each rectangle, using a distinct vivid colour per tile so the chart
 * reads as a true multi-colour heatmap. Recharts injects all geometry props
 * (x, y, width, height, name, value, index) at render time.
 */
interface HeatmapTileProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  index?: number;
  total: number;
}

const HeatmapTile = (props: HeatmapTileProps) => {
  const { x = 0, y = 0, width = 0, height = 0, name = "", value = 0, index = 0, total } = props;
  if (width <= 0 || height <= 0) return null;
  const fill = tileColor(index, total);
  const showLabel = width > 50 && height > 30;
  const showValue = width > 70 && height > 50;
  const maxChars = Math.max(3, Math.floor(width / 7));
  const label = name.length > maxChars ? `${name.slice(0, maxChars - 1)}…` : name;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="hsl(var(--background))"
        strokeWidth={2}
      />
      {showLabel && (
        <text
          x={x + width / 2}
          y={showValue ? y + height / 2 - 6 : y + height / 2 + 4}
          textAnchor="middle"
          fontSize={Math.min(13, Math.max(10, width / 10))}
          fontWeight={700}
          fill="#0b0f1a"
          style={{ pointerEvents: "none" }}
        >
          {label}
        </text>
      )}
      {showValue && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          fontSize={11}
          fontFamily="JetBrains Mono, monospace"
          fontWeight={600}
          fill="#0b0f1a"
          style={{ pointerEvents: "none" }}
        >
          {value.toLocaleString()}
        </text>
      )}
    </g>
  );
};

/**
 * Recharts' default Tooltip renders nothing useful for Treemap, so we ship a
 * custom popover that always shows the full platform name + case count. This
 * makes hover legible even when the tile itself is too narrow for a label.
 */
interface HeatmapTooltipProps {
  active?: boolean;
  payload?: Array<{ payload?: { name?: string; value?: number } }>;
}

const HeatmapTooltip = ({ active, payload }: HeatmapTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0]?.payload;
  if (!data?.name) return null;
  return (
    <div
      className="rounded-md border border-border px-3 py-2 shadow-lg"
      style={{
        background: "hsl(var(--popover))",
        color: "hsl(var(--popover-foreground))",
      }}
    >
      <div className="text-sm font-semibold" style={{ color: "hsl(var(--popover-foreground))" }}>
        {data.name}
      </div>
      <div
        className="text-xs font-mono mt-0.5"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {(data.value ?? 0).toLocaleString()} cases
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [idQuery, setIdQuery] = useState("");
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [industryIndex, setIndustryIndex] = useState<IndustryIndex | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatsLoading(true);
    getGlobalStats()
      .then((s) => !cancelled && setGlobalStats(s))
      .finally(() => !cancelled && setStatsLoading(false));
    // Industries data is non-blocking — load in parallel and render when ready.
    getIndustryIndex()
      .then((idx) => !cancelled && setIndustryIndex(idx))
      .catch(() => undefined);
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

  // Compact stats row — duplicates-removed + loaded-platforms cards were
  // dropped per dashboard cleanup; kept the four metrics that matter most.
  const stats = [
    { label: "Platforms", value: TOTAL_PRODUCTS, icon: Package },
    { label: "Modules", value: TOTAL_MODULES, icon: Layers },
    {
      label: "Unique test cases",
      value: globalStats ? globalStats.uniqueIds.toLocaleString() : "…",
      icon: Fingerprint,
    },
    {
      label: "Last updated",
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

        {/* Live charts — priority (compact horizontal bar) + platforms (heatmap treemap) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {/* Priority — small horizontal bar chart */}
          <Card className="p-5 bg-card border-border lg:col-span-1">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Cases by priority
            </h2>
            <div className="h-56">
              {statsLoading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading…
                </div>
              ) : globalStats && globalStats.byPriority.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={globalStats.byPriority}
                    layout="vertical"
                    margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
                    barCategoryGap={12}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 600 }}
                      width={70}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                      formatter={(v: number) => v.toLocaleString()}
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[0, 6, 6, 0]}
                      label={{
                        position: "right",
                        fill: "hsl(var(--foreground))",
                        fontSize: 11,
                        formatter: (v: number) => v.toLocaleString(),
                      }}
                    >
                      {globalStats.byPriority.map((d) => (
                        <Cell key={d.name} fill={PRIORITY_COLORS[d.name] ?? "hsl(var(--muted))"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                  No data
                </div>
              )}
            </div>
          </Card>

          {/* Top platforms — heatmap-style treemap */}
          <Card className="p-5 bg-card border-border lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Top platforms by case volume
              </h2>
              {globalStats && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  {globalStats.topPlatforms.length} platforms · larger tile = more cases
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
                  <Treemap
                    data={globalStats.topPlatforms}
                    dataKey="value"
                    nameKey="name"
                    stroke="hsl(var(--background))"
                    content={<HeatmapTile total={globalStats.topPlatforms.length} />}
                    isAnimationActive={false}
                  >
                    <Tooltip content={<HeatmapTooltip />} />
                  </Treemap>
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

        {/* Industries summary — top industries by scenario count + script-type breakdown */}
        {industryIndex && (
          <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-5 bg-card border-border lg:col-span-2">
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider inline-flex items-center gap-2">
                  <Factory className="w-4 h-4 text-primary" /> Top industries by scenario count
                </h2>
                <Link
                  to="/industries"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  Browse all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {industryIndex.summaries.slice(0, 12).map((s) => {
                  const meta = INDUSTRY_BY_NAME.get(s.industry);
                  return (
                    <Link
                      key={s.industry}
                      to={`/industries/${s.slug}`}
                      className="rounded-md border border-border bg-background/40 hover:border-primary/40 px-3 py-2 transition-colors min-w-0"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base leading-none" aria-hidden>{meta?.glyph ?? "🏷"}</span>
                        <span className="text-xs font-semibold text-foreground truncate" title={s.industry}>
                          {s.industry}
                        </span>
                      </div>
                      <div className="text-sm font-mono text-foreground">{s.total.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">scenarios</div>
                    </Link>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <SuccessMetric
                  label="High-priority"
                  value={`${Math.round((industryIndex.totals.high / industryIndex.totals.scenarios) * 100)}%`}
                />
                <SuccessMetric
                  label="Auto-ready"
                  value={`${Math.round((industryIndex.totals.autoReady / industryIndex.totals.scenarios) * 100)}%`}
                />
                <SuccessMetric
                  label="Integration covered"
                  value={`${Math.round((industryIndex.totals.integrationCoverage / industryIndex.totals.scenarios) * 100)}%`}
                />
              </div>
            </Card>

            <Card className="p-5 bg-card border-border">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 inline-flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" /> Script options
              </h2>
              <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                {AUTOMATION_SCRIPT_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center justify-between text-xs px-2 py-1.5 rounded bg-background/40 border border-border/60"
                  >
                    <span className="text-foreground truncate" title={opt.label}>{opt.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{opt.language}</span>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                Pick a script flavour inside any industry tile to seed the generator with the right framework hint.
              </div>
            </Card>
          </section>
        )}

        {/* Quick links — moved up so search can sit at the very bottom */}

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
                  <div className="flex items-start gap-3 mb-2">
                    <ProductLogo productKey={p.key} label={p.label} size={44} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className="text-lg font-semibold text-foreground leading-tight truncate"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          title={p.label}
                        >
                          {p.label}
                        </h3>
                        <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded shrink-0">
                          {p.modules.length} mods
                        </span>
                      </div>
                    </div>
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

        {/* Global search — moved below the product grid per dashboard layout request */}
        <section className="mt-10">
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
      </div>
    </>
  );
};

const SuccessMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md border border-border bg-background/40 px-3 py-2">
    <div className="text-base font-bold text-foreground leading-none">{value}</div>
    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
  </div>
);

export default Dashboard;
