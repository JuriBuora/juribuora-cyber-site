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

  it("no tag carries non-ASCII characters", () => {
    for (const tag of jekyllSnapshot.allTags) expect(tag).toMatch(/^[\x20-\x7e]+$/);
  });
});
