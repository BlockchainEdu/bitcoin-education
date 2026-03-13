-- Applications table for co-living and ventures
-- Run against Supabase SQL editor if table doesn't exist yet

CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  type TEXT NOT NULL,                    -- 'coliving' or 'ventures'
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  telegram TEXT,
  university TEXT,
  country TEXT,
  startup_name TEXT,
  one_liner TEXT,
  stage TEXT,
  pitch_url TEXT,
  linkedin TEXT,
  github TEXT,
  what_building TEXT,
  funding_ask TEXT,
  equity_offer TEXT,
  preferred_location TEXT,               -- 'Ibiza' or 'Ericeira'
  preferred_dates TEXT,
  ai_score INTEGER,
  ai_summary TEXT,
  status TEXT DEFAULT 'pending',         -- pending, accepted, rejected, waitlisted
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application (no auth required)
CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  WITH CHECK (true);

-- Only service role can read/update (admin dashboard)
CREATE POLICY "Service role full access"
  ON applications FOR ALL
  USING (auth.role() = 'service_role');
