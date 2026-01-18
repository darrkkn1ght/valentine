-- Fix function search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- The INSERT policy with true is intentional for this use case
-- as customers need to place orders without authentication.
-- We'll validate and sanitize input in the edge function.