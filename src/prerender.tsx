import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppContent } from "./AppContent";
import { postForPath, validatePostContent } from "./lib/initialPost";
import Index from "./pages/Index";
import PostPage from "./pages/PostPage";
import AboutPage from "./pages/AboutPage";
import CategoryPage from "./pages/CategoryPage";
import PortfolioPage from "./pages/PortfolioPage";
import WorkstationPage from "./pages/WorkstationPage";
import ProjectPage from "./pages/ProjectPage";
import WhatImDoingPage from "./pages/WhatImDoingPage";
import PlainWordsPage from "./pages/PlainWordsPage";
import PlainRolePage from "./pages/PlainRolePage";
import NotFound from "./pages/NotFound";

const pages = { Index, PostPage, AboutPage, CategoryPage, PortfolioPage, WorkstationPage,
  ProjectPage, WhatImDoingPage, PlainWordsPage, PlainRolePage, NotFound };

export async function renderRoute(location: string): Promise<string> {
  const post = postForPath(location);
  const initialPostContent = post
    ? validatePostContent(JSON.parse(await readFile(path.resolve("public", `.${post.contentPath}`), "utf8")), post)
    : undefined;
  return renderToString(
    <StaticRouter location={location}>
      <AppContent pages={pages} initialPostContent={initialPostContent} />
    </StaticRouter>,
  );
}
