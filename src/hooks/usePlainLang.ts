import { startTransition, useEffect, useState } from "react";
import type { Lang } from "@/data/plain";

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
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const timer = window.setTimeout(() => startTransition(() => setLang(initialLang())), 0);
    return () => window.clearTimeout(timer);
  }, []);

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
