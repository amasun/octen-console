#!/usr/bin/env bash
# Smoke test: syntax-check all JS, then click every sidebar nav item in a real
# browser and assert registered pages render. Run from octen-console/ root:
#   bash scripts/smoke.sh
set -u
cd "$(dirname "$0")/.."

FAIL=0

echo "── 1/2 node --check all js ──"
while IFS= read -r f; do
  if ! node --check "$f" >/dev/null 2>&1; then
    echo "SYNTAX ERROR: $f"
    node --check "$f" 2>&1 | head -5
    FAIL=1
  fi
done < <(find js -name '*.js')
[ "$FAIL" -eq 0 ] && echo "all js OK"

echo "── 2/2 browser click-through ──"
PORT=8763
(py -m http.server $PORT >/dev/null 2>&1 || python3 -m http.server $PORT >/dev/null 2>&1) &
SRV=$!
sleep 1

PW="npx --package @playwright/cli playwright-cli"
$PW close >/dev/null 2>&1
$PW open "http://localhost:$PORT/index.html?smoke=$RANDOM" >/dev/null 2>&1

# playwright-cli on Windows mangles multi-line args — flatten to one line
RESULT=$($PW run-code "$(tr '\n' ' ' < scripts/smoke-clicks.js)" 2>&1)

$PW close >/dev/null 2>&1
kill $SRV >/dev/null 2>&1

if [ "${SMOKE_DEBUG:-0}" = "1" ]; then echo "$RESULT"; fi
echo "$RESULT" | grep -A2 '### Result' | head -3
if echo "$RESULT" | grep -q 'broken..:\[\]' && echo "$RESULT" | grep -q 'jsErrors..:\[\]'; then
  echo "SMOKE PASS"
else
  echo "SMOKE FAIL"
  FAIL=1
fi
exit $FAIL
