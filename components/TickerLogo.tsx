interface TickerLogoProps {
  name: string;
  /** Local image path (SVG or PNG). Rendered via brightness(0) to force a charcoal silhouette. */
  src: string;
  /** Intrinsic dimensions so the browser reserves the aspect ratio pre-load (no reflow). */
  width: number;
  height: number;
  /** Icon-shaped marks render at icon height; wordmarks are capped shorter so icons aren't overshadowed.
   *  `boost` lifts a too-small wordmark up to icon scale. */
  kind?: 'icon' | 'wordmark';
  boost?: boolean;
}

export const TickerLogo = ({ name, src, width, height, kind = 'wordmark', boost = false }: TickerLogoProps) => {
  const sizeClasses =
    kind === 'icon'
      ? 'h-12 md:h-14 w-auto'
      : boost
        ? 'h-11 md:h-14 w-auto max-w-[180px]'
        : 'h-7 md:h-9 w-auto max-w-[140px] md:max-w-[180px]';

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={name}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{ filter: 'brightness(0)' }}
      className={`${sizeClasses} object-contain opacity-70 hover:opacity-100 transition-opacity`}
    />
  );
};
