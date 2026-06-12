import { Fragment, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PrivateLayout } from '@/components/PrivateLayout';
import { SeoMeta } from '@/components/SeoMeta';
import { FadeUp } from '@/components/FadeUp';
import { HandUnderline } from '@/components/HandUnderline';
import { mailto } from '@/lib/mailto';

/*
 * PRIVATE PAGE — unlisted. No nav links to it, noindex, not in sitemap.
 */

const contextForces = [
  {
    label: 'New organisational design',
    description: 'The business is evolving its organisational structure to support future growth, creating an opportunity to establish clear roles, responsibilities, decision-making pathways and ways of working from the outset.',
  },
  {
    label: 'Pod model maturity',
    description: 'As the pod model develops, there is an opportunity to strengthen consistency, visibility and collaboration while preserving the autonomy and agility that make pods effective.',
  },
  {
    label: 'Operational complexity',
    description: 'As clients, teams and programmes grow in scale and sophistication, greater coordination is required to ensure work moves efficiently through the organisation without creating unnecessary overhead.',
  },
  {
    label: 'AI acceleration',
    description: 'AI is rapidly changing how agencies operate, create and deliver value. Organisations that successfully integrate AI into their operating model will be better positioned to improve efficiency, capability and competitiveness.',
  },
  {
    label: 'Technology alignment',
    description: 'Technology, delivery and operational processes increasingly need to work as a connected system to support both business performance and future capability development.',
  },
  {
    label: 'Cross-functional coherence',
    description: 'As expertise becomes more distributed across disciplines, ensuring alignment between teams, functions and leadership becomes increasingly important to maintaining organisational effectiveness.',
  },
  {
    label: 'Visibility & decision-making',
    description: 'Leaders require timely, reliable insight into delivery, resourcing, performance and risk in order to make confident decisions and respond effectively to changing priorities.',
  },
  {
    label: 'Delivery excellence at scale',
    description: 'Maintaining the quality, consistency and predictability of delivery becomes increasingly important as the business grows and supports a broader range of client engagements.',
  },
  {
    label: 'Delivery leadership & ownership',
    description: 'Sustaining delivery excellence at scale requires more than process alone. Strong leadership, clear ownership and effective operational coordination help align teams, remove friction, accelerate decision-making and create the conditions for consistent client and business outcomes.',
  },
  {
    label: 'Future capability development',
    description: 'Building the skills, tools and operating capabilities required for the next generation of client challenges is becoming a strategic priority across the industry.',
  },
  {
    label: 'Client transformation demands',
    description: 'Clients are navigating significant shifts in technology, customer expectations and operating models, creating demand for partners who can help them adapt with confidence.',
  },
  {
    label: 'Competitive differentiation',
    description: 'In an increasingly crowded market, the ability to combine creativity, operational excellence, technology and adaptability can become a meaningful source of competitive advantage.',
  },
  {
    label: 'Sustainable growth through 2027',
    description: 'Future growth will depend not only on winning new opportunities, but on creating the operational foundations, capability and organisational resilience required to support them successfully over time.',
  },
];

const phases = [
  { q: 'Q1', verb: 'See', rest: 'the system' },
  { q: 'Q2', verb: 'Improve', rest: 'the system' },
  { q: 'Q3+', verb: 'Evolve', rest: 'the system' },
];

const altitudes = [
  {
    label: 'Run the business',
    theme: 'Delivery',
    tagline: 'Keep the work moving. Deliver excellence.',
    icon: '/images/icon-run-the-business.svg',
    phases: [
      ['Delivery health assessment', 'PM capability review', 'Resource planning visibility', 'Governance audit', 'Client confidence baseline'],
      ['Standardise delivery practices', 'Improve forecasting & planning', 'Increase utilisation visibility', 'Strengthen governance', 'Improve client confidence'],
      ['Predictive resource planning', 'Automated reporting & insights', 'Operational excellence model', 'Scaled delivery capability', 'Exceptional client outcomes'],
    ],
  },
  {
    label: 'Improve the business',
    theme: 'Coherence',
    tagline: 'Create flow, alignment and shared capability.',
    icon: '/images/icon-improve-the-business.svg',
    phases: [
      ['Map organisational friction', 'Identify bottlenecks', 'Assess pod consistency', 'Understand decision pathways', 'Visibility & data assessment'],
      ['Establish shared standards', 'Implement shared tooling', 'Create cross-pod visibility', 'Build accountability rhythms', 'Enable shared learning loops'],
      ['Connected operating system', 'Leadership & decision visibility', 'Cross-pod consistency at scale', 'Continuous improvement engine', 'Stronger, more cohesive culture'],
    ],
  },
  {
    label: 'Evolve the business',
    theme: 'Future',
    tagline: 'Build future capability and innovate.',
    icon: '/images/icon-evolve-the-business.svg',
    phases: [
      ['AI opportunity assessment', 'Technology capability review', 'Future skills & capability mapping', 'CTO alignment & conversations', 'Understand tech landscape'],
      ['Pilot AI-enabled workflows', 'Develop future capabilities', 'Strengthen tech alignment', 'Upskill teams', 'Test, learn, iterate'],
      ['AI-enabled operating model', 'Future capability framework', 'Technology leverage at scale', 'Agency of the future', 'Sustainable competitive advantage'],
    ],
  },
];

