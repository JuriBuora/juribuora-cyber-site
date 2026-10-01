import { describe, expect, it } from "vitest";
import { isReleased, releaseDay, todayInRome } from "../../scripts/release-date.mjs";

describe("release day for posts written ahead", () => {
  it("is the date in Italy, not on the build machine", () => {
    // 22:30 UTC on 1 October is already 00:30 on 2 October in Italy (summer time).
    expect(todayInRome(new Date("2026-10-01T22:30:00Z"))).toBe("2026-10-02");
    expect(todayInRome(new Date("2026-10-01T21:30:00Z"))).toBe("2026-10-01");
    // Winter time is one hour from UTC.
    expect(todayInRome(new Date("2026-12-31T23:30:00Z"))).toBe("2027-01-01");
    expect(todayInRome(new Date("2026-12-31T22:30:00Z"))).toBe("2026-12-31");
    // The daily build at 05:00 UTC is always the same calendar day in Italy.
    expect(todayInRome(new Date("2026-10-02T05:00:00Z"))).toBe("2026-10-02");
  });

  it("publishes a post on its date and not before", () => {
    expect(isReleased("2026-10-02", "2026-10-01")).toBe(false);
    expect(isReleased("2026-10-02", "2026-10-02")).toBe(true);
    expect(isReleased("2026-10-02", "2026-10-03")).toBe(true);
    expect(isReleased("2025-12-31", "2026-01-01")).toBe(true);
    expect(isReleased("2026-11-01", "2026-10-31")).toBe(false);
  });

  it("never hides a post just because its date cannot be read", () => {
    expect(isReleased("", "2026-10-01")).toBe(true);
    expect(isReleased("someday", "2026-10-01")).toBe(true);
  });

  it("can rehearse a later day, and refuses a malformed one", () => {
    const now = new Date("2026-10-01T10:00:00Z");
    expect(releaseDay({}, now)).toBe("2026-10-01");
    expect(releaseDay({ SYNC_TODAY: "" }, now)).toBe("2026-10-01");
    expect(releaseDay({ SYNC_TODAY: "2026-10-04" }, now)).toBe("2026-10-04");
    expect(() => releaseDay({ SYNC_TODAY: "tomorrow" }, now)).toThrow(/SYNC_TODAY/);
  });
});
