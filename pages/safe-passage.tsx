import type { CSSProperties } from 'react';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { SignalToNoiseDesktop, SignalToNoiseMobile } from '@/components/SignalToNoise';
import { mailto } from '@/lib/mailto';

/*
 * SAFE PASSAGE — how Darren thinks, for the reader who has already read the
 * homepage. Six sections; the order is the argument (August 2026 brief):
 * recognition → what you can't see → what's happening in there (+ diagram)
 * → what I do about it → where this comes from → one next step.
 *
 * The governing copy rule: there is a person in every sentence. No dark
 * sections; the argument carries the page. One pull statement, one
 * disclosure, no client names, and it ends on a conversation.
 */

// Section 4: the four things, bold lead then the explanation.
const FOUR = [
  {
    lead: 'Everyone who can kill it is in the room before anything gets built.',
    rest: 'Not shown it later. In it, early, while their objection is still cheap.',
  },
  {
    lead: 'The work gets gated where it actually gets diluted.',
    rest: 'Not on a calendar. At the specific handovers where, in your business, intent tends to get traded away.',
  },
  {
    lead: 'Somebody owns the space between the teams, by name.',
    rest: 'Most programmes have an owner for every part and nobody for the gaps. The gaps are where the losses are.',
  },
  {
    lead: 'And you get told the truth on a schedule.',
    rest: 'Including when it’s uncomfortable, and especially while it’s still early enough to do something about.',
  },
];

// The five pre-build principles behind the one disclosure. Five, not twelve.
const PRINCIPLES = [
  { lead: 'Design for the system you have.', rest: 'Work with real conditions, not ideal ones.' },
  { lead: 'Understand time and tolerance.', rest: 'Is there enough time? Is the organisation ready?' },
  { lead: 'Map friction before it appears.', rest: 'Identify where signal will be lost, and who might reshape it.' },
  { lead: 'Align the big cogs early.', rest: 'Create clarity across the key teams before execution.' },
  { lead: 'Establish shared guardrails.', rest: 'Define what is non-negotiable and what can flex.' },
];

