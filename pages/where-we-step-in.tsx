import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { BoxCTA } from '@/components/BoxCTA';
import { Ribbon } from '@/components/Ribbon';
import { RibbonAccent } from '@/components/RibbonAccent';
import { HandUnderline } from '@/components/HandUnderline';
import { StatPopover } from '@/components/StatPopover';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

const builtForItems = [
  {
    label: 'Critical launches under pressure.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="17" cy="19" r="9" />
        <line x1="14" y1="4" x2="20" y2="4" />
        <line x1="17" y1="4" x2="17" y2="8" />
        <line x1="17" y1="19" x2="17" y2="12" />
        <line x1="17" y1="19" x2="21" y2="23" />
      </svg>
    ),
  },
  {
    label: 'Customer experiences fragmented across channels.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="10" cy="11" r="2" fill="currentColor" />
        <circle cx="22" cy="8" r="2" fill="currentColor" />
        <circle cx="17" cy="17" r="2" fill="currentColor" />
        <circle cx="25" cy="23" r="2" fill="currentColor" />
        <circle cx="8" cy="25" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Cross-functional initiatives losing momentum.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="27" x2="30" y2="27" />
        <line x1="8" y1="27" x2="8" y2="9" />
        <line x1="15" y1="27" x2="15" y2="14" />
        <line x1="22" y1="27" x2="22" y2="19" />
        <line x1="29" y1="27" x2="29" y2="23" />
      </svg>
    ),
  },
  {
    label: 'Complex delivery ecosystems lacking coordination.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="3" />
        <circle cx="24" cy="10" r="3" />
        <circle cx="17" cy="22" r="3" />
        <line x1="12.5" y1="12" x2="15" y2="20" />
        <line x1="21.5" y1="12" x2="19" y2="20" />
      </svg>
    ),
  },
];

const cccItems = [
  {
    label: 'Stronger customer experiences',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6" />
        <circle cx="22" cy="12" r="6" />
        <circle cx="17" cy="22" r="6" />
      </svg>
    ),
  },
  {
    label: 'Better execution quality',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18 L13 25 L28 10" />
      </svg>
    ),
  },
  {
    label: 'More commercial impact',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 27 L27 7" />
        <path d="M14 7 L27 7 L27 20" />
      </svg>
    ),
  },
];

const interventions: Array<{ title: string; lead: string; outro: string }> = [
  {
    title: 'Complex ecosystems needing orchestration',
    lead: 'Multiple teams, partners, platforms, and stakeholders are involved, but movement is becoming fragmented.',
    outro: 'DAB Hands helps reconnect the ecosystem around shared outcomes.',
  },
  {
    title: 'Important work losing momentum',
    lead: 'The initiative is moving, but not fast enough. Decisions slow, ownership fragments, and progress becomes harder to maintain.',
    outro: 'DAB Hands restores clarity, momentum, and forward movement.',
  },
  {
    title: 'Strong work losing strength',
    lead: 'The original intent is becoming diluted as the work moves through teams, channels, and delivery.',
    outro: 'DAB Hands helps keep strong work strong as it moves to market.',
  },
  {
    title: 'The initiative needs experienced leadership',
    lead: 'The work has become too important to leave to chance.',
    outro: 'DAB Hands brings experienced leadership around the initiative where and when it is needed.',
  },
  {
    title: 'Operational drag slowing progress',
    lead: 'The work is being slowed by friction, unclear ownership, and delivery complexity.',
    outro: 'DAB Hands reduces drag and helps the work move properly again.',
  },
  {
    title: 'Existing investment underperforming',
    lead: 'The business already has strong people, platforms, and ideas.\nThe challenge is helping them move together more effectively.',
    outro: 'DAB Hands helps unlock more value from what already exists.',
  },
];

// Render soft-break lines inside a single <p>
const SoftLines = ({ text }: { text: string }) => (
  <>
    {text.split('\n').map((line, i, arr) => (
      <Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </Fragment>
    ))}
  </>
);

