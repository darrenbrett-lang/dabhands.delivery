# Dab Hands Website — Handover

Pick this up cold. Captures the project as of the most recent session.

## Read this first

The site has been restructured from a long single-page site into a **four-page editorial multi-page experience**. The previous handover described section-by-section structure for the old single-page; that's gone. See "Site structure" below.

There are also four saved memory rules at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` that apply to every conversation about this codebase — read them before touching copy.

## Stack

- **Next.js 16.2.6 (Pages Router)** — `AGENTS.md` warns it has breaking changes vs training data; read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme` directive). Custom utilities at the bottom of `styles/globals.css`.
- **Framer Motion 12** for scroll-driven fade-ups and the ribbon's slow horizontal drift.
- **TypeScript**. Run `npx tsc --noEmit` after non-trivial edits.
- **Fonts**: Geist + Geist Mono via `next/font/google` in `pages/_app.tsx`.

## Dev workflow

- User runs `npm run dev` themselves on port 3000.
- `.claude/launch.json` has `autoPort: false`. **The preview tool cannot take port 3000.** Skip preview verification cleanly and trust their hot reload.
- They hard-refresh to confirm changes.

## Branch state at handover

- Working branch: `restructure/multi-page`
- Main is behind (last sync was the single-page polish at `d5276d2`).
- The restructure branch carries the full multi-page rewrite — pending review before merging to main and deploying to prod.
- There are **uncommitted edits** on the branch at handover time (further iteration since the foundation commit `6e05db0`). User has not asked to commit/push them yet — only commit when explicitly asked.

To ship to prod: `git checkout main && git merge restructure/multi-page && git push origin main`. Vercel auto-deploys main → `https://dabhands.delivery`.

## Site structure

Four pages:

### `/` (home) — `pages/index.tsx`

1. **Hero** (cream bg, centred) — H1 "Senior digital delivery / for high-stakes work" (forced 3-line wrap: `Senior digital` / `delivery for` / `high-stakes work`). Two body lines below. Large hero `Ribbon` at bottom (atmospheric, `opacity={0.4}`).
2. **Where we are** (charcoal bg, left-rag) — kept eyebrow "Where we are" (the one carve-out for keeping an eyebrow). Two big statement blocks with green underline rules: "The tools are changing. / The problems aren't." and "Complexity is higher than ever." Four supporting lines below in two paragraphs.
3. **Core Truth** (cream bg, centred — emotional truth moment) — "Great work rarely fails / at the idea stage." → "It fails as it moves through the organisation." (with `text-wrap: balance` applied) → "Teams fragment. / Momentum slows. / Execution weakens." → "What started strong arrives weaker than it should have been."
4. **Antidote** (cream bg, left-rag) — H2 "Dab Hands meets these problems head-on" + 5 tick items: (1) "Stronger alignment around important work." (2) "Faster movement through complexity." (3) "Higher-quality execution." (4) "More impact from existing investment." (5) "Senior capability without traditional agency weight." + closer "Keeping important work aligned, moving, and commercially effective as it goes to market with impact." + BoxCTA "Where we step in" (right-aligned). `Ribbon` fragment positioned at `top-[35%] right-[8%] w-[56%] lg:w-[48%]` (hidden md:block, `opacity={0.25}`, `drift={12}`).
5. Footer.

### `/where-we-step-in` — `pages/where-we-step-in.tsx`

1. **Hero / Built for** (cream, left-rag — consolidated module) — H1 "Where Dab Hands steps in" + two intro lines: (1) "Dab Hands is built around important work that cannot afford to drift." (2) "Built for complex initiatives where strategy, creative, product, platforms, and customer experience need to move together at pace."
2. **Our work creates** (brown) — eyebrow "Our work creates" above 3-item icon row: Attention / Connection / Conversion.
3. **Intervention points** (cream) — 6 expanded items (no accordion — all visible). Each is a 2-col layout: number + title left, body + mini-link "Start a conversation →" right. `Ribbon` fragment at bottom-left.
4. **The execution gap** (charcoal) — H2 "Most businesses do not lose on ambition. They lose through execution." + 60% (Harvard Business Review) and 20–30% (McKinsey & Company) stats. Stats numbers are `text-dab-cream` (not green per the rules). `Ribbon` fragment behind stats, `tone="dark"`.
5. **Closing statement** (cream, centred) — "We help organisations get stronger digital work out into the world." + BoxCTA "Experience" centred. `Ribbon` fragment positioned at bottom-center using fuller-ribbon.png via `imagePath` prop.
6. Footer.

### `/experience` — `pages/experience.tsx`

