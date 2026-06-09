import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TickerLogo } from './TickerLogo';

// Canonical client list — single source of truth for the brand ticker, reused on
// the Experience page and the homepage / Where-we-step-in closing modules.
export const clients: Array<{ name: string; src: string; kind?: 'icon' | 'wordmark'; boost?: boolean }> = [
  { name: 'Nike', src: '/images/logos/svg/nike.svg', kind: 'icon' },
  { name: 'Volkswagen', src: '/images/logos/svg/volkswagen.svg', kind: 'icon' },
  { name: 'Audi', src: '/images/logos/svg/audi.svg', kind: 'icon' },
  { name: 'Hugo Boss', src: '/images/logos/svg/hugo-boss.svg' },
  { name: 'Tommy Hilfiger', src: '/images/logos/svg/tommy-hilfiger-mono.png', boost: true },
  { name: 'Unilever', src: '/images/logos/svg/unilever.svg', kind: 'icon' },
  { name: 'Johnson & Johnson', src: '/images/logos/svg/johnson-and-johnson.svg' },
  { name: 'Royal Mail', src: '/images/logos/svg/royal-mail-mono.png' },
  { name: 'Parcelforce', src: '/images/logos/svg/parcelforce.svg' },
  { name: 'Palantir', src: '/images/logos/svg/palantir.svg', kind: 'icon' },
  { name: 'Post Office', src: '/images/logos/svg/post-office.svg', boost: true },
  { name: 'Fortnum & Mason', src: '/images/logos/svg/fortnum-and-mason.svg' },
  { name: 'Falabella', src: '/images/logos/svg/falabella.svg' },
];

interface LogoTickerProps {
  /** Accessible label for the underlying list. */
  ariaLabel?: string;
  /** Compact row height for secondary placements (e.g. above a closing CTA). */
  compact?: boolean;
}

// Seamless infinite marquee: 3× duplicated children + w-max parent so the
// animation distance equals exactly one set's width (no flick on wrap). Dropped
// entirely under prefers-reduced-motion. Duplicated items are aria-hidden so
// screen readers see each client name once.
export const LogoTicker = ({ ariaLabel = "Clients I've worked with at scale", compact = false }: LogoTickerProps) => {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const tickerDuration = isMobile ? 23.5 : 60;
  const rowHeight = compact ? 'h-14 md:h-16' : 'h-20 md:h-24';
  const gap = compact ? 'gap-10 md:gap-14 lg:gap-16' : 'gap-12 md:gap-16 lg:gap-20';

  return (
    <div className="w-full overflow-hidden">
      <motion.ul
        key={isMobile ? 'mobile' : 'desktop'}
        aria-label={ariaLabel}
        animate={reduceMotion ? undefined : { x: ['0%', '-33.3333%'] }}
        transition={reduceMotion ? undefined : { duration: tickerDuration, repeat: Infinity, ease: 'linear' }}
        className={`flex ${gap} w-max list-none p-0 m-0`}
      >
        {[...clients, ...clients, ...clients].map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            aria-hidden={i >= clients.length}
            className={`flex-shrink-0 ${rowHeight} flex items-center justify-center`}
          >
            <TickerLogo name={c.name} src={c.src} kind={c.kind} boost={c.boost} />
          </li>
        ))}
      </motion.ul>
    </div>
  );
};
