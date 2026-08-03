import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { PrototypePlatformTrace } from "@/components/prototype-platform-trace";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { WritingHighlights } from "@/components/writing-highlights";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { pageMetadata, siteDescription, siteTitle } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteTitle,
  description: siteDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Hero />
        <PrototypePlatformTrace />
        <Projects />
        <Experience />
        <WritingHighlights />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
