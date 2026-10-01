import { describe, expect, it } from "vitest";
import { scrub, scrubRules } from "@/lib/scrub";
import dataSrc from "./workstation.ts?raw";
import projectsSrc from "./projects.ts?raw";
import pageSrc from "../pages/WorkstationPage.tsx?raw";
import projectPageSrc from "../pages/ProjectPage.tsx?raw";
import doingSrc from "./doing.ts?raw";
import doingPageSrc from "../pages/WhatImDoingPage.tsx?raw";
import visualsSrc from "../components/doing/Visuals.tsx?raw";
import plainSrc from "./plain.ts?raw";
import plainPageSrc from "../pages/PlainWordsPage.tsx?raw";
import ogSrc from "../../scripts/assets/og.html?raw";
import onePagerSrc from "../../scripts/assets/one-pager.html?raw";
import chartSrc from "../components/workstation/ActivityChart.tsx?raw";
import stackSrc from "../components/workstation/ArchitectureStack.tsx?raw";
import { caseStudies, stats, weeklyCommits, weeklyCommitsTotal } from "./workstation";
import { projectBySlug, projects, statusLabel } from "./projects";
import { chapters } from "./doing";
import { plain } from "./plain";

describe("workstation page content", () => {
  it("weekly series sums to the headline commit total", () => {
    expect(weeklyCommits.reduce((n, w) => n + w.commits, 0)).toBe(weeklyCommitsTotal);
    expect(stats[0].value).toBe(weeklyCommitsTotal.toLocaleString("en-GB"));
  });

  it("the PDF and share image repeat the same headline numbers as the pages", () => {
    for (const n of ["1,364", "34", "243"]) {
      expect(ogSrc).toContain(n);
      expect(onePagerSrc).toContain(n);
    }
  });

  it("every stat carries a source", () => {
    for (const s of stats) expect(s.source.length).toBeGreaterThan(10);
  });

  it("source files contain nothing private", () => {
    const files = { dataSrc, projectsSrc, pageSrc, projectPageSrc, chartSrc, stackSrc, doingSrc, doingPageSrc, visualsSrc, ogSrc, onePagerSrc, plainSrc, plainPageSrc };
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
      "the family group chat",
      "someone@example.org",
    ];
    expect(planted.map((p) => scrub(p).length > 0)).toEqual(planted.map(() => true));
    const hit = new Set(planted.flatMap(scrub));
    for (const r of scrubRules) expect(hit.has(r.name)).toBe(true);
  });
});

describe("plain-words page", () => {
  it("English and Italian carry the same points", () => {
    const shape = (c: (typeof plain)["en"]) =>
      [c.cast, c.journey, c.stories, c.uses, c.company, c.words, c.faq].map((list) => list.length);
    expect(shape(plain.it)).toEqual(shape(plain.en));
    expect(Object.keys(plain.it).sort()).toEqual(Object.keys(plain.en).sort());
  });

  it("has one icon per cast member", () => {
    expect(plain.en.cast.length).toBe(7);
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

  it("every what-im-doing chapter links to a real project page", () => {
    for (const c of chapters) expect(projectBySlug(c.slug), c.slug).toBeDefined();
  });

  it("every mockup says it is illustrative or sourced", () => {
    const labels = visualsSrc.match(/Illustrative example|Real numbers from|Real deliverables|paraphrased|Simplified diagram/g) ?? [];
    const mockups = visualsSrc.match(/export const \w+Mock/g) ?? [];
    expect(mockups.length).toBe(6);
    expect(labels.length).toBeGreaterThanOrEqual(mockups.length);
  });

  it("slugs cannot collide with top-level routes", () => {
    for (const p of projects) expect(["blog", "labs", "about", "portfolio"]).not.toContain(p.slug);
  });
});
