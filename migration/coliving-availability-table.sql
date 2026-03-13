-- Coliving availability table
-- Synced from Airbnb API every 2 hours
-- Run in Supabase SQL editor

CREATE TABLE IF NOT EXISTS coliving_availability (
  id BIGSERIAL PRIMARY KEY,
  property TEXT NOT NULL,                   -- 'casa-datcha'
  date DATE NOT NULL,                       -- YYYY-MM-DD
  available BOOLEAN NOT NULL DEFAULT true,
  min_nights INTEGER DEFAULT 3,
  source TEXT DEFAULT 'airbnb-api',         -- 'airbnb-api', 'ben-booking-pending', 'ben-booking-confirmed'
  synced_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(property, date)
);

-- Public read for calendar display
ALTER TABLE coliving_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read availability"
  ON coliving_availability FOR SELECT
  USING (true);

-- Only service role can write (cron sync + checkout)
CREATE POLICY "Service role write availability"
  ON coliving_availability FOR ALL
  USING (auth.role() = 'service_role');

-- Index for fast month queries
CREATE INDEX IF NOT EXISTS idx_coliving_availability_property_date
  ON coliving_availability (property, date);

-- Coliving bookings (for tracking after Stripe payment)
CREATE TABLE IF NOT EXISTS coliving_bookings (
  id BIGSERIAL PRIMARY KEY,
  property TEXT NOT NULL,
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  nights INTEGER NOT NULL,
  guests INTEGER,
  guest_name TEXT,
  guest_email TEXT NOT NULL,
  total_usd INTEGER NOT NULL,              -- total in cents (USD)
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  status TEXT DEFAULT 'pending',            -- pending, confirmed, cancelled, refunded
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE coliving_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role bookings"
  ON coliving_bookings FOR ALL
  USING (auth.role() = 'service_role');
