import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'business-and-agency-leaders',
  navLabel: 'Business & agency leaders',
  eyebrow: 'For business & agency leaders',
  accent: 'moss',
  hero: {
    headline: 'As organisations grow, keeping everything moving becomes harder.',
    subline: 'I help leadership teams maintain momentum when complexity starts getting in the way.',
  },
  validation: {
    heading: 'All the blocks are in place.',
    intro: 'The direction is clear. The people are capable. The work matters.',
    paras: [
      'From the outside, everything appears to be there.',
      'Yet progress feels slower than it should.',
      'Not because people aren’t working hard. Not because the strategy is wrong.',
      'As organisations grow, more teams become involved. More priorities compete for attention. More decisions need to travel further before anything happens.',
      'The challenge is rarely deciding what to do next. More often, it’s helping the organisation move together.',
    ],
  },
  diagnosis: {
    heading: 'What gets in the way',
    paras: [
      'I’ve been around organisations long enough to know that momentum rarely disappears all at once.',
      'It gets lost in small places.',
      'A decision that takes longer than it should. A priority that means different things to different teams. Information that isn’t where people need it. A handoff that loses context. A meeting that creates more noise than clarity.',
      'Individually, none of these things look particularly serious.',
      'Together, they make progress harder than it needs to be.',
      'The organisation has everything it needs.',
      'It just struggles to move at the pace it’s capable of.',
    ],
  },
  outcomes: {
    heading: 'I help organisations move together.',
    paras: [
      'By identifying what’s slowing progress and strengthening the connections between people, priorities and execution.',
      'The goal isn’t more process. It’s making it easier for good people to do good work.',
      'Priorities become clearer. Decisions move faster. Accountability becomes stronger. Leadership spends less time connecting dots and more time leading.',
      'The organisation doesn’t need to work harder. It simply needs less friction.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'A strategic priority isn’t moving.',
        body: 'The direction is clear. The intent is understood. Yet progress feels slower than it should and momentum is becoming harder to maintain.',
      },
      {
        heading: 'The organisation has become harder to coordinate.',
        body: 'More teams, stakeholders and dependencies create friction between decision-making and execution.',
      },
      {
        heading: 'Leadership has become the operating system.',
        body: 'Too much progress depends on a small number of people continually aligning teams, removing blockers and keeping important work moving.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by leaders',
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
};

export default function BusinessAndAgencyLeaders() {
  return <OperatorTemplate content={content} />;
}