1. **Hero** (cream, left-rag) — eyebrow "Where I've come from" + H1 "Experience built under pressure" + intro "More than 20 years leading complex digital delivery across platforms, campaigns, and customer experience for global brands."
2. **Worked at scale on** (charcoal, left-rag) — eyebrow "Worked at scale on" + scrolling logo carousel (Framer Motion, `duration: 40`, `repeat: Infinity`). Displays 10 clients as repeated tiles: Nike, Volkswagen, Audi, Hugo Boss, Tommy Hilfiger, Unilever, Johnson & Johnson, Royal Mail, Parcelforce, Palantir. Logos are PNG files in `/public/images/logos/` with filename mapping (e.g., `hugoboss` slug → `hugo-boss.png` filename). Images have `onError` handler to hide broken links. Height fixed at `h-10 md:h-14` with `object-scale-down` to maintain aspect ratios.
3. **Darren Brett** (brown) — 12-col grid: portrait image (`/images/IMG_0064.jpeg`) in `md:col-span-3`, biography text in `md:col-span-8 md:col-start-5`. Bio includes heading "Hi, I'm Darren Brett" + 6 paragraphs covering experience, agency leadership, role breadth, DAB Hands model, and call-to-action. `RibbonAccent` variant 4 hidden on mobile, positioned bottom-right with `opacity={0.25}`, `drift={12}`.
4. **The teams behind the work** (cream) — H2 + body + 3 tick items (Small senior teams / Clear accountability / Built around the work itself).
5. **Trusted to lead important work** (brown) — H2 + 3-column testimonial layout (data in `testimonials` array with 3 quotes from Joel Sinnott / Anthony Mahon / Meher Mumtaz).
6. **Where I've worked** (charcoal) — H2 "Where I've worked" + intro copy + 5-col icon grid: Platform and e-commerce / Digital brand experience / Campaigns and launches / Membership and lifecycle / Cross-functional delivery leadership. Includes a `BoxCTA href="/contact"` "Start a conversation" (`tone="dark"`) right-aligned at the bottom.
7. Footer.

### `/contact` — `pages/contact.tsx`

1. **Hero** (cream, left-rag) — H1 "Let's talk" + intro + 3-card grid: Email / Phone / LinkedIn. `RibbonAccent` variant 5 bottom-left.
2. Footer.

## Components (`/components`)

- **`Layout.tsx`** — wraps every page; renders `<Header>` + `<main id="top">{children}</main>` + `<Footer>`. Imported in each page.
- **`Header.tsx`** — fixed top, `bg-dab-charcoal`, green dot logo + "Dab Hands" wordmark left, desktop nav right (`/where-we-step-in` · `/experience` · `/contact`), mobile hamburger. Active route gets `text-dab-cream` (vs `text-dab-cream/55`).
- **`Footer.tsx`** — two stacked modules: (1) cream contact module "If something important needs to move properly, let's talk." + name/email/phone row + `Ribbon` fragment at bottom-center using `imagePath="/images/fuller-ribbon.png"` (every page). (2) dark bottom strip with wordmark, LinkedIn icon, copyright. The green CTA bar has been removed.
- **`FadeUp.tsx`** — `motion.div` with scroll-triggered fade + 18px rise. `delay` and `className` props.
- **`LogoMark.tsx`** — brand-logo `<img>` that tries `/images/logos/{slug}.svg` first, falls back to `cdn.simpleicons.org/{slug}/ffffff`, then renders null. Uses `filter: brightness(0) invert(1)` to force white. Used only on `/experience` proof strip.
- **`BoxCTA.tsx`** — pill-shaped page-to-page CTA. `tone="light"` (default, for cream/light sections): charcoal border + charcoal text + charcoal arrow → on hover, fills charcoal with cream text and the arrow turns green (signal moment on dark). `tone="dark"` (for charcoal sections): cream border + cream text + green arrow at rest → on hover, fills cream with charcoal text and arrow.
- **`Ribbon.tsx`** — large/medium atmospheric ribbon (defaults to `/images/ribbon.png`, can be customized via `imagePath` prop). Uses `mix-blend-multiply` on light bgs so the JPEG's white background drops out and only the soft greyscale ribbon + green tip show. `tone="dark"` inverts the image and hue-rotates (preserves green tip) + `mix-blend-lighten` so it works on charcoal bgs. Motion is a subtle scroll-tied horizontal drift (`drift` px, no loops, no parallax-heavy). Props: `className`, `opacity` (default 0.45), `flip`, `drift` (default 24), `driftDirection` (`'right'` | `'left'`), `tone`, `imagePath` (default `/images/ribbon.png`).
- **`RibbonAccent.tsx`** — smaller secondary accents. Crops `/images/ribbon_accents.png` (a 2×3 grid of 6 strands) via CSS `background-size: 200% 300%` + `background-position`. Variant prop `1`–`6` maps to the cells (`1`=tl, `2`=tr, `3`=ml, `4`=mr, `5`=bl, `6`=br). Default aspect ratio `2.3/1`. Same `tone`/`flip`/`drift` controls as `Ribbon`. Default opacity `0.3`.
- **`RibbonMotif.tsx`** — older SVG-based motif (procedurally drawn 13 ribbon paths converging to a green dot). **Currently unused** — kept as a fallback. The image-based `Ribbon` superseded it.

