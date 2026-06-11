import { getProjectBySlug } from "@/data/projects";
import { getWritingPostBySlug, type RelatedRef } from "@/data/writing";

export type RelatedItem = {
  eyebrow: string;
  title: string;
  blurb: string;
  href: string;
  external: boolean;
};

/**
 * Resolve related references (essays or projects) into renderable cards.
 * Unknown slugs are dropped so a stale reference can never break a page.
 */
export function resolveRelated(refs: RelatedRef[] | undefined): RelatedItem[] {
  if (!refs) return [];

  return refs.flatMap((ref): RelatedItem[] => {
    if (ref.kind === "writing") {
      const post = getWritingPostBySlug(ref.slug);
      if (!post) return [];
      return [
        {
          eyebrow: "Essay",
          title: post.title,
          blurb: post.summary,
          href: `/writing/${post.slug}`,
          external: false,
        },
      ];
    }

    const project = getProjectBySlug(ref.slug);
    if (!project) return [];

    // Projects with a detail page link internally; source-only projects link out.
    if (project.detail) {
      return [
        {
          eyebrow: "Project",
          title: project.title,
          blurb: project.description,
          href: `/projects/${project.slug}`,
          external: false,
        },
      ];
    }
    if (project.externalUrl) {
      return [
        {
          eyebrow: "Project",
          title: project.title,
          blurb: project.description,
          href: project.externalUrl,
          external: true,
        },
      ];
    }
    return [];
  });
}
