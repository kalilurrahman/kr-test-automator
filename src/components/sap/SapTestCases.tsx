import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Wand2, X } from "lucide-react";
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
  filterCases, MODULES, type TestCase, type Priority,
  type AutoFeasibility, type Industry, type SAPModule,
} from "@/data/sapTestCases";

const PAGE_SIZE = 25;

const priorityTone = (p: Priority) =>
  p === "High" ? "bg-destructive/15 text-destructive border-destructive/30"
  : p === "Medium" ? "bg-primary/15 text-primary border-primary/30"
  : "bg-muted text-muted-foreground border-border";

const autoTone = (a: AutoFeasibility) =>
  a === "High" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  : a === "Medium" ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
  : "bg-muted text-muted-foreground border-border";

type SortKey = "id" | "module" | "priority" | "autoFeasibility";

export function SapTestCases() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [module, setModule] = useState<SAPModule | "All">("All");
  const [industry, setIndustry] = useState<Industry | "All">("All");
  const [priority, setPriority] = useState<Priority | "All">("All");
  const [autoFeas, setAutoFeas] = useState<AutoFeasibility | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [drawer, setDrawer] = useState<TestCase | null>(null);

  const industries: Industry[] = [
    "All", "Banking", "Healthcare", "Manufacturing",
    "Oil & Gas", "Pharma", "Public Sector", "Retail", "Utilities",
  ];

  const filtered = useMemo(() => {
    const list = filterCases({
      module: module === "All" ? undefined : module,
      industry: industry === "All" ? undefined : industry,
      priority: priority === "All" ? undefined : priority,
      autoFeasibility: autoFeas === "All" ? undefined : autoFeas,
      search: search.trim() || undefined,
    });
    const order = { High: 0, Medium: 1, Low: 2 };
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "priority") cmp = order[a.priority] - order[b.priority];
      else if (sortKey === "autoFeasibility") cmp = order[a.autoFeasibility] - order[b.autoFeasibility];
      else cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [module, industry, priority, autoFeas, search, sortKey, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages - 1);
  const view = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
    setPage(0);
  };

  const useInGenerator = (tc: TestCase) => {
    const params = new URLSearchParams({
      platform: "sap",
      prefill: tc.id,
    });
    navigate(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearch(""); setModule("All"); setIndustry("All");
    setPriority("All"); setAutoFeas("All"); setPage(0);
  };

  const filtersActive = search || module !== "All" || industry !== "All" || priority !== "All" || autoFeas !== "All";

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search by ID, scenario, BAPI, sub-module, steps…"
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select
            value={module}
            onChange={(e) => { setModule(e.target.value as SAPModule | "All"); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            aria-label="Module"
          >
            <option value="All">All modules</option>
            {MODULES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={industry}
            onChange={(e) => { setIndustry(e.target.value as Industry | "All"); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            aria-label="Industry"
          >
            {industries.map((i) => <option key={i} value={i}>{i === "All" ? "All industries" : i}</option>)}
          </select>
          <select
            value={priority}
            onChange={(e) => { setPriority(e.target.value as Priority | "All"); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            aria-label="Priority"
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={autoFeas}
            onChange={(e) => { setAutoFeas(e.target.value as AutoFeasibility | "All"); setPage(0); }}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
            aria-label="Automation feasibility"
          >
            <option value="All">All automation</option>
            <option value="High">High auto-feas.</option>
            <option value="Medium">Medium auto-feas.</option>
            <option value="Low">Low auto-feas.</option>
          </select>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Showing <span className="text-foreground font-medium">{filtered.length}</span> case{filtered.length !== 1 && "s"}
          </span>
          {filtersActive && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs">
              <X className="w-3 h-3 mr-1" /> Reset
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead className="cursor-pointer" onClick={() => toggleSort("id")}>
                <span className="inline-flex items-center gap-1">ID <ArrowUpDown className="w-3 h-3" /></span>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("module")}>
                <span className="inline-flex items-center gap-1">Module <ArrowUpDown className="w-3 h-3" /></span>
              </TableHead>
              <TableHead>Scenario</TableHead>
              <TableHead className="hidden md:table-cell">Industry</TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("priority")}>
                <span className="inline-flex items-center gap-1">Priority <ArrowUpDown className="w-3 h-3" /></span>
              </TableHead>
              <TableHead className="hidden lg:table-cell cursor-pointer" onClick={() => toggleSort("autoFeasibility")}>
                <span className="inline-flex items-center gap-1">Auto <ArrowUpDown className="w-3 h-3" /></span>
              </TableHead>
              <TableHead className="text-right">Use</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {view.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                  No test cases match your filters.
                </TableCell>
              </TableRow>
            ) : view.map((tc) => (
              <TableRow
                key={tc.id}
                className="cursor-pointer"
                onClick={() => setDrawer(tc)}
              >
                <TableCell className="font-mono text-xs">{tc.id}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-[10px]">{tc.module}</Badge>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="text-sm text-foreground line-clamp-1">{tc.scenario}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1">{tc.testCase}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{tc.industry}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] ${priorityTone(tc.priority)}`}>{tc.priority}</Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline" className={`text-[10px] ${autoTone(tc.autoFeasibility)}`}>
                    {tc.autoFeasibility}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2"
                    onClick={(e) => { e.stopPropagation(); useInGenerator(tc); }}
                    title="Send to generator"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Page {safePage + 1} of {pages}
          </span>
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

      {/* Detail drawer */}
      <Sheet open={!!drawer} onOpenChange={(o) => !o && setDrawer(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-card border-border">
          {drawer && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px]">{drawer.id}</Badge>
                  <Badge variant="outline" className="font-mono text-[10px]">{drawer.module}</Badge>
                  <Badge variant="outline" className={`text-[10px] ${priorityTone(drawer.priority)}`}>{drawer.priority}</Badge>
                  <Badge variant="outline" className={`text-[10px] ${autoTone(drawer.autoFeasibility)}`}>
                    Auto: {drawer.autoFeasibility}
                  </Badge>
                </div>
                <SheetTitle className="text-left mt-2">{drawer.scenario}</SheetTitle>
                <SheetDescription className="text-left">{drawer.testCase}</SheetDescription>
              </SheetHeader>

              <div className="space-y-4 mt-6 text-sm">
                <Section label="Sub-module">{drawer.subModule}</Section>
                <Section label="Industry">{drawer.industry}</Section>
                <Section label="Test type">{drawer.testType}</Section>
                <Section label="Pre-conditions">{drawer.preCond}</Section>
                <Section label="Steps">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{drawer.steps}</pre>
                </Section>
                <Section label="Expected result">{drawer.expected}</Section>
                <Section label="BAPI / hint">
                  <code className="text-xs bg-secondary/60 px-2 py-1 rounded">{drawer.bapi}</code>
                </Section>

                <Button
                  onClick={() => useInGenerator(drawer)}
                  className="w-full gap-2"
                >
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
