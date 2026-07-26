# 01 · Premium Content Blueprint — From 390,000 Rows to Flagship Packs

> **Note:** dollar figures in this document are the content team's draft estimates.
> The canonical SKU ladder and prices live in [03-pricing-and-gtm.md](03-pricing-and-gtm.md)
> (e.g. SAP flagship launches at $149, not $249).

**Operating thesis.** The estate's value is inverted from its volume: ~1,050 curated items (841 SAP v3 cases, 156 SAP v2 cases, 50 expert templates) carry all the quality; ~389,000 generated rows carry all the breadth. The blueprint below converts breadth into marketing surface and concentrates paid value into a small number of packs that visibly clear the two floors every buyer will test against: SAP's free Best Practices scripts and whatever ChatGPT produces in five minutes. The differentiators neither floor can match are **falsifiable expected results, runnable automation, release-version awareness, and traceability** — so those four things define the paid line.

---

## 1. The Canonical Premium Pack Standard

### 1.1 Per-test-case anatomy (the "TF-Case" schema, v1.0)

Every paid case ships in CSV, XLSX, JSON, and typed TS (the existing multi-format pipeline in `scripts/*.py` already does this), conforming to this schema. The 841-case `sapTestCases.ts` v3 set is the reference implementation — it already has 70% of these fields; the standard formalizes the rest.

**Identity & metadata**
- `id` — stable, never-reused (e.g. `SAP-FI-GL-0042`), format `{PLATFORM}-{MODULE}-{SUBMODULE}-{NNNN}`
- `title` — verb-first, outcome-stated ("Post cross-company-code journal entry and verify clearing document in both codes"), never "Test GL flow #3"
- `module` / `subModule` / `businessProcess` — from the existing `platformManifests.ts` taxonomy
- `priority` (P1–P4 with the rubric printed in the pack: P1 = blocks go-live), `type` (positive | negative | boundary | security | integration | performance-smoke), `layer` (UI | API | batch | report)
- `appVersion` — the release the case was verified against (`S/4HANA Cloud 2602`, `Salesforce Summer '26`, `Workday 2026R1`). This single field is the anti-LLM-slop moat: generic generators cannot truthfully populate it.
- `industryVariants` — reusing the 8-industry lineage already in the SAP v3 set

**Setup**
- `roles` — named business role AND the technical authorization (SAP: role + T-code auth like `F-02`/`FB08`; Salesforce: profile + permission set; Workday: security group + BP step)
- `preconditions` — checkable statements ("Posting period 07/2026 open in variant 0001 via OB52", not "system configured")
- `testData` — a real record set, not `{"sample":"data"}`: named fields with valid values, plus a pointer into the pack's data dictionary (§1.2) so data is reusable across cases

**Execution**
- `steps` — numbered, one action per step, each with screen/transaction/endpoint named (T-code, Lightning page, Workday task, ServiceNow module) and an *inline expected state* for intermediate steps
- `expectedResults` — the falsifiability rule, enforced editorially: **every expected result must name an observable artifact and a value** ("Document number in range 01xxxxxxxx; FBL3N shows open item cleared; FAGLL03 balance = 0.00 in both company codes"). "Success" and "Flow completes" are banned strings — a lint script rejects them at build time.
- `negativeVariants` — minimum 2 per P1/P2 case, embedded as sub-cases (blocked posting period, missing authorization, duplicate invoice check via `FB60` message F5 117-style expected errors)
- `boundaryNotes` — where applicable (amount limits, field lengths, fiscal-year boundaries, governor limits on Salesforce)

**Automation (the brand promise "test automator" finally honored)**
- `automation.feasibility` — inherit the auto-feasibility ratings already computed in the Industry Scripts masters
- `automation.scripts` — **two frameworks minimum per P1 case**: (a) a Playwright TypeScript spec (or API-level equivalent — for SAP, a BAPI/OData call sequence using the BAPI hints already in v3 data; for Salesforce, Apex-test or UI spec; for ServiceNow, ATF-importable steps or REST), and (b) a tool-neutral Gherkin feature file that imports cleanly into Tosca/qTest/Xray. P3/P4 cases may ship Gherkin only.
- `automation.pageObjects` — shared per module, shipped once per pack (see §1.2)

**Governance**
- `traceability` — business-process ID (maps to the Industry Scripts scenario taxonomy) + requirement placeholder column formatted for Jira/ALM import
- `compliance` — populated for regulated platforms only: SOX control assertion for SAP FI/CO/GRC and Oracle Financials ("supports ITGC change-control evidence; retain executed log"), GxP/21 CFR Part 11 annotations for Veeva (audit-trail verification step mandatory, e-signature manifestation check), HIPAA notes where PHI test data appears
- `provenance` — `authoredBy` (human | ai-drafted+human-verified), `verifiedOn` date, `lastReviewedRelease`. Printed honestly. Buyers of $200 products check.

