import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { SeoMeta } from '@/components/SeoMeta';
import { FadeUp } from '@/components/FadeUp';
import { LogoTicker } from '@/components/LogoTicker';
import { mailto } from '@/lib/mailto';

type Bg = 'bone' | 'paper';
type Accent = 'lavender' | 'peach' | 'sage';
type Disc = { label: string; body: string[] };

// Section-driven: each door composes from this shared kit, so the pages share
// the visual system and rhythm without being locked to an identical skeleton.
type Section =
  | { kind: 'drumbeat'; label: string; bg?: Bg; drumbeat: string[]; inline?: boolean; bridge?: string; pivot?: string; disclosure?: Disc }
  | { kind: 'blocks'; label: string; bg?: Bg; blocks: { heading: string; para: string; disclosure?: Disc }[] }
  | { kind: 'twoSystems'; label: string; bg?: Bg; pivot: string; intro: string; visible: string[]; invisible: string[]; close: string; disclosure?: Disc }
  | { kind: 'statement'; label: string; bg?: Bg; heading: string; body?: string[]; disclosure?: Disc }
  | { kind: 'outcomes'; label: string; bg?: Bg; heading: string; outcomes: string[]; close?: string[]; disclosure?: Disc }
  | { kind: 'experience'; label: string; bg?: Bg; line: string; body?: string[] }
  | { kind: 'testimonial'; label: string; quote: string; name: string; role: string }
  | { kind: 'plumStatement'; label: string; heading: string; sub?: string }
  | { kind: 'workCards'; label: string; bg?: Bg; heading?: string; models: { title: string; blurb: string }[]; note: string };

type AudienceContent = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  hero: { headline: string; subline: string };
  complete: boolean;
  accent: Accent;
  sections?: Section[];
  close?: { statement: string; subline?: string; bg?: Bg };
};

