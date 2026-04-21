import { Download, FileSpreadsheet, FileText, FileCode2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { SALESFORCE_CLOUDS, TOTAL_SALESFORCE_CASES } from "@/data/salesforceClouds";

interface Props {
  onOpenRepository: (cloudId: string) => void;
}

export function SalesforceOverview({ onOpenRepository }: Props) {
  const chartData = SALESFORCE_CLOUDS.map((c) => ({ name: c.shortName, cases: c.cases }));
  const stats = [
    { label: "Clouds", value: SALESFORCE_CLOUDS.length, tone: "text-foreground" },
    { label: "Total cases", value: TOTAL_SALESFORCE_CASES.toLocaleString(), tone: "text-primary" },
    { label: "Industries covered", value: "8+", tone: "text-emerald-400" },
    { label: "Repositories", value: "7", tone: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className={`text-2xl md:text-3xl font-bold ${s.tone}`}>{s.value}</div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Cases per cloud</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
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
              <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Download className="w-4 h-4" /> Download a repository
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SALESFORCE_CLOUDS.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-border p-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {c.cases.toLocaleString()} cases
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={c.csv}
                  download
                  title="CSV"
                  className="p-2 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                </a>
                <a
                  href={c.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="HTML report"
                  className="p-2 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
                >
                  <FileText className="w-4 h-4" />
                </a>
                <a
                  href={c.ts}
                  download
                  title="TypeScript"
                  className="p-2 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
                >
                  <FileCode2 className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onOpenRepository(c.id)}
                  className="ml-1 px-2 py-1 text-[11px] rounded-md border border-primary/30 text-primary hover:bg-primary/10"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
