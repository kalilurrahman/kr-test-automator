/**
 * Single source of truth for the 15-platform enterprise test catalogue.
 * Drives the Dashboard, About page, and grouped header navigation.
 *
 * NOTE: Module names and counts are read directly from the existing
 * manifest.json files in the static folders — no datasets are regenerated.
 */

export type ProductRouteKind = "spa" | "static";

export interface ProductEntry {
  key: string;
  label: string;
  shortLabel: string;
  description: string;
  /** Where the platform's launcher lives */
  route: string;
  /** SPA = internal React route. static = launches a bundled HTML index */
  kind: ProductRouteKind;
  /** Module / cloud / capability names */
  modules: string[];
  /** Stable ID prefix used when deep-linking individual cases */
  idPrefix: string;
  /** Tailwind colour family to tint the card */
  accent: "gold" | "blue" | "violet" | "teal" | "emerald" | "amber" | "rose" | "cyan" | "indigo";
}

export const PRODUCT_CATALOG: ProductEntry[] = [
  {
    key: "sap",
    label: "SAP",
    shortLabel: "SAP",
    description: "841 curated test cases across S/4HANA modules, with analytics dashboard.",
    route: "/sap",
    kind: "spa",
    modules: ["FI", "CO", "MM", "SD", "PP", "QM", "WM", "HCM", "Ph-II"],
    idPrefix: "SAP",
    accent: "gold",
  },
  {
    key: "salesforce",
    label: "Salesforce",
    shortLabel: "Salesforce",
    description: "5,000+ scenarios across Sales, Service, Marketing, Health & Financial Services Clouds.",
    route: "/salesforce",
    kind: "spa",
    modules: ["Sales", "Service", "Marketing", "Health", "Financial", "FSC SuperPack"],
    idPrefix: "SF",
    accent: "blue",
  },
  {
    key: "workday",
    label: "Workday",
    shortLabel: "Workday",
    description: "10K+ HCM, Payroll, Recruiting, Finance, Reporting & integration scenarios.",
    route: "/workday/Workday/index.html",
    kind: "static",
    modules: ["HCM", "Payroll", "Recruiting", "Finance", "Integrations", "Reporting", "E2E"],
    idPrefix: "WD",
    accent: "amber",
  },
  {
    key: "servicenow",
    label: "ServiceNow",
    shortLabel: "ServiceNow",
    description: "ITSM, ITOM, CSM, HRSD and SecOps end-to-end test packs.",
    route: "/ServiceNow/index.html",
    kind: "static",
    modules: ["ITSM", "ITOM", "CSM", "HRSD", "SecOps"],
    idPrefix: "SN",
    accent: "emerald",
  },
  {
    key: "veeva",
    label: "Veeva",
    shortLabel: "Veeva",
    description: "Life-sciences vault: Clinical, Regulatory, Quality, Medical & Commercial.",
    route: "/Veeva/index.html",
    kind: "static",
    modules: ["Clinical", "Regulatory", "Quality", "Medical", "Commercial", "Vault"],
    idPrefix: "VV",
    accent: "rose",
  },
  {
    key: "dynamics365",
    label: "Dynamics 365",
    shortLabel: "Dynamics 365",
    description: "Sales, Customer Service, Finance, Supply Chain, Project Ops and M365.",
    route: "/Dynamics365/index.html",
    kind: "static",
    modules: ["Sales", "Customer Service", "Finance", "Supply Chain", "Project Ops", "Marketing", "M365"],
    idPrefix: "D365",
    accent: "violet",
  },
  {
    key: "oracle",
    label: "Oracle Apps",
    shortLabel: "Oracle",
    description: "Oracle Fusion: Financials, Procurement, SCM, HCM, Projects, EPM and CX.",
    route: "/OracleApps/index.html",
    kind: "static",
    modules: ["Financials", "Procurement", "SCM", "HCM", "Projects", "EPM", "CX"],
    idPrefix: "ORA",
    accent: "rose",
  },
  {
    key: "api",
    label: "API",
    shortLabel: "API",
    description: "REST, GraphQL, gRPC, webhooks, contract, performance & security testing.",
    route: "/API/index.html",
    kind: "static",
    modules: ["REST", "GraphQL", "gRPC", "Webhook", "Auth", "Contract", "Performance", "Security", "Cross-platform"],
    idPrefix: "API",
    accent: "cyan",
  },
  {
    key: "ios",
    label: "iOS",
    shortLabel: "iOS",
    description: "Login, onboarding, payments, push, security & performance on iOS.",
    route: "/iOS/index.html",
    kind: "static",
    modules: ["Login", "Onboarding", "Payments", "Notifications", "Offline", "Profile", "Security", "Performance"],
    idPrefix: "IOS",
    accent: "indigo",
  },
  {
    key: "android",
    label: "Android",
    shortLabel: "Android",
    description: "Login, onboarding, payments, push, security & performance on Android.",
    route: "/Android/index.html",
    kind: "static",
    modules: ["Login", "Onboarding", "Payments", "Notifications", "Offline", "Profile", "Security", "Performance"],
    idPrefix: "AND",
    accent: "emerald",
  },
  {
    key: "aws",
    label: "AWS",
    shortLabel: "AWS",
    description: "IAM, EC2, S3, Lambda, EKS, RDS, security & cost test packs.",
    route: "/AWS/index.html",
    kind: "static",
    modules: ["IAM", "EC2", "S3", "Lambda", "EKS", "RDS", "Security", "Cost"],
    idPrefix: "AWS",
    accent: "amber",
  },
  {
    key: "gcp",
    label: "GCP",
    shortLabel: "GCP",
    description: "IAM, Compute, GKE, Cloud Run, BigQuery, Storage, Security & Cost.",
    route: "/GCP/index.html",
    kind: "static",
    modules: ["IAM", "Compute", "GKE", "Cloud Run", "BigQuery", "Storage", "Security", "Cost"],
    idPrefix: "GCP",
    accent: "blue",
  },
  {
    key: "azure",
    label: "Azure",
    shortLabel: "Azure",
    description: "IAM, VMs, AKS, Functions, SQL, Storage, Security & Cost on Azure.",
    route: "/Azure/index.html",
    kind: "static",
    modules: ["IAM", "VM", "AKS", "Functions", "SQL", "Storage", "Security", "Cost"],
    idPrefix: "AZ",
    accent: "cyan",
  },
  {
    key: "webapps",
    label: "Web Apps",
    shortLabel: "Web Apps",
    description: "Auth, forms, checkout, UI, accessibility, API, performance & security.",
    route: "/WebApps/index.html",
    kind: "static",
    modules: ["Auth", "Forms", "Checkout", "UI", "Accessibility", "API", "Performance", "Security"],
    idPrefix: "WEB",
    accent: "teal",
  },
  {
    key: "topproducts",
    label: "Top Products",
    shortLabel: "Top Products",
    description: "Curated cross-product launchers: SAP, Salesforce, ServiceNow, Workday, Veeva, D365, Oracle.",
    route: "/TopProducts/index.html",
    kind: "static",
    modules: ["SAP", "Salesforce", "ServiceNow", "Workday", "Veeva", "D365", "Oracle"],
    idPrefix: "TOP",
    accent: "gold",
  },
];

