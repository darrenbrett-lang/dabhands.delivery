import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FadeUp } from './FadeUp';

/* ── Selected Work carousel ───────────────────────────────────────────────────
   A show-don't-explain proof section. Silent chrome, loud work: the stage is
   near-monochrome (ink + bone) and the ONLY colour comes from inside the phone
   screens. A native scroll-snap gallery — no library, no autoplay, the next card
   always peeking — with swipe, arrows, dots and keyboard all wired to the same
   content. Each screen is a lightweight CSS-animated mock UI (so the section
   reads "alive" before real recordings exist); swap `media:'video'`/`'image'` +
   `src` in per project once captures land. Data-driven from a WorkCard[].

   Case study: each card may carry a `story`. On desktop it fills a fixed panel
   beside the phones, synced to the centred card; below lg the panel is hidden and
   the story lives behind a "Read case study" tap (a slide-up sheet). ── */

export type WorkUi = 'feed' | 'tiles' | 'migration' | 'shimmer' | 'chart';

export type WorkStory = {
  headline: string; // serif case-study headline — the one thing that changed
  body: string[]; // 1–3 short paragraphs of narrative
  result?: string; // optional one-line result, shown as a chip
};

export type WorkCard = {
  brand: string; // client wordmark (text)
  tag: string; // 2–3 words, e.g. "Ecommerce relaunch"
  outcome: string; // one operator-voiced line; wrap the metric in **…**
  hue: string; // the ONE colour this project brings to the stage
  screenBg?: string; // dark base behind the in-screen UI
  media?: 'video' | 'image' | 'ui'; // a real recording / still; else the mock UI
  src?: string; // path under /public for media 'video' or 'image'
  ui?: WorkUi; // which mock UI when media is 'ui' or unset
  // 'device' (default) wraps the media in our phone bezel. 'none' renders the
  // asset as-is — for a PNG/MP4 that is ALREADY a full device mockup (its own
  // frame, notch, rounded + transparent edges), so we don't double-frame it.
  frame?: 'device' | 'none';
  story?: WorkStory; // case-study narrative (panel on desktop, sheet on mobile)
};

export interface SelectedWorkContent {
  heading: string;
  intro?: string;
  cards: WorkCard[];
}

const SCREEN_BG = '#100F0D';

// Bold the metric inside an outcome line: **2×** → <b>2×</b>.
const renderOutcome = (s: string): ReactNode =>
  s.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
    seg.startsWith('**') && seg.endsWith('**') ? (
      <b key={i} className="font-semibold text-bone">
        {seg.slice(2, -2)}
      </b>
    ) : (
      <span key={i}>{seg}</span>
    ),
  );

/* ── In-screen mock UIs ───────────────────────────────────────────────────────
   Each carries the project's single hue against a dark screen. All motion is
   `.work-anim` so prefers-reduced-motion collapses it to static (see globals). */

