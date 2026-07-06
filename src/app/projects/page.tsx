import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import { projectIndexProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Connor Dibble",
  description:
    "Enterprise platform, design-system, open-source agent tooling, and AI product work from Connor Dibble.",
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
            Enterprise platform, design-system, open-source agent tooling, and
            AI product work. The first projects carry the clearest scale and
            architecture signal; the rest show range across product, tooling,
            and applied AI.
          </p>
        </section>

        <section className="container-wide pb-16 sm:pb-24">
          <SectionLabel mark="asterisk">Work index</SectionLabel>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {projectIndexProjects.map((project, index) => (
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