export const TOTAL_PRODUCTS = PRODUCT_CATALOG.length;
export const TOTAL_MODULES = PRODUCT_CATALOG.reduce((sum, p) => sum + p.modules.length, 0);

/** Approximate bundled test-case count surfaced on the dashboard. */
export const BUNDLED_TEST_COUNT = 841 + 5000; // SAP + Salesforce SPA datasets

export const ACCENT_CLASSES: Record<ProductEntry["accent"], string> = {
  gold: "border-primary/30 hover:border-primary/60 hover:shadow-[0_0_24px_-8px_hsl(var(--primary)/0.4)]",
  blue: "border-blue-500/30 hover:border-blue-500/60",
  violet: "border-violet-500/30 hover:border-violet-500/60",
  teal: "border-teal-500/30 hover:border-teal-500/60",
  emerald: "border-emerald-500/30 hover:border-emerald-500/60",
  amber: "border-amber-500/30 hover:border-amber-500/60",
  rose: "border-rose-500/30 hover:border-rose-500/60",
  cyan: "border-cyan-500/30 hover:border-cyan-500/60",
  indigo: "border-indigo-500/30 hover:border-indigo-500/60",
};

/**
 * Resolve a stable test ID (e.g. "SF-HC-00005", "SAP-001") to the catalogue
 * entry that owns it. Used by the dashboard's "Find by ID" deep-link.
 */
export function resolveProductByTestId(rawId: string): ProductEntry | null {
  const id = rawId.trim().toUpperCase();
  if (!id) return null;
  // Match the longest prefix first to disambiguate e.g. SF-* vs SFC-*
  const sorted = [...PRODUCT_CATALOG].sort((a, b) => b.idPrefix.length - a.idPrefix.length);
  for (const p of sorted) {
    if (id.startsWith(p.idPrefix + "-") || id.startsWith(p.idPrefix)) return p;
  }
  return null;
}