const CONTENT: Record<string, AudienceContent> = {
  'business-and-agency-leaders': {
    slug: 'business-and-agency-leaders',
    navLabel: 'Business & agency leaders',
    eyebrow: 'For business & agency leaders',
    complete: true,
    accent: 'lavender',
    hero: {
      headline: 'When growth starts exposing the limits of the system.',
      subline:
        'Helping leadership teams strengthen the capabilities, operating rhythms, and organisational systems that turn ambition into sustained execution.',
    },
    sections: [
      {
        kind: 'drumbeat',
        label: 'The situation',
        bg: 'bone',
        drumbeat: ['Good people.', 'Strong ambition.', 'No shortage of initiatives.', 'Everyone’s busy.', 'Everyone’s trying.'],
        inline: true,
        bridge: 'Yet somehow progress feels slower than it should.',
        pivot: 'The challenge is rarely strategy. It’s helping the organisation move together.',
        disclosure: {
          label: 'The challenge',
          body: [
            'Most organisations already have what they need. Capable people. Clear ambition. Important work.',
            'The strain appears elsewhere. Teams evolve at different speeds. Priorities compete. Technology moves faster than capability. Decisions take longer than they should. The same conversations happen in different rooms. More energy goes into coordination. Less energy goes into progress.',
            'The challenge is rarely a lack of ambition. More often, the organisation has outgrown parts of the system supporting it.',
          ],
        },
      },
      {
        kind: 'twoSystems',
        label: 'What needs to change',
        bg: 'paper',
        pivot: 'More than the process.',
        intro: 'Every organisation has two operating systems.',
        visible: ['People', 'Technology', 'Governance', 'Delivery'],
        invisible: ['Trust', 'Ownership', 'Decision-making', 'Relationships', 'Culture'],
        close: 'The strongest organisations strengthen both.',
        disclosure: {
          label: 'How change happens',
          body: [
            'Stronger organisations rarely emerge from a single initiative. They emerge from stronger systems.',
            'Greater visibility. Clearer ownership. Better operating rhythms. More effective decision-making. Stronger alignment between teams.',
            'The goal isn’t more process. It’s creating the conditions for people to do their best work together.',
          ],
        },
      },
      {
        kind: 'outcomes',
        label: 'What good looks like',
        bg: 'bone',
        heading: 'The organisation starts moving together again.',
        outcomes: [
          'Aligned priorities',
          'Faster decisions',
          'Clearer accountability',
          'Less friction',
          'Greater momentum',
          'Better execution',
          'Stronger capability',
          'Greater adaptability',
        ],
        disclosure: {
          label: 'See what changes',
          body: [
            'The work becomes easier to move.',
            'The right conversations happen earlier. Ownership becomes clearer. Teams become more connected. Execution becomes more predictable. Leaders gain confidence in the organisation’s ability to deliver.',
            'Not because people are working harder. Because fewer things are getting in the way.',
          ],
        },
      },
      {
        kind: 'experience',
        label: 'Relevant experience',
        bg: 'bone',
        line: 'Twenty years helping organisations navigate growth, transformation, operational complexity, and important work.',
      },
      {
        kind: 'testimonial',
        label: 'Trusted to lead important work',
        quote:
          'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.',
        name: 'Joel Sinnott',
        role: 'Senior Digital Lead, Nike',
      },
      {
        kind: 'workCards',
        label: 'How we might work together',
        bg: 'bone',
        models: [
          { title: 'Focused Intervention', blurb: 'When something important is stuck, slipping, or struggling to move.' },
          { title: 'Fractional Leadership', blurb: 'Experienced operational leadership without the commitment of a full-time hire.' },
          { title: 'Capability Building', blurb: 'Creating the systems, rhythms, and visibility required for sustainable growth.' },
        ],
        note: 'The shape depends on the challenge.',
      },
    ],
    close: {
      statement: 'The future rarely arrives all at once. It arrives through hundreds of operational decisions made today.',
      subline: 'The question is whether the organisation is building the capability required for what’s next.',
      bg: 'bone',
    },
  },

  'marketing-leaders': {
    slug: 'marketing-leaders',
    navLabel: 'Marketing leaders',
    eyebrow: 'For marketing leaders',
    complete: true,
    accent: 'peach',
    hero: {
      headline: 'When the work matters too much to get lost on the way.',
      subline: 'Helping brands maximise the value of important work.',
    },
    sections: [
      {
        kind: 'blocks',
        label: 'The situation',
        bg: 'paper',
        blocks: [
          {
            heading: 'You’ve already done the hard part.',
            para: 'The strategy exists. The investment is committed. The work matters. Now it has to survive the journey to market.',
            disclosure: {
              label: 'Expand',
              body: [
                'Most marketing challenges don’t start with a lack of ideas. They start with the gap between ambition and execution. The bigger the initiative, the more opportunities there are for momentum to slow, decisions to drift, and value to leak from the system.',
              ],
            },
          },
          {
            heading: 'Complexity doesn’t kill work overnight. It dilutes it.',
            para: 'A compromise here. A delay there. Another approval. Another interpretation. Until the thing that launches isn’t quite the thing you started with.',
            disclosure: {
              label: 'Expand',
              body: [
                'Nobody intends this to happen. It’s simply what complexity does. More teams. More channels. More stakeholders. More dependencies. The challenge isn’t usually creating better work. It’s helping the right work arrive as intended.',
              ],
            },
          },
          {
            heading: 'The value is already there.',
            para: 'The question is whether it reaches the customer.',
            disclosure: {
              label: 'Expand',
              body: [
                'The campaign. The programme. The platform. The experience. The partnership. The investment has already been made. The opportunity is getting the full value from it. Helping customers understand it. Helping channels connect. Helping the ecosystem work as one.',
              ],
            },
          },
        ],
      },
      {
        kind: 'statement',
        label: 'Where I come in',
        bg: 'bone',
        heading: 'I help important work survive contact with reality.',
        disclosure: {
          label: 'Expand',
          body: [
            'Sometimes that means bringing clarity to a situation that has become difficult to navigate. Sometimes it means assembling a small senior team around a challenge. Sometimes it means helping an initiative regain momentum before it drifts further off course.',
            'The shape changes. The principle doesn’t. Protect the value. Help it move. Help it land.',
          ],
        },
      },
      {
        kind: 'outcomes',
        label: 'What good looks like',
        bg: 'paper',
        heading: 'The work arrives intact.',
        outcomes: [
          'The original ambition remains visible',
          'The ecosystem works together',
          'The customer understands it',
          'The investment works harder',
          'Less friction',
          'Fewer compromises',
        ],
        disclosure: {
          label: 'See what changes',
          body: ['Stronger alignment. Better execution. More confidence. Not because people are working harder. Because fewer things are getting in the way.'],
        },
      },
      {
        kind: 'experience',
        label: 'Relevant experience',
        bg: 'bone',
        line: 'Twenty years helping brands move important work through complex environments.',
      },
      {
        kind: 'testimonial',
        label: 'Trusted with important work',
        quote: 'He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.',
        name: 'Anthony Mahon',
        role: 'Global Membership Director, Hugo Boss',
      },
      {
        kind: 'statement',
        label: 'How we might work together',
        bg: 'bone',
        heading: 'The right people. The right challenge. The right moment.',
        disclosure: {
          label: 'Expand',
          body: [
            'DAB Hands is deliberately lean. Senior specialists assembled around the challenge. No unnecessary layers. No inflated teams. Just the capability required to help important work move.',
          ],
        },
      },
    ],
    close: {
      statement: 'Great work rarely fails on ambition. More often, it gets diluted on the journey.',
      subline: 'If you’ve already done the hard part, let’s make sure it delivers its full value.',
      bg: 'paper',
    },
  },

  'creators-and-founders': {
    slug: 'creators-and-founders',
    navLabel: 'Creators & founders',
    eyebrow: 'For creators & founders',
    complete: true,
    accent: 'sage',
    hero: {
      headline: 'You’ve successfully created momentum.',
      subline: 'Now everything depends on you.',
    },
    sections: [
      {
        kind: 'blocks',
        label: 'The moment',
        bg: 'paper',
        blocks: [
          {
            heading: 'From the outside, things look great.',
            para: 'The audience is growing. Opportunities keep appearing. The business has real momentum.',
          },
          {
            heading: 'Inside, it feels different.',
            para: 'Every important decision still finds its way back to you. The team is capable, but somehow you’re still the glue holding everything together.',
          },
        ],
      },
      {
        kind: 'statement',
        label: 'The real challenge',
        bg: 'bone',
        heading: 'Most founder-led businesses don’t have a marketing problem. They have a growing complexity problem.',
        body: [
          'The business has evolved faster than the operating system behind it.',
          'What got you here was energy, instinct and sheer determination.',
          'What gets you further is clarity, coordination and capability.',
        ],
      },
      {
        kind: 'drumbeat',
        label: 'This might sound familiar',
        bg: 'paper',
        drumbeat: [
          'You spend more time untangling than building.',
          'You find yourself repeating the same conversations.',
          'The team keeps asking good questions, but too many of the answers still live in your head.',
          'The business is moving, but it isn’t always moving together.',
        ],
      },
      {
        kind: 'statement',
        label: 'What changes things',
        bg: 'bone',
        heading: 'The answer usually isn’t more effort.',
        body: [
          'Most founders are already operating at full capacity.',
          'The answer is building a stronger system around the momentum you’ve created.',
          'One that helps decisions travel further without you.',
          'One that helps the team move with greater confidence.',
          'One that turns growth into something sustainable.',
        ],
      },
      {
        kind: 'statement',
        label: 'Where I come in',
        bg: 'paper',
        heading: 'I help founders build the capability required for the next stage of growth.',
        body: [
          'Not by slowing things down with process. By creating enough structure for the business to keep moving without everything flowing through one person.',
          'Sometimes that’s operational leadership. Sometimes it’s helping the team find a better rhythm. Sometimes it’s simply creating clarity where complexity has taken hold.',
        ],
      },
      {
        kind: 'outcomes',
        label: 'What good looks like',
        bg: 'bone',
        heading: 'The business becomes easier to move.',
        outcomes: ['The team becomes more confident', 'Execution becomes more consistent', 'You spend less time coordinating and more time leading'],
        close: ['Not because you’re working less.', 'Because fewer things depend on your constant intervention.'],
      },
      {
        kind: 'experience',
        label: 'A familiar problem',
        bg: 'paper',
        line: 'I’ve spent twenty years helping organisations bridge the gap between ambition and execution.',
        body: [
          'The same challenge exists inside Nike, HUGO BOSS, agencies and founder-led businesses.',
          'The scale changes. The problem doesn’t.',
          'At some point, momentum needs a system.',
        ],
      },
      {
        kind: 'plumStatement',
        label: 'The partnership',
        heading: 'You create the signal.',
        sub: 'Together, we build the system that helps it grow.',
      },
    ],
    close: {
      statement: 'The goal isn’t to make you less important. It’s to make the business less dependent on you.',
      bg: 'bone',
    },
  },
};

