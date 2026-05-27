import { ProjectCard, type Project } from "./project-card";
import { SectionLabel } from "./section-label";

const projects: Project[] = [
  {
    title: "DesignRail",
    description:
      "A design-system handoff control plane for AI-assisted implementation. Normalizes Figma input into reviewable component intent, maps it to Shoelace primitives, runs compliance checks (accessibility, tokens, variants, React readiness), and persists human decisions through a GraphQL API so mapping quality can be audited over time. Mock-mode by default; optional Figma API and MCP integration.",
    tags: ["React", "GraphQL", "Drizzle", "TypeScript"],
    href: "https://github.com/connordibble/DesignRail",
  },
  {
    title: "SFDS",
    owner: "State Farm — closed source",
    description:
      "State Farm's canonical enterprise design system, sanctioned by leadership as the migration target for statefarm.com and used by 1000+ engineers and designers. Includes sf-ui, a framework-agnostic component library on Lit/Web Components with 70+ primitives; a Figma Variables → W3C design token plugin in TypeScript; and an npm + CDN release pipeline with versioned docs and governance for cross-team adoption.",
    tags: ["Web Components", "Design Tokens", "Figma API", "npm + CDN"],
  },
  {
    title: "ResearchLog",
    owner: "Proceris — closed source",
    description:
      "R&D tax credit documentation SaaS. Ingests engineering activity from GitHub (PRs, issues, commits), classifies it against the IRS Section 41 four-part test with Claude, and captures contemporaneous evidence so teams can defend their credit at audit time instead of reconstructing it at year-end. Row-level security throughout; classification jobs run async via Inngest.",
    tags: ["Angular", "NestJS", "Supabase", "Inngest"],
  },
  {
    title: "PaceAI",
    owner: "Proceris — closed source",
    description:
      "Turns long-form workout video into timestamped equipment control profiles for connected fitness hardware. Multimodal ingestion (video + audio + trainer-cue extraction), an LLM agent layer encoding exercise science (RPE, heart-rate zones, work-to-rest ratios, progressive overload), and structured output that maps directly into a partner OEM's production control schema. Human-in-the-loop review UI; on-prem deployment for enterprise data residency.",
    tags: ["Node.js", "Python", "FFmpeg", "Multimodal"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="container-wide py-16 sm:py-24">
      <SectionLabel mark="asterisk">Projects</SectionLabel>
      <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
