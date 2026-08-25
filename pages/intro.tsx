import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';

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
 *
 * Craft rules (see the build brief, section 8): restrained, premium, editorial.
 * Gold is only ever a hairline, a dot or a glyph — never a fill. No second
 * accent colour, no card chrome, no parallax, no bouncy easing.
 */

/**
 * The 60-second hello. Fill both in to switch the film on: `embed` is the
 * unlisted Vimeo/YouTube player URL, `poster` an image in /public.
 *
 * While `embed` is null the slot renders a labelled placeholder so the page can
 * go out for review with the shape intact. Setting `embed` swaps the real
 * click-to-load player in and drops the placeholder automatically.
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

/** Eyebrow: 10px, 0.24em tracking, gold. The leading hairline tick from the
 *  craft brief was removed by the owner: the label stands on its own. */
const Eyebrow = ({ children }: { children: string }) => (
  <p className="intro-ey">{children}</p>
);

/** Placeholder for review: the real frame at the real size, with a static play
 *  mark. Deliberately not a button — no dead control to click. */
const FilmPlaceholder = () => (
  <div className="intro-frame">
    <Image src={FILM.poster} alt="" aria-hidden fill sizes="(max-width: 767px) 100vw, 760px" className="object-cover opacity-35" />
    <span aria-hidden className="intro-play" />
  </div>
);

/** Click-to-load façade: the poster paints immediately, the player loads only
 *  when asked, so a forwarded page stays light on a phone. */
const Film = () => {
  const [playing, setPlaying] = useState(false);
  if (!FILM.embed) return <FilmPlaceholder />;
  return (
    <div className="intro-frame">
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
        <button type="button" onClick={() => setPlaying(true)} aria-label="Play the 60-second hello" className="intro-playbtn">
          <Image src={FILM.poster} alt={FILM.alt} fill sizes="(max-width: 767px) 100vw, 760px" className="object-cover" />
          <span aria-hidden className="absolute inset-0 bg-charcoal/25 transition-colors" />
          <span aria-hidden className="intro-play" />
        </button>
      )}
    </div>
  );
};

