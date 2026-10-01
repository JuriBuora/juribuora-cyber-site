import { describe, expect, it } from "vitest";
import type { Post } from "@/data/posts";
import { sortNewestFirst } from "./postOrder";

const post = (category: Post["category"], day: number, date: string): Post => ({
  day,
  date,
  category,
  title: `${category} ${day}`,
  summary: "",
  url: "",
  tags: [],
  slug: "",
  sourcePath: "",
  contentPath: "",
});

describe("sortNewestFirst", () => {
  it("interleaves labs and blog posts by date instead of grouping by type", () => {
    const blog = [post("blog", 216, "2026-09-04"), post("blog", 213, "2026-09-01")];
    const labs = [post("lab", 33, "2026-09-30"), post("lab", 21, "2026-09-05"), post("lab", 20, "2026-09-02")];
    expect(sortNewestFirst([...blog, ...labs]).map((p) => p.title)).toEqual([
      "lab 33",
      "lab 21",
      "blog 216",
      "lab 20",
      "blog 213",
    ]);
  });

  it("puts the blog post before the lab written the same day, and does not mutate its input", () => {
    const input = [post("lab", 34, "2026-10-01"), post("blog", 243, "2026-10-01")];
    expect(sortNewestFirst(input).map((p) => p.category)).toEqual(["blog", "lab"]);
    expect(input[0].category).toBe("lab");
  });
});
