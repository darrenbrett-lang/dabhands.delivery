import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { LogoTicker } from '@/components/LogoTicker';
import { PathwayPicker } from '@/components/PathwayPicker';
import { SlatPortrait } from '@/components/SlatPortrait';
import { mailto } from '@/lib/mailto';
import { withBreaks, withSoftBreaks } from '@/lib/softBreaks';

// "Where I help" — three editorial doorway rows on the grid: a third-width image
// (cols 1–4) with the audience label over it, the conceptual line as the headline,
// and the Explore CTA inline with the helping line beneath (cols 5–12).
// Movement / Attention / Support.
const MOMENTUM = [
  {
    num: '01',
    label: 'Business & Agency Leaders',
    role: 'Fractional COO · Operating Partner',
    headline: 'Keeping everything moving.',
    support: 'When the work is landing\nand the return isn’t.',
    href: '/business-and-agency-leaders',
    src: '/images/momentum/01-tracks-2.jpg',
  },
  {
    num: '02',
    label: 'Marketing Leaders',
    role: 'Programme & Delivery Director',
    headline: 'Keeping the signal strong.',
    support: 'When great work lands\nsofter than it should.',
    href: '/marketing-leaders',
    src: '/images/momentum/02-branding-2.jpg',
  },
  {
    num: '03',
    label: 'Growth-Stage Businesses',
    role: 'Fractional COO',
    headline: 'Supporting greater ambition.',
    support: 'When the ambition is real but\nnothing has turned it into a plan.',
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
        description="Most organisations don’t lack good thinking. They struggle to preserve its impact. DAB Hands provides senior operational leadership that keeps important work moving, led by Darren Brett."
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
                Most organisations don’t lack good thinking.<br />They struggle to preserve its impact.
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
                  <p className="text-lg md:text-xl text-ink/70 mb-2.5">Hi, I’m Darren.</p>
                  {/* The one Instrument line in this block, by decree (25 Aug).
                      Everything below it is body scale in the sans. */}
                  <p className="font-serif text-[24px] md:text-[26px] lg:text-[28px] leading-[1.2] tracking-[-0.01em] text-ink mb-6 md:mb-7 max-w-[26ch]">
                    A fractional COO and digital operator for digital-focused brands, growth-stage businesses and agencies.
                  </p>
                </div>
                {/* The career sentence: background, must not compete. */}
                <div className="rise" style={{ '--rise-delay': '0.14s' } as CSSProperties}>
                  <p className="text-lg text-ink/70 leading-relaxed max-w-[42ch]">
                    For most of my career I’ve worked at the point where ambition has to become reality. Inside agencies, alongside global brands, and running my own business. In the delivery detail and in the boardroom.
                  </p>
                </div>
                {/* The promise line: the one sentence on the site where Darren is
                    the subject, and it still appears exactly once sitewide. It came
                    out of Instrument on 25 Aug, so it now sets at body scale between
                    two body paragraphs; full Ink rather than Ink/70 is the only
                    thing still separating it from the prose around it. */}
                <div className="rise" style={{ '--rise-delay': '0.2s' } as CSSProperties}>
                  <p className="mt-5 text-lg text-ink leading-relaxed max-w-[42ch]">
                    Hand me an ambition and I’ll tell you what it actually takes, then make it happen.
                  </p>
                </div>
              </div>

              <div className="rise col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7" style={{ '--rise-delay': '0.1s' } as CSSProperties}>
                <SlatPortrait />
              </div>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM (dark card on bone): the argument in one
            contained block. The order is the argument: the enduring problem
            (making is fast, delivering is not, every concession reasonable),
            the pull that names what that costs, the market that punishes it,
            then the objection handled (the new tools do not touch it), and
            only then the job.

            Two columns from lg: the headline sits in a sticky left column and
            holds while the argument scrolls past it, so the claim stays on
            screen the whole time its evidence is being read. That is also what
            uses the card's right-hand width, which a single measure left dead.
            No overflow-hidden anywhere up the tree, or the sticky dies. ── */}
        <section data-spine="The problem" data-spine-tone="dark" className="bg-bone pb-12 md:pb-16 lg:pb-20">
          <div className="u-container">
            <div className="rounded-[24px] md:rounded-[28px] bg-charcoal text-bone px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-16 lg:py-20">
              {/* Eyebrow and rule: sets the card's full width before the copy
                  narrows to its measure. */}
              <FadeUp>
                <div className="flex items-center gap-5">
                  <p className="eyebrow shrink-0 text-gold">The problem</p>
                  <span aria-hidden className="h-px flex-1 bg-bone/15" />
                </div>
              </FadeUp>

              <div className="mt-9 md:mt-12 grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
                {/* Left, and sticky from lg: the headline enacts itself, the
                    changing half receding, the unchanging half at full strength. */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <FadeUp delay={0.06}>
                    <h2 className="font-serif text-[38px] sm:text-[48px] md:text-[56px] lg:text-[44px] xl:text-[50px] leading-[1.04] tracking-[-0.02em]">
                      <span className="block text-bone/40">The tools are changing.</span>
                      <span className="block">The problems aren&rsquo;t.</span>
                    </h2>
                  </FadeUp>
                </div>

                {/* Right: the argument, in one measure, scrolling past the claim. */}
                <div className="max-w-[54ch]">
                  <FadeUp delay={0.1}>
                    <p className="text-[17px] md:text-[19px] leading-[1.75] text-bone/75">
                      Making things has never been faster. Getting them to a customer has not. There are more
                      systems, more partners and more approvals than there were, and every concession along the way
                      is reasonable.
                    </p>
                  </FadeUp>

                  {/* The cost of all those reasonable concessions, said once. */}
                  <FadeUp delay={0.14}>
                    <p className="mt-9 md:mt-10 border-l-2 border-gold pl-6 md:pl-8 font-serif text-[24px] md:text-[30px] leading-[1.25] tracking-[-0.01em] text-bone">
                      What arrives is a worn-down version of what you decided, and nobody chose that.
                    </p>
                  </FadeUp>

                  <FadeUp delay={0.18}>
                    <p className="mt-9 md:mt-10 text-[17px] md:text-[19px] leading-[1.75] text-bone/75">
                      It lands in a market where most things already look the same. Worn-down work doesn&rsquo;t move
                      anyone.
                    </p>
                  </FadeUp>

                  {/* The objection, handled: this is not an argument against the
                      tools, which is what the headline promised to settle. */}
                  <FadeUp delay={0.22}>
                    <p className="mt-5 text-[17px] md:text-[19px] leading-[1.75] text-bone/75">
                      None of this is an argument against the tools. AI sits in every boardroom conversation and very
                      few P&amp;Ls. It makes production cheap, which moves the bottleneck to judgement. It will make
                      you faster at whatever you already do, and judgement decides whether that&rsquo;s better or
                      worse.
                    </p>
                  </FadeUp>
                </div>
              </div>

              {/* The turn. Label in the gutter so it never enters the reading
                  column; the claim in bone, the offer in gold. */}
              <FadeUp delay={0.26}>
                <div className="mt-12 md:mt-16 border-t border-bone/15 pt-10 md:pt-12 grid grid-cols-1 gap-y-4 md:grid-cols-[7rem_1fr] md:gap-x-10 md:items-baseline">
                  <p className="eyebrow text-gold md:pt-2">The job</p>
                  <p className="font-serif text-[28px] md:text-[36px] lg:text-[40px] leading-[1.15] tracking-[-0.01em] u-balance">
                    <span className="block text-bone">Somebody has to hold the whole thing.</span>
                    <span className="block text-gold">That&rsquo;s what I do.</span>
                  </p>
                </div>
              </FadeUp>

              {/* The card closes on a line that keeps going rather than stopping:
                  the momentum promise made visually instead of stated. */}
              <FadeUp delay={0.3}>
                <span
                  aria-hidden
                  className="mt-10 md:mt-12 block h-px w-full"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--color-gold) 0%, color-mix(in srgb, var(--color-gold) 45%, transparent) 45%, transparent 100%)' }}
                />
              </FadeUp>
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
                I work alongside leaders of brands, growth-stage businesses and agencies, bringing the scar tissue and the instinct to keep important work moving.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="mt-6 md:mt-7 text-[17px] leading-[1.7] text-graphite">
                In practice, that means turning:
              </p>
            </FadeUp>
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-y-12 md:gap-y-6 gap-x-10">
              {[
                { key: 'strategy', from: 'Strategic direction', to: 'operating reality', body: 'Strategy starts on a page, and sometimes nowhere at all. What counts is turning it into the decisions and initiatives people act on this quarter.', payoff: 'I help make that turn without losing the intent behind it, and make sure it holds through the work and the duration.' },
                { key: 'complexity', from: 'System complexity', to: 'coordinated flow', body: 'Complexity compounds faster than capability, and it arrives with growth and change. Left alone, it becomes the thing the organisation runs on.', payoff: 'I reconnect people, priorities, systems and rules so the business moves together again, and more of what you spend comes back.' },
                { key: 'impact', from: 'Important work', to: 'real results', body: 'Important work rarely comes unstuck because the idea was wrong. It gets traded away passing through systems nobody talks about.', payoff: 'I agree what cannot be traded, make it travel with the work, and make sure it still moves someone when it arrives.' },
              ].map((t, i) => (
                // Each turn is a from→to statement: what they have, then what it
                // becomes, pivoting on the gold italic "into". A hairline rule
                // opens each column; the three arrive in sequence. The payoff
                // closes each one in serif, and the three payoffs start on the
                // same line via the shared subgrid rows.
                <FadeUp
                  key={t.key}
                  delay={i * 0.12}
                  className="border-t border-stone/60 pt-6 md:pt-7 md:grid md:grid-rows-subgrid md:row-span-3"
                >
                  <h3 className="font-serif text-[32px] md:text-[24px] lg:text-[32px] xl:text-[40px] leading-[1.15] tracking-[-0.01em] text-ink">
                    {t.from}
                    <br />
                    <span className="italic text-gold">into</span> {t.to}
                  </h3>
                  <p className="mt-4 md:mt-0 text-[15px] leading-[1.7] text-graphite max-w-[46ch]">
                    {t.body}
                  </p>
                  <p className="mt-5 md:mt-0 font-serif text-[20px] md:text-[19px] lg:text-[21px] leading-[1.35] tracking-[-0.01em] text-ink max-w-[32ch]">
                    {t.payoff}
                  </p>
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
                    {/* The role line, in the site's eyebrow treatment. Deep accent
                        #7E5E27, not --color-gold: at 11px on the clay wash Aged Gold
                        reads 2.04:1 and the #9A7735 deep gold 3.13:1, both under the
                        4.5 AA needs at this size. This clears it at 4.51. */}
                    <p className="eyebrow mt-2.5" style={{ color: '#7E5E27' }}>{row.role}</p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink/70 text-balance">{withBreaks(row.support)}</p>
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
                  <p className="mt-4 text-lg text-graphite max-w-[68ch] mx-auto text-balance">
                    {withSoftBreaks('They need their best thinking to survive the journey from strategy to concept to customer.\nWhen important work needs to land, let’s talk.')}
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
