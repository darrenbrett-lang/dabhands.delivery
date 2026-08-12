import type { CSSProperties } from 'react';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

/*
 * THE SAFE PASSAGE MODEL — the operating model beneath every DAB Hands
 * engagement. Deeper intellectual proof for visitors who want to understand
 * how Darren works; it explains the thinking, it never becomes a competing
 * proposition. Rhythm: bone hero → clay gates → charcoal model → bone
 * dilution → slate comparison → bone turns → bone close.
 */

// Deep gold for AA-legible gold TEXT on light grounds (bone/clay). The
// standard gold token is reserved for dark stages and hairlines.
const DEEP_GOLD = '#7E5E27';

// The three turns, exactly as they read on the homepage. The model page
// mirrors them; it must never drift from the live proposition.
const TURNS = [
  {
    key: 'strategy',
    from: 'Strategic direction',
    to: 'operating reality',
    tie: 'Safe Passage asks whether decisions, priorities, rhythms and ways of working genuinely serve the direction. The point is not more strategy. It is making sure strategy has somewhere to land.',
  },
  {
    key: 'complexity',
    from: 'System complexity',
    to: 'coordinated flow',
    tie: 'Complexity is inevitable in any successful organisation. The point is not to remove it. It is to move through it without letting people, priorities or technology weaken the signal.',
  },
  {
    key: 'impact',
    from: 'Important work',
    to: 'real results',
    tie: 'Programmes, platforms and campaigns rarely fail because the idea was wrong. They lose strength in translation. Safe Passage preserves the clarity and conviction the work started with.',
  },
];

// Section 4: the small, recognisable moments where the signal weakens.
const DILUTIONS = [
  { moment: 'An approval', line: 'softens the edge that made the work distinctive.' },
  { moment: 'A handover', line: 'leaves context behind with the people who had it.' },
  { moment: 'An interpretation', line: 'lets every team optimise for its own version of success.' },
  { moment: 'A technology constraint', line: 'quietly trims the experience the customer was meant to have.' },
  { moment: 'A priority change', line: 'splits the attention the work depended on.' },
  { moment: 'A delay', line: 'invites hurried compromises right at the end.' },
];

// Section 5: the two journeys, side by side. Calm, not a sales diagram.
const WITHOUT = ['Strong strategy', 'Multiple translations', 'Drift', 'Compromised execution', 'Reduced impact'];
const WITH = ['Strong strategy', 'Shared intent', 'Clear decisions', 'Coordinated delivery', 'Stronger impact'];

// The organisational layers the signal has to travel through.
const LAYERS = ['People', 'Process', 'Technology', 'Data', 'Partners', 'Governance', 'Decisions'];

