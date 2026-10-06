/**
 * Product marks use bundled Simple Icons SVGs when an exact mark is available,
 * followed by that product's official-site favicon. Generic Validaira industry
 * packs use a domain icon instead of a made-up vendor logo.
 */

const SIMPLE_ICON_SLUGS: Record<string, string> = {
  sap: "sap",
  ios: "ios",
  android: "android",
  gcp: "googlecloud",
  asana: "asana",
  odoo: "odoo",
  zoho: "zoho",
  zoom: "zoom",
  "3dexperience": "dassaultsystemes",
  adpworkforcenow: "adp",
  datadog: "datadog",
  hubspot: "hubspot",
  jira: "jira",
  okta: "okta",
  palantirfoundry: "palantir",
  foundryai: "palantir",
  qliksense: "qlik",
  qualtrics: "qualtrics",
  rhel: "redhat",
  sageintacct: "sage",
  snowflake: "snowflake",
  snowflakeai: "snowflake",
  splunk: "splunk",
  strata: "paloaltonetworks",
  teamcenter: "siemens",
  uipath: "uipath",
  vsphere: "vmware",
  zendesk: "zendesk",
  claudecode: "claudecode",
  geminiantigravity: "googlegemini",
  githubcopilot: "githubcopilot",
  cursor: "cursor",
  windsurf: "windsurf",
  dataiku: "dataiku",
  databricks: "databricks",
  "mongodb-atlas": "mongodb",
  "supabase-platform": "supabase",
  vercel: "vercel",
  langsmith: "langchain",
  huggingfacehub: "huggingface",
  airbyte: "airbyte",
  apacheairflow: "apacheairflow",
  prefect: "prefect",
  n8n: "n8n",
  crewai: "crewai",
  shopify: "shopify",
  stripe: "stripe",
  cline: "cline",
  "replit-agent": "replit",
  "gitlab-duo": "gitlab",
  "jetbrains-junie": "jetbrains",
};

/** Domains are intentionally explicit so similarly named products don't pick the wrong logo. */
const OFFICIAL_DOMAINS: Record<string, string> = {
  salesforce: "salesforce.com",
  workday: "workday.com",
  servicenow: "servicenow.com",
  veeva: "veeva.com",
  dynamics365: "dynamics.microsoft.com",
  oracle: "oracle.com",
  aws: "aws.amazon.com",
  azure: "azure.microsoft.com",
  cyberark: "cyberark.com",
  docusign: "docusign.com",
  googleworkspace: "workspace.google.com",
  medallia: "medallia.com",
  procore: "procore.com",
  ptcwindchill: "ptc.com",
  qad: "qad.com",
  smartsheet: "smartsheet.com",
  zscaler: "zscaler.com",
  adobeexperiencecloud: "adobe.com",
  anaplan: "anaplan.com",
  automationanywhere: "automationanywhere.com",
  blackline: "blackline.com",
  boomi: "boomi.com",
  coupa: "coupa.com",
  crowdstrike: "crowdstrike.com",
  epicor: "epicor.com",
  ibmmaximo: "ibm.com",
  inforcloudsuite: "infor.com",
  mulesoft: "mulesoft.com",
  netsuite: "netsuite.com",
  tableau: "tableau.com",
  ukgpro: "ukg.com",
  codex: "openai.com",
  apacheiceberg: "iceberg.apache.org",
  medidata: "medidata.com",
  iqvia: "www.iqvia.com",
  microsoftfabric: "microsoft.com",
  dbt: "getdbt.com",
  confluentcloud: "confluent.io",
  fivetran: "fivetran.com",
  pinecone: "pinecone.io",
  dagster: "dagster.io",
  kiro: "kiro.dev",
  "devin": "devin.ai",
  openhands: "openhands.dev",
  "factory-droid": "factory.ai",
  "roo-code": "roocode.com",
  "sourcegraph-amp": "sourcegraph.com",
};

export type ProductFallbackGlyph =
  | "code" | "web" | "top" | "pharma" | "medical" | "healthcare" | "factory"
  | "defense" | "automation" | "cpg" | "energy" | "insurance" | "finance"
  | "aerospace" | "logistics" | "automotive" | "construction" | "travel"
  | "agriculture" | "telecom" | "public" | "education" | "media" | "realestate";

const FALLBACK_GLYPHS: Record<string, ProductFallbackGlyph> = {
  api: "code",
  webapps: "web",
  topproducts: "top",
  phamagxp: "pharma",
  medtech: "medical",
  "healthcare-operations": "healthcare",
  "manufacturing-mes": "factory",
  "defense-systems": "defense",
  "industrial-automation": "automation",
  "cpg-operations": "cpg",
  "energy-utilities": "energy",
  "insurance-suite": "insurance",
  "financial-services": "finance",
  aerospace: "aerospace",
  "logistics-supply-chain": "logistics",
  "automotive-mobility": "automotive",
  "construction-aec": "construction",
  "travel-hospitality": "travel",
  "agriculture-agritech": "agriculture",
  "telecom-network-ops": "telecom",
  "public-services": "public",
  "education-research": "education",
  "media-entertainment": "media",
  "real-estate-facilities": "realestate",
};

export function getProductLogoUrls(productKey: string): string[] {
  const urls: string[] = [];
  const iconSlug = SIMPLE_ICON_SLUGS[productKey];
  const domain = OFFICIAL_DOMAINS[productKey];

  if (iconSlug) urls.push(`/logos/simple-icons/${iconSlug}.svg`);
  if (domain) {
    urls.push(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`);
  }
  return urls;
}

export function getProductFallbackGlyph(productKey: string): ProductFallbackGlyph | null {
  return FALLBACK_GLYPHS[productKey] ?? null;
}

/** Initials remain the last-resort mark if a vendor changes its favicon. */
export function getProductInitials(label: string): string {
  const cleaned = label.replace(/[^A-Za-z0-9 ]/g, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
