import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";
import { jekyllSnapshot } from "../src/data/jekyllSnapshot.generated";

const INDEX_ID = "virtual:post-snapshots";
const POST_PREFIX = "virtual:post-snapshot/";

/** Build-bound, lazy external modules from the exact JSON used by prerendering. */
export function postSnapshotPlugin(): Plugin {
  const posts = [...jekyllSnapshot.posts, ...jekyllSnapshot.labs,
    ...jekyllSnapshot.portfolio, ...jekyllSnapshot.reports];
  const byId = new Map(posts.map((post) => [`${POST_PREFIX}${post.category}/${post.day}`, post]));
  let root: string;
  return {
    name: "local-post-snapshots",
    configResolved(config) { root = config.root; },
    resolveId(id) {
      if (id === INDEX_ID || byId.has(id)) return `\0${id}`;
    },
    async load(id) {
      if (id === `\0${INDEX_ID}`) {
        const entries = [...byId].map(([moduleId, post]) =>
          `${JSON.stringify(post.contentPath)}: () => import(${JSON.stringify(moduleId)})`);
        return `export const postSnapshots = {${entries.join(",\n")}};`;
      }
      const post = byId.get(id.slice(1));
      if (!id.startsWith("\0") || !post) return;
      const file = path.resolve(root, "public", `.${post.contentPath}`);
      this.addWatchFile(file);
      const payload = JSON.parse(await readFile(file, "utf8"));
      if (payload?.category !== post.category || payload?.day !== post.day
        || typeof payload?.content !== "string" || !payload.content.trim()) {
        throw new Error(`Invalid local post snapshot: ${post.contentPath}`);
      }
      return `export default ${JSON.stringify(payload)};`;
    },
  };
}
