/// <reference types="node" />
// A returning Italian reader lands on a two-language page: the real built shell
// (English) must hydrate without being thrown away, then switch to Italian.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { act, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import type { HydrationOptions } from "react-dom/client";

const mounted = vi.hoisted(() => ({
  errors: [] as unknown[], root: undefined as import("react-dom/client").Root | undefined,
}));
vi.mock("react-dom/client", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-dom/client")>();
  return { ...original, hydrateRoot(container: Element, children: ReactNode, options?: HydrationOptions) {
    mounted.root = original.hydrateRoot(container, children, {
      ...options, onRecoverableError: (error) => mounted.errors.push(error),
    });
    return mounted.root;
  } };
});

const shell = join(process.cwd(), "dist/what-im-doing/index.html");
it.skipIf(!existsSync(shell))("hydrates the English shell for a saved Italian reader, then shows Italian", async () => {
  const template = document.createElement("template");
  template.innerHTML = readFileSync(shell, "utf8");
  document.body.appendChild(template.content.querySelector("#root")!);
  // What public/first-paint.js leaves behind for this reader.
  document.documentElement.className = "dark lang-pending";
  localStorage.setItem("plain-words-lang", "it");
  // GitHub Pages serves directory shells with a trailing slash.
  window.history.replaceState(null, "", "/what-im-doing/");
  vi.stubGlobal("IntersectionObserver", class {
    observe() {} unobserve() {} disconnect() {}
  });
  const serverMain = document.querySelector("#root main")!;
  expect(serverMain.querySelector("h1")?.textContent).toContain("I build AI");
  try {
    await act(async () => { await import("@/main"); });
    await waitFor(() => expect(document.querySelector("#root h1")?.textContent).toContain("Costruisco IA"));
    expect(mounted.root).toBeDefined();
    expect(mounted.errors).toEqual([]);
    // Same node: the prerendered page was adopted, not rebuilt from scratch.
    expect(document.querySelector("#root main")).toBe(serverMain);
    // The class and the lang attribute are set by effects, a moment after the text changes.
    await waitFor(() => expect(document.documentElement.classList.contains("lang-pending")).toBe(false));
    await waitFor(() => expect(document.documentElement.lang).toBe("it"));
  } finally {
    await act(async () => mounted.root?.unmount());
    document.body.innerHTML = "";
    document.documentElement.className = "";
    localStorage.clear();
    window.history.replaceState(null, "", "/");
    vi.unstubAllGlobals();
  }
}, 15_000);
