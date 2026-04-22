/**
 * Visual + descriptive metadata for industry tiles. Kept separate from the
 * scenario loader so the Industries grid can render instantly without
 * waiting on the multi-MB JSON to download.
 *
 * The current dataset (`unified_strict_e2e_final.json`) covers 120 industries
 * — every entry below maps 1:1 to the `industry` field in that file.
 */

export interface IndustryMeta {
  /** Display name — must match the `industry` field in industry_scenarios.json */
  name: string;
  /** URL slug used by /industries/:slug */
  slug: string;
  /** Single-line description shown on tile + detail page */
  blurb: string;
  /** One emoji used as the tile glyph */
  glyph: string;
  /** Tailwind hue family used for the tile gradient */
  accent: "violet" | "emerald" | "amber" | "rose" | "blue" | "cyan" | "indigo" | "teal" | "lime";
}

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const raw: Array<Omit<IndustryMeta, "slug">> = [
  // ── Original 32 (unchanged) ───────────────────────────────────────────────
  { name: "Pharma", glyph: "💊", accent: "violet", blurb: "Drug lifecycle, GxP, validation, GMP and Veeva-driven E2E flows." },
  { name: "Healthcare", glyph: "🩺", accent: "rose", blurb: "EHR, claims, patient journey and HIPAA-grade integrations." },
  { name: "Telecom", glyph: "📡", accent: "blue", blurb: "BSS / OSS, billing, charging, 5G provisioning and order-to-activate." },
  { name: "Banking", glyph: "🏦", accent: "indigo", blurb: "Core banking, payments, AML, KYC and ledger reconciliation." },
  { name: "Manufacturing", glyph: "🏭", accent: "amber", blurb: "MES, MRP, shop-floor, OEE and supplier integration scenarios." },
  { name: "Insurance", glyph: "🛡", accent: "cyan", blurb: "Policy admin, claims, underwriting and compliance regression." },
  { name: "Automotive", glyph: "🚗", accent: "rose", blurb: "Dealer DMS, connected vehicle, warranty and recall workflows." },
  { name: "Logistics", glyph: "🚚", accent: "amber", blurb: "TMS, WMS, shipment tracking, carrier integration and last-mile." },
  { name: "Aerospace", glyph: "✈️", accent: "blue", blurb: "MRO, configuration management, certification and supply continuity." },
  { name: "Public Sector", glyph: "🏛", accent: "indigo", blurb: "Citizen services, case mgmt, accessibility and digital identity." },
  { name: "Energy & Utilities", glyph: "⚡", accent: "amber", blurb: "Smart-meter, grid ops, billing and regulatory reporting." },
  { name: "Education", glyph: "🎓", accent: "violet", blurb: "SIS, LMS, online proctoring and accessibility validation." },
  { name: "IT Services", glyph: "🛠", accent: "teal", blurb: "Managed services, ITSM, SLA and run-book automation." },
  { name: "Finance", glyph: "💼", accent: "emerald", blurb: "FP&A, GL, close-and-consolidate and treasury integrations." },
  { name: "HCM", glyph: "👥", accent: "rose", blurb: "Workday / SuccessFactors HR, payroll, talent and benefits flows." },
  { name: "Real Estate", glyph: "🏢", accent: "indigo", blurb: "Property mgmt, leasing, facilities and tenant portals." },
  { name: "Travel", glyph: "🧳", accent: "cyan", blurb: "GDS, booking, loyalty, baggage and disruption-handling flows." },
  { name: "High Tech", glyph: "💻", accent: "blue", blurb: "Configure-price-quote, subscription billing and SaaS analytics." },
  { name: "Media", glyph: "🎬", accent: "violet", blurb: "DAM, OTT delivery, rights management and audience analytics." },
  { name: "Life Sciences", glyph: "🧬", accent: "emerald", blurb: "Clinical trials, eTMF, regulatory submissions and lab data." },
  { name: "Consumer Finance", glyph: "💳", accent: "lime", blurb: "Lending, credit cards, BNPL, fraud and dispute resolution." },
  { name: "GovTech", glyph: "🏷", accent: "indigo", blurb: "eGovernance, payments-to-government and inter-agency exchange." },
  { name: "Retail & eCommerce", glyph: "🛒", accent: "amber", blurb: "OMS, POS, fulfilment, returns and omnichannel inventory." },
  { name: "Transportation", glyph: "🚆", accent: "teal", blurb: "Multimodal scheduling, fleet, fuel and asset utilisation." },
  { name: "Chemicals", glyph: "⚗", accent: "lime", blurb: "Batch mgmt, REACH compliance and hazardous-material logistics." },
  { name: "Cybersecurity", glyph: "🔐", accent: "rose", blurb: "SIEM, IAM, zero-trust validation and threat-detection regression." },
  { name: "Supply Chain", glyph: "🔗", accent: "amber", blurb: "Demand planning, S&OP, supplier portal and inventory visibility." },
  { name: "Platform & Cloud", glyph: "☁️", accent: "cyan", blurb: "Multi-cloud landing zones, FinOps and platform-engineering flows." },
  { name: "Commerce", glyph: "🛍", accent: "violet", blurb: "Headless commerce, B2B portals and partner channel orchestration." },
  { name: "Government", glyph: "📜", accent: "indigo", blurb: "Tax, benefits, voting, immigration and inter-agency casework." },
  { name: "Edge/IoT", glyph: "📶", accent: "teal", blurb: "Device telemetry, OTA, edge inference and field-service triggers." },
  { name: "Research", glyph: "🔬", accent: "emerald", blurb: "Lab data capture, ELN, scientific workflows and reproducibility." },
  { name: "CPG", glyph: "🥤", accent: "amber", blurb: "Trade promotion, retail execution, demand sensing and rebates." },

  // ── Strict E2E v3.1 additions (88 new industries) ─────────────────────────
  { name: "Academic Research", glyph: "📚", accent: "emerald", blurb: "Grants, IRB, lab notebooks and publication-ready data flows." },
  { name: "Asset Quality", glyph: "🔧", accent: "amber", blurb: "Condition monitoring, defect tracking and warranty trace." },
  { name: "Aviation", glyph: "🛫", accent: "blue", blurb: "Flight ops, crew scheduling, MRO and disruption recovery." },
  { name: "B2B Commerce", glyph: "🤝", accent: "violet", blurb: "Quote-to-cash, partner portals and channel rebate programs." },
  { name: "Benefits Operations", glyph: "🎁", accent: "rose", blurb: "Eligibility, enrolment, claims and payroll downstream." },
  { name: "Brand Operations", glyph: "🎨", accent: "violet", blurb: "Asset lifecycle, campaign approvals and channel publication." },
  { name: "Build Engineering", glyph: "⚙️", accent: "teal", blurb: "CI pipelines, release trains and artefact promotion flows." },
  { name: "Care Coordination", glyph: "🤲", accent: "rose", blurb: "Multi-provider care plans, referrals and outcome tracking." },
  { name: "Cargo Operations", glyph: "📦", accent: "amber", blurb: "Booking, manifest, customs and consignee delivery flows." },
  { name: "Case Management", glyph: "🗂", accent: "indigo", blurb: "Intake, triage, escalation and resolution across agencies." },
  { name: "Claims Operations", glyph: "📋", accent: "cyan", blurb: "FNOL, adjudication, settlement and recovery downstream." },
  { name: "Clinical Operations", glyph: "🏥", accent: "emerald", blurb: "Trial conduct, site management, monitoring and data capture." },
  { name: "Clinical Publishing", glyph: "📰", accent: "violet", blurb: "Manuscripts, regulatory submissions and KOL distribution." },
  { name: "Cloud Platform Ops", glyph: "🌥", accent: "cyan", blurb: "Landing zones, account vending, guardrails and FinOps." },
  { name: "Cloud Security", glyph: "🛡", accent: "rose", blurb: "Posture mgmt, IAM, key rotation and incident playbooks." },
  { name: "Consumer Goods", glyph: "🧴", accent: "amber", blurb: "Trade promo, retail execution and demand-sensing." },
  { name: "Consumer Pricing", glyph: "🏷️", accent: "lime", blurb: "Promo planning, list mgmt and competitive price intelligence." },
  { name: "Consumer Supply", glyph: "📥", accent: "amber", blurb: "DC replenishment, retailer EDI and direct-to-shelf flows." },
  { name: "Content Lifecycle", glyph: "📝", accent: "violet", blurb: "Authoring, review, approval, distribution and archive." },
  { name: "Corporate Finance", glyph: "📊", accent: "emerald", blurb: "Treasury, intercompany, consolidation and regulatory filing." },
  { name: "Cross-Border Freight", glyph: "🌐", accent: "blue", blurb: "Customs, duties, multi-modal hand-off and import compliance." },
  { name: "Customer Service", glyph: "🎧", accent: "cyan", blurb: "Omnichannel cases, knowledge, escalation and CSAT closure." },
  { name: "Cyber Resilience", glyph: "🛰", accent: "rose", blurb: "Backup, failover, ransomware drill and recovery validation." },
  { name: "DevSecOps", glyph: "🧪", accent: "teal", blurb: "Shift-left scans, policy gates and signed-artefact pipelines." },
  { name: "Digital Commerce", glyph: "🛒", accent: "violet", blurb: "Storefront, cart, payments and omnichannel fulfilment." },
  { name: "Digital Platform", glyph: "🧩", accent: "cyan", blurb: "API marketplace, self-service and developer onboarding." },
  { name: "Digital Subscriptions", glyph: "🔁", accent: "violet", blurb: "Sign-up, billing, dunning, churn and reactivation flows." },
  { name: "Disability Claims", glyph: "♿", accent: "rose", blurb: "Eligibility, medical review, payment and appeals." },
  { name: "Distributed Energy", glyph: "🔋", accent: "amber", blurb: "DERMS, solar, storage and aggregator settlement." },
  { name: "Ecommerce Ops", glyph: "📦", accent: "amber", blurb: "OMS, fraud check, ship-from-store and reverse logistics." },
  { name: "Education Finance", glyph: "💵", accent: "emerald", blurb: "Tuition, financial aid, awards and student-account billing." },
  { name: "Elder Care", glyph: "👴", accent: "rose", blurb: "Assessment, caregiver scheduling and family-member portals." },
  { name: "Emergency Response", glyph: "🚨", accent: "rose", blurb: "Call intake, dispatch, field actions and incident closure." },
  { name: "Energy Efficiency", glyph: "🌿", accent: "lime", blurb: "Audit, retrofit, rebate and savings verification flows." },
  { name: "Energy Retail", glyph: "💡", accent: "amber", blurb: "Switching, billing, supplier change and tariff updates." },
  { name: "Energy Trading", glyph: "📈", accent: "amber", blurb: "Position mgmt, settlement, ETRM and regulatory reporting." },
  { name: "Factory Automation", glyph: "🤖", accent: "teal", blurb: "PLC, SCADA, MES handshake and OEE measurement." },
  { name: "Field Service", glyph: "🧰", accent: "amber", blurb: "Dispatch, parts, work-order completion and invoicing." },
  { name: "Freight Forwarding", glyph: "🚢", accent: "blue", blurb: "House BL, master BL, customs broker and carrier hand-off." },
  { name: "Government Benefits", glyph: "🏛", accent: "indigo", blurb: "Eligibility, payment, recoupment and audit trail." },
  { name: "Government Licensing", glyph: "📑", accent: "indigo", blurb: "Application, fee, inspection and renewal lifecycle." },
  { name: "Government Tax", glyph: "💰", accent: "emerald", blurb: "Filing, assessment, payment, refund and collections." },
  { name: "Grid Reliability", glyph: "⚙️", accent: "amber", blurb: "Outage detection, restoration crews and SAIDI reporting." },
  { name: "Grid Services", glyph: "🔌", accent: "amber", blurb: "Demand response, ancillary services and ISO settlement." },
  { name: "Health Claims", glyph: "🩹", accent: "cyan", blurb: "EDI 837/835, adjudication, EOB and provider payment." },
  { name: "Higher Education", glyph: "🎓", accent: "violet", blurb: "Admissions, enrolment, degree audit and alumni engagement." },
  { name: "Home Healthcare", glyph: "🏠", accent: "rose", blurb: "In-home visits, plans of care and HIPAA-secure exchange." },
  { name: "Hospice Care", glyph: "🌷", accent: "rose", blurb: "Palliative plans, bereavement, family support and billing." },
  { name: "Hospital Revenue", glyph: "💲", accent: "emerald", blurb: "Charge capture, denial mgmt, AR and patient liability." },
  { name: "Industrial Maintenance", glyph: "🔩", accent: "amber", blurb: "Preventive, predictive and shutdown maintenance flows." },
  { name: "Inspection Services", glyph: "🔎", accent: "indigo", blurb: "Scheduling, mobile capture and certificate issuance." },
  { name: "Insurance Claims", glyph: "📄", accent: "cyan", blurb: "FNOL, assignment, estimate, settlement and subrogation." },
  { name: "LMS Operations", glyph: "🖥", accent: "violet", blurb: "Course publishing, enrolment, completion and certification." },
  { name: "Learning Services", glyph: "📘", accent: "violet", blurb: "Curriculum design, delivery and outcome assessment." },
  { name: "Life Sciences QA", glyph: "🧫", accent: "emerald", blurb: "Deviation, CAPA, change control and audit-readiness." },
  { name: "Logistics Brokerage", glyph: "📞", accent: "blue", blurb: "Load matching, carrier vetting, settlement and dispute." },
  { name: "Logistics Control Tower", glyph: "🗼", accent: "blue", blurb: "Real-time visibility, exception mgmt and orchestration." },
  { name: "Manufacturing Service", glyph: "🛠", accent: "amber", blurb: "Service contracts, on-site repair and parts replenishment." },
  { name: "Manufacturing Traceability", glyph: "🔗", accent: "amber", blurb: "Genealogy, recall scope and serialised batch tracking." },
  { name: "Maritime", glyph: "⚓", accent: "blue", blurb: "Vessel scheduling, port calls, bunkering and crew rotation." },
  { name: "Medical Devices", glyph: "🩻", accent: "rose", blurb: "UDI, recalls, post-market surveillance and complaint mgmt." },
  { name: "Medical Supplies", glyph: "💉", accent: "rose", blurb: "Replenishment, GPO contracts and clinical-bin restock." },
  { name: "Observability", glyph: "📡", accent: "teal", blurb: "Logs, metrics, traces and incident-correlation flows." },
  { name: "Online Learning", glyph: "💻", accent: "violet", blurb: "Live class, async content, assessments and grading." },
  { name: "Order Finance", glyph: "🧾", accent: "emerald", blurb: "Order-to-cash credit hold, invoicing and revenue recognition." },
  { name: "Patient Access", glyph: "🚪", accent: "rose", blurb: "Scheduling, registration, eligibility and pre-auth." },
  { name: "Patient Billing", glyph: "🧾", accent: "rose", blurb: "Statements, payments, plans and collections workflow." },
  { name: "Patient Experience", glyph: "💬", accent: "rose", blurb: "Surveys, feedback loops and service-recovery actions." },
  { name: "Pharma Manufacturing", glyph: "💊", accent: "violet", blurb: "Batch records, release, deviations and serialisation." },
  { name: "Pharmacy Ops", glyph: "💊", accent: "violet", blurb: "Dispensing, prior-auth, refill and counselling capture." },
  { name: "Platform Engineering", glyph: "🧱", accent: "teal", blurb: "Golden paths, internal developer portal and templates." },
  { name: "Port Operations", glyph: "⚓", accent: "blue", blurb: "Berthing, gate moves, yard mgmt and customs release." },
  { name: "Precision Medicine", glyph: "🧬", accent: "emerald", blurb: "Genomic profiling, therapy match and outcome capture." },
  { name: "Procurement Shared Services", glyph: "🛒", accent: "indigo", blurb: "PR-PO, sourcing waves, supplier mgmt and 3-way match." },
  { name: "Production Planning", glyph: "📐", accent: "amber", blurb: "MPS, MRP, capacity check and shop-floor release." },
  { name: "Public Health", glyph: "🌡", accent: "rose", blurb: "Surveillance, outbreak response and vaccine administration." },
  { name: "Public Insurance", glyph: "🏛", accent: "indigo", blurb: "Eligibility, enrolment, claims and federal reporting." },
  { name: "Publishing", glyph: "📖", accent: "violet", blurb: "Editorial, rights, royalties and channel distribution." },
  { name: "Quality Engineering", glyph: "✅", accent: "teal", blurb: "Test strategy, automation pipelines and quality gates." },
  { name: "R&D Governance", glyph: "🧠", accent: "emerald", blurb: "Portfolio review, IP capture and stage-gate approvals." },
  { name: "Regulatory Affairs", glyph: "📜", accent: "indigo", blurb: "Submissions, queries, label updates and post-approval." },
  { name: "Release Engineering", glyph: "🚀", accent: "teal", blurb: "Release notes, env promotion and rollback playbooks." },
  { name: "Retail", glyph: "🏬", accent: "amber", blurb: "POS, planograms, promotions and loss-prevention flows." },
  { name: "Retail Banking Ops", glyph: "🏦", accent: "indigo", blurb: "Onboarding, transactions, disputes and branch ops." },
  { name: "Retail Health", glyph: "🩺", accent: "rose", blurb: "In-store clinics, scheduling, prescriptions and follow-up." },
  { name: "Retail Logistics", glyph: "🚚", accent: "amber", blurb: "DC-to-store, returns and last-mile coordination." },
  { name: "Retail Manufacturing", glyph: "🏭", accent: "amber", blurb: "Private label, packaging and store-ready pallet build." },
  { name: "Retail Pharma", glyph: "💊", accent: "violet", blurb: "OTC inventory, scripts, controlled substance and recalls." },
  { name: "Retail Returns", glyph: "↩️", accent: "amber", blurb: "Reverse logistics, RMA, refurb and disposition." },
  { name: "Retail Supply Finance", glyph: "💱", accent: "emerald", blurb: "Supplier financing, factoring and dynamic discounting." },
  { name: "Revenue Cycle", glyph: "🔄", accent: "emerald", blurb: "Eligibility through cash-posting and denial workflows." },
  { name: "Revenue Operations", glyph: "📈", accent: "emerald", blurb: "Pipeline, forecast, comp and quote-to-cash hygiene." },
  { name: "Risk Operations", glyph: "⚠️", accent: "rose", blurb: "Control testing, KRI monitoring and audit evidence." },
  { name: "SRE Operations", glyph: "🛠", accent: "teal", blurb: "SLO mgmt, error budgets and on-call playbooks." },
  { name: "Service Procurement", glyph: "🧑‍💼", accent: "indigo", blurb: "SOW, contingent labour and rate-card compliance." },
  { name: "Shared Services", glyph: "🏢", accent: "indigo", blurb: "Centralised finance, HR and IT service catalogue." },
  { name: "Smart Grid", glyph: "🔆", accent: "amber", blurb: "AMI, DER orchestration and outage-prediction models." },
  { name: "Student Services", glyph: "🎒", accent: "violet", blurb: "Advising, registration, financial aid and graduation." },
  { name: "Subscription Billing", glyph: "🧾", accent: "violet", blurb: "Plans, proration, dunning and revenue rec under ASC 606." },
  { name: "Supplier Quality", glyph: "🧪", accent: "teal", blurb: "PPAP, NCR, scorecards and corrective-action flows." },
  { name: "Supply Network", glyph: "🌐", accent: "amber", blurb: "Multi-tier visibility, allocation and exception triage." },
  { name: "Surgical Care", glyph: "🩺", accent: "rose", blurb: "OR scheduling, supplies, anaesthesia and post-op handoff." },
  { name: "Training Services", glyph: "🏫", accent: "violet", blurb: "Catalog, delivery, attendance and certification mgmt." },
  { name: "Transportation Fleet", glyph: "🚛", accent: "teal", blurb: "Asset utilisation, fuel, maintenance and DOT compliance." },
  { name: "Utilities Field Service", glyph: "🔧", accent: "amber", blurb: "Service orders, crew dispatch, asset GIS and meter ops." },
  { name: "Utility Billing", glyph: "💡", accent: "amber", blurb: "Meter-to-cash, rate plans, statements and arrears." },
  { name: "Vendor Management", glyph: "📇", accent: "indigo", blurb: "Onboarding, risk reviews, performance and offboarding." },
  { name: "Warehouse Ops", glyph: "🏬", accent: "amber", blurb: "Inbound, putaway, picking, packing and ship confirm." },
  { name: "Water Utilities", glyph: "💧", accent: "cyan", blurb: "Meter ops, leak detection, billing and quality reporting." },
  { name: "Wholesale Distribution", glyph: "📦", accent: "amber", blurb: "Branch ops, route accounting and rebate settlement." },
  { name: "Wholesale Pharma", glyph: "💊", accent: "violet", blurb: "Track-and-trace, DSCSA compliance and chargebacks." },
];