export default function WhereWeStepIn() {
  return (
    <>
      <SeoMeta
        title="Where DAB Hands steps in"
        description="DAB Hands is built around critical digital initiatives that cannot afford to drift. Senior-led delivery for complex work that needs to move together at pace."
        path="/where-we-step-in"
      />

      <Layout footerVariant="minimal">
        {/* HERO */}
        <section className="bg-dab-cream text-dab-charcoal pt-36 md:pt-44 pb-24 md:pb-32 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sand-ripple.jpg"
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none select-none absolute right-0 bottom-0 h-[80%] w-auto max-w-none opacity-50 sm:opacity-75 md:opacity-100"
            style={{
              maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
              WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
            }}
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch]">
                Where we step in
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mt-10 md:mt-12 text-xl text-dab-charcoal leading-relaxed max-w-[58ch]">
                <p>Helping important work stay strong as it moves through complexity.</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* OFTEN BROUGHT IN AROUND */}
        <section className="bg-white text-dab-charcoal py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-6 md:mb-8">
              Often brought in when
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-12 md:gap-x-6 lg:gap-x-8 list-none p-0 m-0">
              {builtForItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`md:col-span-6 flex items-center gap-4 md:gap-5 ${
                    i % 2 === 1 ? 'md:border-l md:border-dab-charcoal/25 md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'
                  }`}
                >
                  <span className="flex-shrink-0 text-dab-charcoal" aria-hidden>{item.icon}</span>
                  <p className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold leading-tight tracking-[-0.025em] text-dab-charcoal">
                    {item.label}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* INTERVENTION POINTS */}
        <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 border-t border-dab-charcoal/10 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sand-ripple.jpg"
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none select-none absolute right-0 bottom-0 h-[40%] w-auto max-w-none opacity-50 sm:opacity-75 md:opacity-100"
            style={{
              maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
              WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
            }}
          />

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch] mb-16 md:mb-20">
                Common pressure points
              </h2>
            </FadeUp>

            <ol className="list-none p-0 m-0">
              {interventions.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.04 * i }}
                  className="py-12 md:py-16 lg:py-20 border-t border-dab-charcoal/10"
                >
                  <div className="grid md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                    <div className="md:col-span-4">
                      <p className="font-mono text-[24px] md:text-[28px] text-dab-charcoal/40 tabular-nums mb-4 md:mb-6">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-2xl md:text-3xl lg:text-[34px] font-semibold tracking-[-0.022em] leading-tight max-w-[14ch]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="md:col-span-7 md:col-start-6">
                      <div className="space-y-5 text-xl text-dab-charcoal leading-relaxed max-w-[52ch]">
                        <p>
                          <SoftLines text={item.lead} />
                        </p>
                        <p>{item.outro}</p>
                      </div>
                      <a
                        href={mailto({ subject: item.title })}
                        className="group inline-flex items-center gap-2 mt-8 md:mt-10 font-mono text-[11px] tracking-[0.18em] uppercase text-dab-charcoal border-b border-dab-charcoal/30 hover:border-dab-charcoal pb-1 transition-colors"
                      >
                        Start a conversation
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ATTENTION / CONNECTION / CONVERSION */}
        <section className="bg-white text-dab-charcoal py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-6 md:mb-8">
              The outcome
            </p>
            <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch] mb-14 md:mb-20">
              When important work moves together more effectively
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-6 lg:gap-x-8 list-none p-0 m-0">
              {cccItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`md:col-span-4 flex flex-col items-start gap-4 md:gap-5 ${
                    i > 0 ? 'md:border-l md:border-dab-charcoal/25 md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'
                  }`}
                >
                  <span className="flex-shrink-0 text-dab-charcoal" aria-hidden>{item.icon}</span>
                  <p className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold leading-tight tracking-[-0.025em] text-dab-charcoal">
                    {item.label}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* THE EXECUTION GAP */}
        <section className="bg-dab-charcoal text-dab-cream py-28 md:py-40 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Ribbon
              className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[55%] lg:w-[45%]"
              opacity={0.32}
              drift={28}
              tone="dark"
              flip
            />
          </div>

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/55 mb-10 md:mb-14">
                Why expert delivery matters
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-medium leading-[1.04] tracking-[-0.03em] max-w-[20ch]">
                <span className="block mb-4 md:mb-5">
                  Technology is accelerating quickly.
                </span>
                <span className="block mb-10 md:mb-12">
                  Human systems are not.
                </span>
                <span className="block mb-4 md:mb-5">
                  Most businesses do not lose on <HandUnderline delay={1.2} variant={3}>ambition</HandUnderline>.
                </span>
                <span className="block">
                  They lose through <HandUnderline delay={1.4} variant={2}>execution</HandUnderline>.
                </span>
              </h2>
            </FadeUp>

            <div className="mt-20 md:mt-24 grid md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 border-t border-dab-brown/20">
              <FadeUp delay={0.08} className="md:col-span-6">
                <div className="py-12 md:py-16 md:border-r border-dab-brown/20 md:pr-6 lg:pr-8">
                  <StatPopover
                    number={<>60<span className="text-[48px] md:text-[64px]">%</span></>}
                    content="Research published by Harvard Business Review found that organisations typically realise only around 60% of the potential value of their strategies. The gap is rarely caused by ambition alone. It is more often the result of breakdowns in planning, alignment, communication, ownership, and execution as work moves through complex systems and organisations."
                    source="— Harvard Business Review"
                  />
                  <p className="text-xl text-dab-cream leading-relaxed max-w-[36ch] mt-6">
                    Most companies realise only around 60% of the <HandUnderline delay={1.1} variant={1}>potential value</HandUnderline> of their strategies.
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown mt-5">
                    — Harvard Business Review
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.18} className="md:col-span-6">
                <div className="py-12 md:py-16 border-t md:border-t-0 border-dab-brown/20">
                  <StatPopover
                    number={<>20<span className="text-[48px] md:text-[64px]">–</span>30<span className="text-[48px] md:text-[64px]">%</span></>}
                    content="McKinsey research across operations and enterprise transformation repeatedly highlights the cost of fragmented systems, duplicated effort, unclear ownership, rework, slow decision-making, and operational inefficiency. As organisations grow, complexity increases faster than alignment, creating measurable waste across time, resources, and execution quality."
                    source="— McKinsey & Company"
                    align="end"
                  />
                  <p className="text-xl text-dab-cream leading-relaxed max-w-[36ch] mt-6">
                    Estimated <HandUnderline delay={1.3} variant={4}>operational waste</HandUnderline> caused by inefficiency, rework, and fragmented systems.
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown mt-5">
                    — McKinsey &amp; Company
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* CLOSING STATEMENT */}
        <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 relative overflow-hidden">
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dab-hands-crown-mark.svg"
                alt=""
                aria-hidden
                draggable={false}
                className="mx-auto mb-8 md:mb-10 w-[120px] sm:w-[144px] md:w-[176px] lg:w-[200px] h-auto"
              />
            </FadeUp>
            <FadeUp>
              <p className="text-[28px] md:text-[40px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[24ch] mx-auto">
                Backed by 20+ years helping strong work stay strong as it moves to market.
              </p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="mt-8 md:mt-10 text-xl md:text-2xl text-dab-charcoal/75 leading-relaxed max-w-[34ch] mx-auto">
                We help organisations get stronger digital work out into the world.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <div className="mt-14 md:mt-20 flex justify-center">
                <BoxCTA href="/experience" label="Experience" />
              </div>
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
