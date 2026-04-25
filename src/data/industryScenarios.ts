/**
 * Industry-first scenario index
 * --------------------------------------------------------------------------
 * Loads the bundled `public/data/industry_scenarios.json` (51,500 unified
 * industry E2E scenarios across fine-grained domains × products) once per session
 * and exposes a typed query surface for the Industries section, generator
 * prefill and dashboard aggregations.
 *
 * The file is fetched lazily on first call and cached on the module
 * scope so all consumers share one parse pass. Per-industry / per-product
 * indices are built up-front so the UI never has to scan 12k rows again.
 */

export type ScenarioBatch = "v3" | "strict" | "incremental";

export interface IndustryScenario {
  scenario_id: string;
  industry: string;
  erp_system: string;
  product: string;
  e2e_scenario_name: string;
  business_description: string;
  /** Stored as a Python-style list literal in the source CSV — parsed on load. */
  modules: string[];
  data_sources: string[];
  priority: "High" | "Medium" | "Low" | string;
  test_type: string;
  auto_feasibility: "High" | "Medium" | "Low" | string;
  integration_hint: string;
  industry_lineage: string[];
  industry_parent: string;
  industry_leaf: string;
  product_lineage: string[];
  product_parent: string;
  product_leaf: string;
  batch_number?: number;
  /**
   * Source batch:
   *  - `v3`           = original 9,500 industry library
   *  - `strict`       = 12,000 strict-validated E2E set
   *  - `incremental`  = 30,000 incremental B21–B50 strict E2E batches
   */
  batch: ScenarioBatch;
  /** True when the row passes the strict E2E validation rules. */
  strict_e2e: boolean;
}

export interface IndustrySummary {
  /** Display name, e.g. "Pharma" */
  industry: string;
  /** URL slug, e.g. "pharma" */
  slug: string;
  /** Total scenarios in this industry */
  total: number;
  /** High-priority scenario count */
  high: number;
  /** Auto-feasibility = "High" count */
  autoReady: number;
  /** Strict-E2E-validated count (subset of total) */
  strict: number;
  /** Original v3 batch count (subset of total) */
  v3: number;
  /** Incremental B21–B50 strict E2E count (subset of total) */
  incremental: number;
  /** Distinct products / ERPs covered */
  products: string[];
  /** Distinct ERP systems covered (e.g. "SAP S/4HANA", "Salesforce") */
  ervSystems: string[];
}

export interface IndustryIndex {
  scenarios: IndustryScenario[];
  byIndustry: Map<string, IndustryScenario[]>;
  byProduct: Map<string, IndustryScenario[]>;
  byId: Map<string, IndustryScenario>;
  summaries: IndustrySummary[];
  /** Aggregate counts for dashboard cards */
  totals: {
    scenarios: number;
    industries: number;
    products: number;
    high: number;
    autoReady: number;
    integrationCoverage: number;
    /** Strict-validated E2E rows */
    strict: number;
    /** Original v3 batch rows */
    v3: number;
    /** Incremental B21–B50 rows (strict E2E, future batches will append here) */
    incremental: number;
    latestBatch?: string;
    duplicatesRemoved?: number;
  };
  /** Distribution of test_type values */
  testTypeCounts: Record<string, number>;
}

const PYTHON_LIST_RE = /^\[.*\]$/;

const parseLineage = (raw: unknown, fallback: string): string[] => {
  const parsed = parseList(raw);
  if (parsed.length > 0) return parsed;
  return fallback
    .split(">")
    .map((part) => part.trim())
    .filter(Boolean);
};

/** Parse a Python-style list literal ("['MM', 'SD']") into a string[]. */
const parseList = (raw: unknown): string[] => {
  if (Array.isArray(raw)) return raw.map((s) => String(s));
  if (typeof raw !== "string") return [];
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "[]") return [];
  if (!PYTHON_LIST_RE.test(trimmed)) return [trimmed];
  // Cheap conversion: single-quoted JSON → double-quoted JSON.
  try {
    const json = trimmed.replace(/'/g, '"');
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed.map((s) => String(s)) : [];
  } catch {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }
};

export const industrySlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

let cached: Promise<IndustryIndex> | null = null;

