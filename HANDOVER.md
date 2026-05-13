# Dab Hands Website — Handover

Pick this up cold. Captures the project as of the most recent session.

## Read this first

Multi-page site (Home / Where we step in / Experience / Contact). The site is **on production at `https://dabhands.delivery`** via Vercel's standard GitHub integration — every push to `main` auto-deploys. Most recent prod commit: `32f36eb` "Add og-image, favicon, logo ticker, and brand refinements".

There are **local uncommitted changes** on `main` (current session: client carousel restructure on /experience, mono-silhouette logo system, tidy pass — see "Branch state at handover" below). User confirms with "push" when ready.

Five saved memory rules at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` apply to every conversation — read them before touching copy or marks.

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

- **Working branch**: `main`.
- **Production**: `main` at `32f36eb`. Vercel auto-deploys main → `https://dabhands.delivery`.
- **Uncommitted local edits** to ship next push (current session — carousel restructure, mono-logo system, tidy pass):
  - `M pages/experience.tsx` — carousel section moved below "With deep experience across", changed to white bg; "Teams behind the work" changed to white bg; new self-hosted logos via `src` + `kind` + `boost`; semantic `<ul aria-label>` ticker; `useReducedMotion` guard; seamless `0% → -33.3333%` loop.
  - `M components/Header.tsx` — nav label `Work` → `Where we step in`.
  - `M components/TickerLogo.tsx` — refactored: single `src` prop (no more CDN slug), `kind: 'icon' | 'wordmark'`, `boost?: boolean`, always renders `<img>` with `brightness(0)` filter + `loading="lazy"` + `decoding="async"`.
  - `M package.json` / `package-lock.json` — removed `potrace` devDep.
  - `D components/LogoMark.tsx` — superseded by TickerLogo, removed.
  - `D scripts/trace-logos.js` (folder removed) — auto-tracing no longer used.
  - `D public/logo-preview.html` + `public/logos-preview.html` — temp sandbox files.
  - `D ~20 unused files in /public/images/logos/` — the auto-traced SVGs, old colour PNGs, and source artwork superseded by the colour-keyed mono PNGs in `/svg/`.
  - `?? public/images/logos/svg/*` — the active mono logo set (see "Client ticker logo system" below).

To ship to prod next time: `git add -A && git commit && git push origin main`. Vercel rebuilds in ~1–2 min.

## Site structure

### `/` (home) — `pages/index.tsx`

1. **Hero (P1)** (cream, centred) — H1 "**Keeping important work moving**" (single h2, `text-wrap: balance` wraps to "Keeping important / work moving" at desktop). Sub-paragraph beneath: "Important digital work can quickly lose momentum within complex organisations." + "We help **modern** brands get stronger digital work out into the world." Hero `Ribbon` (default `/images/ribbon.png`) positioned `top-[15px] md:top-auto md:bottom-0 w-full` — top on mobile, bottom on desktop.
2. **Often brought in around** (white) — eyebrow + 4-item icon grid (`builtForItems`): "Critical launches under pressure." / "Customer experiences fragmented across channels." / "Cross-functional initiatives losing momentum." / "Strategy and execution drifting apart." Icons: stopwatch / scattered dots / descending bars / diverging lines. 2×2 grid on desktop (md:col-span-6). Rendered as `<ul>` / `<li>`.
3. **Where we are** (charcoal, left-rag) — eyebrow + two statement blocks + supporting paragraph with 4 `<HandUnderline>` marks: `slows` · `technology` · `attention` · `budget`.
4. **Core Truth** (white, centred) — flashing-dot crown SVG above "Great work rarely fails at the idea stage." (See Brand marks.)
5. **Antidote** (cream, left-rag) — eyebrow "Where we help" + H2 "Dab Hands meets these problems head-on" + 6-tick list (rendered as `<ul>` / `<li>`, last item is "Commercially effective as it reaches market.") + **bold callout copy** "We help organisations get stronger digital work out into the world." with `BoxCTA "Where we step in"` to the right (stacks below on mobile). Spacing: `mt-20 md:mt-28` between tick list and bold copy; button uses `md:items-start` so it aligns to the top of the wrapped copy.
6. Footer (variant: **minimal**).

### `/where-we-step-in` — `pages/where-we-step-in.tsx` (nav label: "Where we step in")

