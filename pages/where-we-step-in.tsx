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

const cccItems = [
  {
    label: 'Attention.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="17" cy="17" r="13" />
        <circle cx="17" cy="17" r="7" />
        <circle cx="17" cy="17" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Connection.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="8" cy="17" r="4" />
        <circle cx="26" cy="17" r="4" />
        <line x1="12" y1="17" x2="22" y2="17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Conversion.',
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
    title: 'Critical work drifting',
    lead: 'Momentum slows.\nOwnership fragments.\nExecution weakens.',
    outro: 'DAB Hands restores clarity, alignment, and momentum around the work.',
  },
  {
    title: 'Quality starting to weaken',
    lead: 'Strong ideas often lose strength during execution.',
    outro: 'DAB Hands helps protect the quality of the work as it moves to market.',
  },
  {
    title: 'Teams no longer aligned',
    lead: 'Different priorities create friction around important work.',
    outro: 'DAB Hands reconnects teams around shared momentum and execution quality.',
  },
  {
    title: 'The initiative needs stronger capability',
    lead: 'Some initiatives need more senior capability around the work.',
    outro: 'DAB Hands builds lean senior teams designed for quality, speed, and focus.',
  },
  {
    title: 'Friction slowing the work',
    lead: 'Slow decisions and fragmented ownership weaken execution.',
    outro: 'DAB Hands reduces operational drag and helps the work move properly again.',
  },
  {
    title: 'Existing investment underperforming',
    lead: 'Most organisations already have strong people, ideas, and platforms.',
    outro: 'The challenge is getting them moving together effectively.',
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
              <div className="mt-10 md:mt-12 text-xl text-dab-charcoal leading-relaxed max-w-[58ch] space-y-6">
                <p>Built for complex initiatives where strategy, creative, product, platforms, and customer experience need to move together at pace.</p>
                <p>Experienced operating across client teams, agency partners, technology partners, and specialist collaborators to help important work move together more effectively.</p>
              </div>
            </FadeUp>
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
                  className={`md:col-span-4 flex items-center gap-4 md:gap-5 ${
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
                  className="border-t border-dab-charcoal/15 last:border-b last:border-dab-charcoal/15 py-12 md:py-16 lg:py-20"
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
                Backed by 20+ years of senior digital delivery.
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
