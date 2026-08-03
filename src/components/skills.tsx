import { SectionLabel } from "./section-label";

type Group = {
  label: string;
  items: string[];
};

const groups: Group[] = [
  {
    label: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Lit / Web Components",
      "Microfrontends",
      "Accessibility",
    ],
  },
  {
    label: "AI + tooling",
    items: [
      "Developer platforms",
      "Agent skills",
      "MCP",
      "Deterministic checks",
      "Figma-to-code",
    ],
  },
  {
    label: "APIs + delivery",
    items: [
      "Node.js",
      "Java",
      "GraphQL",
      "AWS",
      "CI/CD",
    ],
  },
  {
    label: "Systems",
    items: [
      "Design systems",
      "Design tokens",
      "Documentation",
      "Release governance",
      "Observability",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="container-wide site-section pt-12 pb-10 sm:pt-14 sm:pb-12"
    >
      <SectionLabel mark="grid" rule={false}>
        Tools
      </SectionLabel>
      <dl className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.label}
            className="rounded-md border border-border bg-panel p-5"
          >
            <dt className="font-mono text-caption text-text">
              {group.label}
            </dt>
            <dd className="mt-2 font-mono text-caption text-text-muted leading-relaxed">
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
