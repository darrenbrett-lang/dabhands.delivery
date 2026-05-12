import { useState } from 'react';

interface LogoMarkProps {
  name: string;
  slug: string;
}

// Brand logo. Tries /public/images/logos/{slug}.svg first (user-provided),
// then falls back to Simple Icons CDN, then renders null.
// `filter: brightness(0) invert(1)` forces any-colour source SVGs to white.
export const LogoMark = ({ name, slug }: LogoMarkProps) => {
  const [src, setSrc] = useState(`/images/logos/${slug}.svg`);
  const [errored, setErrored] = useState(false);
  if (errored) return null;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={name}
      className="h-7 md:h-8 lg:h-10 w-auto opacity-65 hover:opacity-100 transition-opacity select-none"
      style={{ filter: 'brightness(0) invert(1)' }}
      onError={() => {
        if (src.startsWith('/images/logos/')) {
          setSrc(`https://cdn.simpleicons.org/${slug}/ffffff`);
        } else {
          setErrored(true);
        }
      }}
      draggable={false}
    />
  );
};
