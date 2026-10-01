/// <reference types="node" />
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { ReactNode } from "react";

vi.mock("@/hooks/useCodeCopyButtons", () => ({ default: () => {} }));
vi.mock("virtual:post-snapshots", () => ({ postSnapshots: {
  "/generated/posts/blog/243.json": () => Promise.reject(new Error("Snapshot chunk unavailable")),
} }));
const mounted = vi.hoisted(() => ({ root: undefined as import("react-dom/client").Root | undefined }));
vi.mock("react-dom/client", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-dom/client")>();
  return { ...original, createRoot(container: Element) {
    mounted.root = original.createRoot(container);
    return mounted.root;
  } };
});
const shell = join(process.cwd(), "dist/blog/243/index.html");
it.skipIf(!existsSync(shell))("keeps controls active if both the build snapshot and runtime JSON fail", async () => {
  const template = document.createElement("template");
  template.innerHTML = readFileSync(shell, "utf8");
  document.body.appendChild(template.content.querySelector("#root")!);
  document.documentElement.className = "dark";
  window.history.replaceState(null, "", "/blog/243");
  const fetch = vi.fn().mockRejectedValue(new Error("Runtime JSON unavailable"));
  vi.stubGlobal("fetch", fetch);
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    await act(async () => { await import("@/main"); });
    await waitFor(() => expect(document.body.textContent).toContain("This post snapshot could not be loaded locally."));
    fireEvent.click(document.querySelector<HTMLButtonElement>('[aria-label="Toggle theme"]')!);
    await waitFor(() => expect(document.documentElement.classList.contains("light")).toBe(true));
    fireEvent.click(document.querySelector<HTMLButtonElement>('[aria-label="Open menu"]')!);
    await waitFor(() => expect(document.querySelector("#mobile-nav")).not.toBeNull());
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledExactlyOnceWith(
      "Build post snapshot unavailable; using client rendering", expect.any(Error),
    );
  } finally {
    await act(async () => mounted.root?.unmount());
    document.body.innerHTML = "";
    window.history.replaceState(null, "", "/");
    vi.unstubAllGlobals();
    error.mockRestore();
  }
}, 15_000);
