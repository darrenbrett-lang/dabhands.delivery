import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';
import { Footer } from '@/components/Footer';

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
const FILM: { embed: string | null; poster: string; alt: string } = {
  embed: null,
  poster: '/images/darren-brett_colour_headshot.jpeg',
  alt: 'Darren Brett',
};

const TURNS = [
  { from: 'Strategic direction', to: 'operating reality.', note: 'The plan becomes work people can do, in an order, with someone accountable for each part.' },
  { from: 'System complexity', to: 'coordinated flow.', note: 'The parts that have to hand over to each other do it on time, effectively and without anyone chasing.' },
  { from: 'Important work', to: 'real results.', note: 'What reaches the customer is what you decided to make or build, and it returns what you expected of it.' },
];

// Trimmed to an even measure (78 to 81 characters) so the four columns set to
// the same depth.
const SITUATIONS = [
  'A critical programme needs experienced leadership to keep it moving and land it.',
  'Growth has outpaced the operating model and the business no longer moves together.',
  'Multiple partners and agencies need to work as one team around a single outcome.',
  'Nobody can say where the margin goes, or why good work arrives weaker than it left.',
  'I want to grow my business and need the strategy, insight and structure to get it moving.',
];

// Trimmed to an even measure (72 to 74 characters) so the three panels set to
// the same depth.

