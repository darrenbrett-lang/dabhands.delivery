import { motion, useReducedMotion } from 'framer-motion';

interface DabMarkProps {
  className?: string;
  /** Seconds before the mark draws on mount. */
  delay?: number;
}

/* The signature dab — one confident stroke, the same hand as the page
   trajectory, distilled to a single gesture. A mark left behind, not an icon.
   Inherits currentColor so it takes the wordmark's colour on any background. */
export const DabMark = ({ className = '', delay = 0.5 }: DabMarkProps) => {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 44 26"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d="M3 15 C 9 23, 16 23, 22 14 C 26 8, 32 5, 41 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
};
