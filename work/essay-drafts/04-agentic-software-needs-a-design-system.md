# Agentic Software Needs a Design System

**Status:** edited, ready for Connor's review
**Proposed slug:** `agentic-software-needs-a-design-system`
**Subtitle:** The governance questions agent builders are asking now are the ones enterprise design systems have been answering for years: primitives, constraints, docs, permissions, review, and release discipline.
**Summary:** Why an AI agent should be treated as another contributor to a governed platform, and how design-system mechanisms (component APIs, tokens, versioned docs, compliance checks, review) map one for one onto agentic equivalents.
**Topics:** AI Tooling · Platform Engineering · Design Systems
**Read time:** ~9 min
**Related:** writing/from-snippets-to-shadow-dom · writing/teaching-ai-agents-to-use-a-design-system · project/sfds
**Figures:** `governance-map`, `behavior-breaking-changes` (built in `src/components/writing-figures.tsx`)

---

## The Same Problem, Faster

Enterprise design systems solved a version of the agent problem before agents arrived.

The surfaces look nothing alike. A design system governs buttons, form fields, tokens, and page patterns. An agentic system governs tools, prompts, schemas, and generated artifacts. Underneath, both answer one question: how do many contributors move fast without turning shared quality into local taste? For a design system the contributors are a thousand engineers. For an agentic system they are models, and the models are faster.

I led engineering on an enterprise design system for close to three years and have spent the time since building agent workflows on both sides of that boundary. The pattern is hard to unsee. Every governance mechanism the design system needed has a direct agentic equivalent, and skipping one produces the same failure it produced for UI work.

Agentic software needs a design system. Not the UI kind: the operating layer the UI kind taught us to build.

## The Agent Is Another Contributor

The design system I worked on replaced a copy-paste library. Teams pasted HTML from a docs site, edited it locally, and kept shipping. The pages still looked close enough, so the drift stayed quiet until source-side fixes stopped applying cleanly, and by the time discovery started, whole forks of the system had grown in different areas. I [wrote that story up separately](/writing/from-snippets-to-shadow-dom); the short version is that ungoverned contribution forked the platform.

Agents reproduce that failure through a different door. They produce reasonable-looking code, configuration, mappings, and summaries that sit just outside the supported path. The output compiles. It passes a glance. The drift surfaces later, when a platform fix does not apply, a validator flags an API that never existed, or a reviewer cannot reconstruct why an artifact exists. A busy engineer routes around a bad component API; an agent does the same thing to your platform at generation speed. Speed only makes the drift arrive sooner.

The conclusion I keep landing on is to treat the agent as another contributor to a governed system. Contributors need primitives, current docs, clear permissions, repeatable checks, and a review path. The design system's mechanisms map onto agentic equivalents almost row by row.

> Figure: `governance-map`
> Caption: The mapping I actually use. For each row, an agentic system either has the equivalent or it has a gap with a name.

## Primitives and Constraints

SFDS moved governance into the component boundary. Shadow DOM took the markup engineers used to edit and put it inside the component, where the platform team controls it. Consumers got a smaller API, and being almost right stopped being possible in most of the ways that used to matter.

The agentic equivalents are tools and schemas. A model should not have to infer every possible operation from raw text when the product can expose a small set of safe actions. It should not generate arbitrary UI when a design-system component exists, and it should not hand back free-form JSON when a schema can define the shape. I keep a small open-source package, zod-ai-tool, for the narrowest version of this: the provider's tool definition and the application's runtime validation derive from one Zod schema, so the two contracts cannot drift apart. DesignRail applies the same move to design-to-code, where the mapper proposes from a governed set of Web Component mappings instead of writing whatever frontend code seems plausible.

Narrow surfaces are sometimes read as distrust of the model. The motive is different: a narrow surface is what makes the useful path legible enough for the model to find it.

## Docs Are Part of the Runtime

For human consumers, docs describe the system. For agents, docs are closer to configuration: whatever the agent can read and obey at task time is the behavior you get. When I explored giving agents design-system context, the version that survived was [live docs plus small installable skills](/writing/teaching-ai-agents-to-use-a-design-system), with a heavier retrieval platform built first and then retired. A skill teaches where the docs live, which component APIs are authoritative, and which rules are non-negotiable. It does not copy component APIs into a second document, because a second document is a fork with better intentions.

