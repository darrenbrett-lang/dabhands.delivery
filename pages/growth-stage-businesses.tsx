import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'growth-stage-businesses',
  navLabel: 'Growth-Stage Businesses',
  eyebrow: 'For Growth-Stage Businesses',
  accent: 'lavender',
  hero: {
    headline: 'Growth creates complexity faster than capability.',
    subline: 'I help fast-growing businesses build the capability to sustain their growth.',
  },
  validation: {
    heading: 'The growth is real.',
    paras: [
      'From the outside, things look good. Revenue is growing. The team is expanding. New opportunities keep appearing.',
      'Inside, it feels different. Decisions take longer. Priorities compete for attention. More of the business now depends on a handful of people.',
    ],
    coda: 'The challenge isn’t finding the next opportunity. It’s building a business that can keep up with the one you’ve already created.',
  },
  diagnosis: {
    thesis: 'Growth doesn’t break a business.\nComplexity does.',
    argument: [
      'Every stage of growth changes the business. The way decisions get made. The way teams work together. The way priorities compete for attention.',
      'What once happened naturally now needs intention.',
    ],
    resolution: 'Not because the business has lost its ambition, but because it’s become something bigger than the way it was built to operate.',
  },
  outcomes: {
    heading: 'I help businesses keep growing\nwithout breaking.',
    paras: [
      'I’ve built and scaled a business of my own, so I know how quickly success creates complexity.',
      'One of the biggest changes isn’t operational. It’s deciding what deserves the organisation’s attention. Growth creates more opportunities than any business can pursue well. Without clear priorities, energy spreads too thinly and momentum begins to disappear.',
      'I help leadership teams become clear about where the business is trying to create value, then build the structures, rhythms and ways of working that help everyone move in that direction together.',
      'The result is a business that grows with greater confidence because the organisation is becoming stronger at the same pace as its ambition.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'Too much still depends\non too few people.',
        body: 'Growth now relies on a small number of people continually connecting the dots. The business has become difficult to scale because too much still flows through them.',
      },
      {
        heading: 'The business has outgrown\nthe way it runs.',
        body: 'The strategy is working. The operating model isn’t. Systems, structures and ways of working designed for yesterday’s business are beginning to hold tomorrow’s one back.',
      },
      {
        heading: 'The next stage demands\na stronger organisation.',
        body: 'New funding, new markets or faster growth raise expectations. The challenge is no longer working harder. It’s building a business capable of sustaining greater ambition.',
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
    line: 'The businesses that keep growing aren’t the ones with fewer challenges.\nThey’re the ones that build the capability to keep turning ambition into results.',
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
