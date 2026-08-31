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
- Routes: `/`, the three doorways, **`/experience`** (in the main nav between Who I help and Contact), **`/signal-to-noise` (UNLISTED, see below)**, **`/feel` (PRIVATE, Basic Auth, see below)**, `/intro` (UNLISTED), **`/script` (UNLISTED, temporary, no auth, see below)**, `/contact`, `/404`, private `/for/eterna` (hub) → `/for/eterna/confidence-map` + `/for/eterna/first-response` (Basic Auth, noindex), `/for/manifesto-digital`, `/design-system`. ⚠ The Basic Auth gate lives in **`proxy.ts`** (Next 16 renamed the `middleware` convention to `proxy`); earlier notes in this file call it `middleware.ts`.
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

### The film player (`components/FilmPlayer.tsx`, new 28 Aug)
**Built and verified, but DORMANT: `FILM.src` is `null` until the film exists.**
While it is null the panel renders exactly what it does today, the portrait and
"Film to follow." Set `src` and the panel switches to a 16:9 stage with the
player, because a 16:9 film cropped into the portrait's tall column is
unwatchable.

- **Dependency-free by choice.** A native `<video>` with its chrome hidden and
  ours on top. The film is meant to be **owned**: no YouTube or Vimeo, no
  third-party script, no branding, no recommendations, no tracking.
