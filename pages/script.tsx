import { useCallback, useEffect, useRef, useState } from 'react';
import { SeoMeta } from '@/components/SeoMeta';
import { SCORE } from '@/lib/scriptScore';

/**
 * /script — the cue cards. Private rehearsal surface, noindex.
 *
 * ⚠ NOT a teleprompter. It does not pace, it does not auto-advance and it does
 * not scroll. Darren moves it himself, one idea at a time:
 *
 *     LOOK AT THE IDEA → REMEMBER WHAT I MEAN → TALK
 *
 * The heading is the idea. The paragraph underneath is a prompt to reconnect
 * with what he means, deliberately more expansive than anything he would say,
 * and never read aloud. See lib/scriptScore.ts before touching the words.
 *
 * ⚠ EYE-LINE IS THE DESIGN. The laptop camera sits top-centre, so the card
 * lives directly beneath it: looking from lens to card should barely move the
 * eyes, and a viewer should never see them drop. Hence pinned near the top
 * rather than vertically centred, and a narrow measure so the eyes do not scan
 * sideways either. Optimise for the resulting video, not page composition.
 */

const CHROME_MS = 2600;

export default function ScriptCards() {
  const [index, setIndex] = useState(0);
  const [chromeOn, setChromeOn] = useState(true);
  const chromeTimer = useRef<number | undefined>(undefined);

  const card = SCORE[index];
  const next = SCORE[index + 1];
  const atStart = index === 0;
  const atEnd = index === SCORE.length - 1;

  const go = useCallback((delta: number) => {
    setIndex((i) => Math.min(Math.max(i + delta, 0), SCORE.length - 1));
  }, []);

  // The chrome shows on any input and gets out of the way again on its own,
  // so nothing but the card is on screen while he is talking.
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
          --ink:#F2F0EC; --dim:#8B8983; --gold:#BA9956;
          position:fixed; inset:0; background:#000; color:var(--ink);
          font-family:var(--font-sans); overflow:hidden;
          -webkit-font-smoothing:antialiased;
        }
        .s-root *:focus-visible { outline:2px solid var(--gold); outline-offset:4px; border-radius:3px; }

        /* Pinned near the top, under the lens. Never vertically centred. */
        .s-stage {
          position:absolute; left:0; right:0; top:clamp(40px, 6vh, 70px); bottom:96px;
          display:flex; flex-direction:column; align-items:center;
          padding:0 24px; text-align:center;
        }
        .s-card { width:100%; max-width:760px; }

        /* The idea. Large, because this is the thing he looks at. */
        .s-head {
          font-family:var(--font-serif); font-weight:400;
          font-size:clamp(30px, 4.4vw, 60px); line-height:1.08; letter-spacing:-.01em;
          color:#fff;
        }
        /* The prompt. Smaller and quieter: it is there to provoke the thought,
           not to be performed. Measure kept narrow so it is one glance. */
        .s-para {
          margin:clamp(20px, 3vh, 34px) auto 0; max-width:46ch;
          font-size:clamp(15px, 1.55vw, 20px); line-height:1.62; color:var(--dim);
        }

        /* Where he is going next, dim and always present, so there is never a
           visible search for the next card. */
        .s-next { margin-top:clamp(34px, 6vh, 64px); opacity:.3; }
        .s-next .lbl {
          font-size:11px; letter-spacing:2.6px; text-transform:uppercase; color:var(--dim);
        }
        .s-next .h {
          margin-top:8px; font-family:var(--font-serif);
          font-size:clamp(18px, 2vw, 26px); line-height:1.2; color:var(--ink);
        }

        .s-chrome {
          position:absolute; left:0; right:0; bottom:0; padding:20px 22px 24px;
          display:flex; align-items:center; justify-content:space-between; gap:18px;
          transition:opacity .3s ease;
        }
        .s-chrome.off { opacity:0; pointer-events:none; }
        .s-count { font-size:12px; letter-spacing:2.4px; color:var(--dim); font-variant-numeric:tabular-nums; }
        .s-btns { display:flex; gap:8px; }
        .s-btn {
          appearance:none; background:transparent; border:1px solid #37363300;
          border-color:#373633; color:var(--ink); border-radius:999px;
          padding:9px 18px; font-size:13px; letter-spacing:.3px; cursor:pointer;
        }
        .s-btn:hover:not(:disabled) { border-color:var(--gold); color:var(--gold); }
        .s-btn:disabled { opacity:.3; cursor:default; }

        /* One tick per card, so position is felt rather than counted. */
        .s-prog { position:absolute; left:22px; right:22px; bottom:70px; display:flex; gap:5px; }
        .s-prog i { flex:1; height:2px; background:#2C2B28; border-radius:2px; }
        .s-prog i.on { background:var(--gold); }

        @media (prefers-reduced-motion: reduce) {
          .s-chrome { transition:none; }
        }
      `}</style>

      <div className="s-root" onPointerMove={wake} onPointerDown={wake}>
        <div className="s-stage">
          <div className="s-card" key={card.id}>
            <h1 className="s-head">{card.heading}</h1>
            <p className="s-para">{card.paragraph}</p>
          </div>

          {next && (
            <div className="s-next" aria-hidden>
              <p className="lbl">Next</p>
              <p className="h">{next.heading}</p>
            </div>
          )}
        </div>

        <div className="s-prog" aria-hidden>
          {SCORE.map((c, i) => <i key={c.id} className={i <= index ? 'on' : undefined} />)}
        </div>

        <div className={`s-chrome${chromeOn ? '' : ' off'}`}>
          <span className="s-count">{String(index + 1).padStart(2, '0')} / {String(SCORE.length).padStart(2, '0')}</span>
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
