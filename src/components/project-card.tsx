import type { ComponentPropsWithoutRef } from "react";

export type Project = {
  title: string;
  owner?: string;
  description: string;
  tags: string[];
  href?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const { title, owner, description, tags, href } = project;

  const cardClass = [
    "group relative block h-full bg-panel border border-border rounded-md p-6",
    "transition-colors duration-150 ease-out",
    href ? "hover:bg-panel-raised hover:border-border-strong" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {href ? (
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-5 font-mono text-caption text-text-muted opacity-0 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent"
        >
          ↗
        </span>
      ) : null}
      <header className="pr-6">
        <h3 className="text-section-title font-medium text-text">{title}</h3>
        {owner ? (
          <p className="mt-1 font-mono text-caption text-text-subtle">
            {owner}
          </p>
        ) : null}
      </header>
      <p className="mt-3 text-body text-text-muted leading-relaxed">
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

  if (href) {
    const external = href.startsWith("http");
    const linkProps: ComponentPropsWithoutRef<"a"> = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a href={href} className={cardClass} {...linkProps}>
        {inner}
      </a>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}
