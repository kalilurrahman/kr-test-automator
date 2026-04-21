import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Wand2, X, Loader2, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { getCachedCsv } from "@/lib/csvCache";
import type { PlatformDef, PlatformModule } from "@/data/platformManifests";

const PAGE_SIZE = 25;

const PRIORITY_FIELDS = ["Priority", "priority"];
const ID_FIELDS = ["Test Case ID", "id", "ID", "Case ID"];
const SCENARIO_FIELDS = ["Test Scenario", "scenario", "Scenario"];
const MODULE_FIELDS = ["Module", "module", "Domain"];
const STEPS_FIELDS = ["Steps", "steps"];
const EXPECTED_FIELDS = ["Expected Result", "expected", "Expected"];
const TYPE_FIELDS = ["Test Type", "type", "Type"];

const pick = (row: Record<string, string>, fields: string[]) => {
  for (const f of fields) if (row[f]) return row[f];
  return "";
};

const priorityTone = (p: string) => {
  const lower = p.toLowerCase();
  if (lower === "high" || lower === "critical")
    return "bg-destructive/15 text-destructive border-destructive/30";
  if (lower === "medium")
    return "bg-primary/15 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
};

interface Props {
  platform: PlatformDef;
  selectedModule: PlatformModule;
  onSelectModule: (mod: PlatformModule) => void;
}

