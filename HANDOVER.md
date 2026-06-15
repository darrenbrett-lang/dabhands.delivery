# DAB Hands Website — Handover

Pick this up cold. Captures the project after the **Style Guide v2.0 refresh** and the **"marks of skilled hands" mastery recentre** (June 2026).

---

## Status (read first)

- **Working branch: `staging`** (committed at `74677f9`, pushed to `origin/staging`). `refresh/style-guide-v2` is a local snapshot at the same commit. The whole v2.0 + mastery build lives here.
- **Production is untouched.** `main` is still the old v1 site (`efaa863`) serving `https://dabhands.delivery`. Nothing of the new build is on `main` yet.
- **Staging preview:** `https://dabhands-delivery-git-staging-darren-brett-s-projects.vercel.app` (Vercel preview of the `staging` branch, rebuilds on every push). It currently returns **401 "Authentication Required"** because Vercel Deployment Protection is on by default. To open it: Vercel → `dabhands-delivery` project → Settings → Deployment Protection → Vercel Authentication → Disabled. (Or keep it on and use a Password / Shareable Link for specified people.)
- **localhost:3000** is the local `npm run dev` server. It hot-reloads edits to this repo, so it always shows the latest on whatever branch is checked out (currently `staging`). Keep it running in a terminal; preview-tool servers launched from inside a session are ephemeral and get reaped.
- **Build:** `npm run build` is clean (TypeScript passes). Routes: `/`, `/business-and-agency-leaders`, `/marketing-leaders`, `/creators-and-founders`, `/contact`, `/for/manifesto-digital`, plus `/404` and `/api/hello`.

### Deploy flow (staging + production)
- **Work on `staging`.** Edit → localhost hot-reloads → commit + push `staging` → Vercel rebuilds the staging preview. Standing practice: keep both in sync as you go.
- **Do NOT promote to production until the owner explicitly says the new site is ready.** `main` stays frozen on the v1 site; **do not push/merge to `main`, and do not even open a `staging → main` PR**, without an explicit go-ahead (standing owner directive, 2026-06-14). When that day comes: `git checkout main && git merge staging && git push origin main` → Vercel deploys `dabhands.delivery`; then refresh social caches (LinkedIn Post Inspector + FB Sharing Debugger).
- Repo: `git@github.com:darrenbrett-lang/dabhands.delivery.git`. Vercel project `dabhands-delivery` under team `darren-brett-s-projects`, GitHub-integration auto-deploys.

## The brand direction (source of truth)

Two owner briefs stack: the **Style Guide v2.0** brief, then a **visual recentre** that supersedes anything leaning into consultancy, abstract art, decorative brushwork, or polished Apple-minimalism.

- **Visual centre: "the marks left behind by skilled hands."** A mastery brand. The feeling: *somebody capable has been here.* It is the digital home of **Darren** (first person, "I"), a senior digital operator with the heart of a creative. Not a consultancy, agency, or technology brand.
- **Central tension: Darren is still, the work moves.** He is calm, judgement, experience, scar tissue. The marks create movement, alignment, momentum around and through the page.
- **One journey, not many marks.** The trajectory is the **core visual language**: a single, slightly imperfect, confident line (a racing line / conductor's gesture) built as `Trajectory.tsx`. It enters the hero and passes *behind* the headline, drawing on at load so it reads as already-in-motion (momentum, not speed), and **reappears at the turnstile, dividing into the three doors** (moss / peach / sage). Momentum without clutter. (A signature mark beside the wordmark was tried, then removed at the owner's call — the logo is just the wordmark in the serif.) Reduce motifs ~60%; make the few that remain work harder. Typography does most of the work.
- **Copy thread:** the work isn't the problem, the journey is, and Darren protects it. Preserve the link words **intact** (hero), **as intended** (point of view), **integrity / protects** (testimonial). First person, warm, senior, no buzzwords.
- References: Apple (reduction), Rapha (craft), Nike (momentum), plus Darren's scar tissue. **Retired: the halo motif (the `.halo-glow` class is now removed), decorative gradient atmospheres, pill/lozenge tags.** The test for any addition: feels like a consultancy → simplify; like software → humanise; like art → remove decoration; like *movement through complexity* → keep.

## Stack

