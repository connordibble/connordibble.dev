---
version: 1.0
name: connordibble.dev Design Direction
description: 'Personal portfolio for a software engineer. The visual language is precise, minimal, and dark — built for technical credibility. Graphite surfaces, crisp type, a single muted accent, and generous whitespace. The site should feel like something a senior engineer built intentionally, not a template someone filled in.'

colors:
  accent: 'oklch(67% 0.125 55)'
  accent-hover: 'oklch(72% 0.13 55)'
  accent-soft: 'oklch(20% 0.05 45)'
  canvas: 'oklch(13% 0.012 45)'
  shell: 'oklch(16% 0.014 45)'
  panel: 'oklch(19% 0.016 45)'
  panel-raised: 'oklch(23% 0.017 45)'
  panel-hover: 'oklch(27% 0.018 45)'
  border: 'oklch(31% 0.018 45)'
  border-strong: 'oklch(41% 0.02 45)'
  text: 'oklch(94% 0.012 75)'
  text-muted: 'oklch(74% 0.016 70)'
  text-subtle: 'oklch(60% 0.016 65)'
  code-bg: 'oklch(14% 0.012 45)'
  code-border: 'oklch(27% 0.016 45)'
  success: 'oklch(66% 0.13 150)'
  warning: 'oklch(74% 0.12 82)'

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

`accent` (`oklch(67% 0.125 55)`) appears only on:
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

Multi-route portfolio with a strong home index. Routes share the same dark
graphite system, navigation, footer, typography, and CTA voice.

Macrostructure family:

- **Home and project indexes:** Portfolio Grid. The work is the proof; cards use
  subtle span variation instead of uniform rows.
- **Writing index:** Ecosystem Index restrained to featured essays plus a
  filterable archive.
- **Project and writing detail pages:** Long Document. Continuous prose, inline
  section heads, no decorative screenshots or fake chrome.
- **About page:** Long Document with short note cards; first-person, direct, no
  resume-wall layout.

Home sections in order:

1. **Hero** — name, one-line role, brief positioning statement, CTA links
2. **About** — split statement + prose, a human voice, not a resume summary
3. **Projects** — 3–4 featured projects, asymmetric grid, stack tags
4. **Experience** — spec-sheet rows: role/date left, impact right
5. **Skills** — concise grouped panels, no skill bars or percentages
6. **Contact** — email link, GitHub, LinkedIn. Nothing else.

### Navigation

N5 Floating pill. The nav is detached from the page edge, content-sized on
desktop, and collapses to wordmark + theme toggle + menu button on narrower
viewports. Keep all labels single-line.

### Footer

Ft5 Statement. The footer closes with a sentence, then a compact meta row.
Never use a four-column sitemap footer on this site.

### Max Width

Content max-width: `55rem` centered for text sections. Project and writing
grids use the same container but divide into six columns at desktop. Never
full-bleed text.

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

All colors are defined as CSS custom properties on `:root` and consumed
exclusively via those variables. No Tailwind color utilities (e.g. `bg-zinc-900`)
are used directly — only utilities mapped to CSS vars through Tailwind v4
`@theme inline`.

```css
:root {
  --color-accent: oklch(67% 0.125 55);
  --color-accent-hover: oklch(72% 0.13 55);
  --color-accent-soft: oklch(20% 0.05 45);
  --color-accent-ink: oklch(13% 0.012 45);
  --color-focus: oklch(78% 0.13 55);
  --color-canvas: oklch(13% 0.012 45);
  --color-shell: oklch(16% 0.014 45);
  --color-panel: oklch(19% 0.016 45);
  --color-panel-raised: oklch(23% 0.017 45);
  --color-panel-hover: oklch(27% 0.018 45);
  --color-border: oklch(31% 0.018 45);
  --color-border-strong: oklch(41% 0.02 45);
  --color-text: oklch(94% 0.012 75);
  --color-text-muted: oklch(74% 0.016 70);
  --color-text-subtle: oklch(60% 0.016 65);
  --color-code-bg: oklch(14% 0.012 45);
  --color-code-border: oklch(27% 0.016 45);
  --color-success: oklch(66% 0.13 150);
  --color-warning: oklch(74% 0.12 82);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

Light mode overrides only this token block under `[data-theme="light"]` — no
component changes required.

```css
:root[data-theme="light"] {
  --color-accent: oklch(53% 0.125 55);
  --color-accent-hover: oklch(45% 0.13 55);
  --color-accent-soft: oklch(90% 0.034 55);
  --color-accent-ink: oklch(98% 0.004 235);
  --color-focus: oklch(48% 0.13 55);
  --color-canvas: oklch(97% 0.004 235);
  --color-shell: oklch(99% 0.002 235);
  --color-panel: oklch(96% 0.004 235);
  --color-panel-raised: oklch(99% 0.001 235);
  --color-panel-hover: oklch(92% 0.006 235);
  --color-border: oklch(84% 0.006 235);
  --color-border-strong: oklch(67% 0.007 235);
  --color-text: oklch(20% 0.011 245);
  --color-text-muted: oklch(41% 0.013 245);
  --color-text-subtle: oklch(52% 0.012 245);
  --color-code-bg: oklch(95.5% 0.004 235);
  --color-code-border: oklch(84% 0.006 235);
  --color-success: oklch(48% 0.12 150);
  --color-warning: oklch(50% 0.11 82);
}
```

Tailwind utilities are mapped in `src/app/globals.css`:

```css
@theme inline {
  --color-accent: var(--color-accent);
  --color-canvas: var(--color-canvas);
  --color-panel: var(--color-panel);
  --font-sans: var(--font-body);
  --font-mono: var(--font-outlier);
}
```

Never hardcode a hex value in a component. If a color is not in the token set,
add it here first.

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
- `pnpm build` and `pnpm lint` pass
- Lighthouse performance score ≥ 95

## Exports

### tokens.css

The canonical portable token file lives at `tokens.css`. `src/app/globals.css`
imports it, then mirrors the tokens into Tailwind v4 `@theme inline`.

### Tailwind v4 `@theme`

```css
@theme inline {
  --color-accent: var(--color-accent);
  --color-canvas: var(--color-canvas);
  --color-panel: var(--color-panel);
  --color-text: var(--color-text);
  --font-sans: var(--font-body);
  --font-mono: var(--font-outlier);
  --spacing-lg: var(--space-lg);
  --text-body: var(--text-body);
  --ease-out: var(--ease-out);
}
```

### DTCG `tokens.json`

```json
{
  "color": {
    "canvas": { "$value": "oklch(13% 0.012 45)", "$type": "color" },
    "text": { "$value": "oklch(94% 0.012 75)", "$type": "color" },
    "accent": { "$value": "oklch(67% 0.125 55)", "$type": "color" }
  },
  "font": {
    "body": { "$value": "Geist", "$type": "fontFamily" },
    "mono": { "$value": "Geist Mono", "$type": "fontFamily" }
  },
  "space": {
    "lg": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables

```css
:root {
  --background: 13% 0.012 45;
  --foreground: 94% 0.012 75;
  --primary: 67% 0.125 55;
  --primary-foreground: 13% 0.012 45;
  --muted: 31% 0.018 45;
  --muted-foreground: 74% 0.016 70;
  --border: 31% 0.018 45;
  --input: 31% 0.018 45;
  --ring: 78% 0.13 55;
  --radius: 8px;
}
```
