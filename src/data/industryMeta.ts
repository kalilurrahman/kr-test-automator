/**
 * Visual + descriptive metadata for the 32 industry tiles. Kept separate from
 * the scenario loader so the Industries grid can render instantly without
 * waiting on the 5 MB JSON to download.
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
];

export const INDUSTRIES: IndustryMeta[] = raw.map((r) => ({ ...r, slug: slugify(r.name) }));

export const INDUSTRY_BY_SLUG = new Map(INDUSTRIES.map((i) => [i.slug, i]));
export const INDUSTRY_BY_NAME = new Map(INDUSTRIES.map((i) => [i.name, i]));

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
