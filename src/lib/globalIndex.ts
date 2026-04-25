// =============================================================================
// Global Test Index
// =============================================================================
// One in-memory map of every test case across SAP, Salesforce and the 13 CSV
// platforms. Built lazily on first call, cached for the session. Powers:
//   • /t/:id deep-link route
//   • Master dashboard "find by ID" + global search
//   • Duplicate detection + "duplicates removed" stat
//
// Dedup rule: first-seen wins, but SAP curated > SAP CSV > Salesforce > others.
// We ingest in priority order and skip IDs already in the map.
// =============================================================================

import { PLATFORMS, type PlatformDef } from "@/data/platformManifests";
import { loadAllSapCases } from "@/data/sapCsvLoader";
import { SAP_TEST_CASES } from "@/data/sapTestCases";
import { SALESFORCE_CLOUDS } from "@/data/salesforceClouds";
import { readCache, writeCache, TTL_MS } from "@/lib/indexCache";
import { getCachedCsv } from "@/lib/csvCache";
import { resolveDomain } from "@/data/industryDomains";

type PrecomputedIndexPayload = {
  builtAt: number;
  ids: Record<string, [source: string, module: string]>;
};

export interface IndexedCase {
  id: string;
  /** Source platform key (e.g. "sap", "salesforce", "veeva", "workday") */
  source: string;
  /** Human-readable platform label */
  sourceLabel: string;
  /** Module / cloud / sub-area label */
  module: string;
  scenario: string;
  priority: string;
  testType: string;
  preconditions: string;
  steps: string;
  expected: string;
  /** Internal route to open the owning product page */
  productRoute: string;
  /** Optional sub-module route hint (?module=…) */
  moduleId?: string;
  /** Original raw row for the detail view */
  raw: Record<string, string>;
}

export interface GlobalIndex {
  byId: Map<string, IndexedCase>;
  /** All cases as a flat list, deduped */
  cases: IndexedCase[];
  /** ID prefix → owning source key, for fuzzy lookup */
  prefixToSource: Map<string, string>;
  /** Per-platform stats */
  bySource: Map<string, { total: number; modules: Set<string> }>;
  /** Number of duplicate IDs skipped during ingestion */
  duplicatesRemoved: number;
  /** Number of unique modules across every source */
  totalModules: number;
  /** When the index finished building (ms epoch) */
  builtAt: number;
}

const pick = (row: Record<string, string>, keys: string[]) => {
  for (const k of keys) if (row[k]) return row[k];
  return "";
};

let cached: Promise<GlobalIndex> | null = null;

const labelForSource = (source: string): string => {
  if (source === "sap") return "SAP";
  if (source === "salesforce") return "Salesforce";
  return PLATFORMS.find((p) => p.id === source)?.label ?? source;
};

const routeForSource = (source: string): string => {
  if (source === "sap") return "/sap";
  if (source === "salesforce") return "/salesforce";
  return PLATFORMS.some((p) => p.id === source) ? `/p/${source}` : "/dashboard";
};

const buildPrefixMap = (cases: IndexedCase[]): Map<string, string> => {
  const prefixToSource = new Map<string, string>();
  for (const c of cases) {
    const parts = c.id.toUpperCase().split("-");
    const two = parts.slice(0, 2).join("-");
    if (two && !prefixToSource.has(two)) prefixToSource.set(two, c.source);
    const one = parts[0];
    if (one && !prefixToSource.has(one)) prefixToSource.set(one, c.source);
  }
  return prefixToSource;
};

async function tryPrecomputedIndex(): Promise<GlobalIndex | null> {
  try {
    const res = await fetch("/precomputed-index.json", { cache: "force-cache" });
    if (!res.ok) return null;
    const payload = (await res.json()) as PrecomputedIndexPayload;
    const cases: IndexedCase[] = Object.entries(payload.ids).map(([id, [source, module]]) => ({
      id,
      source,
      sourceLabel: labelForSource(source),
      module,
      scenario: id,
      priority: "",
      testType: "",
      preconditions: "",
      steps: "",
      expected: "",
      productRoute: routeForSource(source),
      raw: { "Test Case ID": id, Module: module, Source: labelForSource(source) },
    }));
    return fromPersisted({
      cases,
      prefixes: [...buildPrefixMap(cases).entries()],
      duplicatesRemoved: 0,
      builtAt: payload.builtAt,
    });
  } catch {
    return null;
  }
}