const ABOUT = [
  { lead: 'A delivery leader.', rest: 'Twenty years of depth in complex, multi-track delivery that had to land.' },
  { lead: 'A digital operator.', rest: 'I hold my own with strategy, creative and technology, and make work better.' },
  { lead: 'An entrepreneur’s engine.', rest: 'I’ve carried my own P&L, found opportunities and turned them into meaningful revenue.' },
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
  const [playing, setPlaying] = useState(false);

  const reasons = useCarousel(SITUATIONS.length, 5200);
  // Quotes get longer than the reasons, so they hold a little longer.
  const quotes = useCarousel(QUOTES.length, 6800);

  // One IntersectionObserver for every [data-r]. The `.js` class on <html> arms
  // the hidden state, so with JavaScript off nothing is ever hidden. The 1.6s
  // failsafe reveals everything if the observer never fires — a non-scrolling
  // preview pane or an embed, which is not hypothetical: it happens.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-r]'));
    const revealAll = () =>
      document.querySelectorAll<HTMLElement>('[data-r]').forEach((n) => n.classList.add('in'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return () => root.classList.remove('js');
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    );
    nodes.forEach((n) => io.observe(n));
    const failsafe = window.setTimeout(revealAll, 1600);
    return () => { io.disconnect(); window.clearTimeout(failsafe); root.classList.remove('js'); };
  }, []);

  return (
    <>
      {/* Link preview. og-intro.jpg is the headshot padded onto charcoal at a
          true 1200x630 — the square original gets cropped to a slice by
          LinkedIn and Slack, which frame at 1.91:1. */}
      <SeoMeta
        title="An introduction to Darren Brett, fractional COO"
        description="Keeping important work moving. Darren Brett · Fractional COO."
        path="/intro"
        image="/og-intro.jpg"
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
        .i-play {
          margin-top:26px; display:inline-flex; align-items:center; gap:12px; align-self:flex-start;
          background:var(--blue); color:#E6E4E0; border-radius:40px; padding:15px 30px; font-size:16px; font-weight:500; cursor:pointer;
        }


        .i-lede { padding:74px 0 84px; }
        .i-lede .name { font-family:var(--font-serif); font-weight:400; font-size:56px; line-height:1.06; letter-spacing:-1.6px; color:var(--blue); max-width:1000px; }
        .i-br { display:none; }
        @media (min-width:901px) { .i-br { display:inline; } }
        .i-lede .then { font-family:var(--font-sans); font-size:22px; line-height:1.58; color:#3F312D; max-width:820px; margin-top:30px; }

        /* Lists become grids, each cell with a hairline above, so the page
           stops being a single ribbon. */
        .i-sec { padding:74px 0; border-top:1px solid var(--line); }
        /* The dividers are the page ground showing through the grid gaps, so the
           three panels read as separate objects with no drawn rule at all. */
        .i-c3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:34px; }
        .i-c3 .c { background:var(--paper); border-left:4px solid var(--gold); padding:34px 28px 38px; }
        .i-c3 .lab, .i-c3 p { color:var(--ink); }
        .i-turns { margin-top:38px; display:grid; gap:52px; }
        .i-turns .turn { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr); gap:0 64px; align-items:end; }
        .i-turns h3 { font-family:var(--font-serif); font-weight:400; font-size:56px; line-height:1.08; letter-spacing:-1.6px; }
        .i-turns .into { font-style:italic; }
        .i-turns .to { color:var(--gold); }
        .i-turns .note { font-family:var(--font-sans); font-size:17px; line-height:1.62; color:#3F312D; max-width:40ch; padding-bottom:.34em; }
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
        .i-start p:not(.i-kick) { font-family:var(--font-sans); font-size:23px; line-height:1.55; color:#E6E4E0; max-width:880px; margin:24px auto 0; }

        /* Centred by the owner's decision (25 Aug), against the design brief's
           "left align everything, never centre anything". */
        .i-close { padding:100px 0 44px; text-align:center; }
        .i-close .crown { display:block; margin:0 auto 26px; height:48px; width:auto; user-select:none; }
        .i-close h2 { font-family:var(--font-serif); font-size:44px; line-height:1.1; font-weight:400; letter-spacing:-.8px; max-width:22ch; margin:0 auto 34px; }
        .i-btn { display:inline-flex; align-items:center; gap:12px; background:var(--blue); color:var(--cream); padding:17px 36px; border-radius:40px; font-size:16px; font-weight:500; }
        .i-alt { margin-top:22px; font-size:15px; color:var(--stone); }
        .i-alt a { color:var(--blue); text-decoration:underline; text-underline-offset:4px; text-decoration-thickness:1px; }
        .i-private { padding:0 0 44px; text-align:center; font-size:13px; letter-spacing:.02em; color:var(--stone); }

        .i a:focus-visible, .i button:focus-visible { outline:2px solid var(--blue); outline-offset:3px; border-radius:4px; }

        /* Fade and an 8px rise, once, nothing after. */
        html.js .i [data-r] { opacity:0; transform:translateY(8px); }
        html.js .i [data-r].in { opacity:1; transform:none; transition:opacity .2s ease, transform .2s ease; }
        html.js .i [data-r].in > * { animation:i-rise .2s ease both; }
        html.js .i [data-r].in > *:nth-child(2) { animation-delay:.06s; }
        html.js .i [data-r].in > *:nth-child(3) { animation-delay:.12s; }
        html.js .i [data-r].in > *:nth-child(4) { animation-delay:.18s; }
        @keyframes i-rise { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

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
          .i-turns { gap:30px; }
          .i-turns .turn { grid-template-columns:1fr; gap:0; }
          /* 38px, not larger: the widest half ("into operating reality.") is
             261px here, which still clears a 320px phone. */
          .i-turns h3 { font-size:38px; letter-spacing:-1px; }
          .i-turns .note { font-size:16px; margin-top:12px; padding-bottom:0; max-width:none; }
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
        <div className="i-in">
        </div>

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
              <p className="sub">Darren Brett · Fractional COO</p>
              </div>
            </div>
          </section>

          {/* ── charcoal · the film, the anchor ──────────────────── */}
          <section className="i-film">
            <div className="i-filmgrid">
              <div className="i-filmwrap">
                {FILM.embed && playing ? (
                  <iframe
                    src={`${FILM.embed}${FILM.embed.includes('?') ? '&' : '?'}autoplay=1`}
                    title="A quick hello from Darren Brett"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <Image src={FILM.poster} alt={FILM.alt} fill sizes="(max-width: 900px) 100vw, 45vw" priority />
                )}
              </div>
              <div className="i-filmtxt">
                <Kicker>A quick hello</Kicker>
                <p className="ph">{FILM.embed ? 'Sixty seconds, and you will know.' : 'Film to follow.'}</p>
                {FILM.embed && !playing && (
                  <button type="button" className="i-play" onClick={() => setPlaying(true)}>
                    Play the film <span aria-hidden>→</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ── cream · lede, the three sections ────────────────── */}
          <div className="i-in">

            <div className="i-lede" data-r>
              <p className="name">
                I’m Darren, a fractional COO for digital-first{' '}
                <br className="i-br" />
                agencies and growth-stage brands.
              </p>
              <p className="then">
                I make sure important work actually delivers. I help set the direction, then hold every moving part together, in the delivery detail and in the boardroom, until what was decided is what the customer actually gets.
              </p>
            </div>
          </div>

          <div className="i-in">
            <section className="i-sec">
              <Kicker>What I turn</Kicker>
              <div className="i-turns" data-r>
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
              <p className="i-payoff" data-r>
                All three pay off in the same two places. More margin in how you operate, and more return from what reaches the customer.
              </p>
            </section>

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

          {/* ── the offer, over the image ────────────────────────── */}
          <section className="i-start">
            <Image src="/images/momentum/01-tracks-2.jpg" alt="" aria-hidden fill sizes="100vw" />
            <div className="i-scrim" aria-hidden />
            <div className="i-in i-start-copy">
              <Kicker>How we start</Kicker>
              <p>
                When you bring me in, it’s built around the work, not the headcount. I stay accountable end to end, and bring in trusted senior specialists only when you need it and the work demands it.
              </p>
              <p>
                We can start small, a paid diagnostic or a fortnight of troubleshooting, and you come away with a straight read on what’s stuck and what I’d do first, so nobody has to bet on me without trying me first.
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
              <p className="i-alt">
                <Link href="/">or go to the website →</Link>
              </p>
            </section>
            <p className="i-private">Shared privately. Not listed on the site.</p>
          </div>
        </main>
      </div>

      <Footer variant="none" />
    </>
  );
}
