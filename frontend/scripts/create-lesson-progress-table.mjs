// Run: node scripts/create-lesson-progress-table.mjs
// Creates the lesson_progress table in Supabase via the REST API

import { readFileSync } from "fs";

// Load .env manually
const envFile = readFileSync(".env", "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const sql = `
CREATE TABLE IF NOT EXISTS lesson_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lesson_progress' AND policyname = 'Users can read own progress') THEN
    CREATE POLICY "Users can read own progress" ON lesson_progress FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lesson_progress' AND policyname = 'Users can insert own progress') THEN
    CREATE POLICY "Users can insert own progress" ON lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lesson_progress' AND policyname = 'Users can delete own progress') THEN
    CREATE POLICY "Users can delete own progress" ON lesson_progress FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;
`;

const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
  method: "POST",
  headers: {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query: sql }),
});

// The RPC endpoint won't work for raw SQL. Use the pg endpoint instead.
// Fallback: use the Supabase SQL API (requires project ref)
const projectRef = SUPABASE_URL.replace("https://", "").replace(".supabase.co", "");

const sqlRes = await fetch(`https://${projectRef}.supabase.co/pg`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SERVICE_KEY}`,
  },
  body: JSON.stringify({ query: sql }),
});

if (!sqlRes.ok) {
  // Try the management API approach
  console.log("Direct SQL endpoint not available. Trying alternative...");

  // Use the PostgREST approach - check if table exists first
  const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/lesson_progress?select=id&limit=1`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });

  if (checkRes.status === 200) {
    console.log("✓ lesson_progress table already exists!");
    process.exit(0);
  }

  console.error("Cannot create table via API. Please run this SQL in your Supabase Dashboard > SQL Editor:");
  console.log("\n" + sql);
  process.exit(1);
}

console.log("✓ lesson_progress table created successfully!");
