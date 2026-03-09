ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS default_platform text,
  ADD COLUMN IF NOT EXISTS default_framework text DEFAULT 'playwright_ts',
  ADD COLUMN IF NOT EXISTS default_test_count integer DEFAULT 10;