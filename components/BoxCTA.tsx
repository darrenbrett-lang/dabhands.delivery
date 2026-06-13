import Link from 'next/link';

interface BoxCTAProps {
  href: string;
  label: string;
  /** 'light' sits on bone/paper (ink outline, fills ink on hover).
   *  'dark' sits on plum (bone outline, fills bone on hover). Never loud. */
  tone?: 'light' | 'dark';
}

export const BoxCTA = ({ href, label, tone = 'light' }: BoxCTAProps) => {
  const base =
    'group inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-medium text-[15px] tracking-[-0.01em] transition-colors duration-300';
  const tones = {
    light: 'border-ink/25 text-ink hover:bg-ink hover:text-bone',
    dark: 'border-bone/35 text-bone hover:bg-bone hover:text-ink',
  } as const;

  return (
    <Link href={href} className={`${base} ${tones[tone]}`}>
      {label}
      <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
};
