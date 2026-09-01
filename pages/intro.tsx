import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';
import { Footer } from '@/components/Footer';
import { FilmPlayer } from '@/components/FilmPlayer';
import { PathwayPicker } from '@/components/PathwayPicker';

/**
 * /intro — the forwardable "here's Darren" page.
 *
 * Unlisted: noindex meta via SeoMeta, an X-Robots-Tag route header in
 * next.config.ts carrying noarchive, and deliberately absent from the nav,
 * sitemap.xml and llms.txt.
 *
 * Design direction, 25 Aug (reference: Intro_Page_v3.html in the war room).
 * The idea is composure, not persuasion: the page is forwarded by someone who
 * has already vouched for Darren, so it confirms rather than sells. Composure
 * comes from three things only — contrast of surface, a wide type scale used
 * deliberately, and space placed around things rather than instead of them.
 *
 * The surface order IS the design. Do not reorder, and never let two dark
 * bands touch:
 *   cream (nav, hero) → charcoal (the film, the anchor) → cream (lede,
 *   three sections) → paper (logos) → cream (testimonial) → image →
 *   clay (how we start, the one offer) → cream (close)
 */

/**
 * The film, a quick hello. Fill both in to switch the film on: `embed` is the
 * unlisted Vimeo/YouTube player URL, `poster` an image in /public.
 *
 * While `embed` is null the panel shows the portrait and "Film to follow." When
 * the film exists it replaces the portrait in the same frame, with the same
 * vignette and a play control in blue, never gold.
 */
/* The film. `src` is a self-hosted H.264 MP4 on object storage behind a CDN —
   deliberately not YouTube or Vimeo, so the film stays owned: no third-party
   player, no branding, no recommendations, no tracking. Set `src` and the panel
   switches from the portrait to the player; leave it null and the page reads
   "Film to follow." exactly as it does today.
   `captions` is a WebVTT file. Drop it to null and the player hides its CC
   button entirely rather than offering an empty track. */
const FILM: {
  src: string | null;
  poster: string;
  alt: string;
  captions: string | null;
  /* A portrait CUT for phones, not the landscape film cropped. Leave null and
     phones get the landscape cut at 16:9, which is correct but small. */
  portraitSrc: string | null;
  portraitPoster: string | null;
} = {
  src: 'https://uuirqhndrdzr472x.public.blob.vercel-storage.com/darren-hello-hd.mp4',
  /* Cut from Darren_Ben.jpg (6000x4000) to each shape rather than letting CSS
     crop a single file: at 16:9 a centred crop puts the eyeline about a third
     down, and at 9:16 he is already centred so the sides crop away cleanly. */
  poster: '/images/darren-ben-16x9-1.jpg',
  alt: 'Darren Brett',
  captions: '/captions/intro-en.vtt',
  portraitSrc: 'https://uuirqhndrdzr472x.public.blob.vercel-storage.com/darren-hello-vertical.mp4',
  portraitPoster: '/images/darren-ben-9x16-3.jpg',
};

const TURNS = [
  { from: 'Strategic direction', to: 'operating reality.', note: 'The plan becomes work that adds up to growth, and you can measure whether it’s working while it moves.' },
  { from: 'System complexity', to: 'coordinated flow.', note: 'The parts that depend on each other move together, without losing time or intent on the way.' },
  { from: 'Important work', to: 'real results.', note: 'What reaches the customer is what you decided to make or build, and it returns what you expected of it.' },
];

// Trimmed to an even measure (78 to 81 characters) so the four columns set to
// the same depth.
/* prefers-reduced-motion, SSR-safe: the server snapshot is false, so the
   markup renders the moving version and the client corrects it rather than
   mismatching hydration. */
const subscribeMotion = (cb: () => void) => {
  const m = window.matchMedia('(prefers-reduced-motion: reduce)');
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );

const ROLL_EVERY = 6000; // how long a face is held before it turns

/**
 * The turns as a tumbler: one block that rolls towards the reader on its
 * horizontal axis, each turn arriving from behind the last. Two faces are
 * enough — the far one is re-dressed with the next turn while it is out of
 * sight, so it reads as an endless solid rather than a two-sided card.
 *
 * A hidden sizer holds all three turns in a single grid cell, so the block is
 * always as tall as the longest of them and the roll never changes height.
 *
 * The tumbler is aria-hidden and the three turns are also rendered flat for
 * screen readers, because a rotating block is a visual device, not content.
 */
