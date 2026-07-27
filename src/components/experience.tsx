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
      "Set technical direction across the statefarm.com Digital Experience suite: 8 product teams and 40–50 engineers and analysts. Define shared architecture and standards, mentor engineers, and lead platform initiatives from discovery through adoption. Built the context layer for SFDS, a governed developer platform used by 1000+ engineers and designers, first as a vector-backed RAG system exposed through MCP, then led its replacement with live docs and installable SKILL.md guidance when the simpler design proved at least as effective. Paired that context with deterministic validation, a GitHub review agent used across 50+ PRs, and a Figma MCP workflow that cut representative page builds from roughly two weeks to one day.",
  },
  {
    title: "Lead Software Engineer, State Farm Design System (SFDS)",
    company: "State Farm",
    dates: "May 2023 – Mar 2026",
    description:
      "Architected sf-ui as a governed Lit and Web Components developer platform with 70+ accessible primitives used by 1000+ engineers and designers. Established versioned documentation, npm and CDN delivery, GitHub CI/CD, deprecation windows, compliance reviews, adoption office hours, and a champion network across product teams.",
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
