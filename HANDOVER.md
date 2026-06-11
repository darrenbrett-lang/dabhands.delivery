# DAB Hands Website — Handover

Pick this up cold. Captures the project as of the most recent session.

---

## ✅ LIVE — last shipped this session (read first)

Everything below is **merged to `main` and deployed**. Production is `https://dabhands.delivery` via Vercel (every push to `main` auto-deploys). Most recent prod commit: `701144a` "Darken section eyebrows for legibility (55% to 75%)". `main` = `origin/main`, working tree clean (HANDOVER edit pending commit).

**Deploy flow:** work on a branch, the owner reviews on localhost, says **"push"** → `git checkout main && git merge <branch> && git push origin main`. After an OG-image change, refresh social caches (LinkedIn Post Inspector + FB Sharing Debugger).

**The big addition this session — private/unlisted pitch pages under `/for/<company>`.** A new page class for sending tailored point-of-view pages to specific people (the first is a job-conversation pitch). Convention:

- **Route:** one file per company at `pages/for/<company>.tsx` → `dabhands.delivery/for/<company>`. Each page can have a completely different layout; they share brand components.
- **Hidden three ways:** no nav links anywhere on the site, `<SeoMeta noindex />` (renders `robots: noindex, nofollow`), and NOT added to `sitemap.xml`. Do not add these routes to the sitemap or nav.
- **`<PrivateLayout>`** (`components/PrivateLayout.tsx`): minimal chrome — DAB Hands wordmark (not a link) in a fixed charcoal header, no nav, no Footer; closes with a slim charcoal bar: `© <year> DAB Hands.` left + `dabhands.delivery` link (→ `/`) right. The only way off the page.
- **`SeoMeta` gained a `noindex?: boolean` prop** — the only site-wide code change.

**First private page: `/for/manifesto-digital`** ("Manifesto Digital 2027: Building a modern delivery operating system" — pitch for Rebecca Hull). Section flow (bg rhythm): sand hero (eyebrow "Prepared by Darren Brett for Rebecca Hull, Manifesto Digital" → kicker "Manifesto Digital" → H1 → subtitle "A perspective on the journey to 2027" → intro) → **white manifesto statement** ("Every operational decision should reinforce our strategy…", centred, with a charcoal-lozenge flow visual: MANIFESTO STRATEGY → CLIENT IMPERATIVES → DELIVERY OPERATING SYSTEM, green text on charcoal pills, vertical with ↓ on mobile) → **white "The forces in play"** (13-item `ChipExplorer`) → **sand thesis** ("The role of Delivery Operations… To translate strategy into execution…") → **charcoal 3×3 framework matrix** (see below) → **sand "Manifesto 2027" destination** (crown mark + statement) → **white "Characteristics of a high-performing system"** (10-item `ChipExplorer`) → **charcoal Outcomes** (6 cards with green icons) → **white "Beneath the System"** (two-systems comparison: visible system = bordered white card / invisible system = charcoal card with green eyebrow; closing statement with `HandUnderline tone="light"` on "together") → **sand closing** ("Perhaps it's simply a case of connecting the dots." + "Compare notes" CTA → mailto subject "Comparing Notes" with pre-filled body).

**Patterns built inside that page** (all local to `pages/for/manifesto-digital.tsx`):
- **`ChipExplorer`** — chip selector + reading panel (replaces an earlier tooltip approach, which was retired/deleted). Pills in a flex-wrap; active pill = `bg-dab-charcoal text-dab-green`; panel below lifts to sand (`bg-dab-cream rounded-xl`) showing label eyebrow + description; first item selected on load; `AnimatePresence mode="wait"` fade; `aria-pressed` + `aria-live="polite"`; `panelMinHClass` prop absorbs the longest copy so the page doesn't jump.
- **3×3 matrix responsive strategy:** desktop (lg+) = 4-col grid (`[1.1fr_1fr_1fr_1fr]`), columns Q1 SEE / Q2 IMPROVE / Q3+ EVOLVE the system, rows = altitudes with green icon + label + green theme word + tagline. Below lg = stacked by altitude: header block then three phase cards (`bg-white/[0.04] border-dab-cream/10 rounded-xl` — the subtle lift groups cards under their header). `PhaseHeading` renders Q-label + verb in green, "the system" muted cream.
- Eyebrows on this page are `/75` opacity (darkened from /55 for legibility).

