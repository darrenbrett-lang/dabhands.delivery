import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * The film player for /intro.
 *
 * Deliberately dependency-free: a native <video> with its own chrome hidden and
 * ours drawn on top. A video player is one of the few places the platform gives
 * you nearly everything, and a library would add weight, someone else's design
 * and, on the hosted players, tracking. The film is meant to be owned: no third
 * party script, no branding, nothing phoning home.
 *
 * Captions are a real WebVTT track, OFF by default and driven ONLY by the CC
 * button. An earlier build turned them on automatically when the film was
 * muted; in use that read as the volume control toggling the captions, so the
 * two are now completely independent. Mute mutes. CC captions.
 *
 * Controls are always visible while paused, and fade out while playing until
 * the pointer moves or focus lands inside. IN FULLSCREEN they fade on
 * inactivity whether or not the film is playing, and take the cursor with
 * them, because there a paused frame is the whole screen and the chrome has
 * nowhere to sit politely. Any pointer movement brings both back.
 * Keyboard: space/k play, left/right seek, up/down volume, m mute,
 * c captions, f fullscreen.
 */

export interface FilmPlayerProps {
  /** The video file. H.264 MP4 plays everywhere; add <source>s here if we ship more. */
  src: string;
  poster: string;
  /** A portrait CUT of the film for phones — not the landscape one cropped.
      Supply it and phones get a 9:16 stage and load this file instead; leave it
      out and they get the landscape film at 16:9, which is correct but small. */
  portraitSrc?: string | null;
  portraitPoster?: string | null;
  /** WebVTT captions. Without it the CC button is not rendered at all. */
  captions?: string | null;
  /** Accessible name for the player. */
  title: string;
}

const SKIP = 5; // seconds per arrow press
/* Phones only. Tablets keep the landscape cut: at 768px wide a 16:9 film is
   still a real watch, and a 9:16 one would be enormous. */
const PHONE = '(max-width: 640px)';

const subscribe = (q: string) => (cb: () => void) => {
  const m = window.matchMedia(q);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};
/* SSR-safe: the server snapshot is false, so the markup always renders the
   landscape cut and the client corrects it, rather than mismatching hydration. */
const useMedia = (q: string) =>
  useSyncExternalStore(subscribe(q), () => window.matchMedia(q).matches, () => false);

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

