import { FadeUp } from './FadeUp';
import { mailto } from '@/lib/mailto';

export interface EntryProductContent {
  kicker: string;
  name: string;
  duration: string;
  whenToBuy: string;
  whatItIs: string;
  whatYouGet: string;
  /** "The honest bits" — the two page-specific answers. "Who does it" and the
      footnote are shared across all three doors and live in the component. */
  honest: { need: string; after: string };
  button: string;
  enquiry: { subject: string; body: string };
}

/* ── Entry product module (v2) ────────────────────────────────────────────
   One buyable "Read" per doorway page. A mid-tone Warm Clay band placed after
   the testimonials and before the closing CTA: proof, then the ask. The only
   mid-tone band on the page, so it reads as a distinct object.

   Structure: kicker + serif name + duration, then the three sold blocks (When
   to buy this / What it is / What you get) laid THREE ACROSS on the shared
   12-col grid (same as Typical engagements; stacked on mobile), each topped by
   a hairline. Then "The honest bits" as a native <details> disclosure (closed
   by default — objection handling a cold reader can skip), then the Walnut
   button and a shared footnote.

   Colour (existing tokens only, no gold — gold and Warm Clay sit too close in
   value): Warm Clay ground; Walnut top rule, product name, hairlines and
   button; bone text on the button. Small text is Ink, not Walnut/muted-brown:
   Walnut on Warm Clay is ~3.4:1 and the muted browns are lower still, which
   fail AA for small text; Ink on Clay is ~5.5:1. Square corners; one pill. */

const RULE = 'rgba(83,64,59,0.28)'; // Walnut at 28% — decorative hairlines
const WHO_DOES_IT =
  'Me. All of it, start to finish. You will not be sold by one person and delivered by another.';
const FOOTNOTE =
  'One conversation to scope it. Fixed price and a fixed end date, agreed before we start.';

// Each sold block is a Soft Grey card matching the Typical engagements section
// (rounded, equal height on the shared grid). Text sits on stone, where Walnut
// (label) and Ink (body) both clear AA comfortably.
const Block = ({ label, body }: { label: string; body: string }) => (
  <div
    className="col-span-4 flex h-full flex-col rounded-2xl p-6 md:p-7"
    style={{ backgroundColor: 'var(--color-stone)' }}
  >
    <p className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '1.8px', color: 'var(--color-walnut)' }}>
      {label}
    </p>
    <p className="mt-3 text-[15px] leading-[1.6] text-ink">{body}</p>
  </div>
);

export const EntryProduct = ({ content }: { content: EntryProductContent }) => {
  const honest = [
    { label: 'What I need from you', body: content.honest.need },
    { label: 'Who does it', body: WHO_DOES_IT },
    { label: 'What happens afterwards', body: content.honest.after },
  ];

  return (
    <section
      aria-labelledby="entry-product-name"
      className="ep-module"
      style={{ backgroundColor: 'var(--color-clay)', borderTop: '3px solid var(--color-walnut)' }}
    >
      <style>{`.ep-module details[open] .ep-plus{transform:rotate(45deg)}`}</style>
      <div className="u-container">
        <div className="py-[22px] md:py-[32px]">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase text-ink" style={{ letterSpacing: '2.2px' }}>
              {content.kicker}
            </p>
            <h2
              id="entry-product-name"
              className="mt-3 font-serif text-[24px] font-normal leading-[1.1] md:text-[30px]"
              style={{ color: 'var(--color-walnut)' }}
            >
              {content.name}
            </h2>
            <p className="mt-2 text-[15px] text-ink">{content.duration}</p>
          </FadeUp>

          {/* Three sold blocks as Soft Grey cards, three across on desktop
              (same grid + cards as Typical engagements), stacked on mobile. */}
          <FadeUp delay={0.05}>
            <div className="u-grid gap-y-5 mt-8 md:mt-10">
              <Block label="When to buy this" body={content.whenToBuy} />
              <Block label="What it is" body={content.whatItIs} />
              <Block label="What you get" body={content.whatYouGet} />
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <details className="mt-8 border-t pt-5 md:mt-10" style={{ borderColor: RULE }}>
              <summary
                className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase text-ink [&::-webkit-details-marker]:hidden"
                style={{ letterSpacing: '1.8px' }}
              >
                The honest bits
                <span
                  aria-hidden
                  className="ep-plus ml-4 inline-flex text-walnut transition-transform duration-300 motion-reduce:transition-none"
                >
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="mt-5 grid gap-y-4 md:grid-cols-3 md:gap-x-8">
                {honest.map((h) => (
                  <p key={h.label} className="max-w-[560px] text-[14.5px] leading-[1.62] text-ink">
                    <span className="font-semibold text-ink">{h.label}.</span> {h.body}
                  </p>
                ))}
              </div>
            </details>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-8 border-t pt-6 md:mt-10" style={{ borderColor: RULE }}>
              <a
                href={mailto(content.enquiry)}
                className="inline-flex items-center justify-center text-[15px] font-medium text-bone"
                style={{ backgroundColor: 'var(--color-walnut)', padding: '14px 30px', borderRadius: '40px' }}
              >
                {content.button}
              </a>
              <p className="mt-[14px] text-[13px] text-ink">{FOOTNOTE}</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
