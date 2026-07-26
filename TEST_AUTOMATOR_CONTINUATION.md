# Test Automator — Continuation Note

**Handover for the premium monetization programme.**
Branch `claude/test-automator-premium-monetization-8rmz0i` · PR #29 · last updated 26 July 2026.

Read this first, then `docs/premium/README.md`. Everything below is measured from the
repository — do not re-derive it, and do not trust older estimates that contradict it.

---

## 1. What this programme is

TestForge AI (testautomator.keyarite.com) was a free showcase: ~200k test-case records
across 61 enterprise platforms, an AI script generator, no monetization anywhere. The
goal is to sell the deep content as premium packs through a merchant with license keys,
with entitlements owned by our own Supabase rather than the merchant.

The strategy is written up in `docs/premium/` (numbered 00–08). The one-page version:

- **Sell depth, market breadth.** Five or six flagship platforms carry the price; the
  other ~45 stay free as SEO surface and are *never sold*.
- **The market gap is real**: free courses at $0, tool-locked libraries at $20k–$500k/yr
  (Opkey markets "30,000+ pre-built tests" but only inside its platform). The
  $99–$5,000 band is empty. Position: *the Opkey library without the Opkey contract*.
- **The merchant issues keys; Supabase owns entitlements.** Leaving Gumroad later must
  never strand a paying customer.

---

## 2. Verified numbers — use these

| Fact | Value | Source |
| --- | --- | --- |
| Unique catalogue records | **201,222** (of 244,414 rows; 17.7% duplicates) | `npm run verify:content` |
| Platforms with CSV data | 61 | same |
| SAP curated cases clearing the paid bar | **615 of 841 (73%)** | `npm run build:pack:sap` |
| Skeleton-tier cases clearing the bar | **0 of 800 (0%)** | `npm run lint:control` |
| Integrity violations | 276 → **0** | `npm run verify:content` |

Older figures floating around in early docs (~390,000 cases, 183,160, "70% ready") are
estimates that the measurement contradicts. `public/content-integrity.json` is the
published source of truth and carries its own counting methodology.

---

## 3. Commands

```bash
npm run verify:content       # recount catalogue, fail on any false claim, write content-integrity.json
npm run lint:control         # prove the quality bar still rejects generated filler (guards §6)
npm run build:pack:sap       # build the SAP pack + free sampler + remediation backlog
npm run build:coverage-pages # regenerate the 705 free coverage pages (idempotent)
npm run assess:platforms     # TF-Case bar across all flagship candidates (Wave 2 planning)
npm test                     # 29 tests, includes 10 for the quality bar
```

Build outputs land in `build/` which is **gitignored on purpose** — paid artefacts must
never enter a public repo. The free sampler in `public/samplers/` *is* tracked.

---

## 4. Two things need a human (nothing else is blocked)

### 4a. Sandbox verification — the only softened claim

The pack says **"Written against S/4HANA 2026"**, not "verified against", and
`provenance.verifiedOn` is unset. That is deliberate: the build is a mechanical
transform and has never executed a case against a live SAP system. An earlier version
stamped every case `ai-drafted+human-verified` and titled the pack "Verified against" —
both untrue, both corrected.

**To close it:** run a sample of the 615 in a real S/4HANA sandbox, then set
`verifiedOn` and switch the wording in `scripts/build_sap_pack.mjs` (`TARGET_RELEASE`
and the README/coverage strings). This is the single biggest trust upgrade available at
a $149 price point — buyers of premium content check that field.

### 4b. Which platform ships second

