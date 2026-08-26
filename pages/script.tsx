import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SeoMeta } from '@/components/SeoMeta';
import { SCORE, ARC, type Card } from '@/lib/scriptScore';

/**
 * /script — the performance director.
 *
 * TEMPORARY. A rehearsal and recording aid for the 60-second film, not part of
 * the site: noindex, and absent from nav, sitemap.xml and llms.txt. The URL
 * resolves for anyone who has it. ⚠ The Basic Auth gate was REMOVED on the
 * owner's instruction (26 Aug) so the tool opens on a device without a
 * password mid-take; note this puts the unrecorded script one link away, and
 * HANDOVER's rule is that the script is spoken, never printed. Delete the
 * page, lib/scriptScore.ts and the next.config entry together when the film
 * is shot.
 *
 * The governing idea is a director sitting under the lens, not an autocue.
 * One thought owns the screen; nothing scrolls; nothing slides. Timing
 * *suggests* rather than enforces: when a thought's speaking time is up the
 * card stays fully readable and the next one ghosts in underneath, so being a
 * second slow costs nothing.
 *
 * Reading text is kept in the upper-middle of the viewport so that with the
 * laptop under the lens, eye movement is minimal. Nothing that must be read
 * lives near the bottom.
 */

type Mode = 'script' | 'cue' | 'own';
type Phase = 'setup' | 'preroll' | 'run' | 'fading' | 'black';

const STORE_SETTINGS = 'dabhands.script.settings.v1';
const STORE_SCORE = 'dabhands.script.score.v1';

const PACES = [0.8, 0.9, 0.95, 1.0, 1.1, 1.2];
/* Cross-dissolve between thoughts, in ms. 150 reads almost as a cut, 1200 is
   a slow bleed where the two thoughts overlap on screen. */
const FADES = [150, 300, 420, 700, 1200];
const ENDING_MS = 1800; // the slow fade to black after the last hold

interface Settings {
  mode: Mode;
  pace: number;
  /** Cross-dissolve duration between thoughts, in ms. */
  fade: number;
  guides: boolean;
  timing: boolean;
  fadeWords: boolean;
}

const fmtPace = (p: number) => (Number.isInteger(p * 10) ? p.toFixed(1) : String(p));

const DEFAULT_SETTINGS: Settings = { mode: 'script', pace: 1.0, fade: 420, guides: true, timing: false, fadeWords: false };

const fmtFade = (ms: number) => `${String(ms / 1000).replace(/0$/, '')}s`;

/** Split a line into emphasis, coaching marks and plain text. */
const TOKENS = /(\*\*[^*]+\*\*|↓↓|↑|↓|→|○○|○)/g;

function renderLine(line: string, guides: boolean) {
  return line.split(TOKENS).filter(Boolean).map((tok, i) => {
    if (tok.startsWith('**') && tok.endsWith('**')) {
      return <b key={i} className="s-em">{tok.slice(2, -2)}</b>;
    }
    if (/^(↓↓|↑|↓|→|○○|○)$/.test(tok)) {
      return guides ? <span key={i} className="s-mark" aria-hidden>{tok}</span> : null;
    }
    return <Fragment key={i}>{tok}</Fragment>;
  });
}

