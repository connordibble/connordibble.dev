# The Model Can Draft the Incline Curve

**Status:** edited, ready for Connor's review
**Proposed slug:** `the-model-can-draft-the-incline-curve`
**Subtitle:** Turning long-form workout video into timestamped equipment-control profiles: multimodal extraction, exercise-science constraints, and a review UI where programmers stay the authors.
**Summary:** PaceAI drafts equipment-control profiles from workout video under domain constraints, then routes every draft through programmer review before it exports into the partner OEM's control schema. Where the model helps, where it must stop, and why the schema is the real product boundary.
**Topics:** AI Tooling · Multimodal · System Design
**Read time:** ~8 min
**Related:** project/paceai · writing/when-the-model-is-a-draft
**Figures:** `media-to-profile`, `incline-review` (interactive; both built in `src/components/`)

---

## The Bottleneck Is Translation

The hard part of connected fitness content is not knowing that a hill should feel harder than a flat road. The hard part is turning a long-form workout video into a timestamped control profile a machine can run, at the scale of a content library.

Connected fitness OEMs do not ship video alone. A workout needs control data: trainer cues, pacing changes, terrain shifts, intensity zones, and the exact moments the hardware should respond. Today that translation is manual. Someone watches the class and hand-programs the profile, at roughly two hours per video, against libraries that run into the thousands. At that scale the bottleneck is translation, not creativity. Programmers know the trainer's style, the intended audience, and how the partner's equipment actually behaves. They want their judgment in the loop; they just do not want to retype the same incline curve a thousand times.

PaceAI is built around that boundary. The model drafts the shape of the work, constrained by equipment rules and exercise logic, and the programmer stays the author, reviewing and correcting instead of transcribing. That is a narrower claim than most AI product pitches, and a better product.

## Media Is a Stack of Disagreeing Signals

The input is not one clean document. It is video, audio, transcript, trainer intent, and product constraints layered together, and the layers do not always agree.

PaceAI's first stage processes video and audio in parallel: FFmpeg extracts frames and waveforms, and transcription turns trainer dialogue into text. Each signal carries something the others miss. A trainer says "recover" while the visual intensity holds for a few more seconds. A camera cut shows effort with no verbal cue at all. The waveform carries coaching cadence the transcript flattens. The transcript has the clearest language and nothing like the whole workout.

> Figure: `media-to-profile`
> Caption: The pipeline in one line: parallel signals in, a constrained draft in the middle, a human decision before anything exports.

That layered shape is why a transcript-to-JSON script would miss the point. The system's job is to collect enough evidence to draft a defensible profile, and then to remember that the draft is a draft.

## Domain Constraints Make the Draft Useful

The model stage earns its place through constraint, not fluency. The agent encodes exercise-science domain knowledge, RPE, heart-rate zones, work-to-rest ratios, progressive overload, and the manufacturer's incline ranges, and combines the extracted cues with programmer intent: series goals, trainer style, progression notes.

The difference is practical. Any capable model can summarize a class into warmup, climb, intervals, and cooldown. The equipment cannot run a summary. It needs timestamps, control values, and limits that respect the machine, where a treadmill profile cannot request behavior the hardware does not support and a series may follow a progression that no single video reveals. The domain layer is what turns "this part feels harder" into "draft this control change, within the allowed range, at this time, given the workout's goal."

The same layer defines where the draft must stop. When a trainer cue is ambiguous, unsupported precision is worse than a gap: a confident wrong number reads exactly like a confident right one in a table of two hundred rows. The honest move is to draft conservatively and flag the segment for the reviewer's attention, which is a design stance about uncertainty rather than a model capability.

## The Schema Is the Product Boundary

PaceAI exports into the partner OEM's production control schema, and that sentence is the boundary of the whole system.