export function PlatformRepository({ platform, selectedModule, onSelectModule }: Props) {
  const navigate = useNavigate();
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [page, setPage] = useState(0);
  const [drawer, setDrawer] = useState<Record<string, string> | null>(null);

  const csvUrl = `${platform.publicBase}/${selectedModule.folder}/${selectedModule.prefix}.csv`;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setRows([]);
    setHeaders([]);
    setPage(0);
    setSearch("");
    setModuleFilter("All");
    setPriorityFilter("All");

    getCachedCsv(csvUrl)
      .then((parsed) => {
        if (cancelled) return;
        if (!parsed) {
          setError(`Could not load ${csvUrl}`);
          return;
        }
        setHeaders(parsed.headers);
        setRows(parsed.rows);
      })
      .catch((e) => !cancelled && setError(String(e?.message ?? e)))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [csvUrl]);

  const subModules = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      const v = pick(r, MODULE_FIELDS);
      if (v) set.add(v);
    });
    return ["All", ...Array.from(set).sort()];
  }, [rows]);

  const priorities = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      const v = pick(r, PRIORITY_FIELDS);
      if (v) set.add(v);
    });
    return ["All", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const mod = pick(r, MODULE_FIELDS);
      const pr = pick(r, PRIORITY_FIELDS);
      if (moduleFilter !== "All" && mod !== moduleFilter) return false;
      if (priorityFilter !== "All" && pr !== priorityFilter) return false;
      if (!q) return true;
      return Object.values(r).some((v) => v.toLowerCase().includes(q));
    });
  }, [rows, search, moduleFilter, priorityFilter]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const view = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const sendToGenerator = (r: Record<string, string>) => {
    const id = pick(r, ID_FIELDS) || `${platform.idPrefix}-${Date.now()}`;
    // Stash full row so Index.tsx can prefill without re-fetching the CSV.
    try {
      sessionStorage.setItem(
        `prefill:${platform.id}:${id}`,
        JSON.stringify({ row: r, platformLabel: platform.label, moduleLabel: selectedModule.label }),
      );
    } catch {
      // sessionStorage may be unavailable (private mode) — Index.tsx will fall back.
    }
    const params = new URLSearchParams({ platform: platform.id, prefill: id });
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
      {/* Module selector */}
      <div className="rounded-xl border border-border bg-card p-3 flex flex-wrap gap-2">
        {platform.modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onSelectModule(mod)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
              mod.id === selectedModule.id
                ? "bg-primary/15 text-primary border-primary/40"
                : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
            }`}
          >
            {mod.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="rounded-xl border border-border bg-card p-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search ID, scenario, module, steps…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="pl-9 bg-background"
            />
          </div>
          <a href={csvUrl} download className="inline-flex">
            <Button variant="outline" size="sm" className="h-10">
              <Download className="w-4 h-4 mr-1.5" /> CSV
            </Button>
          </a>
          <a href={csvUrl.replace(".csv", ".xlsx")} download className="inline-flex">
            <Button variant="outline" size="sm" className="h-10">
              <Download className="w-4 h-4 mr-1.5" /> XLSX
            </Button>
          </a>
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs">
          {subModules.length > 2 && (
            <select
              value={moduleFilter}
              onChange={(e) => { setModuleFilter(e.target.value); setPage(0); }}
              className="h-8 px-2 rounded border border-border bg-background text-foreground"
            >
              {subModules.map((m) => (
                <option key={m} value={m}>{m === "All" ? "All modules" : m}</option>
              ))}
            </select>
          )}
          {priorities.length > 2 && (
            <select
              value={priorityFilter}
              onChange={(e) => { setPriorityFilter(e.target.value); setPage(0); }}
              className="h-8 px-2 rounded border border-border bg-background text-foreground"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p === "All" ? "All priorities" : p}</option>
              ))}
            </select>
          )}
          <span className="text-muted-foreground ml-auto">
            {loading ? "Loading…" : `${filtered.length.toLocaleString()} of ${rows.length.toLocaleString()} cases`}
          </span>
          {filtersActive && (
            <Button variant="ghost" size="sm" onClick={reset} className="h-7 text-xs">
              <X className="w-3 h-3 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading {selectedModule.label}…
          </div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-destructive">
            Could not load <code className="font-mono">{csvUrl}</code> — {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No matching cases. Try clearing filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">ID</TableHead>
                  <TableHead className="min-w-[120px]">Module</TableHead>
                  <TableHead>Scenario</TableHead>
                  <TableHead className="w-[110px]">Type</TableHead>
                  <TableHead className="w-[100px]">Priority</TableHead>
                  <TableHead className="w-[110px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {view.map((r, i) => {
                  const id = pick(r, ID_FIELDS);
                  const mod = pick(r, MODULE_FIELDS);
                  const scen = pick(r, SCENARIO_FIELDS);
                  const tp = pick(r, TYPE_FIELDS);
                  const pr = pick(r, PRIORITY_FIELDS);
                  return (
                    <TableRow
                      key={`${id}-${i}`}
                      className="cursor-pointer"
                      onClick={() => setDrawer(r)}
                    >
                      <TableCell className="font-mono text-xs">{id}</TableCell>
                      <TableCell className="text-xs">{mod}</TableCell>
                      <TableCell className="text-xs">{scen}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{tp}</TableCell>
                      <TableCell>
                        {pr && (
                          <Badge variant="outline" className={`text-[10px] uppercase tracking-wide ${priorityTone(pr)}`}>
                            {pr}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs"
                          onClick={(e) => { e.stopPropagation(); sendToGenerator(r); }}
                        >
                          <Wand2 className="w-3 h-3 mr-1" /> Generate
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted-foreground">
            <span>Page {safePage + 1} of {pages}</span>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={safePage >= pages - 1}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <Sheet open={!!drawer} onOpenChange={(o) => !o && setDrawer(null)}>
        <SheetContent className="bg-card border-border w-full sm:max-w-xl overflow-y-auto">
          {drawer && (
            <>
              <SheetHeader>
                <SheetTitle className="font-mono text-base">{pick(drawer, ID_FIELDS)}</SheetTitle>
                <SheetDescription>{pick(drawer, SCENARIO_FIELDS)}</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4 text-sm">
                {Object.entries(drawer).map(([k, v]) => (
                  v ? (
                    <div key={k}>
                      <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{k}</div>
                      <div className="whitespace-pre-wrap text-foreground/90">{v}</div>
                    </div>
                  ) : null
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border flex gap-2">
                <Button size="sm" onClick={() => sendToGenerator(drawer)}>
                  <Wand2 className="w-4 h-4 mr-1.5" /> Send to generator
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
