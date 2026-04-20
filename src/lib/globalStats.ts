// Aggregates stats across every SPA platform in the manifest. Used by the
// master Dashboard hero. Single in-memory cache so navigating away and back
// does not refetch ~70 CSVs.

import { PLATFORMS } from "@/data/platformManifests";
import { getPlatformStats } from "@/lib/platformStats";

export interface GlobalStats {
  totalCases: number;
  totalModules: number;
  totalPlatforms: number;
  loadedPlatforms: number;
  byPriority: { name: string; value: number }[];
  topPlatforms: { name: string; value: number }[];
}

let cached: Promise<GlobalStats> | null = null;

export function getGlobalStats(): Promise<GlobalStats> {
  if (cached) return cached;
  cached = (async () => {
    const all = await Promise.all(
      PLATFORMS.map(async (p) => ({ platform: p, stats: await getPlatformStats(p) })),
    );
    let totalCases = 0;
    let totalModules = 0;
    let high = 0;
    let medium = 0;
    let low = 0;
    let loadedPlatforms = 0;
    const perPlatform: { name: string; value: number }[] = [];
    for (const { platform, stats } of all) {
      totalCases += stats.total;
      totalModules += stats.totalModules;
      high += stats.byPriority.High ?? 0;
      medium += stats.byPriority.Medium ?? 0;
      low += stats.byPriority.Low ?? 0;
      if (stats.total > 0) loadedPlatforms += 1;
      perPlatform.push({ name: platform.shortLabel, value: stats.total });
    }
    return {
      totalCases,
      totalModules,
      totalPlatforms: PLATFORMS.length,
      loadedPlatforms,
      byPriority: [
        { name: "High", value: high },
        { name: "Medium", value: medium },
        { name: "Low", value: low },
      ].filter((d) => d.value > 0),
      topPlatforms: perPlatform.sort((a, b) => b.value - a.value).slice(0, 8),
    } satisfies GlobalStats;
  })();
  cached.catch(() => { cached = null; });
  return cached;
}
