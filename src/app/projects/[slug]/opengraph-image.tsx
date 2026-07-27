import { getDetailProjects, getProjectBySlug } from "@/data/projects";
import { ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Project on connordibble.dev";
export const size = ogSize;
export const contentType = "image/png";

// Metadata image routes do not inherit static params from a sibling page.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getDetailProjects().map((project) => ({ slug: project.slug }));
}

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
    title: project?.socialCard.title ?? project?.title ?? "Projects",
    subtitle: project?.socialCard.summary ?? project?.description ?? "",
    projectSteps: project?.socialCard.steps,
    activeStep: project?.socialCard.activeStep,
  });
}
