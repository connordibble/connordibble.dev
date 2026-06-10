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
    }
  | {
      type: "figure";
      variant: "draft-to-truth" | "write-paths";
      caption: string;
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
    slug: "when-the-model-is-a-draft",
    title: "When the Model Is a Draft, Not the Source of Truth",
    subtitle:
      "Designing the boundary where probabilistic output ends and durable product truth begins.",
    summary:
      "Where AI output should stop in an audit-grade workflow: schema contracts at the boundary, override invariants in the database, and a review UI that treats model drafts as drafts.",
    date: "2026-06-09",
    displayDate: "June 2026",
    readTime: "8 min read",
    featured: true,
    topics: ["AI Tooling", "Data Integrity", "Platform Engineering"],
    sections: [
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "ResearchLog is a system I built to turn everyday engineering activity into R&D tax-credit evidence. It ingests pull requests and issues from GitHub, routes sync and classification jobs through a background queue, and asks Claude to evaluate each activity against the IRS four-part test: permitted purpose, technological in nature, elimination of uncertainty, and process of experimentation. The output is a structured classification with a confidence score, a narrative, and a list of disqualifiers. Eventually that evidence lands in front of a CPA.",
          },
          {
            type: "paragraph",
            text: "That last sentence is the design constraint that shaped everything else. A tax filing is a place where mostly right is a liability. The model's draft is genuinely useful: it reads a PR's title and metadata and produces a plausible, structured judgment in seconds. Plausible and durable are different properties, though, and an audit workflow cannot let one quietly become the other.",
          },
          {
            type: "paragraph",
            text: "The hard part of building this system was not calling the model. The API call is the easy five percent. The hard part was deciding, explicitly and in code, where probabilistic output stops and product truth begins. Most of the architecture, from schema validation and write semantics down to the dashboard math, is an answer to that one question.",
          },
        ],
      },
      {
        heading: "The Trap: A Clean-Looking Upsert",
        blocks: [
          {
            type: "paragraph",
            text: "The naive pipeline is easy to write and looks correct. An activity syncs in, a job fires, the model classifies it, and the result upserts into a classifications table keyed by activity. Sync again next week and the job refreshes the row with a newer draft. Idempotent and tidy.",
          },
          {
            type: "paragraph",
            text: "The failure shows up the first time a human disagrees with the model. A manager reviews a classification, decides the model got it wrong, and overrides it. Some time later a webhook fires or a backfill runs, the automatic path re-classifies the activity, and the upsert replaces the manager's judgment with a fresh draft. Nothing crashes or logs an error. The dashboard keeps showing plausible numbers. The system has silently destroyed the most valuable data it had: a human decision, which is exactly what an auditor would ask to see.",
          },
          {
            type: "paragraph",
            text: "This is a worse class of bug than a 500, because the loss is invisible and the lost data is irreplaceable. Once you see it, the requirement becomes clear: automatic classification and human review are different kinds of writes, and they cannot share one code path with one set of semantics.",
          },
          {
            type: "paragraph",
            text: "ResearchLog ended up with two deliberately asymmetric write paths. The automatic path yields to humans. If a row is marked user_override = true, the job skips it entirely. The manual path, where a reviewer explicitly asks for a fresh AI draft, refreshes the AI-generated fields while preserving the override flag and the reviewer's notes at write time, so a concurrent human decision is never collateral damage.",
          },
          {
            type: "figure",
            variant: "write-paths",
            caption:
              "Write-path semantics against the override flag. The two paths treat a locked row differently on purpose.",
          },
        ],
      },
      {
        heading: "The Boundary: Model Output Is Untrusted Input",
        blocks: [
          {
            type: "paragraph",
            text: "The second decision was to treat the model like any external client. Nothing it produces is trusted until it passes a contract.",
          },
          {
            type: "paragraph",
            text: "The contract lives in one place. A Zod schema defines what a classification response is: the qualification boolean, a confidence integer from 0 to 100, four-part scores, a bounded narrative, a capped list of disqualifiers, and a QRE category from a fixed enum. The JSON Schema sent to the model as its tool definition is derived from that same Zod schema, so the shape we request and the shape we are willing to persist cannot drift apart. Every response is parsed before persistence, and a malformed response fails loudly instead of writing garbage.",
          },
          {
            type: "paragraph",
            text: "The boundary runs in both directions. Prompt inputs are bounded too. Titles and descriptions are capped, and the full PR body and the nested provider payloads are deliberately excluded from the prompt. Part of that is cost control. The larger part is blast radius: a prompt that accepts arbitrary repository content is a prompt whose behavior you cannot reason about, and an output column without a length cap is a denial-of-service vector aimed at your own dashboard.",
          },
          {
            type: "paragraph",
            text: "This is the same discipline as validating a webhook payload. The model does not get a pass on it because its output reads well.",
          },
          {
            type: "figure",
            variant: "draft-to-truth",
            caption:
              "Model output crosses one explicit contract before anything it says can become product truth.",
          },
        ],
      },
      {
        heading: "The Invariant Lives in the Database",
        blocks: [
          {
            type: "paragraph",
            text: "Schema validation catches malformed output. It cannot catch well-formed output arriving at the wrong moment. The race is plain: an automatic job reads a row, sees no override, and calls the model. In the seconds that takes, a manager overrides the classification. The job's write now clobbers a decision the job never saw.",
          },
          {
            type: "paragraph",
            text: "Application-level checks cannot close that gap, because read, check, and write are separate steps across a network. So the rule moved into the database, where every write path has to pass through it. A single RPC performs the automatic-path write, and the guard travels inside the statement:",
          },
          {
            type: "code",
            language: "sql",
            code: "-- Condensed: the automatic path may insert or refresh a row,\n-- but the override guard is part of the atomic statement.\nupdate classifications\n   set qualifies  = p_qualifies,\n       confidence = p_confidence,\n       narrative  = p_narrative\n where activity_id = p_activity_id\n   and user_override = false;",
          },
          {
            type: "paragraph",
            text: "If a human got there first, the statement matches zero rows and the draft is discarded. There is no window where the application's stale view of the row matters, and the invariant holds for every caller, including the background job someone adds in two years without reading the original design discussion.",
          },
          {
            type: "paragraph",
            text: "That is the real argument for enforcing this in the database. Rules implemented in application code last until someone refactors around them. The database outlives the refactor.",
          },
        ],
      },
      {
        heading: "Security Layers and Product Layers Fail Differently",
        blocks: [
          {
            type: "paragraph",
            text: "ResearchLog's authorization is layered conventionally. User-driven API requests run on a Supabase client scoped by the user's JWT, so row-level security applies even if an application-level filter regresses someday. The service-role client, which bypasses RLS, is reserved for jobs, webhooks, and system persistence, where no user context exists. Manager-only endpoints check membership roles on top of that.",
          },
          {
            type: "paragraph",
            text: "During manual smoke testing, the first pass that ever put two users inside the same organization, this layering caught a real bug. The shape of the bug is the interesting part.",
          },
          {
            type: "paragraph",
            text: "Signed in as an engineer, the UI showed manager-only controls: override buttons and the component creation form. The API was not fooled. Every write came back 403, exactly as designed. But the interface was promising actions the system would refuse, and that is its own kind of correctness failure.",
          },
          {
            type: "paragraph",
            text: "There was no security hole. Row-level security was doing what it was designed to do: members of an org may read their co-members' membership rows, because the product needs that. The frontend's membership query simply fetched memberships without scoping to the signed-in user. In a multi-member org it received the manager's row alongside the engineer's, resolved the current role with a first-match lookup, and picked the wrong one. The fix was one line, plus a regression test pinning the contract:",
          },
          {
            type: "code",
            language: "ts",
            code: ".from('org_memberships')\n.select('org_id, role')\n.eq('user_id', session.user.id) // scope to the signed-in user",
          },
          {
            type: "paragraph",
            text: "The lesson I took from it: backend authorization and product-level role gating are related layers with different jobs. RLS answers what a user may read and write, and says nothing about what a user should be shown. A query can be perfectly secure and still feed the UI data that mis-gates the product. Both layers need their own tests, and the second one only gets exercised when test data includes the multi-user shapes production will actually have.",
          },
        ],
      },
      {
        heading: "Making Uncertainty Visible",
        blocks: [
          {
            type: "paragraph",
            text: "The last boundary is the interface. If the model's output is a draft, the UI has to present it as one.",
          },
          {
            type: "paragraph",
            text: "Every classification in the review feed carries its confidence, its four-part scores, its disqualifiers, and the business component the model inferred. These are the inputs a reviewer needs in order to agree or push back, and they sit next to the accept and override controls that record the decision. The review screen is internal tooling in the truest sense: its user is the person whose judgment the system exists to protect.",
          },
          {
            type: "paragraph",
            text: "The dashboard partitions work into three mutually exclusive buckets: qualifying, review needed, and disqualified. Every activity lands in exactly one, so nothing is double-counted and low-confidence work cannot hide in two places at once. The review bucket is a queue someone is expected to empty. The activity list also deliberately excludes raw GitHub payloads, so the UI receives the fields the workflow needs instead of a megabyte of provider JSON.",
          },
          {
            type: "paragraph",
            text: "The point of all this is to lower the cost of inserting a human at the right moment. In a workflow like this, that is worth more than a smarter model.",
          },
        ],
      },
      {
        heading: "What I Would Carry Forward",
        blocks: [
          {
            type: "paragraph",
            text: "The architecture reduces to a sentence: models draft, humans decide, databases enforce, and the UI makes uncertainty visible. The longer version:",
          },
          {
            type: "list",
            items: [
              "Decide explicitly where model output stops being a suggestion. If that boundary is not written down, your upsert path has already decided it for you.",
              "Validate model output like untrusted client input, and derive the model's output schema and your runtime validation from one definition so they cannot drift.",
              "Put invariants that protect human judgment in the layer every write must pass through. For most products that is the database.",
              "Treat human decisions as the most expensive data in the system. Any code path that can touch them should have to prove it preserves them.",
              "Test security semantics and product semantics separately, with data shaped like production, including the multi-user shapes that only appear after launch.",
            ],
          },
          {
            type: "paragraph",
            text: "AI-assisted workflows raise the bar for systems engineering, because the new component is fluent and confidently wrong at unpredictable moments. The interesting work is everything wrapped around the model call. That work is ordinary engineering, and it decides whether anyone can trust what ships.",
          },
        ],
      },
    ],
  },
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