export default function ScriptDirector() {
  const [score, setScore] = useState<Card[]>(SCORE);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState<Phase>('setup');
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ghost, setGhost] = useState(false); // next thought easing into view
  const [count, setCount] = useState(3); // pre-roll
  const [chromeOn, setChromeOn] = useState(true);
  const [editing, setEditing] = useState(false);

  const reduced = useRef(false);
  const chromeTimer = useRef<number | null>(null);
  const timers = useRef<number[]>([]);
  const stage = useRef<HTMLDivElement | null>(null);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  // ── settings + edited score persist for the session and beyond ──────────
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* Restoring persisted settings requires an effect: localStorage does not
       exist during SSR, so a lazy initialiser throws on the server and a
       render-time read mismatches hydration. Runs once, on mount. */
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const s = localStorage.getItem(STORE_SETTINGS);
      if (s) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(s) });
      const sc = localStorage.getItem(STORE_SCORE);
      if (sc) setScore(JSON.parse(sc));
    } catch { /* corrupt or unavailable storage: defaults are fine */ }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORE_SETTINGS, JSON.stringify(settings)); } catch {}
  }, [settings]);

  const saveScore = (next: Card[]) => {
    setScore(next);
    try { localStorage.setItem(STORE_SCORE, JSON.stringify(next)); } catch {}
  };

  const resetScore = () => {
    setScore(SCORE);
    try { localStorage.removeItem(STORE_SCORE); } catch {}
  };

  const card = score[index];
  const next = score[index + 1];
  const total = useMemo(
    () => score.reduce((n, c) => n + c.speakDuration + c.holdDuration, 0) / settings.pace,
    [score, settings.pace],
  );

  // ── the conductor ───────────────────────────────────────────────────────
  // Two timers per card. The first only *ghosts* the next thought in — the
  // current one stays fully legible. The second makes the move. Being late
  // costs nothing because nothing is removed at the speaking mark.
  useEffect(() => {
    if (phase !== 'run' || !playing || !card) return;
    clearTimers();

    const speak = (card.speakDuration * 1000) / settings.pace;
    const hold = (card.holdDuration * 1000) / settings.pace;

    if (!reduced.current) later(() => setGhost(true), speak);
    later(() => {
      if (index < score.length - 1) {
        setGhost(false);
        setIndex((i) => i + 1);
      } else {
        setPhase('fading');
        later(() => setPhase('black'), reduced.current ? 0 : ENDING_MS);
      }
    }, speak + hold);

    return clearTimers;
  }, [phase, playing, index, card, settings.pace, score.length]);

  // ── pre-roll: 3, 2, 1, a clean beat, then the first thought ─────────────
  useEffect(() => {
    if (phase !== 'preroll') return;
    clearTimers();
    later(() => setCount(2), 1000);
    later(() => setCount(1), 2000);
    later(() => setCount(0), 3000); // numbers gone, clean lens contact
    later(() => setPhase('run'), 3850);
    return clearTimers;
  }, [phase]);

  const start = useCallback(() => {
    clearTimers();
    setIndex(0);
    setGhost(false);
    setPlaying(true);
    setEditing(false);
    setCount(3);
    setPhase('preroll');
  }, []);

  const restart = useCallback(() => { clearTimers(); setPhase('setup'); setIndex(0); setGhost(false); }, []);

  const step = useCallback((delta: number) => {
    clearTimers();
    setGhost(false);
    setPhase('run');
    setIndex((i) => Math.min(score.length - 1, Math.max(0, i + delta)));
  }, [score.length]);

  const toggleFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);

  // ── chrome hides itself while performing ────────────────────────────────
  const revealChrome = useCallback(() => {
    setChromeOn(true);
    if (chromeTimer.current) window.clearTimeout(chromeTimer.current);
    chromeTimer.current = window.setTimeout(() => setChromeOn(false), 2600);
  }, []);

  // ── keyboard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (phase === 'setup') start();
          else setPlaying((p) => !p);
          break;
        case 'ArrowRight': e.preventDefault(); step(1); break;
        case 'ArrowLeft': e.preventDefault(); step(-1); break;
        case 'r': case 'R': restart(); break;
        case 'f': case 'F': toggleFullscreen(); break;
        case 'Escape': if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); break;
        default: return;
      }
      revealChrome();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, start, step, restart, toggleFullscreen, revealChrome]);

  useEffect(() => {
    if (phase === 'setup') return;
    const onMove = () => revealChrome();
    window.addEventListener('mousemove', onMove);
    if (chromeTimer.current) window.clearTimeout(chromeTimer.current);
    chromeTimer.current = window.setTimeout(() => setChromeOn(false), 2600);
    return () => window.removeEventListener('mousemove', onMove);
  }, [phase, revealChrome]);

  const performing = phase === 'run' || phase === 'fading' || phase === 'black';
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setSettings((s) => ({ ...s, [k]: v }));

  return (
    <>
      <SeoMeta
        title="Script"
        description="Private rehearsal tool."
        path="/script"
        noindex
      />

      <style>{`
        .s-root {
          --ink:#F2F0EC; --dim:#7C7A75; --faint:#48474400; --gold:#BA9956;
          position:fixed; inset:0; background:#000; color:var(--ink);
          font-family:var(--font-sans); overflow:hidden;
          -webkit-font-smoothing:antialiased;
        }
        .s-root *:focus-visible { outline:2px solid var(--gold); outline-offset:4px; border-radius:3px; }

        /* Reading text sits high: the laptop is under the lens, so the eye
           should barely move. Nothing that must be read goes near the floor. */
        .s-stage {
          position:absolute; left:0; right:0; top:13vh; bottom:20vh;
          display:flex; align-items:flex-start; justify-content:center;
          padding:0 7vw; text-align:center;
        }
        .s-card { position:absolute; width:92vw; max-width:1500px; transition:opacity var(--s-fade, 420ms) ease; }
        .s-card.out { opacity:0; }
        .s-card.in { opacity:1; }
        .s-card.ghosting { opacity:.13; }

        .s-meta { font-size:15px; letter-spacing:3.4px; text-transform:uppercase; color:var(--dim); }
        .s-beat { margin-bottom:36px; }
        .s-lines {
          font-family:var(--font-serif); font-weight:400;
          font-size:clamp(26px, 5vw, 66px); line-height:1.3; letter-spacing:-.015em;
          transition:opacity var(--fade-words, 0ms) linear;
        }
        .s-lines .ln { display:block; }
        .s-lines.faded { opacity:.06; }
        .s-em { font-weight:400; color:#fff; }
        .s-mark { color:var(--gold); opacity:.42; font-size:.42em; vertical-align:.22em; margin:0 .12em; font-family:var(--font-sans); }

        .s-cue { font-family:var(--font-sans); }
        .s-cue .lead { font-size:clamp(26px, 4.4vw, 58px); letter-spacing:-.015em; line-height:1.22; }
        .s-cue .anchor { display:block; margin-top:18px; font-size:clamp(20px,2.7vw,34px); color:var(--dim); }

        .s-own .i1 { font-family:var(--font-serif); font-size:clamp(40px,6.4vw,88px); line-height:1.08; }
        .s-own .i2 { margin-top:22px; font-size:18px; letter-spacing:4px; text-transform:uppercase; color:var(--dim); }

        .s-time { margin-top:38px; font-size:14px; letter-spacing:3px; text-transform:uppercase; color:#5A5854; }
        .s-count { position:absolute; left:0; right:0; top:32vh; text-align:center;
                   font-family:var(--font-serif); font-size:96px; color:#5A5854; transition:opacity 300ms ease; }

        /* Progress: a hairline, not a bar. It is information, not decoration. */
        .s-prog { position:absolute; left:0; top:0; height:2px; background:var(--gold); opacity:.5; transition:width 240ms linear; }

        .s-chrome { position:absolute; left:0; right:0; bottom:0; padding:22px 26px;
                    display:flex; align-items:center; justify-content:space-between; gap:18px;
                    transition:opacity 400ms ease; }
        .s-chrome.hidden { opacity:0; pointer-events:none; }
        .s-btns { display:flex; gap:6px; flex-wrap:wrap; }
        .s-btn { font-size:13px; letter-spacing:1.8px; text-transform:uppercase; color:var(--dim);
                 background:none; padding:9px 13px; cursor:pointer; border-radius:3px; }
        .s-btn:hover { color:var(--ink); }
        .s-btn[aria-pressed="true"] { color:var(--gold); }

        /* Setup */
        .s-setup { position:absolute; inset:0; display:flex; flex-direction:column;
                   align-items:center; justify-content:center; padding:6vh 7vw; text-align:center; gap:0; }
        .s-title { font-family:var(--font-serif); font-size:clamp(28px,3.6vw,44px); line-height:1.15; }
        .s-sub { margin-top:16px; font-size:13px; letter-spacing:2.4px; text-transform:uppercase; color:var(--dim); }
        .s-facts { margin-top:34px; display:flex; gap:26px; flex-wrap:wrap; justify-content:center;
                   font-size:11px; letter-spacing:1.8px; text-transform:uppercase; color:var(--dim); }
        .s-start { margin-top:46px; font-family:var(--font-serif); font-size:26px; letter-spacing:.01em;
                   color:var(--ink); background:none; cursor:pointer; padding:12px 34px;
                   box-shadow:inset 0 0 0 1px #2E2C29; border-radius:999px; transition:box-shadow .3s ease; }
        .s-start:hover { box-shadow:inset 0 0 0 1px var(--gold); }
        .s-note { margin-top:40px; font-size:11px; letter-spacing:2.8px; text-transform:uppercase; color:#4C4A47; }
        .s-opts { margin-top:38px; display:flex; gap:22px; flex-wrap:wrap; justify-content:center; }
        .s-opt { display:flex; gap:6px; align-items:center; }
        .s-opt > span { font-size:10px; letter-spacing:2.2px; text-transform:uppercase; color:#5A5854; margin-right:4px; }

        /* Editor */
        .s-edit { position:absolute; inset:0; background:#000; overflow-y:auto; padding:40px 6vw 90px; }
        .s-edit h2 { font-family:var(--font-serif); font-size:26px; margin-bottom:6px; }
        .s-row { display:grid; grid-template-columns:34px 1fr 1fr 78px 78px; gap:10px;
                 align-items:start; padding:14px 0; border-top:1px solid #1C1B19; }
        .s-row:first-of-type { border-top:none; }
        .s-row label { display:block; font-size:9.5px; letter-spacing:1.8px; text-transform:uppercase; color:#5A5854; margin-bottom:4px; }
        .s-in, .s-ta { width:100%; background:#0B0B0A; color:var(--ink); border:1px solid #232220;
                       border-radius:4px; padding:7px 9px; font-size:13px; font-family:var(--font-sans); }
        .s-ta { min-height:64px; resize:vertical; line-height:1.5; }
        .s-idx { font-family:var(--font-serif); font-size:19px; color:#5A5854; padding-top:20px; }

        @media (prefers-reduced-motion: reduce) {
          .s-card, .s-lines, .s-count, .s-chrome, .s-prog { transition:none; }
        }
        @media (max-width:820px) {
          .s-stage { top:12vh; bottom:22vh; padding:0 6vw; }
          .s-row { grid-template-columns:1fr; }
          .s-idx { padding-top:0; }
        }
      `}</style>

      <div
        className="s-root"
        style={{ ['--s-fade' as string]: `${settings.fade}ms` }}
        onMouseMove={performing ? revealChrome : undefined}
      >
        {/* ── Setup ────────────────────────────────────────────────────── */}
        {phase === 'setup' && !editing && (
          <div className="s-setup">
            <p className="s-title">Don’t act. Think the thought.</p>
            <p className="s-sub">{ARC}</p>

            <div className="s-facts">
              <span>{score.length} thoughts</span>
              <span>{Math.floor(total / 60)}m {String(Math.round(total % 60)).padStart(2, '0')}s at {fmtPace(settings.pace)}x</span>
              <span>{settings.mode === 'script' ? 'Script' : settings.mode === 'cue' ? 'Cue' : 'Own it'}</span>
              <span>Voice guides {settings.guides ? 'on' : 'off'}</span>
            </div>

            <button type="button" className="s-start" onClick={start}>Start</button>

            <div className="s-opts">
              <div className="s-opt">
                <span>Mode</span>
                {(['script', 'cue', 'own'] as Mode[]).map((m) => (
                  <button key={m} type="button" className="s-btn" aria-pressed={settings.mode === m} onClick={() => set('mode', m)}>
                    {m === 'own' ? 'Own it' : m}
                  </button>
                ))}
              </div>
              <div className="s-opt">
                <span>Pace</span>
                {PACES.map((p) => (
                  <button key={p} type="button" className="s-btn" aria-pressed={settings.pace === p} onClick={() => set('pace', p)}>
                    {fmtPace(p)}x
                  </button>
                ))}
              </div>
              <div className="s-opt">
                <span>Dissolve</span>
                {FADES.map((f) => (
                  <button key={f} type="button" className="s-btn" aria-pressed={settings.fade === f} onClick={() => set('fade', f)}>
                    {fmtFade(f)}
                  </button>
                ))}
              </div>
              <div className="s-opt">
                <button type="button" className="s-btn" aria-pressed={settings.guides} onClick={() => set('guides', !settings.guides)}>Voice guides</button>
                <button type="button" className="s-btn" aria-pressed={settings.timing} onClick={() => set('timing', !settings.timing)}>Timing</button>
                <button type="button" className="s-btn" aria-pressed={settings.fadeWords} onClick={() => set('fadeWords', !settings.fadeWords)}>Fade words</button>
                <button type="button" className="s-btn" onClick={() => setEditing(true)}>Edit</button>
              </div>
            </div>

            <p className="s-note">Space start · ← → move · R restart · F fullscreen</p>
          </div>
        )}

        {/* ── Editor ───────────────────────────────────────────────────── */}
        {phase === 'setup' && editing && (
          <div className="s-edit">
            <h2>Score</h2>
            <p className="s-note" style={{ marginTop: 0, marginBottom: 22 }}>Changes are kept in this browser.</p>
            {score.map((c, i) => (
              <div className="s-row" key={c.id}>
                <div className="s-idx">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <label htmlFor={`beat-${c.id}`}>Beat</label>
                  <input id={`beat-${c.id}`} className="s-in" value={c.beat}
                    onChange={(e) => saveScore(score.map((x) => x.id === c.id ? { ...x, beat: e.target.value } : x))} />
                  <label htmlFor={`intent-${c.id}`} style={{ marginTop: 8 }}>Intent</label>
                  <input id={`intent-${c.id}`} className="s-in" value={c.intent}
                    onChange={(e) => saveScore(score.map((x) => x.id === c.id ? { ...x, intent: e.target.value } : x))} />
                </div>
                <div>
                  <label htmlFor={`full-${c.id}`}>Script — one line per delivery line</label>
                  <textarea id={`full-${c.id}`} className="s-ta" value={c.fullText.join('\n')}
                    onChange={(e) => saveScore(score.map((x) => x.id === c.id ? { ...x, fullText: e.target.value.split('\n') } : x))} />
                  <label htmlFor={`cue-${c.id}`} style={{ marginTop: 8 }}>Cue</label>
                  <textarea id={`cue-${c.id}`} className="s-ta" value={c.cueText.join('\n')}
                    onChange={(e) => saveScore(score.map((x) => x.id === c.id ? { ...x, cueText: e.target.value.split('\n') } : x))} />
                </div>
                <div>
                  <label htmlFor={`speak-${c.id}`}>Speak</label>
                  <input id={`speak-${c.id}`} className="s-in" type="number" step="0.1" min="0" value={c.speakDuration}
                    onChange={(e) => saveScore(score.map((x) => x.id === c.id ? { ...x, speakDuration: Number(e.target.value) } : x))} />
                </div>
                <div>
                  <label htmlFor={`hold-${c.id}`}>Hold</label>
                  <input id={`hold-${c.id}`} className="s-in" type="number" step="0.1" min="0" value={c.holdDuration}
                    onChange={(e) => saveScore(score.map((x) => x.id === c.id ? { ...x, holdDuration: Number(e.target.value) } : x))} />
                </div>
              </div>
            ))}
            <div className="s-btns" style={{ marginTop: 26 }}>
              <button type="button" className="s-btn" onClick={() => setEditing(false)}>Done</button>
              <button type="button" className="s-btn" onClick={resetScore}>Reset to default script</button>
            </div>
          </div>
        )}

        {/* ── Pre-roll ─────────────────────────────────────────────────── */}
        {phase === 'preroll' && (
          <div className="s-count" style={{ opacity: count === 0 ? 0 : 1 }}>{count || ''}</div>
        )}

        {/* ── The take ─────────────────────────────────────────────────── */}
        {performing && (
          <>
            <div className="s-prog" style={{ width: `${((index + 1) / score.length) * 100}%`, opacity: phase === 'run' ? 0.5 : 0 }} />

            <div className="s-stage" ref={stage} aria-live="polite">
              {phase === 'run' && card && (
                <div className={`s-card in${ghost && settings.mode !== 'own' ? '' : ''}`} key={card.id}>
                  <p className="s-meta s-beat">{card.beat} · {card.intent}</p>

                  {settings.mode === 'script' && (
                    <div
                      className={`s-lines${settings.fadeWords && ghost ? ' faded' : ''}`}
                      style={{ ['--fade-words' as string]: `${(card.speakDuration * 1000) / settings.pace}ms` }}
                    >
                      {card.fullText.map((line, i) => (
                        <span className="ln" key={i}>{renderLine(line, settings.guides)}</span>
                      ))}
                    </div>
                  )}

                  {settings.mode === 'cue' && (
                    <div className="s-cue">
                      <p className="lead">{card.cueText[0]}</p>
                      {card.cueText.slice(1).map((a, i) => <span className="anchor" key={i}>{a}</span>)}
                    </div>
                  )}

                  {settings.mode === 'own' && (
                    <div className="s-own">
                      <p className="i1">{card.beat}</p>
                      <p className="i2">{card.intent}</p>
                    </div>
                  )}

                  {settings.timing && (
                    <p className="s-time">
                      Speak {(card.speakDuration / settings.pace).toFixed(1)}s · Hold {(card.holdDuration / settings.pace).toFixed(1)}s · {index + 1} / {score.length}
                    </p>
                  )}
                </div>
              )}

              {/* The next thought eases in underneath as the current one's time
                  runs out. It suggests the move; it never forces it. */}
              {phase === 'run' && ghost && next && (
                <div className="s-card ghosting" aria-hidden>
                  <p className="s-meta s-beat">{next.beat} · {next.intent}</p>
                  {settings.mode === 'script' && (
                    <div className="s-lines">
                      {next.fullText.map((line, i) => (
                        <span className="ln" key={i}>{renderLine(line, settings.guides)}</span>
                      ))}
                    </div>
                  )}
                  {settings.mode === 'cue' && <div className="s-cue"><p className="lead">{next.cueText[0]}</p></div>}
                  {settings.mode === 'own' && <div className="s-own"><p className="i1">{next.beat}</p></div>}
                </div>
              )}

              {/* Last hold done: the words leave slowly and nothing replaces
                  them. No end screen, so the eye stays in the lens. */}
              {phase === 'fading' && card && (
                <div className="s-card out" style={{ transitionDuration: `${ENDING_MS}ms` }}>
                  <p className="s-meta s-beat">{card.beat} · {card.intent}</p>
                  {settings.mode === 'script' && (
                    <div className="s-lines">
                      {card.fullText.map((line, i) => (
                        <span className="ln" key={i}>{renderLine(line, settings.guides)}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={`s-chrome${chromeOn ? '' : ' hidden'}`}>
              <div className="s-btns">
                <button type="button" className="s-btn" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
                <button type="button" className="s-btn" onClick={() => step(-1)}>Prev</button>
                <button type="button" className="s-btn" onClick={() => step(1)}>Next</button>
                <button type="button" className="s-btn" onClick={restart}>Restart</button>
                <button type="button" className="s-btn" onClick={toggleFullscreen}>Fullscreen</button>
              </div>
              <div className="s-btns">
                {PACES.map((p) => (
                  <button key={p} type="button" className="s-btn" aria-pressed={settings.pace === p} onClick={() => set('pace', p)}>{fmtPace(p)}x</button>
                ))}
                {(['script', 'cue', 'own'] as Mode[]).map((m) => (
                  <button key={m} type="button" className="s-btn" aria-pressed={settings.mode === m} onClick={() => set('mode', m)}>
                    {m === 'own' ? 'Own it' : m}
                  </button>
                ))}
              </div>
              <div className="s-btns">
                {FADES.map((f) => (
                  <button key={f} type="button" className="s-btn" aria-pressed={settings.fade === f} onClick={() => set('fade', f)}>
                    {fmtFade(f)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
