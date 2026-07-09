import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'business-and-agency-leaders',
  navLabel: 'Business & Agency Leaders',
  eyebrow: 'For Business & Agency Leaders',
  accent: 'sage',
  hero: {
    headline: 'As organisations grow, good thinking gets harder to land.',
    subline: 'I help leadership teams close the gap between what they intend to deliver and what actually gets built.',
    image: '/images/momentum/01-tracks-2.jpg',
  },
  validation: {
    heading: 'The organisation is already capable.',
    paras: [
      'The strategy is clear. The people are capable. The investment has been made. Everyone understands what success looks like.',
      'The challenge is rarely deciding what to do. It’s making sure good thinking survives the journey from decision to delivery.',
    ],
    coda: 'It’s helping the organisation\nperform at its best.',
  },
  diagnosis: {
    thesis: 'Capability isn’t the problem.\nPerformance is.',
    argument: [
      'Most organisations already have what they need to succeed.',
      'Organisations have never had more capability. They have rarely needed better judgement.',
      'The challenge isn’t finding more ideas, hiring more people or introducing more process. It’s creating the conditions where capable people do their best work together.',
      'Those conditions are built through clarity, alignment and accountability. When they’re present, organisations move with confidence.',
    ],
    resolution: 'When they’re missing, complexity quietly becomes the operating system.',
  },
  outcomes: {
    heading: 'I help capable organisations\nperform at their best.',
    paras: [
      'I work alongside leadership teams to remove the friction that slows important work down.',
      'Sometimes that means bringing clarity to a strategic initiative that has lost momentum. Sometimes it means helping teams work together more effectively as the organisation grows. Often it’s establishing stronger operating rhythms so progress no longer depends on a handful of people holding everything together.',
      'The goal isn’t more governance.',
      'It’s an organisation that’s easier to lead, quicker to respond and better at turning good thinking into delivery.',
    ],
  },
  help: {
    heading: 'Typical engagements',
    intro: 'The situations where organisations usually bring me in.',
    situations: [
      {
        heading: 'Critical programmes need\nexperienced leadership',
        body: 'A major transformation, product, platform or delivery programme needs someone who can create clarity, align stakeholders and keep important work moving.',
        enquiry: {
          subject: 'Experienced leadership for a critical programme',
          body: 'We have an important programme that needs experienced leadership to keep it moving. I would like to talk.',
        },
      },
      {
        heading: 'Complexity is slowing\nthe organisation',
        body: 'Growth has created friction. Teams, priorities and decisions are no longer moving together, and the operating model needs to catch up with the ambition.',
        enquiry: {
          subject: 'Cutting through the complexity slowing us down',
          body: 'Complexity is slowing us down and our operating model needs to catch up with our ambition. I would like to talk.',
        },
      },
      {
        heading: 'Growth is outpacing\nthe operating model',
        body: 'AI, growth, restructuring or new commercial ambitions require stronger foundations so the organisation can move with confidence.',
        enquiry: {
          subject: 'Stronger foundations to move with confidence',
          body: 'Our growth is outpacing our operating model and we want stronger foundations to move with confidence. I would like to talk.',
        },
      },
    ],
  },
  patterns: {
    intro: 'Twenty years inside agencies, brands and digital transformation has taught me that the same organisational patterns appear again and again.',
    support: ['These aren’t case studies.', 'They’re lessons earned through experience.'],
    items: [
      {
        headline: 'Shared language changes organisations.',
        why: 'Every organisation develops its own way of working. Left alone, those differences become friction. Shared ways of working don’t remove flexibility. They create a common language that helps good people make better decisions together.',
        learned: 'At Tribal Worldwide London, Darren designed and implemented the agency’s first organisation-wide operating framework, bringing consultancy, web development and communications together under one shared operating model.',
      },
      {
        headline: 'Winning the work changes the work.',
        why: 'Winning an important client changes the organisation. New opportunities create new demands. Success depends on building the capability around the opportunity, not simply celebrating the win.',
        learned: 'Following BBH’s Audi digital win, Darren helped establish the delivery and consultancy capability needed to support one of the agency’s most significant new relationships.',
      },
      {
        headline: 'Every complex programme needs a centre of gravity.',
        why: 'Complex programmes rarely fail because people stop caring. They fail because nobody owns the space between the teams. Decisions become disconnected. Momentum quietly disappears.',
        learned: 'Joining a major international ecommerce programme after three previous programme directors had failed to stabilise it, Darren stepped into a programme that had effectively lost its centre. Client confidence had eroded, delivery teams were frustrated and no single plan existed. Within six weeks he rebuilt the operating rhythm, restored accountability and created a recovery plan the organisation could finally align behind.',
      },
      {
        headline: 'Transformation is bigger than the project.',
        why: 'Transformation rarely fails because of technology. It succeeds or fails because every decision affects people, process, leadership and confidence at the same time. The project is only one part of the system.',
        learned: 'Leading a major commerce transformation for Falabella meant carrying more than delivery. Alongside programme leadership came the responsibility of helping a large organisation understand, adopt and gain confidence in what was being built. Success depended on protecting delivery while keeping the wider business moving with it.',
      },
    ],
  },
  proof: {
    heading: 'Trusted by Business & Agency Leaders',
    interval: 10000,
    testimonials: [
      {
        quote:
          'Darren’s influence extended far beyond the delivery function. He created and implemented Tribal’s first agency-wide ways-of-working framework, helping teams align around a common approach while strengthening consistency, accountability and performance across the business.',
        name: 'Tom Roberts',
        role: 'Former CEO, Tribal Worldwide London',
      },
      {
        quote:
          'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.',
        name: 'Gary Shannon',
        role: 'Former Managing Partner, Tribal Worldwide London',
      },
      {
        quote:
          'Darren walked into a really difficult situation and made sense of it remarkably quickly. Within a few weeks, there was a plan, people understood what they were doing again, and the temperature had dropped considerably. He brings a calmness and momentum that’s incredibly valuable when projects start to drift.',
        name: 'Dave Wallace',
        role: 'Former Global COO, Mirum',
      },
    ],
  },
  close: {
    heading: 'Great organisations rarely lack ambition.',
    line: 'They create the conditions for ambition\nto become impact, again and again.',
  },
  email: {
    subject: 'Keeping important work moving',
    body: 'Our organisation has what it needs, but turning ambition into impact is getting harder. I would like to talk.',
  },
  seo: {
    description:
      'Experienced operational leadership for business and agency leaders. DAB Hands helps capable organisations turn ambition into impact, and perform at their best.',
  },
};

export default function BusinessAndAgencyLeaders() {
  return <OperatorTemplate content={content} />;
}
