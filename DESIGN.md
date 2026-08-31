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

- **CTA buttons**: `src/components/ui/button.tsx` — `buttonVariants({ variant, size })` (variants `primary`/`secondary`/`icon`, sizes `default`/`sm`/`nav`/`icon`). Use this instead of hand-rolling another pill-button className; it already covers every button style used site-wide.
- **Badges**: `src/components/ui/badge.tsx` — the orange-bordered "accent" pill (e.g. Packages' "Mais escolhido").
- **Cards**: `rounded-2xl` (or `rounded-xl` for smaller cards), `border border-line` (or `border-line-strong` for emphasis), dark fill (`bg-ink-soft` / `bg-ink-elevated`).
- **Carousels**: two custom rAF-driven 3D coverflow engines, `CardCylinder` (Cases, real client videos) and `InfluencerCarousel` (generic people-carousel — Lumi Team today, Criadores UGC when it returns). Both share the same math lineage — see `CLAUDE.md`'s high-risk section before touching either.
- **Marquee**: `src/components/ui/marquee.tsx` — infinite horizontal scroll for short repeating content (client names in `ClientRoster`). Pauses on hover; do not use for anything the reader needs to read carefully, it's a trust-signal skim pattern, not a reading pattern.
- **Spotlight card**: `src/components/ui/spotlight-card.tsx` — cursor-tracked glow on hover (Packages tier cards). One strategic hover moment; don't spread it across every card on the site or it stops reading as special.

## Section inventory (current, in page order)

1. **Hero** — uppercase editorial headline with a gradient accent word, small corner labels, warm one-sided glow, one tight body line, two CTAs (`buttonVariants`).
2. **Cases** (`MotionReel`) — 3D video coverflow with real client footage (Meu Pé de Jacarandá, Sérgio Mallandro, Bruno Carvalho, Joyce Turques, Paola Passos, Luciana Grion). Also emits an `ItemList`/`VideoObject` JSON-LD block for those six videos.
3. **Client roster** (`ClientRoster`) — a `Marquee` of the same six real client names/roles, reused as a lightweight trust strip right after Cases.
4. **Positioning** — two-column statement + a row of capability tags.
5. **Services** — centered auto-advancing showcase: one large service title/description crossfades every ~4.8s (pauses on hover or manual tab click), numbered index, dot-tab row below, color-shifting ambient glow behind it.
6. **Experiência** (`HumanExperience`) — three numbered differentials, each with a label and a supporting description.
7. **Lumi Team** — `InfluencerCarousel` showing real role names (Fundador & CEO, Cofundadora, Copywriter, Videomaker, Fotógrafa, Storymaker) with a silhouette placeholder until photos are added. No longer the old fanned-deck/modal layout.
8. **Processo** — four-step list (Imersão → Direção → Produção → Pós-produção).
9. **Manifesto** — centered statement + signature block.
10. **Pacotes** — three pricing tiers (Mobile / Produção / Cinema) as `SpotlightCard`s, priced "sob consulta" with no reference range.
11. **Como trabalhamos** (`StudioStandard`) — a dimmed real case video (Paola Passos/Uniher) as backdrop, with copy positioning the studio's care/standard ahead of the final CTA. Went through several copy rewrites this project — see git history on `StudioStandard.tsx` before changing the tone again; the short version: no capacity/busyness language, no language that evaluates the client, first-person ("nós"), calm rather than assertive.
12. **FinalCTA** — contact form (`ContactForm.tsx`); submits via Resend when configured, see `CLAUDE.md`.
13. **Footer**.

**Not currently mounted**: **Criadores UGC** (`Portfolio.tsx`) — built, working, just commented out in `page.tsx` until there are real partner creators to show. **Depoimentos** — not built at all, no real quotes exist yet.
