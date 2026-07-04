import Link from "next/link";
import { ProjectCard } from "./project-card";
import { SectionLabel } from "./section-label";
import { projects } from "@/data/projects";

const featured = projects.slice(0, 4);

export function Projects() {
  return (
    <section id="projects" className="container-wide site-section pt-10 pb-14 sm:pt-12 sm:pb-20">
      <SectionLabel mark="asterisk">Selected work</SectionLabel>
      <p className="mt-5 max-w-2xl text-body-small leading-relaxed text-text-muted text-pretty">
        A small index of platform, design-system, developer tooling, and AI
        product work. Open-source projects link out; closed-source work keeps
        the implementation story on site.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        {featured.map((project, index) => (
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
      <div className="mt-6 flex justify-end">
        <Link
          href="/projects"
          className="arrow-link text-link inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
        >
          <span>View all projects</span>
          <span aria-hidden>
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
