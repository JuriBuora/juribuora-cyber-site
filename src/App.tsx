import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageErrorBoundary from "@/components/PageErrorBoundary";
import RouteScrollReset from "@/components/RouteScrollReset";
import { lazyPage } from "@/lib/lazyPage";

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

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <BrowserRouter>
        <RouteScrollReset />
        <PageErrorBoundary>
          <Suspense
            fallback={
              <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-mono text-sm">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/what-im-doing" element={<WhatImDoingPage />} />
              <Route path="/in-plain-words" element={<PlainWordsPage />} />
              <Route path="/in-plain-words/:role" element={<PlainRolePage />} />
              <Route path="/workstation" element={<WorkstationPage />} />
              <Route path="/workstation/:slug" element={<ProjectPage />} />
              <Route path="/:collection" element={<CategoryPage />} />
              <Route path="/:category/:day" element={<PostPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
