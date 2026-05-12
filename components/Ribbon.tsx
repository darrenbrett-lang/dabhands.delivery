import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RibbonProps {
  /** Tailwind classes for positioning + sizing the ribbon (usually absolute + width). */
  className?: string;
  /** Base opacity of the ribbon image. Defaults to 0.45 for hero, suggest 0.25–0.35 for fragments. */
  opacity?: number;
  /** Horizontal flip (mirrors the ribbon). */
  flip?: boolean;
  /** How far (in px) the ribbon drifts horizontally across the section's viewport pass. Defaults to 24. */
  drift?: number;
  /** Direction of drift. 'right' (default) or 'left'. */
  driftDirection?: 'right' | 'left';
  /** 'light' (default) blends multiply onto light bgs. 'dark' inverts + hue-rotates the image so the ribbon shows light against dark bgs while preserving the green tip. */
  tone?: 'light' | 'dark';
  /** Custom image path. Defaults to '/images/ribbon.png'. */
  imagePath?: string;
}

// Atmospheric ribbon device. Uses mix-blend-multiply so the image's white background drops
// out against cream/light section bgs and only the soft greyscale ribbon + green tip show through.
// On dark bgs (tone="dark") we invert the image and hue-rotate to preserve the green tip,
// then mix-blend-lighten so the now-black bg drops out and the light ribbon shows.
// Motion is a subtle scroll-tied horizontal drift — directional, almost imperceptible, no loops.
export const Ribbon = ({
  className = '',
  opacity = 0.45,
  flip = false,
  drift = 24,
  driftDirection = 'right',
  tone = 'light',
  imagePath = '/images/ribbon.png',
}: RibbonProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = driftDirection === 'right' ? [-drift / 2, drift / 2] : [drift / 2, -drift / 2];
  const x = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ x }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagePath}
        alt=""
        className={`w-full h-auto block ${tone === 'dark' ? 'mix-blend-lighten' : 'mix-blend-multiply'} ${flip ? 'scale-x-[-1]' : ''}`}
        style={{
          opacity,
          ...(tone === 'dark' && { filter: 'invert(1) hue-rotate(180deg)' }),
        }}
        draggable={false}
      />
    </motion.div>
  );
};
