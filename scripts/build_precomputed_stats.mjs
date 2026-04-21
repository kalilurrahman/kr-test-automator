#!/usr/bin/env node
/**
 * Pre-build pass: scan every shipped CSV (plus the curated SAP TS dataset and
 * the Salesforce static catalogue) once, compute the global stats + per-source
 * roll-ups, and emit:
 *
 *   public/precomputed-stats.json   — instant Dashboard payload
 *   public/precomputed-index.json   — id → source/module/priority lookup
 *
 * The runtime then loads these files synchronously on first paint instead of
 * fetching ~140 CSVs every visit. Re-run this script daily (or whenever
 * datasets change) — the runtime falls back to live CSV scans if the snapshot
 * is missing.
 */
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

// ---------- minimal CSV parser (matches src/lib/csv.ts) ----------------------
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const n = text[i + 1];
    if (c === '"' && q && n === '"') { cell += '"'; i++; }
    else if (c === '"') q = !q;
    else if (c === "," && !q) { row.push(cell); cell = ""; }
    else if ((c === "\n" || (c === "\r" && n === "\n")) && !q) {
      row.push(cell); rows.push(row); row = []; cell = "";
      if (c === "\r") i++;
    } else cell += c;
  }
  if (cell !== "" || row.length > 0) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0].trim() !== ""));
}
function parseObjects(text) {
  const raw = parseCsv(text);
  if (!raw.length) return { headers: [], rows: [] };
  const headers = raw[0].map((h) => h.trim());
  const rows = raw.slice(1).map((r) => {
    const o = {};
    headers.forEach((h, i) => (o[h] = (r[i] ?? "").trim()));
    return o;
  });
  return { headers, rows };
}
const pick = (r, ks) => { for (const k of ks) if (r[k]) return r[k]; return ""; };

// ---------- platform manifest (subset needed for scanning) -------------------
const PLATFORMS = [
  ["veeva","Veeva","VV","Veeva",[
    ["clinical","veeva_clinical_2500"],["regulatory","veeva_regulatory_2500"],
    ["quality","veeva_quality_2500"],["medical","veeva_medical_2500"],
    ["commercial","veeva_commercial_2500"],
  ]],
  ["workday","Workday","WD","workday/Workday",[
    ["hcm","workday_hcm_2500"],["payroll","workday_payroll_1500"],
    ["recruiting","workday_recruiting_1500"],["finance","workday_finance_1500"],
    ["integrations","workday_integrations_1500"],["reporting","workday_reporting_1500"],
    ["e2e","workday_e2e_1500"],
  ]],
  ["servicenow","ServiceNow","SN","ServiceNow",[
    ["itsm","servicenow_itsm_2500"],["itom","servicenow_itom_2500"],
    ["csm","servicenow_csm_2500"],["hrsd","servicenow_hrsd_2500"],
  ]],
  ["dynamics365","Dynamics 365","D365","Dynamics365",[
    ["sales","d365_sales_1500"],["customerservice","d365_customer_service_1500"],
    ["finance","d365_finance_1500"],["supplychain","d365_supply_chain_1500"],
    ["projectops","d365_project_ops_1500"],["m365","d365_m365_1500"],
  ]],
  ["oracle","Oracle Apps","ORA","OracleApps",[
    ["financials","oracle_financials_1500"],["procurement","oracle_procurement_1500"],
    ["scm","oracle_scm_1500"],["hcm","oracle_hcm_1500"],
    ["projects","oracle_projects_1500"],["epm","oracle_epm_1500"],
  ]],
  ["api","API","API","API",[
    ["rest","api_rest_1500"],["graphql","api_graphql_1500"],["grpc","api_grpc_1500"],
    ["webhook","api_webhook_1500"],["auth","api_auth_1500"],["contract","api_contract_1500"],
    ["performance","api_performance_1500"],["security","api_security_1500"],
  ]],
  ["ios","iOS","IOS","iOS",[
    ["login","ios_login_1500"],["onboarding","ios_onboarding_1500"],
    ["payments","ios_payments_1500"],["notifications","ios_notifications_1500"],
    ["offline","ios_offline_1500"],["profile","ios_profile_1500"],
    ["security","ios_security_1500"],["performance","ios_performance_1500"],
  ]],
  ["android","Android","AND","Android",[
    ["login","android_login_1500"],["onboarding","android_onboarding_1500"],
    ["payments","android_payments_1500"],["notifications","android_notifications_1500"],
    ["offline","android_offline_1500"],["profile","android_profile_1500"],
    ["security","android_security_1500"],["performance","android_performance_1500"],
  ]],
  ["aws","AWS","AWS","AWS",[
    ["iam","aws_iam_1500"],["ec2","aws_ec2_1500"],["s3","aws_s3_1500"],
    ["lambda","aws_lambda_1500"],["eks","aws_eks_1500"],["rds","aws_rds_1500"],
    ["security","aws_security_1500"],["cost","aws_cost_1500"],
  ]],
  ["gcp","GCP","GCP","GCP",[
    ["iam","gcp_iam_1500"],["compute","gcp_compute_1500"],["gke","gcp_gke_1500"],
    ["cloudrun","gcp_cloudrun_1500"],["bigquery","gcp_bigquery_1500"],
    ["storage","gcp_storage_1500"],["security","gcp_security_1500"],["cost","gcp_cost_1500"],
  ]],
  ["azure","Azure","AZ","Azure",[
    ["iam","azure_iam_1500"],["vm","azure_vm_1500"],["aks","azure_aks_1500"],
    ["functions","azure_functions_1500"],["sql","azure_sql_1500"],["storage","azure_storage_1500"],
    ["security","azure_security_1500"],["cost","azure_cost_1500"],
  ]],
  ["webapps","Web Apps","WEB","WebApps",[
    ["auth","webapps_auth_1500"],["forms","webapps_forms_1500"],
    ["checkout","webapps_checkout_1500"],["ui","webapps_ui_1500"],
    ["accessibility","webapps_accessibility_1500"],["api","webapps_api_1500"],
    ["performance","webapps_performance_1500"],["security","webapps_security_1500"],
  ]],
  ["topproducts","Top Products","TOP","TopProducts",[
    ["sap","top_sap_1000"],["salesforce","top_salesforce_1000"],
    ["servicenow","top_servicenow_1000"],["workday","top_workday_1000"],
    ["veeva","top_veeva_1000"],["d365","top_d365_1000"],["oracle","top_oracle_1000"],
  ]],
];

