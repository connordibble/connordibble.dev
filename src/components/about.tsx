import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide pt-8 pb-12 sm:pt-12 sm:pb-20">
      <SectionLabel mark="rings">About</SectionLabel>
      <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
        I build the infrastructure that turns design decisions into production
        code. At State Farm, that means leading the Digital Experience platform
        and owning SFDS, the enterprise design system used by 1000+ engineers
        and designers across one of the largest insurance companies in the US.
        Outside that, I run Proceris, where I build productivity tooling and
        automations for partners across industries.
      </p>
    </section>
  );
}
