#!/usr/bin/env bash
# ============================================================
# dev-safe.sh — Self-healing Next.js dev server
#
# Kills stale processes, clears cache, starts next dev,
# and auto-recovers from blank-page crashes.
# ============================================================

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT=3000
LOG="/tmp/dev-recovery.log"
FAIL_THRESHOLD=3
CHECK_INTERVAL=10
STARTUP_GRACE=15

log() {
  local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
  echo "$msg" | tee -a "$LOG"
}

kill_port() {
  local pids
  pids=$(lsof -ti:"$PORT" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    log "Killing existing process(es) on port $PORT: $pids"
    echo "$pids" | xargs kill -9 2>/dev/null || true
    sleep 1
  fi
}

clear_cache() {
  log "Clearing .next cache"
  rm -rf "$PROJECT_DIR/.next"
  rm -rf "$PROJECT_DIR/node_modules/.cache"
}

start_server() {
  log "Starting next dev on port $PORT"
  cd "$PROJECT_DIR"
  npx next dev -p "$PORT" &
  SERVER_PID=$!
  log "Server PID: $SERVER_PID"
}

check_health() {
  local status body_size
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" 2>/dev/null || echo "000")
  body_size=$(curl -s "http://localhost:$PORT" 2>/dev/null | wc -c | tr -d ' ')

  if [ "$status" != "200" ] || [ "$body_size" -lt 500 ]; then
    return 1
  fi
  return 0
}

# ---- Trap for clean shutdown ----
cleanup() {
  log "Shutting down dev server (PID: ${SERVER_PID:-unknown})"
  kill "$SERVER_PID" 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

# ---- Main loop ----
log "========== dev-safe.sh starting =========="

while true; do
  kill_port
  clear_cache
  start_server

  # Wait for initial compilation
  log "Waiting ${STARTUP_GRACE}s for initial compilation..."
  sleep "$STARTUP_GRACE"

  fail_count=0

  while true; do
    # Check if server process is still alive
    if ! kill -0 "$SERVER_PID" 2>/dev/null; then
      log "Server process died unexpectedly"
      break
    fi

    if check_health; then
      fail_count=0
    else
      fail_count=$((fail_count + 1))
      log "Health check failed ($fail_count/$FAIL_THRESHOLD)"

      if [ "$fail_count" -ge "$FAIL_THRESHOLD" ]; then
        log "RECOVERY: $FAIL_THRESHOLD consecutive failures — restarting server"
        kill "$SERVER_PID" 2>/dev/null || true
        sleep 1
        break
      fi
    fi

    sleep "$CHECK_INTERVAL"
  done

  log "Restarting in 2 seconds..."
  sleep 2
done