/** Hydrate the in-memory index from a persisted snapshot. */
function fromPersisted(p: {
  cases: IndexedCase[];
  prefixes: [string, string][];
  duplicatesRemoved: number;
  builtAt: number;
}): GlobalIndex {
  const byId = new Map<string, IndexedCase>();
  const bySource = new Map<string, { total: number; modules: Set<string> }>();
  for (const c of p.cases) {
    byId.set(c.id, c);
    let s = bySource.get(c.source);
    if (!s) { s = { total: 0, modules: new Set() }; bySource.set(c.source, s); }
    s.total += 1;
    if (c.module) s.modules.add(c.module);
  }
  let totalModules = 0;
  for (const s of bySource.values()) totalModules += s.modules.size;
  return {
    byId,
    cases: p.cases,
    prefixToSource: new Map(p.prefixes),
    bySource,
    duplicatesRemoved: p.duplicatesRemoved,
    totalModules,
    builtAt: p.builtAt,
  };
}

export function getGlobalIndex(): Promise<GlobalIndex> {
  if (cached) return cached;
  cached = (async () => {
    // 1. Try the persisted snapshot first — instant if present and fresh.
    const hit = await readCache<{
      cases: IndexedCase[];
      prefixes: [string, string][];
      duplicatesRemoved: number;
      builtAt: number;
    }>();
    if (hit && hit.ageMs < TTL_MS) {
      // Background-refresh after handing back the cached copy so the next
      // visit gets newer data without blocking this one.
      const idx = fromPersisted(hit.payload);
      // Fire-and-forget refresh.
      void build().then((fresh) => {
        cached = Promise.resolve(fresh);
        void writeCache({
          cases: fresh.cases,
          prefixes: [...fresh.prefixToSource.entries()],
          duplicatesRemoved: fresh.duplicatesRemoved,
          builtAt: fresh.builtAt,
        });
      }).catch(() => undefined);
      return idx;
    }
    // 2. Fast static snapshot — avoids fetching/parsing tens of MB of CSV/JSON on first search.
    const precomputed = await tryPrecomputedIndex();
    if (precomputed) return precomputed;
    // 3. Cold fallback — build from scratch and persist.
    const fresh = await build();
    void writeCache({
      cases: fresh.cases,
      prefixes: [...fresh.prefixToSource.entries()],
      duplicatesRemoved: fresh.duplicatesRemoved,
      builtAt: fresh.builtAt,
    });
    return fresh;
  })();
  cached.catch(() => { cached = null; });
  return cached;
}

