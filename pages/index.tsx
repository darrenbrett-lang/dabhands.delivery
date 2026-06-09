import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { BoxCTA } from '@/components/BoxCTA';
import { Ribbon } from '@/components/Ribbon';
import { HandUnderline } from '@/components/HandUnderline';
import { SeoMeta } from '@/components/SeoMeta';

const antidotePoints = [
  'Experienced leadership around important work',
  'Clearer decisions in complex environments',
  'Fast to understand, align and get moving',
  'Smooth working across teams, agencies and partners',
  'Senior capability without agency overhead',
  'Unlocking more value from what’s already in place',
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const headlineWords = ['Keeping', 'important', 'work', 'moving'];
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
              <motion.h1
                className="text-[56px] sm:text-[68px] md:text-[80px] lg:text-[104px] xl:text-[120px] font-medium leading-[0.96] tracking-[-0.03em] max-w-[16ch] mx-auto"
                aria-label="Keeping important work moving"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: reduceMotion ? 0 : 0.14, delayChildren: 0.08 },
                  },
                }}
              >
                {headlineWords.map((word, i) => (
                  <Fragment key={word}>
                    {i > 0 && ' '}
                    <motion.span
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: reduceMotion ? 0 : '0.5em' },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  </Fragment>
                ))}
              </motion.h1>

              <FadeUp delay={0.16}>
                <div className="mt-12 md:mt-16 space-y-3 text-xl text-dab-charcoal leading-relaxed max-w-[44ch] md:max-w-none mx-auto">
                  <p>Important digital work can quickly lose momentum within complex organisations.</p>
                  <p>We help modern brands get stronger<br className="sm:hidden" /> digital work out into the world.</p>
                </div>
              </FadeUp>
            </div>
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
                <span className="block">Great work rarely struggles</span>
                <span className="block">because of a lack of ambition.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-14 text-2xl md:text-3xl font-medium leading-snug tracking-[-0.018em] text-dab-charcoal max-w-[44ch] mx-auto">
                More often, the challenge is helping it stay strong<br />
                as it moves through the organisation.
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
