import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { postForPath, validatePostContent } from "@/lib/initialPost";
import type { PostContentPayload } from "@/data/posts";
import "./index.css";

async function start() {
  const root = document.getElementById("root")!;
  // The GitHub Pages 404 redirect restores a different URL over the homepage
  // shell. Hydrate only the route this HTML was actually rendered for.
  const renderedPath = root.getAttribute("data-prerendered-path");
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const canHydrate = root.hasChildNodes() && renderedPath?.toLowerCase() === currentPath.toLowerCase();
  let initialPostContent: PostContentPayload | undefined;
  const post = postForPath(window.location.pathname);
  if (post && canHydrate) {
    // Fetch the existing external JSON before hydrating so the first tree includes
    // the same body as the build render. No executable or JSON inline script.
    const response = await fetch(post.contentPath);
    if (!response.ok) throw new Error(`Content request failed with ${response.status}`);
    initialPostContent = validatePostContent(await response.json(), post);
  }
  const app = <App initialPostContent={initialPostContent} />;
  if (canHydrate) hydrateRoot(root, app);
  else createRoot(root).render(app);
}

void start().catch((error: unknown) => {
  // Preserve readable prerendered content if its snapshot cannot be loaded.
  console.error("Could not hydrate the local post snapshot", error);
});