export type AudienceSlug = keyof typeof CONTENT;

const COL = 'mx-auto max-w-3xl px-6 md:px-8';
const bgClass = (bg?: Bg) => (bg === 'paper' ? 'bg-paper' : 'bg-bone');

// Movement accent per room. `trigger` is the deepened, legible accent used for
// the coloured bold expand text (the pale token fails contrast as text on bone).
const ACCENT: Record<Accent, { dot: string; cardBorder: string; cardBg: string; cardDivide: string; trigger: string; heroWash: string }> = {
  lavender: {
    dot: 'bg-lavender', cardBorder: 'border-lavender/30', cardBg: 'bg-lavender/[0.08]', cardDivide: 'border-lavender/25', trigger: 'text-[#6E5A86]',
    heroWash: 'linear-gradient(to bottom, rgba(184,162,216,0.22), rgba(184,162,216,0.22) 60%, rgba(184,162,216,0) 100%)',
  },
  peach: {
    dot: 'bg-peach', cardBorder: 'border-peach/30', cardBg: 'bg-peach/[0.08]', cardDivide: 'border-peach/25', trigger: 'text-[#9E5B3A]',
    heroWash: 'linear-gradient(to bottom, rgba(230,179,154,0.26), rgba(230,179,154,0.26) 60%, rgba(230,179,154,0) 100%)',
  },
  sage: {
    dot: 'bg-sage', cardBorder: 'border-sage/30', cardBg: 'bg-sage/[0.10]', cardDivide: 'border-sage/25', trigger: 'text-[#5E6B3F]',
    heroWash: 'linear-gradient(to bottom, rgba(184,194,163,0.26), rgba(184,194,163,0.26) 60%, rgba(184,194,163,0) 100%)',
  },
};