const characteristics = [
  {
    label: 'Aligned priorities',
    description: 'People, teams and leadership are aligned around what matters most. Strategic objectives are clearly understood, effort is focused on the highest-value activities and resources are directed toward the work that will have the greatest impact for both the business and its clients.',
  },
  {
    label: 'Faster decisions',
    description: 'Decision-making is supported by clear ownership, reliable information and the right level of visibility. Leaders and teams are able to make informed decisions with greater confidence, reducing delays, avoiding unnecessary escalation and maintaining forward momentum.',
  },
  {
    label: 'Clear accountability',
    description: 'Roles, responsibilities and decision rights are understood across the organisation. Ownership is visible, expectations are clear and individuals and teams are empowered to take responsibility for outcomes.',
  },
  {
    label: 'Less friction',
    description: 'Work moves more effectively across teams, disciplines and functions. Unnecessary complexity, duplication and bottlenecks are reduced, enabling people to spend more time creating value.',
  },
  {
    label: 'Greater momentum',
    description: 'The organisation is able to maintain consistent forward progress without relying on heroic effort. Priorities remain aligned, teams remain focused and opportunities can be pursued with greater speed and confidence.',
  },
  {
    label: 'Better execution',
    description: 'Strong planning, governance and operational discipline create the conditions for consistent delivery excellence.',
  },
  {
    label: 'Adaptive capability',
    description: 'The business is able to respond effectively to changing client needs, emerging technologies and evolving market conditions. Learning, experimentation and continuous improvement become embedded in how the organisation operates.',
  },
  {
    label: 'AI-enabled operations',
    description: 'Artificial intelligence is applied where it creates meaningful value. Routine activities are streamlined, decision-making is enhanced and teams are able to focus on higher-value work.',
  },
  {
    label: 'Human-AI coordination',
    description: 'People and AI operate within a clearly governed system where responsibilities, decision rights and oversight are understood. Technology enhances human capability while maintaining quality, accountability and trust.',
  },
  {
    label: 'Sustainable growth',
    description: 'Growth is supported by scalable systems, shared capability and effective operational foundations.',
  },
];

const outcomes = [
  {
    label: 'Client Confidence',
    icon: '/images/icon-client-confidence.svg',
    copy: 'Trusted delivery. Stronger relationships. Consistent outcomes.',
  },
  {
    label: 'Growth',
    icon: '/images/icon-growth.svg',
    copy: 'Greater capacity. New opportunities. Stronger performance.',
  },
  {
    label: 'Scale',
    icon: '/images/icon-scale.svg',
    copy: 'Shared capability. Consistent execution. Sustainable growth.',
  },
  {
    label: 'Innovation',
    icon: '/images/icon-innovation.svg',
    copy: 'Space to experiment. Learn faster. Create new value.',
  },
  {
    label: 'Adaptability',
    icon: '/images/icon-future-relevance.svg',
    copy: 'Ready for change. Future-focused capability. Competitive relevance.',
  },
  {
    label: 'People & Culture',
    icon: '/images/icon-people-culture.svg',
    copy: 'Engaged teams. Shared ownership. Continuous improvement.',
  },
];

/**
 * Chip selector + reading panel. The active chip fills charcoal (mirroring
 * the accordion active state); the panel lifts to sand like the accordion
 * open state. First item selected on load so the content is never hidden.
 * panelMinHClass absorbs the longest description so the page doesn't jump.
 */
