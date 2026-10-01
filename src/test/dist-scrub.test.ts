/// <reference types="node" />
// Scans the BUILT workstation output (what visitors actually receive) for private strings.
// Skipped when dist/ does not exist; run `npm run build` first to exercise it.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { scrub } from "@/lib/scrub";

const DIST = join(process.cwd(), "dist");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe.skipIf(!existsSync(DIST))("built workstation output", () => {
  it("contains nothing private, in route shells or page chunks", () => {
    // Every prerendered showcase page: the text is now in the HTML itself.
    // The synced posts under /portfolio/N, /blog and so on are public writing and are not scanned.
    const shells = [
      ...["workstation", "in-plain-words"].flatMap((dir) => walk(join(DIST, dir))),
      ...["what-im-doing", "about", "portfolio"].map((dir) => join(DIST, dir, "index.html")),
    ].filter((f) => f.endsWith(".html"));
    const chunks = walk(join(DIST, "assets")).filter(
      // The showcase data, not the synced blog manifest: public posts may name tools freely.
      (f) => f.endsWith(".js") && readFileSync(f, "utf8").includes("mcp-profile-launcher"),
    );
    expect(shells.length).toBeGreaterThan(30);
    expect(shells.some((f) => f.includes("in-plain-words/brains"))).toBe(true);
    expect(chunks.length).toBeGreaterThan(0); // positive control: the scanner found the page data
    for (const f of [...shells, ...chunks]) {
      expect({ f, hits: scrub(readFileSync(f, "utf8")) }).toEqual({ f, hits: [] });
    }
  });
});
