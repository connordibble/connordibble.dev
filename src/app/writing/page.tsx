import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SectionLabel } from "@/components/section-label";
import { WritingCard } from "@/components/writing-card";
import { getFeaturedWriting, writingPosts } from "@/data/writing";

export const metadata: Metadata = {
  title: "Writing — Connor Dibble",
  description:
    "Field notes and technical essays on platform decisions, design systems, and AI tooling.",
};

const featured = getFeaturedWriting();

export default function WritingPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="container-wide pt-20 pb-8 sm:pt-28 sm:pb-10">
          <Link
            href="/"
            className="text-link inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150"
          >
            <span aria-hidden>←</span>
            <span>Home</span>
          </Link>
          <h1 className="mt-6 text-[40px] font-semibold tracking-tight text-text text-pretty sm:text-display">
            Writing
          </h1>
          <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
            Field notes and technical essays on the decisions behind platform
            work: design systems, AI tooling, frontend architecture, and the
            tradeoffs that don&apos;t fit in a README.
          </p>
        </section>

        <section className="container-wide py-12 sm:py-16">
          <SectionLabel mark="asterisk">Featured</SectionLabel>
          <ul
            className={[
              "mt-8 grid grid-cols-1 gap-4",
              featured.length > 1 ? "md:grid-cols-2" : "",
            ].join(" ")}
          >
            {featured.map((post) => (
              <li key={post.slug}>
                <WritingCard post={post} />
              </li>
            ))}
          </ul>
        </section>

        <section className="container-wide pb-16 sm:pb-24">
          <SectionLabel mark="grid">All writing</SectionLabel>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {writingPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="text-link block py-6 transition-colors duration-150"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-section-title font-medium text-text text-pretty">
                      {post.title}
                    </h3>
                    <p className="shrink-0 font-mono text-caption text-text-subtle">
                      {post.displayDate} · {post.readTime}
                    </p>
                  </div>
                  <p className="mt-3 max-w-3xl text-body-small text-text-muted leading-relaxed text-pretty">
                    {post.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
