import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'growth-stage-businesses',
  navLabel: 'Growth-Stage Businesses',
  eyebrow: 'For Growth-Stage Businesses',
  accent: 'lavender',
  hero: {
    headline: 'Growth creates complexity faster than capability.',
    subline: 'I help fast-growing businesses build the structure to sustain what they’ve created.',
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
    heading: 'I help businesses keep growing without\nlosing grip of what made them good.',
    paras: [
      'I’ve built and scaled my own business, so I know how quickly success creates complexity.',
      'One of the biggest shifts isn’t operational. It’s strategic. The question is no longer what the business could do. It’s what it should do.',
      'I help leadership teams get clear on where the business is trying to create value, then build the operating rhythms and structures that help the organisation move in that direction together.',
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
        body: 'The business has reached a point where too much depends on a handful of people. I help build the structure, rhythms and clarity that allow the organisation to scale beyond the founder.',
        enquiry: {
          subject: 'Scaling beyond the founder',
          body: 'Too much still depends on a handful of people and we want to scale beyond the founder. I would like to talk.',
        },
      },
      {
        heading: 'Growth has outpaced\nthe operating model',
        body: 'The business is winning, but delivery, decision-making and coordination haven’t kept pace. I help untangle what’s grown too complicated and build operating models that support continued growth.',
        enquiry: {
          subject: 'An operating model that keeps pace with growth',
          body: 'Our growth has outpaced our operating model and we want to untangle what has grown too complicated. I would like to talk.',
        },
      },
      {
        heading: 'Increasing ambition needs\nstronger foundations',
        body: 'Investment, expansion or new commercial ambitions demand stronger execution. I help build the operational foundations that let the business grow with confidence without adding bureaucracy.',
        enquiry: {
          subject: 'Stronger foundations for our ambition',
          body: 'Our ambition is growing and we want stronger operational foundations to grow with confidence. I would like to talk.',
        },
      },
    ],
  },
  patterns: {
    intro: 'Twenty years inside agencies, brands and digital transformation has taught me that the same organisational patterns appear again and again.',
    support: ['These aren’t case studies.', 'They’re lessons earned through experience.'],
    items: [
      {
        headline: 'Growth only scales when the operating system does.',
        why: 'Early growth can hide weak foundations. More clients, more people and more opportunity don’t automatically create a stronger business. They create more complexity. Sustainable growth comes from building the operating system alongside the business itself.',
        learned: 'As co-founder of Anchor Leg, I helped build the agency’s operating system from the ground up. Working alongside my business partner and with the guidance of former BBH Global CEO Neil Munn, we developed a clear strategic direction, embedded disciplined operating rhythms and built the delivery capability that became one of the agency’s defining strengths. The result wasn’t simply growth. It was an organisation that could consistently deliver on what it promised.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by Growth-Stage Businesses',
    quote:
      'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.',
    name: 'Gary Shannon',
    role: 'Managing Partner, Tribal Worldwide London',
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
