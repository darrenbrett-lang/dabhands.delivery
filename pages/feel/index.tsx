import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { SeoMeta } from '@/components/SeoMeta';
import { Footer } from '@/components/Footer';

/**
 * /feel — the FEEL introduction and capture experience.
 *
 * Unlisted: noindex meta, an X-Robots-Tag route header, and absent from nav,
 * sitemap.xml and llms.txt. Reachable by direct link. The gated deck lives at
 * /feel/method behind a signed cookie (lib/feelAccess.ts, enforced in
 * proxy.ts); submitting this form is what issues it.
 *
 * The page has one job: to get somebody to the thought "we don't measure
 * that". It sells the realisation, not the manual.
 *
 * Motion is CSS plus a local IntersectionObserver, deliberately, not framer:
 * a `.js` class on the root arms the hidden state, so with JavaScript off
 * nothing is ever hidden, and a failsafe reveals everything if the observer
 * never fires. Every reveal is inert under prefers-reduced-motion.
 */

/**
 * The split-flap board. Every one of these is a compliment, which is the point:
 * the words are interchangeable, and the board never arrives anywhere.
 */
const SAMENESS = [
  'FUNCTIONAL', 'FRICTIONLESS', 'OPTIMISED', 'EFFECTIVE',
  'USABLE', 'RESPONSIVE', 'ACCESSIBLE', 'TESTED',
  'CONSISTENT', 'COMPLIANT', 'CONVERTING', 'COMPETENT',
  'POLISHED', 'EFFICIENT', 'RELIABLE', 'SEAMLESS',
];

const BOARD_WIDTH = Math.max(...SAMENESS.map((w) => w.length));
const FLAP_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const SIGNALS = [
  ['Attention', 'Do people notice?'],
  ['Connection', 'Do they care?'],
  ['Conversion', 'Do they move?'],
];

const STAGES = ['Notice', 'Relevance', 'Confidence', 'Commitment', 'Memory'];

/** The same stage, in the person's own voice. Parallel to STAGES by index. */
const STAGE_SUB = ['I noticed', 'It’s for me', 'I can go on', 'I’m ready', 'I kept it'];

const CROSS = [
  ['Did it happen?', 'Did the experience create the required feeling?'],
  ['Did we get the credit?', 'Did that feeling attach to the brand?'],
  ['Did it last?', 'Did anything survive the moment?'],
];

const PATTERN: ('Carries' | 'Weakens' | 'Breaks')[] = ['Carries', 'Carries', 'Weakens', 'Breaks', 'Carries'];

type Fields = { firstname: string; lastname: string; email: string; company: string; jobtitle: string; issue: string };

const EMPTY: Fields = { firstname: '', lastname: '', email: '', company: '', jobtitle: '', issue: '' };

/** The URL is an external system, so it is read rather than mirrored into state. */
const NO_SUBSCRIBE = () => () => {};
const readTurnedAway = () =>
  new URLSearchParams(window.location.search).get('from') === 'method';

