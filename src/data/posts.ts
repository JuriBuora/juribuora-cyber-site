export type PostCategory = "blog" | "lab" | "portfolio";

export type Post = {
  day: number;
  title: string;
  /** One line for list pages: written by hand, or taken from the post's TL;DR. May be empty. */
  summary: string;
  date: string;
  url: string;
  category: PostCategory;
  tags: string[];
  slug: string;
  sourcePath: string;
  contentPath: string;
};

export type LoadedPosts = {
  posts: Post[];
  labs: Post[];
  portfolio: Post[];
  allTags: string[];
  source: "snapshot";
  upstream: {
    repo: string;
    branch: string;
    site: string;
  };
};

export type PostContentPayload = {
  day: number;
  title: string;
  date: string;
  url: string;
  category: PostCategory;
  tags: string[];
  slug: string;
  sourcePath: string;
  content: string;
};
