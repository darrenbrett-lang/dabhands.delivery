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
    paras: [
      'The strategy is clear. The ambition is strong. The investment has been made. Yet creating work that genuinely stands out has never been harder.',
      'The market is crowded. Attention is fragmented. Expectations continue to rise. The challenge isn’t finding another idea.',
    ],
    coda: 'It’s helping great work arrive with its power intact.',
  },
  diagnosis: {
    thesis: 'The work arrives.\nThe magic doesn’t.',
    argument: [
      'Most great work doesn’t fail because the idea wasn’t good enough.',
      'It loses strength gradually.',
      'A compromise here. A delay there. Another interpretation. Another approval.',
      'The work still arrives.',
      'It just doesn’t arrive with the same clarity, confidence or conviction it started with.',
    ],
    resolution: 'The idea is still there. It just isn’t as powerful as it was when everyone first believed in it.',
  },
  outcomes: {
    heading: 'I help great ideas\nsurvive the journey.',
    paras: [
      'The last thing great work needs is more noise from inside the system it is created in.',
      'That’s why alignment matters. Not alignment for its own sake. Alignment around the things that made the work worth doing in the first place.',
      'I’ve spent my career helping brands maximise the value of their investment across digital experiences, campaigns, content ecosystems, membership programmes and loyalty initiatives.',
      'The goal is simple. To help the strongest ideas arrive in market with their clarity, confidence and ambition intact.',
    ],
  },
  help: {
    heading: 'Where I tend to help',
    situations: [
      {
        heading: 'A major launch\nis approaching.',
        body: 'A campaign, experience or initiative carries significant investment and expectation. The work needs to arrive with its ambition intact.',
      },
      {
        heading: 'Multiple partners\nneed to move as one.',
        body: 'Internal teams, agencies, production partners and specialist suppliers all have a role to play. The challenge is keeping everyone aligned around the same outcome.',
      },
      {
        heading: 'The work matters too much\nto leave to chance.',
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
    line: 'More often, it loses strength on the journey.\nI help ambitious brands make sure it doesn’t.',
  },
  // The Selected Work case studies. Each card: brand, tag (eyebrow label), hue (panel
  // accent on the dark stage), a 9:19 device-mockup image (media:'image',
  // frame:'none' since the PNGs already include the phone), and a `story`
  // (headline + one body paragraph; optional `result` chip). `outcome` is a
  // metric-free fallback shown only when a card has no story.
  work: {
    heading: 'Some of the programmes, platforms and campaigns I’ve led in recent years.',
    intro: 'Complex work. Ambitious brands. High expectations. The kind of projects where alignment, momentum and execution matter just as much as the original idea.',
    cards: [
      {
        brand: 'Nike',
        tag: 'DotCom strategy',
        hue: 'var(--color-sky)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-dotcom-strategy.png',
        outcome: 'A platform-wide transformation across Nike.com in Europe.',
        story: {
          headline: 'Building the digital flagship of sport.',
          body: [
            'Led the delivery of a platform-wide transformation programme spanning Homepage, Navigation, Landing Pages and Kids experiences, helping align the future vision for Nike.com across Europe.',
          ],
        },
      },
      {
        brand: 'Nike',
        tag: 'Campaign activation',
        hue: 'var(--color-sky)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-forreal.png',
        outcome: 'A gamified member experience extending the Footballverse campaign.',
        story: {
          headline: 'Turning brand investment into member engagement.',
          body: [
            'To maximise the value of Nike’s Footballverse campaign during a non-sponsored global football tournament, we transformed the creative platform into FORREAL?!, an exclusive trivia experience within the Nike App. The game combined athlete stories, football culture and product discovery, creating a gamified member journey that extended campaign engagement while unlocking additional commercial opportunity.',
          ],
        },
      },
      {
        brand: 'Western Union',
        tag: 'Global rebrand',
        hue: 'var(--color-sage)',
        media: 'image',
        frame: 'none',
        src: '/images/work/western-union-redesign.png',
        outcome: 'A global digital rebrand across a complex ecosystem.',
        story: {
          headline: 'Uniting a global digital ecosystem.',
          body: [
            'Led the delivery of a global digital rebrand, bringing a new master brand identity to Western Union’s worldwide digital presence. The programme aligned consumer and corporate experiences through shared digital and tone of voice guidelines, creating greater consistency across a complex global ecosystem.',
          ],
        },
      },
      {
        brand: 'Vimergy',
        tag: 'Digital blueprint',
        hue: 'var(--color-peach)',
        media: 'image',
        frame: 'none',
        src: '/images/work/vimergy-digital-rebrand.png',
        outcome: 'A digital blueprint connecting web, Amazon and customer journeys.',
        story: {
          headline: 'Helping a wellness brand match its digital experience to its ambition.',
          body: [
            'As Vimergy underwent a major rebrand, I led the development of a digital blueprint to guide the evolution of its website, Amazon presence and customer journeys. The result was a more connected ecosystem designed to simplify decision-making and create a clearer path through a complex wellness category.',
          ],
        },
      },
      {
        brand: 'Palantir × Scuderia Ferrari',
        tag: 'Content programme',
        hue: 'var(--color-coral)',
        media: 'image',
        frame: 'none',
        src: '/images/work/palantir-ferrari.png',
        outcome: 'A content programme turning complex technology into a relatable story.',
        story: {
          headline: 'Making complex technology impossible to ignore.',
          body: [
            'Led the development of a content programme that used Palantir’s partnership with Ferrari to demonstrate how data drives performance at the highest level of motorsport. The work translated complex technology into a more relatable story, creating a powerful platform for customer engagement and prospect conversations.',
          ],
        },
      },
      {
        brand: 'Nike Membership',
        tag: 'Communications',
        hue: 'var(--color-sky)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-membership.png',
        outcome: 'Membership communications across more than 50 initiatives.',
        story: {
          headline: 'Helping consumers understand the value of membership.',
          body: [
            'Led the delivery of membership communications programmes designed to make Nike Membership more visible, relevant and valuable to consumers. Across more than 50 initiatives, the work helped connect member benefits, services and experiences through clearer storytelling and more effective communication.',
          ],
        },
      },
      {
        brand: 'Tommy Hilfiger',
        tag: 'Membership playbook',
        hue: 'var(--color-lavender)',
        media: 'image',
        frame: 'none',
        src: '/images/work/tommy-hilfiger.png',
        outcome: 'An EMEA membership activation playbook for local markets.',
        story: {
          headline: 'Scaling membership across markets.',
          body: [
            'Led the development of an EMEA membership activation playbook, helping local markets embed membership more effectively across retail, digital and customer lifecycle experiences. The work provided a practical framework for driving acquisition, engagement and long-term customer value at scale.',
          ],
        },
      },
      {
        brand: 'Nike',
        tag: 'Community content',
        hue: 'var(--color-sky)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-running.png',
        outcome: 'A community-led running content programme, produced in Madrid.',
        story: {
          headline: 'Making Nike feel closer to everyday runners.',
          body: [
            'Led the development and delivery of a community-led content programme designed to make Nike more approachable to everyday runners. Bringing together coaches, local running voices and practical guidance, the work connected products, services and running experiences through more relatable storytelling. The programme culminated in a multi-day content production in Madrid, generating a scalable library of assets for use across Nike’s digital ecosystem.',
          ],
        },
      },
      {
        brand: 'HUGO BOSS XP',
        tag: 'Membership strategy',
        hue: 'var(--color-peach)',
        media: 'image',
        frame: 'none',
        src: '/images/work/hugo-boss-xp.png',
        outcome: 'A membership communications strategy for the HUGO BOSS XP programme.',
        story: {
          headline: 'Making membership mean something.',
          body: [
            'Led the development of a membership communications strategy designed to help consumers better understand and engage with the HUGO BOSS XP programme. Through customer insight, strategic framing and creative development, the work transformed a complex set of benefits into a more compelling and emotionally resonant membership proposition.',
          ],
        },
      },
    ],
  },
  email: {
    subject: 'Getting our strongest work into market intact',
    body: 'We have important work in motion and I want it to arrive with its ambition intact. I would like to talk.',
  },
};

export default function MarketingLeaders() {
  return <OperatorTemplate content={content} />;
}
