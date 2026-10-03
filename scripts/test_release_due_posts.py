"""Run with: python3 -m unittest scripts/test_release_due_posts.py"""
import datetime as dt
import importlib.util
import unittest
from unittest.mock import patch
from pathlib import Path

spec = importlib.util.spec_from_file_location("release", Path(__file__).with_name("release-due-posts.py"))
release = importlib.util.module_from_spec(spec)
spec.loader.exec_module(release)

PATHS = [
    "Blog/_posts/2026-10-01-day-243.md",
    "Blog/_posts/2026-10-02-day-244.md",
    "Blog/_posts/2026-10-03-day-245.md",
    "Labs/_posts/2026-10-02-lab-35-day-244.md",
    "Reports/_posts/2026-07-06-security-audit-iphone-agent-app.md",
    "Portfolio-Material/_posts/2026-10-01-pasta-threat-model-case-study.md",
    "Blog/index.md",
    "Drafts/_posts/2026-10-02-not-a-site-folder.md",
    "assets/2026-10-02-picture.png",
]


class ReleaseRules(unittest.TestCase):
    def test_linux_state_and_notification_do_not_use_macos(self):
        with patch.object(release.sys, "platform", "linux"), patch.dict(release.os.environ, {"XDG_STATE_HOME": "/tmp/release-test-state"}):
            self.assertEqual(release.default_state_dir(), Path("/tmp/release-test-state/juribuora-release"))
            with patch.object(release.subprocess, "run") as run, patch.object(release, "log") as log:
                release.notify("build failed")
                run.assert_not_called()
                log.assert_called_once_with("ATTENTION build failed")

    def test_today_is_the_date_in_italy(self):
        utc = dt.timezone.utc
        self.assertEqual(release.today_in_rome(dt.datetime(2026, 10, 1, 22, 30, tzinfo=utc)), "2026-10-02")
        self.assertEqual(release.today_in_rome(dt.datetime(2026, 10, 1, 21, 30, tzinfo=utc)), "2026-10-01")
        self.assertEqual(release.today_in_rome(dt.datetime(2026, 12, 31, 23, 30, tzinfo=utc)), "2027-01-01")

    def test_due_means_dated_today_or_recently_never_in_the_future(self):
        due = release.due_posts(PATHS, "2026-10-02")
        self.assertIn("Blog/_posts/2026-10-02-day-244.md", due)
        self.assertIn("Labs/_posts/2026-10-02-lab-35-day-244.md", due)
        self.assertIn("Blog/_posts/2026-10-01-day-243.md", due)
        self.assertNotIn("Blog/_posts/2026-10-03-day-245.md", due)          # tomorrow
        self.assertNotIn("Reports/_posts/2026-07-06-security-audit-iphone-agent-app.md", due)  # long out
        self.assertNotIn("Drafts/_posts/2026-10-02-not-a-site-folder.md", due)
        self.assertEqual(len(due), 4)

    def test_blog_check_counts_listed_posts_per_day_whatever_their_slug(self):
        due = ["Blog/_posts/2026-10-02-day-244.md",
               "Labs/_posts/2026-10-02-lab-35-day-244.md",
               "Portfolio-Material/_posts/2026-10-01-pasta-threat-model-case-study.md"]
        listings = {
            "Blog": '<a href="/blog/2026/10/01/day-243.html">',                       # day 244 not built yet
            "Labs": '<a href="/labs/2026/10/02/lab-35-day-244.html">',
            # the address uses the post's own slug, not its file name
            "Portfolio-Material": '<a href="/portfolio-material/2026/10/01/pasta-threat-model-sneaker-marketplace.html">',
        }
        self.assertEqual(release.missing_on_blog(due, listings), ["Blog/_posts/2026-10-02-day-244.md"])
        self.assertEqual(release.missing_on_blog(due, {}), sorted(due))                # nothing listed at all
        two_same_day = ["Blog/_posts/2026-10-02-a.md", "Blog/_posts/2026-10-02-b.md"]
        one_listed = {"Blog": '<a href="/blog/2026/10/02/a.html"> <a href="/blog/2026/10/02/a.html">'}
        self.assertEqual(release.missing_on_blog(two_same_day, one_listed), two_same_day)

    def test_live_list_is_read_from_every_kind_of_post(self):
        manifest = {
            "posts": [{"sourcePath": "Blog/_posts/a.md"}],
            "labs": [{"sourcePath": "Labs/_posts/b.md"}],
            "portfolio": [{"sourcePath": "Portfolio-Material/_posts/c.md"}],
            "reports": [{"sourcePath": "Reports/_posts/d.md"}, {}],
        }
        self.assertEqual(release.manifest_paths(manifest),
                         {"Blog/_posts/a.md", "Labs/_posts/b.md", "Portfolio-Material/_posts/c.md", "Reports/_posts/d.md"})

    def test_decision(self):
        missing = ["Blog/_posts/2026-10-02-day-244.md"]
        self.assertEqual(release.decide([], False, 0), "nothing")
        self.assertEqual(release.decide(missing, False, 0), "dispatch")
        self.assertEqual(release.decide(missing, True, 0), "wait")            # a build is already running
        self.assertEqual(release.decide(missing, False, 2), "dispatch")
        self.assertEqual(release.decide(missing, False, 3), "give-up")        # capped per day
        self.assertEqual(release.decide([], False, 0, forced=True), "dispatch")
        self.assertEqual(release.decide([], True, 0, forced=True), "wait")


if __name__ == "__main__":
    unittest.main()