### 1.2 Per-pack anatomy (the "field manual" wrapper)

A pack is a product, not a folder of rows. Each flagship pack ships as a versioned ZIP (the jszip pipeline exists) containing:

1. **README / Buyer's Guide** (15–25 pp PDF via the existing jspdf path, license-stamped per §5 of the merchant research): what's covered, how to import into Jira/Xray/qTest/ALM/Tosca, how to run the Playwright specs
2. **Module coverage map** — a matrix of modules × test types × priorities with case counts and *explicit gaps stated* ("EWM wave management: 12 cases, no RF-device coverage — roadmap Q4"). Stating gaps is a trust signal no generated competitor offers.
3. **E2E business-process flows** — 10–20 mermaid/SVG swimlane diagrams (Procure-to-Pay, Order-to-Cash, Record-to-Report for SAP; Lead-to-Cash for Salesforce; Hire-to-Pay for Workday) with each swimlane step hyperlinked to its case IDs
4. **Data dictionary** — every test-data entity used (vendors, materials, GL accounts, employees, opportunities) with valid value sets and a setup script/checklist to create them in a fresh sandbox
5. **Environment setup guide** — how to get a usable test system: SAP CAL/S-user trial guidance, Salesforce Developer Edition + scratch-org config, Workday tenant assumptions, ServiceNow PDI setup, Veeva sandbox constraints
6. **CI pipeline templates** — GitHub Actions + Azure DevOps YAML that runs the pack's Playwright suite tagged by priority (`@p1-smoke`, `@regression`)
7. **Regression checklist per release cycle** — the one-page "run these 60 before every quarterly release" distillation
8. **CHANGELOG.md + version stamp + LICENSE.txt** — semver per pack (`sap-core-1.3.0`), signed license file with buyer email/order ID injected at download time (per the license-token architecture already specified)

**The pack quality bar, stated as a testable claim:** *a QA lead can sample any five random cases and find zero templated steps, zero non-falsifiable expected results, and at least one runnable script.* This is the exact test the audit says the current packs fail; passing it is the product.

---

## 2. Productization Waves

### Wave 1 — Ship revenue in 6–8 weeks (anchor: the assets already near-quality)

| Product | Source assets | Work | Effort |
|---|---|---|---|
| **SAP Test Repository — Professional Edition** ($249; team $2,500) | 841 curated v3 cases + 156 v2 typed cases + best 400 of the SAP 14K static pack, upgraded | Merge to TF-Case schema; add negative variants to all P1/P2; write Gherkin for all + Playwright/OData specs for ~150 P1 cases using existing BAPI hints; build the 8 field-manual components; version-stamp against S/4HANA 2602 | 4–5 wk (the only pack where content is 70% done) |
| **The QA Consultant's Scenario Playbook** ($49–79) | `templates.ts` — 50 expert templates | Expand each to full charter (2–3 pp): context, risk analysis, scoping worksheet, sample Gherkin. Front-of-store credibility product and email-list builder | 1–2 wk |
| **Free sampler** ($0, email-gated) | 40 SAP cases + 5 playbook charters, full premium anatomy | Deliberately full-quality so the free sample *is* the sales pitch | 3 days |

Wave 1 also includes the non-negotiable hygiene from the audit (reconcile CSV/TS counts, fix `fsc_superpack_10000`=5,520 and `variantB 5000`=520 filenames, dedupe Dynamics365, kill the `public/data` / `sap-data` / `Ph-II`+`ph-II` mirrors) — ~1 week, because a buyer who finds one inflated filename refunds everything.

### Wave 2 — The Big Four curated cores (months 2–5)

Apply the "curated core" treatment — top 300–500 cases per platform rebuilt to TF-Case standard, with the remaining volume demoted to a clearly-labeled "extended catalog" appendix (breadth, honestly framed):

