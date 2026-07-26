# 00 · Content Estate Audit — What We Actually Have (July 2026)

An honest inventory is the foundation of the premium strategy: buyers at $100+ sample
five rows before purchasing, so we price and package based on *verified* depth, not
row counts.

## Headline numbers

| Metric | Value |
| --- | --- |
| Content units (platform dirs + masters + in-app library) | 62 |
| Total discrete test-case/scenario rows | ~390,000 |
| Genuinely curated, near-book-quality items | **~1,050** |
| Executable automation scripts | **0** |
| HTML pages that are sub-300-byte stubs | 709 of 851 |
| Redundant mirrors/duplicates in repo | ~15–20 % |

## The quality pyramid

**Tier 1 — genuine depth (~1,050 items).** `src/data/sapTestCases.ts` v3: **841
curated SAP cases** across 33 modules and 8 industries with real T-codes (FS00,
F-02, FB08, OB52, FAGL_FC_VAL), BAPI/eCATT automation hints, real preconditions,
falsifiable expected results — also shipped as `public/downloads/SAP_Test_Repository_v3.*`.
Plus `templates.ts` (50 consultant-grade scenario templates across 10 platforms) and
`sapTestCasesV2.ts` (156 typed cases). This tier is the anchor of everything sellable.

**Tier 2 — rich-schema volume, templated depth (~110,000 rows).** Six platforms use
a 14-column schema (preconditions, E2E flows, priorities, sample-data JSON):
SAP static pack (14k), **Salesforce (31k**, incl. the 5,520-row FSC superpack with
compliance/AML flavor), **Workday (26.5k)**, ServiceNow (14k), **Veeva (12.5k** —
scarce GxP/pharma domain), OracleApps (12k). Module taxonomies are domain-credible,
but step bodies are combinatorial 3-liners ("1. Open GL. 2. Execute: Create → Approve
→ Post → Report."). Plus the **Industry Scripts masters: 51,500 industry×product E2E
scenario rows** (12,000 strict-validated) with feasibility ratings and integration
hints — unique breadth, but no test steps, and numbered variants inflate counts.

**Tier 3 — skeleton filler (~48 platforms).** 240-row thin CSVs out of sync with
800-row TS/JSON twins; steps like "1. Open module. 2. Execute flow. 3. Verify
outcome."; expected result "Success"; `Sample Data = {"sample":"data"}`. Value is
breadth signaling and SEO surface, not sellable content.

## Crown jewels (productize first)

1. The 841-case curated SAP repository — the only asset already near the $100+ bar.
2. The 50 expert templates — the front-of-store sampler and sales copy.
3. The 51.5k industry-scenario taxonomy — unmatched breadth; needs dedup + step enrichment.
4. Salesforce estate (~31k, only platform with zip packaging; FSC superpack is the gem).
5. Workday estate (26.5k; realistic BP flow names across 8 modules).
6. Veeva estate (12.5k + 6 curated templates; GxP content is scarce and premium).
7. The packaging machinery itself — 60-platform taxonomy, manifests, portal generator,
   multi-format export pipeline (`scripts/*.py`) — distribution infrastructure.

## Gaps between today and "book quality" (fix before charging premium)

1. **Templated steps everywhere outside the 841-case core** — a QA lead recognizes
   machine generation in five rows.
2. **Non-falsifiable expected results** ("Success") — rows can't serve as acceptance
   criteria, which is the core of what a paying QA lead buys.
3. **Zero executable automation** despite the "test automator" brand — no Playwright/
   Cypress/Selenium specs, no page objects, no API collections.
4. **Only SAP got curated treatment** — no 300–800-case curated core for Salesforce,
   Workday, ServiceNow, Veeva, Oracle (exactly what the premium buyer wants).
5. **Data-integrity failures that would destroy paid-product trust**: `fsc_superpack_10000`
   holds 5,520 rows; `variantB "5000"` holds 520; CSV 240/module vs TS 800/module in
   ~45 platforms; literal duplicate rows in Dynamics365; HTML claims contradicting CSVs.
6. **No documentation layer**: one-line READMEs, no setup guides, no coverage
   rationale, no traceability matrix, no changelogs.
7. **No versioning/provenance/license metadata** anywhere in the content estate.
8. **Duplication bloat** (~15–20 % of repo): public/data mirrors, sap-data mirrors,
   extracted zip copies, `Ph-II/` vs `ph-II/`.

## Strategic conclusion

Sell **depth on 5–6 flagship platforms** (SAP → Salesforce → Workday → Veeva →
ServiceNow/Oracle), use the **60-platform breadth as free marketing and SEO moat**,
and treat the skeleton packs as top-of-funnel only. Selling Tier-3 packs at premium
prices would generate refunds and reputation damage. Immediate hygiene regardless of
strategy: reconcile counts, fix inflated filenames, dedupe mirrors, and add per-pack
docs + versioning + license metadata.

*(Full per-platform inventory table lives in the workflow audit; regenerate any time
by re-running the content sweep.)*
