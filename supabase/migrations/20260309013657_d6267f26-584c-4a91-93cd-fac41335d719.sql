-- Add share_id column for public sharing
ALTER TABLE public.generations ADD COLUMN IF NOT EXISTS share_id text UNIQUE;

-- Allow public read access to shared scripts
CREATE POLICY "Anyone can view shared scripts"
ON public.generations
FOR SELECT
TO anon, authenticated
USING (share_id IS NOT NULL AND share_id != '');