**Icon set (NEW, `/public/images/icon-*.svg`):** 11 stroke icons in the site's line style (40×40 viewBox, stroke `#B6FF00`, `stroke-width 1.4`, round caps/joins, transparent bg) — run/improve/evolve-the-business, growth, scale, innovation, client-confidence, people-culture, future-relevance, outcomes, business-context. **Neon green strokes = dark backgrounds only.** Gotcha learned: standalone SVG files need kebab-case attributes (`stroke-width`), not JSX camelCase.

**Standing context from the previous session** (still true): three-colour block system (White ~50 / Charcoal 25 / Sand 25, mushroom retired); nav label "When To Bring Us In" with route still `/where-we-step-in`; accordion open-state lifts to sand; both closing modules share crown + statement + compact `<LogoTicker>`; one `<main>`/`<h1>` per page, clean prod build.

---

## Read this first

Multi-page site (Home / When To Bring Us In / Experience / Contact) plus **unlisted `/for/<company>` pitch pages** (currently `/for/manifesto-digital`). On production at `https://dabhands.delivery` via Vercel's GitHub integration — every push to `main` auto-deploys. `main` = `origin/main` = `701144a`.

Saved memory rules at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` apply to every conversation — read them (and `MEMORY.md`) before touching copy, colour, or marks. Notably: no em dashes; no green text on light backgrounds; "DAB Hands" wordmark; three-colour palette (sand = `dab-cream`, mushroom retired).

## Stack

- **Next.js 16.2.6 (Pages Router)** — `AGENTS.md` warns it has breaking changes vs training data; read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme` directive). Custom utilities at the bottom of `styles/globals.css`.
- **Framer Motion 12** for scroll-triggered fade-ups, ribbon drift, hand-mark reveals, brand-dot breathing, popover transitions, logo ticker.
- **TypeScript**. Run `npx tsc --noEmit` after non-trivial edits. `npm run build` for the full check (clean as of last session).
- **Fonts**: Geist + Geist Mono via `next/font/google` in `pages/_app.tsx`.

## Dev workflow

- User runs `npm run dev` themselves on port 3000.
- `.claude/launch.json` has `autoPort: false`. The preview tool attaches to port 3000.
- The preview tool's screenshot is **unreliable for deep-scrolled sections** (often returns blank cream). Prefer DOM measurements via `preview_eval` for verification; only use screenshots for the homepage/top sections or after a fresh `window.location.href` navigation.
- Strict mode is on (`reactStrictMode: true`) — useEffect / state hooks run twice in dev. Don't rely on side-effect-only mounts; use cleanup functions.

## Branch state at handover

- **Working branch**: `main`, in sync with `origin/main` at `701144a` (apart from this HANDOVER edit).
- A local `private-pages` branch exists (already merged into `main`); safe to delete.
- **Production**: `main` → Vercel auto-deploys `https://dabhands.delivery`.
- Start the next change on a fresh branch off `main`; the owner reviews on localhost and says **"push"** to go live. (Late in the last session the owner said "push" directly on small `main` commits — both flows are in use.)

## Site structure

### `/` (home) — `pages/index.tsx`

Rhythm: sand → charcoal → white → white → sand.

1. **Hero (P1)** (sand, centred) — H1 "**Keeping important work moving**" with per-word staggered rise animation (`useReducedMotion` guard). Sub-paragraphs: "Important digital work can quickly lose momentum within complex organisations." + "We help **modern** brands get stronger digital work out into the world." Hero `Ribbon` (`top-[32px] md:bottom-0`, top on mobile / bottom on desktop). Hero height `min-h-[78vh] md:min-h-[100vh]`.
2. **Where we are** (charcoal, left-rag) — eyebrow + two statement blocks ("The tools are changing. The problems aren't." / "Complexity is higher than ever.") + supporting paragraph with 4 `<HandUnderline>` marks: `slows` · `technology` · `attention` · `budget`.
3. **Core Truth** (white, centred) — crown SVG above H2 "Great work rarely struggles because of a lack of ambition." + quieter line "More often, the challenge is helping it stay strong as it moves through the organisation."
4. **How DAB Hands helps** (white, left-rag) — H2 + 2×2 grid of four **doorways** (`<motion.a>` cards): Get it moving / Bring it together / Strengthen it / Get more from it — charcoal icon + label + arrow, situation-led blurb, each deep-linking to `/where-we-step-in#<id>`.
5. **Closing** (sand, centred, `py-16 md:py-32`) — crown mark + centred H2 "20+ years helping global brands keep important digital work moving." (needs inline `marginLeft/Right:'auto'` to beat the optical heading nudge) + **`<LogoTicker compact>`** + BoxCTA "When To Bring Us In" (→ `/where-we-step-in`).
6. Footer (variant: **minimal**).

