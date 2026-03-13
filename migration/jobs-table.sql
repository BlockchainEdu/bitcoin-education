-- Jobs board table for BEN
-- This table already exists in Supabase (project wcfimahdcjrldadzzubk)
-- Keeping this file for reference / re-creation if needed

create table if not exists jobs (
  id serial primary key,
  company_name text not null,
  company_logo text,
  company_url text,
  title text not null,
  description text,
  location text,
  salary_min integer,
  salary_max integer,
  salary_currency text default 'USD',
  job_type text default 'full-time',        -- full-time, part-time, contract, internship, freelance
  tags text[],
  apply_url text,
  tier text default 'standard',             -- standard ($299/mo) or featured ($499/mo)
  stripe_subscription_id text,
  posted_by uuid,                           -- references auth.users(id)
  status text default 'pending' not null,   -- pending, active, expired
  ai_score integer,
  posted_at timestamptz default now(),
  expires_at timestamptz
);

-- Indexes
create index if not exists idx_jobs_status on jobs (status);
create index if not exists idx_jobs_tier on jobs (tier);
create index if not exists idx_jobs_posted_at on jobs (posted_at desc);
create index if not exists idx_jobs_posted_by on jobs (posted_by);

-- RLS
alter table jobs enable row level security;

create policy "Active jobs are viewable by everyone"
  on jobs for select
  using (status = 'active');

create policy "Service role can manage all jobs"
  on jobs for all
  using (true)
  with check (true);

-- Auto-expire: run daily via Supabase cron or edge function
-- update jobs set status = 'expired' where status = 'active' and expires_at < now();
