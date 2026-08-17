import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';
import { Testimonials } from '@/components/Testimonials';
import { PathwayPicker } from '@/components/PathwayPicker';
import { SlatPortrait } from '@/components/SlatPortrait';
import { mailto } from '@/lib/mailto';
import { withBreaks, withSoftBreaks } from '@/lib/softBreaks';

// The master testimonial carousel: every voice from the three rooms, one
// rotation, above How I work. Joel Sinnott leads (current tenure); the rest
// carry "Former" where tenure is past.
const MASTER_TESTIMONIALS = [
  {
    quote: 'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.',
    name: 'Joel Sinnott',
    role: 'Senior Digital Lead, Nike',
  },
  {
    quote: 'Darren has a brilliant ability to operationalise strategy. He quickly grasps the intent behind an idea, then builds the practical ways of working that allow an organisation to deliver on it. That’s a capability I’ve always admired.',
    name: 'Neil Munn',
    role: 'Former Global CEO, BBH',
  },
  {
    quote: 'Darren walked into a really difficult situation and made sense of it remarkably quickly. Within a few weeks, there was a plan, people understood what they were doing again, and the temperature had dropped considerably. He brings a calmness and momentum that’s incredibly valuable when projects start to drift.',
    name: 'Dave Wallace',
    role: 'Former Global COO, Mirum',
  },
  {
    quote: 'Darren’s influence extended far beyond the delivery function. He created and implemented Tribal’s first agency-wide ways-of-working framework, helping teams align around a common approach while strengthening consistency, accountability and performance across the business.',
    name: 'Tom Roberts',
    role: 'Former CEO, Tribal Worldwide London',
  },
  {
    quote: 'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.',
    name: 'Gary Shannon',
    role: 'Former Managing Partner, Tribal Worldwide London',
  },
  {
    quote: 'He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.',
    name: 'Anthony Mahon',
    role: 'Former Global Membership Director, HUGO BOSS',
  },
  {
    quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.',
    name: 'Meher Mumtaz',
    role: 'Former Digital Brand Director, Western Union',
  },
];

// "Where I help" — three editorial doorway rows on the grid: a third-width image
// (cols 1–4) with the audience label over it, the conceptual line as the headline,
// and the Explore CTA inline with the helping line beneath (cols 5–12).
// Movement / Attention / Support.
const MOMENTUM = [
  {
    num: '01',
    label: 'Business & Agency Leaders',
    headline: 'Keeping everything moving.',
    support: 'When good thinking gets lost\nbetween decision and delivery.',
    href: '/business-and-agency-leaders',
    src: '/images/momentum/01-tracks-2.jpg',
  },
  {
    num: '02',
    label: 'Marketing Leaders',
    headline: 'Keeping the signal strong.',
    support: 'When great work lands\nsofter than it should.',
    href: '/marketing-leaders',
    src: '/images/momentum/02-branding-2.jpg',
  },
  {
    num: '03',
    label: 'Growth-Stage Businesses',
    headline: 'Supporting greater ambition.',
    support: 'When the ambition is clear but\nthe structure hasn’t caught up.',
    href: '/growth-stage-businesses',
    src: '/images/momentum/03-growth.jpg',
  },
];

