import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Connor Dibble",
  description:
    "Design-system, design-tooling, frontend platform, and AI product work at State Farm and Proceris.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section
          id="projects-top"
          className="container-wide pt-32 pb-10 sm:pt-36 sm:pb-14"
        >
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
          />
          <h1 className="mt-6 max-w-3xl text-[3rem] font-semibold leading-[1.02] text-text text-pretty sm:text-[4.25rem]">
            Projects
          </h1>
          <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
            Design-system, design-tooling, frontend platform, and AI product
            work from State Farm and Proceris. Open-source projects link to
            source; closed-source projects link to a write-up.
          </p>
        </section>

        <section className="container-wide pb-16 sm:pb-24">
          <SectionLabel mark="asterisk">Work index</SectionLabel>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {projects.map((project, index) => (
              <li
                key={project.slug}
                className={
                  index === 0
                    ? "lg:col-span-7"
                    : index === 1
                      ? "lg:col-span-5"
                      : "lg:col-span-6"
                }
              >
                <ProjectCard
                  project={project}
                  prominence={index === 0 ? "featured" : "normal"}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
