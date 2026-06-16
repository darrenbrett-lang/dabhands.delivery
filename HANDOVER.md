# DAB Hands Website — Handover

Pick this up cold. Captures the project after the **doorway colour-rhythm pass** (June 2026): soft cloud-sampled audience colours, a per-room solid colour rhythm, a hide-on-scroll masthead with a room locator, the doorway pages moved onto the real grid, and Deep Teal retired.

---

## Status (read first)

- **Working branch: `staging`.** The current build: **bone `#F5F1EB` + dark type carry the site; Deep Teal is retired.** Each audience room owns one **soft, cloud-sampled colour** — Business **Sage Mist `#BCC5B8`**, Marketing **Dusty Apricot `#E5C8BA`**, Creators **Cloud Lavender `#CDC3DA`** — applied as a deliberate **colour rhythm** down the page (see "The three rooms"). The doorway pages now sit on the shared 12-column grid; the masthead **hides on scroll and returns when you stop**, with a persistent **room locator** under the wordmark; the `SpineLabel` is gone.
- **Production is untouched.** `main` is still the old v1 site serving `https://dabhands.delivery`. Nothing of the new build is on `main`.
- **Staging preview:** `https://dabhands-delivery-git-staging-darren-brett-s-projects.vercel.app` (Vercel preview of `staging`, rebuilds on every push). It may return **401** if Vercel Deployment Protection is on (Vercel → project → Settings → Deployment Protection).
- **localhost:3000** is the local `npm run dev` server (hot-reloads the checked-out branch). NB **`@theme` colour/token edits in `globals.css` often do NOT hot-reload under Turbopack** — stop dev, `rm -rf .next`, restart to see token changes. (Runtime CSS like inline `color-mix`/styles hot-reloads fine.)
- **Build:** `npm run build` / `npx tsc --noEmit` is the gate (TypeScript passes). Routes: `/`, `/business-and-agency-leaders`, `/marketing-leaders`, `/creators-and-founders`, `/contact`, `/for/manifesto-digital`, plus `/404`, `/api/hello`.

### Deploy flow (staging + production)
- **Work on `staging`.** Edit → localhost hot-reloads → commit + push `staging` → Vercel rebuilds the staging preview.
- **Do NOT promote to production until the owner explicitly says so.** `main` stays frozen on v1; **do not push/merge to `main`, and do not open a `staging → main` PR**, without an explicit go-ahead (standing owner directive). When that day comes: `git checkout main && git merge staging && git push origin main` → Vercel deploys `dabhands.delivery`; then refresh social caches (LinkedIn Post Inspector + FB Sharing Debugger).
- Repo: `git@github.com:darrenbrett-lang/dabhands.delivery.git`. Vercel project `dabhands-delivery` under team `darren-brett-s-projects`, GitHub-integration auto-deploys.

## The brand direction (source of truth)

A **mastery brand** — "the marks left behind by skilled hands." The digital home of **Darren** (first person, "I"), a senior digital operator with the heart of a creative. Not a consultancy, agency, or technology brand. The current visual direction is **calm, premium, editorial** (Aesop / Monocle / Kinfolk), atmosphere + restraint over decoration.

- **Central tension: Darren is still, the work moves.** Calm, judgement, experience.
- **The `Trajectory` line has been removed everywhere** (homepage and room heroes). Typography + the colour rhythm + the cloud imagery do the work now. (`Trajectory.tsx` still exists but is unused.)
- **Copy thread:** the work isn't the problem, the journey is, and Darren protects it. First person, warm, senior, no buzzwords.
- **No em dashes in user-facing copy.** Wordmark is **"DAB Hands"** (uppercase DAB, capital-H Hands). White text is always **bone**, never `text-white`.

## Stack