async function build(): Promise<GlobalIndex> {
  const byId = new Map<string, IndexedCase>();
  const prefixToSource = new Map<string, string>();
  const bySource = new Map<string, { total: number; modules: Set<string> }>();
  let duplicatesRemoved = 0;

  const bump = (source: string, sourceLabel: string, module: string) => {
    let s = bySource.get(source);
    if (!s) {
      s = { total: 0, modules: new Set() };
      bySource.set(source, s);
    }
    s.total += 1;
    if (module) s.modules.add(module);
  };

  const tryAdd = (c: IndexedCase) => {
    if (!c.id) return;
    if (byId.has(c.id)) {
      duplicatesRemoved += 1;
      return;
    }
    byId.set(c.id, c);
    bump(c.source, c.sourceLabel, c.module);
    const prefix = c.id.split("-").slice(0, 2).join("-").toUpperCase();
    if (!prefixToSource.has(prefix)) prefixToSource.set(prefix, c.source);
    const head = c.id.split("-")[0]?.toUpperCase();
    if (head && !prefixToSource.has(head)) prefixToSource.set(head, c.source);
  };

  // ---- 1. SAP curated + CSVs (highest priority) ----------------------------
  try {
    const sapAll = await loadAllSapCases();
    const curatedIds = new Set(SAP_TEST_CASES.map((t) => t.id));
    for (const tc of sapAll) {
      tryAdd({
        id: tc.id,
        source: "sap",
        sourceLabel: "SAP",
        module: tc.module,
        scenario: tc.scenario,
        priority: tc.priority,
        testType: tc.testType,
        preconditions: tc.preCond,
        steps: tc.steps,
        expected: tc.expected,
        productRoute: "/sap",
        raw: {
          "Test Case ID": tc.id,
          Module: tc.module,
          "Sub-Module": tc.subModule,
          Industry: tc.industry,
          "Test Scenario": tc.scenario,
          "Test Case": tc.testCase,
          Preconditions: tc.preCond,
          Steps: tc.steps,
          "Expected Result": tc.expected,
          Priority: tc.priority,
          "Test Type": tc.testType,
          "Auto Feasibility": tc.autoFeasibility,
          "BAPI / Hint": tc.bapi,
          Source: curatedIds.has(tc.id) ? "Curated" : "CSV",
        },
      });
    }
  } catch {
    // SAP load failed — keep going so the index isn't lost entirely.
  }

  // ---- 2. Salesforce clouds (parse each CSV) -------------------------------
  await Promise.all(
    SALESFORCE_CLOUDS.map(async (cloud) => {
      const parsed = await getCachedCsv(cloud.csv);
      if (!parsed) return;
      for (const r of parsed.rows) {
        const id = pick(r, ["Test Case ID", "id", "ID"]);
        if (!id) continue;
        tryAdd({
          id,
          source: "salesforce",
          sourceLabel: "Salesforce",
          module: cloud.name,
          scenario: pick(r, ["Test Scenario", "Scenario"]),
          priority: pick(r, ["Priority"]),
          testType: pick(r, ["Test Type", "Type"]),
          preconditions: pick(r, ["Preconditions", "Pre-conditions"]),
          steps: pick(r, ["Steps"]),
          expected: pick(r, ["Expected Result", "Expected"]),
          productRoute: "/salesforce",
          moduleId: cloud.id,
          raw: r,
        });
      }
    }),
  );

  // ---- 3. Every other PlatformDef (Veeva, Workday, ServiceNow, …) ----------
  await Promise.all(
    PLATFORMS.map(async (p) => {
      await Promise.all(
        p.modules.map(async (mod) => {
          const url = `${p.publicBase}/${mod.folder}/${mod.prefix}.csv`;
          const parsed = await getCachedCsv(url);
          if (!parsed) return;
          for (const r of parsed.rows) {
            const id = pick(r, ["Test Case ID", "id", "ID", "Case ID"]);
            if (!id) continue;
            tryAdd({
              id,
              source: p.id,
              sourceLabel: p.label,
              module: pick(r, ["Module", "Domain"]) || mod.label,
              scenario: pick(r, ["Test Scenario", "Scenario", "scenario"]),
              priority: pick(r, ["Priority", "priority"]),
              testType: pick(r, ["Test Type", "Type", "type"]),
              preconditions: pick(r, ["Preconditions", "Pre-conditions"]),
              steps: pick(r, ["Steps", "steps"]),
              expected: pick(r, ["Expected Result", "Expected"]),
              productRoute: `/p/${p.id}`,
              moduleId: mod.id,
              raw: r,
            });
          }
        }),
      );
    }),
  );

  // ---- 4. Industry-grounded scenarios (51k+ rows from industry_scenarios.json) ----
  try {
    const { getIndustryIndex, erpToPlatform } = await import("@/data/industryScenarios");
    const industryIdx = await getIndustryIndex();
    for (const s of industryIdx.scenarios) {
      const platformKey = erpToPlatform(s.erp_system, s.product);
      const domain = resolveDomain(s.industry);
      tryAdd({
        id: s.scenario_id,
        source: platformKey,
        sourceLabel: s.erp_system || s.product || "Industry",
        module: s.product || s.modules[0] || s.industry,
        scenario: s.e2e_scenario_name,
        priority: s.priority,
        testType: s.test_type,
        preconditions: s.integration_hint,
        steps: s.business_description,
        expected: "End-to-end flow completes without functional or data errors.",
        productRoute: `/industries/${domain.slug}`,
        raw: {
          "Test Case ID": s.scenario_id,
          "Test Scenario": s.e2e_scenario_name,
          Industry: s.industry,
          Domain: domain.name,
          "Industry Lineage": s.industry_lineage.join(" > "),
          Product: s.product,
          "Product Lineage": s.product_lineage.join(" > "),
          "ERP System": s.erp_system,
          Module: s.modules.join(", "),
          "Data Sources": s.data_sources.join(", "),
          Priority: s.priority,
          "Test Type": s.test_type,
          "Auto Feasibility": s.auto_feasibility,
          Preconditions: s.integration_hint,
          Steps: s.business_description,
          "Expected Result": "End-to-end flow completes without functional or data errors.",
          Batch: s.batch,
        },
      });
    }
  } catch {
    // Industry index unavailable — keep going.
  }

  // Help fuzzy lookup for known prefixes that may not have appeared yet
  const STATIC_PREFIXES: Record<string, string> = {
    SAP: "sap",
    SF: "salesforce",
    "SF-SA": "salesforce",
    "SF-MA": "salesforce",
    "SF-SE": "salesforce",
    "SF-HC": "salesforce",
    "SF-FSC": "salesforce",
    VV: "veeva",
    WD: "workday",
    SN: "servicenow",
    D365: "dynamics365",
    ORA: "oracle",
    API: "api",
    IOS: "ios",
    AND: "android",
    AWS: "aws",
    GCP: "gcp",
    AZ: "azure",
    WEB: "webapps",
    TOP: "topproducts",
    ASA: "asana",
    CYB: "cyberark",
    DOC: "docusign",
    GOO: "googleworkspace",
    MED: "medallia",
    ODO: "odoo",
    PRO: "procore",
    PTC: "ptcwindchill",
    QAD: "qad",
    SMA: "smartsheet",
    ZOH: "zoho",
    ZOO: "zoom",
    ZSC: "zscaler",
    "3DE": "3dexperience",
    ADO: "adobeexperiencecloud",
    ADP: "adpworkforcenow",
    ANA: "anaplan",
    AUT: "automationanywhere",
    BLA: "blackline",
    BOO: "boomi",
    COU: "coupa",
    CRO: "crowdstrike",
    DAT: "datadog",
    EPI: "epicor",
    HUB: "hubspot",
    IBM: "ibmmaximo",
    INF: "inforcloudsuite",
    JIR: "jira",
    MUL: "mulesoft",
    NET: "netsuite",
    OKT: "okta",
    PAL: "palantirfoundry",
    QLI: "qliksense",
    QUA: "qualtrics",
    RHE: "rhel",
    SAG: "sageintacct",
    SNO: "snowflake",
    SPL: "splunk",
    STR: "strata",
    TAB: "tableau",
    TEA: "teamcenter",
    UIP: "uipath",
    UKG: "ukgpro",
    VSP: "vsphere",
    ZEN: "zendesk",
  };
  for (const [pref, src] of Object.entries(STATIC_PREFIXES)) {
    if (!prefixToSource.has(pref)) prefixToSource.set(pref, src);
  }

  let totalModules = 0;
  for (const s of bySource.values()) totalModules += s.modules.size;

  return {
    byId,
    cases: [...byId.values()],
    prefixToSource,
    bySource,
    duplicatesRemoved,
    totalModules,
    builtAt: Date.now(),
  };
}

/** Resolve any test ID to its index entry. */
export async function findCaseById(id: string): Promise<IndexedCase | null> {
  const idx = await getGlobalIndex();
  return idx.byId.get(id.trim()) ?? null;
}

/** Best-effort source key from an ID prefix (synchronous after first build). */
export async function guessSourceFromId(id: string): Promise<string | null> {
  const idx = await getGlobalIndex();
  const trimmed = id.trim().toUpperCase();
  // Try longer prefixes first
  const parts = trimmed.split("-");
  for (let n = Math.min(parts.length, 3); n >= 1; n--) {
    const candidate = parts.slice(0, n).join("-");
    const hit = idx.prefixToSource.get(candidate);
    if (hit) return hit;
  }
  return null;
}
