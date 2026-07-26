# 03 · Pricing, Packaging & Go-To-Market Plan

## 1. SKU Ladder

The market research shows a barbell: free content (TAU, SAP Best Practices, Testsigma listicles) at $0, and platform-locked libraries (Opkey's 30,000 tests, Kainos Smart Test, Tosca at $3–5k/seat) at $20k–$500k/yr. The empty $99–$5,000 band is ours — but only for packs that visibly clear the "book-quality anatomy" bar. Price the depth we have (SAP) and the depth we're building (Salesforce, Workday, ServiceNow, Veeva, Oracle), not the 48 skeleton platforms, which stay free as breadth signaling and SEO surface.

### Tier 0 — Free (the funnel, not a SKU)
All 50 expert templates (`templates.ts`), the 156-case `sapTestCasesV2` subset, first 25 rows of every platform pack, AI generator at **5 generations/day server-enforced** (down from the fake client-side 20), and all 48 skeleton platforms as-is. Free must be good enough to prove taste and bad enough to leave the buyer wanting the full catalog.

### Tier 1 — Platform Premium Packs: **$149** (flagship SAP), **$99** (others), individual license
- **SAP Enterprise Test Repository — $149.** The 841 curated cases expanded to ~1,200, with the 14K static pack reconciled in as a "extended catalog" appendix, delivered as CSV/XLSX/Gherkin/JSON + a 60–100pp field-manual PDF (coverage rationale, T-code index, test-data setup, traceability matrix) + versioned changelog.
- **Salesforce, Workday, ServiceNow, Veeva, Oracle Packs — $99 each**, released one per month post-launch, each anchored by a new 300–500-case curated core on the `sapTestCasesV2` schema. Veeva can carry **$149** from day one — GxP content scarcity commands a premium in life-sciences QA (the research flags this explicitly).

**Justification.** Value metric: a QA lead designing UAT coverage for an S/4HANA migration spends 1–2 weeks (~60 hours at a $75–150/hr loaded rate = $4,500–$9,000) producing what the pack delivers instantly; $149 is <3% of that. Benchmarks: above the Gumroad ebook $5–$25 gravity well and Udemy's $9.99 floor (deliberately — we are selling artifacts, not instruction), in line with Epic Web's low-hundreds workshops and SDET Unicorns' $79.99-lifetime ceiling for individuals, and 95% below the cheapest tool-bundled alternative. $149 also sits inside the "expenses without procurement" zone the buyer persona research identified ($200–$1,500 discretionary).

### Tier 2 — All-Access Bundle: **$499** one-time
Every current and future platform pack, all formats, 12 months of updates included (then Release Radar to continue). Anchored deliberately at Ministry of Testing Pro's $499.99/yr — the proven price for "serious QA professional pays for curated content" — but one-time, which makes it read as a bargain against MoT's recurring bill. Bundle-to-flagship ratio (3.3× the $149 pack) matches Epic Web's bundle economics.

### Tier 3 — Team License: **$1,495 (5 seats) / $3,995 (20 seats)**
All-Access for the whole team + internal-reuse rights (test cases may be imported into the org's ALM/Jira/qTest and reused across internal projects) + priority email support + license tokens per seat. The 20-seat tier adds **consultancy redistribution rights** (use on client engagements, no resale of raw files). Justification: standard 3–5× individual multiples; the research shows SIs pay $2,500–$5,000 for accelerators with reuse rights because they bill test-preparation at consulting rates — one avoided week of a $1,200/day consultant pays for the 20-seat license twice.

### Tier 4 — Release Radar: **$149/yr individual, $499/yr team** (recurring)
Quarterly update drops tracking SAP S/4HANA release cycles, Salesforce's three annual releases, Workday's biannual (R1/R2) releases: new/changed test cases, deprecation flags, changelog, "what to re-test this release" checklists. This is the Kainos insight — *maintenance through releases is literally what enterprises pay for* — and our defense against the LLM-generated-content floor: an AI can spit out plausible test cases; it cannot maintain a verified, release-aware library. First 12 months free with All-Access/Team; standalone for pack owners.

### Tier 5 — Services Anchor: **Custom Test Suite Sprint — $7,500**
A productized 2-week engagement: we take your SAP/Salesforce/Workday scope, deliver a tailored 500-case suite + automation skeletons. Expect to sell 2–6 per year; its real job is **price anchoring** — with $7,500 on the pricing page, $499 All-Access looks trivially cheap, and it converts the inevitable "can you customize this?" inquiries instead of losing them.

---

## 2. Merchant, Listing Structure, and Discount Discipline

**Launch on Polar.sh** (per the merchant research ranking): merchant of record at 5% + $0.50 (vs Gumroad's ~13% all-in), first-class license keys with public validate/activate endpoints that wire directly into the planned Supabase `activate-license` edge function, automatic key revocation on refund, and GitHub-native UX that matches QA-engineer buyers. Start on free Starter; move to Pro ($20/mo) once revenue passes ~$1,500/mo (Pro's ~1% fee saving covers itself at that point).

**Polar listing structure:**
- One product per platform pack ($99–$149), each with the license-key benefit enabled (activation limit 3 devices), a checksummed file-download benefit for the ZIP, and metadata `sku` matching the Supabase `licenses.product_sku` column.
- All-Access as its own product whose benefit grants every pack (Polar benefits model handles this cleanly).
- Team tiers as separate products at 5/20-seat prices; seats handled in our Supabase entitlement layer (Polar key + our `license_activations` table capped at seat count).
- Release Radar as a Polar subscription product — `subscription_*` webhooks flip the Supabase entitlement on lapse.

**Gumroad as secondary/discovery only:** list *one* product — the SAP flagship at the same $149 — for Discover marketplace reach and creator-economy social proof. Mirror every Ping webhook into Supabase immediately, never let balance accumulate (the research documents frozen balances and AI-moderation bans). Same price on both platforms; the storefront narrative lives at `/pricing` on testautomator.keyarite.com, never on the Gumroad page, to escape the $5–$25 Gumroad price gravity.

**Discount rules (protecting the premium position):**
- **Launch early-bird:** 30% off for the waitlist, 7 days only, via Polar discount codes ($149→$104, $499→$349). Countdown enforced; never repeated at that depth.
- **Standing policy after launch:** at most two promos/year (Black Friday, one release-cycle promo), max 25%, packs and All-Access only — **Team and Release Radar are never discounted** (that's where consultancies live; discounting there signals negotiability and invites procurement games).
- **PPP:** region-gated 40% codes (Polar checkout supports codes; verify country server-side at activation) for individual packs only, unlisted, granted on request via a `/pricing` footer link. This captures India/LatAm QA engineers — a huge share of the ERP-testing workforce — without visible price erosion.
- Never discount to $9.99–$25 territory for any reason; one appearance at Udemy prices permanently reprices the catalog in buyers' heads.

---

## 3. Funnel Design (specific to this app)

The funnel is: **851 SEO pages → free sample (email) → generator habit → pack purchase → All-Access/Team upsell → Release Radar retention.**

**Placements by route (from the architecture audit):**

- **Index (`/`, the generator):** freemium hook. Move quota enforcement into `generate-test-script` (flip `verify_jwt`, count server-side — this also stops the current anonymous LOVABLE_API_KEY burn). Anonymous: 2/day. Signed-in free: 5/day. Any pack owner: 25/day. All-Access: 100/day. In `handleGenerate` (Index.tsx:197), on quota exhaustion show the paywall modal with "Your generated scripts are drafts — the packs are verified" framing, so the generator sells the library rather than substituting for it.
- **Downloads (`/downloads`):** becomes the storefront. Replace the 15 hard-coded `/data/*` anchors with pack cards: free items download directly; premium items show price + "Buy on Polar" or, for entitled users, hit the new `sign-download-url` edge function. This page currently gives away the 150MB masters — the single most urgent change.
- **Platform repository pages (`PlatformRepository` + `csvCache`):** first 25 rows render free with full detail; rows 26+ show title/module/priority only, steps and expected results blurred, inline CTA "Unlock all 1,200 SAP cases — $149." Same gate in `TestCaseDetail` via `findFullCaseById`: free rows fully visible, premium rows show preview + unlock CTA.
- **Templates (`/templates`):** stays 100% free — it's the taste-proof front-of-store sampler (the 50 templates read like consultant work; they are the sales copy). Add a persistent banner: "These 50 charters are free. The 1,200-case repositories behind them start at $99."
- **KRHeader:** "Pricing" nav item + gold "Upgrade" CTA for signed-in non-owners; license badge for owners. AuthModal gains a "Have a license key?" activation tab.
- **New routes in App.tsx:** `/pricing` (ladder, anchor tier, guarantee, FAQ) and `/activate` (key redemption → `activate-license` edge function → entitlement JWT).
- **History (`/history`):** ZIP export (jszip) and PDF export (jspdf) become pack-owner features, with buyer email + order ID stamped in the PDF footer (the Payhip-stealing move from the merchant research).
- **851 static pages:** inject via the existing `scripts/*.py` page generator a standard header CTA ("Sample of the [Platform] Premium Pack — get all N cases") on every platform HTML page. These pages are the top-of-funnel moat; every one must link to money.

**Lead magnet:** "SAP S/4HANA UAT Starter Kit" — 100 of the 841 curated cases (CSV+XLSX+PDF) + the UAT-planning checklist, gated on email. Delivered via a Supabase `leads` table + edge function; promoted on `/`, `/downloads`, and all SAP static pages. This is the "free chapter" — its quality is the strongest possible proof for the $149 ask. Weekly email sequence (5 emails): starter kit → how the repository is organized → negative/edge-case philosophy → customer story → early-bird offer.

---

## 4. 90-Day Launch Plan

**Weeks 1–2 — Hygiene + hardening (blocks everything else).** Gate `generate-test-script` (JWT + server-side quota). Move premium masters out of the static bundle into a private Supabase Storage bucket; strip premium dirs from `viteStaticCopy` and premium patterns from workbox `runtimeCaching`; update robots.txt/sitemap. Fix trust-killers: reconcile CSV/TS row counts, rename `fsc_superpack_10000` (5,520 rows), dedupe Dynamics365, delete the `public/data` mirrors. Commit the unversioned profiles/generations DDL, then add `licenses`/`license_activations` migrations. Set up Polar org + webhook edge function.

**Weeks 3–4 — Flagship polish + waitlist.** Expand SAP curated set toward 1,200; write the field-manual PDF; package v1.0 with changelog + LICENSE.txt. Ship `/pricing`, `/activate`, the starter-kit lead magnet, and the email capture. Open waitlist ("SAP Enterprise Test Repository — launching at 30% off for the list"). Begin LinkedIn cadence: 3 posts/week, each one real test case or coverage insight from the pack (LinkedIn is *the* QA-creator channel per the research — Filip Hric/Automation Panda playbook).

**Weeks 5–6 — Seeding.** Release the starter kit publicly. Retitle/re-structure the top 60 SAP static pages for "SAP [module] test cases" queries (H1, meta, FAQ schema, CTA). Start showing up — not selling — in Ministry of Testing Club threads, r/QualityAssurance, and SQA Stack Exchange (answer ERP-testing questions substantively; both communities ban promotion, so the profile link and signature do the work). Send 10 review copies to QA leads/LinkedIn micro-influencers in exchange for honest feedback → testimonials.

**Week 7 — Launch.** SAP pack live on Polar at $149; waitlist gets the 7-day 30% early-bird. Daily launch-week LinkedIn content; email sequence fires.

**Week 8 — Product Hunt + Gumroad.** PH launch framed as the free tool ("AI test-script generator + free enterprise test-case library") with the pack as the monetization — PH rewards free utility. List the SAP pack on Gumroad Discover the same week.

**Weeks 9–10 — Second pack + MoT.** Launch Veeva pack at $149 (scarcity niche, fastest to premium) or Salesforce at $99 (bigger audience) — pick by list interest. Pitch a Ministry of Testing article/99-minute-workshop on "designing UAT coverage for ERP migrations" (contribution, not ads — 75k+ newsletter readers). Announce All-Access at $499 once two packs exist.

**Weeks 11–12 — Team tier + partnerships.** Publish Team licensing page. Direct outreach to 20 boutique SAP/Workday/Salesforce consultancies (the $2.5–5k accelerator buyers): offer the 20-seat license + a partner discount code for their clients. Approach 2–3 QA training providers (bootcamps teaching ERP testing) about bundling the individual pack into their courses at rev-share.

**Week 13 — Review + Release Radar.** First quarterly update drop (proves the living-updates promise); open Release Radar subscriptions; publish the v1.1 changelog publicly as marketing. Decide month-4 pack by SEO query data from the 851 pages.

---

## 5. Social Proof & Trust for a Premium Price

- **30-day no-questions refund** on packs and All-Access (MoR handles mechanics; Polar auto-revokes keys on refund). At $149 the guarantee removes the last objection and costs little — refund-rate telemetry is itself a quality metric.
- **The free sample IS the trust engine:** 100 real curated cases, not a watered-down teaser. The research is blunt that buyers sample five rows and judge — so the sample must be the same rows they'd buy.
- **Honest numbers everywhere.** "1,200 curated cases" beats "390,000 test cases" — inflated counts (the "10000" file with 5,520 rows) are exactly what destroys a $149 sale. Publish the counting methodology.
- **Versioned public changelogs** per pack (v1.0 → v1.1 with dated entries tied to SAP/Salesforce release names) — simultaneously a retention tool, a Release Radar advertisement, and proof of "living, maintained" against the free-SAP-scripts and LLM-generated floor.
- **Update policy honesty:** "12 months of updates included, then $149/yr" — the research notes buyers are burned on fake "lifetime" claims; a clear policy is a trust asset.
- **Case studies:** the 10 review-copy recipients (week 6) become 2–3 mini case studies ("cut UAT prep from 9 days to 2 on an S/4HANA rollout"). Testimonial ask is built into the post-purchase email at day 14, with a 20%-off-next-pack thank-you.
- **Author brand:** every pack carries a named author page, methodology essay, and LinkedIn presence — the "no author brand yet" gap is the biggest premium-price risk the market research flags, and only consistent public work closes it.

---

## 6. Revenue Model (12 months post-launch)

Assumptions: AOV blends packs/All-Access; SEO from the retitled static pages ramps from months 3–9; email list converts at 2–4% on launches (industry-normal for warm dev lists).

**Conservative** — SEO ramps slowly (1,000→4,000 visits/mo), 3% email capture, list reaches 900, site-wide paid conversion 0.4%, AOV $170, no team deals land:
~28,000 annual visits × 0.4% = 112 sales × $170 ≈ **$19,000**, plus ~15 Release Radar renewals (~$2,200) ≈ **$21,000**.

**Base** — SEO works (3,000→8,000 visits/mo, ~60,000/yr), 4% capture (list ~2,400), 0.6% conversion, AOV $195 (All-Access mix rises as packs accumulate): 360 sales ≈ $70,000; + 3 five-seat team licenses ($4,485) + 1 twenty-seat ($3,995) + 60 Release Radar subs ($8,900) + 1 services sprint ($7,500) ≈ **$95,000**.

**Stretch** — a consultancy channel opens and MoT/PH launches compound (100,000 visits, 0.8%, AOV $210): 800 sales ≈ $168,000; + 8 five-seat + 4 twenty-seat team deals ($27,940) + 150 Release Radar ($22,300) + 3 sprints ($22,500) ≈ **$240,000**.

Polar's 5% + $0.50 take means net revenue is ~94% of the above — versus ~87% on Gumroad, worth ~$6k/yr at base case alone.

**The 3 metrics that matter first:**
1. **Sample-to-paid conversion** (starter-kit downloads → pack purchases within 30 days). This is the single verdict on whether the content clears the premium bar; below ~2% means depth, not marketing, is the problem.
2. **Email capture rate on the 851 static pages** — measures whether the SEO moat actually feeds the funnel; it's the cheapest lever (page CTAs) with the largest downstream effect.
3. **Refund rate** (target <5%) — the early-warning system for the "skeleton pack sold at premium price" failure mode the content audit warns will generate refunds and reputation damage. If it spikes on any SKU, pull that SKU back to free until its curated core exists.

Team-deal count becomes the fourth metric from month 6 — one 20-seat license equals 27 individual sales, and the consultancy channel is where this business stops being a Gumroad-sized side project and starts pricing like the accelerator category it actually belongs to.