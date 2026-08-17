# DAB Hands Website — Handover

Pick this up cold. The site is **LIVE in production** at `https://dabhands.delivery`. This captures it as of **17 August 2026, evening** (release `b5cd99f` + `d8a3a11` retrigger): the **Signal to Noise diagnostic page** shipped nav-level, the **crown + wordmark logo lockup** landed site-wide, the homepage carries the **promise line**, and the private **Eterna workspace** runs behind Basic Auth.

---

## Status (read first)

- **`main` = production.** Vercel auto-deploys on push to `main`. Live = `d8a3a11` (2026-08-17). `main`, `staging` and the working branch **`eterna-workspace`** all agree.
- **The repo is a shared working directory across Claude sessions.** Branch/HEAD can change between sessions; always re-check `git branch` and `origin/main..HEAD` before committing. `content/homepage-refresh` is a dead branch (holds the abandoned Safe Passage v1); do not resurrect it.
- **Release flow:** develop on the branch, verify, commit each approved change, and release with `git push origin HEAD:staging HEAD:main` (fast-forward) **only when the owner says go**.
- **⚠ Vercel deploy stalls (3 occurrences: 2026-08-14, -16, -17):** a push sometimes builds but never rolls out — symptom is the old page still serving with `x-vercel-cache: HIT` and a large `age`, new routes 404ing. Fix: `git commit --allow-empty -m "Retrigger Vercel deploy (<sha> not rolled out)"` and push to main; has resolved in ~10s every time. Root cause needs the owner's Vercel dashboard (Deployments tab) — sessions have no dashboard access and no `gh`/API tokens (git push works via SSH).
- **Always poll production after a release** (curl for a string unique to the change) — never assume the deploy landed.
- **Build gates:** `npm run build` + `npm run lint`. Lint currently carries **2 pre-existing errors + 2 warnings in `pages/for/eterna/*`** (plain `<a>`→`<Link>`, an `<img>`) — inherited, not blockers, worth a cleanup pass. A standalone `npx tsc --noEmit` can false-fail on duplicate generated types when `.next/types` and `.next/dev/types` coexist; the build's own type check is the real gate.
- Routes: `/`, the three doorways, `/signal-to-noise`, `/contact`, `/404`, private `/for/eterna` (hub) → `/for/eterna/confidence-map` + `/for/eterna/first-response` (all Basic Auth via `middleware.ts`, noindex), `/for/manifesto-digital`, `/design-system`.
- Repo: `git@github.com:darrenbrett-lang/dabhands.delivery.git`, Vercel project `dabhands-delivery`.

## The brand direction (source of truth)

A **mastery brand**: "the marks left behind by skilled hands." First person ("I"), calm, premium, editorial, earthy and grounded. Positioning spine: **"Keeping important work moving."** with "Most organisations don't lack good thinking. They struggle to preserve it."

