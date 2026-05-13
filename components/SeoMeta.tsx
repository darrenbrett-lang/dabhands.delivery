import Head from 'next/head';

interface SeoMetaProps {
  title: string;
  description: string;
  /** Path beginning with `/`. Used to build canonical + og:url. */
  path: string;
  /** Absolute or root-relative path to the share image. Defaults to the 1200×630 brand OG card. */
  image?: string;
}

const SITE_URL = 'https://dabhands.delivery';
const SITE_NAME = 'Dab Hands';

export const SeoMeta = ({ title, description, path, image = '/og-image.png' }: SeoMetaProps) => {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — Keeping important work moving`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};
