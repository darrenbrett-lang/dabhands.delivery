import Image from 'next/image';

// Darren's doorway portrait, cropped to the full figure (head to feet on the
// step) and framed by the wall and door. Shared by the homepage intro and each
// doorway's "What changes" module so the framing stays in sync. Served through
// next/image so mobile gets a right-sized AVIF/WebP derivative rather than the
// full original.
export const SlatPortrait = ({
  src = '/images/darren_doorway.webp',
  alt = 'Darren Brett, leaning by an arched stone doorway',
  className = '',
}: {
  src?: string;
  alt?: string;
  className?: string;
}) => (
  <div className={`relative aspect-[637/736] overflow-hidden ${className}`}>
    <Image
      src={src}
      alt={alt}
      fill
      quality={82}
      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 48vw, 45vw"
      className="object-cover"
    />
  </div>
);
