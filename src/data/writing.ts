export type WritingBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "code";
      language: string;
      code: string;
    };

export type WritingSection = {
  heading: string;
  blocks: WritingBlock[];
};

export type WritingPost = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  date: string;
  displayDate: string;
  readTime: string;
  featured: boolean;
  topics: string[];
  sections: WritingSection[];
};

export const writingPosts: WritingPost[] = [
  {
    slug: "teaching-ai-agents-to-use-a-design-system",
    title: "Teaching AI Agents to Use a Design System",
    subtitle:
      "Why live docs, small skills, and deterministic checks beat a search index for production UI work.",
    summary:
      "A practical look at constraining AI-generated frontend code with design-system primitives, agent instructions, and repeatable validation.",
    date: "2026-05-28",
    displayDate: "May 2026",
    readTime: "9 min read",
    featured: true,
    topics: ["Design Systems", "AI Tooling", "Frontend Platform"],
    sections: [
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "AI coding agents are getting good enough to produce useful frontend code quickly, which surfaces a familiar platform problem: generated code only helps if it moves teams toward the system's supported path. Without design-system context, agents reach for the public patterns they have seen most often: Bootstrap-like attributes, Material-inspired props, React component conventions, or plausible custom-element guesses.",
          },
          {
            type: "paragraph",
            text: "The result can look right at a glance and fail in the places that matter. The markup compiles. The visual shape is close. But the accessibility story, event model, or component API is subtly off. Those mistakes are easy to miss in review because they look confident and conventional.",
          },
          {
            type: "list",
            items: [
              "Invented component attributes that do not exist in the internal API.",
              "Icon names that sound reasonable but are not in the approved set.",
              "Raw token references instead of sanctioned spacing and layout utilities.",
              "Framework bindings that do not match custom-element events.",
              "Copying legacy patterns because they already exist nearby in the codebase.",
            ],
          },
          {
            type: "paragraph",
            text: "The root issue is source-of-truth, not model quality. The agent is doing what engineers do under uncertainty: it interpolates from examples. If the best examples available are generic public components and stale local code, the output will drift away from the design system.",
          },
        ],
      },
      {
        heading: "The Design System as a Control Surface",
        blocks: [
          {
            type: "paragraph",
            text: "At enterprise scale, a design system is a control surface for product quality. It gives teams a smaller and safer API for common interface work: forms, validation, icons, spacing, interaction states, accessibility semantics, and cross-framework behavior.",
          },
          {
            type: "paragraph",
            text: "That becomes even more important when agents are generating first drafts. If every team and every agent is free to recreate UI from raw HTML, CSS, ARIA, and framework-specific glue, variation spreads quickly. A brand update becomes a search-and-replace exercise across one-off markup. An accessibility fix has to account for every local implementation. A migration has to unwind hundreds of reasonable-looking deviations.",
          },
          {
            type: "paragraph",
            text: "Design-system components package decisions that should stay solved. A text field, button, or modal should ship with accessibility and interaction semantics already handled.",
          },
          {
            type: "code",
            language: "html",
            code: '<ds-text-field label="Email address" type="email"></ds-text-field>\n<ds-button>Continue</ds-button>',
          },
          {
            type: "paragraph",
            text: "The goal is to make the right path easier to discover than the wrong path, then backstop important rules with checks that do not depend on model behavior.",
          },
        ],
      },
      {
        heading: "The First Attempt: Search Around the Docs",
        blocks: [
          {
            type: "paragraph",
            text: "The first architecture I explored was a retrieval system around the design-system documentation. The idea was straightforward: index the docs into a vector database, expose the knowledge-base to the agent via an MCP server, and let it retrieve relevant chunks before writing code.",
          },
          {
            type: "paragraph",
            text: "That approach helped. It proved that agents needed design-system context, and that better context improved the first pass. It also introduced more system than the problem required.",
          },
          {
            type: "list",
            items: [
              "The same prompt could retrieve different chunks and produce different implementation choices.",
              "Tool definitions and project instructions were present even when the task had nothing to do with UI.",
              "The search index became another copy of documentation that already existed somewhere else.",
              "Refresh jobs, hosting, permissions, and vector infrastructure became part of the design-system support surface.",
              "Similarity was useful for discovery, but not always precise enough for production component usage.",
              "Vector hosting, server infrastructure, and ingestion compute added up in ways that weren't obvious until the system was actually running.",
            ],
          },
          {
            type: "paragraph",
            text: "The search system was a useful prototype precisely because it clarified the actual requirement: agents did not need a new source of truth. They needed a reliable way to find and obey the existing one.",
          },
        ],
      },
      {
        heading: "The Shift: Small Skills, Live Docs",
        blocks: [
          {
            type: "paragraph",
            text: "The cleaner model was to keep the docs as the source of truth and give agents small, installable skills that explain how to use them. A skill can be as simple as a markdown file with a name, a description, and focused instructions. The boringness is a feature.",
          },
          {
            type: "code",
            language: "bash",
            code: "npx @org/design-system-agent-skills-react\nnpx @org/design-system-agent-skills-angular",
          },
          {
            type: "paragraph",
            text: "The core skill owns shared rules: where the docs live, which component APIs are authoritative, how to reason about migration, and which patterns to avoid. Framework-specific skills handle the details that differ between Angular, React, or other environments: schemas, event binding, TypeScript declarations, and template patterns.",
          },
          {
            type: "code",
            language: "text",
            code: "~/.agents/skills/\n|-- design-system-core/\n|   `-- SKILL.md\n|-- design-system-angular/\n|   `-- SKILL.md\n`-- design-system-react/\n    `-- SKILL.md",
          },
          {
            type: "paragraph",
            text: "The skill should not copy every component API; that just creates a second stale documentation set. It teaches the agent where to fetch live component docs, which rules are non-negotiable, and what common mistakes to avoid.",
          },
          {
            type: "paragraph",
            text: "That split is easier to maintain. Documentation remains the source of component truth. Skills teach agents how to consume that truth. Product teams do not need to run infrastructure just to get basic design-system guidance into an agent workflow.",
          },
        ],
      },
      {
        heading: "The Backstop: Deterministic Validation",
        blocks: [
          {
            type: "paragraph",
            text: "Skills make good behavior more likely. Any production workflow also needs a deterministic layer that catches the mistakes you already know how to define. A small validator is more useful for that than another model call.",
          },
          {
            type: "paragraph",
            text: "The validator does not need to understand every design decision. It only needs to scan source files for common failure modes: unknown custom elements, broad all-component imports, missing likely component imports, legacy CSS classes, direct token references in consuming styles, or framework-specific event-binding mistakes.",
          },
          {
            type: "code",
            language: "bash",
            code: "design-system validate --src src\ndesign-system validate --changed\ndesign-system validate --src src --ci",
          },
          {
            type: "paragraph",
            text: "The difference is material: agent guidance is probabilistic, validation is repeatable. The same source file should produce the same findings locally and in CI, regardless of who or what wrote it.",
          },
        ],
      },
      {
        heading: "What I Would Carry Forward",
        blocks: [
          {
            type: "paragraph",
            text: "The main lesson is that design systems are becoming part of the AI control plane for frontend engineering. The value of a well-designed component API grows as the volume of generated code does. A strong design system gives both humans and agents a narrower path to production-quality UI.",
          },
          {
            type: "list",
            items: [
              "Use the docs site as the source of truth instead of copying docs into a separate search system.",
              "Give agents progressive guidance that loads when the task actually needs it.",
              "Keep framework-specific rules close to the framework where teams will apply them.",
              "Catch deterministic mistakes with deterministic tools.",
              "Treat infrastructure as a cost, even when it works.",
            ],
          },
          {
            type: "paragraph",
            text: "The practical shape I like: live docs for truth, small skills for agent behavior, and validator checks for production confidence. Less glamorous than a custom retrieval platform, and easier for teams to actually run.",
          },
        ],
      },
      {
        heading: "The Broader Point",
        blocks: [
          {
            type: "paragraph",
            text: "AI raises the stakes for platform thinking. When agents produce more code faster, the systems that constrain and standardize that output become more valuable. Design systems, docs, skills, and validators are all part of that.",
          },
          {
            type: "paragraph",
            text: "The durable path is making the right behavior obvious and repeatable. For frontend platform work, that usually means boring tools in the right places.",
          },
        ],
      },
    ],
  },
];

export function getWritingPostBySlug(slug: string): WritingPost | undefined {
  return writingPosts.find((post) => post.slug === slug);
}

export function getFeaturedWriting(): WritingPost[] {
  return writingPosts.filter((post) => post.featured);
}