export default function SafePassage() {
  return (
    <>
      <SeoMeta
        title="The Safe Passage Model | DAB Hands"
        description="The operating model behind every DAB Hands engagement. First make sure the work is right. Then protect its intent as it moves through the organisation."
        path="/safe-passage"
      />

      <Layout>
        {/* ── 1 · HERO: two statements, room to breathe. CSS .rise entrance. ── */}
        <section className="bg-bone text-ink pt-36 md:pt-48 pb-20 md:pb-28">
          <div className="u-container">
            <div className="rise">
              <p className="eyebrow text-graphite mb-6">The Safe Passage Model</p>
              <h1 className="font-serif text-[38px] md:text-[54px] lg:text-[64px] leading-[1.06] tracking-[-0.01em] max-w-[19ch] u-balance">
                Every important piece of work deserves two things.
              </h1>
            </div>
            <div className="rise" style={{ '--rise-delay': '0.12s' } as CSSProperties}>
              <div className="mt-10 md:mt-14 space-y-4 md:space-y-5">
                <p className="font-serif text-[22px] md:text-[27px] leading-[1.35] text-ink max-w-[30ch]">
                  First, the confidence that it’s the right thing to do.
                </p>
                <p className="font-serif text-[22px] md:text-[27px] leading-[1.35] text-ink max-w-[30ch]">
                  Second, the best possible conditions to realise its full potential.
                </p>
              </div>
            </div>
            <div className="rise" style={{ '--rise-delay': '0.2s' } as CSSProperties}>
              <a
                href="#the-model"
                className="mt-12 md:mt-14 inline-flex items-center gap-2 text-[15px] font-medium text-ink border-b border-ink/25 pb-0.5 hover:border-ink transition-colors"
              >
                See the model
                <span aria-hidden className="text-[15px]">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 2 · THE TWO GATES: two editorial statements on the clay wash. ── */}
        <section className="bg-clay/20 text-ink py-20 md:py-28 border-t border-stone/60">
          <div className="u-container">
            <div className="u-grid gap-y-14">
              <FadeUp className="col-span-4 md:col-span-6 lg:col-span-5">
                <p className="font-serif text-[15px]" style={{ color: DEEP_GOLD }} aria-hidden>
                  01
                </p>
                <h2 className="mt-3 font-serif text-[30px] md:text-[36px] leading-[1.12] tracking-[-0.01em] u-balance">
                  Is this the right thing to do?
                </h2>
                <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[46ch]">
                  Money, attention, energy and belief are finite. Before an organisation commits them, the work has to earn its place. Does it advance the strategy? Does it create real customer or commercial value? Does it deserve the organisation’s attention?
                </p>
                <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[46ch]">
                  The question is never just whether you can. It’s whether you should. And the more capable the tools become, the sharper that question needs to be.
                </p>
              </FadeUp>
              <FadeUp delay={0.1} className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
                <p className="font-serif text-[15px]" style={{ color: DEEP_GOLD }} aria-hidden>
                  02
                </p>
                <h2 className="mt-3 font-serif text-[30px] md:text-[36px] leading-[1.12] tracking-[-0.01em] u-balance">
                  Give it Safe Passage.
                </h2>
                <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[46ch]">
                  Once the commitment is made, the obligation changes. The work now has to travel through a real organisation: people, teams, leadership, partners, technology, governance, timelines.
                </p>
                <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-graphite max-w-[46ch]">
                  Every transition is a chance for the original intent to weaken. The job from here is to give the work the strongest possible conditions to arrive intact.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 3 · THE SIGNATURE MODEL: one journey down the page on the charcoal
            stage. A signal line runs ambition → impact; through the organisation
            it frays, through Safe Passage it recovers. Five-second readable. ── */}
        <section id="the-model" className="bg-charcoal text-bone py-20 md:py-28 scroll-mt-16">
          <div className="u-container">
            <FadeUp>
              <p className="eyebrow text-gold mb-14 md:mb-16 text-center">The journey</p>
            </FadeUp>

            <div className="mx-auto max-w-[640px] text-center">
              {/* Ambition */}
              <FadeUp>
                <p className="font-serif text-[34px] md:text-[42px] leading-none">Ambition</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bone/70 max-w-[38ch] mx-auto">
                  Strategic intent, clearly held. The reason the work exists.
                </p>
              </FadeUp>

              {/* Signal, coherent */}
              <FadeUp>
                <div aria-hidden className="sp-seg sp-pulse mt-8 h-14 md:h-16" style={{ backgroundColor: 'color-mix(in srgb, var(--color-gold) 55%, transparent)' }} />
              </FadeUp>

              {/* The organisation */}
              <FadeUp>
                <div className="mt-8">
                  <p className="eyebrow text-bone/60">The organisation</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {LAYERS.map((l) => (
                      <span key={l} className="rounded-full border border-bone/25 px-3.5 py-1.5 text-[12.5px] text-bone/80">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Signal, fraying */}
              <FadeUp>
                <div
                  aria-hidden
                  className="sp-seg mt-8 h-14 md:h-16 opacity-40"
                  style={{ backgroundImage: 'repeating-linear-gradient(to bottom, var(--color-bone) 0 5px, transparent 5px 13px)' }}
                />
                <p className="mt-4 text-[14px] leading-relaxed text-bone/55 max-w-[40ch] mx-auto">
                  Translation. Interpretation. Delay. Compromise.
                  <br />
                  Not one of them fatal. All of them costing signal.
                </p>
              </FadeUp>

              {/* Safe Passage: the gate the signal passes through */}
              <FadeUp>
                <div className="mt-8 border-y border-gold/40 py-7 md:py-8">
                  <p className="eyebrow text-gold">Safe Passage</p>
                  <p className="mt-4 font-serif text-[21px] md:text-[24px] leading-[1.4] text-bone max-w-[30ch] mx-auto u-balance">
                    Protect intent. Reduce drag. Align decisions. Maintain momentum.
                  </p>
                </div>
              </FadeUp>

              {/* Signal, restored */}
              <FadeUp>
                <div aria-hidden className="sp-seg sp-pulse mt-8 h-14 md:h-16" style={{ backgroundColor: 'color-mix(in srgb, var(--color-gold) 85%, transparent)' }} />
              </FadeUp>

              {/* Impact */}
              <FadeUp>
                <p className="mt-8 font-serif text-[34px] md:text-[42px] leading-none">Impact</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bone/70 max-w-[38ch] mx-auto">
                  The work arrives with what made it valuable intact.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 4 · SIGNAL LOSS, MADE REAL: six small recognisable moments. ── */}
        <section className="bg-bone text-ink py-20 md:py-28">
          <div className="u-container">
            <FadeUp>
              <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.01em] max-w-[22ch] u-balance">
                Good work rarely disappears. It gets diluted.
              </h2>
            </FadeUp>
            <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
              {DILUTIONS.map((d, i) => (
                <FadeUp key={d.moment} delay={i * 0.05}>
                  <div className="border-t border-stone/70 pt-5">
                    <p className="text-[16px] leading-[1.7] text-ink">
                      <span className="font-medium">{d.moment}</span>{' '}
                      <span className="text-graphite">{d.line}</span>
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.1}>
              <p className="mt-12 md:mt-14 font-serif text-[24px] md:text-[28px] leading-[1.3] text-ink max-w-[26ch] u-balance">
                No single moment ruins the work. Together, they can take most of it.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 5 · THE TWO JOURNEYS: without / with, side by side on slate. ── */}
        <section className="bg-blue-green text-bone py-20 md:py-28">
          <div className="u-container">
            <div className="u-grid gap-y-12">
              <FadeUp className="col-span-4 md:col-span-5">
                <p className="eyebrow text-bone/60 mb-7">Without Safe Passage</p>
                <ul className="space-y-0">
                  {WITHOUT.map((step, i) => (
                    <li key={step} className={`py-3.5 text-[17px] md:text-[18px] leading-snug ${i === 0 ? '' : 'border-t border-bone/15'} ${i === WITHOUT.length - 1 ? 'text-bone/55' : 'text-bone/80'}`}>
                      {step}
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp delay={0.12} className="col-span-4 md:col-span-5 md:col-start-8">
                <p className="eyebrow mb-7" style={{ color: '#EBD4A8' }}>
                  With Safe Passage
                </p>
                <ul className="space-y-0">
                  {WITH.map((step, i) => (
                    <li key={step} className={`py-3.5 text-[17px] md:text-[18px] leading-snug text-bone ${i === 0 ? '' : 'border-t border-gold/30'} ${i === WITH.length - 1 ? 'font-serif text-[20px] md:text-[22px]' : ''}`}>
                      {step}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 6 · BACK TO THE PROPOSITION: the three turns the site is built on,
            exactly as they read on the homepage, tied to the model. ── */}
        <section className="bg-bone text-ink py-20 md:py-28 border-b border-stone/50">
          <div className="u-container">
            <FadeUp>
              <p className="eyebrow text-graphite mb-5">Where you feel it</p>
              <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.01em] max-w-[24ch] u-balance">
                Safe Passage runs underneath everything DAB Hands does.
              </h2>
            </FadeUp>
            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-10">
              {TURNS.map((t, i) => (
                <FadeUp key={t.key} delay={i * 0.1}>
                  <div className="border-t border-stone/60 pt-6">
                    <h3 className="font-serif text-[26px] md:text-[22px] lg:text-[28px] leading-[1.15] tracking-[-0.01em] text-ink">
                      {t.from}
                      <br />
                      <span className="italic text-gold">into</span> {t.to}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.7] text-graphite max-w-[46ch]">{t.tie}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7 · CLOSE: the only commercial CTA on the page. ── */}
        <section className="bg-bone text-ink py-16 md:py-24">
          <div className="u-container">
            <div className="u-grid">
              <div className="col-span-4 md:col-span-8 md:col-start-3 text-center">
                <FadeUp>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} loading="lazy" decoding="async" className="block mx-auto mb-5 md:mb-6 h-9 md:h-10 w-auto select-none" />
                  <h2 className="font-serif text-[30px] md:text-[38px] lg:text-[44px] leading-[1.1] max-w-[24ch] mx-auto u-balance">
                    The model isn’t what I sell.
                    <br />
                    It’s how I work.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.06}>
                  <p className="mt-5 text-lg text-graphite max-w-[58ch] mx-auto text-balance">
                    Every DAB Hands engagement is guided by the Safe Passage Model: a practical way of protecting strategic intent, reducing organisational drag and helping important work arrive with the impact it deserves.
                  </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <div className="mt-8 flex justify-center">
                    <a
                      href={mailto({ subject: 'Giving important work Safe Passage', body: 'We have important work in motion and I want its intent to survive the journey. I would like to talk.' })}
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
