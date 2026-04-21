// Global search across the entire indexed catalogue. Filter by source +
// priority + free-text. Each row deep-links to /t/:id.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getGlobalIndex, type IndexedCase } from "@/lib/globalIndex";

const PAGE_SIZE = 25;

const priorityTone = (p: string) => {
  const lower = (p || "").toLowerCase();
  if (lower === "high" || lower === "critical")
    return "bg-destructive/15 text-destructive border-destructive/30";
  if (lower === "medium") return "bg-primary/15 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
};

export function GlobalCaseBrowser() {
  const [cases, setCases] = useState<IndexedCase[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [source, setSource] = useState("All");
  const [priority, setPriority] = useState("All");
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getGlobalIndex()
      .then((idx) => !cancelled && setCases(idx.cases))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  const sources = useMemo(() => {
    if (!cases) return ["All"];
    const set = new Set<string>();
    cases.forEach((c) => set.add(c.sourceLabel));
    return ["All", ...Array.from(set).sort()];
  }, [cases]);

  const priorities = useMemo(() => {
    if (!cases) return ["All"];
    const set = new Set<string>();
    cases.forEach((c) => c.priority && set.add(c.priority));
    return ["All", ...Array.from(set).sort()];
  }, [cases]);

  const filtered = useMemo(() => {
    if (!cases) return [];
    const needle = q.trim().toLowerCase();
    return cases.filter((c) => {
      if (source !== "All" && c.sourceLabel !== source) return false;
      if (priority !== "All" && c.priority !== priority) return false;
      if (!needle) return true;
      return (
        c.id.toLowerCase().includes(needle) ||
        (c.scenario || "").toLowerCase().includes(needle) ||
        (c.module || "").toLowerCase().includes(needle) ||
        (c.testType || "").toLowerCase().includes(needle)
      );
    });
  }, [cases, q, source, priority]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const view = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const filtersActive = q || source !== "All" || priority !== "All";
  const reset = () => { setQ(""); setSource("All"); setPriority("All"); setPage(0); };

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 flex items-center justify-center text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Building global index…
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-card p-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(0); }}
              placeholder="Search across every product — ID, scenario, module, test type"
              className="pl-9 bg-background"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <select
            value={source}
            onChange={(e) => { setSource(e.target.value); setPage(0); }}
            className="h-8 px-2 rounded border border-border bg-background text-foreground"
          >
            {sources.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All products" : s}</option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(e) => { setPriority(e.target.value); setPage(0); }}
            className="h-8 px-2 rounded border border-border bg-background text-foreground"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{p === "All" ? "All priorities" : p}</option>
            ))}
          </select>
          <span className="text-muted-foreground ml-auto">
            {filtered.length.toLocaleString()} of {(cases?.length ?? 0).toLocaleString()} unique cases
          </span>
          {filtersActive && (
            <Button variant="ghost" size="sm" onClick={reset} className="h-7 text-xs">
              <X className="w-3 h-3 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {view.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No matching cases. Try clearing filters.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {view.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/t/${encodeURIComponent(c.id)}`}
                  className="flex items-start gap-3 px-3 py-2.5 hover:bg-muted/30 transition-colors"
                >
                  <span className="font-mono text-xs text-primary w-32 shrink-0 truncate" title={c.id}>{c.id}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">{c.scenario || c.id}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex flex-wrap gap-2">
                      <span>{c.sourceLabel}</span>
                      {c.module && <span>· {c.module}</span>}
                      {c.testType && <span>· {c.testType}</span>}
                    </div>
                  </div>
                  {c.priority && (
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-wide shrink-0 ${priorityTone(c.priority)}`}>
                      {c.priority}
                    </Badge>
                  )}
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted-foreground">
            <span>Page {safePage + 1} of {pages}</span>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0}>
                Prev
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={safePage >= pages - 1}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