export const INDUSTRIES: IndustryMeta[] = raw.map((r) => ({ ...r, slug: slugify(r.name) }));

export const INDUSTRY_BY_SLUG = new Map(INDUSTRIES.map((i) => [i.slug, i]));
export const INDUSTRY_BY_NAME = new Map(INDUSTRIES.map((i) => [i.name, i]));

/**
 * Sensible default visual for any industry that ships in the data file but
 * hasn't been hand-curated yet — keeps the grid resilient to future data
 * batches without breaking the build.
 */
export const DEFAULT_INDUSTRY_META: Omit<IndustryMeta, "slug" | "name"> = {
  glyph: "🏷",
  accent: "teal",
  blurb: "Industry-grounded E2E business scenarios with multi-system orchestration.",
};

export const ACCENT_BG: Record<IndustryMeta["accent"], string> = {
  violet: "from-violet-500/15 to-violet-500/5 border-violet-500/30 hover:border-violet-400/60",
  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-400/60",
  amber: "from-amber-500/15 to-amber-500/5 border-amber-500/30 hover:border-amber-400/60",
  rose: "from-rose-500/15 to-rose-500/5 border-rose-500/30 hover:border-rose-400/60",
  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/30 hover:border-blue-400/60",
  cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/60",
  indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/30 hover:border-indigo-400/60",
  teal: "from-teal-500/15 to-teal-500/5 border-teal-500/30 hover:border-teal-400/60",
  lime: "from-lime-500/15 to-lime-500/5 border-lime-500/30 hover:border-lime-400/60",
};

