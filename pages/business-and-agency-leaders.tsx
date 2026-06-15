import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'business-and-agency-leaders',
  navLabel: 'Business & agency leaders',
  eyebrow: 'For business & agency leaders',
  accent: 'moss',
  hero: {
    headline: 'The organisation hasn’t lost its way. It’s simply become harder to move.',
    subline: 'Helping organisations keep important work moving when complexity starts getting in the way.',
    trust: 'A challenge I’ve spent twenty years seeing inside organisations like Nike, HUGO BOSS, Volkswagen, Audi, Royal Mail and Unilever.',
  },
  validation: {
    heading: 'You’ve done the hard part already.',
    intro: 'You know where you want to go. You have the right people. The strategy is clear.',
    paras: [
      'But somewhere between the decision and the delivery, friction builds.',
      'The same priority gets discussed in three different rooms. A decision gets made, but doesn’t move the way it should. People are working hard, but important things aren’t moving as fast as they should.',
      'It’s not that people don’t care. It’s not that the strategy is wrong.',
      'It’s that keeping everything moving together when there’s this much happening is harder than it used to be.',
    ],
  },
  diagnosis: {
    heading: 'What I see from the middle.',
    paras: [
      'I’ve been in these rooms long enough to know the problem is rarely one big thing. More often, it’s a series of small points of drag.',
      'A decision that takes too long. A priority that means different things to different teams. A handoff that loses context. A meeting that creates more noise than clarity.',
      'Individually, none of it looks fatal. Together, it slows the whole system down.',
      'That’s where orchestration matters. Not more process. Not more noise. The right adjustments, in the right places, so the organisation can move with less drag and more confidence.',
      'Small points of drag become big limits on progress.',
    ],
  },
  outcomes: {
    heading: 'The organisation starts moving together again.',
    paras: [
      'People understand what matters. Teams pull in the same direction. Decisions move faster. Leadership spends less time connecting dots and more time leading.',
      'The organisation doesn’t feel different. But it moves differently.',
    ],
  },
  transition: {
    heading: 'That’s where I step in.',
    subline: 'Into the gap between ambition and execution, where important work tends to stall.',
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
