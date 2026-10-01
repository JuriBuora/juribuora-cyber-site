import { lazy, Suspense } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { act, waitFor } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "@/hooks/use-theme";
import { usePlainLang } from "@/hooks/usePlainLang";
import { ClientReadyContext } from "@/lib/clientReady";

function ThemeLabel() {
  const { theme } = useTheme();
  return <span>{theme}</span>;
}
function LanguageLabel() {
  const [lang] = usePlainLang();
  return <span>{lang}</span>;
}

afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("lang-pending");
});

it("restores a saved theme without interrupting a still-lazy hydration boundary", async () => {
  localStorage.setItem("theme", "light");
  const container = document.createElement("div");
  container.innerHTML = renderToString(<ThemeProvider><Suspense><ThemeLabel /></Suspense></ThemeProvider>);
  expect(container.textContent).toBe("dark");
  document.body.appendChild(container);
  let resolvePage!: (page: { default: typeof ThemeLabel }) => void;
  const LazyLabel = lazy(() => new Promise<{ default: typeof ThemeLabel }>((resolve) => { resolvePage = resolve; }));
  const errors: unknown[] = [];
  let root!: Root;
  try {
    await act(async () => {
      root = hydrateRoot(container, <ThemeProvider><Suspense><LazyLabel /></Suspense></ThemeProvider>, {
        onRecoverableError: (error) => errors.push(error),
      });
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
    await act(async () => { resolvePage({ default: ThemeLabel }); });
    await waitFor(() => expect(container.textContent).toBe("light"));
    expect(errors).toEqual([]);
    expect(document.documentElement.classList.contains("light")).toBe(true);
  } finally {
    await act(async () => root?.unmount());
    container.remove();
  }
});

it("renders English first and restores saved Italian after hydration", async () => {
  localStorage.setItem("plain-words-lang", "it");
  const container = document.createElement("div");
  container.innerHTML = renderToString(<LanguageLabel />);
  expect(container.textContent).toBe("en");
  document.body.appendChild(container);
  const errors: unknown[] = [];
  let root!: Root;
  try {
    await act(async () => {
      root = hydrateRoot(container, <LanguageLabel />, { onRecoverableError: (error) => errors.push(error) });
    });
    await waitFor(() => expect(container.textContent).toBe("it"));
    expect(errors).toEqual([]);
  } finally {
    await act(async () => root?.unmount());
    container.remove();
  }
});

it("shows the page again once a held-back Italian reader has their language", async () => {
  localStorage.setItem("plain-words-lang", "it");
  document.documentElement.classList.add("lang-pending");
  const container = document.createElement("div");
  container.innerHTML = renderToString(<LanguageLabel />);
  document.body.appendChild(container);
  let root!: Root;
  try {
    await act(async () => { root = hydrateRoot(container, <LanguageLabel />); });
    // Still English straight after hydration, so the text must stay hidden.
    expect(container.textContent).toBe("en");
    expect(document.documentElement.classList.contains("lang-pending")).toBe(true);
    await waitFor(() => expect(container.textContent).toBe("it"));
    expect(document.documentElement.classList.contains("lang-pending")).toBe(false);
  } finally {
    await act(async () => root?.unmount());
    container.remove();
  }
});

it("starts in the saved language on pages opened after the app is running", () => {
  localStorage.setItem("plain-words-lang", "it");
  expect(renderToString(<LanguageLabel />)).toContain("en");
  expect(renderToString(
    <ClientReadyContext.Provider value={true}><LanguageLabel /></ClientReadyContext.Provider>,
  )).toContain("it");
});
