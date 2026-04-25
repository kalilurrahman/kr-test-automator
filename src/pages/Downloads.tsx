import { useState, useMemo } from "react";
import { Download, FileText, FileSpreadsheet, FileJson, FileCode, FileArchive, Search } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Format = "XLSX" | "CSV" | "JSON" | "TS" | "HTML" | "ZIP";
type Category = "Strict E2E" | "Working set" | "Stats & summary" | "Reference";

interface DownloadEntry {
  href: string;
  label: string;
  format: Format;
  size?: string;
  category: Category;
  blurb: string;
}

const FORMAT_ICON: Record<Format, typeof FileText> = {
  XLSX: FileSpreadsheet,
  CSV: FileSpreadsheet,
  JSON: FileJson,
  TS: FileCode,
  HTML: FileText,
  ZIP: FileArchive,
};

const DOWNLOADS: DownloadEntry[] = [
  // ── Strict E2E master (primary) ─────────────────────────────────────────
  {
    href: "/data/unified_strict_e2e_final.xlsx",
    label: "Unified Strict E2E master",
    format: "XLSX",
    size: "738 KB",
    category: "Strict E2E",
    blurb: "Validated 12k strict E2E set — ≥3 stages, ≥2 systems, downstream outcome.",
  },

  // ── Incremental strict E2E batches ───────────────────────────────────────
  {
    href: "/data/master_batches_36_50.xlsx",
    label: "Master batches B36-B50",
    format: "XLSX",
    size: "1.1 MB",
    category: "Strict E2E",
    blurb: "Latest 15k strict incremental industry E2E scenarios, deduplicated into the main industry library.",
  },
  {
    href: "/data/master_batches_36_50.csv",
    label: "Master batches B36-B50",
    format: "CSV",
    size: "7.1 MB",
    category: "Strict E2E",
    blurb: "CSV source for batches 36 through 50 with product and industry lineage fields in the consolidated dataset.",
  },
  {
    href: "/data/master_batches_36_50.json",
    label: "Master batches B36-B50",
    format: "JSON",
    size: "13.1 MB",
    category: "Strict E2E",
    blurb: "Raw JSON upload for the latest strict incremental B36-B50 package.",
  },
  {
    href: "/data/batches_21_35_combined_incremental.xlsx",
    label: "Incremental batches B21-B35",
    format: "XLSX",
    category: "Strict E2E",
    blurb: "Previous 15k strict incremental industry E2E batch package retained for lineage and reference.",
  },
  {
    href: "/data/unified_strict_e2e_final.csv",
    label: "Unified Strict E2E master",
    format: "CSV",
    size: "5.2 MB",
    category: "Strict E2E",
    blurb: "Same strict 12k set in CSV for spreadsheet imports.",
  },
  {
    href: "/data/unified_strict_e2e_final.json",
    label: "Unified Strict E2E master",
    format: "JSON",
    size: "8.7 MB",
    category: "Strict E2E",
    blurb: "Full strict E2E payload as raw JSON — feeds the in-app loader.",
  },
  {
    href: "/data/unified_strict_e2e_final.ts",
    label: "Unified Strict E2E master",
    format: "TS",
    category: "Strict E2E",
    blurb: "TypeScript module export of the strict E2E master — drop into a build.",
  },
  {
    href: "/data/unified_strict_e2e_final.html",
    label: "Unified Strict E2E master",
    format: "HTML",
    category: "Strict E2E",
    blurb: "Static HTML report for offline browsing of the strict E2E master.",
  },

  // ── Working set (pre-strict 9.5k) ────────────────────────────────────────
  {
    href: "/data/unified_master_current.xlsx",
    label: "v3 Working set (pre-strict)",
    format: "XLSX",
    category: "Working set",
    blurb: "Original 9.5k industry library before strict-E2E filtering — kept for traceability.",
  },
  {
    href: "/data/unified_master_current.csv",
    label: "v3 Working set (pre-strict)",
    format: "CSV",
    category: "Working set",
    blurb: "CSV mirror of the v3 working set.",
  },

  // ── Stats & summary ──────────────────────────────────────────────────────
  {
    href: "/data/industry_stats.json",
    label: "Industry totals",
    format: "JSON",
    category: "Stats & summary",
    blurb: "Per-industry totals (E2E / strict / v3 / high / auto-ready / products).",
  },
  {
    href: "/data/unified_master_current_stats.json",
    label: "Working set stats",
    format: "JSON",
    category: "Stats & summary",
    blurb: "Aggregated counts for the pre-strict v3 working set.",
  },
  {
    href: "/data/e2e_master_summary.csv",
    label: "E2E summary",
    format: "CSV",
    category: "Stats & summary",
    blurb: "Industry × scenario count summary as CSV.",
  },
];

