import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { postForPath, validatePostContent } from "@/lib/initialPost";
import { postSnapshots } from "virtual:post-snapshots";
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
    // Import the snapshot bound to this build. The runtime JSON endpoint is
    // used by later SPA navigation, never as a gate for initial hydration.
    try {
      const snapshot = await postSnapshots[post.contentPath]();
      initialPostContent = validatePostContent(snapshot.default, post);
    } catch (error: unknown) {
      // A missing content chunk must not leave every control inactive. Fall
      // back to the ordinary SPA, whose post fetch already has an error view.
      console.error("Build post snapshot unavailable; using client rendering", error);
      createRoot(root).render(<App />);
      return;
    }
  }
  const app = <App initialPostContent={initialPostContent} />;
  if (canHydrate) hydrateRoot(root, app);
  else createRoot(root).render(app);
}

void start().catch((error: unknown) => {
  // Preserve readable prerendered content if its snapshot cannot be loaded.
  console.error("Could not load the build snapshot for hydration", error);
});
