# DAB Hands Website — Handover

Pick this up cold. Captures the project after the **v5 colour-system pass** (June 2026): the three-audience colour system (sage / peach / lavender) was **retired** and replaced with **one restrained five-colour palette** (Charcoal, Warm Stone, Cloud Pink, Deep Blue-Green, Soft Grey). Also live: a **Selected Work** phone-carousel on the Marketing page, a hide-on-scroll masthead (room locator + a "hide zone" over the carousel), and the doorway pages on the real grid.

---

## Status (read first)

- **Working branch: `staging`.** The current build runs **one restrained five-colour palette** (the three-audience sage/peach/lavender system is retired): **Charcoal `#1F1F1D`** (text + dark sections), **Warm Stone `#F5F1EA`** (background), **Cloud Pink `#E8A3B1`** (expressive accent), **Deep Blue-Green `#3F5A61`** (interactive + the solid Situation/Trust panels + turnstile cards), **Soft Grey `#D8D3CB`** (borders + the "Where I help" cards). Every room shares this one palette — no per-room colour. The doorway pages sit on the shared 12-column grid; the masthead **hides on scroll and returns when you stop**, with a persistent **room locator** under the wordmark; the `SpineLabel` is gone.
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
3. **Point of view** (charcoal, bone copy) — two columns (thesis left, argument right). (The `HandUnderline` mark was removed from the public site — see Components.)
4. **Proof** (bone) — `<LogoTicker>` (all 13 clients).
5. **Turnstile** (warm stone) — "Where do you need help…" + three **doorway cards in solid Deep Blue-Green** (bone copy, Cloud Pink "Explore" accent + hover border). The per-room colours are retired; the cards differ by label, not colour.
6. **Final CTA** (warm stone) — charcoal "Start a conversation" button (hover → neutral graphite).

### The three rooms (`components/OperatorTemplate.tsx`)

All three on one 8-section operator spine (operating **partner**, "I" voice, situations not services). **On the shared grid** (`.u-container` + `.u-grid`, col-span/col-start, like the homepage). Each room owns one colour and runs this **colour rhythm** top-to-bottom:

| Panel | Treatment |
|---|---|
| **P1 Hero** | warm stone + a soft **Cloud Pink wash** (`ACCENT.wash`, top-down gradient); blue-green eyebrow; charcoal CTA |
| **P2 The Situation** | **solid Deep Blue-Green** panel, **bone** copy; heading + lead on top, two-column body underneath (para 1 left, rest right), serif **coda**; `data-p2` (drives the masthead locator) |
| **P3 The Challenge** | **charcoal** — big serif thesis (left) + building argument → serif resolution (right) |
| **P4 What Changes** | the **cloud image** (`clouds.png` + `bg-bone/35` scrim); the bold serif payoff |
| **(Transition)** | optional warm-stone section (rarely used) |
| **P5 Where I tend to help** | **warm stone**; three situation cards in **Soft Grey** |
| **Selected Work** (Marketing only) | **charcoal** phone carousel — see its own section below |
| **Trusted by…** | **solid Deep Blue-Green** panel, **bone** copy (testimonials in bone); auto-rotating `proof.testimonials` (interval per page) or a single `proof.quote` |
| **Close** | **warm stone**, centred, charcoal CTA (hover fills blue-green) |

Content lives in each page file. The CTA is charcoal, hover fills Deep Blue-Green; each room's CTA opens a context-specific email via `content.email` (mailto subject + body). Mobile **sticky CTA**. All doorway module content is left-aligned on the grid. The per-page `accent` field is now **vestigial** — every value resolves to the one shared `ROOM` palette in `OperatorTemplate`.

Creators differs structurally: it adds the optional **Transition** section and uses a single `proof.quote` instead of the rotating testimonials. `components/AudienceTemplate.tsx` is the legacy engine — **unused, safe to delete.**