type SortKey = "category" | "label" | "format";

const Downloads = () => {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [formatFilter, setFormatFilter] = useState<Format | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("category");

  const categories = useMemo<Category[]>(
    () => Array.from(new Set(DOWNLOADS.map((d) => d.category))) as Category[],
    [],
  );
  const formats = useMemo<Format[]>(
    () => Array.from(new Set(DOWNLOADS.map((d) => d.format))) as Format[],
    [],
  );

  const filtered = useMemo<DownloadEntry[]>(() => {
    const q = query.trim().toLowerCase();
    let list = DOWNLOADS.filter((d) => {
      if (categoryFilter !== "all" && d.category !== categoryFilter) return false;
      if (formatFilter !== "all" && d.format !== formatFilter) return false;
      if (!q) return true;
      return (
        d.label.toLowerCase().includes(q) ||
        d.blurb.toLowerCase().includes(q) ||
        d.format.toLowerCase().includes(q)
      );
    });
    if (sortKey === "label") list = [...list].sort((a, b) => a.label.localeCompare(b.label));
    else if (sortKey === "format") list = [...list].sort((a, b) => a.format.localeCompare(b.format));
    return list;
  }, [query, categoryFilter, formatFilter, sortKey]);

  const grouped = useMemo(() => {
    if (sortKey !== "category") return null;
    return categories
      .map((cat) => ({ category: cat, items: filtered.filter((d) => d.category === cat) }))
      .filter((b) => b.items.length > 0);
  }, [filtered, sortKey, categories]);

  return (
    <>
      <SeoHead
        title="Downloads · TestForge AI"
        description="Download the unified strict E2E master, the v3 working set, stats and summary CSVs in XLSX, CSV, JSON, TS and HTML."
        canonical="/downloads"
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <header className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Downloads
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Export the strict-E2E master, the v3 working set and supporting stats.
              Use the filters to narrow by category and format.
            </p>
          </div>
        </header>

        {/* Controls */}
        <Card className="p-3 sm:p-4 bg-card border-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search downloads…"
                className="pl-9 bg-background"
                aria-label="Search downloads"
              />
            </div>
            <div className="md:col-span-3">
              <Select
                value={categoryFilter}
                onValueChange={(v) => setCategoryFilter(v as Category | "all")}
              >
                <SelectTrigger aria-label="Filter by category">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Select
                value={formatFilter}
                onValueChange={(v) => setFormatFilter(v as Format | "all")}
              >
                <SelectTrigger aria-label="Filter by format">
                  <SelectValue placeholder="All formats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All formats</SelectItem>
                  {formats.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                <SelectTrigger aria-label="Sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Group by category</SelectItem>
                  <SelectItem value="label">Sort by name</SelectItem>
                  <SelectItem value="format">Sort by format</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground mt-2 font-mono">
            {filtered.length} of {DOWNLOADS.length} files
          </div>
        </Card>

        {grouped ? (
          <div className="space-y-6">
            {grouped.map((bucket) => (
              <section key={bucket.category}>
                <h2
                  className="text-lg font-semibold text-foreground mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {bucket.category}
                </h2>
                <DownloadGrid items={bucket.items} />
              </section>
            ))}
          </div>
        ) : (
          <DownloadGrid items={filtered} />
        )}
      </div>
    </>
  );
};

const DownloadGrid = ({ items }: { items: DownloadEntry[] }) => {
  if (items.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground bg-card border-border">
        No downloads match your filters.
      </Card>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {items.map((d) => {
        const Icon = FORMAT_ICON[d.format];
        return (
          <Card key={`${d.label}-${d.format}`} className="p-4 bg-card border-border flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-foreground leading-tight truncate"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  title={d.label}
                >
                  {d.label}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {d.format}
                  </Badge>
                  {d.size && (
                    <span className="text-[10px] text-muted-foreground font-mono">{d.size}</span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex-1">{d.blurb}</p>
            <Button asChild variant="default" size="sm" className="gap-1.5">
              <a href={d.href} download>
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default Downloads;
