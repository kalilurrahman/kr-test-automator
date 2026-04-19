import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Wand2, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  SALESFORCE_CLOUDS, getCloud, parseCSV, rowsToObjects,
  type SalesforceCloudId, type SalesforceTestRow,
} from "@/data/salesforceClouds";

const PAGE_SIZE = 25;

const priorityTone = (p: string) => {
  const lower = p.toLowerCase();
  if (lower === "high" || lower === "critical")
    return "bg-destructive/15 text-destructive border-destructive/30";
  if (lower === "medium")
    return "bg-primary/15 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
};

interface Props {
  selectedCloud: SalesforceCloudId;
  onSelectCloud: (id: SalesforceCloudId) => void;
}

export function SalesforceRepository({ selectedCloud, onSelectCloud }: Props) {
  const navigate = useNavigate();
  const [rows, setRows] = useState<SalesforceTestRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [page, setPage] = useState(0);
  const [drawer, setDrawer] = useState<SalesforceTestRow | null>(null);

  const cloud = getCloud(selectedCloud);

  useEffect(() => {
    if (!cloud) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setRows([]);
    setPage(0);
    setModuleFilter("All");
    setPriorityFilter("All");

    fetch(cloud.csv)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        const parsed = rowsToObjects(parseCSV(text));
        setRows(parsed);
      })
      .catch((e) => !cancelled && setError(String(e?.message ?? e)))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [cloud?.csv]);

  const modules = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.module && set.add(r.module));
    return ["All", ...Array.from(set).sort()];
  }, [rows]);

  const priorities = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.priority && set.add(r.priority));
    return ["All", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (moduleFilter !== "All" && r.module !== moduleFilter) return false;
      if (priorityFilter !== "All" && r.priority !== priorityFilter) return false;
      if (!q) return true;
      return (
        r.id.toLowerCase().includes(q) ||
        r.scenario.toLowerCase().includes(q) ||
        r.module.toLowerCase().includes(q) ||
        r.domain.toLowerCase().includes(q) ||
        r.steps.toLowerCase().includes(q)
      );
    });
  }, [rows, search, moduleFilter, priorityFilter]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const view = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const useInGenerator = (r: SalesforceTestRow) => {
    const params = new URLSearchParams({ platform: "salesforce", prefill: r.id });
    navigate(`/?${params.toString()}`);
  };

  const filtersActive = search || moduleFilter !== "All" || priorityFilter !== "All";
  const reset = () => {
    setSearch("");
    setModuleFilter("All");
    setPriorityFilter("All");
    setPage(0);
  };

  return (
    <div className="space-y-4">
      {/* Cloud selector */}
      <div className="rounded-xl border border-border bg-card p-3 flex flex-wrap gap-2">
        {SALESFORCE_CLOUDS.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCloud(c.id)}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              selectedCloud === c.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            {c.shortName}
            <span className="ml-1.5 opacity-60">({c.cases.toLocaleString()})</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search ID, scenario, module, domain, steps…"
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <select
            value={moduleFilter}
            onChange={(e) => { setModuleFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            aria-label="Module"
          >
            {modules.map((m) => (
              <option key={m} value={m}>{m === "All" ? "All modules" : m}</option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => { setPriorityFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            aria-label="Priority"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{p === "All" ? "All priorities" : p}</option>
            ))}
          </select>
          <div className="flex items-center justify-end gap-2">
            {filtersActive && (
              <Button variant="ghost" size="sm" onClick={reset} className="h-9 text-xs">
                <X className="w-3 h-3 mr-1" /> Reset
              </Button>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {loading
            ? "Loading repository…"
            : `Showing ${filtered.length.toLocaleString()} of ${rows.length.toLocaleString()} cases`}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center text-muted-foreground gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading {cloud?.name}…
          </div>
        ) : error ? (
          <div className="py-12 text-center text-sm text-destructive px-4">
            Failed to load CSV: {error}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                <TableHead>ID</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Scenario</TableHead>
                <TableHead className="hidden md:table-cell">Domain</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {view.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                    No cases match your filters.
                  </TableCell>
                </TableRow>
              ) : view.map((r) => (
                <TableRow
                  key={r.id}
                  className="cursor-pointer"
                  onClick={() => setDrawer(r)}
                >
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">{r.module}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-foreground line-clamp-2">{r.scenario}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{r.domain}</TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{r.testType}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${priorityTone(r.priority)}`}>
                      {r.priority || "—"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2"
                      onClick={(e) => { e.stopPropagation(); useInGenerator(r); }}
                      title="Send to generator"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!loading && pages > 1 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Page {safePage + 1} of {pages}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={safePage >= pages - 1} onClick={() => setPage(safePage + 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Drawer */}
      <Sheet open={!!drawer} onOpenChange={(o) => !o && setDrawer(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-card border-border">
          {drawer && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="font-mono text-[10px]">{drawer.id}</Badge>
                  <Badge variant="outline" className="font-mono text-[10px]">{drawer.module}</Badge>
                  <Badge variant="outline" className={`text-[10px] ${priorityTone(drawer.priority)}`}>
                    {drawer.priority || "—"}
                  </Badge>
                </div>
                <SheetTitle className="text-left mt-2">{drawer.scenario}</SheetTitle>
                <SheetDescription className="text-left">{drawer.cloud} · {drawer.domain}</SheetDescription>
              </SheetHeader>

              <div className="space-y-4 mt-6 text-sm">
                {drawer.e2eFlow && <Section label="E2E flow">{drawer.e2eFlow}</Section>}
                <Section label="Test type">{drawer.testType}</Section>
                <Section label="Pre-conditions">{drawer.preconditions}</Section>
                <Section label="Steps">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {drawer.steps.replace(/\\n/g, "\n")}
                  </pre>
                </Section>
                <Section label="Expected result">{drawer.expected}</Section>

                <Button onClick={() => useInGenerator(drawer)} className="w-full gap-2">
                  <Wand2 className="w-4 h-4" /> Send to script generator
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{label}</div>
      <div className="text-foreground">{children}</div>
    </div>
  );
}
