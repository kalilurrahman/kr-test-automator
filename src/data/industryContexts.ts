export const INDUSTRY_CONTEXTS = [
  {
    id: "pharma-life-sciences",
    label: "Pharma & Life Sciences",
    guidance: "Cover controlled product records, clinical and safety workflows, batch genealogy, quality events, document controls, independent review, effective dates, and traceable evidence. Use synthetic non-identifying records; do not claim GxP validation or regulatory compliance.",
    aliases: ["pharma", "life-sciences", "life-science", "pharmaceuticals", "clinical-operations"],
  },
  {
    id: "medical-devices",
    label: "MedTech & Medical Devices",
    guidance: "Cover design inputs and outputs, configuration control, risk traceability, verification evidence, complaints, field actions, device history, and supplier quality. Use synthetic records and simulators only; do not control live devices or claim device safety or certification.",
    aliases: ["medtech", "medical-device", "medical-devices", "medical-devices-industry"],
  },
  {
    id: "healthcare",
    label: "Healthcare Operations",
    guidance: "Cover synthetic patient access, appointments, EHR interfaces, claims, care coordination, consent, access reviews, idempotent messaging, and recovery. Never use real PHI or drive clinical decisions; do not claim HIPAA compliance or clinical safety.",
    aliases: ["healthcare-operations", "healthcare", "hospital", "clinical-care", "patient-care"],
  },
  {
    id: "manufacturing",
    label: "Manufacturing & MES",
    guidance: "Cover production orders, routings and BOM revisions, shop-floor execution, quality holds, OEE, material genealogy, warehouse movement, maintenance, planning, and ERP/MES reconciliation. Use synthetic orders and equipment events in non-production systems.",
    aliases: ["manufacturing-mes", "manufacturing", "factory", "mes"],
  },
  {
    id: "automotive",
    label: "Automotive & Mobility",
    guidance: "Cover synthetic vehicle programs, configuration, engineering changes, software update simulation, dealer and fleet workflows, charging mocks, supplier traceability, and service. Use offline test benches only; never command live vehicles, chargers, or public-road systems.",
    aliases: ["automotive", "automotive-mobility", "mobility", "vehicle", "connected-vehicle"],
  },
  {
    id: "construction",
    label: "Construction & AEC",
    guidance: "Cover synthetic BIM revisions, design coordination, schedules, contract workflows, field reports, inspections, materials, RFIs, commissioning, and handover. Use test models and projects only; do not make real structural or construction-safety determinations.",
    aliases: ["construction", "construction-aec", "aec", "built-environment", "building-construction"],
  },
  {
    id: "defense",
    label: "Defense Programs",
    guidance: "Limit scenarios to unclassified synthetic administrative workflows such as configuration baselines, requirements, suppliers, schedules, maintenance, access review, and audit. Exclude operational plans, mission targeting, weapons instructions, and controlled technical data.",
    aliases: ["defense-systems", "defense", "defence", "defense-programs"],
  },
  {
    id: "industrial-automation",
    label: "Industrial Automation & OT",
    guidance: "Cover simulated asset inventory, zones, PLC/HMI digital twins, alarms, historian data, virtual logic changes, interlocks, lab access, and recovery. Use digital twins or isolated simulators only; never send write commands to live PLC, SCADA, robot, safety, or production systems.",
    aliases: ["industrial-automation", "industrial-ot", "ot", "operational-technology", "edge-iot"],
  },
  {
    id: "cpg",
    label: "CPG & Consumer Goods",
    guidance: "Cover product and packaging master data, demand plans, trade promotions, retail execution, order fulfillment, lot traceability, quality holds, labeling, suppliers, and retail analytics. Use synthetic consumers, stores, and lots only.",
    aliases: ["cpg-operations", "cpg", "consumer-goods", "consumer-products"],
  },
  {
    id: "energy-utilities",
    label: "Energy & Utilities",
    guidance: "Cover synthetic metering, grid event workflows, outage tracking, field work, asset maintenance, billing, simulated distributed resources, settlement, reporting, and resilience. Keep integrations mocked and never dispatch commands to live utility control systems.",
    aliases: ["energy", "utilities", "energy-and-utilities", "energy-utilities"],
  },
  {
    id: "insurance",
    label: "Insurance",
    guidance: "Cover synthetic policy terms, underwriting referrals, claims, adjudication, payments, billing, broker access, reinsurance, mock screening, and audit. Do not issue real payments or use real personal, financial, or claims data.",
    aliases: ["insurance-suite", "insurance", "insurer", "claims-operations"],
  },
  {
    id: "financial-services",
    label: "Financial Services",
    guidance: "Cover synthetic account lifecycle, idempotent payments, balanced ledger entries, lending, treasury, risk limits, mock AML/KYC, authentication, and reporting. Use mock providers only; do not initiate real transactions or claim regulatory certification.",
    aliases: ["financial", "finance", "banking", "consumer-finance", "banking-and-payments"],
  },
  {
    id: "aerospace",
    label: "Aerospace & MRO",
    guidance: "Cover synthetic configuration baselines, engineering changes, MRO work packages, controlled records, serialized parts, quality events, assembly, offline test simulation, fleet reliability, and traceability. Exclude operational flight and controlled technical data; do not claim airworthiness certification.",
    aliases: ["aerospace", "aviation", "aerospace-and-mro", "aircraft"],
  },
  {
    id: "logistics-supply-chain",
    label: "Logistics & Supply Chain",
    guidance: "Cover transport planning, warehouse execution, carrier messages, inventory visibility, shipment milestones, simulated trade documents, returns, supplier collaboration, demand planning, and reconciliation. Use synthetic addresses and mocked partner endpoints.",
    aliases: ["logistics", "supply-chain", "logistics-supply-chain", "transportation", "warehouse", "supply", "supply-chain-management"],
  },
  {
    id: "travel-hospitality",
    label: "Travel & Hospitality",
    guidance: "Cover synthetic availability, reservations, guest services, pricing, loyalty, mock payments, distribution channels, disruptions, and privacy. Use test traveler profiles and mocked booking providers only; never charge real instruments or contact live booking systems.",
    aliases: ["travel", "travel-hospitality", "hospitality", "hotel-operations", "booking"],
  },
  {
    id: "agriculture",
    label: "Agriculture & Agritech",
    guidance: "Cover synthetic farms, fields, crop plans, simulated sensors, equipment maintenance, input inventory, harvest traceability, and reporting. Keep IoT and machinery simulated; do not issue live equipment commands or provide pesticide or safety determinations.",
    aliases: ["agriculture", "agritech", "agriculture-agritech", "farm-management", "precision-agriculture"],
  },
  {
    id: "real-estate",
    label: "Real Estate & Facilities",
    guidance: "Cover synthetic property portfolios, leases, facilities work orders, inspections, occupancy, utility fixtures, vendors, and capital projects. Use pseudonymous tenant fixtures and test integrations; do not use real personal or payment data or issue building-control commands.",
    aliases: ["real-estate", "real-estate-facilities", "property-management", "facilities-management", "commercial-real-estate"],
  },
  {
    id: "retail-commerce",
    label: "Retail & Commerce",
    guidance: "Cover synthetic catalog, pricing, inventory, orders, checkout, returns, promotions, fulfillment, partner events, access, and analytics. Use test accounts and payment simulators only.",
    aliases: ["retail-commerce", "retail", "commerce", "ecommerce", "retail-and-ecommerce"],
  },
  {
    id: "telecom-network",
    label: "Telecom & Networks",
    guidance: "Cover service orders, network inventory, provisioning, usage events, billing, outage management, partner interfaces, access, and recovery with synthetic subscribers and simulated network resources.",
    aliases: ["telecom-network", "telecom", "network", "communications"],
  },
  {
    id: "public-sector",
    label: "Government & Public Sector",
    guidance: "Cover synthetic case intake, identity and access, approvals, records retention, accessibility, payments-to-government mocks, inter-agency exchange, and audit. Do not use real citizen data or production government endpoints.",
    aliases: ["public-sector", "government", "public-sector", "govtech"],
  },
  {
    id: "education-research",
    label: "Education & Research",
    guidance: "Cover synthetic learner, grant, research, lab, and publication records; include accessibility, role boundaries, approval, reproducibility, and data lineage. Do not use real student or research-subject records.",
    aliases: ["education", "research", "education-research", "academic-research"],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    guidance: "Cover defensive policy, identity, detection, incident intake, evidence, recovery, and audit using owned lab fixtures. Keep activity non-destructive, authorized, and limited to synthetic assets; exclude real credential theft or production exploitation.",
    aliases: ["cybersecurity", "security", "cyber-resilience"],
  },
  {
    id: "cloud-platform",
    label: "Cloud & Data Platforms",
    guidance: "Cover workspace boundaries, least privilege, deployment, data lineage, schema evolution, orchestration, observability, retries, and recovery with synthetic datasets and isolated test resources.",
    aliases: ["cloud-platform", "cloud", "platform-and-cloud", "data-ai-platforms"],
  },
  {
    id: "media-content",
    label: "Media & Content",
    guidance: "Cover synthetic content lifecycle, metadata, rights and approvals, media delivery, subscriptions, accessibility, partner interfaces, and analytics with non-copyrighted test assets.",
    aliases: ["media-content", "media", "content", "media-and-content"],
  },
  {
    id: "other-industries",
    label: "Other / Cross-industry",
    guidance: "Use synthetic fixtures and non-production services. Include workflow validation, role boundaries, audit history, idempotent retries, error handling, and recovery appropriate to the described business process. Avoid unsupported regulatory or certification claims.",
    aliases: ["other-industries", "other", "cross-industry"],
  },
] as const;

