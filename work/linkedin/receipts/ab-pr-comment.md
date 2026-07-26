# A/B experiment: same agent prompt, before vs. after this PR

Two fresh agents, same model, identical prompt, one pointed at `main` and one at this branch (detached worktrees, read-only). Verbatim results below.

---

# A/B transcript: BEFORE state (main @ 9ea7296, pre agent-readiness pass)

Method: fresh read-only agent (no context from the working session), pointed at a detached
git worktree of main. Prompt was identical to the after-run except the path.

## Prompt

> You are a coding agent that has just started working in the repository at [worktree path]
> Use only that directory's contents to answer. Do not look at any other repository, and do
> not rely on prior knowledge about this specific project.
> Scenario: you have just finished a small change in this repo. You fixed a typo in
> README.md. Nothing else changed.
> 1. What command(s) do you run to validate your work before declaring it done? Give exact
>    commands.
> 2. Exactly what commit message would you use for this change?
> 3. What else, if anything, do you need to be careful about when finishing work in this
>    repository?
> Rules: read files to find out; do not run package scripts, do not install dependencies,
> do not modify anything. When done, report: your three answers, then a list of every file
> you opened to reach them, in the order you opened them.

## Agent's answer (verbatim)

I have everything I need. Here are my answers.

### 1. Commands to validate the work

The repo's documented check set (from `CONTRIBUTING.md`, backed by `package.json` scripts, run with the pinned pnpm) is:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

(plus `pnpm test:coverage` for the full set).

But honestly, for a README-only prose typo, none of those actually exercise the change: ESLint is configured for JS/TS only and ignores Markdown (`eslint.config.mjs`), and `tsc`/`vitest`/`tsup` never touch `README.md`. `CONTRIBUTING.md` says "At minimum, run the checks that cover the files you changed" — and no automated check covers README prose. So the meaningful validation is:

```bash
git diff README.md
```

Re-read the diff to confirm the fix and that nothing else moved. Running the full pnpm suite above is fine as a cheap sanity gate ("run the full set when practical"), but it is not what proves a typo fix.

### 2. Commit message

```
docs: fix typo in README
```

Conventional Commits is required (`CONTRIBUTING.md` "Commit and Release Conventions"). `docs:` is the correct type — it will not trigger a semantic-release publish, which is what you want for a typo.

### 3. What to be careful about

- Commit prefix controls releases. Every push to `main` runs CI and then a semantic-release job (`.github/workflows/ci.yml`, `.releaserc.json`). Using `fix:` or `feat:` here would publish a brand-new npm version just for a typo. `docs:` avoids that. Do not use a release-triggering prefix.
- Don't touch `CHANGELOG.md` or the `version` in `package.json`. semantic-release owns both and commits them itself (`@semantic-release/git` assets). Hand-editing them causes drift.
- Use pnpm, not npm/yarn. The package manager is pinned (`packageManager: pnpm@10.33.0`); `CONTRIBUTING.md` says use the pinned one.
- `README.md` is a published artifact. It ships to npm (`files` in `package.json`; `.npmignore` comment: "Only dist/ + README ship"), so the fix will reach npm users on the next release — worth getting right.
- Keep the change narrow. One purpose only; don't reflow or reformat unrelated README lines (`CONTRIBUTING.md` "Keep pull requests narrow").
- Confirm it's really just a typo. `CONTRIBUTING.md` lists cases where a README change must stay in sync with code (public API names/return shapes, provider support, validation behavior, install requirements, strict-mode tradeoffs). A pure spelling fix needs no code sync — just make sure you're not silently changing a documented behavior claim.

### Files I opened, in order

1. `CONTRIBUTING.md`
2. `HANDOFF.md`
3. `package.json`
4. `.releaserc.json`
5. `CHANGELOG.md`
6. `.github/workflows/ci.yml`
7. `eslint.config.mjs`
8. `.npmignore`
9. `.gitignore`

(I also ran `ls` and `find` to map the directory, and did not open `README.md` itself since the scenario stipulates the typo fix is already done and nothing about the answers depends on its contents.)

*(Paths abbreviated to repo-relative for readability; content otherwise verbatim.)*
# A/B transcript: AFTER state (agent-readiness-pass @ f1650cc)

Method: fresh read-only agent (no context from the working session), pointed at a detached
git worktree of the branch. Prompt was identical to the before-run except the path (see
ab-before-transcript.md for the full prompt).

## Agent's answer (verbatim)

I have everything I need. Here are the answers.

### 1. Commands to validate before declaring done

```bash
pnpm check
```

That is the repo's designated finishing gate. Per `package.json` it expands to:

```bash
pnpm run secrets:check && pnpm run lint && pnpm run typecheck && pnpm test
```

(i.e. `node scripts/no-secrets.mjs`, then `eslint .`, then `tsc --noEmit`, then `vitest run`). Both `AGENTS.md` ("`pnpm check` is the finishing gate. Run it before declaring any work done.") and `CONTRIBUTING.md` name this as the required check. For a README-only typo, the load-bearing part is the secrets scan and lint; nothing about this change requires the extra `pnpm test:coverage` or `pnpm build` steps.

### 2. Exact commit message

```
docs: fix typo in README
```

It must be a `docs:` commit, not `fix:`. This repo uses semantic-release + Conventional Commits, and a `fix:` (or `feat:`) commit merged to `main` publishes a new npm version. A typo correction should not ship a release, so it uses the non-releasing `docs:` type.

### 3. What else to be careful about

- Commit type triggers releases. This is the big one. `AGENTS.md` warns: "Never label a change `fix:` for convention's sake — that word ships a package." Releases are driven entirely by commit messages via `.releaserc.json` (branch `main`, `@semantic-release/npm` + `@semantic-release/github`). Use `docs:`/`chore:`/`test:`/`ci:`/`refactor:` for anything that should not publish.
- No secrets anywhere. The secrets scan (`scripts/no-secrets.mjs`) runs first in `pnpm check` and the policy forbids credentials, API keys, private prompts, or customer data in any file including docs — relevant since README ships in the published `files` list.
- Git state. The working tree is currently in detached HEAD ("Not currently on any branch"); the `agent-readiness-pass` branch is checked out in another worktree and `main` is the release branch. Make sure the fix lands on a proper branch (not a detached HEAD), and remember releases fire only from `main`.
- README is a shipped, contract-bearing file. It is in `package.json`'s `files` and `AGENTS.md`/`CONTRIBUTING.md` treat README updates as part of public-API/behavior changes. A pure typo fix doesn't require touching anything else, but keep the edit scoped to the typo — don't let it drift into API/behavior wording that would then demand code or test changes.
- Not applicable here, but worth confirming you didn't trip them: conversion/provider-shape/example changes have extra requirements (Zod 3 + Zod 4 fixture coverage, snapshot review, examples smoke-run). A README typo touches none of these, so no extra work beyond the gate.

### Files opened, in order

1. `AGENTS.md`
2. `CONTRIBUTING.md`
3. `HANDOFF.md`
4. `package.json`
5. `.releaserc.json`
6. `CHANGELOG.md`

(I also ran `ls`/`git status`/`git log` and listed `.github/workflows` and `.agents/skills`, but did not open README.md or the workflow/skill files.)

*(Paths abbreviated to repo-relative for readability; content otherwise verbatim. The
detached-HEAD note is an artifact of the test worktree, not the real repo.)*