export default function SafePassage() {
  return (
    <>
      <SeoMeta
        title="Safe Passage | DAB Hands"
        description="You backed something, and what’s arriving isn’t what you had in your head when you said yes. Safe Passage is how I find where it went."
        path="/safe-passage"
      />

      <Layout footerVariant="none">
        {/* ── 1 · RECOGNITION: if the reader doesn't see themselves in ten
            seconds, nothing below matters. CSS .rise entrance. ── */}
        <section className="bg-bone text-ink pt-36 md:pt-48 pb-16 md:pb-24">
          <div className="u-container">
            <div className="rise">
              <p className="eyebrow text-graphite mb-6">Safe Passage</p>
              <h1 className="font-serif text-[38px] md:text-[54px] lg:text-[64px] leading-[1.08] tracking-[-0.01em] max-w-[17ch] u-balance">
                You can feel it isn’t landing. Nobody can tell you why.
              </h1>
            </div>
            <div className="rise" style={{ '--rise-delay': '0.12s' } as CSSProperties}>
              <p className="mt-9 md:mt-12 text-lg md:text-xl leading-[1.75] text-ink/80 max-w-[54ch]">
                You backed something. You stood in a room and said <em>we’re doing this</em>, and people got on with it.
                Months later the reports are green, the meetings happen, everyone is busy, and what’s arriving isn’t
                what you had in your head when you said yes.
              </p>
            </div>
            <div className="rise" style={{ '--rise-delay': '0.2s' } as CSSProperties}>
              <p className="mt-5 text-lg md:text-xl leading-[1.75] text-ink/80 max-w-[54ch]">
                Nobody is hiding anything from you. They can’t see it either.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2 · WHAT YOU CAN'T SEE FROM WHERE YOU SIT ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <div className="u-grid gap-y-8">
              <FadeUp className="col-span-4 md:col-span-5">
                <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.12] tracking-[-0.01em] u-balance">
                  What you can’t see from where you sit
                </h2>
              </FadeUp>
              <div className="col-span-4 md:col-span-6 md:col-start-7">
                <FadeUp delay={0.08}>
                  <p className="text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    You can see two things clearly. The decision you made, and what turned up.
                  </p>
                </FadeUp>
                <FadeUp delay={0.14}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    You can’t see the middle. Neither can the people who report to you, because they’re standing in it.
                  </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    That’s what the seat does. The further you are from the work, the more of it you take on trust. And
                    the more people between you and it, the more each handover costs you something you never find out
                    about.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3 · WHAT'S HAPPENING IN THE PART YOU CAN'T SEE: the argument,
            the one pull statement, the diagram, the one disclosure. ── */}
        <section className="bg-clay/20 text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <div className="u-grid gap-y-8">
              <FadeUp className="col-span-4 md:col-span-5">
                <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.12] tracking-[-0.01em] u-balance">
                  What’s happening in the part you can’t see
                </h2>
              </FadeUp>
              <div className="col-span-4 md:col-span-6 md:col-start-7">
                <FadeUp delay={0.08}>
                  <p className="text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    Your idea moves through two systems at once.
                  </p>
                </FadeUp>
                <FadeUp delay={0.14}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    The business system, where the trade-offs get made. Strategy, brand, commercial, product, content,
                    technology, operations.
                  </p>
                </FadeUp>
                <FadeUp delay={0.18}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    And the process system underneath it, where the work actually gets handled. Brief, plan, design,
                    produce, review, approve, deploy.
                  </p>
                </FadeUp>
                <FadeUp delay={0.22}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    Both act on the same idea. At every point it either gets stronger, or a piece of what made it worth
                    doing gets traded away for a perfectly good local reason. Nobody does that to you deliberately.
                    Everyone is doing their job.
                  </p>
                </FadeUp>
                <FadeUp delay={0.26}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-ink max-w-[52ch]">
                    What reaches your customer is whatever survived.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* The one pull statement on the page. Type only, no framing. */}
            <FadeUp>
              <p className="mt-16 md:mt-24 mb-14 md:mb-20 text-center font-serif text-[30px] md:text-[40px] lg:text-[46px] leading-[1.15] tracking-[-0.01em] text-ink max-w-[24ch] mx-auto u-balance">
                Connection is a function of signal to noise.
              </p>
            </FadeUp>

            {/* The diagram, with the caption in body copy beneath it. */}
            <FadeUp>
              <figure className="mt-4">
                <SignalToNoiseDesktop />
                <SignalToNoiseMobile />
                <figcaption className="mt-6 md:mt-8 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[56ch]">
                  Everyone between you and the customer is standing inside the part you can’t see. Which is why nobody
                  can tell you where it went.
                </figcaption>
              </figure>
            </FadeUp>

            {/* The one disclosure on the page: the five pre-build principles. */}
            <FadeUp>
              <details className="group mt-12 md:mt-16 max-w-[720px] border-y border-stone/70">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  The principles behind it
                  <span
                    aria-hidden
                    className="inline-flex leading-none text-graphite transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <ul className="pb-6 pt-1 space-y-4">
                  {PRINCIPLES.map((p) => (
                    <li key={p.lead} className="text-[15.5px] leading-[1.7]">
                      <span className="font-medium text-ink">{p.lead}</span>{' '}
                      <span className="text-graphite">{p.rest}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </FadeUp>
          </div>
        </section>

        {/* ── 4 · WHAT I DO ABOUT IT: four things, editorial, no cards. ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <FadeUp>
              <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.12] tracking-[-0.01em] u-balance">
                What I do about it
              </h2>
              <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                Safe Passage isn’t governance and it isn’t more meetings. It’s four things.
              </p>
            </FadeUp>
            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9 max-w-[980px]">
              {FOUR.map((f, i) => (
                <FadeUp key={f.lead} delay={i * 0.06}>
                  <div className="border-t border-stone/70 pt-5">
                    <p className="text-[16px] md:text-[17px] leading-[1.75]">
                      <span className="font-semibold text-ink">{f.lead}</span>{' '}
                      <span className="text-graphite">{f.rest}</span>
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5 · WHERE THIS COMES FROM: the numbers do the work, no names. ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <div className="u-grid gap-y-8">
              <FadeUp className="col-span-4 md:col-span-5">
                <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.12] tracking-[-0.01em] u-balance">
                  Where this comes from
                </h2>
              </FadeUp>
              <div className="col-span-4 md:col-span-6 md:col-start-7">
                <FadeUp delay={0.08}>
                  <p className="text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    None of this is theory. It’s what twenty years of delivering work has left behind.
                  </p>
                </FadeUp>
                <FadeUp delay={0.14}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[52ch]">
                    I’ve watched it happen on a fifty million pound platform programme, on a four year redesign that ran
                    through seven different sponsors, and on a rescue where three people had already been through it
                    before me. Different businesses, different sectors, different decades. The same thing every time.
                    The idea was good, everybody involved was competent, and it arrived weaker than it left.
                  </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-ink max-w-[52ch]">
                    After enough of them you start to see it coming. That’s all this is.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6 · ONE NEXT STEP: the page ends on a conversation. ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/50">
          <div className="u-container">
            <div className="u-grid">
              <div className="col-span-4 md:col-span-8 md:col-start-3 text-center">
                <FadeUp>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} loading="lazy" decoding="async" className="block mx-auto mb-5 md:mb-6 h-9 md:h-10 w-auto select-none" />
                  <h2 className="font-serif text-[30px] md:text-[38px] lg:text-[44px] leading-[1.1] max-w-[22ch] mx-auto u-balance">
                    If the first paragraph sounded familiar
                  </h2>
                </FadeUp>
                <FadeUp delay={0.06}>
                  <p className="mt-5 text-lg text-graphite max-w-[54ch] mx-auto text-balance">
                    That’s the conversation. Not a proposal. A conversation about what you can and can’t see from where
                    you’re sitting.
                  </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <div className="mt-8 flex justify-center">
                    <a
                      href={mailto({ subject: 'The first paragraph sounded familiar', body: 'I backed something and what’s arriving isn’t what I had in my head. I would like to talk.' })}
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