## Brand tokens (`styles/globals.css` `@theme`)

| Token | Hex | Role |
|---|---|---|
| `dab-cream` / `dab-white` | `#F3F0EA` | Warm off-white. Primary background (≈80–85% of site). |
| `dab-charcoal` | `#111111` | Soft deep charcoal. Primary text + dark section bg. **Not pure black.** |
| `dab-charcoal-alt` | `#171717` | (Largely unused.) |
| `dab-green` | `#B6FF00` | Signal/acid accent. **Very sparing.** |
| `dab-taupe` | `#8E877D` | Warm grey secondary. Separators, supporting UI. |
| `dab-brown` | `#ACA195` | Medium warm brown. Used for portrait section, testimonials, Attention/Connection/Conversion. |
| `dab-brown-light` | `#E8E3DC` | Mostly unused. |
| `dab-warm` | `#E8D5C5` | Peach cream from the portrait halo. Currently unused. |

Defaults: `--background: #F3F0EA`, `--foreground: #111111`.

The legacy `.signal-rule` CSS class on line 69 of `globals.css` still hard-codes `#B7FF00` (old green). Inconsistent with the token — fix if you touch it.

## Hard rules (saved to memory)

1. **No em dashes (—) in user-facing copy.** Use commas, full stops, or restructure. (`feedback_no_em_dashes.md`)
2. **No neon green text on light backgrounds — ever.** Strictly enforced. The `BoxCTA` variant system encodes this: green elements only appear when the background is dark (charcoal or brown). On cream/white, green can appear as decorative **lines** (signal hairlines, statement underline rules) but never as text. (`feedback_no_green_text_on_white.md`)
3. **Brand is "Dab Hands"** — capital D, capital H, lowercase rest. Wordmark in the header/footer is styled `<span class="font-bold">Dab</span> Hands`. Apply to every user-facing string. File paths, code identifiers, and the Tailwind color tokens (`dab-cream`, `dab-charcoal`, etc.) are exempt. (`feedback_dab_hands_titlecase.md`)
4. **Geist sans throughout.** No display fonts, no serifs. **Label headings have no full stops** ("A senior-led delivery model", "Let's talk", "Where we step in", "Trusted to lead important work"). **Truth-statement headings keep periods** for cadence ("Great work rarely fails at the idea stage.", "Complexity is higher than ever.", "Teams fragment."). (`feedback_typography_principles.md`)

## Alignment system

Hybrid:

- **Centred**: hero sections, emotional truth statements, cinematic pauses, large positioning statements, final CTA modules, closing statements.
- **Left-aligned**: operational content, accordion-style lists, proof points, testimonials, capability sections, supporting copy.

Concretely: home hero + Core Truth + Where We Step In closing statement + Experience section headings + cream footer contact module are centred. Everything else is left-rag.

## Typography

- Body text: `text-xl` (20px) at all viewports, full `text-dab-charcoal` / `text-dab-cream` (no opacity dimming).
- Eyebrows: `font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60` (or `cream/55` on dark). Currently active eyebrows: "Where we are" (home), "Where I've come from" (experience hero), "Worked at scale on" (experience logo ticker), "Our work creates" (where-we-step-in attention/connection/conversion), and "The execution gap" (where-we-step-in stats section).
- Headings: `font-semibold`, tight tracking (`-0.022em` to `-0.03em` depending on size), `leading-[1.02]` to `[1.04]`. No full stops on labels (see rule 4).

## Ribbon system

The flowing ribbon is the core atmospheric brand device. Use sparingly. The site should remain mostly typography and whitespace. Ribbons should feel *"movement continuing quietly underneath the system"* — never decorative, never wallpaper.

