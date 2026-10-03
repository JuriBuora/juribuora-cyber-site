#!/usr/bin/env python3
"""Make sure posts that are due today are really published.

Posts can be written ahead and pushed with a future date. Both sites hide them
until their day, but they only notice that the day has come when they build,
and GitHub's own schedule is best-effort: on this repository it fired on five
days in two months and then not at all. So this runs on the author's Mac every
half hour, looks at what should be public today, and starts the builds only
when something is missing.

It never publishes content itself. It reads the published blog branch, reads
the two live sites, and at most asks GitHub to run the existing workflows.

    release-due-posts.py            check, and start builds if needed
    release-due-posts.py --check    say what it would do, start nothing
    release-due-posts.py --status   last run, and what is due today
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from zoneinfo import ZoneInfo

BLOG_REPO = "JuriBuora/JuriBuora.github.io"
BLOG_BRANCH = "my-blog"
BLOG_WORKFLOW = "deploy-pages.yml"
BLOG_SITE = "https://juribuora.github.io"
SITE_REPO = "JuriBuora/juribuora-cyber-site"
SITE_WORKFLOW = "deploy.yml"
SITE_MANIFEST = "https://juribuora.com/generated/manifest.json"

# Folder in the blog repository -> address prefix on the Jekyll site.
FOLDERS = {
    "Blog": "blog",
    "Labs": "labs",
    "Portfolio-Material": "portfolio-material",
    "Reports": "reports",
}
POST_PATH = re.compile(r"^(?P<folder>[^/]+)/_posts/(?P<date>\d{4}-\d{2}-\d{2})-(?P<slug>.+)\.(?:md|markdown)$")

# Only recent posts are checked: anything older went out long ago.
WINDOW_DAYS = 14
# A post that cannot build must not be retried all day.
MAX_DISPATCHES_PER_DAY = 3

def default_state_dir() -> Path:
    if sys.platform == "darwin":
        return Path.home() / "Library" / "Application Support" / "juribuora-release"
    return Path(os.environ.get("XDG_STATE_HOME", str(Path.home() / ".local/state"))) / "juribuora-release"


STATE_DIR = Path(os.environ.get("RELEASE_STATE_DIR", str(default_state_dir())))
STATE_FILE = STATE_DIR / "state.json"
FORCE_FILE = STATE_DIR / "force-once"
GH = os.environ.get("GH_BIN") or shutil.which("gh") or "gh"


def today_in_rome(now: dt.datetime | None = None) -> str:
    return (now or dt.datetime.now(dt.timezone.utc)).astimezone(ZoneInfo("Europe/Rome")).date().isoformat()


def due_posts(paths: list[str], today: str, window_days: int = WINDOW_DAYS) -> list[str]:
    """Published files dated today or in the last few days. Future ones are not due."""
    earliest = (dt.date.fromisoformat(today) - dt.timedelta(days=window_days)).isoformat()
    due = []
    for path in paths:
        match = POST_PATH.match(path)
        if match and match["folder"] in FOLDERS and earliest <= match["date"] <= today:
            due.append(path)
    return sorted(due)


def missing_on_blog(due: list[str], listings: dict[str, str]) -> list[str]:
    """Due posts the Jekyll site does not list yet.

    A post's address there can use a custom slug, so file names cannot be
    turned into addresses. Each folder's listing page links every post under
    /<prefix>/YYYY/MM/DD/, so the links are counted per day instead: if a day
    lists fewer posts than are due for it, that day's posts count as missing.
    """
    missing = []
    by_day: dict[tuple[str, str], list[str]] = {}
    for path in due:
        match = POST_PATH.match(path)
        by_day.setdefault((match["folder"], match["date"]), []).append(path)
    for (folder, date), paths in sorted(by_day.items()):
        year, month, day = date.split("-")
        marker = f'/{FOLDERS[folder]}/{year}/{month}/{day}/'
        listed = set(re.findall(re.escape(marker) + r'[^"\'#?]+', listings.get(folder, "")))
        if len(listed) < len(paths):
            missing.extend(paths)
    return missing


def manifest_paths(manifest: dict) -> set[str]:
    return {
        post["sourcePath"]
        for kind in ("posts", "labs", "portfolio", "reports")
        for post in manifest.get(kind, [])
        if post.get("sourcePath")
    }


def decide(missing: list[str], active_run: bool, dispatched_today: int, forced: bool = False) -> str:
    """What to do for one site: 'nothing', 'wait', 'dispatch' or 'give-up'."""
    if not missing and not forced:
        return "nothing"
    if active_run:
        return "wait"
    if dispatched_today >= MAX_DISPATCHES_PER_DAY and not forced:
        return "give-up"
    return "dispatch"


# ---- the outside world -------------------------------------------------------

def gh(*args: str) -> str:
    done = subprocess.run([GH, *args], capture_output=True, text=True, timeout=60)
    if done.returncode != 0:
        raise RuntimeError(f"gh {' '.join(args[:3])}… failed: {done.stderr.strip()[:200]}")
    return done.stdout


def published_paths() -> list[str]:
    tree = json.loads(gh("api", f"repos/{BLOG_REPO}/git/trees/{BLOG_BRANCH}?recursive=1"))
    if tree.get("truncated"):
        raise RuntimeError("the blog file list came back truncated; refusing to guess")
    return [entry["path"] for entry in tree["tree"] if entry.get("type") == "blob"]


def fetch(url: str) -> tuple[int, bytes]:
    request = urllib.request.Request(url, headers={"User-Agent": "juribuora-release-check", "Cache-Control": "no-cache"})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as error:
        return error.code, b""


def run_is_active(repo: str, workflow: str) -> bool:
    runs = json.loads(gh("run", "list", "--repo", repo, "--workflow", workflow, "--limit", "5", "--json", "status"))
    return any(run["status"] in ("queued", "in_progress", "requested", "waiting", "pending") for run in runs)


def notify(message: str) -> None:
    if sys.platform != "darwin":
        log(f"ATTENTION {message}")
        return
    script = f'display notification {json.dumps(message)} with title "juribuora.com release"'
    subprocess.run(["/usr/bin/osascript", "-e", script], capture_output=True, timeout=20)


def load_state(today: str) -> dict:
    try:
        state = json.loads(STATE_FILE.read_text())
    except (OSError, ValueError):
        state = {}
    if state.get("day") != today:
        state = {"day": today, "dispatched": {}, "gave_up": []}
    return state


def save_state(state: dict) -> None:
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    temporary = STATE_FILE.with_suffix(".tmp")
    temporary.write_text(json.dumps(state, indent=1))
    temporary.replace(STATE_FILE)


def log(line: str) -> None:
    stamp = dt.datetime.now(ZoneInfo("Europe/Rome")).strftime("%d-%m-%Y %H:%M")
    print(f"{stamp} {line}", flush=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--check", action="store_true", help="report only, start nothing")
    parser.add_argument("--status", action="store_true", help="show the last run and what is due")
    parser.add_argument("--today", help="pretend it is this day (YYYY-MM-DD); implies --check")
    args = parser.parse_args()
    dry = args.check or args.status or bool(args.today)
    today = args.today or today_in_rome()

    if args.status:
        try:
            print("last run:", json.dumps(json.loads(STATE_FILE.read_text())))
        except (OSError, ValueError):
            print("last run: no state file yet")

    try:
        due = due_posts(published_paths(), today)
        status, body = fetch(SITE_MANIFEST)
        if status != 200:
            raise RuntimeError(f"juribuora.com manifest answered {status}")
        live = manifest_paths(json.loads(body))
        missing_site = [path for path in due if path not in live]
        listings = {}
        for folder in sorted({POST_PATH.match(path)["folder"] for path in due}):
            status, body = fetch(f"{BLOG_SITE}/{folder}/")
            if status != 200:
                raise RuntimeError(f"the old blog's {folder} page answered {status}")
            listings[folder] = body.decode("utf-8", "replace")
        missing_blog = missing_on_blog(due, listings)
    except Exception as error:  # network down, GitHub login gone: say so, try again next time
        log(f"ERROR could not check: {error}")
        return 2

    forced = FORCE_FILE.exists() and not dry
    state = load_state(today)
    outcome = 0
    for name, repo, workflow, missing in (
        ("old blog", BLOG_REPO, BLOG_WORKFLOW, missing_blog),
        ("juribuora.com", SITE_REPO, SITE_WORKFLOW, missing_site),
    ):
        try:
            action = decide(missing, bool(missing or forced) and run_is_active(repo, workflow),
                            state["dispatched"].get(repo, 0), forced)
        except Exception as error:
            log(f"ERROR {name}: {error}")
            outcome = 2
            continue
        names = ", ".join(Path(path).name for path in missing) or "nothing"
        if action == "nothing":
            continue
        if action == "wait":
            log(f"{name}: missing {names}; a build is already running, waiting")
        elif action == "give-up":
            log(f"{name}: STILL MISSING {names} after {MAX_DISPATCHES_PER_DAY} builds today; giving up until tomorrow")
            if repo not in state["gave_up"] and not dry:
                state["gave_up"].append(repo)
                notify(f"{name}: today's posts are not live after {MAX_DISPATCHES_PER_DAY} builds. Check the build log.")
            outcome = 1
        elif dry:
            log(f"{name}: missing {names}; would start a build (dry run)")
        else:
            try:
                gh("workflow", "run", workflow, "--repo", repo)
                state["dispatched"][repo] = state["dispatched"].get(repo, 0) + 1
                log(f"{name}: missing {names}{' (forced)' if forced else ''}; started build {state['dispatched'][repo]} of {MAX_DISPATCHES_PER_DAY}")
            except Exception as error:
                log(f"ERROR {name}: could not start the build: {error}")
                outcome = 2

    if forced:
        FORCE_FILE.unlink(missing_ok=True)
    if not missing_site and not missing_blog and not forced:
        log(f"ok: {len(due)} recent posts due by {today}, all live on both sites")
    if not dry:
        state["last_run"] = dt.datetime.now(ZoneInfo("Europe/Rome")).strftime("%d-%m-%Y %H:%M")
        state["missing"] = {"site": missing_site, "blog": missing_blog}
        save_state(state)
    return outcome


if __name__ == "__main__":
    sys.exit(main())
