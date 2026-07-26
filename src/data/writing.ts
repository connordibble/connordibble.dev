/**
 * Single source of truth for essay figure variants. The figure components in
 * `src/components/writing-figures.tsx` key off this union, and its lookup map
 * is exhaustiveness-checked, so adding a variant here without a component
 * fails the build.
 */
export type WritingFigureVariant =
  | "draft-to-truth"
  | "write-paths"
  | "snippet-vs-component"
  | "audience-altitude"
  | "three-surfaces"
  | "distribution-paths"
  | "page-request-anatomy"
  | "cache-tiers"
  | "cache-contract"
  | "traffic-result"
  // Staged for the drafts in work/essay-drafts (01–05). Building them ahead
  // of publication keeps the figure work reviewable and build-checked.
  | "raw-vs-proposal"
  | "proposal-anatomy"
  | "claim-path"
  | "summary-trust-model"
  | "beside-vs-in-path"
  | "reliability-concerns"
  | "governance-map"
  | "behavior-breaking-changes"
  | "media-to-profile"
  | "incline-review"
  | "prompt-allowlist"
  | "perf-budget-to-context-budget";

export type InlineLink = {
  /** Exact substring of the paragraph text to turn into a link (first match). */
  text: string;
  /** Internal path (e.g. "/writing/slug") or absolute URL. */
  href: string;
};

export type WritingBlock =
  | {
      type: "paragraph";
      text: string;
      links?: InlineLink[];
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
      variant: WritingFigureVariant;
      caption: string;
    };

export type WritingSection = {
  heading: string;
  blocks: WritingBlock[];
};

/** A pointer to a related essay or project, rendered at the foot of a post. */
export type RelatedRef = {
  kind: "writing" | "project";
  slug: string;
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
  socialCardLabel: string;
  socialCardSubtitle: string;
  sections: WritingSection[];
  related?: RelatedRef[];
};

