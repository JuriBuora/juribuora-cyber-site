import { ArrowRight, ExternalLink, Github, Linkedin, Mail, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import BlogFooter from "@/components/BlogFooter";
import BlogHeader from "@/components/BlogHeader";
import ScrollToTop from "@/components/ScrollToTop";
import ActivityChart from "@/components/workstation/ActivityChart";
import ArchitectureStack from "@/components/workstation/ArchitectureStack";
import ProjectCard from "@/components/workstation/ProjectCard";
import { builtProjects, otherProjects } from "@/data/projects";
import { asOf, caseStudies, honestScope, proves, stats } from "@/data/workstation";

const eyebrow = "font-mono text-xs uppercase tracking-[0.24em] text-primary";

const WorkstationPage = () => (
  <div className="min-h-screen bg-background">
    <ScrollToTop />
    <BlogHeader />

    <section className="border-b border-border bg-card">
      <div className="container mx-auto max-w-4xl px-4 py-14 sm:py-20">
        <p className={eyebrow}>~/workstation</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-5xl">
          An AI operations lab,
          <br />
          built after hours<span className="text-primary">_</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Since June 2026 I have been building and running my own AI workstation: local and cloud models, a chat-driven
          assistant, a library of skills, and the safety gates that stop it doing damage. This page is the short version
          of what I built, what broke, and what I changed because of it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href="#cases"
            className="inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Read the case studies
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="mailto:juribuora@gmail.com?subject=Workstation%20walkthrough"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Mail className="h-4 w-4" />
            Ask for a live walkthrough
          </a>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Short on time? Read <Link to="/what-im-doing" className="text-primary underline underline-offset-4">what I'm doing</Link>, the five-minute version.
        </p>
      </div>
    </section>

    <main className="container mx-auto max-w-4xl space-y-16 px-4 py-12">
      <section aria-labelledby="numbers">
        <p id="numbers" className={eyebrow}>The numbers</p>
        <dl className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-card p-4">
              <dt className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dt>
              <dd className="font-mono text-3xl font-bold tabular-nums text-primary" title={s.source}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          Read from git and the file system on {asOf}. Hover a number for how it was counted.
        </p>
        <div className="mt-6">
          <ActivityChart />
        </div>
      </section>

      <section aria-labelledby="scope" className="border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-primary" aria-hidden="true" />
          <h2 id="scope" className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
            Read this first: honest scope
          </h2>
        </div>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground">
          {honestScope.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how">
        <p id="how" className={eyebrow}>How it fits together</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">One request, five layers</h2>
        <div className="mt-5">
          <ArchitectureStack />
        </div>
      </section>

      <section id="cases" aria-labelledby="cases-title" className="scroll-mt-20">
        <p id="cases-title" className={eyebrow}>Case studies</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">The short version of each story</h2>
        <div className="mt-6 space-y-6">
          {caseStudies.map((c) => (
            <article key={c.id} className="border border-border bg-card p-5 sm:p-6">
              <p className="font-mono text-xs text-primary">{c.kicker}</p>
              <h3 className="mt-2 text-xl font-semibold text-card-foreground">{c.title}</h3>

              <h4 className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">The problem</h4>
              <p className="mt-1 text-sm leading-relaxed text-card-foreground">{c.problem}</p>

              <p className="mt-5 border-l-2 border-primary pl-3 text-sm font-medium leading-relaxed text-foreground">
                {c.lesson}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <span key={s} className="border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                    {s}
                  </span>
                ))}
              </div>

              <Link
                to={`/workstation/${c.slug}`}
                className="mt-5 mr-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Full story
                <ArrowRight className="h-4 w-4" />
              </Link>

              {c.link &&
                (c.link.external ? (
                  <a
                    href={c.link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {c.link.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    to={c.link.to}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {c.link.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
            </article>
          ))}
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20">
        <p id="projects-title" className={eyebrow}>Every project</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">What I built and run</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {builtProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section id="graveyard" aria-labelledby="graveyard-title" className="scroll-mt-20">
        <p id="graveyard-title" className={eyebrow}>The graveyard</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">What I stopped, and why</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Knowing when to stop is part of the job. These were retired, paused or rejected on evidence, and each page says
          what the evidence was and how to bring it back.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {otherProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="proves">
        <p id="proves" className={eyebrow}>What this shows</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {proves.map((p) => (
            <div key={p.title} className="border border-border bg-card p-4">
              <h2 className="text-sm font-semibold text-card-foreground">{p.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="contact" className="border border-border bg-card p-6 text-center">
        <h2 id="contact" className="text-xl font-bold text-card-foreground">Want to see it running?</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          I am looking for a junior security or AI-operations role. I will walk you through any of this live and show the
          commits behind the numbers.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
          <a
            href="mailto:juribuora@gmail.com?subject=Workstation%20walkthrough"
            className="inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Mail className="h-4 w-4" /> Email me
          </a>
          <a
            href="https://www.linkedin.com/in/juri-buora/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://github.com/JuriBuora"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          More security-specific evidence lives on the{" "}
          <Link to="/portfolio" className="text-primary underline underline-offset-4">portfolio page</Link>.
        </p>
      </section>
    </main>

    <BlogFooter />
  </div>
);

export default WorkstationPage;
