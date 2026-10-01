import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigationType } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { useClientReady } from "@/lib/clientReady";
import { POSTS_PER_STEP, pageWasRestored, readSavedList, saveList, type SavedList } from "@/lib/postWindow";
import type { PostCategory } from "@/data/posts";
import { formatPostDate } from "@/lib/postDates";
import { sortNewestFirst } from "@/lib/postOrder";
import PostCard from "./PostCard";
import { ChevronDown, Search, X } from "lucide-react";

type PostListProps = {
  lockedTab?: PostCategory;
};

const PostList = ({ lockedTab }: PostListProps) => {
  const { posts, labs, allTags } = usePosts();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "blog" | "lab">("all");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  // On a phone the full topic list is several screens tall, so it starts folded there.
  const [tagsOpen, setTagsOpen] = useState(false);

  // The home page grows as the reader scrolls. The archive pages (one kind of
  // post each) keep the whole list, so every post is reachable without JavaScript.
  const windowed = !lockedTab;
  const clientReady = useClientReady();
  const navigationType = useNavigationType();
  // "in-app": Back inside the site, where the first render may already use what was loaded.
  // "page": the whole page was reloaded or restored, and has to hydrate with the first step only.
  const [restoreMode] = useState<"none" | "in-app" | "page">(() => {
    if (!windowed) return "none";
    if (clientReady) return navigationType === "POP" ? "in-app" : "none";
    return pageWasRestored() ? "page" : "none";
  });
  const [count, setCount] = useState(() =>
    restoreMode === "in-app" ? (readSavedList()?.count ?? POSTS_PER_STEP) : POSTS_PER_STEP,
  );
  const showFirstStep = () => setCount(POSTS_PER_STEP);

  const allPosts = useMemo(() => sortNewestFirst([...posts, ...labs]), [posts, labs]);
  const selectedTab = lockedTab ?? activeTab;
  const scopedPosts = useMemo(() => {
    if (selectedTab === "all") return allPosts;
    return selectedTab === "blog" ? posts : labs;
  }, [allPosts, labs, posts, selectedTab]);
  const visibleTags = useMemo(() => {
    if (!lockedTab) return allTags;
    return Array.from(new Set(scopedPosts.flatMap((post) => post.tags))).sort();
  }, [allTags, lockedTab, scopedPosts]);

  const toggleTag = (tag: string) => {
    showFirstStep();
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let items = scopedPosts;
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (activeTags.size > 0) {
      items = items.filter((p) => p.tags.some((t) => activeTags.has(t)));
    }
    return items;
  }, [activeTags, scopedPosts, search]);
  const shown = useMemo(() => (windowed ? filtered.slice(0, count) : filtered), [count, filtered, windowed]);
  const remaining = filtered.length - shown.length;

  // Add the next step well before the reader reaches the end, so they never wait.
  const listEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = listEnd.current;
    if (!node || remaining <= 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setCount((c) => c + POSTS_PER_STEP);
      },
      { rootMargin: "1600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [remaining]);

  // Remember how much was loaded and where the reader was, for Back and reload.
  const section = useRef<HTMLElement>(null);
  const latestCount = useRef(count);
  useEffect(() => {
    latestCount.current = count;
  }, [count]);
  useEffect(() => {
    if (!windowed) return;
    let y = window.scrollY;
    const onScroll = () => {
      // Leaving the page shrinks the document and moves the scroll position; that is not the reader.
      if (section.current?.isConnected) y = window.scrollY;
    };
    const save = () => saveList({ count: latestCount.current, y });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
    };
  }, [windowed]);

  // Put the reader back where they were, once the list is as long as it was.
  const [target, setTarget] = useState<SavedList | null>(null);
  useEffect(() => {
    if (restoreMode === "none") return;
    const saved = readSavedList();
    if (!saved) return;
    const timer = window.setTimeout(
      () =>
        startTransition(() => {
          setCount((c) => Math.max(c, saved.count));
          setTarget(saved);
        }),
      0,
    );
    return () => window.clearTimeout(timer);
  }, [restoreMode]);
  const returned = useRef(false);
  useEffect(() => {
    if (!target || returned.current || count < target.count) return;
    returned.current = true;
    if (Math.abs(window.scrollY - target.y) > 50) window.scrollTo({ top: target.y, left: 0, behavior: "auto" });
  }, [count, target]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const post of shown) {
      const key = formatPostDate(post.date, {
        month: "long",
        year: "numeric",
      });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(post);
    }
    return Array.from(map.entries());
  }, [shown]);

  return (
    <section ref={section} className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              showFirstStep();
              setSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-card-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        {!lockedTab && (
          <div className="flex gap-1 font-mono text-xs">
            {(["all", "blog", "lab"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  showFirstStep();
                  setActiveTab(tab);
                }}
                className={`px-3 py-2 rounded transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {tab === "all" ? `All (${allPosts.length})` : tab === "blog" ? `Blog (${posts.length})` : `Labs (${labs.length})`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tag filter chips */}
      <button
        type="button"
        onClick={() => setTagsOpen((open) => !open)}
        aria-expanded={tagsOpen}
        aria-controls="topic-filters"
        className="md:hidden mb-3 flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 font-mono text-xs text-muted-foreground"
      >
        <span>
          Filter by topic ({visibleTags.length})
          {activeTags.size > 0 && <span className="ml-2 text-primary">{activeTags.size} selected</span>}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${tagsOpen ? "rotate-180" : ""}`} />
      </button>
      <div id="topic-filters" className={`${tagsOpen ? "flex" : "hidden"} md:flex flex-wrap gap-1.5 mb-8`}>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`font-mono text-[11px] px-2 py-1 rounded-md border transition-all duration-200 ${
              activeTags.has(tag)
                ? "bg-primary/20 border-primary/50 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-secondary-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
        {activeTags.size > 0 && (
          <button
            onClick={() => {
              showFirstStep();
              setActiveTags(new Set());
            }}
            className="font-mono text-[11px] px-2 py-1 rounded-md border border-destructive/30 text-destructive flex items-center gap-1 hover:bg-destructive/10 transition-colors"
          >
            <X className="w-3 h-3" />
            clear
          </button>
        )}
      </div>

      {grouped.length === 0 && (
        <p className="text-center text-muted-foreground py-12 font-mono text-sm">
          No posts found matching your filters
        </p>
      )}

      {grouped.map(([month, items]) => (
        <div key={month} className="mb-10">
          <h2 className="font-mono text-xs text-terminal-dim uppercase tracking-widest mb-4 border-b border-border pb-2">
            {month}
          </h2>
          <div className="space-y-2">
            {items.map((post) => (
              <PostCard key={`${post.category}-${post.day}`} post={post} onTagClick={toggleTag} />
            ))}
          </div>
        </div>
      ))}

      {remaining > 0 && (
        <div ref={listEnd} className="flex flex-col items-center gap-3 pt-2 text-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + POSTS_PER_STEP)}
            className="rounded-lg border border-border bg-card px-4 py-2 font-mono text-xs text-card-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Show {Math.min(POSTS_PER_STEP, remaining)} more
          </button>
          <p className="font-mono text-[11px] text-muted-foreground">
            {shown.length} of {filtered.length} shown. More load as you scroll, or open the full{" "}
            <Link to="/blog" className="text-primary underline underline-offset-4">
              blog
            </Link>{" "}
            and{" "}
            <Link to="/labs" className="text-primary underline underline-offset-4">
              labs
            </Link>{" "}
            archives.
          </p>
        </div>
      )}
    </section>
  );
};

export default PostList;