Current placements:
- Home hero — `Ribbon` (large, bottom, `opacity={0.4}`)
- Home Antidote — `Ribbon` (fragment, positioned `top-[35%] right-[8%] w-[56%] lg:w-[48%]`, `opacity={0.25}`, `drift={12}`)
- Where We Step In Intervention points → Execution gap transition — `Ribbon` fragment
- Where We Step In Execution gap (behind stats) — `Ribbon` fragment, `tone="dark"`
- Where We Step In Closing statement — `Ribbon` (bottom-center, `imagePath="/images/fuller-ribbon.png"`)
- Experience logo ticker — no ribbon
- Experience Darren Brett — `RibbonAccent` variant 4 (hidden md:block, `opacity={0.25}`, `drift={12}`)
- Contact (bottom) — `RibbonAccent` variant 5
- Footer cream contact module — `Ribbon` (bottom-center, `imagePath="/images/fuller-ribbon.png"`, every page)

When adding more: hide on mobile (`hidden md:block`), use very low opacity (0.18–0.35), crop off the section edge, and avoid symmetrical placement.

## File map

```
pages/
  index.tsx                    Home
  where-we-step-in.tsx         (was how-it-works.tsx — renamed)
  experience.tsx
  contact.tsx
  _app.tsx                     Font wiring + Layout
  _document.tsx

components/
  Layout.tsx                   Header + main + Footer wrapper
  Header.tsx                   Fixed nav + mobile menu
  Footer.tsx                   Green CTA bar + cream contact + dark strip
  FadeUp.tsx                   Scroll-triggered fade animation
  LogoMark.tsx                 Brand logo with SVG/CDN fallback
  BoxCTA.tsx                   Page-to-page pill CTA (light/dark tones)
  Ribbon.tsx                   Main atmospheric ribbon (ribbon.png)
  RibbonAccent.tsx             Secondary accents (ribbon_accents.png, 6 variants)
  RibbonMotif.tsx              UNUSED — SVG-based legacy motif

public/images/
  IMG_0064.jpeg                Darren Brett portrait (current, B&W)
  IMG_3912.jpeg                Old Darren portrait (replaced — keep for now)
  flow.jpeg                    Original ribbon photo (unused now)
  ribbon.png                   User-supplied ribbon for Ribbon component (default)
  fuller-ribbon.png            User-supplied fuller ribbon for footer / closing sections
  ribbon_accents.png           User-supplied 2×3 sheet for RibbonAccent
  logos/                       Brand logo PNG files (Nike, VW, Audi, Hugo Boss, Tommy Hilfiger, Unilever, J&J, Royal Mail, Parcelforce, Palantir)

public/logos/
  linkedin.png                 Black LinkedIn glyph (used in dark footer, white via filter)

styles/globals.css             @theme tokens + h1–h6 rules + .signal-rule, .dot-grid
.claude/launch.json            Local dev port config (port 3000, autoPort: false)
```

## Common gotchas

- The page `<title>` and mobile menu footer text reference "Dab Hands. Digital Delivery, Handled." Update those if you change brand styling.
- `text-wrap: balance` is set on h1–h6 and `text-wrap: pretty` on `p` globally — don't fight these with explicit `<br/>` unless you want to override the balanced wrap.
- `RibbonMotif` is defined but unused; if you delete it, make sure nothing else imports it (currently nothing does).
- The `clients` array (brand logos for `/experience` logo ticker) lives at the top of `pages/experience.tsx` and contains 10 brands with structure `{ name, slug, filename }`. The `filename` property maps to actual PNG files in `/public/images/logos/` (e.g., slug `hugoboss` → filename `hugo-boss.png`). Logos have `onError` handlers that hide broken links. Supported brands: Nike, Volkswagen, Audi, Hugo Boss, Tommy Hilfiger, Unilever, Johnson & Johnson, Royal Mail, Parcelforce, Palantir.
- Brown sections (Darren Brett, testimonials, Attention/Connection/Conversion) use charcoal text — green text on brown is *technically* allowed by the rule but in practice we don't do it. Use the `BoxCTA` `tone="light"` variant on brown (charcoal pill).
- The dev grid + outlines toggles from the old single-page site are gone. Don't try to reuse those state hooks.

## Working style

- User iterates fast in small, specific edits. Don't pre-emptively redesign neighbouring sections when they ask about one thing.
- Single source of truth on copy lives in the page files — no CMS, no draft system.
- Each page has a BoxCTA pointing to the next page in the flow: Home ("Where we step in") → Where we step in ("Experience") → Experience ("Start a conversation" to contact section). Contact is terminal with footer ribbon and contact info.
- When the user shares a design system / typography / colour document, treat it as a reference refresher — *most of it will already be implemented*. Diff it against the current build and flag only the drifts.
- Be honest about what you can and can't do. If a request needs external assets, set up the wiring and ask them to supply the file rather than guessing or inventing.
