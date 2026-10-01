import { describe, expect, it } from "vitest";
import { scrub, scrubRules } from "@/lib/scrub";
import dataSrc from "./workstation.ts?raw";
import projectsSrc from "./projects.ts?raw";
import pageSrc from "../pages/WorkstationPage.tsx?raw";
import projectPageSrc from "../pages/ProjectPage.tsx?raw";
import chartSrc from "../components/workstation/ActivityChart.tsx?raw";
import stackSrc from "../components/workstation/ArchitectureStack.tsx?raw";
import { caseStudies, stats, weeklyCommits, weeklyCommitsTotal } from "./workstation";
import { projectBySlug, projects, statusLabel } from "./projects";

describe("workstation page content", () => {
  it("weekly series sums to the headline commit total", () => {
    expect(weeklyCommits.reduce((n, w) => n + w.commits, 0)).toBe(weeklyCommitsTotal);
    expect(stats[0].value).toBe(weeklyCommitsTotal.toLocaleString("en-GB"));
  });

  it("every stat carries a source", () => {
    for (const s of stats) expect(s.source.length).toBeGreaterThan(10);
  });

  it("source files contain nothing private", () => {
    const files = { dataSrc, projectsSrc, pageSrc, projectPageSrc, chartSrc, stackSrc };
    for (const [name, text] of Object.entries(files)) {
      expect({ name, hits: scrub(text) }).toEqual({ name, hits: [] });
    }
  });

  it("scrubber catches planted private strings (positive control)", () => {
    const planted = [
      "host 192.168.1.20",
      "http://localhost:8123",
      "box.tail1234.ts.net",
      "token ghp_abcdefghijklmnopqrstuvwx",
      "-----BEGIN RSA PRIVATE KEY-----",
      "/Users/someone/Documents",
      "call +393401234567",
      "123@s.whatsapp.net",
      "id 7374750226",
      "Juri Personale",
      "Antonella",
      "the family group on WhatsApp",
      "someone@example.org",
    ];
    expect(planted.map((p) => scrub(p).length > 0)).toEqual(planted.map(() => true));
    const hit = new Set(planted.flatMap(scrub));
    for (const r of scrubRules) expect(hit.has(r.name)).toBe(true);
  });
});

describe("project pages", () => {
  it("slugs are unique and url-safe", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
  });

  it("every status is labelled and every project has substance", () => {
    for (const p of projects) {
      expect(statusLabel[p.status]).toBeTruthy();
      expect(p.why.length).toBeGreaterThan(0);
      expect(p.what.length).toBeGreaterThan(0);
      expect(p.outcome.length).toBeGreaterThan(0);
      expect(p.evidence.length).toBeGreaterThan(0);
      expect(p.learned.length).toBeGreaterThan(20);
    }
  });

  it("stopped projects say how to bring them back", () => {
    for (const p of projects.filter((p) => p.status === "retired" || p.status === "rejected")) {
      expect({ slug: p.slug, restore: Boolean(p.restore) }).toEqual({ slug: p.slug, restore: true });
    }
  });

  it("related links and case-study slugs resolve", () => {
    for (const p of projects) for (const r of p.related ?? []) expect(projectBySlug(r), `${p.slug} -> ${r}`).toBeDefined();
    for (const c of caseStudies) expect(projectBySlug(c.slug), c.slug).toBeDefined();
  });

  it("slugs cannot collide with top-level routes", () => {
    for (const p of projects) expect(["blog", "labs", "about", "portfolio"]).not.toContain(p.slug);
  });
});
