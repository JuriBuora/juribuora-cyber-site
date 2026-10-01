import { useEffect, useState } from "react";
import {
  Archive,
  ArrowRight,
  BadgeCheck,
  Brain,
  Compass,
  Hand,
  Languages,
  LifeBuoy,
  Mail,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import BlogFooter from "@/components/BlogFooter";
import BlogHeader from "@/components/BlogHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { plain, type Lang } from "@/data/plain";
import { usePageTitle } from "@/hooks/usePageTitle";

const castIcons: LucideIcon[] = [Brain, Users, Compass, Hand, Archive, BadgeCheck, LifeBuoy];
const LANG_KEY = "plain-words-lang";

const kicker = "font-mono text-xs uppercase tracking-[0.2em] text-primary";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const h2 = "mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "it") return saved;
  } catch {
    // storage can be unavailable; fall through to the browser language
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
}

const PlainWordsPage = () => {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = plain[lang];
  usePageTitle(t.kicker);

  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [lang]);

  const switchLang = () => {
    const next: Lang = lang === "en" ? "it" : "en";
    setLang(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      // not being able to remember the choice is harmless
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <BlogHeader />

      <main lang={lang}>
        <section className="px-4 pb-14 pt-14 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className={kicker}>{t.kicker}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">{t.headline}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t.lead}</p>
            <button
              type="button"
              onClick={switchLang}
              lang={lang === "en" ? "it" : "en"}
              className={`mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary ${focus}`}
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              {t.switchLabel}
            </button>
          </div>
        </section>

        <section aria-labelledby="cast" className="border-t border-border px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 id="cast" className={h2}>
              {t.castTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t.castIntro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.cast.map((c, i) => {
                const Icon = castIcons[i];
                return (
                  <li key={c.title} className="rounded-3xl border border-border bg-card p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-card-foreground">{c.title}</h3>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{c.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="journey" className="border-t border-border bg-card/40 px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 id="journey" className={h2}>
              {t.journeyTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.journeyIntro}</p>
            <ol className="mt-8 space-y-0">
              {t.journey.map((s, i) => (
                <li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
                  {i < t.journey.length - 1 && (
                    <span className="absolute left-4 top-9 h-[calc(100%-2.25rem)] w-px bg-border" aria-hidden="true" />
                  )}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="stories" className="border-t border-border px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 id="stories" className={h2}>
              {t.storiesTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t.storiesIntro}</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {t.stories.map((s) => (
                <article key={s.title} className="flex flex-col rounded-3xl border border-border bg-card p-5">
                  <h3 className="text-lg font-semibold leading-snug text-card-foreground">{s.title}</h3>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t.whatHappened}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.what}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-primary">{t.whatChanged}</p>
                  <p className="mt-1 text-sm leading-relaxed text-card-foreground">{s.fix}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="uses" className="border-t border-border bg-card/40 px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 id="uses" className={h2}>
              {t.usesTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t.usesIntro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {t.uses.map((u) => (
                <li key={u.title} className="rounded-3xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-card-foreground">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="company" className="border-t border-border px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 id="company" className={h2}>
              {t.companyTitle}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {t.company.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="words" className="border-t border-border bg-card/40 px-4 py-14 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <h2 id="words" className="text-2xl font-semibold tracking-tight text-foreground">
                {t.wordsTitle}
              </h2>
              <dl className="mt-6 space-y-4">
                {t.words.map((w) => (
                  <div key={w.term}>
                    <dt className="text-sm font-semibold text-foreground">{w.term}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.meaning}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.faqTitle}</h2>
              <div className="mt-6 space-y-3">
                {t.faq.map((f) => (
                  <details key={f.q} className="rounded-2xl border border-border bg-card p-4">
                    <summary className={`cursor-pointer text-sm font-semibold text-card-foreground ${focus}`}>{f.q}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="outro" className="border-t border-border px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="outro" className={h2}>
              {t.outroTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.outro}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <a
                href="mailto:juribuora@gmail.com?subject=Hello%20from%20your%20site"
                className={`inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:opacity-90 ${focus}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> {t.ctaContact}
              </a>
              <Link
                to="/what-im-doing"
                className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-foreground hover:bg-secondary ${focus}`}
              >
                {t.ctaDetail} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default PlainWordsPage;
