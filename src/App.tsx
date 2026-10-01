import { BrowserRouter } from "react-router-dom";
import { AppContent } from "./AppContent";
import { lazyPage } from "@/lib/lazyPage";
import type { PostContentPayload } from "@/data/posts";

const Index = lazyPage(() => import("./pages/Index.tsx"));
const PostPage = lazyPage(() => import("./pages/PostPage.tsx"));
const AboutPage = lazyPage(() => import("./pages/AboutPage.tsx"));
const CategoryPage = lazyPage(() => import("./pages/CategoryPage.tsx"));
const PortfolioPage = lazyPage(() => import("./pages/PortfolioPage.tsx"));
const WorkstationPage = lazyPage(() => import("./pages/WorkstationPage.tsx"));
const ProjectPage = lazyPage(() => import("./pages/ProjectPage.tsx"));
const WhatImDoingPage = lazyPage(() => import("./pages/WhatImDoingPage.tsx"));
const PlainWordsPage = lazyPage(() => import("./pages/PlainWordsPage.tsx"));
const PlainRolePage = lazyPage(() => import("./pages/PlainRolePage.tsx"));
const NotFound = lazyPage(() => import("./pages/NotFound.tsx"));

const lazyPages = { Index, PostPage, AboutPage, CategoryPage, PortfolioPage, WorkstationPage,
  ProjectPage, WhatImDoingPage, PlainWordsPage, PlainRolePage, NotFound };

const App = ({ initialPostContent }: { initialPostContent?: PostContentPayload }) => (
  <BrowserRouter><AppContent pages={lazyPages} initialPostContent={initialPostContent} /></BrowserRouter>
);

export default App;
