import Link from "next/link";
import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide site-section pt-10 pb-8 sm:pt-12 sm:pb-10">
      <SectionLabel mark="rings" rule={false}>About</SectionLabel>
      <div className="mt-8 max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <p className="text-body leading-relaxed text-text">
            At State Farm, I set frontend direction across 8 product teams and
            50+ engineers. SFDS is the shared platform for 100+ product teams
            and 1,000+ engineers and designers.
          </p>
          <p className="text-body text-text-muted leading-relaxed text-pretty">
            I build the tools and standards other teams inherit: components,
            documentation, release checks, and AI-assisted workflows. Open
            source and Proceris keep me close to product discovery and
            implementation.
          </p>
        </div>
        <Link
          href="/about"
          className="arrow-link text-link mt-5 inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
        >
          <span>More about me</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
