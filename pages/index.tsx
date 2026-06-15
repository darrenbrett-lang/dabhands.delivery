import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { HandUnderline } from '@/components/HandUnderline';
import { LogoTicker } from '@/components/LogoTicker';
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
    bg: 'bg-moss/[0.12]',
    border: 'border-moss/35',
    hover: 'hover:border-moss/60',
    accentText: 'text-moss',
  },
  {
    label: 'Marketing leaders',
    diagnosis: 'The idea isn’t the problem. Getting it to market intact is.',
    support:
      'You need campaigns, launches, experiences, and agencies moving together without losing momentum, quality, or impact along the way.',
    href: '/marketing-leaders',
    bg: 'bg-peach/[0.16]',
    border: 'border-peach/35',
    hover: 'hover:border-peach/60',
    accentText: 'text-peach-deep',
  },
  {
    label: 'Creators & founders',
    diagnosis: 'Growth creates complexity. Complexity creates drag.',
    support:
      'You need operational strength around the business without losing the energy, creativity, and ambition that made it successful in the first place.',
    href: '/creators-and-founders',
    bg: 'bg-sage/[0.18]',
    border: 'border-sage/40',
    hover: 'hover:border-sage/60',
    accentText: 'text-sage-deep',
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
        {/* Full-bleed cloud field. Copy on the left; Darren's cut-out portrait
            is anchored bottom-right on desktop and stacked beneath the copy on
            mobile/tablet — grounded on the banner's bottom edge either way. */}
        <section className="relative isolate overflow-hidden text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/clouds.png"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 pt-12 md:pt-16 lg:pb-16">
            <div className="max-w-[30rem] lg:max-w-[34rem]">
              <FadeUp>
                <p className="text-lg md:text-xl text-ink/70 mb-5">Hi, I’m Darren.</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <p className="font-serif text-[30px] md:text-[40px] lg:text-[48px] leading-[1.12] text-ink">
                  For more than twenty years, I’ve helped leaders turn strategy into action inside some of the world’s largest organisations.
                </p>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-7 md:mt-8 text-lg text-ink/70 leading-relaxed max-w-[40ch]">
                  I tend to work in the space between ambition and execution, because that’s where organisations either gain or lose momentum.
                </p>
              </FadeUp>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/darren_new-image.png"
            alt="Darren Brett"
            className="pointer-events-none select-none relative z-[5] mx-auto mt-6 block w-[min(88%,400px)] lg:absolute lg:bottom-0 lg:mx-0 lg:mt-0 lg:w-auto lg:right-[-3%] lg:h-[80%] xl:right-[2%] xl:h-[94%]"
          />
        </section>

        {/* ── POINT OF VIEW ────────────────────────── */}
        <section className="bg-bone text-ink py-16 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid md:grid-cols-2 gap-y-9 md:gap-x-14 lg:gap-x-20 md:items-start">
              {/* Left: the thesis + the fold mark beneath it */}
              <div>
                <FadeUp delay={0.06}>
                  <h2 className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.05] max-w-[15ch]">
                    The tools are changing. The problems aren’t.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.14}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/fold.png"
                    alt=""
                    aria-hidden
                    className="pointer-events-none select-none mt-8 md:mt-10 w-full max-w-[460px] xl:w-[600px] xl:max-w-none xl:-ml-10"
                  />
                </FadeUp>
              </div>

              {/* Right: the argument that unfolds, to the “as intended” close */}
              <div>
                <FadeUp delay={0.12}>
                  <p className="text-lg md:text-xl text-graphite max-w-[44ch]">Most organisations already have what they need.</p>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mt-5 text-lg md:text-xl text-ink leading-relaxed max-w-[40ch]">
                    Strategy. Creative ambition. Investment. Capability. Good people.
                  </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-9 md:mt-10 text-lg md:text-xl text-ink/85 leading-relaxed max-w-[42ch]">
                    {DRUMBEAT.join(' ')}
                  </p>
                </FadeUp>
                <FadeUp delay={0.26}>
                  <p className="mt-9 md:mt-12 font-serif text-[28px] md:text-[40px] lg:text-[44px] leading-[1.1] text-ink max-w-[20ch]">
                    It deserves to arrive{' '}
                    <HandUnderline delay={0.6} variant={3} stroke="var(--color-moss)">
                      as intended
                    </HandUnderline>
                    .
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROOF ────────────────────────────────── */}
        <section className="bg-paper text-ink py-16 md:py-28 border-y border-stone/60">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="eyebrow text-graphite mb-10 md:mb-12 text-center">Trusted with important work by</p>
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
              <h2 className="text-[34px] sm:text-[44px] md:text-[60px] leading-[1.04] mb-10 max-w-[20ch]">Where do you need help keeping important work moving?</h2>
            </FadeUp>
            {/* The path reappears: a single line entering and dividing into the
                three doors below (moss / peach / sage), matching each card's
                accent. Desktop only — on mobile the cards stack with their dots. */}
            <div aria-hidden className="hidden md:block mb-6 -mt-2">
              <svg viewBox="0 0 1200 110" preserveAspectRatio="none" fill="none" className="h-16 lg:h-20 w-full">
                {[
                  { d: 'M -40 28 C 180 40, 250 80, 200 110', c: 'var(--color-moss)' },
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
                    className={`flex h-full flex-col rounded-2xl border ${t.border} ${t.bg} p-7 md:p-8 transition-colors duration-300 ${t.hover}`}
                  >
                    <h3 className="text-xl md:text-2xl text-ink mb-3">{t.label}</h3>
                    <p className="text-ink/90 leading-snug mb-2.5">{t.diagnosis}</p>
                    <p className="text-graphite leading-relaxed text-[15px]">{t.support}</p>
                    <span className={`mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold ${t.accentText}`}>
                      That’s me
                      <span aria-hidden className="text-[15px] leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA (the decision) ─────────────── */}
        <section className="bg-plum text-bone py-14 md:py-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-14">
              <FadeUp>
                <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] text-bone max-w-[30ch]">
                  If something important needs to move properly, let’s talk.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <a
                  href={mailto({ subject: 'Starting a conversation' })}
                  className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-bone px-7 py-3.5 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-moss hover:text-bone"
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
