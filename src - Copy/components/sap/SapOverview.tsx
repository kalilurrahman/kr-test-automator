import { Download, FileSpreadsheet, FileText, FileCode2, FileJson, Loader2 } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { exportAsJSON } from "@/data/sapTestCases";
import {
  loadAllSapCases,
  getMergedSapStats,
  getMergedAutomationCoverage,
  type SapMergedStats,
} from "@/data/sapCsvLoader";

const PRIORITY_COLORS: Record<string, string> = {
  High: "hsl(var(--destructive))",
  Medium: "hsl(var(--primary))",
  Low: "hsl(var(--muted-foreground))",
};

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function SapOverview() {
  const [stats, setStats] = useState<SapMergedStats | null>(null);
  const [coverage, setCoverage] = useState<Record<string, { total: number; high: number; pct: number }>>({});

  useEffect(() => {
    let alive = true;
    Promise.all([getMergedSapStats(), getMergedAutomationCoverage()]).then(
      ([s, c]) => { if (alive) { setStats(s); setCoverage(c); } },
    );
    return () => { alive = false; };
  }, []);

  const priorityData = useMemo(
    () => stats ? Object.entries(stats.byPriority).map(([name, value]) => ({ name, value })) : [],
    [stats],
  );
  const moduleData = useMemo(
    () => stats
      ? Object.entries(stats.byModule)
          .map(([name, value]) => ({ name, value, pct: coverage[name]?.pct ?? 0 }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 12)
      : [],
    [stats, coverage],
  );

  const downloadJson = async () => {
    const all = await loadAllSapCases();
    downloadBlob(exportAsJSON(all), "sap-test-cases-merged.json", "application/json");
  };

  const downloads = [
    { href: "/downloads/SAP_Test_Repository_v3.csv",  label: "CSV (curated)",  icon: FileSpreadsheet, hint: "841 hand-curated cases" },
    { href: "/downloads/SAP_Test_Repository_v3.xlsx", label: "XLSX (curated)", icon: FileSpreadsheet, hint: "Excel workbook" },
    { href: "/downloads/SAP_Test_Repository_v3.html", label: "HTML report",    icon: FileText,        hint: "Self-contained" },
  ];

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading 14,000+ SAP test cases…
      </div>
    );
  }

  const statCards = [
    { label: "Total cases",     value: stats.total.toLocaleString(),       tone: "text-foreground" },
    { label: "Modules",         value: Object.keys(stats.byModule).length, tone: "text-primary" },
    { label: "High priority",   value: stats.highPriority.toLocaleString(), tone: "text-destructive" },
    { label: "High auto-feas.", value: stats.highAuto.toLocaleString(),    tone: "text-emerald-400" },
    { label: "Coverage score",  value: `${stats.coverageScore}%`,          tone: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className={`text-2xl md:text-3xl font-bold ${s.tone}`}>{s.value}</div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{stats.bundled.toLocaleString()}</span> curated cases
        {" + "}
        <span className="font-medium text-foreground">{stats.fromCsv.toLocaleString()}</span> from module CSVs
        {" — all indexed and queryable by the AI Test Generator."}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">By priority</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  label={(e) => `${e.name}: ${e.value}`}
                >
                  {priorityData.map((d) => (
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
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Top 12 modules · case count</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
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
          </div>
        </div>
      </div>

      {/* Automation coverage table */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Automation feasibility per module</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(coverage)
            .sort(([, a], [, b]) => b.pct - a.pct)
            .map(([mod, c]) => (
              <div key={mod} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/40">
                <span className="text-xs font-mono text-foreground w-20 shrink-0">{mod}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${c.pct}%` }}
                    aria-label={`${c.pct}% high automation feasibility`}
                  />
                </div>
                <span className="text-xs text-muted-foreground tabular-nums w-20 text-right">
                  {c.high.toLocaleString()}/{c.total.toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Downloads */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Download className="w-4 h-4" /> Download the repository
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {downloads.map((d) => (
            <a
              key={d.label}
              href={d.href}
              download
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-secondary/40 transition-colors"
            >
              <d.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground">{d.label}</div>
                <div className="text-[11px] text-muted-foreground">{d.hint}</div>
              </div>
            </a>
          ))}
          <button
            onClick={downloadJson}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-secondary/40 transition-colors text-left"
          >
            <FileJson className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">JSON (merged)</div>
              <div className="text-[11px] text-muted-foreground">All {stats.total.toLocaleString()} cases</div>
            </div>
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1">
          <FileCode2 className="w-3 h-3" /> Curated cases ground the AI generator; CSV-derived cases extend the searchable catalogue.
        </p>
      </div>
    </div>
  );
}
