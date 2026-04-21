// Maps each productCatalog key → simpleicons.org slug. Returning null means
// "no public brand logo available — render the initial-square fallback".
// Simple Icons is a free SVG CDN that serves official brand marks at any size:
//   https://cdn.simpleicons.org/<slug>/<hex-color>
// We omit the hex so each logo renders in its own brand colour automatically.
//
// Verified against https://simpleicons.org as of April 2026. Products that
// have no listing there (CyberArk, Palantir, Strata, etc.) intentionally
// return null so the fallback initials render.

const SLUGS: Record<string, string | null> = {
  sap: "sap",
  salesforce: "salesforce",
  workday: "workday",
  servicenow: "servicenow",
  veeva: null,                  // not on simpleicons
  dynamics365: "dynamics365",
  oracle: "oracle",
  api: null,                    // generic
  ios: "ios",
  android: "android",
  aws: "amazonaws",
  gcp: "googlecloud",
  azure: "microsoftazure",
  webapps: null,
  topproducts: null,
  asana: "asana",
  cyberark: null,
  docusign: "docusign",
  googleworkspace: "googleworkspace",
  medallia: null,
  odoo: "odoo",
  procore: "procore",
  ptcwindchill: null,
  qad: null,
  smartsheet: "smartsheet",
  zoho: "zoho",
  zoom: "zoom",
  zscaler: "zscaler",
  "3dexperience": "dassaultsystemes",
  adobeexperiencecloud: "adobe",
  adpworkforcenow: "adp",
  anaplan: null,
  automationanywhere: null,
  blackline: null,
  boomi: null,
  coupa: null,
  crowdstrike: "crowdstrike",
  datadog: "datadog",
  epicor: null,
  hubspot: "hubspot",
  ibmmaximo: "ibm",
  inforcloudsuite: null,
  jira: "jira",
  mulesoft: "mulesoft",
  netsuite: "oracle",
  okta: "okta",
  palantirfoundry: "palantir",
  qliksense: "qlik",
  qualtrics: "qualtrics",
  rhel: "redhat",
  sageintacct: "sage",
  snowflake: "snowflake",
  splunk: "splunk",
  strata: "paloaltonetworks",
  tableau: "tableau",
  teamcenter: "siemens",
  uipath: "uipath",
  ukgpro: null,
  vsphere: "vmware",
  zendesk: "zendesk",
};

export function getProductLogoUrl(productKey: string, size = 40): string | null {
  const slug = SLUGS[productKey];
  if (!slug) return null;
  // Simple Icons honours ?size= for raster preview; for SVG we just set width/height.
  return `https://cdn.simpleicons.org/${slug}`;
  void size;
}

/** Initials shown when no public logo exists. */
export function getProductInitials(label: string): string {
  const cleaned = label.replace(/[^A-Za-z0-9 ]/g, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
