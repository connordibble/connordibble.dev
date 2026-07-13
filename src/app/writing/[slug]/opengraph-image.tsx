import { getWritingPostBySlug } from "@/data/writing";
import { ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Essay on connordibble.dev";
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
  const post = getWritingPostBySlug(slug);
  return renderOgCard({
    variant: "essay",
    kicker: post ? `Essay · ${post.readTime}` : "Essay",
    title: post?.title ?? "Writing",
    subtitle: post?.subtitle ?? "",
  });
}
