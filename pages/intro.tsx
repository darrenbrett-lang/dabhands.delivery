import { useState } from 'react';
import Image from 'next/image';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';
import { FadeUp } from '@/components/FadeUp';

/**
 * /intro — the forwardable "here's Darren" page.
 *
 * Unlisted: noindex meta via SeoMeta, an X-Robots-Tag route header in
 * next.config.ts carrying noarchive too, and deliberately absent from the nav,
 * sitemap.xml and llms.txt. The route resolves so the link can be shared, but
 * nothing on the site points at it.
 *
 * It carries its own minimal chrome rather than the site Layout: a forwarded
 * reader should stay on the page they were sent, with no nav to wander into.
 */

/**
 * The 60-second hello. Fill both in to switch the film on: `embed` is the
 * unlisted Vimeo/YouTube player URL, `poster` an image in /public.
 *
 * While `embed` is null the section is omitted entirely rather than shipping a
 * dead frame onto a page whose whole job is to be forwarded.
 */
const FILM: { embed: string | null; poster: string; alt: string } = {
  embed: null,
  poster: '/images/darren-brett_colour_headshot.jpeg',
  alt: 'Darren Brett',
};

const TURNS = [
  'Strategic direction into operating reality.',
  'System complexity into coordinated flow.',
  'Important work into real results.',
];

const SITUATIONS = [
  'A critical programme needs experienced leadership to keep it moving.',
  'Growth has outpaced the operating model and the business no longer moves together.',
  'Multiple partners need to work as one team around a single outcome.',
  'Or it’s the machine itself: how work moves from pitch to delivery, where the margin goes, why good thinking arrives weaker than it left.',
];

const ABOUT = [
  { lead: 'A delivery leader.', rest: 'Depth in complex, multi-track delivery built over twenty years.' },
  { lead: 'A digital operator.', rest: 'I hold my own with strategy, creative and technology, and make the work better.' },
  { lead: 'An entrepreneur’s engine.', rest: 'I’ve carried my own P&L, spotted opportunities and turned them into revenue.' },
];

/** Small gold eyebrow above every module, matching the site's rhythm. */
const Eyebrow = ({ children }: { children: string }) => (
  <p className="eyebrow text-gold mb-5">{children}</p>
);

/** Click-to-load façade: the poster paints immediately, the player only loads
 *  when asked, so a forwarded page stays light on a phone. */
const Film = () => {
  const [playing, setPlaying] = useState(false);
  if (!FILM.embed) return null;
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-inset ring-ink/10 bg-charcoal">
      {playing ? (
        <iframe
          src={`${FILM.embed}${FILM.embed.includes('?') ? '&' : '?'}autoplay=1`}
          title="A 60-second hello from Darren Brett"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play the 60-second hello"
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={FILM.poster}
            alt={FILM.alt}
            fill
            sizes="(max-width: 767px) 100vw, 760px"
            className="object-cover"
          />
          <span aria-hidden className="absolute inset-0 bg-charcoal/25 transition-colors group-hover:bg-charcoal/15" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone/95 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <span className="ml-1 block h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-ink" />
          </span>
        </button>
      )}
    </div>
  );
};

