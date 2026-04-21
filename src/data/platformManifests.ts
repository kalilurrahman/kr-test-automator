/**
 * Catalog of every static platform's sub-modules and where to fetch their CSV data.
 * Used by the generic React `<PlatformPage>` so Veeva, Workday, ServiceNow, etc.
 * render with the same theme, header and footer as SAP/Salesforce.
 *
 * Keep this in sync with `scripts/generate_platform_pages.py` — the same source
 * folders feed both the SPA pages and the legacy static HTML launchers.
 */

export interface PlatformModule {
  /** URL slug used in /platform/:moduleId */
  id: string;
  label: string;
  /** Folder name on disk under the platform root (often = id) */
  folder: string;
  /** CSV filename without extension (used for download links + fetch path) */
  prefix: string;
}

export interface PlatformDef {
  /** URL slug used in /platform/:platformId */
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  /** Public path where the CSV files live (must match vite-static-copy dest) */
  publicBase: string;
  /** Stable ID prefix for deep-link to generator (e.g. "VV" → SF-HC-* style) */
  idPrefix: string;
  /** Tailwind accent token */
  accent: "gold" | "blue" | "violet" | "teal" | "emerald" | "amber" | "rose" | "cyan" | "indigo";
  modules: PlatformModule[];
}

const m = (id: string, label: string, prefix: string, folder = id): PlatformModule => ({
  id, label, folder, prefix,
});