### Selected Work carousel (`components/SelectedWork.tsx`) — Marketing only
A show-don't-explain phone-mockup carousel on a **charcoal** stage (silent chrome, loud work — colour lives only inside the screens; the chrome accent is **Cloud Pink**). Data-driven from `work.cards` (`WorkCard[]`) in `marketing-leaders.tsx`: nine real case studies, each a 9:19 device-mockup PNG in `/public/images/work/` (`media:'image'`, `frame:'none'` since the PNGs already include the phone). Native scroll-snap, the next card always peeking; **swipe + arrows + dots + keyboard** all wired. **Desktop:** a synced narrative panel (grid cols 1–5) crossfades to the centred card; phones in cols 6–12. **Mobile:** the card shows brand · tag · headline + "Read case study", which opens a slide-up sheet. The masthead treats this section as a **hide zone** (`data-hide-masthead`): the nav stays hidden over it, returning on pointer-to-top or when you scroll away. Each card may carry an optional `story` (headline + body + optional `result` chip).

### `/contact`, `/for/manifesto-digital`
Contact: bone hero "What needs moving?" + channels. Manifesto-digital: unlisted private pitch on `PrivateLayout` (plum), `noindex` — keep out of nav/sitemap.

## Visual system

| Role | Token | Hex |
|---|---|---|
| Warm Stone — primary background | `bone` | `#F5F1EA` |
| Charcoal — primary text + ALL dark sections (ink/charcoal unified) | `ink` / `charcoal` | `#1F1F1D` |
| Secondary / body text | `graphite` | `#5C5C58` |
| Soft Grey — borders, dividers, "Where I help" cards | `stone` | `#D8D3CB` |
| Cloud Pink — expressive accent (hero wash, carousel, on-dark eyebrows) | `cloud-pink` | `#E8A3B1` |
| Deep Blue-Green — interactive/links/emphasis + solid Situation/Trust panels + turnstile | `blue-green` | `#3F5A61` |
| Legacy — dev tools / focus ring / `/for` only | `coral` / `teal` / `plum` / `aubergine` | `#D98773` / `#48666A` / `#352E44` / `#4A3D59` |
| Legacy / unused | sky, moss, paper, lavender-*, `dab-*` | — |

**One restrained palette, shared by every room** (the three-audience sage/peach/lavender system is retired). Principle: *restrained palette, emotion from imagery, clarity from contrast.* Cloud Pink is used on dark / as fills — never as text on warm stone (too low-contrast); Deep Blue-Green carries the solid panels + interactive bits (sparingly); eyebrows are blue-green on light, cloud pink on dark. Tokens in `globals.css @theme`. Utilities: `.eyebrow`, `.font-serif`. Focus ring coral (functional, not a brand colour).

## Grid system (deliberate + fixed)

One page width, one 12-column grid, named reading measures, one vertical rhythm. **Both the homepage and the doorway pages now use it.**
- **`.u-container`** — page shell: `max-w-page` (1280) + gutter **24 / 40 / 64** (`px-6 / md:px-10 / lg:px-16`).
- **`.u-grid`** — 12 columns (4 on mobile), gutter **24 / 32**. Place children with `col-span-*` / `col-start-*`. Common patterns: two-column = `col-span-5` + `col-span-6 col-start-7` (col 6 the spacer); three cards = `col-span-4` each.
- **Reading measures:** `max-w-statement` (960), `max-w-read` (800) — used as inner `ch` caps inside columns.
- **Vertical rhythm:** standard section `py-20 md:py-28 lg:py-32`.

## Components (`/components`)

