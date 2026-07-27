import { getWritingPostBySlug, writingPosts } from "@/data/writing";
import { ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Essay on connordibble.dev";
export const size = ogSize;
export const contentType = "image/png";

// Metadata image routes do not inherit static params from a sibling page.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return writingPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWritingPostBySlug(slug);
  return renderOgCard({
    variant: "essay",
    kicker: post ? `Essay · ${post.readTime}` : "Essay",
    title: post?.title ?? "Writing",
    subtitle: post?.socialCardSubtitle ?? post?.subtitle ?? "",
    essayLabel: post?.socialCardLabel,
  });
}
