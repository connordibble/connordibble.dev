export type ProjectDetailSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  owner?: string;
  description: string;
  tags: string[];
  /** If set, the card links here (external). No detail page. */
  externalUrl?: string;
  /** If set, the card links to /projects/[slug] and renders this content there. */
  detail?: {
    headline: string;
    sections: ProjectDetailSection[];
  };
};

export const projects: Project[] = [
  {
    slug: "designrail",
    title: "DesignRail",
    description:
      "Human-in-the-loop design-system mapping platform for AI-assisted implementation. Translates Figma component intent into Web Component mappings, validates compliance, and tracks review decisions via a GraphQL API.",
    tags: ["React", "GraphQL", "Drizzle", "Shoelace", "Figma MCP"],
    externalUrl: "https://github.com/connordibble/DesignRail",
  },
  {
    slug: "sfds",
    title: "SFDS",
    owner: "State Farm — closed source",
    description:
      "State Farm's canonical enterprise design system and migration target for statefarm.com. I led sf-ui, a framework-agnostic Lit/Web Components library with 70+ primitives, plus the Figma Variables → W3C token pipeline and npm/CDN release governance for 1000+ engineers and designers.",
    tags: ["Web Components", "Design Tokens", "Figma API", "npm + CDN"],
    detail: {
      headline:
        "State Farm's canonical enterprise design system, used by 1000+ engineers and designers across one of the largest insurance companies in the US.",
      sections: [
        {
          heading: "Problem",
          body: "State Farm's frontend ecosystem spans hundreds of product teams shipping inconsistent UI across Angular, React, Next.js, JSP, and other frameworks. Past unification efforts didn't hold: brand drift and accessibility gaps compounded with every release, with duplicated engineering effort as the ongoing tax. The org needed a single framework-agnostic system any team could adopt without rewriting its stack.",
        },
        {
          heading: "Approach",
          body: "Architected sf-ui, a framework-agnostic Lit component library. The same <sf-button> renders identically inside an Angular shell, a React SPA, or a server-rendered page. Used Web Components and Shadow DOM to encapsulate behavior and styling while keeping the integration surface simple for product teams. Built a Figma Variables → W3C design token plugin in TypeScript so design changes flow into code as a typed pipeline. Owned the npm publishing, CDN distribution, versioned docs, and release governance that lets the system ship like any other dependency.",
        },
        {
          heading: "Impact",
          body: "70+ primitives shipped. Earned C-suite buy-in as the official migration target for statefarm.com. Adopted across all eight statefarm.com Digital Experience product teams. The governance model (versioned releases, deprecation windows, compliance review) became the template for cross-org platform delivery.",
        },
        {
          heading: "Stack",
          body: "Lit · Web Components · TypeScript · Figma Plugin API · W3C Design Tokens · npm · CDN distribution · GitLab CI/CD",
        },
      ],
    },
  },
  {
    slug: "researchlog",
    title: "ResearchLog",
    owner: "Proceris — closed source",
    description:
      "R&D tax-credit documentation SaaS that maps real engineering work to IRS Section 41 evidence. Ingests GitHub activity, classifies PRs, issues, and commits with Claude, and keeps reviewer overrides tenant-scoped with Supabase RLS.",
    tags: ["Angular", "NestJS", "Supabase", "Inngest"],
    detail: {
      headline:
        "R&D tax credit documentation SaaS that maps real engineering work to the IRS Section 41 four-part test as it happens.",
      sections: [
        {
          heading: "Problem",
          body: "Engineering orgs claiming the R&D tax credit typically reconstruct their year of work from spotty Slack archives and stale memory right before the filing deadline. Documentation gaps mean the four-part test gets applied inconsistently, and orgs routinely under-claim to stay safe from audit risk.",
        },
        {
          heading: "Approach",
          body: "ResearchLog installs as a GitHub App, ingests PR/issue/commit activity into tenant-scoped Postgres, and classifies each work unit against the IRS Section 41 four-part test using Claude. Reviewers can override classifications inline; the override surface uses an RLS-scoped Supabase client so tenant isolation is enforced at the database level. Classification jobs run at PR/epic granularity via Inngest to keep LLM costs predictable.",
        },
        {
          heading: "Architecture",
          body: "Nx-managed monorepo with three projects: an Angular 21 standalone-component review UI, a NestJS 11 modular API, and a shared package of Zod schemas and types used at every system boundary. Supabase provides Postgres + row-level-security policies on every table, JWT auth, and the storage layer. The auth guard binds each request to a user-scoped Supabase client so RLS is enforced even from server code. Schema migrations and RLS policies version-controlled.",
        },
        {
          heading: "Stack",
          body: "Angular 21 · NestJS 11 · Nx · Supabase (Postgres 15 + RLS) · Anthropic Claude · GitHub App · Inngest · Zod v4 · TypeScript strict",
        },
      ],
    },
  },
  {
    slug: "paceai",
    title: "PaceAI",
    owner: "Proceris — closed source",
    description:
      "AI workflow that turns long-form workout video into timestamped equipment-control profiles. Combines video/audio ingestion, trainer-cue extraction, exercise-science reasoning, and a human review UI for partner OEM workflows.",
    tags: ["Node.js", "Python", "FFmpeg", "Multimodal"],
    detail: {
      headline:
        "Turns long-form workout video into timestamped equipment control profiles for connected fitness hardware.",
      sections: [
        {
          heading: "Problem",
          body: "Connected fitness OEMs hand-program every video workout (trainer cues, pacing changes, terrain shifts, intensity zones) into device control profiles. With libraries in the thousands and roughly two hours of manual work per video, content throughput is the bottleneck. Programmers want their judgment in the loop; they just don't want to retype the same incline curve a thousand times.",
        },
        {
          heading: "Approach",
          body: "A three-stage pipeline. Stage one: multimodal ingestion. Video and audio are processed in parallel: FFmpeg for frame and waveform extraction, transcription for trainer dialogue. Stage two: an LLM agent encodes exercise science domain knowledge (RPE, heart-rate zones, work-to-rest ratios, progressive overload, manufacturer incline ranges) and combines extracted cues with programmer intent (series goals, trainer style, progression notes) to draft a control profile. Stage three: a human-in-the-loop review UI where programmers approve, edit, or reject the draft before it exports into the partner OEM's production control schema.",
        },
        {
          heading: "Deployment",
          body: "Built for enterprise data-residency requirements: pipeline runs in a secure cloud environment by default, with an on-prem option for partners that can't ship video outside their own network. Structured output maps directly into the partner's existing control schema.",
        },
        {
          heading: "Stack",
          body: "Node.js · Python · FFmpeg · multimodal LLM pipeline · structured-output schemas · React review UI · containerized deployment",
        },
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getDetailProjects(): Project[] {
  return projects.filter((p) => p.detail !== undefined);
}
