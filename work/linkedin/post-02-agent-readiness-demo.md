# LinkedIn Post #2 - Demo Log and Receipts

**Date of demo:** July 9, 2026
**Repo:** [zod-ai-tool](https://github.com/connordibble/zod-ai-tool) (published npm package, v1.1.0)
**Branch:** `agent-readiness-pass` (commit `f1650cc`), PR: https://github.com/connordibble/zod-ai-tool/pull/2
**Result:** agent-readiness-kit score **48/100 → 100/100**, wall-clock well under an afternoon.

---

## Timeline (what actually ran, in order)

1. `npx -y agent-readiness-kit@latest audit .` on a clean `main` → **48/100 (not ready yet)**.
   - Instructions 0/28, Skills 0/10, Deterministic Gates 6/20.
   - Safety, AI Boundaries, CI, Release, Docs: all 100. The project was healthy; the agent
     context was missing. Six findings, all scaffolding.
2. `npx -y agent-readiness-kit@latest init .` → **82/100 (ready with minor gaps)**.
   - One command created a template `AGENTS.md` and a `check` script in package.json.
   - The template has honest `[fill in]` brackets. 82 is the floor, not the finish.
3. Replaced the template `AGENTS.md` with a real one (54 non-empty lines): purpose and
   scope boundary, a file-by-file map, the `pnpm check` gate, five hard rules, and the
   semantic-release warning (see "sharpest detail" below).
4. Wrote two skills for the repo's actual repeated workflows:
   - `.agents/skills/add-provider/SKILL.md` - adding a provider target without taking on
     SDK dependencies; which of the 5 test patterns apply; the OpenAI three-surfaces gotcha.
   - `.agents/skills/conversion-compat/SKILL.md` - the two conversion code paths (Zod 4
     built-in vs `zod-to-json-schema` fallback), how `describe.runIf(isZod4)` gates the
     fixture suites, how to exercise the Zod 3 path locally, snapshot review policy.
5. Added `scripts/no-secrets.mjs` (the same zero-dependency scanner agent-readiness-kit's
   own repo uses), a `secrets:check` script, wired it into `check`, and added a CI step.
6. Ran `pnpm check` - **it failed.** The new gate's lint step flagged the scanner itself
   (`'process' is not defined` - eslint had no Node globals for `scripts/`). Fixed the
   eslint config. Re-ran: secrets scan + lint + typecheck + 65 tests, all green.
7. Re-audit → **100/100 (excellent)**. Every finding closed with evidence.

## The sharpest detail (lead candidate for the post)

This repo publishes to npm via semantic-release: a `fix:` or `feat:` commit pushed to main
ships a release. That fact lived in CONTRIBUTING.md, in a section written for human
contributors - one of nine root-level files. An agent that "helpfully" labels a README typo
commit `fix:` publishes a package version.

Careful with the claim: it **was** documented. The gap was placement, not existence. The
honest line is: *the knowledge existed for humans; nothing put it where an agent starts.*
AGENTS.md now states it in its own section ("Releases Happen From Commit Messages").

## Other honest before/after facts

- Before: package.json had 7 scripts and no single gate. "Run the full set when practical"
  (CONTRIBUTING) is a judgment call an agent can't make. After: `pnpm check` is the
  documented finishing gate, and CI runs the same secrets scan.
- Before: the OpenAI strict-mode invariant (optional fields must accept `null`; never
  normalize `null` → `undefined`) was one line deep inside CONTRIBUTING. After: it's a hard
  rule in AGENTS.md *and* a gotcha in both skills.
- Before: nothing warned that a local test pass only covers one of the two Zod code paths
  (`describe.runIf` skips the other suite). After: the conversion-compat skill explains the
  matrix and shows the exact pin/restore commands.
- The gate caught its own scanner on first run. Good line: the point of a deterministic
  gate is that it doesn't care whose code it fails - including the person adding the gate.

## What NOT to claim

- Don't claim the repo was undocumented - CONTRIBUTING.md is thorough. The claim is
  "documented for humans ≠ usable by agents."
- Don't claim an agent actually caused a bad release. It's a hazard we closed, not an
  incident.
- Don't present 100/100 as "my package is perfect" - present it as "every rule maps to a
  fix, and I did the fixes." The kit's own README says scores are snapshots, not grades.
- The init command alone got to 82. Say that plainly - it makes the tool look good and the
  remaining 18 points are where the real engineering judgment shows.

## Before posting - publish checklist

1. Review and merge https://github.com/connordibble/zod-ai-tool/pull/2. (Commit is typed
   `chore:` - it will not trigger an npm release.)
