# Essay Draft Backlog

## State of the Drafts

All five drafts have been through a full editorial pass (June 2026): voice-skill compliance, senior/staff-level framing, and claims scoped to facts already published on the site (projects, experience, and the four live essays). The `TODO_FACT` scaffolding is gone; where a fact could not be confirmed from published copy, the essay was rewritten to make no claim rather than a hedged one.

Each file carries its own header: status, proposed slug, subtitle, summary, topics, read time, related refs, and the figure variants it uses.

| File | Title | Figures |
| --- | --- | --- |
| `04-agentic-software-needs-a-design-system.md` | Agentic Software Needs a Design System | `governance-map`, `behavior-breaking-changes` |
| `01-ai-ui-generation-needs-review-surfaces.md` | Proposal Before Output (retitled) | `raw-vs-proposal`, `proposal-anatomy` |
| `02-summary-is-not-the-evidence.md` | The Summary Is Not the Evidence | `summary-trust-model`, `claim-path` |
| `03-agent-workflows-need-slos-too.md` | Agent Workflows Need SLOs (retitled, "Too" dropped) | `beside-vs-in-path`, `reliability-concerns` |
| `05-model-can-draft-the-incline-curve.md` | The Model Can Draft the Incline Curve | `media-to-profile`, `incline-review` (interactive) |

Filenames were kept stable so the numbering matches earlier discussion; two essays were retitled inside the files.

## Figures Are Already Built

All ten figure variants exist in code and are visually verified at 1280px and 375px in both the variant union (`src/data/writing.ts`) and the components (`src/components/writing-figures.tsx`). The interactive incline figure lives in its own client component, `src/components/writing-figure-incline.tsx`, so the rest of the figures stay server components. No published page renders the new variants yet; they ship dormant until an essay references them.

## Publishing Order (unchanged)

1. `04` Agentic Software Needs a Design System: the broad frame
2. `01` Proposal Before Output: narrows into DesignRail
3. `02` The Summary Is Not the Evidence: evidence-backed synthesis
4. `03` Agent Workflows Need SLOs: reliability and operations
5. `05` The Model Can Draft the Incline Curve: the PaceAI domain workflow

The in-text cross-links between the new essays assume this order (04 links forward to 01's slug, 03 links back to 02, 05 links back to 01). Publishing out of order leaves a briefly dead in-text link; related-card refs fail soft either way. Publishing all five in one batch avoids the question entirely.

## Converting a Draft to a `WritingPost`

Mechanical steps, in order:

1. Copy the header fields into a new object at the top of `writingPosts` in `src/data/writing.ts` (newest first). Choose `date`, `displayDate`, and `featured` at publish time.
2. Split the markdown sections into `WritingSection` objects; paragraphs become `paragraph` blocks.
3. `> Figure:` blocks become `{ type: "figure", variant, caption }` using the caption text in the draft.
4. Markdown links become `links: [{ text, href }]` entries on their paragraph block; `text` must match the paragraph substring exactly.
5. Fenced code becomes `{ type: "code", language, code }`.
6. Delete the draft file once live.

## Remaining Items That Could Strengthen (none blocking)

- `02`: if the quote redaction/moderation rules are shareable, one sentence in "The Correction Path" could state them; the essay currently makes no claim either way.
- `03`: a real, shareable alert-that-fired anecdote from the GitLab webhook workflows would strengthen "Observability Needs Workflow Semantics"; the section stands on the published SFDS example.
- `05`: if PaceAI reaches a shareable pilot/production milestone, add a status sentence; the essay currently describes the system without claiming deployment status.

## Editorial Decisions Worth Knowing

- `01` was retitled from "AI UI Generation Needs Review Surfaces" to "Proposal Before Output": the old title named the category, the new one states the idea, and it broke up three "X Needs Y" titles landing on one index page.
- `03` was the weakest draft (limited operational detail available). It was rebuilt to ground every category in the four public systems and to link to "When the Model Is a Draft" for the idempotency mechanics instead of retelling them.
- Overlap between `04` and the published essays was cut and replaced with links; `04` keeps the governance mapping as its own contribution.
- All five essays avoid: production claims not on the site, invented metrics, internal tool names beyond what the live essays already name, and partner schema details (05 uses an explicitly illustrative shape).
