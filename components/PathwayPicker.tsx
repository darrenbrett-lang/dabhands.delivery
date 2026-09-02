import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { withSoftBreaks } from '@/lib/softBreaks';

/* Hero quick-nav. "See where I can help" reveals the three pathways as one
   horizontal row, charcoal on bone — an effortless shortcut into a doorway for
   a decisive visitor. Opens on hover or focus, tap-toggles on touch, closes on
   Escape / outside click / scroll. Rendered through a portal so it escapes the
   hero's overflow. The header nav carries the fully keyboard-robust version.

   Placement is viewport-aware: the picker also closes /signal-to-noise, where
   the trigger is the last thing on the page, so on a phone there is no room
   beneath it. The panel flips above the trigger whenever it cannot open fully
   into view, and stays clear of both side edges. */

// The per-audience colours are retired: every item shares one hover treatment —
// a gold block matching the header nav dropdown, with a charcoal arrow for
// contrast on the gold. Inline style keeps the dynamic hover colour deterministic.
const HOVER_BLOCK = 'color-mix(in srgb, var(--color-gold) 38%, transparent)';
const HOVER_ACCENT = 'var(--color-ink)';
const PATHS = [
  { href: '/growth-stage-businesses', label: 'Growth-Stage Businesses', line: 'When the ambition is clear but the structure hasn’t caught up.', block: HOVER_BLOCK, accent: HOVER_ACCENT },
  { href: '/marketing-leaders', label: 'Marketing Leaders', line: 'When great work lands softer than it should.', block: HOVER_BLOCK, accent: HOVER_ACCENT },
  { href: '/business-and-agency-leaders', label: 'Business & Agency Leaders', line: 'When good thinking gets lost between decision and delivery.', block: HOVER_BLOCK, accent: HOVER_ACCENT },
];

// SSR-safe mounted flag without a set-state-in-effect: false on the server
// snapshot, true on the client, no subscription needed.
const subscribeNever = () => () => {};
const useMounted = () => useSyncExternalStore(subscribeNever, () => true, () => false);

// Measuring the panel has to happen before paint, or the flip is visible.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const GAP = 12; // breathing room between the trigger and the panel
const EDGE = 16; // the panel never comes closer than this to a viewport edge

type Pos = { left: number; top?: number; bottom?: number; maxHeight?: number };

/** `preferAbove` opens the panel over the trigger wherever it fits, for pages
    that put the picker at the very end of the page (/intro's close), where
    opening downwards would push it off the bottom. It still falls back to
    below when there is genuinely no room above. */
export const PathwayPicker = ({ preferAbove = false }: { preferAbove?: boolean }) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const mounted = useMounted();
  const [pos, setPos] = useState<Pos>({ left: 0, top: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Anchors the panel to whichever side of the trigger it fits on. On the first
  // open the panel has not rendered yet, so this places it below on an assumed
  // fit; the layout effect re-runs it with a real measurement before paint.
  const place = useCallback(() => {
    const t = triggerRef.current?.getBoundingClientRect();
    if (!t) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const below = vh - t.bottom - GAP - EDGE;
    const above = t.top - GAP - EDGE;
    const h = panelRef.current?.offsetHeight ?? 0;
    const w = panelRef.current?.offsetWidth ?? 0;

    // Centred on the trigger, then pulled back inside the viewport if that
    // would push an edge off-screen.
    const half = w / 2;
    const centre = t.left + t.width / 2;
    const left = w >= vw - EDGE * 2 ? vw / 2 : Math.min(Math.max(centre, half + EDGE), vw - half - EDGE);

    // Flip up only when the panel genuinely cannot fit beneath the trigger,
    // or when the caller has asked for above and there is room for it.
    const flip = preferAbove ? h <= above || above > below : h > below && above > below;
    const room = Math.max(flip ? above : below, 200);
    setPos(flip ? { left, bottom: vh - t.top + GAP, maxHeight: room } : { left, top: t.bottom + GAP, maxHeight: room });
  }, [preferAbove]);

  const show = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    place();
    setOpen(true);
  }, [place]);

  const hideSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, []);

  const hideNow = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(false);
  }, []);

  // The panel exists by now, so this is the pass that knows its real size.
  useIsoLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hideNow();
    };
    const onScrollOrResize = () => hideNow();
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      hideNow();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, hideNow]);

  return (
    <div ref={wrapRef} className="relative mt-8 inline-block" onMouseEnter={show} onMouseLeave={hideSoon}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? hideNow() : show())}
        onFocus={show}
        className="group inline-flex items-center gap-2 text-[15px] md:text-[16px] font-semibold text-ink transition-colors duration-300 hover:text-graphite"
      >
        See who I help
        {/* Plus = "reveal the options"; rotates to an × while the panel is open. */}
        <span aria-hidden className={`inline-flex leading-none transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
            <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                className="fixed z-[90] -translate-x-1/2"
                style={{ top: pos.top, bottom: pos.bottom, left: pos.left }}
                onMouseEnter={show}
                onMouseLeave={hideSoon}
              >
                <motion.div
                  ref={panelRef}
                  role="menu"
                  aria-label="Who I help"
                  initial={{ opacity: 0, y: reduce ? 0 : pos.bottom ? -8 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : pos.bottom ? -6 : 6 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{ maxHeight: pos.maxHeight }}
                  className="w-[min(94vw,920px)] overflow-y-auto overscroll-contain rounded-2xl border border-stone bg-bone text-left shadow-[0_24px_70px_-24px_rgba(31,31,29,0.4)]"
                >
                  <div className="grid grid-cols-1 divide-y divide-stone/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {PATHS.map((p, i) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        role="menuitem"
                        onClick={hideNow}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className="flex flex-col gap-1.5 px-6 py-6 transition-colors duration-200 active:bg-[color-mix(in_srgb,var(--color-gold)_38%,transparent)]"
                        style={{ backgroundColor: hovered === i ? p.block : undefined }}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-serif text-[19px] md:text-[20px] leading-tight text-ink">{p.label}</span>
                          <span
                            aria-hidden
                            className="shrink-0 transition-all duration-300"
                            style={{ color: hovered === i ? p.accent : 'rgba(31,31,29,0.55)', transform: hovered === i ? 'translateX(4px)' : 'translateX(0)' }}
                          >
                            →
                          </span>
                        </span>
                        <span className="block text-[13px] leading-snug text-graphite text-balance">{withSoftBreaks(p.line)}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
