# DAB Hands Website — Handover

Pick this up cold. Captures the project after the **Style Guide v2.0 refresh** (June 2026).

---

## Status (read first)

- **Branch:** `refresh/style-guide-v2` (cut from `main` @ `efaa863`). The whole v2.0 refresh lives here. **Not yet pushed, not deployed.** Production (`https://dabhands.delivery`, Vercel auto-deploys on push to `main`) is still v1 until the owner reviews on localhost and says **"push"**.
- **Build:** `npm run build` is clean (TypeScript passes). Routes: `/`, `/business-and-agency-leaders`, `/marketing-leaders`, `/creators-and-founders`, `/contact`, `/for/manifesto-digital`, plus `/404` and `/api/hello`.
- **Deploy flow:** owner reviews localhost (`npm run dev`, port 3000) → says "push" → `git checkout main && git merge refresh/style-guide-v2 && git push origin main`. After any OG-image change, refresh social caches (LinkedIn Post Inspector + FB Sharing Debugger).

## What v2.0 is

The refresh brief from the owner (plus a GPT style guide and a visual mockup) is the **source of truth**. The site is the digital home of **Darren** (first person, "I"), a senior digital operator with the heart of a creative. Not a consultancy, agency, or transformation practice. Editorial, not corporate (Apple / Monocle / A24 / Kinfolk). Target feel: **60% trusted operator / 40% creative perspective**. Core thread through all copy: the work isn't the problem, the journey is, and Darren protects it. Preserve the link words **intact** (hero), **as intended** (point of view), **integrity / protects** (testimonial).

## Stack

