// Darren's doorway portrait, cropped to the full figure (head to feet on the
// step) and framed by the wall and door. Shared by the homepage intro and each
// doorway's "What changes" module so the framing stays in sync.
export const SlatPortrait = ({
  src = '/images/darren_doorway_crop-4.jpg',
  alt = 'Darren Brett, leaning by an arched stone doorway',
  className = '',
}: {
  src?: string;
  alt?: string;
  className?: string;
}) => (
  <div className={`relative aspect-[637/736] overflow-hidden ${className}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  </div>
);
