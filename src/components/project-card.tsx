import Link from "next/link";
import type { Project } from "@/data/projects";

const cardClass = [
  "group relative block h-full bg-panel border border-border rounded-md p-6",
  "transition-colors duration-150 ease-out",
  "hover:bg-panel-raised hover:border-border-strong",
].join(" ");

function CardBody({ project }: { project: Project }) {
  const { title, owner, description, tags, externalUrl } = project;
  const arrow = externalUrl ? "↗" : "→";

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 font-mono text-caption text-text-muted opacity-0 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent"
      >
        {arrow}
      </span>
      <header className="pr-6">
        <h3 className="text-section-title font-medium text-text">{title}</h3>
        {owner ? (
          <p className="mt-1 font-mono text-caption text-text-subtle">
            {owner}
          </p>
        ) : null}
      </header>
      <p className="mt-3 text-body text-text-muted leading-relaxed text-pretty">
        {description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="font-mono text-caption text-text-muted bg-canvas border border-border rounded-xs px-2 py-1"
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  if (project.externalUrl) {
    return (
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        <CardBody project={project} />
      </a>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`} className={cardClass}>
      <CardBody project={project} />
    </Link>
  );
}