const build = async (): Promise<IndustryIndex> => {
  const res = await fetch("/data/industry_scenarios.json", { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load industry scenarios (${res.status})`);
  const raw = (await res.json()) as Array<Record<string, unknown>>;

  const scenarios: IndustryScenario[] = raw.map((r) => {
    const rawBatch = String(r.batch ?? "v3");
    const batch: ScenarioBatch =
      rawBatch === "strict" ? "strict" : rawBatch === "incremental" ? "incremental" : "v3";
    const industry = String(r.industry ?? "Unknown");
    const erpSystem = String(r.erp_system ?? "");
    const product = String(r.product ?? "");
    const industryLineage = parseLineage(r.industry_lineage, industry);
    const productLineage = parseLineage(r.product_lineage, product || erpSystem || "Unknown");
    return {
      scenario_id: String(r.scenario_id ?? ""),
      industry,
      erp_system: erpSystem,
      product,
      e2e_scenario_name: String(r.e2e_scenario_name ?? ""),
      business_description: String(r.business_description ?? ""),
      modules: parseList(r.modules),
      data_sources: parseList(r.data_sources),
      priority: String(r.priority ?? ""),
      test_type: String(r.test_type ?? ""),
      auto_feasibility: String(r.auto_feasibility ?? ""),
      integration_hint: String(r.integration_hint ?? ""),
      industry_lineage: industryLineage,
      industry_parent: String(r.industry_parent ?? "").trim() || industryLineage[0] || "Unknown",
      industry_leaf: String(r.industry_leaf ?? "").trim() || industryLineage.at(-1) || industry,
      product_lineage: productLineage,
      product_parent: String(r.product_parent ?? "").trim() || productLineage[0] || erpSystem || product || "Unknown",
      product_leaf: String(r.product_leaf ?? "").trim() || productLineage.at(-1) || product || erpSystem || "Unknown",
      batch_number: typeof r.batch_number === "number" ? r.batch_number : undefined,
      batch,
      strict_e2e:
        typeof r.strict_e2e === "boolean" ? r.strict_e2e : batch !== "v3",
    };
  });

  const byIndustry = new Map<string, IndustryScenario[]>();
  const byProduct = new Map<string, IndustryScenario[]>();
  const byId = new Map<string, IndustryScenario>();
  const testTypeCounts: Record<string, number> = {};
  let high = 0;
  let autoReady = 0;
  let integrationCoverage = 0;
  let strict = 0;
  let v3 = 0;
  let incremental = 0;

  for (const s of scenarios) {
    if (s.scenario_id) byId.set(s.scenario_id, s);
    if (!byIndustry.has(s.industry)) byIndustry.set(s.industry, []);
    byIndustry.get(s.industry)!.push(s);
    if (s.product) {
      if (!byProduct.has(s.product)) byProduct.set(s.product, []);
      byProduct.get(s.product)!.push(s);
    }
    if (s.priority === "High") high += 1;
    if (s.auto_feasibility === "High") autoReady += 1;
    if (s.integration_hint && s.integration_hint.trim().length > 0) integrationCoverage += 1;
    if (s.batch === "strict") strict += 1;
    else if (s.batch === "incremental") incremental += 1;
    else v3 += 1;
    testTypeCounts[s.test_type] = (testTypeCounts[s.test_type] ?? 0) + 1;
  }

  const summaries: IndustrySummary[] = [...byIndustry.entries()]
    .map(([industry, list]) => {
      const products = new Set<string>();
      const ervSystems = new Set<string>();
      let h = 0;
      let a = 0;
      let s = 0;
      let v = 0;
      let inc = 0;
      for (const row of list) {
        if (row.product) products.add(row.product);
        if (row.erp_system) ervSystems.add(row.erp_system);
        if (row.priority === "High") h += 1;
        if (row.auto_feasibility === "High") a += 1;
        if (row.batch === "strict") s += 1;
        else if (row.batch === "incremental") inc += 1;
        else v += 1;
      }
      return {
        industry,
        slug: industrySlug(industry),
        total: list.length,
        high: h,
        autoReady: a,
        strict: s,
        v3: v,
        incremental: inc,
        products: [...products].sort(),
        ervSystems: [...ervSystems].sort(),
      };
    })
    .sort((a, b) => b.total - a.total);

  return {
    scenarios,
    byIndustry,
    byProduct,
    byId,
    summaries,
    totals: {
      scenarios: scenarios.length,
      industries: byIndustry.size,
      products: byProduct.size,
      high,
      autoReady,
      integrationCoverage,
      strict,
      v3,
      incremental,
    },
    testTypeCounts,
  };
};

export const getIndustryIndex = (): Promise<IndustryIndex> => {
  if (!cached) {
    cached = build().catch((err) => {
      cached = null;
      throw err;
    });
  }
  return cached;
};

export const findIndustryScenario = async (
  scenarioId: string,
): Promise<IndustryScenario | null> => {
  const idx = await getIndustryIndex();
  return idx.byId.get(scenarioId.trim()) ?? null;
};

/**
 * Map free-form ERP / product string → generator platform key.
 * Used by the Generate-from-industry button to pick a sensible default
 * platform when the user clicks "Generate" on a scenario.
 */
export const erpToPlatform = (erp: string, product: string): string => {
  const haystack = `${erp} ${product}`.toLowerCase();
  if (haystack.includes("sap")) return "sap";
  if (haystack.includes("salesforce")) return "salesforce";
  if (haystack.includes("workday")) return "workday";
  if (haystack.includes("servicenow")) return "servicenow";
  if (haystack.includes("veeva")) return "veeva";
  if (haystack.includes("oracle")) return "oracle";
  if (haystack.includes("dynamics")) return "dynamics365";
  if (haystack.includes("microsoft 365") || haystack.includes("m365")) return "m365";
  if (haystack.includes("aws")) return "aws";
  if (haystack.includes("azure")) return "azure";
  if (haystack.includes("gcp") || haystack.includes("google cloud")) return "gcp";
  if (haystack.includes("ios")) return "ios";
  if (haystack.includes("android")) return "android";
  if (haystack.includes("api")) return "api";
  return "web";
};
