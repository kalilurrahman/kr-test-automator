// =============================================================================
// SAP Extended CSV Loader
// =============================================================================
// The hand-curated TS dataset (`SAP_TEST_CASES`) ships 841 cases. The /SAP
// folder contains 12 additional CSVs (~14,000 cases across 10 modules + Phase II
// E2E + Functional) that were never integrated into the runtime catalogue.
//
// This loader fetches every CSV from /sap-data/, normalises rows into the
// shared `TestCase` shape, and merges them with the bundled cases (deduped by
// ID — bundled wins on collision so curated metadata is preserved).
//
// Cached in module scope so navigating between SAP tabs / Dashboard does not
// refetch ~6 MB of CSV.
// =============================================================================

import { parseCsvAsObjects } from "@/lib/csv";
import {
  SAP_TEST_CASES,
  type TestCase,
  type Priority,
  type AutoFeasibility,
  type Industry,
  type SAPModule,
  type TestType,
} from "./sapTestCases";

interface SapCsvSource {
  file: string;             // /sap-data/<file>
  defaultModule: SAPModule; // fallback when row is missing Module
  defaultSubModule?: string;
}

const SOURCES: SapCsvSource[] = [
  { file: "fi.csv",         defaultModule: "FI" },
  { file: "co.csv",         defaultModule: "CO" },
  { file: "mm.csv",         defaultModule: "MM" },
  { file: "sd.csv",         defaultModule: "SD" },
  { file: "pp.csv",         defaultModule: "PP" },
  { file: "qm.csv",         defaultModule: "QM" },
  { file: "pm.csv",         defaultModule: "PM" },
  { file: "hcm.csv",        defaultModule: "HCM" },
  { file: "ps.csv",         defaultModule: "PS" },
  { file: "scm.csv",        defaultModule: "SCM" },
  { file: "phii_e2e.csv",   defaultModule: "Cross-Module", defaultSubModule: "Phase II E2E" },
  { file: "phii_func.csv",  defaultModule: "Cross-Module", defaultSubModule: "Phase II Functional" },
];

// ---- Field normalisation helpers --------------------------------------------

const VALID_MODULES = new Set<string>([
  "ATTP","BRIM","Basis","CO","Cross-Module","EWM","FI","FI-IHC","GRC","GTS",
  "HCM","IND-Banking","IND-Mfg","IND-Other","IND-Pharma","IND-Retail","IS-Auto",
  "IS-Banking","IS-H","IS-Oil","IS-Retail","IS-U","MM","MasterData","PM","PP",
  "PS","PSM-GM","QM","SCM","SD","TM","WM",
]);

const VALID_INDUSTRIES = new Set<string>([
  "All","Banking","Healthcare","Manufacturing","Oil & Gas","Pharma",
  "Public Sector","Retail","Utilities",
]);

const VALID_TEST_TYPES = new Set<string>([
  "Automation","Compliance","Configuration","Edge Case","Functional",
  "Integration","Negative","Performance","Regression","Security","Technical","UAT",
]);

const pick = (row: Record<string, string>, fields: string[]): string => {
  for (const f of fields) if (row[f]) return row[f];
  return "";
};

const normPriority = (raw: string): Priority => {
  const v = raw.toLowerCase();
  if (v === "high" || v === "critical") return "High";
  if (v === "low") return "Low";
  return "Medium";
};

const normModule = (raw: string, fallback: SAPModule): SAPModule => {
  const t = raw.trim();
  if (VALID_MODULES.has(t)) return t as SAPModule;
  // CSVs sometimes use "FI-GL", "MM-PUR", etc.; collapse to root module.
  const root = t.split("-")[0]?.toUpperCase();
  if (root && VALID_MODULES.has(root)) return root as SAPModule;
  return fallback;
};

const normIndustry = (raw: string): Industry => {
  const t = raw.trim();
  if (VALID_INDUSTRIES.has(t)) return t as Industry;
  return "All";
};

const normTestType = (raw: string): TestType => {
  const t = raw.trim();
  if (VALID_TEST_TYPES.has(t)) return t as TestType;
  // Common CSV variants: "UI" → Functional, "API" → Integration
  const v = t.toLowerCase();
  if (v === "ui") return "Functional";
  if (v === "api") return "Integration";
  if (v === "e2e" || v === "workflow") return "Integration";
  return "Functional";
};

const inferAutoFeasibility = (testType: TestType, priority: Priority): AutoFeasibility => {
  // Functional / Regression / Integration are typically high-auto;
  // Security / Compliance / UAT / Edge tend to be lower.
  const high = new Set<TestType>(["Functional", "Regression", "Integration", "Automation"]);
  const low = new Set<TestType>(["UAT", "Security", "Compliance", "Edge Case"]);
  if (high.has(testType)) return priority === "High" ? "High" : "Medium";
  if (low.has(testType)) return "Low";
  return "Medium";
};

