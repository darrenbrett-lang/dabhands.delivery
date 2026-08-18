# DAB Hands Website — Handover

Pick this up cold. The site is **LIVE in production** at `https://dabhands.delivery`. This captures it as of **18 August 2026** (release `97081ee` + `7bdae2c` retrigger): the **Signal to Noise diagnostic page** live and refined through an adversarial-review round, the **crown + wordmark lockup** site-wide, the homepage carrying the **promise line**, and the private **Eterna workspace** behind Basic Auth.

---

## Status (read first)

- **`main` = production.** Vercel auto-deploys on push to `main`. Live = `7bdae2c` (2026-08-18). `staging` agrees. The working branch **`eterna-workspace` is ONE commit ahead**: `fb63467`, the homepage **master testimonial carousel** ("In Their Words", all seven voices, above How I work; `components/Testimonials.tsx` extracted from the operator template with a `tone` prop) — **built and verified, awaiting the owner's go-live**.
- **The repo is a shared working directory across Claude sessions.** Branch/HEAD can change between sessions; always re-check `git branch` and `origin/main..HEAD` before committing. `content/homepage-refresh` is a dead branch (holds the abandoned Safe Passage v1); do not resurrect it.
- **Release flow:** develop on the branch, verify, commit each approved change, and release with `git push origin HEAD:staging HEAD:main` (fast-forward) **only when the owner says go**.
- **⚠ Vercel deploy stalls (FOUR occurrences: 2026-08-14, -16, -17, -18):** a push sometimes builds but never rolls out — symptom is the old page still serving with `x-vercel-cache: HIT` and a large `age`, new routes 404ing. Fix: `git commit --allow-empty -m "Retrigger Vercel deploy (<sha> not rolled out)"` and push to main; has resolved in ~10s all four times. 4/4 on substantial pushes points at a Vercel-side webhook/promotion fault; the owner has the dashboard task (Deployments entries for `97081ee` and `b5cd99f`) — sessions have no dashboard access and no `gh`/API tokens (git push works via SSH).
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
- **"Attention and connection are a function of signal to noise."** — cut twice as cryptic ("a line for a deck"); do not revive. Signal to noise lives only in the page title and the diagram, where it is earned.
- **The offer paragraph in the Signal to Noise close** ("Four to six weeks… three things come back") — added per the post-review brief, cut by the owner the same hour; the close is heading + money couplet + CTA + pathway picker.
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
- **In Their Words** (branch `fb63467`, awaiting go-live): the master testimonial carousel above How I work — all seven voices from the three rooms in one 6s rotation, light tone on bone, eyebrow + "From the people I've worked with." left. The rooms KEEP their own trust panels; whether to thin them now the homepage carries the master set is an open owner decision.

### The three rooms (`components/OperatorTemplate.tsx`)
Unchanged spine. Since July: each room's **"Typical engagements" module runs the page's doorway image full-bleed behind it at 10% opacity** (template-level, keyed off `hero.image`). Growth's **Neil Munn trust panel is live** ("In Their Words"). Marketing testimonials rotate at 6s (`proof.interval`), and its resolution line reads "arrived performing, and made the case for itself"; the closer reads "arrive intact, performing, and making its case".

### `/signal-to-noise` — the diagnostic page (NEW, nav-level, live 2026-08-17)
The deepest-iterated page on the site (owner briefs v1→v3 in one day, plus live art direction). **Read `~/.claude/.../memory/project_signal_to_noise_page.md` before touching it** — it records every decision and reversal. The short version:

- **It sells a finding, not a method.** Governing rules: (1) a person in every sentence — never "important work/signal/noise/the organisation" as subject; (2) **never tell the reader what they cannot see** — grep the built page for "can't see"/"cannot see" before shipping; (3) **no claim of originality anywhere** — the disclaimer ("None of this is new and I wouldn't pretend it is…") must never be cut or softened.
- **Six sections, as refined by the 18 Aug post-review round** (CMO + conversion reviewer + line editor): **condition hero** (kicker "Signal to Noise · A diagnostic"; headline + TWO body paras: the memory sentence, then "It gets a little smaller at every handover, always for a perfectly good reason. And nobody stops it, because everything is visibly moving, and movement gets read as health.") → **evidence** ("It isn’t just you": the **Gartner figure runs VISIBLE in body copy** ("…Gartner asked 403 of them in 2025.", linked — the one number in the reader’s own job title must never be hidden); Harvard + Bain sit behind the toggle **"Where these numbers come from"**; figures verified, never paraphrase) → **charcoal panel** "Two systems, one idea" (headline across; two iconed system cards side by side, lozenges one line at xl; the uncontained **"Who’s holding it"** ground block — "People, mostly. Increasingly not.", chips ending on **Agents, deliberately last** — this block IS the agentic point, the word AI must appear nowhere on the page; then the room-sentence and the both-systems paragraph as a **top-aligned pair, two lines each at desktop** (1:1.35 split, 15.5px at xl); "a piece of what mattered gets traded away") → **slate panel** (**"What reaches your customer is whatever survived." centred over the diagram at statement scale** — the old "Attention and connection…" pull is CUT, twice now, do not revive; the diagram; the five principles as an icon row) → **"Where it actually goes"** (the three voices: marketing / the agency / engineering, everybody telling the truth) → **"And what I do about it"** (the never-cut disclaimer ending "…the part that comes with experience.", the one-sentence name line "I’m Darren Brett, twenty years inside agencies and alongside global brands, keeping work like this moving.", the four squares with practice 02’s body serving its heading, and the **Dave Wallace quote** after practice 04, quiet left-rule treatment) → **close** ("Where is it going in your business?", the money couplet with a hard return before "You’re paying for it either way.", Start a conversation, and the **PathwayPicker beneath as the soft exit**). The offer paragraph (four-to-six-weeks) was added per the review brief and cut by the owner the same hour.
- **The diagram** (`components/SignalToNoise.tsx`): native SVG, bone-on-slate, viewBox 1250×456 desktop / 360×724 mobile. **Two people, one journey**: You/"said yes" left, **Customer/"at the other end"** right (sublabel deliberately spatial — "feels something" duplicated the impact list). **The whole band is shaded** (the unobserved stretch is the journey, not a region); sight lines stop with bars at the band’s edges, labels **"loss of signal"** / **"acquisition of signal"** sitting AT the bars (moments, not spans); system headings centred over their rows; impact panel = title + four outcomes (Feel something / Connect / Return again / Convert — intro line and "Notice" cut); centred caption: "Everyone in the middle is doing their job properly. Nobody watches it move." Desktop static by design; **mobile cog labels cycle through all fourteen stages** (`sn-window` keyframes in globals.css; reduced-motion pins first labels). Full aria description on both tellings.
- No paragraph over three sentences; no client names or identifiable projects in the copy (the Wallace attribution is the sanctioned exception, required by the review). Protected lines reviewers already tried to cut, which must stay: the disclaimer, "belongs to everyone belongs to no one", "Everyone in the middle is doing their job properly."

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

- **Vercel deploy-stall root cause** — needs the owner in the dashboard; FOUR occurrences now, all fixed by empty retrigger; reproducible enough for a support ticket.
- **Release the master testimonial carousel** (`fb63467`, branch only) when the owner says go; then decide whether the rooms' own trust panels thin.
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