export const writingPosts: WritingPost[] = [
  {
    slug: "context-is-a-budget",
    title: "Context Is a Budget",
    subtitle:
      "Frontend teams learned to treat kilobytes as spend. The same discipline, applied to what goes in a model's context window, and why caching is not a coupon.",
    summary:
      "Context engineering as a budgeting problem: allowlists at the prompt boundary, cost claims verified against usage data, and instruction files kept thin enough to stay true.",
    date: "2026-07-26",
    displayDate: "July 2026",
    readTime: "7 min read",
    featured: true,
    topics: ["AI Tooling", "System Design", "Developer Productivity"],
    socialCardLabel: "Context budget",
    socialCardSubtitle:
      "Every token costs money, latency, and attention. Treating the context window like a performance budget.",
    related: [
      { kind: "writing", slug: "teaching-ai-agents-to-use-a-design-system" },
      { kind: "project", slug: "researchlog" },
      { kind: "project", slug: "dibble" },
    ],
    sections: [
      {
        heading: "A Track of Its Own",
        blocks: [
          {
            type: "paragraph",
            text: "A year ago the running joke was that prompt engineering would be dead by Christmas. This year the AI Engineer World's Fair gave context engineering a track of its own, and the room was full.",
          },
          {
            type: "paragraph",
            text: "Prompt engineering sounded like phrasing. Context engineering is a systems problem: deciding what an agent gets to see, from where, at what cost, with what freshness. The mental model that has served me best comes from somewhere unfashionable. Frontend performance budgets.",
          },
          {
            type: "paragraph",
            text: "Frontend teams learned years ago that a page doesn't get slow in one commit. It gets slow three kilobytes at a time, each one individually justifiable, until someone finally sets a performance budget and makes size a reviewable number. Context windows are on the same curve right now. Context is a budget, and most teams are spending it like it's free.",
            links: [
              {
                text: "performance budget",
                href: "https://web.dev/articles/performance-budgets-101",
              },
            ],
          },
        ],
      },
      {
        heading: "Every Token Is Spend",
        blocks: [
          {
            type: "paragraph",
            text: "A token in the context window costs three ways: money, latency, and attention. The first two show up on invoices and traces. The third is the one teams miss. A model reads everything you send, including the junk, and the junk competes with the signal. Retrieval results that were almost relevant, boilerplate headers, the full JSON of an API response when the workflow needed four fields. The model doesn't get to skim. Whatever you put in the window, you have asked it to weigh.",
          },
          {
            type: "paragraph",
            text: "The attention cost has been measured. The Lost in the Middle results showed models retrieving facts reliably from the edges of a long context and missing the same facts parked in the middle, and that was on clean inputs. Filler does not sit in the window neutrally. It buys degradation.",
            links: [
              {
                text: "Lost in the Middle",
                href: "https://aclanthology.org/2024.tacl-1.9/",
              },
            ],
          },
          {
            type: "paragraph",
            text: "The question worth asking is what the workflow actually needs, stated as an allowlist, with everything else excluded by default.",
          },
        ],
      },
      {
        heading: "What Doesn't Belong in the Prompt",
        blocks: [
          {
            type: "paragraph",
            text: "ResearchLog classifies development activity against the IRS four-part test, which means its prompts carry metadata about pull requests. The tempting version is to serialize what the GitHub API returns and let the model sort it out. The API returns a lot: full PR bodies, and nested base and head payloads that carry entire repository objects along for the ride.",
          },
          {
            type: "paragraph",
            text: "None of that survives into the prompt. Prompt metadata is built the way the export path builds its evidence files: from an explicit allowlist, never by spreading a raw object and trimming afterward. Titles, states, the fields the classification actually reasons about. The PR body is capped. The nested payloads never enter.",
          },
          {
            type: "figure",
            variant: "prompt-allowlist",
            caption:
              "The prompt is a contract surface. Raw API responses don't get to cross it.",
          },
          {
            type: "paragraph",
            text: "The allowlist matters for a second reason that has nothing to do with cost. Whatever enters the prompt becomes model input forever, in your logs and in every eval and replay that follows. A bounded prompt is easier to reason about the same way a bounded API response is. You can read one and say what the model knew.",
          },
        ],
      },
      {
        heading: "Caching Is Not a Coupon",
        blocks: [
          {
            type: "paragraph",
            text: "Prompt caching is the line item everyone claims and few verify. ResearchLog sets cache_control on its system block, exactly the way the docs suggest, and it saves nothing. Caching covers the prefix up to the breakpoint, so putting it on the system block caches the tool schema plus the system prompt: a little under 400 tokens against a minimum cacheable prefix length of 1,024. Nothing errors. The flag is set, the prefix is too short, and both cache counters stay at zero.",
            links: [
              {
                text: "minimum cacheable prefix length",
                href: "https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching",
              },
            ],
          },
          {
            type: "paragraph",
            text: "That is an embarrassing paragraph to write and a cheap lesson to learn. The billing surface has its own semantics, minimum cacheable sizes and prefix stability rules, and the only ground truth is usage metrics on real traffic. A comment in that file tells the next reader to check cache_read_input_tokens before claiming any savings. Nothing in the codebase logs it. The instruction to measure is not the measurement.",
          },
          {
            type: "paragraph",
            text: "Cost work in AI systems is observability work. If a team claims a caching win and cannot point at cache_read_input_tokens moving, they are describing an intention. The frontend version of this lesson took years: minified is not the same as small, and a budget you don't measure is a wish.",
          },
        ],
      },
      {
        heading: "Thin Skills, Live Docs",
        blocks: [
          {
            type: "paragraph",
            text: "The other place context leaks is instructions. The pattern I keep returning to, in the design-system agent work and in dibble, my open-source collection of portable agent skills, is to keep the skill thin and point it at living truth.",
            links: [
              {
                text: "the design-system agent work",
                href: "/writing/teaching-ai-agents-to-use-a-design-system",
              },
              { text: "dibble", href: "/projects/dibble" },
            ],
          },
          {
            type: "paragraph",
            text: "A skill that copies component API tables into itself spends budget twice. It pays tokens on every run to carry the copy, and it pays drift forever because the copy rots the moment the source moves. The thin version teaches the agent where the docs live, which rules are load-bearing, and which validator has the final word. Truth stays in one place. The window carries directions to the source instead of a stale snapshot of it.",
          },
          {
            type: "paragraph",
            text: "The test I use for any instruction file: if this paragraph disappeared, would the agent's output change? If nobody can name the failure the paragraph prevents, it is dead weight the window pays for on every run.",
          },
        ],
      },
      {
        heading: "Budgets Force Design",
        blocks: [
          {
            type: "paragraph",
            text: "A budget forces the design conversation teams were avoiding.",
          },
          {
            type: "figure",
            variant: "perf-budget-to-context-budget",
            caption:
              "A discipline frontend already paid to learn, transferring at par.",
          },
          {
            type: "paragraph",
            text: "When a workflow's prompt wants to grow past its ceiling, that pressure is information. Either the workflow is doing too many jobs, or the retrieval is compensating for docs that should be better, or someone is shipping the whole database because choosing fields felt like work. The budget doesn't answer the question. It refuses to let the question go unasked.",
          },
        ],
      },
      {
        heading: "What I Would Carry Forward",
        blocks: [
          {
            type: "paragraph",
            text: "Reduced to a sentence: decide what enters the window the way you decide what crosses an API boundary, and verify cost claims against usage data rather than configuration. The longer version:",
          },
          {
            type: "list",
            items: [
              "Build prompts from allowlists, never by trimming raw payloads. What you exclude by default cannot leak, bloat, or surprise you in a log.",
              "Cap every free-text field that enters a prompt. User-shaped and API-shaped text grows until something bounds it.",
              "Verify caching against usage metrics before claiming the savings. A cache_control flag with zero cache reads is a decoration.",
              "Wire the check into the system rather than into a comment. A note telling the next reader to verify usage metrics is not the same as logging them.",
              "Keep instruction files thin and pointed at live sources. A copied table is a second source of truth with a decay rate.",
              "Watch token spend per workflow the way you watch bundle size per route. Regressions are cheap to catch early and expensive to excavate later.",
              "Let the budget trigger design reviews. A prompt that keeps growing is a workflow asking to be split.",
            ],
          },
        ],
      },
      {
        heading: "The Broader Point",
        blocks: [
          {
            type: "paragraph",
            text: "Every platform generation relearns the same economics: the resource that feels infinite in the demo becomes the constraint in production. Memory, bandwidth, bundle size, and now the context window. The teams that handle it well are the ones that made the spend visible and gave someone the job of saying no.",
          },
          {
            type: "paragraph",
            text: "The work itself is unglamorous. Decide what each workflow needs, build the prompt from that list, and read the usage numbers rather than the configuration. That holds regardless of which model you are running this quarter.",
          },
        ],
      },
    ],
  },
  {
    slug: "agentic-software-needs-a-design-system",
    title: "Agentic Software Needs a Design System",
    subtitle:
      "The governance questions agent builders are asking now are the ones enterprise design systems have been answering for years: primitives, constraints, docs, permissions, review, and release discipline.",
    summary:
      "Why an AI agent should be treated as another contributor to a governed platform, and how design-system mechanisms map one for one onto agentic equivalents.",
    date: "2026-07-07",
    displayDate: "July 2026",
    readTime: "9 min read",
    featured: true,
    topics: ["AI Tooling", "Platform Engineering", "Design Systems"],
    socialCardLabel: "Governance map",
    socialCardSubtitle:
      "How design-system governance maps onto primitives, permissions, review, and release discipline for coding agents.",
    related: [
      { kind: "writing", slug: "from-snippets-to-shadow-dom" },
      { kind: "writing", slug: "teaching-ai-agents-to-use-a-design-system" },
      { kind: "project", slug: "sfds" },
    ],
    sections: [
      {
        heading: "The Same Problem, Faster",
        blocks: [
          {
            type: "paragraph",
            text: "Enterprise design systems solved a version of the agent problem before agents arrived.",
          },
          {
            type: "paragraph",
            text: "The surfaces look nothing alike. A design system governs buttons, form fields, tokens, and page patterns. An agentic system governs tools, prompts, schemas, and generated artifacts. Underneath, both answer one question: how do many contributors move fast without turning shared quality into local taste? For a design system the contributors are a thousand engineers. For an agentic system they are models, and the models are faster.",
          },
          {
            type: "paragraph",
            text: "I led engineering on an enterprise design system for close to three years and have spent the time since building agent workflows on both sides of that boundary. The pattern is hard to unsee. Every governance mechanism the design system needed has a direct agentic equivalent, and skipping one produces the same failure it produced for UI work.",
          },
          {
            type: "paragraph",
            text: "Agentic software needs a design system. Not the UI kind: the operating layer the UI kind taught us to build.",
          },
        ],
      },
      {
        heading: "The Agent Is Another Contributor",
        blocks: [
          {
            type: "paragraph",
            text: "The design system I worked on replaced a copy-paste library. Teams pasted HTML from a docs site, edited it locally, and kept shipping. The pages still looked close enough, so the drift stayed quiet until source-side fixes stopped applying cleanly, and by the time discovery started, whole forks of the system had grown in different areas. I wrote that story up separately; the short version is that ungoverned contribution forked the platform.",
            links: [
              {
                text: "wrote that story up separately",
                href: "/writing/from-snippets-to-shadow-dom",
              },
            ],
          },
          {
            type: "paragraph",
            text: "Agents reproduce that failure through a different door. They produce reasonable-looking code, configuration, mappings, and summaries that sit just outside the supported path. The output compiles. It passes a glance. The drift surfaces later, when a platform fix does not apply, a validator flags an API that never existed, or a reviewer cannot reconstruct why an artifact exists. A busy engineer routes around a bad component API; an agent does the same thing to your platform at generation speed. Speed only makes the drift arrive sooner.",
          },
          {
            type: "paragraph",
            text: "The conclusion I keep landing on is to treat the agent as another contributor to a governed system. Contributors need primitives, current docs, clear permissions, repeatable checks, and a review path. The design system's mechanisms map onto agentic equivalents almost row by row.",
          },
          {
            type: "figure",
            variant: "governance-map",
            caption:
              "The mapping I actually use. For each row, an agentic system either has the equivalent or it has a gap with a name.",
          },
        ],
      },
      {
        heading: "Primitives and Constraints",
        blocks: [
          {
            type: "paragraph",
            text: "SFDS moved governance into the component boundary. Shadow DOM took the markup engineers used to edit and put it inside the component, where the platform team controls it. Consumers got a smaller API, and being almost right stopped being possible in most of the ways that used to matter.",
          },
          {
            type: "paragraph",
            text: "The agentic equivalents are tools and schemas. A model should not have to infer every possible operation from raw text when the product can expose a small set of safe actions. It should not generate arbitrary UI when a design-system component exists, and it should not hand back free-form JSON when a schema can define the shape. I keep a small open-source package, zod-ai-tool, for the narrowest version of this: the provider's tool definition and the application's runtime validation derive from one Zod schema, so the two contracts cannot drift apart. DesignRail applies the same move to design-to-code, where the mapper proposes from a governed set of Web Component mappings instead of writing whatever frontend code seems plausible.",
          },
          {
            type: "paragraph",
            text: "Narrow surfaces are sometimes read as distrust of the model. The motive is different: a narrow surface is what makes the useful path legible enough for the model to find it.",
          },
        ],
      },
      {
        heading: "Docs Are Part of the Runtime",
        blocks: [
          {
            type: "paragraph",
            text: "For human consumers, docs describe the system. For agents, docs are closer to configuration: whatever the agent can read and obey at task time is the behavior you get. When I explored giving agents design-system context, the version that survived was live docs plus small installable skills, with a heavier retrieval platform built first and then retired. A skill teaches where the docs live, which component APIs are authoritative, and which rules are non-negotiable. It does not copy component APIs into a second document, because a second document is a fork with better intentions.",
            links: [
              {
                text: "live docs plus small installable skills",
                href: "/writing/teaching-ai-agents-to-use-a-design-system",
              },
            ],
          },
          {
            type: "paragraph",
            text: "The design-system discipline carries over unchanged. Versioned docs let a team on last quarter's release read last quarter's truth, and the same applies to agent guidance pinned against a component version. A thin skill is easier to keep true than a clever one.",
          },
        ],
      },
      {
        heading: "Permissions Need Product Meaning",
        blocks: [
          {
            type: "paragraph",
            text: "Design systems run on permissions that rarely get called that. Consumers set supported props and nothing else. The platform team changes internals. Designers change tokens through a reviewed pipeline. Deprecation windows say how long old behavior stays safe. Nobody calls this an authorization model, but that is what it is.",
          },
          {
            type: "paragraph",
            text: "Agentic systems need theirs stated just as concretely. Which actions may the agent take without approval? Which produce drafts, and which write durable state? Which outputs require a human decision before anything downstream may read them? ResearchLog draws one of those lines in the database itself: a background job may write a fresh classification, and it may not overwrite a human override, because the guard travels inside the write statement. The permission is enforced as a WHERE clause rather than remembered as a convention.",
            links: [
              {
                text: "ResearchLog draws one of those lines in the database itself",
                href: "/writing/when-the-model-is-a-draft",
              },
            ],
          },
          {
            type: "paragraph",
            text: "That is what a permission with product meaning looks like. It protects the data the workflow exists to capture, and it holds for every caller, including the one added years later by someone who never read the design discussion.",
          },
        ],
      },
      {
        heading: "Review Is the Governance Surface",
        blocks: [
          {
            type: "paragraph",
            text: "Design review, accessibility review, and release review all exist because source alone does not carry enough context. Someone has to decide whether an artifact is acceptable inside the system, and they need the surrounding evidence to decide well.",
          },
          {
            type: "paragraph",
            text: "Generated artifacts need the same surface: what the agent proposed, what it consumed, which checks passed, which failed, and what a human decided. DesignRail persists exactly that object for every component mapping, and the argument for building review surfaces this way is its own essay. The design-system version of the lesson is older and simpler. A platform that cannot show why an artifact was accepted will eventually be asked to defend one it cannot explain.",
          },
        ],
      },
      {
        heading: "Release Discipline for Behavior",
        blocks: [
          {
            type: "paragraph",
            text: "SFDS treats a careless major version against a thousand-plus consumers as a reliability event, so releases are versioned, deprecations get announced windows, and docs version alongside the code. Agent workflows need the same discipline for a sneakier reason: behavior can break with no API change at all.",
          },
          {
            type: "figure",
            variant: "behavior-breaking-changes",
            caption:
              "Changes that pass typecheck and break consumers anyway. Each one deserves release notes, tests, and a rollback path.",
          },
          {
            type: "paragraph",
            text: "A prompt edit changes every summary downstream. A schema tightening rejects arguments that passed yesterday. A mapper improvement changes which component the same design node receives. These are breaking changes by any consumer-facing definition, and most teams ship them with less ceremony than a patch release. The practices that fix this are not new. The feedback platform I shipped ran GitOps deploys with a rollback path during its convention pilot, and DesignRail runs CI gates and ADRs while it is still early. Neither practice waited for the workflow to become important. That is the point: the discipline is cheapest before anyone depends on you.",
          },
        ],
      },
      {
        heading: "What I Would Carry Forward",
        blocks: [
          {
            type: "paragraph",
            text: "Reduced to a sentence: give agents the governed path a good design system gives engineers, and name the gaps using the same words. The longer version:",
          },
          {
            type: "list",
            items: [
              "Treat the agent as a contributor, not a feature. Contributors need primitives, docs, permissions, and review, and an agent missing one will route around the platform like any busy engineer.",
              "Make the supported action surface smaller than the raw capability surface. Tools, schemas, and component APIs shrink the space of plausible mistakes.",
              "Keep docs live and guidance thin. Anything that copies the source of truth becomes a second source of truth on a delay.",
              "Give permissions product meaning, and enforce the ones that protect human judgment in the layer every write passes through.",
              "Review generated artifacts with the evidence attached, and persist the decisions. The corrections are where the platform learns.",
              "Version behavior. Prompts, schemas, mappers, and validator rules can all break consumers without breaking the build.",
            ],
          },
          {
            type: "paragraph",
            text: "Most of this is unglamorous: contracts, docs, pipelines, and review queues. That was true of the design system too, and it is why the lesson transfers.",
          },
        ],
      },
      {
        heading: "The Broader Point",
        blocks: [
          {
            type: "paragraph",
            text: "Agentic software is usually discussed as an autonomy problem: how much should the system do on its own? The operating question is governance. What can the system do, under which constraints, with whose approval, and with what record left behind?",
          },
          {
            type: "paragraph",
            text: "Enterprise UI platforms spent years learning to package decisions into primitives, write the supported path down, validate what can be validated, and put humans where judgment lives. Agentic systems get to start from that inheritance instead of rediscovering it one incident at a time.",
          },
        ],
      },
    ],
  },
  {
    slug: "success-was-the-incident",
    title: "Success Was the Incident",
    subtitle:
      "How a design system’s own adoption turned a five-minute cache into a budget problem, and the cache tiers and content hashing that cut delivery cost by two thirds.",
    summary:
      "Adoption turned a five-minute browser cache into a budget problem. Splitting it into three caches with three owners, hashing dependencies behind stable component files, and a finops partnership cut request volume to a third of its peak.",
    date: "2026-06-26",
    displayDate: "June 2026",
    readTime: "10 min read",
    featured: true,
    topics: ["Platform Engineering", "System Design", "Design Systems"],
    socialCardLabel: "Cache incident",
    socialCardSubtitle:
      "How adoption turned a five-minute cache into a budget problem, and the architecture that cut delivery cost by two thirds.",
    related: [
      { kind: "writing", slug: "from-snippets-to-shadow-dom" },
      { kind: "project", slug: "sfds" },
    ],
    sections: [
      {
        heading: "The Graph Nobody Celebrates",
        blocks: [
          {
            type: "paragraph",
            text: "I ended the last essay with a promise that the caching and cost story behind SFDS deserved its own write-up. This is that story, and it starts where the last one ended: with adoption. Every team that migrated added pages, and every page added customers pulling components from our CDN. The line we had worked eighteen months to bend upward had a twin that bent upward with it: the delivery bill.",
            links: [
              {
                text: "the last essay",
                href: "/writing/from-snippets-to-shadow-dom",
              },
            ],
          },
          {
            type: "paragraph",
            text: "Our browser caching strategy at the time was a five-minute TTL. That was a defensible default in the early days, when consumers were few and the ability to push a fix and see it everywhere within minutes was worth almost any cost. As migration progressed it got exposed fast. Any customer whose visit outlasted five minutes was re-downloading files that had not changed, and most of the files never changed between releases at all.",
          },
          {
            type: "paragraph",
            text: "The architecture multiplied the problem. Components pull in shared libraries and dependencies as they need them, which is good engineering and terrible arithmetic: a single page could fan out into hundreds of CDN requests per customer. Multiply by pages, by customers, and by a cache that forgets everything on a five-minute timer, and request volume climbed with every team we onboarded. Success was the incident.",
          },
          {
            type: "paragraph",
            text: "The way it surfaced is worth recording. We track request volume through firewall metrics in Elastic, and that chart moved first: traffic climbing with every migrated team, well past what page counts alone would suggest. We took the finding to the finops team and they confirmed the same story from the cost side. The dashboards we had built for the platform itself tracked adoption, quality, and accessibility, and none of them caught it. The firewall did.",
          },
          {
            type: "figure",
            variant: "page-request-anatomy",
            caption:
              "A page requests the stable entry file for each component it uses; those files reference shared libraries and dependencies beneath them. The shared layer carried most of the request volume.",
          },
        ],
      },
      {
        heading: "The First Lever: More npm",
        blocks: [
          {
            type: "paragraph",
            text: "The first lever was already partly in place. The npm package was in production with our server-rendered apps, where bundling is mandatory anyway, and a bundled consumer gets tree shaking, version pinning, and no runtime CDN dependency at all. The cost findings prompted the next step: making npm consumption broadly available and actively encouraged, because every team that moved was a team whose customers stopped generating CDN requests entirely.",
          },
          {
            type: "paragraph",
            text: "It does not fit everywhere, and pretending otherwise would have stalled the whole effort. Legacy stacks without modern build pipelines cannot bundle. Shared shells and pages that depend on live propagation need the CDN’s update model, which is the reason we offer it in the first place. Teams mid-migration were not going to re-platform their build to save us bandwidth. We took the npm wins available and accepted the real constraint: the CDN path serves a large share of the estate permanently, so the CDN path had to get cheap on its own merits.",
          },
        ],
      },
      {
        heading: "Three Caches, Three Owners",
        blocks: [
          {
            type: "paragraph",
            text: "The phrase “the cache” hides the structure of the problem. There are three caches in this system with three different owners: the browser cache that lives on customers’ devices, the edge cache the CDN operates, and the origin behind both. They expire for different reasons, they fail in different directions, and they need different levers. Splitting them apart was the design step that made everything after it tractable.",
          },
          {
            type: "paragraph",
            text: "The edge tier went first because we control it directly. We raised the CDN to its maximum TTL and wired automated cache invalidation into the CI/CD pipeline, scoped to what a release actually changed. The edge cache stopped expiring on a timer and started expiring on intent. Deploys became the invalidation event, the origin stopped absorbing traffic it had already answered, and we kept the property the five-minute TTL had been protecting all along: when we ship, the new content goes out.",
          },
          {
            type: "figure",
            variant: "cache-tiers",
            caption:
              "The same system, before and after, tier by tier. Each tier got the lever its owner could actually operate.",
          },
        ],
      },
      {
        heading: "Hashing Behind Stable Component Files",
        blocks: [
          {
            type: "paragraph",
            text: "The browser tier was the interesting one, and where the volume actually lived. The majority of requests were never for the component entry files. They were for the layer underneath: shared libraries, dependencies, common chunks, the files components pull in as needed. Those files change on our schedule, at release time. Customers’ browsers were treating them as if they might change any minute, because a five-minute TTL says exactly that.",
          },
          {
            type: "paragraph",
            text: "One constraint shaped the design. Consumers need a stable URL for each component they use. A team references files such as sf-button.js and sf-modal.js, and those URLs cannot move between releases, or every adopter has to touch its pages every time we ship. Everything those component files reference, though, is ours to restructure.",
          },
          {
            type: "paragraph",
            text: "So I wrote a script into our Rollup build that keeps each component entry file stable and content-hashes the dependency files it references. A dependency’s filename changes exactly when its contents do, which makes the hashed file immutable by construction. If it exists, it is correct.",
          },
          {
            type: "code",
            language: "text",
            code: "before                        after\n------                        -----\nsf-button.js                  sf-button.js              (component entry, stable)\nsf-modal.js                   sf-modal.js               (component entry, stable)\nshared-utils.js               shared-utils.f3a91c.js    (hashed)\nbase-styles.js                base-styles.7d20be.js     (hashed)\nchunk-form-field.js           chunk-form-field.c54e12.js (hashed)",
          },
          {
            type: "paragraph",
            text: "Cache metadata per file class does the rest. Hashed files carry a one-year TTL, which in practice means indefinite: the browser holds the file until we ship a change, the hash moves, and the new filename busts the cache on its own. No invalidation call, no timer, no coordination with anyone. Component entry files keep their stable URLs and a far more lenient TTL, tuned to what usage data and testing showed about a typical visit. The specific number stays internal, but the principle travels fine: a component entry file’s TTL is a product decision about how fast changes reach customers, and data should set it rather than a default.",
          },
          {
            type: "figure",
            variant: "cache-contract",
            caption:
              "Two file classes, two cache behaviors. The hash does the invalidation work that timers and purge calls used to do.",
          },
          {
            type: "paragraph",
            text: "What falls out of this is that each component entry file acts as a manifest for its own dependency graph. The component file keeps its stable URL and references the current hashes for the shared utilities, styles, and chunks it needs. Those hashed dependencies stay immutable and can be reused across component entry files. The build system promises that a filename identifies its contents. The cache metadata promises a TTL that matches each file’s real change frequency. Neither tier needs to know anything else about the other.",
          },
        ],
      },
      {
        heading: "The Last Lever Was a Meeting",
        blocks: [
          {
            type: "paragraph",
            text: "The final optimization had no code in it. With the engineering levers in place, our traffic became predictable, and predictable traffic is a negotiating asset. We partnered with our cloud provider’s finops organization and our internal cloud teams to move CDN spend off a pure pay-as-you-go model and onto a planned model. The optimized traffic made the commitment safe to size, and the commitment made the remaining traffic cheaper per request. Engineering work and procurement work compounding like that is rarer than it should be, mostly because the two conversations seldom happen in the same room.",
          },
        ],
      },
      {
        heading: "What It Added Up To",
        blocks: [
          {
            type: "paragraph",
            text: "The whole effort ran about a month end to end. Together the levers cut request traffic, and the costs that follow it, to roughly a third of where they started. Two thirds of what our CDN had been serving turned out to be the same bytes, re-downloaded on a five-minute timer.",
          },
          {
            type: "figure",
            variant: "traffic-result",
            caption:
              "Request volume and delivery cost, before and after. The remaining third is traffic that genuinely needed to happen.",
          },
          {
            type: "paragraph",
            text: "The order mattered. npm adoption shrank the population of CDN consumers where it could. Edge TTLs and deploy-scoped invalidation made the tier we own efficient. Content hashing made the browser tier self-invalidating. And the pricing model captured the predictability the first three levers created. Each one made the next one stronger.",
          },
        ],
      },
      {
        heading: "What I Would Carry Forward",
        blocks: [
          {
            type: "paragraph",
            text: "Reduced to a sentence: hash what can move, stabilize what cannot, and make every TTL tell the truth about how often its file actually changes. The longer version:",
          },
          {
            type: "list",
            items: [
              "Defaults are decisions. A five-minute TTL was harmless at a handful of consumers and a budget line at a hundred teams. Revisit defaults whenever adoption changes the math underneath them.",
              "Split the cache by owner before optimizing. Browser, edge, and origin expire for different reasons, and a lever that helps one tier can be irrelevant to another.",
              "Content hashing turns invalidation from coordination into arithmetic. The filename is the cache key, and the build system maintains it for free.",
              "Protect the stable component URLs consumers reference. The dependency files behind them can be immutable, and immutable files are the cheapest files there are.",
              "Take the finops meeting. Predictable traffic is negotiating power, and engineering teams almost never cash it in.",
            ],
          },
          {
            type: "paragraph",
            text: "Most of this is one build script, some cache headers, and a pricing conversation. The gain came from running them in the right order.",
          },
        ],
      },
      {
        heading: "The Broader Point",
        blocks: [
          {
            type: "paragraph",
            text: "Platform cost work is adoption stewardship. Every team that chose SFDS handed us a slice of their page performance and, indirectly, a slice of the company’s bill. A platform that gets more expensive per consumer as it succeeds has a design flaw, no matter how good the components are.",
          },
          {
            type: "paragraph",
            text: "The caching architecture holds for the same reason the design system does. The cheap path and the correct path are the same path: browsers do the right thing by default, deploys invalidate exactly what they change, and the stable component URLs are the only promises we keep by hand.",
          },
        ],
      },
    ],
  },
  {
    slug: "from-snippets-to-shadow-dom",
    title: "From Snippets to Shadow DOM",
    subtitle:
      "Replacing a copy-paste design system across 100+ product teams and five frameworks at State Farm.",
    summary:
      "Why a jQuery-era design system splintered into forks and customized local versions, how Shadow DOM moved governance into the component boundary, and what it took to earn adoption from a thousand engineers.",
    date: "2026-06-12",
    displayDate: "June 2026",
    readTime: "13 min read",
    featured: false,
    topics: ["Design Systems", "Platform Engineering", "Technical Leadership"],
    socialCardLabel: "System migration",
    socialCardSubtitle:
      "Replacing a copy-paste design system across 100+ product teams and five frameworks at State Farm.",
    related: [
      { kind: "writing", slug: "success-was-the-incident" },
      { kind: "writing", slug: "teaching-ai-agents-to-use-a-design-system" },
      { kind: "project", slug: "sfds" },
    ],
    sections: [
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "State Farm’s frontend estate is bigger than any one person can see. More than a hundred product teams ship pages across Angular, React, Next.js, server-rendered JSP, and stacks in between. Each of those teams, at some point, has built its own button. Most have built their own form patterns, their own modals, and their own interpretation of the brand.",
          },
          {
            type: "paragraph",
            text: "The cost of that shows up slowly and then all at once. Brand updates become search-and-replace exercises across hundreds of local implementations. Accessibility fixes have to be rediscovered team by team. Engineers solve interface problems that were already solved three teams over, and every release compounds the drift a little more.",
          },
          {
            type: "paragraph",
            text: "My role was lead engineer for the design system platform’s implementation. I worked closely with XD, State Farm’s design organization, advising on design from a technical standpoint, but I was not the designer. I was responsible for building the platform, and for the education and migration support that carried it into the broader engineering community.",
          },
          {
            type: "paragraph",
            text: "My area is eight product teams and roughly fifty engineers on the digital experience platform. SFDS serves the whole enterprise: a hundred-plus product teams and over a thousand engineers and designers. The distance between those two numbers is what this essay is about. I had direct influence over a fraction of the system’s consumers. Everyone else had to choose it.",
          },
        ],
      },
      {
        heading: "The System We Replaced",
        blocks: [
          {
            type: "paragraph",
            text: "There was already a design system, which is the detail that keeps this story honest. The legacy library was jQuery, CSS, and HTML: scripts and styles delivered over a CDN, with component markup distributed as HTML snippets on the docs site. A team copied the snippet for a card or a navigation bar, pasted it into their app, and the shared JavaScript hydrated it at runtime.",
          },
          {
            type: "code",
            language: "html",
            code: "<link rel=\"stylesheet\" href=\"https://cdn.example.com/ds/2.x/components.css\">\n\n<div class=\"form-field form-field--text\">\n  <label class=\"form-field__label\" for=\"policy-number\">Policy number</label>\n  <input class=\"form-field__input\" type=\"text\" id=\"policy-number\" />\n</div>\n\n<script src=\"https://cdn.example.com/ds/2.x/components.js\"></script>\n<script>\n  $(function () {\n    DS.formField.init(\"#policy-number\");\n    // remember to call DS.formField.destroy() on teardown\n  });\n</script>",
          },
          {
            type: "paragraph",
            text: "Copy and paste is a distribution model with no governance in it. Once the markup lived in a team’s codebase, engineers could tinker with it, and they did. Small local edits accumulated until the HTML in production no longer matched the HTML in the docs. That undercut the system twice over. The pasted markup drifted from the structure the shared JavaScript expected, so library updates broke pages in ways nobody could predict from the source side. And shipping an improvement meant asking a hundred teams to re-paste markup by hand. Updates from source became nearly impossible.",
          },
          {
            type: "paragraph",
            text: "Once we started looking, the drift was everywhere. Form fields, modals, accordions, navigation: teams had edited pasted markup just enough that source-side fixes no longer applied cleanly. An accessibility improvement would land in the library and quietly miss many of the pages it was meant for, and spacing, usability, and style corrections went the same way. Consumers rarely noticed, because the pages still looked good enough. The teams believed they were on the design system. From the platform side, each of those pages had become a fork.",
          },
          {
            type: "paragraph",
            text: "Modern frameworks made it worse. The jQuery code carried complex initialization and uninitialization requirements that fought the component lifecycles of the frameworks teams were actually building in. Wiring a legacy component into an Angular or React app meant hand-managing setup and teardown that the framework wanted to own, and getting it subtly wrong was easy.",
          },
          {
            type: "paragraph",
            text: "By the time discovery started, multiple full forks and customized local versions of the design system had grown out of different areas, each one an answer to needs the legacy system was not meeting. The strongest argument for a rewrite was never a slide. It was the forks.",
          },
          {
            type: "figure",
            variant: "snippet-vs-component",
            caption:
              "The same governance questions, answered by two distribution models. The legacy column is where the forks came from.",
          },
        ],
      },
      {
        heading: "Discovery Before Architecture",
        blocks: [
          {
            type: "paragraph",
            text: "We did not open a component repo on day one. We opened a discovery effort, because the legacy system’s history showed what happens when that step gets skipped. The goal was to understand why teams diverged before proposing what they should converge on.",
          },
          {
            type: "paragraph",
            text: "That meant metrics on where duplicated UI work was actually happening, one-on-one interviews with engineers across product teams, group sessions where teams could argue with each other in front of us, and feedback collection embedded in the places engineers already work, starting with the docs site itself. A survey link in an email gets ignored. A feedback prompt on the exact docs page where someone just got stuck gets answered.",
          },
          {
            type: "paragraph",
            text: "The same evidence then had to travel up. Engineers wanted to know integration cost and what would break. Their leads wanted sequencing and what their roadmaps would have to absorb. Designers in XD wanted to know who owned design intent once it became code. Executives wanted the duplicated spend, the brand exposure, and the accessibility risk quantified, and multiple competing implementations of one design system quantify duplicated spend rather vividly. None of those audiences was wrong to ask its own question, and the discovery work meant we could answer each one in its own terms instead of repeating the pitch that worked in the last room.",
          },
          {
            type: "figure",
            variant: "audience-altitude",
            caption:
              "The same evidence, answered at four altitudes. Each audience got the version that mapped to a decision it could actually make.",
          },
          {
            type: "paragraph",
            text: "Leadership buy-in arrived because the case was already standing on data when it reached them. And when the mandate came, it held, because the engineers it applied to had watched their own feedback shape the thing being mandated.",
          },
        ],
      },
      {
        heading: "The Bet: Web Components",
        blocks: [
          {
            type: "paragraph",
            text: "The estate dictated the first architectural constraint: whatever we built had to run everywhere, because no team was going to rewrite its framework to adopt a button. We researched how other large enterprises with similarly mixed estates had approached the same problem, and the pattern across them was consistent. Framework-agnostic delivery through web components.",
          },
          {
            type: "paragraph",
            text: "For us, Shadow DOM was the governance answer as much as a styling boundary. The markup engineers used to copy, paste, and quietly edit now lives inside the component, where the platform team controls it. Internals can be fixed, improved, or restructured behind the scenes without asking a hundred teams to touch their HTML, and the public API that consumers see gets simpler because it no longer exposes the implementation. The thing that made the legacy system ungovernable stopped being reachable.",
          },
          {
            type: "paragraph",
            text: "Custom elements also dissolved the lifecycle problem. The browser owns connect and disconnect, so the manual initialization choreography the jQuery library demanded simply went away, and the components behave like native elements inside any framework’s lifecycle instead of fighting it. The policy-number field from the legacy snippet collapses to a single tag:",
          },
          {
            type: "code",
            language: "html",
            code: "<sf-textfield label=\"Policy number\"></sf-textfield>",
          },
          {
            type: "paragraph",
            text: "SFDS is built on Lit, and seventy-plus primitives ship this way. The costs were real and we took them with eyes open. Custom-element event binding differs by framework and surprises React developers in particular. Server-side rendering and hydration need deliberate handling rather than coming for free. Form participation took work that a single-framework library would never think about. We wrote those seams down per framework in the docs instead of letting every adopting team rediscover them, which turned a list of objections into a list of documented answers.",
          },
        ],
      },
      {
        heading: "One System, Three Audiences",
        blocks: [
          {
            type: "paragraph",
            text: "A complication most design-system writing skips: the consumers were not one kind of page. Customer-facing statefarm.com pages, internal tools, and agent-facing applications all needed the system, and they did not need the same things from it.",
          },
          {
            type: "paragraph",
            text: "Customer pages carry the brand and the heaviest accessibility and performance obligations, in front of the largest audience. Internal tools optimize for delivery speed and data density, and their users sit inside them for hours. Agent-facing surfaces are their own category: power users running workflow-heavy sessions all day, in UIs that are busier by design. More information per screen, heavier components like data tables, and their own navigation and styling needs.",
          },
          {
            type: "figure",
            variant: "three-surfaces",
            caption:
              "Three audiences with different pressures, one token set and one component API underneath all of them.",
          },
          {
            type: "paragraph",
            text: "The answer was to be strict about what stays constant and explicit about what flexes. Tokens, accessibility semantics, and core component APIs do not vary by audience. Density, styling, and page-level patterns do, through variants baked into the components and driven by design tokens. That structure has a practical payoff: a styling or density change for the agent context is a token update designers can make asynchronously, instead of an engineering ticket waiting in someone’s backlog. Drawing that line early, with XD in the room, kept the system from forking into separate systems wearing one name. We had already seen that movie.",
          },
        ],
      },
      {
        heading: "Distribution Is the Product",
        blocks: [
          {
            type: "paragraph",
            text: "Distribution turned out to be one of the hardest design problems in the whole effort, because the two guarantees consumers needed pulled in opposite directions.",
          },
          {
            type: "paragraph",
            text: "Some changes need to reach every page immediately. A brand correction or an accessibility fix should not wait for a hundred teams to rebuild and redeploy on their own schedules, and that is the case for CDN delivery. Other consumers need the opposite guarantee: pinned versions, reproducible builds, lockfile resiliency, and server-side rendering support, which is the case for an npm package. Choosing one channel meant failing half the estate.",
          },
          {
            type: "paragraph",
            text: "So SFDS ships through both, deliberately. A multi-CDN setup, so a single provider outage cannot take component delivery down with it, alongside the npm package. The infrastructure was the easier half. The documentation did the real work: written guidance on which channel fits which situation, so teams choose on purpose instead of inheriting whichever default their neighbor used.",
          },
          {
            type: "figure",
            variant: "distribution-paths",
            caption:
              "Two channels with documented reasons to choose each. The guidance is as much the product as the pipeline is.",
          },
          {
            type: "paragraph",
            text: "Distribution at this scale also changes what a breaking change means. Against a thousand-plus consumers, a careless major version is a reliability event. Releases are versioned, deprecations get announced windows instead of surprises, and docs stay versioned alongside the code, so a team on last quarter’s release reads last quarter’s truth. Serving components through CDNs at this volume also turned caching strategy and delivery cost into a genuine system-design problem, one with enough depth that it deserves its own write-up.",
            links: [
              {
                text: "it deserves its own write-up",
                href: "/writing/success-was-the-incident",
              },
            ],
          },
        ],
      },
      {
        heading: "The Contract With Design",
        blocks: [
          {
            type: "paragraph",
            text: "SFDS was designed with XD rather than handed to engineering as a finished spec, and that partnership had a failure mode we needed to engineer around: two sources of truth. Designers work in Figma. Engineers work in code. Left alone, the two drift, and every drift becomes a meeting.",
          },
          {
            type: "paragraph",
            text: "The mechanism that holds them together is a pipeline I built: a TypeScript Figma plugin that syncs Figma Variables into W3C-format design tokens in GitHub. A color, spacing, or variant decision made in Figma lands in the codebase as a typed, versioned artifact, reviewed like any other change. The token file is the contract between the two disciplines, and arguments about what a value should be happen before it merges rather than after it ships. It is also what makes the audience variants workable: the same pipeline that carries a brand color carries an agent-context density token, so design evolves the system’s surface without queueing behind engineering.",
          },
          {
            type: "paragraph",
            text: "Governance was the harder half of the partnership. Components needed a definition of done that both disciplines signed. Change proposals needed a path that did not route every decision through one person. Disagreements between design intent and implementation cost needed a forum with both parties present. The communication range this demanded, individual contributors through executives and design through engineering, is the part of the work I would least want to give back.",
          },
        ],
      },
      {
        heading: "Making the Right Path the Easy One",
        blocks: [
          {
            type: "paragraph",
            text: "The mandate confirmed adoption more than it caused it. The supported path had to become cheaper than the local alternative first, and most of the platform’s surface area exists to keep it that way.",
          },
          {
            type: "list",
            items: [
              "Versioned docs with live examples, so the answer a team reads matches the release it runs.",
              "Per-framework migration guides that own the integration seams instead of hiding them.",
              "Deprecation windows long enough to plan a roadmap around.",
              "Automated compliance checks, wired through GitHub webhooks, that catch drift before a human reviewer spends time on it.",
              "Weekly office hours, plus a network of design and engineering champions embedded across areas, so the system has advocates who sit closer to the work than we do.",
              "Feedback channels in the docs site that keep discovery running permanently instead of as a launch-phase activity.",
            ],
          },
          {
            type: "paragraph",
            text: "It landed, and we could prove it. Eighteen months took us from the start of discovery through the full development lifecycle to the initial production release. Across six pilot teams, we then measured story velocity for work scoped purely to UI screen development: a customer feedback form, a dashboard of policy information for an agent, the kind of story whose scope is the screen itself rather than API work or business logic. Measured over one to three months, with numbers solicited from both the engineers doing the work and their leadership, velocity on those stories improved substantially on every team, because accessibility, styling, and interaction behavior ship inside the component instead of being reassembled story by story.",
          },
          {
            type: "paragraph",
            text: "That evidence did as much for adoption as the mandate did. It let us walk into the next room showing speed, developer experience, and consistency all moving in the same direction at once. SFDS is now the official migration target for the entire enterprise, and the governance model of versioned releases, deprecation windows, and compliance review became the template other platform efforts in the org follow.",
          },
          {
            type: "paragraph",
            text: "The same abstraction later paid a dividend nobody priced in. A small, well-defined component API turned out to be exactly what AI coding agents need to produce accurate frontend code, but that story belongs to a different essay.",
            links: [
              {
                text: "a different essay",
                href: "/writing/teaching-ai-agents-to-use-a-design-system",
              },
            ],
          },
        ],
      },
      {
        heading: "What I Would Carry Forward",
        blocks: [
          {
            type: "paragraph",
            text: "Reduced to a sentence: evidence earns the mandate, architecture earns the trust, and distribution and governance earn the years after launch. The longer version:",
          },
          {
            type: "list",
            items: [
              "Governance that depends on engineers not touching the markup is already lost. Move the boundary into the component, where the platform controls it.",
              "Run discovery before architecture. The system you design after fifty conversations is different from the one you design after zero, and the conversations double as the start of adoption.",
              "Collect feedback where people already work. A prompt inside the docs site outperforms any survey you could send.",
              "Answer each audience in its own terms. Engineers, leads, designers, and executives were all asking reasonable questions, and they were different questions.",
              "Treat distribution as a first-class design problem with written trade-offs, because consumers live inside that decision daily.",
              "Make the contract between design and code a typed artifact instead of a relationship that depends on goodwill.",
            ],
          },
          {
            type: "paragraph",
            text: "Most of this work is communication, documentation, and pipelines. That is roughly the point.",
          },
        ],
      },
      {
        heading: "The Broader Point",
        blocks: [
          {
            type: "paragraph",
            text: "Platform work at enterprise scale is mostly an adoption problem. The teams you serve can almost always route around you, and the forks of our legacy system are proof. The system has to win on merit at every altitude: the executive approving the budget, the lead planning a quarter, and the engineer deciding at 4pm whether your component or a local one gets them home sooner.",
          },
          {
            type: "paragraph",
            text: "SFDS holds because the discovery never stopped, the trade-offs are written down, and the easiest path through a thousand engineers’ day is the supported one. A mandate cannot buy that. It can only confirm it.",
          },
        ],
      },
    ],
  },
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
    socialCardLabel: "Review boundary",
    socialCardSubtitle:
      "Where probabilistic output ends and durable product truth begins.",
    related: [
      { kind: "project", slug: "researchlog" },
      { kind: "writing", slug: "teaching-ai-agents-to-use-a-design-system" },
    ],
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
            text: "That last sentence is the design constraint that shaped everything else. A tax filing is a place where mostly right is a liability. The model’s draft is genuinely useful: it reads a PR’s title and metadata and produces a plausible, structured judgment in seconds. Plausible and durable are different properties, though, and an audit workflow cannot let one quietly become the other.",
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
            text: "The failure shows up the first time a human disagrees with the model. A manager reviews a classification, decides the model got it wrong, and overrides it. Some time later a webhook fires or a backfill runs, the automatic path re-classifies the activity, and the upsert replaces the manager’s judgment with a fresh draft. Nothing crashes or logs an error. The dashboard keeps showing plausible numbers. The system has silently destroyed the most valuable data it had: a human decision, which is exactly what an auditor would ask to see.",
          },
          {
            type: "paragraph",
            text: "This is a worse class of bug than a 500, because the loss is invisible and the lost data is irreplaceable. Once you see it, the requirement becomes clear: automatic classification and human review are different kinds of writes, and they cannot share one code path with one set of semantics.",
          },
          {
            type: "paragraph",
            text: "ResearchLog ended up with two deliberately asymmetric write paths. The automatic path yields to humans. If a row is marked user_override = true, the job skips it entirely. The manual path, where a reviewer explicitly asks for a fresh AI draft, refreshes the AI-generated fields while preserving the override flag and the reviewer’s notes at write time, so a concurrent human decision is never collateral damage.",
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
            text: "Schema validation catches malformed output. It cannot catch well-formed output arriving at the wrong moment. The race is plain: an automatic job reads a row, sees no override, and calls the model. In the seconds that takes, a manager overrides the classification. The job’s write now clobbers a decision the job never saw.",
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
            text: "If a human got there first, the statement matches zero rows and the draft is discarded. There is no window where the application’s stale view of the row matters, and the invariant holds for every caller, including the background job someone adds in two years without reading the original design discussion.",
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
            text: "ResearchLog’s authorization is layered conventionally. User-driven API requests run on a Supabase client scoped by the user’s JWT, so row-level security applies even if an application-level filter regresses someday. The service-role client, which bypasses RLS, is reserved for jobs, webhooks, and system persistence, where no user context exists. Manager-only endpoints check membership roles on top of that.",
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
            text: "There was no security hole. Row-level security was doing what it was designed to do: members of an org may read their co-members’ membership rows, because the product needs that. The frontend’s membership query simply fetched memberships without scoping to the signed-in user. In a multi-member org it received the manager’s row alongside the engineer’s, resolved the current role with a first-match lookup, and picked the wrong one. The fix was one line, plus a regression test pinning the contract:",
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
            text: "The last boundary is the interface. If the model’s output is a draft, the UI has to present it as one.",
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
              "Validate model output like untrusted client input, and derive the model’s output schema and your runtime validation from one definition so they cannot drift.",
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
    socialCardLabel: "Agent context",
    socialCardSubtitle:
      "Why live docs, small skills, and deterministic checks beat a search index for production UI work.",
    related: [
      { kind: "writing", slug: "from-snippets-to-shadow-dom" },
      { kind: "project", slug: "designrail" },
    ],
    sections: [
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "AI coding agents are getting good enough to produce useful frontend code quickly, which surfaces a familiar platform problem: generated code only helps if it moves teams toward the system’s supported path. Without design-system context, agents reach for the public patterns they have seen most often: Bootstrap-like attributes, Material-inspired props, React component conventions, or plausible custom-element guesses.",
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
              "Vector hosting, server infrastructure, and ingestion compute added up in ways that weren’t obvious until the system was actually running.",
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
