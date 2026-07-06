import { SectionLabel } from "./section-label";

type Role = {
  title: string;
  company: string;
  dates: string;
  description: string;
};

const roles: Role[] = [
  {
    title: "Senior Technology Engineer, Digital Experience",
    company: "State Farm",
    dates: "Mar 2026 – Present",
    description:
      "Set technical direction across the statefarm.com Digital Experience suite: 8 product teams, 40–50 engineers, and an executive-backed migration toward 100% SFDS adoption. Shape GraphQL contracts, service-integration patterns, and AI tooling for customer-, agent-, and internal-facing workflows, including a Figma MCP pipeline that translates fully designed pages into sf-ui Web Component implementations. Validation tooling wired into local hooks and PR workflows has reviewed 50+ merge requests for design-system alignment and accessibility risk.",
  },
  {
    title: "Lead Software Engineer, State Farm Design System (SFDS)",
    company: "State Farm",
    dates: "May 2023 – Mar 2026",
    description:
      "Led engineering for SFDS, State Farm's canonical enterprise design system. Architected sf-ui, a framework-agnostic Lit/Web Components library of 70+ primitives, and a Figma Variables → W3C design token plugin in TypeScript. Owned npm + CDN release governance for 1000+ engineers and designers.",
  },
  {
    title: "Software Engineer, Drive Safe & Save Telematics",
    company: "State Farm",
    dates: "May 2020 – May 2023",
    description:
      "Built Node.js Lambda APIs and Java Spring backend services for the Drive Safe & Save telematics enrollment experience on statefarm.com. Owned frontend direction for the product suite across React apps and micro-frontends.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="container-wide site-section pt-10 pb-0 sm:pt-12 sm:pb-0"
    >
      <SectionLabel mark="ticks" rule={false}>
        Experience
      </SectionLabel>
      <ol className="mt-8 divide-y divide-border">
        {roles.map((role) => (
          <li
            key={role.title}
            className="grid gap-4 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] md:py-7"
          >
            <div>
              <h3 className="text-section-title font-medium text-text text-pretty">
                {role.title}
              </h3>
              <p className="mt-2 font-mono text-caption text-text-subtle">
                {role.company} / {role.dates}
              </p>
            </div>
            <p className="text-body-small text-text-muted leading-relaxed text-pretty">
              {role.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
