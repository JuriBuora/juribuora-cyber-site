import { ArrowRight, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import BlogFooter from "@/components/BlogFooter";
import BlogHeader from "@/components/BlogHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { usePageTitle } from "@/hooks/usePageTitle";
import { DeliverablesMock, FunnelMock, PipelineMock, RebindMock, ReportMock, ShapesMock } from "@/components/doing/Visuals";
import { chapters, heroStats, roles } from "@/data/doing";

const visuals = {
  report: ReportMock,
  shapes: ShapesMock,
  pipeline: PipelineMock,
  funnel: FunnelMock,
  rebind: RebindMock,
  deliverables: DeliverablesMock,
} as const;

const kicker = "font-mono text-xs uppercase tracking-[0.2em] text-primary";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const WhatImDoingPage = () => {
  usePageTitle("What I'm doing");
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <BlogHeader />

      <main>
        <section className="px-4 pb-16 pt-16 sm:pb-24 sm:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className={kicker}>What I'm doing</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              I build AI that does real work,
              <br className="hidden sm:block" /> and the safety around it.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Real projects, what each one does for a team, and the numbers behind them. Built with AI pair-programming.
              I set the goals, the guardrails and the review.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <a
                href="mailto:juribuora@gmail.com?subject=Hello%20from%20your%20site"
                className={`inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90 ${focus}`}
              >
                <Mail className="h-4 w-4" /> Get in touch
              </a>
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-foreground hover:bg-secondary ${focus}`}
              >
                See the projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/juri-buora-one-pager.pdf"
                className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-foreground hover:bg-secondary ${focus}`}
              >
                <FileDown className="h-4 w-4" /> One-page PDF
              </a>
            </div>

            <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dt>
                  <dd className="font-mono text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div id="projects" className="scroll-mt-16">
          {chapters.map((c, i) => {
            const Visual = visuals[c.visual];
            const flip = i % 2 === 1;
            return (
              <section
                key={c.id}
                aria-labelledby={`${c.id}-h`}
                className={"border-t border-border px-4 py-16 sm:py-24 " + (flip ? "bg-card/40" : "")}
              >
                <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={flip ? "lg:order-2" : ""}>
                    <p className={kicker}>{c.kicker}</p>
                    <h2 id={`${c.id}-h`} className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      {c.headline}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.lead}</p>

                    <h3 className="mt-7 text-sm font-semibold text-foreground">What a team gets</h3>
                    <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                      {c.benefits.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                      {c.proof.map((p) => (
                        <div key={p.label} className="flex flex-col-reverse" title={p.source}>
                          <dt className="max-w-[10rem] text-xs leading-snug text-muted-foreground">{p.label}</dt>
                          <dd className="font-mono text-2xl font-semibold tabular-nums text-primary">{p.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                      <Link
                        to={`/workstation/${c.slug}`}
                        className={`inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline ${focus}`}
                      >
                        The full story <ArrowRight className="h-4 w-4" />
                      </Link>
                      {c.reading?.map((r) => (
                        <Link key={r.to} to={r.to} className={`text-muted-foreground underline-offset-4 hover:text-primary hover:underline ${focus}`}>
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className={flip ? "lg:order-1" : ""}>
                    <Visual />
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section className="border-t border-border px-4 py-10">
          <details className="mx-auto max-w-5xl text-sm text-muted-foreground">
            <summary className={`cursor-pointer font-mono text-xs uppercase tracking-[0.2em] text-foreground ${focus}`}>
              How the numbers were counted
            </summary>
            <ul className="mt-4 space-y-2">
              {chapters.flatMap((c) =>
                c.proof.map((p) => (
                  <li key={c.id + p.label}>
                    <span className="font-mono text-foreground">{p.value}</span> {p.label}: {p.source}.
                  </li>
                )),
              )}
            </ul>
          </details>
        </section>

        <section aria-labelledby="roles" className="border-t border-border px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <p className={kicker}>Where I fit</p>
            <h2 id="roles" className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Early in my career, and open to what fits.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              I am at the start of a move into security and AI operations. I would rather show you the work than describe
              it, and I learn quickly from review.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {roles.map((r) => (
                <div key={r.title} className="rounded-3xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-card-foreground">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="more" className="border-t border-border bg-card/40 px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="more" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Want the long version?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              The workstation page has every project, including the ones I stopped and why. I will also walk you through
              any of it live.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm">
              <Link
                to="/workstation"
                className={`inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90 ${focus}`}
              >
                Open the workstation <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:juribuora@gmail.com?subject=Hello%20from%20your%20site"
                className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-foreground hover:bg-secondary ${focus}`}
              >
                <Mail className="h-4 w-4" /> Email me
              </a>
              <a
                href="https://www.linkedin.com/in/juri-buora/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-foreground hover:bg-secondary ${focus}`}
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/JuriBuora"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-foreground hover:bg-secondary ${focus}`}
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default WhatImDoingPage;
