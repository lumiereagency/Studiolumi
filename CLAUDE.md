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
- **Static export** (`output: "export"` in `next.config.ts`). There is no server at runtime — no API routes, no middleware, no `next/image` optimization. `npm run build` writes plain HTML/CSS/JS to `out/`, deployable to any static host (GitHub Pages, Hostinger, Netlify, S3, etc.) without Vercel or a Node process. Any new feature that needs a server (a real backend API, auth, server-only secrets) breaks this — check before adding one.
- Tailwind CSS v4, **CSS-first config** — the theme lives in `src/app/globals.css` under `@theme inline`. There is no `tailwind.config.ts`. Don't create one; add new tokens to `@theme inline` instead.
- Framer Motion `^13.1.0`, imported as `"framer-motion"` (not the newer `"motion/react"` path).
- `@radix-ui/react-dialog`, `class-variance-authority`, and `tailwind-merge` are installed; `cn()` in `src/lib/utils.ts` is `twMerge(clsx(inputs))`. `components.json` exists (shadcn/ui config, `new-york` style, no icon library).
- Icons are hand-drawn inline SVG throughout — there is no icon package. Keep it that way unless asked to add one; mixing in a second icon system reads as inconsistent.

## shadcn/ui, 21st.dev, Magic UI, and React Bits — current state

`src/components/ui/` holds what's actually been built, all hand-adapted to this project's tokens (`--ink`/`--paper`/`--orange-bright`/`--cream`):

- **`sheet.tsx`**: shadcn/ui Sheet on `@radix-ui/react-dialog`, animated with Framer Motion (`AnimatePresence` + `forceMount`). Used by `Nav.tsx` for the mobile menu.
- **`arrow-link.tsx`**: `ArrowLink` (pill CTA with an orange circular arrow, variants `light`/`dark`/`orange`), `ArrowCircle` and `ArrowIcon`. This is the site's only button style now; reach for it instead of one-off classNames.
- **`marquee.tsx`**: Magic UI's Marquee pattern, used by `ClientRoster.tsx`. Pure CSS, frozen by the global reduced-motion kill-switch.

**Important constraint discovered while building these**: `magicui.design`, `reactbits.dev`, and `21st.dev` are all blocked by this environment's network egress policy (`WebFetch` fails with `EGRESS_BLOCKED`, and none of them publish real npm packages under their component names — `react-bits` on npm is an unrelated old library). Their literal source can't be fetched here. What's in `src/components/ui/` are hand-built implementations of each library's well-documented public pattern, not copy-pasted originals — good enough to satisfy "use X," but say so rather than implying a real fetch happened if this comes up again. If a future task wants something else from these libraries, expect the same block and plan to hand-implement the pattern again.

## High-risk areas — don't touch casually

- **Page structure (Oct 2026 redesign)**: Apple-style motion + international production-company portfolio layout, based on a client-supplied reference (cream/orange bento cards, pill nav, tight neo-grotesk type). Order in `page.tsx`: Hero (headline + 4-clip vertical reel frame that scales up on scroll) → ClientRoster → Positioning (`ScrollWords`, scroll-linked word highlight) → Work (case grid) → About → Services (bento) → RealTimeReel (horizontal snap gallery) → Process (sticky title) → Partners (name roster) → Packages → Manifesto → FinalCTA → Footer. The team is deliberately not a standalone section (client: "não precisa ser foco"); it lives as a compact row at the bottom of About. `CardCylinder`, `InfluencerCarousel`, `MotionReel`, `HumanExperience`, `StudioStandard`, `LumiTeam` were removed in that redesign; they're in git history if ever needed.
- **Videos**: every clip goes through `InViewVideo` (`preload="none"`, plays only while on screen, never under reduced motion). Don't add raw autoplaying `<video>` tags; the page has 17 clips.
- **Typography**: display font is **Inter Tight** (`--font-inter-tight`), body is Inter. Headings use the `.heading-xl` / `.heading-lg` classes in `globals.css` (tight negative tracking). No uppercase headings; the client explicitly dislikes them.
- **Reduced motion is handled in two layers**: per-component `useReducedMotion()` checks, *and* a global CSS kill-switch in `globals.css` (`@media (prefers-reduced-motion: reduce)` zeroes every animation/transition duration site-wide). Any new looping or ambient animation must be tested with reduced-motion on — this exact gap already caused a real bug once (the cases carousel snapped instantly and the team deck froze) before it was fixed.
- **Global `overflow-x` guards** on `html`/`body` in `globals.css` exist because of a real, previously-shipped horizontal-scroll bug. Any new absolutely-positioned decorative element (glows, background shapes) must be checked for horizontal overflow at 360px, 390px, and 1440px before it's considered done.

