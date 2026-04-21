// Lightweight client-side analytics for any platform: fetches every module's
// CSV in parallel, parses it, and returns aggregated counts ready for the
// Recharts bars/pie used by both the platform overview and the master
// dashboard. Results are cached per-platform in module scope so re-mounting
// the page (or switching tabs) does not refetch.

import { parseCsvAsObjects } from "@/lib/csv";
import type { PlatformDef } from "@/data/platformManifests";

const PRIORITY_FIELDS = ["Priority", "priority"];
const MODULE_FIELDS = ["Module", "module", "Domain", "Capability"];
const TYPE_FIELDS = ["Test Type", "type", "Type"];

const pick = (row: Record<string, string>, fields: string[]) => {
  for (const f of fields) if (row[f]) return row[f];
  return "";
};

export interface ModuleStats {
  id: string;
  label: string;
  total: number;
  high: number;
  medium: number;
  low: number;
  /** % of cases that look automation-friendly (UI / Functional / Regression / E2E) */
  automationPct: number;
}

export interface PlatformStats {
  total: number;
  byPriority: Record<string, number>;
  byTestType: Record<string, number>;
  modules: ModuleStats[];
  /** Coverage score = weighted blend of high-priority + automation-feasible */
  coverageScore: number;
  /** Number of module CSVs that actually loaded successfully */
  loadedModules: number;
  /** Total module count regardless of load success */
  totalModules: number;
}

const cache = new Map<string, Promise<PlatformStats>>();

const AUTO_TYPES = new Set([
  "ui",
  "functional",
  "regression",
  "e2e",
  "workflow",
  "integration",
  "performance",
  "api",
]);

async function fetchModule(
  platform: PlatformDef,
  mod: PlatformDef["modules"][number],
): Promise<ModuleStats> {
  const url = `${platform.publicBase}/${mod.folder}/${mod.prefix}.csv`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    // Some sub-modules are still placeholders that ship the SPA index.html
    // instead of a CSV — guard against that so stats don't blow up.
    if (text.trimStart().startsWith("<")) throw new Error("not-a-csv");
    const { rows } = parseCsvAsObjects(text);
    let high = 0;
    let medium = 0;
    let low = 0;
    let auto = 0;
    for (const r of rows) {
      const p = pick(r, PRIORITY_FIELDS).toLowerCase();
      if (p === "high" || p === "critical") high += 1;
      else if (p === "medium") medium += 1;
      else if (p === "low") low += 1;
      const t = pick(r, TYPE_FIELDS).toLowerCase();
      if (AUTO_TYPES.has(t)) auto += 1;
    }
    return {
      id: mod.id,
      label: mod.label,
      total: rows.length,
      high,
      medium,
      low,
      automationPct: rows.length ? Math.round((auto / rows.length) * 100) : 0,
    };
  } catch {
    return {
      id: mod.id,
      label: mod.label,
      total: 0,
      high: 0,
      medium: 0,
      low: 0,
      automationPct: 0,
    };
  }
}

export function getPlatformStats(platform: PlatformDef): Promise<PlatformStats> {
  const key = platform.id;
  const existing = cache.get(key);
  if (existing) return existing;

  const promise = (async () => {
    const moduleStats = await Promise.all(
      platform.modules.map((mod) => fetchModule(platform, mod)),
    );
    const total = moduleStats.reduce((sum, m) => sum + m.total, 0);
    const high = moduleStats.reduce((sum, m) => sum + m.high, 0);
    const medium = moduleStats.reduce((sum, m) => sum + m.medium, 0);
    const low = moduleStats.reduce((sum, m) => sum + m.low, 0);
    const loadedModules = moduleStats.filter((m) => m.total > 0).length;

    // Aggregate test-type counts (cheap second pass via re-parsing would be
    // wasteful — instead derive a coverage score from priority + automation).
    const automationAvg = moduleStats.length
      ? Math.round(
          moduleStats.reduce((s, m) => s + m.automationPct, 0) /
            moduleStats.length,
        )
      : 0;
    const priorityScore = total ? Math.round((high / total) * 100) : 0;
    const coverageScore = Math.round((automationAvg + priorityScore) / 2);

    return {
      total,
      byPriority: { High: high, Medium: medium, Low: low },
      byTestType: {},
      modules: moduleStats,
      coverageScore,
      loadedModules,
      totalModules: platform.modules.length,
    } satisfies PlatformStats;
  })();

  cache.set(key, promise);
  // Roll back the cache entry on failure so a transient network blip doesn't
  // poison every future render of the page.
  promise.catch(() => cache.delete(key));
  return promise;
}