/**
 * Curated list of automation-script options surfaced in the UI when a user
 * picks "Generate" from a scenario. Source: v3.0 spec (industry-first repo).
 */
export const AUTOMATION_SCRIPT_OPTIONS = [
  { value: "tricentis_tosca", label: "Tricentis Tosca", language: "model-based" },
  { value: "playwright_ts", label: "Playwright (TypeScript)", language: "typescript" },
  { value: "playwright_py", label: "Playwright (Python)", language: "python" },
  { value: "cypress_js", label: "Cypress (JavaScript)", language: "javascript" },
  { value: "selenium_java", label: "Selenium (Java)", language: "java" },
  { value: "selenium_py", label: "Selenium (Python)", language: "python" },
  { value: "selenium_cs", label: "Selenium (C#)", language: "csharp" },
  { value: "robot_framework", label: "Robot Framework", language: "robot" },
  { value: "katalon", label: "Katalon", language: "groovy" },
  { value: "uft_one", label: "UFT One", language: "vbscript" },
  { value: "postman_newman", label: "API tests (Postman / Newman)", language: "javascript" },
  { value: "appium", label: "Appium for mobile", language: "javascript" },
] as const;

export type AutomationScriptValue = typeof AUTOMATION_SCRIPT_OPTIONS[number]["value"];