- **Next.js 16.2.6** (Pages Router, Turbopack). `AGENTS.md` warns it differs from training data, read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme` in `styles/globals.css`).
- **Framer Motion 12** (subtle reveals, momentum, halo breathe). `FadeUp` is the shared scroll-reveal.
- **TypeScript.** `npm run build` is the gate.
- **Fonts:** Instrument Serif (display) + Manrope (UI) via `next/font/google` in `pages/_app.tsx`.

### Two gotchas worth knowing
1. **Font vars must live at `:root`.** `@theme` sets `--font-serif: var(--font-instrument-serif), ...`. Custom properties resolve where they're declared (`:root`), so the next/font variables have to be visible at `:root`, not just on a wrapper div, or `--font-serif` collapses to empty and headings silently fall back to sans. `_app.tsx` injects `<style>:root{--font-instrument-serif:…;--font-manrope:…}</style>` from `font.style.fontFamily` to guarantee this. Do not remove it.
2. **Turbopack stale `@theme` CSS.** Editing colour/font tokens in `globals.css` sometimes does not hot-reload (the old CSS keeps being served). Fix: stop dev, `rm -rf .next`, restart.

## Information architecture

Nav is **DAB Hands (home) · Who I help (dropdown) · Contact** — nothing else. No persistent "Start a conversation" button; CTAs live inside page content.

- "Who I help" dropdown → three flat destination routes: `/business-and-agency-leaders`, `/marketing-leaders`, `/creators-and-founders`.
- **Deleted:** `pages/experience.tsx` and `pages/where-we-step-in.tsx` (scrubbed from `sitemap.xml` and `llms.txt`). The three destination pages replace About / Services / Experience.

## Pages

### `/` — `pages/index.tsx`
Rhythm: bone → paper → bone → paper → bone → plum. Six sections, all copy locked by the brief:
1. **Hero** (bone, centred) — halo brand mark (lavender ring + glow, gentle breathe) + Instrument Serif "Keeping important work moving." (per-word stagger on mount) + Manrope subline "I help digital-forward businesses get their best work into the world, intact."
2. **Darren** (paper) — halo portrait (`/images/darren-portrait.jpeg`, circular, soft lavender glow) + eyebrow "Darren" + "Hi, I'm Darren." + serif statement "I'm the person who walks toward the part everyone else is avoiding…" + support line. Two columns desktop, stacks on mobile.
3. **Point of view** (bone) — eyebrow + "The tools are changing. The problems aren't." + "Most organisations already have what they need." + five soft pills (Strategy / Creative ambition / Investment / Capability / Good people) + the drumbeat lines + serif close "It deserves to arrive **as intended**." (`HandUnderline` in lavender). Soft lavender/peach atmosphere on the right (lg+).
4. **Proof** (paper) — eyebrow "Trusted with important work" + a static centred row of 7 logos (Nike, Volkswagen, Audi, Unilever, Hugo Boss, Royal Mail, Johnson & Johnson, via `TickerLogo` charcoal silhouettes) + Hugo Boss testimonial in Instrument Serif italic.
5. **Turnstile** (bone) — "What's getting in the way?" + three cards (tinted circle glyph in lavender / peach / sky, title, diagnosis, support) each linking to its destination page.
6. **Final CTA** (Midnight Plum, the one deep moment) — "If something important needs to move properly, let's talk." + understated bone-outline "Start a conversation" (mailto). `footerVariant="none"`.

### `/business-and-agency-leaders`, `/marketing-leaders`, `/creators-and-founders` — shared `components/AudienceTemplate.tsx`
Three thin flat route files feed a slug into the template. **Fixed 8-section spine for all three** (from the owner's wireframe): hero (eyebrow "For <audience>" + serif headline + subline), The situation (drumbeat + "Explore the challenge" disclosure), What needs to change (the two operating systems, visible/invisible, + "How change happens" disclosure), What good looks like (outcomes + "See what changes" disclosure), Relevant experience (line + logos), Trusted to lead important work (the single plum testimonial), How we might work together (three engagement models + "The shape depends on the challenge"), Close (serif statement + subline + CTA). Sections 2 to 4 use a collapsed-by-default progressive `Disclosure`. Content is data-driven via the `CONTENT` map. **Business & agency leaders is filled verbatim from the wireframe. Marketing leaders and Creators & founders share the structure and render hero + a holding note until their copy lands.** `footerVariant="none"`.

### `/contact` — `pages/contact.tsx`
Bone hero "What needs moving?" (serif) + intro + Email / Phone / LinkedIn channels (Manrope, `hover:opacity-60`) + soft lavender/peach atmosphere. `footerVariant="none"`.

### `/for/manifesto-digital` — `pages/for/manifesto-digital.tsx` (UNLISTED)
Private pitch page for Rebecca Hull. Now on v2.0 (plum/aubergine dark sections, lavender accents, no green). Uses `PrivateLayout` (plum chrome, serif wordmark) + `<SeoMeta noindex>`. Keep out of nav and sitemap. Local components: `ChipExplorer`, `PhaseHeading`, `ActivityList`. Topic icons (`/images/icon-*.svg`) were recoloured to lavender and are referenced with `?v=2` (the `/images/*` immutable cache means any future icon edit needs a fresh `?v=N`).

## Visual system (v2.0)

| Role | Token | Hex |
|---|---|---|
| Primary background (bone) | `bone` | `#F5F1EA` |
| Secondary background (paper) | `paper` | `#FBF8F3` |
| Primary text / headlines (ink) | `ink` | `#1F1F1D` |
| Secondary / body text | `graphite` | `#5C5C58` |
| Borders / dividers | `stone` | `#D8D2C8` |
| Primary accent | `lavender` | `#B8A2D8` |
| Gradient mid / halo glow | `lavender-soft` | `#E6D6EE` |
| Secondary accent | `peach` | `#E6B39A` |
| Supporting accent | `sky` | `#AFCFE0` |
| Highlight / hover / focus | `coral` | `#D98773` |
| Deep sections / footer / CTA | `plum` | `#352E44` |
| Supporting dark | `aubergine` | `#4A3D59` |

Ratio target ~70% bone/paper, ~20% ink/graphite, ~8% lavender/peach, ~2% coral/sky. Tokens are in `styles/globals.css @theme`. Useful utilities there: `.eyebrow` (Manrope uppercase label), `.halo-glow` (radial lavender), `.signature-gradient`, `.font-serif`. Focus ring is coral. **Legacy `dab-*` tokens are still defined in `@theme` but nothing live uses them, see TODO.**

## Components (`/components`)

- **`Header.tsx`** — transparent over bone, gains `bg-bone/85 backdrop-blur + border-stone` on scroll. Serif "DAB Hands" wordmark (no green dot) + "Who I help" dropdown (opens on hover, also click/keyboard; Escape + route-change close) + "Contact". Mobile hamburger → bone sheet.
- **`Footer.tsx`** — plum. `variant` `'default' | 'minimal' | 'none'`; every page currently uses `none` (just the slim plum bar: serif wordmark + LinkedIn + "© 2026 DAB Hands"). The contact module (default/minimal) is recoloured to v2.0 but unused.
- **`BoxCTA.tsx`** — understated pill. `tone='light'` (ink outline → fills ink) / `'dark'` (bone outline → fills bone). Arrow inherits colour, no green.
- **`AudienceTemplate.tsx`** — the shared destination-page engine: the fixed 8-section spine + a `CONTENT` map keyed by slug + a collapsed-by-default `Disclosure`. Business filled from the wireframe; the other two render hero + holding note.
- **`HandUnderline.tsx`** — restrained hand mark. `tone='dark'` → lavender, `'light'` → coral; `stroke` overrides.
- **`SeoMeta.tsx`** — per-page Head (title, desc, canonical, OG, Twitter, `noindex`). OG image defaults to `/og-image.png`.
- **`PrivateLayout.tsx`** — plum chrome for `/for/<company>` pages.
- **`LogoTicker.tsx` / `TickerLogo.tsx`** — the marquee + the canonical 13-client `clients` array (single source of truth, exported). `TickerLogo` forces `brightness(0)` charcoal silhouettes. The homepage Proof row reuses `TickerLogo` statically with 7 of the clients.
- **`FadeUp.tsx`**, **`Layout.tsx`** (skip-link + Header + `<main id="top">` + Footer).
- **Unused / prunable v1 artifacts** (nothing imports them): `Ribbon.tsx`, `RibbonAccent.tsx`, `RibbonMotif.tsx`, `StatPopover.tsx`, `GridToggle.tsx`. Crown/calibration/compass marks in `/public/images` are no longer used either.

## Hard rules

1. **No em dashes** in user-facing copy (code comments fine). Use full stops, commas, colons.
2. **Brand wordmark is "DAB Hands"** (uppercase DAB, capital-H Hands). File paths / tokens exempt.
3. **v2.0 palette only** (table above). **Neon green is fully retired.** Accents are low-contrast on bone, so never use them as text on light, keep coloured text to dark backgrounds or use accents as decorative marks; on light, link hovers use `hover:opacity-60`.
4. **Type:** Instrument Serif for display/statements/quotes, Manrope for everything else. Don't force weight on the serif (single 400 weight). Label headings no full stops; truth-statements keep periods.
5. **Motion = momentum, not novelty.** Subtle reveals, gentle transitions, `useReducedMotion` guards.

## Open items / TODO

- **Destination-page copy** is placeholder only. Write it (Business & agency leaders first). Each page is "what am I buying" in one sentence (the spine line already in the template).
- **`/public/og-image.png`** is still the v1 green social card. It is the SeoMeta default OG image AND the `_document.tsx` JSON-LD `logo`. Regenerate for v2.0.
- **`/public/favicon.svg`** is still the v1 charcoal + green dot. Update to v2.0 (e.g. plum + lavender). `theme-color` is already bone.
- **Darren portrait** on the homepage uses the B&W `darren-portrait.jpeg`. The mockup showed a colour halo portrait (`darren-brett_colour_headshot.jpeg` exists). Owner's call which to use.
- **Prune** legacy `dab-*` tokens from `globals.css` and delete the unused v1 components once confirmed.

## Working style

- Owner iterates fast in small, specific edits. For exploratory questions, answer in 2-3 sentences with a recommendation + main tradeoff before implementing.
- Each page signs off into the next step (home → destinations → contact). Contact is terminal.
- Preview-tool **screenshots are unreliable for deep-scrolled sections** (they capture from the top); use DOM measurements via `preview_eval` to verify below the fold. A very tall viewport (`preview_resize` height ~3000-4900) captures more in one shot.
- React Strict Mode is on (double-renders in dev). Saved memory rules at `~/.claude/projects/.../memory/` apply every session, read `MEMORY.md` first.
