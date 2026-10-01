import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BlogFooter from "@/components/BlogFooter";
import BlogHeader from "@/components/BlogHeader";
import ScrollToTop from "@/components/ScrollToTop";
import StatusBadge from "@/components/workstation/StatusBadge";
import { projectBySlug, type ProjectStatus } from "@/data/projects";
import NotFound from "./NotFound";

const eyebrow = "font-mono text-xs uppercase tracking-[0.24em] text-primary";

const outcomeHeading: Record<ProjectStatus, string> = {
  active: "Where it stands",
  evaluating: "Where it stands",
  paused: "Why it is paused",
  retired: "Why I stopped it",
  rejected: "Why it was rejected",
};

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mt-3 space-y-3 text-sm leading-relaxed text-foreground">
    {items.map((t) => (
      <li key={t} className="flex gap-3">
        <span className="mt-2 h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const ProjectPage = () => {
  const { slug = "" } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFound />;

  const related = (project.related ?? []).map(projectBySlug).filter((p) => p !== undefined);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <BlogHeader />

      <header className="border-b border-border bg-card">
        <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <Link
            to="/workstation"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> The workstation
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs text-muted-foreground">{project.period}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">{project.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.tagline}</p>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl space-y-10 px-4 py-10">
        <section aria-labelledby="why">
          <h2 id="why" className={eyebrow}>Why it exists</h2>
          <Bullets items={project.why} />
        </section>

        <section aria-labelledby="what">
          <h2 id="what" className={eyebrow}>What it does</h2>
          <Bullets items={project.what} />
        </section>

        {project.decisions.length > 0 && (
          <section aria-labelledby="decisions">
            <h2 id="decisions" className={eyebrow}>Decisions worth explaining</h2>
            <Bullets items={project.decisions} />
          </section>
        )}

        <section aria-labelledby="outcome">
          <h2 id="outcome" className={eyebrow}>{outcomeHeading[project.status]}</h2>
          <Bullets items={project.outcome} />
          {project.restore && (
            <p className="mt-4 border border-border bg-card p-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-mono text-xs uppercase tracking-wider text-foreground">Bringing it back: </span>
              {project.restore}
            </p>
          )}
        </section>

        <section aria-labelledby="learned" className="border-l-2 border-primary pl-4">
          <h2 id="learned" className={eyebrow}>What I learned</h2>
          <p className="mt-2 text-base font-medium leading-relaxed text-foreground">{project.learned}</p>
        </section>

        <section aria-labelledby="evidence">
          <h2 id="evidence" className={eyebrow}>Evidence</h2>
          <Bullets items={project.evidence} />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Most source material lives in private repositories. I am happy to show it in a live walkthrough.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                {t}
              </span>
            ))}
          </div>
          {project.link &&
            (project.link.external ? (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {project.link.label} <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link to={project.link.href} className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4">
                {project.link.label}
              </Link>
            ))}
        </section>

        {related.length > 0 && (
          <section aria-labelledby="related">
            <h2 id="related" className={eyebrow}>Related</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/workstation/${r.slug}`}
                    className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:border-primary/50"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <BlogFooter />
    </div>
  );
};

export default ProjectPage;
