# DAB Hands Website — Handover

Pick this up cold. The site is **LIVE in production** at `https://dabhands.delivery`. This captures it after the **July 2026 refresh** (release `94019bd`, shipped 2026-07-09): a full homepage rebuild, copy refreshes across all three doorway pages, the new **Operating Patterns** exhibit, the plain-serif logo, a performance/a11y pass (desktop Lighthouse 100s), and a site-wide SEO/positioning alignment.

---

## Status (read first)

- **`main` = production.** Vercel auto-deploys on push to `main`. Live = `94019bd` (2026-07-09). `staging` was fast-forwarded to the same commit at release, so all three of `main` / `staging` / `content/homepage-refresh` currently agree.
- **Release flow:** develop on a branch, verify, then `git push origin HEAD:staging HEAD:main` (fast-forward). **Only commit/push/release when the owner asks.**
- **Rollback:** Vercel instant rollback, or `git push -f origin <sha>:main`. Old v1 site preserved at `efaa863`; the pre-refresh site at `6159852`.
- **localhost:3000** = `npm run dev` (Turbopack). **Gotchas:** newly-*added* `@theme` tokens don't hot-reload (`rm -rf .next` + restart); `next start` and `next dev` share `.next`, so never run a prod server against a dir a dev server has touched — rebuild first; after editing components, hard-reload the preview tab (stale HMR bundles have masked real fixes).
- **Build gates:** `npm run build`, `npx tsc --noEmit`, `npm run lint` — all clean at handover. Routes: `/`, the three doorways, `/contact`, `/404` (branded), private `/for/eterna`, `/for/manifesto-digital`, `/design-system`. The scaffold `/api/hello` was deleted.
- Repo: `git@github.com:darrenbrett-lang/dabhands.delivery.git`, Vercel project `dabhands-delivery`.

## The brand direction (source of truth)

A **mastery brand** — "the marks left behind by skilled hands." The digital home of **Darren Brett** (first person, "I"), a senior operator with the heart of a creative. Not a consultancy, agency, or transformation practice. Calm, premium, editorial, earthy + grounded.

- **Positioning (July 2026):** *"Keeping important work moving."* is the spine. The supporting frame: **"Most organisations don't lack good thinking. They struggle to preserve it."** Darren closes the gap between what leadership teams intend to deliver and what actually gets done. The old "turn ambition into impact" line is **fully retired** — zero occurrences anywhere (pages, meta, JSON-LD, llms.txt, manifest, enquiry emails). Do not reintroduce it.
- **AI is context, not the proposition.** Exactly two light touches remain: the homepage problem panel ("AI is in every boardroom conversation. It's in very few P&Ls.") and the Business page's third engagement card. Keep it that light.
- **The logo is the plain Instrument Serif "DAB Hands" wordmark.** No dot, no halo, no circle (owner call, 2026-07-08). The hero crown (`crown-mark.webp`) is a separate expressive mark and stays. The `/for` private pages still carry the old dot lockup — align only if asked.
- **Factual framing:** Darren worked **inside agencies** and **alongside/across brands** — never "inside" the brands. Never ship factual claims from brief example copy without checking them.

## Stack

- **Next.js 16.2.6** (Pages Router, Turbopack). Read `node_modules/next/dist/docs/` before adding Next features.
- **Tailwind v4** (`@import "tailwindcss"` + `@theme` in `styles/globals.css`).
- **Framer Motion 12** — scroll reveals via `FadeUp`; `_app.tsx` wraps the app in `<MotionConfig reducedMotion="user">` so every framer animation honours reduced motion.
- **First-viewport entrances are CSS, not framer:** the `.rise` utility in `globals.css` (SSR paints, CSS animates before hydration — this is the LCP fix; framer-gated heroes held LCP at JS boot). Use `.rise` for anything in the initial viewport; `FadeUp` for below-fold scroll reveals.
- **Fonts:** Instrument Serif (display, 400 + italic) + Manrope (UI, 400/500/600) via `next/font` — the `:root` font-var `<style>` in `_app.tsx` is load-bearing; do not remove.

## Pages

