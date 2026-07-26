# 06 · Implementation Guide — Licensing Scaffolding Shipped in This Branch

This guide documents the working licensing/entitlement layer added on branch
`claude/test-automator-premium-monetization-8rmz0i`, and the exact steps to take it live.

## What was shipped

| Piece | Path | Purpose |
| --- | --- | --- |
| DB migration | `supabase/migrations/20260726120000_premium_licensing.sql` | `license_products`, `licenses`, `license_activations`, `entitlements`, `license_events` + RLS |
| Verify function | `supabase/functions/verify-license/index.ts` | Activates a key: Gumroad `/v2/licenses/verify` → cap check → entitlement grant |
| Webhook function | `supabase/functions/licensing-webhook/index.ts` | Gumroad Ping + resource subscriptions: provision on sale, revoke on refund/dispute |
| Function config | `supabase/config.toml` | `verify-license` requires JWT; webhook uses shared-secret query param |
| Client lib | `src/lib/licensing.ts` | Entitlement vocabulary, `activateLicense()`, `fetchEntitlements()`, friendly error map |
| Hook | `src/hooks/useEntitlements.ts` | React Query read of active entitlements; `hasEntitlement` / `hasPack`; All-Access superset logic |
| Gate component | `src/components/premium/PremiumGate.tsx` | Blur-and-lock overlay with pricing/activate CTAs |
| Pricing page | `src/pages/Pricing.tsx` (`/pricing`) | SKU ladder, guarantees, FAQ; checkout links point at Gumroad |
| Activate page | `src/pages/Activate.tsx` (`/activate`) | Sign-in-gated key activation flow |
| Nav | `src/components/KRHeader.tsx`, `src/App.tsx` | “Premium” link (desktop + mobile) and the two new routes |

Design principle: **the entitlement database is ours, the merchant is a plugin.**
Gumroad is adapter #1 inside `verify-license`; adding Lemon Squeezy or Polar later
means adding one `verifyWith…` function and new `license_products` rows — nothing
else changes, and no customer loses access if the merchant changes.

## Go-live checklist

1. **Apply the migration** (Lovable applies `supabase/migrations` on deploy, or run
   `supabase db push` locally).
2. **Create Gumroad products** (one per SKU) with *“Generate a unique license key
   per sale”* enabled. Note each product's `product_id` (shown in the product's
   Advanced settings / API section).
3. **Seed the catalog** (SQL editor, service role):
   ```sql
   INSERT INTO public.license_products (sku, name, merchant_product_id, entitlements, max_activations, seats) VALUES
   ('pack-sap',        'SAP Premium Pack',        '<gumroad_product_id>', ARRAY['pack:sap'], 3, 1),
   ('pack-salesforce', 'Salesforce Premium Pack', '<gumroad_product_id>', ARRAY['pack:salesforce'], 3, 1),
   ('pack-workday',    'Workday Premium Pack',    '<gumroad_product_id>', ARRAY['pack:workday'], 3, 1),
   ('all-access',      'All-Access Library',      '<gumroad_product_id>', ARRAY['all-access','generator:pro','vault:e2e'], 3, 1),
   ('team-5',          'Team License (5 seats)',  '<gumroad_product_id>', ARRAY['all-access','generator:pro','vault:e2e'], 3, 5);
   ```
4. **Set function secrets** (Supabase dashboard → Edge Functions → Secrets):
   - `LICENSING_WEBHOOK_SECRET` — long random string.
   - (`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.)
5. **Point Gumroad at the webhook**: Settings → Advanced → Ping URL =
   `https://<project>.supabase.co/functions/v1/licensing-webhook?secret=<secret>`.
   Then register resource subscriptions for `refund`, `dispute`, `dispute_won`,
   `cancellation` via `PUT /v2/resource_subscriptions` with the same URL
   (append `&resource=<name>` per subscription so the function can branch without
   trusting payload contents alone).
6. **Update checkout links**: `CHECKOUT_BASE` + slugs in `src/pages/Pricing.tsx`,
   and the SKU list in `src/pages/Activate.tsx`, to match the real Gumroad store.
7. **Regenerate DB types** so the temporary structural cast in
   `src/lib/licensing.ts` can be dropped:
   `supabase gen types typescript --project-id iuempyunrdkiroonwmmb > src/integrations/supabase/types.ts`.
8. **Move premium payloads out of `public/`** — see the licensing architecture doc
   (§ content protection). A static file under `public/data/` is downloadable by
   anyone regardless of UI gates. Premium artifacts belong in a **private Supabase
   Storage bucket**, delivered via short-lived signed URLs issued by an
   entitlement-checking edge function.
9. **Meter the AI generator server-side.** `generate-test-script` currently has
   `verify_jwt = false` and no usage enforcement — the 20/day limit in
   `src/hooks/useDailyUsage.ts` is client-side only. Before advertising
   `generator:pro` as a paid benefit, enforce per-user daily quotas inside the
   edge function (count `generations` rows for `auth.uid()`; free = 20/day,
   `generator:pro` = e.g. 200/day) and set `verify_jwt = true`.

## Using the gate in content pages

```tsx
import PremiumGate from "@/components/premium/PremiumGate";
import { ENTITLEMENTS } from "@/lib/licensing";

<PremiumGate entitlement={ENTITLEMENTS.pack("sap")} label="SAP Premium Pack">
  <FullTestCaseDetail … />
</PremiumGate>
```

Remember: `PremiumGate` is presentation. Enforcement = RLS + signed URLs +
edge functions. Anything shipped inside the public bundle is free forever.

## Manual test plan (staging)

1. Buy with Gumroad's test card on a test product → receipt contains a key.
2. `/activate` while signed out → sign-in prompt; after sign-in, activation succeeds,
   `/downloads` premium sections unlock, `entitlements` row visible in table editor.
3. Activate the same key from a second account → `key_bound_to_another_account`.
4. Exceed `max_activations` fingerprints → `activation_limit_reached`, event logged.
5. Refund the test sale in Gumroad → webhook fires → `licenses.status='refunded'`,
   entitlement `revoked_at` set; the app locks again on next load.
6. Kill the Gumroad URL temporarily (bad DNS in a test double) → previously-active
   key still passes via the grace path; `verify_merchant_down_grace` event logged.
