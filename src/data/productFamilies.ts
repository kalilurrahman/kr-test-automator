/**
 * Family taxonomy that buckets every entry in PRODUCT_CATALOG into industry and product families
 * logical industry families. Used by /platforms, /services and the header
 * dropdown so users can navigate by similarity instead of scanning a flat list.
 *
 * If a product key is not listed here it falls back to "Other".
 */
import { PRODUCT_CATALOG, type ProductEntry } from "@/data/productCatalog";

export type FamilyKey =
  | "erp_finance"
  | "financial_services"
  | "healthcare_lifesciences"
  | "manufacturing_industrial"
  | "energy_logistics"
  | "telecom_network"
  | "data_ai"
  | "ai_developer_tools"
  | "cloud_devops"
  | "government_public"
  | "commerce_retail"
  | "built_environment"
  | "agriculture_food"
  | "education_research"
  | "media_entertainment"
  | "other";

export interface ProductFamily {
  key: FamilyKey;
  label: string;
  shortLabel: string;
  blurb: string;
  /** Tailwind hue used to tint family chip / header */
  accent: "gold" | "blue" | "violet" | "teal" | "emerald" | "amber" | "rose" | "cyan" | "indigo";
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    key: "erp_finance",
    label: "ERP / Finance",
    shortLabel: "ERP / Finance",
    blurb: "Core ERP suites, financial close, planning and back-office record systems.",
    accent: "gold",
  },
  {
    key: "healthcare_lifesciences",
    label: "Healthcare / Life Sciences",
    shortLabel: "Healthcare / LS",
    blurb: "Clinical, regulated, GxP, EHR and life-sciences platforms.",
    accent: "rose",
  },
  {
    key: "telecom_network",
    label: "Telecom / Network",
    shortLabel: "Telecom / Network",
    blurb: "Network security, identity, OSS/BSS and zero-trust connectivity stacks.",
    accent: "indigo",
  },
  {
    key: "data_ai",
    label: "Data & AI Platforms",
    shortLabel: "Data & AI",
    blurb: "Analytics, data engineering, model ecosystems, AI development, and intelligent application platforms.",
    accent: "violet",
  },
  {
    key: "ai_developer_tools",
    label: "AI Developer Tools",
    shortLabel: "AI Dev Tools",
    blurb: "Coding agents, IDE and CLI copilots, autonomous engineering, and developer-agent orchestration.",
    accent: "cyan",
  },
  {
    key: "financial_services",
    label: "Financial Services / Insurance",
    shortLabel: "Financial / Insurance",
    blurb: "Banking operations, payment workflows, policy administration, claims, lending and risk controls.",
    accent: "indigo",
  },
  {
    key: "manufacturing_industrial",
    label: "Manufacturing / Industrial",
    shortLabel: "Manufacturing / OT",
    blurb: "MES, aerospace, defense program administration, plant operations and industrial automation workflows.",
    accent: "amber",
  },
  {
    key: "energy_logistics",
    label: "Energy / Logistics",
    shortLabel: "Energy / Logistics",
    blurb: "Utilities, field service, transport, warehouse execution and supply-chain operations.",
    accent: "teal",
  },
  {
    key: "cloud_devops",
    label: "Cloud / DevOps",
    shortLabel: "Cloud / DevOps",
    blurb: "Hyperscalers, observability, automation, integration and platform engineering.",
    accent: "cyan",
  },
  {
    key: "government_public",
    label: "Government / Public Sector",
    shortLabel: "Gov / Public",
    blurb: "Public-sector workflows, citizen services, case management and compliance.",
    accent: "blue",
  },
  {
    key: "commerce_retail",
    label: "Commerce / Retail",
    shortLabel: "Commerce / Retail",
    blurb: "Sales, service, marketing, CX, retail and storefront commerce platforms.",
    accent: "amber",
  },
  {
    key: "built_environment",
    label: "Built Environment",
    shortLabel: "Built Environment",
    blurb: "Construction delivery, BIM coordination, property operations and facilities management.",
    accent: "teal",
  },
  {
    key: "agriculture_food",
    label: "Agriculture & Food Systems",
    shortLabel: "Agriculture",
    blurb: "Farm operations, agritech, field data, harvest traceability and resource reporting.",
    accent: "emerald",
  },
  {
    key: "education_research",
    label: "Education & Research",
    shortLabel: "Education / Research",
    blurb: "Learner services, research administration, grants, labs and scholarly publishing workflows.",
    accent: "blue",
  },
  {
    key: "media_entertainment",
    label: "Media & Entertainment",
    shortLabel: "Media / Entertainment",
    blurb: "Content operations, production, rights, distribution, subscriptions and audience workflows.",
    accent: "violet",
  },
  {
    key: "other",
    label: "Other / Cross-cutting",
    shortLabel: "Other",
    blurb: "Mobile, web, productivity, collaboration and miscellaneous launchers.",
    accent: "teal",
  },
];