export type IndustryContextId = (typeof INDUSTRY_CONTEXTS)[number]["id"];

const ALIAS_TO_CONTEXT = new Map<string, IndustryContextId>();
for (const context of INDUSTRY_CONTEXTS) {
  ALIAS_TO_CONTEXT.set(context.id, context.id);
  for (const alias of context.aliases) ALIAS_TO_CONTEXT.set(alias, context.id);
}

export function resolveIndustryContext(value: string | null | undefined): IndustryContextId | null {
  if (!value) return null;
  const normalized = value.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const exact = ALIAS_TO_CONTEXT.get(normalized);
  if (exact) return exact;
  if (/pharma|clinical|life-science|gxp/.test(normalized)) return "pharma-life-sciences";
  if (/medical-device|medtech/.test(normalized)) return "medical-devices";
  if (/health|patient|hospital|care/.test(normalized)) return "healthcare";
  if (/manufactur|factory|industrial/.test(normalized)) return "manufacturing";
  if (/defen|defence/.test(normalized)) return "defense";
  if (/cpg|consumer-good|consumer-product/.test(normalized)) return "cpg";
  if (/energy|utility/.test(normalized)) return "energy-utilities";
  if (/insurance|claim/.test(normalized)) return "insurance";
  if (/bank|finance|financial/.test(normalized)) return "financial-services";
  if (/aero|aviation|aircraft/.test(normalized)) return "aerospace";
  if (/logistic|supply-chain|transport/.test(normalized)) return "logistics-supply-chain";
  if (/government|public-sector|govtech/.test(normalized)) return "public-sector";
  if (/education|research|academic/.test(normalized)) return "education-research";
  if (/telecom|network/.test(normalized)) return "telecom-network";
  if (/cyber|security/.test(normalized)) return "cybersecurity";
  if (/cloud|platform|data-ai/.test(normalized)) return "cloud-platform";
  if (/media|content/.test(normalized)) return "media-content";
  return null;
}