- **`Header.tsx`** — transparent over warm stone, gains `bg-bone/85 backdrop-blur + border` on scroll. **Hides on scroll, returns on pause**; also honours **hide zones** (`[data-hide-masthead]`, e.g. the Selected Work carousel) — stays hidden over them, reappearing on pointer-to-top or when you scroll away. Serif "DAB Hands" wordmark with a **persistent room locator** beneath it on the doorway pages (small uppercase **Deep Blue-Green**, fades in once you've **scrolled to P2** via `[data-p2]`). "Who I help" dropdown: hover/active gets a faint blue-green block, label stays ink. Mobile hamburger → warm-stone sheet.
- **`OperatorTemplate.tsx`** — the 8-section room engine + the shared colour rhythm (see above). One `ROOM` palette object (the `ACCENT` map points every key at it): `color` (Deep Blue-Green — solid panels + CTA hover), `wash` (Cloud Pink hero vignette), `text` (blue-green eyebrow), `border`. Renders the optional `SelectedWork` carousel before the close.
- **`PathwayPicker.tsx`** — homepage hero quick-nav; trigger "See where I can help" with a **plus** icon (→ × when open); portalled charcoal-on-bone panel; closes on Escape/outside-click/scroll.
- **`GridToggle.tsx`** — floating **design aid** bottom-right ("● GRID"); toggles a coral 12-column overlay mirroring `.u-container`/`.u-grid`. Rendered in `Layout` (all environments). **Hide/gate before promoting to production.**
- **`HandUnderline.tsx`** — restrained hand mark; **now used only on the unlisted `/for/manifesto-digital` pitch** (removed from the public site); `light` tone is coral.
- **`LogoTicker.tsx` / `TickerLogo.tsx`** — 13-client marquee (single source of truth).
- **`Figure.tsx`**, **`SeoMeta.tsx`**, **`FadeUp.tsx`** (forwards `className`), **`Footer.tsx`** (charcoal slim bar, bone text), **`Layout.tsx`** (skip-link + Header + `<main>` + Footer + GridToggle), **`PrivateLayout.tsx`**.
- **Removed/unused:** `SpineLabel.tsx` (the left-spine vertical labels — removed from `Layout`, file orphaned, safe to delete). `Trajectory.tsx` (no longer used). `AudienceTemplate.tsx`, `Ribbon*.tsx`, `StatPopover.tsx` (legacy, prunable).

## Hard rules
1. **No em dashes** in user-facing copy (code comments fine).
2. **Brand wordmark is "DAB Hands"** (uppercase DAB, capital-H Hands). Tokens/paths exempt.
3. **White text is always bone** (`text-bone`), never `text-white`.
4. **Type:** Instrument Serif for display/statements/quotes; Manrope for everything else. Never force weight on the serif. Label headings no full stops; truth-statements keep periods.
5. **One restrained five-colour palette; the three-audience sage/peach/lavender system is RETIRED — do not reintroduce it.** Cloud Pink on dark / as fills (never as text on warm stone); Deep Blue-Green for interactive + the solid Situation/Trust panels + turnstile; Soft Grey for borders/cards. Emotion from imagery, clarity from contrast.

## Open items / TODO
- **`GridToggle` ships in all environments** — hide or gate it (`process.env.NODE_ENV`) before any production promotion.
- **Imagery:** `clouds.png` is the brand's warm cloud asset (Darren banner + the What-Changes payoff). `Figure` is ready for art-directed imagery. The per-room `*_solution.png` sky images are **no longer used** (the What-Changes cloud is the shared `clouds.png` now) — prune when convenient.
- **`darren_new-image.png`** is a ~2.3 MB PNG — convert to WebP to cut homepage payload.
- **`og-image.png` / `favicon.svg`** are still v1 green — regenerate for the current look.
- **Prune** legacy `dab-*`, plum/aubergine/sky/moss/paper + `lavender-*` tokens + unused v1 components (`AudienceTemplate.tsx`, `Ribbon*.tsx`, etc.) once confirmed. (sage/peach/lavender already removed; coral/teal/plum kept for dev tools, focus ring and `/for`.)

## Working style
- Owner iterates fast in small, specific edits. For exploratory questions, answer in 2-3 sentences with a recommendation + the main tradeoff before implementing. Don't pre-emptively redesign neighbouring work.
- **Verification:** `FadeUp` content sits at opacity 0 until revealed; framer animations + screenshots can be unreliable in the headless preview (it throttles rendering) — prefer `preview_eval` DOM/CSS measurements, and a tall viewport (`preview_resize` height ~3000-4600) to capture more at once. After `@theme`/token edits, `rm -rf .next` + restart for accurate colour.
- React Strict Mode is on (double-renders in dev).
- **Saved memory rules** live at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` — read `MEMORY.md` first.
