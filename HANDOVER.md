# Dab Hands Website — Handover

Pick this up cold. Captures the project as of the most recent session.

## Read this first

Multi-page site (Home / Work / Experience / Contact). The site is **on production** — `main` was force-fast-forwarded from `restructure/multi-page` at commit `b96ca9e` ("Copy, sign-off flow, mailto CTAs, asset swaps across all pages"). Further uncommitted iteration has happened since (see "Branch state" below).

Five saved memory rules at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` apply to every conversation — read them before touching copy or marks.

## Stack

- **Next.js 16.2.6 (Pages Router)** — `AGENTS.md` warns it has breaking changes vs training data; read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme` directive). Custom utilities at the bottom of `styles/globals.css`.
- **Framer Motion 12** for scroll-triggered fade-ups, ribbon drift, and hand-mark reveals.
- **TypeScript**. Run `npx tsc --noEmit` after non-trivial edits.
- **Fonts**: Geist + Geist Mono via `next/font/google` in `pages/_app.tsx`.

## Dev workflow

- User runs `npm run dev` themselves on port 3000.
- `.claude/launch.json` has `autoPort: false`. The preview tool can attach to port 3000 (worked during the recent session).
- Verification via `preview_eval` / `preview_screenshot` works but the preview tab is often "hidden" — DOM measurements return 0 width/height in that state. Force a screenshot to get a real render, or just trust the class names on the elements.

## Branch state at handover

