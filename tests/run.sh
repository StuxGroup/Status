#!/bin/bash
# Status - test runner (plain bash, no dependencies)
# Usage: ./tests/run.sh
#
# Status uses Date Versioning (https://datevers.ing): the UTC release date as
# YY.MM.DD, plus -1, -2... for later releases the same day. These tests check
# that VERSION.md holds a real Date Version and that CHANGELOG.md leads with it.
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PASS=0
FAIL=0

pass() { PASS=$((PASS + 1)); echo "ok   - $1"; }
fail() { FAIL=$((FAIL + 1)); echo "FAIL - $1" >&2; }

# The spec's own pattern (2000-2099 form); calendar validity is checked separately.
DATEVER='^[0-9]{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])(-[1-9][0-9]*)?$'

# Is 20YY-MM-DD a real Gregorian date? (Pure bash, so it works with any `date`.)
is_real_date() {
    local y=$((10#$1 + 2000)) m=$((10#$2)) d=$((10#$3)) max
    case $m in
        1|3|5|7|8|10|12) max=31 ;;
        4|6|9|11) max=30 ;;
        2) if (( (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 )); then max=29; else max=28; fi ;;
        *) return 1 ;;
    esac
    (( d >= 1 && d <= max ))
}

VERSION="$(tr -d '[:space:]' < "$ROOT/VERSION.md")"

# VERSION.md is a valid Date Version and a real calendar date
if [[ "$VERSION" =~ $DATEVER ]]; then
    pass "VERSION.md ($VERSION) matches the Date Versioning format"
    IFS=. read -r YY MM DD <<< "${VERSION%%-*}"
    if is_real_date "$YY" "$MM" "$DD"; then
        pass "VERSION.md ($VERSION) is a real calendar date"
    else
        fail "VERSION.md ($VERSION) isn't a real calendar date"
    fi
else
    fail "VERSION.md holds '$VERSION', which isn't a Date Version (YY.MM.DD or YY.MM.DD-N)"
fi

# The calendar check itself rejects impossible dates and accepts leap days
if ! is_real_date 26 02 30 && ! is_real_date 26 02 29 && is_real_date 28 02 29 && ! is_real_date 26 04 31 && is_real_date 26 12 31; then
    pass "the calendar check rejects 26.02.30, 26.02.29 and 26.04.31 and accepts 28.02.29"
else
    fail "the calendar check gets leap years or month lengths wrong"
fi

# The newest CHANGELOG.md entry is the version in VERSION.md
HEADING="$(grep -m1 -E '^## v[^[:space:]]+' "$ROOT/CHANGELOG.md" | sed -E 's/^## v([^[:space:]]+).*/\1/')"
if [ "$HEADING" = "$VERSION" ]; then
    pass "the newest CHANGELOG.md entry (v$HEADING) is the version in VERSION.md"
else
    fail "the newest CHANGELOG.md entry is v$HEADING, but VERSION.md holds $VERSION"
fi

echo
echo "$PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
