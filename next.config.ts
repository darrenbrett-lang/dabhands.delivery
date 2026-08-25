import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Next 16 coerces quality props to the nearest allowed value; register the
    // 82 the hero/doorway images actually request alongside the 75 default.
    qualities: [75, 82],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Private, unlisted Eterna workspace: the hub (/for/eterna) and every
        // document under it (/for/eterna/*). Belt-and-braces alongside each
        // page's in-page noindex meta: an HTTP-level noindex for bots that
        // ignore it.
        source: "/for/eterna",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/for/eterna/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        // Private, unlisted design-system reference (/design-system). Same
        // belt-and-braces as the proposal pages: an HTTP-level noindex to
        // back up the in-page noindex meta. Kept out of nav, sitemap and
        // llms.txt so nothing links to it.
        source: "/design-system",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        // Unlisted diagnostic page (/signal-to-noise). Same belt-and-braces
        // as the other private pages: an HTTP-level noindex backing the
        // in-page meta. Kept out of nav, sitemap and llms.txt, but the route
        // still resolves so the link can be shared directly.
        // Forwardable intro page (/intro). Unlisted on the same terms as
        // /signal-to-noise: shareable by direct link, invisible to crawlers,
        // and absent from nav, sitemap.xml and llms.txt.
        source: "/intro",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/signal-to-noise",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*).(svg|png|jpg|jpeg|webp|avif|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
