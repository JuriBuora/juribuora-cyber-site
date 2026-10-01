import { jekyllSnapshot } from "@/data/jekyllSnapshot.generated";
import { normalizeCollectionSlug } from "@/lib/contentRoutes";
import type { PostContentPayload } from "@/data/posts";

/** Resolve from the same static manifest used by PostPage, without inline state. */
export function postForPath(pathname: string) {
  const [, category, day] = pathname.replace(/\/+$/, "").split("/");
  if (!/^\/[^/]+\/\d+\/?$/.test(pathname)) return undefined;
  return [...jekyllSnapshot.posts, ...jekyllSnapshot.labs, ...jekyllSnapshot.portfolio, ...jekyllSnapshot.reports]
    .find((post) => post.category === normalizeCollectionSlug(category) && post.day === Number(day));
}

export function validatePostContent(payload: PostContentPayload, post: NonNullable<ReturnType<typeof postForPath>>) {
  if (payload.category !== post.category || payload.day !== post.day || typeof payload.content !== "string" || !payload.content.trim()) {
    throw new Error(`Invalid local post snapshot: ${post.contentPath}`);
  }
  return payload;
}
