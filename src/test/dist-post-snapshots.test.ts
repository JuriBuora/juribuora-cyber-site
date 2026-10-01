/// <reference types="node" />
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { jekyllSnapshot } from "@/data/jekyllSnapshot.generated";
import type { PostContentPayload } from "@/data/posts";

const dist = join(process.cwd(), "dist");
const posts = [...jekyllSnapshot.posts, ...jekyllSnapshot.labs,
  ...jekyllSnapshot.portfolio, ...jekyllSnapshot.reports];

describe.skipIf(!existsSync(dist))("external build snapshot modules", () => {
  it("ships one lazy module per post with the exact JSON used by prerendering", async () => {
    // Each virtual module ends in its numeric day; Vite adds the content hash.
    const files = readdirSync(join(dist, "assets")).filter((name) => /^\d+-[\w-]+\.js$/.test(name));
    expect(files.length).toBe(posts.length);
    const remaining = new Map(posts.map((post) => [`${post.category}/${post.day}`, post]));
    for (const name of files) {
      const module = await import(/* @vite-ignore */ pathToFileURL(join(dist, "assets", name)).href);
      const payload = module.default as PostContentPayload;
      const key = `${payload.category}/${payload.day}`;
      const post = remaining.get(key);
      expect(post, name).toBeDefined();
      expect(payload, name).toEqual(JSON.parse(readFileSync(join(process.cwd(), "public", post!.contentPath), "utf8")));
      remaining.delete(key);
    }
    expect(remaining.size).toBe(0);
  }, 30_000);
});
