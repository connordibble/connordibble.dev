# Proposal Before Output

**Status:** edited, ready for Connor's review (retitled from "AI UI Generation Needs Review Surfaces"; the old title described the category, this one states the idea)
**Proposed slug:** `proposal-before-output`
**Subtitle:** Why DesignRail treats every AI-proposed component mapping as a reviewable artifact: shared Zod contracts at each boundary, compliance findings attached before acceptance, and human decisions that persist.
**Summary:** AI design-to-code becomes governable when generation produces a structured proposal instead of code: the mapping, its evidence, and its compliance findings arrive together, and a human decision is recorded before anything becomes implementation truth.
**Topics:** AI Tooling · Design Systems · Developer Tools
**Read time:** ~9 min
**Related:** project/designrail · writing/teaching-ai-agents-to-use-a-design-system · writing/when-the-model-is-a-draft
**Figures:** `raw-vs-proposal`, `proposal-anatomy` (built in `src/components/writing-figures.tsx`)

---

## The Handoff Is Where Quality Dies

Design-to-code work fails at the handoff. The design is richer than the markup generated from it, and the implementation is governed by rules that never appear in the design file: approved components, token usage, accessibility behavior, and the local conventions that keep a product surface from becoming a pile of plausible fragments. AI makes that handoff faster without making it simpler.

DesignRail is my working lab for this problem, and its premise fits in one sentence: a model may draft the mapping from design intent to code, but the draft is a proposal, and nothing becomes implementation truth until the system has constrained it, checked it, explained it, and a human has accepted it. That ordering, proposal before output, is what this essay is about.

The premise came from watching the failure it prevents. AI coding agents implement designs fast, and three things go missing on the way: design intent gets flattened into markup, compliance issues surface after merge, and nobody records why a mapping decision was made. The third one is the quiet killer. A bad mapping can be fixed. An unrecorded mapping is harder, because the team can correct the code without ever learning which mappings go wrong, which rules were unclear, or which component API needs a better affordance.

I spent years on the receiving end of that dynamic in [enterprise design-system work](/writing/from-snippets-to-shadow-dom). Generated code that is close enough ships, the local patch survives, and six months later the platform team is debugging a fork nobody meant to create. The distance between close and governed is the product surface.

## Proposal Before Output

The order of artifacts decides where review can happen. If the first durable artifact is generated code, review happens in the pull request, where the reviewer has to infer the original design intent and reverse-engineer the mapping from a diff. If the first durable artifact is a proposal, the reviewer sees the decision before it hardens into source.

> Figure: `raw-vs-proposal`
> Caption: The same generation quality, two different first artifacts. Everything the platform can learn lives in the right-hand column.

In DesignRail the pipeline runs proposal-first end to end. Figma component intent, normalized from fixtures, goes to a deterministic mapper that proposes Shoelace Web Component implementations. A compliance agent attaches accessibility, token, and variant findings to each mapping. A reviewer accepts, rejects, or edits the proposal in a React review UI, and only accepted mappings become export material: implementation-ready HTML, React examples, or agent-ready briefs.

The deterministic mapper is a deliberate choice worth pausing on. Generation gets the glamour, but a mapper whose output is reproducible gives the review surface something stable to be about: the same intent produces the same proposal, so a rejection means the rule is wrong, and a fix to the rule fixes every future mapping the same way. Model-drafted proposals can slot into the same surface later without changing what a reviewer sees.

## What a Proposal Carries

A proposal is a different object from "some HTML the model wrote." It is closer to a change request with the evidence still attached.

> Figure: `proposal-anatomy`
> Caption: The object under review. The reviewer decides with the intent, the mapping, and the findings in one place.

Condensed to a type, the shape looks like this:

```ts
// Condensed for the essay: the object a reviewer decides on,
// not the generated code itself.
type MappingProposal = {
  source: ComponentIntent;        // normalized from the design node
  mapping: {
    component: "sl-button";       // from the governed component set
    props: Record<string, string>;
    variant: string;
  };
  findings: ComplianceFinding[];  // accessibility, token, variant checks
  decision?: ReviewDecision;      // accept | reject | edit, persisted
};
```

Every field earns its place at review time. The source intent lets the reviewer judge the mapping against what the designer meant rather than against the generated markup. The findings arrive with the proposal instead of after the merge. The decision is part of the object, so the record of what a human concluded travels with the mapping instead of dissolving into a commit message.

