import { startTransition, useEffect, useState } from "react";
import type { Lang } from "@/data/plain";
import { useClientReady } from "@/lib/clientReady";

const LANG_KEY = "plain-words-lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "it") return saved;
  } catch {
    // storage can be unavailable; fall through to the browser language
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
}

/** The reader's language for the plain-words pages: remembered, else taken from the browser. */
export function usePlainLang(): [Lang, () => void] {
  // The prerendered HTML is English, so hydration must start in English too.
  // After that, pages opened by in-app navigation start in the right language.
  const ready = useClientReady();
  const [lang, setLang] = useState<Lang>(() => (ready ? initialLang() : "en"));
  const [resolved, setResolved] = useState(ready);

  useEffect(() => {
    if (resolved) return;
    const timer = window.setTimeout(() => startTransition(() => {
      setLang(initialLang());
      setResolved(true);
    }), 0);
    return () => window.clearTimeout(timer);
  }, [resolved]);

  // public/first-paint.js hides the English text for Italian readers; show the
  // page again once it is in their language.
  useEffect(() => {
    if (resolved) document.documentElement.classList.remove("lang-pending");
  }, [resolved]);

  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [lang]);

  const toggle = () => {
    const next: Lang = lang === "en" ? "it" : "en";
    setLang(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      // not being able to remember the choice is harmless
    }
  };

  return [lang, toggle];
}
