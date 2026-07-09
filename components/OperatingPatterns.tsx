import { useId, useState } from 'react';
import { FadeUp } from './FadeUp';

/* ── Operating Patterns ───────────────────────────────────────────────────────
   Accumulated judgement shown as a museum wall of operating truths — not case
   studies, not a portfolio. A black editorial stage; each pattern is a plaque:
   a small label, one large serif truth and, on demand, the thinking behind it
   (Why it matters / Where I learned it). One plaque opens at a time; opening
   another gracefully closes the last. The reveal is a calm CSS grid-rows
   transition (no measuring, no layout jump), ~420ms, honouring reduced motion.
   The interaction should disappear; the thinking should remain. ── */

export interface OperatingPattern {
  headline: string;
  why: string;
  learned: string;
}

export interface OperatingPatternsContent {
  /** Serif intro statement, e.g. "Twenty years… again and again." */
  intro: string;
  /** Short supporting lines under the intro ("These aren't case studies." …) */
  support: string[];
  /** Label for the hero's anchor link down to the exhibit (default "See how I think"). */
  heroLink?: string;
  items: OperatingPattern[];
}

export const OperatingPatterns = ({ content }: { content: OperatingPatternsContent }) => {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  // A lone pattern is shown fully open as a static plaque — nothing to operate.
  // The accordion returns automatically once a second pattern exists.
  const single = content.items.length === 1;

  return (
    <section
      id="operating-patterns"
      aria-labelledby={`${baseId}-heading`}
      className={`bg-black text-bone pt-24 md:pt-32 lg:pt-40 ${single ? 'pb-12 md:pb-14 lg:pb-16' : 'pb-24 md:pb-32 lg:pb-40'}`}
    >
      <div className="u-container">
        {/* The exhibit's wall text: label, one serif statement, two quiet lines. */}
        <FadeUp>
          <h2 id={`${baseId}-heading`} className="eyebrow text-gold">Operating Patterns</h2>
        </FadeUp>
        <FadeUp delay={0.06}>
          <p className="mt-7 md:mt-9 font-serif text-[28px] md:text-[36px] lg:text-[42px] leading-[1.18] tracking-[-0.01em] text-bone max-w-[30ch]">
            {content.intro}
          </p>
        </FadeUp>
        <FadeUp delay={0.12}>
          <p className="mt-6 text-[16px] md:text-[17px] leading-[1.8] text-bone/60 max-w-[46ch]">
            {content.support.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
        </FadeUp>

        {/* The plaques. */}
        <div className="mt-16 md:mt-20 border-b border-bone/15">
          {content.items.map((item, i) => {
            const isOpen = open === i;
            const num = String(i + 1).padStart(2, '0');
            if (single) {
              // A lone plaque drops the numeral and its gutter (nothing to count),
              // aligning flush with the wall text above.
              return (
                <FadeUp key={i}>
                  <article className="border-t border-bone/15 pt-8 md:pt-11 pb-10 md:pb-14">
                    <div>
                      <p className="eyebrow text-bone/45">Operating Pattern</p>
                      <h3 className="mt-3 font-serif text-[26px] md:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.01em] text-bone/90">
                        {item.headline}
                      </h3>
                    </div>
                    <div className="mt-8 md:mt-10 grid grid-cols-1 gap-y-8 gap-x-10 md:grid-cols-2 md:pr-24">
                      <div>
                        <p className="eyebrow text-bone/45">Why it matters</p>
                        <p className="mt-4 text-[15px] md:text-[16px] leading-[1.8] text-bone/80 max-w-[46ch]">{item.why}</p>
                      </div>
                      <div>
                        <p className="eyebrow text-bone/45">Where I learned it</p>
                        <p className="mt-4 text-[15px] md:text-[16px] leading-[1.8] text-bone/80 max-w-[46ch]">{item.learned}</p>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              );
            }
            return (
              <FadeUp key={i} delay={i * 0.05}>
                <article className="border-t border-bone/15">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={`${baseId}-trigger-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${baseId}-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group grid w-full grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.25rem_1fr_auto] items-start py-8 md:py-11 text-left"
                    >
                      {/* The one restrained accent: a small gold numeral, in a fixed
                          column shared with the expanded panel below. */}
                      <span aria-hidden className="mt-[5px] text-[12px] md:text-[13px] tracking-[0.18em] text-gold tabular-nums">
                        {num}
                      </span>
                      <span>
                        <span className="eyebrow block text-bone/45">Operating Pattern</span>
                        <span className="mt-3 block font-serif text-[26px] md:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.01em] text-bone/90 transition-colors duration-300 group-hover:text-bone">
                          {item.headline}
                        </span>
                      </span>
                      {/* The cue: quiet text + a plus that settles into a close. */}
                      <span className="mt-[5px] ml-6 flex items-center gap-2.5 text-[13px] text-bone/50 transition-colors duration-300 group-hover:text-bone">
                        <span className="hidden md:inline">{isOpen ? 'Close' : 'Explore pattern'}</span>
                        <span
                          aria-hidden
                          className={`inline-flex transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
                        >
                          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  </h3>

                  {/* The reveal: grid-rows 0fr→1fr animates height without measuring;
                      the content crossfades a beat behind the panel. */}
                  <div
                    id={`${baseId}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${baseId}-trigger-${i}`}
                    className="grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      {/* Same column template as the trigger, so the content's left
                          edge aligns exactly with the label and headline above. */}
                      <div className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.25rem_1fr]">
                        <span aria-hidden />
                        <div
                          className={`grid grid-cols-1 gap-y-8 gap-x-10 pb-10 md:grid-cols-2 md:pb-14 md:pr-24 transition-opacity duration-300 motion-reduce:transition-none ${
                            isOpen ? 'opacity-100 delay-150' : 'opacity-0 delay-0'
                          }`}
                        >
                          <div>
                            <p className="eyebrow text-bone/45">Why it matters</p>
                            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.8] text-bone/80 max-w-[46ch]">{item.why}</p>
                          </div>
                          <div>
                            <p className="eyebrow text-bone/45">Where I learned it</p>
                            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.8] text-bone/80 max-w-[46ch]">{item.learned}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};
