#!/bin/bash
# Installs the job that makes sure posts due today are published
# (scripts/release-due-posts.py) as a per-user background service on this Mac.
#
#   scripts/install-release-agent.sh            install or update, from the committed script
#   scripts/install-release-agent.sh --status   is it registered, and did it run
#   scripts/install-release-agent.sh --uninstall
#
# The service runs a copy of the script taken from a commit, kept outside the
# checkout, so work in progress here can never change what runs unattended.
set -euo pipefail

LABEL="com.juribuora.site-release-due-posts"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
RELEASES="$HOME/.local/share/juribuora-release"
LOG_DIR="$HOME/Library/Logs/juribuora-site-release"
LOG="$LOG_DIR/release.log"
PYTHON="/opt/homebrew/bin/python3"
DOMAIN="gui/$(id -u)"
REPO="$(cd "$(dirname "$0")/.." && pwd)"

status() {
  echo "Registered to start by itself (file in LaunchAgents): $([ -f "$PLIST" ] && echo yes || echo NO)"
  if launchctl print "$DOMAIN/$LABEL" >/dev/null 2>&1; then
    echo "Loaded in this login session: yes"
    launchctl print "$DOMAIN/$LABEL" | grep -E "^\s*(state|runs|last exit code|run interval) =" | sed 's/^[[:space:]]*/  /'
    echo "  runs: $(/usr/libexec/PlistBuddy -c 'Print :ProgramArguments:1' "$PLIST" 2>/dev/null)"
  else
    echo "Loaded in this login session: NO"
  fi
  echo "Last lines of the log ($LOG):"
  tail -n 3 "$LOG" 2>/dev/null | sed 's/^/  /' || echo "  (no log yet)"
}

case "${1:-}" in
  --status) status; exit 0 ;;
  --uninstall)
    launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
    rm -f "$PLIST"
    echo "Removed. Copies of the script stay in $RELEASES."
    exit 0 ;;
esac

[ -x "$PYTHON" ] || { echo "python not found at $PYTHON" >&2; exit 1; }
git -C "$REPO" diff --quiet HEAD -- scripts/release-due-posts.py \
  || { echo "scripts/release-due-posts.py has uncommitted changes; commit first" >&2; exit 1; }
COMMIT="$(git -C "$REPO" rev-parse --short=12 HEAD)"
TARGET="$RELEASES/$COMMIT/release-due-posts.py"
mkdir -p "$(dirname "$TARGET")" "$LOG_DIR" "$(dirname "$PLIST")"
git -C "$REPO" show "HEAD:scripts/release-due-posts.py" > "$TARGET"
chmod 555 "$TARGET"

cat > "$PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$PYTHON</string>
    <string>$TARGET</string>
  </array>
  <key>StartInterval</key><integer>1800</integer>
  <key>RunAtLoad</key><true/>
  <key>ProcessType</key><string>Background</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key><string>/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
  </dict>
  <key>StandardOutPath</key><string>$LOG</string>
  <key>StandardErrorPath</key><string>$LOG</string>
</dict>
</plist>
PLIST
plutil -lint "$PLIST" >/dev/null

launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
launchctl bootstrap "$DOMAIN" "$PLIST"
echo "Installed commit $COMMIT."
sleep 8
status
