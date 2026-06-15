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
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'A major launch is approaching.',
        body: 'Helping important work arrive in market as intended.',
      },
      {
        heading: 'Multiple teams need to align.',
        body: 'Bringing clarity, momentum and accountability across the ecosystem.',
      },
      {
        heading: 'The stakes are high.',
        body: 'Providing experienced operational leadership when the work matters most.',
      },
    ],
  },
  proof: {
    heading: 'Trusted to protect what matters.',
    testimonials: [
      {
        quote: 'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.',
        name: 'Joel Sinnott',
        role: 'Senior Digital Lead, Nike',
      },
      {
        quote: 'He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.',
        name: 'Anthony Mahon',
        role: 'Global Membership Director, HUGO BOSS',
      },
      {
        quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.',
        name: 'Meher Mumtaz',
        role: 'Digital Brand Director, Western Union',
      },
    ],
  },
  close: {
    heading: 'Great work rarely fails on ambition.',
    line: 'More often, it gets diluted on the journey.',
  },
};

export default function MarketingLeaders() {
  return <OperatorTemplate content={content} />;
}
