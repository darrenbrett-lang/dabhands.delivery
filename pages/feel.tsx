import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

/**
 * /feel — FEEL, the Emotional Experience Method.
 *
 * A full-screen HTML slide deck, not a scrolling page. Twenty-six slides on a
 * y-axis scroll-snap track: keyboard arrows, swipe, pips and a progress rail.
 *
 * Why scroll-snap and not a transform carousel: snapping is CSS, so the deck
 * works with JavaScript off, native touch scrolling handles swipe for free,
 * and no slide is ever hidden behind an opacity gate. Content that outgrows a
 * viewport lengthens its own slide rather than being clipped. The handover's
 * FadeUp warning applies here too: nothing on this page is hidden until told
 * otherwise.
 *
 * Unlisted on the same terms as /intro and /signal-to-noise: SeoMeta noindex,
 * an X-Robots-Tag route header in next.config.ts, and absent from the nav,
 * sitemap.xml and llms.txt. The source deck is marked private and confidential;
 * the route resolves so the link can be shared directly.
 *
 * Surface order is the design. Never let two dark slides touch:
 *   charcoal · bone · clay · bone · charcoal · bone · paper · bone · slate ·
 *   bone · charcoal · bone · bone · slate · bone · paper · bone · charcoal ·
 *   bone · clay · bone · slate · bone · charcoal · bone · charcoal
 *
 * Page-scoped <style> rather than globals.css: this is a self-contained
 * artefact, and globals.css does not hot-reload.
 */

type Tone = 'bone' | 'paper' | 'clay' | 'slate' | 'charcoal';

/**
 * The canonical Emotional Funnel. These five names are fixed and are the ONLY
 * five-stage structure in FEEL. They drive the funnel slide, the FEEL Map's
 * columns and the FEEL Pattern, so the deck cannot drift out of step with
 * itself. What changes underneath a stage is the Required Feeling, never the
 * stage name.
 *
 * ⚠ Do not introduce a second five-stage structure, and do not substitute
 * emotional words (Spark, Resonance, Reassurance and the like) for these.
 */
const STAGES = ['Notice', 'Relevance', 'Confidence', 'Commitment', 'Memory'];

const DIMENSIONS = [
  { label: 'Meaning', nums: ['01', '02', '03', '04', '05'] },
  { label: 'Confidence', nums: ['06', '07', '08', '09', '10'] },
  { label: 'Distinction', nums: ['11', '12', '13', '14', '15'] },
];

/**
 * The Score ring. The number in the centre IS the gold arc: the score is how
 * much of the experience carries the Required Feeling, so the three segments
 * sum to 100 and the legend maps onto them exactly.
 *
 * ⚠ This is the ONLY circle allowed anywhere in the brand. The gold dot and
 * halo were retired from the lockup twice (8 July, 17 August) and hard rule 2
 * still stands: no circles, dots or halos. The exception holds here because
 * the ring carries data rather than identity. It must never move nearer the
 * mark, into the masthead or footer, or down to favicon size, where a gold
 * circle on charcoal simply is the retired logo.
 */
const SCORE = 74;

const SEGMENTS = [
  { label: 'Carries', note: 'high value', value: 74, colour: 'var(--gold)' },
  { label: 'Weakens', note: 'watch', value: 18, colour: 'var(--clay)' },
  { label: 'Breaks', note: 'value at stake', value: 8, colour: 'var(--bone)' },
];

const RING = { r: 100, stroke: 18, gap: 4 };
const CIRC = 2 * Math.PI * RING.r;

/* An example pattern: the brand is noticed and feels relevant, then confidence
   thins and commitment breaks. Verdicts only; the stage names come from STAGES
   so the Pattern can never disagree with the Map. */
const PATTERN_VERDICTS: ('Carries' | 'Weakens' | 'Breaks')[] = [
  'Carries', 'Carries', 'Weakens', 'Breaks', 'Weakens',
];

const PATTERN = STAGES.map((stage, i) => ({ stage, verdict: PATTERN_VERDICTS[i] }));

const SLIDE_TONES: Tone[] = [
  // 01-05  the argument: the truth, the gap, the place, the missing spec
  'charcoal', 'bone', 'clay', 'bone', 'charcoal',
  // 06-10  the method: the Spec, the funnel, Required Feeling, the map, the verdict
  'bone', 'paper', 'bone', 'charcoal', 'bone',
  // 11-16  the evidence: pattern, judgement, priority, prediction, intervention, loop
  'slate', 'bone', 'paper', 'charcoal', 'bone', 'paper',
  // 17-20  the offer and the close
  'slate', 'bone', 'clay', 'charcoal',
];

const TOTAL = SLIDE_TONES.length;

const FS_NOOP = () => () => {};

const subscribeFullscreen = (cb: () => void) => {
  document.addEventListener('fullscreenchange', cb);
  document.addEventListener('webkitfullscreenchange', cb);
  return () => {
    document.removeEventListener('fullscreenchange', cb);
    document.removeEventListener('webkitfullscreenchange', cb);
  };
};

