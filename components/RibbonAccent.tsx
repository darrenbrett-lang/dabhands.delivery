import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RibbonAccentProps {
  /** Which of the 6 accent strands to show. 2 cols × 3 rows; 1=tl, 2=tr, 3=ml, 4=mr, 5=bl, 6=br. */
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Tailwind classes for positioning + sizing. Default aspect-ratio of each cell is ~2.3:1. */
  className?: string;
  /** Very low by design — these are atmospheric, not decorative. Suggest 0.18–0.35. */
  opacity?: number;
  /** Horizontal flip. */
  flip?: boolean;
  /** Subtle scroll-tied drift, in px. */
  drift?: number;
  driftDirection?: 'right' | 'left';
  /** 'light' (default) for use on light bgs; 'dark' inverts + hue-rotates so it works on charcoal. */
  tone?: 'light' | 'dark';
}

// Maps each variant to its background-position within the 2×3 sheet.
const cellPositions: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: 100, y: 0 },
  3: { x: 0, y: 50 },
  4: { x: 100, y: 50 },
  5: { x: 0, y: 100 },
  6: { x: 100, y: 100 },
};

// Secondary ribbon accent — a single thin strand cropped from /images/ribbon_accents.png.
// Use sparingly for module transitions, behind statistics, footer flow, page endings.
// Should feel almost incidental — atmospheric, never a focal point.
export const RibbonAccent = ({
  variant = 1,
  className = '',
  opacity = 0.3,
  flip = false,
  drift = 16,
  driftDirection = 'right',
  tone = 'light',
}: RibbonAccentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = driftDirection === 'right' ? [-drift / 2, drift / 2] : [drift / 2, -drift / 2];
  const x = useTransform(scrollYProgress, [0, 1], range);
  const cell = cellPositions[variant];

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none select-none aspect-[2.3/1] ${className}`}
      style={{ x }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: 'url(/images/ribbon_accents.png)',
          backgroundSize: '200% 300%',
          backgroundPosition: `${cell.x}% ${cell.y}%`,
          backgroundRepeat: 'no-repeat',
          opacity,
          transform: flip ? 'scaleX(-1)' : undefined,
          mixBlendMode: tone === 'dark' ? 'lighten' : 'multiply',
          ...(tone === 'dark' && { filter: 'invert(1) hue-rotate(180deg)' }),
        }}
      />
    </motion.div>
  );
};
