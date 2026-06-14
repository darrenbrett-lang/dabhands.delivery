import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { HandUnderline } from '@/components/HandUnderline';
import { LogoTicker } from '@/components/LogoTicker';
import { Figure } from '@/components/Figure';
import { Trajectory } from '@/components/Trajectory';
import { mailto } from '@/lib/mailto';

const DRUMBEAT = [
  'The challenge isn’t creating more.',
  'It’s helping what already exists move together.',
  'Because somewhere between idea and market, work gets diluted.',
  'Momentum slips.',
  'Complexity takes hold.',
];

// The single path becomes three rooms. Each carries its own movement accent.
const TURNSTILE = [
  {
    label: 'Business & agency leaders',
    diagnosis: 'The work matters. Complexity is getting in the way.',
    support:
      'You need experienced operational leadership that understands delivery, commercial realities, people, and how organisations actually work.',
    href: '/business-and-agency-leaders',
    dot: 'bg-lavender',
  },
  {
    label: 'Marketing leaders',
    diagnosis: 'The idea isn’t the problem. Getting it to market intact is.',
    support:
      'You need campaigns, launches, experiences, and agencies moving together without losing momentum, quality, or impact along the way.',
    href: '/marketing-leaders',
    dot: 'bg-peach',
  },
  {
    label: 'Creators & founders',
    diagnosis: 'Growth creates complexity. Complexity creates drag.',
    support:
      'You need operational strength around the business without losing the energy, creativity, and ambition that made it successful in the first place.',
    href: '/creators-and-founders',
    dot: 'bg-sage',
  },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const headlineWords = ['Keeping', 'important', 'work', 'moving.'];

  return (
    <>
      <SeoMeta
        title="DAB Hands | Keeping important work moving"
        description="I help digital-forward businesses get their best work into the world, intact. Senior operational leadership for important work moving through complex organisations."
        path="/"
      />

      <Layout footerVariant="none">
        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative overflow-hidden bg-bone text-ink pt-40 md:pt-52 pb-24 md:pb-32">
          {/* The trajectory enters the page and passes behind the headline:
              something is already in motion before the visitor arrives. */}
          <Trajectory className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.6} />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <motion.h1
              className="text-[44px] sm:text-[60px] md:text-[78px] lg:text-[96px] leading-[1.03] max-w-[15ch] mx-auto"
              aria-label="Keeping important work moving."
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.1 } } }}
            >
              {headlineWords.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && ' '}
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: reduceMotion ? 0 : '0.4em' },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {word}
                  </motion.span>
                </Fragment>
              ))}
            </motion.h1>

            <FadeUp delay={0.4}>
              <p className="mt-9 md:mt-11 text-lg md:text-2xl text-graphite leading-relaxed max-w-[40ch] mx-auto">
                I help digital-forward businesses get their best work into the world, intact.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── DARREN ───────────────────────────────── */}
        <section className="bg-paper text-ink py-16 md:py-28 border-t border-stone/60">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
              <Figure
                mobile="/images/darren_jesus.jpeg"
                alt="Darren Brett"
                className="w-full aspect-[3/2] rounded-2xl"
              />

              <div>
                <FadeUp>
                  <p className="text-lg md:text-xl text-graphite mb-5">Hi, I’m Darren.</p>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <p className="font-serif text-[28px] md:text-[40px] lg:text-[46px] leading-[1.1] text-ink max-w-[20ch]">
                    I’m the person who walks toward the part everyone else is avoiding, because I can already see what’s holding it up.
                  </p>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mt-7 md:mt-9 text-lg text-graphite leading-relaxed max-w-[46ch]">
                    For more than 20 years, I’ve helped important work move through complex organisations.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── POINT OF VIEW ────────────────────────── */}
        <section className="bg-bone text-ink py-16 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="eyebrow text-graphite mb-8 md:mb-10">Point of view</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <h2 className="text-[34px] sm:text-[46px] md:text-[60px] lg:text-[72px] leading-[1.04] max-w-[16ch]">
                The tools are changing. The problems aren’t.
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="mt-7 md:mt-9 text-lg md:text-xl text-graphite max-w-[48ch]">Most organisations already have what they need.</p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-7 text-lg md:text-xl text-ink leading-relaxed max-w-[40ch]">
                Strategy. Creative ambition. Investment. Capability. Good people.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="mt-12 md:mt-16 space-y-2.5 text-lg md:text-xl text-ink/85 max-w-[42ch]">
                {DRUMBEAT.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.26}>
              <p className="mt-12 md:mt-16 font-serif text-[30px] md:text-[48px] leading-[1.08] text-ink max-w-[18ch]">
                It deserves to arrive{' '}
                <HandUnderline delay={0.6} variant={3} stroke="var(--color-lavender)">
                  as intended
                </HandUnderline>
                .
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── PROOF ────────────────────────────────── */}
        <section className="bg-paper text-ink py-16 md:py-28 border-y border-stone/60">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="eyebrow text-graphite mb-10 md:mb-12 text-center">Trusted with important work</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <LogoTicker ariaLabel="Brands I’ve worked with" />
            </FadeUp>
            <FadeUp delay={0.12}>
              <figure className="mt-16 md:mt-24 max-w-[60ch] mx-auto text-center">
                <blockquote className="font-serif italic text-[24px] md:text-[34px] leading-[1.3] text-ink">
                  “He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.”
                </blockquote>
                <figcaption className="mt-6 text-[14px] text-graphite">Anthony Mahon, Global Membership Director, Hugo Boss</figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>

        {/* ── TURNSTILE ────────────────────────────── */}
        <section className="bg-bone text-ink py-16 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[34px] sm:text-[44px] md:text-[60px] leading-[1.04] mb-10 max-w-[16ch]">What’s getting in the way?</h2>
            </FadeUp>
            {/* The path reappears: a single line entering and dividing into the
                three doors below (lavender / peach / sage), matching each card's
                accent. Desktop only — on mobile the cards stack with their dots. */}
            <div aria-hidden className="hidden md:block mb-6 -mt-2">
              <svg viewBox="0 0 1200 110" preserveAspectRatio="none" fill="none" className="h-16 lg:h-20 w-full">
                {[
                  { d: 'M -40 28 C 180 40, 250 80, 200 110', c: 'var(--color-lavender)' },
                  { d: 'M -40 28 C 320 42, 560 82, 600 110', c: 'var(--color-peach)' },
                  { d: 'M -40 28 C 560 46, 940 82, 1000 110', c: 'var(--color-sage)' },
                ].map((b, i) => (
                  <motion.path
                    key={b.c}
                    d={b.d}
                    stroke={b.c}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    opacity={0.5}
                    initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 1.1, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </svg>
            </div>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
              {TURNSTILE.map((t, i) => (
                <Link key={t.label} href={t.href} className="group block">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col rounded-2xl border border-stone bg-paper p-7 md:p-8 transition-colors duration-300 hover:border-ink/30 hover:bg-white"
                  >
                    <span aria-hidden className={`mb-7 block h-2.5 w-2.5 rounded-full ${t.dot}`} />
                    <h3 className="text-xl md:text-2xl text-ink mb-3">{t.label}</h3>
                    <p className="text-ink/90 leading-snug mb-2.5">{t.diagnosis}</p>
                    <p className="text-graphite leading-relaxed text-[15px]">{t.support}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA (the decision) ─────────────── */}
        <section className="bg-plum text-white py-20 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <FadeUp>
                <h2 className="text-[34px] md:text-[52px] lg:text-[60px] leading-[1.04] text-white max-w-[16ch]">
                  If something important needs to move properly, let’s talk.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <a
                  href={mailto({ subject: 'Starting a conversation' })}
                  className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/40 px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                >
                  Start a conversation
                  <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
              </FadeUp>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
