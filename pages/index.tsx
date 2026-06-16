import { motion, useReducedMotion } from 'framer-motion';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { HandUnderline } from '@/components/HandUnderline';
import { LogoTicker } from '@/components/LogoTicker';
import { PathwayPicker } from '@/components/PathwayPicker';
import { mailto } from '@/lib/mailto';

// The single path becomes three rooms. Each carries its section colour as a
// hover cue (block + arrow tint), matching the nav dropdown and the P1 overlay.
const TURNSTILE = [
  {
    label: 'Business & agency leaders',
    diagnosis: 'The organisation has everything it needs. It’s just become harder to move.',
    support: 'Helping leadership teams maintain momentum when complexity starts getting in the way.',
    href: '/business-and-agency-leaders',
    rest: 'color-mix(in srgb, var(--color-sage) 50%, var(--color-bone))',
    hover: 'color-mix(in srgb, var(--color-sage) 70%, var(--color-bone))',
    accent: 'var(--color-sage-deep)',
  },
  {
    label: 'Marketing leaders',
    diagnosis: 'Great work loses power on the journey.',
    support: 'Helping brands bring their strongest ideas into the world with the impact they deserve.',
    href: '/marketing-leaders',
    rest: 'color-mix(in srgb, var(--color-peach) 50%, var(--color-bone))',
    hover: 'color-mix(in srgb, var(--color-peach) 70%, var(--color-bone))',
    accent: 'var(--color-peach-deep)',
  },
  {
    label: 'Creators & founders',
    diagnosis: 'Everything depends on you. Until it can’t.',
    support: 'Helping creator and founder-led businesses build the capability required for their next stage of growth.',
    href: '/creators-and-founders',
    rest: 'color-mix(in srgb, var(--color-lavender) 50%, var(--color-bone))',
    hover: 'color-mix(in srgb, var(--color-lavender) 70%, var(--color-bone))',
    accent: 'var(--color-lavender-deep)',
  },
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const headlineWords = ['Keeping', 'important', 'work', 'moving.'];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <SeoMeta
        title="DAB Hands | Keeping important work moving"
        description="I help digital-forward businesses get their best work into the world, intact. Senior operational leadership for important work moving through complex organisations."
        path="/"
      />

      <Layout footerVariant="none">
        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative bg-bone text-ink pt-40 md:pt-52 pb-24 md:pb-32">
          <div className="relative z-10 u-container text-center">
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
            <FadeUp delay={0.55}>
              <PathwayPicker />
            </FadeUp>
          </div>
        </section>

        {/* ── DARREN ───────────────────────────────── */}
        {/* Full-bleed cloud field. Copy on the left; Darren's cut-out portrait
            is anchored bottom-right on desktop and stacked beneath the copy on
            mobile/tablet — grounded on the banner's bottom edge either way. */}
        <section data-spine="Darren" className="relative isolate overflow-hidden text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/clouds.png"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="relative z-10 u-container pt-12 md:pt-16 lg:pb-16">
            <div className="max-w-[30rem] lg:max-w-[34rem]">
              <FadeUp>
                <p className="text-lg md:text-xl text-ink/70 mb-5">Hi, I’m Darren.</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <p className="font-serif text-[30px] md:text-[40px] lg:text-[48px] leading-[1.12] text-ink">
                  For more than twenty years, I’ve helped leaders turn strategy into action across some of the world’s largest organisations.
                </p>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-7 md:mt-8 text-lg text-ink/70 leading-relaxed max-w-[40ch]">
                  I tend to work in the space between ambition and execution, because that’s where organisations either gain or lose momentum.
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <p className="mt-5 text-lg text-ink/70 leading-relaxed max-w-[40ch]">
                  Over that time, I’ve built businesses, led change and helped organisations execute at scale.
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
                    The challenge isn’t creating more. It’s helping what already exists move together.
                  </p>
                </FadeUp>
                <FadeUp delay={0.26}>
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch]">
                    Because somewhere between ambition and execution, work gets diluted. Momentum slips. Complexity takes hold.
                  </p>
                </FadeUp>
                <FadeUp delay={0.32}>
                  <p className="mt-9 md:mt-10 font-serif text-[27px] md:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.01em] text-bone max-w-[24ch]">
                    It deserves to arrive{' '}
                    <HandUnderline delay={0.6} variant={3} stroke="color-mix(in srgb, var(--color-bone), transparent 30%)">
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
        <section data-spine="Trusted by" className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-y border-stone/60">
          <div className="u-container">
            <FadeUp>
              <p className="eyebrow text-graphite mb-10 md:mb-12 text-center">Trusted with important work by</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <LogoTicker ariaLabel="Brands I’ve worked with" />
            </FadeUp>
          </div>
        </section>

        {/* ── TURNSTILE ────────────────────────────── */}
        <section data-spine="Who I help" className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/60">
          <div className="u-container">
            <FadeUp>
              <h2 className="text-[34px] sm:text-[44px] md:text-[60px] leading-[1.04] mb-10 max-w-[20ch]">Where do you need help keeping important work moving?</h2>
            </FadeUp>
            <div className="u-grid gap-y-6">
              {TURNSTILE.map((t, i) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="block col-span-4"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col rounded-2xl border p-7 md:p-8 transition-[border-color,box-shadow,background-color] duration-300"
                    style={{
                      backgroundColor: hovered === i ? t.hover : t.rest,
                      borderColor: hovered === i ? t.accent : 'transparent',
                      boxShadow: hovered === i
                        ? '0 4px 10px rgba(31,31,29,0.07), 0 22px 48px -20px rgba(31,31,29,0.26)'
                        : '0 1px 2px rgba(31,31,29,0.05), 0 12px 30px -14px rgba(31,31,29,0.16)',
                    }}
                  >
                    <h3 className="text-xl md:text-2xl text-ink mb-3">{t.label}</h3>
                    <p className="text-ink/90 leading-snug mb-2.5 md:min-h-[2lh]">{t.diagnosis}</p>
                    <p className="text-graphite leading-relaxed text-[15px]">{t.support}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-semibold" style={{ color: hovered === i ? t.accent : 'var(--color-ink)' }}>
                      Explore
                      <span aria-hidden className="transition-transform duration-300" style={{ transform: hovered === i ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
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
                  className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-graphite"
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
