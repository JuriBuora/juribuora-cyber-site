import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import ScrollToTop from "@/components/ScrollToTop";
import HeroSection from "@/components/HeroSection";
import ProgressTimeline from "@/components/ProgressTimeline";
import PostList from "@/components/PostList";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <BlogHeader />
      <main>
        <HeroSection />
        <ProgressTimeline />
        <AboutSection />
        <PostList />
      </main>
      <BlogFooter />
    </div>
  );
};

export default Index;
