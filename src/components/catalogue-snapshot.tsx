import { Link } from "react-router-dom";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GlobalStats } from "@/lib/globalStats";

type SnapshotStats = Pick<GlobalStats, "topPlatforms" | "byPriority" | "uniqueIds" | "lastUpdated">;

export function CatalogueSnapshot({ stats }: { stats: SnapshotStats | null }) {
  const platforms = [...(stats?.topPlatforms ?? [])].filter((item) => item.value > 0).sort((a, b) => b.value - a.value).slice(0, 6);
  const maximum = Math.max(1, ...platforms.map((item) => item.value));
  const priorities = (stats?.byPriority ?? []).filter((item) => item.value > 0);
  const priorityTotal = priorities.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="border-b border-border" aria-labelledby="catalogue-snapshot-title">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-primary"><BarChart3 className="h-4 w-4" />Catalogue coverage</p>
            <h2 id="catalogue-snapshot-title" className="text-3xl font-semibold sm:text-4xl">The library, at a glance.</h2>
          </div>
          <Button asChild variant="outline" className="gap-2"><Link to="/dashboard">Full dashboard <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        {!stats ? <p role="status" className="py-8 text-sm text-muted-foreground">Catalogue snapshot unavailable.</p> : (
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="mb-5 text-xl font-semibold">Largest product libraries</h3>
              {platforms.length === 0 ? <p className="text-sm text-muted-foreground">No product coverage recorded.</p> : <ol className="space-y-4">
                {platforms.map((item) => <li key={item.name}>
                  <div className="mb-1.5 flex items-center justify-between gap-4 text-sm"><span>{item.name}</span><span className="shrink-0 font-mono text-xs text-muted-foreground">{item.value.toLocaleString("en-GB")} cases</span></div>
                  <meter className="catalogue-meter block h-2 w-full" min={0} max={maximum} value={item.value} aria-label={`${item.name} catalogue cases`}>{item.value}</meter>
                </li>)}
              </ol>}
            </div>
            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h3 className="mb-5 text-xl font-semibold">Case priorities</h3>
              <ul className="space-y-6">
                {priorities.map((item) => <li key={item.name}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm"><span>{item.name}</span><span className="font-mono text-xs text-muted-foreground">{item.value.toLocaleString("en-GB")} · {Math.round(item.value / priorityTotal * 100)}%</span></div>
                  <meter className="catalogue-meter catalogue-meter-secondary block h-2 w-full" min={0} max={Math.max(1, priorityTotal)} value={item.value} aria-label={`${item.name} priority cases`}>{item.value}</meter>
                </li>)}
              </ul>
              {priorities.length === 0 && <p className="text-sm text-muted-foreground">No priority distribution recorded.</p>}
              <p className="mt-8 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">{stats.uniqueIds.toLocaleString("en-GB")} indexed cases · Catalogue data, not execution results.</p>
              {Number.isFinite(stats.lastUpdated) && stats.lastUpdated > 0 && <p className="mt-1 text-xs text-muted-foreground">Snapshot: {new Date(stats.lastUpdated).toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" })}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}