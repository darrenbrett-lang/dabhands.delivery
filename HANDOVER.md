# DAB Hands Website — Handover

Pick this up cold. The site is **LIVE in production** at `https://dabhands.delivery`. Updated **25 August 2026**. Since the 18 Aug Signal to Noise work, a run of doorway-page changes and a new top-level **Experience** page shipped (25 Aug) — read the Experience section below. The **Signal to Noise** page is unchanged since 18 Aug; still the most-iterated page, read its section before touching it.

**Recent releases (all straight to `main` via fast-forward from branch `signal-to-noise-fixes`, which now == `main`):** `dde9052` (24 Aug) doorway batch — entry product modules, Modules 2/3 rewrite, Operating Patterns 5→8; `444600e` (25 Aug) the Experience page + Contact "Let's talk" copy; `ab4c0c7` (25 Aug) Experience full record → three balanced columns. See the relevant page sections.

---

## Status (read first)

- **`main` = production.** Vercel auto-deploys on push to `main`. `staging` tracks it.
- **The working branch `eterna-workspace` is parked and now BEHIND production.** It holds three commits that never shipped: `fb63467` the homepage **master testimonial carousel** ("In Their Words", all seven voices, above How I work; `components/Testimonials.tsx`), plus two handover commits that describe a state the site has since moved past. **Rebase it onto `main` before doing anything with it**, and treat its HANDOVER.md as superseded by this file.
- **The repo is a shared working directory across Claude sessions.** Branch/HEAD can change between sessions; always re-check `git branch` and `origin/main..HEAD` before committing. `content/homepage-refresh` is a dead branch; do not resurrect it.
- **Release flow:** develop on a branch cut from `origin/main`, verify, commit each approved change, and release with `git push origin HEAD:staging HEAD:main` (fast-forward) **only when the owner says go**. Cut topic branches from `origin/main`, not from `eterna-workspace`, or the parked carousel rides along with the release.
- **⚠ Vercel deploy stalls (FIVE occurrences: 2026-08-14, -16, -17, -18 x2):** a push sometimes builds but never rolls out. Symptom: the old page still serving with `x-vercel-cache: HIT` and a large `age`, new routes 404ing. Fix: `git commit --allow-empty -m "Retrigger Vercel deploy (<sha> not rolled out)"` and push to main; resolves in ~10s every time. The owner has the dashboard task; sessions have no dashboard access and no `gh`/API tokens (git push works via SSH).
- **Always poll production after a release** (curl for a string unique to the change) — never assume the deploy landed.
- **Build gates:** `npm run build` + `npm run lint`. Lint carries **2 pre-existing errors in `pages/for/eterna/*`** (plain `<a>`→`<Link>`) and **4 warnings** (2 in `pages/for/eterna/index.tsx`, 2 unused colour consts in `components/SignalToNoise.tsx`). Inherited, not blockers.
- Routes: `/`, the three doorways, **`/experience`** (in the main nav between Who I help and Contact), **`/signal-to-noise` (UNLISTED, see below)**, `/contact`, `/404`, private `/for/eterna` (hub) → `/for/eterna/confidence-map` + `/for/eterna/first-response` (Basic Auth via `middleware.ts`, noindex), `/for/manifesto-digital`, `/design-system`.
- Repo: `git@github.com:darrenbrett-lang/dabhands.delivery.git`, Vercel project `dabhands-delivery`.

## The brand direction (source of truth)

A **mastery brand**: "the marks left behind by skilled hands." First person ("I"), calm, premium, editorial, earthy and grounded. Positioning spine: **"Keeping important work moving."** with "Most organisations don't lack good thinking. They struggle to preserve it."

- **The logo lockup is the drawn crown beside the serif "DAB Hands" wordmark.** Header: `crown-mark.webp` h-7/md:h-8 beside the 24/28px Instrument Serif wordmark. Footer: `DabHands_crown_white.png` h-[22px] beside the 19px bone wordmark on charcoal. **No dots, halos or circles, ever.** The `/for` pages carry older lockups; align only if asked.
- **The promise line** (homepage intro block): "Hand me an ambition and I'll tell you what it actually takes, then I'll make it happen." Largest type in that block (serif 28/30/32/40px), the only sentence on the site where Darren is the subject, and it appears **exactly once sitewide**. Nowrap phrase spans pin its line endings.
- **AI is context, not the proposition.** Two light touches only (homepage problem panel; Business page third engagement card). On Signal to Noise the word AI appears nowhere; the agentic point is carried by the "Agents" chip, deliberately last.
- **Factual framing:** Darren worked **inside agencies** and **alongside brands**, never "inside" the brands.

