import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Loader2, Download, FileSpreadsheet, FileJson, FileText } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import type { PlatformDef, PlatformModule } from "@/data/platformManifests";
import { getPlatformStats, type PlatformStats } from "@/lib/platformStats";

interface Props {
  platform: PlatformDef;
  onOpenModule: (mod: PlatformModule) => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  High: "hsl(var(--destructive))",
  Medium: "hsl(var(--primary))",
  Low: "hsl(var(--muted-foreground))",
};

export function PlatformOverview({ platform, onOpenModule }: Props) {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPlatformStats(platform)
      .then((s) => !cancelled && setStats(s))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [platform]);

  const priorityData = useMemo(
    () => stats
      ? Object.entries(stats.byPriority)
          .map(([name, value]) => ({ name, value }))
          .filter((d) => d.value > 0)
      : [],
    [stats],
  );

  const moduleData = useMemo(
    () => stats
      ? [...stats.modules]
          .filter((m) => m.total > 0)
          .sort((a, b) => b.total - a.total)
          .slice(0, 12)
          .map((m) => ({ name: m.label, value: m.total, automationPct: m.automationPct }))
      : [],
    [stats],
  );

  const statCards = stats ? [
    { label: "Total cases",     value: stats.total.toLocaleString(),         tone: "text-foreground" },
    { label: "Modules",         value: `${stats.loadedModules}/${stats.totalModules}`, tone: "text-primary" },
    { label: "High priority",   value: stats.byPriority.High?.toLocaleString() ?? "0", tone: "text-destructive" },
    { label: "Avg automation",  value: `${Math.round(stats.modules.reduce((s, m) => s + m.automationPct, 0) / Math.max(1, stats.modules.length))}%`, tone: "text-emerald-400" },
    { label: "Coverage score",  value: `${stats.coverageScore}%`, tone: "text-primary" },
  ] : [];

  const downloads = (mod: PlatformModule) => [
    { ext: "csv",  label: "CSV",  icon: FileSpreadsheet },
    { ext: "xlsx", label: "XLSX", icon: FileSpreadsheet },
    { ext: "json", label: "JSON", icon: FileJson },
    { ext: "ts",   label: "TS",   icon: FileText },
  ].map((d) => ({
    ...d,
    href: `${platform.publicBase}/${mod.folder}/${mod.prefix}.${d.ext}`,
  }));

  return (
    <div className="space-y-6">
      {/* About strip */}
      <Card className="p-5 bg-card border-border">
        <h2 className="text-lg font-semibold text-foreground mb-1">About this platform</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{platform.description}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span><strong className="text-foreground">{platform.modules.length}</strong> modules</span>
          <span>ID prefix: <code className="font-mono text-primary">{platform.idPrefix}-</code></span>
          <span>Static folder: <code className="font-mono">{platform.publicBase}</code></span>
        </div>
      </Card>

      {/* Stat cards (SAP-parity) */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse h-20" />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4">
              <div className={`text-2xl md:text-3xl font-bold ${s.tone}`}>{s.value}</div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Charts */}
      {loading ? (
        <div className="rounded-xl border border-border bg-card p-12 flex items-center justify-center text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Aggregating module data…
        </div>
      ) : stats && stats.total > 0 ? (
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
            <h3 className="text-sm font-semibold text-foreground mb-3">Top modules · case count</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={60} />
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
      ) : (
        <Card className="p-6 bg-card border-border text-sm text-muted-foreground">
          No CSV data was loadable for this platform yet — module list still works below.
        </Card>
      )}

      {/* Automation feasibility per module */}
      {stats && stats.modules.some((m) => m.total > 0) && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Automation feasibility per module</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {stats.modules
              .filter((m) => m.total > 0)
              .sort((a, b) => b.automationPct - a.automationPct)
              .map((m) => (
                <div key={m.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/40">
                  <span className="text-xs font-medium text-foreground w-24 shrink-0 truncate" title={m.label}>{m.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${m.automationPct}%` }}
                      aria-label={`${m.automationPct}% automation feasibility`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums w-16 text-right">
                    {m.automationPct}% · {m.total}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Module cards with downloads */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" /> Modules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {platform.modules.map((mod) => {
            const ms = stats?.modules.find((m) => m.id === mod.id);
            return (
              <Card
                key={mod.id}
                className="p-4 bg-card border-border hover:border-primary/40 transition-colors group"
              >
                <button
                  onClick={() => onOpenModule(mod)}
                  className="w-full text-left flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm">{mod.label}</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {ms ? `${ms.total.toLocaleString()} cases · ${ms.automationPct}% auto` : "—"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </button>
                <div className="mt-3 flex flex-wrap gap-1">
                  {downloads(mod).map((d) => (
                    <a
                      key={d.ext}
                      href={d.href}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Download className="w-2.5 h-2.5" /> {d.label}
                    </a>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full h-8 text-xs justify-center"
                  onClick={() => onOpenModule(mod)}
                >
                  Open repository
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
