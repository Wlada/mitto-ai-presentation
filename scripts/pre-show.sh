#!/usr/bin/env bash
# Pre-show preflight for the Claude Code presentation.
# Run 10 minutes before going live. Fails fast on anything that would
# embarrass you in front of the audience.
#
# Usage: ./scripts/pre-show.sh [--skip-e2e]
#
# Exits 0 only if every check passes. Otherwise prints what to fix.

set -u

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Colours (tput so terminals without ANSI still read fine)
if command -v tput >/dev/null 2>&1 && [ -t 1 ]; then
  GREEN="$(tput setaf 2)"; RED="$(tput setaf 1)"; YELLOW="$(tput setaf 3)"
  BOLD="$(tput bold)"; RESET="$(tput sgr0)"
else
  GREEN=""; RED=""; YELLOW=""; BOLD=""; RESET=""
fi

SKIP_E2E=0
for arg in "$@"; do
  case "$arg" in
    --skip-e2e) SKIP_E2E=1 ;;
    -h|--help)
      sed -n '2,10p' "$0"
      exit 0
      ;;
    *) echo "${YELLOW}Unknown arg: $arg (ignored)${RESET}" ;;
  esac
done

declare -a FAILURES=()

step() { printf "${BOLD}▸ %s${RESET}\n" "$1"; }
ok() { printf "  ${GREEN}✓${RESET} %s\n" "$1"; }
fail() { printf "  ${RED}✗${RESET} %s\n" "$1"; FAILURES+=("$1"); }
warn() { printf "  ${YELLOW}!${RESET} %s\n" "$1"; }

# 1. Branch check — must be on `main` (the demo starts here)
step "Branch"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" = "main" ]; then
  ok "On 'main' (the demo starts here)"
else
  fail "On branch '$BRANCH', not 'main'. Run: git checkout main"
fi

# 2. Working tree clean
step "Working tree"
if [ -z "$(git status --porcelain)" ]; then
  ok "Clean (no uncommitted changes)"
else
  warn "Uncommitted changes present:"
  git status --short | sed 's/^/    /'
  warn "Consider git stash before going live"
fi

# 3. Both demo branches exist
step "Branches present"
git rev-parse --verify --quiet refs/heads/main >/dev/null && ok "main exists" || fail "main branch missing"
git rev-parse --verify --quiet refs/heads/demo-finished >/dev/null && ok "demo-finished exists" || fail "demo-finished branch missing"

# 4. node_modules ready
step "Dependencies"
if [ -d node_modules ]; then
  ok "node_modules exists"
else
  fail "node_modules missing — run: npm install"
fi

# 5. Ports 3000 and 4300
# A dev server already running on these is normal — only flag foreign processes.
step "Ports"
for port in 3000 4300; do
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    PID="$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t | head -1)"
    PROC="$(ps -p "$PID" -o comm= 2>/dev/null || echo unknown)"
    CMD="$(ps -p "$PID" -o command= 2>/dev/null || echo '')"
    if echo "$CMD" | grep -qE "ng serve|tsx|node.*server/(src|dist)"; then
      ok "Port $port: our dev server (PID $PID)"
    else
      warn "Port $port in use by $PROC (PID $PID). Foreign process — kill before 'npm run dev'."
    fi
  else
    ok "Port $port free"
  fi
done

# 6. Refresh slide 8 numbers — only from demo-finished where the Q&A
# feature exists. On main, the committed results.data.ts already holds
# the canonical numbers and must not be overwritten with main's lower
# values (would also break the slide-08 visual snapshot baseline).
step "Slide 8 results data"
if [ "$BRANCH" = "demo-finished" ]; then
  if npm run results:refresh >/tmp/preshow-results.log 2>&1; then
    ok "results.data.ts regenerated"
    tail -8 /tmp/preshow-results.log | sed 's/^/    /'
  else
    fail "results:refresh failed — see /tmp/preshow-results.log"
  fi
else
  warn "Skipped on '$BRANCH' (refresh from demo-finished, then sync the file)"
fi

# 7. Unit + integration tests
step "Unit + integration tests"
if npm test >/tmp/preshow-tests.log 2>&1; then
  ok "All unit + integration tests pass"
  grep -E "Tests +" /tmp/preshow-tests.log | tail -2 | sed 's/^/    /'
else
  fail "Unit or integration tests failed — see /tmp/preshow-tests.log"
fi

# 8. E2E (skippable to save 30s)
if [ "$SKIP_E2E" -eq 1 ]; then
  step "E2E"
  warn "Skipped (--skip-e2e). Run npm run e2e manually before going live."
else
  step "E2E (Playwright)"
  if npm run e2e >/tmp/preshow-e2e.log 2>&1; then
    ok "All e2e tests pass"
    grep -E "passed|skipped|failed" /tmp/preshow-e2e.log | tail -1 | sed 's/^/    /'
  else
    fail "E2E failed — see /tmp/preshow-e2e.log"
  fi
fi

# 9. Disk space (avoid surprises)
step "Disk"
FREE_GB="$(df -g . | awk 'NR==2 {print $4}')"
if [ "${FREE_GB:-0}" -ge 1 ]; then
  ok "${FREE_GB}G free"
else
  warn "Low disk space: ${FREE_GB}G"
fi

# Summary
echo
if [ ${#FAILURES[@]} -eq 0 ]; then
  printf "${GREEN}${BOLD}━━━ READY TO PRESENT ━━━${RESET}\n"
  echo "Next: 'npm run dev' in terminal 1, 'claude' in terminal 2."
  exit 0
else
  printf "${RED}${BOLD}━━━ NOT READY (%d issues) ━━━${RESET}\n" "${#FAILURES[@]}"
  for f in "${FAILURES[@]}"; do
    printf "  ${RED}•${RESET} %s\n" "$f"
  done
  exit 1
fi
