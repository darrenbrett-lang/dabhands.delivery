import { FadeUp } from './FadeUp';
import { mailto } from '@/lib/mailto';

export interface EntryProductContent {
  kicker: string;
  name: string;
  duration: string;
  body: string[];
  pullQuote: string;
  button: string;
  enquiry: { subject: string; body: string };
  footnote: string;
}

/* ── Entry product module ─────────────────────────────────────────────────
   One buyable "Read" per doorway page. A mid-tone Warm Clay band that sits
   after the testimonials and before the closing CTA: proof, then the ask.
   It is the only mid-tone band on the page, so it reads as a distinct object.

   Colour (existing tokens only, no gold — gold and Warm Clay sit too close in
   value): Warm Clay ground; Walnut structure (3px top rule, serif name,
   pull-quote rule, button); bone text on the Walnut button. Small text is Ink,
   not Walnut: Walnut on Warm Clay is ~3.4:1, which clears AA only at the large
   product-name size — small copy would fail, so it uses Ink (the brief's own
   accessibility note, "Ink on sand"). Square corners; a single pill button. */
export const EntryProduct = ({ content }: { content: EntryProductContent }) => (
  <section
    aria-labelledby="entry-product-name"
    style={{ backgroundColor: 'var(--color-clay)', borderTop: '3px solid var(--color-walnut)' }}
  >
    <div className="u-container">
      <div className="max-w-[620px] py-[26px] md:py-[44px]">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase text-ink" style={{ letterSpacing: '2.2px' }}>
            {content.kicker}
          </p>
          <h2
            id="entry-product-name"
            className="mt-3 font-serif text-[24px] font-normal leading-[1.15] md:text-[30px]"
            style={{ color: 'var(--color-walnut)' }}
          >
            {content.name}
          </h2>
          <p className="mt-2 text-[15px] text-ink">{content.duration}</p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <div className="mt-6 space-y-4 text-[16px] leading-[1.65] text-ink">
            {content.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <blockquote
            className="mt-6 pl-[14px] text-[16px] leading-[1.65] text-ink"
            style={{ borderLeft: '2px solid var(--color-walnut)', borderRadius: 0 }}
          >
            {content.pullQuote}
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-8">
            <a
              href={mailto(content.enquiry)}
              className="inline-flex items-center justify-center text-[15px] font-semibold text-bone"
              style={{ backgroundColor: 'var(--color-walnut)', padding: '14px 30px', borderRadius: '40px' }}
            >
              {content.button}
            </a>
            <p className="mt-4 text-[13px] text-ink">{content.footnote}</p>
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
);
