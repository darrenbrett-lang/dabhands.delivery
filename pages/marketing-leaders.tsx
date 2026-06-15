import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'marketing-leaders',
  navLabel: 'Marketing leaders',
  eyebrow: 'For marketing leaders',
  accent: 'peach',
  hero: {
    headline: 'When the work matters too much to get lost on the way.',
    subline: 'I help brands get more of the original ambition into market.',
  },
  validation: {
    heading: 'You’ve already done the hard part.',
    intro: 'The thinking exists. The investment is committed. The work matters.',
    paras: ['Now it has to survive the journey to market.'],
  },
  diagnosis: {
    heading: 'Complexity doesn’t kill work overnight. It dilutes it.',
    paras: [
      'A compromise here. A delay there. Another approval. Another interpretation. Until the thing that launches isn’t quite the thing you started with.',
    ],
  },
  transition: {
    heading: 'This is where campaigns become real.',
    subline:
      'Between strategy and execution. Between agencies and teams. Between the plan and the market. This is where momentum is either protected or lost.',
  },
  outcomes: {
    heading: 'The work arrives intact.',
    paras: [
      'The original ambition remains visible. The ecosystem works together. The customer understands it. The investment works harder.',
    ],
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
    heading: 'The right people. The right challenge. The right moment.',
    statement: [
      'Small senior teams assembled around important work. Clear ownership. Less drag. No unnecessary layers.',
    ],
  },
  proof: {
    heading: 'Trusted to protect what matters.',
    quote: 'He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.',
    name: 'Anthony Mahon',
    role: 'Global Membership Director, HUGO BOSS',
  },
  close: {
    heading: 'Great work rarely fails on ambition.',
    line: 'More often, it gets diluted on the journey.',
  },
};

export default function MarketingLeaders() {
  return <OperatorTemplate content={content} />;
}
