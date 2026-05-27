import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { BoxCTA } from '@/components/BoxCTA';
import { Ribbon } from '@/components/Ribbon';
import { HandUnderline } from '@/components/HandUnderline';
import { SeoMeta } from '@/components/SeoMeta';

const antidotePoints = [
  'Senior capability without heavy operational overhead.',
  'Senior judgement around important work.',
  'Fast to align and activate.',
  'Faster movement through complexity.',
  'Smooth integration across agencies, partners and internal teams.',
  'More value from existing investment.',
];

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
    label: 'Strategy and execution drifting apart.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17 L29 7" />
        <path d="M5 17 L29 27" />
        <circle cx="5" cy="17" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <SeoMeta
        title="DAB Hands | Senior digital delivery for high-stakes work"
        description="DAB Hands is a senior-led delivery model for critical digital initiatives. Keeping important work aligned, moving, and commercially effective."
        path="/"
      />

      <Layout footerVariant="minimal">
        {/* ── HERO ──────────────────────────────────── */}
        <section className="relative bg-dab-cream text-dab-charcoal overflow-hidden min-h-[100vh] flex flex-col">
          <Ribbon
            className="absolute right-0 top-[32px] md:top-auto md:bottom-0 w-[120%] md:w-full"
            opacity={0.4}
            drift={28}
          />

          <div className="relative z-10 flex-1 flex items-center justify-center pt-28 pb-12 md:pt-32 md:pb-20">
            <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
              <FadeUp>
                <h1 className="text-[56px] sm:text-[68px] md:text-[80px] lg:text-[104px] xl:text-[120px] font-medium leading-[0.96] tracking-[-0.03em] max-w-[16ch] mx-auto">
                  Keeping important work moving
                </h1>
              </FadeUp>

              <FadeUp delay={0.16}>
                <div className="mt-12 md:mt-16 space-y-3 text-xl text-dab-charcoal leading-relaxed max-w-[44ch] md:max-w-none mx-auto">
                  <p>Important digital work can quickly lose momentum within complex organisations.</p>
                  <p>We help modern brands get stronger<br className="sm:hidden" /> digital work out into the world.</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── BUILT FOR ─────────────────────────────── */}
        <section className="bg-white text-dab-charcoal py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-6 md:mb-8">
              Often brought in around
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

        {/* ── WHERE WE ARE ──────────────────────────── */}
        <section className="bg-dab-charcoal text-dab-cream py-28 md:py-40 relative min-h-[90vh] flex flex-col justify-center">
          <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />

          <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/55 mb-16 md:mb-24">
                Where we are
              </p>
            </FadeUp>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } } }}
              className="space-y-16 md:space-y-20 lg:space-y-28"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="md:max-w-[65%]"
              >
                <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] xl:text-[88px] font-medium leading-[1.04] tracking-[-0.03em] md:whitespace-nowrap!">
                  The tools are changing.<br />
                  The problems aren&rsquo;t.
                </h2>
                <span className="block w-10 h-px bg-dab-green mt-5 md:mt-7" />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="md:max-w-[65%]"
              >
                <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] xl:text-[88px] font-medium leading-[1.04] tracking-[-0.03em]">
                  Complexity is higher than ever.
                </h2>
                <span className="block w-10 h-px bg-dab-green mt-5 md:mt-7" />
              </motion.div>
            </motion.div>

            <FadeUp delay={0.32}>
              <div className="mt-24 md:mt-32 space-y-6 max-w-[60ch] text-xl text-dab-cream leading-relaxed">
                <p className="space-y-3">
                  <span className="block">Inside organisations, friction <HandUnderline delay={1.2} variant={3}>slows</HandUnderline> the work.</span>
                  <span className="block">The role of new <HandUnderline delay={1.35} variant={1}>technology</HandUnderline> is still being worked out.</span>
                  <span className="block">Outside, competition for <HandUnderline delay={1.5} variant={2}>attention</HandUnderline> is relentless.</span>
                </p>
                <p className="space-y-3">
                  <span className="block">More of the right work needs to get through.</span>
                  <span className="block">And more of the <HandUnderline delay={1.65} variant={4}>budget</HandUnderline> needs to go into the work itself.</span>
                </p>
              </div>
            </FadeUp>

          </div>
        </section>

        {/* ── CORE TRUTH ────────────────────────────── */}
        <section className="bg-white text-dab-charcoal py-32 md:py-48">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dab-hands-crown-mark.svg"
                alt=""
                aria-hidden
                draggable={false}
                className="mx-auto mb-8 md:mb-10 w-[120px] sm:w-[144px] md:w-[176px] lg:w-[200px] h-auto"
              />
              <h2 className="text-[44px] md:text-[72px] lg:text-[96px] xl:text-[108px] font-medium leading-[1.02] tracking-[-0.03em]">
                <span className="block">Great work rarely fails</span>
                <span className="block">at the idea stage.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-14 text-2xl md:text-3xl font-medium leading-snug tracking-[-0.018em] text-dab-charcoal max-w-[44ch] mx-auto">
                It fails as it moves through the organisation.<br />
                What started strong arrives weaker than it should have been.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── ANTIDOTE ──────────────────────────────── */}
        <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 border-t border-dab-charcoal/8 relative overflow-hidden">
          <Ribbon
            className="hidden md:block absolute inset-x-0 top-[28%] w-full"
            opacity={0.2}
            drift={24}
          />

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/55 mb-6 md:mb-8">
                Where we help
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="text-[40px] md:text-[60px] lg:text-[76px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[16ch]">
                DAB Hands meets these problems head-on
              </h2>
            </FadeUp>

            <FadeUp delay={0.22}>
              <ul className="mt-14 md:mt-20 max-w-[44ch] list-none p-0 m-0">
                {antidotePoints.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15 last:border-b last:border-dab-charcoal/15 text-dab-charcoal"
                  >
                    <svg aria-hidden className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-xl font-medium leading-tight text-dab-charcoal">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.48}>
              <div className="mt-20 md:mt-28 flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 lg:gap-16">
                <p className="text-[32px] md:text-[48px] lg:text-[60px] font-medium leading-[1.05] tracking-[-0.028em] text-dab-charcoal max-w-[20ch]">
                  We help organisations get stronger digital work out into the world.
                </p>
                <div className="flex-shrink-0 md:pt-2">
                  <BoxCTA href="/where-we-step-in" label="Where we step in" />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
