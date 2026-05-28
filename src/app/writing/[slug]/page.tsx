import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SectionLabel } from "@/components/section-label";
import {
  getWritingPostBySlug,
  writingPosts,
  type WritingBlock,
} from "@/data/writing";

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
          <Link
            href="/writing"
            className="text-link inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150"
          >
            <span aria-hidden>←</span>
            <span>Writing</span>
          </Link>

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
        </article>
      </main>
      <Footer />
    </>
  );
}

function WritingBlockView({ block }: { block: WritingBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-body text-text-muted leading-relaxed text-pretty">
        {block.text}
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

  return (
    <pre className="overflow-x-auto rounded-md border border-code-border bg-code-bg p-4 text-code text-text-muted">
      <code>{block.code}</code>
    </pre>
  );
}