export default function Home() {
  const headlineWords = ['Keeping', 'important', 'work', 'moving.'];

  return (
    <>
      <SeoMeta
        title="DAB Hands | Keeping important work moving"
        description="Most organisations don’t lack good thinking. They struggle to preserve it. DAB Hands provides senior operational leadership that keeps important work moving, led by Darren Brett."
        path="/"
      />

      <Layout footerVariant="none">
        {/* ── HERO ─────────────────────────────────────────────────────────────
            The entrance is CSS-driven (.rise) rather than framer so the SSR HTML
            paints and animates before hydration — a framer-gated hero holds the
            largest content at opacity 0 until JS boots, inflating LCP. ── */}
        <section className="relative bg-bone text-ink pt-40 md:pt-52 pb-24 md:pb-32">
          <div className="relative z-10 u-container text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/crown-mark.webp"
              alt=""
              aria-hidden
              width={467}
              height={367}
              className="rise mx-auto mb-6 md:mb-8 h-12 md:h-14 lg:h-16 w-auto select-none"
              style={{ '--rise-y': '10px' } as CSSProperties}
            />
            <h1
              className="text-[44px] sm:text-[60px] md:text-[78px] lg:text-[96px] leading-[1.03] max-w-[15ch] mx-auto"
              aria-label="Keeping important work moving."
            >
              {headlineWords.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && ' '}
                  <span
                    className="rise inline-block"
                    style={{ '--rise-delay': `${0.1 + i * 0.1}s`, '--rise-y': '0.4em' } as CSSProperties}
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </h1>

            <div className="rise" style={{ '--rise-delay': '0.4s' } as CSSProperties}>
              <p className="mt-9 md:mt-11 text-lg md:text-2xl text-graphite leading-relaxed max-w-[46ch] mx-auto">
                Most organisations don’t lack good thinking.<br />They struggle to preserve it.
              </p>
            </div>
            <div className="rise" style={{ '--rise-delay': '0.55s' } as CSSProperties}>
              <PathwayPicker />
            </div>
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
              {/* CSS-driven entrance (.rise): this section peeks into the first mobile
                  viewport, so it must paint pre-hydration (it was the page's LCP). */}
              <div className="col-span-4 md:col-span-6 lg:col-span-5">
                <div className="rise">
                  <p className="text-lg md:text-xl text-ink/70 mb-5">Hi, I’m Darren.</p>
                </div>
                {/* The promise line: the one sentence on the site where Darren is
                    the subject, and the largest type in this block (still under the
                    page h1). A spoken standfirst: serif, no decoration, once across
                    the whole site. The nowrap spans are load-bearing: wraps may only
                    land after "ambition", "you" or "takes," so no line ever ends on
                    a conjunction or pronoun; sizes are tuned so the longest phrase
                    clears this narrow column at every breakpoint. */}
                <div className="rise" style={{ '--rise-delay': '0.08s' } as CSSProperties}>
                  <p className="font-serif text-[28px] md:text-[30px] lg:text-[32px] xl:text-[40px] leading-[1.18] text-ink mb-7 md:mb-8">
                    <span className="whitespace-nowrap">Hand me an ambition</span> <span className="whitespace-nowrap">and I’ll tell you</span>{' '}
                    <span className="whitespace-nowrap">what it actually takes,</span> <span className="whitespace-nowrap">then I’ll make it happen.</span>
                  </p>
                </div>
                {/* The career sentence: background, body scale, must not compete. */}
                <div className="rise" style={{ '--rise-delay': '0.14s' } as CSSProperties}>
                  <p className="text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    For most of my career, I’ve worked at the point where ambition has to become reality: inside agencies, and alongside global brands and businesses in motion.
                  </p>
                </div>
                <div className="rise" style={{ '--rise-delay': '0.2s' } as CSSProperties}>
                  <p className="mt-5 text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    I’ve led major programmes, built operating structures from the ground up, and helped leaders close the gap between what they intend to deliver and what actually gets built.
                  </p>
                </div>
                <div className="rise" style={{ '--rise-delay': '0.26s' } as CSSProperties}>
                  <p className="mt-5 text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    My work is about creating the conditions where capable people do their best work together. That work lives at the point where direction has to become reality.
                  </p>
                </div>
              </div>

              <div className="rise col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7" style={{ '--rise-delay': '0.1s' } as CSSProperties}>
                <SlatPortrait />
              </div>
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
                    Between ambition and execution, momentum slips. Complexity takes hold. The work loses strength.
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
              <p className="eyebrow text-graphite mb-5">How I help</p>
              <h2 className="font-serif text-[30px] md:text-[38px] lg:text-[44px] leading-[1.14] tracking-[-0.01em] text-ink max-w-[860px]">
                I work alongside leaders of agencies, brands and growth-stage businesses, bringing the scar tissue and the instinct to keep important work moving.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="mt-6 md:mt-7 text-[17px] leading-[1.7] text-graphite">
                In practice, that means turning:
              </p>
            </FadeUp>
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-10">
              {[
                { key: 'strategy', from: 'Strategic direction', to: 'operating reality', body: 'Strategy starts on a page. Real impact comes from turning it into everyday decisions, priorities and action. I help organisations make that transition without losing the original intent.' },
                { key: 'complexity', from: 'System complexity', to: 'coordinated flow', body: 'Complexity grows with every successful organisation. Left unmanaged, it weakens momentum. I help reconnect people, priorities and systems so the organisation moves together again.' },
                { key: 'impact', from: 'Important work', to: 'real results', body: 'Important work rarely fails because the idea was wrong. It loses strength as it moves through the organisation. I help it arrive with the clarity, conviction and performance it was built to create.' },
              ].map((t, i) => (
                <FadeUp key={t.key} delay={i * 0.12}>
                  {/* Each turn is a from→to statement: what they have, then what it
                      becomes, pivoting on the gold italic "into". A hairline rule
                      opens each column; the three arrive in sequence. */}
                  <div className="border-t border-stone/60 pt-6 md:pt-7">
                    <h3 className="font-serif text-[32px] md:text-[24px] lg:text-[32px] xl:text-[40px] leading-[1.15] tracking-[-0.01em] text-ink">
                      {t.from}
                      <br />
                      <span className="italic text-gold">into</span> {t.to}
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

        {/* ── IN THEIR WORDS: the master testimonial carousel — every voice
            from the three rooms, one rotation, on bone above How I work. ── */}
        <section data-spine="In their words" className="bg-bone text-ink py-16 md:py-24 border-t border-stone/60">
          <div className="u-container">
            <div className="u-grid gap-y-8">
              <FadeUp className="col-span-4 md:col-span-4">
                <p className="eyebrow text-graphite mb-4">In Their Words</p>
                <h2 className="font-serif text-[30px] md:text-[36px] leading-[1.12] tracking-[-0.01em] max-w-[14ch] u-balance">
                  From the people I’ve worked with.
                </h2>
              </FadeUp>
              <FadeUp delay={0.08} className="col-span-4 md:col-span-7 md:col-start-6">
                <Testimonials items={MASTER_TESTIMONIALS} tone="light" interval={6000} />
              </FadeUp>
            </div>
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
                  Built around the work, not the headcount.
                </h2>
              </FadeUp>

              <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
                <FadeUp delay={0.1}>
                  <p className="text-[16px] md:text-[17px] leading-[1.8] text-bone/85">
                    The work determines the team.
                  </p>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-bone/85">
                    I stay accountable from first conversation to final delivery.
                  </p>
                </FadeUp>
                <FadeUp delay={0.22}>
                  <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-bone/85">
                    When additional capability is needed, I bring in trusted senior specialists I’ve worked with for years, chosen specifically for the challenge.
                  </p>
                </FadeUp>
                <FadeUp delay={0.28}>
                  <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-bone/85">
                    The team expands only when the work demands it. Never the other way around.
                  </p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── MOMENTUM (Who I help): three doorways as one big editorial sequence.
            The warm clay wash runs the full module — header and cards as one block. ── */}
        <section data-spine="Who I help" className="bg-clay/20 text-ink border-t border-stone/60">
          <div className="pt-14 md:pt-16 lg:pt-20">
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

          <div className="u-container pt-8 md:pt-10 pb-16 md:pb-20 lg:pb-24">
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
                    <div className="relative aspect-[5/2] md:aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-inset ring-ink/10">
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
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink/70">{withBreaks(row.support)}</p>
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

        {/* ── FINAL CTA: the deeper pages' close module — centred on bone, crown mark,
            serif heading, Manrope support lines, one button. ── */}
        <section data-spine="Let’s talk" className="bg-bone text-ink py-14 md:py-20 lg:py-24 border-t border-stone/50">
          <div className="u-container">
            <div className="u-grid">
              <div className="col-span-4 md:col-span-8 md:col-start-3 text-center">
                <FadeUp>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} loading="lazy" decoding="async" className="block mx-auto mb-5 md:mb-6 h-9 md:h-10 w-auto select-none" />
                  <h2 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] max-w-[34ch] mx-auto">
                    Organisations rarely need more ideas.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.06}>
                  <p className="mt-4 text-lg text-graphite max-w-[62ch] mx-auto text-balance">
                    {withSoftBreaks('They need their best thinking to survive the journey from concept to customer.\nWhen important work needs to land, let’s talk.')}
                  </p>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <div className="mt-8 flex justify-center">
                    <a
                      href={mailto({ subject: 'Getting important work moving', body: 'I have important work that needs to land. I would like to talk.' })}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-blue-green"
                    >
                      Start a conversation
                      <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </a>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