1. **Hero** (cream, left-rag) — H1 "Where we step in" + bold sub + body + `sand-ripple.jpg` hard-anchored right + bottom (`h-[80%]`).
2. **When strong work survives the system** (white) — eyebrow "The outcome" + H2 + 3-item icon row (Attention / Connection / Conversion). Rendered as `<ul>` / `<li>`.
3. **If any of this feels familiar** (cream) — H2 + 6 numbered intervention items (rendered as `<ol>` / `<li>`). Each card's "Start a conversation →" link uses `mailto()` with the intervention title as the subject. **`sand-ripple.jpg` hard-anchored bottom-right at `h-[40%]`** (also bookends the page's hero motif; the previous Ribbon here was removed).
4. **Why expert delivery matters** (charcoal) — H2 with paired statements + `<HandUnderline>` on `ambition` · `execution`. Below: two stat blocks rendered as **`StatPopover`** components. Clicking/hovering the **60%** or **20–30%** number opens a popover with the richer HBR / McKinsey context. (`60%` copy: "Most companies realise only around 60% of the **potential value** of their strategies." / `20–30%` copy: "Estimated **operational waste** caused by inefficiency, rework, and fragmented systems.") The section's Ribbon is now wrapped in an `overflow-hidden` div so the section itself can stay `overflow-visible` and let the popover escape its bounds. Stats use a 12-col grid (`md:col-span-6` each) so the numbers sit on column 1 and column 7 lines of the page's underlying 12-col grid.
5. **Closing statement** (cream, centred) — `dab-hands-crown-mark.svg` (flashing 3 dots — see Brand marks) above "Backed by **20+** years of senior digital delivery." + subhead + BoxCTA "Experience".
6. Footer (variant: **minimal**).

### `/experience` — `pages/experience.tsx`

1. **Hero** (cream, left-rag) — H1 "Experience built under pressure" + `under-pressure.png` right-anchored full height.
2. **With deep experience across** (charcoal) — H2 + 5-col icon grid.
3. **I've worked at scale for** (**white**, left-rag) — scrolling client ticker. **Uses `<TickerLogo>`** with self-hosted SVGs/PNGs from `/public/images/logos/svg/` (no external CDN). See "Client ticker logo system" below for the full architecture.
4. **"Hi, I'm Darren"** (brown) — eyebrow "Who am I" + portrait + bio.
5. **The teams behind the work** (**white**) — eyebrow "Scaled when needed" + H2 + 3 body paragraphs + 3-tick list.
6. **Engagement shape** (charcoal, left-rag) — eyebrow + headline-styled statement "Brought in around critical launches, platform work, operational resets, and embedded delivery leadership." (renders as h2, max-w-[36ch], no icon/dot, standard left-aligned module).
7. **Trusted to lead important work** (brown) — H2 + 3 testimonials.
8. **Closing** (cream, centred) — "Let's get important work moving properly." + BoxCTA "Start a conversation".
9. Footer (variant: **minimal**).

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

## Components (`/components`)

- **`Layout.tsx`** — `<a href="#top" className="skip-link">Skip to content</a>` + `<Header>` + `<main id="top">` + `<Footer variant={footerVariant}>` + `<GridToggle>`.
- **`Header.tsx`** — fixed top, charcoal. Logo (animated breathing dot — see Brand marks) + nav + "Start a conversation" pill.
- **`Footer.tsx`** — Two stacked modules. Cream contact module renders "If something important needs to move properly, **let's talk**." (linked to /contact, green underline). Variants: `'default' | 'minimal' | 'none'`.
- **`FadeUp.tsx`** — scroll-triggered fade + 18px rise.
- **`BoxCTA.tsx`** — pill-shaped CTA. `tone="light"` / `tone="dark"`.
- **`Ribbon.tsx`** — atmospheric ribbon. Default `/images/ribbon.png`, customisable `imagePath`.
- **`RibbonAccent.tsx`** — smaller secondary accents from `ribbon_accents.png` (2×3 sprite). Used on /contact bottom-left.
- **`HandUnderline.tsx`** — hand-drawn SVG underline for emphasis on specific words.
- **`GridToggle.tsx`** — fixed-position dev tool, toggles 12-col overlay matching site container (gap-4 md:gap-6 lg:gap-8).
- **`StatPopover.tsx`** (NEW) — wraps a giant stat number as a button with green text + underline. Opens a popover with richer copy on hover (desktop, with 150ms close delay to allow crossing the gap) or click (touch — detected via `window.matchMedia('(hover: hover)')`). `align="start" | "end"` controls anchor edge. Click-outside + Escape close.
- **`SeoMeta.tsx`** (NEW) — per-page `<Head>` helper. Title, description, canonical, OG (title/desc/image/url/type/site_name), Twitter card, og:image:width=1200 / height=630 / alt. Defaults `image` to `/og-image.png`.
- **`TickerLogo.tsx`** — renders a brand mark for the experience ticker. Props: `src` (local path to SVG or PNG), `kind: 'icon' | 'wordmark'`, optional `boost`. Always renders `<img loading="lazy" decoding="async" style={{ filter: 'brightness(0)' }}>`. Sizing: icons + boosted wordmarks at `h-14`, regular wordmarks at `h-9 max-w-[180px] object-contain`.

