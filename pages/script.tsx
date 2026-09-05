import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { Manrope } from 'next/font/google';
import { SeoMeta } from '@/components/SeoMeta';
import { SCORE, RUN_SECONDS } from '@/lib/scriptScore';

/**
 * /script — the filming surface. Private, noindex. Three modes, one per way
 * of shooting:
 *
 *   DIGEST  the full thought, one card at a time, moved by hand. For prep:
 *           read it once to load the meaning.
 *   CLICK   the same full thought, headed by its cue. For filming a section
 *           at a time: read, look away, talk, move on when ready. Untimed.
 *   FLOW    the cues alone, arriving on a clock, for filming the whole piece
 *           as one continuous take.
 *
 *     DIGEST THE MEANING FIRST → THEN FLOW THROUGH THE IDEAS
 *
 * ⚠ FLOW NEVER SHOWS THE PARAGRAPHS. It gives him only where he is and where
 * he is going. The words are his. The moment the paragraph appears in FLOW it
 * is a teleprompter again: READ → RECITE, instead of THINK → TALK → GLANCE.
 *
 * ⚠ THE CONTENT IS FIXED, THE TYPE IS NOT. Nothing is ever clipped to make the
 * type bigger; the type is measured and fitted to the space (see `fit`), so a
 * long paragraph simply sets smaller than a short one.
 *
 * ⚠ EYE-LINE IS THE DESIGN. The laptop camera sits top-centre and this is read
 * from a filming position, not a desk. Everything is pinned near the top and
 * set as large as it will go. Optimise for the resulting video.
 */

// Bold and ExtraBold, loaded only on this route. The site-wide Manrope stops
// at 600, and these two cuts exist for this page alone.
const cue = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-cue',
  display: 'swap',
});

type Mode = 'digest' | 'click' | 'flow';
type FlowState = 'idle' | 'counting' | 'running' | 'paused';

const CHROME_MS = 2600;
const FS_MIN = 12;
const FS_MAX = 200;
const TICK_MS = 100;

/** Which cue is live at `t` seconds into the take. */
const cueAt = (t: number) => {
  let i = 0;
  for (let n = 0; n < SCORE.length; n += 1) if (SCORE[n].at <= t) i = n;
  return i;
};

