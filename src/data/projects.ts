export type ProjectDetailSection = {
  heading: string;
  body: string;
};

export type ProjectProof = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectSocialCard = {
  title?: string;
  imagePath?: string;
  steps: [string, string, string];
  activeStep: 0 | 1 | 2;
  summary: string;
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
  socialCard: ProjectSocialCard;
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
    proof?: ProjectProof;
  };
};

export const projects: Project[] = [
  {
    slug: "designrail",
    title: "DesignRail",
    owner: "Open source",
    description:
      "Review step for design-to-code workflows. It maps component intent, surfaces findings, and requires a decision before export.",
    tags: [
      "Developer Tools",
      "React",
      "TypeScript",
      "GraphQL",
      "Design Systems",
    ],
    socialCard: {
      steps: ["Intent", "Review", "Export"],
      activeStep: 1,
      summary:
        "The missing review layer between design intent and AI-assisted code generation.",
    },
    repoUrl: "https://github.com/connordibble/DesignRail",
    links: [
      {
        label: "Watch the walkthrough",
        href: "https://github.com/user-attachments/assets/c2dc1517-06e2-4830-b815-389d3bbdec30",
      },
    ],
    detail: {
      headline:
        "A working reference implementation for the missing review layer between design intent and AI-assisted code generation.",
      proof: {
        src: "/projects/designrail-review.jpg",
        alt: "DesignRail review workspace showing normalized Button intent, a proposed Shoelace mapping, the human decision gate, and compliance findings.",
        caption:
          "The review workspace keeps source intent, the proposed mapping, compliance findings, and the human decision in one auditable view.",
      },
      sections: [
        {
          heading: "Problem",
          body: "AI coding agents can turn a mockup into code quickly, but speed does not preserve design intent. Component semantics get flattened into markup, accessibility and token problems surface late, and the reasoning behind a generated mapping disappears. DesignRail puts a review gate at that boundary. A developer can inspect, edit, accept, or reject the proposal before it becomes exportable code.",
        },
        {
          heading: "Review Before Export",
          body: "Public mock fixtures for Button, Input, and Card normalize into typed component intent. A deterministic mapper proposes Shoelace components with explicit props, slots, confidence, and rationale. Compliance findings sit beside the proposal with severity and remediation. Rejections require a reason, edits retain a field-level diff, and only accepted or edited mappings can produce HTML, React, or an Agent Brief.",
        },
        {
          heading: "The Contract",
          body: "GraphQL owns the boundary between the React review console, the Fastify API, and SQLite persistence. Shared Zod schemas keep component intent, decisions, exports, and UI instrumentation aligned across packages. The selected example and workspace view also live in the URL, so a review state can be refreshed, shared, and restored without introducing client-side global state.",
        },
        {
          heading: "Deliberate Boundary",
          body: "The demo runs locally without a Figma token or external model. Mock mode keeps the full workflow public and repeatable, while the normalized intent contract leaves a clean seam for a live Figma adapter. SQLite is appropriate for the reference implementation. Authentication, multi-user ownership, hosted storage, and CI enforcement remain explicit production work rather than implied capabilities.",
        },
        {
          heading: "Stack",
          body: "React · Vite · Fastify · Apollo GraphQL · Drizzle + SQLite · Zod · Shoelace Web Components · Astro Starlight · pnpm",
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
    socialCard: {
      steps: ["Ingest", "Classify", "Override"],
      activeStep: 2,
      summary:
        "Maps real engineering work to IRS Section 41 evidence with tenant-scoped human overrides.",
    },
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
    title: "SFDS Developer Platform",
    owner: "State Farm, closed source",
    description:
      "Developer platform for component contracts, documentation, migration guidance, release policy, and delivery to 1000+ engineers and designers.",
    tags: ["Web Components", "TypeScript", "Design Tokens", "npm + CDN"],
    socialCard: {
      steps: ["Tokens", "Components", "Release"],
      activeStep: 1,
      summary:
        "A governed developer platform used by 1000+ engineers and designers.",
    },
    detail: {
      headline:
        "A governed developer platform that distributes UI architecture, engineering standards, and migration context to 1000+ engineers and designers.",
      sections: [
        {
          heading: "The Platform Problem",
          body: "State Farm's frontend ecosystem spans hundreds of product teams shipping inconsistent UI across Angular, React, Next.js, JSP, and other frameworks. Past unification efforts didn't hold: brand drift and accessibility gaps compounded with every release, with duplicated engineering effort as the ongoing tax. The org needed a single framework-agnostic system any team could adopt without rewriting its stack.",
        },
        {
          heading: "The Supported Path",
          body: "Architected sf-ui as a framework-agnostic Lit and Web Components library. The same component contract works inside Angular, React, AEM, and server-rendered pages. A Node.js sidecar adds Declarative Shadow DOM and client hydration for hundreds of unauthenticated CMS pages, so teams can adopt the platform without replacing their product framework or content model.",
        },
        {
          heading: "Context for Engineers and Agents",
          body: "I first built the SFDS agent-context layer as a RAG system that ingested live documentation into a vector database and exposed retrieval through an MCP server. Live docs plus framework-specific SKILL.md files proved at least as effective for implementation guidance, so I led the replacement of the retrieval stack and removed its dedicated server, index, and ingestion path from the team's support surface. A deterministic CLI checks platform alignment, legacy usage, and accessibility risk, and can run locally or in CI alongside human review.",
        },
        {
          heading: "Distribution and Operations",
          body: "Built the Figma Variables to W3C design-token pipeline and owned npm publishing, redundant CDN distribution, CI/CD, versioning, deprecation windows, and compliance review. Cache tiering and content-hashed builds cut request volume to a third of peak, with Dynatrace RUM alerting and live incident-bridge support protecting the shared production platform.",
        },
        {
          heading: "Adoption",
          body: "SFDS is the official migration target for statefarm.com, with governed distribution and a standard migration path for more than 100 teams. Its 70+ accessible primitives are used by 1000+ engineers and designers across React, Angular, AEM, and mixed frontend architectures. Weekly office hours and a design and engineering champion network support adoption without centralizing every implementation decision.",
        },
        {
          heading: "Stack",
          body: "Lit · Web Components · TypeScript · Figma Plugin API · W3C Design Tokens · npm · CDN distribution · CI/CD",
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
    socialCard: {
      steps: ["Schema", "Provider", "Validate"],
      activeStep: 0,
      summary:
        "One Zod contract for provider tool schemas and runtime validation.",
    },
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
    socialCard: {
      steps: ["Inspect", "Score", "Enforce"],
      activeStep: 1,
      summary:
        "A readiness audit for repositories that want coding agents to work from explicit, reviewable boundaries.",
    },
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
          heading: "First Field Test: 48 to 100",
          body: "The rubric got its first field test on zod-ai-tool, my own published npm package. It scored 48/100. The repo had a twelve-leg CI matrix, enforced coverage thresholds, and a thorough CONTRIBUTING guide, and the gaps were still real: no agent entry point, no single check command, no secret scanning, and a semantic-release setup where a mislabeled fix: commit publishes an npm version. The knowledge existed for human contributors; nothing placed it where an agent starts. The init command scaffolded AGENTS.md and a check script and moved the score to 82. The remaining 18 points were the actual engineering: filling the instructions with the repo's real rules, writing two skill files for the workflows that repeat, and wiring in a secrets scan. The new gate failed its first run by flagging the scanner I had just added, which is the job description. An A/B test with fresh agents against both states measured the difference: nine files of archaeology to reconstruct the finishing workflow before, one entry-point file and one gate command after.",
        },
        {
          heading: "Stack",
          body: "TypeScript · Node.js CLI · Vitest · tsup · semantic-release · GitHub Actions · npm provenance",
        },
      ],
    },
  },
  {
    slug: "section-one",
    title: "Section One",
    owner: "Open source",
    description:
      "Independent college-football game-week desk, shipped as a team-portable platform. Two editions run from typed config, weekly news is graded against a written rubric before it publishes, and every answer carries the sources behind it.",
    tags: ["Next.js", "TypeScript", "Drizzle", "RAG", "Playwright"],
    socialCard: {
      steps: ["Sources", "Retrieve", "Answer"],
      activeStep: 2,
      summary:
        "A source-grounded college-football desk with graded weekly news and cited answers.",
    },
    repoUrl: "https://github.com/connordibble/SectionOne",
    detail: {
      headline:
        "A source-grounded college-football desk, built as a team-portable platform and tested by shipping a second edition without a redesign.",
      sections: [
        {
          heading: "Problem",
          body: "College football fans want fast context before a game. The available signal is scattered across schedules, game notes, official links, data feeds, and rumor-heavy commentary. Section One answers three questions for one team at a time: what matters this week, what to watch during the game, and what supports that read. A fan can already get a feed; what they cannot get is five things that actually matter, chosen by someone who knows which five.",
        },
        {
          heading: "Product Boundary",
          body: "Team identity, source policy, voice, protected-mark guidance, color anchors, aliases, and starter questions live in typed configuration. Components carry no team name, color, or matchup claim; if adding a team required changing a component, the boundary would be wrong. The product avoids official logos, mascot branding, and affiliation language, which keeps it legally cleaner and forces the experience to stand on source quality instead of borrowed brand equity.",
        },
        {
          heading: "The Second Edition Test",
          body: "A portability claim is worth what the second instance proves. Adding the Utah State edition alongside Texas cost two fixes and no redesign. The question classifier had reserved a single word for the team's name, which fit Texas and not Utah State, so anything team-shaped in shared logic now reads from config. And the structural dark belongs to the school when the school has one: only a primary too bright to be structure, as burnt orange is, gets a counterweight. Getting that backwards is what gave Utah State a brown masthead in its first draft.",
        },
        {
          heading: "Architecture",
          body: "The Next.js app serves a home route that takes team requests and a canonical /teams/[slug] edition for each enabled team, plus API routes for health, ingest, and chat. Schedules are build outputs, not hand-typed rows: pnpm schedule:build regenerates a fixture from CollegeFootballData so kickoff times, venues, and broadcast assignments come from the source. Documents are normalized, de-duplicated, and chunked, then retrieved by hybrid search that fuses deterministic lexical scoring with pgvector cosine search through reciprocal rank fusion. With no database or no seeded embeddings, vector search returns nothing and retrieval degrades to lexical rather than failing.",
        },
        {
          heading: "Editorial Rules",
          body: "The weekly sections are governed by written rules, not author discretion. Rankings are read from the team outward: most teams are unranked, so the list under the standing line is the ranked opponents on that team's own schedule, hardest first. News items are graded on impact, echo, and freshness, decayed by age, and filled under a cap of two per outlet with at least three distinct outlets and local reporting never outnumbered by national. Every item carries its outlet and links out; an item without a source is not publishable, and fixture tests enforce that instead of trusting the author.",
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
      "11 portable plugins for carrying shared engineering rules between Claude and GPT, with deterministic checks in hooks, CLI, and CI.",
    tags: ["Agent Skills", "CLI", "Codex", "Claude Code", "Node.js"],
    socialCard: {
      title: "dibble: The Engineering Contract That Travels",
      steps: ["Trust", "Guide", "Verify"],
      activeStep: 1,
      summary:
        "11 portable plugins that carry engineering context across Claude and GPT, with the same deterministic checks available through hooks, CLI, and CI.",
    },
    repoUrl: "https://github.com/connordibble/dibble",
    links: [
      {
        label: "View package on npm",
        href: "https://www.npmjs.com/package/dibble",
      },
      {
        label: "Read the compatibility matrix",
        href: "https://github.com/connordibble/dibble/blob/main/docs/compatibility.md",
      },
    ],
    detail: {
      headline:
        "The engineering context I kept repeating to Claude and GPT, packaged once as portable skills and deterministic checks that travel through agent workflows, local CLI, and CI.",
      sections: [
        {
          heading: "The Repeated Work",
          body: "I use Claude and GPT for different parts of software work, but I kept carrying the same instructions between them: stay on the design system, check a package before installing it, derive tool schemas from Zod, render the UI before calling it done, and keep summaries tied to evidence. Custom skills and instruction files helped, but copies drifted between tools. Rules that should return the same answer every time also needed a deterministic layer. dibble puts that guidance and those checks in one versioned catalog.",
        },
        {
          heading: "One Working Loop",
          body: "The 11 plugins follow one loop: trust the inputs, guide the work, and verify the result. install-gate checks an unfamiliar dependency before it enters the project. tokenlock keeps the implementation on the design system. design-verify asks for rendered evidence before the work is accepted. Each plugin stands alone, but the catalog covers the full path from trusted input to verified output.",
        },
        {
          heading: "The Contract Travels",
          body: "Every plugin ships its working context as a plain Agent Skill. Claude Code and Codex have native marketplace metadata, while the deterministic layer is a set of zero-dependency Node scripts available through npx dibble and individual CLI bins. tokenlock and install-gate also package command hooks for both hosts. Codex requires the user to inspect and trust each hook definition before it runs, and Claude-only slash commands remain documented as host-specific. The model can change. The engineering contract stays put.",
        },
        {
          heading: "Judgment and Enforcement",
          body: "The boundary is deliberate. Skills carry judgment and context. Scripts handle rules that should return the same answer regardless of which model or person produced the work. The same checker can sit behind a hook, run from a terminal, and fail a build in CI. Several of the design-system plugins came from leading engineering for a system used by 1000+ engineers and designers. plugin-inspector applies the same rule back to the catalog by validating both marketplace formats and reporting the authority each plugin declares.",
        },
        {
          heading: "Current Quality Bar",
          body: "Release 1.2.1 is published to npm. CI runs 148 tests, enforces a 95% line-coverage floor with focused branch floors for the security-oriented checkers, and evaluates every skill against activation, missing-context, and unsafe-edge cases. The catalog also lints its own prose, audits every README, validates both plugin formats, and performs a package dry run. External adoption is still the evidence it needs next.",
        },
        {
          heading: "Stack",
          body: "Node.js · Agent Skills · Claude Code and Codex plugin manifests · zero-dependency CLI checkers · GitHub Actions · semantic-release",
        },
      ],
    },
  },
  {
    slug: "agent-convention-feedback",
    title: "Insurance Agent Feedback Platform",
    owner: "State Farm, closed source",
    description:
      "Executive-requested AI feedback platform delivered from concept to a live convention pilot in two months. It captured 800+ datapoints from 197 participants, kept source quotes traceable, and shipped with monitoring and GitOps rollback.",
    tags: ["Angular", "TypeScript", "Node.js", "AWS", "AI Workflows"],
    socialCard: {
      steps: ["Signal", "Theme", "Route"],
      activeStep: 1,
      summary:
        "A two-month live pilot with 800+ datapoints from 197 participants.",
    },
    detail: {
      headline:
        "An executive-requested AI feedback platform taken from concept to a monitored live pilot in two months, with traceable evidence behind every synthesized theme.",
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
    socialCard: {
      steps: ["Ingest", "Draft", "Approve"],
      activeStep: 2,
      summary:
        "Turns workout video into reviewed equipment-control profiles for connected fitness hardware.",
    },
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
  "designrail",
  "dibble",
]);

export const projectIndexProjects = getProjectsBySlug([
  "sfds",
  "dibble",
  "agent-readiness-kit",
  "agent-convention-feedback",
  "researchlog",
  "zod-ai-tool",
  "designrail",
  "section-one",
  "paceai",
]);
