import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* Floating section label on the page's left spine. As you scroll, it crossfades
   to whichever module is crossing the viewport's vertical centre, and takes a
   light or dark tone so it stays legible on that module's background. Sections
   opt in with data-spine="Label" (+ data-spine-tone="dark" on dark grounds).
   Hidden below lg (no room in the gutter); pointer-events-none — purely an aid. */

export const SpineLabel = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<{ label: string; dark: boolean } | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-spine]'));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setActive({ label: el.dataset.spine ?? '', dark: el.dataset.spineTone === 'dark' });
          }
        }
      },
      // Collapse the root to a line at the viewport's vertical centre, so exactly
      // one section is "intersecting" at a time — the one you're reading.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] lg:left-6 lg:block">
      <AnimatePresence mode="wait">
        {active && active.label && (
          <motion.span
            key={active.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
            className={`eyebrow select-none ${active.dark ? 'text-bone/70' : 'text-ink/45'}`}
          >
            {active.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
