import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'creators-and-founders',
  navLabel: 'Creators & founders',
  eyebrow: 'For creators & founders',
  accent: 'sage',
  hero: {
    headline: 'Everything depends on you. Until it can’t.',
    subline: 'Helping founder-led businesses build the capability required for their next stage of growth.',
  },
  validation: {
    heading: 'You’ve already created momentum.',
    intro: 'The audience exists. The customers exist. The opportunities exist. The business is working.',
    paras: [
      'Yet somehow every important decision still seems to find its way back to you. The business has grown. The way it operates hasn’t quite caught up.',
    ],
  },
  diagnosis: {
    heading: 'What I’ve seen happen.',
    paras: [
      'Growth creates complexity faster than capability. More customers, more products, more partnerships, more people, more decisions. The founder becomes the point through which everything flows. Not because they want to control everything. Because the business was built around them.',
      'At some point, that stops being a strength. And starts becoming a constraint.',
    ],
  },
  outcomes: {
    heading: 'The business doesn’t need more hustle. It needs more capacity.',
    paras: [
      'You’ve already created the momentum. Now the business needs a way to carry it without everything depending on you.',
      'Decisions become clearer. Ownership becomes stronger. The team becomes more capable.',
      'The business becomes easier to run.',
    ],
  },
  transition: {
    heading: 'That’s where I step in.',
    subline:
      'When a founder feels stuck between where the business is and where it could be. When growth is creating complexity. When opportunities are arriving faster than the organisation can absorb them. When everything still depends on one person.',
  },
  help: {
    heading: 'Where I tend to help.',
    situations: [
      {
        heading: 'The business has become too dependent on you.',
        body: 'You’ve grown the business. Now it can’t move without you in every decision. I help build the operational structure and delegation so the business scales with you, not instead of you.',
      },
      {
        heading: 'Growth is faster than capability.',
        body: 'You’ve won customers and opportunities. But the systems and team structure haven’t caught up. I help you build the operational foundation that lets you absorb growth without burning out.',
      },
      {
        heading: 'You need an operator, not another agency.',
        body: 'You don’t need more tactics or execution partners. You need someone who understands founder psychology and can help you scale the business while building the leadership capacity to run it.',
      },
    ],
  },
  proof: {
    heading: 'Momentum needs a system.',
    statement: [
      'The scale changes. The challenge doesn’t.',
      'For twenty years, I’ve helped organisations bridge the gap between ambition and execution. Nike. HUGO BOSS. Volkswagen. Royal Mail. Different scale. Same problem.',
    ],
  },
  close: {
    heading: 'You created the momentum.',
    line: 'Now the business needs the capability to match it.',
  },
};

export default function CreatorsAndFounders() {
  return <OperatorTemplate content={content} />;
}
