import { ArrowRight, BadgeCheck, ClipboardCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BlogFooter from "@/components/BlogFooter";
import BlogHeader from "@/components/BlogHeader";
import ScrollToTop from "@/components/ScrollToTop";
import type { Post } from "@/data/posts";
import { usePageTitle } from "@/hooks/usePageTitle";
import { usePosts } from "@/hooks/usePosts";
import { collectionPath, entryLabel } from "@/lib/contentRoutes";
import { formatPostDate } from "@/lib/postDates";

/** Labs that show core analyst skills, picked by hand. */
const FEATURED_LABS = [7, 6, 14, 26];

const principles = [
  {
    icon: BadgeCheck,
    title: "Evidence-led",
    body: "Each item starts with an outcome that can be explained and checked.",
  },
  {
    icon: ClipboardCheck,
    title: "Security judgement",
    body: "The focus is the decision, the trade-off, and the control behind the tool.",
  },
  {
    icon: FileCheck2,
    title: "Honest scope",
    body: "Feature-gated, test-only and training-scenario work is labelled as such, never presented as live production capability.",
  },
];

const Entry = ({ post }: { post: Post }) => (
  <article className="border border-border bg-card p-5">
    <p className="font-mono text-xs text-primary">
      {entryLabel(post.category, post.day)}
      <span className="ml-2 text-muted-foreground">
        {formatPostDate(post.date, { month: "short", day: "numeric", year: "numeric" })}
      </span>
    </p>
    <h3 className="mt-2 text-lg font-semibold text-card-foreground">{post.title}</h3>
    {post.summary && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>}
    <div className="mt-4 flex flex-wrap gap-2">
      {post.tags
        .filter((t) => t !== "cybersecurity" && t !== "labs" && t !== "learningprocess" && t !== "reports")
        .map((tag) => (
          <span key={tag} className="border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
            {tag}
          </span>
        ))}
    </div>
    <Link
      to={`/${post.category}/${post.day}`}
      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
    >
      Read the evidence
      <ArrowRight className="h-4 w-4" />
    </Link>
  </article>
);

const PortfolioPage = () => {
  usePageTitle("Portfolio");
  const { portfolio, reports, labs } = usePosts();
  const featuredLabs = FEATURED_LABS.map((n) => labs.find((l) => l.day === n)).filter((l) => l !== undefined);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <BlogHeader />

      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-4xl px-4 py-14">
          <div className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 p-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">Selected Evidence</p>
          <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Cybersecurity Portfolio</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Security case studies and labs from my learning log. Each one says what I did, how I checked it, and where its
            limits are. For the wider picture of what I build, see{" "}
            <Link to="/what-im-doing" className="text-primary underline underline-offset-4">
              what I'm doing
            </Link>
            .
          </p>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border border-border bg-card p-4">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-semibold text-card-foreground">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        {reports.length > 0 && (
          <section className="mt-10" aria-labelledby="reports">
            <h2 id="reports" className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
              Reports
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Finished documents written for someone to act on: findings, evidence, priorities and what was fixed.
            </p>
            <div className="mt-5 grid gap-4">
              {reports.map((post) => (
                <Entry key={post.day} post={post} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10" aria-labelledby="case-studies">
          <h2 id="case-studies" className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
            Case Studies
          </h2>
          <div className="mt-5 grid gap-4">
            {portfolio.map((post) => (
              <Entry key={post.day} post={post} />
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="featured-labs">
          <h2 id="featured-labs" className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
            Labs Worth Opening
          </h2>
          <div className="mt-5 grid gap-4">
            {featuredLabs.map((post) => (
              <Entry key={post.day} post={post} />
            ))}
          </div>
          <Link
            to={collectionPath("lab")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            All {labs.length} labs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default PortfolioPage;
