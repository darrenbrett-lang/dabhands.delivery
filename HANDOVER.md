# DAB Hands Website — Handover

Pick this up cold. The redesigned site is **LIVE in production** at `https://dabhands.delivery` (went live 2026-06-19, overwrote the old v1). This captures it after the **v6 earthy palette**, the **Growth-Stage Businesses** repositioning, the **doorway-portrait** imagery, and a **performance + SEO/agentic** pass.

---

## Status (read first)

- **`main` = production.** Vercel auto-deploys on push to `main`. The live site is the new build.
- **Develop on `staging`** (integration branch), then **release** by fast-forwarding: `git push origin staging:main` → Vercel deploys `dabhands.delivery`. Only commit/push/release when the owner asks.
- **Rollback:** old v1 is preserved at commit `efaa863`; roll back via Vercel's instant deployment rollback or `git push -f origin efaa863:main`.
- **localhost:3000** = `npm run dev` (Turbopack). **Gotcha:** newly-*added* `@theme` tokens in `globals.css` do **not** hot-reload — `rm -rf .next` + restart. Changing an existing token's *value* hot-reloads fine. Favicons are cached hard by browsers — links are versioned (`?v=2`); bump it when the icon changes.
- **Build gate:** `npm run build` / `npx tsc --noEmit` (clean). Routes: `/`, `/business-and-agency-leaders`, `/marketing-leaders`, `/growth-stage-businesses`, `/contact`, `/for/manifesto-digital`, plus `/404`, `/api/hello`.
- Repo: `git@github.com:darrenbrett-lang/dabhands.delivery.git`. Vercel project `dabhands-delivery`, GitHub-integration auto-deploys.

## The brand direction (source of truth)

A **mastery brand** — "the marks left behind by skilled hands." The digital home of **Darren** (first person, "I"), a senior digital operator with the heart of a creative. Not a consultancy, agency, or transformation practice. Visual direction is **calm, premium, editorial, earthy + grounded** (Aesop / Monocle / Kinfolk).

- **Central tension: Darren is still, the work moves.** Calm, judgement, experience.
- **Copy thread:** the work isn't the problem, the journey is, and Darren protects it. First person, warm, senior, no buzzwords.
- **No em dashes in user-facing copy.** Wordmark is **"DAB Hands"** (uppercase DAB, capital-H Hands). White text is always **bone**, never `text-white`. Audience labels are **Title Case**.

## Stack

- **Next.js 16.2.6** (Pages Router, Turbopack). `AGENTS.md`: read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind v4** (`@import "tailwindcss"` + `@theme` in `styles/globals.css`).
- **Framer Motion 12** (subtle reveals via `FadeUp`).
- **TypeScript** (`npx tsc --noEmit` is the fast gate).
- **Fonts:** Instrument Serif (display) + Manrope (UI) via `next/font/google` in `pages/_app.tsx`.

### Gotchas
1. **Font vars must live at `:root`.** `_app.tsx` injects `<style>:root{--font-instrument-serif:…;--font-manrope:…}</style>`. Without it, `--font-serif` collapses to sans. Do not remove.
2. **Turbopack stale `@theme`.** Newly-added colour/font tokens don't hot-reload — `rm -rf .next` + restart.
3. **Heading colour is inherited** — set `text-ink` / `text-bone` on the **section**; headings inherit.

## Information architecture

Nav: **DAB Hands (home) · Who I help (dropdown) · Contact.** "Who I help" → three flat routes: `/business-and-agency-leaders`, `/marketing-leaders`, `/growth-stage-businesses`. (The old `/creators-and-founders` was replaced by Growth-Stage Businesses and now 404s.)

## Pages

### `/` — `pages/index.tsx`
Predominantly **bone + graphite**. Rhythm: bone hero → warm-stone "Hi, I'm Darren" (doorway portrait) → charcoal (point of view) → bone (proof) → bone (turnstile) → bone (final CTA).
1. **Hero** (bone, centred) — Instrument Serif "Keeping important work moving." + subline (desktop soft break before "best"). CTA cue **"See where I can help +"** (`PathwayPicker`) reveals the three pathways as a charcoal-on-bone panel.
2. **Darren** (`data-spine="Darren"`) — warm stone with a **soft clay vignette at the top** (bounds the hero); copy left, the **doorway portrait right** (`SlatPortrait`). No clouds, no cut-out.
3. **Point of view** (charcoal, bone copy) — two columns (thesis left, argument right).
4. **Proof** (bone) — `<LogoTicker>`.
5. **Turnstile** (warm stone) — three **doorway cards in solid Slate Blue** (bone copy, **gold** accent + hover border). Cards differ by label, not colour.
6. **Final CTA** (warm stone) — charcoal "Start a conversation" (hover → slate fill with gold text).

