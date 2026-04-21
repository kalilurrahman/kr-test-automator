import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, Sparkles, Factory, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import {
  INDUSTRIES,
  ACCENT_BG,
  type IndustryMeta,
} from "@/data/industryMeta";
import { getIndustryIndex, type IndustryIndex } from "@/data/industryScenarios";

interface IndustryRow extends IndustryMeta {
  total: number;
  high: number;
  autoReady: number;
  products: number;
}

const Industries = () => {
  const [index, setIndex] = useState<IndustryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getIndustryIndex()
      .then((idx) => !cancelled && setIndex(idx))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo<IndustryRow[]>(() => {
    return INDUSTRIES.map((meta) => {
      const summary = index?.summaries.find((s) => s.industry === meta.name);
      return {
        ...meta,
        total: summary?.total ?? 0,
        high: summary?.high ?? 0,
        autoReady: summary?.autoReady ?? 0,
        products: summary?.products.length ?? 0,
      };
    }).sort((a, b) => b.total - a.total);
  }, [index]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) => r.name.toLowerCase().includes(q) || r.blurb.toLowerCase().includes(q),
    );
  }, [rows, query]);

  const totals = index?.totals;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <SeoHead
        title="Industries · Enterprise Test Repository"
        description="Browse 9,500 industry-grounded E2E test scenarios across 32 industries — Pharma, Banking, Manufacturing, Telecom and more."
        canonical="/industries"
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <header className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Factory className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Industries
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {totals
                ? `${totals.scenarios.toLocaleString()} unique E2E scenarios across ${totals.industries} industries and ${totals.products.toLocaleString()} products.`
                : "Loading industry-grounded scenario library…"}
            </p>
          </div>
        </header>

        {/* Headline metrics */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard label="Industries" value={totals?.industries ?? "—"} />
          <MetricCard label="E2E scenarios" value={totals?.scenarios.toLocaleString() ?? "—"} />
          <MetricCard
            label="High-priority %"
            value={
              totals && totals.scenarios > 0
                ? `${Math.round((totals.high / totals.scenarios) * 100)}%`
                : "—"
            }
          />
          <MetricCard
            label="Auto-ready %"
            value={
              totals && totals.scenarios > 0
                ? `${Math.round((totals.autoReady / totals.scenarios) * 100)}%`
                : "—"
            }
          />
        </section>

        {/* Filter */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Filter industries
            </h2>
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Pharma, Banking, Telecom, IoT…"
            className="bg-background"
            aria-label="Filter industries"
          />
        </Card>

        {loading && !index && (
          <div className="flex items-center justify-center py-20 text-muted-foreground text-sm gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading scenarios…
          </div>
        )}

        {/* Tile grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((row) => (
            <Link
              key={row.slug}
              to={`/industries/${row.slug}`}
              className={`block rounded-xl border-2 bg-gradient-to-br ${ACCENT_BG[row.accent]} p-5 transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl leading-none" aria-hidden>
                  {row.glyph}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-semibold text-foreground leading-tight truncate"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    title={row.name}
                  >
                    {row.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {row.blurb}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-2">
                <Pill label="Scenarios" value={row.total.toLocaleString()} />
                <Pill label="High prio" value={row.high.toLocaleString()} />
                <Pill label="Auto-ready" value={row.autoReady.toLocaleString()} />
              </div>
            </Link>
          ))}
          {filtered.length === 0 && !loading && (
            <Card className="col-span-full p-8 text-center text-muted-foreground text-sm">
              No industries match your filter.
            </Card>
          )}
        </section>

        {/* Bulk export */}
        {totals && (
          <Card className="p-4 bg-card border-border flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <div className="text-sm text-foreground">
                Download the full industry scenario library — every record across all 32 industries.
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <a href="/data/industry_scenarios.json" download>
                  JSON · 5.3 MB
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/data/industry_stats.json" download>
                  Stats JSON
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/" className="gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Open Generator
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
  <Card className="p-4 bg-card border-border min-w-0">
    <div
      className="font-bold text-foreground leading-tight break-words"
      style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
    >
      {value}
    </div>
    <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">
      {label}
    </div>
  </Card>
);

const Pill = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md bg-background/50 border border-border/60 py-1.5 px-2">
    <div className="text-sm font-bold text-foreground leading-none">{value}</div>
    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
      {label}
    </div>
  </div>
);

export default Industries;
