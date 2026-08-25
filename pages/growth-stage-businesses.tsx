import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'growth-stage-businesses',
  navLabel: 'Growth-Stage Businesses',
  eyebrow: 'For Growth-Stage Businesses',
  accent: 'lavender',
  hero: {
    headline: 'Most growing businesses have never had to write down how they run.',
    subline: 'I build the operating system first, then help keep it honest.',
    image: '/images/momentum/03-growth.jpg',
  },
  validation: {
    heading: 'The growth is real. So is the strain.',
    paras: [
      'Revenue is up. The team is bigger. Customers keep arriving. The opportunities keep coming.',
      'The challenge is not finding the next one. It is building a business that can keep pace with the one you have already created.',
    ],
    coda: 'Success did not make it simpler.\nIt made it heavier.',
  },
  diagnosis: {
    thesis: 'The question is no longer what you could do.\nIt is what you should do.',
    argument: [
      'Early on, saying yes to everything is the strategy. It works, and it is why you are here. Then the business gets big enough that saying yes to everything is the thing holding it back, and nobody has decided what to stop.',
      'Ask five people what the year is for and you will get five answers, all of them reasonable. There is no agreed thrust, and no scorecard anyone runs the week by.',
    ],
    resolution: 'It will not break. It will stop being able to take on anything new, and that is much harder to see.',
  },
  outcomes: {
    heading: 'I build the operating system,\nthen help keep it honest.',
    paras: [
      'I have built and scaled my own business, so I know how fast success creates complexity, and how quickly a plan stops describing what is actually happening.',
      'First the foundations. What the business is genuinely trying to achieve, the thrust behind it, the initiatives for the next few quarters in order, and a scorecard short enough that people actually look at it.',
      'Then the harder part. An operating system decays. People arrive who were not in the room when it was agreed. The scorecard keeps measuring last year. Decisions creep back to one or two people, and nobody notices because each one is reasonable. Somebody has to keep asking whether what you built is still true.',
    ],
    resolution: 'The outcome is not more process. It is a business that keeps its shape as it grows.',
  },
  help: {
    heading: 'Typical engagements',
    intro: 'The situations where growth-stage businesses\nusually bring me in.',
    situations: [
      {
        heading: 'The founder can no longer be the operating system.',
        body: 'It works, right up until the point where everything routes through one or two people because nothing has been written down clearly enough to route anywhere else. I get it out of their heads and into something the business can run without them in the room.',
        enquiry: {
          subject: 'Scaling beyond the founder',
          body: 'Too much of how we run still depends on one or two people and we want that to change. I would like to talk.',
        },
      },
      {
        heading: 'Nobody can say what this quarter is for.',
        body: 'Plenty is happening and all of it is defensible, but nothing is deciding what to stop. I establish the goal, the thrust behind it and the initiatives that move it, then a scorecard short enough to be looked at weekly.',
        enquiry: {
          subject: 'Working out what the quarter is for',
          body: 'We are busy but not clear on what we are actually driving at this quarter. I would like to talk.',
        },
      },
      // The positive trigger, matching the Business & Agency doorway: it
      // reaches people while the news is still good.
      {
        heading: 'Investment has arrived and the business has to be ready for it.',
        body: 'A funding round, a new investor, an acquisition, a step change in ambition. The money is committed and the clock has started. I put the foundations in before the growth gets expensive to buy.',
        enquiry: {
          subject: 'Getting ready for what the investment expects',
          body: 'We have investment coming in and want the foundations in place before it lands. I would like to talk.',
        },
      },
    ],
  },
  patterns: {
    intro: 'Building and growing a business taught me that the same patterns emerge at every stage of growth.',
    support: ['These aren’t startup stories.', 'They’re lessons earned from building one.'],
    heroLink: 'See what I learned',
    items: [
      {
        headline: 'Growth only scales when the operating system does.',
        why: 'Early growth can hide weak foundations. More clients, more people and more opportunity don’t automatically create a stronger business. They create more complexity. Sustainable growth comes from building the operating system alongside the business itself.',
        learned: 'As co-founder of Anchor Leg, I helped build the agency from the ground up. Working alongside my business partner, and with the guidance of former BBH Global CEO Neil Munn, we clarified our proposition and strategic direction. From there, I helped translate that thinking into the operating model, leadership rhythms, ways of working and delivery discipline that shaped how the business behaved every day. The result wasn’t simply growth. It was a business capable of partnering with, and staying in step with, the needs of one of the world’s biggest brands.',
      },
    ],
  },
  proof: {
    heading: 'In Their Words',
    quote:
      'Darren has a brilliant ability to operationalise strategy. He quickly grasps the intent behind an idea, then builds the practical ways of working that allow an organisation to deliver on it. That’s a capability I’ve always admired.',
    name: 'Neil Munn',
    role: 'Former Global CEO, BBH',
  },
  product: {
    kicker: 'What you can buy',
    name: 'The Business Read',
    duration: 'Three weeks. What the business is for, and what to do about it.',
    whenToBuy:
      'The ambition is real and the growth is happening. What is missing is the line between them. No agreed thrust, no scorecard anyone runs the week by, and no clear link between what the business says it wants and what it is actually doing this quarter.',
    whatItIs:
      'A couple of weeks establishing that line. What the business is genuinely trying to achieve, what has to be true to get there, what that means for the next few quarters, and what would tell you it is working. Then how it gets run week to week, so it survives past the offsite.',
    whatYouGet:
      'A goal the leadership team agrees on. The thrust behind it. The initiatives for the next two quarters, in order. And a scorecard short enough that people actually look at it.',
    honest: {
      need: 'Conversations with eight to ten people across the business, sight of how the numbers are actually run, and a half day with the leadership team to agree the goal.',
      after:
        'Sometimes I stay a day or two a month to keep it honest. Sometimes you hire the person the read tells you to hire. Sometimes your own team runs it from here. All three are fine.',
    },
    button: 'Book a Business Read',
    enquiry: {
      subject: 'Booking a Business Read',
      body: 'We are growing but the line between our ambition and what we are doing about it is not clear. I would like to talk.',
    },
  },
  close: {
    heading: 'Foundations first.',
    line: 'Then somebody to keep them honest.',
  },
  email: {
    subject: 'Building for the next stage of growth',
    body: 'Our business is growing quickly and I want to build the structure to sustain it. I would like to talk.',
  },
  seo: {
    description:
      'DAB Hands helps growing businesses build the structure to sustain what they’ve created, so success creates momentum, not complexity.',
  },
};

export default function GrowthStageBusinesses() {
  return <OperatorTemplate content={content} />;
}
