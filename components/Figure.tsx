type FigureProps = {
  /** Mobile-first base image. Also the fallback when no desktop source is given. */
  mobile: string;
  /** Optional art-directed desktop source (applies at >= 768px). A different crop, not just a larger file. */
  desktop?: string;
  alt: string;
  /** Wrapper sizing + shape: aspect ratio, width, rounding. The image fills it via object-cover. */
  className?: string;
  /** Eager-load above-the-fold imagery (e.g. a hero). */
  priority?: boolean;
};

/**
 * Art-directed, mobile-first imagery. The <img> carries the mobile crop as the
 * base; a <source> swaps to a desktop crop at the md breakpoint. Drop in a
 * separate `desktop` asset for genuinely different framing on large screens,
 * rather than relying on one image scaling responsively.
 */
export const Figure = ({ mobile, desktop, alt, className = '', priority = false }: FigureProps) => (
  <div className={`relative overflow-hidden ${className}`}>
    <picture>
      {desktop && <source media="(min-width: 768px)" srcSet={desktop} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mobile}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  </div>
);
