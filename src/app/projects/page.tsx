import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Connor Dibble",
  description:
    "Selected work across design systems, AI tooling, and platform engineering.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="container-wide pt-20 pb-8 sm:pt-28 sm:pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150 hover:text-accent"
          >
            <span aria-hidden>←</span>
            <span>Home</span>
          </Link>
          <h1 className="mt-6 text-[40px] sm:text-display font-semibold tracking-tight text-text text-pretty">
            Projects
          </h1>
          <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
            Selected work across design systems, AI tooling, and platform
            engineering. Open-source projects link to source; closed-source
            projects link to a write-up.
          </p>
        </section>

        <section className="container-wide pb-16 sm:pb-24">
          <SectionLabel mark="asterisk">All work</SectionLabel>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