### The three rooms (`components/OperatorTemplate.tsx`)
All three on one 8-section operator spine (operating **partner**, "I" voice, situations not services), on the shared 12-col grid. Colour rhythm:

| Panel | Treatment |
|---|---|
| **P1 Hero** | warm stone + soft **clay wash** (`ROOM.wash`, top-down); **slate** eyebrow; charcoal CTA |
| **P2 The Situation** | **solid Slate Blue** panel, **bone** copy, **editorial left-rules** on the two body columns; `data-p2` (drives the masthead locator) |
| **P3 The Challenge** | **charcoal** — big serif thesis (left) + building argument → serif resolution (right) |
| **P4 What Changes** | warm stone; the **doorway portrait** (`SlatPortrait`) left, payoff copy + **"Start a conversation" CTA** right, top-aligned (mirrors the homepage) |
| **(Transition)** | optional warm-stone section (rarely used) |
| **P5 Where I tend to help** | warm stone; three situation cards in **Soft Grey** (charcoal copy) |
| **Selected Work** (Marketing only) | **black** phone carousel — see below |
| **Trusted by…** | **solid Slate Blue** panel, **bone** copy; auto-rotating `proof.testimonials` (pips share one grid cell so they never jump) or a single `proof.quote` |
| **Close** | warm stone, centred, charcoal CTA (hover → slate + gold) |

Content lives in each page file. Each room's CTA opens a context email via `content.email`. Mobile **sticky CTA** (hidden while the Selected Work carousel is in view). The per-page `accent` field is **vestigial** — every value resolves to the one shared `ROOM` palette.

### Selected Work carousel (`components/SelectedWork.tsx`) — Marketing only
Phone-mockup carousel on a **black** stage (silent chrome, loud work; the chrome accent is **gold**). Data-driven from `work.cards` in `marketing-leaders.tsx`: nine real case studies, each a 9:19 device mockup in **WebP** (`/public/images/work/*.webp`, `media:'image'`, `frame:'none'`), **lazy-loaded**. Scroll-snap, next card peeking; swipe + arrows + dots + keyboard. **Desktop:** synced narrative panel (cols 1–5) crossfades to the centred card; phones cols 6–12. **Mobile:** brand · tag · headline + "Read case study" → slide-up sheet. The masthead treats this as a **hide zone** (`data-hide-masthead`).

### `/contact`, `/for/manifesto-digital`
Contact: bone hero "What needs moving?" + a soft **clay** wash + channels. `manifesto-digital`: unlisted private pitch on `PrivateLayout` (charcoal chrome), `noindex`, re-skinned to the v6 palette — keep out of nav/sitemap.

## Visual system — palette v6 (earthy / grounded)

| Role | Token | Hex |
|---|---|---|
| Warm Stone — primary background | `bone` | `#F5F1EA` |
| Charcoal — primary text + dark sections | `ink` / `charcoal` | `#1F1F1D` |
| Secondary / body text | `graphite` | `#5C5C58` |
| Soft Grey — borders, dividers, "Where I tend to help" cards | `stone` | `#D8D3CB` |
| **Slate Blue** — interactive + solid Situation/Trust panels + turnstile cards | `blue-green` *(name kept)* | `#535B68` |
| **Walnut** — warm dark (currently spare; tried on help-cards/carousel, reverted) | `walnut` | `#53403B` |
| **Clay** — soft hero/section washes (replaces the pink wash) | `clay` | `#A49786` |
| **Aged Gold** — the expressive accent (eyebrows on dark, arrows, CTA hover, nav dash, current-page) | `gold` | `#C0974A` |
| Cloud Pink — **RETIRED** from the live site; token kept only for the legacy `/for` page | `cloud-pink` | `#E8A3B1` |
| Legacy — dev tools / focus ring / `/for` only | `coral` / `teal` / `plum` / `aubergine` | — |

Slate Blue (from the portrait t-shirt) replaced the old Deep Blue-Green teal `#3F5A61`; Walnut + Clay come from the doorway; Gold is the accent. Eyebrows: **slate on light, gold on dark**. Tokens in `globals.css @theme`. Utilities: `.eyebrow`, `.font-serif`. The doorway portrait + slat treatment live in `components/SlatPortrait.tsx` — **slats were removed; it now renders a clean cropped photo (`darren_doorway_crop-4.jpg`, aspect 637/736). The name is legacy.** `darren_doorway.png` is the full-res master kept for re-crops.

## Grid system
- **`.u-container`** — `max-w-page` (1280) + gutter **24 / 40 / 64** (`px-6 / md:px-10 / lg:px-16`).
- **`.u-grid`** — 12 columns (4 on mobile), gutter **24 / 32**; place with `col-span-*` / `col-start-*`.
- **Vertical rhythm:** standard section `py-20 md:py-28 lg:py-32`.

