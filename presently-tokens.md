# Presently — Design Tokens Reference

The CSS custom properties in `globals.css` are the single source for every visual decision on the marketing site. This document explains why each decision was made, so future pages stay consistent without guessing.

## Color

| Token | Value | Usage | Rule |
|-------|-------|-------|------|
| `--bg` | `#FAFAF7` | Page background | Always. Never pure white `#FFF` as a page bg. |
| `--surface` | `#FFFFFF` | Cards, elevated panels | Cards sit on the off-white; the contrast is subtle but structural. |
| `--ink` | `#101828` | Headings, primary text | Near-black, not pure black. |
| `--muted` | `#5B6472` | Descriptions, secondary text | Body copy under headings, meta text, timestamps. |
| `--line` | `#E7E5DF` | Borders, dividers | Warm gray to match the off-white base — not cool gray. |
| `--blue` | `#2563EB` | Primary CTA, links, active | The only saturated color used for actions. |
| `--green` | `#16A34A` | Success, "checked in," live indicators | Never decorative — always means "good state." |
| `--amber` | `#B45309` | Warning, over-limit, attention | Never decorative — always means "needs action." |

**Tint rule:** Every semantic color has a `*-tint` companion at ~8% saturation for backgrounds (badges, icon containers, highlight rows). Don't invent new tints — use the tokens.

## Typography

Three font families, each with one job:

| Stack | Family | Job | Where |
|-------|--------|-----|-------|
| `--font-display` | Bricolage Grotesque | Headings, wordmark | h1–h3, section titles, card titles, wordmark |
| `--font-body` | Geist | Everything else | Body, buttons, labels, descriptions, nav |
| `--font-mono` | Geist Mono | Timestamps, data, badges | Stamps, chips, timer values, metadata |

**Weight rules:**
- Display: 600 (headings), 700 (wordmark only)
- Body: 400 (text), 500 (buttons, labels), 600 (submit buttons)
- Mono: 400 (data), 500 (stamps/badges)

**Tracking rules:**
- Display: negative (-0.025em for h1, -0.01em for h3)
- Body: default (0)
- Mono stamps: positive (0.06em) + uppercase

## Radii

| Token | Value | Used for | Rule |
|-------|-------|----------|------|
| `--radius` | `10px` | Buttons, standard cards, icon containers | The default. When in doubt, use this. |
| `--radius-sm` | `8px` | Inputs, inner cards, nested elements | Anything inside a card gets the smaller radius. |
| `--radius-lg` | `14px` | Feature cards, section-level cards | Outer cards at section level. |
| `--radius-xl` | `16px` | Form containers, hero panels | The largest card — used sparingly. |
| `--radius-pill` | `99px` | Chips, badges, pips | NEVER on buttons. Pill shape = data label, not action. |

## Buttons

Four variants. Never invent a fifth.

| Class | Background | Text | Border | Context |
|-------|-----------|------|--------|---------|
| `.btn-primary` | `--blue` | white | none | Primary CTA — one per viewport ideally |
| `.btn-ghost` | transparent | `--ink` | `--line` | Secondary action beside a primary |
| `.btn-on-blue` | white | `--blue-ink` | none | On blue backgrounds |
| `.btn-on-dark` | white | `--ink` | none | On dark/near-black backgrounds |

**Rules:**
- All buttons use `--radius` (10px). No exceptions.
- `.btn-lg` for hero / CTA-level buttons.
- Hover = darken bg or lighten border. No scale transforms, no color shifts.
- Focus: `outline: 2px solid var(--blue); outline-offset: 3px`.

## Form inputs

- Label above, always visible. Never placeholder-only.
- Label: 13.5px, weight 500, `--ink`.
- Input: 15px, `--radius-sm` (8px), `--line` border, `--surface` bg.
- Focus: border becomes `--blue`, add `--shadow-focus` ring.
- Placeholder: `--placeholder` (`#B0B5BE`).
- Submit button: full-width, `--radius-sm`, weight 600.

## Cards

- Background: `--surface`.
- Border: `1px solid var(--line)`.
- Radius: `--radius-lg` (14px) for standalone cards, `--radius-xl` (16px) for form containers.
- Hover: `border-color` -> `--line-hover`.
- Elevated cards add `--shadow-elevated`.

## Stamp (section eyebrow)

The stamp pattern is the page's signature device: a mono uppercase label preceded by a short horizontal line.

```
── CHECK-IN FOR LEARNING CENTERS
```

- Font: `--font-mono`, 12.5px, weight 500, tracking 0.06em, uppercase.
- Color: `--blue` (default) or `--muted` (inside cards).
- The `::before` line is 22px x 1px.
- Use at the start of sections and inside step cards. Don't overuse — one per section.

## Shadows

| Token | Usage |
|-------|-------|
| `--shadow-card` | Subtle. Default card resting state (most cards use border, not shadow). |
| `--shadow-elevated` | Hero board, lifted panels. Two-layer: ambient + directional. |
| `--shadow-device` | Device frames (iPhone, iPad mockups in vignettes). |
| `--shadow-focus` | Focus ring fill — always paired with `border-color: --blue`. |

## Spacing

- Page max-width: 1120px.
- Page horizontal padding: 24px.
- Section vertical padding: 88px.
- Card padding: 28px 26px (standard), 36px 32px (large/form cards).
- Between sections: `border-top 1px solid var(--line)` or tinted bg (`#FFFFFF`) — not both.

## Motion

- Default transition: `0.15s ease` — hover states, border changes.
- Spring curve: `cubic-bezier(.34, 1.56, .64, 1)` — scroll-reveal, element entrances.
- All animations respect `prefers-reduced-motion: reduce`.
