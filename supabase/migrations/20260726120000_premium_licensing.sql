-- Premium licensing & entitlements layer
-- Merchant-agnostic: works with Gumroad today, Lemon Squeezy / Polar later.
-- All writes go through service-role edge functions; clients only read their own rows.

-- Sellable SKUs and the entitlement keys they grant.
CREATE TABLE public.license_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text NOT NULL UNIQUE,                    -- e.g. 'pack-sap', 'all-access', 'team-5'
  name text NOT NULL,
  merchant text NOT NULL DEFAULT 'gumroad',
  merchant_product_id text NOT NULL,           -- Gumroad product_id used by /v2/licenses/verify
  entitlements text[] NOT NULL,                -- e.g. {'pack:sap','generator:pro'}
  max_activations integer NOT NULL DEFAULT 3,  -- devices per seat
  seats integer NOT NULL DEFAULT 1,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- One row per sold license key. The raw key is never stored, only a SHA-256 hash.
CREATE TABLE public.licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key_hash text NOT NULL UNIQUE,
  key_hint text NOT NULL DEFAULT '',           -- last 4 chars, for support conversations
  product_id uuid NOT NULL REFERENCES public.license_products(id),
  merchant text NOT NULL DEFAULT 'gumroad',
  merchant_order_id text,                      -- Gumroad sale_id
  purchaser_email text,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('provisioned','active','refunded','chargeback','revoked','expired')),
  seats integer NOT NULL DEFAULT 1,
  user_id uuid REFERENCES auth.users(id),      -- bound on first activation
  activated_at timestamptz,
  expires_at timestamptz,                      -- NULL = lifetime
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Device/browser activations, capped at license_products.max_activations * licenses.seats.
CREATE TABLE public.license_activations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id uuid NOT NULL REFERENCES public.licenses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_fingerprint text NOT NULL DEFAULT 'unknown',
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (license_id, user_id, device_fingerprint)
);

-- The source of truth the app reads: what a signed-in user is allowed to access.
CREATE TABLE public.entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entitlement text NOT NULL,                   -- 'pack:sap', 'all-access', 'generator:pro', ...
  license_id uuid REFERENCES public.licenses(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  revoked_at timestamptz,
  UNIQUE (user_id, entitlement, license_id)
);

-- Append-only audit trail for support, fraud review, and refund disputes.
CREATE TABLE public.license_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  license_id uuid REFERENCES public.licenses(id) ON DELETE SET NULL,
  user_id uuid,
  event text NOT NULL,                         -- verify_attempt, activated, cap_exceeded, refund_webhook, revoked, ...
  detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_entitlements_user ON public.entitlements(user_id) WHERE revoked_at IS NULL;
CREATE INDEX idx_licenses_user ON public.licenses(user_id);
CREATE INDEX idx_license_events_license ON public.license_events(license_id);

ALTER TABLE public.license_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_events ENABLE ROW LEVEL SECURITY;

-- Catalog is public: the pricing page renders from it.
CREATE POLICY "Anyone can view active products" ON public.license_products
  FOR SELECT USING (active = true);

-- Users see only their own licenses/activations/entitlements. No client-side
-- INSERT/UPDATE/DELETE policies exist on purpose: every mutation flows through
-- service-role edge functions (verify-license, licensing-webhook).
CREATE POLICY "Users can view their own licenses" ON public.licenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own activations" ON public.license_activations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own entitlements" ON public.entitlements
  FOR SELECT USING (auth.uid() = user_id);

-- license_events: service-role only (no policies).