- **Next.js 16.2.6** (Pages Router, Turbopack). `AGENTS.md`: read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind v4** (`@import "tailwindcss"` + `@theme` in `styles/globals.css`).
- **Framer Motion 12** (subtle reveals via `FadeUp`, gentle transitions).
- **TypeScript.** `npx tsc --noEmit` is a clean, fast gate that doesn't fight a running `next dev` over `.next`.
- **Fonts:** Instrument Serif (display) + Manrope (UI) via `next/font/google` in `pages/_app.tsx`.

### Gotchas
1. **Font vars must live at `:root`.** `_app.tsx` injects `<style>:root{--font-instrument-serif:…;--font-manrope:…}</style>`. Without it, `--font-serif` collapses and headings fall back to sans. Do not remove.
2. **Turbopack stale `@theme`.** Editing colour/font tokens often doesn't hot-reload. Fix: stop dev, `rm -rf .next`, restart. (The preview tooling also caches JS chunks — a hard reload / cache-bust may be needed after edits.)
3. **Heading colour is inherited, not forced.** The `h1`-`h6` rule sets no `color`; set the colour on the **section** (`text-ink`/`text-bone`) and headings inherit it.

## Information architecture

Nav: **DAB Hands (home) · Who I help (dropdown) · Contact.** "Who I help" → three flat routes: `/business-and-agency-leaders`, `/marketing-leaders`, `/creators-and-founders`. (`pages/experience.tsx`, `pages/where-we-step-in.tsx` deleted long ago.)

## Pages

### `/` — `pages/index.tsx`
Predominantly **bone + graphite**. Rhythm: bone hero → clouds banner (Darren) → charcoal (point of view) → bone (proof) → bone (turnstile) → bone (final CTA).
1. **Hero** (bone, centred, clean) — Instrument Serif "Keeping important work moving." + subline. CTA cue **"See where I can help +"** (`PathwayPicker`) — a small **plus** (rotating to × when open) that reveals the three pathways as a charcoal-on-bone panel on hover/focus. No cloud behind the hero copy.
2. **Darren** — full-bleed `clouds.png` banner, copy left, cut-out portrait bottom-right (`darren_new-image.png`).
3. **Point of view** (charcoal, bone copy) — two columns (thesis left, argument right). `HandUnderline` on "as intended" is now a soft **bone** stroke (teal retired).
4. **Proof** (bone) — `<LogoTicker>` (all 13 clients).
5. **Turnstile** (bone) — "Where do you need help…" + three **doorway cards, each in its room colour** (`color-mix(audience ~50%, bone)` at rest, deepening + accent border on hover), charcoal text. The homepage's one colour moment (deliberate wayfinding).
6. **Final CTA** (bone) — charcoal "Start a conversation" button (hover → neutral graphite).

### The three rooms (`components/OperatorTemplate.tsx`)

All three on one 8-section operator spine (operating **partner**, "I" voice, situations not services). **On the shared grid** (`.u-container` + `.u-grid`, col-span/col-start, like the homepage). Each room owns one colour and runs this **colour rhythm** top-to-bottom:

| Panel | Treatment |
|---|---|
| **P1 Hero** | bone + a soft **vignette** of the room colour (`ACCENT.wash`, top-down gradient); coloured eyebrow; charcoal CTA |
| **P2 The Situation** | **solid** panel of the room colour; big title left, two paragraphs right, serif **coda** across both; `data-p2` (drives the masthead locator) |
| **P3 The Challenge** | **charcoal/black** two-column (problem / context / payoff) |
| **P4 What Changes** | the **cloud image** (`clouds.png` + `bg-bone/35` scrim, neutral — no colour tint); the bold serif payoff |
| **(Transition)** | optional bone section — Creators only ("The challenge isn't ambition.") |
| **P5 Where I tend to help** | **bone**; three situation cards filled in the room colour (`color-mix(a.color 50%, bone)`) |
| **Trusted by…** | **solid** panel of the room colour, **dark** copy (testimonials flip to ink text + charcoal rule); auto-rotating `proof.testimonials` (Business 2 / Marketing 3; interval per page) or a single `proof.quote` (Creators — Gary Shannon) |
| **Close** | **bone**, centred, charcoal CTA |

