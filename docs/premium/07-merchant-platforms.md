# 07 · Merchant Platform & License-Token Research Appendix (July 2026)

Context: solo creator, premium-priced content/tool product (851 static HTML pages + CSV test-case libraries + AI generator SPA), Supabase backend (auth, Postgres, edge functions) already available for server-side verification. `jszip` + `jspdf` already in deps for stamped downloads.

## 1. Gumroad (2026)

**Fees.** No monthly fee; flat **10% + $0.50** per direct sale, with card processing (~2.9% + $0.30) charged on top — effective **~12.9% + $0.80** per card sale. Sales via the Discover marketplace cost a flat **30%**. The pre-2023 volume sliding scale (down to 2.9%) is gone. Gumroad has been **full merchant of record since Jan 1, 2025** (calculates/collects/remits global sales tax, VAT, GST). Payouts: **weekly on Fridays**, $10 minimum, 7-day hold, via bank (Stripe) or PayPal.

**License Key API.** Per-product checkbox "Generate a unique license key per sale." Verification is a single unauthenticated endpoint:

- `POST https://api.gumroad.com/v2/licenses/verify` with params **`product_id`** (older integrations used `product_permalink`), **`license_key`**, and optional **`increment_uses_count`** (default `"true"` — set `false` for passive checks or every launch increments the counter).
- Response: **`success`** (bool), **`uses`** (int — the incrementing counter you cap in your own code), and a **`purchase`** object containing `id`, `email`, `product_name`, `created_at`, `sale_timestamp` (in full responses), `variants`, `custom_fields`, and the revocation-critical fields: **`refunded`**, **`chargebacked`**, **`subscription_cancelled_at`**, **`subscription_failed_at`** (plus `subscription_ended_at` on memberships). Invalid keys return 404. You must check these fields yourself — Gumroad keeps returning `success: true` for refunded purchases. Keys can be disabled manually per-sale in the dashboard; enable/disable API endpoints exist behind OAuth.

**Webhooks.** Account-level **Ping URL** (Settings → Advanced) fires on every sale; the OAuth API adds **resource subscriptions** for `sale`, `refund`, `dispute`, `dispute_won`, `cancellation`, `subscription_updated`, `subscription_ended`, `subscription_restarted`. Non-200 deliveries retry hourly for ~3 hours — make your Supabase webhook idempotent on `sale_id`.

**Subscriptions.** Memberships with recurring billing are supported, and license verify exposes the cancellation/failed-payment timestamps so you can gate lapsed subscribers.

**Risk.** Real. Gumroad rebranded under **Antiwork**, open-sourced the platform under MIT in **April 2025** (with a planned 1.5% self-host licensing fee and a Rails→TypeScript rewrite), and went through heavy organizational churn; it held a public annual meeting in Feb 2026, so it is alive, but community reports 2025–2026 document the **Iffy AI moderation tool permanently banning long-standing accounts**, single-chargeback shutdowns, and **balances frozen for weeks** — plus the Oct 2024 PayPal suspension (restored early 2025). Treat Gumroad as viable but never as the sole system of record: mirror every sale into Supabase via Ping immediately.

## 2. Lemon Squeezy (2026)

