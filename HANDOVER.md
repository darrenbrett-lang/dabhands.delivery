# DAB Hands Website — Handover

Pick this up cold. Captures the project as of the end of the previous session, the design conventions in use, hard rules from the user, and the open issue at handover.

## Stack
- Next.js 16.2.6 (Pages Router). `AGENTS.md` warns it has breaking changes vs. training data — read `node_modules/next/dist/docs/` before adding Next features.
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` directive). Custom utilities live at the bottom of `styles/globals.css`.
- Framer Motion 12 for scroll + continuous animations.
- TypeScript. Run `npx tsc --noEmit` after non-trivial edits.
- Fonts: Geist + Geist Mono via `next/font/google` in `pages/_app.tsx`.

## Dev workflow
- User runs `npm run dev` themselves on port 3000.
- `.claude/launch.json` has `autoPort: false` — they need port 3000 specifically. **The preview tool cannot take port 3000.** Don't try repeatedly; report the failure cleanly and trust their hot reload.
- They hard-refresh to confirm changes.

## Brand tokens (`styles/globals.css` `@theme`)
- `dab-cream` / `dab-white`: `#FAFAFA`
- `dab-charcoal`: `#0E0E0E`
- `dab-charcoal-alt`: `#171717`
- `dab-green`: `#B7FF00` (neon)
- `dab-brown`: `#ACA195`
- `dab-brown-light`: `#E8E3DC`
- `dab-taupe`: `#8A847C`

## Hard rules (saved to memory at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/`)
1. **No em dashes (—) in user-facing copy.** Use commas, full stops, or restructure. Code comments exempt. (`feedback_no_em_dashes.md`)
2. **Never `text-dab-green` on light backgrounds** (cream, white, brown-light). Neon green has no contrast on white. Decorative rules / dots / backgrounds in green are fine. (`feedback_no_green_text_on_white.md`)
3. **Only one `ConversationCTA` in the page body** — section 13 (Get in touch). It also lives in the header. Other sections do not have it.
4. **Don't reproduce brand logo SVG path data inline in code.** External CDN URLs or user-provided files only.

## Layout system (12-col grid)
- Container: `max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16` (1280px max, 64px margins at lg).
- Grids use `grid grid-cols-12 gap-8` (32px gutter).
- Dev grid overlay + outlines toggles are fixed bottom-right, state in `localStorage` (`dab-show-grid`, `dab-show-outlines`). Dev elements have `data-dev-tool` so outlines mode skips them.

## Key components (top of `pages/index.tsx`)
- **`FadeUp`** — `motion.div`, scroll-triggered fade + 18px rise. Accepts `delay`, `className`.
- **`ConversationCTA`** — green pill CTA. `inverse` prop swaps to charcoal-bg/green-text. Used only in header + section 13.
- **`BrandMotif`** — masthead SVG (`viewBox 0 0 900 900`, `xMaxYMid slice`). 39 thin lines fan from convergence at `(860, 450)`. Left side faded via `<linearGradient>` + `<mask>` (0% black → 75% white). Beam is a separate `<line>` from `x=720 → 860` so it doesn't pass under the headline. Lines have continuous animations: `strokeOpacity` pulses in a concentric wave (stagger by distance from beam, 4.5s) AND `strokeDashoffset` drifts (`dasharray="14 6"`, 7–9s linear). Convergence has 4 stacked circles: outer three breathe (`r` + `opacity`, 3.6s), centre dot shifts colour `#B7FF00 ↔ #E8FF7A`.
- **`Label`** — `<index> <line> <text>`. Tones: `default` (all cream, dark bg), `onBrown` (charcoal on brown bg), `onLight` (charcoal on cream bg).
- **`LogoMark`** — for section 08. Tries `/images/logos/{slug}.svg` first, falls back to `cdn.simpleicons.org/{slug}/ffffff`, then renders `null`. CSS `filter: brightness(0) invert(1)` forces any source colour to white.
- **`GridOverlay`** — fixed full-viewport, 12-col fuchsia tint inside the standard container.

