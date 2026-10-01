/**
 * Build-time sitemap generator.
 *
 * Reads the locally generated Jekyll manifest produced by
 * `scripts/sync-jekyll-content.mjs` and writes `dist/sitemap.xml` with entries
 * for the homepage, about page, and every mirrored post route.
 *
 * Renders route bodies from local data. Missing snapshots fail the build so
 * incomplete HTML cannot be published silently.
 */
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import { pathToFileURL } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { plainRoles } from "../src/data/plainRoles";
import { projects } from "../src/data/projects";

const SITE = "https://juribuora.com";
const MANIFEST_PATH = path.resolve("public/generated/manifest.json");

type Entry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

type ManifestEntry = { category: "blog" | "lab" | "portfolio" | "report"; day: number; date: string; title: string; summary?: string };

type GeneratedManifest = {
  posts: ManifestEntry[];
  labs: ManifestEntry[];
  portfolio?: ManifestEntry[];
  reports?: ManifestEntry[];
};

type RouteShell = {
  routePath: string;
  canonicalPath?: string;
  title: string;
  description: string;
  /** Share image path under the site root; defaults to the site-wide image. */
  image?: string;
};

const SHOWCASE_IMAGE = "/og-what-im-doing.png";

async function readManifestEntries(): Promise<Entry[]> {
  const raw = await readFile(MANIFEST_PATH, "utf8");
  const manifest = JSON.parse(raw) as GeneratedManifest;
  const mirroredPosts = [...manifest.posts, ...manifest.labs, ...(manifest.portfolio ?? []), ...(manifest.reports ?? [])];

  return mirroredPosts.map((post) => ({
    loc: `${SITE}/${post.category}/${post.day}`,
    lastmod: post.date,
    changefreq: "monthly",
    priority: 0.7,
  }));
}

async function readManifest(): Promise<GeneratedManifest> {
  const raw = await readFile(MANIFEST_PATH, "utf8");
  return JSON.parse(raw) as GeneratedManifest;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function injectRouteMeta(
  html: string,
  canonicalPath: string,
  title: string,
  description: string,
  image?: string,
): string {
  const url = `${SITE}${canonicalPath}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const withImage = image
    ? html
        .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${SITE}${image}" />`)
        .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${SITE}${image}" />`)
    : html;
  return withImage
    .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${safeDescription}" />`,
    )
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${safeTitle}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${safeDescription}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${safeTitle}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${safeDescription}" />`,
    );
}

