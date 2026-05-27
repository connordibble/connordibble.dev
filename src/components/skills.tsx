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
      "AEM",
    ],
  },
  {
    label: "Backend / Cloud",
    items: [
      "Node.js",
      "AWS Lambda",
      "GraphQL",
      "REST",
      "Java",
      "Serverless",
      "npm / CDN Delivery",
      "GitLab CI/CD",
    ],
  },
  {
    label: "AI + Reliability",
    items: [
      "Agent Workflows",
      "MCP Servers",
      "SKILL.md Systems",
      "GitLab Webhook Agents",
      "Dynatrace RUM",
      "AWS CloudWatch",
      "Incident Response",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="container-wide py-12 sm:py-16">
      <SectionLabel mark="grid">Skills</SectionLabel>
      <dl className="mt-8 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.label}>
            <dt className="font-mono text-caption uppercase tracking-[0.12em] text-text-subtle">
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