const ChipExplorer = ({
  items,
  panelMinHClass,
}: {
  items: { label: string; description: string }[];
  panelMinHClass: string;
}) => {
  const [selected, setSelected] = useState(0);
  const reduceMotion = useReducedMotion();
  const item = items[selected];
  return (
    <div className="max-w-4xl">
      <ul className="flex flex-wrap gap-2.5 md:gap-3">
        {items.map((f, i) => {
          const active = i === selected;
          return (
            <li key={f.label}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={active}
                className={`text-[13px] md:text-[14px] leading-none tracking-tight px-4 py-2.5 rounded-full border transition-colors ${
                  active
                    ? 'bg-dab-charcoal border-dab-charcoal text-dab-green'
                    : 'border-dab-charcoal/25 text-dab-charcoal/80 hover:border-dab-charcoal/60 hover:text-dab-charcoal'
                }`}
              >
                {f.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 md:mt-8 bg-dab-cream rounded-xl px-6 py-6 md:px-8 md:py-7" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={panelMinHClass}
          >
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-dab-charcoal/75">
              {item.label}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-dab-charcoal/85 max-w-[65ch]">
              {item.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const PhaseHeading = ({ phase, className = '' }: { phase: (typeof phases)[number]; className?: string }) => (
  <p className={`font-mono text-[10px] tracking-[0.22em] uppercase ${className}`}>
    <span className="text-dab-green">{phase.q}</span>{' '}
    <span className="text-dab-green">{phase.verb}</span>{' '}
    <span className="text-dab-cream/55">{phase.rest}</span>
  </p>
);

const ActivityList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-dab-cream/80">
        <span aria-hidden className="mt-[0.6em] block w-3 h-px bg-dab-green/70 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

export default function ManifestoDigital() {
  const [activeQuarter, setActiveQuarter] = useState(0);
  const reduceMotion = useReducedMotion();
  return (
    <>
      <SeoMeta
        title="Manifesto Digital 2027 | A point of view from DAB Hands"
        description="Building a modern delivery operating system. A point of view on the next 12 months, prepared for Manifesto Digital."
        path="/for/manifesto-digital"
        noindex
      />

      <PrivateLayout>
        {/* ── HERO ──────────────────────────────────── */}
        <section className="relative bg-dab-cream text-dab-charcoal overflow-hidden pt-32 md:pt-44 pb-14 md:pb-32">
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <div className="flex items-center gap-3.5 md:gap-4 mb-8 md:mb-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/darren-brett_colour_headshot.jpeg"
                  alt="Darren Brett"
                  draggable={false}
                  className="w-11 h-11 md:w-13 md:h-13 rounded-full object-cover shrink-0"
                />
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/75">
                  Prepared by Darren Brett for Rebecca Hull, Manifesto Digital
                </p>
              </div>
              <p className="text-xl md:text-2xl font-medium tracking-[-0.022em] mb-4 md:mb-6">
                Manifesto Digital
              </p>
              <h1 className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[16ch]">
                Building a modern delivery operating system
              </h1>
              <p className="mt-5 md:mt-7 text-xl md:text-2xl font-medium tracking-[-0.022em] text-dab-charcoal/75">
                A perspective on the journey to 2027
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── THE MANIFESTO LINE (white, centred) ───── */}
        <section className="bg-white text-dab-charcoal py-20 md:py-48">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/75 mb-10 md:mb-14">
                We lead with strategy
              </p>
              <h2 className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[72px] font-medium leading-[0.8] tracking-[-0.03em] max-w-[24ch] mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto', textWrap: 'balance' }}>
                Every operational and delivery decision should reinforce our strategy and strengthen our ability to meet the evolving needs of our clients.
              </h2>
            </FadeUp>
            <FadeUp delay={0.18}>
              <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
                {['Manifesto strategy', 'Client imperatives', 'Delivery operating system'].map((step, i) => (
                  <Fragment key={step}>
                    {i > 0 && (
                      <span aria-hidden className="text-dab-charcoal/40 text-xl md:text-2xl leading-none rotate-90 md:rotate-0">
                        &rarr;
                      </span>
                    )}
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase bg-dab-charcoal text-dab-green rounded-full px-5 py-3 text-center">
                      {step}
                    </span>
                  </Fragment>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── THE FORCES IN PLAY (white) ────────────── */}
        <section className="bg-white text-dab-charcoal pb-14 md:pb-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/75 mb-6 md:mb-8">
                The forces in play
              </p>
              <p className="text-xl leading-relaxed text-dab-charcoal/80 max-w-[56ch] mb-10 md:mb-12">
                The operating system does not exist in isolation. It is shaped by a number of forces acting on both the business and the wider market.
              </p>
              <ChipExplorer
                items={contextForces}
                panelMinHClass="min-h-[8.5rem] sm:min-h-[6.5rem] md:min-h-[5.5rem]"
              />
            </FadeUp>
          </div>
        </section>

        {/* ── THE SYSTEM (charcoal, 3x3) ────────────── */}
        <section className="bg-dab-charcoal text-dab-cream py-16 md:py-40">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/75 mb-10 md:mb-14">
                The plan
              </p>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-medium leading-[0.8] tracking-[-0.03em] max-w-[26ch]">
                A frame for the next 12 months
              </h2>
            </FadeUp>

            {/* Desktop matrix (lg+) */}
            <div className="hidden lg:block mt-16 md:mt-24">
              <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] gap-x-10 pb-5 border-b border-dab-cream/20">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-dab-cream/60">
                  Altitude / time
                </p>
                {phases.map((phase) => (
                  <PhaseHeading key={phase.q} phase={phase} />
                ))}
              </div>
              {altitudes.map((altitude) => (
                <FadeUp key={altitude.label}>
                  <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] gap-x-10 py-10 xl:py-12 border-b border-dab-cream/15">
                    <div className="pr-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={altitude.icon} alt="" aria-hidden loading="lazy" decoding="async" className="w-9 h-9 mb-5" />
                      <h3 className="text-2xl xl:text-[28px] font-medium tracking-[-0.022em] leading-tight">
                        {altitude.label}
                      </h3>
                      <p className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-dab-green">
                        {altitude.theme}
                      </p>
                      <p className="mt-4 text-[15px] leading-relaxed text-dab-cream/65 max-w-[22ch]">
                        {altitude.tagline}
                      </p>
                    </div>
                    {altitude.phases.map((items, i) => (
                      <ActivityList key={phases[i].q} items={items} />
                    ))}
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Mobile / tablet: quarter switcher — one quarter across all
                three altitudes at once. Reading order matches how a plan is
                consumed: pick the quarter, see the whole business. */}
            <div className="lg:hidden mt-12">
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Choose a quarter">
                {phases.map((phase, i) => {
                  const active = i === activeQuarter;
                  return (
                    <button
                      key={phase.q}
                      type="button"
                      onClick={() => setActiveQuarter(i)}
                      aria-pressed={active}
                      className={`font-mono text-[10px] tracking-[0.18em] uppercase rounded-full px-2 py-3 border transition-colors ${
                        active
                          ? 'bg-dab-green border-dab-green text-dab-charcoal'
                          : 'border-dab-cream/25 text-dab-cream/70'
                      }`}
                    >
                      {phase.q} {phase.verb}
                    </button>
                  );
                })}
              </div>
              <div aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeQuarter}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 space-y-4"
                  >
                    <PhaseHeading phase={phases[activeQuarter]} className="pt-1" />
                    {altitudes.map((altitude) => (
                      <div key={altitude.label} className="bg-white/[0.04] border border-dab-cream/10 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={altitude.icon} alt="" aria-hidden loading="lazy" decoding="async" className="w-7 h-7 shrink-0" />
                          <h3 className="text-lg font-medium tracking-[-0.022em] leading-tight">
                            {altitude.label}
                          </h3>
                          <span className="ml-auto font-mono text-[10px] tracking-[0.18em] uppercase text-dab-green">
                            {altitude.theme}
                          </span>
                        </div>
                        <ActivityList items={altitude.phases[activeQuarter]} />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── OPERATING MODEL CHARACTERISTICS (white) ── */}
        <section className="bg-white text-dab-charcoal py-14 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/75 mb-10 md:mb-14">
                What we&rsquo;re building towards
              </p>
              <h2 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-medium leading-[0.8] tracking-[-0.03em] max-w-[22ch]">
                Characteristics of a high-performing system
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mt-12 md:mt-16">
                <ChipExplorer
                  items={characteristics}
                  panelMinHClass="min-h-[8.5rem] sm:min-h-[6.5rem] md:min-h-[5.5rem]"
                />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── OUTCOMES (charcoal) ───────────────────── */}
        <section className="bg-dab-charcoal text-dab-cream py-16 md:py-40">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/75 mb-10 md:mb-14">
                Outcomes
              </p>
              <h2 className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] font-medium leading-[0.8] tracking-[-0.03em] max-w-[18ch]">
                What success looks like
              </h2>
            </FadeUp>
            <div className="mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-16">
              {outcomes.map((outcome, i) => (
                <FadeUp key={outcome.label} delay={i * 0.06}>
                  <div className="border-t border-dab-cream/15 pt-7">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={outcome.icon} alt="" aria-hidden loading="lazy" decoding="async" className="w-9 h-9 mb-5" />
                    <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-dab-green">
                      {outcome.label}
                    </h3>
                    <p className="mt-3.5 text-lg leading-relaxed text-dab-cream/80 max-w-[30ch]">
                      {outcome.copy}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEATH THE SYSTEM (white) ────────────── */}
        <section className="bg-white text-dab-charcoal py-16 md:py-40">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="text-center">
              <FadeUp>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/75 mb-10 md:mb-14">
                  Beneath the system
                </p>
                <h2 className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] font-medium leading-[0.8] tracking-[-0.03em] max-w-[20ch] mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  Every organisation has two operating systems.
                </h2>
              </FadeUp>
            </div>

            <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-5 md:gap-8 max-w-5xl mx-auto">
              {/* The visible system: rendered visibly. Crisp, bordered, technical. */}
              <FadeUp delay={0.1}>
                <div className="h-full border border-dab-charcoal/20 rounded-2xl p-7 md:p-9">
                  <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/75">
                    01 &middot; The visible system
                  </p>
                  <ul className="mt-6 md:mt-8">
                    {['Structures', 'Processes', 'Governance', 'Technology', 'Delivery'].map((word) => (
                      <li
                        key={word}
                        className="border-t border-dab-charcoal/10 py-3 md:py-3.5 text-xl md:text-2xl font-medium tracking-[-0.022em]"
                      >
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* The invisible system: rendered dark. The underlying current. */}
              <FadeUp delay={0.22}>
                <div className="h-full bg-dab-charcoal text-dab-cream rounded-2xl p-7 md:p-9">
                  <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-green">
                    02 &middot; The invisible system
                  </p>
                  <ul className="mt-6 md:mt-8 grid grid-cols-2 gap-x-6 md:gap-x-8">
                    {['Trust', 'Relationships', 'Ownership', 'Confidence', 'Energy', 'Incentives', 'Habits', 'Culture'].map((word) => (
                      <li
                        key={word}
                        className="border-t border-dab-cream/15 py-3 md:py-3.5 text-xl md:text-2xl font-medium tracking-[-0.022em]"
                      >
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>

            <div className="mt-14 md:mt-20 text-center">
              <FadeUp>
                <p className="text-xl md:text-2xl leading-relaxed text-dab-charcoal/70 max-w-[42ch] mx-auto">
                  The first is easier to see.<br className="sm:hidden" /> The second is just as important.
                </p>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p className="mt-6 md:mt-8 text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1] tracking-[-0.03em] max-w-[24ch] mx-auto" style={{ textWrap: 'balance' }}>
                  The strongest organisations evolve{' '}
                  <HandUnderline delay={1.0} variant={2} tone="light">both</HandUnderline>.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── CLOSING (sand) ────────────────────────── */}
        <section className="bg-dab-cream text-dab-charcoal py-16 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <h2 className="text-[28px] md:text-[40px] lg:text-[52px] font-medium leading-[0.8] tracking-[-0.03em] max-w-[24ch] mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto', textWrap: 'balance' }}>
                The dots are already here. Perhaps it&rsquo;s simply a case of connecting them.
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mt-10 md:mt-14 flex justify-center">
                <a
                  href={mailto({
                    subject: 'Comparing Notes',
                    body: "Hi Darren,\n\nI've been reading your perspective on building a modern delivery operating system.\n\nA few thoughts came to mind...",
                  })}
                  className="group inline-flex items-center gap-2 border border-dab-charcoal text-dab-charcoal text-[14px] font-medium tracking-tight px-6 py-3 rounded-full hover:bg-dab-charcoal hover:text-dab-cream transition-colors"
                >
                  Compare notes
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </PrivateLayout>
    </>
  );
}