**Status.** Acquired by **Stripe (July 2024)**. As of 2026 it still runs as its own product with its own dashboard/API and has not shut down, but the roadmap has visibly slowed and the stated goal is migrating merchants to **Stripe Managed Payments** (Stripe's built-in MoR, ~5% + $0.50 positioning but effectively **3.5% on top of Stripe processing ≈ 6.4%+ all-in**, still gradually rolling out to ~35 countries, US-first). I found no confirmation that new-store signups are closed, but starting a *new* store on a platform in managed decline is strategically weak.

**Fees.** MoR; **5% + $0.50**, plus **+1.5% international cards, +1.5% PayPal, +0.5% subscription payments**, +1% international payouts, +5% abandoned-cart recoveries, +3% affiliate fee. Worst-case ~8.5% + $0.50.

**License API — the best-designed of the MoRs.** Three public endpoints authenticated by the key itself (no store API secret in the client): **`POST /v1/licenses/activate`** (creates an **instance** with a unique `instance_id` per activation), **`POST /v1/licenses/validate`**, **`POST /v1/licenses/deactivate`** (requires the `instance_id`). Per-key **`activation_limit`** with `activation_usage`, `status` (`inactive/active/expired/disabled`), `expires_at`. Rate limit 60 req/min. Webhook events include `order_created`, `order_refunded`, full `subscription_*` lifecycle, and `license_key_created`/`license_key_updated`, HMAC-signed.

## 3. Paddle

MoR at **5% + $0.50**, no monthly fee; tax/compliance across 200+ countries. But: **Paddle Classic (which had built-in licensing) is legacy and being sunset; Paddle Billing has no native license-key feature** — Paddle itself points customers at Keygen or custom solutions. Onboarding is the strictest of the group: domain review, AUP checks, multi-week approvals, and frequent rejections of small/new sellers without processing history. Ebooks/courses are allowed but scrutinized. Verdict: built for scaling SaaS; poor effort/reward for a solo premium-content business.

## 4. Polar.sh

**MoR** (handles sales tax/VAT/GST in 60+ countries), open-source platform, developer-native. **2026 pricing became tiered**: free Starter at **5% + $0.50**; paid plans (Pro $20/mo, Growth $100/mo, Scale $400/mo) restore ~4%-class economics — at premium price points the Pro plan pays for itself quickly.

**License keys are a first-class "benefit"**: auto-generated `PREFIX_<UUID4>` keys on purchase, configurable expiration, activation (device) limits, and usage limits. API: **`POST /v1/customer-portal/license-keys/validate`** and **`/activate`** are deliberately public (safe to call from clients — no org token needed); server-side you use the authenticated `/v1/license-keys/*` endpoints. Activation returns a unique activation ID to store per device; `conditions`/`meta` let you bind fingerprints. Crucially, **benefits are revoked automatically on refund**, killing the key without custom webhook logic (webhooks for orders/subscriptions/benefit grants exist anyway). GitHub-native flows (GitHub login, private-repo access grants, Discord invites, checksummed file downloads) fit a developer audience like QA engineers. Risk: youngest company in the list — abstract it behind your own Supabase layer.

## 5. Briefly: the rest

- **Stripe direct**: 2.9% + $0.30, but *you* are merchant of record — global tax registration/remittance burden is yours (Stripe Tax computes but doesn't file). No native licensing. Stripe Managed Payments fixes tax but is invite-gated, US-centric and ~6.4% effective, still maturing mid-2026.
- **Whop**: **3% platform fee** + processing (~$6.20 on $100); has native license keys with API validation (`api.whop.com/api/v1`) and JS/Python/Ruby SDKs; marketplace skews toward trading/community products, not a full MoR posture — off-brand for enterprise QA buyers.
- **Payhip**: 5% + processing (or $29/mo for 0%); built-in **PDF stamping** and software license keys; but only EU/UK VAT handled — **not a full MoR**, rest-of-world tax is on you.
- **FastSpring**: full MoR, ~**8.5%**/custom pricing, sales-led onboarding; capable (incl. license fulfillment hooks) but expensive and heavyweight for a solo creator.
- **Keygen.sh**: dedicated licensing API, now **Fair Source** (Fair Core License → Apache 2.0 via DOSP); **Keygen CE is free to self-host** (same codebase as Cloud); Cloud has a free Dev tier then **$49–$399/mo**. Ed25519-signed keys and offline license files, machine activation, entitlements. With Supabase already available, self-hosting Keygen is overkill — but copy its architecture.

## Comparison table

| Platform | Fees (2026) | MoR | License API | Subscriptions | Risk |
|---|---|---|---|---|---|
| **Gumroad** | 10% + $0.50 + ~2.9% + $0.30 processing (~13% all-in); 30% Discover | **Yes** (since Jan 2025) | Verify-only (`/v2/licenses/verify`, `uses` counter, refund/chargeback/sub fields); no activate/deactivate | Yes (memberships) | **Med-High**: AI-moderation bans, frozen balances, Antiwork churn; MIT open-sourced 2025 |
| **Lemon Squeezy** | 5% + $0.50 (+1.5% intl, +1.5% PayPal, +0.5% subs) | **Yes** | **Best**: activate/validate/deactivate, instances, activation limits, key-as-credential | Yes, full lifecycle webhooks | **Medium**: Stripe-owned, stagnating, migration to Managed Payments looming |
| **Paddle** (Billing) | 5% + $0.50 | **Yes** | **None native** (Classic licensing sunset; pair w/ Keygen) | Yes (strong) | **Medium**: strict onboarding, small sellers rejected |
| **Polar.sh** | 5% + $0.50 free tier; ~4% on paid plans ($20+/mo) | **Yes** | **Strong**: license-key benefit, public validate/activate, device caps, auto-revoke on refund | Yes | **Medium**: youngest vendor; open-source mitigates lock-in |
| Stripe direct | 2.9% + $0.30 | **No** (tax burden yours) | None (build on Keygen/Supabase) | Yes (best-in-class) | Low platform risk, high compliance burden |
| Whop | 3% + processing | No | Yes, native keys + API | Yes | Marketplace brand mismatch |
| Payhip | 5% + processing or $29/mo | Partial (EU/UK VAT only) | Basic keys + **built-in PDF stamping** | Yes | Tax gap outside EU/UK |
| FastSpring | ~8.5% / custom | **Yes** | Fulfillment-level | Yes | Cost + sales-led onboarding |
| Keygen (infra) | Free CE self-host; Cloud $49–$399/mo | n/a (not payments) | **Deepest** (Ed25519, offline, entitlements) | n/a | Low; Fair Source |

## Recommendation ranking for TestForge AI

1. **Polar.sh (primary)** — MoR at half of Gumroad's take, native license keys with public validate/activate endpoints that drop cleanly into the existing SPA + Supabase edge functions, automatic key revocation on refund, and GitHub/dev-native UX matching a QA-engineer audience. Start on free Starter; move to Pro ($20/mo) once revenue justifies the lower rate.
2. **Gumroad (secondary/discovery channel)** — worth listing flagship bundles for Discover reach and creator-economy social proof; the verify API + Ping webhooks are sufficient because Supabase does the real entitlement work. Never let balances accumulate; mirror sales to Postgres instantly.
3. **Lemon Squeezy** — technically the nicest license API, but don't build a *new* store on a product whose owner is steering merchants elsewhere; reconsider once Stripe Managed Payments + a licensing story fully ship.
4. **Paddle** — only if the product pivots to pure SaaS at meaningful volume.
5. **Payhip** — budget fallback; its native PDF stamping is the one feature worth stealing.
6. Whop / FastSpring / Stripe-direct — poor fit (brand, cost, or tax burden respectively).

## License-token architecture (platform-agnostic, Supabase-centered)

1. **Source of truth in Postgres**: webhook (Polar `order.created`/benefit grant, or Gumroad Ping/resource subscription) upserts a `licenses` row: `key_hash`, `product_sku`, `buyer_email`, `status`, `activation_limit`, `platform`, `platform_sale_id` (idempotency key).
2. **Activation flow**: user pastes key in the SPA → edge function `activate-license` calls the platform verify endpoint (Gumroad: `increment_uses_count=true` only on first activation, `false` thereafter; Polar/LS: activate → store returned instance/activation ID), checks `refunded`/`chargebacked`/`subscription_cancelled_at`, records a `license_activations` row (device fingerprint hash, cap 3–5), then issues a **short-lived JWT entitlement** (EdDSA/ES256, 30–60 min TTL; claims: license id, SKU entitlements, `exp`). The SPA gates premium routes/downloads on this JWT; refresh re-verifies server-side, so **revocation propagates within one TTL** without a denylist. Never ship platform secrets to the client; never trust client-only checks.
3. **Revocation**: `refund`/`dispute`/`cancellation` webhooks flip `status='revoked'`; verify calls and JWT refresh both consult status. Gumroad requires you to enforce `refunded`/`chargebacked` yourself; Polar revokes the key for you — do both.
4. **Offline/portable licenses** (for downloadable bundles): issue an **Ed25519-signed license file** (payload: key, entitlements, expiry, optional machine fingerprint, grace period) verified locally against an embedded public key — Ed25519 over RSA: 64-byte signatures, 32-byte keys, ~8× faster verification, no foot-gun parameters.
5. **Anti-sharing for content**: generate downloads *per license* at request time — stamp every PDF footer with buyer email + order ID + license key (`jspdf`/pdf-lib in an edge function), inject a signed `LICENSE.txt` + stamped HTML footers into ZIP bundles (`jszip`), serve via **expiring signed Supabase Storage URLs** with download-count limits, and monitor Gumroad's `uses` counter / activation velocity for anomalies. Watermarking is traceability, not prevention — pair it with license terms and the JWT-gated online experience so the stamped files are the *less* valuable copy.

## Sources

- https://www.swell.is/content/gumroad-pricing
- https://checkoutpage.com/blog/gumroad-fees
- https://dodopayments.com/blogs/gumroad-fees-explained
- https://gumroad.com/help/article/76-license-keys.html
- https://sevic.dev/notes/license-key-verification-gumroad-api/
- https://github.com/abhiyerra/gumroad/blob/master/license_verification.go
- https://tedium.co/2025/04/06/gumroad-open-source-doge-drama/
- https://x.com/shl/status/1917257166349648135
- https://insightraider.com/en/answers/when-does-gumroad-pay-out
- https://rollout.com/integration-guides/gumroad/quick-guide-to-implementing-webhooks-in-gumroad
- https://alexplescan.com/posts/2022/12/22/selling-saas-subscriptions-on-gumroad/
- https://www.lemonsqueezy.com/blog/stripe-acquires-lemon-squeezy
- https://www.lemonsqueezy.com/blog/2026-update
- https://docs.lemonsqueezy.com/api/license-api
- https://docs.lemonsqueezy.com/guides/tutorials/license-keys
- https://www.swell.is/content/lemon-squeezy-pricing
- https://makerstack.co/reviews/lemonsqueezy-review/
- https://dodopayments.com/blogs/paddle-fees-explained
- https://fungies.io/paddle-review-2026/
- https://dev.to/pavelbuild/paddle-rejected-my-saas-3-times-heres-what-they-check-that-isnt-in-their-docs-5dnn
- https://dodopayments.com/blogs/polar-sh-review
- https://polar.sh/docs/api-reference/customer-portal/license-keys/activate
- https://docs.polar.sh/api-reference/customer-portal/license-keys/validate
- https://polar.apidocumentation.com/documentation/features/benefits/license-keys
- https://dodopayments.com/blogs/stripe-managed-payments-fees-explained
- https://freemius.com/blog/stripe-merchant-of-record/
- https://stripe.com/managed-payments
- https://comparetiers.com/compare/payhip-vs-whop
- https://fungies.io/best-payment-processors-digital-products-2026/
- https://docs.whop.com/
- https://dev.to/jordan_sterchele/whop-app-vs-saas-vs-license-keys-which-integration-should-you-build-25ea
- https://keygen.sh/pricing/
- https://keygen.sh/blog/keygen-is-now-fair-source/
- https://keygen.sh/docs/choosing-a-licensing-model/offline-licenses/
- https://keygen.sh/docs/api/cryptography/
- https://keyforge.dev/blog/offline-license-validation
- https://www.sendowl.com/blog/tips-and-advice/what-is-pdf-stamping
- https://www.locklizard.com/document-security-blog/ebook-social-watermarking/
- https://www.trustradius.com/products/keygen/pricing