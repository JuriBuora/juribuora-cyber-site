#!/usr/bin/env bash
# Renders the share image and the one-page PDF from scripts/assets/*.html.
# Run after editing either template; the outputs in public/ are committed.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --screenshot="$PWD/public/og-what-im-doing.png" "file://$PWD/scripts/assets/og.html" >/dev/null 2>&1
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/public/juri-buora-one-pager.pdf" "file://$PWD/scripts/assets/one-pager.html" >/dev/null 2>&1
ls -l public/og-what-im-doing.png public/juri-buora-one-pager.pdf