export default function Intro() {
  // One IntersectionObserver for every [data-reveal]. The `.js` class on <html>
  // is what arms the hidden state, so with JavaScript off nothing is ever
  // hidden. The 1.6s failsafe reveals everything regardless, in case the
  // observer never fires — inside a non-scrolling preview pane or an embed.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const revealAll = () => nodes.forEach((n) => n.classList.add('is-in'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return () => root.classList.remove('js');
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    nodes.forEach((n) => io.observe(n));
    const failsafe = window.setTimeout(revealAll, 1600);

    return () => { io.disconnect(); window.clearTimeout(failsafe); root.classList.remove('js'); };
  }, []);

  return (
    <>
      <SeoMeta
        title="Darren Brett | DAB Hands"
        description="Fractional COO for digital-first agencies and growth-stage brands. Keeping important work moving."
        path="/intro"
        noindex
      />

      {/* Page-scoped craft. Kept here rather than in globals.css: this page is a
          self-contained artefact, and globals.css does not hot-reload. */}
      <style>{`
        .intro { --hair: color-mix(in srgb, var(--color-gold) 50%, transparent); }
        /* Bookends: a hair-thin gold rule top and bottom, like a letterpress card. */
        .intro-rule { height: 1px; background: var(--hair); }

        .intro-ey {
          font-family: var(--font-sans);
          font-size: 10px; font-weight: 600; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--color-gold);
          margin-bottom: 18px;
        }

        .intro-h1 {
          font-family: var(--font-serif);
          line-height: 1.05; letter-spacing: -0.02em;
        }
        .intro-tagline { font-family: var(--font-serif); font-style: italic; font-size: 20px; line-height: 1.35; }
        .intro-lead { font-size: 17px; line-height: 1.68; }
        .intro-body { font-size: 15px; line-height: 1.72; }
        .intro-h2 { font-family: var(--font-serif); font-size: 24px; font-weight: 400; line-height: 1.28; letter-spacing: -0.01em; }

        .intro-frame {
          position: relative; aspect-ratio: 16 / 9; overflow: hidden;
          border-radius: 12px; background: var(--color-charcoal);
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-ink) 10%, transparent);
        }
        .intro-playbtn { position: absolute; inset: 0; width: 100%; height: 100%; cursor: pointer; }
        .intro-play {
          position: absolute; left: 50%; top: 50%; width: 68px; height: 68px;
          transform: translate(-50%, -50%);
          border-radius: 999px; background: color-mix(in srgb, var(--color-bone) 92%, transparent);
          display: flex; align-items: center; justify-content: center;
          transition: transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s cubic-bezier(.4,0,.2,1);
        }
        .intro-play::after {
          content: ""; margin-left: 4px;
          border-style: solid; border-width: 11px 0 11px 18px;
          border-color: transparent transparent transparent var(--color-ink);
        }
        .intro-playbtn:hover .intro-play, .intro-playbtn:focus-visible .intro-play {
          transform: translate(-50%, -50%) scale(1.06);
          box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-gold) 32%, transparent);
        }

        /* Pull-quote: no left border. One oversized translucent gold glyph. */
        .intro-quote { position: relative; padding-left: 44px; }
        .intro-quote::before {
          content: "\\201C";
          position: absolute; left: -4px; top: -22px;
          font-family: var(--font-serif); font-size: 96px; line-height: 1;
          color: color-mix(in srgb, var(--color-gold) 30%, transparent);
        }
        .intro-attrib {
          font-family: var(--font-sans); font-size: 11px; font-weight: 600;
          letter-spacing: 0.13em; text-transform: uppercase; color: var(--color-graphite);
        }

        /* Gold links draw their underline in on hover. */
        .intro-link {
          color: var(--color-gold);
          background-image: linear-gradient(currentColor, currentColor);
          background-repeat: no-repeat; background-position: 0 100%; background-size: 0% 1px;
          transition: background-size .35s cubic-bezier(.4,0,.2,1);
        }
        .intro-link:hover, .intro-link:focus-visible { background-size: 100% 1px; }

        .intro a:focus-visible, .intro button:focus-visible {
          outline: 2px solid var(--color-gold); outline-offset: 3px; border-radius: 4px;
        }

        .intro-cta { transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s cubic-bezier(.4,0,.2,1); }
        .intro-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 18px -10px color-mix(in srgb, var(--color-ink) 55%, transparent); }

        /* Reveals arm only when JS is present, so nothing can be stranded. */
        html.js .intro [data-reveal] { opacity: 0; transform: translateY(12px); }
        html.js .intro [data-reveal].is-in {
          opacity: 1; transform: none;
          transition: opacity .8s cubic-bezier(.4,0,.2,1), transform .8s cubic-bezier(.4,0,.2,1);
        }
        @media (prefers-reduced-motion: reduce) {
          html.js .intro [data-reveal] { opacity: 1; transform: none; transition: none; }
          .intro-play, .intro-cta, .intro-link { transition: none; }
          .intro-cta:hover { transform: none; }
        }
      `}</style>

      <a href="#top" className="skip-link">Skip to content</a>

      <div className="intro bg-bone text-ink">
        <div className="intro-rule" aria-hidden />

        {/* Minimal chrome: the mark, and the name. No nav out. */}
        <header className="u-container flex h-[68px] items-center justify-between md:h-[76px]">
          <span className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} className="h-6 w-auto select-none md:h-7" />
            <span className="font-serif text-[21px] leading-none tracking-[-0.01em] md:text-[23px]">DAB Hands</span>
          </span>
          <span className="intro-body text-graphite">Darren Brett</span>
        </header>

        <main id="top">
          {/* ── Hero: louder than everything else, and given the most air. ── */}
          <section className="u-container pt-16 pb-11 md:pt-20 md:pb-12">
            <div className="max-w-[44rem]">
              <Eyebrow>Fractional COO · DAB Hands</Eyebrow>
              <h1 className="intro-h1 text-[40px] sm:text-[52px] md:text-[60px]">Keeping important work moving.</h1>
              <p className="intro-tagline mt-6 text-ink/80">Part delivery lead, part digital operator, all entrepreneur’s engine.</p>
            </div>
          </section>

          {/* ── The film ─────────────────────────────────────────────── */}
          <section className="u-container pb-12 md:pb-16">
            <div className="max-w-[44rem]" data-reveal>
              <Eyebrow>A 60-second hello</Eyebrow>
              <Film />

              {/*
                TEMPORARY — remove this whole <div class="intro-script"> block in one
                edit once the film is recorded and approved. It exists so early
                viewers can read and feed back on the script. Nothing else depends
                on it; deleting it leaves the frame as the live video.
              */}
              <div className="intro-script mt-7 border-t border-stone/60 pt-6">
                <Eyebrow>What the film says</Eyebrow>
                <p className="intro-body text-graphite">
                  “Hi, I’m Darren. Man and boy, I’ve been understanding how to make things go, and work better. I seem to be great at keeping lots of complex things in orbit and holding it all well. I bring both sides of the brain to work in equal measure, which makes me a great problem solver. I’m someone who can jump from functional and logical to visionary and conceptual in a moment. I’ve spent my working life at the point where ambition has to become reality. And the thing I keep seeing is this: organisations rarely lack good thinking, they struggle to preserve its impact on the way out, traded away in the systems and the misalignments people don’t manage. I’ve got an (un)healthy obsession with what it takes to elevate the digital work we put into the world, to make people feel something and act upon it. I believe we can cut through a lot of the noise when we help people feel first. If something important needs to land, and it isn’t, let’s talk. We can start small. Nobody has to bet on me without trying me first. A little of me goes a long way. I work to impact, not to burn hours. Let’s make things better, and make some progress and money. I’d love to hear from you.”
                </p>
              </div>
              {/* END TEMPORARY script block */}
            </div>
          </section>

          {/* ── Proposition ──────────────────────────────────────────── */}
          <section className="u-container border-t border-stone/60 py-[38px] md:py-11">
            <div className="max-w-[44rem]" data-reveal>
              <p className="intro-lead">
                <strong className="font-semibold text-ink">I’m Darren, a fractional COO for digital-first agencies and growth-stage brands.</strong>{' '}
                <span className="text-graphite">
                  I make sure important work actually delivers: I turn strategic direction into operating reality, then hold every moving part, in the delivery detail and in the boardroom, until the business gets there and the customer feels it.
                </span>
              </p>
            </div>
          </section>

          {/* ── What I turn ──────────────────────────────────────────── */}
          <section className="u-container border-t border-stone/60 py-9 md:py-10">
            <div className="max-w-[44rem]" data-reveal>
              <Eyebrow>What I turn</Eyebrow>
              <ul className="space-y-3.5">
                {TURNS.map((t) => <li key={t} className="intro-h2">{t}</li>)}
              </ul>
            </div>
          </section>

          {/* ── When leaders bring me in ─────────────────────────────── */}
          <section className="u-container border-t border-stone/60 py-9 md:py-10">
            <div className="max-w-[44rem]" data-reveal>
              <Eyebrow>When leaders bring me in</Eyebrow>
              <ul className="space-y-4">
                {SITUATIONS.map((sit) => (
                  <li key={sit} className="intro-body flex gap-3.5 text-graphite">
                    <span aria-hidden className="mt-[0.72em] h-px w-3.5 shrink-0 bg-gold" />
                    <span>{sit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Three things about me ────────────────────────────────── */}
          <section className="u-container border-t border-stone/60 py-9 md:py-10">
            <div className="max-w-[44rem]" data-reveal>
              <Eyebrow>Three things about me</Eyebrow>
              <ul className="space-y-4">
                {ABOUT.map((a) => (
                  <li key={a.lead} className="intro-body flex gap-3.5">
                    <span aria-hidden className="mt-[0.72em] h-px w-3.5 shrink-0 bg-gold" />
                    <span>
                      <strong className="font-semibold text-ink">{a.lead}</strong>{' '}
                      <span className="text-graphite">{a.rest}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Proof: the strip framed as a credential lockup, then the
                Neil Munn quote set as a print pull-quote. ───────────── */}
          <section className="border-t border-stone/60 py-9 md:py-10">
            <div className="u-container" data-reveal>
              <Eyebrow>Trusted where the stakes are high</Eyebrow>
            </div>
            <div data-reveal>
              <div className="intro-rule opacity-70" aria-hidden />
              <div className="py-6"><LogoTicker ariaLabel="Brands I’ve worked with" compact /></div>
              <div className="intro-rule opacity-70" aria-hidden />
            </div>
            <div className="u-container">
              <figure className="intro-quote mt-11 max-w-[44rem] md:mt-12" data-reveal>
                <blockquote className="font-serif text-[19px] italic leading-[1.5] md:text-[21px]">
                  Darren has a brilliant ability to operationalise strategy. He quickly grasps the intent behind an idea, then builds the practical ways of working that allow an organisation to deliver on it.
                </blockquote>
                <figcaption className="intro-attrib mt-5">Neil Munn, Former Global CEO, BBH</figcaption>
              </figure>
            </div>
          </section>

          {/* ── How we start ─────────────────────────────────────────── */}
          <section className="u-container border-t border-stone/60 py-9 md:py-10">
            <div className="max-w-[44rem]" data-reveal>
              <Eyebrow>How we start</Eyebrow>
              <p className="intro-body text-graphite">
                Built around the work, not the headcount. I stay accountable end to end, and bring in trusted senior specialists only when the work demands it. We can start small, a paid diagnostic or a fortnight of troubleshooting, so nobody has to bet on me without trying first.
              </p>
            </div>
          </section>

          {/* ── Close: given the air the hero gets. ──────────────────── */}
          <section className="u-container border-t border-stone/60 py-16 text-center md:py-20">
            <div data-reveal>
              <h2 className="intro-h1 mx-auto max-w-[18ch] text-[30px] md:text-[38px]">When important work needs to land, let’s talk.</h2>
              <a
                href="mailto:darren@dabhands.delivery?subject=Keeping%20important%20work%20moving"
                className="intro-cta mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-bone md:mt-9"
              >
                Start a conversation
                <span aria-hidden>→</span>
              </a>
            </div>
          </section>
        </main>

        <footer className="u-container border-t border-stone/60 py-9 text-center">
          <p className="intro-body text-graphite">DAB Hands · Darren Brett · dabhands.delivery</p>
          <div className="intro-rule mx-auto mt-5 w-16" aria-hidden />
        </footer>
      </div>
    </>
  );
}