## Section structure (current numbering)
- **Masthead** (no number). `bg-dab-charcoal`. H1 split into two `block` spans: cream "Expert digital delivery" + green "for high-stakes work." Forced 2-line break, sized down at xl to `text-[104px]` so both lines fit. `BrandMotif` absolute `inset-0`. `min-h-[80vh] md:min-h-[88vh]` so `flex items-center` centres the H1's middle line on the SVG circle.
- **Header**: `bg-dab-charcoal`. Logo on left (pulsing dot — scale 1→1.2 + colour shift, `items-baseline` aligned to wordmark cap height). Single `ConversationCTA` on right. No nav links. Hamburger on mobile.
- **02 Approach** (cream). Mid-sized h2 "Small senior teams built around critical digital initiatives." Body paragraphs left (`md:col-span-8`), simple inline dropdown on right (`md:col-span-4`, no panel, single underline border).
- **03 Where are we?** (charcoal). Label spans full width above the grid. 8-col left = 3 huge stacked statements ("The tools are changing." / "The problems aren't." / "Complexity is higher than ever.") at `xl:text-[96px]` + green rule + green dot at bottom. 4-col right = 4 numbered bullets with green numbers stacked above text + green underline rules.
- **04 How work loses strength** (green). H2 "Great ideas aren't the problem. / Getting them through is." Both lines full charcoal. Right column body paragraphs baseline-aligned to first h2 line via `md:pt-8 lg:pt-12`.
- **05 Operational truth** (cream). H2 "Where important work gets stronger" + body + 4 tick-and-text bullets (charcoal SVG check + top-border separator, charcoal text).
- **06 Senior leadership** (brown). Darren Brett photo card on left (`<img src="/images/IMG_3912.jpeg">` with bottom gradient + "Darren Brett" overlay only — "Founder" line was removed). Right column = body paragraphs starting "More than 20 years…" (the standalone Darren Brett h2 was removed).
- **07 Capability density** (cream). H2 "The teams behind the work" + supporting copy + 3 tick-and-text bullets ("Small senior teams." / "Clear accountability." / "Built around the work itself.").
- **08 I've delivered at scale for** (charcoal). **OPEN ISSUE — see below.**
- **09 Trusted to lead important work** (brown). Testimonials.
- **10 Where I've worked** (charcoal). 4-col icon grid (layers / overlapping rects / target / refresh) with green stroke icons + heading + subtitle.
- **11 Sweet spot** / My sweet spot (green). H2 + 3 horizontal items ("Attention." / "Connection." / "Conversion.").
- **12 Intervention model** (cream). Interventions accordion.
- **(unnumbered)** Why organisations bring DAB Hands in (green) — `reasons` array with checkmark list.
- **(unnumbered)** Stats (charcoal) — "Most businesses don't lose on intent and ideas. They lose on execution." + 60% / 30% HBR stats.
- **13 Get in touch** (charcoal). Final CTA section. Only place body uses `ConversationCTA` (`href="mailto:db@dabhands.delivery"`).

## Open issue at handover
**Section 08 logo carousel.** User flagged "not right" at end of session. Current state:
- Marquee animation removed; static `flex flex-wrap` grid renders 13 brands via `LogoMark`.
- Each brand tries `/public/images/logos/{slug}.svg` first, then `cdn.simpleicons.org/{slug}/ffffff`.
- Many brands aren't in Simple Icons (Tommy Hilfiger, Johnson & Johnson, Royal Mail, Parcelforce, Post Office, Fortnum & Mason — plus uncertain: Hugo Boss, Falabella). Those slots silently render nothing.
- Filename slugs are listed in `public/images/logos/README.txt`.

**User wants all 13 brands visible.** Resolution path: either they drop the missing SVGs at the listed paths, or you propose a different sourcing approach. Do NOT reproduce brand logo SVG paths inside `pages/index.tsx` — keep them as external files (or external CDN). Verify each Simple Icons slug against `https://simpleicons.org` before adjusting — the user noted some slug names may be wrong.

## Common gotchas
- Page title and mobile menu footer reference `DAB Hands. Digital Delivery, Handled` (no em dash, per the rule).
- Section numbering has been renumbered multiple times. If you renumber, **carefully search/replace every `Label index="N"`** — the order is important.
- `BrandMotif`'s mask gradient (`offset="75%"`) controls the left fade. Pulling the stop further right gives a softer fade; pulling it left makes the lines reach the headline more strongly.
- Headline `-translate-x-[8px]` is intentional optical alignment so the "E" stem of "Expert" lines up with grid column 1 at xl sizes.
- `text-wrap: balance` is set on h1–h6 and `text-wrap: pretty` on `p` in `styles/globals.css` to prevent widows. Don't fight these with explicit `<br/>` unless you have to.

## Files
- `pages/index.tsx` — the whole page (~1000+ lines).
- `pages/_app.tsx` — font wiring.
- `styles/globals.css` — `@theme` tokens + custom utilities (`.dot-grid`, `.signal-rule`, `.outlines-on`, h1–h6 text-balance, p text-pretty).
- `public/images/IMG_3912.jpeg` — Darren's portrait (user-provided).
- `public/images/logos/` + `README.txt` — logo drop zone (incomplete).
- `public/logos/` — legacy folder from an earlier iteration; safe to delete if you want to tidy up.
- `.claude/launch.json` — preview-server config (port 3000, `autoPort: false`).

## Working style
- Single-page narrative scroll. User resists adding nav shortcuts that would let visitors skip the argument.
- User iterates fast and prefers tight, specific edits. Don't pre-emptively redesign neighbouring sections when they ask about one thing.
- Be honest about what you can and can't do. If a request needs external assets (brand logos, photos), set up the wiring and ask them to supply the file rather than guessing or inventing.
