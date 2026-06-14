import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

interface TrajectoryProps {
  className?: string;
  /** Stroke colour. Defaults to lavender (primary accent). */
  stroke?: string;
  /** Peak opacity of the line; the gradient fades both ends to 0. */
  opacity?: number;
  /** Seconds before the draw begins. */
  delay?: number;
  /** Draw duration in seconds. */
  duration?: number;
  /** Stroke weight in pixels (non-scaling). */
  strokeWidth?: number;
}

/* One canonical gesture — the route of a capable hand through complexity.
   A racing line: a level run-in that lifts slightly, turns in decisively to an
   apex below the headline, then accelerates up and out off the upper right,
   exiting higher than it entered (lift, momentum). The curvature changes through
   the stroke — the turn-in is tighter than the exit — so it reads as a human
   gesture, not a clean arc. Reused at scale, this is the brand's visual core. */
const GESTURE = 'M -60 250 C 180 232, 330 244, 540 348 C 720 432, 930 322, 1300 172';

export const Trajectory = ({
  className = '',
  stroke = 'var(--color-lavender)',
  opacity = 0.65,
  delay = 0.1,
  duration = 2.3,
  strokeWidth = 1.75,
}: TrajectoryProps) => {
  const reduce = useReducedMotion();
  // useId can contain colons; sanitise for use inside url(#…).
  const gid = `traj-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 1200 640"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Fade both ends to nothing so the line passes through the page
            rather than starting and stopping. */}
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
          <stop offset="0" stopColor={stroke} stopOpacity="0" />
          <stop offset="0.13" stopColor={stroke} stopOpacity={opacity} />
          <stop offset="0.84" stopColor={stroke} stopOpacity={opacity} />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={GESTURE}
        stroke={`url(#${gid})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={reduce ? { duration: 0 } : { duration, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
};
