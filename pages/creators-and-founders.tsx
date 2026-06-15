import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'creators-and-founders',
  navLabel: 'Creators & founders',
  eyebrow: 'For creators & founders',
  accent: 'lavender',
  hero: {
    headline: 'Everything depends on you. Until it can’t.',
    subline: 'I help creator and founder-led businesses build the capability required for their next stage of growth.',
  },
  validation: {
    heading: 'You’ve already created momentum.',
    intro: 'The audience is growing. Customers are responding. Opportunities keep appearing.',
    strong: true,
    paras: [
      'From the outside, things look successful.',
      'Yet somehow every important decision still seems to find its way back to you.',
      'The business has grown. The way it operates hasn’t quite caught up.',
    ],
  },
  diagnosis: {
    heading: 'What I’ve seen happen.',
    problem: [
      'Success creates complexity. More customers. More projects. More partnerships. More people. More decisions.',
      'At first, that’s exciting. Over time, it becomes harder to keep everything moving.',
    ],
    context: [
      'The founder spends more time coordinating than creating. More time solving problems than spotting opportunities. More time keeping things together than building what comes next.',
    ],
    payoff: 'Nothing is broken. The business has simply reached a point where it needs more capability around it than it did before.',
  },
  transition: {
    heading: 'The challenge isn’t ambition.',
    paras: [
      'You’ve already proved there’s demand. The challenge is building a business capable of carrying the momentum you’ve created.',
      'That doesn’t mean becoming corporate. It doesn’t mean layers of process or endless meetings.',
      'It means creating enough clarity, ownership and accountability that the business can continue to grow without everything depending on one person.',
      'The best founder-led businesses find a way to protect what made them special while becoming better at execution.',
    ],
  },
  outcomes: {
    heading: 'That’s where I come in.',
    paras: [
      'Having spent seven years building and running my own agency, I know first-hand how quickly success creates complexity.',
      'Alongside that experience, I’ve spent more than twenty years helping organisations navigate growth, change and execution.',
      'I help businesses build the capability required to support what comes next.',
      'Not through more hustle. Through greater clarity, stronger ownership and better alignment.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'The business has become too dependent on you.',
        body: 'Important decisions, approvals and momentum still rely on one person holding everything together.',
      },
      {
        heading: 'Growth is faster than capability.',
        body: 'New opportunities are arriving, but the systems, team structure and operating rhythm haven’t evolved at the same pace.',
      },
      {
        heading: 'The next stage is obvious.',
        body: 'The ambition is clear. The challenge is building the business required to support it.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by leaders',
    quote:
      'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.',
    name: 'Gary Shannon',
    role: 'Managing Partner',
  },
  close: {
    heading: 'The goal isn’t simply to grow.',
    line: 'It’s to build a business capable of supporting bigger ambitions without losing what made it successful in the first place.',
  },
};

export default function CreatorsAndFounders() {
  return <OperatorTemplate content={content} />;
}
