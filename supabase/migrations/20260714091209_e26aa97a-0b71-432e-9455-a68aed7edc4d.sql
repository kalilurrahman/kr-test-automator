
-- 1. Lock down SECURITY DEFINER function: only trigger context should run it
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- 2. Replace overly-permissive INSERT policy on feedback_submissions with validated one
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback_submissions;

CREATE POLICY "Anyone can submit validated feedback"
ON public.feedback_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(btrim(email)) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(message)) BETWEEN 10 AND 2000
  AND (user_id IS NULL OR user_id = auth.uid())
);

-- 3. Add SELECT policy so authenticated submitters can read their own feedback
CREATE POLICY "Users can view their own feedback"
ON public.feedback_submissions
FOR SELECT
TO authenticated
USING (user_id IS NOT NULL AND user_id = auth.uid());
