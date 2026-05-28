import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SectionLabel } from "@/components/section-label";
import { getDetailProjects, getProjectBySlug } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getDetailProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.detail) {
    return { title: "Project not found" };
  }
  return {
    title: `${project.title} — Connor Dibble`,
    description: project.detail.headline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.detail) {
    notFound();
  }

  const { title, owner, tags, detail } = project;

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <article className="container-wide pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Link
            href="/projects#projects-top"
            className="text-link inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150"
          >
            <span aria-hidden>←</span>
            <span>All projects</span>
          </Link>

          <header className="mt-6">
            <SectionLabel mark="asterisk">Project</SectionLabel>
            <h1 className="mt-4 text-[40px] sm:text-display font-semibold tracking-tight text-text text-pretty">
              {title}
            </h1>
            {owner ? (
              <p className="mt-2 font-mono text-caption text-text-subtle">
                {owner}
              </p>
            ) : null}
            <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
              {detail.headline}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-caption text-text-muted bg-panel border border-border rounded-xs px-2 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-12 max-w-3xl space-y-10">
            {detail.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
                  {section.heading}
                </h2>
                <p className="mt-3 text-body text-text-muted leading-relaxed text-pretty">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/projects#projects-top"
              className="text-link inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150"
            >
              <span aria-hidden>←</span>
              <span>All projects</span>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
