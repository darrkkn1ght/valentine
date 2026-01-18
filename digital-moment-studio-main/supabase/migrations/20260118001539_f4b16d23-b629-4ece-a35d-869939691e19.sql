-- Orders table for tracking all orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  referral_code TEXT,
  source TEXT NOT NULL DEFAULT 'direct',
  status TEXT NOT NULL DEFAULT 'pending',
  payment_confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Public can insert orders (no auth required for customers)
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- Only admins can view/update orders (we'll handle admin check via edge function)
-- For now, no SELECT policy means no direct access from client

-- Referral codes table for tracking marketers
CREATE TABLE public.referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  marketer_name TEXT NOT NULL,
  marketer_whatsapp TEXT NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL DEFAULT 20.00,
  is_active BOOLEAN NOT NULL DEFAULT true,
  total_orders INTEGER NOT NULL DEFAULT 0,
  total_commission INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Anyone can check if a referral code is valid
CREATE POLICY "Anyone can read active referral codes"
  ON public.referral_codes FOR SELECT
  USING (is_active = true);

-- Trigger to update updated_at on orders
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();