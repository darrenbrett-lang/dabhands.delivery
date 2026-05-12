import Link from 'next/link';

interface BoxCTAProps {
  href: string;
  label: string;
  /** 'light' (default) sits on light bgs; charcoal pill, green appears only on hover (filled charcoal → green arrow signal on dark).
   *  'dark' sits on dark bgs; cream pill with green arrow at rest, fills cream on hover (arrow flips to charcoal, no green on cream). */
  tone?: 'light' | 'dark';
}

export const BoxCTA = ({ href, label, tone = 'light' }: BoxCTAProps) => {
  const base =
    'group inline-flex items-center gap-3 border font-semibold text-sm md:text-base tracking-tight px-6 py-3 md:px-7 md:py-3.5 rounded-full transition-colors duration-300';

  if (tone === 'dark') {
    return (
      <Link
        href={href}
        className={`${base} border-dab-cream text-dab-cream hover:bg-dab-cream hover:text-dab-charcoal`}
      >
        {label}
        <span
          aria-hidden
          className="text-base md:text-lg text-dab-green group-hover:text-dab-charcoal transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    );
  }

  // tone === 'light'
  return (
    <Link
      href={href}
      className={`${base} border-dab-charcoal text-dab-charcoal hover:bg-dab-charcoal hover:text-dab-cream`}
    >
      {label}
      <span
        aria-hidden
        className="text-base md:text-lg text-dab-charcoal group-hover:text-dab-green transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
};
