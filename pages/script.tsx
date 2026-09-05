import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Manrope } from 'next/font/google';
import { SeoMeta } from '@/components/SeoMeta';
import { SCORE } from '@/lib/scriptScore';

/**
 * /script — the memory cards. Private rehearsal surface, noindex.
 *
 * ⚠ NOT a teleprompter and NOT headline-plus-body. Each screen holds ALL the
 * talking points for one set piece, large enough to take in from a few feet:
 *
 *     GLANCE AT THE WHOLE CARD → LOAD THE THOUGHT → LOOK AWAY → TALK
 *
 * Nothing paces, nothing advances itself, nothing scrolls. See
 * lib/scriptScore.ts before touching the words.
 *
 * ⚠ THE CONTENT IS FIXED, THE TYPE IS NOT. Every line has to stay on the card,
 * so the type is measured and scaled to fit (see `fit` below) rather than the
 * content being cut to make the type bigger. A card of nine lines simply sets
 * smaller than a card of five.
 *
 * ⚠ EYE-LINE IS THE DESIGN. The laptop camera sits top-centre, so the card
 * lives directly beneath it: looking from lens to card should barely move the
 * eyes, and a viewer should never see them drop. Optimise for the resulting
 * video, not page composition.
 */

// Bold and ExtraBold, loaded only on this route. The site-wide Manrope stops
// at 600, and these two cuts exist for the cards alone — adding them globally
// would put two more font files on every page for one private tool.
const cue = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-cue',
  display: 'swap',
});

const CHROME_MS = 2600;

/** Type-size search bounds, in px. */
const FS_MIN = 13;
const FS_MAX = 108;

