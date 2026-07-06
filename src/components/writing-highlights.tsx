import Link from "next/link";
import { SectionLabel } from "./section-label";
import { SectionMark } from "./section-mark";
import { WritingCard } from "./writing-card";
import { getFeaturedWriting } from "@/data/writing";

export function WritingHighlights() {
  const featured = getFeaturedWriting();

  return (
    <section
      id="writing"
      className="container-wide site-section pt-10 pb-10 sm:pt-12 sm:pb-12"
    >
      <div>
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <SectionLabel rule={false}>Decisions written down</SectionLabel>
            <p className="mt-5 max-w-2xl text-body-small leading-relaxed text-text-muted text-pretty">
              Essays on the platform work, argued in full, from migration bets
              to where model output ends and product truth begins.
            </p>
          </div>
          <span className="hidden justify-self-end pt-1 sm:block">
            <SectionMark variant="grid" />
          </span>
          <Link
            href="/writing"
            className="arrow-link text-link inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150 sm:col-start-2 sm:justify-self-end"
          >
            <span>All writing</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {featured.map((post) => (
          <li key={post.slug}>
            <WritingCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