const CtaLink = ({ subject }: { subject: string }) => (
  <a
    href={mailto({ subject })}
    className="group inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-6 py-3 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-bone"
  >
    Start a conversation
    <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">
      →
    </span>
  </a>
);

const SectionLabel = ({ children, onDark = false }: { children: string; onDark?: boolean }) => (
  <p className={`eyebrow mb-6 md:mb-8 ${onDark ? 'text-bone/55' : 'text-graphite'}`}>{children}</p>
);

// Progressive disclosure. Every trigger is a + toggle (accent-coloured, rotates
// to × on open); the label is kept only as the accessible name. No button chrome.
const Disclosure = ({ label, body, triggerClass }: Disc & { triggerClass: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${open ? 'Collapse' : 'Expand'}${label && label !== 'Expand' ? ` — ${label}` : ''}`}
        className={`transition-opacity hover:opacity-70 ${triggerClass}`}
      >
        <span aria-hidden className={`inline-block text-[26px] leading-none transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 border-l border-stone pl-5 md:pl-6 space-y-4 text-graphite leading-relaxed max-w-[62ch]">
              {body.map((p, i) => (
                <p key={i} className={i === body.length - 1 && body.length > 1 ? 'text-ink' : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SystemCard = ({ label, items, accent }: { label: string; items: string[]; accent?: (typeof ACCENT)[Accent] }) => (
  <div className={`rounded-2xl p-6 md:p-7 ${accent ? `border ${accent.cardBorder} ${accent.cardBg}` : 'border border-stone bg-bone'}`}>
    <p className="eyebrow text-graphite mb-4">{label}</p>
    <ul>
      {items.map((w, i) => (
        <li key={w} className={`py-2.5 text-lg text-ink ${i > 0 ? (accent ? `border-t ${accent.cardDivide}` : 'border-t border-stone') : ''}`}>
          {w}
        </li>
      ))}
    </ul>
  </div>
);

type LightSection = Exclude<Section, { kind: 'testimonial' } | { kind: 'plumStatement' }>;

const SectionInner = ({ section, accent }: { section: LightSection; accent: Accent }) => {
  const a = ACCENT[accent];
  switch (section.kind) {
    case 'drumbeat':
      return (
        <>
          {section.inline ? (
            <p className="text-xl md:text-2xl text-ink leading-relaxed max-w-[46ch]">
              {section.drumbeat.map((l) => l.replace(/\.$/, '')).join(' · ')}
            </p>
          ) : (
            <div className="space-y-1.5 text-xl md:text-2xl text-ink max-w-[34ch]">
              {section.drumbeat.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
          {section.bridge && <p className="mt-6 text-lg text-graphite">{section.bridge}</p>}
          {section.pivot && <h2 className="mt-9 text-[26px] md:text-[36px] leading-[1.15] max-w-[24ch]">{section.pivot}</h2>}
          {section.disclosure && <Disclosure {...section.disclosure} triggerClass={a.trigger} />}
        </>
      );
    case 'blocks':
      return (
        <div className="space-y-12 md:space-y-14">
          {section.blocks.map((b, i) =>
            i === 0 ? (
              <div key={i}>
                <h2 className="text-[26px] md:text-[34px] leading-[1.18] max-w-[26ch]">{b.heading}</h2>
                <p className="mt-4 text-lg text-graphite leading-relaxed max-w-[58ch]">{b.para}</p>
                {b.disclosure && <Disclosure {...b.disclosure} triggerClass={a.trigger} />}
              </div>
            ) : (
              <div key={i}>
                <h3 className="text-[21px] md:text-[27px] leading-[1.2] max-w-[28ch]">{b.heading}</h3>
                <p className="mt-4 text-lg text-graphite leading-relaxed max-w-[58ch]">{b.para}</p>
                {b.disclosure && <Disclosure {...b.disclosure} triggerClass={a.trigger} />}
              </div>
            ),
          )}
        </div>
      );
    case 'twoSystems':
      return (
        <>
          <h2 className="text-[26px] md:text-[36px] leading-[1.15]">{section.pivot}</h2>
          <p className="mt-4 text-lg text-graphite">{section.intro}</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4 md:gap-5">
            <SystemCard label="The visible system" items={section.visible} />
            <SystemCard label="The invisible system" items={section.invisible} accent={a} />
          </div>
          <p className="mt-9 font-serif text-[24px] md:text-[32px] leading-[1.15] text-ink max-w-[24ch]">{section.close}</p>
          {section.disclosure && <Disclosure {...section.disclosure} triggerClass={a.trigger} />}
        </>
      );
    case 'statement':
      return (
        <>
          <h2 className="text-[26px] md:text-[36px] leading-[1.15] max-w-[30ch]">{section.heading}</h2>
          {section.body && (
            <div className="mt-6 space-y-4 text-lg text-graphite leading-relaxed max-w-[60ch]">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {section.disclosure && <Disclosure {...section.disclosure} triggerClass={a.trigger} />}
        </>
      );
    case 'outcomes':
      return (
        <>
          <h2 className="text-[26px] md:text-[36px] leading-[1.15] max-w-[22ch]">{section.heading}</h2>
          <ul className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-3.5 max-w-[52ch]">
            {section.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-lg text-ink">
                <span aria-hidden className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
                {o}
              </li>
            ))}
          </ul>
          {section.close && (
            <div className="mt-8 space-y-1.5 text-lg md:text-xl text-ink/85 max-w-[42ch]">
              {section.close.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
          {section.disclosure && <Disclosure {...section.disclosure} triggerClass={a.trigger} />}
        </>
      );
    case 'experience':
      return (
        <>
          <p className="text-lg md:text-xl text-graphite leading-relaxed max-w-[52ch]">{section.line}</p>
          {section.body && (
            <div className="mt-5 space-y-4 text-lg text-graphite leading-relaxed max-w-[58ch]">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          <div className="mt-9">
            <LogoTicker ariaLabel="Brands I’ve worked with" compact />
          </div>
        </>
      );
    case 'workCards':
      return (
        <>
          {section.heading && <h2 className="text-[24px] md:text-[32px] leading-[1.15] mb-8 max-w-[26ch]">{section.heading}</h2>}
          <div className="space-y-3.5">
            {section.models.map((m) => (
              <div key={m.title} className="rounded-2xl border border-stone bg-paper px-6 py-5 md:px-7 md:py-6">
                <h3 className="font-sans text-lg md:text-xl font-semibold tracking-tight text-ink">{m.title}</h3>
                <p className="mt-1.5 text-graphite">{m.blurb}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 italic text-graphite">{section.note}</p>
        </>
      );
  }
};

// These section labels read like deck/agenda headings; the owner asked to drop
// them and let the content lead. The label stays in the data (it's the
// disclosure's accessible name and a potential anchor).
const HIDDEN_LABELS = new Set(['The situation', 'What good looks like', 'Relevant experience', 'How we might work together']);

const SectionView = ({ section, accent }: { section: Section; accent: Accent }) => {
  if (section.kind === 'testimonial') {
    return (
      <section className="bg-plum text-bone py-16 md:py-24">
        <div className={`${COL} text-center`}>
          <FadeUp>
            <SectionLabel onDark>{section.label}</SectionLabel>
            <blockquote className="font-serif italic text-[24px] md:text-[32px] leading-[1.3] text-bone">“{section.quote}”</blockquote>
            <figcaption className="mt-6 text-[14px] text-bone/70">
              {section.name}, {section.role}
            </figcaption>
          </FadeUp>
        </div>
      </section>
    );
  }
  if (section.kind === 'plumStatement') {
    return (
      <section className="bg-plum text-bone py-16 md:py-24">
        <div className={`${COL} text-center`}>
          <FadeUp>
            <SectionLabel onDark>{section.label}</SectionLabel>
            <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.12] text-bone max-w-[20ch] mx-auto">{section.heading}</h2>
            {section.sub && <p className="mt-5 text-lg md:text-xl text-bone/75 max-w-[40ch] mx-auto">{section.sub}</p>}
          </FadeUp>
        </div>
      </section>
    );
  }
  return (
    <section className={`${bgClass(section.bg)} text-ink py-14 md:py-20 border-t border-stone/50`}>
      <div className={COL}>
        <FadeUp>
          {!HIDDEN_LABELS.has(section.label) && <SectionLabel>{section.label}</SectionLabel>}
          <SectionInner section={section} accent={accent} />
        </FadeUp>
      </div>
    </section>
  );
};

export const AudienceTemplate = ({ slug }: { slug: AudienceSlug }) => {
  const c = CONTENT[slug];
  const a = ACCENT[c.accent];

  return (
    <>
      <SeoMeta title={`${c.navLabel} | DAB Hands`} description={c.hero.subline} path={`/${c.slug}`} />

      <Layout footerVariant="none">
        {/* ── HERO (room atmosphere: accent wash fading into bone) ── */}
        <section className="bg-bone text-ink pt-32 md:pt-44 pb-14 md:pb-20 text-center" style={{ backgroundImage: a.heroWash }}>
          <div className={COL}>
            <FadeUp>
              <p className={`eyebrow mb-7 ${a.trigger}`}>{c.eyebrow}</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <h1 className="text-[38px] sm:text-[48px] md:text-[58px] leading-[1.08] max-w-[20ch] mx-auto">{c.hero.headline}</h1>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="mt-7 md:mt-9 text-lg md:text-xl text-graphite leading-relaxed max-w-[42ch] mx-auto">{c.hero.subline}</p>
            </FadeUp>
          </div>
        </section>

        {c.complete && c.sections && c.close ? (
          <>
            {c.sections.map((s, i) => (
              <SectionView key={i} section={s} accent={c.accent} />
            ))}
            <section className={`${bgClass(c.close.bg)} text-ink py-20 md:py-28 border-t border-stone/50 text-center`}>
              <div className={COL}>
                <FadeUp>
                  <h2 className="text-[26px] md:text-[40px] leading-[1.14] max-w-[26ch] mx-auto">{c.close.statement}</h2>
                </FadeUp>
                {c.close.subline && (
                  <FadeUp delay={0.08}>
                    <p className="mt-5 text-lg text-graphite leading-relaxed max-w-[48ch] mx-auto">{c.close.subline}</p>
                  </FadeUp>
                )}
                <FadeUp delay={0.16}>
                  <div className="mt-9 flex justify-center">
                    <CtaLink subject={c.navLabel} />
                  </div>
                </FadeUp>
              </div>
            </section>
          </>
        ) : (
          <section className="bg-bone text-ink py-16 md:py-28 text-center border-t border-stone/50">
            <div className={COL}>
              <FadeUp>
                <SectionLabel>In progress</SectionLabel>
                <p className="text-lg text-graphite leading-relaxed max-w-[50ch] mx-auto">
                  This page shares the same structure and visual system as the other doors. The copy for this audience is being written.
                </p>
                <div className="mt-10 flex justify-center">
                  <CtaLink subject={c.navLabel} />
                </div>
              </FadeUp>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};