Content lives in each page file. Per-room CTA hover fills the room colour (charcoal text). Mobile **sticky CTA**. **Failed experiment (don't repeat):** an "atmosphere-led" pass that tinted Situation/Outcomes with low-opacity colour over the cloud — `clouds.png` is a warm pink sky, so every room read pink and the rhythm was lost. Colour on the room pages = **solid panels + vignette + coloured cards**, not faint cloud tints.

Creators differs structurally: it adds the optional **Transition** section and uses a single `proof.quote` instead of the rotating testimonials. `components/AudienceTemplate.tsx` is the legacy engine — **unused, safe to delete.**

### `/contact`, `/for/manifesto-digital`
Contact: bone hero "What needs moving?" + channels. Manifesto-digital: unlisted private pitch on `PrivateLayout` (plum), `noindex` — keep out of nav/sitemap.

## Visual system

| Role | Token | Hex |
|---|---|---|
| Primary background (bone) | `bone` | `#F5F1EB` |
| Primary text / headlines (ink) | `ink` | `#1F1F1D` |
| Secondary / body text | `graphite` | `#5C5C58` |
| Borders / dividers | `stone` | `#D8D2C8` |
| Charcoal — dark sections, footer, "black" beats | `charcoal` | `#232323` |
| Audience — Business (Sage Mist) | `sage` | `#BCC5B8` |
| Audience — Marketing (Dusty Apricot) | `peach` | `#E5C8BA` |
| Audience — Creators (Cloud Lavender) | `lavender` | `#CDC3DA` |
| Audience deep shades (eyebrow text) — B / M / C | `sage-deep` / `peach-deep` / `lavender-deep` | `#6F7D69` / `#B97D62` / `#6E5A86` |
| Highlight / focus ring | `coral` | `#D98773` |
| **Retired — Deep Teal** (legacy token only, not on any live surface) | `teal` | `#48666A` |
| Legacy / unused | moss, plum, aubergine, sky, paper, `dab-*` | — |

Bone + dark type carry the site. **Each room = one soft colour**, applied as the rhythm above (solid panels carry it; the new colours are light enough for charcoal/ink text). **Audience colour is a navigational device** — solid Situation + Trusted-by panels, the room vignette, the room-coloured help cards + homepage doorway cards, nav hovers — never bright/digital. **Teal is retired.** Tokens in `globals.css @theme`. Utilities: `.eyebrow`, `.font-serif`. Focus ring coral.

## Grid system (deliberate + fixed)

One page width, one 12-column grid, named reading measures, one vertical rhythm. **Both the homepage and the doorway pages now use it.**
- **`.u-container`** — page shell: `max-w-page` (1280) + gutter **24 / 40 / 64** (`px-6 / md:px-10 / lg:px-16`).
- **`.u-grid`** — 12 columns (4 on mobile), gutter **24 / 32**. Place children with `col-span-*` / `col-start-*`. Common patterns: two-column = `col-span-5` + `col-span-6 col-start-7` (col 6 the spacer); three cards = `col-span-4` each.
- **Reading measures:** `max-w-statement` (960), `max-w-read` (800) — used as inner `ch` caps inside columns.
- **Vertical rhythm:** standard section `py-20 md:py-28 lg:py-32`.

## Components (`/components`)

- **`Header.tsx`** — transparent over bone, gains `bg-bone/85 backdrop-blur + border` on scroll. **Hides on scroll, returns on pause** (`-translate-y-full` while scrolling, idle-timer restores it; stays put at the very top; `motion-reduce` aware). Serif "DAB Hands" wordmark with a **persistent room locator** beneath it on the doorway pages (small uppercase graphite, left-aligned to the wordmark, no dash) that fades in once you've **scrolled to P2** (a scroll-through-hero check on `[data-p2]`) and stays for the rest of the page. "Who I help" dropdown: hover/active gets a soft block of the room colour, label stays ink. Mobile hamburger → bone sheet.
- **`OperatorTemplate.tsx`** — the 8-section room engine + the per-room colour rhythm (see above). `ACCENT` map: `color` (room colour — solid panels, card fills, CTA hover), `wash` (hero vignette gradient), `text` (deep eyebrow shade), `border`.
- **`PathwayPicker.tsx`** — homepage hero quick-nav; trigger "See where I can help" with a **plus** icon (→ × when open); portalled charcoal-on-bone panel; closes on Escape/outside-click/scroll.
- **`GridToggle.tsx`** — floating **design aid** bottom-right ("● GRID"); toggles a coral 12-column overlay mirroring `.u-container`/`.u-grid`. Rendered in `Layout` (all environments). **Hide/gate before promoting to production.**
- **`HandUnderline.tsx`** — restrained hand mark; default `dark` tone is now graphite (teal retired); `light` is coral.
- **`LogoTicker.tsx` / `TickerLogo.tsx`** — 13-client marquee (single source of truth).
- **`Figure.tsx`**, **`SeoMeta.tsx`**, **`FadeUp.tsx`** (forwards `className`), **`Footer.tsx`** (charcoal slim bar, bone text), **`Layout.tsx`** (skip-link + Header + `<main>` + Footer + GridToggle), **`PrivateLayout.tsx`**.
- **Removed/unused:** `SpineLabel.tsx` (the left-spine vertical labels — removed from `Layout`, file orphaned, safe to delete). `Trajectory.tsx` (no longer used). `AudienceTemplate.tsx`, `Ribbon*.tsx`, `StatPopover.tsx` (legacy, prunable).

## Hard rules
1. **No em dashes** in user-facing copy (code comments fine).
2. **Brand wordmark is "DAB Hands"** (uppercase DAB, capital-H Hands). Tokens/paths exempt.
3. **White text is always bone** (`text-bone`), never `text-white`.
4. **Type:** Instrument Serif for display/statements/quotes; Manrope for everything else. Never force weight on the serif. Label headings no full stops; truth-statements keep periods.
5. **Each doorway room is one colour, applied as the solid rhythm.** Don't flatten it into faint tints; don't reintroduce teal; keep the homepage predominantly bone/graphite.

## Open items / TODO
- **`GridToggle` ships in all environments** — hide or gate it (`process.env.NODE_ENV`) before any production promotion.
- **Imagery:** `clouds.png` is the brand's warm cloud asset (Darren banner + the What-Changes payoff). `Figure` is ready for art-directed imagery. The per-room `*_solution.png` sky images are **no longer used** (the What-Changes cloud is the shared `clouds.png` now) — prune when convenient.
- **`darren_new-image.png`** is a ~2.3 MB PNG — convert to WebP to cut homepage payload.
- **`og-image.png` / `favicon.svg`** are still v1 green — regenerate for the current look.
- **Prune** legacy `dab-*`, plum/aubergine/sky/moss/paper tokens + unused v1 components once confirmed.

## Working style
- Owner iterates fast in small, specific edits. For exploratory questions, answer in 2-3 sentences with a recommendation + the main tradeoff before implementing. Don't pre-emptively redesign neighbouring work.
- **Verification:** `FadeUp` content sits at opacity 0 until revealed; framer animations + screenshots can be unreliable in the headless preview (it throttles rendering) — prefer `preview_eval` DOM/CSS measurements, and a tall viewport (`preview_resize` height ~3000-4600) to capture more at once. After `@theme`/token edits, `rm -rf .next` + restart for accurate colour.
- React Strict Mode is on (double-renders in dev).
- **Saved memory rules** live at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` — read `MEMORY.md` first.
