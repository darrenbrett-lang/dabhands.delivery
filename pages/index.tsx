import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';
import { PathwayPicker } from '@/components/PathwayPicker';
import { SlatPortrait } from '@/components/SlatPortrait';
import { mailto } from '@/lib/mailto';
import { withSoftBreaks } from '@/lib/softBreaks';

// "Where I help" — three editorial doorway rows on the grid: a third-width image
// (cols 1–4) with the audience label over it, the conceptual line as the headline,
// and the Explore CTA inline with the helping line beneath (cols 5–12).
// Movement / Attention / Support.
const MOMENTUM = [
  {
    num: '01',
    label: 'Business & Agency Leaders',
    headline: 'Keeping everything moving.',
    support: 'Helping organisations turn ambition into impact when complexity starts slowing everything down.',
    href: '/business-and-agency-leaders',
    src: '/images/momentum/01-tracks-2.jpg',
  },
  {
    num: '02',
    label: 'Marketing Leaders',
    headline: 'Keeping the signal strong.',
    support: 'Helping ambitious work reach the market with the clarity, confidence and impact it deserves.',
    href: '/marketing-leaders',
    src: '/images/momentum/02-branding-2.jpg',
  },
  {
    num: '03',
    label: 'Growth-Stage Businesses',
    headline: 'Supporting greater ambition.',
    support: 'Helping growing businesses build the capability their next stage depends on.',
    href: '/growth-stage-businesses',
    src: '/images/momentum/03-growth.jpg',
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
                    Strategy. Creative ambition. Investment. Good people. Increasingly, AI and specialist capability too.
                  </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    The challenge isn’t creating more.
                  </p>
                </FadeUp>
                <FadeUp delay={0.25}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    It’s realising more impact from what already exists.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    Somewhere between ambition and execution, momentum slips. Complexity takes hold. Value gets diluted.
                  </p>
                </FadeUp>
                <FadeUp delay={0.35}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    There is a name for that gap. Coordination debt: the work of holding everything together that quietly becomes nobody’s job.
                  </p>
                </FadeUp>
                <FadeUp delay={0.4}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    My role is to design the coordination and judgement back into how work flows, so what matters arrives as intended.
                  </p>
                </FadeUp>
                <FadeUp delay={0.46}>
                  <p className="mt-9 md:mt-10 font-serif text-[27px] md:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.01em] text-bone max-w-[24ch]">
                    That is where I work.
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

        {/* PROPOSITION: the commercial payoff, a short statement that bridges the proof
            wall into "Where I help". Copy only, reuses the existing serif treatment. */}
        <section className="bg-bone text-ink py-16 md:py-20 lg:py-24">
          <div className="u-container">
            <FadeUp>
              <p className="font-serif text-[26px] md:text-[32px] lg:text-[38px] leading-[1.16] tracking-[-0.01em] max-w-[42ch]">
                I help agency, brand and growth-stage leaders move important work through complexity, so execution turns into revenue, margin and growth.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── MOMENTUM (Who I help): three doorways as one big editorial sequence ── */}
        <section data-spine="Who I help" className="bg-bone text-ink border-t border-stone/60">
          {/* Header band — a warm clay wash, matching the rows' rollover state below. */}
          <div className="bg-clay/20 text-ink py-14 md:py-16 lg:py-20">
            <div className="u-container">
              <div className="u-grid items-end gap-y-5">
                {/* Title over the image column (cols 1–4 on lg); intro over the copy column
                    (cols 5–12) — the same two zones the rows below use. */}
                <FadeUp className="col-span-4 md:col-span-12 lg:col-span-4">
                  <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.01em]">
                    Where I help.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.08} className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-5">
                  <p className="text-lg md:text-xl text-ink/70 leading-relaxed max-w-[54ch]">
                    Different challenges.<br />The same pattern underneath.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>

          <div>
            {MOMENTUM.map((row, i) => (
              <FadeUp key={row.num} delay={i * 0.06}>
                <Link
                  href={row.href}
                  aria-label={`${row.label}: ${row.headline}`}
                  className="group block border-b border-stone/50"
                >
                  <div className="u-container py-8 md:py-10 lg:py-12">
                    <div className="u-grid items-center gap-y-6">
                      {/* The doorway: a clean third-width image ON THE GRID (cols 1–4 on lg);
                          on smaller screens a shallow full-width sliver that matches the
                          audience-page hero (5:2, rounded, hairline ring). The audience label
                          sits over it; it opens on hover with a slow Ken Burns push-in. */}
                      <div className="relative col-span-4 md:col-span-12 lg:col-span-4 aspect-[5/2] lg:aspect-[3/2] overflow-hidden rounded-2xl lg:rounded-none ring-1 ring-inset ring-ink/10 lg:ring-0">
                        <Image
                          src={row.src}
                          alt=""
                          fill
                          quality={82}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition-transform duration-[1400ms] ease-out will-change-transform group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        {/* Scrim so the audience label stays readable over the image. */}
                        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent" />
                        <span className="absolute bottom-4 left-5 right-5 text-[14px] md:text-[15px] font-medium tracking-[-0.01em] text-bone">{row.label}</span>
                      </div>
                      {/* The message — conceptual line as the headline, Explore inline with the
                          helping line beneath. Cols 5–12 on lg, aligned with the header intro. */}
                      <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-5">
                        <h3 className="font-serif text-[24px] md:text-[30px] lg:text-[38px] leading-[1.06] tracking-[-0.01em]">{row.headline}</h3>
                        <div className="mt-3.5 flex items-end justify-between gap-6">
                          <p className="text-[15px] md:text-base leading-relaxed text-ink/70 max-w-[54ch]">{row.support}</p>
                          <span className="shrink-0 inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-[15px] font-medium text-ink">
                            Explore
                            {/* Arrow loop: glides off right while a second arrow slides in from the
                                left. Honours reduced-motion. */}
                            <span aria-hidden className="relative inline-block h-[1.1em] w-[1.25em] overflow-hidden leading-none">
                              <span className="absolute inset-0 flex items-center justify-center leading-none transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[220%] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">→</span>
                              <span className="absolute inset-0 flex items-center justify-center leading-none -translate-x-[220%] transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 motion-reduce:hidden">→</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA (the decision) ─────────────── */}
        <section data-spine="Let’s talk" className="bg-bone text-ink py-14 md:py-20">
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