const FEED_ROWS: [string, string][] = [
  ['72%', '46%'], ['58%', '64%'], ['80%', '38%'], ['52%', '70%'], ['66%', '44%'], ['74%', '56%'],
];
const FeedUi = ({ hue }: { hue: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="work-anim flex flex-col gap-3 px-3.5 py-4" style={{ animation: 'work-feed 8s linear infinite' }}>
      {[...FEED_ROWS, ...FEED_ROWS].map(([a, b], i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="h-8 w-8 shrink-0 rounded-full" style={{ background: i % 3 === 0 ? hue : 'rgba(245,241,235,0.12)' }} />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 rounded-full" style={{ width: a, background: 'rgba(245,241,235,0.20)' }} />
            <div className="h-2 rounded-full" style={{ width: b, background: 'rgba(245,241,235,0.10)' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TILE_H = ['46%', '72%', '54%', '88%', '60%', '78%', '50%'];
const TilesUi = ({ hue }: { hue: string }) => (
  <div className="absolute inset-0 flex flex-col">
    <div className="px-4 pt-5">
      <div className="h-2.5 w-2/3 rounded-full" style={{ background: 'rgba(245,241,235,0.22)' }} />
      <div className="mt-2 h-2 w-1/3 rounded-full" style={{ background: 'rgba(245,241,235,0.12)' }} />
    </div>
    <div className="mt-auto flex items-end gap-2 px-4 pb-6" style={{ height: '56%' }}>
      {TILE_H.map((h, i) => (
        <div
          key={i}
          className="work-anim flex-1 origin-bottom rounded-t-md"
          style={{ height: h, background: hue, opacity: 0.9, animation: `work-rise ${3 + i * 0.25}s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
    </div>
  </div>
);

const MigrationUi = ({ hue }: { hue: string }) => (
  <div className="absolute inset-0 flex flex-col gap-3 px-4 py-5">
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} className="work-anim flex items-center gap-2.5" style={{ animation: `work-tick 3.2s ease-in-out ${i * 0.45}s infinite` }}>
        <div className="grid h-5 w-5 shrink-0 place-items-center rounded-md" style={{ background: hue }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke={SCREEN_BG} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="h-2 flex-1 rounded-full" style={{ background: 'rgba(245,241,235,0.16)' }} />
      </div>
    ))}
    <div className="mt-auto">
      <div className="mb-2 h-2 w-1/3 rounded-full" style={{ background: 'rgba(245,241,235,0.12)' }} />
      <div className="h-3 w-full overflow-hidden rounded-full" style={{ background: 'rgba(245,241,235,0.10)' }}>
        <div className="work-anim h-full rounded-full" style={{ background: hue, animation: 'work-fill 3.6s ease-in-out infinite' }} />
      </div>
    </div>
  </div>
);

const ShimmerUi = ({ hue }: { hue: string }) => (
  <div className="absolute inset-0 grid grid-cols-2 content-start gap-2.5 p-3.5">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="relative overflow-hidden rounded-xl" style={{ background: 'rgba(245,241,235,0.05)' }}>
        <div className="aspect-[4/3] w-full" style={{ background: `color-mix(in srgb, ${hue} 32%, transparent)` }} />
        <div className="space-y-1.5 p-2">
          <div className="h-1.5 w-3/4 rounded-full" style={{ background: 'rgba(245,241,235,0.20)' }} />
          <div className="h-1.5 w-2/5 rounded-full" style={{ background: hue }} />
        </div>
        <div
          className="work-anim absolute inset-0"
          style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(245,241,235,0.16) 50%, transparent 65%)', animation: `work-shimmer ${3 + i * 0.3}s ease-in-out ${i * 0.25}s infinite` }}
        />
      </div>
    ))}
  </div>
);

const ChartUi = ({ hue, idx }: { hue: string; idx: number }) => {
  const id = `work-grad-${idx}`;
  const line = 'M4,78 L22,60 L40,66 L58,38 L76,46 L96,16';
  return (
    <div className="absolute inset-0 p-4">
      <div className="mb-3 h-2.5 w-1/2 rounded-full" style={{ background: 'rgba(245,241,235,0.20)' }} />
      <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="h-[78%] w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: hue, stopOpacity: 0.35 }} />
            <stop offset="1" style={{ stopColor: hue, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={`${line} L96,90 L4,90 Z`} fill={`url(#${id})`} />
        <path
          d={line}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="work-anim work-draw-path"
          style={{ stroke: hue, strokeDasharray: 300, strokeDashoffset: 300, animation: 'work-draw 3.4s ease-in-out infinite' }}
        />
      </svg>
    </div>
  );
};

const ScreenUi = ({ kind, hue, idx }: { kind: WorkUi; hue: string; idx: number }) => {
  switch (kind) {
    case 'tiles':
      return <TilesUi hue={hue} />;
    case 'migration':
      return <MigrationUi hue={hue} />;
    case 'shimmer':
      return <ShimmerUi hue={hue} />;
    case 'chart':
      return <ChartUi hue={hue} idx={idx} />;
    case 'feed':
    default:
      return <FeedUi hue={hue} />;
  }
};

const NavBtn = ({ dir, onClick, disabled }: { dir: 'prev' | 'next'; onClick: () => void; disabled: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={dir === 'prev' ? 'Previous work' : 'Next work'}
    className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 text-bone transition-colors duration-200 hover:border-bone/50 hover:bg-bone/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-bone/20 disabled:hover:bg-transparent"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={dir === 'prev' ? 'rotate-180' : ''}>
      <path d="M5.5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
);

// One phone (its screen + chrome). The caption lives outside this so it can be
// hidden on desktop, where the panel carries the words.
const Phone = ({ card, idx }: { card: WorkCard; idx: number }) =>
  card.frame === 'none' && card.src ? (
    // Pre-framed asset: already a full device, rendered as-is with a
    // silhouette-following drop shadow and no chrome of ours.
    <div className="relative aspect-[9/19] w-full" onDragStart={(e) => e.preventDefault()}>
      {card.media === 'video' ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={card.src} autoPlay muted loop playsInline className="h-full w-full object-contain" style={{ filter: 'drop-shadow(0 28px 50px rgba(0,0,0,0.55))' }} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={card.src} alt={`${card.brand} — ${card.tag}`} draggable={false} className="h-full w-full object-contain" style={{ filter: 'drop-shadow(0 28px 50px rgba(0,0,0,0.55))' }} />
      )}
    </div>
  ) : (
    <div className="rounded-[2.3rem] p-2.5 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)]" style={{ background: '#0C0C0A', border: '1px solid rgba(245,241,235,0.08)' }}>
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.8rem]" style={{ background: card.screenBg ?? SCREEN_BG }} onDragStart={(e) => e.preventDefault()}>
        {card.media === 'video' && card.src ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={card.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        ) : card.media === 'image' && card.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.src} alt={`${card.brand} — ${card.tag}`} className="h-full w-full object-cover" />
        ) : (
          <ScreenUi kind={card.ui ?? 'feed'} hue={card.hue} idx={idx} />
        )}
        <div className="pointer-events-none absolute left-1/2 top-2.5 h-1.5 w-16 -translate-x-1/2 rounded-full" style={{ background: 'rgba(245,241,235,0.18)' }} />
      </div>
    </div>
  );

export const SelectedWork = ({ content }: { content: SelectedWorkContent }) => {
  const cards = content.cards;
  const n = cards.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const rafRef = useRef<number | null>(null);
  const drag = useRef({ on: false, moved: false, startX: 0, startScroll: 0 });

  const cardEls = () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>('[data-work-card]') ?? []);

  const recompute = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardEls().forEach((el, i) => {
      const c = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(recompute);
  }, [recompute]);

  useEffect(() => {
    recompute();
    const onResize = () => recompute();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [recompute]);

  const centerOn = useCallback((i: number) => {
    const track = trackRef.current;
    const el = cardEls()[i];
    if (!track || !el) return;
    const left = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  const go = (dir: number) => centerOn(Math.min(n - 1, Math.max(0, active + dir)));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  // Desktop mouse drag-to-scroll; touch keeps native momentum scrolling. Snap is
  // suspended mid-drag, then we settle on the nearest card when the drag ends.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { on: true, moved: false, startX: e.clientX, startScroll: track.scrollLeft };
    track.style.scrollSnapType = 'none';
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!drag.current.on || !track) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    const track = trackRef.current;
    if (!drag.current.on || !track) return;
    drag.current.on = false;
    track.style.scrollSnapType = '';
    centerOn(active);
  };

  // Case-study panel (desktop) / sheet (mobile).
  const reduce = useReducedMotion();
  const activeCard = cards[active] ?? cards[0];
  const [sheetIndex, setSheetIndex] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetCard = cards[sheetIndex];
  const openSheet = (i: number) => {
    setSheetIndex(i);
    setSheetOpen(true);
  };
  const closeSheet = () => setSheetOpen(false);

  // Lock page scroll + close on Escape while the sheet is open.
  useEffect(() => {
    if (!sheetOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [sheetOpen]);

  const counter = `${String(active + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
  // Leading/trailing spacer centres the first/last card at rest. The 20px is the
  // flex `gap-5` between the spacer and the adjacent card, which would otherwise
  // push the first card off-centre on load.
  const spacer: CSSProperties = { flex: '0 0 calc((100% - min(76vw, 280px)) / 2 - 20px)' };

  return (
    <>
      <section data-hide-masthead aria-label="Selected work" className="overflow-hidden bg-black text-bone py-20 md:py-28 lg:py-32">
        <div className="u-container">
          <FadeUp>
            <p className="eyebrow text-bone/55">Selected work</p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-4 font-serif text-[26px] md:text-[34px] lg:text-[40px] leading-[1.12] tracking-[-0.01em] max-w-[42ch]">{content.heading}</h2>
          </FadeUp>
          {content.intro && (
            <FadeUp delay={0.1}>
              <p className="mt-4 text-lg text-bone/65 leading-relaxed max-w-[46ch]">{content.intro}</p>
            </FadeUp>
          )}

          {/* Desktop: a fixed narrative panel beside the scrolling phones, synced
              to the centred card. Below lg the panel is hidden and each card's
              story lives behind a "Read case study" tap (the sheet, below). */}
          <div className="mt-12 md:mt-14 lg:mt-16 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-8">
            {/* NARRATIVE PANEL — desktop only; crossfades with the active card.
                Story anchored to the top (under the copy), controls to the bottom
                (level with the phone's base) so the column reads with no void.
                Cols 1–5 of the 12-col grid. */}
            <div className="hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="border-l-2 pl-6"
                style={{ borderColor: activeCard.hue }}
              >
                <p className="eyebrow" style={{ color: activeCard.hue }}>
                  {activeCard.brand} · {activeCard.tag}
                </p>
                {activeCard.story?.headline && (
                  <h3 className="mt-4 font-serif text-[26px] xl:text-[30px] leading-[1.14] text-bone text-balance">{activeCard.story.headline}</h3>
                )}
                <div className="mt-4 max-w-[42ch] space-y-3 text-[15px] leading-relaxed text-bone/65">
                  {activeCard.story?.body ? activeCard.story.body.map((p, idx) => <p key={idx}>{p}</p>) : <p>{renderOutcome(activeCard.outcome)}</p>}
                </div>
                {activeCard.story?.result && (
                  <span className="mt-5 inline-block rounded-full px-3.5 py-1.5 text-[13px] font-medium" style={{ background: activeCard.hue, color: '#1F1F1D' }}>
                    {activeCard.story.result}
                  </span>
                )}
              </motion.div>
              <div className="mt-9 flex items-center gap-5">
                <span className="font-mono text-[13px] tracking-[0.2em] text-bone/55 tabular-nums">{counter}</span>
                <div className="flex items-center gap-2.5">
                  <NavBtn dir="prev" onClick={() => go(-1)} disabled={active === 0} />
                  <NavBtn dir="next" onClick={() => go(1)} disabled={active === n - 1} />
                </div>
              </div>
            </div>

            {/* PHONES — full-bleed track below lg; on desktop it occupies cols 6–12
                so the left edge (where the screens are clipped) sits on a gridline. */}
            <div className="lg:col-span-7 lg:col-start-6 lg:min-w-0">
              <div
                ref={trackRef}
                onScroll={onScroll}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={endDrag}
                tabIndex={0}
                role="group"
                aria-roledescription="carousel"
                aria-label="Selected work gallery"
                className="work-track relative -mx-6 flex cursor-grab gap-5 overflow-x-auto pb-2 outline-none active:cursor-grabbing md:-mx-10 lg:mx-0"
              >
                <div aria-hidden style={spacer} />
                {cards.map((card, i) => {
                  const isActive = i === active;
                  return (
                    <article
                      key={card.brand + i}
                      data-work-card
                      aria-label={`${card.brand}: ${card.tag}`}
                      className="work-snap shrink-0 transition-[transform,filter,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        width: 'min(76vw, 280px)',
                        transform: isActive ? 'scale(1)' : 'scale(0.94)',
                        filter: isActive ? 'none' : 'saturate(0.3)',
                        opacity: isActive ? 1 : 0.5,
                      }}
                    >
                      <Phone card={card} idx={i} />
                    </article>
                  );
                })}
                <div aria-hidden style={spacer} />
              </div>

              {/* Mobile caption — synced to the active card, on the page grid
                  (on desktop the side panel carries this). */}
              <div className="mt-7 lg:hidden">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="eyebrow" style={{ color: activeCard.hue }}>
                    {activeCard.brand} · {activeCard.tag}
                  </p>
                  {activeCard.story?.headline ? (
                    <p className="mt-2.5 font-serif text-[20px] leading-[1.22] text-bone text-balance">{activeCard.story.headline}</p>
                  ) : (
                    <p className="mt-2.5 text-[15px] leading-relaxed text-bone/65">{renderOutcome(activeCard.outcome)}</p>
                  )}
                  {activeCard.story && (
                    <button
                      type="button"
                      onClick={() => openSheet(active)}
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-bone/85 transition-colors hover:text-bone"
                    >
                      Read case study
                      <span aria-hidden>→</span>
                    </button>
                  )}
                </motion.div>
              </div>

              <div className="mt-9 flex items-center justify-center lg:justify-start">
                <div className="flex items-center gap-2.5" role="tablist" aria-label="Selected work">
                  {cards.map((card, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`Show ${card.brand}`}
                      onClick={() => centerOn(i)}
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: i === active ? 28 : 8, background: i === active ? 'var(--color-bone)' : 'rgba(245,241,235,0.3)' }}
                    />
                  ))}
                </div>
                <span className="ml-4 font-mono text-[12px] tracking-[0.2em] text-bone/50 tabular-nums lg:hidden">{counter}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile case-study sheet — slides up from the bottom. */}
      <AnimatePresence>
        {sheetOpen && sheetCard && (
          <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={false}>
            <motion.div
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
              onClick={closeSheet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${sheetCard.brand} case study`}
              className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-3xl px-6 pb-12 pt-3"
              style={{ background: '#26251F' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: reduce ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-bone/25" />
              <button
                type="button"
                onClick={closeSheet}
                aria-label="Close case study"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <p className="eyebrow" style={{ color: sheetCard.hue }}>
                {sheetCard.brand} · {sheetCard.tag}
              </p>
              {sheetCard.story?.headline && (
                <h3 className="mt-3 font-serif text-[26px] leading-[1.16] text-bone text-balance">{sheetCard.story.headline}</h3>
              )}
              <div className="mt-4 space-y-3.5 text-[15px] leading-relaxed text-bone/70">
                {(sheetCard.story?.body ?? []).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              {sheetCard.story?.result && (
                <span className="mt-6 inline-block rounded-full px-3.5 py-1.5 text-[13px] font-medium" style={{ background: sheetCard.hue, color: '#1F1F1D' }}>
                  {sheetCard.story.result}
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
