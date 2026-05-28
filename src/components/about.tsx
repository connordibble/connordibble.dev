import { SectionLabel } from "./section-label";

export function About() {
  return (
    <section id="about" className="container-wide pt-8 pb-10 sm:pt-10 sm:pb-14">
      <SectionLabel mark="rings">About</SectionLabel>
      <p className="mt-6 max-w-3xl text-body text-text-muted leading-relaxed text-pretty">
        I build the infrastructure that turns design decisions into production
        code. At State Farm, that means leading the Digital Experience platform
        and owning SFDS, the enterprise design system used by 1000+ engineers
        and designers across one of the largest insurance companies in the US.
        Outside work, I build small AI products through Proceris, focused on
        productivity tooling and workflow automation.
      </p>
    </section>
  );
}
