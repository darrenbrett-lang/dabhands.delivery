import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'business-and-agency-leaders',
  navLabel: 'Business & agency leaders',
  eyebrow: 'For business & agency leaders',
  accent: 'sage',
  hero: {
    headline: 'As organisations grow, keeping everything moving becomes harder.',
    subline: 'I help leadership teams maintain momentum when complexity is getting in the way.',
  },
  validation: {
    heading: 'All the blocks are in place.',
    paras: [
      'The direction is clear. The people are capable. The work matters. Yet progress feels slower than it should. As organisations grow, more teams become involved.',
      'More priorities compete for attention. More decisions need to travel further before anything happens. The challenge is rarely deciding what to do next.',
    ],
    coda: 'It’s helping the organisation move together.',
  },
  diagnosis: {
    thesis: 'The strategy isn’t the problem.\nThe system is.',
    argument: [
      'Most organisations already have what they need.',
      'Capable people. Clear ambition. Meaningful work.',
      'The challenge isn’t creating more.',
      'It’s adapting to a world where growth creates complexity, technology changes how work gets done and client expectations continue to evolve.',
      'What once felt straightforward becomes harder to coordinate.',
    ],
    resolution: 'The organisation has what it needs. It just needs a way to move together at scale.',
  },
  outcomes: {
    heading: 'I help organisations\nmove together.',
    paras: [
      'By creating the clarity, alignment and capability required to grow with confidence.',
      'The goal isn’t more process. It’s making it easier for good people to do good work.',
      'Priorities become clearer. Decisions move faster. Accountability becomes stronger.',
      'Leadership spends less time connecting dots and more time leading.',
      'The organisation doesn’t need to work harder. It simply moves with less friction.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'A strategic priority\nisn’t moving.',
        body: 'The direction is clear. The intent is understood. Yet progress feels slower than it should.',
      },
      {
        heading: 'The organisation has become\nharder to coordinate.',
        body: 'More teams. More stakeholders. More dependencies. What once felt straightforward now takes more effort to move forward.',
      },
      {
        heading: 'Leadership has become\nthe operating system.',
        body: 'Too much progress depends on a small number of people continually connecting dots and keeping important work moving.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by business & agency leaders',
    interval: 10000,
    testimonials: [
      {
        quote:
          'Darren’s influence extended far beyond the delivery function. He created and implemented Tribal’s first agency-wide ways-of-working framework, helping teams align around a common approach while strengthening consistency, accountability and performance across the business.',
        name: 'Tom Roberts',
        role: 'CEO, Tribal Worldwide London',
      },
      {
        quote:
          'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.',
        name: 'Gary Shannon',
        role: 'Managing Partner',
      },
    ],
  },
  close: {
    heading: 'Great organisations don’t succeed because they have fewer challenges.',
    line: 'They succeed because they can keep moving through them.',
  },
  email: {
    subject: 'Keeping important work moving',
    body: 'Our organisation has what it needs, but momentum is getting harder to maintain. I would like to talk.',
  },
};

export default function BusinessAndAgencyLeaders() {
  return <OperatorTemplate content={content} />;
}
