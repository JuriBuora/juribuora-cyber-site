import type { Post } from "@/data/posts";

/**
 * Newest first across blog posts and labs together.
 *
 * `day` cannot be used for this: blog posts count days (243) and labs count
 * labs (34), so sorting on it puts every blog post of a month above every lab.
 */
export function sortNewestFirst(items: Post[]): Post[] {
  return [...items].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if (a.category !== b.category) return a.category === "blog" ? -1 : 1;
    return b.day - a.day;
  });
}