const WAVE_FOLDERS = [
  ["asana","Asana","ASA"],["cyberark","CyberArk","CYB"],["docusign","DocuSign","DOC"],
  ["googleworkspace","GoogleWorkspace","GOO"],["medallia","Medallia","MED"],
  ["odoo","Odoo","ODO"],["procore","Procore","PRO"],["ptcwindchill","PTCWindchill","PTC"],
  ["qad","QAD","QAD"],["smartsheet","Smartsheet","SMA"],["zoho","Zoho","ZOH"],
  ["zoom","Zoom","ZOO"],["zscaler","Zscaler","ZSC"],
  ["3dexperience","3DEXPERIENCE","3DE"],["adobeexperiencecloud","AdobeExperienceCloud","ADO"],
  ["adpworkforcenow","ADPWorkforceNow","ADP"],["anaplan","Anaplan","ANA"],
  ["automationanywhere","AutomationAnywhere","AUT"],["blackline","BlackLine","BLA"],
  ["boomi","Boomi","BOO"],["coupa","Coupa","COU"],["crowdstrike","CrowdStrike","CRO"],
  ["datadog","Datadog","DAT"],["epicor","Epicor","EPI"],["hubspot","HubSpot","HUB"],
  ["ibmmaximo","IBMMaximo","IBM"],["inforcloudsuite","InforCloudSuite","INF"],
  ["jira","Jira","JIR"],["mulesoft","MuleSoft","MUL"],["netsuite","NetSuite","NET"],
  ["okta","Okta","OKT"],["palantirfoundry","PalantirFoundry","PAL"],
  ["qliksense","QlikSense","QLI"],["qualtrics","Qualtrics","QUA"],["rhel","RHEL","RHE"],
  ["sageintacct","SageIntacct","SAG"],["snowflake","Snowflake","SNO"],
  ["splunk","Splunk","SPL"],["strata","Strata","STR"],["tableau","Tableau","TAB"],
  ["teamcenter","Teamcenter","TEA"],["uipath","UiPath","UIP"],["ukgpro","UKGPro","UKG"],
  ["vsphere","vSphere","VSP"],["zendesk","Zendesk","ZEN"],
];

async function findCsvs(rootFolder) {
  const out = [];
  const full = path.join(ROOT, rootFolder);
  if (!existsSync(full)) return out;
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.isFile() && e.name.toLowerCase().endsWith(".csv")) out.push(p);
    }
  }
  await walk(full);
  return out;
}

async function safeRead(p) {
  try { return await readFile(p, "utf8"); } catch { return null; }
}

const byId = new Map();
const bySource = new Map();
let duplicatesRemoved = 0;
let totalCases = 0;
let totalModules = 0;
const perPlatform = [];
let high = 0, medium = 0, low = 0;

