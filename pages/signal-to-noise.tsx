import type { CSSProperties } from 'react';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { SignalToNoiseDesktop, SignalToNoiseMobile } from '@/components/SignalToNoise';
import { mailto } from '@/lib/mailto';

/*
 * SAFE PASSAGE — v2 to the 17 August brief. Seven sections; the order is the
 * argument: the condition → the evidence → why it happens (+ diagram) → what
 * nobody can tell you → what I do about it → where this comes from → one
 * next step.
 *
 * The page opens on the shared condition (nobody has to admit anything to
 * agree); the blindness arrives in section 4 as a question about their
 * business, not their competence. Editorial rules: a person in every
 * sentence, no paragraph over three sentences, evidence set as figures not
 * prose, the four moves numbered, one pull statement, one disclosure, no
 * dark sections, no client names, and the page ends on a conversation.
 */

const DEEP_GOLD = '#7E5E27';

// Section 3: the two systems, each in its own iconed space on the charcoal
// panel. The cog icons echo the diagram below: big cogs for the business
// system, small meshing cogs for the process system.
const S_ICON = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' } as const;

// The third row: who's holding the idea at each point. Agents sits last
// deliberately: the newest hand in a row of familiar ones, never the
// subject. This card carries the agentic-delivery point structurally; the
// word AI appears nowhere on the page.
const HOLDERS = ['Your team', 'Agencies', 'Partners', 'Contractors', 'Agents'];

