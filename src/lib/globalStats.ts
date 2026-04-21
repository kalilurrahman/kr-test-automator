// Aggregates stats across every SPA platform in the manifest plus the two
// "legacy" first-party catalogues (SAP and Salesforce) that ship as bundled
// TypeScript datasets rather than module CSVs. Without folding them in here
// the master Dashboard hero charts looked like SAP and ServiceNow were
// missing — they weren't, just under-counted. Single in-memory cache so
// navigating away and back does not refetch ~70 CSVs.

import { PLATFORMS } from "@/data/platformManifests";
import { getPlatformStats } from "@/lib/platformStats";
import { getMergedSapStats } from "@/data/sapCsvLoader";
import { SALESFORCE_CLOUDS, TOTAL_SALESFORCE_CASES } from "@/data/salesforceClouds";
import { getGlobalIndex } from "@/lib/globalIndex";

export interface GlobalStats {
  totalCases: number;
  totalModules: number;
  totalPlatforms: number;
  loadedPlatforms: number;
  /** Unique test IDs after dedup across the entire catalogue */
  uniqueIds: number;
  /** Number of duplicate IDs removed during global indexing */
  duplicatesRemoved: number;
  /** Wall-clock timestamp of the most recent index build */
  lastUpdated: number;
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

    // ---- SAP (curated TS dataset + 12 merged module CSVs) -------------
    const sap = await getMergedSapStats();
    totalCases += sap.total;
    totalModules += Object.keys(sap.byModule).length;
    high += sap.byPriority.High ?? 0;
    medium += sap.byPriority.Medium ?? 0;
    low += sap.byPriority.Low ?? 0;
    if (sap.total > 0) loadedPlatforms += 1;
    perPlatform.push({ name: "SAP", value: sap.total });

    // ---- Salesforce (static cloud catalogue) ----------------------------
    totalCases += TOTAL_SALESFORCE_CASES;
    totalModules += SALESFORCE_CLOUDS.length;
    if (TOTAL_SALESFORCE_CASES > 0) loadedPlatforms += 1;
    perPlatform.push({ name: "Salesforce", value: TOTAL_SALESFORCE_CASES });

    // Pull dedup metrics from the global index (built in parallel).
    const idx = await getGlobalIndex();

    return {
      totalCases,
      totalModules,
      totalPlatforms: PLATFORMS.length + 2, // +SAP +Salesforce
      loadedPlatforms,
      uniqueIds: idx.byId.size,
      duplicatesRemoved: idx.duplicatesRemoved,
      lastUpdated: idx.builtAt,
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
