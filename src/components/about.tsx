import Link from "next/link";
import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide pt-8 pb-10 sm:pt-10 sm:pb-14">
      <SectionLabel mark="rings">About</SectionLabel>
      <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
        In practice that means component APIs, GraphQL/REST contracts,
        design-token pipelines, Figma-to-code tooling, and the governance that
        keeps large frontend orgs aligned. At State Farm, I lead the
        statefarm.com Digital Experience platform across customer and
        agent-facing surfaces and steward SFDS, the enterprise design system
        used by 1000+ engineers and designers. Outside work, I build focused AI
        products through Proceris around R&D documentation and workflow
        automation for small teams.
      </p>
      <Link
        href="/about"
        className="arrow-link text-link mt-5 inline-flex items-center gap-1.5 font-mono text-caption text-text-muted transition-colors duration-150"
      >
        <span>More about me</span>
        <span aria-hidden>
          →
        </span>
      </Link>
    </section>
  );
}
