import Link from "next/link";
import { ProjectCard } from "./project-card";
import { SectionLabel } from "./section-label";
import { SectionMark } from "./section-mark";
import { homepageProjects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      className="container-wide site-section pt-10 pb-10 sm:pt-12 sm:pb-12"
    >
      <div>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <SectionLabel rule={false}>
              Selected work
            </SectionLabel>
            <p className="mt-5 max-w-2xl text-body-small leading-relaxed text-text-muted text-pretty">
              Three representative systems: enterprise platform scale,
              full-stack product depth, and open-source agent tooling with
              deterministic checks.
            </p>
          </div>
          <span className="hidden justify-self-end pt-1 sm:block">
            <SectionMark variant="asterisk" />
          </span>
          <Link
            href="/projects"
            className="arrow-link text-link inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150 sm:col-start-2 sm:justify-self-end"
          >
            <span>View all projects</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {homepageProjects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              prominence={index === 0 ? "featured" : "normal"}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
