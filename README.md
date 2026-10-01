# Juri Buora Cybersecurity Learning Site

Public React/Vite site for [juribuora.com](https://juribuora.com/). It presents my cybersecurity learning log as a fast static site while keeping the original writing in the Jekyll source repo: [JuriBuora.github.io](https://github.com/JuriBuora/JuriBuora.github.io).

## What this project demonstrates

- React + Vite + TypeScript static-site build
- Route-level code splitting for faster first load
- Markdown post rendering with syntax highlighting
- Static JSON snapshots generated from the upstream Jekyll repo
- Sitemap and route shell generation for GitHub Pages
- GitHub Actions deployment to GitHub Pages
- Unit tests for route and date behavior

## How the content flow works

1. I write posts in `JuriBuora/JuriBuora.github.io`.
2. `scripts/sync-jekyll-content.mjs` reads the public GitHub tree and raw Markdown files.
3. The script writes a generated manifest and per-post JSON snapshots under `public/generated/`.
4. The React app reads those local snapshots, so the browser does not depend on the GitHub API.
5. GitHub Actions rebuilds the site on pushes and on a schedule.

## Showcase pages

- `/what-im-doing` is the short, outcome-first page. Content lives in `src/data/doing.ts`.
- `/workstation` is the archive, with one page per project under `/workstation/<slug>` from `src/data/projects.ts`, including projects that were stopped and why.
- These pages describe private projects, so `src/lib/scrub.ts` holds rules for what must never ship (addresses, hosts, tokens, names, private-life details). Tests run the rules over the source and, after a build, over `dist/`. CI runs them on every deploy.
- The share image and the one-page PDF are rendered from `scripts/assets/*.html` with `scripts/render-assets.sh` and committed under `public/`.

## Local development

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm run test
npm run build
npm audit
```

## Deployment

Deploys run through `.github/workflows/deploy.yml` and publish the generated `dist/` artifact to GitHub Pages.

The custom domain is configured through `public/CNAME`.

## Notes for reviewers

This is not meant to be a complex backend application. The point is to show that I can maintain a real public site, automate content ingestion, keep dependencies clean, test small pieces of behavior, and explain how the publishing flow works end to end.

## Static route rendering

Production builds render every route into its HTML shell, including the full Markdown body of each local post. `src/AppContent.tsx` owns the shared providers and routes; `src/App.tsx` supplies lazy browser pages and `src/prerender.tsx` supplies eager pages under `StaticRouter`. The sitemap plugin builds a temporary server renderer under `node_modules/.cache/`, reads post JSON from disk, writes the HTML bodies, and removes that renderer before finishing. Missing or invalid snapshots fail the build.

The browser hydrates a matching shell. For post URLs it resolves the post from the static manifest and lazily imports an external, content-hashed snapshot module generated from the same JSON used by prerendering; other SPA navigations retain the existing post fetch. A failed runtime JSON endpoint cannot block initial hydration, the theme toggle, or the menu. There is no inline state script. Dark theme and English are the initial render defaults; saved preferences are restored after mount with a transition so they cannot interrupt lazy hydration. If the snapshot module itself cannot load, the app falls back to ordinary client rendering and its runtime post fetch. Controls remain active; if both content sources fail, the existing post error view replaces the static article. Route and application JavaScript assets are still required for interactivity.

`public/first-paint.js` runs before the first paint (a file, not inline, so the content security policy needs no exception). It applies a saved light theme to `<html>` straight away, and for Italian readers adds `lang-pending`, which hides the English text of the two-language pages (`<main data-bilingual>`) until `usePlainLang` has switched them, so nobody watches the page change language. The script removes that class itself after four seconds if the app never starts; readers without JavaScript never run it and get the English HTML. Pages opened by in-app navigation start in the saved language at once: `ClientReadyProvider` marks everything after the landing page as free to read preferences during render, which the landing page must not do while it hydrates.

`vite preview` serves the generated shell for extensionless route URLs. Its preview-only middleware leaves unknown routes to the existing SPA fallback. The GitHub Pages 404 redirect remains unchanged; a restored URL that differs from the rendered shell uses client rendering.

`npm run build && npm test` exercises all generated shells, post bodies, CSP, the existing privacy scrub, and preference hydration with an unresolved lazy page. A build is required for the artifact tests; they are skipped when `dist/` is absent.

01-10-2026 19:42

Snapshot modules remain lazy: only the current post module loads at startup. Tests boot the real app against a built shell with runtime JSON unavailable and compare every emitted snapshot module with its source JSON. The extra import index adds about 4.4 kB gzip to the entry chunk; post bodies stay in separate chunks.

01-10-2026 20:24
