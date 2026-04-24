import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, Sparkles, Factory, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SeoHead from "@/components/SeoHead";
import { ACCENT_BG } from "@/data/industryMeta";
import { getIndustryIndex, type IndustryIndex } from "@/data/industryScenarios";
import {
  buildDomainBuckets,
  type DomainBucket,
} from "@/data/industryDomains";

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

  const buckets = useMemo<DomainBucket[]>(() => {
    if (!index) return [];
    return buildDomainBuckets(index.scenarios);
  }, [index]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return buckets;
    return buckets
      .map((b) => ({
        ...b,
        subIndustries: b.subIndustries.filter(
          (s) => s.name.toLowerCase().includes(q) || b.name.toLowerCase().includes(q),
        ),
      }))
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.blurb.toLowerCase().includes(q) ||
          b.subIndustries.length > 0,
      );
  }, [buckets, query]);

  const totals = index?.totals;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <SeoHead
        title="Industries · E2E Test Repository"
        description={`Browse ${(totals?.scenarios ?? 36500).toLocaleString()} E2E test scenarios grouped under parent industry domains.`}
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
              Industry Domains
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {totals
                ? `${totals.scenarios.toLocaleString()} unique E2E scenarios grouped under ${buckets.length} parent industry domains (rolled up from ${totals.industries} fine-grained sub-domains).`
                : "Loading industry-grounded scenario library…"}
            </p>
          </div>
        </header>

        {/* Headline metrics */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard label="Parent domains" value={buckets.length || "—"} />
          <MetricCard label="Sub-domains" value={totals?.industries ?? "—"} />
          <MetricCard
            label="E2E scenarios"
            value={totals?.scenarios.toLocaleString() ?? "—"}
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
              Filter domains and sub-industries
            </h2>
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Pharma, ICU, Banking, Telecom, IoT…"
            className="bg-background"
            aria-label="Filter industries"
          />
        </Card>

        {loading && !index && (
          <div className="flex items-center justify-center py-20 text-muted-foreground text-sm gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading scenarios…
          </div>
        )}

        {/* Parent-domain tile grid */}
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
                    className="text-lg font-semibold text-foreground leading-tight"
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

              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <Pill label="Scenarios" value={row.total.toLocaleString()} />
                <Pill label="High prio" value={row.high.toLocaleString()} />
                <Pill label="Auto-ready" value={row.autoReady.toLocaleString()} />
              </div>

              {row.subIndustries.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {row.subIndustries.length} sub-industries
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {row.subIndustries.slice(0, 6).map((s) => (
                      <Badge
                        key={s.name}
                        variant="outline"
                        className="text-[10px] font-normal bg-background/40 border-border/50"
                      >
                        {s.name}
                        <span className="ml-1 text-muted-foreground">
                          {s.total}
                        </span>
                      </Badge>
                    ))}
                    {row.subIndustries.length > 6 && (
                      <Badge
                        variant="outline"
                        className="text-[10px] font-normal bg-background/40 border-border/50"
                      >
                        +{row.subIndustries.length - 6}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </Link>
          ))}
          {filtered.length === 0 && !loading && (
            <Card className="col-span-full p-8 text-center text-muted-foreground text-sm">
              No domains match your filter.
            </Card>
          )}
        </section>

        {/* Bulk export */}
        {totals && (
          <Card className="p-4 bg-card border-border space-y-3">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <div className="text-sm text-foreground">
                <span className="font-semibold">Unified strict E2E master</span> —{" "}
                {totals.scenarios.toLocaleString()} validated scenarios across {totals.industries} fine-grained sub-domains.
                Each row spans 3+ business stages and 2+ systems with a downstream outcome.
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="default" size="sm">
                <a href="/data/unified_strict_e2e_final.xlsx" download>
                  XLSX · 738 KB
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/data/unified_strict_e2e_final.csv" download>
                  CSV · 5.2 MB
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/data/unified_strict_e2e_final.json" download>
                  JSON · 8.7 MB
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/data/unified_strict_e2e_final.ts" download>
                  TS module
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/data/industry_stats.json" download>
                  Stats JSON
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/data/e2e_master_summary.csv" download>
                  Summary CSV
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
