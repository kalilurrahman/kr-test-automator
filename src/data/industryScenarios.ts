/**
 * Industry-first scenario index
 * --------------------------------------------------------------------------
 * Loads the bundled `public/data/industry_scenarios.json` (9,500 unique E2E
 * scenarios across 32 industries × N products) once per session and exposes
 * a typed query surface for the Industries section, generator prefill and
 * dashboard aggregations.
 *
 * The file is fetched lazily on first call (~5 MB) and cached on the module
 * scope so all consumers share one parse pass. Per-industry / per-product
 * indices are built up-front so the UI never has to scan 9.5k rows again.
 */

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
  };
  /** Distribution of test_type values */
  testTypeCounts: Record<string, number>;
}

const PYTHON_LIST_RE = /^\[.*\]$/;

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

  const scenarios: IndustryScenario[] = raw.map((r) => ({
    scenario_id: String(r.scenario_id ?? ""),
    industry: String(r.industry ?? "Unknown"),
    erp_system: String(r.erp_system ?? ""),
    product: String(r.product ?? ""),
    e2e_scenario_name: String(r.e2e_scenario_name ?? ""),
    business_description: String(r.business_description ?? ""),
    modules: parseList(r.modules),
    data_sources: parseList(r.data_sources),
    priority: String(r.priority ?? ""),
    test_type: String(r.test_type ?? ""),
    auto_feasibility: String(r.auto_feasibility ?? ""),
    integration_hint: String(r.integration_hint ?? ""),
  }));

  const byIndustry = new Map<string, IndustryScenario[]>();
  const byProduct = new Map<string, IndustryScenario[]>();
  const byId = new Map<string, IndustryScenario>();
  const testTypeCounts: Record<string, number> = {};
  let high = 0;
  let autoReady = 0;
  let integrationCoverage = 0;

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
    testTypeCounts[s.test_type] = (testTypeCounts[s.test_type] ?? 0) + 1;
  }

  const summaries: IndustrySummary[] = [...byIndustry.entries()]
    .map(([industry, list]) => {
      const products = new Set<string>();
      const ervSystems = new Set<string>();
      let h = 0;
      let a = 0;
      for (const row of list) {
        if (row.product) products.add(row.product);
        if (row.erp_system) ervSystems.add(row.erp_system);
        if (row.priority === "High") h += 1;
        if (row.auto_feasibility === "High") a += 1;
      }
      return {
        industry,
        slug: industrySlug(industry),
        total: list.length,
        high: h,
        autoReady: a,
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
