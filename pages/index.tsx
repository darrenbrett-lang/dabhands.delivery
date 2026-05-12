import Head from 'next/head';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { BoxCTA } from '@/components/BoxCTA';
import { Ribbon } from '@/components/Ribbon';

const antidotePoints = [
  'Stronger alignment around important work.',
  'Faster movement through complexity.',
  'Higher-quality execution.',
  'More impact from existing investment.',
  'Senior capability without traditional agency weight.',
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Dab Hands — Senior digital delivery for high-stakes work</title>
        <meta
          name="description"
          content="Dab Hands is a senior-led delivery model for critical digital initiatives. Keeping important work aligned, moving, and commercially effective."
        />
      </Head>

      <Layout footerVariant="minimal">
        {/* ── HERO ──────────────────────────────────── */}
        <section className="relative bg-dab-cream text-dab-charcoal overflow-hidden min-h-[100vh] flex flex-col">
          <Ribbon
            className="absolute inset-x-0 bottom-0 w-full"
            opacity={0.4}
            drift={28}
          />

          <div className="relative z-10 flex-1 flex items-center justify-center pt-28 pb-12 md:pt-32 md:pb-20">
            <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
              <FadeUp>
                <h1 className="text-[56px] sm:text-[68px] md:text-[80px] lg:text-[104px] xl:text-[120px] font-semibold leading-[0.96] tracking-[-0.03em]">
                  <span className="block">Senior digital</span>
                  <span className="block">delivery for</span>
                  <span className="block">high-stakes work</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.16}>
                <div className="mt-12 md:mt-16 space-y-3 text-xl text-dab-charcoal leading-relaxed max-w-[44ch] md:max-w-none mx-auto">
                  <p>Important digital work can lose momentum quickly inside complex organisations.</p>
                  <p>We help organisations get stronger digital work out into the world.</p>
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
                <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] xl:text-[88px] font-semibold leading-[1.04] tracking-[-0.028em] md:whitespace-nowrap!">
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
                <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] xl:text-[88px] font-semibold leading-[1.04] tracking-[-0.028em]">
                  Complexity is higher than ever.
                </h2>
                <span className="block w-10 h-px bg-dab-green mt-5 md:mt-7" />
              </motion.div>
            </motion.div>

            <FadeUp delay={0.32}>
              <div className="mt-24 md:mt-32 space-y-6 max-w-[60ch] text-xl text-dab-cream leading-relaxed">
                <p>
                  Inside organisations, friction slows the work.<br />
                  The systems around the work are struggling.<br />
                  Outside, competition for attention is relentless.
                </p>
                <p>
                  More of the right work needs to get through.<br />
                  And more of the budget needs to go into the work itself.
                </p>
              </div>
            </FadeUp>

          </div>
        </section>

        {/* ── CORE TRUTH ────────────────────────────── */}
        <section className="bg-white text-dab-charcoal py-32 md:py-48">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <h2 className="text-[44px] md:text-[72px] lg:text-[96px] xl:text-[108px] font-semibold leading-[1.02] tracking-[-0.03em]">
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
          <div className="hidden md:block absolute top-[18%] right-[-4%] left-[52%] lg:left-[50%] overflow-hidden pointer-events-none">
            <Ribbon
              className="block w-[175%] lg:w-[150%] -ml-[75%] lg:-ml-[50%]"
              opacity={0.2}
              drift={24}
            />
          </div>

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[40px] md:text-[60px] lg:text-[76px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[16ch]">
                Dab Hands meets these problems head-on
              </h2>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div className="mt-14 md:mt-20 max-w-[44ch]">
                {antidotePoints.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15 last:border-b last:border-dab-charcoal/15 text-dab-charcoal"
                  >
                    <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-xl font-medium leading-tight text-dab-charcoal">{item}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.36}>
              <p className="mt-14 md:mt-20 text-xl text-dab-charcoal leading-relaxed max-w-[44ch]">
                Keeping important work aligned, moving, and commercially effective as it goes to market with impact.
              </p>
            </FadeUp>

            <FadeUp delay={0.48}>
              <p className="mt-12 md:mt-16 text-[32px] md:text-[48px] lg:text-[60px] font-bold leading-[1.05] tracking-[-0.028em] text-dab-charcoal max-w-[20ch]">
                We help organisations get stronger digital work out into the world.
              </p>
            </FadeUp>

            <FadeUp delay={0.60}>
              <div className="mt-14 md:mt-20 flex justify-end">
                <BoxCTA href="/where-we-step-in" label="Where we step in" />
              </div>
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