- **Next.js 16.2.6** (Pages Router, Turbopack). `AGENTS.md`: read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind v4** (`@import "tailwindcss"` + `@theme` in `styles/globals.css`).
- **Framer Motion 12** (subtle reveals via `FadeUp`, gentle transitions, disclosure height-animations).
- **TypeScript.** `npm run build` is the gate. Note: `next build` conflicts with a running `next dev` over `.next`, so stop dev (or just push and let Vercel's build be the check).
- **Fonts:** Instrument Serif (display) + Manrope (UI) via `next/font/google` in `pages/_app.tsx`.

### Gotchas
1. **Font vars must live at `:root`.** `@theme` sets `--font-serif: var(--font-instrument-serif), ...`; custom properties resolve where declared, so `_app.tsx` injects `<style>:root{--font-instrument-serif:…;--font-manrope:…}</style>` from `font.style.fontFamily`. Without it, `--font-serif` collapses to empty and headings fall back to sans. Do not remove it.
2. **Turbopack stale `@theme` CSS.** Editing colour/font tokens sometimes does not hot-reload. Fix: stop dev, `rm -rf .next`, restart.
3. **Heading colour is inherited, not forced.** The `h1`-`h6` rule in `globals.css` deliberately sets no `color`: it is unlayered, so a `color` there beats the Tailwind `text-*` utilities and would force every heading dark (invisible on plum). Set the colour on the **section** (`text-ink` on light, `text-bone` / `text-white` on dark) and headings inherit it.

## Information architecture

Nav: **DAB Hands (home) · Who I help (dropdown) · Contact.** No persistent "Start a conversation" button; CTAs live in content.
- "Who I help" → three **flat** routes: `/business-and-agency-leaders`, `/marketing-leaders`, `/creators-and-founders`.
- **Deleted:** `pages/experience.tsx`, `pages/where-we-step-in.tsx` (scrubbed from `sitemap.xml`, `llms.txt`). The three rooms replace About / Services / Experience.

## Pages

### `/` — `pages/index.tsx`
Rhythm bone → paper → bone → paper → bone → plum. Copy is locked by the brief. Sections:
1. **Hero** (bone, centred) — Instrument Serif "Keeping important work moving." (per-word stagger on mount) + Manrope subline. The **`Trajectory`** enters from the left and passes *behind* the headline, drawing on at load (moss, low opacity, fades at both ends). Section is `relative overflow-hidden`; content sits above the line at `z-10`.
2. **Darren** — **full-bleed `clouds.png` banner** (`object-cover`, landscape banner depth ~2.6:1), copy on the **left**: "Hi, I'm Darren.", the serif headline "For more than twenty years, I've helped leaders turn strategy into action across some of the world's largest organisations." + the "space between ambition and execution / gain or lose momentum" support line (all ink on the pale clouds; left side stays light enough to read). Darren's **cut-out portrait** (`darren_new-image.png`, transparent PNG) is anchored **bottom-right over the clouds** (absolute bottom-right on `lg`+, `lg:h-80%` / `xl:h-94%`; on mobile/tablet it stacks centred beneath the copy, grounded on the bottom edge). No `Figure` here now; the old `darren_jesus.jpeg` (halo) is unused.
3. **Point of view** (bone) — **two columns** (`lg:grid-cols-[1.15fr_1fr]`, `lg:items-center`), **no image** (typography carries it; the fold was removed). **Left** = the commanding thesis "The tools are changing. The problems aren't." (serif, up to `xl:88px`, tight leading/tracking, fills the column). **Right** = the argument that builds: "Most organisations already have what they need." → ingredients "Strategy. Creative ambition. Investment. Good people. Trusted partners." → the insight "The challenge isn't creating more. It's helping what already exists **move together**." (serif, `HandUnderline` moss on "move together") → the stakes "Because somewhere between idea and market, momentum slips and value gets lost." → the resolution "It deserves to arrive as intended." (serif). Columns stack on mobile (thesis then argument). No eyebrow; the thesis leads.
4. **Proof** (paper) — "I've been trusted with important work by" + `<LogoTicker>` (**all 13 clients**, seamless marquee). No testimonial here — testimonials live only on the doorway pages.
5. **Turnstile** (bone) — "What's getting in the way?" + three cards, **each tinted in its room accent** (moss / peach / sage block colour, with an "Explore →" cue + accent border deepening on hover), title, diagnosis, support. No glyphs, no arrows. Each links to its room. **Desktop adds a trajectory reprise above the cards**: one line divides into three faint branches in the room colours, each landing over its column (`hidden md:block`).
6. **Final CTA** (Midnight Plum) — "If something important needs to move properly, let's talk." + CTA. White text on plum, the page's one deep moment. `footerVariant="none"`.

### The three rooms

> **Rebuild in progress — operator template.** Per the Destination Page brief, the rooms are moving to a new 8-section **operator** template (`components/OperatorTemplate.tsx`): DAB Hands as a trusted **operating partner, not a consultant**; **"I" voice**, recognition over explanation, **situations not services**. Spine: Hero (recognition headline + simple subline + an **optional** trust line (`hero.trust?`) + **charcoal CTA (solid; moss on hover)**, above the fold — trust is currently omitted on all three rooms, so the hero is headline + subline + CTA) → Validation ("you've done the hard part") → Diagnosis (cards **or** prose) → **Transition** (optional `transition?` — the messy middle / "that's where I step in") → Outcomes (the **bold payoff** — big serif heading up to `lg:54px`; Business collapses transition + outcomes into this one statement) → Where I tend to help (**3 situation cards or a how-we-work statement**) → Trust (plum: a single quote, a credibility statement, **or** three testimonials via `proof.testimonials` — an auto-rotating carousel (3s) with pips, crossfading in place) → **Close** (a tighter beat: 2-line heading, 1-line qualifier, slimmer padding `py-14/20/24`). Mobile **sticky CTA**; per-room accent; content lives in the page file. **Authored widths** (from the grid scale): hero `max-w-statement` (960), body `max-w-read` (800), the situation-card + triptych grids `max-w-statement`; each hero carries a subtle **per-accent atmospheric glow** (`a.wash`) **and the single `Trajectory` mark** (`a.traj`, opacity ~0.5) entering behind the headline, so the rooms share the homepage's one-journey visual language. **All three rooms are now on it** (content lives in each page file; the diagnosis section accepts either 4 cards or prose `paras`). The legacy `AudienceTemplate` (documented below) is **no longer imported by any page — safe to delete.** Open copy item: the **Creators proof quote has no attribution** (the supplied content used a `[Founder Name]` placeholder, so the attribution line is omitted until a real name/company is provided).

#### Legacy template — `components/AudienceTemplate.tsx` (UNUSED — safe to delete)
All three are **built with full copy** and **section-driven**: a `CONTENT` map keyed by slug holds `{ navLabel, eyebrow, hero, accent, sections[], close }`. They share the visual kit and rhythm but **compose differently** (not a fixed spine). `footerVariant="none"`. **Each room's hero carries a subtle accent atmosphere** (a top-down `heroWash` from the `ACCENT` map, fading into bone) **and an accent-coloured eyebrow** (the deepened `trigger` shade), so entering a room is a quiet shift in atmosphere while the rest of the page stays the neutral house.

Section kit (each optional-field-driven): `drumbeat` (stacked lines + optional bridge/pivot/disclosure), `blocks` (sub-statements, each heading+para+optional disclosure), `twoSystems` (visible/invisible cards), `statement` (serif heading + optional visible `body[]` + optional disclosure), `outcomes` (heading + bullet list + optional `close[]`), `experience` (line + optional `body[]` + `<LogoTicker>` all 13), `testimonial` (plum), `plumStatement` (plum heading + sub), `workCards` (engagement models + note). The single plum section per page is the one deep beat. Section eyebrows that read like deck headings — **The situation, What good looks like, Relevant experience, How we might work together** — are suppressed via `HIDDEN_LABELS` so the content leads. A `drumbeat` can render **inline as a dot-delimited paragraph** (`inline: true`; used for the Business "situation").

- **Business & agency leaders** (accent **moss**): situation drumbeat → "What needs to change" two-systems → "What good looks like" outcomes → "Relevant experience" → plum testimonial (Joel Sinnott, Nike) → "How we might work together" workCards → close. Three disclosures.
- **Marketing leaders** (accent **peach**): "The situation" three blocks (each Expand) → "Where I come in" statement (Expand) → "What good looks like" outcomes (Expand) → "Relevant experience" → plum testimonial (Anthony Mahon, Hugo Boss) → "How we might work together" statement (Expand) → close.
- **Creators & founders** (accent **sage**): "The moment" blocks → "The real challenge" statement → "This might sound familiar" drumbeat → "What changes things" statement → "Where I come in" statement → "What good looks like" outcomes (+close lines) → "A familiar problem" experience (+body, logos) → **"The partnership" plumStatement** (its deep beat, no testimonial) → close. No disclosures (the supplied copy was continuous prose).

**Disclosure / accordion** (built to the Accordion brief — Stripe/Apple/Notion patterns): the trigger is an **accent-tinted pill** (`accent.cardBg` + `accent.cardBorder` + `accent.trigger` text, `rounded-full`, `min-h-[44px]` touch target) with a **short descriptive label + chevron** that rotates 180° on open. Labels are statements of what's inside (no "Expand"/"+"), e.g. "Explore the challenge", "The gap between ambition and execution", "Where I step in". Semantic `<button>` + `aria-expanded`; each is independent (multiple open allowed; none open by default); ease-in-out height + chevron animation (~0.35s). Expanded body nests under a `border-l-2` accent rule with a **weighted lead paragraph** (`font-medium`, ink) then 15px / 1.65 graphite paragraphs. Per-room accent (lavender→`#6E5A86`, peach→`#9E5B3A`, sage→`#5E6B3F`). The whole `ACCENT[accent]` object is passed to `Disclosure`.

### `/contact` — `pages/contact.tsx`
Bone hero "What needs moving?" (serif) + intro + Email / Phone / LinkedIn channels (Manrope, `hover:opacity-60`). No decorative gradient. `footerVariant="none"`.

### `/for/manifesto-digital` (UNLISTED)
Private pitch for Rebecca Hull, on v2.0 (plum/aubergine, lavender accents, no green). `PrivateLayout` (plum chrome, serif wordmark) + `<SeoMeta noindex>`. Keep out of nav and sitemap. Local components `ChipExplorer` / `PhaseHeading` / `ActivityList`. Topic icons `/images/icon-*.svg` recoloured to lavender, referenced `?v=2` (immutable cache → bump version on any edit).

## Visual system

| Role | Token | Hex |
|---|---|---|
| Primary background (bone) | `bone` | `#F5F1EA` |
| Secondary background (paper) | `paper` | `#FBF8F3` |
| Primary text / headlines (ink) | `ink` | `#1F1F1D` |
| Secondary / body text | `graphite` | `#5C5C58` |
| Borders / dividers | `stone` | `#D8D2C8` |
| **Primary accent — Deep Moss** (Business + dominant brand) | `moss` | `#5B6A58` |
| Accent — Marketing | `peach` | `#E6B39A` |
| Accent — Creators | `sage` | `#A8B5A2` |
| Supporting — used lightly | `lavender` | `#B8A2D8` |
| Light wash (section highlights) — B / M / C | `lavender-wash` / `peach-wash` / `sage-wash` | `#E9E1F4` / `#F4E0D4` / `#DDE4D8` |
| Dark accent (eyebrow, links, quote detail) — M / C | `peach-deep` / `sage-deep` | `#B97D62` / `#6F7D69` |
| Gradient mid / soft tint | `lavender-soft` | `#E6D6EE` |
| Supporting accent | `sky` | `#AFCFE0` |
| Highlight / hover / focus | `coral` | `#D98773` |
| Deep sections / final CTA | `plum` | `#352E44` |
| Footer base (warm charcoal) | `charcoal` | `#262420` |
| Supporting dark | `aubergine` | `#4A3D59` |

Ratio ~70% bone/paper, ~20% ink/graphite/stone, ~7% moss/sage, ~2% lavender, ~1% peach — per **Colour System v3** (operating-partner update; colour is meaning, not decoration). **Deep Moss `#5B6A58` is the dominant accent** — control entering the system. **Audience rooms shift one accent each** (Business **moss**, Marketing peach, Creators sage); each room's **hero wash** is the primary accent fading top-to-bottom (`ACCENT[accent].wash` in `OperatorTemplate`): moss `0.20→0.14→0`, peach `0.22→0.14→0`, sage `0.24→0.14→0`. Same type/spacing/layout/core palette otherwise. Tokens in `globals.css @theme`. Utilities: `.eyebrow` (Manrope uppercase label), `.font-serif`, `.signature-gradient`. (`.halo-glow` removed — halo motif retired.) Focus ring is coral. Legacy `dab-*` tokens remain defined but nothing live uses them (prune, see TODO).

## Grid system (deliberate + fixed)

One page width, one gutter, one 12-column grid, named reading measures, one vertical rhythm. Tokens live in `globals.css @theme`; the primitives are CSS utilities in `globals.css` (`@layer components`).

- **`.u-container`** — the page shell: `max-w-page` (1280) + responsive gutter **24 / 40 / 64** (`px-6 / md:px-10 / lg:px-16`). Every full-width module uses it; nothing sets its own max-width or horizontal padding.
- **`.u-grid`** — the **12-column** grid (4 columns on mobile), gutter **24 / 32**. Place children with `col-span-*` / `col-start-*`. Homepage POV = thesis `md:col-span-6` + argument `md:col-span-5 md:col-start-8` (column 7 is a deliberate spacer); turnstile = three cards each `col-span-4`; both stack full-width on mobile.
- **Reading measures** (centred text line-length): `max-w-statement` (960 — heroes / statements), `max-w-read` (800 — authored body). The room template's `COL` / `COL_HERO` / `COL_WIDE` use these tokens.
- **Vertical rhythm** — standard section is `py-20 md:py-28 lg:py-32` (homepage + room template). The hero and the slim plum CTA keep their own intentional padding.
- Token scale: `--container-page` 80rem · `--container-statement` 60rem · `--container-read` 50rem.

## Components (`/components`)

- **`Header.tsx`** — transparent over bone, gains `bg-bone/85 backdrop-blur + border-stone` on scroll. Serif "DAB Hands" wordmark (just the font, no mark or dot). **"Who I help" now reads as a choice of paths** (hover + click/keyboard; Escape + route-change close): each option has a fine **pathway-colour lead** (`audiences[].tint`) that extends on hover, label stays ink; desktop is a light paper/blur panel, the mobile sheet shows the same leads before each serif name. "Contact". Mobile hamburger → bone sheet.
- **`AudienceTemplate.tsx`** — the section-driven engine (kit + `CONTENT` map + `ACCENT` map + `Disclosure`). See "The three rooms" above.
- **`Figure.tsx`** — **art-directed, mobile-first imagery.** `<picture>` with the mobile crop as the `<img>` base and an optional `desktop` `<source media="(min-width:768px)">`. Props: `mobile`, `desktop?`, `alt`, `className` (wrapper sizing/shape), `priority?`. Use this for striking imagery so desktop and mobile carry different framing.
- **`Footer.tsx`** — charcoal slim bar (`bg-charcoal`) with **white text**: serif wordmark + white LinkedIn icon + "© 2026 DAB Hands", `border-t border-bone/10`. Global (same on every page). `variant 'default'|'minimal'|'none'`; every page uses `none`. The contact module (default/minimal) is unused.
- **`BoxCTA.tsx`** — understated rounded-full pill, `tone 'light'|'dark'`. NOTE: still a pill; see the open CTA question in TODO.
- **`HandUnderline.tsx`** — restrained hand mark; `tone 'dark'`→moss (default), `'light'`→coral; `stroke` override; `strokeWidth` 3.2.
- **`Trajectory.tsx`** — the brand's core gesture. One canonical SVG path, drawn on via framer `pathLength` (decelerating ease = settling momentum), gradient-faded at both ends, `vectorEffect=non-scaling-stroke`, reduced-motion aware. Props: `stroke` (default moss), `opacity`, `delay`, `duration`, `strokeWidth`. Placed absolutely behind content (hero); the turnstile reprise is an inline three-branch SVG built from the same idea. (A `DabMark` signature stroke was tried beside the wordmark, then removed — the logo is just the font.)
- **`LogoTicker.tsx` / `TickerLogo.tsx`** — seamless marquee + the canonical **13-client** `clients` array (single source of truth). `brightness(0)` charcoal silhouettes. Used on the homepage Proof and every room's experience section (all 13).
- **`SeoMeta.tsx`**, **`FadeUp.tsx`**, **`Layout.tsx`** (skip-link + Header + `<main id="top">` + Footer), **`PrivateLayout.tsx`**.
- **Unused / prunable v1 artifacts** (no imports): `Ribbon.tsx`, `RibbonAccent.tsx`, `RibbonMotif.tsx`, `StatPopover.tsx`, `GridToggle.tsx`. Crown/calibration/compass marks + green `icon-*` originals unused on the main site.

## Hard rules

1. **No em dashes** in user-facing copy (code comments fine).
2. **Brand wordmark is "DAB Hands"** (uppercase DAB, capital-H Hands). Tokens/paths exempt.
3. **Deep Moss leads; neon green retired.** `moss #5B6A58` is the dominant accent and is dark enough to use directly as text on bone (~5.1:1 AA). For peach/sage as text use the **`*-deep` tokens** (`peach-deep #B97D62`, `sage-deep #6F7D69`); otherwise keep pale accents off light text; link hovers on light use `hover:opacity-60`. NB `peach-deep` / `sage-deep` sit **below WCAG AA as small text on bone** (~3.0:1 / ~3.9:1) — kept to match the brief; deepen if AA is needed.
4. **Type:** Instrument Serif for display/statements/quotes; Manrope for everything else. Never force weight on the serif (single 400). Label headings no full stops; truth-statements keep periods.
5. **Mastery marks, not decoration.** One journey/trajectory, confident and economical. No halos, no decorative gradients, no pill/lozenge tags, no hand/tool icons. Motion communicates momentum, not novelty.

## Open items / TODO

- **Imagery (owner is creating the visuals).** `Figure` is ready for art-directed striking imagery (desktop crop + mobile crop). Still to decide *where* striking images live, then build those slots and do the grid/gutter/headline "make space" pass against them. The single "trajectory" host layers (positioned section containers behind the type for the owner's SVG marks) are not built yet.
- **CTA shape — owner decision pending.** The CTAs are still rounded-full pills (the only lozenge-shaped element left after the no-lozenge rule). Options offered: text link with a quiet arrow (recommended), squared/underlined button, or keep as pills. Apply consistently once chosen.
- **Vercel staging is protected (401).** Toggle Deployment Protection off for the open link the owner wants, or use Password/Shareable Link for specified-people access.
- **Darren portrait — placed.** `darren_new-image.png` (transparent cut-out): absolute bottom-right on `lg`+, stacked centred beneath the copy on mobile/tablet (grounded on the bottom edge). **Follow-up:** it's a ~2.3 MB PNG — convert to WebP (with alpha) to cut the homepage payload. The old `darren_jesus.jpeg` (halo) is unused.
- **`og-image.png` and `favicon.svg` are still v1 green.** Regenerate for v2.0 (`og-image.png` is the SeoMeta default + the `_document` JSON-LD logo; `theme-color` is already bone).
- **Prune** legacy `dab-*` tokens from `globals.css` and delete the unused v1 components once confirmed.

## Working style

- Owner iterates fast in small, specific edits. For exploratory questions, answer in 2-3 sentences with a recommendation + the main tradeoff before implementing. Don't pre-emptively redesign neighbouring work.
- **Verification:** preview-tool screenshots are unreliable for deep-scrolled sections (they capture from the top) and `FadeUp` content sits at opacity 0 until revealed, so a fresh screenshot often looks blank mid-animation. Use `preview_eval` DOM measurements to confirm below the fold; a tall viewport (`preview_resize` height ~3000-4900) captures more at once. `gh` and the `vercel` CLI are not installed; the unauthenticated GitHub API (via `curl`/`python3`) can read Vercel commit-status URLs.
- React Strict Mode is on (double-renders in dev).
- **Saved memory rules** live at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` and apply every session — read `MEMORY.md` first. Current rules: no em dashes; "DAB Hands" wordmark; colour system v2.0 (+ per-audience accents); typography (Instrument Serif + Manrope); the "marks of skilled hands" visual centre (no halos/decoration/lozenges); portrait direction; the v2.0 refresh + the "too restrained, push brand energy" feedback.