## The Contract Behind the Surface

Drift wants to enter a design-to-code system at every layer boundary: design extraction, normalized intent, proposed mapping, findings, review decision, export. If each layer describes the object a little differently, the system will eventually accept a state no one can explain.

DesignRail's answer is one set of Zod schemas shared across the React UI, the Fastify and Apollo GraphQL API, and the SQLite persistence layer. The shape is checked at runtime at each boundary, review and export move through a documented API instead of private component state, and a review decision lands in the database because it is product history, not a transient UI event.

This is the same discipline showing up across everything I build with models in the loop. ResearchLog derives its model tool definitions and its runtime validation [from one schema](/writing/when-the-model-is-a-draft) so the two cannot drift. zod-ai-tool exists because that narrow problem, provider tool schemas and application validation maintained as separate contracts, deserved a package of its own. The model proposes; the system owns the contract.

## Checks the Model Does Not Negotiate With

Deterministic validation is the part of this architecture that owes nothing to model quality. A token either exists or it does not. A component variant is approved or it is not. An accessibility requirement has the required structure or it does not. Rules like that belong in code, with findings that reproduce identically on every run.

I made the same argument for agent-generated code generally in [the design-system agent essay](/writing/teaching-ai-agents-to-use-a-design-system): guidance is probabilistic, validation is repeatable. DesignRail moves the repeatable layer one step earlier in the pipeline. Findings attach to the proposal, before acceptance, so validation stops being only a gate at the end and becomes part of the review conversation. A reviewer looking at a mapping with two token findings and an accessibility warning is making a more informed decision than a reviewer looking at a green checkmark after merge.

The division of labor is clean. Models are useful where intent is messy, at the edges of the rules. Deterministic checks are useful at the boundary, where the organization already knows exactly what it requires.

## Review Is Product Data

Human review is usually costed as a delay. In this workflow it is the dataset.

Every accepted mapping confirms a rule. Every rejection points at a mismatch: in the mapper, in component coverage, in the design intent, or in the docs. An edit is the most precise signal of all, because it shows exactly what the reviewer changed to make the proposal acceptable. Persisted through the GraphQL API, those decisions make mapping quality auditable over time, which is a quiet sentence with a lot inside it. Auditability is what lets a platform team improve the mapper with evidence, defend the workflow when someone asks whether it can be trusted, and show designers where the design system itself needs more expressive components.

Raw generation cannot produce any of that. When an agent writes code straight into a branch and a developer cleans it up by hand, the cleanup disappears into the commit. The system never learns whether the model chose the wrong component, missed a variant, or invented an API, and the same correction gets made by hand again next sprint.

## Scope, Honestly

DesignRail is early and in active development. The Phase 1 contract is in place: shared schemas, the GraphQL API, SQLite persistence, recorded review decisions, and a Button-first mapping path with more components staged behind it. The repo runs like production software anyway, with CI gates for secrets, types, lint, and tests, plus release planning and ADRs, because the discipline costs little now and the project exists to demonstrate exactly that posture.

It is also not a toy problem to me. My day job includes a Figma MCP pipeline that translates fully designed pages into sf-ui Web Component implementations at enterprise scale, and DesignRail is the same problem rebuilt in the open, where the contracts and checks can be shown instead of described.

## What I Would Carry Forward

Reduced to a sentence: make generation propose, make contracts constrain, make checks repeatable, and make approval a recorded event. The longer version:

- Put the review before the artifact hardens. A proposal can be judged against intent; a diff has to be reverse-engineered back to it.
- Carry the evidence with the object. Intent, mapping, findings, and decision belong in one shape, validated at every boundary it crosses.
- Let deterministic rules be deterministic. The model gets no vote on token existence, approved variants, or accessibility structure.
- Persist review decisions as product data. Corrections are how the mapper, the docs, and the design system itself improve.
- Export only what a human accepted. Generated code that bypasses the approval path recreates the drift the design system was built to prevent.
- State project maturity plainly. DesignRail is Phase 1 and Button-first, and saying so costs less than being caught implying otherwise.

## The Broader Point

AI UI generation inherits every old design-system problem at a higher speed. It still needs a source of truth, a component API, token governance, accessibility rules, and a way for humans to make decisions the platform can remember. Faster generation makes those constraints more valuable, not less.

The systems that win this space will be the ones that can show their work. The model drafts, the platform proves what it can, and the human accepts the result with the evidence still attached.
