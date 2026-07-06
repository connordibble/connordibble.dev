import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SectionLabel } from "@/components/section-label";
import { WritingCard } from "@/components/writing-card";
import { WritingContact } from "@/components/writing-contact";
import { WritingIndex } from "@/components/writing-index";
import { WritingRow } from "@/components/writing-row";
import { getFeaturedWriting, writingPosts } from "@/data/writing";
import { toIndexPost, type WritingIndexPost } from "@/lib/writing-index";

export const metadata: Metadata = {
  title: "Writing | Connor Dibble",
  description:
    "Field notes and technical essays on platform decisions, design systems, and AI tooling.",
};

const featured = getFeaturedWriting();

// Lean rows for the interactive index; essay bodies stay out of the payload.
const indexPosts: WritingIndexPost[] = writingPosts.map(toIndexPost);

/**
 * Prerendered fallback for the Suspense boundary around the interactive
 * index (which reads search params and therefore renders client-side). It
 * keeps every essay row in the initial HTML for crawlers and no-JS readers.
 */
function WritingListFallback() {
  return (
    <ul className="mt-8 divide-y divide-border border-y border-border">
      {indexPosts.map((post) => (
        <li key={post.slug}>
          <WritingRow post={post} />
        </li>
      ))}
    </ul>
  );
}

export default function WritingPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="container-wide pt-32 pb-10 sm:pt-36 sm:pb-14">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Writing" }]}
          />
          <h1 className="mt-6 max-w-3xl text-[3rem] font-semibold leading-[1.02] text-text text-pretty sm:text-[4.25rem]">
            Writing
          </h1>
          <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
            Field notes and technical essays on the decisions behind platform
            work: design systems, AI tooling, frontend architecture, and the
            tradeoffs that don&apos;t fit in a README.
          </p>
        </section>

        <section className="container-wide py-14 sm:py-20">
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
          <Suspense fallback={<WritingListFallback />}>
            <WritingIndex posts={indexPosts} />
          </Suspense>
          <WritingContact className="mt-12" />
        </section>
      </main>
      <Footer />
    </>
  );
}
