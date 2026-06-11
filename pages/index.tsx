import { motion, useReducedMotion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { BoxCTA } from '@/components/BoxCTA';
import { LogoTicker } from '@/components/LogoTicker';
import { Ribbon } from '@/components/Ribbon';
import { HandUnderline } from '@/components/HandUnderline';
import { SeoMeta } from '@/components/SeoMeta';

const doorways = [
  {
    label: 'Get it moving',
    blurb: 'Important initiatives that are slowing down and need help getting over the line.',
    href: '/where-we-step-in#get-it-moving',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 20 H30" />
        <path d="M23 13 L30 20 L23 27" />
        <path d="M5 14 H9" />
        <path d="M5 20 H8" />
        <path d="M5 26 H9" />
      </svg>
    ),
  },
  {
    label: 'Bring it together',
    blurb: 'Complex work involving multiple teams, partners, and moving parts.',
    href: '/where-we-step-in#bring-it-together',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="9" r="2.4" />
        <circle cx="32" cy="9" r="2.4" />
        <circle cx="20" cy="33" r="2.4" />
        <circle cx="20" cy="20" r="2.4" />
        <path d="M9.7 10.7 L18.3 18.4" />
        <path d="M30.3 10.7 L21.7 18.4" />
        <path d="M20 22.4 L20 30.6" />
      </svg>
    ),
  },
  {
    label: 'Strengthen it',
    blurb: 'When an important challenge needs additional leadership, capability, or support.',
    href: '/where-we-step-in#strengthen-it',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 5 L31 9 V19 C31 26 20 31 20 31 C20 31 9 26 9 19 V9 Z" />
        <path d="M15 19 L18.5 22.5 L26 14.5" />
      </svg>
    ),
  },
  {
    label: 'Get more from it',
    blurb: 'Good people, good partners, and good ideas that could be working together more effectively.',
    href: '/where-we-step-in#get-more-from-it',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 26 L16 16 L22 22 L34 10" />
        <path d="M27 10 H34 V17" />
      </svg>
    ),
  },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const headlineWords = ['Keeping', 'important', 'work', 'moving'];
  // After the headline words land + a short beat, the last word ("moving")
  // leans into an italic oblique — the word literally moves.
  const [landed, setLanded] = useState(false);
  const [leanIn, setLeanIn] = useState(false);
  useEffect(() => {
    if (!landed) return;
    if (reduceMotion) {
      setLeanIn(true);
      return;
    }
    const t = setTimeout(() => setLeanIn(true), 450);
    return () => clearTimeout(t);
  }, [landed, reduceMotion]);
  return (
    <>
      <SeoMeta
        title="DAB Hands | Senior digital delivery for high-stakes work"
        description="DAB Hands is a senior-led delivery model for critical digital initiatives. Keeping important work aligned, moving, and commercially effective."
        path="/"
      />

      <Layout footerVariant="minimal">
        {/* ── HERO ──────────────────────────────────── */}
        <section className="relative bg-dab-cream text-dab-charcoal overflow-hidden min-h-[78vh] md:min-h-[100vh] flex flex-col">
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
                onAnimationComplete={() => setLanded(true)}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: reduceMotion ? 0 : 0.14, delayChildren: 0.08 },
                  },
                }}
              >
                {headlineWords.map((word, i) => {
                  const isLast = i === headlineWords.length - 1;
                  return (
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
                        {isLast ? (
                          <motion.span
                            className="inline-block"
                            style={{ transformOrigin: 'bottom center' }}
                            animate={{ skewX: leanIn ? -10 : 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {word}
                          </motion.span>
                        ) : (
                          word
                        )}
                      </motion.span>
                    </Fragment>
                  );
                })}
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
        <section className="bg-dab-charcoal text-dab-cream py-16 md:py-40 relative min-h-[90vh] flex flex-col justify-center">
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
        <section className="bg-white text-dab-charcoal py-20 md:py-48">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dab-hands-crown-mark.svg?v=2"
                alt=""
                aria-hidden
                draggable={false}
                loading="lazy"
                decoding="async"
                className="mx-auto mb-8 md:mb-10 w-[60px] sm:w-[72px] md:w-[88px] lg:w-[100px] h-auto"
              />
              <h2 className="text-[44px] md:text-[72px] lg:text-[96px] xl:text-[108px] font-medium leading-[1.02] tracking-[-0.03em]">
                <span className="block">Great work rarely struggles</span>
                <span className="block">because of a lack of ambition.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-8 md:mt-10 text-xl md:text-2xl font-normal leading-relaxed tracking-[-0.01em] text-dab-charcoal max-w-[42ch] mx-auto">
                More often, the challenge is helping it stay strong as it moves through the organisation.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── DOORWAYS — HOW DAB HANDS HELPS ────────── */}
        <section className="bg-white text-dab-charcoal py-16 md:py-40">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[40px] md:text-[60px] lg:text-[76px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[16ch] mb-14 md:mb-20">
                How DAB Hands helps
              </h2>
            </FadeUp>
            <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-10 md:gap-y-14">
              {doorways.map((d, i) => (
                <motion.a
                  key={d.label}
                  href={d.href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group block border-t border-dab-charcoal/15 pt-8 md:pt-10"
                >
                  <div className="flex items-center gap-5 md:gap-6">
                    <span
                      className="text-dab-charcoal flex-shrink-0 [&_svg]:w-9 [&_svg]:h-9 md:[&_svg]:w-10 md:[&_svg]:h-10"
                      aria-hidden
                    >
                      {d.icon}
                    </span>
                    <h3 className="flex-1 text-2xl md:text-3xl font-medium tracking-[-0.022em] text-dab-charcoal">
                      {d.label}
                    </h3>
                    <span
                      aria-hidden
                      className="text-dab-charcoal text-2xl leading-none transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </div>
                  <p className="mt-4 md:mt-5 text-lg md:text-xl leading-relaxed text-dab-charcoal/70 max-w-[46ch]">
                    {d.blurb}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING STATEMENT ─────────────────────── */}
        <section className="bg-dab-cream text-dab-charcoal py-16 md:py-32 relative overflow-hidden">
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dab-hands-crown-mark.svg?v=2"
                alt=""
                aria-hidden
                draggable={false}
                loading="lazy"
                decoding="async"
                className="mx-auto mb-8 md:mb-10 w-[60px] sm:w-[72px] md:w-[88px] lg:w-[100px] h-auto"
              />
            </FadeUp>
            <FadeUp>
              <h2 className="text-[28px] md:text-[40px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[24ch] mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                20+ years helping global brands keep important digital work moving.
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mt-12 md:mt-16">
                <LogoTicker ariaLabel="Brands I've worked with" compact />
              </div>
            </FadeUp>
            <FadeUp delay={0.24}>
              <div className="mt-12 md:mt-16 flex justify-center">
                <BoxCTA href="/where-we-step-in" label="When To Bring Us In" />
              </div>
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
