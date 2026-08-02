import Link from "next/link";
import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide site-section pt-10 pb-8 sm:pt-12 sm:pb-10">
      <SectionLabel mark="rings" rule={false}>
        Systems that hold together
      </SectionLabel>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-5">
          <p className="max-w-[32rem] text-body leading-relaxed text-text">
            At State Farm, I work as a Senior Software Engineer and Digital
            Experience Platform Lead. My official internal title is Senior
            Technology Engineer. I set technical direction across the
            statefarm.com Digital Experience suite: 8 product teams and 50+
            engineers. SFDS reaches beyond that area as the standard migration
            path for more than 100 product teams, carrying shared architecture,
            documentation, release policy, and supported paths to 1000+
            engineers and designers. I work with design, product, platform, and
            mobile partners to keep shared principles coherent while leaving
            room for channel-specific constraints.
          </p>
          <p className="max-w-[34rem] text-body text-text-muted leading-relaxed text-pretty">
            The useful work sits between product architecture, system contracts,
            delivery infrastructure, and the teams or agents that inherit both.
            I like problems that cross frontend architecture, design systems,
            platform migration, reliability, and the operating model required
            to make shared systems last.
          </p>
          <Link
            href="/about"
            className="arrow-link text-link inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-caption text-text-muted transition-colors duration-150"
          >
            <span>More about me</span>
            <span aria-hidden>
              →
            </span>
          </Link>
        </div>
        <p className="max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
          My path here runs through Node.js and Java services, event-driven
          systems, frontend architecture, release governance, and applied AI.
          I increasingly work at the boundary between frontend platform
          engineering and AI-assisted development: live context, portable
          skills, deterministic checks, and human review. Through Proceris and
          open source, I stay close to the full product loop: customer
          conversations, technical discovery, implementation, and the checks
          that keep the correct path explicit and reviewable.
        </p>
      </div>
    </section>
  );
}
