import { startTransition, useEffect, useState } from "react";
import { ThemeContext, type Theme } from "@/hooks/use-theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Server and first browser render must agree, even with a saved light theme.
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      startTransition(() => {
        try {
          const saved = localStorage.getItem("theme");
          if (saved === "light" || saved === "dark") setTheme(saved);
        } catch { /* Storage may be disabled. */ }
        setReady(true);
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    try { localStorage.setItem("theme", theme); } catch { /* Keep the toggle usable. */ }
  }, [theme, ready]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
