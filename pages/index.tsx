import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';
import { PathwayPicker } from '@/components/PathwayPicker';
import { SlatPortrait } from '@/components/SlatPortrait';
import { mailto } from '@/lib/mailto';
import { withSoftBreaks, withBreaks } from '@/lib/softBreaks';

// "Where does momentum keep slipping?" — three full-width editorial rows, each a
// doorway. Image left; the symptom right (index, headline, the short diagnosis)
// with an Explore link. Photography lives in /images/momentum (owner-supplied).
const MOMENTUM = [
  {
    num: '01',
    headline: 'Keeping everything moving\nbecomes harder.',
    support: ['The strategy exists.\nThe investment exists.\nThe people exist.', 'Momentum doesn’t.'],
    href: '/business-and-agency-leaders',
    src: '/images/momentum/01-rowers-2.webp',
  },
  {
    num: '02',
    headline: 'Great work loses power\non the journey.',
    support: ['It starts strong.\nThen complexity gets involved.'],
    href: '/marketing-leaders',
    src: '/images/momentum/02-fineart.webp',
  },
  {
    num: '03',
    headline: 'Growth creates complexity\nfaster than capability.',
    support: ['The business is winning.\nThe foundations are struggling to keep up.'],
    href: '/growth-stage-businesses',
    src: '/images/momentum/03-escalator.webp',
  },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const headlineWords = ['Keeping', 'important', 'work', 'moving.'];

  return (
    <>
      <SeoMeta
        title="DAB Hands | Keeping important work moving"
        description="DAB Hands helps organisations turn ambition into impact. Senior operational leadership for important work moving through complex organisations, led by Darren Brett."
        path="/"
      />

      <Layout footerVariant="none">
        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative bg-bone text-ink pt-40 md:pt-52 pb-24 md:pb-32">
          <div className="relative z-10 u-container text-center">
            <motion.img
              src="/images/crown-mark.webp"
              alt=""
              aria-hidden
              className="mx-auto mb-6 md:mb-8 h-12 md:h-14 lg:h-16 w-auto select-none"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
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
              <p className="mt-9 md:mt-11 text-lg md:text-2xl text-graphite leading-relaxed max-w-[46ch] mx-auto">
                {withSoftBreaks('Helping organisations\nturn ambition into impact.')}
              </p>
            </FadeUp>
            <FadeUp delay={0.55}>
              <PathwayPicker />
            </FadeUp>
          </div>
        </section>

        {/* ── DARREN ───────────────────────────────── */}
        {/* Warm-stone field. Copy left; the doorway portrait right, its left edge
            broken into accelerating vertical slats (the brand's momentum cue,
            frozen in the image). Stacks on mobile. */}
        <section
          data-spine="Darren"
          className="bg-bone text-ink py-20 md:py-28 lg:py-32"
          style={{ backgroundImage: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-clay) 42%, transparent), color-mix(in srgb, var(--color-clay) 20%, transparent) 55%, transparent 100%)' }}
        >
          <div className="u-container">
            <div className="u-grid items-start gap-y-12 md:gap-y-16">
              <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:pt-4">
                <FadeUp>
                  <p className="text-lg md:text-xl text-ink/70 mb-5">Hi, I’m Darren.</p>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <p className="font-serif text-[30px] md:text-[40px] lg:text-[48px] leading-[1.12] text-ink">
                    For most of my career, I’ve helped organisations turn ambition into impact.
                  </p>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mt-7 md:mt-8 text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    I tend to work in the space between ambition and execution, because that’s where momentum is either created or lost.
                  </p>
                </FadeUp>
                <FadeUp delay={0.22}>
                  <p className="mt-5 text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    Over that time, I’ve built a business, led change and helped great organisations execute at scale.
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.1} className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
                <SlatPortrait />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── POINT OF VIEW (two columns — a commanding thesis, an argument
            that builds; typography carries it, no image) ───────────────── */}
        <section data-spine="Point of view" data-spine-tone="dark" className="bg-charcoal text-bone py-20 md:py-28 lg:py-32">
          <div className="u-container">
            <div className="u-grid gap-y-12 lg:items-start">
              {/* Left: the thesis — large, commanding, fills the column */}
              <FadeUp className="col-span-4 md:col-span-6">
                <h2 className="font-serif text-[46px] sm:text-[62px] md:text-[72px] lg:text-[76px] xl:text-[88px] leading-[0.98] tracking-[-0.02em]">
                  The tools are changing.<br />The problems aren’t.
                </h2>
              </FadeUp>

              {/* Right: the argument that builds to the close */}
              <div className="col-span-4 md:col-span-5 md:col-start-8">
                <FadeUp delay={0.1}>
                  <p className="text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    Most organisations already have what they need.
                  </p>
                </FadeUp>
                <FadeUp delay={0.15}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    Strategy. Creative ambition. Investment. Good people. Capable partners.
                  </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    The challenge isn’t creating more. It’s realising more impact from what already exists.
                  </p>
                </FadeUp>
                <FadeUp delay={0.26}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    Somewhere between ambition and execution, that impact gets diluted. Momentum slips. Complexity takes hold.
                  </p>
                </FadeUp>
                <FadeUp delay={0.32}>
                  <p className="mt-9 md:mt-10 font-serif text-[27px] md:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.01em] text-bone max-w-[24ch]">
                    Because that’s where ambition becomes impact.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROOF ────────────────────────────────── */}
        <section data-spine="Trusted by" className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-y border-stone/60">
          <div className="u-container">
            <FadeUp>
              <p className="eyebrow text-graphite mb-10 md:mb-12 text-center">Trusted where the stakes are high</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <LogoTicker ariaLabel="Brands I’ve worked with" />
            </FadeUp>
          </div>
        </section>

        {/* ── MOMENTUM (Who I help): three doorways as one big editorial sequence ── */}
        <section data-spine="Who I help" className="bg-bone text-ink border-t border-stone/60">
          {/* Header band — a warm clay wash, matching the rows' rollover state below. */}
          <div className="bg-clay/20 text-ink py-16 md:py-20 lg:py-24">
            <div className="u-container">
              <div className="u-grid items-end gap-y-6">
                <FadeUp className="col-span-4 md:col-span-7">
                  <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0] tracking-[-0.01em]">
                    {withSoftBreaks('Where does impact\nget lost?')}
                  </h2>
                </FadeUp>
                <FadeUp delay={0.08} className="col-span-4 md:col-span-5 lg:col-span-4 lg:col-start-9">
                  <p className="text-lg md:text-xl text-ink/70 leading-relaxed">
                    Most organisations don’t need more ideas. They need fewer things getting in the way.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>

          <div className="pb-14 md:pb-20 lg:pb-24">
            {MOMENTUM.map((row, i) => (
              <FadeUp key={row.num} delay={i * 0.06}>
                <Link href={row.href} className="group block border-b border-stone/60 transition-colors duration-300 hover:bg-clay/20">
                  <div className="u-container py-10 md:py-12 lg:py-16">
                    <span className="mb-5 block text-[13px] font-medium tracking-[0.12em] text-blue-green">{row.num}</span>
                    <div className="u-grid items-start gap-y-5">
                      <h3 className="col-span-4 font-serif text-[30px] leading-[1.04] tracking-[-0.01em] md:col-span-6 md:text-[40px] lg:text-[48px]">
                        {withSoftBreaks(row.headline)}
                      </h3>
                      <div className="col-span-4 flex flex-col gap-5 md:col-span-5 md:col-start-8">
                        <div className="space-y-3 text-[15px] leading-relaxed text-ink/70 md:text-base">
                          {row.support.map((p, j) => (
                            <p key={j}>{withBreaks(p)}</p>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-2 self-start border-b-2 border-gold pb-1.5 text-[15px] font-medium text-ink">
                          Explore
                          {/* Arrow loop: as the row fills, the arrow glides off to the right while a
                              second arrow slides in from the left to take its place — a continuous,
                              premium sense of forward motion. Clipped by the box; honours reduced-motion. */}
                          <span aria-hidden className="relative inline-block h-[1.1em] w-[1.25em] overflow-hidden leading-none">
                            <span className="absolute inset-0 flex items-center justify-center leading-none transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[220%] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">→</span>
                            <span className="absolute inset-0 flex items-center justify-center leading-none -translate-x-[220%] transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 motion-reduce:hidden">→</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA (the decision) ─────────────── */}
        <section data-spine="Let’s talk" className="bg-bone text-ink py-14 md:py-20 border-t border-stone/60">
          <div className="u-container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-14">
              <FadeUp>
                <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] text-ink max-w-[30ch]">
                  If something important needs to move properly, let’s talk.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <a
                  href={mailto({ subject: 'Getting important work moving', body: 'I have important work that needs to move properly. I would like to talk.' })}
                  className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-blue-green"
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