export const PLATFORMS: PlatformDef[] = [
  {
    id: "veeva",
    label: "Veeva",
    shortLabel: "Veeva",
    description: "Life-sciences vault: Clinical, Regulatory, Quality, Medical & Commercial.",
    publicBase: "/Veeva",
    idPrefix: "VV",
    accent: "rose",
    modules: [
      m("clinical", "Clinical", "veeva_clinical_2500"),
      m("regulatory", "Regulatory", "veeva_regulatory_2500"),
      m("quality", "Quality", "veeva_quality_2500"),
      m("medical", "Medical", "veeva_medical_2500"),
      m("commercial", "Commercial", "veeva_commercial_2500"),
    ],
  },
  {
    id: "workday",
    label: "Workday",
    shortLabel: "Workday",
    description: "10K+ HCM, Payroll, Recruiting, Finance, Reporting & integration scenarios.",
    publicBase: "/workday/Workday",
    idPrefix: "WD",
    accent: "amber",
    modules: [
      m("hcm", "HCM", "workday_hcm_2500"),
      m("payroll", "Payroll", "workday_payroll_1500"),
      m("recruiting", "Recruiting", "workday_recruiting_1500"),
      m("finance", "Finance", "workday_finance_1500"),
      m("integrations", "Integrations", "workday_integrations_1500"),
      m("reporting", "Reporting", "workday_reporting_1500"),
      m("e2e", "End-to-End", "workday_e2e_1500"),
    ],
  },
  {
    id: "servicenow",
    label: "ServiceNow",
    shortLabel: "ServiceNow",
    description: "ITSM, ITOM, CSM and HRSD end-to-end test packs.",
    publicBase: "/ServiceNow",
    idPrefix: "SN",
    accent: "emerald",
    modules: [
      m("itsm", "ITSM", "servicenow_itsm_2500"),
      m("itom", "ITOM", "servicenow_itom_2500"),
      m("csm", "CSM", "servicenow_csm_2500"),
      m("hrsd", "HRSD", "servicenow_hrsd_2500"),
    ],
  },
  {
    id: "dynamics365",
    label: "Dynamics 365",
    shortLabel: "Dynamics 365",
    description: "Sales, Customer Service, Finance, Supply Chain, Project Ops and M365.",
    publicBase: "/Dynamics365",
    idPrefix: "D365",
    accent: "violet",
    modules: [
      m("sales", "Sales", "Dynamics365_sales_2000"),
      m("customer_service", "Customer Service", "Dynamics365_customer_service_2000"),
      m("finance", "Finance", "Dynamics365_finance_2000"),
      m("supply_chain", "Supply Chain", "Dynamics365_supply_chain_2000"),
      m("project_ops", "Project Operations", "Dynamics365_project_ops_2000"),
      m("m365", "M365", "Dynamics365_m365_2000"),
    ],
  },
  {
    id: "oracle",
    label: "Oracle Apps",
    shortLabel: "Oracle",
    description: "Oracle Fusion: Financials, Procurement, SCM, HCM, Projects and EPM.",
    publicBase: "/OracleApps",
    idPrefix: "ORA",
    accent: "rose",
    modules: [
      m("financials", "Financials", "OracleApps_financials_2000"),
      m("procurement", "Procurement", "OracleApps_procurement_2000"),
      m("scm", "SCM", "OracleApps_scm_2000"),
      m("hcm", "HCM", "OracleApps_hcm_2000"),
      m("projects", "Projects", "OracleApps_projects_2000"),
      m("epm", "EPM", "OracleApps_epm_2000"),
    ],
  },
  {
    id: "api",
    label: "API",
    shortLabel: "API",
    description: "REST, GraphQL, gRPC, webhooks, contract, performance & security testing.",
    publicBase: "/API",
    idPrefix: "API",
    accent: "cyan",
    modules: [
      m("rest", "REST", "api_rest_suite"),
      m("graphql", "GraphQL", "api_graphql_suite"),
      m("grpc", "gRPC", "api_grpc_suite"),
      m("webhook", "Webhook", "api_webhook_suite"),
      m("auth", "Auth", "api_auth_suite"),
      m("contract", "Contract", "api_contract_suite"),
      m("performance", "Performance", "api_performance_suite"),
      m("security", "Security", "api_security_suite"),
    ],
  },
  {
    id: "ios",
    label: "iOS",
    shortLabel: "iOS",
    description: "Login, onboarding, payments, push, security & performance on iOS.",
    publicBase: "/iOS",
    idPrefix: "IOS",
    accent: "indigo",
    modules: [
      m("onboarding", "Onboarding", "ios_onboarding_suite"),
      m("login", "Login", "ios_login_suite"),
      m("profile", "Profile", "ios_profile_suite"),
      m("payments", "Payments", "ios_payments_suite"),
      m("notifications", "Notifications", "ios_notifications_suite"),
      m("offline", "Offline", "ios_offline_suite"),
      m("security", "Security", "ios_security_suite"),
      m("performance", "Performance", "ios_performance_suite"),
    ],
  },
  {
    id: "android",
    label: "Android",
    shortLabel: "Android",
    description: "Login, onboarding, payments, push, security & performance on Android.",
    publicBase: "/Android",
    idPrefix: "AND",
    accent: "emerald",
    modules: [
      m("onboarding", "Onboarding", "android_onboarding_suite"),
      m("login", "Login", "android_login_suite"),
      m("profile", "Profile", "android_profile_suite"),
      m("payments", "Payments", "android_payments_suite"),
      m("notifications", "Notifications", "android_notifications_suite"),
      m("offline", "Offline", "android_offline_suite"),
      m("security", "Security", "android_security_suite"),
      m("performance", "Performance", "android_performance_suite"),
    ],
  },
  {
    id: "aws",
    label: "AWS",
    shortLabel: "AWS",
    description: "IAM, EC2, S3, Lambda, EKS, RDS, security & cost test packs.",
    publicBase: "/AWS",
    idPrefix: "AWS",
    accent: "amber",
    modules: [
      m("iam", "IAM", "aws_iam_suite"),
      m("ec2", "EC2", "aws_ec2_suite"),
      m("s3", "S3", "aws_s3_suite"),
      m("lambda", "Lambda", "aws_lambda_suite"),
      m("eks", "EKS", "aws_eks_suite"),
      m("rds", "RDS", "aws_rds_suite"),
      m("security", "Security", "aws_security_suite"),
      m("cost", "Cost", "aws_cost_suite"),
    ],
  },
  {
    id: "gcp",
    label: "GCP",
    shortLabel: "GCP",
    description: "IAM, Compute, GKE, Cloud Run, BigQuery, Storage, Security & Cost.",
    publicBase: "/GCP",
    idPrefix: "GCP",
    accent: "blue",
    modules: [
      m("iam", "IAM", "gcp_iam_suite"),
      m("compute", "Compute", "gcp_compute_suite"),
      m("storage", "Storage", "gcp_storage_suite"),
      m("cloud-run", "Cloud Run", "gcp_cloud-run_suite"),
      m("gke", "GKE", "gcp_gke_suite"),
      m("bigquery", "BigQuery", "gcp_bigquery_suite"),
      m("security", "Security", "gcp_security_suite"),
      m("cost", "Cost", "gcp_cost_suite"),
    ],
  },
  {
    id: "azure",
    label: "Azure",
    shortLabel: "Azure",
    description: "IAM, VMs, AKS, Functions, SQL, Storage, Security & Cost on Azure.",
    publicBase: "/Azure",
    idPrefix: "AZ",
    accent: "cyan",
    modules: [
      m("iam", "IAM", "azure_iam_suite"),
      m("vm", "VM", "azure_vm_suite"),
      m("storage", "Storage", "azure_storage_suite"),
      m("functions", "Functions", "azure_functions_suite"),
      m("aks", "AKS", "azure_aks_suite"),
      m("sql", "SQL", "azure_sql_suite"),
      m("security", "Security", "azure_security_suite"),
      m("cost", "Cost", "azure_cost_suite"),
    ],
  },
  {
    id: "webapps",
    label: "Web Apps",
    shortLabel: "Web Apps",
    description: "Auth, forms, checkout, UI, accessibility, API, performance & security.",
    publicBase: "/WebApps",
    idPrefix: "WEB",
    accent: "teal",
    modules: [
      m("ui", "UI", "webapps_ui_suite"),
      m("auth", "Auth", "webapps_auth_suite"),
      m("api", "API", "webapps_api_suite"),
      m("forms", "Forms", "webapps_forms_suite"),
      m("checkout", "Checkout", "webapps_checkout_suite"),
      m("accessibility", "Accessibility", "webapps_accessibility_suite"),
      m("performance", "Performance", "webapps_performance_suite"),
      m("security", "Security", "webapps_security_suite"),
    ],
  },
  {
    id: "topproducts",
    label: "Top Products",
    shortLabel: "Top Products",
    description: "Curated cross-product launchers: SAP, Salesforce, ServiceNow, Workday, Veeva, D365, Oracle.",
    publicBase: "/TopProducts",
    idPrefix: "TOP",
    accent: "gold",
    modules: [
      m("sap", "SAP", "topproducts_sap_suite"),
      m("salesforce", "Salesforce", "topproducts_salesforce_suite"),
      m("servicenow", "ServiceNow", "topproducts_servicenow_suite"),
      m("workday", "Workday", "topproducts_workday_suite"),
      m("veeva", "Veeva", "topproducts_veeva_suite"),
      m("d365", "D365", "topproducts_d365_suite"),
      m("oracle", "Oracle", "topproducts_oracle_suite"),
    ],
  },
  // ----- Wave 2: collaboration, security, ERP and CX additions -----------
  {
    id: "asana",
    label: "Asana",
    shortLabel: "Asana",
    description: "Work management: projects, tasks, timeline, portfolios, forms and rules automation.",
    publicBase: "/Asana",
    idPrefix: "ASA",
    accent: "rose",
    modules: [
      m("projects", "Projects", "asana_projects_suite"),
      m("tasks", "Tasks", "asana_tasks_suite"),
      m("timeline", "Timeline", "asana_timeline_suite"),
      m("portfolios", "Portfolios", "asana_portfolios_suite"),
      m("forms", "Forms", "asana_forms_suite"),
      m("automation", "Automation", "asana_automation_suite"),
    ],
  },
  {
    id: "cyberark",
    label: "CyberArk",
    shortLabel: "CyberArk",
    description: "Privileged access, vault, session management, secret rotation, Conjur and eDiscovery.",
    publicBase: "/CyberArk",
    idPrefix: "CYB",
    accent: "indigo",
    modules: [
      m("privileged_access", "Privileged Access", "cyberark_privileged_access_suite"),
      m("vault", "Vault", "cyberark_vault_suite"),
      m("session_management", "Session Mgmt", "cyberark_session_management_suite"),
      m("rotation", "Rotation", "cyberark_rotation_suite"),
      m("conjur", "Conjur", "cyberark_conjur_suite"),
      m("ediscovery", "eDiscovery", "cyberark_ediscovery_suite"),
    ],
  },
  {
    id: "docusign",
    label: "DocuSign",
    shortLabel: "DocuSign",
    description: "Envelopes, templates, routing, signing experience, admin and CLM workflows.",
    publicBase: "/DocuSign",
    idPrefix: "DOC",
    accent: "amber",
    modules: [
      m("envelopes", "Envelopes", "docusign_envelopes_suite"),
      m("templates", "Templates", "docusign_templates_suite"),
      m("routing", "Routing", "docusign_routing_suite"),
      m("signing", "Signing", "docusign_signing_suite"),
      m("admin", "Admin", "docusign_admin_suite"),
      m("clm", "CLM", "docusign_clm_suite"),
    ],
  },
  {
    id: "googleworkspace",
    label: "Google Workspace",
    shortLabel: "Workspace",
    description: "Gmail, Drive, Docs, Sheets, Meet and Admin console end-to-end coverage.",
    publicBase: "/GoogleWorkspace",
    idPrefix: "GOO",
    accent: "blue",
    modules: [
      m("gmail", "Gmail", "googleworkspace_gmail_suite"),
      m("drive", "Drive", "googleworkspace_drive_suite"),
      m("docs", "Docs", "googleworkspace_docs_suite"),
      m("sheets", "Sheets", "googleworkspace_sheets_suite"),
      m("meet", "Meet", "googleworkspace_meet_suite"),
      m("admin", "Admin", "googleworkspace_admin_suite"),
    ],
  },
  {
    id: "medallia",
    label: "Medallia",
    shortLabel: "Medallia",
    description: "Experience management: customer journeys, analytics, alerts and case routing.",
    publicBase: "/Medallia",
    idPrefix: "MED",
    accent: "violet",
    modules: [
      m("journeys", "Journeys", "medallia_journeys_suite"),
      m("analytics", "Analytics", "medallia_analytics_suite"),
      m("alerts", "Alerts", "medallia_alerts_suite"),
      m("cases", "Cases", "medallia_cases_suite"),
    ],
  },
  {
    id: "odoo",
    label: "Odoo",
    shortLabel: "Odoo",
    description: "Open-source ERP: accounting, inventory, sales, purchase, manufacturing, HR, website.",
    publicBase: "/Odoo",
    idPrefix: "ODO",
    accent: "emerald",
    modules: [
      m("accounting", "Accounting", "odoo_accounting_suite"),
      m("inventory", "Inventory", "odoo_inventory_suite"),
      m("sales", "Sales", "odoo_sales_suite"),
      m("purchase", "Purchase", "odoo_purchase_suite"),
      m("manufacturing", "Manufacturing", "odoo_manufacturing_suite"),
      m("hr", "HR", "odoo_hr_suite"),
      m("website", "Website", "odoo_website_suite"),
    ],
  },
  {
    id: "procore",
    label: "Procore",
    shortLabel: "Procore",
    description: "Construction management: projects, RFIs, submittals, financials, quality and safety.",
    publicBase: "/Procore",
    idPrefix: "PRO",
    accent: "amber",
    modules: [
      m("projects", "Projects", "procore_projects_suite"),
      m("rfis", "RFIs", "procore_rfis_suite"),
      m("submittals", "Submittals", "procore_submittals_suite"),
      m("financials", "Financials", "procore_financials_suite"),
      m("quality", "Quality", "procore_quality_suite"),
      m("safety", "Safety", "procore_safety_suite"),
    ],
  },
  {
    id: "ptcwindchill",
    label: "PTC Windchill",
    shortLabel: "Windchill",
    description: "PLM: CAD data management, BOM, change management, documents and workflows.",
    publicBase: "/PTCWindchill",
    idPrefix: "PTC",
    accent: "teal",
    modules: [
      m("cad", "CAD", "ptcwindchill_cad_suite"),
      m("plm", "PLM", "ptcwindchill_plm_suite"),
      m("bom", "BOM", "ptcwindchill_bom_suite"),
      m("change_mgmt", "Change Mgmt", "ptcwindchill_change_mgmt_suite"),
      m("documents", "Documents", "ptcwindchill_documents_suite"),
      m("workflow", "Workflow", "ptcwindchill_workflow_suite"),
    ],
  },
  {
    id: "qad",
    label: "QAD",
    shortLabel: "QAD",
    description: "Adaptive ERP for manufacturing: production, supply chain, finance, quality, logistics, planning.",
    publicBase: "/QAD",
    idPrefix: "QAD",
    accent: "cyan",
    modules: [
      m("manufacturing", "Manufacturing", "qad_manufacturing_suite"),
      m("supply_chain", "Supply Chain", "qad_supply_chain_suite"),
      m("finance", "Finance", "qad_finance_suite"),
      m("quality", "Quality", "qad_quality_suite"),
      m("logistics", "Logistics", "qad_logistics_suite"),
      m("planning", "Planning", "qad_planning_suite"),
    ],
  },
  {
    id: "smartsheet",
    label: "Smartsheet",
    shortLabel: "Smartsheet",
    description: "Collaborative work mgmt: sheets, forms, reports, dashboards, automation, resource mgmt.",
    publicBase: "/Smartsheet",
    idPrefix: "SMA",
    accent: "blue",
    modules: [
      m("sheets", "Sheets", "smartsheet_sheets_suite"),
      m("forms", "Forms", "smartsheet_forms_suite"),
      m("reports", "Reports", "smartsheet_reports_suite"),
      m("dashboards", "Dashboards", "smartsheet_dashboards_suite"),
      m("automation", "Automation", "smartsheet_automation_suite"),
      m("resource_management", "Resource Mgmt", "smartsheet_resource_management_suite"),
    ],
  },
  {
    id: "zoho",
    label: "Zoho",
    shortLabel: "Zoho",
    description: "Zoho One suite: CRM, Books, Projects, Desk, Creator and People.",
    publicBase: "/Zoho",
    idPrefix: "ZOH",
    accent: "rose",
    modules: [
      m("crm", "CRM", "zoho_crm_suite"),
      m("books", "Books", "zoho_books_suite"),
      m("projects", "Projects", "zoho_projects_suite"),
      m("desk", "Desk", "zoho_desk_suite"),
      m("creator", "Creator", "zoho_creator_suite"),
      m("people", "People", "zoho_people_suite"),
    ],
  },
  {
    id: "zoom",
    label: "Zoom",
    shortLabel: "Zoom",
    description: "Meetings, Webinars, Phone, Rooms, Contact Center and cloud recordings.",
    publicBase: "/Zoom",
    idPrefix: "ZOO",
    accent: "blue",
    modules: [
      m("meetings", "Meetings", "zoom_meetings_suite"),
      m("webinars", "Webinars", "zoom_webinars_suite"),
      m("phone", "Phone", "zoom_phone_suite"),
      m("rooms", "Rooms", "zoom_rooms_suite"),
      m("contact_center", "Contact Center", "zoom_contact_center_suite"),
      m("recordings", "Recordings", "zoom_recordings_suite"),
    ],
  },
  {
    id: "zscaler",
    label: "Zscaler",
    shortLabel: "Zscaler",
    description: "Zero-Trust SSE: Internet Access, Private Access, DLP, Sandbox, policy and logs.",
    publicBase: "/Zscaler",
    idPrefix: "ZSC",
    accent: "indigo",
    modules: [
      m("internet_access", "Internet Access", "zscaler_internet_access_suite"),
      m("private_access", "Private Access", "zscaler_private_access_suite"),
      m("dlp", "DLP", "zscaler_dlp_suite"),
      m("sandbox", "Sandbox", "zscaler_sandbox_suite"),
      m("policy", "Policy", "zscaler_policy_suite"),
      m("logs", "Logs", "zscaler_logs_suite"),
    ],
  },
];

export function getPlatform(id: string): PlatformDef | undefined {
  return PLATFORMS.find((p) => p.id === id.toLowerCase());
}

export function getModule(platform: PlatformDef, moduleId: string): PlatformModule | undefined {
  return platform.modules.find((mod) => mod.id === moduleId.toLowerCase());
}
