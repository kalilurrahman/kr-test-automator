/**
 * Industry domain taxonomy
 * --------------------------------------------------------------------------
 * The raw scenario data ships with ~280 fine-grained industry sub-domains
 * (e.g. "Cardiology Care", "ICU Operations", "Neurology Care", "Acute Care
 * Ops" — all of which are really *Healthcare*). The Industries page used to
 * render every distinct value as a separate tile, which both fragmented the
 * UX and dropped the long tail behind a `0 scenarios` fallback because the
 * curated `industryMeta` only knows about the original ~120 names.
 *
 * This module groups all known sub-domains under a small set of parent
 * domains. Lookup is rule-based (substring/keyword match) so new scenario
 * batches automatically get bucketed even if we never edit this file again.
 */
import type { IndustryScenario } from "./industryScenarios";

export interface DomainMeta {
  /** URL slug used by /industries/:slug */
  slug: string;
  /** Display name */
  name: string;
  /** Short description for the tile */
  blurb: string;
  /** Emoji glyph */
  glyph: string;
  /** Tailwind hue family used for the tile gradient */
  accent:
    | "violet"
    | "emerald"
    | "amber"
    | "rose"
    | "blue"
    | "cyan"
    | "indigo"
    | "teal"
    | "lime";
}

export interface DomainBucket extends DomainMeta {
  total: number;
  high: number;
  autoReady: number;
  strict: number;
  v3: number;
  incremental: number;
  /** Distinct sub-industry names rolled into this domain. */
  subIndustries: Array<{ name: string; total: number }>;
  /** Distinct products covered. */
  products: string[];
  /** All scenarios for this domain (lazy access). */
  scenarios: IndustryScenario[];
}

/**
 * The 14 parent domains we group everything under. Order matters — first
 * match wins, so put more-specific keywords (`pharma`, `clinical`) before
 * broader catch-alls (`health`, `service`).
 */
