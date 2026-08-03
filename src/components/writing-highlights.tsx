import Link from "next/link";
import { SectionLabel } from "./section-label";
import { SectionMark } from "./section-mark";
import { WritingRow } from "./writing-row";
import { getFeaturedWriting } from "@/data/writing";

export function WritingHighlights() {
  const featured = getFeaturedWriting();

  return (
    <section
      id="writing"
      className="container-wide site-section pt-8 pb-8 sm:pt-10 sm:pb-10"
    >
      <div>
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <SectionLabel rule={false}>Writing</SectionLabel>
          </div>
          <span className="hidden justify-self-end pt-1 sm:block">
            <SectionMark variant="grid" />
          </span>
          <p className="max-w-2xl text-body-small leading-relaxed text-text-muted text-pretty">
            Notes on frontend platforms, design systems, and AI-assisted
            development.
          </p>
          <Link
            href="/writing"
            className="arrow-link text-link inline-flex items-center gap-1.5 self-start whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150 sm:justify-self-end sm:pt-0.5"
          >
            <span>All writing</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {featured.map((post) => (
          <li key={post.slug}>
            <WritingRow post={post} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}
