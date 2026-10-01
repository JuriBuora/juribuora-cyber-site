import { ArrowLeft, ArrowRight, ChevronDown, Languages, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BlogFooter from "@/components/BlogFooter";
import BlogHeader from "@/components/BlogHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { castIcons } from "@/components/plain/castIcons";
import { plain } from "@/data/plain";
import { plainRoles } from "@/data/plainRoles";
import { roleMore } from "@/data/plainRoleMore";
import { usePageTitle } from "@/hooks/usePageTitle";
import { usePlainLang } from "@/hooks/usePlainLang";
import NotFound from "./NotFound";

const kicker = "font-mono text-xs uppercase tracking-[0.2em] text-primary";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const PlainRolePage = () => {
  const { role = "" } = useParams();
  const [lang, switchLang] = usePlainLang();
  const t = plain[lang];
  const roles = plainRoles[lang];
  const index = roles.findIndex((r) => r.slug === role);
  const detail = roles[index];
  usePageTitle(detail ? detail.title : "Not found");

  if (!detail) return <NotFound />;

  const Icon = castIcons[index];
  const more = roleMore[lang][detail.slug] ?? [];
  const next = roles[(index + 1) % roles.length];

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <BlogHeader />

      <main lang={lang} data-bilingual>
        <section className="px-4 pb-12 pt-12 sm:pb-16 sm:pt-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/in-plain-words"
                className={`inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary ${focus}`}
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t.roleBack}
              </Link>
              <button
                type="button"
                onClick={switchLang}
                lang={lang === "en" ? "it" : "en"}
                className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary ${focus}`}
              >
                <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                {t.switchLabel}
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-primary/10">
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              </span>
              <p className={kicker}>{detail.role}</p>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">{detail.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-foreground">{detail.oneLine}</p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {detail.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card/40 px-4 py-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
            <p className="font-mono text-4xl font-semibold tabular-nums text-primary sm:text-5xl">{detail.fact.value}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{detail.fact.label}</p>
          </div>
        </section>

        <section aria-labelledby="list" className="border-t border-border px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 id="list" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {detail.listTitle}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.roleOpenHint}</p>
            <ul className="mt-6 space-y-3">
              {detail.items.map((item, i) => {
                const extra = more[i];
                // Direct children of <summary>, so the heading stays valid HTML there.
                const heading = (
                  <>
                    <h3 className="col-start-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base font-semibold text-card-foreground">
                      {item.name}
                      {item.tag && (
                        <span className="font-mono text-[11px] font-normal uppercase tracking-wider text-primary">{item.tag}</span>
                      )}
                    </h3>
                    <span className="col-start-1 mt-2 block text-sm leading-relaxed text-muted-foreground">{item.body}</span>
                  </>
                );
                if (!extra) {
                  return (
                    <li key={item.name} className="rounded-3xl border border-border bg-card p-5">
                      {heading}
                    </li>
                  );
                }
                return (
                  <li key={item.name}>
                    {/* A native disclosure: it opens without JavaScript and its text is in the page for every reader. */}
                    <details className="group rounded-3xl border border-border bg-card transition-colors open:border-primary/40 [@media(hover:hover)]:hover:border-primary/40">
                      <summary
                        className={`grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] gap-x-4 rounded-3xl p-5 [&::-webkit-details-marker]:hidden ${focus}`}
                      >
                        {heading}
                        <span className="col-start-2 row-span-2 row-start-1 mt-0.5 flex h-8 w-8 items-center justify-center self-start rounded-full border border-border text-muted-foreground transition-colors group-open:border-primary/50 group-open:text-primary">
                          <ChevronDown
                            className="h-4 w-4 transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none"
                            aria-hidden="true"
                          />
                        </span>
                      </summary>
                      <div className="border-t border-border px-5 pb-5 pt-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200">
                        <div className="space-y-3 text-sm leading-relaxed text-card-foreground/90">
                          {extra.text.map((p) => (
                            <p key={p}>{p}</p>
                          ))}
                        </div>
                        {extra.facts && (
                          <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-3">
                            {extra.facts.map((f) => (
                              <div key={f.label} className="flex flex-col-reverse">
                                <dt className="mt-1 text-xs leading-snug text-muted-foreground">{f.label}</dt>
                                <dd className="font-mono text-xl font-semibold tabular-nums text-primary">{f.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {extra.aside && (
                          <div className="mt-5 rounded-2xl bg-primary/5 p-4">
                            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-primary">
                              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                              {t.roleCuriosity}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-card-foreground/90">{extra.aside}</p>
                          </div>
                        )}
                        {extra.link && (
                          <Link
                            to={extra.link.to}
                            className={`mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline ${focus}`}
                          >
                            {extra.link.label}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </details>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="lessons" className="border-t border-border bg-card/40 px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 id="lessons" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {detail.lessonsTitle}
            </h2>
            <ol className="mt-7 space-y-5">
              {detail.lessons.map((lesson, i) => (
                <li key={lesson} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed text-foreground">{lesson}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-border px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <Link
              to={`/in-plain-words/${next.slug}`}
              className={`group flex items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/50 ${focus}`}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t.roleNext}</p>
                <p className="mt-1 text-lg font-semibold text-card-foreground">{next.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{next.oneLine}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default PlainRolePage;