async function generateRouteShells(outDir: string, manifest: GeneratedManifest): Promise<void> {
  const rootHtml = await readFile(path.join(outDir, "index.html"), "utf8");

  const routes: RouteShell[] = [
    { routePath: "/", title: "From Zero to Cybersecurity — Juri Buora",
      description: "A public, structured learning log documenting Juri Buora's journey from zero to cybersecurity — daily logs, hands-on labs, and honest notes." },
    {
      routePath: "/blog",
      title: "Blog Archive — Juri Buora",
      description: "Browse daily study logs, notes, and reflections from Juri Buora's cybersecurity journey.",
    },
    {
      routePath: "/Blog",
      canonicalPath: "/blog",
      title: "Blog Archive — Juri Buora",
      description: "Browse daily study logs, notes, and reflections from Juri Buora's cybersecurity journey.",
    },
    {
      routePath: "/labs",
      title: "Lab Archive — Juri Buora",
      description: "Browse hands-on labs, experiments, and technical practice notes from Juri Buora's cybersecurity journey.",
    },
    {
      routePath: "/Labs",
      canonicalPath: "/labs",
      title: "Lab Archive — Juri Buora",
      description: "Browse hands-on labs, experiments, and technical practice notes from Juri Buora's cybersecurity journey.",
    },
    {
      routePath: "/lab",
      canonicalPath: "/labs",
      title: "Lab Archive — Juri Buora",
      description: "Browse hands-on labs, experiments, and technical practice notes from Juri Buora's cybersecurity journey.",
    },
    {
      routePath: "/Lab",
      canonicalPath: "/labs",
      title: "Lab Archive — Juri Buora",
      description: "Browse hands-on labs, experiments, and technical practice notes from Juri Buora's cybersecurity journey.",
    },
    {
      routePath: "/about",
      title: "About — Juri Buora",
      description: "About Juri Buora and the public learning journey behind this cybersecurity log.",
    },
    {
      routePath: "/portfolio",
      title: "Portfolio — Juri Buora",
      description: "Selected cybersecurity work, labs, and engineering evidence from Juri Buora.",
    },
    {
      routePath: "/what-im-doing",
      title: "What I'm doing — Juri Buora",
      description: "Real projects in AI operations, security and client work, what each does for a team, and the numbers behind them.",
      image: SHOWCASE_IMAGE,
    },
    {
      routePath: "/in-plain-words",
      title: "In plain words — Juri Buora",
      description: "What I build with AI and security, explained without jargon, in English and Italian: who does what, what went wrong, and why it matters.",
      image: SHOWCASE_IMAGE,
    },
    {
      routePath: "/workstation",
      title: "The Workstation — Juri Buora",
      description: "A personal AI operations lab: local and cloud models, safety gates, and the case studies behind it. Built with AI pair-programming, reviewed by Juri Buora.",
      image: SHOWCASE_IMAGE,
    },
    ...plainRoles.en.map((role) => ({
      routePath: `/in-plain-words/${role.slug}`,
      title: `${role.title}, in plain words — Juri Buora`,
      description: role.oneLine,
      image: SHOWCASE_IMAGE,
    })),
    ...projects.map((project) => ({
      routePath: `/workstation/${project.slug}`,
      title: `${project.name} — Juri Buora`,
      description: project.tagline,
      image: SHOWCASE_IMAGE,
    })),
    ...manifest.posts.map((post) => ({
      routePath: `/${post.category}/${post.day}`,
      title: `${post.title} — Juri Buora`,
      description: `Read "${post.title}" on Juri Buora's mirrored cybersecurity learning log.`,
    })),
    ...manifest.labs.map((post) => ({
      routePath: `/${post.category}/${post.day}`,
      title: `${post.title} — Juri Buora`,
      description: `Read "${post.title}" on Juri Buora's mirrored cybersecurity learning log.`,
    })),
    ...[...(manifest.portfolio ?? []), ...(manifest.reports ?? [])].map((post) => ({
      routePath: `/${post.category}/${post.day}`,
      title: `${post.title} — Juri Buora`,
      description: post.summary || `Read "${post.title}", from Juri Buora's cybersecurity portfolio.`,
    })),
  ];

  // Bundle with production transforms: lazy pages are imported eagerly by the
  // entry, and asset URLs match the client build. Keep server-only code out of dist.
  const cacheDir = path.resolve("node_modules/.cache");
  await mkdir(cacheDir, { recursive: true });
  const serverDir = await mkdtemp(path.join(cacheDir, "prerender-"));
  try {
    await build({
      configFile: false,
      plugins: [react()],
      publicDir: false,
      logLevel: "warn",
      resolve: { alias: { "@": path.resolve("src") }, dedupe: ["react", "react-dom"] },
      build: { ssr: "src/prerender.tsx", outDir: serverDir, minify: false,
        rolldownOptions: { output: { entryFileNames: "prerender.js" } } },
    });
    const { renderRoute } = await import(pathToFileURL(path.join(serverDir, "prerender.js")).href) as {
      renderRoute: (location: string) => Promise<string>;
    };
    for (const route of routes) {
      const body = await renderRoute(route.routePath);
      if (!body.includes("<main") || !body.includes("<h1")) {
        throw new Error(`Route did not render its content: ${route.routePath}`);
      }
      const routeHtml = injectRouteMeta(
        rootHtml,
        route.canonicalPath ?? route.routePath,
        route.title,
        route.description,
        route.image,
      ).replace('<div id="root"></div>', () => `<div id="root" data-prerendered-path="${escapeHtml(route.routePath)}">${body}</div>`);
      if (routeHtml === rootHtml || !rootHtml.includes('<div id="root"></div>')) {
        throw new Error("Missing root placeholder in Vite HTML template");
      }
      const target = path.join(outDir, route.routePath.replace(/^\//, ""), "index.html");
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, routeHtml, "utf8");
    }
  } finally {
    await rm(serverDir, { recursive: true, force: true });
  }

  console.log(`[routes] Wrote ${routes.length} static route shells`);
}

function renderXml(entries: Entry[]): string {
  const head =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const body = entries
    .map((entry) => {
      const parts = [`    <loc>${entry.loc}</loc>`];
      if (entry.lastmod) parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      if (entry.changefreq) parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      if (entry.priority !== undefined) {
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `${head}${body}\n</urlset>\n`;
}

export async function generateSitemap(outDir: string): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const staticEntries: Entry[] = [
    { loc: `${SITE}/`, lastmod: today, changefreq: "weekly", priority: 1.0 },
    { loc: `${SITE}/blog`, lastmod: today, changefreq: "weekly", priority: 0.9 },
    { loc: `${SITE}/labs`, lastmod: today, changefreq: "weekly", priority: 0.9 },
    { loc: `${SITE}/about`, lastmod: today, changefreq: "monthly", priority: 0.8 },
    { loc: `${SITE}/portfolio`, lastmod: today, changefreq: "monthly", priority: 0.8 },
    { loc: `${SITE}/what-im-doing`, lastmod: today, changefreq: "monthly", priority: 0.9 },
    { loc: `${SITE}/in-plain-words`, lastmod: today, changefreq: "monthly", priority: 0.9 },
    { loc: `${SITE}/workstation`, lastmod: today, changefreq: "monthly", priority: 0.8 },
    ...plainRoles.en.map((r) => ({ loc: `${SITE}/in-plain-words/${r.slug}`, lastmod: today, changefreq: "monthly", priority: 0.7 })),
    ...projects.map((p) => ({ loc: `${SITE}/workstation/${p.slug}`, lastmod: today, changefreq: "monthly", priority: 0.6 })),
  ];

  // Missing or invalid snapshots must fail the build, rather than silently
  // publishing empty or incomplete route shells.
  const manifest = await readManifest();
  const mirroredEntries = await readManifestEntries();
  console.log(`[sitemap] Indexed ${mirroredEntries.length} mirrored post URLs`);

  const xml = renderXml([...staticEntries, ...mirroredEntries]);
  await mkdir(outDir, { recursive: true });
  const target = path.join(outDir, "sitemap.xml");
  await writeFile(target, xml, "utf8");

  if (manifest) {
    await generateRouteShells(outDir, manifest);
  }

  console.log(`[sitemap] Wrote ${target} (${staticEntries.length + mirroredEntries.length} URLs)`);
}

export function sitemapPlugin() {
  return {
    name: "generate-sitemap",
    apply: "build",
    async closeBundle() {
      await generateSitemap(path.resolve("dist"));
    },
  };
}
