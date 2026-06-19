import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'growth-stage-businesses',
  navLabel: 'Growth-Stage Businesses',
  eyebrow: 'For Growth-Stage Businesses',
  accent: 'lavender',
  hero: {
    headline: 'Growth creates complexity faster than capability.',
    subline: 'I help fast-growing businesses build the operating foundations their next stage depends on.',
  },
  validation: {
    heading: 'The growth is real.',
    paras: [
      'Revenue is climbing. The team is growing. New markets, products and opportunities keep arriving. By every external measure, the business is winning.',
      'Inside, it feels harder than it should. Decisions take longer. Priorities multiply. The way the business runs hasn’t kept pace with how fast it has grown.',
    ],
    coda: 'It’s building the capability to keep pace with the growth.',
  },
  diagnosis: {
    thesis: 'Growth doesn’t break a business.\nComplexity does.',
    argument: [
      'Every stage of growth adds more.',
      'More people. More decisions. More priorities. More dependencies.',
      'Each one is manageable on its own.',
      'Together, they change how the business has to run.',
      'What used to happen on its own now has to be built on purpose.',
    ],
    resolution: 'The business hasn’t run out of ambition. It’s outgrown the way it was built to run.',
  },
  outcomes: {
    heading: 'I help businesses build\nthe capability to keep scaling.',
    paras: [
      'I’ve built and scaled a business of my own, so I know how quickly growth turns into complexity.',
      'I’ve also spent more than twenty years leading delivery and operations at scale for global organisations and tier-one agencies.',
      'I help businesses build operating models, team structures, and decision-making that quietly outpace growth.',
      'Not more process for its own sake. The right foundations, built at the right time.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'Too much still depends\non too few people.',
        body: 'Key decisions, momentum and quality still rely on a small group holding everything together.',
      },
      {
        heading: 'The business has outgrown\nthe way it runs.',
        body: 'Systems, structure and ways of working were built for a smaller, simpler version of the company.',
      },
      {
        heading: 'The next stage\nis a step change.',
        body: 'New funding, new markets or new scale are raising expectations the current operating model wasn’t built to meet.',
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
    line: 'The businesses that keep scaling are the ones that build the capability to stay ahead of it.',
  },
  email: {
    subject: 'Building for the next stage of growth',
    body: 'Our business is growing quickly and I want to build the capability to support what comes next. I would like to talk.',
  },
};

export default function GrowthStageBusinesses() {
  return <OperatorTemplate content={content} />;
}