export default function Intro() {
  return (
    <>
      <SeoMeta
        title="Darren Brett | DAB Hands"
        description="Fractional COO for digital-first agencies and growth-stage brands. Keeping important work moving."
        path="/intro"
        noindex
      />

      <a href="#top" className="skip-link">Skip to content</a>

      {/* Minimal chrome: the mark, and the name. No nav out. */}
      <header className="bg-bone">
        <div className="u-container flex h-20 items-center justify-between md:h-24">
          <span className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} className="h-6 w-auto select-none md:h-7" />
            <span className="font-serif text-[22px] leading-none tracking-[-0.01em] text-ink md:text-[24px]">DAB Hands</span>
          </span>
          <span className="text-[14px] tracking-[-0.01em] text-graphite">Darren Brett</span>
        </div>
      </header>

      <main id="top" className="bg-bone text-ink">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="u-container pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="max-w-[46rem]">
            <Eyebrow>Fractional COO · DAB Hands</Eyebrow>
            <h1 className="font-serif text-[40px] leading-[1.05] tracking-[-0.01em] sm:text-[52px] md:text-[64px]">
              Keeping important work moving.
            </h1>
            <p className="mt-6 font-serif text-[22px] italic leading-[1.3] text-ink/80 md:mt-7 md:text-[26px]">
              Part delivery lead, part digital operator, all entrepreneur’s engine.
            </p>
          </div>
        </section>

        {/* ── The film: the first thing a forwarded viewer engages with.
              The script is spoken, never printed on the page. ─────── */}
        {FILM.embed && (
          <section className="u-container pb-14 md:pb-20">
            <div className="max-w-[46rem]">
              <Eyebrow>A 60-second hello</Eyebrow>
              <Film />
            </div>
          </section>
        )}

        {/* ── Proposition ────────────────────────────────────────── */}
        <section className="u-container border-t border-stone/60 py-14 md:py-20">
          <div className="max-w-[46rem]">
            <p className="text-lg leading-relaxed text-ink md:text-xl">
              <strong className="font-semibold">I’m Darren, a fractional COO for digital-first agencies and growth-stage brands.</strong>{' '}
              <span className="text-graphite">
                I make sure important work actually delivers: I turn strategic direction into operating reality, then hold every moving part, in the delivery detail and in the boardroom, until the business gets there and the customer feels it.
              </span>
            </p>
          </div>
        </section>

        {/* ── What I turn ────────────────────────────────────────── */}
        <section className="u-container border-t border-stone/60 py-14 md:py-20">
          <FadeUp className="max-w-[46rem]">
            <Eyebrow>What I turn</Eyebrow>
            <ul className="space-y-4">
              {TURNS.map((t) => (
                <li key={t} className="font-serif text-[24px] leading-[1.25] tracking-[-0.01em] md:text-[30px]">
                  {t}
                </li>
              ))}
            </ul>
          </FadeUp>
        </section>

        {/* ── When leaders bring me in ───────────────────────────── */}
        <section className="u-container border-t border-stone/60 py-14 md:py-20">
          <FadeUp className="max-w-[46rem]">
            <Eyebrow>When leaders bring me in</Eyebrow>
            <ul className="space-y-5">
              {SITUATIONS.map((sit) => (
                <li key={sit} className="flex gap-4 text-lg leading-relaxed text-graphite md:text-xl">
                  <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-gold" />
                  <span>{sit}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </section>

        {/* ── Three things about me ─────────────────────────────── */}
        <section className="u-container border-t border-stone/60 py-14 md:py-20">
          <FadeUp className="max-w-[46rem]">
            <Eyebrow>Three things about me</Eyebrow>
            <ul className="space-y-5">
              {ABOUT.map((a) => (
                <li key={a.lead} className="flex gap-4 text-lg leading-relaxed md:text-xl">
                  <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-gold" />
                  <span>
                    <strong className="font-semibold text-ink">{a.lead}</strong>{' '}
                    <span className="text-graphite">{a.rest}</span>
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </section>

        {/* ── Proof ─────────────────────────────────────────────── */}
        <section className="border-t border-stone/60 py-14 md:py-20">
          <div className="u-container">
            <FadeUp>
              <Eyebrow>Trusted where the stakes are high</Eyebrow>
            </FadeUp>
          </div>
          <FadeUp>
            <LogoTicker ariaLabel="Brands I’ve worked with" compact />
          </FadeUp>
          <div className="u-container">
            <FadeUp>
              <figure className="mt-12 max-w-[46rem] md:mt-16">
                <blockquote className="font-serif text-[22px] leading-[1.3] tracking-[-0.01em] md:text-[28px]">
                  “Darren has a brilliant ability to operationalise strategy. He quickly grasps the intent behind an idea, then builds the practical ways of working that allow an organisation to deliver on it.”
                </blockquote>
                <figcaption className="mt-5 text-[15px] text-graphite">
                  Neil Munn, Former Global CEO, BBH
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>

        {/* ── How we start ──────────────────────────────────────── */}
        <section className="u-container border-t border-stone/60 py-14 md:py-20">
          <FadeUp className="max-w-[46rem]">
            <Eyebrow>How we start</Eyebrow>
            <p className="text-lg leading-relaxed text-graphite md:text-xl">
              Built around the work, not the headcount. I stay accountable end to end, and bring in trusted senior specialists only when the work demands it. We can start small, a paid diagnostic or a fortnight of troubleshooting, so nobody has to bet on me without trying first.
            </p>
          </FadeUp>
        </section>

        {/* ── Close ─────────────────────────────────────────────── */}
        <section className="u-container border-t border-stone/60 py-16 text-center md:py-24">
          <FadeUp>
            <h2 className="mx-auto max-w-[20ch] font-serif text-[32px] leading-[1.1] tracking-[-0.01em] md:text-[46px]">
              When important work needs to land, let’s talk.
            </h2>
            <a
              href="mailto:darren@dabhands.delivery?subject=Keeping%20important%20work%20moving"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-bone transition-opacity hover:opacity-90 md:mt-10"
            >
              Start a conversation
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">→</span>
            </a>
          </FadeUp>
        </section>
      </main>

      <footer className="bg-bone">
        <div className="u-container border-t border-stone/60 py-8">
          <p className="text-[13px] tracking-[0.02em] text-graphite">
            DAB Hands · Darren Brett · dabhands.delivery
          </p>
        </div>
      </footer>
    </>
  );
}