export const DOMAINS: Array<DomainMeta & { keywords: string[] }> = [
  {
    slug: "pharma-life-sciences",
    name: "Pharma & Life Sciences",
    blurb:
      "Drug lifecycle, GxP, clinical trials, regulatory submissions, pharmacovigilance and Veeva-driven flows.",
    glyph: "💊",
    accent: "violet",
    keywords: [
      "pharma",
      "life science",
      "clinical",
      "gxp",
      "labeling",
      "regulatory",
      "pharmacovigilance",
      "pharmacy",
      "precision medicine",
      "r&d",
      "safety",
      "batch release",
      "batch manufacturing",
      "medical devices",
      "medical supplies",
      "wholesale pharma",
      "retail pharma",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    blurb:
      "EHR, claims, patient access, hospital operations, ICU/ER, surgical care and HIPAA-grade integrations.",
    glyph: "🩺",
    accent: "rose",
    keywords: [
      "healthcare",
      "hospital",
      "patient",
      "icu",
      "er ",
      "ward",
      "surgical",
      "surgery",
      "cardiology",
      "neurology",
      "orthopedic",
      "elder care",
      "hospice",
      "home health",
      "acute care",
      "intensive care",
      "critical care",
      "inpatient",
      "emergency dispatch",
      "emergency response",
      "emergency surgery",
      "emergency ward",
      "care coordination",
      "revenue cycle",
      "health claims",
      "public health",
      "retail health",
    ],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    blurb:
      "Core banking, payments, AML/KYC, lending, insurance underwriting, claims, treasury and consolidation.",
    glyph: "🏦",
    accent: "indigo",
    keywords: [
      "banking",
      "finance",
      "financial",
      "insurance",
      "claims",
      "consumer finance",
      "corporate finance",
      "order finance",
      "education finance",
      "hospital revenue",
      "patient billing",
      "subscription billing",
      "utility billing",
      "academic billing",
      "academic finance",
      "retail supply finance",
      "risk operations",
      "bid-to-bill",
      "bid management",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    blurb:
      "MES, MRP, shop-floor, OEE, factory automation, plant ops, quality, traceability and supplier integration.",
    glyph: "🏭",
    accent: "amber",
    keywords: [
      "manufactur",
      "factory",
      "plant operations",
      "production",
      "assembly",
      "industrial",
      "quality",
      "inspection",
      "defect",
      "field service",
      "asset quality",
      "chemicals",
      "aerospace",
      "automotive",
      "aviation",
      "maritime",
    ],
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    blurb:
      "Smart-grid, AMI, DERMS, outage response, energy trading, retail switching, water utilities and field crews.",
    glyph: "⚡",
    accent: "amber",
    keywords: [
      "energy",
      "utilit",
      "grid",
      "voltage",
      "smart grid",
      "outage",
      "transmission",
      "distributed energy",
      "power",
      "water util",
    ],
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    blurb:
      "TMS, WMS, ocean/air freight, customs, brokerage, control tower, warehouse and last-mile orchestration.",
    glyph: "🚚",
    accent: "blue",
    keywords: [
      "logistics",
      "supply chain",
      "supply network",
      "freight",
      "cargo",
      "ocean",
      "port",
      "container",
      "customs",
      "warehouse",
      "transportation",
      "transport",
      "international shipping",
      "import export",
      "trade logistics",
      "demand planning",
      "supplier",
      "vendor",
      "sourcing",
      "procurement",
    ],
  },
  {
    slug: "retail-commerce",
    name: "Retail & Commerce",
    blurb:
      "OMS, POS, omnichannel fulfilment, returns, B2B/B2C commerce, CPG, subscriptions and promotions.",
    glyph: "🛒",
    accent: "amber",
    keywords: [
      "retail",
      "commerce",
      "ecommerce",
      "cpg",
      "consumer goods",
      "consumer pricing",
      "consumer supply",
      "wholesale distribution",
      "promotion",
      "subscription returns",
      "returns",
      "brand operations",
      "customer service",
      "catalog management",
      "revenue operations",
      "compliance exception",
      "compliance monitoring",
    ],
  },
  {
    slug: "telecom-network",
    name: "Telecom & Network",
    blurb:
      "BSS/OSS, billing, charging, 5G provisioning, order-to-activate, network ops and failover playbooks.",
    glyph: "📡",
    accent: "blue",
    keywords: ["telecom", "network", "5g"],
  },
  {
    slug: "cloud-platform",
    name: "Cloud & Platform Engineering",
    blurb:
      "Landing zones, FinOps, SRE, observability, DevSecOps, release engineering and platform reliability.",
    glyph: "☁️",
    accent: "cyan",
    keywords: [
      "cloud",
      "platform",
      "sre",
      "devsecops",
      "devops",
      "observability",
      "site reliability",
      "infrastructure",
      "release ",
      "build engineering",
      "ops monitoring",
      "digital platform",
      "digital subscriptions",
      "digital commerce",
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity & Resilience",
    blurb:
      "SIEM, IAM, zero-trust, posture management, ransomware drills and incident-response validation.",
    glyph: "🔐",
    accent: "rose",
    keywords: ["cyber", "security", "resilience"],
  },
  {
    slug: "public-sector",
    name: "Public Sector & Government",
    blurb:
      "Citizen services, benefits, licensing, tax, casework, public assistance and inter-agency exchange.",
    glyph: "🏛",
    accent: "indigo",
    keywords: [
      "government",
      "govtech",
      "public sector",
      "public assistance",
      "public benefits",
      "public casework",
      "public appeals",
      "public insurance",
      "citizen",
      "permit",
      "child benefits",
      "benefit",
      "case management",
      "program eligibility",
      "service eligibility",
      "disability claims",
    ],
  },
  {
    slug: "education-research",
    name: "Education & Research",
    blurb:
      "SIS, LMS, admissions, financial aid, curriculum, online learning and grant-funded research operations.",
    glyph: "🎓",
    accent: "violet",
    keywords: [
      "education",
      "academic",
      "academy",
      "admissions",
      "enrollment services",
      "higher education",
      "lms",
      "learning",
      "online learning",
      "student",
      "training",
      "research",
      "course",
      "workforce learning",
    ],
  },
  {
    slug: "media-content",
    name: "Media & Content",
    blurb:
      "DAM, OTT delivery, rights, royalties, editorial, content lifecycle and audience analytics.",
    glyph: "🎬",
    accent: "violet",
    keywords: ["media", "content", "publishing", "publish"],
  },
  {
    slug: "workforce-services",
    name: "Workforce & Shared Services",
    blurb:
      "HCM, payroll, talent, benefits operations, contingent labour and centralised shared-service centres.",
    glyph: "👥",
    accent: "teal",
    keywords: [
      "hcm",
      "shared services",
      "vendor management",
      "real estate",
      "travel",
      "it services",
      "contract lifecycle",
      "contract sourcing",
    ],
  },
  {
    slug: "edge-iot",
    name: "Edge / IoT & High Tech",
    blurb:
      "Device telemetry, OTA updates, edge inference, CPQ, subscription billing and SaaS analytics.",
    glyph: "📶",
    accent: "teal",
    keywords: ["edge", "iot", "high tech"],
  },
];

/** Last-resort bucket so nothing is ever lost from the UI. */
const FALLBACK_DOMAIN: DomainMeta = {
  slug: "other-industries",
  name: "Other Industries",
  blurb: "Cross-industry scenarios that don't fit the parent buckets above.",
  glyph: "🏷",
  accent: "teal",
};

const RULES = DOMAINS.map((d) => ({
  ...d,
  keywords: d.keywords.map((k) => k.toLowerCase()),
}));

/**
 * Resolve any raw industry name to its parent domain slug. The result is
 * stable across batches because matching is keyword-based.
 */
export const resolveDomain = (rawIndustry: string): DomainMeta => {
  const hay = rawIndustry.toLowerCase();
  for (const d of RULES) {
    for (const kw of d.keywords) {
      if (hay.includes(kw)) {
        return {
          slug: d.slug,
          name: d.name,
          blurb: d.blurb,
          glyph: d.glyph,
          accent: d.accent,
        };
      }
    }
  }
  return FALLBACK_DOMAIN;
};

export const DOMAIN_BY_SLUG = new Map<string, DomainMeta>([
  ...DOMAINS.map((d) => [
    d.slug,
    {
      slug: d.slug,
      name: d.name,
      blurb: d.blurb,
      glyph: d.glyph,
      accent: d.accent,
    } as DomainMeta,
  ]) as Array<[string, DomainMeta]>,
  [FALLBACK_DOMAIN.slug, FALLBACK_DOMAIN],
]);

/**
 * Build per-domain rollups from the loaded industry index.
 * Sub-industries are kept inside `subIndustries` so the detail page can
 * still surface the fine-grained groupings as filter chips.
 */
export const buildDomainBuckets = (
  scenarios: IndustryScenario[],
): DomainBucket[] => {
  const buckets = new Map<string, DomainBucket>();

  for (const s of scenarios) {
    const meta = resolveDomain(s.industry);
    let b = buckets.get(meta.slug);
    if (!b) {
      b = {
        ...meta,
        total: 0,
        high: 0,
        autoReady: 0,
        strict: 0,
        v3: 0,
        incremental: 0,
        subIndustries: [],
        products: [],
        scenarios: [],
      };
      buckets.set(meta.slug, b);
    }
    b.total += 1;
    if (s.priority === "High") b.high += 1;
    if (s.auto_feasibility === "High") b.autoReady += 1;
    if (s.batch === "strict") b.strict += 1;
    else if (s.batch === "incremental") b.incremental += 1;
    else b.v3 += 1;
    b.scenarios.push(s);
  }

  for (const b of buckets.values()) {
    const subCounts = new Map<string, number>();
    const productSet = new Set<string>();
    for (const s of b.scenarios) {
      subCounts.set(s.industry, (subCounts.get(s.industry) ?? 0) + 1);
      if (s.product) productSet.add(s.product);
    }
    b.subIndustries = [...subCounts.entries()]
      .map(([name, total]) => ({ name, total }))
      .sort((a, z) => z.total - a.total);
    b.products = [...productSet].sort();
  }

  return [...buckets.values()].sort((a, z) => z.total - a.total);
};