export const FAMILY_BY_KEY = new Map(PRODUCT_FAMILIES.map((f) => [f.key, f]));

/** Mapping from product key → family key. Edit here to re-bucket products. */
export const PRODUCT_FAMILY_MAP: Record<string, FamilyKey> = {
  // ── ERP / Finance ────────────────────────────────────────────────────────
  sap: "erp_finance",
  workday: "erp_finance",
  oracle: "erp_finance",
  dynamics365: "erp_finance",
  netsuite: "erp_finance",
  odoo: "erp_finance",
  qad: "erp_finance",
  epicor: "erp_finance",
  inforcloudsuite: "erp_finance",
  sageintacct: "erp_finance",
  blackline: "erp_finance",
  anaplan: "erp_finance",
  coupa: "erp_finance",
  adpworkforcenow: "erp_finance",
  ukgpro: "erp_finance",

  // ── Healthcare / Life Sciences ───────────────────────────────────────────
  veeva: "healthcare_lifesciences",
  ibmmaximo: "healthcare_lifesciences", // EAM also used in pharma plants
  medidata: "healthcare_lifesciences",
  iqvia: "healthcare_lifesciences",
  phamagxp: "healthcare_lifesciences",
  medtech: "healthcare_lifesciences",
  "healthcare-operations": "healthcare_lifesciences",

  // ── Financial Services / Insurance ──────────────────────────────────────
  "insurance-suite": "financial_services",
  "financial-services": "financial_services",

  // ── Manufacturing / Industrial ──────────────────────────────────────────
  "manufacturing-mes": "manufacturing_industrial",
  "defense-systems": "manufacturing_industrial",
  "industrial-automation": "manufacturing_industrial",
  aerospace: "manufacturing_industrial",
  "automotive-mobility": "manufacturing_industrial",

  // ── Energy / Logistics ──────────────────────────────────────────────────
  "energy-utilities": "energy_logistics",
  "logistics-supply-chain": "energy_logistics",
  "construction-aec": "built_environment",
  "real-estate-facilities": "built_environment",
  "agriculture-agritech": "agriculture_food",
  "education-research": "education_research",
  "media-entertainment": "media_entertainment",

  // ── Telecom / Network ────────────────────────────────────────────────────
  cyberark: "telecom_network",
  okta: "telecom_network",
  zscaler: "telecom_network",
  strata: "telecom_network",
  crowdstrike: "telecom_network",
  splunk: "telecom_network",

  // ── Data & AI Platforms ─────────────────────────────────────────────────
  dataiku: "data_ai",
  apacheiceberg: "data_ai",
  databricks: "data_ai",
  snowflake: "data_ai",
  snowflakeai: "data_ai",
  foundryai: "data_ai",
  microsoftfabric: "data_ai",
  dbt: "data_ai",
  confluentcloud: "data_ai",
  "mongodb-atlas": "data_ai",
  fivetran: "data_ai",
  "supabase-platform": "data_ai",
  vercel: "data_ai",
  langsmith: "data_ai",
  pinecone: "data_ai",
  huggingfacehub: "data_ai",
  claudecode: "ai_developer_tools",
  codex: "ai_developer_tools",
  geminiantigravity: "ai_developer_tools",
  githubcopilot: "ai_developer_tools",
  cursor: "ai_developer_tools",
  windsurf: "ai_developer_tools",
  kiro: "ai_developer_tools",
  "gitlab-duo": "ai_developer_tools",
  "jetbrains-junie": "ai_developer_tools",
  "replit-agent": "ai_developer_tools",
  devin: "ai_developer_tools",
  cline: "ai_developer_tools",
  openhands: "ai_developer_tools",
  "factory-droid": "ai_developer_tools",
  "roo-code": "ai_developer_tools",
  "sourcegraph-amp": "ai_developer_tools",
  airbyte: "data_ai",
  apacheairflow: "data_ai",
  prefect: "data_ai",
  dagster: "data_ai",
  n8n: "cloud_devops",
  crewai: "data_ai",

  // ── Cloud / DevOps ───────────────────────────────────────────────────────
  aws: "cloud_devops",
  gcp: "cloud_devops",
  azure: "cloud_devops",
  api: "cloud_devops",
  datadog: "cloud_devops",
  jira: "cloud_devops",
  github: "cloud_devops",
  gitlab: "cloud_devops",
  mulesoft: "cloud_devops",
  boomi: "cloud_devops",
  uipath: "cloud_devops",
  automationanywhere: "cloud_devops",
  rhel: "cloud_devops",
  vsphere: "cloud_devops",
  palantirfoundry: "cloud_devops",
  tableau: "cloud_devops",
  qliksense: "cloud_devops",
  "3dexperience": "cloud_devops",
  ptcwindchill: "cloud_devops",
  teamcenter: "cloud_devops",
  procore: "cloud_devops",

  // ── Government / Public Sector ───────────────────────────────────────────
  servicenow: "government_public",
  docusign: "government_public",

  // ── Commerce / Retail ────────────────────────────────────────────────────
  salesforce: "commerce_retail",
  hubspot: "commerce_retail",
  zendesk: "commerce_retail",
  adobeexperiencecloud: "commerce_retail",
  medallia: "commerce_retail",
  qualtrics: "commerce_retail",
  smartsheet: "commerce_retail",
  zoho: "commerce_retail",
  asana: "commerce_retail",
  shopify: "commerce_retail",
  stripe: "commerce_retail",
  "cpg-operations": "commerce_retail",

  // ── Other / Cross-cutting ────────────────────────────────────────────────
  ios: "other",
  android: "other",
  webapps: "other",
  topproducts: "other",
  googleworkspace: "other",
  zoom: "other",
  slack: "other",
  "microsoft-teams": "other",
  confluence: "other",
};

export function familyForProduct(p: ProductEntry): ProductFamily {
  const key = PRODUCT_FAMILY_MAP[p.key] ?? "other";
  return FAMILY_BY_KEY.get(key) ?? FAMILY_BY_KEY.get("other")!;
}

export interface FamilyBucket {
  family: ProductFamily;
  products: ProductEntry[];
}

/** Group all products by family, in the canonical family order. */
export function groupProductsByFamily(products: ProductEntry[] = PRODUCT_CATALOG): FamilyBucket[] {
  const buckets = new Map<FamilyKey, ProductEntry[]>();
  for (const f of PRODUCT_FAMILIES) buckets.set(f.key, []);
  for (const p of products) {
    const fam = familyForProduct(p);
    buckets.get(fam.key)!.push(p);
  }
  return PRODUCT_FAMILIES.map((family) => ({
    family,
    products: (buckets.get(family.key) ?? []).sort((a, b) =>
      a.label.localeCompare(b.label),
    ),
  })).filter((b) => b.products.length > 0);
}
