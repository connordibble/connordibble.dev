import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RelatedReading } from "@/components/related-reading";
import { SectionLabel } from "@/components/section-label";
import { WritingContact } from "@/components/writing-contact";
import { WritingFigure } from "@/components/writing-figures";
import {
  getWritingPostBySlug,
  writingPosts,
  type InlineLink,
  type WritingBlock,
} from "@/data/writing";
import { resolveRelated } from "@/lib/related";
import { absoluteUrl, articleMetadata, serializeJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return writingPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPostBySlug(slug);
  if (!post) {
    return { title: "Writing not found" };
  }
  return articleMetadata({
    title: `${post.title} | Connor Dibble`,
    description: post.summary,
    path: `/writing/${post.slug}`,
    publishedTime: post.date,
    tags: post.topics,
  });
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getWritingPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const articleUrl = absoluteUrl(`/writing/${post.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: absoluteUrl("/opengraph-image"),
    author: {
      "@id": absoluteUrl("/#person"),
    },
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    keywords: post.topics,
    inLanguage: "en-US",
  };

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <article className="container-wide pt-32 pb-16 sm:pt-36 sm:pb-24">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(articleJsonLd),
            }}
          />
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Writing", href: "/writing" },
              { label: post.title },
            ]}
          />

          <header className="mt-6 max-w-3xl">
            <SectionLabel as="p" mark="asterisk">
              Essay
            </SectionLabel>
            <p className="mt-5 font-mono text-caption text-text-subtle">
              {post.displayDate} · {post.readTime}
            </p>
            <h1 className="mt-4 max-w-4xl text-[3rem] font-semibold leading-[1.02] text-text text-pretty sm:text-[4.25rem]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[65ch] text-body text-text-muted leading-relaxed text-pretty">
              {post.subtitle}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.topics.map((topic) => (
                <li
                  key={topic}
                  className="tag-token px-2 py-1"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-14 max-w-3xl space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="max-w-[65ch] text-section-title font-medium text-text">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-5">
                  {section.blocks.map((block, index) => (
                    <WritingBlockView key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <RelatedReading items={resolveRelated(post.related)} />
          <WritingContact essayTitle={post.title} className="mt-12" />
        </article>
      </main>
      <Footer />
    </>
  );
}

function renderText(text: string, links?: InlineLink[]) {
  if (!links || links.length === 0) return text;

  // Map each link to its first occurrence, then stitch the text back together
  // with anchors at those (non-overlapping) ranges, earliest first.
  const ranges = links
    .map((link) => ({ ...link, start: text.indexOf(link.text) }))
    .filter((range) => range.start !== -1)
    .sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start < cursor) return; // skip overlap
    if (range.start > cursor) nodes.push(text.slice(cursor, range.start));

    const label = text.slice(range.start, range.start + range.text.length);
    nodes.push(
      range.href.startsWith("/") ? (
        <Link key={index} href={range.href} className="essay-link">
          {label}
        </Link>
      ) : (
        <a
          key={index}
          href={range.href}
          target="_blank"
          rel="noopener noreferrer"
          className="essay-link"
        >
          {label}
        </a>
      ),
    );
    cursor = range.start + range.text.length;
  });

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function WritingBlockView({ block }: { block: WritingBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="max-w-[65ch] text-body text-text-muted leading-relaxed text-pretty">
        {renderText(block.text, block.links)}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="max-w-[65ch] space-y-3 pl-5 text-body text-text-muted leading-relaxed">
        {block.items.map((item) => (
          <li key={item} className="list-disc marker:text-border-strong">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "figure") {
    return <WritingFigure variant={block.variant} caption={block.caption} />;
  }

  return (
    <pre className="overflow-x-auto rounded-md border border-code-border bg-code-bg p-4 text-code text-text-muted">
      <code>{block.code}</code>
    </pre>
  );
}
