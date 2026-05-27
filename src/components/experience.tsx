import { SectionLabel } from "./section-label";

type Role = {
  title: string;
  company: string;
  dates: string;
  description: string;
};

const roles: Role[] = [
  {
    title: "Senior Technology Engineer — Digital Experience",
    company: "State Farm",
    dates: "Mar 2026 – Present",
    description:
      "Promoted to set technical direction across the statefarm.com Digital Experience product suite, spanning 8 product teams and 40–50 engineers. Driving executive-backed 100% SFDS adoption. Built an AI design-to-code pipeline using Figma MCP and deterministic agent hooks that compressed Figma-to-Web-Component implementation from two weeks to one day. Built a GitLab webhook AI compliance agent that shifts design system governance left.",
  },
  {
    title: "Lead Software Engineer — State Farm Design System (SFDS)",
    company: "State Farm",
    dates: "May 2023 – Mar 2026",
    description:
      "Led engineering for SFDS, State Farm's canonical enterprise design system, earning C-suite buy-in as the target platform for statefarm.com migration. Architected sf-ui, a framework-agnostic component library on Lit/Web Components with 70+ components. Built a Figma Variables → W3C design token plugin in TypeScript. Own npm publishing, CDN distribution, documentation, and release governance.",
  },
  {
    title: "Software Engineer — Drive Safe & Save Telematics",
    company: "State Farm",
    dates: "May 2020 – May 2023",
    description:
      "Built Node.js APIs on AWS Lambda and Java Spring backend services for telematics Drive Safe & Save enrollment experiences on statefarm.com.  Led product suite frontend direction, building React apps, components, and micro-frontends.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="container-wide py-16 sm:py-24">
      <SectionLabel mark="ticks">Experience</SectionLabel>
      <ol className="mt-8 flex max-w-3xl flex-col gap-12">
        {roles.map((role) => (
          <li key={role.title}>
            <h3 className="text-section-title font-medium text-text">
              {role.title}
            </h3>
            <p className="mt-1 font-mono text-caption text-text-muted">
              {role.company} · {role.dates}
            </p>
            <p className="mt-4 text-body text-text-muted leading-relaxed text-pretty">
              {role.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
