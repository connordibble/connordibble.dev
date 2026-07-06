export type ProjectDetailSection = {
  heading: string;
  body: string;
};

export type ProjectLink = {
  label: string;
  href: string;
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
  /** Additional external links shown on the detail page. */
  links?: ProjectLink[];
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
    tags: [
      "Developer Tools",
      "React",
      "TypeScript",
      "GraphQL",
      "Figma MCP",
    ],
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
          heading: "The Review Surface Is the Product",
          body: "DesignRail treats AI-assisted implementation as a developer experience problem. The important layer is the review surface: what changed, why the mapping was proposed, whether it follows the design system, and what a human accepted or rejected before the result enters a codebase. That is the layer that turns model output into something a developer can trust, debug, and improve.",
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
    slug: "researchlog",
    title: "ResearchLog",
    owner: "Proceris, closed source",
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
    slug: "sfds",
    title: "SFDS",
    owner: "State Farm, closed source",
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
          body: "Architected sf-ui, a framework-agnostic Lit component library. The same <sf-button> renders identically inside an Angular shell, a React SPA, or a server-rendered page. Used Web Components and Shadow DOM to encapsulate behavior and styling while keeping the integration surface simple for product teams. Built a Figma Variables → W3C design token plugin in TypeScript so design changes flow into code as a typed pipeline. When adoption reached AEM's content-fragment pages, built a Node.js sidecar that server-renders shadow DOM (Declarative Shadow DOM) and hydrates on the client, so hundreds of unauthenticated CMS pages could adopt sf-ui without replacing the CMS model. Owned the npm publishing, CDN distribution, versioned docs, and release governance that lets the system ship like any other dependency.",
        },
        {
          heading: "Impact",
          body: "Named the official migration target for statefarm.com, with roughly 30% of the public Digital Experience estate migrated today across 10+ pages spanning public, internal, and agent-facing surfaces. 70+ primitives shipped, adopted across all eight Digital Experience product teams. The governance model (versioned releases, deprecation windows, compliance review) became a template for cross-org platform delivery.",
        },
        {
          heading: "Stack",
          body: "Lit · Web Components · TypeScript · Figma Plugin API · W3C Design Tokens · npm · CDN distribution · GitLab CI/CD",
        },
      ],
    },
  },
  {
    slug: "zod-ai-tool",
    title: "zod-ai-tool",
    owner: "Open source",
    description:
      "Small TypeScript package that derives Anthropic, OpenAI, and Gemini tool definitions from one Zod schema, then validates model tool input with that same schema. Built for applications that talk directly to provider SDKs and need one contract instead of duplicated JSON Schema.",
    tags: ["TypeScript", "Zod", "OpenAI", "Anthropic", "Gemini"],
    repoUrl: "https://github.com/connordibble/zod-ai-tool",
    links: [
      {
        label: "View package on npm",
        href: "https://www.npmjs.com/package/zod-ai-tool",
      },
    ],
    detail: {
      headline:
        "A small package for a narrow boundary: provider tool schemas and runtime validation derived from the same Zod object.",
      sections: [
        {
          heading: "Problem",
          body: "Tool use creates two contracts that want to drift. The provider gets a JSON Schema shape so the model knows what to return. The application keeps a Zod schema so model output can be checked before it touches data. When those are written separately, the mismatch usually shows up late: a range limit exists in one place, an enum value lands in another, or an optional field means something different to the provider than it means to the validator.",
        },
        {
          heading: "Boundary",
          body: "zod-ai-tool keeps that boundary deliberately small. It does not call Anthropic, OpenAI, or Gemini. It does not parse streams, run tool loops, or decide which function to call. It takes a root Zod object, derives provider-ready tool definitions, and gives the application the original schema back as validate and safeParse. The Zod schema stays the source of truth.",
        },
        {
          heading: "Implementation",
          body: "The package supports Zod 3 and Zod 4 without version sniffing. On Zod 4 it uses the built-in toJSONSchema converter. On Zod 3 it lazily falls back to zod-to-json-schema, so Zod 4 consumers do not pay a static import cost. Provider SDK types are defined locally to avoid runtime SDK dependencies, while development tests assert Anthropic and OpenAI compatibility against the real SDK types.",
        },
        {
          heading: "Strict Mode",
          body: "OpenAI strict mode is opt-in. When enabled, object schemas get additionalProperties: false and every declared property is marked required. Optional Zod fields must already accept null, because OpenAI represents optional values as null under strict mode. The package refuses to hide that difference by rewriting returned values before validation.",
        },
        {
          heading: "Release Discipline",
          body: "The repo is treated like production infrastructure despite its size. CI runs lint, typecheck, tests, build, and a Node 20/22/24 matrix across minimum and current Zod 3 and Zod 4 releases. Coverage is enforced. Examples are typechecked and smoke-run. Releases use semantic-release with npm provenance, so compatibility and package metadata stay part of the contract.",
        },
        {
          heading: "Stack",
          body: "TypeScript · Zod 3/4 · zod-to-json-schema · Vitest · tsup · semantic-release · Anthropic/OpenAI/Gemini provider shapes",
        },
      ],
    },
  },
  {
    slug: "agent-readiness-kit",
    title: "agent-readiness-kit",
    owner: "Open source",
    description:
      "TypeScript CLI and library that scores whether a repository is ready for coding agents. Audits project instructions, skill structure, deterministic gates, mock/offline defaults, AI boundaries, CI coverage, docs, and release hygiene, with a design-system preset for token and visual-review workflows.",
    tags: ["TypeScript", "CLI", "Agent Workflows", "CI", "GitHub Actions"],
    repoUrl: "https://github.com/connordibble/agent-readiness-kit",
    links: [
      {
        label: "View package on npm",
        href: "https://www.npmjs.com/package/agent-readiness-kit",
      },
    ],
    detail: {
      headline:
        "A readiness audit for repos that want coding agents to work from explicit instructions, repeatable checks, and reviewable boundaries.",
      sections: [
        {
          heading: "Problem",
          body: "Coding agents work best when the repository tells them what matters and gives them one deterministic way to prove the work is finished. Many repos rely on tribal knowledge instead: the test command is implied, credentials are required for local flows, review boundaries live in a human's head, and agent instructions either do not exist or grow into context bloat. A codebase can be healthy for humans and still hard for an agent to operate in safely.",
        },
        {
          heading: "Approach",
          body: "agent-readiness-kit turns that operational contract into a score. The generic preset checks for root agent instructions, focused skill files, a single quality gate, secret scanning, mock/offline paths, AI review boundaries, CI coverage, package metadata, and copy-paste runnable docs. The design-system preset adds checks for token sources of truth, component contracts, accessibility signals, visual verification, human review workflows, and isolated external design input.",
        },
        {
          heading: "Implementation",
          body: "The package exposes both a CLI and a library API. It reads a project snapshot, runs weighted rules, and returns pass, warn, fail, or skip findings with evidence and recommendations. Output formats cover human text, stable JSON, GitHub Actions annotations, and shields.io badge payloads. CI can enforce a minimum score with --fail-under, while the init command scaffolds an AGENTS.md template and composes a check script from existing package scripts without overwriting existing files.",
        },
        {
          heading: "Quality Bar",
          body: "The repo dogfoods its own rubric and publishes a calibration table against real repositories, including its own 100/100 generic score and a design-system score for DesignRail. The local CI mirror runs secret checks, lint, typecheck, format checks, tests, coverage, build, and a dry-run package publish. Releases use semantic-release and npm provenance, keeping the tool's package contract as explicit as the project contracts it audits.",
        },
        {
          heading: "Stack",
          body: "TypeScript · Node.js CLI · Vitest · tsup · semantic-release · GitHub Actions · npm provenance",
        },
      ],
    },
  },
  {
    slug: "saturday-signal",
    title: "Saturday Signal",
    owner: "Open source",
    description:
      "Independent college-football fan intelligence platform with a Texas football reference deployment. Ingests fixture, official-link, team-note, and optional CFBD sources, then returns citation-backed chat answers with voice, source, and rumor guardrails.",
    tags: ["Next.js", "TypeScript", "Drizzle", "RAG", "Playwright"],
    repoUrl: "https://github.com/connordibble/SaturdaySignal",
    detail: {
      headline:
        "A source-grounded college-football intelligence product, built as a reusable team platform with a Texas reference deployment.",
      sections: [
        {
          heading: "Problem",
          body: "College football fans want fast context before a game. The available signal is scattered across schedules, game notes, official links, data feeds, and rumor-heavy commentary. Saturday Signal explores a cleaner product boundary: a team-aware assistant that can brief a fan from trusted sources, cite what it knows, and stay honest when the current source set is thin.",
        },
        {
          heading: "Product Boundary",
          body: "The first MVP ships with Texas football as the reference deployment while keeping the platform shaped for future teams. Team identity, source policy, voice, protected-mark guidance, colors, aliases, and suggested prompts live in typed configuration. The product avoids official logos, mascot branding, and affiliation language, which keeps the project legally cleaner and forces the experience to stand on source quality instead of borrowed brand equity.",
        },
        {
          heading: "Architecture",
          body: "The Next.js app exposes a root Texas deployment and a canonical /teams/texas-football route, plus API routes for health, ingest, and chat. The ingest pipeline combines committed schedule fixtures, sample team notes, official links, and an optional CollegeFootballData adapter when CFBD_API_KEY is present. Source documents are normalized, de-duplicated, chunked, and retrieved with deterministic term and phrase scoring before the chat layer asks a provider for an answer.",
        },
        {
          heading: "Guardrails",
          body: "The chat path carries citations, freshness text, confidence, provider metadata, and a mode for every answer. Rumor, injury, betting, and message-board questions route through a static guardrail response instead of laundering untrusted claims. If a live LLM provider is unavailable, the app falls back to a deterministic mock provider so the product still returns a grounded answer from the retrieved context.",
        },
        {
          heading: "Quality Bar",
          body: "The release check combines lint, typecheck, unit tests, voice evals, build, ingest, and Playwright e2e coverage. Offline fixtures make the core flow runnable without private keys. Database smoke tests cover Drizzle migrations and seeding for teams, games, source documents, chunks, sessions, messages, and citations, including the expected warning path when the live CFBD key is absent.",
        },
        {
          heading: "Stack",
          body: "Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Drizzle · Postgres + pgvector · Anthropic/OpenAI adapters · Vitest · Playwright",
        },
      ],
    },
  },
  {
    slug: "dibble",
    title: "dibble",
    owner: "Open source",
    description:
      "Portable plugin, skill, and CLI collection for coding-agent guardrails. Packages design-token enforcement, supply-chain gates, agent-config audits, evidence-linked writing, UI verification, schema tooling, README audits, and marketplace validation for Claude Code, Codex, and CI.",
    tags: ["Agent Skills", "CLI", "Codex", "Claude Code", "Node.js"],
    repoUrl: "https://github.com/connordibble/dibble",
    links: [
      {
        label: "View package on npm",
        href: "https://www.npmjs.com/package/dibble",
      },
    ],
    detail: {
      headline:
        "A catalog of focused agent skills and deterministic checkers that move project taste, safety rules, and evidence standards into the moment work happens.",
      sections: [
        {
          heading: "Problem",
          body: "Agent instructions are easy to ignore when they only live in prompt text. A model might ignore design tokens, summarize beyond the source, or suggest a plausible package name that does not belong in the repo. dibble starts from those failure modes and turns the recurring fixes into portable skills plus scripts that can fail locally or in CI.",
        },
        {
          heading: "Catalog",
          body: "The collection covers design-token enforcement and drift checks, package-install safety, agent-configuration audits, evidence-linked summaries, machine-prose linting, UI verification, Tailwind v4 token guidance, Zod-first tool schemas, README conversion audits, and plugin marketplace validation. Each plugin stays small enough to understand on its own, with its own README, skill files, scripts, and tests.",
        },
        {
          heading: "Portability",
          body: "Every plugin ships its knowledge as plain Agent Skill files and its enforcement as zero-dependency Node scripts. Claude Code gets marketplace metadata, hooks, and slash-command integrations where the host supports them. Codex gets a separate marketplace sidecar that installs the same portable skill layer while avoiding claims about Claude-only hook behavior. The npm package exposes a single npx dibble front door plus individual bins for each checker.",
        },
        {
          heading: "Enforcement Pattern",
          body: "The core design choice is to put deterministic logic in the same scripts the skills reference. tokenlock, install-gate, receipts, sloplint, zod-lint, responsive-smells, readme-audit, validate-marketplace, and validate-codex can run under an agent workflow or directly in CI. That keeps the rule an agent follows aligned with the rule the pipeline enforces.",
        },
        {
          heading: "Quality Bar",
          body: "The repo validates both its Claude marketplace and Codex sidecar on every push, runs the plugin checker tests across Node 20, 22, and 24, lints README and skill prose with strict sloplint, audits the root and plugin READMEs, and performs a package dry run. The catalog is dogfooded by the same marketplace-kit, no-slop, and validation tools it distributes.",
        },
        {
          heading: "Stack",
          body: "Node.js · Agent Skills · Claude Code plugin manifests · Codex plugin manifests · zero-dependency CLI checkers · GitHub Actions · semantic-release",
        },
      ],
    },
  },
  {
    slug: "agent-convention-feedback",
    title: "Insurance Agent Feedback Platform",
    owner: "State Farm, closed source",
    description:
      "Full-stack AI feedback platform commissioned by State Farm's EVP of enterprise technology. Went from concept to production in two months for its debut at agency convention, and the pilot earned backing to become the official support and feedback channel for all 10,000+ State Farm agents.",
    tags: ["Angular", "TypeScript", "Node.js", "AWS", "AI Workflows"],
    detail: {
      headline:
        "Commissioned by State Farm's EVP of enterprise technology, built from concept to production in two months, and now backed to become the official support and feedback channel for all 10,000+ State Farm agents.",
      sections: [
        {
          heading: "Problem",
          body: "State Farm leadership wanted a real read on what its 10,000+ agents experience across service, ECRM, underwriting, and agent-support workflows, and the existing channel was free-form feedback that often died in spreadsheets or manual review queues. The EVP of enterprise technology asked me and a small horizontal team to fix that in time for agency convention, which left roughly two months from concept through design to production.",
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
          body: "The reception from agents and the executive team earned support to build on the pilot and make the platform the official support and feedback channel for the entire 10,000+ agency force. That scale-up is in progress now, taking the product from convention pilot to a standing channel, and the build set the pattern for blending human feedback, AI summarization, and reviewable evidence in internal workflows.",
        },
        {
          heading: "Stack",
          body: "Angular · TypeScript · Node.js · AWS S3 · CloudFront · Route 53 · WAFv2 · AI summarization workflows · GitOps deploy / rollback",
        },
      ],
    },
  },
  {
    slug: "paceai",
    title: "PaceAI",
    owner: "Proceris, closed source",
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

function getProjectsBySlug(slugs: string[]): Project[] {
  return slugs.map((slug) => {
    const project = getProjectBySlug(slug);

    if (!project) {
      throw new Error(`Unknown project slug: ${slug}`);
    }

    return project;
  });
}

export const homepageProjects = getProjectsBySlug([
  "sfds",
  "agent-convention-feedback",
  "researchlog",
]);

export const projectIndexProjects = getProjectsBySlug([
  "sfds",
  "researchlog",
  "agent-convention-feedback",
  "dibble",
  "designrail",
  "agent-readiness-kit",
  "zod-ai-tool",
  "saturday-signal",
  "paceai",
]);
