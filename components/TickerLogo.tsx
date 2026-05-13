interface TickerLogoProps {
  name: string;
  /** Simple Icons slug. If null, renders the brand name as text instead. */
  slug: string | null;
}

// Renders a brand mark in cream (#F3F0EA) on the dark ticker.
// Either a Simple Icons monochrome SVG, or the brand name as styled text.
export const TickerLogo = ({ name, slug }: TickerLogoProps) => {
  if (slug) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={`https://cdn.simpleicons.org/${slug}/F3F0EA`}
        alt={name}
        className="h-10 md:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity"
      />
    );
  }

  return (
    <span
      aria-label={name}
      className="text-[20px] md:text-[24px] font-semibold tracking-[-0.022em] text-dab-cream opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
    >
      {name}
    </span>
  );
};
