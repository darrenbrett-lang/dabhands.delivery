import { OperatorTemplate, type OperatorContent } from '@/components/OperatorTemplate';

const content: OperatorContent = {
  slug: 'marketing-leaders',
  navLabel: 'Marketing Leaders',
  eyebrow: 'For Marketing Leaders',
  accent: 'peach',
  hero: {
    headline: 'Great work loses power on the journey.',
    subline: 'I help ambitious brands close the gap between the brief and what reaches the customer.',
    image: '/images/momentum/02-branding-2.jpg',
  },
  validation: {
    heading: 'Most organisations know what good looks like.',
    paras: [
      'The strategy is clear. The ambition is strong. The investment has already been made. Everyone knows what success looks like.',
      'The challenge is rarely finding another idea. It’s helping the right idea survive the journey from concept to customer.',
    ],
    coda: 'It’s helping ambitious work arrive\nwith the force it was built to carry.',
  },
  diagnosis: {
    thesis: 'Great ideas rarely disappear.\nThey become diluted.',
    argument: [
      'Most organisations don’t need another advocate for the work.',
      'They need someone who understands how ambitious work moves through complex organisations.',
      'Someone who knows where momentum slips. Where decisions stall. Where competing priorities quietly weaken strong ideas before customers ever see them.',
    ],
    resolution: 'The measure isn’t whether the work survived. It’s whether it created the commercial and brand impact it was designed to deliver.',
  },
  outcomes: {
    heading: 'I help important work\narrive as intended.',
    paras: [
      'For more than twenty years I’ve led programmes alongside brands, agencies and internal teams. Work where execution mattered as much as the original idea.',
      'I’ll take your guiding strategies and creative boundaries and amplify them within the brief.',
      'I help the organisation around them work well enough that ambitious ideas arrive with the same strength they had at the start.',
      'The outcome isn’t better delivery.',
      'It’s better performing work.',
    ],
  },
  help: {
    heading: 'Typical engagements',
    intro: 'The situations where marketing leaders usually bring me in.',
    situations: [
      {
        heading: 'High-value campaigns\nneed confident delivery',
        body: 'Major campaigns, digital experiences and product launches need experienced leadership to protect quality, momentum and impact from briefing to launch.',
        enquiry: {
          subject: 'Confident delivery for a high-value campaign',
          body: 'We have a high-value campaign that needs confident operational leadership from briefing to launch. I would like to talk.',
        },
      },
      {
        heading: 'Multiple partners need\nto work as one team',
        body: 'Internal teams, agencies, production partners and specialist suppliers all have different priorities. I help align people, decisions and delivery around one shared outcome.',
        enquiry: {
          subject: 'Aligning multiple partners around one outcome',
          body: 'We have several partners who need to work as one team around a shared outcome. I would like to talk.',
        },
      },
      {
        heading: 'Execution needs to\nmatch the ambition',
        body: 'The strategy is right. The creative is strong. The challenge is turning ambition into consistent execution across markets, channels and teams without losing what made the idea valuable.',
        enquiry: {
          subject: 'Matching execution to the ambition',
          body: 'Our strategy and creative are strong, and we want execution to match the ambition across markets and teams. I would like to talk.',
        },
      },
    ],
  },
  proof: {
    heading: 'Trusted by Marketing Leaders',
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
        role: 'Former Global Membership Director, HUGO BOSS',
      },
      {
        quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.',
        name: 'Meher Mumtaz',
        role: 'Former Digital Brand Director, Western Union',
      },
    ],
  },
  close: {
    heading: 'Great work deserves to land with its full force.',
    line: 'The investment is made. The ambition exists.\nI help it arrive intact.',
  },
  // The Selected Work case studies. Each card: brand, tag (eyebrow label), hue (panel
  // accent on the dark stage), a 9:19 device-mockup image (media:'image',
  // frame:'none' since the PNGs already include the phone), and a `story`
  // (headline + one body paragraph; optional `result` chip). `outcome` is a
  // metric-free fallback shown only when a card has no story.
  work: {
    heading: 'Some of the programmes, platforms and campaigns I’ve led over the recent years.',
    intro: 'Work where commercial outcomes, customer experience and brand reputation depended on getting the execution right.',
    cards: [
      {
        brand: 'Nike',
        tag: 'DotCom strategy',
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-dotcom-strategy.webp',
        outcome: 'Strategic platform direction for Nike.com across Europe.',
        story: {
          headline: 'Helping shape the future of Nike’s digital flagship.',
          body: [
            'Led strategic platform work across Homepage, Navigation, Landing Pages and Kids experiences, helping define the direction of Nike.com across Europe and establish priorities for its future evolution.',
          ],
        },
      },
      {
        brand: 'Nike',
        tag: 'Campaign activation',
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-forreal.webp',
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
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/western-union-redesign.webp',
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
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/vimergy-digital-rebrand.webp',
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
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/palantir-ferrari.webp',
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
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-membership.webp',
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
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/tommy-hilfiger.webp',
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
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/nike-running-5.webp',
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
        hue: 'var(--color-gold)',
        media: 'image',
        frame: 'none',
        src: '/images/work/hugo-boss-xp.webp',
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
    subject: 'Realising the full impact of our best work',
    body: 'We have important work in motion and I want it to realise its full impact. I would like to talk.',
  },
  seo: {
    description:
      'DAB Hands helps marketing leaders close the gap between the brief and what reaches the customer, so great work keeps its power on the journey.',
  },
};

export default function MarketingLeaders() {
  return <OperatorTemplate content={content} />;
}
