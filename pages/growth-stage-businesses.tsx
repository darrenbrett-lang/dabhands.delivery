import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'growth-stage-businesses',
  navLabel: 'Growth-Stage Businesses',
  eyebrow: 'For Growth-Stage Businesses',
  accent: 'lavender',
  hero: {
    headline: 'Growth creates complexity faster than capability.',
    subline: 'I help fast-growing businesses build the capability to sustain their growth.',
    image: '/images/momentum/03-growth.jpg',
  },
  validation: {
    heading: 'The growth is real.',
    paras: [
      'Revenue is growing. The team is expanding. Customers are arriving. The opportunities keep coming.',
      'The challenge isn’t finding the next opportunity. It’s building a business that can keep pace with the one you’ve already created.',
    ],
    coda: 'It’s creating the capability\nto sustain the growth.',
  },
  diagnosis: {
    thesis: 'Growth doesn’t create the problem.\nIt reveals it.',
    argument: [
      'It happens gradually. Another hire. Another product. Another priority.',
      'Every stage changes how the business works. Decisions slow. Priorities collide. More rides on fewer people.',
    ],
    resolution: 'Eventually, it outgrows the way it was built to run.',
  },
  outcomes: {
    heading: 'I help businesses keep growing\nwithout breaking.',
    paras: [
      'I’ve built and scaled a business of my own, so I know how quickly success creates complexity.',
      'One of the biggest shifts isn’t operational. It’s strategic. Growth already creates more opportunities than any organisation can pursue well, and AI creates even more. The question is no longer what the business could do. It’s what it should do.',
      'I help leadership teams become clear about where the business is trying to create value, then build the operating rhythms, structures and ways of working that help the organisation move in that direction together.',
      'The outcome isn’t more process.',
      'It’s a business that becomes stronger as it grows.',
    ],
  },
  help: {
    heading: 'Typical engagements',
    intro: 'The situations where growth-stage businesses\nusually bring me in.',
    situations: [
      {
        heading: 'The founder can no longer\nbe the operating system',
        body: 'The business has reached a point where too much depends on a handful of people. I help build the structure, rhythms and clarity that allow the organisation to scale beyond its founders.',
        enquiry: {
          subject: 'Scaling beyond the founders',
          body: 'Too much still depends on a handful of people and we want to scale beyond the founders. I would like to talk.',
        },
      },
      {
        heading: 'Growth has outpaced\nthe operating model',
        body: 'The business is winning, but delivery, decision-making and coordination haven’t kept pace. I help simplify complexity and build operating models that support the next stage of growth.',
        enquiry: {
          subject: 'An operating model that keeps pace with growth',
          body: 'Our growth has outpaced our operating model and we want to simplify complexity for the next stage. I would like to talk.',
        },
      },
      {
        heading: 'The next stage needs\noperational leadership',
        body: 'Investment, expansion or increasing ambition demand stronger execution. I provide experienced operational leadership to help the business grow with confidence, without creating unnecessary bureaucracy.',
        enquiry: {
          subject: 'Operational leadership for our next stage',
          body: 'Our ambition is rising and we want stronger operational leadership to grow with confidence. I would like to talk.',
        },
      },
    ],
  },
  proof: {
    heading: 'Trusted by Growth-Stage Businesses',
    quote:
      'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.',
    name: 'Gary Shannon',
    role: 'Managing Partner',
  },
  close: {
    heading: 'Growth will always create complexity.',
    line: 'The businesses that keep scaling aren’t the ones with fewer opportunities.\nThey’re the ones that build the capability to turn growth into lasting advantage.',
  },
  email: {
    subject: 'Building for the next stage of growth',
    body: 'Our business is growing quickly and I want to build the capability to sustain it. I would like to talk.',
  },
  seo: {
    description:
      'DAB Hands helps fast-growing businesses build the capability to sustain their growth, so success creates momentum, not complexity.',
  },
};

export default function GrowthStageBusinesses() {
  return <OperatorTemplate content={content} />;
}
