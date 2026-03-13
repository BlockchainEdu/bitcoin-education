-- ═══════════════════════════════════════════════════════════
-- Job Alerts Table
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════

create table if not exists job_alerts (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  filters jsonb not null default '{}',
  label text not null,
  frequency text not null default 'daily' check (frequency in ('daily', 'weekly')),
  last_sent_at timestamptz,
  last_matched_job_id integer,
  created_at timestamptz default now(),
  unsubscribe_token uuid default gen_random_uuid(),
  active boolean default true,
  unique(email, label)
);

-- Index for the send cron: find active alerts efficiently
create index if not exists idx_job_alerts_active on job_alerts (active) where active = true;
create index if not exists idx_job_alerts_email on job_alerts (email);

-- RLS: no public access — only service role can read/write
alter table job_alerts enable row level security;
-- No policies = service role only (anon key can't access)

-- ─── Verify ──────────────────────────────────────────────
-- select * from job_alerts limit 10;