- **Working branch**: `restructure/multi-page`
- **Production**: `main` is at `b96ca9e` — pushed directly via `git push origin restructure/multi-page:main` after the user said "Just push please". Vercel auto-deploys main → `https://dabhands.delivery`.
- **Uncommitted edits** on `restructure/multi-page` since `b96ca9e` (today's iteration: hand-mark system, footer restructure, image-anchor rules, copy iterations, crown mark, grid toggle). User hasn't asked to commit/push them yet — only commit when explicitly asked.
- `.gitignore` was updated to exclude `.claude/` (local Claude state).

To ship to prod next time: `git push origin restructure/multi-page:main` (fast-forward) is what the user prefers — no PR ceremony.

## Site structure

### `/` (home) — `pages/index.tsx`

1. **Hero** (cream, centred) — H1 "Senior digital / delivery for / high-stakes work" (3 forced spans). Below: "Important digital work can lose momentum quickly inside complex organisations." + "We help organisations get stronger digital work out into the world." with a **mobile-only `<br className="sm:hidden" />` before "digital"** so it breaks at "stronger / digital..." on phones. Large hero `Ribbon` repositioned `top-[15px] md:top-auto md:bottom-0` — sits at the top on mobile, bottom on desktop.
2. **Where we are** (charcoal, left-rag) — eyebrow "Where we are". Two `<motion.div>` statement blocks: "The tools are changing. / The problems aren't." (with `md:whitespace-nowrap!` so each clause stays on one line at desktop) and "Complexity is higher than ever." Both with `block w-10 h-px bg-dab-green` rule underneath. Four supporting lines in two paragraphs with **four `<HandUnderline>` marks**: `slows` (1.2s) → `technology` (1.35s) → `attention` (1.5s) → `budget` (1.65s). Copy now reads "Inside organisations, friction slows the work. The role of new technology is still being worked out. Outside, competition for attention is relentless. // More of the right work needs to get through. And more of the budget needs to go into the work itself."
3. **Core Truth** (**bg-white**, centred) — Has a **hand-drawn SVG crown** above the headline (3 V-peaks + base line + 3 open circles in `dab-brown`). H2 "Great work rarely fails / at the idea stage." Below: a single merged paragraph at `text-2xl md:text-3xl font-medium` — "It fails as it moves through the organisation.<br /> What started strong arrives weaker than it should have been." (the soft break is hard, intentional). The "Teams fragment / Momentum slows / Execution weakens" trio was removed.
4. **Antidote** (cream, left-rag) — H2 "Dab Hands meets these problems head-on" + 5 tick items + closer "Keeping important work aligned, moving, and commercially effective as it goes to market with impact." + the punchy follow-up "We help organisations get stronger digital work out into the world." (at `text-[32px] md:text-[48px] lg:text-[60px] font-bold leading-[1.05]`) + BoxCTA "Where we step in" right-aligned. Antidote `Ribbon` is now wrapped in a clip container so its left edge is bounded — won't run under the headline/checklist column.
5. Footer (variant: **minimal**).

### `/where-we-step-in` — `pages/where-we-step-in.tsx` (nav label: "Work")

1. **Hero** (cream, left-rag) — H1 "Where we step in" + bold subhead "We help organisations get stronger digital work out into the world." + body "Built for complex initiatives where strategy, creative, product, platforms, and customer experience need to move together at pace." `sand-ripple.jpg` image (user's own asset) anchored `right-0 bottom-0 h-[80%] w-auto max-w-none` — fills 80% of section height across all breakpoints, right + bottom anchored, no off-screen bleed.
2. **When strong work survives the system** (**bg-white**) — eyebrow "The outcome" + H2 + 3-item icon row: Attention / Connection / Conversion. Background changed from brown to white per the user.
3. **If any of this feels familiar** (cream) — was "Intervention points". 6 expanded numbered items (no accordion). Each card's inline "Start a conversation →" link uses `mailto()` with **the intervention title as the subject** (e.g. `?subject=Critical%20work%20drifting`). `Ribbon` fragment now anchored **bottom-right** (was bottom-left).
4. **Why expert delivery matters** (charcoal) — was "The execution gap". H2 with paired statements: "Technology is accelerating quickly. / Human systems are not." (mb-10 gap separator) then "Most businesses do not lose on `ambition`. / They lose through `execution`." with `<HandUnderline>` on **ambition** and **execution** only (Technology and systems are not underlined per latest iteration). Each line uses `<span className="block mb-4 md:mb-5">` for controlled spacing. Below: 60% (HBR) and 20–30% (McKinsey) stat blocks with `<HandUnderline>` on **successfully realised** and **execution inefficiencies**.
5. **Closing statement** (cream, centred) — "Backed by 20 years of senior digital delivery." (big) + "We help organisations get stronger digital work out into the world." (smaller, charcoal/75) + BoxCTA "Experience".
6. Footer (variant: **minimal**).

### `/experience` — `pages/experience.tsx`

1. **Hero** (cream, left-rag) — eyebrow "Where I've come from" + H1 "Experience built under pressure" + intro "Large-scale digital delivery experience shaped across global brands, complex platforms, campaigns, and customer experience programmes." (`under-pressure.png` image right-anchored: `right-0 top-0 bottom-0 h-full w-auto max-w-none` — full section height, anchored right at every breakpoint. Opacity `40 / 65 / 90` across mobile / sm / md+ + a `mask-image: linear-gradient(to top left, full 30%, 20% 100%)` to fade the upper-left where text overlaps, preserving WCAG contrast.)
2. **I've worked at scale for** (charcoal, left-rag) — was "Worked at scale on". Scrolling client logo carousel (10 PNGs from `/public/images/logos/`, rendered at native colour — the logos are already white-on-transparent). No CSS filter applied.
3. **With deep experience across** (charcoal) — was "Where I've worked", now **moved up** to sit directly below the logo ticker. Single H2 (with `md:whitespace-nowrap!` so it stays one line on desktop, wraps on mobile) + 5-col icon grid. The mid-page "Start a conversation" CTA was removed.
4. **Darren Brett "Who am I"** (brown) — eyebrow "Who am I" + heading "Hi, I'm Darren" (no surname now) + 12-col grid: portrait `IMG_0064 _ sq.jpeg` (square crop) in `md:col-span-4` with **a `dab-brown` mix-blend-multiply overlay at 40% opacity** to harmonise tone, bio in `md:col-span-7 md:col-start-6`. Bio now ends with "Understanding how people, systems, and emerging technologies work together under pressure, and helping strong work stay strong as it moves to market." (replaced "Bringing the right people together..."). RibbonAccent removed.
5. **The teams behind the work** (cream) — H2 + 3 separated paragraphs ("People I have delivered with for years." / "Leaders in their fields." / "Brought in around the initiative when needed.") + 3 tick items.
6. **Trusted to lead important work** (brown) — H2 + 3 testimonials.
7. **Closing** (cream, centred) — "Let's get important work `moving properly`." with `<HandUnderline stroke="var(--color-dab-charcoal)">` on "moving properly" (charcoal on cream — most accessible). Uses `text-wrap: balance` (via inline `style` since globals.css `p { text-wrap: pretty }` overrides Tailwind utility) + a non-breaking space inside the HandUnderline children so "moving properly" never widows. BoxCTA "Start a conversation" → `mailto()`.
8. Footer (variant: **minimal**).

### `/contact` — `pages/contact.tsx`

1. **Hero** (cream, left-rag) — H1 "Let's talk" + intro "For critical digital initiatives that need to move properly, reach out directly." + Email / Phone / LinkedIn link grid. RibbonAccent variant 5 bottom-left.
2. Footer (variant: **none**) — the cream contact module is **entirely hidden** on /contact so the page doesn't duplicate the contact details. Only the small charcoal copyright bar shows.

## Components (`/components`)

- **`Layout.tsx`** — wraps every page. `<Header>` + `<main>` + `<Footer variant={footerVariant}>` + `<GridToggle>`. Accepts a `footerVariant?: FooterVariant` prop.
- **`Header.tsx`** — fixed top, `bg-dab-charcoal`. Logo left, desktop nav center-right (`Work` · `Experience` · `Contact`), **"Start a conversation" pill CTA** to the right of the nav (`mailto()` href, cream border, green arrow, cream-fill on hover). Mobile hamburger menu unchanged.
- **`Footer.tsx`** — Two stacked modules:
  - **Cream contact module**: bg now `bg-dab-charcoal` (was cream then green then back). Renders "If something important needs to move properly, **let's talk**." — "let's talk" is an internal `<Link href="/contact">` with `text-dab-green underline underline-offset-[6px]`. Padding `py-7 md:py-9` (compact). Contact details (Darren / email / phone) are **removed** from the footer module — the "let's talk" link now drives to /contact instead.
  - **Charcoal copyright bar**: has `border-t border-dab-cream/15` hairline above. Wordmark + LinkedIn icon (`/images/logos/linkedin-app-white-icon.webp`) + © text.
  - **Footer variants**: `'default' | 'minimal' | 'none'`.
    - `default`: shows "We help organisations…" line + "Start a conversation" BoxCTA above the "let's talk" line.
    - `minimal`: only the "let's talk" line (used on Home, Work, Experience).
    - `none`: hides the entire cream contact module (used on Contact). Only the copyright bar remains.
- **`FadeUp.tsx`** — `motion.div` with scroll-triggered fade + 18px rise. `delay` and `className` props.
- **`LogoMark.tsx`** — brand-logo `<img>` with SVG/CDN fallback. Used only on `/experience` proof strip (the imported but unused-pattern — the logo carousel uses inline `<img>` not this component).
- **`BoxCTA.tsx`** — pill-shaped CTA. `tone="light"` (default) + `tone="dark"`. Accepts any `href` (works with `mailto:` strings).
- **`Ribbon.tsx`** — large atmospheric ribbon. Default `/images/ribbon.png`, customisable via `imagePath`. Props: `className`, `opacity` (default 0.45), `flip`, `drift` (default 24), `driftDirection`, `tone` (`'light'` | `'dark'`), `imagePath`.
- **`RibbonAccent.tsx`** — smaller secondary accents from `ribbon_accents.png` (2×3 grid, variants 1–6).
- **`RibbonMotif.tsx`** — UNUSED legacy SVG motif. Kept as a fallback only.
- **`HandUnderline.tsx`** — **new**. Renders a hand-drawn SVG underline beneath its children. Props:
  - `delay` (seconds, default 1.2) — reveal delay after viewport entry
  - `variant` (1–4) — 4 different path shapes for natural variation across instances
  - `tone` (`'dark'` | `'light'`, default `'dark'`) — `dark` = `dab-green` on charcoal/brown bgs, `light` = `dab-brown` on cream/white bgs
  - `stroke` (string) — full override, takes precedence over `tone`
  - **Smart offset rule**: if the resolved stroke is `dab-charcoal` (same colour as body text), the underline auto-offsets to `-bottom-[8px]` instead of the default `-bottom-[3px]` so descenders don't visually touch the line. Encoded inside the component.
  - SVG is `viewBox="0 0 100 8" preserveAspectRatio="none"` so it stretches to match word width.
- **`GridToggle.tsx`** — **new dev tool**. Fixed-position pill button bottom-right of every page ("GRID · OFF" / "GRID · ON"). Click toggles a 12-column overlay that matches the site container (`max-w-screen-xl` + responsive padding + `gap-4 md:gap-6 lg:gap-8`). Columns rendered as faint `dab-green/10` blocks. Mounted in `Layout.tsx` so it's always available.

## `lib/mailto.ts` — **new**

Centralises the "Start a conversation" mailto pattern.

```ts
mailto()                                  // → default subject + body
mailto({ subject: 'Critical work drifting' })  // override subject
```

Defaults: `subject = "Starting a conversation"`, `body = "I want to get stronger digital work into the world."`, recipient = `db@dabhands.delivery`.

Used by: Header CTA, Experience closing CTA, all 6 WWSI intervention CTAs (each carries its own intervention title as the subject), Contact page email link, Footer default-variant CTA + email link.

## Brand tokens (`styles/globals.css` `@theme`)

| Token | Hex | Role |
|---|---|---|
| `dab-cream` / `dab-white` | `#F3F0EA` | Primary background |
| `dab-charcoal` | `#111111` | Primary text + dark sections (not pure black) |
| `dab-charcoal-alt` | `#171717` | Footer copyright bar hover state |
| `dab-green` | `#B6FF00` | Signal/acid accent — very sparing |
| `dab-taupe` | `#8E877D` | Mostly unused |
| `dab-brown` | `#ACA195` | Brown sections + light-bg hand underlines |
| `dab-brown-light` | `#E8E3DC` | Used briefly on the carousel experiment; now unused |
| `dab-warm` | `#E8D5C5` | Unused |

## Hard rules (saved to memory)

1. **No em dashes (—) in user-facing copy.**
2. **No neon green text on light backgrounds — ever.** Includes hover states (`hover:text-dab-green` on cream is also forbidden). The memory file explicitly notes the contact-page hover failure that established this rule.
3. **Brand is "Dab Hands"** — capital D, capital H, lowercase rest. File paths and Tailwind tokens are exempt.
4. **Geist sans throughout.** Label headings no full stops; truth-statement headings keep periods.
5. **Hand markup is "proof of care", not decoration.** Tertiary visual layer after typography and ribbon atmosphere. Editorial/technical tone (architectural notation, editorial markup) — never sketchbook / agency / expressive. Use sparingly. On mobile, favour underlines + brackets + directional gestures over precise word circles. `dab-green` on dark, `dab-brown` on light (or `dab-charcoal` for max contrast when the brief calls for accessibility).

## Hand-mark system

The site uses two kinds of hand marks now:

- **HandUnderline**: applied to specific words/phrases for emphasis. Active instances:
  - Home WHERE WE ARE: `slows` · `technology` · `attention` · `budget` (green, sequential 1.2s → 1.65s reveal)
  - WWSI Why expert delivery matters H2: `ambition` · `execution` (green)
  - WWSI stats: `successfully realised` · `execution inefficiencies` (green)
  - Experience closing: `moving properly` (charcoal — most accessible on cream)
- **One-off mark (crown)**: hand-drawn SVG above "Great work rarely fails / at the idea stage." (home Core Truth section). `dab-brown` stroke, slightly imperfect 3-peak zigzag with base line + 3 open peak circles. Animates in with the existing headline FadeUp.

Animation rule: marks animate **after** the copy lands (fade-in + small lift, no draw-on stroke animation — that reads as agency/illustrative). Most underlines use a 1.2s delay (≈ FadeUp 0.5s + ~0.7s pause).

## Image-anchor rules

Two hero images now follow the **same simple rule** at every breakpoint:

- **`sand-ripple.jpg` on /where-we-step-in hero**: `absolute right-0 bottom-0 h-[80%] w-auto max-w-none` + opacity progression `50 / 75 / 100`. Fills 80% of section height, anchored right + bottom.
- **`under-pressure.png` on /experience hero**: `absolute right-0 top-0 bottom-0 h-full w-auto max-w-none` + opacity `40 / 65 / 90` + `mask-image: linear-gradient(to top left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.2) 100%)`. Fills full section height, right-anchored, with mask fading upper-left where text overlaps for accessibility.

**Important Tailwind v4 gotcha**: `img` has `max-width: 100%` via preflight. You MUST add `max-w-none` for any image wider than its container (which both of these are).

## Typography gotchas

- `globals.css` sets `h1–h6 { text-wrap: balance }` and `p { text-wrap: pretty }` unlayered → these win over Tailwind utilities. Use **inline style** (`style={{ textWrap: 'balance' }}`) or `!important` modifier (`md:whitespace-nowrap!`) to override.
- For widow control on closing lines: use **inline `text-wrap: balance` + non-breaking space** (`{' '}` or `&nbsp;`) between the last two words. Belt-and-braces.
- `<br className="sm:hidden" />` is the pattern for mobile-only forced breaks.

## Common gotchas (cont'd)

- The page `<title>` and mobile menu footer text still reference "Dab Hands. Digital Delivery, Handled." Update those if you change brand styling.
- `RibbonMotif` is defined but unused; if you delete it, make sure nothing else imports it (currently nothing does).
- The `clients` array (brand logos) lives at the top of `pages/experience.tsx`. Logos are white-on-transparent PNGs in `/public/images/logos/` — no filter applied (they're already white).
- LinkedIn icon: `/images/logos/linkedin-app-white-icon.webp` (no filter needed; native white).
- Image sizing > 100% width requires `max-w-none` due to Tailwind v4 preflight.
- The grid toggle button is always visible on every page in dev AND production. If you want it dev-only later, gate it on `process.env.NODE_ENV === 'development'` inside `Layout.tsx`.
- Preview tab often "hidden" — DOM measurements return 0. Force `preview_screenshot` to render, or just trust the class names.

## Working style

- User iterates fast in small, specific edits. Don't pre-emptively redesign neighbouring sections when they ask about one thing.
- Each page has a sign-off + CTA to the next page in the flow: Home → Work → Experience → Contact. Contact is terminal.
- Footer variants stay coordinated with the sign-off flow — `minimal` on pages that have their own CTA, `none` on /contact itself.
- When the user shares a design system / typography / colour document, treat it as a reference refresher. Diff it against the current build and flag only the drifts.
- Be honest about what you can and can't do. If a request needs external assets (real brand SVG logos, photographs, etc.), wire the structure and ask them to supply the file.
- For exploratory questions ("what do you think?"), respond in 2–3 sentences with a recommendation + main tradeoff. Don't implement until they agree.
