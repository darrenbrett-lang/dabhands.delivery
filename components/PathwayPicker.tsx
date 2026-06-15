import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* A calm, optional shortcut in the hero: "Who I help" opens a small overlay
   that lays the three pathways out as a clear three-choice navigation, so a
   decisive visitor can step straight into a doorway without scrolling. */

const PATHS = [
  {
    href: '/business-and-agency-leaders',
    label: 'Business & agency leaders',
    line: 'Keeping momentum when complexity starts getting in the way.',
    bg: 'bg-moss/[0.10]',
    border: 'border-moss/30',
    hover: 'hover:border-moss/60',
    accent: 'text-moss',
  },
  {
    href: '/marketing-leaders',
    label: 'Marketing leaders',
    line: 'Getting your strongest ideas into market with their impact intact.',
    bg: 'bg-peach/[0.14]',
    border: 'border-peach/30',
    hover: 'hover:border-peach/60',
    accent: 'text-peach-deep',
  },
  {
    href: '/creators-and-founders',
    label: 'Creators & founders',
    line: 'Building the capability for your next stage of growth.',
    bg: 'bg-sage/[0.16]',
    border: 'border-sage/35',
    hover: 'hover:border-sage/60',
    accent: 'text-sage-deep',
  },
];

export const PathwayPicker = () => {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-moss transition-colors duration-300 hover:text-ink"
      >
        Who I help
        <span aria-hidden className="text-[15px] leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Who I help"
              initial={{ opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[660px] rounded-3xl border border-stone bg-bone p-6 md:p-8 shadow-[0_24px_80px_-20px_rgba(31,31,29,0.35)]"
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow text-graphite">Who I help</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="-mr-1 -mt-1 p-1 text-[22px] leading-none text-graphite transition-colors hover:text-ink"
                >
                  ×
                </button>
              </div>
              <div className="mt-5 grid gap-3">
                {PATHS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between gap-5 rounded-2xl border ${p.border} ${p.bg} ${p.hover} px-5 py-4 transition-colors duration-300`}
                  >
                    <span>
                      <span className="block font-serif text-[20px] md:text-[23px] leading-tight text-ink">{p.label}</span>
                      <span className="mt-1 block text-[14px] leading-snug text-graphite">{p.line}</span>
                    </span>
                    <span aria-hidden className={`shrink-0 text-[18px] ${p.accent} transition-transform duration-300 group-hover:translate-x-1`}>→</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
