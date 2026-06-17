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
    paras: [
      'The audience is growing. Customers are responding. Opportunities keep appearing. From the outside, things look successful.',
      'Yet every important decision still seems to find its way back to you. The business has grown. The way it operates hasn’t quite caught up.',
    ],
    coda: 'It’s creating the capability to grow beyond you.',
  },
  diagnosis: {
    thesis: 'You’ve created momentum.\nYou’re carrying too much of it.',
    argument: [
      'More customers. More projects. More partnerships. More people. More decisions.',
      'What once felt simple starts demanding more attention. The founder spends more time coordinating than creating.',
    ],
    resolution: 'The business has simply outgrown the way it used to operate.',
  },
  outcomes: {
    heading: 'I help businesses grow\nbeyond their founders.',
    paras: [
      'Having spent seven years building and running my own agency, I know how quickly success creates complexity.',
      'Alongside that experience, I’ve spent more than twenty years helping organisations navigate growth, change and execution.',
      'I help businesses build the clarity, ownership and capability required to support what comes next.',
      'Not through more hustle. Through better foundations.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'The business has become\ntoo dependent on you.',
        body: 'Important decisions, approvals and momentum still rely on one person holding everything together.',
      },
      {
        heading: 'Growth is faster\nthan capability.',
        body: 'New opportunities are arriving, but the systems, team structure and operating rhythm haven’t evolved at the same pace.',
      },
      {
        heading: 'The next stage\nis obvious.',
        body: 'The ambition is clear. The challenge is building the business required to support it.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by creators & founders',
    quote:
      'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.',
    name: 'Gary Shannon',
    role: 'Managing Partner',
  },
  close: {
    heading: 'The goal isn’t simply to grow.',
    line: 'It’s to build a business capable of supporting bigger ambitions without losing what made it successful in the first place.',
  },
  email: {
    subject: 'Building for the next stage of growth',
    body: 'The business has grown and I want to build the capability to carry it forward. I would like to talk.',
  },
};

export default function CreatorsAndFounders() {
  return <OperatorTemplate content={content} />;
}
