# 08 · Wave 1 Status — What Shipped and What the Quality Gate Found

This records the state of Wave 1 (the SAP flagship, the free sampler, and the
pre-launch hygiene sweep) after the first build, including a finding that
changes the launch plan.

## The headline finding

**571 of the 841 curated SAP cases clear the paid quality bar; 270 are held back.**

Getting to a trustworthy number took two passes, and the first one was wrong in
an instructive way.

The first run reported only 201 passing (24%). That was a measurement artefact:
the linter judged each expected-result *fragment* independently, but curated
cases state several assertions at once — "Asset master created; asset number
generated; depreciation calculation scheduled". One soft clause among three
checkable ones sank the whole case. A QA lead would accept that case without
hesitation, so the bar was measuring the wrong thing.

The corrected rule judges falsifiability **at case level**: a case fails only
when *nothing* in it is checkable, and individual soft clauses are recorded as
warnings (editorial debt) instead. That is the standard a buyer actually
applies.

### Proof the bar was corrected, not loosened

Recalibrating a quality gate is exactly how standards get quietly lowered until
the numbers look good, so the change is guarded by a control test
(`npm run lint:control`). It runs the same linter over skeleton-tier packs —
the generated filler nobody should ever pay for:

| Control set | Pass rate |
| --- | ---: |
| Coupa | 0 / 200 (0.0%) |
| NetSuite | 0 / 200 (0.0%) |
| 3DEXPERIENCE | 0 / 200 (0.0%) |
| Dynamics365 | 0 / 200 (0.0%) |

**0% of skeleton content passes; 68% of curated content passes.** The bar
discriminates perfectly between the two tiers, which is the evidence that the
201 → 571 move was a fix rather than a concession. The control test fails the
build if skeleton pass rate ever exceeds 5%.

### What still holds cases back

| Rule | Findings | What it means |
| --- | ---: | --- |
| `expected-falsifiable` | 231 | **Blocking.** Nothing in the case is checkable at all |
| `step-anchor` | 48 | **Blocking.** No step names a transaction, screen or endpoint |
| `expected-vague` | 990 | Warning. A soft clause alongside checkable ones |
| `negative-variant` | 597 | Warning. P1/P2 positive case with no blocking expectation |
| `step-anchor-density` | 375 | Warning. Few steps name a system anchor |

The dataset's *inputs* are excellent — real transaction codes (UKM_CASE, F-02,
FBL3N, ABAON), real BAPIs, real preconditions. What is thin on the held-back
cases is the **output side**: what you should observe afterwards. That is a
tractable editorial pass, not a rewrite.

## What this means commercially

**571 curated cases across 30 modules is a real product** — comfortably above
the blueprint's own 300–500 target for a curated core, and enough to support the
$149 price already on the pricing page.

Recommended: **ship v1.0 with the 571**, state the count honestly, and work the
270-case backlog into visible changelog momentum ("v1.1 adds 90 cases"). The
backlog in `build/quality/sap-remediation-backlog.csv` is sorted cheapest-first;
cases with a single finding are usually one sentence from shipping.

What must not happen is shipping all 841 and hoping — that is precisely the
"sample five cases, find filler, refund" failure the bar exists to prevent.

## An honesty correction in the pack itself

The first build stamped every case `provenance.authoredBy:
"ai-drafted+human-verified"` and titled the pack "Verified against S/4HANA
2026". Neither was true: the converter is a mechanical transform and has never
executed a case against a live SAP system. The pack now says **"Written
against S/4HANA 2026"**, `authoredBy` is `"human"` (the source dataset is
hand-curated, which is accurate), and `verifiedOn` stays unset until a human
sandbox pass happens. Buyers of premium content check this field; a false stamp
there would have been the worst lie in the pack.

## What shipped in this phase

| Deliverable | Where | Notes |
| --- | --- | --- |
| TF-Case schema + linter | `src/lib/tfCase.ts` | 10 unit tests in `tfCase.test.ts`; the executable form of the "sample any five cases" promise |
| SAP pack build | `scripts/build_sap_pack.mjs` (`npm run build:pack:sap`) | Emits CSV, TF-Case JSON, per-module Gherkin, coverage map with a stated gap list, changelog, licence. Output is gitignored — paid artefacts go to the private Storage bucket, never the repo |
| Free sampler | `public/samplers/sap-starter-kit/` | 40 cases spread across modules, P1-preferred, same quality as paid |
| Lead capture | `leads` migration + `StarterKitCta` on `/downloads` | Insert-only RLS with email validation; nobody can read the list back. The files download without an email — a mistyped address must never cost the download |
| Content integrity gate | `scripts/verify_content_integrity.py` (`npm run verify:content`) | 244,414 rows, **201,222 unique** (17.7% duplicates). Fails CI on any filename or HTML claim the data contradicts |
| Honest coverage pages | `scripts/build_coverage_pages.py` | 705 stub pages rebuilt with real counts, 25-row free preview, JSON-LD, and a route to `/pricing` |

## Verified catalogue numbers

Use these, not the older estimates:

- **201,222 unique CSV records** across 61 platforms (244,414 rows before
  de-duplication — 17.7% were duplicates)
- **571 SAP cases** at premium quality, of 841 curated (68%)
- Duplicate-heavy platforms that must never be sold as-is: Dynamics365 (54%),
  GoogleWorkspace (49%), Datadog (48%), Jira (48%), SageIntacct (48%)

## Wave 2 readiness — measured

Running the same bar across the platforms the strategy proposes selling
(`npm run assess:platforms`, full report at `build/quality/wave2-readiness.md`)
produced a finding that should change how Wave 2 is sequenced:

**No Wave 2 platform has a curated core.** Salesforce, Workday, Veeva,
ServiceNow and Oracle all generate their expected results from a small set of
templates — "Requisition → Offer → Hire → Onboard → Payroll completes
successfully", "Setup → Review → Approve → Publish → Archive completes
successfully". Whole files pass or fail together depending on which template
string was used, which is why the raw rates land on exact fractions (1/2, 1/5,
1/6, 1/7, 1/12). Those rates are an artifact, **not a quality ranking**, and the
assessment tool now labels them as such rather than publishing a misleading
league table.

Consequence: there is no "closest to ready" platform and no shortcut pack to
ship second. Wave 2 means authoring curated cases from the business process for
each platform, at roughly the cost the blueprint already estimated. Since
content cost is comparable across all of them, **sequence on market value, not
readiness**:

- **Veeva** if margin matters most — GxP content is scarce, buyers least
  price-sensitive.
- **Salesforce** if audience size matters most — largest buyer pool, strongest
  existing SEO surface.
- **ServiceNow** offers a cheap automation story (native ATF export) that lifts
  perceived value for modest extra effort.

The curated SAP dataset at 68% remains the only genuinely near-ready asset in
the estate.

## Next actions

1. Human sandbox pass on a sample of the 571 so the pack can honestly say
   "verified against" and set `verifiedOn` — the single biggest trust upgrade
   available, and the only claim currently softened.
2. Work `build/quality/sap-remediation-backlog.csv` cheapest-first; re-run
   `npm run build:pack:sap` to watch the shippable count climb past 571.
3. Extend the same lint to the Salesforce and Workday curated cores when Wave 2
   starts — the bar is platform-agnostic.
4. Wire `npm run verify:content` and `npm run lint:control` into CI so both a
   count regression and a quality-bar regression are caught before a customer
   finds either.
