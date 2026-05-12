import Head from 'next/head';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { LogoMark } from '@/components/LogoMark';
import { RibbonMotif } from '@/components/RibbonMotif';

const clients: Array<{ name: string; slug: string }> = [
  { name: 'Nike', slug: 'nike' },
  { name: 'Volkswagen', slug: 'volkswagen' },
  { name: 'Audi', slug: 'audi' },
  { name: 'Hugo Boss', slug: 'hugoboss' },
  { name: 'Tommy Hilfiger', slug: 'tommyhilfiger' },
  { name: 'Unilever', slug: 'unilever' },
  { name: 'Johnson & Johnson', slug: 'johnsonandjohnson' },
  { name: 'Royal Mail', slug: 'royalmail' },
  { name: 'Parcelforce', slug: 'parcelforce' },
  { name: 'Post Office', slug: 'postoffice' },
  { name: 'Fortnum & Mason', slug: 'fortnumandmason' },
  { name: 'Falabella', slug: 'falabella' },
  { name: 'Palantir', slug: 'palantir' },
];

const antidotePoints = [
  'Bringing the right people together.',
  'Strengthening decision-making.',
  'Reducing friction.',
  'Raising the quality of execution.',
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

      <Layout>
        {/* ── HERO ──────────────────────────────────── */}
        <section className="relative bg-dab-cream text-dab-charcoal overflow-hidden min-h-[100vh] flex flex-col">
          {/* Flowing ribbon — full-bleed at bottom; the brand visual anchor */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none">
            <RibbonMotif variant="hero" animated className="w-full block" />
          </div>

          <div className="relative z-10 flex-1 flex items-center justify-center pt-28 pb-12 md:pt-32 md:pb-20">
            <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
              <FadeUp>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/55 mb-10 md:mb-12">
                  Dab Hands
                </p>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h1 className="text-[44px] sm:text-[56px] md:text-[80px] lg:text-[104px] xl:text-[120px] font-semibold leading-[0.98] tracking-[-0.03em] max-w-[14ch] mx-auto">
                  <span className="block">Senior digital delivery</span>
                  <span className="block">for high-stakes work</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.20}>
                <div className="mt-12 md:mt-16 space-y-3 text-[15px] md:text-[17px] text-dab-charcoal/80 leading-relaxed max-w-[44ch] mx-auto">
                  <p>Important digital work loses momentum inside complex organisations.</p>
                  <p>Dab Hands helps keep critical initiatives aligned, moving, and commercially effective.</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── WHERE ARE WE? ─────────────────────────── */}
        <section className="bg-dab-charcoal text-dab-cream py-28 md:py-40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/55 mb-12 md:mb-16">
                Where are we?
              </p>
            </FadeUp>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } } }}
              className="max-w-[20ch] mx-auto"
            >
              {[
                { before: 'The tools are ', accent: 'changing', after: '.' },
                { before: 'The problems ', accent: 'aren’t', after: '.' },
                { before: 'Complexity is ', accent: 'higher than ever', after: '.' },
              ].map((line, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="text-[32px] md:text-[48px] lg:text-[60px] xl:text-[72px] font-semibold leading-[1.05] tracking-[-0.035em] text-dab-cream mb-5 md:mb-7 last:mb-0"
                >
                  {line.before}
                  <span className="text-dab-green">{line.accent}</span>
                  {line.after}
                </motion.p>
              ))}
            </motion.div>

            <FadeUp delay={0.20}>
              <div className="mt-20 md:mt-28 grid sm:grid-cols-2 gap-x-12 gap-y-6 max-w-[60ch] mx-auto text-left text-[15px] md:text-[17px] text-dab-cream/75 leading-relaxed">
                <p>Inside the business, friction slows the work.</p>
                <p>Outside, competition for attention is relentless.</p>
                <p>More of the right work needs to get through.</p>
                <p>And more of the budget needs to go into the work itself.</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── CORE TRUTH ────────────────────────────── */}
        <section className="bg-dab-cream text-dab-charcoal py-32 md:py-48">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <h2 className="text-[44px] md:text-[72px] lg:text-[96px] xl:text-[108px] font-semibold leading-[1.02] tracking-[-0.03em] max-w-[18ch] mx-auto">
                <span className="block">Great work rarely fails</span>
                <span className="block">at the idea stage.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-14 text-[28px] md:text-[40px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.028em] max-w-[20ch] mx-auto text-dab-charcoal/75">
                It fails as it moves through the organisation.
              </p>
            </FadeUp>

            <FadeUp delay={0.30}>
              <div className="mt-20 md:mt-28 space-y-2 text-[16px] md:text-[18px] text-dab-charcoal/60 leading-relaxed">
                <p>Teams fragment.</p>
                <p>Momentum slows.</p>
                <p>Execution weakens.</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── ANTIDOTE ──────────────────────────────── */}
        <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 border-t border-dab-charcoal/8">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">
                Antidote
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="text-[40px] md:text-[60px] lg:text-[76px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[14ch] mx-auto">
                How Dab Hands strengthens critical work
              </h2>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div className="mt-14 md:mt-20 max-w-[44ch] mx-auto text-left">
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
                    <p className="text-lg md:text-xl font-medium leading-tight">{item}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.36}>
              <p className="mt-14 md:mt-20 text-lg md:text-xl text-dab-charcoal/70 leading-relaxed max-w-[44ch] mx-auto">
                Keeping important work aligned, moving, and commercially effective as it goes to market.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── PROOF STRIP ───────────────────────────── */}
        <section className="bg-dab-charcoal text-dab-cream py-20 md:py-28 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/20" />
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/55 mb-12 md:mb-16 text-center">
                Delivered at scale for
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-16 lg:gap-x-20 gap-y-8 md:gap-y-10">
                {clients.map((c) => (
                  <LogoMark key={c.slug} name={c.name} slug={c.slug} />
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
