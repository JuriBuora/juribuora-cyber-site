/// <reference types="node" />
// Exercise the actual deployment artifact, including alias shells and every post.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { jekyllSnapshot } from "@/data/jekyllSnapshot.generated";
import { plainRoles } from "@/data/plainRoles";
import { projects } from "@/data/projects";

const dist = join(process.cwd(), "dist");
const posts = [...jekyllSnapshot.posts, ...jekyllSnapshot.labs, ...jekyllSnapshot.portfolio, ...jekyllSnapshot.reports];
const routes = ["/", "/about", "/portfolio", "/what-im-doing", "/in-plain-words", "/workstation",
  "/blog", "/Blog", "/labs", "/Labs", "/lab", "/Lab",
  ...plainRoles.en.map((role) => `/in-plain-words/${role.slug}`),
  ...projects.map((project) => `/workstation/${project.slug}`),
  ...posts.map((post) => `/${post.category}/${post.day}`)];

function hasRenderedRoot(html: string) {
  const dom = JSDOM.fragment(html);
  const root = dom.querySelector("#root");
  const rendered = !!root?.querySelector("main") && !!root.querySelector("h1") && !!root.textContent?.trim();
  return rendered;
}

it("rejects empty, comment-only and loading-only roots", () => {
  for (const body of ["", "<!--$--><!--/$-->", "<div>Loading...</div>"]) {
    expect(hasRenderedRoot(`<div id="root">${body}</div>`)).toBe(false);
  }
  expect(hasRenderedRoot('<div id="root"><main><h1>Page</h1></main></div>')).toBe(true);
});

describe.skipIf(!existsSync(dist))("prerendered deployment artifact", () => {
  it("renders every expected route and every generated route shell", () => {
    const files = readdirSync(dist, { recursive: true, encoding: "utf8" })
      .filter((file) => file === "index.html" || file.endsWith("/index.html"));
    // macOS commonly folds /Blog and /blog into one file; Linux keeps both.
    const identity = (file: string) => {
      const stat = statSync(file);
      return `${stat.dev}:${stat.ino}`;
    };
    const expectedFiles = new Set(routes.map((route) => identity(join(dist, route, "index.html"))));
    expect(new Set(files.map((file) => identity(join(dist, file))))).toEqual(expectedFiles);
    for (const route of routes) {
      expect(hasRenderedRoot(readFileSync(join(dist, route, "index.html"), "utf8")), route).toBe(true);
    }
    for (const file of files) {
      expect(hasRenderedRoot(readFileSync(join(dist, file), "utf8")), file).toBe(true);
    }
  }, 30_000);

  it("renders post bodies from the JSON snapshots, without loading skeletons", () => {
    for (const post of posts) {
      const html = readFileSync(join(dist, post.category, String(post.day), "index.html"), "utf8");
      const dom = JSDOM.fragment(html);
      const prose = dom.querySelector("#root .prose");
      expect(prose?.textContent?.trim().length, post.contentPath).toBeGreaterThan(0);
      expect(dom.querySelector(".animate-pulse"), post.contentPath).toBeNull();
    }
    const blog = readFileSync(join(dist, "blog/243/index.html"), "utf8");
    const payload = JSON.parse(readFileSync("public/generated/posts/blog/243.json", "utf8"));
    // Match a real paragraph from the source, rather than a title or metadata.
    const paragraph = payload.content.split(/\n\s*\n/).find((text: string) => /^[A-Za-z][^\n]+$/.test(text) && text.length > 80);
    expect(paragraph).toBeDefined();
    expect(JSDOM.fragment(blog).querySelector(".prose")?.textContent).toContain(paragraph);
  }, 30_000);

  it("retains CSP and emits only external script elements in every shell", () => {
    for (const route of routes) {
      const dom = JSDOM.fragment(readFileSync(join(dist, route, "index.html"), "utf8"));
      const document = dom;
      expect(document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute("content"), route)
        .toContain("script-src 'self'");
      for (const script of document.querySelectorAll("script")) {
        expect(script.getAttribute("src"), route).toBeTruthy();
        expect(script.textContent?.trim(), route).toBe("");
      }
    }
  }, 30_000);
});