const Tumbler = () => {
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false); // hover/focus holds the current face
  /* ⚠ The two faces hold their own content, and ONLY the face that is turning
     away from the reader is ever re-dressed. Deriving both faces from `step`
     looks tidier and is wrong: on each advance the outgoing face is still in
     full view for the length of the roll, so re-dressing it flashes the next
     turn's words before the block has moved. */
  const [faces, setFaces] = useState<[typeof TURNS[number], typeof TURNS[number]]>([TURNS[0], TURNS[1]]);
  const stepRef = useRef(0);
  const reduce = useReducedMotion();

  /* Advance to the next step, or forward to a chosen turn. The incoming face
     is dressed in the same commit as the transform changes — it is facing away
     at that moment, so the change cannot be seen. */
  const advance = useCallback((toIndex?: number) => {
    let next = stepRef.current + 1;
    if (toIndex !== undefined) while (next % TURNS.length !== toIndex) next += 1;
    stepRef.current = next;
    setFaces((f) => {
      const dressed: [typeof TURNS[number], typeof TURNS[number]] = [f[0], f[1]];
      dressed[next % 2] = TURNS[next % TURNS.length];
      return dressed;
    });
    setStep(next);
  }, []);

  /* `step` is in the deps so the dwell restarts on EVERY advance, including a
     manual one from the pips. Without it the interval keeps its original
     rhythm, so choosing a turn could show it for a moment before the timer
     fired and rolled it away. */
  useEffect(() => {
    if (held || reduce) return;
    const t = window.setInterval(() => advance(), ROLL_EVERY);
    return () => window.clearInterval(t);
  }, [held, reduce, advance, step]);

  /* Pips jump FORWARD to the next occurrence of the chosen turn, never
     backwards: the block only ever rolls one way, so a jump reads as the
     tumbler hurrying on rather than reversing. */
  const goTo = (i: number) => advance(i);

  const body = (t: (typeof TURNS)[number]) => (
    <div className="turn">
      <h3>
        {t.from}
        <br />
        <em className="into">into</em> <span className="to">{t.to}</span>
      </h3>
      <p className="note">{t.note}</p>
    </div>
  );

  if (reduce) {
    // No rolling: the turns simply sit one under another, all readable at once.
    return (
      <div className="i-turns i-turns-flat" data-r>
        {TURNS.map((t) => (
          <div className="turn" key={t.from}>
            <h3>
              {t.from}
              <br />
              <em className="into">into</em> <span className="to">{t.to}</span>
            </h3>
            <p className="note">{t.note}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="i-tumbwrap" data-r>
      <div className="i-tumb-pips" aria-label="Which turn is showing">
        {TURNS.map((t, i) => (
          <button
            key={t.from}
            type="button"
            onClick={() => goTo(i)}
            aria-current={i === step % TURNS.length}
            aria-label={`Show: ${t.from} into ${t.to}`}
          />
        ))}
      </div>
      <div
        className="i-tumb"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        aria-hidden
      >
        {/* sets the height to the tallest turn, so the roll never jumps */}
        <div className="i-tumb-sizer">{TURNS.map((t) => <div key={t.from}>{body(t)}</div>)}</div>
        <div className="i-tumb-box" style={{ transform: `rotateX(${step * -180}deg)` }}>
          <div className="i-tumb-face">{body(faces[0])}</div>
          <div className="i-tumb-face i-tumb-back">{body(faces[1])}</div>
        </div>
      </div>
      <div className="sr-only">
        {TURNS.map((t) => (
          <p key={t.from}>{t.from} into {t.to} {t.note}</p>
        ))}
      </div>
    </div>
  );
};

const SITUATIONS = [
  'A critical programme has slipped and nobody can give a straight answer on where it stands.',
  'Growth has outpaced the operating model and the business no longer moves together.',
  'Several partners and agencies need to work as one team, and nobody is holding it together.',
  'Nobody can say where the margin goes, or why good work arrives weaker than it left.',
  'Something has been won that’s bigger than anything the business has run before.',
  'A permanent hire hasn’t happened and someone at the top is doing the job instead.',
  'Too much still depends on one or two people, and they can’t step away from it.',
  'An acquisition or investment has landed, and there’s a value plan to hit.',
];

// Trimmed to an even measure (72 to 74 characters) so the three panels set to
// the same depth.

const ABOUT = [
  { lead: 'A delivery leader.', rest: 'Twenty years of depth in complex, multi-track delivery that had to land.' },
  { lead: 'A digital operator.', rest: 'I hold my own with strategy, creative and technology, and make work better.' },
  { lead: 'An entrepreneur’s engine.', rest: 'I’ve carried my own P&L, found opportunities and turned them into revenue.' },
];

const QUOTES = [
  {
    quote: 'Darren has a brilliant ability to operationalise strategy. He quickly grasps the intent behind an idea, then builds the practical ways of working that allow an organisation to deliver on it.',
    name: 'Neil Munn',
    role: 'Former Global CEO, BBH',
  },
  {
    quote: 'We had spent most of the budget and nobody could tell us what finishing would cost. Six weeks after Darren arrived we had a number we trusted, and the decision we made off the back of it was worth more than the whole engagement.',
    name: 'Dave Wallace',
    role: 'Former Global COO, Mirum',
  },
  {
    quote: 'He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.',
    name: 'Anthony Mahon',
    role: 'Former Global Membership Director, HUGO BOSS',
  },
];

const Kicker = ({ children }: { children: string }) => <p className="i-kick">{children}</p>;

/** Shared carousel behaviour: auto-advance that pauses on hover, on keyboard
 *  focus and while a finger is down, plus swipe. Never auto-advances under
 *  prefers-reduced-motion — the pips still work as navigation. */
function useCarousel(count: number, interval: number) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (held) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(t);
  }, [held, count, interval]);

  const handlers = {
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocusCapture: () => setHeld(true),
    onBlurCapture: () => setHeld(false),
    onTouchStart: (e: React.TouchEvent) => { setHeld(true); touchX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      const startX = touchX.current;
      touchX.current = null;
      setHeld(false);
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      if (Math.abs(endX - startX) < 44) return;
      setIndex((i) => (endX < startX ? (i + 1) % count : (i - 1 + count) % count));
    },
  };

  return { index, setIndex, handlers };
}

