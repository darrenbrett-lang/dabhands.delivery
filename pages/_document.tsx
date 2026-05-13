import { Html, Head, Main, NextScript } from "next/document";

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dab Hands',
  url: 'https://dabhands.delivery',
  logo: 'https://dabhands.delivery/images/dab-hands-crown-mark.svg',
  description:
    'Senior digital delivery for high-stakes work. We help modern brands get stronger digital work out into the world — keeping important work aligned, moving, and commercially effective inside complex organisations.',
  founder: {
    '@type': 'Person',
    name: 'Darren Brett',
    sameAs: 'https://www.linkedin.com/in/darren-brett-1474403/',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'db@dabhands.delivery',
    contactType: 'business',
  },
};

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta name="theme-color" content="#111111" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
