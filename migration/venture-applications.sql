-- BEN Ventures application table
-- Run this in Supabase SQL Editor

CREATE TABLE venture_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Step 1: Founders
  founder_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT,
  university TEXT,
  role TEXT,

  -- Step 2: Team
  team_size TEXT,
  team_breakdown TEXT,
  how_met TEXT,
  worked_together TEXT,
  who_codes_who_sells TEXT,

  -- Step 3: Idea
  one_liner TEXT NOT NULL,
  problem TEXT NOT NULL,
  insight TEXT,
  how_it_works TEXT,

  -- Step 4: Progress
  stage TEXT,
  most_impressive TEXT,
  users_count TEXT,
  project_url TEXT,
  demo_url TEXT,

  -- Step 5: Market & Vision
  revenue_model TEXT,
  competitors TEXT,
  twelve_month_plan TEXT,
  unfair_advantage TEXT,

  -- Step 6: The Ask
  raising_amount TEXT,
  use_of_funds TEXT,
  raised_before TEXT,
  why_ben TEXT,

  -- Step 7: Conviction
  ten_year_question TEXT,
  contrarian_belief TEXT,
  anything_else TEXT,
  referral_source TEXT,

  -- Internal review fields
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'accepted', 'rejected')),
  reviewer_notes TEXT
);

-- RLS: Only service role can insert/read (API route uses service key)
ALTER TABLE venture_applications ENABLE ROW LEVEL SECURITY;

-- No public access — all reads/writes go through the API route with service role key
-- Admin reads via Supabase dashboard or a future admin page

CREATE INDEX idx_venture_applications_status ON venture_applications (status);
CREATE INDEX idx_venture_applications_created ON venture_applications (created_at DESC);
