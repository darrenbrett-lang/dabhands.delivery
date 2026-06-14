import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'business-and-agency-leaders',
  navLabel: 'Business & agency leaders',
  eyebrow: 'For business & agency leaders',
  accent: 'lavender',
  hero: {
    headline: 'The organisation hasn’t lost its way. It’s simply become harder to move.',
    subline: 'Helping organisations keep important work moving.',
    trust: '20 years inside Nike, HUGO BOSS, Volkswagen, Audi, Royal Mail and Unilever.',
  },
  validation: {
    heading: 'You’ve done the hard part already.',
    intro: 'You know where you want to go. You have the people, the ambition, and the investment to get there.',
    paras: [
      'What’s changed isn’t the strategy. The organisation has grown faster than the systems holding it together.',
      'Teams that used to move as one now move at different speeds. A decision that once took a conversation now takes three meetings and two follow-ups. The same point gets discussed in four rooms, and the work waits while everyone catches up.',
      'None of this is failure. It’s what happens when a good organisation gets bigger and more is riding on every move.',
    ],
  },
  diagnosis: {
    heading: 'What I see from the middle.',
    intro: 'After twenty years sitting between leadership and delivery, the pattern is usually the same. It’s rarely any one team. It’s the space between them.',
    cards: [
      {
        heading: 'Strategy and execution stop speaking the same language.',
        body: 'The plan is clear at the top. By the time it reaches the work, it has been reinterpreted four times. Everyone is busy. Not everyone is building the same thing.',
      },
      {
        heading: 'Coordination quietly becomes the job.',
        body: 'More of every week goes into aligning, chasing, and clarifying. Less goes into the work itself. Momentum leaks through the gaps between teams.',
      },
      {
        heading: 'Your best people get stretched thin.',
        body: 'The capable ones get pulled into everything. They hold it together through effort and goodwill, until the load starts to show and the important work slows.',
      },
      {
        heading: 'Nobody owns the space in between.',
        body: 'Each team owns its part. No one owns the handover between them. That gap is where important work stalls, and it rarely sits on anyone’s remit.',
      },
    ],
  },
  outcomes: {
    heading: 'What changes when it moves again.',
    paras: [
      'Strategy and execution start speaking the same language. What leadership intends is what reaches the work, without losing shape on the way down.',
      'Decisions get made closer to where the work happens. Leadership spends less time coordinating and more time leading.',
      'The organisation doesn’t feel different. It moves differently. The same people, the same ambition, far less getting in the way.',
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
        body: 'A priority that should be moving isn’t. I find where it’s caught and get it moving again, without upending everything around it.',
      },
      {
        heading: 'You need an operator in the middle.',
        body: 'Senior capacity in the space between strategy and delivery. I hold the work together so your team can stay focused on theirs.',
      },
      {
        heading: 'You’re building for the next stage.',
        body: 'Growth is coming and today’s ways of working won’t carry it. I help strengthen the systems, rhythms, and ownership before the strain shows.',
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
    heading: 'If something important needs to move, let’s talk.',
    line: 'No pitch. A straight conversation about what’s stuck and how to move it.',
  },
};

export default function BusinessAndAgencyLeaders() {
  return <OperatorTemplate content={content} />;
}