export default function FeelIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  /**
   * True when the gate turned someone away, so the page can say why.
   *
   * ⚠ Read from location, not router.query. This page is statically optimised,
   * so router.query is empty on the first render and did not reliably populate
   * afterwards; reading the URL in an effect always works.
   */
  const turnedAway = useSyncExternalStore(NO_SUBSCRIBE, readTurnedAway, () => false);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [website, setWebsite] = useState(''); // honeypot
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<{ message: string; field?: string } | null>(null);

  // Reveals. The observer arms itself only after marking the root, so a page
  // served without JavaScript shows everything.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced) {
      targets.forEach((t) => t.setAttribute('data-shown', 'true'));
      return;
    }

    root.classList.add('js');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-shown', 'true');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));

    // Failsafe: if the observer never fires (a non-scrolling preview pane, an
    // embed), nothing is left stranded at opacity 0.
    const failsafe = window.setTimeout(() => {
      targets.forEach((t) => t.setAttribute('data-shown', 'true'));
    }, 2200);

    return () => { io.disconnect(); window.clearTimeout(failsafe); };
  }, []);

  /**
   * The board. Cells settle left to right, so it reads as mechanical rather
   * than as a fade. Two timers only, both cleared on unmount, and nothing runs
   * at all under prefers-reduced-motion: the words are decoration, and the
   * argument is carried by the copy around them.
   */
  const [flaps, setFlaps] = useState<string[]>(() =>
    SAMENESS[0].padEnd(BOARD_WIDTH).split(''),
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let word = 0;
    let tick: ReturnType<typeof setInterval> | null = null;

    const flipTo = (next: string) => {
      // Left-aligned in a fixed run of cells, with the remainder left blank. That
    // is how a real split-flap board behaves, and the ragged tail is the point:
    // the board is a fixed frame, not a line of type.
    const target = next.padEnd(BOARD_WIDTH).split('');
      let settled = 0;
      if (tick) clearInterval(tick);
      tick = setInterval(() => {
        settled += 1;
        setFlaps(
          target.map((ch, i) =>
            i < settled ? ch : FLAP_GLYPHS[Math.floor(Math.random() * FLAP_GLYPHS.length)],
          ),
        );
        if (settled >= BOARD_WIDTH && tick) { clearInterval(tick); tick = null; }
      }, 42);
    };

    const advance = setInterval(() => {
      word = (word + 1) % SAMENESS.length;
      flipTo(SAMENESS[word]);
    }, 2400);

    return () => { clearInterval(advance); if (tick) clearInterval(tick); };
  }, []);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    // Clear the message the moment they start fixing what it complained about.
    setError((err) => (err?.field === k ? null : err));
  };

  /** Same rule as the API, so the two can never disagree in front of someone. */
  const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  const validate = (): { message: string; field?: string } | null => {
    const email = values.email.trim();
    if (!email) return { message: 'Please add your email so I can send it to you.', field: 'email' };
    if (!looksLikeEmail(email)) return { message: 'Please check your email address.', field: 'email' };
    return null;
  };

  const focusField = (field?: string) => {
    if (!field) return;
    const el = document.getElementById(field) as HTMLElement | null;
    el?.focus();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    const invalid = validate();
    if (invalid) {
      setError(invalid);
      focusField(invalid.field);
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/feel/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError({ message: data.error || 'Something went wrong. Please try again.', field: data.field });
        focusField(data.field);
        setBusy(false);
        return;
      }
      // No redirect: the confirmation carries the link, so nothing about
      // access waits on the email arriving.
      setDone(true);
      setBusy(false);
    } catch {
      setError({ message: 'Something went wrong. Please try again.' });
      setBusy(false);
    }
  };

  return (
    <>
      <SeoMeta
        title="FEEL · The Emotional Experience Method | DAB Hands"
        description="A performance layer for how brands make people feel in digital."
        path="/feel"
        image="/og-feel.png"
        noindex
      />

      <style>{`
        .fl {
          --bone:#F5F1EA; --paper:#FBF8F3; --ink:#1F1F1D; --graphite:#5C5C58;
          --stone:#D8D3CB; --slate:#535B68; --clay:#A49786;
          --gold:#C0974A; --gold-deep:#7E5E27; --gold-lt:#EBD4A8;
          background:var(--bone); color:var(--ink);
          font-family:var(--font-sans); font-size:17px; line-height:1.6;
          -webkit-font-smoothing:antialiased; overflow-x:hidden;
        }
        .fl-in { width:100%; max-width:1180px; margin:0 auto; padding:0 44px; }

        /* Small, static, and out of the way. */
        .fl-mast {
          --mast-h:72px;
          height:var(--mast-h);
          max-width:1180px; margin:0 auto; padding:0 44px;
          display:flex; align-items:center; justify-content:space-between; gap:24px;
        }
        .fl-mast .mark {
          display:inline-flex; align-items:center; gap:10px;
          text-decoration:none; color:var(--ink);
        }
        .fl-mast .mark img { height:26px; width:auto; display:block; user-select:none; }
        .fl-mast .mark span { font-family:var(--font-serif); font-size:21px; letter-spacing:-.01em; }
        .fl-mast .who {
          font-size:10.5px; letter-spacing:2.6px; text-transform:uppercase;
          font-weight:600; color:var(--graphite);
        }
        .fl-sec { padding:132px 0; position:relative; }
        .fl-sec.tall { min-height:100svh; display:flex; align-items:center; padding:96px 0; }
        .fl-dark { background:var(--ink); color:var(--bone); }
        .fl-paper { background:var(--paper); }
        .fl-clay { background:var(--clay); color:#2A211E; }

        .fl-kick {
          font-size:11px; letter-spacing:2.8px; font-weight:600;
          text-transform:uppercase; color:var(--gold-deep); margin:0 0 26px;
        }
        .fl-dark .fl-kick { color:var(--gold-lt); }
        .fl-clay .fl-kick { color:#3F312D; }

        h1, h2 { font-family:var(--font-serif); font-weight:400; letter-spacing:-1.2px; margin:0; }
        .fl-lead { font-size:20px; line-height:1.55; color:var(--graphite); max-width:56ch; margin:24px 0 0; }
        .fl-dark .fl-lead { color:rgba(245,241,234,.78); }
        .fl-clay .fl-lead { color:#3F312D; }

        /* ── Reveals ─────────────────────────────────────────────────────── */
        .fl.js [data-reveal] { opacity:0; transform:translateY(18px); }
        .fl [data-reveal][data-shown="true"] {
          opacity:1; transform:none;
          transition:opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .fl.js [data-reveal] { opacity:1; transform:none; }
          .fl [data-reveal][data-shown="true"] { transition:none; }
        }

        /* ── 01 Opening ──────────────────────────────────────────────────── */
        /* ⚠ The strip takes 72px off the fold, so the hero gives it back and
           the padding stays inside what is left. Content plus padding must not
           exceed the min-height or the first screen spills past the viewport,
           which is the one place on this page that must not scroll. */
        .fl-hero {
          display:flex; flex-direction:column; justify-content:center;
          min-height:calc(100svh - 72px); padding:64px 0 76px;
        }
        /* The lockup: the drawn crown above the wordmark. Dark crown, because
           the hero sits on bone. */
        .fl-hero .crown { display:block; height:clamp(52px,7vw,88px); width:auto; margin:0 0 clamp(24px,3vw,38px); user-select:none; }
        .fl-hero .mark { font-family:var(--font-serif); font-size:clamp(96px,17vw,220px); line-height:.84; letter-spacing:-7px; }
        .fl-hero .sub { font-family:var(--font-serif); font-size:clamp(24px,3.2vw,42px); line-height:1.1; color:var(--gold-deep); margin:22px 0 0; letter-spacing:-.5px; }
        /* The setup is quiet and the question carries the weight, not the
           other way round. */
        /* ⚠ Was min(14vh,120px), which opened a hole in the middle of the fold
           and pushed the question hard against the bottom edge. The hero is
           centred, so a smaller gap lets the whole block sit together with even
           air above and below it. */
        .fl-hero .ask { margin:min(7vh,62px) 0 0; }
        .fl-hero .ask .said { display:block; font-size:clamp(17px,1.5vw,21px); color:var(--graphite); }
        .fl-hero .ask b {
          display:block; font-weight:400; font-family:var(--font-serif);
          font-size:clamp(28px,4.2vw,54px); line-height:1.1; letter-spacing:-1px;
          margin:14px 0 0; max-width:20ch;
        }

        /* ── 02 Sameness ─────────────────────────────────────────────────── */
        /* The split-flap board. A departure board that never departs: the
           destination keeps changing and the train is always the same. */
        .fl-board { margin:64px 0 0; }
        /* ⚠ 0.55, not lower. At 11px this is small text and needs 4.5:1; bone
           at 0.42 measured 3.69 and failed. 0.55 gives 5.38. Do not dim it back
           down for the sake of the composition. */
        .fl-board .lead {
          font-size:11px; letter-spacing:2.8px; text-transform:uppercase;
          font-weight:600; color:rgba(245,241,234,.55); margin:0 0 18px;
        }
        .fl-board .slot { display:flex; gap:6px; flex-wrap:nowrap; }
        .fl-board .cell.blank {
          background:rgba(245,241,234,.02);
          border-color:rgba(245,241,234,.06);
        }
        .fl-board .cell {
          flex:0 0 auto;
          width:clamp(26px,3.4vw,50px); height:clamp(38px,4.8vw,70px);
          display:flex; align-items:center; justify-content:center;
          font-family:var(--font-sans); font-weight:600;
          font-size:clamp(17px,2.2vw,32px); letter-spacing:0;
          color:var(--gold-lt);
          background:rgba(245,241,234,.05);
          border:1px solid rgba(245,241,234,.12); border-radius:2px;
          /* The seam across the middle is what makes it read as a flap. */
          background-image:linear-gradient(to bottom,
            transparent calc(50% - 1px), rgba(31,31,29,.55) calc(50% - 1px),
            rgba(31,31,29,.55) 50%, transparent 50%);
          font-variant-numeric:tabular-nums;
        }
        .fl-resolve {
          font-family:var(--font-serif); font-size:clamp(34px,5.4vw,72px); line-height:1.06;
          letter-spacing:-1.6px; margin:76px 0 0; max-width:18ch;
        }

        /* ── 03 Warning lights ───────────────────────────────────────────── */
        /* The ignition self-test. Turn a key and every warning light comes on in
           sequence, then you wait to see which one stays lit. The lamps light
           left to right, the words rise with them, and the questions arrive a
           beat later: the metric first, the doubt second. That gap is the whole
           point of the section, so the motion carries it rather than decorating
           it. */
        .fl-lights { display:grid; grid-template-columns:repeat(3,1fr); gap:38px; margin:60px 0 0; }
        .fl-light { position:relative; padding-top:20px; cursor:default; }
        .fl-light::before {
          content:""; position:absolute; top:0; left:0; right:0; height:2px;
          background:var(--gold); transform:scaleX(0); transform-origin:left center;
          transition:transform .55s cubic-bezier(.22,.61,.36,1), height .2s ease, opacity .2s ease;
          opacity:.55;
        }
        .fl-light[data-shown="true"]::before { transform:scaleX(1); }
        .fl-light:nth-child(2)::before { transition-delay:.16s; }
        .fl-light:nth-child(3)::before { transition-delay:.32s; }

        .fl-light .w {
          display:block; font-family:var(--font-serif); font-size:clamp(30px,4vw,54px);
          line-height:1; letter-spacing:-1px; margin:0 0 16px;
          transition:transform .3s cubic-bezier(.22,.61,.36,1), color .3s ease;
        }
        /* The doubt lands after the dial, never with it. */
        .fl-light .q {
          font-size:17px; color:var(--graphite); display:block;
          opacity:0; transform:translateY(6px);
          transition:opacity .6s ease .55s, transform .6s ease .55s;
        }
        .fl-light[data-shown="true"] .q { opacity:1; transform:none; }
        .fl-light:nth-child(2) .q { transition-delay:.71s; }
        .fl-light:nth-child(3) .q { transition-delay:.87s; }

        /* Touching one lights it properly. Tactile, and it reveals nothing that
           was hidden, so a touch device loses nothing by not hovering. */
        .fl-light:hover::before, .fl-light:focus-within::before { height:4px; opacity:1; }
        .fl-light:hover .w, .fl-light:focus-within .w { transform:translateY(-2px); }

        @media (prefers-reduced-motion: reduce) {
          .fl-light::before { transform:scaleX(1); opacity:1; transition:none; }
          .fl-light .q { opacity:1; transform:none; transition:none; }
          .fl-light .w { transition:color .2s ease; }
          .fl-light:hover .w, .fl-light:focus-within .w { transform:none; }
        }

        /* ── 05 The system ───────────────────────────────────────────────── */
        .fl-sys { margin:64px 0 0; position:relative; }
        .fl-stages { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; }
        .fl-stage { border-top:2px solid var(--stone); padding-top:16px; }
        .fl-stage[data-shown="true"] { border-top-color:var(--gold); transition:border-color .6s ease; }
        .fl-stage b { display:block; font-family:var(--font-serif); font-weight:400; font-size:clamp(18px,2.1vw,25px); line-height:1.1; }
        /* The felt version. Sentence case, untracked, quieter: what the stage
           sounds like from the inside rather than a second label for it. */
        .fl-stage .said {
          display:block; margin-top:7px; font-size:14.5px; line-height:1.4;
          color:var(--graphite);
        }
        .fl-cross { margin:52px 0 0; display:grid; gap:0; }
        .fl-cross-row {
          display:grid; grid-template-columns:minmax(220px,.9fr) 1fr; gap:28px;
          padding:22px 0; border-top:1px solid var(--stone); align-items:baseline;
        }
        .fl-cross-row:last-child { border-bottom:1px solid var(--stone); }
        .fl-cross-row .q { font-family:var(--font-serif); font-size:clamp(21px,2.6vw,30px); line-height:1.15; color:var(--gold-deep); }
        .fl-cross-row .a { font-size:16.5px; color:var(--graphite); }

        /* ── 06 Verdict + pattern ────────────────────────────────────────── */
        /* The three verdicts cascade. They are not three equal options: they are
           a decline, so each one sits lower and holds less than the one before
           it. Carries is lit and whole, Weakens has dimmed, and the frame around
           Breaks is literally broken open at the corners. The meaning is in the
           treatment, not in an animation. */
        .fl-verdicts { display:flex; flex-wrap:wrap; gap:14px; margin:48px 0 0; align-items:flex-start; }
        .fl-verdicts span {
          font-family:var(--font-serif); font-size:clamp(26px,3.6vw,46px); line-height:1;
          padding:16px 30px; border:1px solid rgba(245,241,234,.26); border-radius:3px;
          transition:transform .7s cubic-bezier(.22,.61,.36,1), opacity .7s ease;
        }
        /* Carries: whole, lit, holding its line. */
        .fl-verdicts span:nth-child(1) { color:var(--gold-lt); border-color:var(--gold-lt); }
        /* Weakens: a step down, the colour draining out of it. */
        .fl-verdicts span:nth-child(2) {
          color:rgba(245,241,234,.82); border-color:rgba(245,241,234,.2);
          transform:translateY(14px);
        }
        /* Breaks: lower again, and the frame has come apart. The gaps are the
           border failing, not a dashed style. */
        .fl-verdicts span:nth-child(3) {
          color:rgba(245,241,234,.6); border-color:transparent;
          transform:translateY(30px);
          background-image:
            linear-gradient(90deg, rgba(245,241,234,.34) 34%, transparent 34%),
            linear-gradient(90deg, transparent 62%, rgba(245,241,234,.34) 62%),
            linear-gradient(180deg, rgba(245,241,234,.34) 40%, transparent 40%),
            linear-gradient(180deg, transparent 70%, rgba(245,241,234,.34) 70%);
          background-size:100% 1px, 100% 1px, 1px 100%, 1px 100%;
          background-position:top left, bottom left, left top, right top;
          background-repeat:no-repeat;
        }
        /* The cascade arrives in order, so it falls rather than appears. */
        .fl-verdicts[data-shown="true"] span:nth-child(2) { transition-delay:.14s; }
        .fl-verdicts[data-shown="true"] span:nth-child(3) { transition-delay:.28s; }
        .fl-verdicts:not([data-shown="true"]) span { opacity:0; transform:translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .fl-verdicts span { transition:none; opacity:1; }
          .fl-verdicts:not([data-shown="true"]) span { opacity:1; }
          .fl-verdicts span:nth-child(2) { transform:translateY(14px); }
          .fl-verdicts span:nth-child(3) { transform:translateY(30px); }
        }
        .fl-bars { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin:56px 0 0; align-items:end; }
        .fl-bar .fill { display:block; border-radius:2px; transform-origin:bottom; transform:scaleY(.06); }
        .fl-bars[data-shown="true"] .fl-bar .fill { transform:none; transition:transform .8s cubic-bezier(.22,.61,.36,1); }
        .fl-bar:nth-child(2) .fill { transition-delay:.08s; }
        .fl-bar:nth-child(3) .fill { transition-delay:.16s; }
        .fl-bar:nth-child(4) .fill { transition-delay:.24s; }
        .fl-bar:nth-child(5) .fill { transition-delay:.32s; }
        @media (prefers-reduced-motion: reduce) { .fl-bar .fill { transform:none; } }
        .fl-bar .fill.Carries { height:118px; background:var(--gold); }
        .fl-bar .fill.Weakens { height:66px; background:var(--clay); }
        .fl-bar .fill.Breaks  { height:24px; background:var(--bone); }
        .fl-bar b { display:block; font-size:14px; font-weight:600; margin:16px 0 3px; }
        .fl-bar span { font-size:13px; color:rgba(245,241,234,.66); }

        /* ── 07 Thesis ───────────────────────────────────────────────────── */
        .fl-thesis { font-family:var(--font-serif); font-size:clamp(38px,6.6vw,90px); line-height:1.04; letter-spacing:-2px; }
        .fl-thesis-2 { font-family:var(--font-serif); font-size:clamp(26px,3.6vw,46px); line-height:1.24; margin:min(11vh,86px) 0 0; letter-spacing:-.8px; }
        .fl-thesis-2 span { display:block; }

        /* ── 08 Form ─────────────────────────────────────────────────────── */
        .fl-form-head .crown { display:block; height:clamp(38px,4.4vw,56px); width:auto; margin:0 0 22px; user-select:none; }
        .fl-form-head .mark { font-family:var(--font-serif); font-size:clamp(52px,8vw,104px); line-height:.9; letter-spacing:-3px; }
        .fl-form-head .sub { font-family:var(--font-serif); font-size:clamp(19px,2.3vw,28px); color:var(--gold-lt); margin:12px 0 0; }
        .fl-inside { margin:40px 0 0; max-width:56ch; border-top:1px solid rgba(245,241,234,.18); padding-top:22px; }
        .fl-inside .n {
          font-size:11px; letter-spacing:2.8px; text-transform:uppercase;
          font-weight:600; color:var(--gold-lt); margin:0 0 16px;
        }
        .fl-inside ul { margin:0; padding:0; list-style:none; display:grid; gap:10px; }
        .fl-inside li {
          position:relative; padding-left:20px;
          font-size:15.5px; line-height:1.5; color:rgba(245,241,234,.78);
        }
        .fl-inside li::before {
          content:""; position:absolute; left:0; top:11px;
          width:8px; height:1px; background:var(--gold-lt); opacity:.8;
        }

        .fl-form { margin:56px 0 0; max-width:720px; }
        .fl-row { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .fl-field { margin:0 0 20px; }
        .fl-field label { display:block; font-size:11px; letter-spacing:2px; text-transform:uppercase; font-weight:600; color:rgba(245,241,234,.66); margin:0 0 8px; }
        .fl-field input, .fl-field textarea {
          width:100%; background:transparent; border:0; border-bottom:1px solid rgba(245,241,234,.3);
          color:var(--bone); font-family:var(--font-sans); font-size:18px; padding:10px 0;
          border-radius:0; -webkit-appearance:none;
        }
        .fl-field textarea { resize:vertical; line-height:1.5; min-height:56px; }
        /* ⚠ Placeholders inherit a browser default tuned for light grounds. On
           charcoal that measured 1.15:1, effectively invisible. Set explicitly,
           and never dimmed below this: a placeholder is text. */
        .fl-field ::placeholder { color:rgba(245,241,234,.62); opacity:1; }
        .fl-field input:focus, .fl-field textarea:focus { outline:none; border-bottom-color:var(--gold-lt); }
        .fl-field input[aria-invalid="true"] { border-bottom-color:#E0A6A6; }
        .fl-hp { position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden; }
        .fl-sr {
          position:absolute; width:1px; height:1px; padding:0; margin:-1px;
          overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0;
        }
        .fl-note { font-size:13px; line-height:1.6; color:rgba(245,241,234,.62); margin:22px 0 0; max-width:58ch; }
        .fl-note a { color:rgba(245,241,234,.8); text-underline-offset:3px; }

        .fl-done { margin:52px 0 0; }
        .fl-done-t { font-family:var(--font-serif); font-size:clamp(34px,5vw,60px); line-height:1.06; letter-spacing:-1.4px; margin:0 0 30px; }
        .fl-done .fl-submit { display:inline-block; margin:0; text-decoration:none; }
        .fl-done-n { font-size:16px; line-height:1.6; color:rgba(245,241,234,.72); margin:26px 0 0; max-width:52ch; }
        .fl-done-n + .fl-done-n { margin-top:10px; }
        .fl-done-n a { color:var(--gold-lt); text-underline-offset:3px; }
        /* The address sits on its own line, as written. */
        .fl-done-n a.mail { display:block; margin-top:4px; }
        .fl-err { color:#E8BDBD; font-size:15px; margin:20px 0 0; }
        .fl-field-err { color:#E8BDBD; font-size:14.5px; margin:9px 0 0; }
        /* ⚠ Only the privacy line sits under the button now. The required
           marking rests entirely on the asterisk and the screen-reader word on
           the Email label, so do not remove those. */
        /* A strip at the top, not a note beside a form 6,000px down the page.
           Someone bounced from the gate arrives at the hero, so the explanation
           has to be where they land, with a way to act on it. */
        .fl-expired {
          max-width:1180px; margin:0 auto; padding:16px 44px 18px;
          display:flex; align-items:baseline; justify-content:space-between;
          gap:24px; flex-wrap:wrap;
          border-top:1px solid var(--stone); border-bottom:1px solid var(--stone);
          background:rgba(192,151,74,.07);
        }
        .fl-expired p { margin:0; font-size:15.5px; line-height:1.55; color:var(--ink); max-width:66ch; }
        .fl-expired b { font-weight:600; }
        .fl-expired a {
          flex:none; font-size:15px; font-weight:600; color:var(--ink);
          text-underline-offset:4px; text-decoration-color:var(--gold);
        }
        .fl-signin { font-size:14.5px; color:rgba(245,241,234,.66); margin:40px 0 0; }
        .fl-signin a { color:var(--gold-lt); text-underline-offset:3px; }
        .fl-star { color:var(--gold-lt); }
        /* Visible to assistive technology only: the asterisk carries the
           meaning for sighted users, the word carries it for everyone else. */
        .fl-sr {
          position:absolute; width:1px; height:1px; padding:0; margin:-1px;
          overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0;
        }
        .fl-submit {
          margin:34px 0 0; padding:17px 34px; border:0; border-radius:2px; cursor:pointer;
          background:var(--bone); color:var(--ink); font-family:var(--font-sans);
          font-size:16px; font-weight:600; letter-spacing:.2px;
        }
        .fl-submit:hover:not(:disabled) { background:var(--gold-lt); }
        .fl-submit:disabled { opacity:.55; cursor:default; }
        /* The capture section runs into the footer, so its foot is trimmed:
           a full section's padding plus the footer's own would read as a gap
           rather than as breathing room. */
        .fl-sec.fl-last { padding-bottom:104px; }

        /* ── Responsive: recomposed, not scaled ──────────────────────────── */
        @media (max-width:900px) {
          .fl-in { padding:0 26px; }
          .fl-sec { padding:88px 0; }
          .fl-sec.tall { min-height:auto; padding:88px 0; }
          .fl { font-size:16.5px; }
          .fl-lead { font-size:18px; max-width:none; }
          .fl-mast { --mast-h:60px; padding:0 26px; }
          .fl-mast .mark img { height:22px; }
          .fl-mast .mark span { font-size:19px; }
          .fl-mast .who { display:none; }
          .fl-hero { min-height:calc(92svh - 60px); padding:52px 0 60px; }
          .fl-hero .mark { letter-spacing:-4px; }
          .fl-hero .ask { margin-top:40px; }
          .fl-board { margin:44px 0 0; }
          .fl-board .slot { gap:4px; }
          .fl-board .cell { width:22px; height:32px; font-size:14px; }
          .fl-resolve { margin:52px 0 0; letter-spacing:-1px; max-width:none; }
          .fl-lights { grid-template-columns:1fr; gap:22px; margin:40px 0 0; }
          .fl-light { padding-top:14px; }
          /* Stacked, so the lamps run top to bottom rather than left to right. */
          .fl-light::before { transform-origin:left center; }
          .fl-light .w { margin-bottom:8px; }
          .fl-light .q { font-size:16px; }
          .fl-sys { margin:40px 0 0; }
          .fl-stages { grid-template-columns:repeat(2,1fr); gap:16px; }
          .fl-stage .said { margin-top:5px; font-size:13.5px; }
          .fl-cross { margin:34px 0 0; }
          .fl-cross-row { grid-template-columns:1fr; gap:6px; padding:16px 0; }
          .fl-verdicts { gap:10px; margin:34px 0 0; }
          .fl-verdicts span { padding:12px 20px; }
          /* Stacked on a phone, so the descent is smaller or it reads as a gap. */
          .fl-verdicts span:nth-child(2) { transform:translateY(7px); }
          .fl-verdicts span:nth-child(3) { transform:translateY(15px); }
          .fl-bars { gap:8px; margin:38px 0 0; }
          .fl-bar b { font-size:12.5px; margin-top:12px; }
          .fl-bar span { font-size:11.5px; }
          .fl-thesis-2 { margin-top:44px; }
          .fl-inside { margin:30px 0 0; padding-top:18px; max-width:none; }
          .fl-inside li { font-size:14.5px; }
          .fl-form { margin:34px 0 0; }
          .fl-row { grid-template-columns:1fr; gap:0; }
          .fl-submit { width:100%; padding:19px 34px; }
          /* The whole label already toggles it, but the box itself should be
             comfortable to hit rather than merely possible. */
          .fl-expired { padding:14px 26px 16px; gap:10px; }
          .fl-expired p { font-size:14.5px; }
          .fl-expired a { font-size:14.5px; }
          .fl-signin { font-size:14px; margin-top:32px; }
          .fl-note { font-size:12.5px; margin-top:22px; max-width:none; }
          .fl-sec.fl-last { padding-bottom:72px; }
          .fl-done { margin:36px 0 0; }
          .fl-done .fl-submit { width:100%; text-align:center; }
        }
      `}</style>

      <div className="fl" ref={rootRef}>

        {/* The strip. Its own minimal header rather than the site Layout: this
            page is not in the nav and should not pretend to be. It scrolls away
            rather than sticking, so nothing has to invert across the dark
            sections below. */}
        <header className="fl-mast">
          <Link href="/" className="mark" aria-label="DAB Hands, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/crown-mark.webp" alt="" aria-hidden="true" />
            <span>DAB Hands</span>
          </Link>
          <span className="who">The Emotional Experience Method</span>
        </header>

        {turnedAway && (
          <div className="fl-expired" role="status">
            <p>
              <b>Your access has run out, or you are on a different device.</b>{' '}
              Put your email in again and you will go straight back.
            </p>
            <a href="#get">Get back in →</a>
          </div>
        )}

        {/* 01 · The opening. Sparse, and given the whole fold. */}
        <section className="fl-sec fl-hero">
          <div className="fl-in">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="crown" src="/images/crown-mark.webp" alt="" aria-hidden="true" />
            <h1 className="mark">FEEL</h1>
            <p className="sub">The Emotional Experience Method</p>
            <p className="ask">
              <span className="said">Your digital experience works.</span>
              <b>But does it make anyone feel anything?</b>
            </p>
          </div>
        </section>

        {/* 02 · The tension. Competence accumulates, then the line resolves. */}
        <section className="fl-sec fl-dark tall">
          <div className="fl-in">
            <div data-reveal>
              <p className="fl-kick">The sea of sameness</p>
              <p className="fl-lead" style={{ fontSize: 'clamp(19px,2.2vw,26px)', color: 'rgba(245,241,234,.86)', maxWidth: '30ch' }}>
                We’ve spent years optimising digital for usability, speed, conversion and efficiency.
                And it worked. The problem is, everyone else did too.
              </p>
            </div>
            <div className="fl-board" data-reveal>
              <p className="lead">Every experience is</p>
              {/* Decorative: the words are a texture, not content. The list
                  beneath carries the same idea for anyone not seeing it move. */}
              <div className="slot" aria-hidden="true">
                {flaps.map((ch, i) => (
                  <span className={`cell${ch === ' ' ? ' blank' : ''}`} key={i}>
                    {ch === ' ' ? '\u00a0' : ch}
                  </span>
                ))}
              </div>
              <p className="fl-sr">
                Functional, frictionless, optimised, effective, usable, responsive, accessible,
                tested, consistent, compliant, converting, competent, polished, efficient, reliable,
                seamless.
              </p>
            </div>
            <h2 className="fl-resolve" data-reveal>Optimisation has made sameness scalable.</h2>
          </div>
        </section>

        {/* 03 · The warning lights. Diagnostic framing, no trend claim. */}
        <section className="fl-sec">
          <div className="fl-in">
            <div data-reveal>
              <p className="fl-kick">The warning lights</p>
              <h2 style={{ fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1.08, maxWidth: '20ch' }}>
                When an experience works but fails to land, the symptoms eventually appear here.
              </h2>
            </div>
            <div className="fl-lights">
              {SIGNALS.map(([w, q]) => (
                <div className="fl-light" key={w} data-reveal tabIndex={0}>
                  <span className="w">{w}</span>
                  <span className="q">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 · The gap. */}
        <section className="fl-sec fl-paper">
          <div className="fl-in" data-reveal>
            <p className="fl-kick">The missing layer</p>
            <h2 style={{ fontSize: 'clamp(32px,4.8vw,64px)', lineHeight: 1.06, maxWidth: '17ch' }}>
              FEEL measures the layer most performance systems miss.
            </h2>
            <p className="fl-lead" style={{ marginTop: 34 }}>
              Not whether the experience works. Whether it creates the right feeling, in the right
              moment, for this brand.
            </p>
            <p className="fl-lead" style={{ marginTop: 20 }}>
              FEEL defines what the brand should feel like, what someone needs to feel at each stage,
              then examines the moments that create the experience.
            </p>
          </div>
        </section>

        {/* 05 · The system. The five stages, then the three questions that cut
            across all of them. Understandable without reading the copy. */}
        <section className="fl-sec">
          <div className="fl-in">
            <div data-reveal>
              <p className="fl-kick">The emotional funnel</p>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.1, maxWidth: '22ch' }}>
                Five stages, and three questions that run through all of them.
              </h2>
            </div>
            <div className="fl-sys">
              <div className="fl-stages">
                {STAGES.map((s, i) => (
                  <div className="fl-stage" key={s} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                    <b>{s}</b>
                    <span className="said">{STAGE_SUB[i]}</span>
                  </div>
                ))}
              </div>
              <div className="fl-cross">
                {CROSS.map(([q, a], i) => (
                  <div className="fl-cross-row" key={q} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
                    <span className="q">{q}</span>
                    <span className="a">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06 · The verdict, resolving into a pattern. */}
        <section className="fl-sec fl-dark">
          <div className="fl-in">
            <div data-reveal>
              <p className="fl-kick">The verdict</p>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.1, maxWidth: '22ch' }}>
                Every meaningful moment receives one simple verdict.
              </h2>
            </div>
            <div className="fl-verdicts" data-reveal>
              <span>Carries</span><span>Weakens</span><span>Breaks</span>
            </div>
            <div className="fl-bars" data-reveal>
              {STAGES.map((s, i) => (
                <div className="fl-bar" key={s}>
                  <span className={`fill ${PATTERN[i]}`} />
                  <b>{s}</b>
                  <span>{PATTERN[i]}</span>
                </div>
              ))}
            </div>
            <p className="fl-lead" style={{ marginTop: 46 }} data-reveal>
              The result is an Emotional Performance Pattern showing where the experience carries the
              brand, where feeling drains away, and where it breaks altogether.
            </p>
            <p className="fl-lead" style={{ marginTop: 20 }} data-reveal>
              FEEL then identifies which breaks matter most commercially, what to fix first, and what
              should change when you do.
            </p>
          </div>
        </section>

        {/* 07 · The thesis. The conclusion of an argument, given room. */}
        <section className="fl-sec fl-clay tall">
          <div className="fl-in">
            <h2 className="fl-thesis" data-reveal>Brands don’t need more emotion.</h2>
            <p className="fl-thesis-2" data-reveal>
              <span>They need the right feeling,</span>
              <span>in the right moment,</span>
              <span>carried all the way through.</span>
            </p>
          </div>
        </section>

        {/* 08 · Capture. */}
        <section className="fl-sec fl-dark fl-last" id="get">
          <div className="fl-in">
            <div className="fl-form-head" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="crown" src="/images/DabHands_crown_white.png" alt="" aria-hidden="true" />
              {!done && (
                <>
                  <p className="fl-kick" style={{ margin: '0 0 20px' }}>The full method</p>
                  <h2 style={{ fontSize: 'clamp(30px,4.2vw,54px)', lineHeight: 1.08, margin: 0, maxWidth: '16ch' }}>
                    How it actually works.
                  </h2>
                  {/* No page count here on purpose. The deck's length has moved
                      repeatedly, and a stale number on the gate would be a small
                      lie in the one place it matters most. */}
                  <p className="fl-lead" style={{ marginTop: 22 }}>
                    I’ve put together the methodology in a way you can get underneath the value of
                    it. Just a few details, and it’s yours to view and to decide whether the method
                    holds up.
                  </p>
                </>
              )}
            </div>

            {done ? (
              <div className="fl-done" role="status">
                <p className="fl-done-t">Thank you.</p>
                {/* A real navigation, not a client-side transition. The gate is
                    enforced in proxy.ts on the request itself, so entering it
                    has to be a request. eslint's preference for <Link> assumes
                    a route the client can reason about; this one it cannot. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className="fl-submit" href="/feel/method">Read the method →</a>
                <p className="fl-done-n">Hope you enjoy the thinking.</p>
                <p className="fl-done-n">
                  If any of it lands, or doesn’t, tell me.
                  <a className="mail" href="mailto:darren@dabhands.delivery">darren@dabhands.delivery</a>
                </p>
                <p className="fl-done-n">
                  And please take a look at my <Link href="/">website</Link>.
                </p>
              </div>
            ) : (
            <>
            <form className="fl-form" onSubmit={submit} noValidate data-reveal>
              <div className="fl-hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              <div className="fl-row">
                <div className="fl-field">
                  <label htmlFor="firstname">First name</label>
                  <input id="firstname" name="firstname" autoComplete="given-name"
                    value={values.firstname} onChange={set('firstname')} />
                </div>
                <div className="fl-field">
                  <label htmlFor="lastname">Surname</label>
                  <input id="lastname" name="lastname" autoComplete="family-name"
                    value={values.lastname} onChange={set('lastname')} />
                </div>
              </div>

              <div className="fl-row">
                <div className="fl-field">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" autoComplete="organization"
                    value={values.company} onChange={set('company')} />
                </div>
                <div className="fl-field">
                  <label htmlFor="jobtitle">Job title</label>
                  <input id="jobtitle" name="jobtitle" autoComplete="organization-title"
                    value={values.jobtitle} onChange={set('jobtitle')} />
                </div>
              </div>

              <div className="fl-field">
                <label htmlFor="email">
                  Email <span className="fl-star" aria-hidden="true">*</span>
                  <span className="fl-sr">required</span>
                </label>
                <input id="email" name="email" type="email" inputMode="email" autoComplete="email"
                  required aria-required="true"
                  value={values.email} onChange={set('email')}
                  aria-invalid={error?.field === 'email' ? true : undefined}
                  aria-describedby={error?.field === 'email' ? 'email-err' : undefined} />
                {error?.field === 'email' && (
                  <p className="fl-field-err" id="email-err" role="alert">{error.message}</p>
                )}
              </div>

              {/* A diagnostic question rather than a message box. It is the one
                  field whose answer changes how Darren replies, so it gets room
                  to hold a sentence. */}
              <div className="fl-field">
                <label htmlFor="issue">What are you trying to fix?</label>
                <textarea id="issue" name="issue" rows={2} placeholder="A sentence is plenty."
                  value={values.issue} onChange={set('issue')} />
              </div>

              {error && !error.field && <p className="fl-err" role="alert">{error.message}</p>}

              <button className="fl-submit" type="submit" disabled={busy}>
                {busy ? 'One moment…' : 'Read the method'}
              </button>

              {/* The transparency sits here as a statement, not a checkbox: the
                  delivery is the thing they just asked for, so a tick box to
                  permit it would be friction pretending to be consent. */}
              <p className="fl-note">
                Your details are used to send you the method and to follow up. Nothing is added to a
                mailing list and nothing is shared. We delete them 24 months after we last hear from
                you. <Link href="/privacy">Privacy</Link>
              </p>
            </form>
            </>
            )}

            {!done && (
              <p className="fl-signin">
                Already have access?{' '}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/feel/method">Sign in to the method.</a>
              </p>
            )}
          </div>
        </section>

      </div>

      <Footer variant="none" />
    </>
  );
}
