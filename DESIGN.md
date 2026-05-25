---
version: 1.0
name: connordibble.dev Design Direction
description: 'Personal portfolio for a software engineer. The visual language is precise, minimal, and dark — built for technical credibility. Graphite surfaces, crisp type, a single muted accent, and generous whitespace. The site should feel like something a senior engineer built intentionally, not a template someone filled in.'

colors:
  accent: '#c97a45'
  accent-hover: '#d98f5e'
  accent-soft: '#261510'
  canvas: '#0b0908'
  shell: '#100d0b'
  panel: '#161210'
  panel-raised: '#1c1714'
  panel-hover: '#221c18'
  border: '#2e2620'
  border-strong: '#3d332b'
  text: '#f0ece6'
  text-muted: '#afa69b'
  text-subtle: '#8d8379'
  code-bg: '#0d0a08'
  code-border: '#262018'
  success: '#34b36a'
  warning: '#c9a227'

typography:
  ui:
    fontFamily: 'Geist, Inter, ui-sans-serif, system-ui, sans-serif'
    letterSpacing: '0'
  mono:
    fontFamily: 'Geist Mono, JetBrains Mono, ui-monospace, monospace'
    letterSpacing: '0'
  sizes:
    display: '48px'
    headline: '32px'
    section-title: '20px'
    body: '16px'
    body-small: '14px'
    caption: '12px'
    code: '13px'

radii:
  xs: '4px'
  sm: '6px'
  md: '8px'
  lg: '12px'

spacing:
  xxs: '4px'
  xs: '8px'
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '48px'
  xxl: '96px'
---

# connordibble.dev Design Direction

This site is a professional portfolio for a software engineer. It is not a marketing page, not a template, and not a showcase of UI tricks. Every design decision should reinforce one message: this person is a serious engineer with taste.

## Product Feel

The site is:

- Quiet and confident.
- Dark by default — code and technical content read best here.
- Typographically driven — hierarchy through size and weight, not color.
- Spacious — whitespace is intentional, not padding.
- Fast-feeling — transitions are subtle, never theatrical.

The site is not:

- A SaaS landing page with feature grids.
- A Tailwind template screenshot.
- A gradient blob playground.
- A collection of animated cards competing for attention.
- A clone of any other engineer's portfolio.

## Visual Principles

### Hierarchy Through Type

Every screen should answer one question at a time:
- Who is this person?
- What have they built?
- Where have they worked?
- How do I contact them?

Type scale and weight carry that hierarchy. Accent color is not used for decoration — only for interactive elements and active states.

### Surfaces

Use layered graphite surfaces. Avoid pure black. Borders create depth — not shadows.

| Level | Token          | Use                              |
| ----- | -------------- | -------------------------------- |
| 0     | `canvas`       | Page background                  |
| 1     | `shell`        | Navigation, footer               |
| 2     | `panel`        | Section backgrounds, cards       |
| 3     | `panel-raised` | Hovered cards, code blocks       |
| 4     | `panel-hover`  | Active/focused interactive items |

### Sparse Accent

