/**
 * Posts can be written ahead and dated in the future. They wait in the blog
 * repository and appear here on their own date: the daily build picks up
 * whatever has become due. "Today" is the date in Italy, where the author is,
 * not the date on the build machine's clock.
 */
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

export function todayInRome(now = new Date()) {
  // en-CA formats a date as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** The day the build is releasing for. SYNC_TODAY lets a later day be rehearsed. */
export function releaseDay(env = process.env, now = new Date()) {
  const rehearsal = env.SYNC_TODAY;
  if (rehearsal === undefined || rehearsal === "") return todayInRome(now);
  if (!ISO_DAY.test(rehearsal)) throw new Error(`SYNC_TODAY must look like 2026-10-02, got "${rehearsal}"`);
  return rehearsal;
}

/** A post without a readable date is published, as it always was. */
export function isReleased(postDate, today) {
  return !ISO_DAY.test(postDate) || postDate <= today;
}