- **The logo lockup is the drawn crown beside the serif "DAB Hands" wordmark** (evolved 2026-08-17). Header: `crown-mark.webp` h-7/md:h-8 beside the 24/28px Instrument Serif wordmark. Footer: `DabHands_crown_white.png` h-[22px] beside the 19px bone wordmark on charcoal. Still **no dots, halos or circles, ever**. The `/for` pages carry older lockups — align only if asked.
- **The promise line** (homepage intro block, 2026-08-17): "Hand me an ambition and I'll tell you what it actually takes, then I'll make it happen." It is the largest type in that block (serif 28/30/32/40px), the only sentence on the site where Darren is the subject, and it appears **exactly once sitewide** — footer or section reuse turns it into a tagline and is banned. Nowrap phrase spans pin its line endings (never ends a line on and / I'll / what / it / then).
- **AI is context, not the proposition.** Two light touches only (homepage problem panel; Business page third engagement card).
- **Factual framing:** Darren worked **inside agencies** and **alongside brands** — never "inside" the brands.

## Retired language and banned material (do not reintroduce)

- **"turn ambition into impact"** and conjugated variants — retired everywhere since July.
- **"Safe Passage"** as a product name — retired permanently (UK refugee charity owns search, live US trademark, end-of-life book titles). The diagnostic is **Signal to Noise**.
- **"70% of transformations fail"** — never on this site (Hughes 2011 found no empirical basis).
- **Boehm's 100x cost-of-change curve** — misrepresents its sources; the evidence block carries the argument instead.
- **The five-stage cascade** on Signal to Noise — built, judged a failure ("five lists, nothing visibly removed"), cut by brief decree: do not reinstate.
- **Em dashes** in user-facing copy — hard rule; when supplied briefs contain them, substitute (comma/colon/full stop) automatically and flag it.

## Stack

- **Next.js 16.2.6** (Pages Router, Turbopack). Read `node_modules/next/dist/docs/` before adding Next features. `middleware.ts` provides Basic Auth for `/for/eterna*` (login `eternagrowth`/`fillthechairs`).
- **Tailwind v4** (`@import "tailwindcss"` + `@theme` in `styles/globals.css`).
- **Framer Motion 12** — `FadeUp` for below-fold reveals; `MotionConfig reducedMotion="user"` wraps the app.
- **First-viewport entrances are CSS** (`.rise`), not framer — this is the LCP fix.
- **Fonts:** Instrument Serif (display) + Manrope (UI) via `next/font`; the `:root` font-var `<style>` in `_app.tsx` is load-bearing.
- **⚠ Two `.next` gotchas:** (1) never run `npm run build` while a dev server is running — stop dev → build → `rm -rf .next` → restart dev; (2) **raw additions to `styles/globals.css` do not hot-reload** — new classes are silently inert until you stop the server, `rm -rf .next`, and restart.

## Pages

### `/` — homepage
As the July handover described (hero → Darren intro → problem panel → turns → ticker → How I work → doorway cards → closer), plus since then:
- **Hero cue** is "See who I help +" (PathwayPicker).
- **Darren intro block** (order and hierarchy fixed by brief): "Hi, I'm Darren." small sans → **the promise line, largest** → career sentence demoted to 18px body sans → two body paras, closing line "That work lives at the point where direction has to become reality."
- **Problem panel** copy: "The work loses strength." Turn 3 is "Important work *into* real results" with "clarity, conviction and performance".
- **How I help lead-in** stays "I work alongside leaders of agencies…" (an MDs/CEOs variant shipped 2026-07-14 and was reverted same day — owner dislikes it; don't resuggest).
- **How I work** closes with one body line: "The team expands only when the work demands it. Never the other way around." (serif sign-off retired).
- **Doorway cards** carry the overlay lines ("gets lost between decision and delivery" / "lands softer than it should" / "structure hasn't caught up").

### The three rooms (`components/OperatorTemplate.tsx`)
Unchanged spine. Since July: each room's **"Typical engagements" module runs the page's doorway image full-bleed behind it at 10% opacity** (template-level, keyed off `hero.image`). Growth's **Neil Munn trust panel is live** ("In Their Words"). Marketing testimonials rotate at 6s (`proof.interval`), and its resolution line reads "arrived performing, and made the case for itself"; the closer reads "arrive intact, performing, and making its case".

### `/signal-to-noise` — the diagnostic page (NEW, nav-level, live 2026-08-17)
The deepest-iterated page on the site (owner briefs v1→v3 in one day, plus live art direction). **Read `~/.claude/.../memory/project_signal_to_noise_page.md` before touching it** — it records every decision and reversal. The short version:

- **It sells a finding, not a method.** Governing rules: (1) a person in every sentence — never "important work/signal/noise/the organisation" as subject; (2) **never tell the reader what they cannot see** — grep the built page for "can't see"/"cannot see" before shipping; (3) **no claim of originality anywhere** — the disclaimer ("None of this is new and I wouldn't pretend it is…") must never be cut or softened.
- **Six sections:** condition hero (kicker "Signal to Noise · A diagnostic") → evidence ("It isn't just you": three big serif figures, sources linked — HBR 2015, Gartner 2025, Bain 2005; figures verified, never paraphrase) → **charcoal panel** "Two systems, one idea" (headline across, two iconed system cards side by side, lozenges one line at xl, plus a **full-width third card "Who's holding it"** — "People, mostly. Increasingly not.", chips Your team · Agencies · Partners · Contractors · **Agents last, deliberately** — this card IS the agentic point; the word AI must appear nowhere on the page; then "Someone who was in the room carries the reasons without being told. Everything else carries only what was written down.", never soften "everything else"; serif sign-off "What reaches your customer is whatever survived.") → **slate panel** (pull statement "Attention and connection is a function of signal to noise.", the diagram, the five principles as an icon row — owner overrode the brief's disclosure) → "Where it actually goes" (the three voices copy) → close on money ("…value is going missing. You're paying for it either way.").
- **The diagram** (`components/SignalToNoise.tsx`): native SVG, bone-on-slate; You/"said yes" figure and contextual end panels. **The whole system band is shaded** (the unobserved stretch is the journey, not a region — "the unobserved band" brief); the sight lines stop with bar terminators exactly at the band's edges, labelled **"loss of signal"** and **"acquisition of signal"** (spaceflight terms, lowercase); no text sits inside the band; centred caption beneath: "Everyone in the middle is doing their job properly. Nobody watches it move." Desktop static by design; **mobile cog labels cycle through all fourteen stages** (`sn-window` keyframes in globals.css, 3s beat, reduced-motion pins first labels). Full aria description on both tellings.
- No paragraph over three sentences; one pull statement; no client names or identifiable projects.

### Private pages
`/for/eterna` hub → Confidence Map + First Response proposals, Basic Auth + noindex + X-Robots-Tag, not in sitemap/llms.txt. Bespoke cream-and-gold house style (Fraunces/Hanken) on the Confidence Map. See the release-workflow memory for their content history.

## Visual system — palette v6 (unchanged)

Same table as before: bone `#F5F1EA`, ink/charcoal `#1F1F1D`, graphite `#5C5C58`, stone `#D8D3CB`, slate `blue-green #535B68`, clay `#A49786`, gold `#C0974A`. Gold TEXT on light uses deep gold `#7E5E27`; on slate use light gold `#EBD4A8` (plain gold fails AA on both bone and slate). White is always bone.

## Verification (the tooling is the hard part)

- **The headless Browser pane intermittently suspends rendering**: layout/geometry reads return zeros, screenshots capture blanks or ghosts, scroll locks at 0, CSS animation timelines freeze at t=0. The app is healthy — verify by **DOM/geometry measurement**, not screenshots. Wake tricks: take a screenshot to force a raster, real-input scroll, or as a last resort translate `document.body` and force FadeUp opacities for a capture. Frozen animations can be probed with negative `animation-delay`.
- **claude-in-chrome (the owner's real Chrome) is the reliable fallback** for interaction verification. Real-Chrome tabs also load render-suspended when occluded — hover/scroll wakes them.
- Breakpoint wrap checks (the no-widows rule, measured at 375/768/1024/1280): in-page injected `<script>` building same-origin iframes works in real Chrome; the pane's `resize_window` presets (mobile/tablet/desktop + explicit width) work when the pane is awake.
- `FadeUp` content sits at opacity 0 until revealed; closed `<details>` content is excluded from `innerText`; pinned `<br>` breaks concatenate words in `textContent` — write checks accordingly.

## Hard rules

1. **No em dashes** in user-facing copy; auto-substitute in supplied briefs and flag.
2. Wordmark **"DAB Hands"**; lockup is crown + serif wordmark; no circles/dots/halos.
3. White text is always **bone**.
4. Instrument Serif display / Manrope everything else; never force weight on the serif.
5. Audience labels Title Case with ampersand (label use only).
6. No widow words on display copy at any breakpoint; `.u-balance` is the guard, measurement is the proof.
7. Typographic apostrophes (') everywhere.
8. Briefs: keep the styling, fold in the strong builds; treat example copy as placeholder; verify factual claims; **the owner's live instruction beats the brief** — implement, then flag the conflict so the brief's record catches up.
9. The promise line appears once, sitewide.
10. Never `git add -A` on `public/` — 21 orphan images sit deliberately untracked (two are 2MB source PNGs); they were accidentally committed once (`3f17d71`) and untracked again (`c4d4a55`).

## Open items / TODO

- **Vercel deploy-stall root cause** — needs the owner in the dashboard; three occurrences, all fixed by empty retrigger.
- **Eterna lint debt** — 2 errors + 2 warnings in `pages/for/eterna/*`.
- **21 orphan images** in `public/images/` — still untracked; bin them to clean `git status` (owner keeps deferring, ask before deleting).
- **PathwayPicker keyboard pattern** — portal at end of tab order; known, non-blocking.
- **Sitemap**: `/signal-to-noise` entry carries 2026-08-17; keep lastmod discipline per release; `/safe-passage` never existed publicly, no redirect needed.
- **Signal to Noise sources** — the page carries three linked sources; brief v3's DoD said four (Snow & Keil was cut with the reports paragraph). CoS to reconcile.
- The `/for` pages still use older logo lockups; align only if asked.

## Working style

- Owner iterates fast, in small specific edits, frequently mid-turn — apply, verify (measurement first), build, commit each one, push the branch; production moves only on his explicit "push live". He often supersedes his own CoS briefs live; implement his call and flag the divergence.
- Copy briefs arrive versioned and adversarially reviewed; follow the copy block verbatim when it conflicts with its own instruction lines, and note the conflict.
- **Saved memory** lives at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` — read `MEMORY.md` first; the Signal to Noise page memory and release-workflow memory matter most.
