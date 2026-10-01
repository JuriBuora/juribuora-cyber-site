import { describe, expect, it } from "vitest";
import { shouldReloadForStaleBuild } from "./lazyPage";

describe("shouldReloadForStaleBuild", () => {
  const now = 1_000_000;

  it("reloads the first time a page fails to load", () => {
    expect(shouldReloadForStaleBuild(now, null)).toBe(true);
  });

  it("does not reload again straight after a reload, so it cannot loop", () => {
    expect(shouldReloadForStaleBuild(now, String(now - 2_000))).toBe(false);
  });

  it("reloads again for a later, unrelated deploy", () => {
    expect(shouldReloadForStaleBuild(now, String(now - 60_000))).toBe(true);
  });

  it("treats a corrupt stored value as no previous reload", () => {
    expect(shouldReloadForStaleBuild(now, "not-a-number")).toBe(true);
  });
});
