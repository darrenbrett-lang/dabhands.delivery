import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'business-and-agency-leaders',
  navLabel: 'Business & Agency Leaders',
  eyebrow: 'For Business & Agency Leaders',
  accent: 'sage',
  hero: {
    headline: 'As organisations grow, ambition gets harder to realise.',
    subline: 'I help leadership teams consistently turn ambition into impact.',
  },
  validation: {
    heading: 'All the blocks are in place.',
    paras: [
      'The direction is clear. People are capable. The work matters. Yet progress feels slower than it should. As organisations grow, complexity takes hold.',
      'More priorities compete for attention. More decisions need to travel further before anything happens. The challenge is rarely deciding what to do next.',
    ],
    coda: 'It’s turning what’s already there into impact.',
  },
  diagnosis: {
    thesis: 'The strategy isn’t the problem.\nThe system is.',
    argument: [
      'Most organisations already have what they need.',
      'Capable people. Clear ambition. Meaningful work.',
      'The challenge isn’t creating more.',
      'It’s creating the conditions where all of it consistently turns into impact.',
      'Those conditions are rarely just process. They live in how people work together, how decisions get made, where momentum builds and where it quietly stalls.',
    ],
    resolution: 'The organisation has what it needs. It needs the conditions to turn it into impact, consistently and at scale.',
  },
  outcomes: {
    heading: 'I help capable organisations\nperform at their best.',
    paras: [
      'By creating the clarity, alignment and capability for capable people to consistently do their best work together.',
      'The goal isn’t more process. It’s making it easier for good people to do great work.',
      'Priorities become clearer. Decisions move faster. Accountability becomes stronger.',
      'Leadership spends less time connecting dots and more time leading.',
      'The organisation doesn’t need to work harder. It simply turns more of its ambition into impact.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'An important ambition\nisn’t becoming reality.',
        body: 'The direction is clear and the intent is real. But the ambition isn’t translating into the impact it promised.',
      },
      {
        heading: 'Complexity is holding\nperformance back.',
        body: 'More teams, more stakeholders, more dependencies. The organisation is capable of more than its own complexity now allows.',
      },
      {
        heading: 'Leadership has become\nthe operating system.',
        body: 'Too much depends on a few people holding everything together. The organisation can only realise as much as they can personally carry.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by Business & Agency Leaders',
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
    line: 'They succeed by creating the conditions to turn ambition\ninto impact, again and again.',
  },
  email: {
    subject: 'Keeping important work moving',
    body: 'Our organisation has what it needs, but turning ambition into impact is getting harder. I would like to talk.',
  },
  seo: {
    description:
      'Experienced operational leadership for business and agency leaders. DAB Hands helps capable organisations turn ambition into impact, and perform at their best.',
  },
};

export default function BusinessAndAgencyLeaders() {
  return <OperatorTemplate content={content} />;
}