### `/` — `pages/index.tsx` (rebuilt July 2026)
Rhythm: bone → clay wash → charcoal → bone → bone → slate → clay wash → bone.
1. **Hero** (bone, centred, `.rise` entrance) — crown, staggered "Keeping important work moving.", sub-line with hard break ("Most organisations don't lack good thinking. / They struggle to preserve it."), cue **"See what I do +"** (`PathwayPicker` overlay → the three doorways; gold `active:` flash for touch).
2. **Darren intro** (clay wash, `.rise`) — "Hi, I'm Darren." + serif statement ("inside agencies, and alongside global brands and businesses in motion") + two paras; `SlatPortrait` right, top-aligned.
3. **Problem panel** (charcoal, live POV layout) — thesis "The tools are changing. / The problems aren't." left; right: AI P&L line → the slip → noise pair → "My role is reducing noise so the right things get through." (No serif sign-off; coordination debt is retired copy.)
4. **What I do / How I help** — HOW I HELP eyebrow, serif headline ("…bringing the scar tissue and the instinct…"), kicker "In practice, that means turning:", then **three turns** side-by-side: *Strategic direction / System complexity / Important work* each breaking to "*into* …" (gold italic `into` always opens line two; heading tiers 32/24/32/40px are width-measured — re-measure if labels change).
5. **Proof** (bone) — `LogoTicker` marquee (all logos carry intrinsic width/height).
6. **How I work** (solid slate, two-column) — "Built around the work, not the headcount." left; the team model + serif "Never the other way around." right.
7. **Where I help** (clay wash runs the FULL module) — eyebrow + "Different challenges. / The same pattern underneath." + three doorway **cards** (image 5:2 mobile / 4:3 desktop, pinned two-line support wraps via `withBreaks`).
8. **Closer** — the deeper pages' close module: crown, serif "Organisations rarely need more ideas.", Manrope support lines, centred CTA.

