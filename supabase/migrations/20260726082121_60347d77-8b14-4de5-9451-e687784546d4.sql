
-- 1) feedback_submissions: require authenticated user, tie to their id
DROP POLICY IF EXISTS "Anyone can submit validated feedback" ON public.feedback_submissions;

CREATE POLICY "Authenticated users can submit validated feedback"
ON public.feedback_submissions
FOR INSERT
TO authenticated
WITH CHECK (
  user_id IS NOT NULL
  AND user_id = auth.uid()
  AND char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(btrim(email)) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(message)) BETWEEN 10 AND 2000
);

-- 2) generations: force unguessable share_id + block short/empty IDs from public read
CREATE OR REPLACE FUNCTION public.generate_secure_share_id()
RETURNS text
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, extensions
AS $$
DECLARE
  raw bytea;
BEGIN
  raw := extensions.gen_random_bytes(24);
  -- base64url-ish: strip padding and URL-unsafe chars
  RETURN translate(encode(raw, 'base64'), '+/=', '-_');
END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_secure_share_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.share_id IS NOT NULL THEN
    -- Always regenerate server-side to guarantee entropy; ignore client-supplied values
    NEW.share_id := public.generate_secure_share_id();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS generations_secure_share_id ON public.generations;
CREATE TRIGGER generations_secure_share_id
BEFORE INSERT OR UPDATE OF share_id ON public.generations
FOR EACH ROW EXECUTE FUNCTION public.enforce_secure_share_id();

-- Tighten public read policy to require a sufficiently long share_id
DROP POLICY IF EXISTS "Anyone can view shared scripts" ON public.generations;
CREATE POLICY "Anyone can view shared scripts"
ON public.generations
FOR SELECT
TO anon, authenticated
USING (share_id IS NOT NULL AND char_length(share_id) >= 24);
