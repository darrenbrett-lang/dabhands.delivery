import { Html, Head, Main, NextScript } from "next/document";

const DESCRIPTION =
  'Senior operational leadership for important work moving through complex organisations. Darren Brett helps digital-forward and growth-stage businesses get their best work into the world, intact.';
const LINKEDIN = 'https://www.linkedin.com/in/darren-brett-1474403/';

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://dabhands.delivery/#org',
      name: 'DAB Hands',
      url: 'https://dabhands.delivery',
      logo: 'https://dabhands.delivery/og-card-3.png',
      image: 'https://dabhands.delivery/og-card-3.png',
      slogan: 'Keeping important work moving',
      description: DESCRIPTION,
      founder: { '@id': 'https://dabhands.delivery/#darren' },
      sameAs: [LINKEDIN],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'darren@dabhands.delivery',
        contactType: 'business',
      },
      areaServed: ['United Kingdom', 'Europe'],
    },
    {
      '@type': 'Person',
      '@id': 'https://dabhands.delivery/#darren',
      name: 'Darren Brett',
      jobTitle: 'Senior digital operator',
      url: 'https://dabhands.delivery',
      worksFor: { '@id': 'https://dabhands.delivery/#org' },
      sameAs: [LINKEDIN],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dabhands.delivery/#website',
      url: 'https://dabhands.delivery',
      name: 'DAB Hands',
      inLanguage: 'en-GB',
      publisher: { '@id': 'https://dabhands.delivery/#org' },
    },
  ],
};

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta name="theme-color" content="#F5F1EA" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