const SYSTEMS = [
  {
    name: 'The business system',
    line: 'Where the trade-offs get made.',
    stages: ['Strategy', 'Brand', 'Commercial', 'Product', 'Content', 'Technology', 'Operations'],
    icon: (
      <svg viewBox="0 0 36 36" {...S_ICON} aria-hidden>
        <circle cx="18" cy="18" r="10" />
        <path d="M18 4.5V8M18 28v3.5M4.5 18H8M28 18h3.5M8.5 8.5L11 11M25 25l2.5 2.5M27.5 8.5L25 11M11 25l-2.5 2.5" />
        <circle cx="18" cy="18" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'The process system',
    line: 'Where the work gets handled.',
    stages: ['Brief', 'Plan', 'Design', 'Produce', 'Review', 'Approve', 'Deploy'],
    icon: (
      <svg viewBox="0 0 36 36" {...S_ICON} aria-hidden>
        <circle cx="13" cy="14" r="6.5" />
        <path d="M13 5v2.5M13 20.5V23M4 14h2.5M19.5 14H22M7 8l1.8 1.8M17.2 18.2L19 20" />
        <circle cx="13" cy="14" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="25.5" cy="25.5" r="4.5" />
        <path d="M25.5 19v2M25.5 30v2M19 25.5h2M30 25.5h2" />
        <circle cx="25.5" cy="25.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

// Section 2: the evidence. The Gartner figure runs visible in the body (the
// reader's own job title, and the most recent number); Harvard and Bain sit
// behind the sourcing toggle. Verbatim from the studies; never paraphrased.
const GARTNER_HREF =
  'https://www.gartner.com/en/newsroom/press-releases/2025-03-25-gartner-survey-reveals-84-percent-of-cmos-report-high-levels-of-strategic-dysfunction';

const EVIDENCE = [
  {
    figure: '9%',
    claim: 'Share of managers who say they can rely on colleagues in other functions all of the time. For their own boss and direct reports it’s 84%.',
    source: 'Sull, Homkes and Sull, Why Strategy Execution Unravels, Harvard Business Review, March 2015. 7,600 managers across 262 companies.',
    href: 'https://hbr.org/2015/03/why-strategy-execution-unravelsand-what-to-do-about-it',
  },
  {
    figure: '80% vs 8%',
    claim: 'Share of companies that believe they deliver a superior experience, against the share of their customers who agree.',
    source: 'Bain & Company, Closing the Delivery Gap, 2005. 362 companies.',
    href: 'https://www.bain.com/insights/closing-the-delivery-gap/',
  },
];

// Section 6: the four moves. Numbered, separated, never prose.
const FOUR = [
  {
    num: '01',
    lead: 'Everyone who could kill it is in the room before anything gets built.',
    rest: 'Not shown it later. In it, early, while their objection is still cheap.',
  },
  {
    num: '02',
    lead: 'The work gets gated at the handovers, not on the calendar.',
    rest: 'Not every fortnight. At the specific points where the work changes hands, because that is where the reasoning gets left behind and the next person inherits the what without the why.',
  },
  {
    num: '03',
    lead: 'Somebody owns the space between teams, by name.',
    rest: 'Not because nobody was assigned, but because everybody was, and a thing that belongs to everyone belongs to no one.',
  },
  {
    num: '04',
    lead: 'You get told the truth on a schedule.',
    rest: 'Including when it’s uncomfortable, and especially while it’s still early enough to act.',
  },
];

// The five pre-build principles, in daylight: icon-led, graphical, five not
// twelve (owner call, 2026-08-17: no disclosure). Icons share the diagram's
// sketch weight: thin charcoal line work, nothing corporate.
const P_ICON = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const PRINCIPLES = [
  {
    lead: 'Design for the system you have.',
    rest: 'Work with real conditions, not ideal ones.',
    icon: (
      <svg viewBox="0 0 24 24" {...P_ICON} aria-hidden>
        <path d="M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z" />
        <path d="M9 4.5v13M15 6.5v13" />
      </svg>
    ),
  },
  {
    lead: 'Understand time and tolerance.',
    rest: 'Is there enough time? Is the organisation ready?',
    icon: (
      <svg viewBox="0 0 24 24" {...P_ICON} aria-hidden>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3.5 2" />
      </svg>
    ),
  },
  {
    lead: 'Map friction before it appears.',
    rest: 'Identify where signal will be lost, and who might reshape it.',
    icon: (
      <svg viewBox="0 0 24 24" {...P_ICON} aria-hidden>
        <path d="M12 4.5L21 19.5H3z" />
        <path d="M12 10.5v4" />
        <path d="M12 17.4v.01" />
      </svg>
    ),
  },
  {
    lead: 'Align the big cogs early.',
    rest: 'Create clarity across the key teams before execution.',
    icon: (
      <svg viewBox="0 0 24 24" {...P_ICON} aria-hidden>
        <circle cx="9" cy="9.5" r="4" />
        <path d="M9 3.5v2M9 13.5v2M3 9.5h2M13 9.5h2" />
        <circle cx="16.5" cy="16.5" r="3" />
        <path d="M16.5 12v1.5M16.5 19.5V21M12 16.5h1.5M19.5 16.5H21" />
      </svg>
    ),
  },
  {
    lead: 'Establish shared guardrails.',
    rest: 'Define what is non-negotiable and what can flex.',
    icon: (
      <svg viewBox="0 0 24 24" {...P_ICON} aria-hidden>
        <path d="M5 4v16M19 4v16" />
        <path d="M9 19c0-7 6-7 6-14" />
      </svg>
    ),
  },
];

export default function SafePassage() {
  return (
    <>
      <SeoMeta
        title="Signal to Noise | DAB Hands"
        description="The idea was good. Everybody was competent. It still arrived weaker than it left. A diagnostic that finds where it goes, what it costs, and what to fix first."
        path="/signal-to-noise"
      />

      <Layout footerVariant="none">
        {/* ── 1 · THE CONDITION: the shared experience, no admission required. ── */}
        <section className="bg-bone text-ink pt-36 md:pt-48 pb-16 md:pb-24">
          <div className="u-container">
            <div className="rise">
              <p className="eyebrow text-graphite mb-6">Signal to Noise · A diagnostic</p>
              <h1 className="font-serif text-[36px] md:text-[50px] lg:text-[58px] leading-[1.1] tracking-[-0.01em] max-w-[24ch] u-balance">
                The idea was good. Everybody was competent. It still arrived weaker than it left.
              </h1>
            </div>
            <div className="rise" style={{ '--rise-delay': '0.12s' } as CSSProperties}>
              <p className="mt-9 md:mt-11 text-lg md:text-xl leading-[1.75] text-ink/80 max-w-[52ch]">
                Everyone who has worked inside a large organisation has watched this happen. You’ll know it from the
                moment the work came back, and it was good, and it wasn’t what you meant.
              </p>
            </div>
            <div className="rise" style={{ '--rise-delay': '0.2s' } as CSSProperties}>
              <p className="mt-4 text-lg md:text-xl leading-[1.75] text-ink/80 max-w-[52ch]">
                It gets a little smaller at every handover, always for a perfectly good reason. And nobody stops it,
                because everything is visibly moving, and movement gets read as health.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2 · THE EVIDENCE: three figures break the page's spine. ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <FadeUp>
              <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.12] tracking-[-0.01em]">
                It isn’t just you
              </h2>
            </FadeUp>
            {/* The Gartner figure is always visible: the only external
                corroboration on the page must not be the one thing hidden. */}
            <FadeUp delay={0.06}>
              <p className="mt-6 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[56ch]">
                84% of chief marketing officers report high levels of strategic dysfunction, and 94% say translating
                strategy into an actionable plan is a challenge.{' '}
                <a
                  href={GARTNER_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-stone underline-offset-[3px] transition-colors hover:text-ink hover:decoration-ink"
                >
                  Gartner asked 403 of them in 2025.
                </a>
              </p>
            </FadeUp>
            {/* Harvard and Bain sit behind the sourcing toggle. */}
            <FadeUp delay={0.1}>
            <details className="group mt-7">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                <span className="border-b border-ink/25 pb-0.5 transition-colors group-hover:border-ink">Where these numbers come from</span>
                <span
                  aria-hidden
                  className="inline-flex leading-none text-graphite transition-transform duration-300 group-open:rotate-45"
                >
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-11 max-w-[860px]">
              {EVIDENCE.map((e, i) => (
                <FadeUp key={e.figure} delay={i * 0.08}>
                  <div className="border-t border-stone/70 pt-6 flex h-full flex-col">
                    <p className="font-serif text-[52px] md:text-[56px] lg:text-[64px] leading-none text-ink">
                      {e.figure === '80% vs 8%' ? (
                        <>
                          80%<span className="mx-2 text-[0.42em] text-graphite align-middle">vs</span>8%
                        </>
                      ) : (
                        e.figure
                      )}
                    </p>
                    <p className="mt-4 text-[15.5px] leading-[1.65] text-graphite max-w-[40ch]">{e.claim}</p>
                    <p className="mt-auto pt-5 text-[12.5px] leading-[1.6] text-graphite/85 max-w-[42ch]">
                      <a
                        href={e.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-stone underline-offset-[3px] transition-colors hover:text-ink hover:decoration-ink"
                      >
                        {e.source}
                      </a>
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <p className="mt-11 md:mt-12 text-[16px] md:text-[17px] leading-[1.75] text-ink max-w-[56ch]">
              The same Harvard research found managers are three times more likely to miss a commitment because of
              another team than because of their own.
            </p>
            </details>
            </FadeUp>
          </div>
        </section>

        {/* ── 3 · WHY IT HAPPENS: the charcoal panel. Thesis left at display
            scale; the two systems each hold their own iconed space right
            (owner call, 2026-08-17, overriding the brief's no-dark rule). ── */}
        <section className="bg-charcoal text-bone py-20 md:py-28">
          <div className="u-container">
            {/* Headline and sub run across; the two systems sit side by side
                beneath; the consequence copy closes the panel. */}
            <FadeUp>
              <h2 className="font-serif text-[42px] md:text-[54px] lg:text-[62px] leading-[1.02] tracking-[-0.02em] u-balance">
                Two systems, one idea
              </h2>
              <p className="mt-5 md:mt-6 text-lg md:text-xl leading-[1.7] text-bone/80 max-w-[44ch]">
                Your idea moves through two systems at once.
              </p>
            </FadeUp>

            {/* The business card takes a touch more of the row at xl so its
                seven lozenges hold one line; below xl they wrap naturally. */}
            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr] gap-5 md:gap-6 items-stretch">
              {SYSTEMS.map((s, i) => (
                <FadeUp key={s.name} delay={0.08 + i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-bone/15 p-6 md:p-7 xl:p-6">
                    <div className="flex items-center gap-4">
                      <span className="block h-9 w-9 shrink-0 text-bone">{s.icon}</span>
                      <div>
                        <p className="eyebrow text-bone/60">{s.name}</p>
                        <p className="mt-1.5 text-[16px] md:text-[17px] leading-snug text-bone/90">{s.line}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2 xl:flex-nowrap xl:gap-1.5">
                      {s.stages.map((stage) => (
                        <span key={stage} className="whitespace-nowrap rounded-full border border-bone/20 px-3 py-1 text-[12.5px] text-bone/80 xl:px-2 xl:text-[11px]">
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* The third block is not a system: it is the hands operating both
                of them. No card, no border, no icon; kicker, statement and
                chips sit directly on the ground the two boxes stand on. */}
            <FadeUp delay={0.2}>
              <div className="mt-9 md:mt-11">
                <p className="eyebrow text-bone/60">Who’s holding it</p>
                <p className="mt-1.5 text-[16px] md:text-[17px] leading-snug text-bone/90">
                  People, mostly. Increasingly not.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {HOLDERS.map((h) => (
                    <span key={h} className="whitespace-nowrap rounded-full border border-bone/20 px-3 py-1 text-[12.5px] text-bone/80 xl:px-2 xl:text-[11px]">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
            {/* The two consequences sit as a top-aligned pair, each holding
                two lines at desktop: the longer takes the wider column. */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-[1fr_1.35fr] gap-x-8 gap-y-6 items-start">
              <FadeUp delay={0.26}>
                <p className="text-[16px] xl:text-[15.5px] leading-[1.8] text-bone/80">
                  Someone who was in the room carries the reasons without being told. Everything else carries only
                  what was written down.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="text-[16px] xl:text-[15.5px] leading-[1.8] text-bone/80">
                  Both systems act on the same idea. At every point it either gets stronger, or a piece of what
                  mattered gets traded away for a perfectly good local reason.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 3b · THE DIAGRAM AND THE PRINCIPLES: on the slate panel. The
            pull statement was cut (post-review): the charcoal panel's
            "whatever survived" landing says it better, and signal to noise
            stays in the title and the diagram, where it is earned. ── */}
        <section className="bg-blue-green text-bone py-16 md:py-24">
          <div className="u-container">
            {/* The section's landing, centred over the visual. */}
            <FadeUp>
              <p className="mt-2 md:mt-4 mb-12 md:mb-16 text-center font-serif text-[30px] md:text-[40px] lg:text-[46px] leading-[1.15] tracking-[-0.01em] text-bone max-w-[24ch] mx-auto u-balance">
                What reaches your customer is whatever survived.
              </p>
            </FadeUp>

            {/* The diagram, with the caption in body copy beneath it. */}
            <FadeUp>
              <figure className="mt-4">
                <SignalToNoiseDesktop />
                <SignalToNoiseMobile />
                <figcaption className="mt-2 md:mt-3 text-center mx-auto text-[16px] md:text-[17px] leading-[1.8] text-bone/85 max-w-[56ch]">
                  Everyone in the middle is doing their job properly. Nobody watches it move.
                </figcaption>
              </figure>
            </FadeUp>

            {/* The five pre-build principles: icon-led, in daylight. */}
            <div className="mt-14 md:mt-20">
              <FadeUp>
                <p className="eyebrow mb-8 md:mb-10" style={{ color: '#EBD4A8' }}>The principles behind it</p>
              </FadeUp>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-9">
                {PRINCIPLES.map((p, i) => (
                  <FadeUp key={p.lead} delay={i * 0.06}>
                    <div className="border-t border-bone/25 pt-6 flex h-full flex-col">
                      <span className="block h-8 w-8 text-bone">{p.icon}</span>
                      <p className="mt-5 text-[15.5px] leading-[1.55] font-medium text-bone">{p.lead}</p>
                      <p className="mt-2 text-[14.5px] leading-[1.65] text-bone/80">{p.rest}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 · WHERE IT ACTUALLY GOES: a fact about the system, never a
            comment on the reader's attention (governing rule two). ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <div className="u-grid gap-y-8">
              <FadeUp className="col-span-4 md:col-span-5">
                <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.12] tracking-[-0.01em] u-balance">
                  Where it actually goes
                </h2>
              </FadeUp>
              <div className="col-span-4 md:col-span-6 md:col-start-7">
                <FadeUp delay={0.08}>
                  <p className="text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    Ask what happened and you’ll get answers.
                  </p>
                </FadeUp>
                <FadeUp delay={0.14}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    Marketing will tell you the brief moved. The agency will tell you approvals took six weeks.
                    Engineering will tell you the requirements landed late. Everybody will be telling you the truth.
                  </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-ink max-w-[52ch]">
                    None of it is the answer, because none of them saw the whole thing. They each saw their bit, and
                    their bit was fine.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6 · AND WHAT I DO ABOUT IT: the disclaimer, then four flat
            statements of certainty. Confidence without claimed originality
            (governing rule three). ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <FadeUp>
              <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.12] tracking-[-0.01em]">
                And what I do about it
              </h2>
              {/* This line does more work than any other sentence on the page.
                  Never cut or soften it. */}
              <p className="mt-6 text-[17px] md:text-[19px] leading-[1.65] text-ink max-w-[52ch]">
                None of this is new and I wouldn’t pretend it is. Most of it has been sitting in somebody’s
                methodology for thirty years. Knowing which one a particular leak needs is the part that comes with
                experience.
              </p>
              {/* The name on the page. One sentence, no CV. */}
              <p className="mt-4 text-[15px] leading-[1.7] text-graphite max-w-[52ch]">
                I’m Darren Brett, twenty years inside agencies and alongside global brands, keeping work like this
                moving.
              </p>
            </FadeUp>
            {/* Four moves as four squares: solid soft-grey cards, a large
                serif numeral in deep gold, the lead as a serif statement. */}
            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch max-w-[980px]">
              {FOUR.map((f, i) => (
                <FadeUp key={f.num} delay={i * 0.07} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--color-stone)' }}>
                    <p className="font-serif text-[30px] md:text-[34px] leading-none" style={{ color: DEEP_GOLD }} aria-hidden>
                      {f.num}
                    </p>
                    <p className="mt-4 md:mt-5 font-serif text-[21px] md:text-[23px] leading-[1.25] tracking-[-0.01em] text-ink text-balance">
                      {f.lead}
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.7] text-ink/75">{f.rest}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* One named person on the record. Quiet treatment: no card, no
                photograph, no logo. */}
            <FadeUp delay={0.1}>
              <figure className="mt-12 md:mt-14 max-w-[720px] border-l-2 border-stone pl-6 md:pl-8">
                <blockquote className="font-serif text-[19px] md:text-[21px] leading-[1.55] text-ink">
                  “Darren walked into a really difficult situation and made sense of it remarkably quickly. Within a
                  few weeks, there was a plan, people understood what they were doing again, and the temperature had
                  dropped considerably.”
                </blockquote>
                <figcaption className="mt-4 not-italic">
                  <span className="block text-[14.5px] font-medium text-ink">Dave Wallace</span>
                  <span className="block text-[13px] text-graphite">Former Global COO, Mirum</span>
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>

        {/* ── 7 · ONE NEXT STEP: the page ends on money. ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/50">
          <div className="u-container">
            <div className="u-grid">
              <div className="col-span-4 md:col-span-8 md:col-start-3 text-center">
                <FadeUp>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} loading="lazy" decoding="async" className="block mx-auto mb-5 md:mb-6 h-9 md:h-10 w-auto select-none" />
                  <h2 className="font-serif text-[30px] md:text-[38px] lg:text-[44px] leading-[1.1] max-w-[22ch] mx-auto u-balance">
                    Where is it going in your business?
                  </h2>
                </FadeUp>
                <FadeUp delay={0.06}>
                  {/* The page ends on money. */}
                  <p className="mt-5 text-lg text-graphite max-w-[54ch] mx-auto text-balance">
                    Between your decision and your customer, value is going missing.
                    <br />
                    You’re paying for it either way.
                  </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <div className="mt-8 flex justify-center">
                    <a
                      href={mailto({ subject: 'Where the value is going', body: 'Somewhere between our decisions and what our customers get, value is going missing. I would like to talk.' })}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-blue-green"
                    >
                      Start a conversation
                      <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </a>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
