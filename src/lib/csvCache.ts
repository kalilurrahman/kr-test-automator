// In-memory cache for fetched + parsed module CSVs. Module switches in the
// repository view become instant on revisit, and the global index reuses the
// same cached parse instead of re-running the CSV parser per row source.

import { parseCsvAsObjects } from "@/lib/csv";

interface CsvCacheEntry {
  headers: string[];
  rows: Record<string, string>[];
}

const cache = new Map<string, Promise<CsvCacheEntry | null>>();

export function getCachedCsv(url: string): Promise<CsvCacheEntry | null> {
  const existing = cache.get(url);
  if (existing) return existing;
  const fetchPromise = (async (): Promise<CsvCacheEntry | null> => {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const text = await res.text();
      // Vite dev server returns index.html for missing assets — skip those.
      if (text.trimStart().startsWith("<")) return null;
      return parseCsvAsObjects(text);
    } catch {
      return null;
    }
  })();
  cache.set(url, fetchPromise);
  fetchPromise.catch(() => cache.delete(url));
  return fetchPromise;
}
