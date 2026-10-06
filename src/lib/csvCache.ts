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
      const parsed = parseCsvAsObjects(text);
      return { ...parsed, rows: parsed.rows.map(normalizeCaseRow) };
    } catch {
      return null;
    }
  })();
  cache.set(url, fetchPromise);
  fetchPromise.catch(() => cache.delete(url));
  return fetchPromise;
}

/** Preserve original columns while exposing shared fields to all consumers. */
export function normalizeCaseRow(row: Record<string, string>): Record<string, string> {
  const aliases: Record<string, string[]> = {
    "Test Case ID": ["test_case_id", "id", "ID", "Case ID"],
    "Test Scenario": ["test_scenario", "scenario", "Scenario", "test_case_name"],
    Module: ["module", "Domain"],
    Priority: ["priority"],
    "Test Type": ["test_type", "type", "Type"],
    Preconditions: ["preconditions", "Pre-conditions", "preCond"],
    Steps: ["test_steps", "steps"],
    "Expected Result": ["expected_result", "expected", "Expected"],
    Product: ["product"],
    "Automation Framework": ["automation_framework"],
  };
  const normalized = { ...row };
  for (const [field, candidates] of Object.entries(aliases)) {
    if (normalized[field]) continue;
    normalized[field] = candidates.map((key) => row[key]).find(Boolean) ?? "";
  }
  return normalized;
}