function rowToCase(
  row: Record<string, string>,
  src: SapCsvSource,
): TestCase | null {
  const id = pick(row, ["Test Case ID", "ID", "id", "Case ID"]).trim();
  if (!id) return null;

  const moduleRaw = pick(row, ["Module", "module"]);
  const module = normModule(moduleRaw, src.defaultModule);
  const subModule =
    pick(row, ["Domain", "Sub-Module", "subModule", "Function", "Module Group"]) ||
    src.defaultSubModule ||
    moduleRaw ||
    module;

  const scenario = pick(row, ["Test Scenario", "Scenario", "scenario", "E2E Flow"]) || id;
  const testCase = pick(row, ["Test Case", "testCase", "Test Type"]) || scenario;
  const preCond = pick(row, ["Preconditions", "Pre-conditions", "preCond"]);
  const steps = pick(row, ["Steps", "steps"]);
  const expected = pick(row, ["Expected Result", "Expected", "expected"]);
  const priority = normPriority(pick(row, ["Priority", "priority"]));
  const testType = normTestType(pick(row, ["Test Type", "Type", "type"]));
  const industry = normIndustry(pick(row, ["Industry", "industry", "Domain"]));
  const bapi = pick(row, ["BAPI", "bapi", "Sample Data", "Hint"]) || "—";
  const autoFeasibility = inferAutoFeasibility(testType, priority);

  return {
    id, module, subModule, industry,
    scenario, testCase, preCond, steps, expected,
    priority, testType, autoFeasibility, bapi,
  };
}

// ---- Loader -----------------------------------------------------------------

let cached: Promise<TestCase[]> | null = null;

async function fetchSource(src: SapCsvSource): Promise<TestCase[]> {
  try {
    const res = await fetch(`/sap-data/${src.file}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (text.trimStart().startsWith("<")) throw new Error("not-a-csv");
    const { rows } = parseCsvAsObjects(text);
    const out: TestCase[] = [];
    for (const r of rows) {
      const tc = rowToCase(r, src);
      if (tc) out.push(tc);
    }
    return out;
  } catch (err) {
    // Non-fatal — bundled cases keep the app usable even if a CSV fails.
    if (typeof console !== "undefined") {
      console.warn(`[sapCsvLoader] ${src.file} failed:`, err);
    }
    return [];
  }
}

/**
 * Load every SAP test case (bundled + all CSVs), deduped by ID.
 * Bundled cases win on ID collision so curated metadata isn't overwritten.
 */
export function loadAllSapCases(): Promise<TestCase[]> {
  if (cached) return cached;
  cached = (async () => {
    const csvBatches = await Promise.all(SOURCES.map(fetchSource));
    const merged = new Map<string, TestCase>();
    for (const batch of csvBatches) {
      for (const tc of batch) merged.set(tc.id, tc);
    }
    // Bundled overrides — these are hand-curated and authoritative.
    for (const tc of SAP_TEST_CASES) merged.set(tc.id, tc);
    return [...merged.values()];
  })();
  cached.catch(() => { cached = null; });
  return cached;
}

// ---- Stats over the merged dataset -----------------------------------------

export interface SapMergedStats {
  total: number;
  bundled: number;
  fromCsv: number;
  byModule: Record<string, number>;
  byPriority: Record<string, number>;
  byIndustry: Record<string, number>;
  byAutoFeasibility: Record<string, number>;
  highAuto: number;
  highPriority: number;
  coverageScore: number;
  modules: string[];
}

export async function getMergedSapStats(): Promise<SapMergedStats> {
  const all = await loadAllSapCases();
  const byModule: Record<string, number> = {};
  const byPriority: Record<string, number> = {};
  const byIndustry: Record<string, number> = {};
  const byAutoFeasibility: Record<string, number> = {};
  let highAuto = 0;
  let highPriority = 0;
  for (const tc of all) {
    byModule[tc.module] = (byModule[tc.module] || 0) + 1;
    byPriority[tc.priority] = (byPriority[tc.priority] || 0) + 1;
    byIndustry[tc.industry] = (byIndustry[tc.industry] || 0) + 1;
    byAutoFeasibility[tc.autoFeasibility] = (byAutoFeasibility[tc.autoFeasibility] || 0) + 1;
    if (tc.autoFeasibility === "High") highAuto += 1;
    if (tc.priority === "High") highPriority += 1;
  }
  const total = all.length;
  const coverageScore = total
    ? Math.round((highAuto / total) * 40 + (highPriority / total) * 40 + 20)
    : 0;
  const bundled = SAP_TEST_CASES.length;
  return {
    total,
    bundled,
    fromCsv: total - bundled,
    byModule,
    byPriority,
    byIndustry,
    byAutoFeasibility,
    highAuto,
    highPriority,
    coverageScore,
    modules: Object.keys(byModule).sort(),
  };
}

export async function getSapCaseByIdAsync(id: string): Promise<TestCase | undefined> {
  const all = await loadAllSapCases();
  return all.find((tc) => tc.id === id);
}

export async function getMergedAutomationCoverage(): Promise<
  Record<string, { total: number; high: number; pct: number }>
> {
  const all = await loadAllSapCases();
  const result: Record<string, { total: number; high: number; pct: number }> = {};
  for (const tc of all) {
    if (!result[tc.module]) result[tc.module] = { total: 0, high: 0, pct: 0 };
    result[tc.module].total += 1;
    if (tc.autoFeasibility === "High") result[tc.module].high += 1;
  }
  for (const m of Object.keys(result)) {
    result[m].pct = Math.round((result[m].high / result[m].total) * 100);
  }
  return result;
}
