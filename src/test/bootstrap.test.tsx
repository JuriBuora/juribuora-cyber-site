/// <reference types="node" />
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import type { HydrationOptions } from "react-dom/client";

// Clipboard buttons mount independent React roots; their teardown is outside this
// bootstrap test. Real-browser checks exercise the unmocked hook and TOC.
vi.mock("@/hooks/useCodeCopyButtons", () => ({ default: () => {} }));

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

const shell = join(process.cwd(), "dist/blog/243/index.html");
it.skipIf(!existsSync(shell))("hydrates a real post shell and activates controls even when runtime JSON is unavailable", async () => {
  const template = document.createElement("template");
  template.innerHTML = readFileSync(shell, "utf8");
  document.body.appendChild(template.content.querySelector("#root")!);
  document.documentElement.className = "dark";
  window.history.replaceState(null, "", "/blog/243");
  const unavailableFetch = vi.fn().mockRejectedValue(new Error("JSON endpoint unavailable"));
  vi.stubGlobal("fetch", unavailableFetch);
  vi.stubGlobal("IntersectionObserver", class {
    observe() {} unobserve() {} disconnect() {}
  });
  try {
    await act(async () => { await import("@/main"); });
    // SSR buttons already exist before React is ready. Heading IDs are added by
    // the mounted TOC effect, so this checks actual hydration before interaction.
    await waitFor(() => expect(document.querySelector(".prose h1")?.id).toBe("heading-0"));
    const themeButton = document.querySelector<HTMLButtonElement>('[aria-label="Toggle theme"]')!;
    expect(mounted.root).toBeDefined();
    fireEvent.click(themeButton);
    await waitFor(() => expect(document.documentElement.classList.contains("light")).toBe(true));
    fireEvent.click(document.querySelector<HTMLButtonElement>('[aria-label="Open menu"]')!);
    await waitFor(() => expect(document.querySelector("#mobile-nav")).not.toBeNull());
    expect(document.querySelector(".prose")?.textContent).toContain("I worked on a local Resolver");
    expect(unavailableFetch).not.toHaveBeenCalled();
    expect(mounted.errors).toEqual([]);
  } finally {
    await act(async () => mounted.root?.unmount());
    document.body.innerHTML = "";
    window.history.replaceState(null, "", "/");
    vi.unstubAllGlobals();
  }
}, 15_000);
