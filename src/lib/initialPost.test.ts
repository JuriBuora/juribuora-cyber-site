import { describe, expect, it } from "vitest";
import { postForPath, validatePostContent } from "./initialPost";
import type { PostContentPayload } from "@/data/posts";

describe("initial local post content", () => {
  it("resolves all four post categories, aliases and trailing slashes", () => {
    for (const route of ["/blog/243", "/lab/1", "/portfolio/1", "/report/1", "/Blog/243/"]) {
      expect(postForPath(route), route).toBeDefined();
    }
    for (const route of ["/", "/blog", "/blog/243/extra", "/blog/999999", "/unknown/1"]) {
      expect(postForPath(route), route).toBeUndefined();
    }
  });
  it("rejects wrong identities and missing bodies before rendering or hydrating", () => {
    const post = postForPath("/blog/243")!;
    const payload = { ...post, content: "A real body" } as PostContentPayload;
    expect(validatePostContent(payload, post)).toBe(payload);
    for (const invalid of [{ ...payload, category: "lab" as const }, { ...payload, day: 1 },
      { ...payload, content: " " }, { ...payload, content: undefined }]) {
      expect(() => validatePostContent(invalid, post)).toThrow("Invalid local post snapshot");
    }
  });
});
