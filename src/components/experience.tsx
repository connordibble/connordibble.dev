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
      "Set technical direction across the statefarm.com Digital Experience suite: 8 product teams, 40–50 engineers, and an executive-backed migration toward 100% SFDS adoption. Built an AI design-to-code pipeline on Figma MCP and custom skills that translates fully designed Figma pages into sf-ui Web Component implementations.",
  },
  {
    title: "Lead Software Engineer — State Farm Design System (SFDS)",
    company: "State Farm",
    dates: "May 2023 – Mar 2026",
    description:
      "Led engineering for SFDS, State Farm's canonical enterprise design system. Architected sf-ui, a framework-agnostic Lit/Web Components library of 70+ primitives, and a Figma Variables → W3C design token plugin in TypeScript. Owned npm + CDN release governance for 1000+ engineers and designers.",
  },
  {
    title: "Software Engineer — Drive Safe & Save Telematics",
    company: "State Farm",
    dates: "May 2020 – May 2023",
    description:
      "Built Node.js Lambda APIs and Java Spring backend services for the Drive Safe & Save telematics enrollment experience on statefarm.com. Owned frontend direction for the product suite across React apps and micro-frontends.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="container-wide py-12 sm:py-16">
      <SectionLabel mark="ticks">Experience</SectionLabel>
      <ol className="mt-8 flex max-w-3xl flex-col gap-10">
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
