import { getProjectBySlug } from "@/data/projects";
import { ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Project on connordibble.dev";
export const size = ogSize;
export const contentType = "image/png";

// Prerender alongside the page's generateStaticParams; the route would
// otherwise run in the Cloudflare Worker at request time.
export const dynamic = "force-static";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOgCard({
    variant: "project",
    kicker: project?.owner ? `Project · ${project.owner}` : "Project",
    title: project?.title ?? "Projects",
    subtitle: project?.detail?.headline ?? project?.description ?? "",
  });
}