### `/where-we-step-in` — `pages/where-we-step-in.tsx` (nav label: **"When To Bring Us In"**; route unchanged)

Client component (`useState`/`useEffect` for the accordion). Rhythm: sand → white → charcoal → white → sand.

1. **Hero** (sand, left-rag) — H1 "We believe strong work deserves to stay strong." + two body paragraphs (the proposition: ideas survive complexity; DAB Hands moves the right work from idea to market). `sand-ripple.jpg` anchored right+bottom (`h-[80%]`, masked).
2. **Common reasons people get in touch** (white) — H2 + the **ACCORDION** (4 items: Get it moving / Bring it together / Strengthen it / Get more from it). Closed: white row, charcoal icon/title/summary + "Learn more +". Open: row + panel **lift to sand** (`isOpen ? 'bg-dab-cream' : 'bg-white'`), detail paragraphs (last emphasised) + "Start a conversation →" (`mailto()` with the item label as subject). Single-open; **deep-link auto-opens** `#id`; panel always mounted (height-animated, `inert` when closed) for SEO/select; `last:border-b-0`, section `pt-` only.
3. **Ways clients typically work with DAB Hands** (charcoal — the page's one weight moment) — eyebrow "Engagement models" + H2 + Leadership & Advisory / Trusted Capability + "The shape depends on the challenge."
4. **The outcome** (white) — H2 "When important work moves together more effectively, you get:" + 3-item `<ul>` (Stronger customer experiences / Better execution quality / More commercial impact). Labels `md:ml-6 lg:ml-8` indented from the top-aligned icons.
5. **Closing** (sand, centred, `py-16 md:py-32`) — crown mark + "20+ years helping global brands keep important digital work moving." + **`<LogoTicker compact>`** + BoxCTA "Experience".
6. Footer (variant: **minimal**).

### `/experience` — `pages/experience.tsx`

Rhythm: sand → charcoal → white → sand (bio) → white → white → sand.

1. **Hero** (sand, left-rag) — eyebrow "Track record" + H1 "Trusted with work that matters" + `under-pressure.png` right-anchored full height.
2. **Proven across** (charcoal) — H2 + icon grid (Digital experiences / Platform and ecommerce / Campaigns and launches / Membership and lifecycle).
3. **I've worked at scale for** (**white**, left-rag) — eyebrow + **`<LogoTicker>`** (full size). Self-hosted logos from `/public/images/logos/svg/`. See "Client ticker logo system" below.
4. **"Hi, I'm Darren"** (**sand**) — eyebrow "Who am I" + portrait + bio.
5. **The teams behind the work** (**white**) — eyebrow + H2 + body + tick list.
6. **Trusted to lead important work** (**white**) — H2 + 3 testimonials (charcoal accent rule — was `dab-green`, fixed for the no-green-on-light rule).
7. **Closing** (sand, centred) — "Let's get important work moving properly." + BoxCTA "Start a conversation" (→ /contact).
8. Footer (variant: **minimal**).

#### Client ticker logo system

All 13 client logos are **self-hosted** under `/public/images/logos/svg/`. No external CDN dependency. `TickerLogo` always renders an `<img>` with `style={{ filter: 'brightness(0)' }}` so the source artwork is forced to a charcoal silhouette regardless of its original colour.

**Sourcing path per brand:**
- 5 from Simple Icons (downloaded once via `cdn.simpleicons.org/{slug}/111111`): Nike, Volkswagen, Audi, Unilever, Palantir → small square marks, `kind: 'icon'`, render at h=56.
- 4 clean SVGs from Wikimedia Commons: Hugo Boss, Johnson & Johnson, Fortnum & Mason, Falabella → wordmarks, `kind: 'wordmark'`, render at h=36 max-w=180.
- 2 surgically edited SVGs (red rectangle background removed, white wordmark left for `brightness(0)`): Parcelforce, Post Office. Post Office's viewBox was also tightened from the full canvas down to just the wordmark area, and uses `boost: true` to render at h=56 alongside the icons.
- 2 PNGs extracted via colour-key from the user's brand-asset PNGs: `royal-mail-mono.png` (yellow letters keyed out, optimized to 24KB), `tommy-hilfiger-mono.png` (black blocks keyed out so knockout letters become transparent). Tommy uses `boost: true` because its aspect is square-ish and reads small without it.

**Ticker animation** — Framer Motion `<motion.ul>`, `animate={{ x: ['0%', '-33.3333%'] }}` with 3× duplicated `<li>` children and `w-max` parent so the animation distance exactly equals one set's width — produces a seamless infinite loop, no flick on wrap. 60s linear duration. Wrapped in `useReducedMotion()` — animation is dropped entirely when the user prefers reduced motion. Duplicated `<li>` items carry `aria-hidden="true"` so screen readers see exactly 13 client names.

### `/contact` — `pages/contact.tsx`

1. **Hero** (cream, left-rag) — H1 "**What needs moving?**" (was "Let's talk") + intro "For critical digital initiatives that need to move properly, reach out directly." (the second clause has a soft `<br className="hidden md:block" />` — single line on mobile, two lines on desktop). Email / Phone / LinkedIn link grid. Hero `Ribbon` (default `ribbon.png`) configured **identically to homepage P1** — `inset-x-0 bottom-0 w-full`, opacity 0.4. (Earlier attempts with `fuller-ribbon.png` and `top-1/2 -translate-y-1/2` were reverted because the Tailwind transform combined with framer-motion's transform broke `mix-blend-multiply` and showed a white box at smaller widths.)
2. Footer (variant: **none**) — only the small charcoal copyright bar shows.

### `/for/manifesto-digital` — `pages/for/manifesto-digital.tsx` (UNLISTED — do not add to nav or sitemap)

Private pitch page, full anatomy in the "LIVE — last shipped this session" block at the top of this file. Uses `<PrivateLayout>` + `<SeoMeta noindex>`. Contains its own local components (`ChipExplorer`, `PhaseHeading`, `ActivityList`) and all content as data arrays (`contextForces`, `altitudes`, `characteristics`, `outcomes`). The CTA mailto subject is "Comparing Notes" with a pre-filled body. To make the next pitch page, copy the conventions (not necessarily the layout): new file in `pages/for/`, `PrivateLayout`, `SeoMeta noindex`, keep out of sitemap.

## Components (`/components`)

- **`Layout.tsx`** — `<a href="#top" className="skip-link">Skip to content</a>` + `<Header>` + `<main id="top">` + `<Footer variant={footerVariant}>` + `<GridToggle>`.
- **`Header.tsx`** — fixed top, charcoal. Logo (animated breathing dot — see Brand marks) + nav + "Start a conversation" pill.
- **`Footer.tsx`** — Two stacked modules. Cream contact module renders "If something important needs to move properly, **let's talk**." (linked to /contact, green underline). Variants: `'default' | 'minimal' | 'none'`.
- **`FadeUp.tsx`** — scroll-triggered fade + 18px rise.
- **`BoxCTA.tsx`** — pill-shaped CTA. `tone="light"` / `tone="dark"`.
- **`Ribbon.tsx`** — atmospheric ribbon. Default `/images/ribbon.png`, customisable `imagePath`. Scroll-tied horizontal drift via `useScroll` (target = its own absolute element). Note: the dev `useScroll` "non-static container" warning is fixed globally by `html { position: relative }` in `globals.css` — don't remove that.
- **`RibbonAccent.tsx`** — smaller secondary accents from `ribbon_accents.png` (2×3 sprite). Used on /contact bottom-left.
- **`HandUnderline.tsx`** — hand-drawn SVG underline for emphasis on specific words.
- **`GridToggle.tsx`** — fixed-position dev tool, toggles 12-col overlay matching site container (gap-4 md:gap-6 lg:gap-8).
- **`StatPopover.tsx`** (NEW) — wraps a giant stat number as a button with green text + underline. Opens a popover with richer copy on hover (desktop, with 150ms close delay to allow crossing the gap) or click (touch — detected via `window.matchMedia('(hover: hover)')`). `align="start" | "end"` controls anchor edge. Click-outside + Escape close.
- **`SeoMeta.tsx`** — per-page `<Head>` helper. Title, description, canonical, OG (title/desc/image/url/type/site_name), Twitter card, og:image:width=1200 / height=630 / alt. Defaults `image` to `/og-image.png`. `noindex` prop adds `robots: noindex, nofollow` (used by `/for/` pages).
- **`PrivateLayout.tsx`** (NEW) — layout for unlisted `/for/<company>` pages. Fixed charcoal header with the DAB Hands wordmark (deliberately not a link), `<main id="top">`, slim charcoal bottom bar (`© <year> DAB Hands.` + right-aligned `dabhands.delivery` link to `/`). No Header/Footer components, no nav.
- **`TickerLogo.tsx`** — renders a single brand mark. Props: `src` (local path to SVG or PNG), `kind: 'icon' | 'wordmark'`, optional `boost`. Always `<img loading="lazy" decoding="async" style={{ filter: 'brightness(0)' }}>` (charcoal silhouette), `opacity-70 hover:opacity-100`. Sizing: icons `h-12 md:h-14`, boosted wordmarks `h-11 md:h-14`, regular wordmarks `h-7 md:h-9 max-w-[140px] md:max-w-[180px]`.
- **`LogoTicker.tsx`** (NEW — shared) — the seamless brand marquee + the canonical 13-client `clients` array (single source of truth; exported). Props: `ariaLabel`, `compact` (smaller row + tighter gap for the closing modules). 3× duplicated `<li>` (`w-max`) for a no-flick infinite loop; `useReducedMotion` drops the animation; mobile/desktop durations. Used on Experience and both closing modules. Renders `<TickerLogo>` per client.

## `lib/mailto.ts`

Centralises mailto generation. `mailto({ subject?, body? })` → `mailto:db@dabhands.delivery?subject=…&body=…`. Used by Header CTA, intervention "Start a conversation" links, Experience closing CTA, Contact email link.

## Brand tokens (`styles/globals.css` `@theme`)

| Token | Hex | Role |
|---|---|---|
| `dab-cream` / `dab-white` | `#F3F0EA` | Primary background |
| `dab-charcoal` | `#111111` | Primary text + dark sections |
| `dab-charcoal-alt` | `#171717` | Hover state |
| `dab-charcoal-soft` | `#4A4744` | Body text base in `:root` |
| `dab-green` | `#B6FF00` | Signal accent — sparing; on **dark only** (never on light) |
| `dab-brown` | `#ACA195` | Light-bg hand underlines (not a block bg) |
| `dab-brown-lighter` | `#C0B5A9` | **Retired** (was "mushroom") — do not use as a block colour |
| `dab-brown-light` | `#E8E3DC` | Unused |
| `dab-taupe` | `#8E877D` | Unused |
| `dab-warm` | `#E8D5C5` | Unused (mistaken one-off — do not use) |

**The block-colour system is three colours only: Charcoal, Sand (`dab-cream`), White** (target ~ White 50 / Charcoal 25 / Sand 25). White is the canvas; charcoal = one weight moment per page + footer; sand = warm bookends, in-page warm moments, and the accordion open-state. See memory `feedback_colour_vocabulary`.

## Hard rules (saved to memory)

1. **No em dashes (—) in user-facing copy.** (Code comments are fine.)
2. **No neon green text/marks on light backgrounds — ever.** Includes hover states; on light, icons/arrows/rules are charcoal.
3. **Brand wordmark is "DAB Hands"** — uppercase DAB, capital-H Hands. File paths and Tailwind tokens are exempt.
4. **Geist sans throughout.** Label headings no full stops; truth-statement headings keep periods.
5. **Hand markup is "proof of care", not decoration.** Editorial/technical tone — never sketchbook / agency / expressive. `dab-green` on dark, `dab-brown` or `dab-charcoal` on light.
6. **Block colours are Charcoal, Sand, White only.** Mushroom retired; don't invent tokens. "Sand" = `dab-cream`.

## Brand marks & micro-animations

- **Brand dot** — the green dot in the "Dab Hands" wordmark (Header, Footer logo, plus any standalone usage). Uses `.brand-dot` class from `globals.css`:
  - Pulsing breathing animation `brand-dot-breathe` — 4.5s ease-in-out infinite. Scales 1 → 1.14, colour drifts vibrant `var(--color-dab-green)` ↔ softer `#D9E89A`.
  - `prefers-reduced-motion: reduce` → animation disabled.
  - Locked to **14px** everywhere (matches the header logo's resting size).
- **Crown mark** (`/public/images/dab-hands-crown-mark.svg`) — line-art crown. Used on home Core Truth section, where-we-step-in closing, and the `/for/manifesto-digital` "Manifesto 2027" destination section. The 3 accent dots have **SMIL `<animate>` flash** on opacity 1 → 0.2 → 1 over 1.8s, all three in sync. Colour stays inherited from `currentColor` (charcoal in context).
- **Topic icon set** (`/public/images/icon-*.svg`, 11 files) — stroke line icons matching the site's icon style (40×40, `#B6FF00` stroke hardcoded, 1.4 weight, round caps, transparent bg). **Dark backgrounds only** (neon green). Nine are used on `/for/manifesto-digital` (3 matrix altitudes + 6 outcomes); `icon-outcomes.svg` and `icon-business-context.svg` are unused spares. Standalone SVG files must use kebab-case attributes (`stroke-width`), not JSX camelCase.
- **Calibration mark** (`/public/images/dab-hands-calibration-mark.svg`) — alternate registration-style mark. Currently unused on pages; available as a sibling option.
- **Compass mark** (`/public/images/dab-hands-compass-mark.svg`) — experimental, currently unused.

## Hand-mark system

`HandUnderline` instances (delay seconds shown in parens; all reveal AFTER the copy lands — fade-in, not draw-on):

- **Home WHERE WE ARE**: `slows` (1.2) · `technology` (1.35) · `attention` (1.5) · `budget` (1.65) — green on charcoal.
- **WWSI Why expert delivery matters H2**: `ambition` (1.2) · `execution` (1.4) — green.
- **WWSI stats**: `potential value` (1.1) · `operational waste` (1.3) — green.
- **Experience closing**: `moving properly` — currently NOT underlined (was previously, removed in iteration).
- **/for/manifesto-digital "Beneath the System" closing**: `together` (1.0, variant 2, `tone="light"` → dab-brown on white) — the page's only hand mark, saved for its most important line.

## Optical alignment rule

`styles/globals.css` adds `margin-left: -0.04em` to all `h1–h6`. Geist at large display sizes has noticeable side-bearing on letters like "E" / "W" — this nudges every heading visually left to align with the body copy column. Scales naturally with font-size via `em`.

## Vertical spacing scale (section padding)

Sections use a fixed 3-step scale. **Mobile is deliberately ~⅓ tighter than desktop** — mobile screens are ~3× narrower, so desktop-scale padding reads as cavernous on a phone. Keep desktop values; do not let the mobile value creep back up toward the desktop one.

| Role | Class | Mobile | Desktop |
|---|---|---|---|
| Standard content section | `py-14 md:py-32` | 56px | 128px |
| Breather section | `py-16 md:py-40` | 64px | 160px |
| Big statement moment | `py-20 md:py-48` | 80px | 192px |
| Hero top (header clearance) | `pt-32 md:pt-44` | 128px | 176px |

Split top/bottom paddings follow the same mobile steps (`pt-14`/`pb-14` = 56, `pb-16` = 64). Rules:
- **New sections must use one of these steps** — don't invent ad-hoc values.
- Hero top stays `pt-32` minimum so content clears the fixed header.
- Hero height on `/` is `min-h-[78vh] md:min-h-[100vh]` (content centred; full-height hero only on desktop, else mobile leaves a tall empty band).
- List-item paddings (e.g. WWSI reasons `py-12 md:py-16 lg:py-20`) and internal component padding (StatPopover columns) are **out of scope** — leave them.

## SEO + a11y + perf infrastructure (audit pass — shipped at 228e464)

- **Per-page `<SeoMeta>`** wraps `<Head>` for title, description, canonical (`https://dabhands.delivery${path}`), OG (image defaults to `/og-image.png`), Twitter card, og:image dimensions/alt.
- **JSON-LD Organization schema** in `_document.tsx` (founder, contactPoint, logo).
- `/public/robots.txt` — references sitemap.
- `/public/sitemap.xml` — 4 routes.
- `/public/llms.txt` — LLM/agent-readable manifest.
- `/public/site.webmanifest` — PWA manifest (theme/icons/start_url).
- `/public/favicon.svg` — charcoal square + dab-green dot (32×32 viewBox, r=9). Linked alongside `favicon.ico` fallback in `_document.tsx`.
- `/public/og-image.png` — 1200×630 social share card (cream-on-green, "Keeping important work moving" + Dab Hands logo + fuller-ribbon motif). Generated via headless Chrome from an export HTML; the source HTML has been deleted.
- `<a className="skip-link" href="#top">Skip to content</a>` in Layout. Style in `globals.css` — hidden until focused.
- **Global `:focus-visible`** rule in globals.css — 2px `dab-green` ring + 3px offset. Covers every focusable element.
- `data-scroll-behavior="smooth"` on `<html>` (clears Next.js 16 warning).
- **Semantic lists**: builtForItems, antidotePoints, cccItems → `<ul>/<li>`; interventions → `<ol>/<li>`. Decorative icons inside lists wrapped with `aria-hidden`.
- **`next.config.ts`**: `compress: true`, `poweredByHeader: false`, image formats `avif, webp`, security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy), immutable cache-control on `/images/*` and static asset extensions.

## Image-anchor rules

- **`sand-ripple.jpg`** appears in two places now:
  - WWSI **hero** — `right-0 bottom-0 h-[80%] w-auto max-w-none`, opacity `50/75/100`.
  - WWSI **intervention section bottom** — `right-0 bottom-0 h-[40%] w-auto max-w-none`, opacity `50/75/100`. Half the height of the hero — bookends the page.
- **`under-pressure.png`** on /experience hero — `right-0 top-0 bottom-0 h-full w-auto max-w-none`, opacity `40/65/90`, plus a `mask-image: linear-gradient(to top left, ...)` fading the upper-left so headline text stays readable.
- **Tailwind v4 preflight** gives `img { max-width: 100% }`. For wider-than-container images, **MUST add `max-w-none`**.

## Typography gotchas

- `globals.css` sets `h1–h6 { text-wrap: balance }` and `p { text-wrap: pretty }` **unlayered** — these win over Tailwind utilities. Override via inline `style={{ textWrap: 'balance' }}` or `!important` modifier.
- For widow control: inline `text-wrap: balance` + non-breaking space (`{' '}` JSX prefix or `&nbsp;`) between last two words.
- `<br className="sm:hidden" />` for mobile-only breaks. `<br className="hidden md:block" />` for desktop-only breaks (used on /contact intro).

## Cleanup TODO

All previous cleanup items are done (auto-traced SVGs deleted, `scripts/trace-logos.js` removed, `potrace` devDep uninstalled, temp preview HTMLs deleted, `LogoMark.tsx` removed). The active logo set lives at `/public/images/logos/svg/`.

## Working style

- User iterates fast in small, specific edits. Don't pre-emptively redesign neighbouring sections.
- Each page has a sign-off + CTA to the next page in the flow: Home → Work → Experience → Contact. Contact is terminal.
- Footer variants stay coordinated with sign-off flow — `minimal` on pages with their own CTA, `none` on /contact.
- For exploratory questions, respond in 2–3 sentences with a recommendation + main tradeoff. Don't implement until they agree.
- Be honest about source-data limits. Many off-the-shelf brand PNGs have transparency-checker patterns baked into RGB or use coloured-rectangle compositions where the visible identity comes from colour contrast (not from transparent areas around letters). For mono silhouette via `brightness(0)`, those need either Wikimedia Commons SVGs with transparent backgrounds, or colour-key extraction (see `/public/images/logos/svg/royal-mail-mono.png` and `tommy-hilfiger-mono.png` for examples — extracted with PIL by keeping pixels of a target colour and dropping the rest).
- Preview tool screenshot is unreliable for deep-scrolled sections. Use DOM measurements (`preview_eval`) for verification.
- StrictMode is on (double-renders in dev). Avoid DOM mutations that bypass React state — use useState + setters.
