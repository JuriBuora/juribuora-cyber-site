import { Suspense, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageErrorBoundary from "@/components/PageErrorBoundary";
import RouteScrollReset from "@/components/RouteScrollReset";
import type { PostContentPayload } from "@/data/posts";

type PageName = "Index" | "AboutPage" | "CategoryPage" | "PortfolioPage" | "WorkstationPage"
  | "ProjectPage" | "WhatImDoingPage" | "PlainWordsPage" | "PlainRolePage" | "NotFound";
type PageComponents = Record<PageName, ComponentType> & {
  PostPage: ComponentType<{ initialContent?: PostContentPayload }>;
};

export const AppContent = ({ pages, initialPostContent }: {
  pages: PageComponents;
  initialPostContent?: PostContentPayload;
}) => {
  const { Index, PostPage, AboutPage, CategoryPage, PortfolioPage, WorkstationPage,
    ProjectPage, WhatImDoingPage, PlainWordsPage, PlainRolePage, NotFound } = pages;
  return (
    <ThemeProvider>
      <TooltipProvider>
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
              <Route path="/:category/:day" element={<PostPage initialContent={initialPostContent} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  );
};
