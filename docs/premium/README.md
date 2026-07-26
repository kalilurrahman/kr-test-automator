# TestForge AI — Premium Monetization Program

**Goal:** take testautomator.keyarite.com from a free showcase to a premium,
pay-per-access product line — world-class, book-quality content sold at premium
prices through a merchant with license-key support (Gumroad or Polar.sh), with
license tokens managed in our own Supabase backend.

## The strategy in one page

**1. The market gap is real and specific.** Premium QA content is barbell-shaped:
free courses/templates at $0 (Test Automation University, SEO listicles) and
tool-locked libraries at $20k–$500k/yr (Opkey's "30,000+ pre-built tests",
Worksoft, Kainos Smart Test). Nobody sells the library without the tool. The
$99–$5,000 band is empty. Positioning: **"the Opkey library without the Opkey
contract"** — portable, tool-agnostic, per-platform test-case packs with runnable
automation.

**2. Sell depth, market breadth.** The estate holds ~390k rows across 62
platforms, but the honest audit (doc 00) shows the sellable core is the curated
tier: 841 SAP cases with real T-codes, 50 expert templates, and six platforms
with credible taxonomies (SAP, Salesforce 31k, Workday 26.5k, ServiceNow, Veeva,
Oracle). The ~45 skeleton platforms are never sold — they become free "coverage
checklist" SEO landing pages funneling into 5–6 flagship packs. The quality bar
for anything paid: *a buyer samples five random cases and finds zero templated
steps, zero non-falsifiable expected results, and at least one runnable script.*

**3. Productize in waves** (docs 01, 03): Wave 1 (6–8 weeks) — the SAP
Enterprise Test Repository ($149) from the near-ready curated set, the QA
Consultant's Scenario Playbook from the 50 templates, and a full-quality free
sampler (the "SAP S/4HANA UAT Starter Kit", 100 real cases, email-gated).
Wave 2 (months 2–5) — curated cores for Salesforce, Workday, ServiceNow,
Oracle ($99 each) and Veeva GxP ($149) + All-Access bundle ($499) + Team
licenses ($1,495/5 seats, $3,995/20 seats with consultancy reuse rights).
Wave 3 — cross-platform E2E suites (Hire-to-Retire, Order-to-Cash), compliance
evidence packs, and **Release Radar subscriptions** ($149/yr) tied to
SAP/Salesforce/Workday release calendars — the recurring-revenue engine. A
$7,500 productized Custom Test Suite Sprint anchors the ladder.

**4. The merchant issues keys; Supabase owns entitlements** (docs 02, 07).
Launch commerce on a merchant-of-record with license keys (Gumroad works and is
what the shipped scaffolding integrates first; Polar.sh is the researched
primary recommendation at roughly half the fees). Every sale mirrors into our
Postgres via webhook; activation binds key → Supabase account → entitlement
rows; refunds revoke within minutes; leaving the merchant later never strands a
customer. License keys are stored only as SHA-256 hashes; all writes go through
service-role edge functions; RLS gives users read-only visibility of their own
licenses.

**5. Real gating means moving files** (docs 02, 06). Everything under `public/`
and the static platform dirs is world-readable today — including the 150 MB of
crown-jewel E2E masters on the Downloads page. UI gates are cosmetic; premium
payloads must move to a private Supabase Storage bucket delivered via
entitlement-checked signed URLs, with per-license stamping on PDFs/ZIPs. The
AI generator also needs server-side metering (today `verify_jwt=false`, no
quota) so the free tier is a real funnel, not a cost leak.

## Document map

| Doc | Contents |
| --- | --- |
| [00-content-audit.md](00-content-audit.md) | Honest inventory: what's deep, what's thin, what's sellable, integrity fixes |
| [01-content-blueprint.md](01-content-blueprint.md) | The TF-Case schema, pack anatomy ("field manual"), productization waves, free-vs-paid line, editorial standards, new premium content types |
| [02-licensing-architecture.md](02-licensing-architecture.md) | Full token-management design: flows + sequence diagrams, DDL, edge functions, content protection, anti-abuse, failure modes |
| [03-pricing-and-gtm.md](03-pricing-and-gtm.md) | SKU ladder with price justifications, merchant choice, funnel design, 90-day launch plan, revenue scenarios |
| [05-market-research.md](05-market-research.md) | Competitive landscape, price benchmarks, buyer personas, demand signals (July 2026, sourced) |
| [06-implementation-guide.md](06-implementation-guide.md) | What's already shipped on this branch + go-live checklist |
| [07-merchant-platforms.md](07-merchant-platforms.md) | Gumroad vs Lemon Squeezy vs Paddle vs Polar vs the rest: fees, license APIs, risks (July 2026, sourced) |

## What is already working in this branch

A merchant-agnostic licensing layer (see doc 06 for the full list and go-live
checklist): entitlements schema with RLS, `verify-license` and
`licensing-webhook` edge functions with a Gumroad adapter, `useEntitlements`
hook, `PremiumGate` component, and live `/pricing` and `/activate` pages wired
into the navigation.

## The three metrics that matter first

1. **Sample-to-paid conversion** (starter-kit downloads → pack purchase within
   30 days) — the verdict on whether the content clears the premium bar
2. **Email capture rate on the 851 static pages** — whether the SEO moat
   actually feeds the funnel
3. **Refund rate** (target <5%) — the early-warning for the "skeleton pack sold
   at premium price" failure mode; if it spikes on a SKU, pull it back to free
