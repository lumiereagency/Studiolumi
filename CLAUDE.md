@AGENTS.md

# Studio Lumi — Instruções do Projeto

## Objetivo

Transformar o site do Studio Lumi em um portfólio audiovisual premium, cinematográfico, moderno e altamente responsivo.

## Regras

- Preservar rotas, conteúdos e funcionalidades existentes.
- Não substituir componentes funcionais sem justificativa.
- Não utilizar componentes aleatórios apenas por serem visualmente chamativos.
- Priorizar performance, acessibilidade e responsividade.
- Usar shadcn/ui como base estrutural.
- Usar 21st.dev para blocos e composições.
- Usar React Bits e Magic UI somente em animações estratégicas.
- Respeitar `prefers-reduced-motion`.
- Evitar excesso de blur, glow, gradientes e partículas.
- Não criar aparência genérica de site produzido por IA.
- Testar desktop, tablet e mobile.
- Executar lint, typecheck e build após cada etapa.
- Trabalhar uma seção por vez.
- Apresentar o plano antes de mudanças estruturais.

## Direção

O site deve transmitir:

- Direção criativa
- Produção audiovisual
- Cinema
- Tecnologia
- Sofisticação
- Movimento
- Credibilidade
- Identidade autoral

# StudioLumi — Engineering Guide

## Stack

- Next.js 16.3.1 (App Router, Turbopack), React 19.2.8, TypeScript (strict).
- Tailwind CSS v4, **CSS-first config** — the theme lives in `src/app/globals.css` under `@theme inline`. There is no `tailwind.config.ts`. Don't create one; add new tokens to `@theme inline` instead.
- Framer Motion `^13.1.0`, imported as `"framer-motion"` (not the newer `"motion/react"` path).
- `@radix-ui/react-dialog`, `class-variance-authority`, and `tailwind-merge` are installed; `cn()` in `src/lib/utils.ts` is `twMerge(clsx(inputs))`. `components.json` exists (shadcn/ui config, `new-york` style, no icon library).
- Icons are hand-drawn inline SVG throughout — there is no icon package. Keep it that way unless asked to add one; mixing in a second icon system reads as inconsistent.

## shadcn/ui, 21st.dev, Magic UI, and React Bits — current state

`src/components/ui/` holds what's actually been built, all hand-adapted to this project's tokens (`--ink`/`--paper`/`--orange-bright`, not `--background`/`--foreground`/`--primary`):

- **`sheet.tsx`** — shadcn/ui Sheet pattern on top of `@radix-ui/react-dialog`, but the enter/exit animation is Framer Motion (`AnimatePresence` + `forceMount`) instead of the `tailwindcss-animate` classes shadcn normally generates, since that plugin isn't installed. Used by `Nav.tsx` for the mobile menu.
- **`button.tsx`** / **`badge.tsx`** — shadcn/ui-style primitives built with `cva`. `buttonVariants` (variants: `primary`/`secondary`/`icon`, sizes: `default`/`sm`/`nav`/`icon`) replaced five copies of hand-rolled pill-button classNames across `Hero.tsx`, `Nav.tsx`, `ContactForm.tsx`, `Packages.tsx`, and the carousel prev/next controls. Reach for these instead of writing another one-off button className.
- **`marquee.tsx`** — Magic UI's Marquee pattern (two duplicated tracks, `translateX(-50%)`, pause on hover), using the `--animate-marquee` keyframe already defined in `globals.css`. Used by `ClientRoster.tsx`. No JS reduced-motion branch needed — it's a pure CSS animation, so the global kill-switch (see below) freezes it correctly on its own.
- **`spotlight-card.tsx`** — React Bits' Spotlight Card pattern (cursor-tracked radial glow revealed on hover, written straight to CSS custom properties on mousemove). Used by `Packages.tsx`'s tier cards. Explicitly disabled under `useReducedMotion()` since it's a continuous pointer-driven effect, not a one-shot transition.

**Important constraint discovered while building these**: `magicui.design`, `reactbits.dev`, and `21st.dev` are all blocked by this environment's network egress policy (`WebFetch` fails with `EGRESS_BLOCKED`, and none of them publish real npm packages under their component names — `react-bits` on npm is an unrelated old library). Their literal source can't be fetched here. What's in `src/components/ui/` are hand-built implementations of each library's well-documented public pattern, not copy-pasted originals — good enough to satisfy "use X," but say so rather than implying a real fetch happened if this comes up again. If a future task wants something else from these libraries, expect the same block and plan to hand-implement the pattern again.

## High-risk areas — don't touch casually

- **`CardCylinder.tsx` / `InfluencerCarousel.tsx`** — hand-tuned rAF-driven 3D coverflow engines (magnetic-snap easing, three-tier perspective math). Tuned over many iterations against real drag/wheel/keyboard testing. Don't replace with a library carousel; don't adjust the easing constants without re-testing on both breakpoints. `InfluencerCarousel` is generic (`Creator[]` in, `regionLabel`/`itemLabel` props for accessible copy) — both `LumiTeam.tsx` (team roles, real `image` added per-member as photos arrive) and the currently-unmounted `Portfolio.tsx` (Criadores UGC) render their own instance of it; it's not exclusive to either.
- **Reduced motion is handled in two layers**: per-component `useReducedMotion()` checks, *and* a global CSS kill-switch in `globals.css` (`@media (prefers-reduced-motion: reduce)` zeroes every animation/transition duration site-wide). Any new looping or ambient animation must be tested with reduced-motion on — this exact gap already caused a real bug once (the cases carousel snapped instantly and the team deck froze) before it was fixed.
- **Global `overflow-x` guards** on `html`/`body` in `globals.css` exist because of a real, previously-shipped horizontal-scroll bug. Any new absolutely-positioned decorative element (glows, background shapes) must be checked for horizontal overflow at 360px, 390px, and 1440px before it's considered done.

## Copy voice

Portuguese (pt-BR). Premium, direct, editorial. **No em-dashes** in any user-visible copy — they read as AI-written. Avoid generic agency clichés ("contamos histórias", "sua marca merece", "cada detalhe importa"). Position StudioLumi around direção/estrutura/padrão/posicionamento, not just "vídeo". Never fabricate client names, numbers, results, or testimonials — placeholder content stays explicitly marked ("Em breve") until real content is supplied.

## Known incomplete pieces

- `src/app/api/contact/route.ts` sends via Resend when `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are set (see `.env.example`); without them it falls back to `console.log`/`console.warn` so the form still works in local dev. Needs those three env vars set in production before launch.
- **Lumi Team** (`LumiTeam.tsx`): roles are real, photos are not yet — add `image: "/team/nome.jpg"` to each `TEAM` entry as photos come in.
- **Criadores UGC** (`Portfolio.tsx`): unmounted from `page.tsx` (commented out) until there are real partner creators to show. The component and its `InfluencerCarousel` usage are untouched, so bringing it back is a one-line change in `page.tsx`.
- **Depoimentos**: deliberately not built. No real client testimonials exist yet, and CLAUDE.md's own copy-voice rule forbids fabricating them; a placeholder "Em breve" testimonials section would also undercut the exclusivity positioning built into `StudioStandard.tsx`. Build it only once real quotes are supplied.
- Footer's Instagram/YouTube/LinkedIn links (`Footer.tsx`) are generic homepage placeholders, not real profile URLs — don't invent handles, wait for the real links.
