import { SectionLabel } from "./section-label";

type Group = {
  label: string;
  items: string[];
};

const groups: Group[] = [
  {
    label: "Frontend Platform",
    items: [
      "TypeScript",
      "React",
      "Angular",
      "Lit / Web Components",
      "Microfrontends",
      "AEM",
      "SSR / Hydration",
      "Accessibility",
    ],
  },
  {
    label: "AI + Developer Productivity",
    items: [
      "Developer Platforms",
      "Agent Context",
      "Agent Skills",
      "MCP",
      "Structured AI Outputs",
      "Deterministic Validation",
      "Figma-to-Code Workflows",
      "Human Review Boundaries",
    ],
  },
  {
    label: "APIs + Delivery",
    items: [
      "Node.js",
      "Java",
      "GraphQL",
      "REST",
      "API Contract Design",
      "AWS",
      "npm / CDN Delivery",
      "Caching",
      "GitOps",
      "CI/CD",
    ],
  },
  {
    label: "Governance + Reliability",
    items: [
      "Design Systems",
      "Component API Design",
      "Figma Plugin / API",
      "W3C Design Tokens",
      "Documentation Systems",
      "Release Governance",
      "Observability",
      "Dynatrace RUM",
      "AWS CloudWatch",
      "Incident Response",
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
        Tools I reach for
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