The design-system discipline carries over unchanged. Versioned docs let a team on last quarter's release read last quarter's truth, and the same applies to agent guidance pinned against a component version. A thin skill is easier to keep true than a clever one.

## Permissions Need Product Meaning

Design systems run on permissions that rarely get called that. Consumers set supported props and nothing else. The platform team changes internals. Designers change tokens through a reviewed pipeline. Deprecation windows say how long old behavior stays safe. Nobody calls this an authorization model, but that is what it is.

Agentic systems need theirs stated just as concretely. Which actions may the agent take without approval? Which produce drafts, and which write durable state? Which outputs require a human decision before anything downstream may read them? [ResearchLog draws one of those lines in the database itself](/writing/when-the-model-is-a-draft): a background job may write a fresh classification, and it may not overwrite a human override, because the guard travels inside the write statement. The permission is enforced as a WHERE clause rather than remembered as a convention.

That is what a permission with product meaning looks like. It protects the data the workflow exists to capture, and it holds for every caller, including the one added years later by someone who never read the design discussion.

## Review Is the Governance Surface

Design review, accessibility review, and release review all exist because source alone does not carry enough context. Someone has to decide whether an artifact is acceptable inside the system, and they need the surrounding evidence to decide well.

Generated artifacts need the same surface: what the agent proposed, what it consumed, which checks passed, which failed, and what a human decided. DesignRail persists exactly that object for every component mapping, and the argument for building review surfaces this way [is its own essay](/writing/proposal-before-output). The design-system version of the lesson is older and simpler. A platform that cannot show why an artifact was accepted will eventually be asked to defend one it cannot explain.

## Release Discipline for Behavior

SFDS treats a careless major version against a thousand-plus consumers as a reliability event, so releases are versioned, deprecations get announced windows, and docs version alongside the code. Agent workflows need the same discipline for a sneakier reason: behavior can break with no API change at all.

> Figure: `behavior-breaking-changes`
> Caption: Changes that pass typecheck and break consumers anyway. Each one deserves release notes, tests, and a rollback path.

A prompt edit changes every summary downstream. A schema tightening rejects arguments that passed yesterday. A mapper improvement changes which component the same design node receives. These are breaking changes by any consumer-facing definition, and most teams ship them with less ceremony than a patch release. The practices that fix this are not new. The feedback platform I shipped ran GitOps deploys with a rollback path during its convention pilot, and DesignRail runs CI gates and ADRs while it is still early. Neither practice waited for the workflow to become important. That is the point: the discipline is cheapest before anyone depends on you.

## What I Would Carry Forward

Reduced to a sentence: give agents the governed path a good design system gives engineers, and name the gaps using the same words. The longer version:

- Treat the agent as a contributor, not a feature. Contributors need primitives, docs, permissions, and review, and an agent missing one will route around the platform like any busy engineer.
- Make the supported action surface smaller than the raw capability surface. Tools, schemas, and component APIs shrink the space of plausible mistakes.
- Keep docs live and guidance thin. Anything that copies the source of truth becomes a second source of truth on a delay.
- Give permissions product meaning, and enforce the ones that protect human judgment in the layer every write passes through.
- Review generated artifacts with the evidence attached, and persist the decisions. The corrections are where the platform learns.
- Version behavior. Prompts, schemas, mappers, and validator rules can all break consumers without breaking the build.

Most of this is unglamorous: contracts, docs, pipelines, and review queues. That was true of the design system too, and it is why the lesson transfers.

## The Broader Point

Agentic software is usually discussed as an autonomy problem: how much should the system do on its own? The operating question is governance. What can the system do, under which constraints, with whose approval, and with what record left behind?

Enterprise UI platforms spent years learning to package decisions into primitives, write the supported path down, validate what can be validated, and put humans where judgment lives. Agentic systems get to start from that inheritance instead of rediscovering it one incident at a time.
