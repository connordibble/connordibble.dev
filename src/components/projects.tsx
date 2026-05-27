import Link from "next/link";
import { ProjectCard } from "./project-card";
import { SectionLabel } from "./section-label";
import { projects } from "@/data/projects";

const featured = projects.slice(0, 4);

export function Projects() {
  return (
    <section id="projects" className="container-wide py-12 sm:py-16">
      <SectionLabel mark="asterisk">Projects</SectionLabel>
      <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150 hover:text-accent"
        >
          <span>View all projects</span>
          <span
            aria-hidden
            className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
