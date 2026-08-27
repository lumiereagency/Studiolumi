@AGENTS.md

# StudioLumi — Engineering Guide

## Stack

- Next.js 16.3.1 (App Router, Turbopack), React 19.2.8, TypeScript (strict).
- Tailwind CSS v4, **CSS-first config** — the theme lives in `src/app/globals.css` under `@theme inline`. There is no `tailwind.config.ts`. Don't create one; add new tokens to `@theme inline` instead.
- Framer Motion `^13.1.0`, imported as `"framer-motion"` (not the newer `"motion/react"` path).
- No component library is installed: no shadcn/ui, Radix, `class-variance-authority`, `lucide-react`, or `tailwind-merge`. `cn()` in `src/lib/utils.ts` is plain `clsx`, not `twMerge(clsx(...))`.
- Icons are hand-drawn inline SVG throughout — there is no icon package. Keep it that way unless asked to add one; mixing in a second icon system reads as inconsistent.

## Bringing in shadcn/ui, 21st.dev, Magic UI, or React Bits

None of these drop in as-is today. shadcn/ui, 21st.dev, and Magic UI share the same foundation (Radix primitives, `cva`, a `cn()` that merges Tailwind classes, and CSS variables named `--background`/`--foreground`/`--primary`/etc.). This project's tokens are named differently (`--ink`, `--paper`, `--orange`...), so copied components need their color classes remapped to the existing tokens rather than introducing a second, parallel color system. React Bits is the lowest-friction option since it's plain Framer Motion, but still needs a per-component compatibility check. Before adding any of these, install `tailwind-merge` + `class-variance-authority`, upgrade `cn()`, and decide the token-mapping strategy first — don't wire up `components.json` and start copying without that groundwork.

## High-risk areas — don't touch casually

- **`CardCylinder.tsx` / `InfluencerCarousel.tsx`** — hand-tuned rAF-driven 3D coverflow engines (magnetic-snap easing, three-tier perspective math). Tuned over many iterations against real drag/wheel/keyboard testing. Don't replace with a library carousel; don't adjust the easing constants without re-testing on both breakpoints.
- **`LumiTeam.tsx`** — fanned-deck layout plus a Framer Motion shared `layoutId` modal. Fragile to DOM restructuring since the FLIP animation depends on the small in-grid button and the large modal both existing with matching `layoutId`s.
- **Reduced motion is handled in two layers**: per-component `useReducedMotion()` checks, *and* a global CSS kill-switch in `globals.css` (`@media (prefers-reduced-motion: reduce)` zeroes every animation/transition duration site-wide). Any new looping or ambient animation must be tested with reduced-motion on — this exact gap already caused a real bug once (the cases carousel snapped instantly and the team deck froze) before it was fixed.
- **Global `overflow-x` guards** on `html`/`body` in `globals.css` exist because of a real, previously-shipped horizontal-scroll bug. Any new absolutely-positioned decorative element (glows, background shapes) must be checked for horizontal overflow at 360px, 390px, and 1440px before it's considered done.

## Copy voice

Portuguese (pt-BR). Premium, direct, editorial. **No em-dashes** in any user-visible copy — they read as AI-written. Avoid generic agency clichés ("contamos histórias", "sua marca merece", "cada detalhe importa"). Position StudioLumi around direção/estrutura/padrão/posicionamento, not just "vídeo". Never fabricate client names, numbers, results, or testimonials — placeholder content stays explicitly marked ("Em breve") until real content is supplied.

## Known incomplete pieces

- `src/app/api/contact/route.ts` validates the contact form and only `console.log`s the payload — it does not send anywhere yet. Needs a real provider (e.g. Resend) wired in before launch.
- Lumi Team and Criadores UGC sections are intentional placeholders, waiting on real photos/names.
