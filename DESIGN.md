# StudioLumi — Design System Reference

## Brand tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--ink` | `#050403` | primary background |
| `--ink-soft` | `#0c0a09` | alternating section background |
| `--ink-elevated` | `#141110` | raised surfaces (cards, form) |
| `--paper` | `#f9f9f9` | primary text / light surfaces |
| `--orange` | `#e85002` | brand accent |
| `--orange-bright` | `#f16001` | interactive accent (hover, active) |
| `--red` | `#c10801` | gradient accent |
| `--sand` | `#d9c3ab` | gradient accent, warm neutral |
| `--line` / `--line-strong` | `rgba(249,249,249,.1)` / `.18` | borders/dividers |

Fonts: **Bricolage Grotesque** (`--font-display`, headings) + **Inter** (`--font-body`, everything else), loaded via `next/font/google` in `layout.tsx`.

Shared CSS utilities: `.text-gradient-lumi` (animated brand-color text gradient), `.bg-lumi-radial` (soft top-origin glow), `.grain` (film-grain overlay via inline SVG turbulence), `.container-lumi` (max-width 1440px, responsive horizontal padding: `1.5rem` → `3rem` at 768px → `5rem` at 1280px).

## Section rhythm

- Standard vertical padding: `py-20 md:py-36` on nearly every section.
- Backgrounds alternate `bg-ink` / `bg-ink-soft` between adjacent sections purely to create visual separation — check `page.tsx`'s section order before changing one section's background in isolation.
- Every section header follows the same pattern: `<Eyebrow>` (a thin orange rule + tracked-out uppercase label) → `<h2>` display headline → optional supporting `<p>`. Reuse `<Eyebrow>`; don't hand-roll a new label style.

## Typography scale

- Section headline: `font-display text-4xl md:text-5xl font-medium leading-[1.05]`.
- Hero headline: larger and bolder (`text-4xl` up to `lg:text-7xl`, `uppercase`), the one deliberate exception to the standard scale.
- Body copy: `text-base md:text-lg leading-relaxed text-paper/60` — muted white on dark backgrounds.
- Micro/label text: `text-xs uppercase tracking-[0.2em]` to `tracking-[0.28em]`.

## Motion conventions

- Standard easing curve: `[0.16, 1, 0.3, 1]` (soft ease-out) — used for nearly every entrance transition across the site.
- Standard scroll-reveal: the shared `<Reveal>` component (`opacity` + `y` animated `whileInView`), not a hand-rolled `initial`/`animate` pair, unless a section needs bespoke choreography (Hero, LumiTeam).
- Any looping/ambient animation (background glows, ticking timers, auto-cycling carousels) must branch through `useReducedMotion()`. See `CLAUDE.md` for the two-layer reduced-motion system and why this matters.

## Component patterns

- **CTA buttons**: primary = `rounded-full bg-paper text-ink`, secondary = `rounded-full border border-line-strong` with `hover:border-orange-bright hover:text-orange-bright`. Reused verbatim in Hero, Packages, and FinalCTA — don't introduce a third button style.
- **Cards**: `rounded-2xl` (or `rounded-xl` for smaller cards), `border border-line` (or `border-line-strong` for emphasis), dark fill (`bg-ink-soft` / `bg-ink-elevated`).
- **Carousels**: two custom rAF-driven 3D coverflow engines, `CardCylinder` (Cases, real client videos) and `InfluencerCarousel` (Criadores UGC, autoplay drift). Both share the same math lineage — see `CLAUDE.md`'s high-risk section before touching either.

## Section inventory (current, in page order)

1. **Hero** — left-aligned editorial headline with a gradient accent word, small corner labels, warm one-sided glow, two CTAs.
2. **Cases** (`MotionReel`) — 3D video coverflow with real client footage (Meu Pé de Jacarandá, Sérgio Mallandro, Bruno Carvalho, Joyce Turques, Paola Passos, Luciana Grion).
3. **Positioning** — two-column statement + a row of capability tags.
4. **Services** — single-column list with a sliding active-indicator and a color-shifting ambient glow (no photos).
5. **Experiência** (`HumanExperience`) — three numbered differentials, each with a label and a supporting description.
6. **Lumi Team** — fanned card deck (auto-cycling front card) with click-to-expand modal; roles are real, names/photos are placeholder ("Em breve").
7. **Criadores UGC** (`Portfolio`) — 9:16 autoplay coverflow; all six creator slots are placeholder pending real names/photos.
8. **Processo** — four-step list (Imersão → Direção → Produção → Pós-produção).
9. **Manifesto** — centered statement + signature block.
10. **Pacotes** — three pricing tiers (Mobile / Produção / Cinema), priced "sob consulta" with no reference range.
11. **FinalCTA** — contact form (`ContactForm.tsx`); submit currently only logs server-side, see `CLAUDE.md`.
12. **Footer**.