1. **Salesforce Pack** ($199) — from the 31K estate; lead with the 5,520-row FSC superpack's compliance/AML scenarios rebuilt properly (that's the differentiated slice), plus Sales/Service Cloud cores. ~400 curated cases. **5–6 wk**
2. **Workday Pack** ($199) — from 26.5K rows; HCM + Payroll cores using the realistic BP flow names already present; payroll parallel-testing checklist is the killer artifact (every Workday program runs one). ~350 cases. **5 wk**
3. **Veeva Vault GxP Pack** ($349 — priced above the others deliberately; life-sciences QA content is scarce and GxP buyers are price-insensitive) — from 12.5K rows + 6 curated templates; every case carries 21 CFR Part 11 annotations and an OQ/PQ-style execution log format. ~300 cases. **5–6 wk** (needs the most domain review)
4. **ServiceNow Pack** ($149) — from 14K rows; ITSM core + ATF-format automation exports (ServiceNow's native tool — cheap to support, high perceived value). ~300 cases. **4 wk**

Bundle at the end of Wave 2: **All-Access ($699)**, consultancy license with internal-reuse rights ($3,500).

### Wave 3 — Recurring revenue and breadth conversion (months 5–9)

- **Oracle Apps Pack** ($199) from the 12K estate (~4 wk)
- **Release Regression Subscriptions** (§5) — the update stream Kainos proves enterprises pay for
- **Industry Scenario Atlas** ($99) — dedupe the 51,500 Industry Scripts rows (kill the `#1/#2/#3` variants → est. ~15–20K genuine scenarios), keep them step-free but sell them honestly as a *coverage-planning taxonomy* with feasibility ratings and integration hints — a test-strategy input, not test cases. Repositioning beats enrichment here: as a planning atlas it's already unique; as test cases it's forever inferior. (~2 wk)
- The remaining ~45 skeleton platforms are **never sold**. They become the free SEO/breadth layer (§3).

---

## 3. The Free/Premium Line

Principle applied per content type — **free tells you WHAT to test; paid tells you HOW, and hands you the artifacts.**

| Content type | FREE (stays static, crawlable) | PAID (moves to private Supabase Storage, signed URLs) |
|---|---|---|
| Test-case rows | Every case's `id`, `title`, `module`, `priority`, `type` — the full catalog is browsable. `TestCaseDetail` shows steps for ~10 sampler cases per platform; all others show steps/expected/data blurred behind the paywall | Steps, expected results, test data, negative variants, roles/authorizations — the full TF-Case body |
| Automation | Feasibility rating + framework recommendation visible per case | Every Gherkin file, Playwright spec, page object, CI template |
| Coverage maps | Module × count matrix (it *is* the marketing) | The per-case traceability behind it |
| E2E flows | Flow names + one sample swimlane per platform | All diagrams with case-ID hyperlinks |
| Data/setup | "This pack includes a data dictionary covering 14 entity types" | The dictionary and setup scripts |
| Industry Scripts | Scenario titles + industry lineage (SEO goldmine: "pharma order-to-cash test scenarios") | Feasibility ratings, integration hints, export formats |
| 45 skeleton platforms | Entirely free, relabeled "Coverage Checklists" — honest framing turns a liability into 45 SEO landing pages funneling to flagship packs | Nothing — never sold |
| Downloads page | Sampler files only | All masters and pack ZIPs via `sign-download-url` edge function |
| AI generator | 3/day anonymous, 10/day free account (enforced server-side per the architecture audit) | 50/day + premium prompt modes for pack owners |
| `templates.ts` | All 50 titles + business-case summaries (they're sales copy) | Expanded charters (the Playbook product) |

Mechanically this means: strip flagship-platform CSVs and `/data` masters from `viteStaticCopy`, generate preview-only JSON (metadata columns) for the free catalog, exclude premium URL patterns from workbox caching, and update robots.txt/sitemap — exactly the hook points the architecture audit lists. The 841 SAP cases currently free at `/downloads/SAP_Test_Repository_v3.*` move behind the paywall, replaced by the 40-case sampler; ship this cut simultaneously with the paid launch so the story is "the library grew and got a professional edition," not "free things became paid."

---

## 4. Book-Quality Editorial Standards

**Voice.** Second-person imperative, practitioner register, zero filler ("Post the invoice. SAP assigns a document number in range 51xxxxxxxx; note it — you clear it in step 9."). Ban list enforced by lint: "successfully," "properly," "as expected," "various," "etc." Every module chapter opens with 3–5 paragraphs of business context — *why* this process breaks in real implementations — which is what the `templates.ts` narratives already do well; they set the house voice.

**Structure.** Every pack = same field-manual skeleton (§1.2), same chapter template per module: context → risk table → coverage map → cases (P1 first) → automation appendix. Predictability across packs is itself a premium signal — buyers of pack #2 already know where everything lives.

**Diagrams.** Mermaid source committed in-repo (renders in the artifact/HTML layer natively), exported to SVG for PDFs. Three mandated types: swimlane per E2E flow, state diagram per document lifecycle (SAP document status, Salesforce opportunity stages, ServiceNow incident states), integration-context diagram per pack.

**Versioning & changelog.** Semver per pack; CHANGELOG entries name the triggering vendor release ("1.3.0 — verified against S/4HANA Cloud 2602; 14 cases updated for Fiori app F0702 changes; 6 new bank-integration cases"). The changelog is public even where the pack is paid — it is the strongest possible "living product" proof and directly sells the update subscription.

**Review pipeline (AI as force multiplier, not author).** Reuse the `generate-test-script` edge function as an internal drafting tool with new prompt modes, inside a fixed pipeline:

1. **Draft** — AI expands a thin generated row into TF-Case format, with the prompt *seeded by 3 nearest curated SAP-v3 exemplars* (few-shot from the 841 set) plus the platform's data dictionary, so output uses real T-codes/BP names, not generic prose
2. **Machine lint** — schema validation; falsifiability check (expected result must contain a number, named field, status value, or message ID); banned-string scan; duplicate-similarity check against the pack (kills the `#1/#2/#3` disease)
3. **Human domain verify** — the non-negotiable expensive step: verify against a real sandbox or vendor documentation; populate `appVersion` and `verifiedOn` only here. Budget ~15–20 min/case for P1/P2, ~5 min for P3+. That prices a 400-case curated core at roughly 80–110 hours of expert review — the real cost of Wave 2, and the moat: no one selling $15 template packs will spend it.
4. **Editorial pass** — voice, structure, cross-references, per-module batch
5. **Runnability gate** — every shipped Playwright spec executes green against the environment named in the setup guide before release

Cases that skip step 3 cannot carry `verifiedOn` and are excluded from paid packs. Provenance is printed; honesty about what's AI-drafted-human-verified versus fully human-authored is a differentiator in 2026, not a weakness.

**Cadence.** Flagship packs get a verified refresh within 4 weeks of each vendor release (see §5), a patch release monthly if errata exist, and a public errata page. "Lifetime access to the edition you bought + 12 months of updates included, then optional update subscription" — the honest hybrid the market research says buyers now prefer over dubious "lifetime everything" claims.

---

## 5. New Premium-Only Content Types

**1. Cross-platform E2E suites ($299–399 each)** — the assets no vendor sells because each vendor stops at its own boundary, and TestForge's 60-platform taxonomy plus the Industry Scripts integration hints make it uniquely buildable:
- *Hire-to-Retire*: Workday HCM (from the 26.5K estate) → SAP HCM/payroll posting (curated set has HCM module) → identity/ServiceNow onboarding tickets. Interface-contract test cases (file/API handoffs) are the unique content — nobody's free scripts cover the seams.
- *Order-to-Cash across CRM+ERP*: Salesforce opportunity→quote→order → SAP SD/FI billing and revenue recognition.
- *Procure-to-Pay*: Coupa/Ariba-style front end → SAP MM/FI → DocuSign approval (both directories exist in the estate).
These sell to SIs (persona #2) at team-license prices, because integration testing is exactly what they bill the most hours designing.

**2. Compliance evidence packs ($349–499)** — not more test cases but *the wrapper regulated buyers need*: SOX ITGC pack for SAP/Oracle (control-objective → test-case traceability matrix, executed-evidence log templates, auditor-ready coverage attestation); GxP validation pack for Veeva (IQ/OQ/PQ protocol shells pre-populated with pack case IDs, Part 11 assessment checklist). High price, low marginal content cost, extreme differentiation — a QA lead facing an auditor expenses this without blinking.

**3. Release regression subscriptions ($99–149/yr per platform)** — the recurring-revenue engine, tied to real cycles:
- **SAP S/4HANA Cloud**: biannual releases — subscriber gets the delta pack ("what changed, which of your 450 cases are affected, 20 new cases") within 4 weeks of each
- **Salesforce**: Spring/Summer/Winter — three deltas/yr, focused on the flagship pack's clouds; the seasonal-release panic is the most predictable urgency spike in the Salesforce QA calendar
- **Workday**: R1/R2 (March/September) — delta plus refreshed payroll parallel-test checklist
- **ServiceNow** (annual family releases + patches) and **Veeva Vault** (three GxP-impacting releases/yr, where "what changed" carries revalidation obligations — the highest-value delta of all)
This is precisely the maintained-content value Kainos proves enterprises pay for, at 1/100th of platform-vendor pricing, and it converts one-time buyers into retained revenue.

**4. Sandbox seed kits ($49 add-on per pack)** — scripted test-data loaders (Salesforce scratch-org config + Apex seed scripts; SAP LSMW/migration-cockpit templates; ServiceNow demo-data update sets) matching each pack's data dictionary. Solves the real reason buyers abandon test libraries: no data to run them against.

**5. The annual "State of ERP Test Coverage" report (free)** — built from the deduped Industry Scripts taxonomy statistics; the authority-building content marketing that solves the no-author-brand problem the market research flags, feeding LinkedIn/Ministry-of-Testing distribution.

---

### Sequencing summary

Weeks 1–2: hygiene + free/paid line mechanics. Weeks 3–8: SAP Professional Edition + Playbook + sampler → launch at $249/$79 on Polar.sh. Months 2–5: Salesforce, Workday, Veeva, ServiceNow curated cores + All-Access bundle. Months 5–9: Oracle, Scenario Atlas, first cross-platform suite (Hire-to-Retire), compliance packs, and regression subscriptions starting with SAP's next release window. Every wave funds the next; nothing ships that fails the five-random-cases test.