function addCase(id, source, sourceLabel, moduleName, priority) {
  if (!id) return;
  if (byId.has(id)) { duplicatesRemoved++; return; }
  byId.set(id, { source, module: moduleName });
  let s = bySource.get(source);
  if (!s) { s = { label: sourceLabel, total: 0, modules: new Set(), high: 0, medium: 0, low: 0 }; bySource.set(source, s); }
  s.total++;
  if (moduleName) s.modules.add(moduleName);
  const p = (priority || "").toLowerCase();
  if (p === "high" || p === "critical") { s.high++; high++; }
  else if (p === "medium") { s.medium++; medium++; }
  else if (p === "low") { s.low++; low++; }
  totalCases++;
}

async function ingestCsv(file, source, sourceLabel, defaultModule) {
  const text = await safeRead(file);
  if (!text || text.trimStart().startsWith("<")) return;
  const { rows } = parseObjects(text);
  for (const r of rows) {
    const id = pick(r, ["Test Case ID", "id", "ID", "Case ID"]);
    const mod = pick(r, ["Module", "Domain", "Capability"]) || defaultModule;
    const pri = pick(r, ["Priority", "priority"]);
    addCase(id, source, sourceLabel, mod, pri);
  }
}

console.log("⏳ Scanning CSVs…");

for (const [id, label, , folderRoot, mods] of PLATFORMS) {
  for (const [modId, prefix] of mods) {
    const file = path.join(ROOT, folderRoot, modId, `${prefix}.csv`);
    if (existsSync(file)) await ingestCsv(file, id, label, modId);
  }
}

for (const [id, folder, ] of WAVE_FOLDERS) {
  const files = await findCsvs(folder);
  for (const f of files) {
    const moduleFolder = path.basename(path.dirname(f));
    await ingestCsv(f, id, folder, moduleFolder);
  }
}

const SF = [
  ["sales","Sales Cloud","Salesforce/sales/sales_cloud_5000.csv"],
  ["marketing","Marketing Cloud","Salesforce/marketing/marketing_cloud_5000.csv"],
  ["service_cloud","Service Cloud","Salesforce/service/service_cloud_5000.csv"],
  ["health","Health Cloud","Salesforce/health/health_cloud_5000.csv"],
  ["financial","Financial Services Cloud","Salesforce/financial/financial_services_cloud_5000.csv"],
  ["financial_variantB","FSC Variant B","Salesforce/financial/variantB/financial_services_cloud_5000_variantB.csv"],
  ["financial_superpack","FSC SuperPack","Salesforce/financial/superpack/fsc_superpack_10000.csv"],
];
for (const [, name, rel] of SF) {
  const f = path.join(ROOT, rel);
  if (existsSync(f)) await ingestCsv(f, "salesforce", "Salesforce", name);
}

const SAP_DATA_DIR = path.join(PUBLIC, "sap-data");
if (existsSync(SAP_DATA_DIR)) {
  const files = await readdir(SAP_DATA_DIR);
  for (const f of files) {
    if (!f.endsWith(".csv")) continue;
    const mod = f.replace(/\.csv$/, "").toUpperCase();
    await ingestCsv(path.join(SAP_DATA_DIR, f), "sap", "SAP", mod);
  }
}

for (const [src, s] of bySource) {
  perPlatform.push({ name: s.label, value: s.total });
  totalModules += s.modules.size;
}
perPlatform.sort((a, b) => b.value - a.value);

const stats = {
  totalCases,
  totalModules,
  uniqueIds: byId.size,
  duplicatesRemoved,
  lastUpdated: Date.now(),
  byPriority: [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ].filter((d) => d.value > 0),
  topPlatforms: perPlatform,
  bySource: Object.fromEntries(
    [...bySource.entries()].map(([k, v]) => [k, {
      label: v.label, total: v.total, modules: [...v.modules],
      high: v.high, medium: v.medium, low: v.low,
    }]),
  ),
};

await writeFile(path.join(PUBLIC, "precomputed-stats.json"), JSON.stringify(stats, null, 2));
console.log(`✅ precomputed-stats.json — ${totalCases.toLocaleString()} cases, ${byId.size.toLocaleString()} unique IDs, ${duplicatesRemoved.toLocaleString()} duplicates removed.`);

const indexPayload = {
  builtAt: Date.now(),
  ids: Object.fromEntries([...byId.entries()].map(([id, v]) => [id, [v.source, v.module]])),
};
await writeFile(path.join(PUBLIC, "precomputed-index.json"), JSON.stringify(indexPayload));
const sizeMb = (Buffer.byteLength(JSON.stringify(indexPayload)) / 1024 / 1024).toFixed(2);
console.log(`✅ precomputed-index.json — ${byId.size.toLocaleString()} IDs (${sizeMb} MB).`);
