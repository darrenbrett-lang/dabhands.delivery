DAB Hands — Selected Work carousel assets
=========================================

Drop per-project screen media in this folder, then tell Claude which file maps
to which project (or just match the brand name, e.g. nike.webp).

The phone screen is 9:19 portrait and uses object-cover (fills the screen and
centre-crops), so PORTRAIT assets look best. Landscape will be cropped to its
centre — for a website screenshot, capture or crop to a mobile/portrait frame.

STILL IMAGE
  - Format: WebP preferred (smallest), or JPG / PNG.
  - Aspect: 9:19 portrait, e.g. 1080 x 2280. Other ratios are centre-cropped.
  - Wiring (in pages/marketing-leaders.tsx, per card):
        media: 'image', src: '/images/work/<file>'

VIDEO  (screen recording — the premium option)
  - Format: MP4 (H.264) or WebM. Muted, seamless loop, 4-8s, <= ~2MB.
  - Aspect: 9:19 portrait.
  - Wiring:
        media: 'video', src: '/images/work/<file>'

Leave `media` unset (or 'ui') to keep the animated placeholder screen.
Paths are relative to /public, so a file here at public/images/work/nike.webp
is referenced as '/images/work/nike.webp'.
