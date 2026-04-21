import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Loader2, Search, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SeoHead from "@/components/SeoHead";
import { INDUSTRY_BY_SLUG, ACCENT_BG, AUTOMATION_SCRIPT_OPTIONS } from "@/data/industryMeta";
import {
  erpToPlatform,
  getIndustryIndex,
  type IndustryIndex,
  type IndustryScenario,
} from "@/data/industryScenarios";
import { toast } from "sonner";

const PRIORITY_CLS: Record<string, string> = {
  High: "bg-destructive/15 text-destructive border-destructive/30",
  Medium: "bg-primary/15 text-primary border-primary/30",
  Low: "bg-muted text-muted-foreground border-border",
};

const AUTO_CLS: Record<string, string> = {
  High: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Low: "bg-muted text-muted-foreground border-border",
};

const IndustryDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const meta = INDUSTRY_BY_SLUG.get(slug);
  const [index, setIndex] = useState<IndustryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [productFilter, setProductFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [scriptType, setScriptType] = useState<string>("playwright_ts");

  useEffect(() => {
    let cancelled = false;
    getIndustryIndex()
      .then((idx) => !cancelled && setIndex(idx))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const scenarios = useMemo<IndustryScenario[]>(() => {
    if (!index || !meta) return [];
    return index.byIndustry.get(meta.name) ?? [];
  }, [index, meta]);

  const products = useMemo(() => {
    const set = new Set<string>();
    for (const s of scenarios) if (s.product) set.add(s.product);
    return ["All", ...[...set].sort()];
  }, [scenarios]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scenarios.filter((s) => {
      if (productFilter !== "All" && s.product !== productFilter) return false;
      if (priorityFilter !== "All" && s.priority !== priorityFilter) return false;
      if (!q) return true;
      return (
        s.scenario_id.toLowerCase().includes(q) ||
        s.e2e_scenario_name.toLowerCase().includes(q) ||
        s.business_description.toLowerCase().includes(q) ||
        s.modules.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [scenarios, query, productFilter, priorityFilter]);

  const totals = useMemo(() => {
    let high = 0;
    let auto = 0;
    let integrationCovered = 0;
    for (const s of scenarios) {
      if (s.priority === "High") high += 1;
      if (s.auto_feasibility === "High") auto += 1;
      if (s.integration_hint) integrationCovered += 1;
    }
    return { high, auto, integrationCovered };
  }, [scenarios]);

  if (!meta) {
    return <Navigate to="/industries" replace />;
  }

  const handleGenerate = (s: IndustryScenario) => {
    const platform = erpToPlatform(s.erp_system, s.product);
    const scriptOpt = AUTOMATION_SCRIPT_OPTIONS.find((o) => o.value === scriptType);
    const prose =
      `[${s.scenario_id}] ${s.e2e_scenario_name}\n\n` +
      `Industry: ${s.industry}\n` +
      `Product: ${s.product} (${s.erp_system})\n` +
      (s.modules.length ? `Modules: ${s.modules.join(", ")}\n` : "") +
      (s.data_sources.length ? `Data sources: ${s.data_sources.join(", ")}\n` : "") +
      `Test type: ${s.test_type}\n` +
      `Priority: ${s.priority}\n` +
      `Auto-feasibility: ${s.auto_feasibility}\n` +
      (scriptOpt ? `Preferred script type: ${scriptOpt.label} (${scriptOpt.language})\n` : "") +
      (s.integration_hint ? `\nIntegration hint: ${s.integration_hint}\n` : "") +
      `\nBusiness description:\n${s.business_description}`;

    // Stash the full row so the generator can hydrate without re-fetching.
    try {
      sessionStorage.setItem(
        `prefill:${platform}:${s.scenario_id}`,
        JSON.stringify({
          row: {
            "Test Case ID": s.scenario_id,
            "Test Scenario": s.e2e_scenario_name,
            Module: s.modules.join(", "),
            Industry: s.industry,
            Priority: s.priority,
            "Test Type": s.test_type,
            Preconditions: s.integration_hint,
            Steps: s.business_description,
            "Expected Result": "End-to-end flow completes without functional or data errors.",
          },
          platformLabel: s.erp_system || s.product,
          moduleLabel: s.product,
          /** Hint passed through to the generator for hybrid prefill. */
          prose,
          industry: s.industry,
          scriptType,
        }),
      );
    } catch {
      // sessionStorage unavailable — fall back to query string only.
    }

    toast.success(`Loading ${s.scenario_id} into the generator…`);
    navigate(
      `/?platform=${encodeURIComponent(platform)}&prefill=${encodeURIComponent(s.scenario_id)}&industry=${encodeURIComponent(meta.slug)}&script=${encodeURIComponent(scriptType)}`,
    );
  };

  const downloadIndustryJson = () => {
    const blob = new Blob([JSON.stringify(scenarios, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meta.slug}-scenarios.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadIndustryCsv = () => {
    const headers = [
      "scenario_id",
      "industry",
      "erp_system",
      "product",
      "e2e_scenario_name",
      "modules",
      "data_sources",
      "priority",
      "test_type",
      "auto_feasibility",
      "integration_hint",
      "business_description",
    ];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = scenarios.map((s) =>
      [
        s.scenario_id,
        s.industry,
        s.erp_system,
        s.product,
        s.e2e_scenario_name,
        s.modules.join(" | "),
        s.data_sources.join(" | "),
        s.priority,
        s.test_type,
        s.auto_feasibility,
        s.integration_hint,
        s.business_description,
      ]
        .map((v) => escape(String(v ?? "")))
        .join(","),
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meta.slug}-scenarios.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <SeoHead
        title={`${meta.name} test scenarios · Enterprise Test Repository`}
        description={`${scenarios.length.toLocaleString()} E2E scenarios for ${meta.name}: ${meta.blurb}`}
        canonical={`/industries/${meta.slug}`}
      />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
        <Link
          to="/industries"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3 h-3" /> Back to industries
        </Link>

        <header
          className={`rounded-xl border-2 bg-gradient-to-br ${ACCENT_BG[meta.accent]} p-5 flex items-start gap-4`}
        >
          <div className="text-4xl leading-none" aria-hidden>
            {meta.glyph}
          </div>
          <div className="min-w-0 flex-1">
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {meta.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{meta.blurb}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Stat label="Scenarios" value={scenarios.length.toLocaleString()} />
              <Stat label="High priority" value={totals.high.toLocaleString()} />
              <Stat label="Auto-ready" value={totals.auto.toLocaleString()} />
              <Stat label="Integration coverage" value={totals.integrationCovered.toLocaleString()} />
              <Stat label="Products" value={(products.length - 1).toString()} />
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <Card className="p-4 bg-card border-border space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,180px,160px,200px] gap-2 items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ID, scenario, module…"
                className="pl-9 bg-background"
                aria-label="Search scenarios"
              />
            </div>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="h-9 rounded-md bg-background border border-border px-2 text-sm"
              aria-label="Filter by product"
            >
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-9 rounded-md bg-background border border-border px-2 text-sm"
              aria-label="Filter by priority"
            >
              {["All", "High", "Medium", "Low"].map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "All priorities" : p}
                </option>
              ))}
            </select>
            <select
              value={scriptType}
              onChange={(e) => setScriptType(e.target.value)}
              className="h-9 rounded-md bg-background border border-border px-2 text-sm"
              aria-label="Preferred automation script"
            >
              {AUTOMATION_SCRIPT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="text-xs text-muted-foreground">
              Showing <span className="text-foreground font-mono">{filtered.length.toLocaleString()}</span> of{" "}
              <span className="text-foreground font-mono">{scenarios.length.toLocaleString()}</span> scenarios
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={downloadIndustryCsv} className="gap-1.5">
                <Download className="w-3.5 h-3.5" /> Industry CSV
              </Button>
              <Button variant="outline" size="sm" onClick={downloadIndustryJson} className="gap-1.5">
                <Download className="w-3.5 h-3.5" /> Industry JSON
              </Button>
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground text-sm gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading {meta.name} scenarios…
          </div>
        ) : (
          <Card className="bg-card border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">ID</TableHead>
                    <TableHead>Scenario</TableHead>
                    <TableHead className="hidden md:table-cell">Product / ERP</TableHead>
                    <TableHead className="hidden lg:table-cell">Modules</TableHead>
                    <TableHead className="w-[100px]">Priority</TableHead>
                    <TableHead className="w-[110px]">Auto-feas.</TableHead>
                    <TableHead className="w-[120px] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.slice(0, 500).map((s) => (
                    <TableRow key={s.scenario_id}>
                      <TableCell className="font-mono text-xs">
                        <Link
                          to={`/t/${encodeURIComponent(s.scenario_id)}`}
                          className="text-primary hover:underline"
                        >
                          {s.scenario_id}
                        </Link>
                      </TableCell>
                      <TableCell className="max-w-[360px]">
                        <div className="text-sm text-foreground line-clamp-1" title={s.e2e_scenario_name}>
                          {s.e2e_scenario_name}
                        </div>
                        <div className="text-[11px] text-muted-foreground line-clamp-1" title={s.business_description}>
                          {s.business_description}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-xs text-foreground">{s.product}</div>
                        <div className="text-[10px] text-muted-foreground">{s.erp_system}</div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {s.modules.slice(0, 4).map((m) => (
                            <span
                              key={m}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground"
                            >
                              {m}
                            </span>
                          ))}
                          {s.modules.length > 4 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{s.modules.length - 4}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={PRIORITY_CLS[s.priority] ?? ""}>
                          {s.priority || "—"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={AUTO_CLS[s.auto_feasibility] ?? ""}>
                          {s.auto_feasibility || "—"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" onClick={() => handleGenerate(s)} className="gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Generate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filtered.length > 500 && (
              <div className="p-3 text-[11px] text-muted-foreground text-center border-t border-border">
                Showing first 500 — refine filters to narrow further.
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md bg-background/40 border border-border/60 px-3 py-1.5">
    <span className="text-sm font-bold text-foreground">{value}</span>
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider ml-1.5">
      {label}
    </span>
  </div>
);

export default IndustryDetail;
