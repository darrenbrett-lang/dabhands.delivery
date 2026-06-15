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
    intro: 'You know where you want to go. You have capable people. The ambition is clear.',
    paras: [
      'Yet progress feels slower than it should.',
      'As organisations grow, complexity creates distance.',
      'Between teams. Between priorities. Between decisions and action.',
      'The challenge isn’t deciding what to do next.',
      'It’s helping the organisation move together.',
    ],
  },
  diagnosis: {
    heading: 'What I see from the middle.',
    paras: [
      'I’ve been in these rooms long enough to know the problem is rarely one big thing. More often, it’s a series of small points of drag.',
      'A decision that takes too long. A priority that means different things to different teams. A handoff that loses context. A meeting that creates more noise than clarity.',
      'Today, technology is accelerating change even further. New tools create new opportunities, but they also change how decisions are made, how work flows, and where accountability sits.',
      'Individually, none of it looks fatal. Together, it slows the whole system down.',
      'That’s where orchestration matters. Not more process. Not more noise. The right adjustments, in the right places, so the organisation can move with less drag and more confidence.',
    ],
  },
  outcomes: {
    heading: 'The organisation becomes easier to lead.',
    paras: [
      'People understand what matters. Teams pull in the same direction. Decisions move faster. Leadership spends less time connecting dots and more time leading. Client outcomes are better and clients are happier.',
      'The organisation doesn’t feel different. But it performs differently.',
    ],
  },
  transition: {
    heading: 'That’s where I step in.',
    subline: 'Into the space between ambition and execution, where momentum is gained or lost.',
  },
  bring: {
    heading: 'What I bring',
    items: [
      { title: 'Built businesses.', body: 'I understand growth from the inside.' },
      { title: 'Led transformation.', body: 'I understand how organisations change.' },
      { title: 'Helped organisations execute.', body: 'I understand how important work gets done.' },
    ],
  },
  help: {
    heading: 'Where I tend to help.',
    situations: [
      {
        heading: 'Something important is stuck.',
        body: 'A strategic priority, launch or initiative isn’t moving the way it should.',
      },
      {
        heading: 'You need an operator in the middle.',
        body: 'Someone who speaks both strategy and execution, and can help teams move together.',
      },
      {
        heading: 'You’re preparing for the next growth stage.',
        body: 'Building the systems, rhythms and capability that allow the organisation to move without constant intervention.',
      },
    ],
  },
  proof: {
    heading: 'Trusted to protect what matters.',
    quote:
      'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.',
    name: 'Joel Sinnott',
    role: 'Senior Digital Lead, Nike',
  },
  close: {
    heading: 'Great organisations don’t succeed because they have fewer challenges.',
    line: 'They succeed because they can keep moving through them.',
  },
};

export default function BusinessAndAgencyLeaders() {
  return <OperatorTemplate content={content} />;
}
