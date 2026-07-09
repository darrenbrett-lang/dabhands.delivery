import { Html, Head, Main, NextScript } from "next/document";

const DESCRIPTION =
  'DAB Hands keeps important work moving. Senior operational leadership for organisations where good thinking needs to survive the journey from decision to delivery, from focused programmes to longer-running support. Led by Darren Brett, with more than 20 years helping global brands and tier-one agencies move important digital work from idea to market.';
const LINKEDIN = 'https://www.linkedin.com/in/darren-brett-1474403/';
const KNOWS_ABOUT = [
  'Operational leadership',
  'Digital delivery',
  'Programme and campaign delivery',
  'Organisational effectiveness',
  'Marketing operations',
  'Scaling growth-stage businesses',
];

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://dabhands.delivery/#org',
      name: 'DAB Hands',
      url: 'https://dabhands.delivery',
      // Google's logo guidance wants a roughly square mark, not the wide OG card.
      logo: 'https://dabhands.delivery/icon-512.png',
      image: 'https://dabhands.delivery/og-card-3.png',
      slogan: 'Keeping important work moving',
      description: DESCRIPTION,
      founder: { '@id': 'https://dabhands.delivery/#darren' },
      sameAs: [LINKEDIN],
      knowsAbout: KNOWS_ABOUT,
      areaServed: ['United Kingdom', 'Europe'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'darren@dabhands.delivery',
        contactType: 'business',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'How DAB Hands helps',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'For Business & Agency Leaders',
              description: 'Helping leadership teams close the gap between what they intend to deliver and what actually gets done.',
              url: 'https://dabhands.delivery/business-and-agency-leaders',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'For Marketing Leaders',
              description: 'Helping marketing leaders close the gap between the brief and what reaches the customer.',
              url: 'https://dabhands.delivery/marketing-leaders',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'For Growth-Stage Businesses',
              description: 'Helping fast-growing businesses build the structure to sustain what they have created.',
              url: 'https://dabhands.delivery/growth-stage-businesses',
            },
          },
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://dabhands.delivery/#darren',
      name: 'Darren Brett',
      jobTitle: 'Senior digital operator',
      description:
        'Darren Brett provides senior operational leadership that keeps important work moving through complex organisations, closing the gap between what leadership teams intend to deliver and what actually gets done.',
      image: 'https://dabhands.delivery/images/darren_doorway.webp',
      url: 'https://dabhands.delivery',
      worksFor: { '@id': 'https://dabhands.delivery/#org' },
      knowsAbout: KNOWS_ABOUT,
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
    <Html lang="en-GB" data-scroll-behavior="smooth">
      <Head>
        <meta name="theme-color" content="#F5F1EA" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
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
