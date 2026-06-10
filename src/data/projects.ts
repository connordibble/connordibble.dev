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
  /** If set, the detail page shows a source link to this repo. */
  repoUrl?: string;
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
    owner: "Open source",
    description:
      "Human-in-the-loop design-system mapping platform for AI-assisted implementation. Translates Figma component intent into Web Component mappings, validates compliance, and records human review decisions through a GraphQL API.",
    tags: ["React", "TypeScript", "GraphQL", "Drizzle", "Figma MCP"],
    repoUrl: "https://github.com/connordibble/DesignRail",
    detail: {
      headline:
        "A working lab for the design-to-code handoff problem: human review, deterministic checks, and a GraphQL contract between design intent and AI-assisted implementation.",
      sections: [
        {
          heading: "Problem",
          body: "AI coding agents can implement designs fast, but the handoff is where quality dies: design intent gets flattened into markup, compliance issues surface after merge, and nobody records why a mapping decision was made. DesignRail explores the missing layer, a governed review step between Figma intent and implementation where humans accept, reject, or edit what automation proposes before anything is treated as export-ready.",
        },
        {
          heading: "Approach",
          body: "A pnpm monorepo with a React review UI, a Fastify and Apollo GraphQL API, and shared Zod schemas at every boundary. Mock Figma fixtures normalize into component intent, a deterministic mapper proposes Shoelace Web Component implementations, and a compliance agent reports accessibility, token, and variant findings alongside each mapping. Review decisions persist through the GraphQL API so mapping quality is auditable over time, and exports produce implementation-ready HTML, React examples, or agent-ready briefs.",
        },
        {
          heading: "Status",
          body: "Early and in active development. The Phase 1 contract is in place: shared schemas, the GraphQL API, SQLite persistence, recorded review decisions, and a Button-first mapping path with more components staged behind it. The repo is run like production software anyway: CI quality gates covering secrets, mock-mode, types, lint, and tests, conventional commits with release planning, and ADRs in the docs site. It is the same problem I work on at enterprise scale, rebuilt in the open where the contracts and checks can be shown.",
        },
        {
          heading: "Stack",
          body: "React · Vite · Fastify · Apollo GraphQL · Drizzle + SQLite · Zod · Shoelace Web Components · Astro Starlight docs · pnpm monorepo",
        },
      ],
    },
  },
  {
    slug: "sfds",
    title: "SFDS",
    owner: "State Farm — closed source",
    description:
      "State Farm's canonical enterprise design system and migration target for statefarm.com. I led sf-ui, a framework-agnostic Lit/Web Components library with 70+ primitives, plus the Figma Variables → W3C token pipeline and npm/CDN release governance for 1000+ engineers and designers.",
    tags: ["Web Components", "TypeScript", "Design Tokens", "npm + CDN"],
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
          body: "70+ primitives shipped. Named the official migration target for statefarm.com and adopted across all eight Digital Experience product teams. The governance model (versioned releases, deprecation windows, compliance review) became the template for cross-org platform delivery.",
        },
        {
          heading: "Stack",
          body: "Lit · Web Components · TypeScript · Figma Plugin API · W3C Design Tokens · npm · CDN distribution · GitLab CI/CD",
        },
      ],
    },
  },
  {
    slug: "agent-convention-feedback",
    title: "Agent Feedback Platform",
    owner: "State Farm — closed source",
    description:
      "Full-stack AI feedback platform commissioned by State Farm's EVP of enterprise technology. Went from concept to production in two months for its debut at agency convention, and the pilot earned backing to become the official support and feedback channel for all 10,000+ State Farm agents.",
    tags: ["Angular", "TypeScript", "Node.js", "AWS", "AI Workflows"],
    detail: {
      headline:
        "Commissioned by State Farm's EVP of enterprise technology, built from concept to production in two months, and now backed to become the official support and feedback channel for all 10,000+ State Farm agents.",
      sections: [
        {
          heading: "Problem",
          body: "State Farm leadership wanted a real read on what its 10,000+ agents experience across service, ECRM, underwriting, and agent-support workflows, and the existing channel was free-form feedback that died in spreadsheets. The EVP of enterprise technology asked me directly to fix that in time for agency convention, which left roughly two months from concept through design to production.",
        },
        {
          heading: "Approach",
          body: "Designed and shipped the full stack on that timeline: an Angular front end and Node.js API on AWS, served through CloudFront with WAFv2 and Route 53. AI workflows synthesize free-form agent comments into themes with traceable source quotes, so leaders see the pattern and can still click into the exact words behind it. The dashboard supports topic breakdowns, conversation drilldowns, filtering, and Excel exports for downstream teams.",
        },
        {
          heading: "Running It Live",
          body: "The platform had to hold up during a live event with executives watching, so it shipped with monitoring and a GitOps deploy and rollback path that turned mid-convention fixes into routine pushes instead of emergencies. The pilot captured 800+ datapoints from 197 agents on the convention floor, validating both the capture workflow and the AI synthesis against real usage.",
        },
        {
          heading: "Impact",
          body: "The reception from agents and from the executives it was built for earned support to make the platform the official support and feedback channel for the entire 10,000+ agency force. That scale-up is in progress now, taking the product from convention pilot to a standing channel, and the build set the pattern for blending human feedback, AI summarization, and reviewable evidence in internal workflows.",
        },
        {
          heading: "Stack",
          body: "Angular · TypeScript · Node.js · AWS S3 · CloudFront · Route 53 · WAFv2 · AI summarization workflows · GitOps deploy / rollback",
        },
      ],
    },
  },
  {
    slug: "researchlog",
    title: "ResearchLog",
    owner: "Proceris — closed source",
    description:
      "Full-stack R&D tax-credit documentation SaaS that maps real engineering work to IRS Section 41 evidence. Ingests GitHub PR and issue activity, classifies work with Claude at the pull-request level to keep model spend bounded, and keeps reviewer overrides tenant-scoped with Supabase RLS.",
    tags: ["Angular", "TypeScript", "NestJS", "Supabase", "Inngest"],
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
          body: "ResearchLog installs as a GitHub App, ingests PR and issue activity into tenant-scoped Postgres, and classifies work against the IRS Section 41 four-part test using Claude. Classification jobs run through Inngest at the pull-request level, with commits rolling up to their parent PR, so model spend stays predictable. Reviewers can override classifications inline; the override surface uses an RLS-scoped Supabase client so tenant isolation is enforced at the database level.",
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
    tags: ["React", "Node.js", "Python", "Multimodal"],
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
