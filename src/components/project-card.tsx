import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  prominence?: "normal" | "featured";
};

function getCardClass(prominence: ProjectCardProps["prominence"]) {
  return [
    "project-card-link surface-link relative flex h-full flex-col rounded-md border border-border bg-panel p-6",
    prominence === "featured" ? "min-h-[16rem] sm:p-7" : "min-h-[14rem]",
  ].join(" ");
}

function CardBody({ project, prominence }: ProjectCardProps) {
  const { title, owner, description, tags, externalUrl } = project;
  const arrowClass =
    "project-card-link-arrow pointer-events-none absolute right-5 top-5 font-mono text-caption text-text-muted opacity-0 transition-[color,opacity,transform] duration-200";

  return (
    <>
      <span aria-hidden className={arrowClass}>
        {externalUrl ? (
          <span className="block origin-center -rotate-45">→</span>
        ) : (
          "→"
        )}
      </span>
      <header className="min-w-0 pr-6">
        <h3
          className={[
            "project-card-title w-full max-w-none font-medium text-section-title text-text",
            prominence === "featured" ? "sm:text-[1.5rem]" : "",
          ].join(" ")}
        >
          {title}
        </h3>
        {owner ? (
          <p className="mt-1 font-mono text-caption text-text-subtle">
            {owner}
          </p>
        ) : null}
      </header>
      <p
        className={[
          "mt-3 text-text-muted leading-relaxed text-pretty",
          prominence === "featured" ? "max-w-2xl text-body" : "text-body-small",
        ].join(" ")}
      >
        {description}
      </p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="tag-token px-2 py-1"
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}

export function ProjectCard({ project, prominence = "normal" }: ProjectCardProps) {
  const cardClass = getCardClass(prominence);

  if (project.externalUrl) {
    return (
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        <CardBody project={project} prominence={prominence} />
      </a>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`} className={cardClass}>
      <CardBody project={project} prominence={prominence} />
    </Link>
  );
}
