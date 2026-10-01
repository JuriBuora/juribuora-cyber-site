import { describe, expect, it } from "vitest";
import { jekyllSnapshot } from "./jekyllSnapshot.generated";

describe("synced content", () => {
  it("every lab and portfolio piece has a one-line summary for the list pages", () => {
    for (const post of [...jekyllSnapshot.labs, ...jekyllSnapshot.portfolio]) {
      expect({ id: `${post.category} ${post.day}`, hasSummary: post.summary.length > 20 }).toEqual({
        id: `${post.category} ${post.day}`,
        hasSummary: true,
      });
    }
  });

  it("portfolio pieces have unique, stable numbers", () => {
    const days = jekyllSnapshot.portfolio.map((p) => p.day);
    expect(jekyllSnapshot.portfolio.length).toBeGreaterThan(0);
    expect(new Set(days).size).toBe(days.length);
  });

  it("reports have unique numbers that follow their dates", () => {
    const reports = [...jekyllSnapshot.reports].sort((a, b) => a.day - b.day);
    expect(reports.length).toBeGreaterThan(0);
    expect(new Set(reports.map((r) => r.day)).size).toBe(reports.length);
    // Report 01 is the oldest. A report is dated next to the work it describes.
    const dates = reports.map((r) => r.date);
    expect(dates).toEqual([...dates].sort());
  });

  it("no tag carries non-ASCII characters", () => {
    for (const tag of jekyllSnapshot.allTags) expect(tag).toMatch(/^[\x20-\x7e]+$/);
  });
});
