import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RelatedReading } from "@/components/related-reading";
import { SectionLabel } from "@/components/section-label";
import { WritingFigure } from "@/components/writing-figures";
import {
  getWritingPostBySlug,
  writingPosts,
  type InlineLink,
  type WritingBlock,
} from "@/data/writing";
import { resolveRelated } from "@/lib/related";

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
  return {
    title: `${post.title} — Connor Dibble`,
    description: post.summary,
    openGraph: {
      title: `${post.title} — Connor Dibble`,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
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

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <article className="container-wide pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Writing", href: "/writing" },
              { label: post.title },
            ]}
          />

          <header className="mt-6 max-w-3xl">
            <SectionLabel mark="asterisk">Essay</SectionLabel>
            <p className="mt-5 font-mono text-caption text-text-subtle">
              {post.displayDate} · {post.readTime}
            </p>
            <h1 className="mt-4 text-[40px] font-semibold tracking-tight text-text text-pretty sm:text-display">
              {post.title}
            </h1>
            <p className="mt-6 text-body text-text-muted leading-relaxed text-pretty">
              {post.subtitle}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-xs border border-border bg-panel px-2 py-1 font-mono text-caption text-text-muted"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-14 max-w-3xl space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
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
      <p className="text-body text-text-muted leading-relaxed text-pretty">
        {renderText(block.text, block.links)}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-3 pl-5 text-body text-text-muted leading-relaxed">
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