## Components (`/components`)
- **`Header.tsx`** — transparent over warm stone → `bg-bone/85 backdrop-blur + border` on scroll. Hides on scroll, returns on pause; honours hide zones (`[data-hide-masthead]`). Serif "DAB Hands" + a persistent **room locator** (slate, fades in at `[data-p2]`). "Who I help" dropdown: current page in soft **gold**, others grey on hover.
- **`OperatorTemplate.tsx`** — 8-section room engine + colour rhythm. One `ROOM` palette (`color`=slate panels + CTA hover, `wash`=clay hero vignette, `text`=slate eyebrow). Renders the doorway portrait + CTA in P4 and the optional `SelectedWork` carousel before the close.
- **`SlatPortrait.tsx`** — the doorway portrait (clean cropped photo; legacy name). Shared by the homepage intro + each doorway P4.
- **`SelectedWork.tsx`** — the Marketing carousel (black stage, gold accents, WebP + lazy).
- **`PathwayPicker.tsx`** — homepage hero quick-nav (portalled panel).
- **`LogoTicker.tsx` / `TickerLogo.tsx`** — client marquee. **`SeoMeta.tsx`**, **`FadeUp.tsx`**, **`Footer.tsx`**, **`Layout.tsx`** (skip-link + Header + main + Footer), **`PrivateLayout.tsx`** (charcoal chrome).
- **Removed:** `GridToggle`, `Figure`, `Ribbon`, `RibbonMotif`, `RibbonAccent`, `HandUnderline`, `SpineLabel`, `Trajectory`. **Dead but present:** `AudienceTemplate.tsx` (legacy engine, unused, still carries old tokens — safe to delete).

## Performance + SEO + agentic search
- **Images:** raw `<img>` (not `next/image`). Carousel = **WebP + lazy** (was 9.9MB PNG → 592KB). Doorway portrait = optimised JPG. `public/images` ≈ 7.3MB (down from ~35MB after pruning dead assets).
- **`next.config.ts`:** compression, `poweredByHeader:false`, security headers, immutable cache on `/images` + static assets, `images.formats` avif/webp (only active if `next/image` is adopted later).
- **SEO:** `robots.txt` (allow all + sitemap), `sitemap.xml` (the four public routes), `SeoMeta` (per-page title/description/canonical/OG/Twitter), `theme-color`, `site.webmanifest`.
- **Structured data:** `_document.tsx` emits a JSON-LD `@graph` — **Organization + Person + WebSite**, cross-linked by `@id`, with `sameAs` (LinkedIn), `slogan`, `areaServed`.
- **Agentic:** `public/llms.txt` describes the site + lists the live routes — **keep it in sync when routes/positioning change.**
- **Favicon:** the brand "D" (bone on charcoal) — `favicon.svg` / `favicon.ico` / `apple-touch-icon.png`, links versioned `?v=2`. **OG card:** `og-card-2.png` (tagline + URL, Instrument Serif).

## Hard rules
1. **No em dashes** in user-facing copy (code comments fine).
2. **Brand wordmark is "DAB Hands."** Tokens/paths exempt.
3. **White text is always bone** (`text-bone`), never `text-white`.
4. **Type:** Instrument Serif for display/statements/quotes; Manrope for everything else. Never force weight on the serif. Label headings no full stops; truth-statements keep periods.
5. **Audience labels are Title Case** (Business & Agency Leaders / Marketing Leaders / Growth-Stage Businesses) — label/heading use only, never mid-sentence prose.
6. **Palette v6 (earthy):** the three-audience sage/peach/lavender system and Cloud Pink are retired from the live site — do not reintroduce. Slate for interactive + solid panels, clay for washes, gold for accents, soft grey for cards.

## Open items / TODO
- **Run Lighthouse / PageSpeed Insights** on the live URL to confirm scores; the one thing worth checking is **gold-on-slate hover contrast** (default states pass AA).
- **`AudienceTemplate.tsx`** is dead (still references old tokens) — prune when convenient.
- Consider adopting **`next/image`** if further image perf is needed (config is ready).
- Prune remaining legacy tokens (`plum`/`aubergine`/`coral`/`teal`) once the `/for` page no longer needs them.

## Working style
- Owner iterates fast in small, specific edits. For exploratory questions, answer in 2-3 sentences with a recommendation + the main tradeoff. Don't pre-emptively redesign neighbouring work.
- **Verification:** `FadeUp` content sits at opacity 0 until revealed; prefer `preview_eval` DOM/CSS measurements over screenshots (the headless preview throttles rendering). After `@theme` token additions, `rm -rf .next` + restart.
- **Saved memory rules** live at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` — read `MEMORY.md` first.
