#!/bin/bash
# Run as the authenticated owner, never as root. Uses sudo only for system units.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
UNIT=juribuora-site-release
case "${1:-}" in
  --status)
    systemctl is-enabled "$UNIT.timer" || true
    systemctl status "$UNIT.timer" "$UNIT.service" --no-pager || true
    journalctl -u "$UNIT.service" -n 8 --no-pager
    exit 0 ;;
  --uninstall)
    sudo systemctl disable --now "$UNIT.timer"
    sudo rm -f "/etc/systemd/system/$UNIT.timer" "/etc/systemd/system/$UNIT.service"
    sudo systemctl daemon-reload
    exit 0 ;;
esac
[[ $(uname -s) == Linux && $(id -u) != 0 ]] || { echo 'Run as the Linux owner, not root.' >&2; exit 1; }
command -v gh >/dev/null || { echo 'Install GitHub CLI first.' >&2; exit 1; }
gh auth status >/dev/null 2>&1 || { echo 'Owner must run gh auth login first; timer not installed or enabled.' >&2; exit 1; }
git -C "$REPO" diff --quiet HEAD -- scripts/release-due-posts.py || { echo 'Commit script first.' >&2; exit 1; }
COMMIT=$(git -C "$REPO" rev-parse HEAD)
TARGET="$HOME/.local/share/juribuora-release/$COMMIT/release-due-posts.py"
mkdir -p "$(dirname "$TARGET")"
git -C "$REPO" show HEAD:scripts/release-due-posts.py > "$TARGET"
chmod 555 "$TARGET"
# A real read-only check must succeed before activation.
/usr/bin/python3 "$TARGET" --check
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
cat > "$TMP/$UNIT.service" <<EOF
[Unit]
Description=Publish due juribuora posts through existing GitHub workflows
Wants=network-online.target
After=network-online.target
[Service]
Type=oneshot
User=$(id -un)
Environment=HOME=$HOME
Environment=GH_BIN=$(command -v gh)
ExecStart=/usr/bin/python3 $TARGET
TimeoutStartSec=10min
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=$HOME/.local/state
UMask=0077
EOF
mkdir -p "$HOME/.local/state/juribuora-release"
cat > "$TMP/$UNIT.timer" <<EOF
[Unit]
Description=Check due website posts every half hour, including after missed runs
[Timer]
OnCalendar=*-*-* *:00,30:00
Persistent=true
RandomizedDelaySec=30
[Install]
WantedBy=timers.target
EOF
sudo install -m 644 "$TMP/$UNIT.service" "$TMP/$UNIT.timer" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now "$UNIT.timer"
sudo systemctl start "$UNIT.service"
echo "Installed commit $COMMIT; inspect with $0 --status."
