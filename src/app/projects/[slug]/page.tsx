import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Breadcrumbs } from "@/components/breadcrumbs";
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
    title: `${project.title} | Connor Dibble`,
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

  const { title, owner, tags, detail, repoUrl, links } = project;

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <article className="container-wide pt-32 pb-16 sm:pt-36 sm:pb-24">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: title },
            ]}
          />

          <header className="mt-6">
            <SectionLabel as="p" mark="asterisk">
              Project
            </SectionLabel>
            <h1 className="mt-4 max-w-4xl text-[3rem] font-semibold leading-[1.02] text-text text-pretty sm:text-[4.25rem]">
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
                  className="tag-token px-2 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
            {repoUrl || links?.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {repoUrl ? (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-link surface-link inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text"
                  >
                    <span>GitHub source</span>
                    <span aria-hidden className="block origin-center -rotate-45">
                      →
                    </span>
                  </a>
                ) : null}
                {links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-link surface-link inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-sm border border-border bg-panel px-4 py-2 font-mono text-caption text-text"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden className="block origin-center -rotate-45">
                      →
                    </span>
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          <div className="mt-12 max-w-3xl space-y-10">
            {detail.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-section-title font-medium text-text">
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
              href="/projects"
              className="text-link inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
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
