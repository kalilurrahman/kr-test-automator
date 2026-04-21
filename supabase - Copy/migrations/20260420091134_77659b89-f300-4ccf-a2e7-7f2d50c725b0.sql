-- Feedback submissions
CREATE TABLE public.feedback_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit feedback"
ON public.feedback_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public select — only service role (backend dashboard) reads
-- (No SELECT policy = no rows visible to anon/authenticated)

CREATE INDEX idx_feedback_submissions_created_at
  ON public.feedback_submissions (created_at DESC);