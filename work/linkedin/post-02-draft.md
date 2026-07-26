# LinkedIn Post #2 - Draft

**Status:** READY TO POST. All prereqs done (2026-07-11): zod PR #2 merged with A/B
transcripts comment, calibration table live on agent-readiness-kit README, site PR #5
merged, screenshots rendered in `receipts/`.
**Images, in order:** `01-audit-before.png`, `02-gate-catches-scanner.png`,
`03-audit-after.png`.
**Comment links:** https://github.com/connordibble/zod-ai-tool/pull/2 and
https://github.com/connordibble/agent-readiness-kit#real-world-scores

---

Last week I posted agent-readiness-kit, an audit that scores whether a repo is ready for coding agents to work in. Fair question: do my own repos pass?

zod-ai-tool didn't. 48/100.

This is a published npm package with a CI matrix across three Node and four Zod versions, enforced coverage thresholds, and a thorough CONTRIBUTING guide. The audit was unimpressed. Instructions: 0. Skills: 0. Quality gate: partial.

It was right. Three things an agent working in that repo had to guess:

1. A `fix:` or `feat:` commit pushed to main publishes to npm via semantic-release. That rule lived in CONTRIBUTING.md, written for human contributors. An agent that labels a README typo commit `fix:` ships a package version.

2. package.json had seven scripts and no single check command. "Run the full set when practical" is a judgment call, and an agent was never told how to make it.

3. A local test pass only exercises one of the two Zod code paths. The suite for the other version skips itself, and nothing at the entry point said so.

The fix took an afternoon. `npx agent-readiness-kit init` scaffolded an AGENTS.md and a check script, which alone moved the score to 82. The remaining 18 points were the actual engineering: filling AGENTS.md with this repo's real rules, writing two skills for the workflows that repeat (adding a provider target, changing conversion behavior), and wiring a secrets scan into the gate and CI.

Best moment: the new gate failed its first run. It flagged the secrets scanner I had just added, because eslint didn't know the scripts directory runs in Node. A deterministic gate has no opinion about whose code it fails. That is the job.

zod-ai-tool now audits at 100/100. The score is a snapshot, and I don't confuse it with quality. What it measures is whether an agent working in this repo has to guess. Guessing is what I wanted gone.

If you run coding agents in your codebase: `npx agent-readiness-kit audit`, and tell me the score. The full diff and both audit runs are linked in the comments.

---

## Suggested first comment (the A/B, ran for real on 2026-07-09)

I also ran the experiment people usually ask for. Same prompt to a fresh coding agent against both states of the repo: you just fixed a README typo, what do you run before you're done, and what commit message do you use?

Credit where due: both agents landed on `docs:` and avoided triggering a release. The repo had a thorough CONTRIBUTING.md, and a strong agent dug the answer out. The difference was the dig.

Before: the agent mapped the directory and opened nine files to reconstruct the workflow. Along the way it correctly noticed that not one documented command actually validates a README change, so it improvised its own check.

After: the first file it opened was AGENTS.md. It named `pnpm check` as the finishing gate in one command, quoted the release warning back at me, and flagged the secrets scan unprompted. That scan did not exist in the before state for any agent to find.

Every agent that improvises a workflow rebuilds it a little differently and gets it right until one doesn't. The readiness pass removes the improvisation. Full transcripts are in the PR linked above.
