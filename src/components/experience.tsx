import { SectionLabel } from "./section-label";

type Role = {
  title: string;
  company: string;
  dates: string;
  officialTitle?: string;
  description: string;
};

const roles: Role[] = [
  {
    title: "Senior Software Engineer, Digital Experience Platform Lead",
    company: "State Farm",
    dates: "Mar 2026 – Present",
    officialTitle: "Internal title: Senior Technology Engineer",
    description:
      "Set frontend direction across 8 product teams and 50+ engineers. Lead platform work across statefarm.com and build AI-assisted development tools with live docs, deterministic checks, and human review.",
  },
  {
    title: "Lead Software Engineer I → II, State Farm Design System (SFDS)",
    company: "State Farm",
    dates: "May 2023 – Mar 2026",
    description:
      "Built sf-ui, a Lit and Web Components platform with 70+ accessible primitives used by 1000+ engineers and designers. Owned documentation, delivery, release policy, and adoption.",
  },
  {
    title: "Software Engineer, Drive Safe & Save Telematics",
    company: "State Farm",
    dates: "May 2020 – May 2023",
    description:
      "Built Node.js Lambda APIs and Java services for Drive Safe & Save enrollment. Led frontend direction across React apps and micro-frontends.",
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
              {role.officialTitle ? (
                <p className="mt-1 font-mono text-caption text-text-subtle">
                  {role.officialTitle}
                </p>
              ) : null}
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
