/**
 * The home page shows the newest posts and adds more as the reader nears the
 * end of the list, so the page does not have to carry every post up front.
 * What the reader had loaded, and where they were, is remembered for the tab
 * so that Back returns to the same card.
 */
export const POSTS_PER_STEP = 50;

const KEY = "home-post-list";

export type SavedList = { count: number; y: number };

export function readSavedList(): SavedList | null {
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as Partial<SavedList> | null;
    if (!saved || !Number.isFinite(saved.count) || !Number.isFinite(saved.y)) return null;
    return { count: Math.max(POSTS_PER_STEP, Number(saved.count)), y: Math.max(0, Number(saved.y)) };
  } catch {
    return null;
  }
}

export function saveList(value: SavedList): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // not being able to remember the position is harmless
  }
}

/** True when the whole page was reloaded or reached with the browser's Back or Forward. */
export function pageWasRestored(): boolean {
  try {
    const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    return entry?.type === "back_forward" || entry?.type === "reload";
  } catch {
    return false;
  }
}
