import {
  ResponsiveContainer,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Treemap,
} from "recharts";
import type { GlobalStats } from "@/lib/globalStats";

const PRIORITY_COLORS: Record<string, string> = {
  High: "hsl(var(--destructive))",
  Medium: "hsl(var(--primary))",
  Low: "hsl(var(--muted-foreground))",
};

const HEATMAP_HUES = [12, 28, 45, 95, 140, 165, 190, 210, 235, 260, 285, 310, 330, 355];

const tileColor = (index: number, total: number) => {
  const hue = HEATMAP_HUES[index % HEATMAP_HUES.length];
  const t = total > 1 ? index / (total - 1) : 0;
  return `hsl(${hue} ${Math.round(78 - t * 18)}% ${Math.round(58 + t * 10)}%)`;
};

const acronymFor = (name: string): string => {
  const cleaned = name.replace(/\(.*?\)/g, "").trim();
  if (!cleaned) return "?";
  const words = cleaned.split(/[\s\-/_]+/).filter(Boolean);
  if (words.length === 1) {
    const caps = cleaned.match(/[A-Z0-9]/g);
    if (caps && caps.length >= 2) return caps.slice(0, 4).join("");
    return cleaned.slice(0, 4).toUpperCase();
  }
  return words.slice(0, 4).map((w) => w[0]!.toUpperCase()).join("") || cleaned.slice(0, 4).toUpperCase();
};

interface HeatmapTileProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  value?: number;
  index?: number;
  total: number;
}

const HeatmapTile = ({ x = 0, y = 0, width = 0, height = 0, name = "", value = 0, index = 0, total }: HeatmapTileProps) => {
  if (width <= 0 || height <= 0) return null;
  const maxChars = Math.max(2, Math.floor((width - 6) / 6.5));
  const acronym = acronymFor(name);
  const label = name.length <= maxChars ? name : acronym.slice(0, Math.max(2, Math.min(acronym.length, maxChars)));
  const showLabel = width >= 24 && height >= 16;
  const showValue = width > 70 && height > 50 && name.length <= maxChars;
  const fontSize = Math.min(13, Math.max(9, Math.floor(width / 8)));

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={tileColor(index, total)} stroke="hsl(var(--background))" strokeWidth={2} />
      {showLabel && (
        <text x={x + width / 2} y={showValue ? y + height / 2 - 6 : y + height / 2 + 4} textAnchor="middle" fontSize={fontSize} fontWeight={700} fill="hsl(222 48% 7%)" style={{ pointerEvents: "none" }}>
          {label}
        </text>
      )}
      {showValue && (
        <text x={x + width / 2} y={y + height / 2 + 12} textAnchor="middle" fontSize={11} fontFamily="JetBrains Mono, monospace" fontWeight={600} fill="hsl(222 48% 7%)" style={{ pointerEvents: "none" }}>
          {value.toLocaleString()}
        </text>
      )}
    </g>
  );
};

const HeatmapTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload?: { name?: string; value?: number } }> }) => {
  const data = payload?.[0]?.payload;
  if (!active || !data?.name) return null;
  return (
    <div className="rounded-md border border-border px-3 py-2 shadow-lg bg-popover text-popover-foreground">
      <div className="text-sm font-semibold">{data.name}</div>
      <div className="text-xs font-mono mt-0.5 text-muted-foreground">{(data.value ?? 0).toLocaleString()} cases</div>
    </div>
  );
};

export const PriorityBarChart = ({ stats }: { stats: GlobalStats }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={stats.byPriority} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 4 }} barCategoryGap={12}>
      <XAxis type="number" hide />
      <YAxis type="category" dataKey="name" tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 600 }} width={70} axisLine={false} tickLine={false} />
      <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} formatter={(v: number) => v.toLocaleString()} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
      <Bar dataKey="value" radius={[0, 6, 6, 0]} label={{ position: "right", fill: "hsl(var(--foreground))", fontSize: 11, formatter: (v: number) => v.toLocaleString() }}>
        {stats.byPriority.map((d) => <Cell key={d.name} fill={PRIORITY_COLORS[d.name] ?? "hsl(var(--muted))"} />)}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const PlatformTreemap = ({ stats }: { stats: GlobalStats }) => (
  <ResponsiveContainer width="100%" height="100%">
    <Treemap data={stats.topPlatforms} dataKey="value" nameKey="name" stroke="hsl(var(--background))" content={<HeatmapTile total={stats.topPlatforms.length} />} isAnimationActive={false}>
      <Tooltip content={<HeatmapTooltip />} />
    </Treemap>
  </ResponsiveContainer>
);