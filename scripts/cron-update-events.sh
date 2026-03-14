#!/bin/bash
# Daily cron: scrape cryptonomads → merge → commit + push if changed
# Usage: Add to crontab: 0 8 * * * cd /Users/antonio/Projects/bitcoin-education && ./scripts/cron-update-events.sh >> /tmp/cron-events.log 2>&1

set -e

cd "$(dirname "$0")/.."

# Load env vars
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "$(date) — Starting event scrape..."

# Step 1: Scrape cryptonomads (with series pages for side events)
node scripts/scrape-cryptonomads.mjs --with-series || {
  echo "Scrape failed, skipping merge"
  exit 1
}

# Step 2: Merge into conference format
node scripts/merge-cryptonomads.mjs

# Step 3: Commit + push if there are changes
if git diff --quiet content/cryptonomads-events.json content/community-events.json 2>/dev/null; then
  echo "$(date) — No new events, skipping commit"
else
  echo "$(date) — New events found, committing..."
  git add content/cryptonomads-events.json content/community-events.json
  git commit -m "chore: update cryptonomads events ($(date +%Y-%m-%d))"
  git push origin main
  echo "$(date) — Pushed updated events"
fi