export const FilmPlayer = ({ src, poster, portraitSrc, portraitPoster, captions, title }: FilmPlayerProps) => {
  const phone = useMedia(PHONE);
  /* Only go portrait when there is genuinely a portrait cut to show. */
  const portrait = phone && Boolean(portraitSrc);
  const file = portrait ? (portraitSrc as string) : src;
  const still = portrait ? portraitPoster || poster : poster;
  const video = useRef<HTMLVideoElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);
  /* wake() is memoised with no deps, so it reads fullscreen from a ref
     rather than closing over stale state. */
  const fullRef = useRef(false);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  /* What to go back to when unmuting from silence. */
  const lastVolume = useRef(1);
  const [cc, setCc] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [full, setFull] = useState(false);

  // ── the caption track ────────────────────────────────────────────────────
  // 'hidden' rather than 'disabled' keeps the cues parsed and ready, so the
  // first press of CC is instant rather than a fetch.
  const applyCc = useCallback((on: boolean) => {
    const t = video.current?.textTracks?.[0];
    if (t) t.mode = on ? 'showing' : 'hidden';
  }, []);

  useEffect(() => { applyCc(cc); }, [cc, applyCc]);

  // ── chrome hides itself while the film plays ─────────────────────────────
  const wake = useCallback(() => {
    setChrome(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    // Playing: the chrome is in the way. Fullscreen: in the way even paused.
    if (!video.current?.paused || fullRef.current) {
      hideTimer.current = window.setTimeout(() => setChrome(false), 2600);
    }
  }, []);

  const toggle = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { setStarted(true); void v.play().catch(() => {}); } else v.pause();
  }, []);

  const seekBy = useCallback((d: number) => {
    const v = video.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + d), v.duration);
    wake();
  }, [wake]);

  const toggleMute = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (v.muted || v.volume === 0) {
      // Coming back from silence: restore the level they were on, never 0.
      v.muted = false;
      v.volume = lastVolume.current || 1;
    } else {
      lastVolume.current = v.volume;
      v.muted = true;
    }
    wake();
  }, [wake]);

  const setLevel = useCallback((n: number) => {
    const v = video.current;
    if (!v) return;
    const level = Math.min(1, Math.max(0, n));
    v.volume = level;
    // Dragging to zero is a mute; dragging off zero undoes it.
    v.muted = level === 0;
    if (level > 0) lastVolume.current = level;
    wake();
  }, [wake]);

  const toggleCc = useCallback(() => {
    setCc((c) => !c);
    wake();
  }, [wake]);

  const toggleFull = useCallback(() => {
    if (!document.fullscreenElement) shell.current?.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);

  // ── wire the element up ──────────────────────────────────────────────────
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const onPlay = () => { setPlaying(true); wake(); };
    // wake() decides for itself whether a pause should hold the chrome open:
    // windowed it does, fullscreen it still fades.
    const onPause = () => { setPlaying(false); wake(); };
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onEnd = () => { setPlaying(false); setChrome(true); };
    const onVol = () => { setMuted(v.muted); setVolume(v.volume); };
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('ended', onEnd);
    v.addEventListener('volumechange', onVol);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('ended', onEnd);
      v.removeEventListener('volumechange', onVol);
    };
  }, [wake]);

  useEffect(() => {
    const onFs = () => {
      const on = Boolean(document.fullscreenElement);
      fullRef.current = on;
      setFull(on);
      // Focus the shell so the keyboard shortcuts still reach it fullscreen,
      // where there may be nothing else focused on the page.
      if (on) shell.current?.focus?.();
      wake();
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, [wake]);

  useEffect(() => () => { if (hideTimer.current) window.clearTimeout(hideTimer.current); }, []);

  // Keys only apply while focus is inside the player, so the page keeps its own.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    const onSlider = tag === 'INPUT';
    switch (e.key) {
      case ' ': case 'k': case 'K': e.preventDefault(); toggle(); break;
      case 'ArrowRight': if (!onSlider) { e.preventDefault(); seekBy(SKIP); } break;
      case 'ArrowLeft': if (!onSlider) { e.preventDefault(); seekBy(-SKIP); } break;
      case 'ArrowUp': if (!onSlider) { e.preventDefault(); setLevel((video.current?.volume ?? 0) + 0.1); } break;
      case 'ArrowDown': if (!onSlider) { e.preventDefault(); setLevel((video.current?.volume ?? 0) - 0.1); } break;
      case 'm': case 'M': toggleMute(); break;
      case 'c': case 'C': if (captions) toggleCc(); break;
      case 'f': case 'F': toggleFull(); break;
      default: return;
    }
    wake();
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;
  /* Muted or dragged to zero are the same thing to the viewer. */
  const silent = muted || volume === 0;

  return (
    <div
      ref={shell}
      className={`fp${chrome || !playing ? ' fp-wake' : ''}${full ? ' fp-full' : ''}${portrait ? ' fp-portrait' : ''}`}
      onMouseMove={wake}
      onMouseLeave={() => playing && setChrome(false)}
      onKeyDown={onKeyDown}
      onFocus={wake}
      tabIndex={-1}
    >
      <style>{`
        .fp {
          --fp-bone:#F5F1EA; --fp-ink:#1F1F1D; --fp-gold:#C9A96B;
          position:relative; width:100%; aspect-ratio:16/9; background:#000;
          overflow:hidden; isolation:isolate;
        }
        .fp-full { aspect-ratio:auto; height:100%; }
        /* The portrait cut gets a portrait stage, capped so it cannot run
           taller than the phone screen it is being watched on. */
        .fp-portrait { aspect-ratio:9/16; max-height:78svh; margin:0 auto; width:auto; }
        .fp-portrait.fp-full { max-height:none; }
        .fp:focus { outline:none; }
        /* Fullscreen with the chrome gone: nothing on screen but the film. */
        .fp-full:not(.fp-wake) { cursor:none; }
        .fp video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .fp-full video { object-fit:contain; }

        /* Captions sit above the control bar so the chrome never covers a line. */
        .fp video::cue {
          background:rgba(31,31,29,.72); color:var(--fp-bone);
          font-family:var(--font-sans, system-ui), sans-serif; font-size:.9em; line-height:1.4;
        }

        /* The opening state: the poster, and one quiet invitation. */
        .fp-open {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          border:0; padding:0; width:100%; cursor:pointer; background:transparent; z-index:3;
        }
        .fp-open::after {
          content:""; position:absolute; inset:0;
          background:radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,.18), rgba(0,0,0,.42));
          transition:opacity .5s ease;
        }
        .fp-open:hover::after { opacity:.72; }
        .fp-disc {
          position:relative; z-index:1; display:flex; align-items:center; gap:14px;
          color:var(--fp-bone); font-family:var(--font-sans, system-ui), sans-serif;
          font-size:15px; letter-spacing:.14em; text-transform:uppercase; font-weight:600;
        }
        .fp-tri {
          display:grid; place-items:center; width:64px; height:64px; border-radius:50%;
          border:1px solid rgba(245,241,234,.55); background:rgba(31,31,29,.32);
          transition:background .45s ease, border-color .45s ease, transform .45s cubic-bezier(.16,1,.3,1);
        }
        .fp-open:hover .fp-tri { background:rgba(31,31,29,.5); border-color:var(--fp-gold); transform:scale(1.05); }
        .fp-tri svg { margin-left:3px; }

        /* Controls. A hairline of gold for progress, everything else bone. */
        .fp-bar {
          position:absolute; left:0; right:0; bottom:0; z-index:4;
          padding:54px 22px 18px;
          background:linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.34) 46%, rgba(0,0,0,.74) 100%);
          opacity:0; transform:translateY(8px); pointer-events:none;
          transition:opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1);
        }
        .fp-wake .fp-bar { opacity:1; transform:none; pointer-events:auto; }
        .fp-row { display:flex; align-items:center; gap:16px; }
        .fp-btn {
          display:inline-grid; place-items:center; width:34px; height:34px; flex:none;
          background:transparent; border:0; padding:0; cursor:pointer; border-radius:6px;
          color:var(--fp-bone); opacity:.86; transition:opacity .25s ease, color .25s ease;
        }
        .fp-btn:hover { opacity:1; color:var(--fp-gold); }
        .fp-btn:focus-visible, .fp-seek:focus-visible, .fp-open:focus-visible {
          outline:2px solid var(--fp-gold); outline-offset:3px;
        }
        .fp-cc {
          width:auto; padding:0 9px; height:26px; font:600 11px/1 var(--font-sans, system-ui), sans-serif;
          letter-spacing:.1em; border:1px solid rgba(245,241,234,.45); border-radius:4px;
        }
        .fp-cc[aria-pressed="true"] { background:var(--fp-gold); border-color:var(--fp-gold); color:var(--fp-ink); opacity:1; }
        .fp-time {
          font:500 12px/1 var(--font-sans, system-ui), sans-serif; color:var(--fp-bone);
          opacity:.8; font-variant-numeric:tabular-nums; flex:none;
        }

        /* Volume stays out of the way: the slider grows out of the speaker on
           hover, or on keyboard focus, and collapses again after. */
        .fp-vol { display:flex; align-items:center; flex:none; }
        .fp-volrange {
          -webkit-appearance:none; appearance:none; background:transparent; cursor:pointer;
          width:0; opacity:0; height:22px; margin-left:0;
          transition:width .32s cubic-bezier(.16,1,.3,1), opacity .28s ease, margin-left .32s cubic-bezier(.16,1,.3,1);
        }
        .fp-vol:hover .fp-volrange, .fp-vol:focus-within .fp-volrange { width:70px; opacity:1; margin-left:8px; }
        .fp-volrange::-webkit-slider-runnable-track { height:3px; border-radius:3px; background:var(--fp-vtrack); }
        .fp-volrange::-moz-range-track { height:3px; border-radius:3px; background:var(--fp-vtrack); }
        .fp-volrange::-webkit-slider-thumb {
          -webkit-appearance:none; appearance:none; width:10px; height:10px; margin-top:-3.5px;
          border-radius:50%; background:var(--fp-bone); border:0;
        }
        .fp-volrange::-moz-range-thumb { width:10px; height:10px; border:0; border-radius:50%; background:var(--fp-bone); }
        .fp-volrange:focus-visible { outline:2px solid var(--fp-gold); outline-offset:3px; }
        @media (prefers-reduced-motion: reduce) { .fp-volrange { transition:none; } }

        /* The scrubber is a real range input, restyled. Keyboard and screen
           readers get the native behaviour for free. */
        .fp-seek { flex:1 1 auto; -webkit-appearance:none; appearance:none; background:transparent; height:22px; cursor:pointer; }
        .fp-seek::-webkit-slider-runnable-track { height:3px; border-radius:3px; background:var(--fp-track); }
        .fp-seek::-moz-range-track { height:3px; border-radius:3px; background:var(--fp-track); }
        .fp-seek::-webkit-slider-thumb {
          -webkit-appearance:none; appearance:none; width:12px; height:12px; margin-top:-4.5px;
          border-radius:50%; background:var(--fp-bone); border:0;
          transform:scale(.001); transition:transform .25s cubic-bezier(.16,1,.3,1);
        }
        .fp-seek::-moz-range-thumb { width:12px; height:12px; border:0; border-radius:50%; background:var(--fp-bone); }
        .fp-wake .fp-seek:hover::-webkit-slider-thumb,
        .fp-seek:focus-visible::-webkit-slider-thumb { transform:scale(1); }

        @media (max-width:640px) {
          .fp-bar { padding:44px 14px 14px; }
          .fp-row { gap:11px; }
          .fp-disc { font-size:12px; gap:11px; }
          .fp-tri { width:52px; height:52px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fp-bar, .fp-tri, .fp-open::after, .fp-seek::-webkit-slider-thumb { transition:none; }
        }
      `}</style>

      <video
        /* key forces a fresh element when the cut changes, so the browser does
           not try to carry the old file's state onto a different video. */
        key={file}
        ref={video}
        src={file}
        poster={still}
        title={title}
        playsInline
        preload="metadata"
        onClick={toggle}
      >
        {captions && <track kind="captions" src={captions} srcLang="en" label="English" default={false} />}
      </video>

      {!started && (
        <button type="button" className="fp-open" onClick={toggle} aria-label={`Play: ${title}`}>
          <span className="fp-disc">
            <span className="fp-tri" aria-hidden>
              <svg width="17" height="19" viewBox="0 0 17 19" fill="currentColor"><path d="M0 0l17 9.5L0 19V0z" /></svg>
            </span>
            Watch
          </span>
        </button>
      )}

      <div className="fp-bar">
        <div className="fp-row">
          <button type="button" className="fp-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? (
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><rect width="4.5" height="16" rx="1" /><rect x="9.5" width="4.5" height="16" rx="1" /></svg>
            ) : (
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0l14 8L0 16V0z" /></svg>
            )}
          </button>

          <span className="fp-time">{fmt(current)}</span>

          <input
            className="fp-seek"
            type="range"
            min={0}
            max={Number.isFinite(duration) && duration > 0 ? duration : 0}
            step={0.05}
            value={current}
            style={{ ['--fp-track' as string]: `linear-gradient(90deg, var(--fp-gold) ${pct}%, rgba(245,241,234,.28) ${pct}%)` }}
            onChange={(e) => {
              const v = video.current;
              if (!v) return;
              v.currentTime = Number(e.target.value);
              setCurrent(Number(e.target.value));
            }}
            aria-label="Seek"
            aria-valuetext={`${fmt(current)} of ${fmt(duration)}`}
          />

          <span className="fp-time">{fmt(duration)}</span>

          <div className="fp-vol">
            <button type="button" className="fp-btn" onClick={toggleMute} aria-label={silent ? 'Unmute' : 'Mute'}>
              {silent ? (
                <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor"><path d="M8 1L4 5H1v6h3l4 4V1z" /><path d="M12 6l4 4M16 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
              ) : (
                <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor">
                  <path d="M8 1L4 5H1v6h3l4 4V1z" />
                  <path d="M12 5.2a4 4 0 010 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  {/* the outer arc only appears once it is genuinely loud */}
                  {volume > 0.55 && <path d="M14.6 2.6a7.6 7.6 0 010 10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />}
                </svg>
              )}
            </button>
            <input
              className="fp-volrange"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={silent ? 0 : volume}
              /* Gold for the level, matching the progress fill: the two bars
                 then read as the same kind of measure. */
              style={{ ['--fp-vtrack' as string]: `linear-gradient(90deg, var(--fp-gold) ${(silent ? 0 : volume) * 100}%, rgba(245,241,234,.28) ${(silent ? 0 : volume) * 100}%)` }}
              onChange={(e) => setLevel(Number(e.target.value))}
              aria-label="Volume"
              aria-valuetext={`${Math.round((silent ? 0 : volume) * 100)}%`}
            />
          </div>

          {captions && (
            <button type="button" className="fp-btn fp-cc" onClick={toggleCc} aria-pressed={cc} aria-label="Captions">
              CC
            </button>
          )}

          <button type="button" className="fp-btn" onClick={toggleFull} aria-label={full ? 'Exit full screen' : 'Full screen'}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {full
                ? <path d="M6 1v5H1M10 15v-5h5" />
                : <path d="M1 6V1h5M15 10v5h-5" />}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