- **Hosting: Vercel Blob** (owner's decision, 29 Aug). **Never put the film in
  `/public`** — it bloats the repo and every deploy.

  ⚠ **Cloudflare R2 was chosen first and then rejected, for a good reason.**
  R2's custom domains only work when the whole zone is on Cloudflare DNS, and
  `dabhands.delivery` runs on GoDaddy (`domaincontrol.com`) carrying
  **Google Workspace MX** and an SPF record that *includes*
  `dc-aa8e722993._spfm.dabhands.delivery` — a GoDaddy-managed subdomain that
  only resolves while GoDaddy runs the DNS. Moving nameservers to Cloudflare
  would break SPF, and with **DMARC at `p=quarantine`** the mail would start
  being filtered, quietly, days later. Do not move the zone to host a video.
  If the move is ever made deliberately, mirror every record first: 5 Google
  MX, the SPF include, `google-site-verification=3tEwamtu…`, `_dmarc`
  (p=quarantine, rua to onsecureserver.net), `www` CNAME to apex, apex A to
  Vercel.

  **Runbook, one-off** (the owner does these; sessions cannot sign in):
  `npx vercel login`, then `npx vercel link` to the dabhands-delivery project.

  **Runbook, per film:**
  1. `swift scripts/prepare-film.swift <camera file> film/hello 2.5`
     → a network-optimised MP4 plus a poster JPEG. Repeat for the portrait cut.
  2. `scripts/upload-film.sh film/hello.mp4 film/hello-poster.jpg`
  3. Put the returned URLs into `FILM` in `pages/intro.tsx` (`src`, `poster`,
     `portraitSrc`, `portraitPoster`), delete `public/film/placeholder*.mp4`,
     regenerate and re-time the captions.

  ⚠ **Version the filename on every re-cut** (`hello-2.mp4`), never overwrite.
  Uploads are immutable for a year, so overwriting leaves a year of caches
  serving the old film. `--allow-overwrite` is deliberately not passed, so an
  accidental overwrite fails loudly rather than silently.

  ⚠ **The host must serve HTTP Range requests** or the scrubber cannot seek.
  **Proven end to end on 29 Aug** with a throwaway clip, since deleted: upload
  returns 200 `video/mp4`, `cache-control: public, max-age=31536000`,
  `accept-ranges: bytes`, a Range request answers **206** with the right
  `content-range`, and it is served from `lhr1`.

  ⚠ **Two traps found doing it, both now guarded in the script:**
  `vercel env pull` returns the token as literally `[SENSITIVE]`, and the OIDC
  fallback fails with *"OIDC is enabled for this project, but not for the
  development environment"* — the store is connected to Production and Preview
  only. The token must be copied from the dashboard into `.env.local`.
  And **`--add-random-suffix false` is read as TRUE** when space-separated,
  which produced `film/hello-pwTQxjlNKNsl….mp4`; the flag is simply not passed,
  as the CLI already defaults to no suffix.

  **The dashboard's Upload button is a perfectly good alternative** for one or
  two files and needs no token at all; it just takes Vercel's default cache
  headers rather than the year set here.

  Tooling note: **no ffmpeg on this machine**, so `scripts/prepare-film.swift`
  uses AVFoundation. That trades fine bitrate control for zero setup; if a file
  comes out too large, install ffmpeg and re-encode with an explicit bitrate —
  nothing else in the pipeline changes.
- ⚠ **Do not add `crossOrigin` to the `<video>`.** It was there and was removed:
  the attribute forces CORS on the *media* resource too, which would break a
  cross-origin MP4 whose bucket sends no CORS headers — exactly where the film
  is going. The captions are same-origin, so it buys nothing.
- **Captions: `public/captions/intro-en.vtt`.** CC is **off by default
  and driven ONLY by the CC button.** The track is `hidden`, never `disabled`,
  so cues are parsed and the first press is instant.
- ⚠ **Mute and CC are deliberately INDEPENDENT.** The first build turned
  captions on automatically when the film was muted (the reasoning: forwarded
  links get opened with the sound down). In use the owner read it as the volume
  control toggling the captions, and rejected it — correctly: one button
  silently changing another reads as a bug however good the intent. **Do not
  re-add the coupling** thinking it is a missing feature.
- **Fullscreen hides the controls on inactivity even when PAUSED**, and hides
  the cursor with them (`.fp-full:not(.fp-wake) { cursor:none }`); windowed, a
  pause holds them open. `wake()` reads fullscreen from `fullRef`, not state,
  because it is memoised with no deps. The shell takes focus on entering
  fullscreen, or the keyboard shortcuts have nothing focused to fire against.
- ⚠ **REGENERATE THE VTT WHENEVER THE SCORE CHANGES.** This was missed once
  already: the 28 Aug close removed "Start small. No big bet." from the score,
  and the captions kept saying it until a grep caught it. The captions are a
  second copy of the script and do not follow the score on their own.
- ⚠ **The VTT is a FIRST DRAFT generated from `lib/scriptScore.ts`.** The cue
  *text* is exact; the *timings* are derived from the score's speak and hold
  durations, so they follow the rehearsed pace, not the recorded one.
  **Re-time them against the actual film before the captions go live.** The
  generator split each card's speaking time across its lines by character
  count. Currently 51 cues, 96.65s, matching the score.
- Keyboard: space/k play, arrows seek, m mute, c captions, f fullscreen, and
  keys only fire while focus is inside the player so the page keeps its own.
- **Verification note:** there is no ffmpeg on this machine. A 12s placeholder
  MP4 was generated with **AVFoundation via `swift`** (the script is in the
  session scratchpad; CoreText attribute keys must be used directly, as
  `NSAttributedString.Key` needs AppKit). Verified: play, pause, seek, progress
  fill, captions independent of mute in every combination, cue activation, the
  keyboard, and the windowed chrome timings. ⚠ **The preview pane blocks
  `requestFullscreen`**, so fullscreen cannot be tested there — the owner
  confirmed it by hand in a normal tab.
- **Phones get a PORTRAIT CUT (`portraitSrc`), not the landscape film cropped.**
  Below 640px the player switches file and goes to a 9:16 stage capped at
  78svh; tablets keep the landscape cut, because at 768px a 16:9 film is still
  a real watch. Only one file is ever loaded for a given viewport. The `key` on
  the `<video>` forces a fresh element when the cut changes. This means **the
  film needs shooting or mastering twice**, landscape and portrait.
- **Posters are cut per shape from `Darren_Ben.jpg` (6000x4000, 31 Aug):**
  `darren-ben-16x9-1.jpg` (1920x1080) and `darren-ben-9x16-2.jpg` (1080x1920).
  ⚠ **Centre the portrait crop on the FACIAL MIDLINE, found with Vision, not
  on brightness.** He sits slightly left of frame, so a centred crop was
  visibly off. The first correction used a luminance centroid, which put his
  face at x=2721 — but the key light falls from his left, so the bright-pixel
  centre is not the face centre, and that crop then read as too far RIGHT.
  `VNDetectFaceLandmarksRequest` gives medianLine/noseCrest at **x=2925 of
  6000**; cropping from x=1800 puts the nose at 50.0%, confirmed by re-running
  the detector on the finished file (noseCrest 50.1%). The swift snippet is in
  the session scratchpad. The 16:9 crop keeps the full width, where the 1.2%
  lean is imperceptible, and the owner approved it. **Never assume centred, and
  do not use brightness as a proxy for a face.** Each matches its stage exactly, so nothing is
  cropped again by CSS. The no-film column uses the **portrait** crop, since
  that column is tall. ⚠ The 3MB original still sits at `public/Darren_Ben.jpg`
  and should be moved out of `public/` — it ships on every deploy and is
  publicly reachable.
- **The player returns to its poster when the film ends** (owner's ask): a
  `<video>` otherwise holds its last frame, which strands the reader on a
  stilled mid-blink. `load()` restores the poster, clearing `started` brings
  the Watch affordance back, and pressing it replays from the beginning.
- ⚠ **`.fp-seek` needs `min-width:0`.** A range input has an intrinsic minimum
  width and flex items default to `min-width:auto`, so without it the seek bar
  refuses to shrink and pushes CC and fullscreen clean off a narrow stage —
  which is what happened on the 9:16 phone player (controls ran 70px past the
  edge). The total duration also hides below 640px.
- ⚠ **Supply `portraitPoster` too.** Without it the portrait stage falls back
  to the landscape headshot and crops to a tight band across the eyes.
- ⚠ **`public/film/placeholder.mp4` and `placeholder-portrait.mp4` are TEMPORARY**, for looking at the player
  only, and `FILM.src` currently points at it. **Delete both files and set `src` and
  `portraitSrc` back to `null` (or to the real CDN urls) before this ships.**

- **⚠ The reveal failsafe reveals only what is ON SCREEN (28 Aug).** It used
  to add `.in` to every `[data-r]` on a flat 1.6s timer. Because **every
  `[data-r]` on this page starts below the fold**, that meant the whole page
  was revealed before the reader ever reached it, and the owner rightly called
  the page "very static". Note the trap: "has the observer fired yet" does
  **not** work as the test here, precisely because nothing is in view at load —
  a dead observer and an unscrolled page look identical. Catching up on what is
  in view distinguishes them, and still covers the case the net was written for
  (a non-scrolling preview pane, where the viewport is the whole document). A
  genuinely dead observer additionally gets a scroll listener. Verified by
  scroll progression: 0 → 1 → 3 → 5 → 7 → 8.
- **The draw-in is 20px over .62s** on `cubic-bezier(.22,1,.36,1)`, children
  stepping at .09s. The old 8px over .2s was invisible — it finished before the
  eye arrived. If it ever needs tuning, tune the distance before the duration.
- **The close CTA carries the `PathwayPicker`** (28 Aug), replacing the "or go
  to the website →" link. It takes the new **`preferAbove`** prop, which opens
  the panel over the trigger wherever it fits, because here the trigger is the
  last thing on the page. ⚠ The picker's own root is `inline-block`, so it
  needs the block `.i-paths` wrapper or it sits **alongside** the Book a call
  button instead of under it. While open, the panel covers the Book a call
  button; that is inherent to opening upward at the foot of the page.
- The **"Shared privately. Not listed on the site."** line was removed (28 Aug,
  owner's call). The page is still unlisted; it simply no longer says so.
- **No header at all (28 Aug).** The minimal masthead (mark + role line) was
  REMOVED on the owner's instruction. The page now opens straight onto the
  hero, which carries the **full lockup — crown beside the "DAB Hands" serif
  wordmark — above the h1**. The lockup keeps the old masthead's proportions
  (crown 22 : gap 10 : serif 21) scaled to the hero's 60px crown, so it is
  57px type / 27px gap on desktop and 40 / 19 at ≤900px; **size the wordmark
  off the crown, never by eye**. The hero's `min-height` dropped from
  `100svh - 268px` to `100svh - 188px` to reclaim the space the masthead used,
  so the fold and the sliver of charcoal below it are unchanged. The role line
  under the h1 reads **"Darren Brett · Fractional COO"** (name first, owner's
  call the same day), and it is now the page's only role clue. The **site's standard `Footer` (`variant="none"`)** closes the page (25 Aug) — charcoal bar, crown lockup, LinkedIn, copyright; the plum contact module is suppressed because the page has its own CTA. ⚠ Note this softens the original "no nav out" rule: the footer links home, and there is now an explicit **"or go to the website →"** link under the CTA, both by the owner's decision.
- Order: hero → **the film** → proposition → What I turn → When leaders bring me in → Three things about me → proof (`LogoTicker` + Neil Munn) → How we start → close. The close CTA reads **"Book a call"** (25 Aug, was "Start a conversation") and still opens a `mailto` with subject "Keeping important work moving".
- **⚠ The film is not live yet.** `FILM` at the top of `pages/intro.tsx` holds `embed` (unlisted Vimeo/YouTube player URL) and `poster`. While `embed` is `null` the slot renders a **labelled placeholder** — the real 16:9 frame, the headshot dimmed behind a static play mark, and a "Film to follow." caption — so the page can go out for review with its shape intact. It is deliberately **not a button**: no dead control to click. Setting `embed` swaps in the click-to-load façade (poster first, player only on demand) and drops the placeholder automatically. Shipped in this state 25 Aug for Ian's review.
- **⚠ The script is never printed. The disclosure is GONE (28 Aug).** The
  page carried a "Script for the film" `<details>` holding the spoken script,
  for the owner's review only. It was removed on release, as always intended —
  data, markup and CSS together, plus the now-unused `Fragment` import and the
  `.i-sheet` rules. The script is spoken, not read. **Do not reinstate it**,
  and note the live script now lives only in `lib/scriptScore.ts` for
  `/script`.
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

**Surface order is the design.** cream (hero, no masthead) → charcoal (the film, the anchor) → cream (lede, the turns) → **blue** (the carousel) → cream (triptych) → paper (logos) → cream (quote) → **blue-scrimmed photograph** (the offer) → cream (close) → charcoal (site footer). Never let two dark bands touch.

- **Masthead** is the crown lockup left, `FRACTIONAL COO · DARREN BRETT` right in **charcoal** (was gold; 9.2:1 against the wash).
- **Hero** is centred with the crown above it, homepage-style, over the **site's clay wash** — the identical gradient the doorway heroes and the Experience header use. ⚠ It must sit on the hero *section*, not the page root: on the root at `100svh` it floods the hero flat on a short viewport instead of fading.
- **The film panel** carries the portrait vignette (radial from 34% + a linear fade to full charcoal at the right edge). No visible boundary between photograph and panel.
- **Two carousels share one `useCarousel` hook** — reasons at 5.2s, quotes at 6.8s. The hook is where the guarantees live: pause on hover, on keyboard focus and while a finger is down, swipe on touch, no auto-advance under `prefers-reduced-motion`, and slides stacked in a single grid cell so the block never changes height. Change behaviour there, not in a copy.
- **The testimonial is a three-up carousel** (Neil Munn, Dave Wallace, Anthony Mahon) with gold pips. ⚠ The three quotes are 193/242/145px at full measure, so the block sizes to the tallest and Anthony Mahon's leaves ~97px of slack beneath it. Matching character counts cannot fix this one — only one quote shows at a time. ⚠ Dave Wallace is also quoted on the Business & Agency page with **different** copy; both need to be real.
- **"When leaders bring me in" is a carousel** — one statement at a time at 48px, cross-fading over 0.9s, auto-advancing every 5.2s, pausing on hover/focus/touch, swipeable, and **not auto-advancing at all under `prefers-reduced-motion`**. Slides share one grid cell so the band never changes height. Pips are the site's carousel idiom (a 12px dot stretching to a 42px pill). With JS off all four stack and nothing is hidden.
- **The triptych** is three paper panels with a 4px gold spine (originally the transcript sheet's device, which has since been removed; the triptych owns it now). ⚠ Headings are capped at **34px**: the text column is 288px once padding and spine are off, and "An entrepreneur's engine." needs exactly 288px at 36px.
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

### The FEEL section (new, 26 Aug) — ⚠ COMMITTED BUT NOT DEPLOYED

**Not pushed. Do not push without reading the blockers below.** `/privacy` is now finished and publishable (28 Aug), but the FEEL form still returns 500 until `FEEL_COOKIE_SECRET` exists and the HubSpot field name is confirmed. Deploying now would put a live form that fails on a page people are being sent to.

**Routes.** `/feel` is the public-but-unlisted capture page. `/feel/method` is the 22-slide deck, moved there from `/feel` and gated. `/feel/:path*` carries a noindex route header, so future FEEL routes are covered by default. Neither is in the nav, `sitemap.xml` or `llms.txt`.

**The gate (`lib/feelAccess.ts` + `proxy.ts`).** A stateless HMAC token in an HttpOnly cookie, verified at the edge before the deck renders, so gated content never leaks and then redirects. Web Crypto throughout, because `proxy.ts` runs on the Edge runtime where `node:crypto` does not exist. **It fails closed**: with no `FEEL_COOKIE_SECRET` nothing verifies and the deck stays shut, which is the right direction but means the feature is inert until the variable exists.

- **⚠ `Secure` is set in production only.** Hardcoding it broke every non-HTTPS test: the browser silently refused the cookie, the person saw the confirmation, clicked through and was bounced as though their access had expired. Server-side tests all passed because curl does not care. Do not "harden" this back.
- **⚠ Links into the gate are plain `<a>`, not `<Link>`**, with the lint rule disabled and the reason recorded. The check happens on the request, so entering the gate must be a request.
- Turned-away visitors land on `/feel?from=method` and get an explanation strip **at the top of the page**. An earlier version put the notice beside the form and auto-scrolled; measurement showed it sitting 6,059px down a 7,050px page. Do not reinstate that.

**HubSpot is the database. There is deliberately no local store.** `pages/api/feel/access.ts` submits server-side to the Forms API (portal `148807599`, form `a48d9b5e-28b5-4e7b-ad68-d4f437740e96`), so the ids never reach the browser and the submission registers as a **real form submission** — which is what lets HubSpot's own reporting and its follow-up email see it. The CRM API would not. Email is the only required field; empty values are not sent, so a blank surname cannot overwrite a good one.

**⚠ Consent: there is no checkbox, by decision.** Delivering something a person just asked for runs on legitimate interests. Consent for ongoing marketing lives in the **Field Notes opt-in inside the confirmation email**, which is what makes marketing lawful for anyone signing up with a personal address (under PECR an individual subscriber needs consent where a corporate subscriber does not).

**The email.** `email/FEEL_Confirmation_Email.html`, to be imported into HubSpot Design Manager and set as the form's follow-up. ⚠ Option A depends on the portal having **Marketing Hub Starter or above** — check Forms → FEEL Gate → Options → "Send a follow-up email". If it is greyed out, the whole no-extra-sub-processor argument collapses and an email provider comes back. Four placeholders remain in the template.

**`/privacy` — FINISHED 28 Aug.** Site-wide, **indexable** (unlike the FEEL routes), in the sitemap, linked from the footer of every page via `components/Footer.tsx`. Sub-processors are HubSpot (EU), Vercel (UK, pinned) and Google Workspace (EU/US, DPF UK Extension confirmed active at build time).

The three-part holdback from 27 Aug is **fully reversed**, all in one commit as intended: the `noindex` prop is gone, the footer link is back, and the sitemap entry is back with `lastmod 2026-08-28`. Both amber `.p-gap` markers and the "Not ready to publish" box are gone, along with their CSS; the `next/link` import went with the box.

- **ICO registration reference is `ZC232396`**, owner-supplied 28 Aug, set in the `<address>` block. ⚠ This is the **register entry**, which is public by design. It is **not** the `CSN` security number, which is a credential and must never appear on the page or in the repo.
- **Published date is `28 August 2026`**, in the `UPDATED` const at the top of the file. Change it whenever the notice's substance changes, per its own "Changes to this notice" section.
- **⚠ `vercel.json` is new and load-bearing.** It pins `"regions": ["lhr1"]` so Vercel Functions run in London. The notice asserts *"Your form submission is processed in the United Kingdom"* as **fact**, so that file is not configuration tidy-up: it is what makes a published legal statement true. If the region ever changes, the notice is wrong and must change in the same commit. There was no `vercel.json` before this; a project-settings Function Region would also work, but code is versioned and a dashboard toggle is not. ⚠ **Confirm on the first deploy** that the functions actually report `lhr1`.

**Analytics.** Vercel Web Analytics and Speed Insights in `_app.tsx`, site-wide. **Cookieless**, so the site still needs no consent banner: the only cookie anywhere is `feel_access`, which is strictly necessary. Verified by polling storage for 8s while both ran — nothing written. ⚠ That was the **development debug build**; re-check in production once the dashboard toggles are on.

**⚠ BLOCKERS before pushing**, in the order they bite:

~~1. **ICO registration reference**~~ **DONE 28 Aug**, `ZC232396`.
~~2. **Publication date**~~ **DONE 28 Aug**, and the warning box is out.
~~3. **`lhr1`**~~ **DONE 28 Aug** in `vercel.json`; verify it reports London on the first deploy.

**Still blocking, and all four are the owner's to do — none can be done from the repo:**

4. **`FEEL_COOKIE_SECRET`** in Vercel, freshly generated. Until it exists the gate **fails closed**: the form appears to work and the deck never opens.
5. **The open question's HubSpot property.** Code holds `what_are_you_trying_to_fix_optional`; a later brief said the default `message`. **A wrong internal name makes HubSpot reject the entire submission**, not just that field, so the form 500s for everyone. Overridable with `HUBSPOT_ISSUE_FIELD` — check the real internal name in HubSpot before pushing.
6. Enable Analytics and Speed Insights in the dashboard.
7. **The `/feel` indexing decision, deliberately still open.** The brief (§2, §9) makes `/feel` the first **indexed** public page in the practice. It is currently `noindex, nofollow` in both the `SeoMeta` prop and the `next.config.ts` route header, and absent from nav, `sitemap.xml` and `llms.txt`. That was right while the notice was unfinished; it is now only gated on the form actually working. **Flipping it is four coordinated edits** — the `noindex` prop in `pages/feel/index.tsx`, the `/feel` route header (leave `/feel/:path*` noindexed so the deck stays shut), a `sitemap.xml` entry, and `llms.txt` — plus the `og:type` `article` and `Article` JSON-LD the brief asks for. **Do not flip it until 4 and 5 are green**, or the first indexed page in the practice is one whose only action returns 500.

### `/feel/method` — the FEEL method deck (new, 26 Aug)

**PRIVATE.** Behind Basic Auth at the edge (`proxy.ts`), login `the15` / `FeelingMovesValue!26`, overridable per environment with `FEEL_USER` / `FEEL_PASS`. Also noindex meta plus an `X-Robots-Tag: noindex, nofollow, noarchive` route header, and absent from nav, `sitemap.xml` and `llms.txt`. ⚠ The committed fallback password is in git history; set the Vercel env vars if it ever needs to be secret from anyone with repo access.

`proxy.ts` now runs **two gates with separate realms**, so the FEEL login does not open Eterna and vice versa. Verified both ways at release.

Built from `FEEL_Emotional_Experience_Method_Master_Deck.pdf` (owner-supplied, private and confidential), then revised to the owner's **v1.1 brief** (26 Aug). **Not a scrolling page: a 22-slide full-screen deck**, one slide per viewport on a y-axis scroll-snap track.

**⚠ v1.5 (26 Aug) rebuilt the opening as a tension sequence.** The first six slides are one uninterrupted thought and **must not be reordered or collapsed**: FEEL → the sea of sameness (the market tension) → the warning lights (where it becomes visible) → the human truth (why feeling affects choice) → the performance gap (the missing layer) → emotion is already measured (the territory FEEL actually occupies). "Optimisation has made sameness scalable" was **promoted** from a late Why Now slide to slide 02; the late slide is gone and the line must appear **once only**. ⚠ Slide 03's warning lights deliberately claim **no universal decline and no causality** — they are where a weak emotional layer *can* become commercially visible. Do not add downward arrows or decline statistics without verified evidence.

**⚠ v1.4 (26 Aug) made four corrections that must not be undone.** (1) Slide 06 acknowledges that **emotion is already measured** (Forrester, Qualtrics/Temkin, KPMG, Bain, Gallup and others) and narrows FEEL's claim to moment-level performance; never let the deck imply "nobody measures emotion". (2) The FEEL Map's rows are **Effect / Attribution / Durability**, replacing Meaning / Confidence / Distinction. These are a **different structural layer** from the funnel stages: Confidence and Memory are funnel stages only, Durability is a consideration only, and the two layers must never be mixed. The memorable form is **"Did it happen? Did we get the credit? Did it last?"** (3) Slide 15 states FEEL's **own biases** and slide 16 **removes all multiplication notation** from Commercial Priority, whose output is a priority order rather than a pound value. (4) Slide 21 defines fit by **conditions, not sectors** — B2B is never called low-FEEL, and service recovery is never called emotionally unimportant. **Attribution never penalises familiarity for existing.**

**⚠ Citations are verified, and new ones must be.** Slide 04 carries Binet & Field (IPA, 2013) and Damasio (1994) — **the owner should confirm these two before presenting**. Slides 15 and 16 carry four sources verified against the literature at build time: Kahneman, Fredrickson, Schreiber & Redelmeier (*Psychological Science*, 1993, peak and end); Reber, Schwarz & Winkielman (*Personality and Social Psychology Review*, 2004, processing fluency); Wood & Neal (*Psychological Review*, 2007, habit); and Cox (*Risk Analysis*, 2008), which is **why slide 16 has no arithmetic** — multiplying ordinal severity ratings can rank smaller risks above larger ones.

**⚠ v1.3 (26 Aug) consolidated the deck from 32 slides to 20.** It is the **master / stage deck**, not a methodology manual: one point per slide, qualifications sitting *beneath* the argument they support rather than taking a slide each. Segmentation and emotional restraint live under Required Feeling; non-linear journey behaviour under the Emotional Funnel; the benchmark caveat under Pattern/Score; assessor consistency under How the Judgement Holds; commercial caveats under Commercial Priority; calibration under The Learning Loop. **Do not re-expand these into their own slides.** The deeper rubrics, assessor protocols and calibration mechanics belong in a future FEEL Methodology Paper, beneath this deck.

**⚠ The spine is non-negotiable and the slide order carries it:** Emotional Spec × Required Feeling = emotional brief (08) → lived experience → Carries / Weakens / Breaks (10) → FEEL Pattern / Score (11) → Commercial Priority (13) → Intervention (15) → re-measure and learn (16).

**⚠ Protected language, verified present at every release:** "FEEL · The Emotional Experience Method"; "Carries / Weakens / Breaks"; "Does this moment make the brand feel like itself?"; "It is not broken. It is incomplete."; "Optimisation has made sameness scalable."; "The word is not the work."; "A method that cannot be wrong cannot be trusted."; and the five canonical stages.

**⚠ Slide 02 carries the deck's only external citations** (Binet & Field, *The Long and the Short of It*, IPA 2013; Damasio, *Descartes' Error*, 1994). Marketing-effectiveness evidence leads and neuroscience is explicitly framed as supporting context, with the mechanism described as still debated — v1.3 forbids presenting a contested neurological mechanism as settled fact. **The owner should confirm both citations before presenting.** The site's standing rule against unverified claims applies with extra force to a slide that shows its sources.

**⚠ v1.1 established the architecture. The distinction it exists to protect:**

- **Emotional Spec** — how the brand should feel. Distinctive, persistent, brand level.
- **Required Feeling** — what the person needs to feel *now*, to progress at this stage. Contextual, stage specific.
- **Emotional Spec × Required Feeling = the emotional brief for the moment.** That is what the lived experience is tested against, and what Carries / Weakens / Breaks refers to.

**The two are not synonyms and must never be conflated again.** v1.0 said "Required Feeling is the emotional spec", which is the error v1.1 exists to correct. If you edit any slide, check which of the two layers you mean. v1.3 then folded that architecture into slides 05 to 08, and a terminology sweep ran across the commercial half so the language stays consistent end to end.

**⚠ There is ONE five-stage journey and it is fixed: `NOTICE → RELEVANCE → CONFIDENCE → COMMITMENT → MEMORY`.** It lives in the `STAGES` constant, and the funnel slide, the FEEL Map's columns (desktop and the per-cell mobile labels) and the FEEL Pattern's bars all read from it, so the deck cannot drift out of step with itself. The Map's columns used to be Promise / Arrival / Action / Response / Memory; they were aligned 26 Aug. **Do not introduce a second five-stage structure, and do not substitute emotional words (Spark, Resonance, Reassurance, Anticipation, Affirmation) for the stage names** — an "Emotional Arc" slide doing exactly that was built and then removed by the owner the same day. What varies underneath a stage is the Required Feeling; the stage names never do. The architecture is: **Emotional Spec → Emotional Funnel → Required Feeling → FEEL Map**, and the method ladder on slide 15 states it in that order.

**⚠ Known collision, owner's call.** "Confidence" is now both a **stage** (third in the funnel) and a **dimension** (second of Meaning / Confidence / Distinction), so cell 08 of the FEEL Map is Confidence × Confidence. The v1.1 funnel brief fixed the stage names and left the dimensions alone, so this is as instructed, not an oversight. Resolving it means renaming the dimension (Assurance? Capability?) or the stage, which is a methodology decision.

**Examples are labelled as examples on purpose.** The five stage feelings, the Emotional Spec ("Quietly capable / Liberating / Warmly human / A little unexpected") are illustrative. The brief is explicit that they must not read as normative or as a fixed universal set: *"Every brand and every journey can require a different emotional progression."* Do not strip the "Example" labels.

- **Why scroll-snap and not a transform carousel.** Snapping is CSS, so the deck works with JavaScript off; native touch scrolling gives swipe for free; no slide is ever hidden behind an opacity gate. A slide whose content outgrows the viewport lengthens itself rather than clipping. The `FadeUp` stranding risk that `/intro` avoids applies here too.
- **Controls:** arrow keys, space, PageUp/Down, Home/End, `F` for full screen, Escape closes the tray. Pips, a slide counter, up/down buttons and a full-screen button. Print gives one slide per page.
- **⚠ Two scroll-snap traps, both fixed in `go()`, do not undo them.** `scroll-snap-stop: always` refuses to let *any* scroll skip the snap points in between, and the deck's CSS `scroll-behavior: smooth` animates a plain `scrollTop` assignment too. Together they stranded long jumps (a 21-slide jump landed 758px in) and stalled rapid ones entirely. A distant jump now lifts **both** for one frame; only a neighbouring slide animates. Verified across nine rapid jumps, all exact.
- **⚠ Arrow keys read the deck's real scroll position, not React state.** The IntersectionObserver lags an in-flight scroll by a frame or two and stepping from a stale index overshoots.
- **The hover tray** is a film strip of the whole deck beside the pips: every slide painted in its own surface colour with its kicker and headline, scrollable, click to land, opening on the current slide. **Labels are read out of the DOM on mount**, so the strip can never drift from the copy on the page; slides with no kicker carry `data-label`. It opens from CSS `:hover` as well as React state so the reveal never depends on a synthetic event landing. ⚠ The pips sit in **normal flow** inside the tray: absolutely positioned, they collapsed the tray box to zero height and nothing could be hovered. The tray takes pointer events, so it forwards the wheel back to the deck or the right edge becomes a dead strip. Hidden below 861px, where there is no hover.
- **Surface order is the argument, and no two dark slides touch:** charcoal cover, then bone/paper carrying the reading, clay for the performance gap and the roadmap, slate for the theory, the Score and the stack, charcoal for the gap, the FEEL Map, why-it-matters-now and the close. Verified programmatically at release.
- **⚠ The Score ring is the ONE sanctioned circle in the brand.** Slide 14 draws the FEEL Score as a three-segment SVG ring (Carries 74 gold, Weakens 18 clay, Breaks 8 bone) with `74` in the centre. The number in the middle **is** the gold arc: the score is how much of the experience carries the Required Feeling, so the segments sum to 100 and the legend maps onto them exactly. Owner-approved 26 Aug, explicitly scoped: *"aside from that no circles"*. The exception holds because the ring **carries data, not identity**. It must never move nearer the mark, into the masthead or footer, or down to favicon size, where a gold circle on charcoal simply **is** the retired logo. Legend swatches stay **square** on purpose: three gold dots in a column is the retired device. Hard rule 2 is otherwise unchanged.
- **Chrome weights are per-tone CSS variables (`--ctrl`, `--pip`, `--note`), not one flat opacity.** At a flat 45% the controls measured 4.06:1 on charcoal but **2.08:1 on clay**, against the 3:1 minimum for a UI control. All five surfaces now clear it (3.51 to 3.69, tuned within 0.2 so the controls do not visibly change weight between slides). Clay takes a **darker ink than the body copy** (`#141110`): at full strength `#2A211E` only reaches 5.51:1 against clay, so there was no headroom.
- **The masthead carries the site lockup**, crown beside the serif wordmark, as two files swapped by tone (`crown-mark.webp` on light, `DabHands_crown_white.png` on dark). Never a filter: the header and footer crowns are separate drawings.
- **Slide 26 is "the full stop"**: the gold kicker "Simply put", the crown, one line ("Experiences create feelings that enable or inhibit progress."), nothing else, on paper. **The close slide carries the white crown too** (owner's call, 26 Aug). I had removed it on the grounds that two crowns back to back read as a stutter; the owner reinstated it, so the deck is crown-bookended cover to close with the full stop carrying a third. Do not remove it again.
- **The standing notice** ("Private & Confidential · © DAB Hands Delivery Ltd 2026. All rights reserved.") rides the fixed chrome so it appears on every slide without 27 copies in the markup. Print gets a per-page copy via `.f-slide::after`, because the chrome is hidden there. On a phone it lifts above the counter and drops the tail so it holds one line. ⚠ The owner supplied this line with an **em dash**; substituted for `·` per the hard rule and flagged.
- **Full screen** uses the Fullscreen API on the document, read through `useSyncExternalStore` rather than mirrored into state (the lint rule forbids sync `setState` in an effect). ⚠ **iOS Safari has no Fullscreen API for anything but video**, so the button hides itself there rather than offering a dead control.
- **Copy fixes against the source deck:** the cover's "IMOVABLE" set as "immovable"; FEEL Pattern's "where emotion is leaking" set as "where emotion is going", because **"leak" is banned** by the owner's 18 Aug decree.
- **Link preview:** `public/og-feel.png`, a true 1200×630 card (charcoal, gold hairline, white crown, FEEL in Instrument Serif, gold subtitle, DAB Hands bottom right). Rendered from an HTML source through headless Chrome at 2x and downsampled, so it uses the real brand fonts. ⚠ **No unfurler will ever render it while Basic Auth is on**: LinkedIn, Slack and WhatsApp fetch the page and get a 401 before they reach the meta tags. The card only starts working if the gate comes off. Kept anyway so it is ready, and it costs nothing. ⚠ Per the cache-busting rule, a revised card must ship as `og-feel-2.png` with the `image` prop updated, never as a replacement at the same filename.
- **⚠ Every new module must be checked on every surface it lands on.** `.f-steps` was written in light gold because it was built for the slate core-theory slide; on the paper arc slide the words, line, ticks and arrow all measured **1.37:1** and were effectively invisible. It is now tone-aware (deep gold `#7E5E27` on light, `#EBD4A8` on dark) like every other accent in the deck, and every step marker clears 3:1 (lowest 3.10). On `.f-steps.arc` the words are the content, so they never drop below 3:1 — the line does the strengthening instead, not the type.
- **Four v1.1 modules**, all built from the existing system: `.f-spec` (the ten expressions converging on one word), `.f-vs` (a two-sided distinction), `.f-equation` (Spec × Required = brief, the one place the method is stated as a formula) and `.f-ladder` (the whole method on one spine). `.f-steps.arc` reuses the progression device carrying words instead of numerals.
- **Slide 14 (core theory) is a progression, not a list.** `.f-steps`: one line travels through all three, gains gold as it goes and arrives at an arrowhead; each step hangs from it on a tick, and ticks and numerals strengthen 01 → 02 → 03 so the eye is given a direction. On mobile the whole thing **turns and runs down the page**, which is the direction of travel on a phone anyway. ⚠ **Ticks, never dots** — dots are the retired lockup device (see hard rule 2).
- **Lozenge sets are labelled as examples** (`.f-lab.f-lab-chips`), because a bare set of words reads as the vocabulary rather than one worked instance. ⚠ The label needs `.f-lab.f-lab-chips` (two classes): `.f-lab` is declared later in the sheet and beats a single-class rule on equal specificity, which silently swallowed its 44px top margin.
- **⚠ A `.brk` span needs an explicit `{' '}` before it.** JSX strips whitespace that contains a newline, so `text\n<span className="brk">` renders with **no separating space**. Invisible on desktop (the span is `display:block`) and broken on mobile, where it is inline: "a testable standardfor product" shipped that way and was live for a few hours. Every `.brk` now carries one; if you add another, add the `{' '}` too.
- **⚠ Soft returns on the secondary lines (`.f-lede` and `.f-close-line`) are deliberate.** Sixteen secondary lines carry a `<span className="brk">` that goes `display:block` at ≥861px, so each breaks at a **sense point** (a sentence, a clause, a comma) instead of wherever the measure runs out. Before this, nine ended on a two-word stub ("refine them.", "and support.", "Required Feeling.") and several split a noun phrase ("from first / feeling", "employee / behaviour"). Slide 24 takes two breaks and sets as three lines. **Do not "tidy" these spans away**, and if you edit a lede's copy, re-measure: the guard is measurement, not eyeballing (build visual lines by measuring each word's own `Range` rect, then group by `top`). Deliberately desktop-only: on a phone the measure is too narrow to honour them and forcing them strands single words. Slide 7's headline uses the same mechanism for its "dead / long live" couplet.
- **⚠ The scale is stepped by viewport HEIGHT at BOTH ends, not just width.** The `max-width:860px` block is tuned for an 844px-tall screen (iPhone 14/15 and up): body 17px, headings 33px, lede 18.5px. A second block, `(max-width:860px) and (max-height:820px)`, steps that down for shorter phones. **Width alone cannot detect this**: a 390×844 and a 375×667 are the same width and 177px apart in height, and the taller scale overflows twelve slides on the shorter one. ⚠ **Watch what a property means at each step.** That block set `.f-funnels { gap:40px }`, copied from the side-by-side desktop layout, but at 1024 the `max-width:1100px` rule has already stacked the funnels, so the gap is vertical and it pushed slide 7 57px past the fold. There is a matching step-down for **short desktops**, `(min-width:861px) and (max-height:850px)`: the desktop scale assumes ~900px of height, and a 1024×768 iPad in landscape (or any laptop once browser chrome takes its cut) ran five slides past the fold. Verified at 1440×900, 1280×800, 1024×768, 430×932, 390×844, 360×780 and 375×667. Everything fits at every size except the densest slides on a 667px-tall screen (seven of them, worst 111px over), which are **allowed to scroll on purpose**: they are top-aligned and snap-stop at their own top, so nothing is lost, and crushing the type on the smallest screens is the worse trade. On the step grids the numeral goes **inline** with its heading at phone width ("01 Define" on one line), which is both tidier and four lines back on slide 18.
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

### `/script` — the performance director (26 Aug, score rewritten 27 Aug)
**TEMPORARY.** A rehearsal and recording aid for the 60-second film, not part of
the site: noindex via `next.config.ts`, and absent from nav, sitemap.xml and
llms.txt. ⚠ **No Basic Auth** — the gate was built and then REMOVED on the
owner's instruction (26 Aug) so the tool opens on a device without a password
mid-take. The URL resolves for anyone who has it, which puts the unrecorded
script one link away; that is a knowing trade. **Delete `pages/script.tsx`,
`lib/scriptScore.ts` and the `next.config.ts` entry together when the film is
shot.**

The governing idea is a director sitting under the lens, **not an autocue**.
One thought owns the screen; nothing scrolls, nothing slides. Timing *suggests*
rather than enforces: when a thought's speaking time is up the card stays fully
readable and the next ghosts in underneath, so being a second slow costs
nothing. Reading text sits in the upper-middle of the viewport, because the
laptop lives under the lens and eye movement has to stay invisible. Nothing
that must be read goes near the bottom.

- **All performance data lives in `lib/scriptScore.ts`**, never in the
  component. The page derives everything (runtime, progress, the setup
  summary) from `score.length`, so the score can grow or shrink freely.
- **Score v4 (28 Aug) — THE MASTER BRIEF. This is the source of truth.** 24
  cards. The owner's brief supersedes every earlier script brief; do not layer
  the older ones back on. It serves **marketing leaders and growth-stage
  founders at once**, on the shared territory of the gap between what a
  business wants to make happen and its present ability to make it happen.
  Changes from v3: card 02 is now **INSTINCT** ("I've always had a thing for
  making things go, and work better"), replacing the "man and boy" origin; the
  through-line **split into 13 THROUGH-LINE and 14 REASSURANCE**, which is why
  the breath mark is back on its own (the card break is the breath, and it
  clears the six-line ceiling); and the old single belief card became the
  three-card argument **19 QUALITY → 20 CUSTOMER EFFECT → 21 COMMERCIAL
  EFFECT** (best work → feel and act → it has to sell), which must play as one
  connected argument, not three statements. **Runtime 1:38 at 1.0x** (98.65s).
- ⚠ **Card 16's hold is 0.55s**, the only two-decimal value in the score. The
  owner halved it (28 Aug) so "Six weeks later..." hands straight over to the
  number: a beat, not a wait. Do not round it back to 1.1.
- The arc line wraps to two lines on the setup screen at 1280px, because v4
  runs to twelve stages. Cosmetic, and the owner has seen it.
- **Every card is measured to fit:** none overflow the stage, none wrap, the
  tallest (23 VALUE, four lines) reaches 68% of viewport height at 1280x720.
- **Score v3 (27 Aug, second owner brief) — the diagnosis broadened.** Cards
  9 to 13 rewritten so the film speaks to **marketing leaders and growth-stage
  founders at once**, without splitting into two propositions. The shared
  territory is the gap between ambition and the organisation's present ability
  to make it real. Card 9 softened to "rarely lack" (more thoughtful, less
  absolute). Card 10 is now the **CORE DIAGNOSIS**: "when ambition starts
  moving faster than the way the business works" — founders hear an operating
  model outgrown, marketing leaders hear an organisation that cannot execute
  at the speed of its strategy. Card 11 becomes the **CONSEQUENCE** of 10, not
  the diagnosis itself. Card 13 gains the founder reassurance, "without
  flattening what made it good in the first place": operating discipline is
  not corporatisation. Cards 1 to 8, 12 and 14 to 23 untouched. Runtime
  **1:36 at 1.0x** (96.2s).
- ⚠ **Card 13 carries the `○` breath on the customer line, not on a line of
  its own.** The brief wrote it standalone, but six lines of 64px type ran the
  text to **91% of viewport height at 1280x720** and overflowed the stage,
  breaking the page's own rule that nothing which must be read sits near the
  bottom (the eyes visibly drop on camera). Folded in, it is five lines ending
  at 79%, inside the stage. **Measure before adding a line to any card**: five
  is the ceiling at 720px.
- **Score v2 (27 Aug, owner brief):** 23 cards, replacing the original 21.
  Arc is now WARM → PRACTICAL → CREDIBLE → REFLECTIVE → DIAGNOSTIC → ASSURED →
  EVIDENCE → HUMAN → COMMERCIAL → WARM. The rewrite is more evidence-led: the
  new **PROOF run (cards 14 to 16)** — walked into programmes / "Six weeks
  later..." / a number and a decision — and a new **WHAT I DO pair (12, 13)**
  ending on the strategy → system → customer through-line. The pivot moved
  from card 10 to **card 8** ("Here's what I notice."), and the old
  diagnosis split into an unfinished card 10 that hands over to card 11's
  "nobody is managing". Runtime is unchanged at **1:30 at 1.0x** (90.7s, was
  89.9s) and 1:53 to 1:15 across the pace range.
- **Durations are deliberately uneven.** Cards 8, 11, 15, 16 and 19 carry the
  long holds; that is the performance, not a bug. Do not normalise them.
- **`STORE_SCORE` is versioned.** Edits made on the page persist to
  localStorage and would otherwise shadow a new score forever, so **bump the
  key whenever `SCORE` changes** (`v1` → `v2` for the 23-card rewrite, `v2` → `v3` for the broadened diagnosis, `v3` → `v4` for the 24-card master).
- Markup in the lines is plain text so it survives on-page editing: `**bold**`
  for the thought word, `↑ ↓ ↓↓ → ○ ○○` as coaching marks that vanish with
  VOICE GUIDES off. Three modes read the same data: Script (full lines), Cue
  (anchors only), Own It (beat and intent only).

### Private pages
`/for/eterna` hub → Confidence Map + First Response proposals, Basic Auth + noindex + X-Robots-Tag, not in sitemap/llms.txt. Bespoke cream-and-gold house style (Fraunces/Hanken) on the Confidence Map.

## Visual system — palette v6

bone `#F5F1EA`, ink/charcoal `#1F1F1D`, graphite `#5C5C58`, stone `#D8D3CB`, slate blue-green `#535B68`, clay `#A49786`, gold `#C0974A`. Gold TEXT on light uses deep gold `#7E5E27`; on slate use light gold `#EBD4A8` (plain gold fails AA on both bone and slate). **White is always bone.**

## Email (`email/`, 27 Aug) — HubSpot templates

Branded HTML emails, added 27 Aug. **Not part of the Next build.** Nothing
imports them, no route serves them, and `npm run build` never sees them. They
are hand-authored files that get pasted into HubSpot's Design Manager. The only
thing the site owns is `public/images/email/`, which hosts the two lockups
until they are re-hosted on HubSpot's CDN.

- `email/dabhands-email-master.html` — the shell, with the body in an editable
  HubSpot rich text module so a send does not need a code change.
- `email/asset-delivery.html` — send-ready, the "here is the thing you asked
  for" email. Three loud placeholders: `[name of the piece]`, `[link text]`, `HREF`.
- `email/blocks.html` — heading, eyebrow, button, pull quote, inset card,
  hairline, spacer. A viewable reference page, **not** a comment block inside
  the master: the button's Outlook conditional ends on a sequence that closes an
  HTML comment early and spills the rest of the library into the email. That bug
  was found and fixed on the way in. Do not fold it back inline.
- `email/assets/` — three baked lockups and `build-lockups.py`. **Its geometry
  is measured off the live site, not read off the Tailwind classes**, and it
  renders from the browser's own per-character advances, because those carry
  the font's kerning and the `-0.01em` tracking together and PIL applies
  neither on its own. Truth at 1280: crown 32, gap 12, Instrument Serif 28px,
  wordmark 103.02px, **centre aligned** (an earlier bake sat the crown on the
  baseline and dropped tracking, which ran the wordmark 2.46px wide); footer
  22 / 8 / 19px, 69.91px. Three files, not two: the masthead needs its own bone
  version, because scaling the footer file up to masthead width is soft and
  carries the footer's 22:19 ratio into a 32:28 lockup. The console snippet for
  re-measuring is in the script header.
- `email/preview.py` — renders all three into gitignored `.preview-email/` with
  sample HubL values. Two sample address fields are empty on purpose, because
  the footer must survive that without an orphan comma.

**Footer (27 Aug, owner calls):** the band was **lightened** — internal hairline
gone, padding down, legal links on one line. A 4px Slate Blue `#535B68` strip
was added across the top of the band and then **removed the same session by the
owner**; do not reintroduce it. Because the strip is gone, the dark-mode
`.dh-footer { border-top }` rule is load-bearing again: in dark mode the band
and the body are both charcoal and the footer has no edge without it. The
footer signs **Darren Brett · Founder**, not Fractional COO. ⚠ The site still
says Fractional COO in its three role-clue slots; the divergence was flagged
and left standing.

**The constraints differ from the site and are not negotiable.** No web fonts
(Georgia and Helvetica stand in; the wordmark is baked PNG). **No WebP** — the
site's `crown-mark.webp` renders as nothing in Outlook, which is what the old
`email/FEEL_Confirmation_Email.html` got wrong. Links take deep gold `#7E5E27`,
never `#C0974A`, which fails AA at body size. Tables and inline styles
throughout, because Outlook renders through Word.

`email/FEEL_Confirmation_Email.html` is **superseded** by `asset-delivery.html`
(same copy, but it pointed the crown at a `.webp` and carried no unsubscribe
link, which HubSpot will not publish). Left in place pending the owner's call.

Full detail in `email/README.md`.

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
2. Wordmark **"DAB Hands"**; lockup is crown + serif wordmark; no circles/dots/halos. **One exception, owner-approved 26 Aug: the FEEL Score ring on `/feel` slide 14**, because it carries data rather than identity. It is scoped to that one gauge (*"aside from that no circles"*) and must not spread. Do not remove it as a rule violation, and do not treat it as licence for a second circle anywhere.
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
