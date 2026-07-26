-- Email capture for the free SAP Starter Kit lead magnet.
--
-- The sampler files are public (they are the marketing), so this table exists
-- to build the list, not to gate the download: asking for an email and then
-- letting the file 404 for someone who mistypes it would cost more trust than
-- the address is worth.

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL DEFAULT 'sap-starter-kit',  -- which magnet/page captured it
  referrer text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, source)
);

CREATE INDEX idx_leads_created ON public.leads (created_at DESC);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors must be able to subscribe, so INSERT is open — but
-- validated, and readable by nobody: the list is not a public endpoint to
-- enumerate. Exports happen with the service role.
CREATE POLICY "Anyone can submit a validated lead" ON public.leads
  FOR INSERT
  WITH CHECK (
    email ~* '^[A-Za-z0-9._%%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 254
    AND length(source) <= 64
    AND (user_id IS NULL OR user_id = auth.uid())
  );

-- Signed-in users may see their own row (so the UI can say "you're on the list").
CREATE POLICY "Users can view their own lead row" ON public.leads
  FOR SELECT USING (auth.uid() = user_id);
