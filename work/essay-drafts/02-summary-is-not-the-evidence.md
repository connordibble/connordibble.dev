# The Summary Is Not the Evidence

**Status:** edited, ready for Connor's review
**Proposed slug:** `the-summary-is-not-the-evidence`
**Subtitle:** Building an AI feedback platform in two months for a live convention, where executives got themes and every theme kept a path back to the words agents actually used.
**Summary:** AI synthesis earns a place in executive workflows only when every theme stays traceable to source language. How the agent feedback platform kept the claim path intact: themes with source quotes, filters as part of the evidence, and exports that carry their scope.
**Topics:** AI Tooling · Platform Engineering · Technical Leadership
**Read time:** ~8 min
**Related:** project/agent-convention-feedback · writing/when-the-model-is-a-draft
**Figures:** `summary-trust-model`, `claim-path` (built in `src/components/writing-figures.tsx`)

---

## The Room Where the Feedback Had to Hold Up

State Farm leadership wanted a real read on what its 10,000+ agents experience across service, ECRM, underwriting, and agent-support workflows. The existing channel was free-form feedback that mostly died in spreadsheets and manual review queues. The EVP of enterprise technology asked me and a small horizontal team to fix that in time for agency convention, which left roughly two months from concept through design to production.

A deadline like that strips away pretend architecture, but it does not lower the bar on the one property that mattered. Leaders would be reading synthesized themes while the event was still happening, and a synthesized theme was going to get challenged in the room. When that happened, the underlying comments had to be reachable in seconds.

That is the whole product tension, and the thesis of this essay: a summary helps only while it stays attached to its evidence. The platform had to let an executive read the pattern, then click through to the source language that made the pattern worth believing. Everything interesting about the build follows from taking that requirement seriously.

## Themes Are Pointers

Free-form feedback is valuable because agents can say what the form designer did not predict. It is also hard to operate on, because the shape is uneven. One comment names a broken workflow directly. Another describes the same issue through a customer story. A third points at a policy or a handoff that only makes sense to someone who knows the field.

AI synthesis helps by grouping that language into themes, and it is worth being precise about what a theme is. Compression is a real service; it is nothing like proof. The right mental model is a pointer: a theme gives the leader a label and a path into a cluster of comments. It should never become a freestanding claim that floats away from the words agents actually used.

The test is a question every executive eventually asks: "What did agents actually say that supports this?" A system that answers with a click has earned the summary. A system that cannot is asking for trust on the model's behalf, and executives are right to withhold it.

## The Correction Path

Source quotes do more than reassure skeptical readers. They change what happens when the synthesis is wrong.

Grouping errors are a matter of when, not if. Comments get clustered too broadly. A phrase that sounds like a service complaint turns out to be about underwriting. A field acronym means something the model never saw. Without the source language, each of those failures becomes an argument about whether the summary feels right, which is an argument nobody can win. With the quotes attached, it becomes a reviewable grouping problem with a visible fix.

> Figure: `summary-trust-model`
> Caption: What changes when the source path exists. The failure modes stay; the correction path becomes workable.

The stakes are concrete in an executive workflow. The reader is deciding where to send attention, people, and follow-up. A clean summary that points at the wrong thing costs more than a messy one with evidence attached, because the clean one gets acted on.

So the platform's synthesis shipped themes with traceable source quotes, and the dashboard put conversation drilldowns next to them. Leaders saw the pattern and could stand in the exact words behind it without leaving the workflow. The claim path stayed intact end to end.

## The Slice Is Part of the Claim

Filtering reads like a convenience feature. In a feedback system it is part of the evidence model, because a theme means something different depending on the slice that produced it.

A pattern might span the whole event or live inside one workflow's conversations. When a leader filters by topic and reads a theme, that theme is a claim about the slice, and presenting it wider than its slice turns a scoped finding into a general one nobody actually verified. The dashboard's topic breakdowns and drilldowns kept the slice visible while the reader moved between altitude and detail.

> Figure: `claim-path`
> Caption: The chain a challenged theme has to survive. Break any link and the dashboard is reporting sentiment, not evidence.

That chain is what turns feedback from sentiment into operational input: from "agents are raising this issue" to "show me which comments, from which slice, and hand the set to the team that owns it."

## Export Is an Accountability Feature

Excel export sounds mundane until the product reaches the edge of its own team. Downstream teams live in their own tools and review queues, and if the dashboard can find a pattern but cannot hand off the supporting evidence, the work stops at insight.

Export makes the evidence portable. A support team carries the relevant comments into its own triage. A product leader keeps a snapshot for an executive review. A follow-up owner works from source language instead of a paraphrase of a paraphrase.

Portability adds one design obligation that is easy to miss: the scope has to travel with the file. A spreadsheet of source comments detached from the slice that produced it will be read as broader than it is, by exactly the downstream reader who was not in the room. Treating the export as a handoff artifact rather than a data dump is the difference between extending the claim path and quietly breaking it at the last step.

## Running It Live

The platform had to hold up in front of agents and executives during a live event, which puts pressure on unglamorous operations. It shipped with monitoring and a GitOps deploy and rollback path, so a mid-convention fix was a routine push instead of event drama. Summarization quality is only one failure mode; a feedback platform can also fail by losing submissions, delaying synthesis, or going dark during the exact window leaders are paying attention. The operating path deserves the same design attention as the model path.

The pilot captured 800+ datapoints from 197 agents on the convention floor, which validated the capture workflow and the synthesis pattern against real usage rather than a demo script. Those numbers also keep the story honestly sized. This was a live convention pilot that earned its next stage, and the reception from agents and executives won backing to make the platform the official support and feedback channel for the full 10,000+ agency force. That scale-up is in progress now, and it changes the product again: a standing channel needs retention, permissions, and longitudinal trends that a two-month event build was right to defer.

## What I Would Carry Forward

Reduced to a sentence: summarize for orientation, and keep the source language one click away for trust. The longer version:

- Treat every AI-generated theme as a claim with evidence attached. If the source comments are not reachable from the theme, the theme is weaker than it looks on the dashboard.
- Keep summaries scoped to the slice that produced them. A pattern from one filter is not a finding about the whole organization, and the UI should make that hard to forget.
- Put the quotes in the review path, not in an appendix. A reader who has to leave the workflow to verify a claim will stop verifying claims.
- Design exports as handoff artifacts. The theme, the supporting comments, and the scope that produced them travel together or the claim path breaks at the boundary.
- Operate it like the production system it is. Monitoring and a rollback path mattered as much at the live event as the synthesis did.
- Say "pilot" while it is a pilot. The convention build earned the scale-up by being honest about what it had and had not yet proven.

## The Broader Point

AI summarization is usually sold as consumption: messy language in, clean themes out. Organizations do not run on themes. They run on decisions, and a decision-maker who cannot get back to the evidence is being asked to substitute the model's judgment for their own without being told.

The pattern that holds up is traceable synthesis. Leaders get orientation quickly, reviewers keep the source language close, and downstream teams carry the evidence into their own work. The summary earns its place by staying attached to the words it summarized, and the useful summary is the one that can be challenged.