export default function Intro() {

  const reasons = useCarousel(SITUATIONS.length, 5200);
  // Quotes get longer than the reasons, so they hold a little longer.
  const quotes = useCarousel(QUOTES.length, 6800);

  // One IntersectionObserver for every [data-r]. The `.js` class on <html> arms
  // the hidden state, so with JavaScript off nothing is ever hidden.
  //
  // ⚠ The failsafe reveals only what is ALREADY ON SCREEN, never the whole
  // page. It used to add `in` to every [data-r] on a flat 1.6s timer, so
  // unless you scrolled within 1.6s of load — nobody does — everything below
  // the fold was revealed before you reached it and the page read as static.
  // Note that every [data-r] on this page starts below the fold, so "has the
  // observer fired yet" cannot tell a dead observer from a page nobody has
  // scrolled: catching up on what is in view is the test that works for both.
  // In a non-scrolling preview pane or an embed the viewport is the whole
  // document, so everything is in view and everything still reveals, which is
  // the case the net was written for. A dead observer also gets a scroll
  // listener, so the page can never strand content at zero opacity.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-r]'));
    const revealAll = () =>
      document.querySelectorAll<HTMLElement>('[data-r]').forEach((n) => n.classList.add('in'));
    /* Reveal anything whose top has reached the bottom of the viewport, and
       leave everything further down to the observer. */
    const catchUp = () =>
      document.querySelectorAll<HTMLElement>('[data-r]').forEach((n) => {
        if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add('in');
      });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return () => root.classList.remove('js');
    }
    let observed = false;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { observed = true; e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.04 },
    );
    nodes.forEach((n) => io.observe(n));
    const failsafe = window.setTimeout(() => {
      catchUp();
      // Nothing at all reported, and something above the fold should have:
      // treat the observer as dead and drive the reveals off scroll instead.
      if (!observed) window.addEventListener('scroll', catchUp, { passive: true });
    }, 1600);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener('scroll', catchUp);
      root.classList.remove('js');
    };
  }, []);

  return (
    <>
      {/* Link preview. og-intro-2.jpg is cut from the studio portrait to
          1200x630 — a crop, not the old padded card, which showed grey bars
          either side where the padding met the photograph. Versioned filename
          because the social platforms cache these hard and will not re-fetch
          the same name. */}
      <SeoMeta
        title="An introduction to Darren Brett, fractional COO and digital operator"
        description="Keeping important work moving. Darren Brett · Fractional COO &amp; Digital Operator."
        path="/intro"
        image="/og-intro-2.jpg"
        noindex
      />

      {/* Page-scoped. This page has its own palette and type scale, deliberately
          separate from the site's tokens, and globals.css does not hot-reload. */}
      <style>{`
        .i {
          --cream:#F5F1EA; --paper:#FBF9F4; --clay:#A49786;
          --blue:#1B2C3F; --charcoal:#26282B;
          --ink:#1A1A1A; --gold:#BA9956; --gold-lt:#C9A96B;
          --stone:#6E6A62; --line:#DCD5C8;
          background-color:var(--cream); color:var(--ink);
          font-size:17px; line-height:1.62;
        }
        .i-herowrap {
          background-image:linear-gradient(to bottom, color-mix(in srgb, var(--color-clay) 42%, transparent), color-mix(in srgb, var(--color-clay) 20%, transparent) 55%, transparent 100%);
        }
        .i-in { max-width:1180px; margin:0 auto; padding:0 44px; }


        /* Gold is only ever a kicker or the quote mark. Never a fill, never a
           button, never a rule longer than three pixels. */
        .i-kick { font-size:11px; letter-spacing:2.8px; font-weight:600; color:var(--gold); text-transform:uppercase; }

        /* The lockup carries the page on its own now the masthead is gone. It
           keeps the header's proportions (crown 22 : gap 10 : serif 21) scaled
           up to the hero crown, so the wordmark grows with the crown rather
           than being sized by eye. */
        .i-hero .lockup { display:flex; align-items:center; justify-content:center; gap:27px; margin:0 auto 30px; }
        .i-hero .wordmark { font-family:var(--font-serif); font-size:57px; line-height:1; letter-spacing:-.01em; color:var(--charcoal); }

        /* The hero fills the fold, with the charcoal band showing at the bottom
           edge. Space is placed around the headline, never left below it. */
        .i-hero { padding:64px 0 76px; display:flex; flex-direction:column; justify-content:center; min-height:calc(100svh - 188px); text-align:center; }
        .i-hero .crown { display:block; height:60px; width:auto; user-select:none; }
        .i-hero h1 { font-family:var(--font-serif); font-weight:400; font-size:96px; line-height:.94; letter-spacing:-3px; margin:0 auto 30px; max-width:15ch; }
        /* One line on desktop; the measure only applies once it has to wrap. */
        .i-hero .sub { font-family:var(--font-sans); font-size:21px; line-height:1.5; color:var(--blue); max-width:44ch; margin:0 auto; }
        @media (min-width:901px) { .i-hero .sub { max-width:none; white-space:nowrap; } }

        /* The film: the darkest thing on the page and its visual anchor. */
        .i-film { background:var(--charcoal); color:#E6E4E0; }
        .i-filmgrid { display:grid; grid-template-columns:.85fr 1.15fr; align-items:stretch; max-width:1180px; margin:0 auto; }
        .i-filmwrap { position:relative; overflow:hidden; min-height:440px; }
        .i-filmwrap img { object-fit:cover; object-position:center 42%; }
        /* The vignette dissolves the portrait into the panel: a radial darkening
           from 34% out, plus a linear fade to full charcoal at the right edge.
           There must be no visible boundary between photograph and panel. */
        .i-filmwrap::after {
          content:""; position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(120% 95% at 42% 32%, rgba(38,40,43,0) 34%, rgba(38,40,43,.42) 72%, rgba(38,40,43,.88) 100%),
            linear-gradient(90deg, rgba(38,40,43,0) 58%, rgba(38,40,43,.55) 88%, rgba(38,40,43,1) 100%);
        }
        .i-filmtxt { padding:64px 56px; display:flex; flex-direction:column; justify-content:center; }
        .i-filmtxt .i-kick { color:var(--gold-lt); }
        .i-filmtxt .ph { font-family:var(--font-serif); font-size:46px; line-height:1.08; color:#fff; margin:18px 0 0; }
        /* The film's own stage, used only once there is a film. */
        .i-filmstage { max-width:1180px; margin:0 auto; padding:64px 44px 72px; }
        .i-filmhead { margin-bottom:30px; }
        .i-filmhead .i-kick { color:var(--gold-lt); }
        .i-filmhead .ph { font-family:var(--font-serif); font-size:46px; line-height:1.08; color:var(--cream); margin:18px 0 0; }
        @media (max-width:900px) {
          .i-filmstage { padding:44px 22px 50px; }
          .i-filmhead { margin-bottom:22px; }
          .i-filmhead .ph { font-size:30px; }
        }


        .i-lede { padding:74px 0 84px; }
        .i-lede .name {
          font-family:var(--font-serif); font-weight:400; font-size:56px; line-height:1.06;
          letter-spacing:-1.6px; color:var(--blue); max-width:1000px;
          /* The longer lede ran three lines with only two words on the last.
             Balanced, the three set to an even measure instead. */
          text-wrap:balance;
        }
        .i-lede .then { font-family:var(--font-sans); font-size:22px; line-height:1.58; color:#3F312D; max-width:820px; margin-top:30px; }

        /* Lists become grids, each cell with a hairline above, so the page
           stops being a single ribbon. */
        .i-sec { padding:74px 0; border-top:1px solid var(--line); }
        /* The dividers are the page ground showing through the grid gaps, so the
           three panels read as separate objects with no drawn rule at all. */
        .i-c3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:34px; }
        .i-c3 .c { background:var(--paper); border-left:4px solid var(--gold); padding:34px 28px 38px; }
        .i-c3 .lab, .i-c3 p { color:var(--ink); }
        /* ── the tumbler ──────────────────────────────────────────────
           One block rolling towards the reader on its horizontal axis. Two
           faces are enough: the far one is re-dressed while it is out of
           sight, so it reads as an endless solid rather than a card flipping
           back and forth.

           The perspective is deliberately long (1600px). Short perspective
           gives a fairground spin; long keeps the block calm and makes the
           near edge only just larger than the far one, which is what reads as
           weight rather than trickery. */
        .i-tumbwrap { margin-top:38px; display:flex; align-items:center; gap:20px; position:relative; }
        .i-tumb { flex:1 1 auto; }
        /* From the wide breakpoint the pips hang OUTSIDE the measure, in the
           page gutter, so the turn's headline starts on the same left edge as
           the kicker above it and the payoff below. The gutter is 44px here,
           so -38px keeps them inside the page. Narrower than that there is no
           gutter to hang into, and they sit inline instead. */
        @media (min-width:901px) {
          .i-tumbwrap { display:block; }
          /* ⚠ Centred with flex, NOT translateY(-50%). The reveal puts an
             i-rise animation, with fill mode both, on every direct child of a
             revealed [data-r], and its end state is transform:none — which
             silently wipes a transform used for centring. Anything positioned
             inside a [data-r] has to centre without transforms.
             (No backticks in this block: the whole style tag is a template
             literal, and one would end the string and break the build.) */
          .i-tumb-pips {
            position:absolute; left:-38px; top:0; bottom:0;
            justify-content:center;
          }
        }
        /* The carousel pips, stood upright beside the block: same 12px dot,
           same elongation on the active one, but growing in height rather
           than width. Deep gold, because this sits on cream. */
        .i-tumb-pips { display:flex; flex-direction:column; align-items:center; gap:14px; flex:none; }
        .i-tumb-pips button {
          /* 6px of visible pip, but the padding keeps the tap target a usable
             24px wide; background-clip stops the padding taking the colour. */
          /* content-box on purpose: the global border-box would let the 9px
             padding swallow the 6px width entirely and paint nothing. */
          box-sizing:content-box;
          width:6px; height:14px; padding:0 9px; background-clip:content-box;
          border-radius:999px; cursor:pointer;
          background-color:color-mix(in srgb, var(--gold) 30%, transparent);
          transition:height .35s cubic-bezier(.4,0,.2,1), background-color .35s ease;
        }
        .i-tumb-pips button:hover { background-color:color-mix(in srgb, var(--gold) 62%, transparent); }
        .i-tumb-pips button[aria-current="true"] { height:46px; background-color:var(--gold); }
        .i-tumb-pips button:focus-visible { outline:2px solid var(--gold); outline-offset:4px; }
        @media (prefers-reduced-motion: reduce) { .i-tumb-pips button { transition:none; } }
        .i-tumb { position:relative; perspective:1600px; perspective-origin:50% 42%; }
        /* All three stacked in one grid cell: the block is always as tall as
           the longest turn, so the roll never changes the page height. */
        .i-tumb-sizer { display:grid; visibility:hidden; pointer-events:none; }
        .i-tumb-sizer > * { grid-area:1/1; }
        .i-tumb-box {
          position:absolute; inset:0; transform-style:preserve-3d;
          /* Weighted easing: it leaves slowly, carries through the middle and
             settles without a bounce. A symmetrical ease reads as a card; this
             reads as something with mass. */
          transition:transform 1.15s cubic-bezier(.76,0,.14,1);
        }
        .i-tumb-face {
          position:absolute; inset:0;
          backface-visibility:hidden; -webkit-backface-visibility:hidden;
        }
        .i-tumb-back { transform:rotateX(180deg); }
        /* The turns sit flat inside a face, so the shared .turn typography is
           reused unchanged and the grid columns still apply. */
        .i-tumb-face .turn, .i-tumb-sizer .turn { margin:0; }

        .i-turns { margin-top:38px; display:grid; gap:52px; }
        /* reduced motion: no roll, the three simply stack and all read at once */
        .i-turns-flat { margin-top:38px; }
        .i-turns .turn, .i-tumb .turn { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr); gap:0 64px; align-items:end; }
        .i-turns h3, .i-tumb h3 { font-family:var(--font-serif); font-weight:400; font-size:56px; line-height:1.08; letter-spacing:-1.6px; }
        .i-turns .into, .i-tumb .into { font-style:italic; }
        .i-turns .to, .i-tumb .to { color:var(--gold); }
        .i-turns .note, .i-tumb .note { font-family:var(--font-sans); font-size:17px; line-height:1.62; color:#3F312D; max-width:40ch; padding-bottom:.34em; }
        /* The payoff: what the three turns add up to. Serif italic, sized
           between the notes and the statements so it closes the section
           without competing with them. */
        .i-payoff { margin-top:54px; font-family:var(--font-serif); font-style:italic; font-size:30px; line-height:1.34; letter-spacing:-.4px; max-width:52ch; }
        /* Matched to the lede: heading at the serif statement size, body in the
           Manrope register beneath it. */
        /* 42px, not the lede's 56px: "An entrepreneur's engine." needs 447px at
           56 and the column is 335, so 56 forced it onto two lines while the
           other two sat on one. All three stay the same size. */
        .i-c3 .lab { font-family:var(--font-serif); font-size:34px; line-height:1.1; letter-spacing:-1px; margin-bottom:18px; }
        .i-c3 p { font-family:var(--font-sans); font-size:19px; line-height:1.58; color:#3F312D; }
        .i-when { background:var(--blue); color:#E6E4E0; padding:78px 0; }
        .i-when .i-kick { color:var(--gold-lt); }
        /* The stage is a plain grid with JavaScript off, so all four stack and
           nothing is hidden. With JS the slides share one cell: the height is
           always the tallest slide, so the band never jumps as it rotates. */
        .i-stage { display:grid; margin-top:34px; gap:30px; }
        html.js .i-stage { grid-template-areas:"s"; gap:0; min-height:5.4em; }
        html.js .i-stage .slide { grid-area:s; opacity:0; pointer-events:none; transition:opacity .9s ease; }
        html.js .i-stage .slide.on { opacity:1; pointer-events:auto; }
        /* Full container width, so each statement holds two lines at this size.
           At 22ch they ran to three and four and the band grew tall. */
        .i-stage .slide { font-size:48px; line-height:1.22; letter-spacing:-.8px; }

        .i-bips { display:flex; align-items:center; gap:14px; margin-top:46px; }
        .i-bips button {
          height:12px; width:12px; border-radius:999px; cursor:pointer;
          background:color-mix(in srgb, var(--gold-lt) 30%, transparent);
          transition:width .35s cubic-bezier(.4,0,.2,1), background-color .35s ease;
        }
        .i-bips button:hover { background:color-mix(in srgb, var(--gold-lt) 62%, transparent); }
        .i-bips button[aria-current="true"] { width:42px; background:var(--gold-lt); }

        @media (prefers-reduced-motion: reduce) {
          html.js .i-stage .slide { transition:none; }
          .i-bips button { transition:none; }
        }
        .i-bips button:focus-visible { outline:2px solid var(--gold-lt); outline-offset:4px; }
        /* Sits under the proof label, above the ticker. Quiet: the logos are
           the proof, this is the sentence that frames them. ⚠ Money figures,
           which the master brief rules out for the public site. */
        .i-proofnote { margin-top:16px; font-size:17px; line-height:1.62; color:#3F312D; max-width:64ch; }

        /* The homepage marquee, by the owner's decision. The design brief allows
           it only with a hard mask and even gaps, so the band fades both edges
           into the paper: no more half-cut "D BOSS" at the boundary. */
        .i-logos { background:var(--paper); border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:54px 0; }
        .i-logomask {
          margin-top:34px;
          -webkit-mask-image:linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%);
          mask-image:linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%);
        }

        /* A testimonial on a card looks like a review. In the open it looks
           like a reference. */
        .i-qt { padding:86px 0; }
        .i-qt .qm { font-family:var(--font-serif); font-size:70px; line-height:.5; color:var(--gold); display:block; margin-bottom:26px; }
        .i-qt blockquote { font-family:var(--font-serif); font-style:italic; font-size:38px; line-height:1.28; max-width:960px; }
        .i-qt .who { margin-top:28px; font-size:12px; letter-spacing:2.2px; text-transform:uppercase; color:var(--stone); }
        .i-qstage { display:grid; gap:40px; }
        html.js .i-qstage { grid-template-areas:"q"; gap:0; }
        html.js .i-qstage .qslide { grid-area:q; opacity:0; pointer-events:none; transition:opacity .9s ease; }
        html.js .i-qstage .qslide.on { opacity:1; pointer-events:auto; }
        .i-qt .i-bips { margin-top:40px; }
        .i-bips-light button { background:color-mix(in srgb, var(--gold) 30%, transparent); }
        .i-bips-light button:hover { background:color-mix(in srgb, var(--gold) 62%, transparent); }
        .i-bips-light button[aria-current="true"] { background:var(--gold); }
        .i-bips-light button:focus-visible { outline-color:var(--gold); }
        @media (prefers-reduced-motion: reduce) { html.js .i-qstage .qslide { transition:none; } }

        /* The offer sits over the photograph. The scrim is a blue tint rather
           than black, so the band still belongs to the palette, and it is heavy
           enough to hold serif copy over the bright gravel in the plate. */
        .i-start { position:relative; padding:118px 0; text-align:center; overflow:hidden; }
        .i-start > img { object-fit:cover; }
        .i-scrim { position:absolute; inset:0; background:rgba(27,44,63,.78); }
        .i-start-copy { position:relative; }
        .i-start .i-kick { color:var(--gold-lt); }
        /* :not(.i-kick) so the body rule cannot outrank the kicker on specificity
           — the kicker is a <p> too. */
        .i-start p:not(.i-kick) {
          font-family:var(--font-sans); font-size:23px; line-height:1.55; color:#E6E4E0;
          max-width:880px; margin:24px auto 0;
          /* Centred text over a photograph shows a short last line badly — the
             second paragraph was orphaning "do first." Balanced, the lines set
             to an even measure and the orphan goes. */
          text-wrap:balance;
        }

        /* Centred by the owner's decision (25 Aug), against the design brief's
           "left align everything, never centre anything". */
        .i-close { padding:100px 0 44px; text-align:center; }
        .i-close .crown { display:block; margin:0 auto 26px; height:48px; width:auto; user-select:none; }
        .i-close h2 { font-family:var(--font-serif); font-size:44px; line-height:1.1; font-weight:400; letter-spacing:-.8px; max-width:22ch; margin:0 auto 34px; }
        .i-paths { display:block; }
        .i-btn { display:inline-flex; align-items:center; gap:12px; background:var(--blue); color:var(--cream); padding:17px 36px; border-radius:40px; font-size:16px; font-weight:500; }

        .i a:focus-visible, .i button:focus-visible { outline:2px solid var(--blue); outline-offset:3px; border-radius:4px; }

        /* Fade and an 8px rise, once, nothing after. */
        /* 8px over .2s was invisible: it arrived before the eye reached it.
           The draw-in travels 34px over .82s on a hard ease-out, so it enters
           with real velocity and settles rather than fading. The faint scale
           gives the block somewhere to travel from without any bounce, which
           would read as playful and is wrong for this page. Children step
           .13s behind each other, far enough apart to be read as a sequence. */
        html.js .i [data-r] { opacity:0; transform:translateY(34px) scale(.988); }
        html.js .i [data-r].in {
          opacity:1; transform:none;
          transition:opacity .82s cubic-bezier(.16,1,.3,1), transform .82s cubic-bezier(.16,1,.3,1);
        }
        html.js .i [data-r].in > * { animation:i-rise .82s cubic-bezier(.16,1,.3,1) both; }
        html.js .i [data-r].in > *:nth-child(2) { animation-delay:.13s; }
        html.js .i [data-r].in > *:nth-child(3) { animation-delay:.26s; }
        html.js .i [data-r].in > *:nth-child(4) { animation-delay:.39s; }
        html.js .i [data-r].in > *:nth-child(5) { animation-delay:.52s; }
        html.js .i [data-r].in > *:nth-child(6) { animation-delay:.65s; }
        @keyframes i-rise { from { opacity:0; transform:translateY(26px); } to { opacity:1; transform:none; } }

        @media (prefers-reduced-motion: reduce) {
          html.js .i [data-r], html.js .i [data-r].in > * { opacity:1; transform:none; transition:none; animation:none; }
        }

        @media (max-width:900px) {
          .i-in { padding:0 22px; }
          .i-hero { padding:38px 0 48px; min-height:0; }
          .i-hero .lockup { gap:19px; margin-bottom:22px; }
          .i-hero .crown { height:42px; }
          .i-hero .wordmark { font-size:40px; }
          .i-hero h1 { font-size:46px; letter-spacing:-1.2px; margin-bottom:22px; }
          .i-hero .sub { font-size:17px; }
          .i-filmgrid { grid-template-columns:1fr; }
          .i-filmwrap { min-height:300px; }
          .i-filmtxt { padding:34px 22px; }
          .i-filmtxt .ph { font-size:30px; }
          .i-lede { padding-bottom:56px; }
          .i-lede .name { font-size:30px; letter-spacing:-.7px; }
          .i-lede .then { font-size:17px; margin-top:20px; }
          /* Stacked, three filled gold slabs read as blocks rather than a
             triptych. On mobile they take the transcript sheet's device
             instead — paper with a gold spine — which is already a treatment
             on this page, so the gold stays without the weight. */
          .i-c3 { grid-template-columns:1fr; gap:14px; }
          .i-c3 .c { padding:26px 22px 28px; }
          .i-c3 .lab { font-size:30px; letter-spacing:-.7px; margin-bottom:12px; }
          .i-c3 p { font-size:17px; }
          .i-tumbwrap { gap:20px; }
          .i-turns { gap:30px; }
          .i-turns .turn, .i-tumb .turn { grid-template-columns:1fr; gap:0; }
          /* 38px, not larger: the widest half ("into operating reality.") is
             261px here, which still clears a 320px phone. */
          .i-turns h3, .i-tumb h3 { font-size:38px; letter-spacing:-1px; }
          .i-turns .note, .i-tumb .note { font-size:16px; margin-top:12px; padding-bottom:0; max-width:none; }
          .i-payoff { margin-top:36px; font-size:21px; letter-spacing:-.2px; max-width:none; }
          /* 30px: at 346px none of the four can hold three lines evenly (25px
             gives 3/4/4/3), but at 30px all four set to four lines, which is
             both bigger and even as the carousel rotates. */
          .i-stage .slide { font-size:30px; letter-spacing:-.4px; max-width:none; }
          html.js .i-stage { min-height:7.2em; }
          .i-proofnote { font-size:16px; max-width:none; }
          .i-bips { gap:12px; margin-top:34px; }
          .i-bips button { height:10px; width:10px; }
          .i-bips button[aria-current="true"] { width:34px; }
          .i-c2 .n { font-size:30px; margin-bottom:10px; }
          .i-c3 .c { margin-bottom:26px; }
          .i-c3 .lab { font-size:30px; letter-spacing:-.7px; margin-bottom:12px; }
          .i-c3 p { font-size:17px; }
          .i-qt { padding:56px 0; }
          .i-qt blockquote { font-size:24px; }
          .i-qt .qm { font-size:54px; }
          /* :not(.i-kick) here too — the unscoped rule was outranking .i-kick
             and rendering the "How we start" label at 20px on mobile. */
          .i-start { padding:72px 0; }
          .i-start p:not(.i-kick) { font-size:19px; margin-top:20px; }
          .i-close { padding:64px 0 32px; }
          .i-close h2 { font-size:28px; letter-spacing:-.3px; }
          .i-close .crown { height:40px; margin-bottom:20px; }
        }
      `}</style>

      <a href="#top" className="skip-link">Skip to content</a>

      <div className="i">
        <main id="top">
          {/* ── cream · hero, over the clay wash ─────────────────── */}
          <section className="i-herowrap">
            <div className="i-in">
              <div className="i-hero">
              <span className="lockup">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} className="crown" />
                <span className="wordmark">DAB Hands</span>
              </span>
              <h1>Keeping important work moving.</h1>
              <p className="sub">Darren Brett · Fractional COO &amp; Digital Operator</p>
              </div>
            </div>
          </section>

          {/* ── charcoal · the film, the anchor ──────────────────── */}
          <section className="i-film">
            {FILM.src ? (
              /* With a film to show, it gets the whole panel at 16:9 rather
                 than being cropped into the portrait's tall column. */
              <div className="i-filmstage">
                <div className="i-filmhead">
                  <Kicker>A quick hello</Kicker>
                  <p className="ph">Ninety seconds to get to know me.</p>
                </div>
                <FilmPlayer
                  src={FILM.src}
                  poster={FILM.poster}
                  portraitSrc={FILM.portraitSrc}
                  portraitPoster={FILM.portraitPoster}
                  captions={FILM.captions}
                  title="A quick hello from Darren Brett"
                />
              </div>
            ) : (
              <div className="i-filmgrid">
                <div className="i-filmwrap">
                  {/* the tall column wants the portrait crop, not the 16:9 one */}
                  <Image src={FILM.portraitPoster || FILM.poster} alt={FILM.alt} fill sizes="(max-width: 900px) 100vw, 45vw" priority />
                </div>
                <div className="i-filmtxt">
                  <Kicker>A quick hello</Kicker>
                  <p className="ph">Film to follow.</p>
                </div>
              </div>
            )}
          </section>

          {/* ── cream · lede, the three sections ────────────────── */}
          <div className="i-in">

            <div className="i-lede" data-r>
              <p className="name">
                I’m Darren. Agencies, brands and growth-stage businesses call me when something important has to land.
              </p>
              <p className="then">
                I make sure it does. I help set the direction, then hold every moving part together, in the detail and in the boardroom, until what you decided is what your business and your customers actually get.
              </p>
            </div>
          </div>

          {/* ── blue · the situations ────────────────────────────── */}
          <section className="i-when">
            <div className="i-in">
              <Kicker>When leaders bring me in</Kicker>
              <div data-r aria-roledescription="carousel" aria-label="When leaders bring me in" {...reasons.handlers}>
                <div className="i-stage">
                  {SITUATIONS.map((sit, i) => (
                    <p
                      key={sit}
                      className={`slide${i === reasons.index ? ' on' : ''}`}
                      aria-hidden={i !== reasons.index}
                    >
                      {sit}
                    </p>
                  ))}
                </div>
                <div className="i-bips" aria-label="Carousel navigation">
                  {SITUATIONS.map((sit, i) => (
                    <button
                      key={sit}
                      type="button"
                      onClick={() => reasons.setIndex(i)}
                      aria-current={i === reasons.index}
                      aria-label={`Show reason ${i + 1} of ${SITUATIONS.length}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── cream · the testimonial, in the open ─────────────── */}
          <div className="i-in">
            <div className="i-qt" data-r aria-roledescription="carousel" aria-label="In their words" {...quotes.handlers}>
              <span className="qm" aria-hidden>“</span>
              <div className="i-qstage">
                {QUOTES.map((q, i) => (
                  <figure key={q.name} className={`qslide${i === quotes.index ? ' on' : ''}`} aria-hidden={i !== quotes.index}>
                    <blockquote>{q.quote}</blockquote>
                    <figcaption className="who">{q.name} · {q.role}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="i-bips i-bips-light">
                {QUOTES.map((q, i) => (
                  <button
                    key={q.name}
                    type="button"
                    onClick={() => quotes.setIndex(i)}
                    aria-current={i === quotes.index}
                    aria-label={`Show testimonial ${i + 1} of ${QUOTES.length}`}
                  />
                ))}
              </div>
            </div>
          </div>


          <div className="i-in">
            <section className="i-sec" style={{ borderTop: 'none' }}>
              <Kicker>Three things that describe me</Kicker>
              <div className="i-c3" data-r>
                {ABOUT.map((a) => (
                  <div className="c" key={a.lead}>
                    <div className="lab">{a.lead}</div>
                    <p>{a.rest}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── paper · the logo band, a quiet lift ──────────────── */}
          <section className="i-logos">
            <div className="i-in">
              <Kicker>Trusted where the stakes are high</Kicker>
              <p className="i-proofnote" data-r>
                I’ve led delivery inside a £50m client relationship, and carried multimillion pound programmes that performed. I built the operations and product of my own agency from nothing, so I have run the machine as well as the work.
              </p>
            </div>
            <div className="i-logomask">
              <LogoTicker ariaLabel="Brands I’ve worked with" compact />
            </div>
          </section>

          <div className="i-in">
            <section className="i-sec">
              <Kicker>What I turn</Kicker>
              <Tumbler />
              <p className="i-payoff" data-r>
                All three pay off in the same place: the bottom line. More margin in how you operate, and more return from what reaches the customer.
              </p>
            </section>

          </div>

          {/* ── the offer, over the image ────────────────────────── */}
          <section className="i-start">
            <Image src="/images/momentum/01-tracks-2.jpg" alt="" aria-hidden fill sizes="100vw" />
            <div className="i-scrim" aria-hidden />
            <div className="i-in i-start-copy">
              <Kicker>How we start</Kicker>
              <p>
                We can start small. A paid diagnostic, or a fortnight of troubleshooting. You come away with a straight read on where value or confidence is leaking and what I’d do first. Nobody has to bet on me without trying me first.
              </p>
              <p>
                You’re hiring me, and I stay accountable end to end. If the work needs more than me, and you want it, I bring exceptional specialists to the party; you get senior people shaping the outcomes without the usual agency overheads.
              </p>
            </div>
          </section>

          {/* ── cream · the close, left aligned like everything else ─ */}
          <div className="i-in">
            <section className="i-close" data-r>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} className="crown" />
              <h2>When important work needs to land, let’s talk.</h2>
              <a className="i-btn" href="mailto:darren@dabhands.delivery?subject=Keeping%20important%20work%20moving">
                Book a call →
              </a>
              {/* The picker's own root is inline-block, so it needs a block
                  wrapper here or it sits alongside the Book a call button
                  instead of under it, the way the old text link did. */}
              <div className="i-paths">
                <PathwayPicker preferAbove />
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer variant="none" from="intro" />
    </>
  );
}
