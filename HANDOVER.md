# DAB Hands Website — Handover

Pick this up cold. The site is **LIVE in production** at `https://dabhands.delivery`. Updated **26 August 2026**. The newest thing is **`/feel`**, the FEEL method deck: a private, Basic Auth full-screen slide deck, unlike anything else in the repo. Read its section before touching it, and note that `proxy.ts` now runs two auth gates, not one. Since the 18 Aug Signal to Noise work, a run of doorway-page changes and a new top-level **Experience** page shipped (25 Aug), followed by the **master brief pass** (25 Aug) that finished the Business & Agency page — read the master brief section below. The **Signal to Noise** page is unchanged since 18 Aug; still the most-iterated page, read its section before touching it.

**Recent releases (all straight to `main` via fast-forward from branch `signal-to-noise-fixes`, which now == `main`):** `dde9052` (24 Aug) doorway batch — entry product modules, Modules 2/3 rewrite, Operating Patterns 5→8; `444600e` (25 Aug) the Experience page + Contact "Let's talk" copy; `ab4c0c7` (25 Aug) Experience full record → three balanced columns; **the master brief pass** (25 Aug) — homepage intro + problem panel trimmed, the whole B&A page brought onto brief copy, Contact reply promise; **Growth page v2 + homepage turns** (25 Aug) — the Growth doorway rebuilt to its own v2 brief and the three "How I help" turns rewritten. See the relevant page sections.

---

## Status (read first)

- **`main` = production.** Vercel auto-deploys on push to `main`. `staging` tracks it.
- **The working branch `eterna-workspace` is parked and now BEHIND production.** It holds three commits that never shipped: `fb63467` the homepage **master testimonial carousel** ("In Their Words", all seven voices, above How I work; `components/Testimonials.tsx`), plus two handover commits that describe a state the site has since moved past. **Rebase it onto `main` before doing anything with it**, and treat its HANDOVER.md as superseded by this file.
- **The repo is a shared working directory across Claude sessions.** Branch/HEAD can change between sessions; always re-check `git branch` and `origin/main..HEAD` before committing. `content/homepage-refresh` is a dead branch; do not resurrect it.
- **Release flow:** develop on a branch cut from `origin/main`, verify, commit each approved change, and release with `git push origin HEAD:staging HEAD:main` (fast-forward) **only when the owner says go**. Cut topic branches from `origin/main`, not from `eterna-workspace`, or the parked carousel rides along with the release.
- **⚠ Vercel deploy stalls (FIVE occurrences: 2026-08-14, -16, -17, -18 x2):** a push sometimes builds but never rolls out. Symptom: the old page still serving with `x-vercel-cache: HIT` and a large `age`, new routes 404ing. Fix: `git commit --allow-empty -m "Retrigger Vercel deploy (<sha> not rolled out)"` and push to main; resolves in ~10s every time. The owner has the dashboard task; sessions have no dashboard access and no `gh`/API tokens (git push works via SSH).
- **Always poll production after a release** (curl for a string unique to the change) — never assume the deploy landed.
- **Build gates:** `npm run build` + `npm run lint`. Lint carries **2 pre-existing errors in `pages/for/eterna/*`** (plain `<a>`→`<Link>`) and **4 warnings** (2 in `pages/for/eterna/index.tsx`, 2 unused colour consts in `components/SignalToNoise.tsx`). Inherited, not blockers.
- Routes: `/`, the three doorways, **`/experience`** (in the main nav between Who I help and Contact), **`/signal-to-noise` (UNLISTED, see below)**, **`/feel` (PRIVATE, Basic Auth, see below)**, `/intro` (UNLISTED), `/contact`, `/404`, private `/for/eterna` (hub) → `/for/eterna/confidence-map` + `/for/eterna/first-response` (Basic Auth, noindex), `/for/manifesto-digital`, `/design-system`. ⚠ The Basic Auth gate lives in **`proxy.ts`** (Next 16 renamed the `middleware` convention to `proxy`); earlier notes in this file call it `middleware.ts`.
- Repo: `git@github.com:darrenbrett-lang/dabhands.delivery.git`, Vercel project `dabhands-delivery`.

## The brand direction (source of truth)

A **mastery brand**: "the marks left behind by skilled hands." First person ("I"), calm, premium, editorial, earthy and grounded. Positioning spine: **"Keeping important work moving."** with "Most organisations don't lack good thinking. They struggle to preserve its impact."

