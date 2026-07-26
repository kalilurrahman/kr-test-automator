# 08 · Wave 1 Status — What Shipped and What the Quality Gate Found

This records the state of Wave 1 (the SAP flagship, the free sampler, and the
pre-launch hygiene sweep) after the first build, including a finding that
changes the launch plan.

## The headline finding

**Only 201 of the 841 curated SAP cases currently clear the paid quality bar.**

The content audit rated this dataset as the estate's crown jewel and roughly
"70% done". Now that the bar is machine-enforced (`src/lib/tfCase.ts`, run by
`npm run build:pack:sap`), the real figure is **24%**. The gap is not padding or
formatting — it is the specific thing a QA lead pays for:

| Rule | Cases affected | What it means |
| --- | ---: | --- |
| `expected-falsifiable` | 990 findings | The expected result names no observable artefact or value, so a tester cannot tell pass from fail — e.g. "Exposure calculated correctly", "Cash pool balances consolidated" |
| `negative-variant` | 597 findings | A P1/P2 positive case with no blocking or negative expectation |
| `step-anchor-density` | 375 findings | Too few steps name a transaction, screen or endpoint to follow the flow |
| `expected-filler` | 30 findings | Judgement words ("correctly", "properly") standing in for an observation |
| `step-anchor` | 48 findings | No step names any system anchor — the steps are not executable |

Note the shape of the problem: the dataset's *inputs* are excellent — real
transaction codes (UKM_CASE, F-02, FBL3N, ABAON), real BAPIs, real
preconditions. What is thin is the **output side of each case**: what you should
observe afterwards. That is a tractable editorial pass, not a rewrite.

## What this means commercially

Three options, in order of preference:

1. **Ship the 201 now as v1.0 at a lower price, and grow it.** 201 curated
   cases across 26 modules is a legitimate product — the blueprint's own Wave 2
   target for other platforms was 300–500 cases. Price it at $99 rather than
   $149, state the count honestly, and use the published changelog to convert
   the remaining 640 into visible momentum ("v1.1 adds 120 cases").
2. **Work the backlog to ~450 cases first, then launch at $149.** The backlog is
   sorted cheapest-first in `build/quality/sap-remediation-backlog.csv`; cases
   with a single finding are usually one sentence from shipping. At the
   blueprint's 15–20 min/case for P1/P2, ~250 additional cases is roughly
   60–80 hours of expert time.
3. **Do not** ship all 841 and hope. That is precisely the "sample five cases and
   find filler" failure the whole quality bar exists to prevent.

The pricing page currently advertises the SAP pack at $149. Either the count
reaches the price or the price meets the count — but the claim and the content
must agree before launch.

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
- **201 SAP cases** currently at premium quality, of 841 curated
- Duplicate-heavy platforms that must never be sold as-is: Dynamics365 (54%),
  GoogleWorkspace (49%), Datadog (48%), Jira (48%), SageIntacct (48%)

## Next actions

1. Decide option 1 or 2 above — it sets the launch price and date.
2. Work `build/quality/sap-remediation-backlog.csv` cheapest-first; re-run
   `npm run build:pack:sap` to watch the shippable count climb.
3. Extend the same lint to the Salesforce and Workday curated cores when Wave 2
   starts — the bar is platform-agnostic.
4. Wire `npm run verify:content` into CI so a regression is caught before a
   customer finds it.
