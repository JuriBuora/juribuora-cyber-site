import { describe, expect, it } from "vitest";
import { collectionLabel, collectionPath, entryLabel, normalizeCollectionSlug } from "@/lib/contentRoutes";

describe("normalizeCollectionSlug", () => {
  it("accepts blog aliases", () => {
    expect(normalizeCollectionSlug("blog")).toBe("blog");
    expect(normalizeCollectionSlug("Blog")).toBe("blog");
    expect(normalizeCollectionSlug("blogs")).toBe("blog");
  });

  it("accepts lab aliases", () => {
    expect(normalizeCollectionSlug("lab")).toBe("lab");
    expect(normalizeCollectionSlug("Lab")).toBe("lab");
    expect(normalizeCollectionSlug("Labs")).toBe("lab");
  });

  it("accepts the portfolio collection", () => {
    expect(normalizeCollectionSlug("portfolio")).toBe("portfolio");
    expect(normalizeCollectionSlug("Portfolio")).toBe("portfolio");
  });

  it("rejects unknown slugs", () => {
    expect(normalizeCollectionSlug("notes")).toBeNull();
    expect(normalizeCollectionSlug(undefined)).toBeNull();
  });
});

describe("collection helpers", () => {
  it("returns stable labels and canonical paths", () => {
    expect(collectionPath("blog")).toBe("/blog");
    expect(collectionPath("lab")).toBe("/labs");
    expect(collectionLabel("blog")).toBe("Blog");
    expect(collectionLabel("lab")).toBe("Labs");
    expect(collectionPath("portfolio")).toBe("/portfolio");
    expect(entryLabel("blog", 7)).toBe("Day 07");
    expect(entryLabel("lab", 34)).toBe("Lab 34");
    expect(entryLabel("portfolio", 9)).toBe("Case study 09");
  });
});
