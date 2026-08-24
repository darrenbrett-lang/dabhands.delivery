import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'business-and-agency-leaders',
  navLabel: 'Business & Agency Leaders',
  eyebrow: 'For Business & Agency Leaders',
  accent: 'sage',
  hero: {
    headline: 'As organisations grow, good thinking gets harder to land.',
    subline: 'I help leadership teams close the gap between what they intend to deliver and what actually gets done.',
    image: '/images/momentum/01-tracks-2.jpg',
  },
  validation: {
    heading: 'You can feel it before you can name it.',
    paras: [
      'Decisions take longer than they used to. The same conversation happens in three separate rooms. Work that took a fortnight now takes six weeks. Everyone is busy, and nobody can say exactly where it went.',
      'None of it shows up as a problem, because nothing is broken. It shows up as everything being slightly harder than it should be.',
    ],
    coda: 'It is rarely one big thing.\nIt is the space between them.',
  },
  diagnosis: {
    thesis: 'Complexity quietly becomes the operating system.',
    argument: [
      'Nobody decides to run the business this way.',
      'It arrives one reasonable decision at a time. An approval to protect quality. A meeting so nobody is surprised. A second owner, because the first was stretched.',
      'Each is sensible. Together they become the thing the organisation runs on, and nobody built it.',
    ],
    resolution: 'The measure is not how busy you are. It is how much of your best thinking reaches the outside world.',
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
    intro: 'Twenty years across agencies, brands and digital transformation has taught me that the same organisational patterns appear again and again.',
    support: ['These aren’t case studies.', 'Here are just a few lessons learned through experience.'],
    items: [
      {
        headline: 'Shared language changes organisations.',
        why: 'Every organisation develops its own way of working. Left alone, those differences become friction. Shared ways of working don’t remove flexibility. They create a common language that helps good people make better decisions together.',
        learned: 'At Tribal Worldwide London the chief executive asked me to design the agency’s first organisation-wide operating framework, bringing consultancy, web development and communications together under one shared way of working. It was written with the leadership team and the head of operations, and it outlasted my time there. A former chief executive still refers to it eight years later.',
      },
      {
        headline: 'Winning the work changes the work.',
        why: 'Winning an important client changes the organisation. New opportunities create new demands. Success depends on building the capability around the opportunity, not simply celebrating the win.',
        learned: 'Following BBH’s Audi digital win, I helped build the delivery and consultancy capability needed to support one of the agency’s most significant new client relationships. Working alongside the Business Director, we established the multidisciplinary teams, operating model and delivery discipline required to turn a successful pitch into a confident, scalable capability.',
      },
      {
        headline: 'The price is agreed before anyone understands the work.',
        why: 'In most organisations the commercial commitment is made at the point of least knowledge, by the people furthest from the work, and everything afterwards is an attempt to fit reality inside a number set before reality was known. Better forecasting does not fix this. What fixes it is a repeatable route from brief to scope to signed statement of work, so the gap between what was sold and what is understood gets closed deliberately rather than discovered late.',
        learned: 'On the Volkswagen platform programme I took over a fee that had already been agreed against a three-year scope, arrived at before anyone had a plan. What I inherited as a statement of work ran to about a hundred pages without being one. I peeled the whole thing back, understood the full stack of what was actually being built, and wrote a delivery plan, a project plan and a workable statement of work that had to fit inside a number nobody could now change. Later, running my own consultancy, I built the answer into the business rather than relying on judgement: a fixed sequence of brief, then the brief rewritten back to the client with every gap we could see in it, then the proposal, with estimating models people actually used.',
      },
      {
        headline: 'Every complex programme needs a centre of gravity.',
        why: 'Complex programmes rarely fail because people stop caring. They fail because nobody owns the space between the teams. Decisions become disconnected. Momentum quietly disappears.',
        learned: 'I joined a multi-market ecommerce programme that had lost its centre. Client confidence had eroded, the delivery teams were frustrated, and no single plan existed that anyone believed. Others had held the role before me. I went to the delivery floor, sat with people one at a time, and rebuilt the technical picture, the backlog and the estimates with the team who would have to build it. Within six weeks there was a number nobody had been able to produce before, and the client used it to take a decision. The decision was to stop. Getting an organisation to a defensible answer is not the same as getting it to the answer it wanted, and it is often worth more. Mirum’s global leadership asked me to take on further work off the back of it.',
      },
      {
        headline: 'Bad news only travels along routes you build for it.',
        why: 'Problems inside organisations are almost never unknown. They are known at one level and unspoken at another, because no forum exists where the person who can see it and the person who can act on it are in the same room. Courage is not a system. Early warning has to be designed: the rhythms, the reconciliation and the routes that force the real position into the open on a schedule, whether or not anyone feels like raising it that week.',
        learned: 'A year into the Volkswagen programme we were running materially over across the year and nobody was saying it out loud. I put leadership, middle management and the delivery team in one room together and made sure the conversation happened. It ruffled a lot of feathers, and by the end the exposure had come down significantly, with none of it passed to the client. Running my own business afterwards, I stopped relying on anyone’s willingness to speak up and built the routes instead. A daily production call across every project. A weekly reconciliation where project managers logged time remaining, so an overburn appeared while there was still a decision to make. A monthly profit and loss cadence. None of it required anybody to be brave.',
      },
      {
        headline: 'Every long programme outlives its sponsor.',
        why: 'Any programme running longer than about eighteen months will change client sponsors, and each new one arrives with their own view, no memory of the decisions already taken, and a reasonable instinct to reopen them. Programmes are rarely undone by the work itself. They are undone by the cost of re-arguing settled decisions with people who were not there when they were settled. The defence is a written record of why, not only what, and a fast, deliberate onboarding for every new sponsor.',
        learned: 'On Royal Mail Group we went through seven heads of digital in four years. Each arrived from outside the business with a different view of where the work was headed, and each had to be brought up to speed quickly. The last one disagreed with what everyone before him had settled about the home page, so we replanned it from the ground up, and to his credit he paid for it. Not one of those changes was quietly absorbed. What made a four-year account survivable was onboarding fast and reducing the going back on things, by putting a clear written case forward for why things were the way they were.',
      },
      {
        headline: 'Transformation is bigger than the project.',
        why: 'Transformation rarely fails because of technology. It succeeds or fails because every decision affects people, process, leadership and confidence at the same time. The project is only one part of the system.',
        learned: 'Leading the programme behind a major commerce transformation for Falabella meant carrying far more than delivery. Alongside the programme came the responsibility of helping a large organisation understand, adopt and build confidence in what was being created. Success depended on keeping the delivery moving while bringing the wider business along.',
      },
      {
        headline: 'Organisations drift before they fail.',
        why: 'Organisations rarely stop performing overnight. They drift. Decisions become slower. Priorities multiply. Ownership becomes less clear. Good people work harder, but less of their best thinking reaches the real world. Recognising the drift early is one of leadership’s greatest advantages.',
        learned: 'Looking back across more than twenty years, I’ve realised the projects were rarely the point. Whether I was building operating models, leading platform transformations or delivering major programmes, the same pattern kept emerging. Organisations rarely lack ambition. They gradually lose the ability to make it real. Helping leaders reverse that has become the thread that connects everything I’ve done.',
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
  product: {
    kicker: 'What you can buy',
    name: 'The Programme Read',
    duration: 'Two weeks. Where it is breaking, and what can be done.',
    whenToBuy:
      'A programme is the symptom. Something in how work moves through the organisation has stopped working, and you want to know where it is breaking before you spend more against it.',
    whatItIs:
      'Two weeks following the work from decision to delivery, with the people actually doing it. Scope, sequencing, decision rights, capability. Diagnosis only. I am not fixing it in a fortnight and will not pretend otherwise.',
    whatYouGet:
      'A written read on where the system is breaking and why. What the work will genuinely cost and when it will genuinely land. What to do in the next ninety days, in order. Something you can take to a board and defend.',
    honest: {
      need: 'Around eight to ten conversations, access to the plan and the numbers, and an hour of your time at the end. Less than you are bracing for.',
      after:
        'Sometimes I take the work on. Sometimes the answer is that it should stop. Sometimes the answer is that you do not need me. All three are fine.',
    },
    button: 'Book a Programme Read',
    enquiry: {
      subject: 'Booking a Programme Read',
      body: 'We have a programme that needs an honest read. I would like to talk.',
    },
  },
  close: {
    heading: 'Great organisations rarely lack ambition.',
    line: 'They create the conditions for ambition\nto become impact, again and again.',
  },
  email: {
    subject: 'Keeping important work moving',
    body: 'Our organisation has what it needs, but getting good thinking to land is getting harder. I would like to talk.',
  },
  seo: {
    description:
      'DAB Hands helps leadership teams close the gap between what they intend to deliver and what actually gets done, so good thinking survives the journey from decision to delivery.',
  },
};

export default function BusinessAndAgencyLeaders() {
  return <OperatorTemplate content={content} />;
}
