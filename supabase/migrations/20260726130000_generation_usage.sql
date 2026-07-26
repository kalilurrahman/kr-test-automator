-- Server-side AI-generation metering.
-- generate-test-script previously enforced no quota at all: the "20/day" limit
-- lived only in client display code, and anonymous callers could invoke the
-- function (and spend LOVABLE_API_KEY credits) without bound. This ledger is
-- written by the edge function with the service role on every accepted request;
-- limits are enforced by counting today's rows per user (or per hashed IP for
-- anonymous callers).

CREATE TABLE public.generation_usage (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,  -- NULL = anonymous
  ip_hash text,                       -- salted SHA-256 of client IP; never raw
  tier text NOT NULL DEFAULT 'anon',  -- anon | free | pro
  platform text,
  framework text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_generation_usage_user_day ON public.generation_usage (user_id, created_at);
CREATE INDEX idx_generation_usage_ip_day ON public.generation_usage (ip_hash, created_at)
  WHERE user_id IS NULL;

ALTER TABLE public.generation_usage ENABLE ROW LEVEL SECURITY;

-- Users may see their own usage (powers the quota meter in the UI).
-- No INSERT/UPDATE/DELETE policies: writes are service-role only.
CREATE POLICY "Users can view their own generation usage" ON public.generation_usage
  FOR SELECT USING (auth.uid() = user_id);
