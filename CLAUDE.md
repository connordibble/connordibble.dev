# connordibble.dev

Personal portfolio site for Connor Dibble, software engineer.

## Stack
- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion

## Package Manager
Use `pnpm` exclusively. Never use npm or yarn.

```bash
pnpm add <package>        # add dependency
pnpm add -D <package>     # add dev dependency
pnpm install              # install all deps
pnpm audit                # security audit
```

## Key Files
- `DESIGN.md` — all visual/UX decisions, follow strictly
- `.agents/skills/` — React performance and design rules, consult before component work

## Code Rules
- Mobile-first — test every component at 375px
- Prefer Server Components; use `"use client"` only when necessary
- No hardcoded hex values in components — CSS custom properties only
- No Tailwind color utilities like `bg-zinc-900` — use mapped token utilities only
- All tokens defined in `src/app/globals.css` on `:root`, mapped through Tailwind v4 `@theme`
- Animations: Framer Motion only, 150–250ms, ease-out
- No placeholder content — ask if copy is missing

## Writing Content (Essays)
- Essay data lives in `src/data/writing.ts` as typed `WritingPost` objects, newest first. Figures live in `src/components/writing-figures.tsx`; reuse `Zone` and `FigureTable`, tokens only.
- Cross-linking pattern (reuse for every new essay):
  - Related work: add `related: [{ kind: "writing" | "project", slug }]` to the post. Cards render at the foot of the essay via `src/lib/related.ts`; unknown slugs are dropped silently, so a stale slug fails soft.
  - In-text references: when an essay mentions another piece directly, add `links: [{ text, href }]` to that paragraph block. `text` must match a substring of the paragraph exactly, and the first occurrence becomes the link.
  - The resolver in `src/lib/related.ts` is generic. If project pages ever need related cards, reuse it there instead of writing a second one.
- Voice and style: follow the global `connor-technical-writing` skill when drafting or editing essays.

## Git
- Commit messages: one-line Conventional Commits subject only. No body, no `Co-Authored-By` or other trailers.

## What This Site Is Not
- Not a blog — Writing is a small set of deliberate essays, not a feed
- Not a SaaS product — no auth, no dashboard patterns
- Not a template — every section should feel intentional

## Dependency Security
- Exact versions only — no `^` or `~` in package.json
- Verify every package exists on pnpm.io / npmjs.com before installing
- Run `pnpm dlx socket npm install <pkg>` before adding any new dependency
- Run `pnpm audit` after every install session
- Commit `pnpm-lock.yaml` always — never .gitignore it
- Never install a package suggested by AI without manually verifying it first (slopsquatting)
- Prefer packages with >1M weekly downloads and active recent releases