### The three rooms (`components/OperatorTemplate.tsx`)
Same 8-section operator spine, with July additions:
- **Hero** `.rise` entrance + a small anchor link under the CTA: Marketing "See recent work ↓" (`#selected-work`), pages with patterns "See how I think ↓" / per-page `patterns.heroLink` (Growth: "See what I learned ↓") → `#operating-patterns`.
- **`patterns` (optional)** — the **Operating Patterns exhibit** (see below), rendered between the engagements and the trust panel.
- **`proof` is now optional** — omit/comment it out to hide the trust panel (Growth's Neil Munn quote is currently **commented out pending content approval**; uncomment to restore, heading "In Their Words").
- **Selected Work renders BEFORE the trust panel** (work makes the case, then the witnesses speak). Marketing only.
- Testimonial roles carry **"Former"** where tenure is past (Tom Roberts, Gary Shannon, Dave Wallace, Anthony Mahon, Meher Mumtaz — Joel Sinnott is current).
- All page copy is first person; "Darren" appears only inside testimonial quotes.

### Operating Patterns (`components/OperatingPatterns.tsx`) — the exhibit
**Museum exhibit, not a UI component** (owner loves it — protect it). Black stage, gold "Operating Patterns" eyebrow, serif wall text, then plaques: gold numeral, "Operating Pattern" label, one large serif truth, "Explore pattern" cue. Expanded: headline holds; "Why it matters" / "Where I learned it" as two editorial columns. One plaque open at a time; the reveal is a CSS `grid-template-rows 0fr→1fr` transition (~420ms, no measuring, no layout jump); native buttons + `aria-expanded`/`aria-controls`; collapsed panels are `aria-hidden`; the cue is `aria-hidden` (names stay clean); honours reduced motion. **Adaptive:** one pattern → static fully-open plaque, no numeral/gutter, tighter section close; 2+ → the accordion, automatically. Trigger row and panel share one grid template so the rail aligns by construction. Live: B&A (4 plaques, "across agencies" wall text), Growth (1 Anchor Leg plaque, "lessons earned from building one"). Motion must stay calm: no bounce, no 3D, no elastic easing.

### Selected Work carousel (`components/SelectedWork.tsx`) — Marketing only
Black stage, gold chrome. Device-mockup assets (`frame:'none'`) MUST have **opaque white screens** — transparent screen backing makes the black bezel vanish on the black stage (the nike-running lesson; the shipped fix composites screen-interior transparency to white). Dots are 24px touch targets (visual pip inside a bigger button; same for the Testimonials pips). Keeps `data-hide-sticky` (mobile sticky CTA steps aside for its controls) — the old `data-hide-masthead` hide-zone system is **retired**: the masthead's idle-return is uniform everywhere.

## Visual system — palette v6 (unchanged)

| Role | Token | Hex |
|---|---|---|
| Warm Stone — background | `bone` | `#F5F1EA` |
| Charcoal — text + dark sections | `ink` / `charcoal` | `#1F1F1D` |
| Body / secondary text | `graphite` | `#5C5C58` |
| Soft Grey — borders, cards | `stone` | `#D8D3CB` |
| Slate Blue — interactive + solid panels | `blue-green` *(name kept)* | `#535B68` |
| Clay — washes | `clay` | `#A49786` |
| Aged Gold — the accent (numerals, `into`, rules, hover) | `gold` | `#C0974A` |
| Deep gold for AA on light backgrounds | *(literal)* | `#7E5E27` |

Plain `gold` on bone is ~2.4:1 — below AA. The one owner-accepted exception is the gold italic `into` in the turns; anywhere else on light, use `#7E5E27`. Exhibit black stage uses standard `gold`. Focus ring is a **two-tone shadow** (bone inner / ink outer) — visible on every surface; the old coral ring is gone.

## Performance + SEO (post-audit state)

- **Lighthouse (local prod):** desktop **100/100/100/100 on every page**; mobile 94–97 perf (simulated-4G floor) with 100s elsewhere, CLS 0. The LCP fix is `.rise`; keep first-viewport content out of framer.
- Images: intrinsic `width`/`height` everywhere (ticker logos, crowns); `SlatPortrait` uses `next/image` (fill + sizes); doorway/momentum images via `next/image` with `quality={82}` (registered in `next.config.ts images.qualities`). **Immutable 1-year cache → NEVER replace an image at the same filename; version it** (`foo.webp → foo-2.webp`) and update the src.
- **SEO surfaces all tell the current story** (metas, OG/Twitter + `og:locale`/`twitter:image:alt`, JSON-LD Organization/Person/services, `llms.txt`, `site.webmanifest`, footer strapline, enquiry mailto defaults). **Keep every one of these in sync when positioning changes — including conjugated variants.** Bump `sitemap.xml` lastmod at each release.
- Branded `pages/404.tsx`. `canvas` is a devDependency (local scripts only); `lucide-react` removed.

## Hard rules
1. **No em dashes** in user-facing copy (commas, colons, full stops). Scan diffs before committing.
2. Wordmark **"DAB Hands"**; logo is the plain serif wordmark, no circles.
3. White text is always **bone**, never `text-white`.
4. Instrument Serif for display; Manrope for everything else; never force weight on the serif.
5. Audience labels **Title Case with ampersand** (label use only).
6. **No widow words at any breakpoint** on display copy — measure (Range API) at 390/768/1024/1280; `.u-balance` forces balanced wrapping but gives up past ~6 lines.
7. Typographic apostrophes (’) in all user-facing strings.
8. Briefs: keep the established styling, fold in the strong content/structure ("keep the styling, take the good builds"); treat brief example copy as placeholder — verify factual claims.

## Open items / TODO
- **Growth trust panel** — Neil Munn quote is commented out in `growth-stage-businesses.tsx` awaiting content approval; restore by uncommenting.
- **Marketing Selected Work copy** — held "pending content" per the owner's deck; the nine live cards remain until new content lands.
- **PathwayPicker keyboard pattern** — portal sits at the end of tab order; `role=menu` without arrow keys. Revisit as a disclosure-nav refactor someday (known, non-blocking).
- **21 untracked orphan images** in `public/images/` — not deployed (untracked), but bin them to keep `git status` clean.
- Momentum JPG sources are heavy (400–700KB) — served optimized via next/image, but could be re-exported smaller (versioned names!).
- Legacy tokens (`plum`/`aubergine`/`coral`/`teal`, cloud-pink) still exist for the `/for` pages; prune when those retire.

## Working style
- Owner iterates fast in small, specific copy edits — apply, verify on the preview, build, commit, push each one (production only ever moves on his explicit "go live").
- **Verification:** prefer `preview_eval` DOM/geometry measurements over screenshots (headless captures desync; measurements are authoritative). `FadeUp` content sits at opacity 0 until revealed — force styles when capturing. If the preview behaves impossibly, check `preview_list` for a changed serverId and hard-reload (stale HMR bundles lie).
- **Saved memory** lives at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` — read `MEMORY.md` first; the Operating Patterns and release-workflow notes matter most.
