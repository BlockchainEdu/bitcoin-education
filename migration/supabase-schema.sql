-- ============================================================
-- BEN Website — Supabase Schema Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- 1. UNIVERSITIES TABLE
CREATE TABLE IF NOT EXISTS universities (
  id BIGSERIAL PRIMARY KEY,
  monday_id TEXT UNIQUE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  num_people INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
  id BIGSERIAL PRIMARY KEY,
  monday_id TEXT UNIQUE,
  name TEXT NOT NULL,
  title TEXT,
  university TEXT,
  image_url TEXT,
  linkedin TEXT,
  twitter TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for fast university lookups
CREATE INDEX IF NOT EXISTS idx_students_university ON students (university);

-- 3. EVENTS TABLE (Opportunities)
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  monday_id TEXT UNIQUE,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  url TEXT,
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. SCHOLARSHIPS / EVENT DEALS TABLE
CREATE TABLE IF NOT EXISTS scholarships (
  id BIGSERIAL PRIMARY KEY,
  monday_id TEXT UNIQUE,
  name TEXT NOT NULL,
  event_name TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY — Public read-only, no writes from anon
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can SELECT, nobody can INSERT/UPDATE/DELETE via anon key)
CREATE POLICY "Public read universities" ON universities FOR SELECT USING (true);
CREATE POLICY "Public read students" ON students FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read scholarships" ON scholarships FOR SELECT USING (true);

-- ============================================================
-- FUTURE TABLES (uncomment when ready)
-- ============================================================

-- Job Board
-- CREATE TABLE IF NOT EXISTS jobs (
--   id BIGSERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   company TEXT,
--   description TEXT,
--   url TEXT,
--   location TEXT,
--   salary_range TEXT,
--   posted_at TIMESTAMPTZ DEFAULT now(),
--   expires_at TIMESTAMPTZ
-- );
-- ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read jobs" ON jobs FOR SELECT USING (true);

-- Academy Courses
-- CREATE TABLE IF NOT EXISTS courses (
--   id BIGSERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   description TEXT,
--   instructor TEXT,
--   image_url TEXT,
--   is_published BOOLEAN DEFAULT false,
--   created_at TIMESTAMPTZ DEFAULT now()
-- );
-- ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read published courses" ON courses FOR SELECT USING (is_published = true);

-- Form Submissions (generic)
-- CREATE TABLE IF NOT EXISTS form_submissions (
--   id BIGSERIAL PRIMARY KEY,
--   form_type TEXT NOT NULL,
--   data JSONB NOT NULL,
--   submitted_at TIMESTAMPTZ DEFAULT now()
-- );
-- ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Anyone can submit" ON form_submissions FOR INSERT WITH CHECK (true);
-- (No SELECT policy = only admin/service_role can read submissions)