## `lib/mailto.ts`

Centralises mailto generation. `mailto({ subject?, body? })` → `mailto:db@dabhands.delivery?subject=…&body=…`. Used by Header CTA, intervention "Start a conversation" links, Experience closing CTA, Contact email link.

## Brand tokens (`styles/globals.css` `@theme`)

| Token | Hex | Role |
|---|---|---|
| `dab-cream` / `dab-white` | `#F3F0EA` | Primary background |
| `dab-charcoal` | `#111111` | Primary text + dark sections |
| `dab-charcoal-alt` | `#171717` | Hover state |
| `dab-charcoal-soft` | `#4A4744` | Body text base in `:root` |
| `dab-green` | `#B6FF00` | Signal accent — sparing |
| `dab-brown` | `#ACA195` | Brown sections + light-bg hand underlines |
| `dab-brown-lighter` | `#C0B5A9` | Darren bio section |
| `dab-brown-light` | `#E8E3DC` | Unused |
| `dab-taupe` | `#8E877D` | Unused |
| `dab-warm` | `#E8D5C5` | Unused |

## Hard rules (saved to memory)

1. **No em dashes (—) in user-facing copy.**
2. **No neon green text on light backgrounds — ever.** Includes hover states.
3. **Brand is "Dab Hands"** — capital D, capital H, lowercase rest. File paths and Tailwind tokens are exempt.
4. **Geist sans throughout.** Label headings no full stops; truth-statement headings keep periods.
5. **Hand markup is "proof of care", not decoration.** Editorial/technical tone — never sketchbook / agency / expressive. `dab-green` on dark, `dab-brown` or `dab-charcoal` on light.

## Brand marks & micro-animations

- **Brand dot** — the green dot in the "Dab Hands" wordmark (Header, Footer logo, plus any standalone usage). Uses `.brand-dot` class from `globals.css`:
  - Pulsing breathing animation `brand-dot-breathe` — 4.5s ease-in-out infinite. Scales 1 → 1.14, colour drifts vibrant `var(--color-dab-green)` ↔ softer `#D9E89A`.
  - `prefers-reduced-motion: reduce` → animation disabled.
  - Locked to **14px** everywhere (matches the header logo's resting size).
- **Crown mark** (`/public/images/dab-hands-crown-mark.svg`) — line-art crown. Used on home Core Truth section + where-we-step-in closing. The 3 accent dots have **SMIL `<animate>` flash** on opacity 1 → 0.2 → 1 over 1.8s, all three in sync. Colour stays inherited from `currentColor` (charcoal in context).
- **Calibration mark** (`/public/images/dab-hands-calibration-mark.svg`) — alternate registration-style mark. Currently unused on pages; available as a sibling option.
- **Compass mark** (`/public/images/dab-hands-compass-mark.svg`) — experimental, currently unused.

## Hand-mark system

`HandUnderline` instances (delay seconds shown in parens; all reveal AFTER the copy lands — fade-in, not draw-on):

- **Home WHERE WE ARE**: `slows` (1.2) · `technology` (1.35) · `attention` (1.5) · `budget` (1.65) — green on charcoal.
- **WWSI Why expert delivery matters H2**: `ambition` (1.2) · `execution` (1.4) — green.
- **WWSI stats**: `potential value` (1.1) · `operational waste` (1.3) — green.
- **Experience closing**: `moving properly` — currently NOT underlined (was previously, removed in iteration).

## Optical alignment rule

`styles/globals.css` adds `margin-left: -0.04em` to all `h1–h6`. Geist at large display sizes has noticeable side-bearing on letters like "E" / "W" — this nudges every heading visually left to align with the body copy column. Scales naturally with font-size via `em`.

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
