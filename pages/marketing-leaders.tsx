import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'marketing-leaders',
  navLabel: 'Marketing leaders',
  eyebrow: 'For marketing leaders',
  accent: 'peach',
  hero: {
    headline: 'Great work loses power on the journey.',
    subline: 'I help ambitious brands bring their strongest ideas into the world with the impact they deserve.',
  },
  validation: {
    heading: 'The ingredients are already there.',
    intro: 'The strategy is clear. The ambition is strong. The investment has been made.',
    paras: [
      'Yet creating work that genuinely stands out has never been harder.',
      'The market is crowded. Attention is fragmented. Expectations continue to rise.',
    ],
    coda: 'The challenge isn’t finding another idea. It’s bringing together the right people, capabilities and decisions in a way that allows the work to reach its full potential.',
  },
  diagnosis: {
    heading: 'What gets in the way',
    problem: [
      'One thing I’ve noticed is that great work rarely disappears overnight. It loses strength gradually.',
      'A compromise here. A delay there. Another interpretation. Another approval. Another stakeholder.',
    ],
    context: [
      'I’ve spent more than twenty years working alongside brands, agencies, strategists, creatives and digital teams.',
      'Individually, none of these things seem particularly significant. Together, they can change the shape of the work completely.',
    ],
    payoff: 'The idea is still there. It just isn’t as powerful as it was when everyone first believed in it.',
  },
  outcomes: {
    heading: 'The market creates enough noise already.',
    paras: [
      'The last thing great work needs is more noise from inside the organisation.',
      'That’s why alignment matters. Not alignment for its own sake. Alignment around the things that made the work worth doing in the first place.',
      'I’ve spent my career helping brands maximise the value of their investment across digital experiences, campaigns, content ecosystems, membership programmes and loyalty initiatives.',
      'The goal is simple. To help the strongest ideas arrive in market with their clarity, confidence and ambition intact.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'A major launch is approaching.',
        body: 'A campaign, experience or initiative carries significant investment and expectation. The work needs to arrive with its ambition intact.',
      },
      {
        heading: 'Multiple partners need to move as one.',
        body: 'Internal teams, agencies, production partners and specialist suppliers all have a role to play. The challenge is keeping everyone aligned around the same outcome.',
      },
      {
        heading: 'The work matters too much to leave to chance.',
        body: 'When visibility is high, timelines are tight and expectations are significant, experienced leadership helps protect the quality of the outcome.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by marketing leaders',
    interval: 4000,
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
    heading: 'Great work rarely fails because of ambition.',
    line: 'More often, it loses strength on the journey. I help ambitious brands make sure it doesn’t.',
  },
  email: {
    subject: 'Getting our strongest work into market intact',
    body: 'We have important work in motion and I want it to arrive with its ambition intact. I would like to talk.',
  },
};

export default function MarketingLeaders() {
  return <OperatorTemplate content={content} />;
}
