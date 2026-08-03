import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  prominence?: "normal" | "featured";
};

function getCardClass(prominence: ProjectCardProps["prominence"]) {
  return [
    "project-card-link surface-link relative flex h-full flex-col rounded-md border border-border bg-panel p-5",
    prominence === "featured"
      ? "project-card-featured min-h-[17rem] sm:p-6"
      : "min-h-[15rem]",
  ].join(" ");
}

function CardBody({ project, prominence }: ProjectCardProps) {
  const { title, owner, description, tags, externalUrl, socialCard } = project;
  const visibleTags = tags.slice(0, prominence === "featured" ? 4 : 3);
  const arrowClass =
    "project-card-link-arrow pointer-events-none absolute right-5 top-5 font-mono text-caption text-text-muted opacity-0 transition-[color,opacity,transform] duration-200";

  return (
    <>
      {socialCard.imagePath ? (
        <div className="project-card-art relative mb-5 overflow-hidden rounded-sm border border-border-strong bg-canvas">
          <Image
            src={socialCard.imagePath}
            width={1200}
            height={630}
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 20vw"
            alt={`${title} project identity card`}
            className="h-auto w-full"
          />
        </div>
      ) : null}
      <span aria-hidden className={arrowClass}>
        {externalUrl ? (
          <span className="block origin-center -rotate-45">→</span>
        ) : (
          "→"
        )}
      </span>
      <header className="min-w-0 pr-6">
        <p className="project-card-signal font-mono text-caption text-text-subtle">
          {prominence === "featured" ? "Platform lead" : "Selected work"}
        </p>
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
      <ol
        className="project-process"
        aria-label={`${project.title} delivery sequence`}
      >
        {socialCard.steps.map((step, index) => (
          <li
            key={step}
            className="project-process-step font-mono text-caption"
            data-active={socialCard.activeStep === index ? "true" : undefined}
            aria-current={socialCard.activeStep === index ? "step" : undefined}
          >
            {step}
          </li>
        ))}
      </ol>
      <p className="project-card-description mt-3 text-body-small leading-relaxed text-text-muted text-pretty">
        {description}
      </p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {visibleTags.map((tag) => (
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
