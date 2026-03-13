-- ═══════════════════════════════════════════════════════════
-- Supabase Cron Setup for BEN Jobs Board
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════

-- Step 1: Enable required extensions
create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

-- Step 2: Cron job — Ingest new jobs every 6 hours
-- Calls the Vercel API endpoint which fetches from 50+ ATS boards
select cron.schedule(
  'ingest-jobs-every-6h',
  '0 */6 * * *',
  $$
  select net.http_post(
    url := 'https://www.blockchainedu.org/api/jobs/ingest',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer REPLACE_WITH_CRON_SECRET"}'::jsonb,
    body := '{}'::jsonb,
    timeout_milliseconds := 55000
  ) as request_id;
  $$
);

-- Step 3: Cron job — Expire stale jobs daily at 3 AM UTC
-- Removes auto-ingested jobs whose expires_at has passed.
-- Paid listings (with stripe_subscription_id) are never auto-expired.
select cron.schedule(
  'expire-stale-jobs-daily',
  '0 3 * * *',
  $$
  update jobs
  set status = 'expired'
  where status = 'active'
    and stripe_subscription_id is null
    and expires_at is not null
    and expires_at < now();
  $$
);

-- Step 4: Cron job — Send job alert digest emails daily at 8 AM UTC
select cron.schedule(
  'send-job-alerts-daily',
  '0 8 * * *',
  $$
  select net.http_post(
    url := 'https://www.blockchainedu.org/api/jobs/alerts/send',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer REPLACE_WITH_CRON_SECRET"}'::jsonb,
    body := '{}'::jsonb,
    timeout_milliseconds := 55000
  ) as request_id;
  $$
);

-- Step 5: Cron job — Clean up old cron logs monthly
select cron.schedule(
  'clean-cron-logs-monthly',
  '0 4 1 * *',
  $$
  delete from cron.job_run_details
  where start_time < now() - interval '30 days';
  $$
);

-- ─── Verify setup ───────────────────────────────────────
-- Run these to confirm everything is working:

-- See all scheduled jobs:
-- select * from cron.job;

-- See recent execution logs:
-- select * from cron.job_run_details order by start_time desc limit 20;

-- ─── To modify or remove ────────────────────────────────
-- Change schedule: re-run cron.schedule() with same name (overwrites)
-- Remove a job:    select cron.unschedule('ingest-jobs-every-6h');
