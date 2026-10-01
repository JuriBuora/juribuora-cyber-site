import { existsSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/** Preview the actual shell for extensionless URLs, as GitHub Pages does. */
export function routePreviewPlugin(): Plugin {
  return {
    name: "static-route-preview",
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url ?? "/", "http://preview.local");
        const route = url.pathname.replace(/\/+$/, "");
        const shell = path.resolve(outDir, `.${route}`, "index.html");
        if (route && shell.startsWith(`${outDir}${path.sep}`) && existsSync(shell)) {
          request.url = `${route}/index.html${url.search}`;
        }
        next();
      });
    },
  };
}