`npm run assess:platforms` found that **no Wave 2 platform has a curated core**.
Salesforce, Workday, Veeva, ServiceNow and Oracle all generate expected results from a
couple of templates ("Setup → Review → Approve → Publish → Archive completes
successfully"), so whole files pass or fail on which template string was used. The raw
pass rates land on exact fractions (1/2, 1/5, 1/6, 1/7) — an artefact, **not a quality
ranking**, and the tool now labels it as such.

Consequence: there is no "closest to ready" shortcut. Content cost is comparable, so
sequence on market value — **Veeva** for margin (scarce GxP content, least
price-sensitive buyers) or **Salesforce** for audience size.

---

## 5. Go-live checklist (not yet done)

Full detail in `docs/premium/06-implementation-guide.md`. The short form:

1. Apply the three migrations (`20260726120000_premium_licensing`,
   `20260726130000_generation_usage`, `20260726140000_leads`).
2. Create merchant products with license keys enabled, seed `license_products` with the
   real `merchant_product_id` values, update checkout slugs in `src/pages/Pricing.tsx`
   and the SKU list in `src/pages/Activate.tsx`.
3. Set function secrets: `LICENSING_WEBHOOK_SECRET`, `USAGE_SALT`, and optionally
   `GEN_LIMIT_ANON` / `GEN_LIMIT_FREE` / `GEN_LIMIT_PRO`.
4. Point the merchant's webhook at `licensing-webhook?secret=…` and register the
   `refund`, `dispute`, `dispute_won`, `cancellation`, `subscription_restarted` events.
5. **Move premium payloads out of `public/`** into the private `premium` Storage bucket
   (`vault/<file>` or `packs/<platformId>/<file>`), delete the originals from the
   `viteStaticCopy` targets, and flip the affected `Downloads.tsx` entries to
   `premium: { path, entitlement }`. Delivery mechanics are already built; only the
   content move and the flag remain. **Ship this with the paid launch, not before.**
6. Regenerate DB types (`supabase gen types`) so the temporary casts in
   `src/lib/licensing.ts` and `LicensePanel.tsx` can be dropped.
7. Wire `npm run verify:content` and `npm run lint:control` into CI.

**Merchant recommendation:** Polar.sh (5% + $0.50, first-class license keys, auto-revoke
on refund) as primary; Gumroad (~13% all-in, documented account-freeze risk) for
Discover reach only. The adapter seam is in `verify-license/index.ts` — adding Polar is
one `verifyWith…` function plus new `license_products` rows.

---

## 6. Traps — read before changing anything

These cost real time to find. Do not rediscover them.

- **When the quality gate condemns most of a hand-curated dataset, suspect the gate.**
  It reported 24%, then 68%, then 73%. Every correction was a defect in the instrument,
  never a change to content. Read the held-back cases before concluding anything.
- **`npm run lint:control` is not optional.** It exists so the bar cannot be quietly
  loosened to flatter a number. If the flagship pass rate rises *and* the skeleton pass
  rate rises, the bar was loosened — fix it, don't ship it.
- **Enterprise identifiers break naive parsing.** SAP transaction codes come as `F-02`,
  `F.13`, `F110`, `S_ALR_87011963`, `AW01N`. A step splitter keyed on `\d+\.` tears
  `F-53. 2.` in half; an anchor regex needing two consecutive capitals misses most of
  them. Both bugs wrongly condemned dozens of good cases.
- **`wc -l` overstates CSV rows ~3× here** — fields contain embedded newlines. Always
  parse with a real CSV reader.
- **Never prune a directory name at every depth.** `GoogleWorkspace/docs/` is a product
  module, not this repo's `docs/`. That bug silently skipped a whole platform.
- **Don't pipe a build script to `head`.** SIGPIPE kills it mid-write and leaves stale
  artefacts that look successfully built.
- **Never claim verification nobody performed.** See §4a.
- **Never sell the skeleton platforms.** Duplicate rates: Dynamics365 54%,
  GoogleWorkspace 49%, Datadog 48%, Jira 48%, SageIntacct 48%. They are free breadth.
- **`build/` stays gitignored.** Paid artefacts in a public repo is the whole business
  model leaking.

---

## 7. Where things live

**Strategy** — `docs/premium/`: `00` content audit · `01` content blueprint (TF-Case
standard, productization waves) · `02` licensing architecture (flows, DDL, threat model)
· `03` pricing & GTM (SKU ladder, 90-day plan, revenue scenarios) · `05` market research
· `06` implementation guide · `07` merchant comparison · `08` Wave 1 status.

**Quality bar** — `src/lib/tfCase.ts` (schema + linter), `src/lib/tfCase.test.ts`,
`scripts/lint_control_test.mjs`, `scripts/assess_platform_quality.mjs`.

**Content pipeline** — `scripts/build_sap_pack.mjs`,
`scripts/verify_content_integrity.py` (+ `integrity_waivers.json`),
`scripts/build_coverage_pages.py`.

**Licensing** — `supabase/migrations/2026072612…/13…/14…`,
`supabase/functions/{verify-license,licensing-webhook,sign-download}/`,
`src/lib/licensing.ts`, `src/hooks/useEntitlements.ts`.

**UI** — `src/pages/{Pricing,Activate}.tsx`,
`src/components/premium/{PremiumGate,LicensePanel,StarterKitCta}.tsx`, plus changes to
`Downloads.tsx`, `Profile.tsx`, `KRHeader.tsx`, `App.tsx`.

**Metering** — `supabase/functions/generate-test-script/index.ts` (`enforceQuota`),
`src/hooks/useDailyUsage.ts`, `src/lib/generateScript.ts`.

---

## 8. Suggested next moves, in order

1. **Decide the launch shape** — ship 615 at $149 now, or work the backlog first. The
   backlog (`build/quality/sap-remediation-backlog.csv`, 226 cases) is sorted
   cheapest-first; single-finding cases are usually one sentence from shipping. The
   dominant fix is rewriting an expected result to name an observable artefact and
   value: *"Exposure calculated correctly"* → *"UKM_CASE shows exposure = open orders +
   open AR; a limit breach sets credit status to BLOCKED and order VA01 is rejected"*.
2. **Sandbox-verify a sample** (§4a) so the pack can say *verified*.
3. **Do the content move** (§5 step 5) — until then, every premium payload is still a
   public download and no gate anywhere protects it.
4. **Start the second platform's curated core** (§4b).
5. **Extend the bar to that platform** — `tfCase.ts` is platform-agnostic; only the
   converter in `build_sap_pack.mjs` is SAP-specific.

## 9. Known debt

- 23 pre-existing ESLint errors in `src/` (Index, Templates, Settings, History and
  others) — untouched by this work, unrelated to monetization.
- `profiles` and `generations` DDL still live only in the Lovable-managed Supabase
  project, not in repo migrations. Capture them before building further on that schema.
- Two legacy filenames overstate their contents (`fsc_superpack_10000` holds 5,520;
  `…_5000_variantB` holds 520). All user-visible text is corrected; the renames are
  waived in `scripts/integrity_waivers.json` until Wave 2 regenerates those zips.
