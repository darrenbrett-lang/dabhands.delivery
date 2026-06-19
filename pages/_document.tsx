import { Html, Head, Main, NextScript } from "next/document";

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DAB Hands',
  url: 'https://dabhands.delivery',
  logo: 'https://dabhands.delivery/og-card.png',
  description:
    'Senior operational leadership for important work moving through complex organisations. Darren Brett helps digital-forward and growth-stage businesses get their best work into the world, intact.',
  founder: {
    '@type': 'Person',
    name: 'Darren Brett',
    sameAs: 'https://www.linkedin.com/in/darren-brett-1474403/',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'darren@dabhands.delivery',
    contactType: 'business',
  },
};

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta name="theme-color" content="#F5F1EA" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