export default function ScriptPage() {
  const [mode, setMode] = useState<Mode>('digest');
  const [index, setIndex] = useState(0);
  const [chromeOn, setChromeOn] = useState(true);
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [count, setCount] = useState(3);

  // The clock: milliseconds already banked, plus time since the last resume.
  const bankedRef = useRef(0);
  const startedRef = useRef(0);
  const chromeTimer = useRef<number | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const card = SCORE[index];
  const next = SCORE[index + 1];
  const atStart = index === 0;
  const atEnd = index === SCORE.length - 1;

  // Largest type at which the whole card still fits its box. Binary search,
  // because the answer depends on length, mode and viewport at once, and no
  // clamp() can know all three.
  const fit = useCallback(() => {
    const box = boxRef.current;
    const el = cardRef.current;
    if (!box || !el) return;
    let lo = FS_MIN;
    let hi = FS_MAX;
    for (let i = 0; i < 15; i += 1) {
      const mid = (lo + hi) / 2;
      el.style.setProperty('--fs', `${mid}px`);
      const fits = el.scrollHeight <= box.clientHeight && el.scrollWidth <= box.clientWidth;
      if (fits) lo = mid;
      else hi = mid;
    }
    el.style.setProperty('--fs', `${lo}px`);
  }, []);

  // Before paint, so a card never appears at the wrong size first.
  useLayoutEffect(() => { fit(); }, [fit, index, mode, flowState]);

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

  // The chrome starts visible, so this only has to schedule the hide.
  useEffect(() => {
    chromeTimer.current = window.setTimeout(() => setChromeOn(false), CHROME_MS);
    return () => { if (chromeTimer.current) window.clearTimeout(chromeTimer.current); };
  }, []);

  /** Put the clock at the head of card `i`, so a hand-moved card gets its full run. */
  const seek = useCallback((i: number) => {
    bankedRef.current = SCORE[i].at * 1000;
    startedRef.current = Date.now();
    setIndex(i);
  }, []);

  const step = useCallback((delta: number) => {
    setIndex((i) => {
      const n = Math.min(Math.max(i + delta, 0), SCORE.length - 1);
      if (mode === 'flow') {
        bankedRef.current = SCORE[n].at * 1000;
        startedRef.current = Date.now();
      }
      return n;
    });
  }, [mode]);

  const startFlow = useCallback(() => {
    setIndex(0);
    setCount(3);
    setFlowState('counting');
  }, []);

  const restart = useCallback(() => {
    bankedRef.current = 0;
    startedRef.current = 0;
    startFlow();
  }, [startFlow]);

  const toggleRun = useCallback(() => {
    setFlowState((s) => {
      if (s === 'running') {
        bankedRef.current += Date.now() - startedRef.current;
        return 'paused';
      }
      if (s === 'paused') {
        startedRef.current = Date.now();
        return 'running';
      }
      return s;
    });
  }, []);

  // 3 · 2 · 1, then straight into the first cue. No animation.
  useEffect(() => {
    if (flowState !== 'counting') return undefined;
    const t = window.setTimeout(() => {
      if (count > 1) setCount((c) => c - 1);
      else {
        bankedRef.current = 0;
        startedRef.current = Date.now();
        setFlowState('running');
      }
    }, 1000);
    return () => window.clearTimeout(t);
  }, [flowState, count]);

  // The clock. Derives the live cue from elapsed time, so a hand-moved card
  // and an auto-advanced one leave the sequence in the same state.
  useEffect(() => {
    if (flowState !== 'running') return undefined;
    const id = window.setInterval(() => {
      const t = (bankedRef.current + (Date.now() - startedRef.current)) / 1000;
      if (t >= RUN_SECONDS) {
        bankedRef.current = RUN_SECONDS * 1000;
        setIndex(SCORE.length - 1);
        setFlowState('paused');
        return;
      }
      setIndex(cueAt(t));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [flowState]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const fwd = k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown';
      const back = k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace';

      if (mode === 'flow') {
        if (k === ' ') {
          e.preventDefault();
          if (flowState === 'idle') startFlow(); else toggleRun();
          wake(); return;
        }
        if (k === 'r' || k === 'R') { e.preventDefault(); restart(); wake(); return; }
      } else if (k === ' ' || k === 'Enter') {
        e.preventDefault(); step(1); wake(); return;
      }

      if (fwd) { e.preventDefault(); step(1); wake(); }
      else if (back) { e.preventDefault(); step(-1); wake(); }
      else if (k === 'Home') { e.preventDefault(); if (mode === 'flow') seek(0); else setIndex(0); wake(); }
      else if (k === 'End') {
        e.preventDefault();
        if (mode === 'flow') seek(SCORE.length - 1); else setIndex(SCORE.length - 1);
        wake();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, flowState, step, seek, wake, startFlow, toggleRun, restart]);

  // Click-through can also be driven by clicking the page: right half
  // forward, left half back. Only in that mode, so DIGEST and FLOW behave
  // exactly as they did.
  const onStageClick = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (mode !== 'click') return;
    const t = e.target as HTMLElement;
    if (t.closest('.s-chrome') || t.closest('.s-modes')) return;
    step(e.clientX > window.innerWidth / 2 ? 1 : -1);
    wake();
  }, [mode, step, wake]);

  const pickMode = (m: Mode) => {
    setMode(m);
    setIndex(0);
    setFlowState('idle');
    bankedRef.current = 0;
    startedRef.current = 0;
    wake();
  };

  const counting = mode === 'flow' && flowState === 'counting';

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

        /* Mode switch. Quiet, and it hides with the rest of the chrome. */
        .s-modes {
          position:absolute; top:0; left:0; right:0; padding:14px 22px;
          display:flex; justify-content:center; gap:6px;
          transition:opacity .3s ease; z-index:2;
        }
        .s-modes.off { opacity:0; pointer-events:none; }
        .s-mode {
          appearance:none; background:transparent; border:0; cursor:pointer;
          font-family:inherit; font-weight:800; font-size:12px; letter-spacing:2.6px;
          text-transform:uppercase; color:var(--dim); padding:6px 12px; border-radius:999px;
        }
        .s-mode.on { color:#000; background:var(--ink); }
        .s-sep { align-self:center; color:#3A3936; font-size:12px; }

        /* Pinned near the top, under the lens. Never vertically centred. */
        .s-stage {
          position:absolute; left:0; right:0; top:clamp(46px, 7vh, 72px); bottom:92px;
          display:flex; flex-direction:column; align-items:center;
          padding:0 clamp(18px, 3vw, 40px); text-align:center;
        }
        /* The box the type is fitted to. Overflow hidden is a backstop only. */
        .s-box {
          flex:1 1 auto; width:100%; max-width:1440px; overflow:hidden;
          display:flex; justify-content:center; align-items:flex-start;
        }
        .s-card { --fs:40px; width:100%; }

        /* Arrival, not a transition: the new thought is simply there. No exit
           fade, so the screen is never blank between thoughts. */
        @keyframes s-arrive { from { opacity:.55; } to { opacity:1; } }
        .s-card { animation:s-arrive .16s ease-out; }

        /* DIGEST — the full thought. Both parts large; nothing is body copy. */
        .d-head {
          font-weight:800; text-transform:uppercase; color:#FFF;
          font-size:calc(var(--fs) * 1.5); line-height:1.06; letter-spacing:-.01em;
          margin-bottom:calc(var(--fs) * .62);
        }
        .d-para {
          font-weight:700; color:var(--ink);
          font-size:var(--fs); line-height:1.36; letter-spacing:-.005em;
          max-width:32ch; margin:0 auto; text-wrap:pretty;
        }

        /* FLOW — where he is, and where he is going. Nothing else. */
        .f-head {
          font-weight:800; text-transform:uppercase; color:#FFF;
          font-size:var(--fs); line-height:1.04; letter-spacing:-.015em;
        }
        .f-next {
          margin-top:calc(var(--fs) * .42);
          font-weight:800; text-transform:uppercase;
          font-size:calc(var(--fs) * .3); line-height:1.12; letter-spacing:.02em;
          color:rgba(237,234,228,.5);
        }
        /* Above tablet the cue never wraps: a wrapped cue takes two glances. */
        @media (min-width:700px) { .f-head, .f-next { white-space:nowrap; } }

        .f-count { font-weight:800; font-size:var(--fs); line-height:1; color:#FFF; }
        .f-idle { font-weight:800; text-transform:uppercase; font-size:calc(var(--fs) * .34); letter-spacing:.1em; color:var(--dim); }

        .s-chrome {
          position:absolute; left:0; right:0; bottom:0; padding:18px 22px 22px;
          display:flex; align-items:center; justify-content:space-between; gap:18px;
          transition:opacity .3s ease;
        }
        .s-chrome.off { opacity:0; pointer-events:none; }
        .s-meta { display:flex; align-items:baseline; gap:14px; min-width:0; }
        .s-count, .s-clock { font-size:12px; font-weight:700; letter-spacing:2.4px; color:var(--dim); font-variant-numeric:tabular-nums; }
        .s-btns { display:flex; gap:8px; }
        .s-btn {
          appearance:none; background:transparent; border:1px solid #373633;
          color:var(--ink); border-radius:999px; font-family:inherit; font-weight:700;
          padding:9px 18px; font-size:13px; letter-spacing:.3px; cursor:pointer;
        }
        .s-btn:hover:not(:disabled) { border-color:var(--gold); color:var(--gold); }
        .s-btn:disabled { opacity:.3; cursor:default; }

        /* One tick per cue, so position is felt rather than counted. */
        .s-prog { position:absolute; left:22px; right:22px; bottom:66px; display:flex; gap:5px; }
        .s-prog i { flex:1; height:2px; background:#2C2B28; border-radius:2px; }
        .s-prog i.on { background:var(--gold); }

        @media (prefers-reduced-motion: reduce) {
          .s-chrome, .s-modes { transition:none; }
          .s-card { animation:none; }
        }
      `}</style>

      <div className={`s-root ${cue.variable}`} onPointerMove={wake} onPointerDown={wake} onClick={onStageClick}>
        <div className={`s-modes${chromeOn ? '' : ' off'}`}>
          <button type="button" className={`s-mode${mode === 'digest' ? ' on' : ''}`} onClick={() => pickMode('digest')}>
            Digest
          </button>
          <span className="s-sep" aria-hidden>|</span>
          <button type="button" className={`s-mode${mode === 'click' ? ' on' : ''}`} onClick={() => pickMode('click')}>
            Click through
          </button>
          <span className="s-sep" aria-hidden>|</span>
          <button type="button" className={`s-mode${mode === 'flow' ? ' on' : ''}`} onClick={() => pickMode('flow')}>
            Flow
          </button>
        </div>

        <div className="s-stage">
          <div className="s-box" ref={boxRef}>
            <div className="s-card" ref={cardRef} key={`${mode}-${counting ? `c${count}` : card.id}`}>
              {mode !== 'flow' && (
                <>
                  <h1 className="d-head">{mode === 'click' ? card.flow : card.label}</h1>
                  <p className="d-para">{card.paragraph}</p>
                </>
              )}

              {mode === 'flow' && counting && <p className="f-count">{count}</p>}

              {mode === 'flow' && !counting && (
                <>
                  <h1 className="f-head">{card.flow}</h1>
                  {next
                    ? <p className="f-next">Next: {next.flow}</p>
                    : <p className="f-next">Last one</p>}
                  {flowState === 'idle' && <p className="f-idle">Press start, or space</p>}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="s-prog" aria-hidden>
          {SCORE.map((c, i) => <i key={c.id} className={i <= index ? 'on' : undefined} />)}
        </div>

        <div className={`s-chrome${chromeOn ? '' : ' off'}`}>
          <span className="s-meta">
            <span className="s-count">{String(index + 1).padStart(2, '0')} / {String(SCORE.length).padStart(2, '0')}</span>
            {mode === 'flow' && <span className="s-clock">{flowState === 'running' ? 'Running' : flowState === 'paused' ? 'Paused' : 'Ready'} · {RUN_SECONDS}s</span>}
          </span>

          <span className="s-btns">
            {mode !== 'flow' ? (
              <>
                <button type="button" className="s-btn" onClick={() => { step(-1); wake(); }} disabled={atStart}>Back</button>
                <button type="button" className="s-btn" onClick={() => { step(1); wake(); }} disabled={atEnd}>Next</button>
              </>
            ) : (
              <>
                <button type="button" className="s-btn" onClick={() => { step(-1); wake(); }} disabled={atStart}>Back</button>
                <button type="button" className="s-btn" onClick={() => { step(1); wake(); }} disabled={atEnd}>Next</button>
                {flowState === 'idle'
                  ? <button type="button" className="s-btn" onClick={() => { startFlow(); wake(); }}>Start</button>
                  : <button type="button" className="s-btn" onClick={() => { toggleRun(); wake(); }} disabled={counting}>
                      {flowState === 'running' ? 'Pause' : 'Resume'}
                    </button>}
                <button type="button" className="s-btn" onClick={() => { restart(); wake(); }}>Restart</button>
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
