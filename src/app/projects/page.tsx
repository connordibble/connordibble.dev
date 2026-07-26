import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import { projectIndexProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects | Connor Dibble",
  description:
    "Enterprise developer platforms, governed agent workflows, public tooling, and applied AI systems from Connor Dibble.",
  path: "/projects",
});

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
            Enterprise developer platforms, governed agent workflows, public
            tooling, and applied AI systems. The largest systems show technical
            direction and adoption at organizational scale. The public builds
            make the same context, validation, and operating boundaries visible
            in code.
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
