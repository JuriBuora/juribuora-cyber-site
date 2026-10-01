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
import doingItSrc from "./doingIt.ts?raw";
import plainRolesSrc from "./plainRoles.ts?raw";
import plainRoleMoreSrc from "./plainRoleMore.ts?raw";
import plainRolePageSrc from "../pages/PlainRolePage.tsx?raw";
import plainPageSrc from "../pages/PlainWordsPage.tsx?raw";
import ogSrc from "../../scripts/assets/og.html?raw";
import onePagerSrc from "../../scripts/assets/one-pager.html?raw";
import chartSrc from "../components/workstation/ActivityChart.tsx?raw";
import stackSrc from "../components/workstation/ArchitectureStack.tsx?raw";
import { caseStudies, stats, weeklyCommits, weeklyCommitsTotal } from "./workstation";
import { projectBySlug, projects, statusLabel } from "./projects";
import { chapters, roles } from "./doing";
import { chaptersIt, doingUi, rolesIt } from "./doingIt";
import { plain } from "./plain";
import { plainRoles, plainRoleSlugs } from "./plainRoles";
import { roleMore } from "./plainRoleMore";
import { jekyllSnapshot } from "./jekyllSnapshot.generated";

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
    const files = { dataSrc, projectsSrc, pageSrc, projectPageSrc, chartSrc, stackSrc, doingSrc, doingPageSrc, visualsSrc, ogSrc, onePagerSrc, plainSrc, plainPageSrc, plainRolesSrc, plainRolePageSrc, doingItSrc, plainRoleMoreSrc };
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

describe("what-im-doing in Italian", () => {
  it("translates every chapter with the same shape", () => {
    for (const c of chapters) {
      const tr = chaptersIt[c.id];
      expect(tr, c.id).toBeDefined();
      expect(tr.benefits.length).toBe(c.benefits.length);
      expect(tr.proof.length).toBe(c.proof.length);
      expect(tr.reading?.length ?? 0).toBe(c.reading?.length ?? 0);
    }
    expect(Object.keys(chaptersIt).length).toBe(chapters.length);
    expect(rolesIt.length).toBe(roles.length);
    expect(Object.keys(doingUi.it).sort()).toEqual(Object.keys(doingUi.en).sort());
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

  it("has a detail page for every role, in both languages, in the same order", () => {
    expect(plainRoles.en.length).toBe(plain.en.cast.length);
    expect(plainRoles.it.map((r) => r.slug)).toEqual(plainRoleSlugs);
    plainRoles.en.forEach((role, i) => {
      expect(role.title).toBe(plain.en.cast[i].title);
      expect(plainRoles.it[i].title).toBe(plain.it.cast[i].title);
      expect(plainRoles.it[i].items.length).toBe(role.items.length);
      expect(plainRoles.it[i].lessons.length).toBe(role.lessons.length);
    });
  });

  it("has the story behind every card, with the same shape in both languages", () => {
    expect(Object.keys(roleMore.en).sort()).toEqual([...plainRoleSlugs].sort());
    expect(Object.keys(roleMore.it).sort()).toEqual([...plainRoleSlugs].sort());
    for (const role of plainRoles.en) {
      const en = roleMore.en[role.slug];
      const it = roleMore.it[role.slug];
      expect(en.length, role.slug).toBe(role.items.length);
      expect(it.length, role.slug).toBe(role.items.length);
      en.forEach((item, i) => {
        const where = `${role.slug} #${i + 1}`;
        expect(item.text.length, where).toBeGreaterThan(0);
        expect(it[i].text.length, where).toBe(item.text.length);
        expect(it[i].facts?.length ?? 0, where).toBe(item.facts?.length ?? 0);
        expect(!!it[i].aside, where).toBe(!!item.aside);
        expect(it[i].link?.to, where).toBe(item.link?.to);
        // Numbers are written the Italian way in Italian, but must be the same numbers.
        const digits = (v: string) => v.replace(/[^0-9]/g, "");
        item.facts?.forEach((fact, k) => expect(digits(it[i].facts![k].value), where).toBe(digits(fact.value)));
      });
    }
  });

  it("links every story to a page that exists", () => {
    const routes = new Set([
      "/workstation",
      ...projects.map((p) => `/workstation/${p.slug}`),
      ...jekyllSnapshot.reports.map((r) => `/report/${r.day}`),
      ...jekyllSnapshot.posts.map((r) => `/blog/${r.day}`),
    ]);
    const links = Object.values(roleMore.en).flat().flatMap((item) => (item.link ? [item.link.to] : []));
    expect(links.length).toBeGreaterThan(10);
    for (const to of links) expect(routes.has(to), to).toBe(true);
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
    const mockups = visualsSrc.match(/export const \w+Mock/g) ?? [];
    expect(mockups.length).toBe(6);
    // one caption per mockup, in each language, and every mockup renders one
    expect((visualsSrc.match(/illustrative: "|caption: "/g) ?? []).length).toBe(mockups.length * 2);
    expect((visualsSrc.match(/<Caption>/g) ?? []).length).toBe(mockups.length);
  });

  it("slugs cannot collide with top-level routes", () => {
    for (const p of projects) expect(["blog", "labs", "about", "portfolio"]).not.toContain(p.slug);
  });
});