Without the schema, the model produces a reasonable description of a workout. With it, the output has to be something the partner's workflow can accept: typed fields, values inside hardware ranges, ordered timestamps, commands valid for the target machine. Fluent text becomes an artifact software can reject, which is the same lesson [ResearchLog](/writing/when-the-model-is-a-draft) and [DesignRail](/writing/proposal-before-output) taught in other domains. Model output becomes trustworthy at a typed boundary, and nowhere else.

Condensed and illustrative, since the real contract is the partner's schema, a drafted segment carries the shape a reviewer and a machine both care about:

```jsonc
// Illustrative shape, not the partner's schema.
{
  "start": "14:00",
  "end": "19:00",
  "incline": 7.0,
  "cue": "give me more here",
  "flags": ["ambiguous-cue"]
}
```

The schema also decides what review looks like. Programmers should not be asked to review paragraphs about intensity. They review the profile the equipment will actually run, in the same terms the equipment uses: time ranges, incline and resistance values, cue alignment, flags, export readiness.

## Review Protects Programmer Judgment

The human-in-the-loop UI is where the value lands. Programmers approve, edit, or reject the draft before it exports, which keeps the part of the work that should remain human: judging whether the curve matches the trainer's intent, applying partner-specific taste, and catching the places where the extraction drifted.

> Figure: `incline-review` (interactive)
> Caption: An illustrative profile, not partner data. Step through the segments; the surge is where the reviewer overrode the draft, and the dashed line is what the model wanted.

The figure shows the shape of the artifact under review. Five of the six segments are the boring case, drafted and accepted, which is the point of the whole system: the reviewer spends attention only where the draft and the workout disagree. The surge segment is the interesting case. The cue was ambiguous, the draft guessed high, and the reviewer set the grade against the series' progression notes. Two hours of transcription work becomes one judgment call.

Every one of those corrections is learning data as well as quality control. A rejected climb points at an ambiguous cue pattern. A corrected timestamp points at extraction drift. A changed intensity range points at equipment behavior the generic rule did not know. Captured through the review surface, those signals tell the system where its drafts miss; lost in a manual cleanup pass, they teach nothing and get made again next video.

## Deployment Is Part of the Workflow

Workout libraries are valuable partner assets, and video can carry contractual and privacy constraints, so data residency sounds like a deployment detail until it decides whether the product can exist for a partner at all. PaceAI runs in a secure cloud environment by default, with an on-prem option for partners that cannot ship video outside their own network.

The on-prem path is a real cost, taken deliberately: packaging, updates, and troubleshooting across environments someone else controls. The alternative was making data residency the partner's problem, which in practice means losing the partners for whom it is non-negotiable before the workflow can prove itself.

## What I Would Carry Forward

Reduced to a sentence: use the model to draft structured control data under real constraints, then make the expert review the artifact the equipment will run. The longer version:

- Start from the translation bottleneck, since that is where the hours go. Drafting the profile attacks the two hours per video; generating prose about the workout attacks nothing.
- Treat video, audio, and transcript as separate signals that can disagree. The disagreements are where a reviewer's attention is worth the most.
- Put exercise logic and manufacturer limits inside the generation boundary. A draft the equipment cannot run is a demo, whatever it looks like.
- Make the partner's schema the contract, and validate against it before a human ever sees the draft. Structured output that software can reject is the difference between a tool and a suggestion.
- Keep programmers in the approval path and capture their edits. The corrections are simultaneously the quality gate and the improvement signal.
- Match deployment to partner constraints early. Data residency decides deals before model quality gets a chance to.

## The Broader Point

PaceAI is the pattern I trust most in applied AI right now: a domain workflow with messy inputs, hard constraints, and an expert who knows what good looks like. The model does the first pass, the schema narrows the output, and the reviewer owns the result.

That pattern travels well beyond fitness. Wherever the workflow has real domain rules, the product is rarely "generate the answer." It is draft the artifact, show the evidence, enforce the constraints, and leave the final decision with the person whose name is on the work.
