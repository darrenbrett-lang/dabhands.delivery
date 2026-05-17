import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface StatPopoverProps {
  number: React.ReactNode;
  content: string;
  source: string;
  /** Anchor edge of the popover. 'start' = left-aligned, 'end' = right-aligned. */
  align?: 'start' | 'end';
}

export const StatPopover = ({ number, content, source, align = 'start' }: StatPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoverModeRef = useRef(false);
  const closeTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    hoverModeRef.current = window.matchMedia('(hover: hover)').matches;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // On mobile the modal backdrop handles outside taps; the wrapRef test would
    // misfire because the portal renders outside wrapRef.
    if (!isMobile) document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, isMobile]);

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }, []);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  };
  const handleEnter = () => {
    cancelClose();
    if (hoverModeRef.current) setOpen(true);
  };
  const handleLeave = () => {
    if (hoverModeRef.current) {
      closeTimerRef.current = window.setTimeout(() => setOpen(false), 150);
    }
  };
  const handleClick = () => {
    if (!hoverModeRef.current) setOpen((o) => !o);
  };

  const anchorClass = align === 'end' ? 'right-0' : 'left-0';

  const cardBody = (
    <>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center text-dab-charcoal/60 hover:text-dab-charcoal transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      <p className="text-base leading-relaxed pr-6">{content}</p>
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-charcoal/55 mt-4">
        {source}
      </p>
    </>
  );

  return (
    <div
      ref={wrapRef}
      className="relative inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="text-[72px] md:text-[96px] font-semibold leading-none tracking-[-0.04em] text-dab-green underline decoration-2 underline-offset-[0.12em] hover:opacity-80 transition-opacity cursor-pointer"
      >
        {number}
      </button>

      {/* Desktop: popover anchored to the stat number. */}
      <AnimatePresence>
        {open && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute z-30 ${anchorClass} top-[calc(100%+0.75rem)] w-[min(88vw,30rem)] bg-dab-cream text-dab-charcoal p-6 md:p-7 rounded-md shadow-2xl`}
            role="dialog"
            aria-modal="false"
          >
            {cardBody}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: centred modal in a portal so transformed ancestors can't shift it. */}
      {isMobile &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <div
                  className="absolute inset-0 bg-dab-charcoal/70"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />
                <motion.div
                  className="relative w-[min(88vw,30rem)] bg-dab-cream text-dab-charcoal p-6 rounded-md shadow-2xl"
                  role="dialog"
                  aria-modal="true"
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {cardBody}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
