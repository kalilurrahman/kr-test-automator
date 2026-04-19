// Static catalogue of the Salesforce test repositories shipped under /Salesforce.
// Counts reflect actual rows in each CSV (verified, not filler).

export type SalesforceCloudId =
  | "sales"
  | "marketing"
  | "service_cloud"
  | "health"
  | "financial"
  | "financial_variantB"
  | "financial_superpack";

export interface SalesforceCloud {
  id: SalesforceCloudId;
  name: string;
  shortName: string;
  description: string;
  domainFocus: string;
  cases: number;
  folder: string;       // path under /Salesforce/
  csv: string;          // CSV asset path
  html: string;         // HTML report path
  ts: string;           // TypeScript module path
  accent: string;       // tailwind text colour token
}

export const SALESFORCE_CLOUDS: SalesforceCloud[] = [
  {
    id: "sales",
    name: "Sales Cloud",
    shortName: "Sales",
    description: "Lead-to-order funnel scenarios across retail, banking and B2B segments.",
    domainFocus: "Lead → Opportunity → Quote → Order → Forecast",
    cases: 5000,
    folder: "sales",
    csv: "/Salesforce/sales/sales_cloud_5000.csv",
    html: "/Salesforce/sales/sales_cloud_5000.html",
    ts: "/Salesforce/sales/sales_cloud_5000.ts",
    accent: "text-sky-400",
  },
  {
    id: "marketing",
    name: "Marketing Cloud",
    shortName: "Marketing",
    description: "Journey Builder, email and engagement flows across consumer verticals.",
    domainFocus: "Visit → Form → Lead → Journey → Email",
    cases: 5000,
    folder: "marketing",
    csv: "/Salesforce/marketing/marketing_cloud_5000.csv",
    html: "/Salesforce/marketing/marketing_cloud_5000.html",
    ts: "/Salesforce/marketing/marketing_cloud_5000.ts",
    accent: "text-fuchsia-400",
  },
  {
    id: "service_cloud",
    name: "Service Cloud",
    shortName: "Service",
    description: "Case lifecycle, routing, knowledge and resolution paths.",
    domainFocus: "Case → Route → Knowledge → Resolve → Close",
    cases: 5000,
    folder: "service_cloud",
    csv: "/Salesforce/service_cloud/service_cloud_5000.csv",
    html: "/Salesforce/service_cloud/service_cloud_5000.html",
    ts: "/Salesforce/service_cloud/service_cloud_5000.ts",
    accent: "text-orange-400",
  },
  {
    id: "health",
    name: "Health Cloud",
    shortName: "Health",
    description: "Patient 360, payer/provider workflows with FHIR/HIPAA controls.",
    domainFocus: "Patient → Care plan → Payer → Claim",
    cases: 5000,
    folder: "health",
    csv: "/Salesforce/health/health_cloud_5000.csv",
    html: "/Salesforce/health/health_cloud_5000.html",
    ts: "/Salesforce/health/health_cloud_5000.ts",
    accent: "text-emerald-400",
  },
  {
    id: "financial",
    name: "Financial Services Cloud",
    shortName: "FSC",
    description: "Retail banking, wealth and AML flows for Person Account journeys.",
    domainFocus: "Person Account → Household → Compliance",
    cases: 5000,
    folder: "financial",
    csv: "/Salesforce/financial/financial_services_cloud_5000.csv",
    html: "/Salesforce/financial/financial_services_cloud_5000.html",
    ts: "/Salesforce/financial/financial_services_cloud_5000.ts",
    accent: "text-amber-400",
  },
  {
    id: "financial_variantB",
    name: "FSC · Variant B",
    shortName: "FSC B",
    description: "Alternate FSC variant focused on integration and regulatory edge-cases.",
    domainFocus: "Integration · Regulatory · Edge-cases",
    cases: 520,
    folder: "financial/variantB",
    csv: "/Salesforce/financial/variantB/financial_services_cloud_5000_variantB.csv",
    html: "/Salesforce/financial/variantB/financial_services_cloud_5000_variantB.html",
    ts: "/Salesforce/financial/variantB/financial_services_cloud_5000_variantB.ts",
    accent: "text-amber-300",
  },
  {
    id: "financial_superpack",
    name: "FSC SuperPack",
    shortName: "SuperPack",
    description: "Extended FSC repository with deeper regression and variant coverage.",
    domainFocus: "Regression · Variants · Deep coverage",
    cases: 5520,
    folder: "financial/superpack",
    csv: "/Salesforce/financial/superpack/fsc_superpack_10000.csv",
    html: "/Salesforce/financial/superpack/fsc_superpack_10000.html",
    ts: "/Salesforce/financial/superpack/fsc_superpack_10000.ts",
    accent: "text-yellow-400",
  },
];

export const TOTAL_SALESFORCE_CASES = SALESFORCE_CLOUDS.reduce((s, c) => s + c.cases, 0);

export function getCloud(id: SalesforceCloudId): SalesforceCloud | undefined {
  return SALESFORCE_CLOUDS.find((c) => c.id === id);
}

// Minimal, dependency-free CSV parser — handles quoted cells with embedded
// commas and newlines (matches the inline parser used in the static HTML pages).
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((ch === "\n" || (ch === "\r" && next === "\n")) && !inQuotes) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (ch === "\r") i++;
    } else {
      cell += ch;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0].trim() !== ""));
}

export interface SalesforceTestRow {
  id: string;
  cloud: string;
  module: string;
  domain: string;
  e2eFlow?: string;
  testType: string;
  scenario: string;
  preconditions: string;
  steps: string;
  expected: string;
  priority: string;
  type?: string;
  variant?: string;
}

export function rowsToObjects(rows: string[][]): SalesforceTestRow[] {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (key: string) => headers.findIndex((h) => h === key);

  const cId = idx("test case id");
  const cCloud = idx("cloud");
  const cMod = idx("module");
  const cDomain = idx("domain");
  const cE2E = idx("e2e flow");
  const cType = idx("test type");
  const cScenario = idx("test scenario");
  const cPre = idx("preconditions");
  const cSteps = idx("steps");
  const cExp = idx("expected result");
  const cPri = idx("priority");
  const cTypeCol = idx("type");
  const cVariant = idx("variant");

  return rows.slice(1).map((r) => ({
    id: (r[cId] ?? "").trim(),
    cloud: (r[cCloud] ?? "").trim(),
    module: (r[cMod] ?? "").trim(),
    domain: (r[cDomain] ?? "").trim(),
    e2eFlow: cE2E >= 0 ? (r[cE2E] ?? "").trim() : undefined,
    testType: (r[cType] ?? "").trim(),
    scenario: (r[cScenario] ?? "").trim(),
    preconditions: (r[cPre] ?? "").trim(),
    steps: (r[cSteps] ?? "").trim(),
    expected: (r[cExp] ?? "").trim(),
    priority: (r[cPri] ?? "").trim(),
    type: cTypeCol >= 0 ? (r[cTypeCol] ?? "").trim() : undefined,
    variant: cVariant >= 0 ? (r[cVariant] ?? "").trim() : undefined,
  }));
}
