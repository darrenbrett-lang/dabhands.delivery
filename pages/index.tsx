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

// "Where I help" — three editorial doorway rows on the grid: a third-width image
// (cols 1–4) with the audience label over it, the conceptual line as the headline,
// and the Explore CTA inline with the helping line beneath (cols 5–12).
// Movement / Attention / Support.
const MOMENTUM = [
  {
    num: '01',
    label: 'Business & Agency Leaders',
    headline: 'Keeping everything moving.',
    support: 'When good thinking gets lost between decision and delivery.',
    href: '/business-and-agency-leaders',
    src: '/images/momentum/01-tracks-2.jpg',
  },
  {
    num: '02',
    label: 'Marketing Leaders',
    headline: 'Keeping the signal strong.',
    support: 'When great work lands softer than it should.',
    href: '/marketing-leaders',
    src: '/images/momentum/02-branding-2.jpg',
  },
  {
    num: '03',
    label: 'Growth-Stage Businesses',
    headline: 'Supporting greater ambition.',
    support: 'When the ambition is clear but the structure hasn’t caught up.',
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
                Most organisations don’t lack good thinking.<br />They struggle to preserve it.
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
              <div className="col-span-4 md:col-span-6 lg:col-span-5">
                <FadeUp>
                  <p className="text-lg md:text-xl text-ink/70 mb-5">Hi, I’m Darren.</p>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <p className="font-serif text-[30px] md:text-[34px] lg:text-[44px] leading-[1.14] text-ink u-balance">
                    For most of my career, I’ve worked at the point where ambition has to become reality: inside agencies, global brands and businesses in motion.
                  </p>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mt-7 md:mt-8 text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    I’ve led major programmes, built operating structures from the ground up, and helped leaders close the gap between what they intend to deliver and what actually gets built.
                  </p>
                </FadeUp>
                <FadeUp delay={0.22}>
                  <p className="mt-5 text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    My work is about creating the conditions where capable people do their best work together.
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.1} className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
                <SlatPortrait />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── PROBLEM PANEL (dark): the live point-of-view layout — a commanding
            statement left, three paragraphs of prose and the sign-off right. ── */}
        <section data-spine="The problem" data-spine-tone="dark" className="bg-charcoal text-bone py-20 md:py-28 lg:py-32">
          <div className="u-container">
            <div className="u-grid gap-y-12 lg:items-start">
              {/* Left: the thesis — large, commanding, fills the column */}
              <FadeUp className="col-span-4 md:col-span-6">
                <h2 className="font-serif text-[46px] sm:text-[62px] md:text-[72px] lg:text-[76px] xl:text-[88px] leading-[0.98] tracking-[-0.02em]">
                  The tools are changing.<br />The problems aren’t.
                </h2>
              </FadeUp>

              {/* Right: the argument building to the sign-off */}
              <div className="col-span-4 md:col-span-5 md:col-start-8">
                <FadeUp delay={0.1}>
                  <p className="text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    AI is in every boardroom conversation. It’s in very few P&Ls.
                  </p>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    Between ambition and execution, momentum slips. Complexity takes hold. The work loses impact.
                  </p>
                </FadeUp>
                <FadeUp delay={0.22}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    The system creates noise. That’s what systems do.
                  </p>
                </FadeUp>
                <FadeUp delay={0.28}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    My role is reducing noise so the right things get through.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT I DO (light): a two-beat lead-in ("...arrives as intended." / "I do
            that by turning:") opening onto the three turns — each a from→to statement
            at anchor scale, pivoting on the gold italic "into". ── */}
        <section data-spine="What I do" className="bg-bone text-ink py-16 md:py-20 lg:py-24 border-t border-stone/60">
          <div className="u-container">
            <FadeUp>
              <h2 className="font-serif text-[30px] md:text-[38px] lg:text-[44px] leading-[1.14] tracking-[-0.01em] text-ink max-w-[860px]">
                I work alongside leaders of agencies, brands and growth-stage businesses, bringing the scar tissue and the instinct to keep important work moving.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="eyebrow text-graphite mt-8 md:mt-10">
                In practice, that means turning:
              </p>
            </FadeUp>
            <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-10">
              {[
                { key: 'strategy', from: 'Strategy', to: 'an operating reality', intoOnFirstLine: true, body: 'Strategy starts on a page. I know how to build the operation that delivers on it, keeping intent intact, cutting what dilutes it, and aligning daily effort with what matters.' },
                { key: 'complexity', from: 'System complexity', to: 'clarity', intoOnFirstLine: false, body: 'When coordination breaks down, it hits the P&L. Things ship late. Launches land softer than planned. Customer confidence erodes. Ideas don’t travel cleanly. People, process, technology, data: every layer is somewhere the signal softens. I know how to read that terrain and help you move through it.' },
                { key: 'impact', from: 'Important work', to: 'full impact', intoOnFirstLine: false, body: 'Programmes, campaigns and launches rarely fail because the idea was wrong. They lose conviction in translation. I help important work arrive with the full force it was built to carry.' },
              ].map((t, i) => (
                <FadeUp key={t.key} delay={i * 0.12}>
                  {/* Each turn is a from→to statement: what they have, then what it
                      becomes, pivoting on the gold italic "into". A hairline rule
                      opens each column; the three arrive in sequence. */}
                  <div className="border-t border-stone/60 pt-6 md:pt-7">
                    <h3 className="font-serif text-[32px] md:text-[24px] lg:text-[32px] xl:text-[40px] leading-[1.15] tracking-[-0.01em] text-ink">
                      {t.intoOnFirstLine ? (
                        <>
                          {t.from} <span className="italic text-gold">into</span>
                          <br />
                          {t.to}
                        </>
                      ) : (
                        <>
                          {t.from}
                          <br />
                          <span className="italic text-gold">into</span> {t.to}
                        </>
                      )}
                    </h3>
                    <p className="mt-4 md:mt-5 text-[15px] leading-[1.7] text-graphite max-w-[46ch]">
                      {t.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
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

        {/* ── HOW I WORK (slate-blue panel): a big statement left, the model's detail
            right — a second coloured beat after the problem panel. A light-gold
            eyebrow and a hairline rule above the close add interest. ── */}
        <section data-spine="How I work" data-spine-tone="dark" className="bg-blue-green text-bone py-20 md:py-28 lg:py-32">
          <div className="u-container">
            <div className="u-grid gap-y-10 lg:items-start">
              <FadeUp className="col-span-4 md:col-span-6">
                <p className="eyebrow mb-5" style={{ color: '#EBD4A8', letterSpacing: '0.14em' }}>How I work</p>
                <h2 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] u-balance">
                  The work determines the team.
                </h2>
              </FadeUp>

              <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
                <FadeUp delay={0.1}>
                  <p className="text-[16px] md:text-[17px] leading-[1.8] text-bone/85">
                    I stay close to the work because that’s where the judgement lives.
                  </p>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-bone/85">
                    When the work demands more, I bring in the right people. Trusted senior specialists I’ve worked with for years, chosen for the challenge rather than the roster.
                  </p>
                </FadeUp>
                <FadeUp delay={0.22}>
                  <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-bone/85">
                    You’ll always work with me. The team expands only when the work demands it.
                  </p>
                </FadeUp>
                <FadeUp delay={0.28}>
                  <p className="mt-8 pt-6 border-t border-bone/20 font-serif text-[22px] md:text-[26px] leading-[1.25] text-bone u-balance">
                    Never the other way around.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── MOMENTUM (Who I help): three doorways as one big editorial sequence.
            The warm clay wash runs the full module — header and cards as one block. ── */}
        <section data-spine="Who I help" className="bg-clay/20 text-ink border-t border-stone/60">
          <div className="py-14 md:py-16 lg:py-20">
            <div className="u-container">
              <div className="u-grid items-end gap-y-5">
                {/* Title over the image column (cols 1–4 on lg); intro over the copy column
                    (cols 5–12) — the same two zones the rows below use. */}
                <FadeUp className="col-span-4 md:col-span-12 lg:col-span-9">
                  <p className="eyebrow text-graphite mb-3">Where I help</p>
                  <h2 className="font-serif text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.01em] u-balance">
                    Different challenges.<br />The same pattern underneath.
                  </h2>
                </FadeUp>
              </div>
            </div>
          </div>

          <div className="u-container pt-12 md:pt-14 lg:pt-16 pb-16 md:pb-20 lg:pb-24">
            <div className="u-grid gap-y-12">
              {MOMENTUM.map((row, i) => (
                <FadeUp key={row.num} delay={i * 0.06} className="col-span-4">
                  <Link
                    href={row.href}
                    aria-label={`${row.label}: ${row.headline}`}
                    className="group flex h-full flex-col"
                  >
                    {/* The doorway image, now a card top; the audience label sits over it,
                        opening on hover with a slow Ken Burns push-in. */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-inset ring-ink/10">
                      <Image
                        src={row.src}
                        alt=""
                        fill
                        quality={82}
                        sizes="(max-width: 767px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out will-change-transform group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent" />
                      <span className="absolute bottom-3.5 left-4 right-4 text-[13px] md:text-[14px] font-medium tracking-[-0.01em] text-bone">{row.label}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-[24px] md:text-[26px] lg:text-[28px] leading-[1.08] tracking-[-0.01em] text-ink u-balance">{row.headline}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink/70">{row.support}</p>
                    <span className="mt-4 inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-[14px] font-medium text-ink">
                      Explore
                      {/* Arrow loop: glides off right while a second slides in from the left. */}
                      <span aria-hidden className="relative inline-block h-[1.1em] w-[1.25em] overflow-hidden leading-none">
                        <span className="absolute inset-0 flex items-center justify-center leading-none transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[220%] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">→</span>
                        <span className="absolute inset-0 flex items-center justify-center leading-none -translate-x-[220%] transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 motion-reduce:hidden">→</span>
                      </span>
                    </span>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA (the decision) ─────────────── */}
        <section data-spine="Let’s talk" className="bg-bone text-ink py-14 md:py-20">
          <div className="u-container">
            <FadeUp>
              <p className="font-serif text-[24px] md:text-[30px] lg:text-[34px] leading-[1.18] tracking-[-0.01em] text-ink max-w-[38ch] mb-8 md:mb-10">
                Organisations rarely need more ideas.<br />They need their best thinking to survive the journey from concept to customer.
              </p>
            </FadeUp>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-14">
              <FadeUp>
                <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] text-ink max-w-[30ch] u-balance">
                  When important work needs to land, let’s talk.
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