const readFullscreen = () =>
  Boolean(document.fullscreenElement || (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement);

const readFullscreenEnabled = () =>
  Boolean(document.fullscreenEnabled || (document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled);

const serverFalse = () => false;

export default function Feel() {
  // iOS Safari has no Fullscreen API for anything but video, so the control
  // hides itself there rather than offering a button that does nothing.
  const canFull = useSyncExternalStore(FS_NOOP, readFullscreenEnabled, serverFalse);
  const isFull = useSyncExternalStore(subscribeFullscreen, readFullscreen, serverFalse);
  const deckRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const flyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [index, setIndex] = useState(0);
  const [trayOpen, setTrayOpen] = useState(false);
  /** Tray labels are read from the slides themselves, so the strip can never
   *  drift out of sync with the copy on the page. */
  const [labels, setLabels] = useState<{ kicker: string; title: string }[]>([]);

  // Track the slide occupying the viewport. Threshold sits just over half so a
  // slide claims the counter only once it is actually the one being read.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const slides = Array.from(deck.querySelectorAll<HTMLElement>('.f-slide'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIndex(slides.indexOf(e.target as HTMLElement));
        });
      },
      { root: deck, threshold: 0.55 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const slides = Array.from(deck.querySelectorAll<HTMLElement>('.f-slide'));
    setLabels(
      slides.map((s) => ({
        kicker: s.querySelector('.f-kick')?.textContent?.trim() || s.dataset.label || '',
        title:
          s.querySelector('.f-h')?.textContent?.trim() ||
          s.querySelector('.f-cover .sub')?.textContent?.trim() ||
          '',
      })),
    );
  }, []);

  const toggleFull = useCallback(() => {
    const root = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> };
    const d = document as Document & { webkitExitFullscreen?: () => Promise<void>; webkitFullscreenElement?: Element };
    const on = Boolean(document.fullscreenElement || d.webkitFullscreenElement);
    const call = on
      ? (d.exitFullscreen?.bind(d) ?? d.webkitExitFullscreen?.bind(d))
      : (root.requestFullscreen?.bind(root) ?? root.webkitRequestFullscreen?.bind(root));
    // A rejected request is not worth surfacing: the browser refused the
    // gesture, and the deck is perfectly usable without it.
    void call?.()?.catch(() => {});
  }, []);

  const openTray = useCallback(() => {
    if (flyTimer.current) clearTimeout(flyTimer.current);
    setTrayOpen(true);
  }, []);

  // A close delay so the pointer can travel from the pips into the strip.
  const closeTray = useCallback((delay = 220) => {
    if (flyTimer.current) clearTimeout(flyTimer.current);
    flyTimer.current = setTimeout(() => setTrayOpen(false), delay);
  }, []);

  useEffect(() => () => { if (flyTimer.current) clearTimeout(flyTimer.current); }, []);

  // Open on the current slide rather than at the top of the strip.
  useEffect(() => {
    if (!trayOpen) return;
    const el = flyRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }, [trayOpen, index]);

  const go = useCallback((n: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const slides = Array.from(deck.querySelectorAll<HTMLElement>('.f-slide'));
    const target = slides[Math.max(0, Math.min(slides.length - 1, n))];
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Animate a neighbouring slide, jump to a distant one: a long smooth
    // scrollTo gets re-snapped mid-flight and strands the deck short of the
    // target. The jump itself also has to lift snapping for a frame, because
    // scroll-snap-stop: always refuses to let any scroll skip the snap points
    // in between. Verified: without this, a jump of twenty-one slides landed
    // 758px in, and rapid jumps stalled entirely.
    const far = Math.abs(target.offsetTop - deck.scrollTop) > deck.clientHeight * 1.5;
    if (reduced || far) {
      // Two things have to be lifted for one frame. scroll-snap-stop: always
      // refuses to let any scroll skip the snap points in between, and the
      // deck's CSS scroll-behavior: smooth animates a plain scrollTop
      // assignment too, so the "instant" jump was never instant.
      const snap = deck.style.scrollSnapType;
      const behave = deck.style.scrollBehavior;
      deck.style.scrollSnapType = 'none';
      deck.style.scrollBehavior = 'auto';
      deck.scrollTop = target.offsetTop;
      requestAnimationFrame(() => {
        deck.style.scrollSnapType = snap;
        deck.style.scrollBehavior = behave;
      });
    } else {
      deck.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    // Where the deck actually is, rather than where state thinks it is. The
    // observer lags an in-flight scroll by a frame or two, and stepping from a
    // stale index overshoots.
    const here = () => {
      const deck = deckRef.current;
      if (!deck) return 0;
      const slides = Array.from(deck.querySelectorAll<HTMLElement>('.f-slide'));
      let best = 0;
      let dist = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetTop - deck.scrollTop);
        if (d < dist) { dist = d; best = i; }
      });
      return best;
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        go(here() + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(here() - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        go(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        go(TOTAL - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFull();
      } else if (e.key === 'Escape') {
        closeTray(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, closeTray, toggleFull]);

  const tone = SLIDE_TONES[index] ?? 'bone';

  return (
    <>
      <SeoMeta
        title="FEEL · The Emotional Experience Method | DAB Hands"
        description="A performance layer for how brands make people feel in digital. The Emotional Spec, Required Feeling, the FEEL Map, the FEEL Score and the value at stake."
        path="/feel"
        image="/og-feel.png"
        noindex
      />

      <style>{`
        .f {
          --bone:#F5F1EA; --paper:#FBF8F3; --ink:#1F1F1D; --charcoal:#1F1F1D;
          --graphite:#5C5C58; --stone:#D8D3CB; --slate:#535B68; --clay:#A49786;
          --gold:#C0974A; --gold-deep:#7E5E27; --gold-lt:#EBD4A8;
          background:var(--bone); color:var(--ink);
          font-family:var(--font-sans); font-size:17px; line-height:1.6;
          -webkit-font-smoothing:antialiased;
        }

        /* ── The track ───────────────────────────────────────────────────── */
        .f-deck {
          height:100svh; overflow-y:auto; overflow-x:hidden;
          scroll-snap-type:y mandatory; scroll-behavior:smooth;
          scrollbar-width:none;
        }
        .f-deck::-webkit-scrollbar { display:none; }
        @media (prefers-reduced-motion: reduce) { .f-deck { scroll-behavior:auto; } }

        .f-slide {
          min-height:100svh; scroll-snap-align:start; scroll-snap-stop:always;
          display:flex; align-items:center;
          padding:104px 0 96px; position:relative;
        }
        .f-in { width:100%; max-width:1180px; margin:0 auto; padding:0 44px; }

        /* ── Surfaces. Ink on light, bone on dark. Never text-white. ─────── */
        .f-bone      { background:var(--bone);      color:var(--ink); }
        .f-paper     { background:var(--paper);     color:var(--ink); }
        .f-clay      { background:var(--clay);      color:var(--ink); }
        .f-slate     { background:var(--slate);     color:var(--bone); }
        .f-charcoal  { background:var(--charcoal);  color:var(--bone); }

        /* ── Type ────────────────────────────────────────────────────────── */
        .f-kick {
          font-size:11px; letter-spacing:2.8px; font-weight:600;
          text-transform:uppercase; color:var(--gold-deep); margin:0 0 26px;
        }
        .f-slate .f-kick, .f-charcoal .f-kick { color:var(--gold-lt); }
        .f-clay .f-kick { color:#3F312D; }

        .f-h {
          font-family:var(--font-serif); font-weight:400;
          font-size:52px; line-height:1.06; letter-spacing:-1.2px;
          margin:0; max-width:20ch;
        }
        .f-h.wide { max-width:26ch; }
        /* Soft returns. Every two-line secondary line breaks at a sense point
           (a sentence, a clause, a comma) rather than wherever the measure runs
           out. Nine used to end on a two-word stub and several split a noun
           phrase ("from first / feeling", "employee / behaviour"). Desktop
           only: on a phone the measure is too narrow to honour these, and
           forcing them there strands single words instead. */
        @media (min-width:861px) { .f-h .brk, .f-lede .brk, .f-close-line .brk { display:block; } }
        .f-lede {
          font-size:20px; line-height:1.55; margin:24px 0 0; max-width:62ch;
          color:var(--graphite);
        }
        .f-slate .f-lede, .f-charcoal .f-lede { color:rgba(245,241,234,.78); }
        .f-clay .f-lede { color:#3F312D; }
        .f-body { font-size:17px; line-height:1.62; margin:22px 0 0; max-width:64ch; color:var(--graphite); }
        .f-slate .f-body, .f-charcoal .f-body { color:rgba(245,241,234,.78); }
        .f-clay .f-body { color:#3F312D; }

        /* The closing measure under a module: serif, one step up from body,
           body colour, no gold and no italics. The site's closing-line rule. */
        .f-close-line {
          font-family:var(--font-serif); font-size:22px; line-height:1.34;
          margin:44px 0 0; padding-top:22px; border-top:1px solid var(--stone);
          max-width:64ch;
        }
        .f-slate .f-close-line, .f-charcoal .f-close-line { border-top-color:rgba(245,241,234,.22); }
        .f-clay .f-close-line { border-top-color:rgba(63,49,45,.28); }

        .f-rule { width:56px; height:2px; background:var(--gold); border:0; margin:0 0 26px; }

        /* ── Shared blocks ───────────────────────────────────────────────── */
        .f-cols { display:grid; gap:28px; margin:52px 0 0; }
        .f-cols.c2 { grid-template-columns:repeat(2,1fr); }
        .f-cols.c3 { grid-template-columns:repeat(3,1fr); }
        .f-cols.c4 { grid-template-columns:repeat(4,1fr); }
        .f-cols.c5 { grid-template-columns:repeat(5,1fr); gap:20px; }
        .f-cols.c6 { grid-template-columns:repeat(3,1fr); }

        .f-col { border-top:1px solid var(--stone); padding-top:16px; }
        .f-slate .f-col, .f-charcoal .f-col { border-top-color:rgba(245,241,234,.24); }
        .f-clay .f-col { border-top-color:rgba(63,49,45,.3); }
        .f-col h3 {
          font-size:12px; letter-spacing:1.6px; text-transform:uppercase;
          font-weight:600; margin:0 0 10px;
        }
        .f-col p { font-size:15px; line-height:1.5; margin:0; color:var(--graphite); }
        .f-slate .f-col p, .f-charcoal .f-col p { color:rgba(245,241,234,.74); }
        .f-clay .f-col p { color:#3F312D; }
        .f-col.is-feel { border-top-color:var(--gold); }
        .f-charcoal .f-col.is-feel, .f-slate .f-col.is-feel { border-top-color:var(--gold-lt); }
        .f-col.is-feel h3 { color:var(--gold-deep); }
        .f-charcoal .f-col.is-feel h3, .f-slate .f-col.is-feel h3 { color:var(--gold-lt); }
        .f-col .n {
          display:block; font-family:var(--font-serif); font-size:26px;
          line-height:1; margin:0 0 10px; color:var(--gold-deep);
        }
        .f-slate .f-col .n, .f-charcoal .f-col .n { color:var(--gold-lt); }
        .f-clay .f-col .n { color:#3F312D; }

        /* Chips: a row of short nouns. */
        .f-chips { display:flex; flex-wrap:wrap; gap:10px; margin:44px 0 0; }
        .f-chip {
          font-size:14px; letter-spacing:.2px; padding:9px 18px;
          border:1px solid var(--stone); border-radius:999px;
        }
        .f-slate .f-chip, .f-charcoal .f-chip { border-color:rgba(245,241,234,.3); }
        .f-clay .f-chip { border-color:rgba(63,49,45,.32); }
        .f-chip.lead { border-color:var(--gold); }
        /* The five words are one worked example, not the vocabulary, so they
           are labelled as such. */
        .f-lab.f-lab-chips { margin:44px 0 14px; }
        .f-chips.tight { margin:0; }

        /* ── Slide 06: the methods table ─────────────────────────────────── */
        .f-methods { margin:48px 0 0; }
        .f-method {
          display:grid; grid-template-columns:230px 1fr; gap:24px;
          padding:17px 0; border-top:1px solid var(--stone); align-items:baseline;
        }
        .f-method:last-child { border-bottom:1px solid var(--stone); }
        .f-method .m {
          font-family:var(--font-serif); font-size:26px; line-height:1.1;
        }
        .f-method .q { font-size:17px; color:var(--graphite); }
        .f-method.is-feel { border-top-color:var(--gold); border-bottom-color:var(--gold); }
        .f-method.is-feel .m { color:var(--gold-deep); }
        .f-method.is-feel .q { color:var(--ink); font-weight:500; }

        /* ── Slide 07: the funnels ───────────────────────────────────────── */
        .f-funnels { display:grid; grid-template-columns:.72fr 1.28fr; gap:56px; margin:48px 0 0; }
        .f-old li {
          list-style:none; padding:11px 0; font-size:16px; color:var(--graphite);
          border-bottom:1px solid var(--stone); text-decoration:line-through;
          text-decoration-color:var(--clay);
        }
        .f-old ul { margin:0; padding:0; }
        .f-new { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
        /* The funnel no longer sits beside a struck-through old model, so it
           takes the full measure. */
        .f-new.f-new-wide { margin:48px 0 0; gap:24px; }
        .f-new.f-new-wide .step b { font-size:17px; margin-bottom:9px; }
        .f-new.f-new-wide .step span { font-size:15.5px; }
        .f-new .step { border-top:2px solid var(--gold); padding-top:14px; }
        .f-new .step b { display:block; font-size:15px; letter-spacing:.2px; margin:0 0 7px; font-weight:600; }
        .f-new .step span { font-size:14px; line-height:1.45; color:var(--graphite); display:block; }
        .f-lab { font-size:11px; letter-spacing:2.4px; text-transform:uppercase; font-weight:600; color:var(--graphite); margin:0 0 14px; }

        /* ── Slide 08 / 20: the chain ────────────────────────────────────── */
        .f-chain { display:grid; grid-auto-flow:column; grid-auto-columns:1fr; gap:0; margin:52px 0 0; }
        .f-link { position:relative; padding:0 26px 0 0; }
        .f-link:first-child { }
        .f-link .t { font-family:var(--font-serif); font-size:23px; line-height:1.15; display:block; margin:0 0 8px; }
        .f-link .d { font-size:14px; line-height:1.45; color:var(--graphite); }
        .f-slate .f-link .d, .f-charcoal .f-link .d { color:rgba(245,241,234,.74); }
        .f-clay .f-link .d { color:#3F312D; }
        .f-link::before {
          content:""; display:block; height:2px; background:var(--stone);
          margin:0 0 16px;
        }
        .f-link.on::before { background:var(--gold); }
        .f-clay .f-link::before { background:rgba(63,49,45,.3); }
        .f-clay .f-link.on::before { background:var(--ink); }

        /* ── Slide 9: the progression ────────────────────────────────────
           The three are a sequence, not a list, so one line travels through
           all of them, gains gold as it goes and arrives at an arrowhead.
           Each step hangs from that line on a tick, and the ticks and numerals
           strengthen left to right, so the eye is given a direction. Ticks
           rather than dots: dots are the retired lockup device. */
        .f-steps {
          position:relative; margin:56px 0 0; padding-top:36px;
          display:grid; grid-template-columns:repeat(3,1fr); gap:28px;
        }
        /* ⚠ Tone-aware. Built first for the slate core-theory slide in light
           gold, which measured 1.37:1 on the paper arc slide and was simply
           not visible. Light surfaces take the deep gold, dark surfaces the
           light one, exactly like every other accent in the deck. */
        .f-steps::before {
          content:""; position:absolute; top:0; left:0; right:22px; height:1px;
          background:linear-gradient(90deg,
            rgba(126,94,39,.22) 0%, rgba(126,94,39,.6) 52%, rgba(126,94,39,1) 100%);
        }
        .f-slate .f-steps::before, .f-charcoal .f-steps::before {
          background:linear-gradient(90deg,
            rgba(235,212,168,.20) 0%, rgba(235,212,168,.55) 52%, rgba(235,212,168,1) 100%);
        }
        .f-steps-arrow {
          position:absolute; top:0; right:0; width:0; height:0;
          transform:translateY(-4px);
          border-left:9px solid var(--gold-deep);
          border-top:4.5px solid transparent;
          border-bottom:4.5px solid transparent;
        }
        .f-slate .f-steps-arrow, .f-charcoal .f-steps-arrow { border-left-color:var(--gold-lt); }
        .f-step { position:relative; }
        .f-step::before {
          content:""; position:absolute; top:-36px; left:0; width:1px; height:36px;
          background:var(--gold-deep); opacity:.3;
        }
        .f-slate .f-step::before, .f-charcoal .f-step::before { background:var(--gold-lt); opacity:.34; }
        .f-step:nth-child(2)::before { opacity:.62; }
        .f-step:nth-child(3)::before { opacity:1; }
        .f-step:nth-child(4)::before { opacity:1; }
        .f-step .n {
          display:block; font-family:var(--font-serif); font-size:30px;
          line-height:1; margin:0 0 12px; color:var(--gold-deep); opacity:.6;
        }
        /* Floor of ~3:1 even on the faintest step: the numeral carries the
           order, so it is content, not decoration. */
        .f-slate .f-step .n, .f-charcoal .f-step .n { color:var(--gold-lt); opacity:.68; }
        .f-slate .f-step:nth-child(2) .n, .f-charcoal .f-step:nth-child(2) .n { opacity:.84; }
        .f-step:nth-child(2) .n { opacity:.78; }
        .f-step:nth-child(3) .n { opacity:1; }
        .f-step:nth-child(4) .n { opacity:1; }
        .f-step p { font-size:16px; line-height:1.5; margin:0; color:var(--graphite); }
        .f-slate .f-step p, .f-charcoal .f-step p { color:rgba(245,241,234,.78); }

        /* ── v1.1 modules ────────────────────────────────────────────────
           The Emotional Spec / Required Feeling layer. Four devices, all built
           from the existing system: a converging spec, a two-sided comparison,
           the equation, and the method ladder. */

        /* The many things a spec is expressed through, arriving at one word. */
        .f-spec { display:flex; flex-wrap:wrap; align-items:center; gap:9px; margin:40px 0 0; }
        .f-spec .m {
          font-size:13.5px; letter-spacing:.2px; padding:7px 15px;
          border:1px solid var(--stone); border-radius:999px;
        }
        .f-spec .to { color:var(--gold-deep); font-size:17px; margin:0 4px; }
        .f-spec .feeling {
          font-family:var(--font-serif); font-size:34px; line-height:1;
          color:var(--gold-deep); letter-spacing:-.5px;
        }
        .f-slate .f-spec .m, .f-charcoal .f-spec .m { border-color:rgba(245,241,234,.3); }
        .f-slate .f-spec .to, .f-charcoal .f-spec .to,
        .f-slate .f-spec .feeling, .f-charcoal .f-spec .feeling { color:var(--gold-lt); }

        /* Two sides of a distinction, set against each other. */
        .f-vs { display:grid; grid-template-columns:1fr 1fr; gap:40px; margin:48px 0 0; }
        .f-vs > div { border-top:2px solid var(--stone); padding-top:18px; }
        .f-vs > div.is-feel { border-top-color:var(--gold); }
        .f-slate .f-vs > div { border-top-color:rgba(245,241,234,.28); }
        .f-slate .f-vs > div.is-feel { border-top-color:var(--gold-lt); }
        .f-vs .lab {
          font-size:11px; letter-spacing:2.4px; text-transform:uppercase;
          font-weight:600; margin:0 0 14px; color:var(--graphite);
        }
        .f-slate .f-vs .lab, .f-charcoal .f-vs .lab { color:rgba(245,241,234,.7); }
        .f-vs > div.is-feel .lab { color:var(--gold-deep); }
        .f-slate .f-vs > div.is-feel .lab { color:var(--gold-lt); }
        .f-vs .said { font-family:var(--font-serif); font-size:27px; line-height:1.24; margin:0; }
        .f-vs .note { font-size:15px; line-height:1.5; margin:14px 0 0; color:var(--graphite); }
        .f-slate .f-vs .note, .f-charcoal .f-vs .note { color:rgba(245,241,234,.74); }

        /* The equation. The one place the method is stated as a formula, so it
           is given room and the result is the only gold thing on the slide. */
        .f-equation {
          display:flex; flex-wrap:wrap; align-items:stretch; gap:0;
          margin:50px 0 0; border-top:1px solid var(--stone); padding-top:26px;
        }
        .f-slate .f-equation, .f-charcoal .f-equation { border-top-color:rgba(245,241,234,.24); }
        .f-equation .term { flex:1 1 200px; padding-right:26px; }
        /* The result carries the longest phrase, so it gets the wider column. */
        .f-equation .term.result { flex:1.45 1 250px; padding-right:0; }
        .f-equation .term .t {
          display:block; font-family:var(--font-serif); font-size:26px;
          line-height:1.14; margin:0 0 8px;
        }
        .f-equation .term .d { font-size:14px; line-height:1.45; color:var(--graphite); }
        .f-slate .f-equation .term .d, .f-charcoal .f-equation .term .d { color:rgba(245,241,234,.72); }
        /* The operators sit on the title line, not centred between title and
           note, or they read as belonging to the small text. */
        .f-equation .op {
          flex:0 0 auto; display:flex; align-items:flex-start; padding:5px 26px 0 0;
          font-size:22px; color:var(--gold-deep);
        }
        .f-slate .f-equation .op, .f-charcoal .f-equation .op { color:var(--gold-lt); }
        .f-equation .term.result .t { color:var(--gold-deep); }
        .f-slate .f-equation .term.result .t, .f-charcoal .f-equation .term.result .t { color:var(--gold-lt); }

        /* The method, top to bottom, on one spine. */
        .f-ladder { position:relative; margin:40px 0 0; padding-left:26px; display:grid; gap:11px; }
        .f-ladder::before {
          content:""; position:absolute; left:0; top:7px; bottom:7px; width:1px;
          background:linear-gradient(180deg,
            rgba(126,94,39,.25) 0%, rgba(126,94,39,.7) 55%, rgba(126,94,39,1) 100%);
        }
        .f-paper .f-ladder::before, .f-bone .f-ladder::before { background:linear-gradient(180deg,
            rgba(126,94,39,.25) 0%, rgba(126,94,39,.7) 55%, rgba(126,94,39,1) 100%); }
        .f-rung { position:relative; display:grid; grid-template-columns:264px 1fr; gap:22px; align-items:baseline; }
        .f-rung::before {
          content:""; position:absolute; left:-26px; top:11px; width:18px; height:1px;
          background:var(--gold-deep); opacity:.5;
        }
        .f-rung .t {
          font-family:var(--font-serif); font-size:21px; line-height:1.2;
        }
        .f-rung .q { font-size:15px; line-height:1.5; color:var(--graphite); }
        .f-rung.is-out .t { color:var(--gold-deep); }

        /* Both directions of travel, stated as a pair. */
        .f-both { display:grid; grid-template-columns:1fr 1fr; gap:36px; margin:34px 0 0; }
        .f-both div { border-top:1px solid var(--stone); padding-top:14px; }
        .f-both b { display:block; font-size:11px; letter-spacing:2.2px; text-transform:uppercase; font-weight:600; color:var(--gold-deep); margin:0 0 8px; }
        .f-both span { font-size:15.5px; line-height:1.5; color:var(--graphite); }

        /* The arc: the progression device carrying words instead of numerals. */
        .f-steps.four { grid-template-columns:repeat(4,1fr); gap:24px; }

        /* ── v1.3 modules ────────────────────────────────────────────────
           A consolidation pass, so these exist to let one slide hold a main
           argument plus its qualification without a second slide. */

        /* A footnote. Small, quiet, properly attributed. */
        .f-cite {
          font-size:12.5px; line-height:1.5; margin:26px 0 0; max-width:70ch;
          color:var(--graphite); padding-top:12px; border-top:1px solid var(--stone);
        }
        .f-slate .f-cite, .f-charcoal .f-cite { color:rgba(245,241,234,.62); border-top-color:rgba(245,241,234,.2); }
        .f-clay .f-cite { color:#3F312D; border-top-color:rgba(63,49,45,.28); }
        .f-cite b { font-weight:600; }

        /* A line that has to land. Bigger than the closing measure, alone. */
        .f-close-line.hero {
          font-size:34px; line-height:1.22; max-width:24ch;
          margin-top:46px; padding-top:26px;
        }

        /* A qualification that sits beneath its argument rather than taking a
           slide of its own. The consolidation rule, expressed as a component. */
        .f-under { display:grid; grid-template-columns:1fr 1fr; gap:36px; margin:34px 0 0; }
        .f-under > div { border-top:1px solid var(--stone); padding-top:14px; }
        .f-slate .f-under > div, .f-charcoal .f-under > div { border-top-color:rgba(245,241,234,.24); }
        .f-clay .f-under > div { border-top-color:rgba(63,49,45,.3); }
        .f-under b {
          display:block; font-size:10.5px; letter-spacing:2px; text-transform:uppercase;
          font-weight:600; color:var(--gold-deep); margin:0 0 8px;
        }
        .f-slate .f-under b, .f-charcoal .f-under b { color:var(--gold-lt); }
        .f-clay .f-under b { color:#3F312D; }
        .f-under span { font-size:15px; line-height:1.5; color:var(--graphite); display:block; }
        .f-slate .f-under span, .f-charcoal .f-under span { color:rgba(245,241,234,.74); }
        .f-clay .f-under span { color:#3F312D; }

        /* Pattern beside Score: the hierarchy of the slide is the layout. */
        .f-ps { display:grid; grid-template-columns:1.55fr .75fr; gap:56px; align-items:end; margin:42px 0 0; }
        .f-ps .f-pattern { margin:0; }
        .f-ps .f-ring { width:170px; height:170px; }
        .f-ps .f-ring .num { font-size:52px; letter-spacing:-1.2px; }
        .f-ps .f-ring .num small { font-size:8.5px; margin-top:8px; }

        /* ── Slide 11: the FEEL Map ──────────────────────────────────────── */
        .f-map { margin:44px 0 0; }
        .f-map-head, .f-map-row { display:grid; grid-template-columns:150px 1fr; gap:24px; align-items:center; }
        .f-map-head { padding:0 0 12px; }
        .f-map-head .cells { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
        .f-map-head .cells span {
          font-size:11px; letter-spacing:2px; text-transform:uppercase;
          font-weight:600; color:var(--gold-lt);
        }
        .f-map-row { padding:15px 0; border-top:1px solid rgba(245,241,234,.24); }
        .f-map-row:last-child { border-bottom:1px solid rgba(245,241,234,.24); }
        .f-map-lab { font-family:var(--font-serif); font-size:24px; }
        .f-map-cells { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
        .f-map-cell {
          font-family:var(--font-serif); font-size:22px; color:rgba(245,241,234,.9);
          border:1px solid rgba(245,241,234,.2); border-radius:3px;
          padding:12px 0; text-align:center;
        }
        .f-map-cell i { display:none; }

        /* ── Slide 13: the verdicts ──────────────────────────────────────── */
        .f-verdict { border-left:3px solid var(--stone); padding:4px 0 4px 20px; }
        .f-verdict h3 { font-family:var(--font-serif); font-size:30px; line-height:1.1; margin:0 0 10px; font-weight:400; text-transform:none; letter-spacing:0; }
        .f-verdict.v1 { border-left-color:var(--gold); }
        .f-verdict.v2 { border-left-color:var(--clay); }
        .f-verdict.v3 { border-left-color:var(--ink); }

        /* ── Slide 14: the Score ring ────────────────────────────────────
           The one sanctioned circle in the brand: a gauge, not a mark. See the
           note on SEGMENTS. Swatches in the legend stay SQUARE on purpose,
           because three gold dots in a column is the retired device. */
        .f-score { display:grid; grid-template-columns:auto 1fr; gap:64px; align-items:center; margin:48px 0 0; }
        .f-ring { position:relative; width:248px; height:248px; flex:none; }
        .f-ring svg { width:100%; height:100%; display:block; overflow:visible; }
        .f-ring .track { fill:none; stroke:rgba(245,241,234,.16); }
        .f-ring circle { stroke-linecap:butt; }
        .f-ring .num {
          position:absolute; inset:0; margin:0;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          font-family:var(--font-serif); font-size:76px; line-height:.9;
          letter-spacing:-2px;
        }
        .f-ring .num small {
          font-family:var(--font-sans); font-size:9.5px; letter-spacing:2.4px;
          text-transform:uppercase; font-weight:600; color:var(--gold-lt); margin:10px 0 0;
        }
        .f-legend { display:grid; gap:14px; }
        .f-legend div { display:grid; grid-template-columns:16px 1fr; gap:14px; align-items:baseline; font-size:16px; }
        .f-legend i { display:block; height:16px; width:16px; border-radius:2px; }

        /* ── Slide 15: the pattern ───────────────────────────────────────── */
        .f-pattern { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin:48px 0 0; align-items:end; }
        .f-bar { text-align:left; }
        .f-bar .fill { display:block; border-radius:2px; }
        .f-bar .fill.Carries { height:132px; background:var(--gold); }
        .f-bar .fill.Weakens { height:74px; background:var(--clay); }
        .f-bar .fill.Breaks  { height:26px; background:var(--ink); }
        .f-bar b { display:block; font-size:14px; font-weight:600; margin:16px 0 3px; }
        .f-bar span { font-size:13px; color:var(--graphite); }

        /* ── Slide 19: the model ─────────────────────────────────────────── */
        .f-model { display:flex; flex-wrap:wrap; align-items:stretch; gap:0; margin:48px 0 0; }
        .f-term { flex:1 1 0; min-width:170px; border-top:2px solid var(--stone); padding:16px 22px 0 0; }
        .f-term b { display:block; font-family:var(--font-serif); font-size:21px; font-weight:400; margin:0 0 7px; }
        .f-term span { font-size:14px; line-height:1.45; color:var(--graphite); }
        .f-op { flex:0 0 44px; display:flex; align-items:center; justify-content:center; font-size:19px; color:var(--gold-deep); padding-right:22px; }
        .f-term.total { border-top-color:var(--gold); }

        /* ── Slide 22: the stack ─────────────────────────────────────────── */
        .f-stack { display:flex; flex-wrap:wrap; align-items:center; gap:12px; margin:48px 0 0; }
        .f-stack .core {
          font-family:var(--font-serif); font-size:30px; padding:12px 30px;
          border:1px solid var(--gold-lt); border-radius:999px; color:var(--gold-lt);
        }

        /* ── The full stop ───────────────────────────────────────────────── */
        .f-stop .f-kick { margin-bottom:30px; }
        .f-stop .crown { height:58px; width:auto; display:block; margin:0 0 34px; user-select:none; }
        .f-stop .f-h { font-size:44px; line-height:1.14; letter-spacing:-.8px; max-width:24ch; }

        /* ── Cover and close ─────────────────────────────────────────────── */
        .f-cover { text-align:left; }
        .f-cover .crown { height:64px; width:auto; display:block; margin:0 0 40px; }
        .f-cover h1 {
          font-family:var(--font-serif); font-weight:400; font-size:150px;
          line-height:.86; letter-spacing:-6px; margin:0;
        }
        .f-cover .sub { font-family:var(--font-serif); font-size:34px; line-height:1.18; margin:26px 0 0; color:var(--gold-lt); }
        /* One line wherever it fits. The measure only applies once it has to
           wrap, which is the same treatment the /intro hero subline uses. */
        .f-cover .say { font-size:19px; line-height:1.55; margin:26px 0 0; max-width:46ch; color:rgba(245,241,234,.78); }
        @media (min-width:861px) { .f-cover .say { max-width:none; white-space:nowrap; } }
        .f-cover .by { font-size:11px; letter-spacing:2.8px; text-transform:uppercase; font-weight:600; margin:56px 0 0; color:rgba(245,241,234,.6); }

        /* The close opens on the statement, then asks for the meeting. */
        .f-stop-line {
          font-family:var(--font-serif); font-size:34px; line-height:1.2;
          color:var(--gold-lt); margin:0 0 26px; max-width:24ch; letter-spacing:-.5px;
        }

        .f-cta {
          display:inline-block; margin:40px 0 0; padding:15px 30px;
          background:var(--bone); color:var(--ink); text-decoration:none;
          font-size:15px; font-weight:600; letter-spacing:.2px; border-radius:2px;
        }
        .f-cta:hover { background:var(--gold-lt); }
        .f-private { font-size:12px; letter-spacing:.2px; color:rgba(245,241,234,.5); margin:52px 0 0; }

        /* ── Chrome: pips, counter, controls ─────────────────────────────── */
        .f-chrome {
          position:fixed; inset:0; pointer-events:none; z-index:20;
          --ctrl:.54; --pip:.34; --note:.46;
        }
        .f-chrome[data-tone="charcoal"] { --ctrl:.42; --pip:.24; --note:.36; }
        .f-chrome[data-tone="slate"]    { --ctrl:.63; --pip:.32; --note:.54; }
        .f-chrome[data-tone="clay"]     { --ctrl:.66; --pip:.44; --note:.58; }
        .f-chrome [data-on] { pointer-events:auto; }

        .f-mast {
          position:absolute; top:0; left:0; right:0;
          display:flex; justify-content:space-between; align-items:center;
          padding:26px 44px; font-size:11px; letter-spacing:2.8px;
          text-transform:uppercase; font-weight:600;
        }
        /* The site lockup: the drawn crown beside the serif wordmark. Two files
           rather than a filter, because the header crown and the footer crown
           are separate drawings. Only one is ever displayed. */
        .f-mast .mark {
          display:flex; align-items:center; gap:10px;
          font-family:var(--font-serif); font-size:19px; letter-spacing:-.01em;
          text-transform:none; font-weight:400;
        }
        .f-mast .crown { height:26px; width:auto; display:none; user-select:none; }
        .f-chrome[data-tone="bone"] .crown-dark,
        .f-chrome[data-tone="paper"] .crown-dark,
        .f-chrome[data-tone="clay"] .crown-dark { display:block; }
        .f-chrome[data-tone="charcoal"] .crown-light,
        .f-chrome[data-tone="slate"] .crown-light { display:block; }

        .f-pips { position:absolute; right:20px; top:50%; transform:translateY(-50%); display:grid; gap:7px; }
        .f-tray .f-pips { position:static; transform:none; }
        .f-pips button {
          display:block; width:7px; height:7px; padding:0; border:0; border-radius:999px;
          background:currentColor; opacity:var(--pip); cursor:pointer;
          transition:opacity .2s ease, height .2s ease;
        }
        .f-pips button[aria-current="true"] { opacity:1; height:20px; background:var(--gold); }
        .f-pips button:hover { opacity:.8; }
        .f-pips button:focus-visible { outline:2px solid var(--gold); outline-offset:3px; }

        /* ── The tray ────────────────────────────────────────────────────
           Approaching the pips opens a film strip of the whole deck beside
           them: every slide painted in its own surface, scrollable, click to
           land. The zone is kept tight around the pip rail because it takes
           pointer events, and a wheel forwarder keeps the deck scrolling
           under it so the right edge is never a dead strip. */
        /* The tray sizes itself to the pip rail (the pips sit in normal flow
           inside it) so the hover zone actually covers them. Absolutely
           positioned pips collapsed the box to zero height, and nothing could
           be hovered. */
        .f-tray {
          position:absolute; right:0; top:50%; transform:translateY(-50%);
          display:flex; align-items:center; justify-content:flex-end;
          padding:0 20px 0 44px;
        }
        .f-tray-zone { position:absolute; top:-36px; right:0; bottom:-36px; left:0; }

        .f-fly {
          position:absolute; right:44px; top:50%; transform:translateY(-50%);
          width:266px; max-height:min(74svh, 580px);
          overflow-y:auto; overscroll-behavior:contain;
          background:#141413; border:1px solid rgba(245,241,234,.14); border-radius:4px;
          box-shadow:0 18px 52px rgba(0,0,0,.45);
          padding:8px; display:grid; gap:6px;
          opacity:0; visibility:hidden; translate:10px 0;
          transition:opacity .18s ease, translate .18s ease, visibility .18s;
          scrollbar-width:thin; scrollbar-color:rgba(245,241,234,.24) transparent;
        }
        .f-tray:hover .f-fly,
        .f-tray[data-open="true"] .f-fly { opacity:1; visibility:visible; translate:0 0; }
        @media (prefers-reduced-motion: reduce) { .f-fly { transition:none; } }

        .f-mini {
          display:block; width:100%; text-align:left; cursor:pointer;
          border:1px solid transparent; border-radius:3px; padding:11px 12px 12px;
          position:relative; font-family:var(--font-sans);
        }
        .f-mini .mk { font-size:8px; letter-spacing:1.4px; text-transform:uppercase; font-weight:700; display:block; }
        .f-mini .mt {
          font-family:var(--font-serif); font-size:13px; line-height:1.22;
          margin:5px 0 0; display:-webkit-box; -webkit-line-clamp:2;
          -webkit-box-orient:vertical; overflow:hidden;
        }
        .f-mini .mn {
          position:absolute; top:10px; right:11px; font-size:9px;
          letter-spacing:.6px; font-weight:700; opacity:.5;
          font-variant-numeric:tabular-nums;
        }
        .f-mini[data-tone="bone"]     { background:var(--bone);     color:var(--ink); }
        .f-mini[data-tone="paper"]    { background:var(--paper);    color:var(--ink); }
        .f-mini[data-tone="clay"]     { background:var(--clay);     color:#2A211E; }
        .f-mini[data-tone="slate"]    { background:var(--slate);    color:var(--bone); }
        .f-mini[data-tone="charcoal"] { background:#242422;         color:var(--bone); }
        .f-mini[data-tone="bone"] .mk, .f-mini[data-tone="paper"] .mk { color:var(--gold-deep); }
        .f-mini[data-tone="clay"] .mk { color:#3F312D; }
        .f-mini[data-tone="slate"] .mk, .f-mini[data-tone="charcoal"] .mk { color:var(--gold-lt); }
        .f-mini:hover { border-color:var(--gold); }
        .f-mini[data-active="true"] { border-color:var(--gold); box-shadow:0 0 0 1px var(--gold); }

        .f-count {
          position:absolute; left:44px; bottom:26px;
          font-size:11px; letter-spacing:2.4px; font-weight:600;
          font-variant-numeric:tabular-nums;
        }
        .f-count b { font-weight:600; }
        .f-count .of { opacity:.5; }

        /* The standing notice. It rides the fixed chrome so it appears on every
           slide without twenty-six copies in the markup, and recolours with the
           surface beneath it. Print gets a per-page copy via .f-slide::after,
           because the chrome itself is hidden there. */
        .f-conf {
          position:absolute; left:0; right:0; bottom:27px; margin:0;
          text-align:center; font-size:9.5px; letter-spacing:1.1px;
          text-transform:uppercase; font-weight:500; opacity:var(--note);
        }

        .f-arrows { position:absolute; right:44px; bottom:22px; display:flex; gap:8px; }
        .f-arrows button {
          width:38px; height:38px; border-radius:999px; cursor:pointer;
          border:1px solid currentColor; background:transparent; color:inherit;
          opacity:var(--ctrl); font-size:14px; line-height:1;
          display:flex; align-items:center; justify-content:center;
        }
        .f-arrows button:hover:not(:disabled) { opacity:1; }
        .f-arrows button:disabled { opacity:calc(var(--ctrl) * .3); cursor:default; }
        .f-arrows button:focus-visible { outline:2px solid var(--gold); outline-offset:3px; }
        .f-arrows .full { margin-right:8px; }
        .f-arrows .full[aria-pressed="true"] { opacity:.9; border-color:var(--gold); color:var(--gold); }

        /* Chrome inverts with the surface beneath it. */
        .f-chrome[data-tone="charcoal"], .f-chrome[data-tone="slate"] { color:var(--bone); }
        .f-chrome[data-tone="bone"], .f-chrome[data-tone="paper"] { color:var(--ink); }
        /* Clay is the mid-tone surface and the hardest to sit on: even at full
           strength #2A211E only reaches 5.51:1 against it, so the chrome takes
           a darker ink here than the body copy does. */
        .f-chrome[data-tone="clay"] { color:#141110; }

        /* ── Responsive ──────────────────────────────────────────────────── */
        @media (max-width:1100px) {
          .f-cover h1 { font-size:118px; letter-spacing:-4px; }
          .f-h { font-size:44px; letter-spacing:-.9px; }
          .f-ring { width:212px; height:212px; }
          .f-ring .num { font-size:66px; }
          .f-cols.c5 { grid-template-columns:repeat(3,1fr); }
          .f-funnels { grid-template-columns:1fr; gap:36px; }
        }
        @media (max-width:860px) {
          .f-in { padding:0 26px; }
          /* Dense slides top-align rather than centring, so a slide that has to
             run past the fold still opens on its kicker. */
          .f-slide { padding:66px 0 78px; align-items:flex-start; }
          .f { font-size:17px; }
          .f-cover h1 { font-size:90px; letter-spacing:-2.8px; }
          .f-cover .sub { font-size:27px; }
          .f-cover .crown { height:52px; }
          .f-h { font-size:33px; letter-spacing:-.45px; max-width:none; }
          .f-lede { font-size:18.5px; margin-top:18px; }
          .f-body { font-size:17px; margin-top:18px; }
          .f-kick { margin-bottom:18px; }
          .f-cols { gap:18px; margin:28px 0 0; }
          .f-col { padding-top:14px; }
          .f-col h3 { font-size:12.5px; }
          .f-col p { font-size:15.5px; }
          .f-col .n { font-size:24px; margin-bottom:7px; }
          .f-chips { gap:8px; margin:28px 0 0; }
          .f-lab.f-lab-chips { margin:28px 0 10px; }
          .f-chip { font-size:14.5px; padding:8px 17px; }
          .f-cols.c3, .f-cols.c4, .f-cols.c5, .f-cols.c6 { grid-template-columns:repeat(2,1fr); }
          /* "01 Define" on one line rather than two. Only the c4 step grid has
             a numeral and a heading together. */
          .f-cols.c4 .f-col .n { display:inline; margin:0 7px 0 0; font-size:19px; }
          .f-cols.c4 .f-col h3 { display:inline; }
          .f-cols.c2 { grid-template-columns:1fr; }
          .f-chain { grid-auto-flow:row; gap:7px; margin:22px 0 0; }
          .f-link { padding:0; }
          .f-link::before { margin-bottom:11px; }
          .f-link .t { font-size:18px; margin-bottom:3px; }
          .f-link .d { font-size:13.5px; }
          .f-methods { margin:28px 0 0; }
          .f-method { grid-template-columns:1fr; gap:4px; padding:11px 0; }
          .f-method .m { font-size:22px; }
          .f-method .q { font-size:15.5px; }
          .f-funnels { gap:12px; margin:16px 0 0; }
          .f-lab { margin-bottom:8px; }
          /* The retired funnel goes to one struck-through row on a phone: it is
             the thing being dismissed, so it does not deserve four rows. */
          .f-old ul { display:flex; flex-wrap:wrap; gap:0 16px; }
          .f-old li { padding:1px 0; font-size:16px; border-bottom:0; }
          .f-new { grid-template-columns:repeat(2,1fr); gap:8px; }
          .f-new .step { padding-top:9px; }
          .f-new .step span { font-size:13.5px; }
          .f-score { grid-template-columns:1fr; gap:28px; justify-items:start; }
          .f-ring { width:200px; height:200px; }
          .f-ring .num { font-size:63px; letter-spacing:-1.5px; }
          .f-ring .num small { font-size:8.5px; margin-top:8px; }
          .f-steps {
            grid-template-columns:1fr; gap:20px;
            padding:0 0 24px 24px; margin:32px 0 0;
          }
          .f-steps::before {
            top:6px; bottom:0; left:0; right:auto; width:1px; height:auto;
            background:linear-gradient(180deg,
              rgba(126,94,39,.22) 0%, rgba(126,94,39,.6) 52%, rgba(126,94,39,1) 100%);
          }
          .f-slate .f-steps::before, .f-charcoal .f-steps::before {
            background:linear-gradient(180deg,
              rgba(235,212,168,.20) 0%, rgba(235,212,168,.55) 52%, rgba(235,212,168,1) 100%);
          }
          .f-steps-arrow {
            top:auto; bottom:0; left:-4px; right:auto; transform:none;
            border-left:4.5px solid transparent;
            border-right:4.5px solid transparent;
            border-top:9px solid var(--gold-lt);
            border-bottom:0;
          }
          .f-step::before { top:10px; left:-24px; width:24px; height:1px; }
          .f-step .n { font-size:24px; margin-bottom:7px; }
          .f-step p { font-size:15.5px; }

          .f-cite { font-size:11.5px; margin:20px 0 0; padding-top:10px; }
          .f-close-line.hero { font-size:24px; margin-top:28px; padding-top:18px; max-width:none; }
          .f-under { grid-template-columns:1fr; gap:11px; margin:20px 0 0; }
          .f-under b { font-size:9.5px; letter-spacing:1.6px; margin-bottom:5px; }
          .f-under span { font-size:13.5px; line-height:1.42; }
          .f-ps { grid-template-columns:1fr; gap:26px; margin:26px 0 0; justify-items:start; }
          .f-ps .f-ring { width:150px; height:150px; }
          .f-ps .f-ring .num { font-size:46px; }
          .f-vs { grid-template-columns:1fr; gap:24px; margin:30px 0 0; }
          .f-vs .said { font-size:22px; }
          .f-vs .note { font-size:14.5px; }
          .f-equation { margin:26px 0 0; padding-top:16px; display:grid; grid-template-columns:1fr; gap:10px; }
          .f-equation .term { padding-right:0; }
          .f-equation .term .t { font-size:20px; margin-bottom:5px; }
          .f-equation .op { padding:0; font-size:18px; }
          .f-spec { margin:26px 0 0; gap:7px; }
          .f-spec .m { font-size:12.5px; padding:6px 12px; }
          .f-spec .feeling { font-size:26px; }
          .f-ladder { margin:20px 0 0; gap:6px; padding-left:22px; }
          /* On a phone the three output rungs lose their notes: the labels say
             it, and they are the least load-bearing lines on the densest slide
             in the deck. */
          .f-rung.is-out .q { display:none; }
          .f-rung { grid-template-columns:1fr; gap:3px; }
          .f-rung::before { left:-22px; top:10px; width:14px; }
          .f-rung .t { font-size:17.5px; }
          .f-rung .q { font-size:13.5px; line-height:1.38; }
          .f-both { grid-template-columns:1fr 1fr; gap:12px; margin:16px 0 0; }
          .f-both b { font-size:9px; letter-spacing:1.3px; margin-bottom:4px; }
          .f-both span { font-size:13.5px; line-height:1.4; }

          .f-map { margin:28px 0 0; }
          .f-map-head { display:none; }
          .f-map-row { grid-template-columns:1fr; gap:8px; padding:9px 0; }
          .f-map-lab { font-size:22px; }
          .f-map-cells { gap:7px; }
          .f-map-cell { padding:8px 0; font-size:18px; }
          .f-map-cell i { display:block; font-style:normal; font-family:var(--font-sans); font-size:9.5px; letter-spacing:1.1px; text-transform:uppercase; opacity:.6; margin:0 0 4px; }
          .f-pattern { gap:8px; }
          .f-bar b { font-size:13.5px; }
          .f-bar span { font-size:12.5px; }
          .f-model { display:grid; grid-template-columns:1fr; }
          .f-op { display:none; }
          .f-term { padding:11px 0 0; }
          .f-mast { padding:16px 26px; }
          .f-mast .mark { gap:8px; font-size:18px; }
          .f-mast .crown { height:20px; }
          .f-mast .who { display:none; }
          .f-count { left:26px; bottom:20px; }
          .f-arrows { right:26px; bottom:16px; }
          .f-conf { bottom:56px; font-size:8.5px; letter-spacing:.8px; padding:0 26px; }
          .f-pips { display:none; }
          .f-tray { display:none; }
          .f-close-line { font-size:18.5px; margin:22px 0 0; padding-top:14px; }
          .f-stop-line { font-size:24px; margin-bottom:20px; }
          .f-new.f-new-wide { margin:26px 0 0; gap:12px; }
          .f-new.f-new-wide .step b { font-size:15px; margin-bottom:6px; }
          .f-new.f-new-wide .step span { font-size:13.5px; }
          .f-stop .crown { height:48px; margin-bottom:26px; }
          .f-stop .f-h { font-size:31px; letter-spacing:-.35px; }
          .f-conf .rr { display:none; }
          .f-verdict h3 { font-size:26px; }
          .f-pattern { margin:32px 0 0; }
        }

        /* ── Short desktops ──────────────────────────────────────────────
           The desktop scale assumes ~900px of viewport height. A 1024x768 iPad
           in landscape, and most laptops once the browser chrome has taken its
           cut, have far less, and five slides ran past the fold there. Same
           trick as the phone step-down: step by HEIGHT, since the width is
           already desktop. */
        @media (min-width:861px) and (max-height:850px) {
          .f-slide { padding:76px 0 78px; }
          .f-h { font-size:42px; letter-spacing:-.9px; }
          .f-lede { font-size:18.5px; margin-top:18px; }
          .f-body { font-size:16.5px; margin-top:18px; }
          .f-kick { margin-bottom:20px; }
          .f-cols { margin:34px 0 0; gap:24px; }
          .f-cols.c5 { gap:18px; }
          .f-chips { margin:32px 0 0; }
          .f-close-line { font-size:20px; margin:24px 0 0; padding-top:14px; }
          .f-stop-line { font-size:29px; margin-bottom:22px; }
          .f-new.f-new-wide { margin:34px 0 0; gap:18px; }
          .f-close-line.hero { font-size:28px; margin-top:32px; padding-top:20px; }
          .f-cite { margin:20px 0 0; }
          .f-under { margin:26px 0 0; }
          .f-ps { gap:40px; margin:32px 0 0; }
          .f-ladder { margin:30px 0 0; gap:8px; }
          .f-rung .t { font-size:19px; }
          .f-rung .q { font-size:14.5px; }
          .f-both { margin:24px 0 0; }
          .f-equation { margin:36px 0 0; padding-top:20px; }
          .f-vs { margin:36px 0 0; }
          .f-spec { margin:30px 0 0; }
          .f-methods { margin:32px 0 0; }
          .f-method { padding:13px 0; }
          .f-method .m { font-size:23px; }
          /* ⚠ The funnels are STACKED at this width (the max-width:1100px rule
             turns them into one column), so this gap is vertical. A 40px value
             here, copied from the side-by-side desktop layout, pushed slide 7
             57px past the fold. */
          .f-funnels { margin:22px 0 0; gap:16px; }
          .f-old li { padding:5px 0; }
          .f-lab { margin-bottom:8px; }
          .f-new .step { padding-top:10px; }
          .f-chain { margin:34px 0 0; }
          .f-link .t { font-size:21px; }
          .f-map { margin:30px 0 0; }
          .f-map-row { padding:11px 0; }
          .f-map-cell { padding:9px 0; font-size:20px; }
          .f-score { margin:32px 0 0; gap:52px; }
          .f-ring { width:206px; height:206px; }
          .f-ring .num { font-size:64px; }
          .f-pattern { margin:34px 0 0; }
          .f-bar .fill.Carries { height:108px; }
          .f-bar .fill.Weakens { height:60px; }
          .f-model { margin:34px 0 0; }
          .f-stack { margin:34px 0 0; }
          .f-cover h1 { font-size:124px; letter-spacing:-4.5px; }
          .f-cover .sub { font-size:30px; }
          .f-cover .crown { height:54px; margin-bottom:30px; }
          .f-stop .crown { height:50px; margin-bottom:28px; }
          .f-stop .f-h { font-size:38px; }
        }

        /* ── Short phones ────────────────────────────────────────────────
           The mobile scale above is tuned for a 844px-tall screen (iPhone 14/15
           and up). On a shorter one it does not fit, so the scale steps down
           here rather than the deck being tuned down for everybody. Width alone
           cannot detect this: a 390x844 and a 375x667 are the same width and
           177px apart in height. A few of the densest slides still run past the
           fold below this and are allowed to scroll; they are top-aligned and
           snap-stop at their own top, so nothing is lost, and crushing the type
           on the smallest screens would be the worse trade. */
        @media (max-width:860px) and (max-height:820px) {
          .f-slide { padding:56px 0 82px; }
          .f-h { font-size:29px; letter-spacing:-.35px; }
          .f-lede { font-size:17px; margin-top:14px; }
          .f-body { font-size:16px; margin-top:14px; }
          .f-kick { margin-bottom:14px; }
          .f-col p { font-size:14.5px; }
          .f-col .n { font-size:21px; }
          .f-cols { gap:15px; margin:22px 0 0; }
          .f-chips { gap:7px; margin:22px 0 0; }
          .f-chip { font-size:13.5px; padding:7px 15px; }
          .f-close-line { font-size:17px; margin:18px 0 0; padding-top:12px; }
          .f-stop-line { font-size:21px; margin-bottom:16px; }
          .f-cover h1 { font-size:74px; letter-spacing:-2.4px; }
          .f-cover .sub { font-size:23px; }
          .f-cover .crown { height:44px; margin-bottom:26px; }
          .f-cover .say { font-size:17px; margin-top:18px; }
          .f-stop .f-h { font-size:27px; }
          .f-stop .crown { height:40px; margin-bottom:20px; }
          .f-ring { width:168px; height:168px; }
          .f-ring .num { font-size:54px; }
          .f-score { gap:22px; }
          .f-map { margin:22px 0 0; }
          .f-map-row { padding:9px 0; }
          .f-map-cell { padding:6px 0; font-size:16px; }
          .f-map-lab { font-size:20px; }
          .f-method { padding:9px 0; }
          .f-method .m { font-size:20px; }
          .f-method .q { font-size:14.5px; }
          .f-methods { margin:22px 0 0; }
          .f-chain { gap:12px; margin:22px 0 0; }
          .f-link .t { font-size:20px; }
          .f-funnels { margin:16px 0 0; }
          .f-new .step { padding-top:8px; }
          .f-new .step span { font-size:13.5px; }
          .f-verdict h3 { font-size:24px; }
          .f-pattern { margin:24px 0 0; }
          .f-term { padding:11px 0 0; }
          .f-conf { bottom:56px; }
        }

        /* ── Print: one slide per page, no chrome ────────────────────────── */
        @media print {
          .f-deck { height:auto; overflow:visible; }
          .f-slide { min-height:auto; padding:40px 0 56px; break-after:page; position:relative; }
          .f-chrome { display:none; }
          .f-slide::after {
            content:"Private & Confidential · © DAB Hands Delivery Ltd 2026. All rights reserved.";
            position:absolute; left:0; right:0; bottom:16px; text-align:center;
            font-size:8pt; letter-spacing:.6px; text-transform:uppercase; opacity:.55;
          }
        }
      `}</style>

      <div className="f">
        {/* Chrome sits above the track and recolours with the slide beneath it. */}
        <div className="f-chrome" data-tone={tone}>
          <div className="f-mast">
            <span className="mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="crown crown-dark" src="/images/crown-mark.webp" alt="" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="crown crown-light" src="/images/DabHands_crown_white.png" alt="" aria-hidden="true" />
              DAB Hands
            </span>
            <span className="who">FEEL · The Emotional Experience Method</span>
          </div>

          {/* The tray. The pip rail is the control and carries the semantics;
              the strip beside it is a redundant visual affordance for pointer
              users, so its buttons stay out of the tab order rather than
              doubling twenty-six stops. Focusing a pip opens the strip, so a
              keyboard user sees the same preview. */}
          <div
            className="f-tray"
            data-open={trayOpen}
            data-on
            onMouseEnter={openTray}
            onMouseLeave={() => closeTray()}
            onWheel={(e) => {
              // The zone takes pointer events, so hand the wheel back to the
              // deck. Without this the right edge stops scrolling the page.
              const deck = deckRef.current;
              if (deck) deck.scrollTop += e.deltaY;
            }}
          >
            <div className="f-tray-zone" aria-hidden="true" />

            <div className="f-fly" ref={flyRef} aria-hidden="true">
              {SLIDE_TONES.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  tabIndex={-1}
                  className="f-mini"
                  data-tone={t}
                  data-active={i === index}
                  onClick={() => { go(i); closeTray(0); }}
                >
                  <span className="mn">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mk">{labels[i]?.kicker ?? ''}</span>
                  <span className="mt">{labels[i]?.title ?? ''}</span>
                </button>
              ))}
            </div>

            <nav className="f-pips" aria-label="Slides">
              {SLIDE_TONES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-current={i === index}
                  aria-label={`Slide ${i + 1}${labels[i]?.title ? `: ${labels[i].title}` : ''}`}
                  onClick={() => go(i)}
                  onFocus={openTray}
                  onBlur={() => closeTray()}
                />
              ))}
            </nav>
          </div>

          <p className="f-count">
            <b>{String(index + 1).padStart(2, '0')}</b> <span className="of">/ {TOTAL}</span>
          </p>

          <p className="f-conf">
            Private &amp; Confidential · © DAB Hands Delivery Ltd 2026.<span className="rr"> All rights reserved.</span>
          </p>

          <div className="f-arrows" data-on>
            {canFull && (
              <button
                type="button"
                className="full"
                onClick={toggleFull}
                aria-pressed={isFull}
                title={isFull ? 'Leave full screen (F)' : 'Full screen (F)'}
                aria-label={isFull ? 'Leave full screen' : 'Full screen'}
              >
                <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  {isFull ? (
                    <>
                      <path d="M6.5 1.5v5h-5M9.5 14.5v-5h5" />
                      <path d="M1.5 14.5l5-5M14.5 1.5l-5 5" />
                    </>
                  ) : (
                    <>
                      <path d="M1.5 6V1.5H6M10 1.5h4.5V6M14.5 10v4.5H10M6 14.5H1.5V10" />
                    </>
                  )}
                </svg>
              </button>
            )}
            <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">↑</button>
            <button type="button" onClick={() => go(index + 1)} disabled={index === TOTAL - 1} aria-label="Next slide">↓</button>
          </div>
        </div>

        <div className="f-deck" ref={deckRef}>

          {/* 01 · FEEL */}
          <section className="f-slide f-charcoal" data-label="Cover">
            <div className="f-in f-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="crown" src="/images/DabHands_crown_white.png" alt="" aria-hidden="true" />
              <h1>FEEL</h1>
              <p className="sub">The Emotional Experience Method</p>
              <p className="say">A performance layer for how brands make people feel in digital.</p>
              <p className="by">DAB Hands</p>
            </div>
          </section>

          {/* 02 · The immovable truth */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">The immovable truth</p>
              <h2 className="f-h">People feel their way to decisions.</h2>
              <p className="f-lede">
                Feeling is not something that happens after a decision.{' '}
                <span className="brk">It is part of how decisions are made.</span>
              </p>
              <div className="f-under">
                <div>
                  <b>What the effectiveness data shows</b>
                  <span>
                    Analysis of the IPA Effectiveness Databank found emotionally led campaigns
                    delivered substantially stronger long term business effects than rationally
                    led ones.
                  </span>
                </div>
                <div>
                  <b>What the neuroscience suggests</b>
                  <span>
                    Patients whose emotional signalling was damaged kept their reasoning largely
                    intact while real world decision making deteriorated. The mechanism is still
                    debated. The direction is not.
                  </span>
                </div>
              </div>
              <p className="f-close-line">
                Feeling is not the soft part of the decision.{' '}
                <span className="brk">It is part of what moves it.</span>
              </p>
              <p className="f-cite">
                <b>Sources.</b> Les Binet and Peter Field, <i>The Long and the Short of It</i>,
                IPA, 2013. Antonio Damasio, <i>Descartes’ Error</i>, 1994.
              </p>
            </div>
          </section>

          {/* 03 · The performance gap */}
          <section className="f-slide f-clay">
            <div className="f-in">
              <p className="f-kick">The performance gap</p>
              <h2 className="f-h wide">We measure almost everything except this.</h2>
              <p className="f-lede">It is not broken. It is incomplete.</p>
              <div className="f-cols c5">
                {[
                  ['Brand', 'awareness, meaning, difference, salience'],
                  ['CX', 'satisfaction, loyalty, ease, effectiveness'],
                  ['UX', 'task success, usability, friction, engagement'],
                  ['Performance', 'reach, events, conversion, CAC, LTV'],
                  ['Creative', 'distinctiveness, consistency, craft, channel fit'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
              <p className="f-close-line">
                The missing layer is emotional performance.{' '}
                <span className="brk">Does this moment make the brand feel like itself?</span>
              </p>
            </div>
          </section>

          {/* 04 · Where FEEL fits */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">Where FEEL fits</p>
              <h2 className="f-h wide">The great methods own one important question.</h2>
              <div className="f-methods">
                {[
                  ['NPS', 'Will they recommend?'],
                  ['MDS', 'Is the brand meaningful, different and salient?'],
                  ['Double Diamond', 'Are we solving the right problem?'],
                  ['HEART', 'Which product metrics reflect user goals?'],
                ].map(([m, q]) => (
                  <div className="f-method" key={m}><span className="m">{m}</span><span className="q">{q}</span></div>
                ))}
                <div className="f-method is-feel">
                  <span className="m">FEEL</span>
                  <span className="q">Does the experience carry the required feeling?</span>
                </div>
              </div>
            </div>
          </section>

          {/* 05 · The missing specification */}
          <section className="f-slide f-charcoal">
            <div className="f-in">
              <p className="f-kick">The missing specification</p>
              <h2 className="f-h wide">We specify everything except the feeling.</h2>
              <div className="f-cols c4">
                {[
                  ['Brand guidelines', 'How we look and sound.', false],
                  ['UX principles', 'How things should work.', false],
                  ['Experience principles', 'How we should behave.', false],
                  ['FEEL Emotional Spec', 'How people should feel.', true],
                ].map(([h, p, lead]) => (
                  <div className={`f-col${lead ? ' is-feel' : ''}`} key={h as string}>
                    <h3>{h}</h3><p>{p}</p>
                  </div>
                ))}
              </div>
              <p className="f-close-line">If feeling influences choice, why wouldn’t we specify it?</p>
            </div>
          </section>

          {/* 06 · The Emotional Spec */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">The Emotional Spec</p>
              <h2 className="f-h">The word is not the work.</h2>
              <p className="f-lede">An Emotional Spec is not another set of brand attributes.</p>
              <div className="f-vs">
                <div>
                  <p className="lab">Brand attribute</p>
                  <p className="said">“We are warm.”</p>
                  <p className="note">Describes the sender.</p>
                </div>
                <div className="is-feel">
                  <p className="lab">Emotional outcome</p>
                  <p className="said">“I feel safe here.”</p>
                  <p className="note">Describes the receiver.</p>
                </div>
              </div>
              <div className="f-spec">
                {['Words', 'Image', 'Motion', 'Interaction', 'Pace', 'Choice', 'Service', 'Friction', 'Reward'].map((m) => (
                  <span className="m" key={m}>{m}</span>
                ))}
                <span className="to" aria-hidden="true">→</span>
                <span className="feeling">Feeling</span>
              </div>
              <p className="f-close-line">
                The Emotional Spec defines the emotional world{' '}
                <span className="brk">the brand intends its experience to create.</span>
              </p>
            </div>
          </section>

          {/* 07 · The Emotional Funnel */}
          <section className="f-slide f-paper">
            <div className="f-in">
              <p className="f-kick">The emotional funnel</p>
              <h2 className="f-h wide">Feeling changes as people move towards a decision.</h2>
              <div className="f-new f-new-wide">
                {[
                  ['Notice', 'Do I feel something?'],
                  ['Relevance', 'Does this feel for me?'],
                  ['Confidence', 'Do I feel able to continue?'],
                  ['Commitment', 'Do I feel ready to act?'],
                  ['Memory', 'What feeling do I carry away?'],
                ].map(([b, q]) => (
                  <div className="step" key={b}><b>{b}</b><span>{q}</span></div>
                ))}
              </div>
              <p className="f-close-line">
                These stages are a diagnostic frame, not a claim about sequence.{' '}
                <span className="brk">People loop, leave, return and often arrive in the middle.</span>
              </p>
            </div>
          </section>

          {/* 08 · Required Feeling */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">Required Feeling</p>
              <h2 className="f-h wide">
                The brand should feel like itself everywhere.{' '}
                <span className="brk">People need different things from it at different moments.</span>
              </h2>
              <div className="f-equation">
                <div className="term">
                  <span className="t">Emotional Spec</span>
                  <span className="d">How should this brand feel?</span>
                </div>
                <div className="op" aria-hidden="true">×</div>
                <div className="term">
                  <span className="t">Required Feeling</span>
                  <span className="d">What does this person need to feel now?</span>
                </div>
                <div className="op" aria-hidden="true">=</div>
                <div className="term result">
                  <span className="t">Emotional brief</span>
                  <span className="d">What the experience is tested against.</span>
                </div>
              </div>
              <div className="f-under">
                <div>
                  <b>Defined per audience, per stage</b>
                  <span>
                    A first time and a returning customer may need different things at Confidence.
                    Where audiences differ materially, FEEL runs more than one profile.
                  </span>
                </div>
                <div>
                  <b>Sometimes it is almost nothing</b>
                  <span>
                    For a password reset or a repeat order, emotional performance may simply mean
                    getting out of the way.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 09 · The FEEL Map */}
          <section className="f-slide f-charcoal">
            <div className="f-in">
              <p className="f-kick">The FEEL Map</p>
              <h2 className="f-h">Now we can measure it.</h2>
              <p className="f-lede">
                At this stage, through this dimension,{' '}
                <span className="brk">does the experience deliver the Emotional Spec</span>{' '}
                <span className="brk">in a way that creates the Required Feeling?</span>
              </p>
              <div className="f-map">
                <div className="f-map-head">
                  <span />
                  <div className="cells">{STAGES.map((st) => <span key={st}>{st}</span>)}</div>
                </div>
                {DIMENSIONS.map((d) => (
                  <div className="f-map-row" key={d.label}>
                    <span className="f-map-lab">{d.label}</span>
                    <div className="f-map-cells">
                      {d.nums.map((n, i) => (
                        <span className="f-map-cell" key={n}><i>{STAGES[i]}</i>{n}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="f-close-line">
                Fifteen observations per journey.{' '}
                <span className="brk">Complex experiences run the map more than once.</span>
              </p>
            </div>
          </section>

          {/* 10 · The verdict */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">The verdict</p>
              <h2 className="f-h">Carries. Weakens. Breaks.</h2>
              <div className="f-cols c3">
                <div className="f-verdict v1"><h3>Carries</h3><p>Reinforces the emotional brief.</p></div>
                <div className="f-verdict v2"><h3>Weakens</h3><p>Dilutes, delays or genericises it.</p></div>
                <div className="f-verdict v3"><h3>Breaks</h3><p>Contradicts it, or collapses the intended feeling.</p></div>
              </div>
            </div>
          </section>

          {/* 11 · FEEL Pattern */}
          <section className="f-slide f-slate">
            <div className="f-in">
              <p className="f-kick">FEEL Pattern</p>
              <h2 className="f-h">The Pattern matters before the Score.</h2>
              <p className="f-lede">
                The Pattern tells you where emotional performance fails, and why.
              </p>
              <div className="f-ps">
                <div className="f-pattern">
                  {PATTERN.map((x) => (
                    <div className="f-bar" key={x.stage}>
                      <span className={`fill ${x.verdict}`} />
                      <b>{x.stage}</b>
                      <span>{x.verdict}</span>
                    </div>
                  ))}
                </div>
                <div className="f-ring">
                  <svg
                    viewBox="0 0 240 240"
                    role="img"
                    aria-label={`FEEL Score ${SCORE} out of 100. ${SEGMENTS.map((x) => `${x.label} ${x.value} per cent`).join(', ')}.`}
                  >
                    <circle className="track" cx="120" cy="120" r={RING.r} strokeWidth={RING.stroke} />
                    <g transform="rotate(-90 120 120)">
                      {SEGMENTS.reduce<{ out: React.ReactElement[]; acc: number }>(
                        (state, seg) => {
                          const len = (seg.value / 100) * CIRC;
                          const dash = Math.max(len - RING.gap, 1);
                          state.out.push(
                            <circle
                              key={seg.label}
                              cx="120"
                              cy="120"
                              r={RING.r}
                              fill="none"
                              strokeWidth={RING.stroke}
                              strokeDasharray={`${dash} ${CIRC - dash}`}
                              strokeDashoffset={-state.acc}
                              style={{ stroke: seg.colour }}
                            />,
                          );
                          state.acc += len;
                          return state;
                        },
                        { out: [], acc: 0 },
                      ).out}
                    </g>
                  </svg>
                  <p className="num" aria-hidden="true">{SCORE}<small>FEEL Score</small></p>
                </div>
              </div>
              <p className="f-close-line">
                Pattern first. Score second. Benchmark later.{' '}
                <span className="brk">The Score tracks an experience against itself over time.</span>{' '}
                <span className="brk">It is not a benchmark, and will not pretend to be one.</span>
              </p>
            </div>
          </section>

          {/* 12 · How the judgement holds */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">How the judgement holds</p>
              <h2 className="f-h">A judgement, made the same way twice.</h2>
              <div className="f-cols c3">
                {[
                  ['Written criteria', 'Carries, Weakens and Breaks are anchored to defined thresholds and worked examples.'],
                  ['Scored twice', 'Where the engagement allows, two assessors score independently and agreement is reported.'],
                  ['Confidence travels with the score', 'Every FEEL Score carries a Confidence Level describing the strength of the evidence behind it.'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
              <p className="f-close-line">
                The method is expert led.{' '}
                <span className="brk">That is exactly why it is disciplined about how the expert decides.</span>
              </p>
            </div>
          </section>

          {/* 13 · Commercial priority */}
          <section className="f-slide f-paper">
            <div className="f-in">
              <p className="f-kick">Commercial priority</p>
              <h2 className="f-h wide">Value at Stake prioritises. It does not forecast.</h2>
              <div className="f-model">
                <div className="f-term"><b>Audience exposed</b><span>how many people meet the moment</span></div>
                <div className="f-op">×</div>
                <div className="f-term"><b>Commercial value</b><span>what sits behind that moment</span></div>
                <div className="f-op">×</div>
                <div className="f-term"><b>Severity</b><span>how badly the brief is missed</span></div>
                <div className="f-op">×</div>
                <div className="f-term"><b>Evidence confidence</b><span>how strongly it is evidenced</span></div>
                <div className="f-op">=</div>
                <div className="f-term total"><b>Priority</b><span>an order of work, not a forecast</span></div>
              </div>
              <p className="f-close-line">
                The output is an order of work and an honest view of where exposure is concentrated.{' '}
                <span className="brk">Once there is enough observed calibration, ranges may follow.</span>{' '}
                <span className="brk">Until then it prioritises, and says so.</span>
              </p>
            </div>
          </section>

          {/* 14 · The prediction */}
          <section className="f-slide f-charcoal">
            <div className="f-in">
              <p className="f-kick">Before the work starts</p>
              <h2 className="f-h">Every engagement makes a prediction.</h2>
              <div className="f-cols c3">
                {[
                  ['What should move', 'the measure the priority break is holding back'],
                  ['Approximately how much', 'stated as a range, before anything is touched'],
                  ['Over what period', 'a window the prediction can be judged against'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
              <p className="f-body">
                Afterwards the result is measured and reported. Including when the prediction was wrong.
              </p>
              <p className="f-close-line hero">A method that cannot be wrong cannot be trusted.</p>
            </div>
          </section>

          {/* 15 · Intervention */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">Intervention</p>
              <h2 className="f-h">Fix the moments that matter.</h2>
              <p className="f-lede">The work changes the moment, not merely the message.</p>
              <div className="f-chips">
                {['Product', 'Service', 'UX', 'Content', 'CRM', 'Environment', 'Employee behaviour', 'Operating process'].map((c) => (
                  <span className="f-chip" key={c}>{c}</span>
                ))}
              </div>
              <p className="f-close-line">
                Prioritise where emotional failure and commercial exposure meet.
              </p>
            </div>
          </section>

          {/* 16 · The learning loop */}
          <section className="f-slide f-paper">
            <div className="f-in">
              <p className="f-kick">The learning loop</p>
              <h2 className="f-h">Every intervention makes FEEL better.</h2>
              <div className="f-chain">
                {[
                  ['Diagnose', 'score the map', false],
                  ['Predict', 'state what should move', true],
                  ['Intervene', 'fix the priority break', false],
                  ['Observe', 'measure what happened', false],
                  ['Re-score', 'run the map again', false],
                  ['Learn', 'compare predicted with observed', true],
                ].map(([t, d, on]) => (
                  <div className={`f-link${on ? ' on' : ''}`} key={t as string}>
                    <span className="t">{t}</span>
                    <span className="d">{d}</span>
                  </div>
                ))}
              </div>
              <p className="f-body">
                Over time that evidence calibrates severity, commercial exposure and likely impact.
              </p>
              <p className="f-close-line">
                Expert diagnostic, then validated diagnostic,{' '}
                <span className="brk">then calibrated predictive method, then benchmarked dataset.</span>
              </p>
            </div>
          </section>

          {/* 17 · Complementary by design */}
          <section className="f-slide f-slate">
            <div className="f-in">
              <p className="f-kick">Complementary by design</p>
              <h2 className="f-h wide">
                FEEL doesn’t replace the stack.{' '}
                <span className="brk">It gives it a shared emotional brief.</span>
              </h2>
              <div className="f-stack">
                {['brand', 'CX', 'UX', 'media', 'CRM', 'retail', 'service', 'research', 'product', 'operations'].map((c) => (
                  <span className="f-chip" key={c}>{c}</span>
                ))}
                <span className="core">FEEL</span>
              </div>
            </div>
          </section>

          {/* 18 · What brands get */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">What brands get</p>
              <h2 className="f-h">A small set of management assets.</h2>
              <div className="f-cols c6">
                {[
                  ['Emotional Spec', 'how the brand should feel'],
                  ['Required Feeling profiles', 'what audiences need through the journey'],
                  ['FEEL Map and Pattern', 'where emotional performance holds and fails'],
                  ['FEEL Score and Confidence', 'a repeatable longitudinal measure'],
                  ['Commercial Priority', 'where exposure is concentrated'],
                  ['Intervention roadmap', 'what to fix first'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* 19 · Why now */}
          <section className="f-slide f-clay">
            <div className="f-in">
              <p className="f-kick">Why now</p>
              <h2 className="f-h wide">Optimisation has made sameness scalable.</h2>
              <p className="f-lede">
                AI, automation, templates and performance systems make competent experiences{' '}
                <span className="brk">faster to create and easier to replicate.</span>
              </p>
              <p className="f-close-line">
                Efficiency will keep improving.{' '}
                <span className="brk">Distinct emotional performance will not happen by accident.</span>{' '}
                <span className="brk">FEEL is a senior practitioner method, not a template.</span>
              </p>
            </div>
          </section>

          {/* 20 · Close */}
          <section className="f-slide f-charcoal" data-label="Close">
            <div className="f-in f-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="crown" src="/images/DabHands_crown_white.png" alt="" aria-hidden="true" />
              <p className="f-stop-line">Experiences create feelings that enable or inhibit progress.</p>
              <h2 className="f-h" style={{ fontSize: 'clamp(28px, 4.4vw, 48px)', maxWidth: '24ch' }}>
                Stop asking only what happened.{' '}
                <span className="brk">Start measuring what it made people feel.</span>
              </h2>
              <a className="f-cta" href={mailto({
                subject: 'FEEL · The Emotional Experience Method',
                body: 'I have read the FEEL method and would like to talk about applying it.',
              })}>
                Start a conversation
              </a>
              <p className="f-private">
                FEEL · The Emotional Experience Method. Shared privately, not listed on the site.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