## Retired language and banned material (do not reintroduce)

- **"turn ambition into impact"** and variants — retired since July.
- **"Safe Passage"** as a product name — **retired permanently**: a UK refugee charity owns the search, there is a live US trademark, and the phrase is a common euphemism for dying. The diagnostic is **Signal to Noise**. ⚠ Brief v4 tried to revive it and the page's emphasised statement now reads "That sideways journey is the passage. Making it safe is the job." That is sanctioned **as metaphor only**. It must never become a label, a product name, or a heading. See the open items.
- **"70% of transformations fail"** — never on this site (Hughes 2011 found no empirical basis).
- **Boehm's 100x cost-of-change curve** — misrepresents its sources.
- **The Bain 2005 "80% vs 8%" figure** — cut in v4. From 2005, widely circulated, and the Harvard 80/20 pair does the job with a stronger claim.
- **The five-stage cascade** on Signal to Noise — built, judged a failure, cut by decree.
- **"Attention and connection are a function of signal to noise."** — cut twice as cryptic. Do not revive.
- **The offer paragraph** ("Four to six weeks… three things come back") — added twice on review advice, cut by the owner both times, most recently 18 Aug. The close is heading + money couplet + CTA + pathway picker. **Do not add it a third time.**
- **The name line** ("I'm Darren Brett, twenty years inside agencies…") — added because a review wanted a name on the page, cut by the owner 18 Aug. Brief v4 independently agreed: "considered and rejected."
- **The word "leak"** — banned on the page by the owner, 18 Aug. Brief v4 quotes an older paragraph containing it; that quote is stale.
- **Em dashes** in user-facing copy — hard rule; substitute in supplied briefs and flag.
- **Verbless codas** — banned by brief v4's writing rules: no fragment appended to land a paragraph, no paragraph ending on a bare quantity. Every sentence gets a verb.

## Stack

- **Next.js 16.2.6** (Pages Router, Turbopack). Read `node_modules/next/dist/docs/` before adding Next features. `middleware.ts` provides Basic Auth for `/for/eterna*` (login `eternagrowth`/`fillthechairs`).
- **Tailwind v4** (`@import "tailwindcss"` + `@theme` in `styles/globals.css`). Newly added `@theme` tokens need a dev restart.
- **Framer Motion 12** — `FadeUp` for below-fold reveals; `MotionConfig reducedMotion="user"` wraps the app.
- **First-viewport entrances are CSS** (`.rise`), not framer — this is the LCP fix.
- **Fonts:** Instrument Serif (display) + Manrope (UI) via `next/font`; the `:root` font-var `<style>` in `_app.tsx` is load-bearing.
- **⚠ Two `.next` gotchas:** (1) never run `npm run build` while a dev server is running — stop dev → build → `rm -rf .next` → restart; (2) raw additions to `styles/globals.css` do not hot-reload.

## Pages

