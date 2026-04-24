/**
 * Family taxonomy that buckets every entry in PRODUCT_CATALOG into one of six
 * logical industry families. Used by /platforms, /services and the header
 * dropdown so users can navigate by similarity instead of scanning a flat list.
 *
 * If a product key is not listed here it falls back to "Other".
 */
import { PRODUCT_CATALOG, type ProductEntry } from "@/data/productCatalog";

export type FamilyKey =
  | "erp_finance"
  | "healthcare_lifesciences"
  | "telecom_network"
  | "cloud_devops"
  | "government_public"
  | "commerce_retail"
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

  // ── Telecom / Network ────────────────────────────────────────────────────
  cyberark: "telecom_network",
  okta: "telecom_network",
  zscaler: "telecom_network",
  strata: "telecom_network",
  crowdstrike: "telecom_network",
  splunk: "telecom_network",

  // ── Cloud / DevOps ───────────────────────────────────────────────────────
  aws: "cloud_devops",
  gcp: "cloud_devops",
  azure: "cloud_devops",
  api: "cloud_devops",
  snowflake: "cloud_devops",
  datadog: "cloud_devops",
  jira: "cloud_devops",
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

  // ── Other / Cross-cutting ────────────────────────────────────────────────
  ios: "other",
  android: "other",
  webapps: "other",
  topproducts: "other",
  googleworkspace: "other",
  zoom: "other",
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
