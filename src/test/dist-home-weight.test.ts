/// <reference types="node" />
// The built home page must stay light: the first step of posts only, with a
// way to reach the rest that works without JavaScript.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { jekyllSnapshot } from "@/data/jekyllSnapshot.generated";
import { POSTS_PER_STEP } from "@/lib/postWindow";

const dist = join(process.cwd(), "dist");
const postLinks = (html: string) =>
  [...JSDOM.fragment(html).querySelectorAll("section a")].filter((a) => /^\/(blog|lab)\/\d+$/.test(a.getAttribute("href") ?? ""));

describe.skipIf(!existsSync(dist))("built home page", () => {
  const home = existsSync(dist) ? readFileSync(join(dist, "index.html"), "utf8") : "";

  it("carries one step of post cards, not every post", () => {
    const cards = postLinks(home).filter((a) => a.querySelector("h3"));
    expect(cards.length).toBe(POSTS_PER_STEP);
    expect(Buffer.byteLength(home)).toBeLessThan(350_000);
  });

  it("links to the full archives, and the archives list everything", () => {
    const root = JSDOM.fragment(home);
    expect(root.querySelector('section a[href="/blog"]')).not.toBeNull();
    expect(root.querySelector('section a[href="/labs"]')).not.toBeNull();
    const blog = postLinks(readFileSync(join(dist, "blog/index.html"), "utf8")).filter((a) => a.querySelector("h3"));
    const labs = postLinks(readFileSync(join(dist, "labs/index.html"), "utf8")).filter((a) => a.querySelector("h3"));
    expect(blog.length).toBe(jekyllSnapshot.posts.length);
    expect(labs.length).toBe(jekyllSnapshot.labs.length);
  });
});
