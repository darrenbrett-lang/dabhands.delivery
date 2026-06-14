import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'marketing-leaders',
  navLabel: 'Marketing leaders',
  eyebrow: 'For marketing leaders',
  accent: 'peach',
  hero: {
    headline: 'The idea isn’t the problem. Getting its full value into market is.',
    subline: 'Helping marketing teams protect momentum from strategy through to execution.',
    trust: 'Twenty years helping Nike, HUGO BOSS, Volkswagen, Audi, Royal Mail and Unilever turn ambitious thinking into work that lands.',
  },
  validation: {
    heading: 'You’ve already done the hard part.',
    intro: 'The thinking exists. The investment exists. The ambition exists. The challenge is getting the full value out of it.',
    paras: [
      'Campaigns rarely lose impact because the original idea wasn’t strong enough. They lose impact because the journey becomes complicated. More stakeholders. More channels. More dependencies. More decisions. The work starts losing some of what made it powerful in the first place.',
    ],
  },
  diagnosis: {
    heading: 'What I see happening.',
    paras: [
      'A strategy becomes a plan. A plan becomes a briefing. A briefing becomes production. Production becomes adaptation. Adaptation becomes deployment. At every stage, something is added, something is removed, something is reinterpreted. Nobody intends to dilute the work. But complexity has a habit of getting involved.',
      'The challenge isn’t creating great work. It’s helping great work survive the journey.',
    ],
  },
  outcomes: {
    heading: 'What changes when everything starts moving together.',
    paras: [
      'The work feels more connected. Channels reinforce each other. Teams pull in the same direction. Agencies stop operating in isolation. Momentum builds rather than resets. More of the original thinking reaches the customer. More value reaches the market. More value reaches the business. The work doesn’t just launch. It lands.',
    ],
  },
  transition: {
    heading: 'That’s where I step in.',
    subline: 'Into the messy middle between strategy and execution. Where campaigns become real. Where plans meet constraints. Where momentum is either protected or lost.',
  },
  help: {
    heading: 'Where I tend to help.',
    situations: [
      {
        heading: 'A campaign needs to move.',
        body: 'A launch, activation, membership programme, retail moment, or platform initiative needs experienced leadership to bring everything together and keep it moving.',
      },
      {
        heading: 'Too many moving parts.',
        body: 'Multiple agencies. Multiple channels. Multiple stakeholders. One outcome that still needs to reach the customer intact. I help keep that outcome clear as everything moves.',
      },
      {
        heading: 'The work deserves more value.',
        body: 'The strategy is strong. The investment is significant. The opportunity is real. The challenge is helping more of that value survive the journey and reach the customer intact.',
      },
    ],
  },
  proof: {
    heading: 'Trusted to protect what matters.',
    quote: 'He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.',
    name: 'Anthony Mahon',
    role: 'Global Membership Director, HUGO BOSS',
  },
  close: {
    heading: 'Great work rarely fails because of the idea.',
    line: 'More often, it loses momentum on the journey.',
  },
};

export default function MarketingLeaders() {
  return <OperatorTemplate content={content} />;
}
