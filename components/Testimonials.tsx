import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/*
 * The testimonials carousel: an editorial quote against a thin left rule, no
 * box. One quote at a time, crossfaded; rotation pauses for reduced motion;
 * the pips stay clickable. Extracted from OperatorTemplate so the homepage
 * can carry the master carousel; `tone` adapts it to its ground: "dark" for
 * the rooms' slate trust panels, "light" for bone.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const TONES = {
  dark: {
    rule: 'border-bone/25',
    quote: 'text-bone',
    name: 'text-bone',
    role: 'text-bone/85',
    pipActive: 'bg-bone',
    pip: 'bg-bone/30 hover:bg-bone/55',
  },
  light: {
    rule: 'border-stone',
    quote: 'text-ink',
    name: 'text-ink',
    role: 'text-graphite',
    pipActive: 'bg-ink',
    pip: 'bg-ink/25 hover:bg-ink/45',
  },
} as const;

export const Testimonials = ({
  items,
  interval = 6000,
  tone = 'dark',
}: {
  items: Testimonial[];
  interval?: number;
  tone?: keyof typeof TONES;
}) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const t = TONES[tone];
  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [active, reduce, items.length, interval]);
  return (
    <div>
      {/* All quotes share one grid cell so the block is always the height of the
          tallest testimonial — the pips below never jump as the quote changes,
          and the left rule keeps a constant height. */}
      <div className={`grid border-l-2 pl-6 md:pl-8 ${t.rule}`}>
        {items.map((item, i) => (
          <motion.figure
            key={i}
            aria-hidden={i !== active}
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: 'easeInOut' }}
            style={{ gridArea: '1 / 1' }}
            className={i === active ? '' : 'pointer-events-none'}
          >
            <blockquote className={`font-serif text-[18px] md:text-[20px] leading-[1.6] ${t.quote}`}>“{item.quote}”</blockquote>
            <figcaption className="mt-5 not-italic">
              <span className={`block text-[15px] font-medium ${t.name}`}>{item.name}</span>
              <span className={`block text-[13px] ${t.role}`}>{item.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="mt-6 flex gap-0.5">
        {items.map((_, i) => (
          /* 24px+ touch target (WCAG target-size); the visible pip is the inner span. */
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className="flex h-6 min-w-6 items-center justify-center"
          >
            <span
              aria-hidden
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? `w-7 ${t.pipActive}` : `w-2 ${t.pip}`}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