export default function ScriptCards() {
  const [index, setIndex] = useState(0);
  const [chromeOn, setChromeOn] = useState(true);
  const chromeTimer = useRef<number | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const card = SCORE[index];
  const next = SCORE[index + 1];
  // A card's heart may be one line or several, and it may push the rest of its
  // triggers down a step.
  const anchors = Array.isArray(card.anchor) ? card.anchor : [card.anchor];
  const quiet = card.quiet ?? [];
  const atStart = index === 0;
  const atEnd = index === SCORE.length - 1;

  const go = useCallback((delta: number) => {
    setIndex((i) => Math.min(Math.max(i + delta, 0), SCORE.length - 1));
  }, []);

  // Largest type at which the whole card still fits its box. Binary search,
  // because the answer depends on line count, line length and viewport all at
  // once, and no clamp() can know all three.
  const fit = useCallback(() => {
    const box = boxRef.current;
    const el = cardRef.current;
    if (!box || !el) return;
    let lo = FS_MIN;
    let hi = FS_MAX;
    for (let i = 0; i < 14; i += 1) {
      const mid = (lo + hi) / 2;
      el.style.setProperty('--fs', `${mid}px`);
      const fits = el.scrollHeight <= box.clientHeight && el.scrollWidth <= box.clientWidth;
      if (fits) lo = mid;
      else hi = mid;
    }
    el.style.setProperty('--fs', `${lo}px`);
  }, []);

  // Before paint, so the card never appears at the wrong size first.
  useLayoutEffect(() => { fit(); }, [fit, index]);

  useEffect(() => {
    // Measured again once the real weights land: swapped fallback metrics
    // would otherwise size the card against the wrong font.
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(fit).catch(() => {});
    }
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [fit]);

  // The chrome shows on any input and gets out of the way again on its own,
  // so nothing but the words is on screen while he is talking.
  const wake = useCallback(() => {
    setChromeOn(true);
    if (chromeTimer.current) window.clearTimeout(chromeTimer.current);
    chromeTimer.current = window.setTimeout(() => setChromeOn(false), CHROME_MS);
  }, []);

  // The chrome starts visible, so this only has to schedule the hide. Calling
  // wake() here would set state synchronously inside the effect body.
  useEffect(() => {
    chromeTimer.current = window.setTimeout(() => setChromeOn(false), CHROME_MS);
    return () => { if (chromeTimer.current) window.clearTimeout(chromeTimer.current); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === ' ' || k === 'Enter' || k === 'PageDown') {
        e.preventDefault(); go(1); wake();
      } else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'Backspace' || k === 'PageUp') {
        e.preventDefault(); go(-1); wake();
      } else if (k === 'Home') {
        e.preventDefault(); setIndex(0); wake();
      } else if (k === 'End') {
        e.preventDefault(); setIndex(SCORE.length - 1); wake();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, wake]);

  return (
    <>
      <SeoMeta title="Script" description="Private rehearsal tool." path="/script" noindex />

      <style>{`
        .s-root {
          --ink:#EDEAE4; --dim:#8B8983; --gold:#BA9956;
          position:fixed; inset:0; background:#000; color:var(--ink);
          font-family:var(--font-cue), var(--font-sans);
          overflow:hidden; -webkit-font-smoothing:antialiased;
        }
        .s-root *:focus-visible { outline:2px solid var(--gold); outline-offset:4px; border-radius:3px; }

        /* Pinned near the top, under the lens. Never vertically centred. */
        .s-stage {
          position:absolute; left:0; right:0; top:clamp(30px, 5vh, 58px); bottom:100px;
          display:flex; flex-direction:column; align-items:center;
          padding:0 clamp(18px, 3vw, 40px); text-align:center;
        }
        /* The box the type is fitted to. Overflow hidden is a backstop only:
           the fitter should never leave anything outside it. */
        .s-box {
          flex:1 1 auto; width:100%; max-width:1440px; overflow:hidden;
          display:flex; justify-content:center; align-items:flex-start;
        }
        .s-card { --fs:40px; width:100%; }

        /* Section name. Orientation, not a talking point, so it is the one
           quiet thing on the card. */
        .s-label {
          font-weight:800; text-transform:uppercase;
          font-size:calc(var(--fs) * .34); line-height:1; letter-spacing:.18em;
          color:rgba(237,234,228,.42);
          margin-bottom:calc(var(--fs) * .72);
        }

        /* One continuous thought. Lines inside sit tight; groups get air. */
        .s-group + .s-group { margin-top:calc(var(--fs) * .62); }

        /* The talking points. Bold, big, high contrast, no body copy anywhere. */
        .s-line {
          font-weight:700; text-transform:uppercase;
          font-size:var(--fs); line-height:1.14; letter-spacing:-.005em;
          color:var(--ink);
        }
        /* The line that carries the card. Heavier and larger — hierarchy by
           size and weight, not by colour. */
        .s-line.anchor { font-weight:800; font-size:calc(var(--fs) * 1.14); color:#FFF; }
        /* Secondary triggers. A clear step down in size, but still bold and
           still meant to be read from across the room. */
        .s-line.quiet { font-size:calc(var(--fs) * .8); color:rgba(237,234,228,.88); }

        /* Above tablet the lines never wrap: a wrapped trigger takes two
           glances instead of one, so the fitter trades size for wholeness. */
        @media (min-width:700px) { .s-line { white-space:nowrap; } }

        .s-chrome {
          position:absolute; left:0; right:0; bottom:0; padding:18px 22px 22px;
          display:flex; align-items:center; justify-content:space-between; gap:18px;
          transition:opacity .3s ease;
        }
        .s-chrome.off { opacity:0; pointer-events:none; }
        .s-meta { display:flex; align-items:baseline; gap:14px; min-width:0; }
        .s-count { font-size:12px; font-weight:700; letter-spacing:2.4px; color:var(--dim); font-variant-numeric:tabular-nums; }
        .s-next {
          font-size:12px; font-weight:700; letter-spacing:2.4px; text-transform:uppercase;
          color:rgba(139,137,131,.7); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }
        .s-btns { display:flex; gap:8px; }
        .s-btn {
          appearance:none; background:transparent; border:1px solid #373633;
          color:var(--ink); border-radius:999px; font-weight:700;
          padding:9px 18px; font-size:13px; letter-spacing:.3px; cursor:pointer;
        }
        .s-btn:hover:not(:disabled) { border-color:var(--gold); color:var(--gold); }
        .s-btn:disabled { opacity:.3; cursor:default; }

        /* One tick per card, so position is felt rather than counted. */
        .s-prog { position:absolute; left:22px; right:22px; bottom:64px; display:flex; gap:5px; }
        .s-prog i { flex:1; height:2px; background:#2C2B28; border-radius:2px; }
        .s-prog i.on { background:var(--gold); }

        @media (prefers-reduced-motion: reduce) { .s-chrome { transition:none; } }
      `}</style>

      <div className={`s-root ${cue.variable}`} onPointerMove={wake} onPointerDown={wake}>
        <div className="s-stage">
          <div className="s-box" ref={boxRef}>
            <div className="s-card" ref={cardRef} key={card.id}>
              <p className="s-label">{card.label}</p>
              {card.groups.map((group, g) => (
                <div className="s-group" key={g}>
                  {group.map((line) => (
                    <p
                      key={line}
                      className={`s-line${anchors.includes(line) ? ' anchor' : ''}${quiet.includes(line) ? ' quiet' : ''}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="s-prog" aria-hidden>
          {SCORE.map((c, i) => <i key={c.id} className={i <= index ? 'on' : undefined} />)}
        </div>

        <div className={`s-chrome${chromeOn ? '' : ' off'}`}>
          <span className="s-meta">
            <span className="s-count">{String(index + 1).padStart(2, '0')} / {String(SCORE.length).padStart(2, '0')}</span>
            {next && <span className="s-next">Next · {next.label}</span>}
          </span>
          <span className="s-btns">
            <button type="button" className="s-btn" onClick={() => { go(-1); wake(); }} disabled={atStart}>
              Back
            </button>
            <button type="button" className="s-btn" onClick={() => { go(1); wake(); }} disabled={atEnd}>
              Next
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