`accent` (#c97a45) appears only on:
- Links on hover
- Focused interactive elements
- Active navigation state
- Subtle tag/badge borders

Never use accent as a background fill for large surfaces.

### Motion

Motion confirms state changes and aids spatial orientation. It does not perform.

- Page entrance: fade + subtle translateY, 200ms ease-out
- Hover states: opacity or border shift, 120ms
- No looping animations
- No scroll-triggered sequences that delay content
- Always respect `prefers-reduced-motion`

## Layout

### Page Structure

Single-page with anchor navigation. Sections in order:

1. **Hero** — name, one-line role, brief positioning statement, CTA links
2. **About** — 2–3 sentences max, a human voice, not a resume summary
3. **Projects** — 3–4 featured projects, what problem, what was built, stack tags
4. **Experience** — timeline of roles, company, title, dates, 1–2 line impact summary
5. **Skills** — concise, grouped by category, no skill bars or percentages
6. **Contact** — email link, GitHub, LinkedIn. Nothing else.

### Navigation

Sticky top nav. Minimal: name/logo mark on the left, section links on the right. No hamburger menu on desktop. Mobile: simple top sheet or anchor links.

### Max Width

Content max-width: `768px` centered for text sections. Projects grid can extend to `1024px`. Never full-bleed text.

### Responsive

Mobile-first. Every component tested at 375px. Projects stack to single column. Navigation collapses cleanly. Type scale reduces one step on mobile.

## Typography

| Role          |   Size | Weight | Use                              |
| ------------- | -----: | -----: | -------------------------------- |
| Display       |   48px |    600 | Hero name                        |
| Headline      |   32px |    600 | Section titles                   |
| Section title |   20px |    500 | Card titles, role titles         |
| Body          |   16px |    400 | All prose content                |
| Body small    |   14px |    400 | Meta, dates, secondary labels    |
| Caption       |   12px |    500 | Tags, stack labels, nav items    |
| Code          |   13px |    400 | Inline code, tech names in mono  |

Use mono only where it carries meaning: tech stack tags, inline code, and any terminal-style elements.

## Component Patterns

### Hero

- Name in display type, full weight
- Role/title in text-muted, body-small or caption, spaced above name
- One sharp positioning line — not a paragraph
- Two CTA links max: GitHub and resume or contact
- No hero image, no avatar above the fold (optional: small avatar beside name)

### Project Cards

- Title, one-sentence description, impact if quantifiable
- Stack tags in mono caption, `panel` background, `border` outline
- Link to live site or repo — not both unless both are meaningful
- No screenshots unless they genuinely demonstrate the work
- 2-column grid desktop, 1-column mobile

### Experience

- Clean timeline: role title, company, date range
- 1–2 lines of impact — what shipped, what improved, what scale
- No bullet lists inside timeline items
- Company names in `text-muted`, role in `text`

### Skills

- Grouped: Languages, Frameworks, Infrastructure, Tools
- Plain inline list or simple grid — no bars, no ratings, no percentages
- Tech names in mono caption

### Code Blocks (if used)

- `code-bg` background, `code-border` outline
- Geist Mono, 13px
- Subtle syntax highlight — do not let color theme dominate the page
- Copy button on hover

## Token Architecture

All colors are defined as CSS custom properties on `:root` and consumed exclusively via those variables. No Tailwind color utilities (e.g. `bg-zinc-900`) are used directly — only utilities mapped to CSS vars.

```css
:root {
  --color-accent: #c97a45;
  --color-accent-hover: #d98f5e;
  --color-accent-soft: #261510;
  --color-canvas: #0b0908;
  --color-shell: #100d0b;
  --color-panel: #161210;
  --color-panel-raised: #1c1714;
  --color-panel-hover: #221c18;
  --color-border: #2e2620;
  --color-border-strong: #3d332b;
  --color-text: #f0ece6;
  --color-text-muted: #afa69b;
  --color-text-subtle: #8d8379;
  --color-code-bg: #0d0a08;
  --color-code-border: #262018;
  --color-success: #34b36a;
  --color-warning: #c9a227;
}
```

Light mode is not built yet but must be structurally free. When added, it overrides only this block under `[data-theme="light"]` — no component changes required.

Extend `tailwind.config.ts` to map utilities to these vars:

```ts
colors: {
  accent: 'var(--color-accent)',
  canvas: 'var(--color-canvas)',
  panel: 'var(--color-panel)',
  // etc.
}
```

Never hardcode a hex value in a component. If a color is not in the token set, add it here first.

## Anti-Patterns

Do not build:

- Skill progress bars or percentage ratings
- Animated particle or canvas backgrounds
- A "timeline" that is just a vertical list with a colored line
- Testimonials or endorsement carousels
- A contact form (a mailto link is enough)
- Easter eggs or cursor effects
- Any section that exists to fill space

## Accessibility

- All interactive elements keyboard accessible
- Visible focus rings using `accent`
- Color is never the only signal
- Images have meaningful alt text
- Contrast meets WCAG AA minimum throughout

## Content Voice

Direct, confident, specific:

- "Built a real-time data pipeline processing 2M events/day"
- "Led migration from monolith to microservices across 4 teams"
- "Open source contributor to Next.js and shadcn/ui"

Not:

- "Passionate engineer who loves solving hard problems"
- "Experienced in a wide variety of technologies"
- "Results-driven professional"

## Implementation Checklist

Before any section is considered complete:

- Renders correctly at 375px and 1280px
- No hardcoded colors — CSS custom properties only
- Hover and focus states exist on all interactive elements
- No placeholder copy — real content or ask
- `pnpm check` passes
- Lighthouse performance score ≥ 95
