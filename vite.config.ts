import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { sitemapPlugin } from "./scripts/generate-sitemap";
import { routePreviewPlugin } from "./scripts/route-preview";

// GitHub Pages cannot send custom response headers, so the content security policy is
// declared in the page. It is added to built output only: the dev server needs inline
// scripts for hot reload. frame-ancestors and X-Content-Type-Options have no meta form
// and stay unset until the site sits behind something that can send headers.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

const securityPolicyPlugin = (): Plugin => ({
  name: "content-security-policy",
  transformIndexHtml: (html) =>
    html.replace(
      '<meta name="referrer"',
      `<meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}" />\n    <meta name="referrer"`,
    ),
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    routePreviewPlugin(),
    mode !== "development" && securityPolicyPlugin(),
    mode !== "development" && sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