### `/` — homepage
Hero → Darren intro → problem panel → turns → ticker → How I work → doorway cards → closer.
- **Hero cue** is "See who I help +" (PathwayPicker).
- **Darren intro block** (rewritten 18 Aug): "Hi, I'm Darren." small sans → the promise line, largest → three 18px body paras. The career sentence now names **running his own business** alongside the agency and brand work; the block closes on "Important work rarely goes wrong because the idea was weak. It goes wrong because nobody said the expensive thing out loud while there was still time.", which hands straight into the problem panel. Sets 3/3/3 lines at 1280.
- **Problem panel** (rewritten 18 Aug): heading "The tools are changing. / The problems aren't." and the P&Ls line are unchanged; the three paragraphs beneath now argue the AI gap — a better first draft joins the same queue, waits on the same decision, and stops with the same person who isn't sure they can say the work can go. **"The work loses strength." and "The system creates noise. That's what systems do." are retired from the homepage**: that framing belonged to Signal to Noise, which is now unlisted.
- **How I help lead-in** stays "I work alongside leaders of agencies…" (an MDs/CEOs variant shipped 2026-07-14 and was reverted same day; don't resuggest).
- **How I work** closes on "The team expands only when the work demands it. Never the other way around."
- **Doorway cards** carry the overlay lines.
- **In Their Words** — the master testimonial carousel is built but **NOT live**, parked on `eterna-workspace` (`fb63467`).

### The three rooms (`components/OperatorTemplate.tsx`)
8-section spine. Each room's "Typical engagements" module runs the page's doorway image full-bleed behind it at 10% opacity. Growth carries the Neil Munn trust panel. Marketing testimonials rotate at 6s (`proof.interval`); `Testimonials` is now **exported** for reuse on the Experience page.
**24 Aug additions (all three rooms):** Modules 2 (Situation) and 3 (Challenge) rewritten to symptom → mechanism → a closing-line "measure" (B&A/Marketing M3 cut to two short paras; B&A close in second person; Marketing close + Growth headline preserved). A buyable **entry product module** (`components/EntryProduct.tsx`, one component + 3 copy variants: Programme/Launch/Business Read) sits after the testimonials, before the Close: Warm Clay band, Soft Grey cards three-across, collapsed "The honest bits" `<details>`, **no gold**, small text is Ink for AA on the mid-tone. Operating Patterns on B&A went **5 → 8** patterns (renumbered 01–08; eight is the ceiling; no figures, never names another's difficulty, never "failed").

### `/experience` — the full career record (new, 25 Aug)
Top-level page in the main nav (`pages/experience.tsx`), between Who I help and Contact. Header: doorway clay-wash vignette, copy left + the square **`darren-brett_colour_headshot.jpeg`** on the right (the doorway-hero treatment). Sections: a **charcoal** showcase rail of seven leadership-impact tiles (two columns each; prev/next/dots via a keyboard-navigable `ScrollRail`; each tile's outcome behind a one-way "What came of it" `<details>`) → **"The full record"** (closed-by-default disclosure of nine roles in reverse order; each a gold org heading — `#9A7735`, the AA-safe deep gold, at ≥24px — plus dates/location and a slate role title, with the detail flowed across **three balanced CSS-multi-column columns**, `md:columns-3` + `break-inside-avoid`; no "More" link) → the shared slate **"In their words"** panel (reused `Testimonials`) → the **"Trusted where the stakes are high"** `LogoTicker` → the doorway close CTA ("Recognise any of it?"). **Rules: no money figures anywhere** (scale is non-financial only), nobody else's difficulty named, no "failed", British English, no em dashes. One-way disclosures use `details[open] > summary { display:none }`; a `beforeprint` handler opens everything for print. `SeoMeta` uses `og-card-3`; route is in sitemap + llms.txt. Was `/track-record` for one build, renamed to `/experience`.

### `/contact`
Copy refreshed 25 Aug: heading **"Let's talk."**, then two paragraphs ("You do not need it worked out before you get in touch…" / "Tell me what is happening. I will tell you what I think, and whether I am the right person for it."). Clay wash + the three channels unchanged.

### `/signal-to-noise` — the diagnostic page
**⚠ UNLISTED as of 18 August 2026, by the owner's instruction.** The route still resolves and the URL can be shared directly, but there are **no links to it anywhere on the site**. Hidden in four places, all of which must be reversed together to bring it back: the two `components/Header.tsx` nav links (desktop and mobile, the mobile Contact item inherited its `border-t`), the `sitemap.xml` entry, the `llms.txt` entry, and the noindex (`SeoMeta noindex` prop plus an `X-Robots-Tag` route header in `next.config.ts`). Nothing was deleted.

**The most-iterated page on the site. Read this whole section before editing it.** Briefs v1→v4 all landed on 17–18 August, and the owner repeatedly superseded his own briefs live. **The owner's live instruction always beats the brief**; implement it, then flag the divergence.

**The argument, in order.** The condition → the evidence → two systems and the diagram → why the fixes don't hold → the turn → what that takes → where the value is going.

**Governing rules.** (1) A person in every sentence: never "important work", "signal", "noise" or "the organisation" as the subject. (2) Never tell the reader what they cannot see; grep the built page for "can't see"/"cannot see" before shipping. (3) No claim of originality anywhere. (4) No verbless codas. (5) No paragraph over three sentences. (6) No client names beyond the one sanctioned attribution.

**Colour is structural, not atmospheric.** Charcoal is the mechanics of the problem, slate is the proof, one black band is the turn, everything else runs on bone. The page reads bone, bone, charcoal, slate, bone, charcoal band, bone, bone. **Do not add another dark section** — contrast only reads when it is rationed, and a third dark stretch would cost the page its darkest moment.

**Section by section.**

1. **The condition** (bone). Kicker "Signal to Noise · A diagnostic". Headline "The idea was good. Everybody was competent. It still arrived weaker than it left." Two body paragraphs; the second ends "…movement gets read as **progress**."
2. **The evidence** (bone), "It isn't just you". The **Gartner figure runs VISIBLE in body copy** as two sentences plus the linked "Gartner asked 403 of them in 2025." The one number in the reader's own job title must never be hidden. Two **Harvard** figures sit behind the toggle "Where these numbers come from": the 9% cross-functional reliance figure, and the **80/20 pair** (more than eight in ten had a formal cross-silo mechanism; two in ten thought it worked). **The 80/20 pair is load-bearing** — it proves the mechanisms are present and already failing, which is what makes section 4 necessary. Figures verbatim from the studies, never paraphrased.
3. **Two systems** (charcoal), "One idea, two systems, many hands". No subcopy; the headline carries it and hands off to the ground block. Two iconed system cards, then the uncontained **"Who's holding it"** block ("People, mostly. Increasingly not.", chips ending on **Agents, deliberately last** — this block IS the agentic point). The consequence paragraph sits **beside** that block on the same `1fr 1.35fr` grid, top-aligned, not beneath it.
   **3b. The diagram** (slate). "What reaches your customer is whatever survived." centred over it at statement scale. `components/SignalToNoise.tsx`: native SVG, bone-on-slate, viewBox 1250×456 desktop / 360×724 mobile. Two people, one journey: You/"said yes" left, Customer/"at the other end" right. Whole band shaded; sight lines stop with bars at the band's edges, labelled "loss of signal" / "acquisition of signal". Impact panel lists **Notice, Feel something, Connect, Return again, Convert** — Notice is first deliberately; nobody feels something they did not notice. Caption: "Noise gets in at every node between systems, teams, people and agents. None of it looks like much on its own." Desktop static by design; mobile cog labels cycle all fourteen stages (`sn-window` keyframes; reduced motion pins first labels). Then the five principles as an icon row.
4. **Why the fixes don't hold** (bone) — **the crux, added in v4, and the only part of the page that says why any practice is needed.** Every job is accountable upwards, the work travels sideways, and nothing measures the sideways journey. Three paragraphs in **two columns on the practices' own 980px grid**, so the two modules share a spine.
5. **The turn** (charcoal band). "That sideways journey is the passage. Making it safe is the job." Alone on the darkest ground on the page: no heading, no supporting copy, one sentence in the frame, left on the container spine because centring makes it a slogan. Serif 30/40/44px. **This is the page's single emphasised statement** and the band is what makes that true. See the Safe Passage warning above.
6. **What that takes** (bone). Heading is **not** first person — the practices are imperatives and "what I do" fought them. The disclaimer and the precondition run as **two columns on the cards' grid** (478px columns, 24px gap, each starting on the box beneath it). Disclaimer: "None of this is new and I wouldn't pretend it is… Each one closes a place where noise gets in." Precondition (unnumbered, not a card): two things get written down before anything starts. Then the four practices as cards: **01** finish the brief before you start, **02** assume the person who decided it won't be there, **03** agree who decides when two parts of the business disagree, **04** log every trade against the original. Then the **outcome line** ("More signal survives…", serif 24/28px, left, no rule or quote marks), then the **Dave Wallace quote**.
   ⚠ **02 and 04 must not blur:** gates are event-driven and sit at the handovers, reporting is time-driven and sits on a schedule. Those two lines contradicted each other in an earlier version.
7. **The close** (bone). "Where is the value going in your business?", the money couplet with a hard return before "You're paying for it either way.", "Start a conversation", and the PathwayPicker beneath as the soft exit.

**Protected lines.** Reviewers have tried to cut these; they stay: the disclaimer's opening ("None of this is new and I wouldn't pretend it is"), "a thing that belongs to everyone belongs to no one", and the 80/20 evidence pair. **Three previously protected lines were deliberately retired by the owner on 18 Aug** and must not be restored: "Everyone in the middle is doing their job properly. Nobody watches it move." (was the caption), "…the part that comes with experience." (was the disclaimer's ending), and the name line.

### Private pages
`/for/eterna` hub → Confidence Map + First Response proposals, Basic Auth + noindex + X-Robots-Tag, not in sitemap/llms.txt. Bespoke cream-and-gold house style (Fraunces/Hanken) on the Confidence Map.

## Visual system — palette v6

bone `#F5F1EA`, ink/charcoal `#1F1F1D`, graphite `#5C5C58`, stone `#D8D3CB`, slate blue-green `#535B68`, clay `#A49786`, gold `#C0974A`. Gold TEXT on light uses deep gold `#7E5E27`; on slate use light gold `#EBD4A8` (plain gold fails AA on both bone and slate). **White is always bone.**

## Components worth knowing

- **`PathwayPicker`** — placement is viewport-aware. `place()` measures the room above and below the trigger and anchors the panel to the side it fits on, clamped clear of the side edges, re-run in a layout effect once the panel can be measured so the flip never paints. This matters because the picker is the last element on `/signal-to-noise`, where the panel used to open off the bottom of a phone with no way to reach it (scrolling closes it). It also flips on the homepage hero at short viewports. Keyboard: portal sits at the end of tab order; known, non-blocking.
- **`SignalToNoise`** — see section 3b above. Two tellings, full aria description on both; update `DESCRIPTION` whenever the drawing changes.

## Verification (the tooling is the hard part)

- **The headless Browser pane intermittently suspends rendering**: geometry reads return zeros, screenshots capture blanks or ghosts, scroll locks at 0, animation timelines freeze at t=0. The app is healthy — **verify by DOM/geometry measurement, not screenshots.** Wake tricks: take a screenshot to force a raster, real-input scroll, or reload. A `computer` action can time out entirely when the pane is hidden.
- **React needs a moment to hydrate** on a freshly compiled dev route; a synthetic `.click()` before hydration silently does nothing. Check for a `__react` key on the node before trusting an interaction test.
- **`FadeUp` holds content at opacity 0 with a transform until revealed**, which corrupts geometry reads. Force `opacity: 1; transform: none` across the section before measuring.
- **claude-in-chrome was NOT connected** this session; the usual real-Chrome fallback was unavailable.
- Breakpoint wrap checks (the no-widow rule, measured at 375/768/1024/1280): build visual lines by measuring each word's own client rect via a `Range`, then group by top. This is the only reliable widow check.
- Closed `<details>` content is excluded from `innerText`; pinned `<br>` breaks concatenate words in `textContent`.

## Hard rules

1. **No em dashes** in user-facing copy; auto-substitute in supplied briefs and flag.
2. Wordmark **"DAB Hands"**; lockup is crown + serif wordmark; no circles/dots/halos.
3. White text is always **bone**.
4. Instrument Serif display / Manrope everything else; never force weight on the serif.
5. Audience labels Title Case with ampersand (label use only).
6. No widow words on display copy at any breakpoint; `.u-balance` is the guard, **measurement is the proof**.
7. Typographic apostrophes (') everywhere.
8. Briefs: keep the styling, fold in the strong builds; treat example copy as placeholder; verify factual claims; **the owner's live instruction beats the brief** — implement, then flag the conflict.
9. The promise line appears once, sitewide.
10. Never `git add -A` on `public/` — 21 orphan images sit deliberately untracked.

## Open items / TODO

- **`/signal-to-noise` is unlisted and the owner has not said for how long.** Check before writing anything that assumes it is public, and reverse all four hiding points together if it comes back.
- **Safe Passage, decide it properly.** The page's emphasised statement now assembles the retired name in the reader's head. Sanctioned as metaphor; if it is ever to become the offer's name again, that is a trademark and reputation decision, not a copy one.
- **Rebase or retire `eterna-workspace`.** It is behind production and holds the unreleased carousel. Decide whether the rooms' own trust panels thin if the carousel ships.
- **"People, mostly. Increasingly not."** is the last verbless copy on Signal to Noise. Brief v4 declared that row unchanged, so it was left; it fails v4's own writing rule if anyone audits.
- **Vercel deploy-stall root cause** — five occurrences, all fixed by an empty retrigger. Reproducible enough for a support ticket.
- **Eterna lint debt** — 2 errors + 2 warnings in `pages/for/eterna/*`; 2 unused colour consts in `components/SignalToNoise.tsx`.
- **21 orphan images** in `public/images/` — still untracked; ask before deleting.
- **Sitemap**: keep `lastmod` discipline per release for `/signal-to-noise`.
- **Signal to Noise sources** — the page carries linked sources for Gartner and Harvard. Bain is gone, so the count changed; check nothing else references it.
- The `/for` pages still use older logo lockups; align only if asked.

## Working style

- Owner iterates fast, in small specific edits, frequently mid-turn — apply, verify (measurement first), build, commit each one; production moves only on his explicit instruction. He often supersedes his own briefs live; implement his call and flag the divergence.
- He asks for design judgement directly. Give a recommendation and the reasoning, then build it, rather than offering a menu.
- Copy briefs arrive versioned and adversarially reviewed. Follow the copy block verbatim when it conflicts with its own instruction lines, and note the conflict. **Check supplied briefs against the live page before implementing** — v4 quoted paragraphs the owner had already changed hours earlier.
- **Saved memory** lives at `~/.claude/projects/-Users-darrenbrett-Projects-DAB-Hands-Website/memory/` — read `MEMORY.md` first.