## Copy voice

Portuguese (pt-BR). Premium, direct, editorial. **No em-dashes** in any user-visible copy — they read as AI-written. Avoid generic agency clichés ("contamos histórias", "sua marca merece", "cada detalhe importa"). Position StudioLumi around direção/estrutura/padrão/posicionamento, not just "vídeo". Never fabricate client names, numbers, results, or testimonials — placeholder content stays explicitly marked ("Em breve") until real content is supplied.

## Known incomplete pieces

- **Contact form goes to WhatsApp, not email.** `ContactForm.tsx` builds a prefilled `wa.me` link (`src/lib/contact.ts`, `WHATSAPP_NUMBER = "5521966454367"`, StudioLumi's real number) from the form fields and opens it in a new tab; there's no server round-trip. This replaced an earlier Resend-based `/api/contact` route (deleted, along with the `resend` npm dependency) specifically so the site could run as a static export with no backend at all — see the Stack note above. If the WhatsApp number ever changes, update it only in `src/lib/contact.ts`.
- **Team** (bottom of `About.tsx`): Gustavo Turques/Fundador, Ingrid Cardoso/Cofundadora, Mariene Beatriz/Social Media, plus an "Entre outros colaboradores" card. Attaner and Jonny were removed at the client request.
- **Prices**: `Packages.tsx` shows "A partir de" R$ 1.500 / 4.500 / 12.000 for Mobile/Produção/Cinema (provisional market estimates the client asked for; they said they will edit them). "Planos especiais" are client-set: Gestão + Edição (figuras públicas) R$ 2.800, Casamento R$ 1.800, combo pré-wedding + casamento R$ 2.990.
- **Orange is always a gradient**, except the scroll-highlight text in `ScrollWords` (per-word gradient restarts on every word and looks broken; client asked for solid orange there). Use `.text-orange-gradient` for heading accent words, `.bg-orange-card` for orange panels and `.bg-orange-grad` for small orange fills. The client found flat orange not premium enough.
- **Partners** (`Partners.tsx`): public figures StudioLumi runs profile management and video editing for (Sergio Mallandro, Sr. Bemvindo Sequeira, Gustavo Mendes). Shown as a text roster; no photos yet. Photos must come from the client as files, not scraped from social media.
- **Depoimentos**: deliberately not built. No real client testimonials exist yet, and CLAUDE.md's own copy-voice rule forbids fabricating them; a placeholder "Em breve" testimonials section would also undercut the exclusivity positioning built into `StudioStandard.tsx`. Build it only once real quotes are supplied.
- Footer's Instagram link (`Footer.tsx`) is real (`instagram.com/studiolumi_co`). YouTube and LinkedIn entries were removed entirely rather than left as placeholders — add them back once those profiles exist.
- **Depoimentos, take two**: the client asked for 3-4 testimonials styled as anonymized WhatsApp screenshots, with invented quotes. Declined — fabricated quotes designed to look like real customer messages is deceptive advertising even without a name attached, and it's a bad trade against the exclusivity/trust positioning this whole project is built around. Only build this with real client quotes (WhatsApp messages actually sent by real past clients, anonymized for privacy is fine) or skip it.
