import { SectionLabel } from "./section-label";

type Group = {
  label: string;
  items: string[];
};

const groups: Group[] = [
  {
    label: "Design Tooling",
    items: [
      "Figma Plugin/API",
      "Figma MCP",
      "W3C Design Tokens",
      "Design-to-Code Automation",
      "Component Governance",
      "Accessibility",
      "Documentation Systems",
    ],
  },
  {
    label: "Frontend / Platform",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "Lit / Web Components",
      "Angular",
      "SPA Architecture",
      "State Management",
      "Cross-Framework Integration",
    ],
  },
  {
    label: "Backend / Cloud",
    items: [
      "Node.js",
      "Java",
      "AWS Lambda",
      "GraphQL",
      "REST",
      "API Contract Design",
      "Service Integration",
      "DB Schema Design",
      "Event-Driven Systems",
      "Serverless",
      "npm / CDN Delivery",
      "GitLab CI/CD",
    ],
  },
  {
    label: "AI + Reliability",
    items: [
      "Application-Level GenAI",
      "Agent Workflows",
      "MCP Servers",
      "Agent Skills",
      "Structured AI Outputs",
      "GitLab Webhook Agents",
      "SLOs & Observability",
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
      className="container-wide site-section pt-12 pb-14 sm:pt-14 sm:pb-20"
    >
      <SectionLabel mark="grid">Tools I reach for</SectionLabel>
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