2. Confirm CI is green on main, including the new Secrets scan step.
3. In agent-readiness-kit: `pnpm build && node scripts/calibrate.mjs --update-readme`,
   commit. The public README table then shows zod-ai-tool at its new score - that table is
   the public receipt the post can point to.
4. Screenshots: DONE, rendered as terminal-window PNGs in `receipts/` from the verbatim
   captures. Upload in this order (chronological, ends on the win):
   1. `01-audit-before.png` - the 48/100 block
   2. `02-gate-catches-scanner.png` - pnpm check failing on the new scanner
   3. `03-audit-after.png` - the 100/100 block
5. Post the A/B transcripts to the PR so the first comment's "transcripts in the PR" claim
   is true:
   `gh pr comment 2 --repo connordibble/zod-ai-tool --body-file work/linkedin/receipts/ab-pr-comment.md`
6. Link in comments: the zod-ai-tool PR (the diff IS the content - 277 insertions,
   8 files) and the agent-readiness-kit repo.
7. Merge https://github.com/connordibble/connordibble.dev/pull/5 (ARK project page
   "First Field Test: 48 to 100" section) before or alongside the LinkedIn post, so
   the project page tells the same story when post traffic clicks through. It assumes
   zod-ai-tool PR #2 is merged first.

## A/B test (ran 2026-07-09, transcripts are real)

Method: two fresh read-only agents, same model, zero context from this session, identical
prompt ("you just fixed a README typo; what do you run before you're done, what commit
message, what else to be careful about"). One pointed at a detached worktree of `main`
(before), one at `agent-readiness-pass` (after). Full verbatim transcripts:
`receipts/ab-before-transcript.md` and `receipts/ab-after-transcript.md`.

**Result, honestly stated: both agents got the commit type right (`docs:`, no release).**
The repo's CONTRIBUTING.md is thorough and a strong agent dug the answer out. The
differences are where the story lives:

- **The dig.** Before: 9 files opened plus `ls`/`find` to map the directory before it could
  answer. After: AGENTS.md was the first file opened and contained the answers; the other
  5 files were verification.
- **The gate.** Before: no single command exists, so the agent listed four scripts and then
  correctly pointed out that none of them exercises a README change, and improvised
  `git diff README.md` as the real check. After: `pnpm check`, named as the finishing gate,
  in one command.
- **The scan.** Before: zero mention of secrets, because no scan existed to find. After:
  the agent flagged the secrets policy unprompted and noted the scan runs first in the gate.
- **The warning.** The after-agent quoted AGENTS.md back verbatim: "Never label a change
  `fix:` for convention's sake - that word ships a package."

**Framing for the post/comments:** do NOT claim the before-agent failed. The claim that
holds: a strong agent can reconstruct a well-documented repo's workflow by improvising, and
improvisation is the thing readiness work removes. Every agent rebuilds the workflow its
own way and gets it right until one doesn't; the gate removes the variance, and the checks
the after-agent names actually exist now. Caveat worth keeping in hand for comments: this
repo already had a thorough CONTRIBUTING.md; most repos give an agent far less to dig
through, so the before-state here is a best case.

Suggested placement: first comment under the post (copy in post-02-draft.md), or held back
as reply material when someone asks "would an agent really get this wrong?"

## Raw captures

In `work/linkedin/receipts/`:

- `audit-before.txt` / `audit-before.json` - full 48/100 output
- `init-output.txt` - the 48→82 init run
- `audit-after.txt` / `audit-after.json` - full 100/100 output
