-- ============================================================
-- BEN Membership Platform — Supabase Schema Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- 1. MEMBERS (links to Supabase Auth)
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  university TEXT,
  city TEXT,
  role TEXT DEFAULT 'free',
  is_paid BOOLEAN DEFAULT false,
  stripe_customer_id TEXT,
  paid_at TIMESTAMPTZ,
  telegram_joined BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON members FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON members FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role full access" ON members FOR ALL USING (auth.role() = 'service_role');
-- Allow insert for new signups (auth callback)
CREATE POLICY "Allow insert for authenticated" ON members FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. SAVED ITEMS
CREATE TABLE IF NOT EXISTS saved_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES members(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saves" ON saved_items FOR ALL USING (auth.uid() = user_id);

-- 3. JOBS
CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  company_url TEXT,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'USD',
  job_type TEXT DEFAULT 'full-time',
  tags TEXT[],
  apply_url TEXT,
  tier TEXT DEFAULT 'standard',
  stripe_subscription_id TEXT,
  posted_by UUID REFERENCES members(id),
  status TEXT DEFAULT 'pending',
  ai_score INTEGER,
  posted_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active jobs" ON jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Service role full access jobs" ON jobs FOR ALL USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- 4. CONFERENCES
CREATE TABLE IF NOT EXISTS conferences (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  url TEXT,
  ticket_url TEXT,
  image_url TEXT,
  city TEXT,
  country TEXT,
  venue TEXT,
  start_date DATE,
  end_date DATE,
  price_from INTEGER,
  size TEXT,
  topics TEXT[],
  tier TEXT DEFAULT 'free',
  ben_discount_code TEXT,
  ben_discount_percent INTEGER,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE conferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read conferences" ON conferences FOR SELECT USING (status = 'active');
CREATE POLICY "Service role full access conferences" ON conferences FOR ALL USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_conferences_date ON conferences(start_date);

-- 5. COURSES
CREATE TABLE IF NOT EXISTS courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  instructor TEXT,
  image_url TEXT,
  video_count INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  difficulty TEXT,
  topics TEXT[],
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published courses" ON courses FOR SELECT USING (is_published = true);

-- 6. LESSONS
CREATE TABLE IF NOT EXISTS lessons (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read preview lessons" ON lessons FOR SELECT USING (is_preview = true);
CREATE POLICY "Members read all lessons" ON lessons FOR SELECT USING (
  auth.uid() IN (SELECT id FROM members WHERE is_paid = true)
);

-- 7. APPLICATIONS (ventures + coliving)
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES members(id),
  type TEXT NOT NULL,
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
  preferred_location TEXT,
  preferred_dates TEXT,
  ai_score INTEGER,
  ai_summary TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can submit" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role full access applications" ON applications FOR ALL USING (auth.role() = 'service_role');

-- 8. PARTNERS
CREATE TABLE IF NOT EXISTS partners (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  url TEXT,
  referral_url TEXT,
  category TEXT,
  member_deal TEXT,
  commission_type TEXT,
  commission_value INTEGER,
  tier TEXT DEFAULT 'basic',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active partners" ON partners FOR SELECT USING (is_active = true);

-- 9. REFERRAL CLICKS
CREATE TABLE IF NOT EXISTS referral_clicks (
  id BIGSERIAL PRIMARY KEY,
  partner_id BIGINT REFERENCES partners(id),
  user_id UUID REFERENCES members(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE referral_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can click" ON referral_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role read clicks" ON referral_clicks FOR SELECT USING (auth.role() = 'service_role');

-- 10. COLIVINGS
CREATE TABLE IF NOT EXISTS colivings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  city TEXT,
  country TEXT,
  image_urls TEXT[],
  price_per_month INTEGER,
  amenities TEXT[],
  capacity INTEGER,
  spots_available INTEGER,
  is_ben_owned BOOLEAN DEFAULT false,
  partner_url TEXT,
  listing_fee INTEGER,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE colivings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read colivings" ON colivings FOR SELECT USING (status = 'active');

-- 11. BEN EVENTS
CREATE TABLE IF NOT EXISTS ben_events (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  city TEXT,
  country TEXT,
  venue TEXT,
  image_url TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  ticket_price INTEGER,
  ticket_price_public INTEGER,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  stripe_price_id TEXT,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE ben_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read events" ON ben_events FOR SELECT USING (true);

-- 12. EVENT TICKETS
CREATE TABLE IF NOT EXISTS event_tickets (
  id BIGSERIAL PRIMARY KEY,
  event_id BIGINT REFERENCES ben_events(id),
  user_id UUID REFERENCES members(id),
  stripe_session_id TEXT,
  amount INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE event_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own tickets" ON event_tickets FOR SELECT USING (auth.uid() = user_id);
