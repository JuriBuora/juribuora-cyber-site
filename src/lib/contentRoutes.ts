import type { PostCategory } from "@/data/posts";

export function normalizeCollectionSlug(value?: string): PostCategory | null {
  const slug = value?.toLowerCase();

  if (slug === "blog" || slug === "blogs") return "blog";
  if (slug === "lab" || slug === "labs") return "lab";
  if (slug === "portfolio") return "portfolio";

  return null;
}

const PATHS: Record<PostCategory, string> = { blog: "/blog", lab: "/labs", portfolio: "/portfolio" };
const LABELS: Record<PostCategory, string> = { blog: "Blog", lab: "Labs", portfolio: "Portfolio" };

export function collectionPath(category: PostCategory): string {
  return PATHS[category];
}

export function collectionLabel(category: PostCategory): string {
  return LABELS[category];
}

/** The small label on cards and post headers: "Day 243", "Lab 34", "Case study 09". */
export function entryLabel(category: PostCategory, day: number): string {
  const n = String(day).padStart(2, "0");
  if (category === "lab") return `Lab ${n}`;
  if (category === "portfolio") return `Case study ${n}`;
  return `Day ${n}`;
}
