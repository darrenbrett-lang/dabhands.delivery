import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HandUnderlineProps {
  children: ReactNode;
  /** Seconds delay before the underline fades in (after the surrounding copy has settled). */
  delay?: number;
  /** Alternative path data for natural variation between instances. */
  variant?: 1 | 2 | 3 | 4;
  /** 'dark' (default) uses lavender on plum/dark backgrounds.
   *  'light' uses coral on bone/paper backgrounds. */
  tone?: 'dark' | 'light';
  /** Stroke colour override. Takes precedence over `tone`. */
  stroke?: string;
}

const PATHS: Record<NonNullable<HandUnderlineProps['variant']>, string> = {
  1: 'M 3 4.5 Q 50 2.5 97 3.6',
  2: 'M 3 3.8 Q 50 5 97 3.2',
  3: 'M 2 4 Q 35 3 65 4.4 T 98 3.5',
  4: 'M 3 3.6 Q 30 5 60 3.4 T 97 4.4',
};

const TONE_STROKE: Record<NonNullable<HandUnderlineProps['tone']>, string> = {
  dark: 'var(--color-lavender)',
  light: 'var(--color-coral)',
};

export const HandUnderline = ({
  children,
  delay = 1.2,
  variant = 1,
  tone = 'dark',
  stroke,
}: HandUnderlineProps) => {
  const resolvedStroke = stroke ?? TONE_STROKE[tone];
  // When the underline is the same colour as the body text (charcoal on cream),
  // push it down a few extra pixels so it doesn't read as a descender.
  const sameColourAsText = resolvedStroke === 'var(--color-ink)';
  const offsetClass = sameColourAsText ? '-bottom-[8px]' : '-bottom-[3px]';
  return (
    <span className="relative inline-block">
      {children}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
        className={`pointer-events-none absolute left-0 ${offsetClass} w-full h-2`}
      >
        <path d={PATHS[variant]} stroke={resolvedStroke} strokeWidth="1.6" strokeLinecap="round" />
      </motion.svg>
    </span>
  );
};