- **The logo lockup is the drawn crown beside the serif "DAB Hands" wordmark.** Header: `crown-mark.webp` h-7/md:h-8 beside the 24/28px Instrument Serif wordmark. Footer: `DabHands_crown_white.png` h-[22px] beside the 19px bone wordmark on charcoal. **No dots, halos or circles, ever.** The `/for` pages carry older lockups; align only if asked.
- **The promise line** (homepage intro block): "Hand me an ambition and I'll tell you what it actually takes, then make it happen. And when the work needs more than me, I bring the senior bench behind me." Still the only sentence on the site where Darren is the subject, and it appears **exactly once sitewide**. ⚠ **It is no longer the largest type in the block.** On 25 Aug the owner ruled that P2 carries exactly one Instrument line — the role line — so the promise line came out of serif and now sets at body scale (18px Manrope) in position four of five, between two body paragraphs. Full Ink against the others' Ink/70 is the only thing separating it from the prose. The old nowrap phrase spans are gone with the display treatment. This was flagged to the owner on screen and confirmed.
- **The opening line** is now "Hi, I'm Darren." at body scale, followed by **"A fractional COO for digital-first agencies and growth-stage brands." in Instrument Serif** at 24/26/28px (25 Aug). This is the first time the site names a **role**; the positioning spine above it is unchanged.
- **P2 runs five blocks in this order** (settled 25 Aug after several passes): "Hi, I'm Darren." → the serif role line → "For most of my career…" → the promise line → "Sometimes that means setting the direction…". The two body paragraphs were cut and then reinstated by the owner within the same session; this is the final order.
- **Role clues** appear in three places, and the nav is deliberately NOT one of them (25 Aug: added to the nav flyout, then reverted by decree the same day — the clue lives in the page breadcrumb, not the nav).
  1. **Doorway hero eyebrow** (`OperatorTemplate`, optional `role` on the content object): `FOR [AUDIENCE] · [ROLE]`, audience in the existing eyebrow grey, role in **`--color-gold`** at weight 500. Eyebrow has `pt-2 mb-10` (was `mb-6`) for clearance beneath.
  2. **Homepage doorway cards** — `eyebrow` in **deep accent `#7E5E27`**.
  3. **Experience page header** — folded into a single breadcrumb `EXPERIENCE · FRACTIONAL COO` on `--color-gold`, matching the doorway pattern.
  ⚠ **The two golds differ on purpose and it is a live tension.** At 11px, `--color-gold` (#C0974A) measures **2.28:1** on the doorway hero and 2.04:1 on the clay wash — both well under the 4.5 AA needs for text that size. `#7E5E27` clears it (4.51 on the cards, 5.30 on a bone panel). The owner specified the gold token for the breadcrumb after being shown these numbers, so the breadcrumb fails AA by decision. Do not "fix" it silently. To unify, either move the cards and Experience to `--color-gold` (consistent, all failing) or move the breadcrumb to `#7E5E27` (consistent, all passing).
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
- **Darren intro block** (rewritten 18 Aug): "Hi, I'm Darren." small sans → the promise line, largest → three 18px body paras. The career sentence now names **running his own business** alongside the agency and brand work; the career sentence now closes "In the delivery detail and in the boardroom." **Nothing follows "making sure what comes out performs."** — the "Important work rarely goes wrong…" paragraph was cut 25 Aug by the master brief, which makes the performs line the block's close. Do not re-add a fourth paragraph.
- **Problem panel** (rewritten 18 Aug): heading "The tools are changing. / The problems aren't." and the P&Ls line are unchanged; the panel runs to **four beats only**: heading, the P&Ls line, "The constraint was never the tool…", "That's the part I work on." The detour paragraph ("That gap isn't about the technology. A better first draft still joins the same queue…") was cut 25 Aug by the master brief. **Do not restore it.** Note the two columns are uneven at 1280 as a result (heading 373px, prose 235px), which is accepted. **"The work loses strength." and "The system creates noise. That's what systems do." are retired from the homepage**: that framing belonged to Signal to Noise, which is now unlisted.
- **How I help lead-in** stays "I work alongside leaders of agencies…" (an MDs/CEOs variant shipped 2026-07-14 and was reverted same day; don't resuggest).
- **How I work** closes on "The team expands only when the work demands it. Never the other way around."
- **Doorway cards** carry the overlay lines.
- **In Their Words** — the master testimonial carousel is built but **NOT live**, parked on `eterna-workspace` (`fb63467`).

### The three rooms (`components/OperatorTemplate.tsx`)
8-section spine. Each room's "Typical engagements" module runs the page's doorway image full-bleed behind it at 10% opacity. Growth carries the Neil Munn trust panel. Marketing testimonials rotate at 6s (`proof.interval`); `Testimonials` is now **exported** for reuse on the Experience page.
**24 Aug additions (all three rooms):** Modules 2 (Situation) and 3 (Challenge) rewritten to symptom → mechanism → a closing-line "measure" (B&A/Marketing M3 cut to two short paras; B&A close in second person; Marketing close + Growth headline preserved). A buyable **entry product module** (`components/EntryProduct.tsx`, one component + 3 copy variants: Execution/Launch/Business Read) sits after the testimonials, before the Close: Warm Clay band, Soft Grey cards three-across, collapsed "The honest bits" `<details>`, **no gold**, small text is Ink for AA on the mid-tone. Operating Patterns on B&A went **5 → 8** patterns (renumbered 01–08; eight is the ceiling; no figures, never names another's difficulty, never "failed").

### The master brief pass (25 Aug)

The "Master brief for Code · DAB Hands website" (24 Aug) supersedes every earlier brief. Most of it had already shipped in the 24–25 Aug batches; the outstanding gap was the **Business & Agency page**, which the 24 Aug batch skipped. Now done:

- **B&A hero** "Strategy is rarely the constraint. Execution is." / "I help leadership teams get more from what they already have."
- **B&A Modules 2, 3, 4** on brief copy. This removed the fabricated **"work that took a fortnight now takes six weeks"** — a measurement Darren could not evidence. **Never reintroduce measurements.**
- **B&A engagement cards** all three replaced, with the brief's mailto subjects and bodies. ⚠ **Protect card three** ("You have won something bigger than you have run before") — the only card on the site offered against good news rather than trouble, it reaches people ~6 months before the rescue version, and it is backed by Falabella and Audi.
- **B&A closing CTA** "Most of what you need is already bought. / The question is what you are getting back from it."
- **Operating Patterns intro** rewritten. **"These aren't case studies" is gone by decree** — it apologised for the section that does the most work on the page. The word *transformation* is out of the intro (it survives only in pattern 07, which the brief leaves unchanged).
- **The Programme Read → The Execution Read** on B&A. The page argues execution capacity is an organisational asset; a product scoped to one programme contradicted the argument the reader had just agreed with and read as a bait and switch.
- **Closing-line treatment (§11)** now has a slot on Module 4 via optional `outcomes.resolution` in `OperatorTemplate`: hairline, one step above body, serif, **body colour, no gold, no italics**.

**Type-scale change worth knowing about.** The Module 3 thesis lost its `md:text-[72px]` step and now holds 62px from 768 to 1023. At exactly 768 the grid halves that column to ~332px while the type had been jumping to 72px, which widowed the last word. Affects all three doorways in that range.

**Brief items deliberately NOT implemented:**

1. **"I call it safe passage" (§8.6)** — the brief revives it in the Marketing entry module. **Safe Passage is retired permanently** (UK refugee charity owns the search, live US trademark, common euphemism for dying). It is absent from the site and stays absent unless the owner overrides. See the retired-language section above.
2. **"Track Record" naming (§1, §9)** — shipped as **Experience** at `/experience`; the rename post-dates the brief.
3. **Full-record "More" links (§9.4)** — shipped as three balanced columns instead.
4. **Entry module layout and colour (§8.2, §8.3)** — shipped as Soft Grey cards three-across with Ink small text for AA, not the brief's stacked hairline blocks with `#3F312D`.

**Reference files the brief cites are not in the repo:** `Track_Record.html` and `LinkedIn_v3.md` were not found anywhere on the machine.

**Open item — widows at 768 on Growth.** The three "Typical engagements" card headings on `/growth-stage-businesses` each end on a single word at exactly 768px, which the brief's definition of done forbids. Pre-existing, on copy the brief leaves unchanged. Cause is structural: three cards across a 768 viewport gives each a **157px** heading column. Fixing it needs two-across at that breakpoint, a smaller heading at `md`, or a copy change — an owner decision, not a quiet one. B&A and Marketing are clean at 1440/1024/768/390.

### Growth-Stage Businesses v2 (25 Aug)

Rebuilt to "Brief for Code · Growth-Stage Businesses page v2", which supersedes section 7 of the master brief. **The page now runs three beats:** what the business should be focused on (M3), what gets built so that happens (M4 para 2 + The Business Read), and **who keeps it honest once it exists** (M4 para 3 + the close). That third beat is the argument for a fractional arrangement rather than a project, and it was missing from every earlier draft.

- **Hero** "Most growing businesses have never had to write down how they run." / "I build the operating system first, then help keep it honest." The old headline duplicated the new B&A Module 2 line; **two doorways must not open on the same sentence.**
- **M2** reinstates "building a business that can keep pace with the one you have already created".
- **M3** leads on "The question is no longer what you could do. / It is what you should do." — moved up from M4, where it was the best line on the page and buried.
- **M4** opens on the peer credential ("I have built and scaled my own business"), carries the health paragraph ("An operating system decays…"), and closes on **"The outcome is not more process."** ⚠ All three are load-bearing: the credential does more work than any other sentence for a founder, and "not more process" answers the thing a founder actually fears when someone like Darren arrives.
- **Cards** all three replaced. Card one keeps its live title. **Card three is the positive trigger** (investment has arrived), matching the B&A pattern — it reaches people while the news is still good.
- **Close** "Foundations first. / Then somebody to keep them honest."
- **The Business Read** re-scoped from "what breaks first" to establishing the line between ambition and this quarter. "Sometimes I stay a day or two a month to keep it honest" is **the only place on the site that says what an ongoing fractional arrangement looks like** — deliberately small and specific, because vagueness makes buyers assume it grows.

**⚠ Open: the Business Read contradicts itself on duration.** The duration line says "Three weeks", the What-it-is body says "A couple of weeks". Flagged twice and shipped as-is by the owner's decision. The other two Reads agree with themselves (Execution "Two to three weeks", Launch "One to two weeks"). Resolve by setting the duration line to "Two weeks" or restoring "Three weeks" to the body — it is a pricing call, not a copy tidy.

**Card titles now carry no forced `\n` breaks.** That was deliberate: at 768 these cards are ~157px wide and a hard break fights `text-balance` into a widow. It also cleared the three pre-existing 768 widows on this page.

**The page must not become a strategy consulting page.** The distinction to preserve: most strategy is written by people who never have to deliver it, which is why so much of it does not survive contact. This arrives already costed, sequenced and possible. Foundations are built here in order to be run, not to be presented.

**Operating Patterns on Growth is unchanged** and is now the proof for the whole page, not an aside. Leave "Growth only scales when the operating system does", the Anchor Leg story and the Neil Munn testimonial exactly where they are. (Its intro still reads "These aren't startup stories." — the same apologetic construction struck from B&A. The v2 brief said unchanged, so it stayed; worth revisiting.)

### Homepage "How I help" turns (25 Aug)

The three from→to turns kept their pairs and the gold italic "into"; only the bodies were rewritten, over several rounds with the owner. Final state:

- **Strategic direction into operating reality** — now allows that strategy is sometimes not written down at all.
- **System complexity into coordinated flow** — opens on "Complexity compounds faster than capability", a **deliberate echo** of the B&A Module 2 headline (homepage body previewing the doorway, not two doorways colliding). Closes on "more of what you spend comes back", the only place on the homepage that puts a return on the argument.
- **Important work into real results** — describes the safe-passage *mechanism* in plain terms (agree what cannot be traded, make it travel with the work) while staying clear of the retired label, closing on "make sure it still moves someone when it arrives".

**Columns are now exactly even** at every width (3+3 lines at 1440, 4+4 at 1024, 6+5 at 768) after the 25 Aug copy pass — worth preserving when editing these bodies.

**Each turn now ends on a serif payoff line** in its own paragraph: Instrument Serif, 20/19/21px, **Ink, no gold, no italics** — the same rule as the doorway closing lines. The three payoffs **start on the same line**, via CSS subgrid: the parent grid declares three rows (`md:grid-rows-[auto_auto_auto]`) and each column is `md:grid md:grid-rows-subgrid md:row-span-3`, so heading, body and payoff each share a row height across the columns. ⚠ Internal spacing at md comes from the grid's `md:gap-y-6`, not margins (`mt-4`/`mt-5` are `md:mt-0`); `gap-y-12` only separates the columns when stacked. Do not reintroduce a wrapper `<div>` inside `FadeUp` — the three children must be direct grid items or the subgrid breaks. An earlier `flex-1` attempt bottom-aligned them instead, which misaligned the tops whenever payoff line counts differed.

**Doorway card sub-lines** (the `MOMENTUM` support lines) rewritten 25 Aug: B&A "When the work is landing / and the return isn't." and Growth "When the ambition is real but / nothing has turned it into a plan." Marketing is unchanged and is exactly right. Card three's line is ~40% longer than the other two, so it sets **three lines at 768** where the card is 213px, against two for the others. Accepted; shortening the copy is the only real fix. The middle column runs longer because it carries more argument; two rounds of trimming got it here and further cuts would cost the return clause. Accepted as-is.

### `/experience` — the full career record (new, 25 Aug)
Top-level page in the main nav (`pages/experience.tsx`), between Who I help and Contact. Header: doorway clay-wash vignette, copy left + the square **`darren-brett_colour_headshot.jpeg`** on the right (the doorway-hero treatment). **Header stack (25 Aug):** breadcrumb `EXPERIENCE · FRACTIONAL COO` → the **h1 is now "Part delivery lead, part digital operator, all entrepreneur's engine."** in Instrument, the page's only Instrument line → "Twenty years running other people's programmes. Seven running my own business." and "Below is what I ran…", both **Manrope** at 20px. The twenty-years line used to be the serif h1; it was demoted 25 Aug, the same one-Instrument-line rule the homepage intro follows. Sections: a **charcoal** showcase rail of seven leadership-impact tiles (two columns each; prev/next/dots via a keyboard-navigable `ScrollRail`; each tile's outcome behind a one-way "What came of it" `<details>`) → **"The full record"** (closed-by-default disclosure of nine roles in reverse order; each a gold org heading — `#9A7735`, the AA-safe deep gold, at ≥24px — plus dates/location and a slate role title, with the detail flowed across **three balanced CSS-multi-column columns**, `md:columns-3` + `break-inside-avoid`; no "More" link) → the shared slate **"In their words"** panel (reused `Testimonials`) → the **"Trusted where the stakes are high"** `LogoTicker` → the doorway close CTA ("Recognise any of it?"). **Rules: no money figures anywhere** (scale is non-financial only), nobody else's difficulty named, no "failed", British English, no em dashes. One-way disclosures use `details[open] > summary { display:none }`; a `beforeprint` handler opens everything for print. `SeoMeta` uses `og-card-3`; route is in sitemap + llms.txt. Was `/track-record` for one build, renamed to `/experience`.

### `/contact`
Copy refreshed 25 Aug: heading **"Let's talk."**, then two paragraphs ("You do not need it worked out before you get in touch…" / "Tell me what is happening. I will tell you what I think, and whether I am the right person for it."), then the **reply promise**: "I reply the same day, or the next one." (added 25 Aug). ⚠ If the promise ever cannot be kept, **change the wording, never drop the line** — an unkept promise on a contact page is worse than no promise. Clay wash + the three channels unchanged.

### `/intro` — the forwardable intro page (new, 25 Aug)

**UNLISTED**, on the same terms as `/signal-to-noise`: `SeoMeta noindex` plus an `X-Robots-Tag: noindex, nofollow, noarchive` route header in `next.config.ts`, and deliberately **absent from the nav, `sitemap.xml` and `llms.txt`**. The route resolves so the link can be shared directly.

The "here's Darren" page: Ian's ICOM pre-sell, the LinkedIn Featured link, and the leave-behind for every warm introducer. One canonical shareable URL.

- **Its own minimal header**, not the site `Layout`: the mark and "Darren Brett", no nav. The **site's standard `Footer` (`variant="none"`)** closes the page (25 Aug) — charcoal bar, crown lockup, LinkedIn, copyright; the plum contact module is suppressed because the page has its own CTA. ⚠ Note this softens the original "no nav out" rule: the footer links home, and there is now an explicit **"or go to the website →"** link under the CTA, both by the owner's decision.
- Order: hero → **the film** → proposition → What I turn → When leaders bring me in → Three things about me → proof (`LogoTicker` + Neil Munn) → How we start → close. The close CTA reads **"Book a call"** (25 Aug, was "Start a conversation") and still opens a `mailto` with subject "Keeping important work moving".
- **⚠ The film is not live yet.** `FILM` at the top of `pages/intro.tsx` holds `embed` (unlisted Vimeo/YouTube player URL) and `poster`. While `embed` is `null` the slot renders a **labelled placeholder** — the real 16:9 frame, the headshot dimmed behind a static play mark, and a "Film to follow." caption — so the page can go out for review with its shape intact. It is deliberately **not a button**: no dead control to click. Setting `embed` swaps in the click-to-load façade (poster first, player only on demand) and drops the placeholder automatically. Shipped in this state 25 Aug for Ian's review.
- **⚠ The script is never printed.** The reference build carried a "what the film says" caption for the owner's review only. It is spoken, not read. Do not add it.
- The logo strip reuses the canonical `clients` list from `LogoTicker` (13 brands), not the 8 named in the brief. Single source of truth with the homepage and Experience; all 13 are already public elsewhere on the site. It now sits between two gold hairlines as a credential lockup.

**Craft pass (25 Aug).** The page carries its own scoped `<style>` block rather than anything in `globals.css` — it is a self-contained artefact, and `globals.css` does not hot-reload. Type scale is deliberately tighter than the rest of the site: body 15px, lead 17px, section headings 24px/400, tagline serif italic 20px.

- **Reveals are a local IntersectionObserver, not `FadeUp`.** A `.js` class on `<html>` arms the hidden state, so with JavaScript off nothing is ever hidden; a **1.6s failsafe** reveals everything if the observer never fires (a non-scrolling preview pane, an embed). `FadeUp`/`whileInView` has exactly that stranding risk, which is why it is not used here.
- **Pull-quote**, not the site's bordered testimonial: no left border, a 96px gold opening glyph at 0.3 opacity, attribution in 11px uppercase at 0.13em. Single Neil Munn quote — the brief's carousel spec was dropped because section 5 supplies only one quote.
- Gold appears **only** as hairlines, list markers and the quote glyph. No fills, no second accent, no card chrome. Bookend rules top of page and under the footer mark.
- ⚠ **The eyebrow tick was removed by the owner** (25 Aug). The craft brief specified a short gold hairline before every eyebrow as a repeated micro-signature; it is gone and the labels stand alone. Do not reinstate it.
- **H1 stays at the site scale (40/52/60px)**, not the brief's `clamp(34px,8.5vw,44px)` — that cap was calibrated for a bold sans, and Instrument Serif at 44px reads smaller than every other H1 on the site.
- **The Fraunces optical-sizing direction cannot be implemented.** Instrument Serif is a single-weight static face with no `opsz` axis.
- ⚠ Known: the 10px gold eyebrows measure ~2.4:1 on cream, under AA for that size. This is the site's existing gold eyebrow pattern, not new here.

### `/intro` — the v3 redesign (26 Aug)

Rebuilt to "Design direction · dabhands.delivery/intro" (reference: `Intro_Page_v3.html`, in `~/Claude Playground/War Room/`, **not** in the repo). The idea is **composure, not persuasion**: the page is forwarded by someone who has already vouched for Darren, so it confirms rather than sells.

**The page has its own palette and type scale**, deliberately separate from the site tokens, in a page-scoped `<style>` block (`globals.css` does not hot-reload, and this page is a self-contained artefact). Cream `#F5F1EA`, paper `#FBF9F4`, charcoal `#26282B`, blue `#1B2C3F`, gold `#BA9956` / light gold `#C9A96B`, stone `#6E6A62`, line `#DCD5C8`.

**Surface order is the design.** cream (masthead, hero) → charcoal (the film, the anchor) → cream (transcript, lede, the turns) → **blue** (the carousel) → cream (triptych) → paper (logos) → cream (quote) → **blue-scrimmed photograph** (the offer) → cream (close) → charcoal (site footer). Never let two dark bands touch.

- **Masthead** is the crown lockup left, `FRACTIONAL COO · DARREN BRETT` right in **charcoal** (was gold; 9.2:1 against the wash).
- **Hero** is centred with the crown above it, homepage-style, over the **site's clay wash** — the identical gradient the doorway heroes and the Experience header use. ⚠ It must sit on the hero *section*, not the page root: on the root at `100svh` it floods the hero flat on a short viewport instead of fading.
- **The film panel** carries the portrait vignette (radial from 34% + a linear fade to full charcoal at the right edge). No visible boundary between photograph and panel.
- **Two carousels share one `useCarousel` hook** — reasons at 5.2s, quotes at 6.8s. The hook is where the guarantees live: pause on hover, on keyboard focus and while a finger is down, swipe on touch, no auto-advance under `prefers-reduced-motion`, and slides stacked in a single grid cell so the block never changes height. Change behaviour there, not in a copy.
- **The testimonial is a three-up carousel** (Neil Munn, Dave Wallace, Anthony Mahon) with gold pips. ⚠ The three quotes are 193/242/145px at full measure, so the block sizes to the tallest and Anthony Mahon's leaves ~97px of slack beneath it. Matching character counts cannot fix this one — only one quote shows at a time. ⚠ Dave Wallace is also quoted on the Business & Agency page with **different** copy; both need to be real.
- **"When leaders bring me in" is a carousel** — one statement at a time at 48px, cross-fading over 0.9s, auto-advancing every 5.2s, pausing on hover/focus/touch, swipeable, and **not auto-advancing at all under `prefers-reduced-motion`**. Slides share one grid cell so the band never changes height. Pips are the site's carousel idiom (a 12px dot stretching to a 42px pill). With JS off all four stack and nothing is hidden.
- **The triptych** is three paper panels with a 4px gold spine, the transcript sheet's device. ⚠ Headings are capped at **34px**: the text column is 288px once padding and spine are off, and "An entrepreneur's engine." needs exactly 288px at 36px.
- **The close** is centred with the crown above it, at the **site's standard footer-CTA scale** (28/44px serif). The button is the page's blue, not the site's charcoal — an open question, see below.
- **Link preview**: `public/og-intro.jpg`, the headshot padded onto charcoal at a true 1200×630. The square original gets cropped to a decapitated slice by LinkedIn and Slack, which frame at 1.91:1.
- **"Shared privately. Not listed on the site."** sits above the footer, on the page rather than in the shared `Footer` component — that footer renders everywhere and the line is only true here.

**⚠ Deliberate overrides of the design brief, all by the owner, all commented in the code so a later pass does not "fix" them back:**
1. **Money figures are on the page** — `£50m` under the carousel and the `£2.2m`/markup wording that was later reverted. The master brief rules these out for the public site ("it must not be quietly reversed by a later edit"). Flagged twice, overridden twice.
2. **The close and hero are centred**, against "left align everything, never centre anything".
3. **The logo band is the marquee**, not the static grid. It carries a hard edge mask, which is the condition the brief sets for allowing one.
4. **Gold does four jobs** (kickers, the quote mark, the turns' destination phrases, the carousel pips) against "one accent, spent sparingly".
5. **The eyebrow tick was removed** — the brief specified a gold hairline before every kicker.

**Known and open:**
- The **"How we start" kicker reads 3.56:1** over the photograph, under AA for 11px. The only contrast failure left on the page.
- The **"Book a call" button is the page's blue**, not the site's standard charcoal CTA. Owner was asked; undecided.
- The **carousel cross-fade double-exposes** on long text — both slides visible mid-transition. Inherent to a 0.9s cross-fade of two-line statements in one cell.
- **Copy line-lengths are load-bearing.** The carousel slides (80–83 chars) and the triptych bodies (72–85) are matched so each module sets to an even number of lines. Editing one without checking the others will make a module ragged, which the owner notices every time.

### `/feel` — the FEEL method deck (new, 26 Aug)

**PRIVATE.** Behind Basic Auth at the edge (`proxy.ts`), login `the15` / `FeelingMovesValue!26`, overridable per environment with `FEEL_USER` / `FEEL_PASS`. Also noindex meta plus an `X-Robots-Tag: noindex, nofollow, noarchive` route header, and absent from nav, `sitemap.xml` and `llms.txt`. ⚠ The committed fallback password is in git history; set the Vercel env vars if it ever needs to be secret from anyone with repo access.

`proxy.ts` now runs **two gates with separate realms**, so the FEEL login does not open Eterna and vice versa. Verified both ways at release.

Built from `FEEL_Emotional_Experience_Method_Master_Deck.pdf` (owner-supplied, private and confidential). **Not a scrolling page: a 27-slide full-screen deck**, one slide per viewport on a y-axis scroll-snap track.

- **Why scroll-snap and not a transform carousel.** Snapping is CSS, so the deck works with JavaScript off; native touch scrolling gives swipe for free; no slide is ever hidden behind an opacity gate. A slide whose content outgrows the viewport lengthens itself rather than clipping. The `FadeUp` stranding risk that `/intro` avoids applies here too.
- **Controls:** arrow keys, space, PageUp/Down, Home/End, `F` for full screen, Escape closes the tray. Pips, a slide counter, up/down buttons and a full-screen button. Print gives one slide per page.
- **⚠ Two scroll-snap traps, both fixed in `go()`, do not undo them.** `scroll-snap-stop: always` refuses to let *any* scroll skip the snap points in between, and the deck's CSS `scroll-behavior: smooth` animates a plain `scrollTop` assignment too. Together they stranded long jumps (a 21-slide jump landed 758px in) and stalled rapid ones entirely. A distant jump now lifts **both** for one frame; only a neighbouring slide animates. Verified across nine rapid jumps, all exact.
- **⚠ Arrow keys read the deck's real scroll position, not React state.** The IntersectionObserver lags an in-flight scroll by a frame or two and stepping from a stale index overshoots.
- **The hover tray** is a film strip of the whole deck beside the pips: every slide painted in its own surface colour with its kicker and headline, scrollable, click to land, opening on the current slide. **Labels are read out of the DOM on mount**, so the strip can never drift from the copy on the page; slides with no kicker carry `data-label`. It opens from CSS `:hover` as well as React state so the reveal never depends on a synthetic event landing. ⚠ The pips sit in **normal flow** inside the tray: absolutely positioned, they collapsed the tray box to zero height and nothing could be hovered. The tray takes pointer events, so it forwards the wheel back to the deck or the right edge becomes a dead strip. Hidden below 861px, where there is no hover.
- **Surface order is the argument, and no two dark slides touch:** charcoal cover, then bone/paper carrying the reading, clay for the performance gap and the roadmap, slate for the theory, the Score and the stack, charcoal for the gap, the FEEL Map, why-it-matters-now and the close. Verified programmatically at release.
- **Chrome weights are per-tone CSS variables (`--ctrl`, `--pip`, `--note`), not one flat opacity.** At a flat 45% the controls measured 4.06:1 on charcoal but **2.08:1 on clay**, against the 3:1 minimum for a UI control. All five surfaces now clear it (3.51 to 3.69, tuned within 0.2 so the controls do not visibly change weight between slides). Clay takes a **darker ink than the body copy** (`#141110`): at full strength `#2A211E` only reaches 5.51:1 against clay, so there was no headroom.
- **The masthead carries the site lockup**, crown beside the serif wordmark, as two files swapped by tone (`crown-mark.webp` on light, `DabHands_crown_white.png` on dark). Never a filter: the header and footer crowns are separate drawings.
- **Slide 26 is "the full stop"**: the gold kicker "Simply put", the crown, one line ("Experiences create feelings that enable or inhibit progress."), nothing else, on paper. ⚠ **The close slide deliberately has no crown** — two crowns back to back read as a stutter, so the full stop owns it. Flagged to the owner at release.
- **The standing notice** ("Private & Confidential · © DAB Hands Delivery Ltd 2026. All rights reserved.") rides the fixed chrome so it appears on every slide without 27 copies in the markup. Print gets a per-page copy via `.f-slide::after`, because the chrome is hidden there. On a phone it lifts above the counter and drops the tail so it holds one line. ⚠ The owner supplied this line with an **em dash**; substituted for `·` per the hard rule and flagged.
- **Full screen** uses the Fullscreen API on the document, read through `useSyncExternalStore` rather than mirrored into state (the lint rule forbids sync `setState` in an effect). ⚠ **iOS Safari has no Fullscreen API for anything but video**, so the button hides itself there rather than offering a dead control.
- **Copy fixes against the source deck:** the cover's "IMOVABLE" set as "immovable"; FEEL Pattern's "where emotion is leaking" set as "where emotion is going", because **"leak" is banned** by the owner's 18 Aug decree.
- **Link preview:** `public/og-feel.png`, a true 1200×630 card (charcoal, gold hairline, white crown, FEEL in Instrument Serif, gold subtitle, DAB Hands bottom right). Rendered from an HTML source through headless Chrome at 2x and downsampled, so it uses the real brand fonts. ⚠ **No unfurler will ever render it while Basic Auth is on**: LinkedIn, Slack and WhatsApp fetch the page and get a 401 before they reach the meta tags. The card only starts working if the gate comes off. Kept anyway so it is ready, and it costs nothing. ⚠ Per the cache-busting rule, a revised card must ship as `og-feel-2.png` with the `image` prop updated, never as a replacement at the same filename.
- Page-scoped `<style>` under `.f`, not `globals.css` (self-contained artefact, and `globals.css` does not hot-reload).
- **Verification note:** with the gate on, authenticate the preview pane once via `http://user:pass@localhost:3000/feel` then navigate clean, or credentialed URLs kill the page scripts.

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
