import { lazy, type ComponentType } from "react";

const RELOAD_KEY = "stale-build-reload-at";
const RELOAD_WINDOW_MS = 15_000;

/**
 * True when a failed page load should be answered with one reload.
 * A second failure within the window means the reload did not help, so stop
 * and let the error screen show instead of looping.
 */
export function shouldReloadForStaleBuild(now: number, lastReloadAt: string | null): boolean {
  const last = Number(lastReloadAt);
  return !lastReloadAt || !Number.isFinite(last) || now - last > RELOAD_WINDOW_MS;
}

/**
 * `lazy()` for route pages that survives a deploy.
 *
 * Page code is split into files named after their content. A deploy replaces
 * them, so a tab opened before the deploy asks for a file that no longer
 * exists the next time a link is clicked. The import failed, React had no
 * page to show, and the visitor got a blank screen until they reloaded by
 * hand. Reload once on their behalf instead; the fresh page knows the new
 * file names.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyPage<T extends ComponentType<any>>(load: () => Promise<{ default: T }>) {
  return lazy(() =>
    load().catch((error: unknown) => {
      let last: string | null;
      try {
        last = sessionStorage.getItem(RELOAD_KEY);
      } catch {
        throw error;
      }
      if (!shouldReloadForStaleBuild(Date.now(), last)) throw error;
      sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
      window.location.reload();
      return new Promise<{ default: T }>(() => {});
    }),
  );
}
