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

const STAGES = ['Promise', 'Arrival', 'Action', 'Response', 'Memory'];

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

// The example pattern the deck describes: the promise is strong, but recovery
// breaks the feeling.
const PATTERN: { stage: string; verdict: 'Carries' | 'Weakens' | 'Breaks' }[] = [
  { stage: 'Promise', verdict: 'Carries' },
  { stage: 'Arrival', verdict: 'Carries' },
  { stage: 'Action', verdict: 'Weakens' },
  { stage: 'Response', verdict: 'Breaks' },
  { stage: 'Memory', verdict: 'Weakens' },
];

const SLIDE_TONES: Tone[] = [
  'charcoal', 'bone', 'clay', 'bone', 'charcoal', 'bone', 'paper', 'bone',
  'slate', 'bone', 'charcoal', 'bone', 'bone', 'slate', 'bone', 'paper',
  'bone', 'charcoal', 'bone', 'clay', 'bone', 'slate', 'bone', 'charcoal',
  'bone', 'paper', 'charcoal',
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
        description="A performance layer for how brands make people feel in digital. Required Feeling, the FEEL Map, the FEEL Score and the value at stake."
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
          .f-slide { padding:80px 0 92px; align-items:flex-start; }
          .f { font-size:16px; }
          .f-cover h1 { font-size:82px; letter-spacing:-2.5px; }
          .f-cover .sub { font-size:25px; }
          .f-cover .crown { height:48px; }
          .f-h { font-size:30px; letter-spacing:-.4px; max-width:none; }
          .f-lede { font-size:17px; margin-top:18px; }
          .f-body { font-size:16px; margin-top:18px; }
          .f-kick { margin-bottom:18px; }
          .f-cols { gap:18px; margin:28px 0 0; }
          .f-col { padding-top:13px; }
          .f-col p { font-size:14px; }
          .f-col .n { font-size:22px; margin-bottom:7px; }
          .f-chips { gap:8px; margin:28px 0 0; }
          .f-chip { font-size:13px; padding:7px 15px; }
          .f-cols.c3, .f-cols.c4, .f-cols.c5, .f-cols.c6 { grid-template-columns:repeat(2,1fr); }
          .f-cols.c2 { grid-template-columns:1fr; }
          .f-chain { grid-auto-flow:row; gap:14px; margin:28px 0 0; }
          .f-link { padding:0; }
          .f-link::before { margin-bottom:11px; }
          .f-link .t { font-size:20px; margin-bottom:5px; }
          .f-link .d { font-size:13px; }
          .f-methods { margin:28px 0 0; }
          .f-method { grid-template-columns:1fr; gap:4px; padding:11px 0; }
          .f-method .m { font-size:20px; }
          .f-method .q { font-size:14px; }
          .f-funnels { gap:18px; margin:24px 0 0; }
          .f-lab { margin-bottom:10px; }
          /* The retired funnel goes to one struck-through row on a phone: it is
             the thing being dismissed, so it does not deserve four rows. */
          .f-old ul { display:flex; flex-wrap:wrap; gap:0 16px; }
          .f-old li { padding:2px 0; font-size:15px; border-bottom:0; }
          .f-new { grid-template-columns:repeat(2,1fr); gap:12px; }
          .f-new .step { padding-top:11px; }
          .f-new .step span { font-size:13px; }
          .f-score { grid-template-columns:1fr; gap:28px; justify-items:start; }
          .f-ring { width:184px; height:184px; }
          .f-ring .num { font-size:58px; letter-spacing:-1.4px; }
          .f-ring .num small { font-size:8.5px; margin-top:8px; }
          .f-map { margin:28px 0 0; }
          .f-map-head { display:none; }
          .f-map-row { grid-template-columns:1fr; gap:9px; padding:11px 0; }
          .f-map-lab { font-size:20px; }
          .f-map-cells { gap:7px; }
          .f-map-cell { padding:7px 0; font-size:16px; }
          .f-map-cell i { display:block; font-style:normal; font-family:var(--font-sans); font-size:9px; letter-spacing:1.1px; text-transform:uppercase; opacity:.6; margin:0 0 4px; }
          .f-pattern { gap:8px; }
          .f-bar b { font-size:12px; }
          .f-bar span { font-size:11px; }
          .f-model { display:grid; grid-template-columns:1fr; }
          .f-op { display:none; }
          .f-term { padding:14px 0 0; }
          .f-mast { padding:20px 26px; }
          .f-mast .mark { gap:8px; font-size:17px; }
          .f-mast .crown { height:21px; }
          .f-mast .who { display:none; }
          .f-count { left:26px; bottom:20px; }
          .f-arrows { right:26px; bottom:16px; }
          .f-conf { bottom:64px; font-size:8.5px; letter-spacing:.8px; padding:0 26px; }
          .f-pips { display:none; }
          .f-tray { display:none; }
          .f-close-line { font-size:17px; margin:26px 0 0; padding-top:16px; }
          .f-stop .crown { height:44px; margin-bottom:26px; }
          .f-stop .f-h { font-size:28px; letter-spacing:-.3px; }
          .f-conf .rr { display:none; }
          .f-verdict h3 { font-size:24px; }
          .f-pattern { margin:32px 0 0; }
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

          {/* 01 · Cover */}
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
              <h2 className="f-h">Human beings do not decide and then feel.</h2>
              <p className="f-lede">
                They feel their way toward decisions, then use reason to explain, justify and refine them.
              </p>
              <p className="f-body">
                That is not a marketing belief. It is a neurological fact: when emotional signalling is
                damaged, intelligence can remain intact while real world decision making falls apart.
              </p>
            </div>
          </section>

          {/* 03 · The performance gap */}
          <section className="f-slide f-clay">
            <div className="f-in">
              <p className="f-kick">The performance gap</p>
              <h2 className="f-h">Brands do not lose emotion all at once.</h2>
              <p className="f-lede">They lose it moment by moment.</p>
              <div className="f-chips">
                <span className="f-chip">In the handoff</span>
                <span className="f-chip">In the form</span>
                <span className="f-chip">In the tone</span>
                <span className="f-chip">In the wait</span>
                <span className="f-chip">In the recovery</span>
                <span className="f-chip">In the aftertaste</span>
              </div>
            </div>
          </section>

          {/* 04 · What brands already measure */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">What brands already measure</p>
              <h2 className="f-h wide">The current stack measures many things well.</h2>
              <p className="f-lede">It is not broken. It is incomplete.</p>
              <div className="f-cols c5">
                {[
                  ['Brand', 'awareness, meaning, difference, salience, equity'],
                  ['CX', 'satisfaction, loyalty, ease, effectiveness, emotion'],
                  ['UX', 'task success, usability, friction, engagement'],
                  ['Performance', 'reach, events, conversion, CAC, LTV'],
                  ['Creative', 'distinctiveness, consistency, craft, channel fit'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 · The gap */}
          <section className="f-slide f-charcoal">
            <div className="f-in">
              <p className="f-kick">The gap</p>
              <h2 className="f-h">The missing layer is emotional performance.</h2>
              <p className="f-lede">
                Not what people saw. Not only what they did. What the experience made possible for them to feel.
              </p>
              <p className="f-close-line">Does this moment make the brand feel like itself?</p>
            </div>
          </section>

          {/* 06 · Where FEEL fits */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">Where FEEL fits</p>
              <h2 className="f-h wide">The great methods own one public question.</h2>
              <p className="f-lede">
                Their power comes from making one invisible management problem visible enough to act on.
              </p>
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

          {/* 07 · The emotional funnel */}
          <section className="f-slide f-paper">
            <div className="f-in">
              <p className="f-kick">The emotional funnel</p>
              <h2 className="f-h wide">The marketing funnel is dead. There is an emotional funnel.</h2>
              <p className="f-lede">
                People do not move neatly from awareness to conversion. They move from first feeling to lasting belief.
              </p>
              <div className="f-funnels">
                <div className="f-old">
                  <p className="f-lab">The old model</p>
                  <ul>
                    <li>Awareness</li><li>Consideration</li><li>Conversion</li><li>Loyalty</li>
                  </ul>
                </div>
                <div>
                  <p className="f-lab">The emotional funnel</p>
                  <div className="f-new">
                    {[
                      ['Notice', 'Do I feel something?'],
                      ['Relevance', 'Does this feel for me?'],
                      ['Confidence', 'Do I feel safe to continue?'],
                      ['Commitment', 'Do I feel ready to act?'],
                      ['Memory', 'What feeling do I carry away?'],
                    ].map(([b, s]) => (
                      <div className="step" key={b}><b>{b}</b><span>{s}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="f-close-line">The emotional funnel is the journey from attention to attachment.</p>
            </div>
          </section>

          {/* 08 · Place in the world */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">Place in the world</p>
              <h2 className="f-h">FEEL sits between promise and performance.</h2>
              <p className="f-lede">
                It translates brand strategy into an emotional operating standard for the lived experience.
              </p>
              <div className="f-chain">
                {[
                  ['Brand promise', 'what the business wants to mean', false],
                  ['Required Feeling', 'the emotional standard', true],
                  ['Lived experience', 'where the promise is proven', false],
                  ['Commercial outcomes', 'what compounds or leaks', false],
                ].map(([t, d, on]) => (
                  <div className={`f-link${on ? ' on' : ''}`} key={t as string}>
                    <span className="t">{t}</span>
                    <span className="d">{d}</span>
                  </div>
                ))}
              </div>
              <p className="f-close-line">FEEL gives every discipline a shared emotional performance brief.</p>
            </div>
          </section>

          {/* 09 · Core theory */}
          <section className="f-slide f-slate">
            <div className="f-in">
              <p className="f-kick">Core theory</p>
              <h2 className="f-h wide">
                An experience performs emotionally when its moments repeatedly carry the feeling the brand requires.
              </h2>
              <div className="f-cols c3">
                {[
                  ['01', 'Brand strategy names the promise.'],
                  ['02', 'Required Feeling defines the emotional standard.'],
                  ['03', 'Every moment either carries, weakens or breaks that standard.'],
                ].map(([n, p]) => (
                  <div className="f-col" key={n}><span className="n">{n}</span><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* 10 · The standard */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">The standard</p>
              <h2 className="f-h">Required Feeling is the emotional spec.</h2>
              <p className="f-lede">
                It turns a brand idea into a testable standard for product, service, content, sales and support.
              </p>
              <div className="f-chips">
                <span className="f-chip lead">trusted</span>
                <span className="f-chip lead">in control</span>
                <span className="f-chip lead">seen</span>
                <span className="f-chip lead">energised</span>
                <span className="f-chip lead">proud</span>
              </div>
              <p className="f-close-line">The word is not the work. The work is proving it in moments.</p>
            </div>
          </section>

          {/* 11 · The FEEL Map */}
          <section className="f-slide f-charcoal">
            <div className="f-in">
              <p className="f-kick">The FEEL Map</p>
              <h2 className="f-h wide">The FEEL Map observes the experience in fifteen places.</h2>
              <p className="f-lede">Five journey stages, tested through three emotional dimensions.</p>
              <div className="f-map">
                <div className="f-map-head">
                  <span />
                  <div className="cells">{STAGES.map((s) => <span key={s}>{s}</span>)}</div>
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
              <p className="f-close-line">Five stages, three dimensions, fifteen observations.</p>
            </div>
          </section>

          {/* 12 · How the map works */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">How the map works</p>
              <h2 className="f-h wide">The fifteen observations ask one practical question.</h2>
              <p className="f-lede">
                At this stage, through this dimension, does the moment carry the Required Feeling?
              </p>
              <div className="f-cols c3">
                {[
                  ['Meaning', 'Does the moment express the intended emotional idea?'],
                  ['Confidence', 'Does it help people feel able, safe and ready to continue?'],
                  ['Distinction', 'Does it feel recognisably like this brand, not the category average?'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* 13 · The verdict language */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">The verdict language</p>
              <h2 className="f-h">Every moment gets a verdict.</h2>
              <p className="f-lede">Carries. Weakens. Breaks.</p>
              <div className="f-cols c3">
                <div className="f-verdict v1"><h3>Carries</h3><p>The moment reinforces the Required Feeling.</p></div>
                <div className="f-verdict v2"><h3>Weakens</h3><p>The moment dilutes it, delays it or makes it generic.</p></div>
                <div className="f-verdict v3"><h3>Breaks</h3><p>The moment contradicts it or collapses trust.</p></div>
              </div>
            </div>
          </section>

          {/* 14 · FEEL Score */}
          <section className="f-slide f-slate">
            <div className="f-in">
              <p className="f-kick">FEEL Score</p>
              <h2 className="f-h">FEEL Score makes emotion discussable.</h2>
              <p className="f-lede">
                A weighted score shows how much of the experience is carrying the Required Feeling.
              </p>
              <div className="f-score">
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
                              // A presentation attribute cannot resolve var();
                              // the stroke has to come through style.
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
                <div className="f-legend">
                  {SEGMENTS.map((seg) => (
                    <div key={seg.label}>
                      <i style={{ background: seg.colour }} />
                      <span><b>{seg.label}</b> · {seg.note}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="f-close-line">
                Weighted by exposure, emotional importance and proximity to commercial value.
              </p>
            </div>
          </section>

          {/* 15 · FEEL Pattern */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">FEEL Pattern</p>
              <h2 className="f-h">FEEL Pattern shows where emotion is going.</h2>
              <p className="f-lede">
                The score tells you how much. The pattern tells you where, why and what to do next.
              </p>
              <div className="f-pattern">
                {PATTERN.map((p) => (
                  <div className="f-bar" key={p.stage}>
                    <span className={`fill ${p.verdict}`} />
                    <b>{p.stage}</b>
                    <span>{p.verdict}</span>
                  </div>
                ))}
              </div>
              <p className="f-close-line">
                An example pattern: the promise is strong, but recovery breaks the feeling.
              </p>
            </div>
          </section>

          {/* 16 · FEEL Value */}
          <section className="f-slide f-paper">
            <div className="f-in">
              <p className="f-kick">FEEL Value</p>
              <h2 className="f-h">FEEL Value turns emotion into investment logic.</h2>
              <p className="f-lede">
                It identifies which emotional breaks expose the most revenue, retention, margin, trust or advocacy.
              </p>
              <div className="f-cols c5">
                {[
                  ['Conversion', 'people who were ready and stopped'],
                  ['Retention', 'people who leave without complaining'],
                  ['Price confidence', 'what the brand can ask for and hold'],
                  ['Service cost', 'the contacts a broken moment creates'],
                  ['Advocacy', 'what people are willing to say for you'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* 17 · How FEEL scores */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">How FEEL scores</p>
              <h2 className="f-h">FEEL is a triangulated diagnostic, not a survey.</h2>
              <p className="f-lede">
                The method scores evidence against a pre-agreed emotional standard.
              </p>
              <div className="f-cols c3">
                {[
                  ['Expert diagnosis', 'finds the emotional pattern'],
                  ['Audience validation', 'proves the highest risk moments'],
                  ['Commercial modelling', 'prioritises what to fix first'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
              <p className="f-close-line">
                FEEL Score reports emotional performance. Confidence Level reports the strength of the evidence behind it.
              </p>
            </div>
          </section>

          {/* 18 · The practical diagnostic */}
          <section className="f-slide f-charcoal">
            <div className="f-in">
              <p className="f-kick">The practical diagnostic</p>
              <h2 className="f-h wide">You do not need feedback on every moment. You need proof where it matters most.</h2>
              <div className="f-cols c4">
                {[
                  ['01', 'Define', 'Required Feeling'],
                  ['02', 'Map', 'the priority journey'],
                  ['03', 'Score', 'the fifteen observations'],
                  ['04', 'Identify', 'Weakens and Breaks'],
                  ['05', 'Validate', 'the highest value risks'],
                  ['06', 'Model', 'the value at stake'],
                  ['07', 'Build', 'the intervention roadmap'],
                ].map(([n, h, p]) => (
                  <div className="f-col" key={n}><span className="n">{n}</span><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
              <p className="f-close-line">
                Expert diagnosis finds the pattern. Audience validation proves the risk. Commercial modelling prioritises the work.
              </p>
            </div>
          </section>

          {/* 19 · ROI modelling */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">ROI modelling</p>
              <h2 className="f-h">Value at Stake is modelled as a range.</h2>
              <p className="f-lede">
                The method is commercial without pretending to have false precision.
              </p>
              <div className="f-model">
                <div className="f-term"><b>Audience exposed</b><span>how many people hit the moment</span></div>
                <div className="f-op">×</div>
                <div className="f-term"><b>Value pool</b><span>what behaviour or cost is affected</span></div>
                <div className="f-op">×</div>
                <div className="f-term"><b>FEEL risk</b><span>Carries, Weakens or Breaks severity</span></div>
                <div className="f-op">×</div>
                <div className="f-term"><b>Confidence range</b><span>conservative, base, upside</span></div>
                <div className="f-op">=</div>
                <div className="f-term total"><b>Value at stake</b><span>prioritised, and stated as a range</span></div>
              </div>
            </div>
          </section>

          {/* 20 · Intervention roadmap */}
          <section className="f-slide f-clay">
            <div className="f-in">
              <p className="f-kick">Intervention roadmap</p>
              <h2 className="f-h">The roadmap fixes the highest value breaks first.</h2>
              <p className="f-lede">
                FEEL moves from emotional diagnosis to a practical intervention plan.
              </p>
              <div className="f-cols c6">
                {[
                  ['Define', 'Required Feeling'],
                  ['Map', 'the fifteen observations'],
                  ['Score', 'Carries, Weakens, Breaks'],
                  ['Model', 'value at stake'],
                  ['Fix', 'priority interventions'],
                  ['Repeat', 're-score and learn'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
              <p className="f-close-line">
                Prioritise the moments where emotional failure and commercial exposure meet.
              </p>
            </div>
          </section>

          {/* 21 · From insight to action */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">From insight to action</p>
              <h2 className="f-h wide">Interventions change the moment, not just the message.</h2>
              <p className="f-lede">
                The work can show up in product, service, UX, content, environments, employee behaviour and operating rhythm.
              </p>
              <div className="f-chips">
                <span className="f-chip">Remove emotional friction</span>
                <span className="f-chip">Rewrite the moment’s tone</span>
                <span className="f-chip">Redesign the handoff</span>
                <span className="f-chip">Repair recovery behaviour</span>
                <span className="f-chip">Make distinction visible</span>
                <span className="f-chip">Re-measure the pattern</span>
              </div>
            </div>
          </section>

          {/* 22 · Complementary by design */}
          <section className="f-slide f-slate">
            <div className="f-in">
              <p className="f-kick">Complementary by design</p>
              <h2 className="f-h">FEEL complements the stack you already pay for.</h2>
              <p className="f-lede">
                It gives every partner a sharper emotional brief and a clearer performance target.
              </p>
              <div className="f-stack">
                <span className="f-chip">brand</span>
                <span className="f-chip">CX</span>
                <span className="f-chip">UX</span>
                <span className="f-chip">media</span>
                <span className="f-chip">CRM</span>
                <span className="f-chip">retail</span>
                <span className="f-chip">service</span>
                <span className="f-chip">research</span>
                <span className="core">FEEL</span>
              </div>
            </div>
          </section>

          {/* 23 · What brands get */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">What brands get</p>
              <h2 className="f-h">Brands get six management assets.</h2>
              <p className="f-lede">
                A language, a map, a score, a pattern, a value model and a roadmap.
              </p>
              <div className="f-cols c6">
                {[
                  ['Required Feeling', 'the emotional standard'],
                  ['FEEL Map', 'fifteen observations'],
                  ['FEEL Score', 'one comparable number'],
                  ['FEEL Pattern', 'where emotion is going'],
                  ['Value at Stake', 'commercial exposure'],
                  ['Roadmap', 'what to fix first'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* 24 · Why it matters now */}
          <section className="f-slide f-charcoal">
            <div className="f-in">
              <p className="f-kick">Why it matters now</p>
              <h2 className="f-h wide">Optimisation has made sameness scalable.</h2>
              <p className="f-lede">
                Automation, templates and performance systems make experiences faster to ship and easier to
                copy. Feeling becomes the harder advantage.
              </p>
              <p className="f-close-line">
                Efficiency will keep improving. Distinct emotional performance will not happen by accident.
              </p>
            </div>
          </section>

          {/* 25 · Why it holds up */}
          <section className="f-slide f-bone">
            <div className="f-in">
              <p className="f-kick">Why it holds up</p>
              <h2 className="f-h wide">What makes FEEL hard to dismiss.</h2>
              <p className="f-lede">
                It is grounded in strategy, observed in reality, expressed in plain language and linked to value.
              </p>
              <div className="f-cols c4">
                {[
                  ['Strategy led', 'it starts with Required Feeling'],
                  ['Evidence led', 'it scores actual moments'],
                  ['Decision led', 'it uses Carries, Weakens, Breaks'],
                  ['Value led', 'it prioritises the money at stake'],
                ].map(([h, p]) => (
                  <div className="f-col" key={h}><h3>{h}</h3><p>{p}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* 26 · The full stop. The crown is the punctuation: a kicker, the
              mark, one line, and nothing else on the surface. */}
          <section className="f-slide f-paper">
            <div className="f-in f-stop">
              <p className="f-kick">Simply put</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="crown" src="/images/crown-mark.webp" alt="" aria-hidden="true" />
              <p className="f-h">Experiences create feelings that enable or inhibit progress.</p>
            </div>
          </section>

          {/* 27 · Close */}
          <section className="f-slide f-charcoal" data-label="Close">
            <div className="f-in f-cover">
              <h2 className="f-h" style={{ fontSize: 'clamp(32px, 5.4vw, 60px)', maxWidth: '22ch' }}>
                Stop asking only what happened. Start measuring what it made people feel.
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
