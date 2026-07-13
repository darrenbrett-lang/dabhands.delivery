import Head from 'next/head';
import { ReactNode } from 'react';
import { FadeUp } from '@/components/FadeUp';

/*
 * PRIVATE, UNLISTED PROPOSAL PAGE. "The Clear Path", for Dr Adeel Khan (Eterna Health).
 *
 * Route: /for/eterna. Do not link to this from anywhere on the site. Not in
 * sitemap.xml. The route sends an X-Robots-Tag: noindex header (see
 * next.config.ts) alongside the in-page robots meta below. Open Graph tags are
 * deliberately omitted so a shared link never leaks the client or contents.
 * Standalone: reuses the DAB Hands design system but carries no site navigation.
 *
 * Layout: the site's wide 1280 container. Content is left-aligned; the richer
 * sections use the editorial two-column rail (label + heading left, body right)
 * on desktop and stack to a single column on mobile.
 */

// ── Layout primitives ───────────────────────────────────────────────────────
const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 ${className}`}>{children}</div>
);

// Editorial rail: the eyebrow spans full width; below it the heading (left) and
// the body (right) sit in two columns that top-align, so the second column lines
// up with the heading/paragraph rather than floating up at the eyebrow. Stacks to
// one column on mobile.
const Rail = ({ eyebrow, label, children }: { eyebrow: ReactNode; label: ReactNode; children: ReactNode }) => (
  <Container>
    {eyebrow}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-8 items-start mt-5">
      <div className="lg:col-span-5">{label}</div>
      <div className="lg:col-span-6 lg:col-start-7">{children}</div>
    </div>
  </Container>
);

// ── Kicker (section eyebrow) ────────────────────────────────────────────────
const Kicker = ({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'gold' }) => (
  <p className={`eyebrow ${tone === 'gold' ? 'text-gold' : 'text-blue-green'}`}>{children}</p>
);

// ── Progressive-disclosure step ─────────────────────────────────────────────
const Step = ({
  n,
  title,
  summary,
  children,
}: {
  n: string;
  title: string;
  summary: string;
  children: ReactNode;
}) => (
  <details className="group bg-blue-green text-bone rounded-2xl overflow-hidden">
    <summary className="flex items-start gap-4 md:gap-5 px-5 md:px-7 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
      <span className="font-serif text-[22px] leading-none text-[#EBD4A8] w-7 shrink-0 pt-0.5">{n}</span>
      <span className="flex-1">
        <span className="block text-bone font-medium text-[17px] md:text-[18px] tracking-[-0.01em]">{title}</span>
        <span className="block mt-1 text-bone/70 text-[15px] leading-snug">{summary}</span>
      </span>
      <span
        aria-hidden
        className="mt-1 text-bone/50 text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
      >
        +
      </span>
    </summary>
    <div className="pl-16 md:pl-[4.75rem] pr-5 md:pr-7 pb-6 space-y-3 text-[15px] leading-relaxed text-bone/85 max-w-[60ch]">
      {children}
    </div>
  </details>
);

const StepLine = ({ label, children }: { label: string; children: ReactNode }) => (
  <p>
    <span className="text-[#EBD4A8] font-semibold">{label}: </span>
    {children}
  </p>
);

// The engagement tiers, surfaced as their own module after the Map. The level
// (full / mid / entry) is a label beside the name, not a dash, per the no-dash rule.
const ways: { name: string; level: string; desc: string }[] = [
  {
    name: 'Confidence Partner',
    level: 'Full engagement',
    desc: 'When it simply has to land, I hold the outcome alongside you and drive the priorities end to end. My judgement in the room, and accountability for the work arriving as it should.',
  },
  {
    name: 'Confidence Roadmap',
    level: 'Mid engagement',
    desc: 'When you have the team but need the plan, I build it and stay close to steer delivery. Your team runs the work, and I keep it holding together as it moves.',
  },
  {
    name: 'Confidence Map',
    level: 'Entry',
    desc: 'When you want clarity and the pen, I give you the diagnostic and the prioritised plan. A sharp read of what is slowing the work, and the order to fix it. You take it from there.',
  },
];

export default function ClearPath() {
  return (
    <>
      <Head>
        <title>The Clear Path</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>

      {/* ── Header lockup (no site nav) ─────────────────────────────── */}
      <header className="bg-bone border-b border-ink/10">
        <Container className="py-5 flex items-center justify-between gap-4">
          <span className="font-serif text-ink text-[24px] md:text-[28px] leading-none tracking-[-0.01em]">DAB Hands</span>
          <a
            href="https://dabhands.delivery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] md:text-[14px] tracking-[0.01em] text-graphite hover:text-ink transition-colors"
          >
            dabhands.delivery
          </a>
        </Container>
      </header>

      <main className="bg-bone text-ink">
        {/* ── 1 · Hero (outcome first) ──────────────────────────────── */}
        <section className="bg-bone pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-24 lg:pb-28">
          <Container>
            <FadeUp>
              <p className="text-[12px] md:text-[13px] tracking-[0.14em] text-blue-green">
                Prepared for Dr Adeel Khan, Eterna Health
              </p>
              <p className="mt-1.5 text-[12px] md:text-[13px] tracking-[0.14em] text-graphite">
                From Darren Brett, DAB Hands
              </p>

              <div className="mt-10 md:mt-14">
                {/* Crown signifier, the same mark used on the homepage hero. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/crown-mark.webp"
                  alt=""
                  aria-hidden
                  decoding="async"
                  className="mb-6 md:mb-8 h-11 md:h-13 lg:h-14 w-auto select-none"
                />
                <Kicker>The outcome</Kicker>
                <h1 className="mt-4 font-serif text-[34px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.04] tracking-[-0.01em] max-w-[30ch]">
                  More of the right patients, arriving already confident you are the best and safest choice for them.
                </h1>
                <p className="mt-6 md:mt-8 text-lg md:text-xl leading-relaxed text-ink/85 max-w-[54ch]">
                  A clear, prioritised plan for exactly where to earn that confidence, and where to invest to grow, built from a process that costs you barely any time.
                </p>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ── 2 · What we are really aiming at (emphasis band) ──────── */}
        <section className="bg-charcoal text-bone py-16 md:py-24 lg:py-28">
          <Rail
            eyebrow={
              <FadeUp>
                <Kicker tone="gold">What we are really aiming at</Kicker>
              </FadeUp>
            }
            label={
              <FadeUp>
                <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[38px] leading-[1.1] tracking-[-0.01em]">
                  Not simply more enquiries. More of the right people, arriving primed, who:
                </h2>
              </FadeUp>
            }
          >
            <FadeUp delay={0.1}>
              <ul className="space-y-6">
                {[
                  { lead: 'Feel this is for them.', rest: ' They self-select as the kind of patient you do your best work for.' },
                  { lead: 'Trust you will give them the best result.', rest: ' Your standards and judgement land as the reason to choose you.' },
                  { lead: 'Feel safe you are the better option.', rest: ' Convinced you meet their needs more fully than anyone else they are weighing up.' },
                ].map((point) => (
                  <li key={point.lead} className="flex items-start gap-4">
                    <span aria-hidden className="mt-[0.7em] block w-4 h-px bg-gold/70 shrink-0" />
                    <p className="text-[17px] md:text-lg leading-relaxed text-bone/85">
                      <span className="text-bone font-medium">{point.lead}</span>
                      {point.rest}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </Rail>
        </section>

        {/* ── 3 · The idea ──────────────────────────────────────────── */}
        <section className="bg-bone py-16 md:py-24 lg:py-28">
          <Rail
            eyebrow={
              <FadeUp>
                <Kicker>The idea</Kicker>
              </FadeUp>
            }
            label={
              <FadeUp>
                <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.06] tracking-[-0.01em]">
                  The hard part is not being seen. It is being trusted.
                </h2>
              </FadeUp>
            }
          >
            <FadeUp delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-ink/85">
                <p>
                  A high-value, high-consideration decision is not won with more noise at the top. It is won by removing doubt at the exact moments a patient decides whether to trust you. Before spending on more reach, it pays to know precisely where that confidence is being built, and where it is quietly slipping away.
                </p>
                <p>
                  That is what this does. It turns &ldquo;we should probably do some marketing&rdquo; into &ldquo;here is exactly where to act first, and why.&rdquo;
                </p>
              </div>
            </FadeUp>
          </Rail>
        </section>

        {/* ── 4 · How we get there (four collapsible steps) ─────────── */}
        <section className="bg-paper py-16 md:py-24 lg:py-28">
          <Rail
            eyebrow={
              <FadeUp>
                <Kicker>How we get there</Kicker>
              </FadeUp>
            }
            label={
              <FadeUp>
                <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.06] tracking-[-0.01em]">
                  Four light steps. About two hours of your time in total.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink/85 max-w-[40ch]">
                  Most of it just talking. Tap any step to see why it matters and what it asks of you.
                </p>
              </FadeUp>
            }
          >
            <FadeUp delay={0.12}>
              <div className="space-y-4">
                <Step
                  n="1"
                  title="Your thinking, in your words"
                  summary="A few voice notes, about twenty minutes, in your own time."
                >
                  <StepLine label="Why you need it">
                    Everything I build sits on your standard of the best result and your vision for the practice, not a generic template. This is what makes the plan yours.
                  </StepLine>
                  <StepLine label="Your time">
                    around twenty minutes of talking. No prep, no forms.
                  </StepLine>
                  <StepLine label="You get">
                    your own thinking, played back as a clean one-page statement of intent.
                  </StepLine>
                  <StepLine label="To start">
                    if you want to begin here, I send you a short set of questions offline, and you record your voice answers whenever it suits you.
                  </StepLine>
                </Step>

                <Step
                  n="2"
                  title="How it really works, from the people around it"
                  summary="Short conversations I run with a few of your team, and patients where you are comfortable."
                >
                  <StepLine label="Why you need it">
                    The gap between how you intend the practice to feel and how it actually lands is where confident patients are quietly lost. I cannot see that from the outside alone.
                  </StepLine>
                  <StepLine label="Your time">
                    warm introductions and a nod. You do not attend a single one.
                  </StepLine>
                  <StepLine label="You get">
                    an honest picture of how it runs versus how it is meant to, without blame.
                  </StepLine>
                </Step>

                <Step
                  n="3"
                  title="The journey as a patient feels it"
                  summary="I go through your whole world exactly as a prospective patient would."
                >
                  <StepLine label="Why you need it">
                    This one reveals the most, because it is your business seen through the eyes of the anxious, high-value patient you actually want. Most founders have never seen it.
                  </StepLine>
                  <StepLine label="Your time">
                    none at all. This one is entirely on me.
                  </StepLine>
                  <StepLine label="You get">
                    every point, from first search to follow-up, where trust is built or slips.
                  </StepLine>
                </Step>

                <Step
                  n="4"
                  title="What your future patients really think"
                  summary="I study real patient conversations, reviews and the wider market."
                >
                  <StepLine label="Why you need it">
                    Your plan should stand on evidence, not one person&rsquo;s view. I study what real prospective patients say across reviews, forums and communities, and how the most trusted names in your field earn confidence, so every finding is grounded in what people actually think and do.
                  </StepLine>
                  <StepLine label="Your time">
                    none. This runs entirely on my side.
                  </StepLine>
                  <StepLine label="You get">
                    an independent read on your future patients&rsquo; real fears, hopes and triggers, and where the market leaves room for you to stand apart.
                  </StepLine>
                </Step>
              </div>
            </FadeUp>
          </Rail>
        </section>

        {/* ── 5 · The Confidence Map (blue feature band) ────────────── */}
        <section className="bg-blue-green text-bone py-16 md:py-24 lg:py-28">
          <Rail
            eyebrow={
              <FadeUp>
                <p className="eyebrow text-[#EBD4A8]">What these four add up to</p>
              </FadeUp>
            }
            label={
              <FadeUp>
                <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.06] tracking-[-0.01em]">
                  One clear picture: the Confidence Map
                </h2>
              </FadeUp>
            }
          >
            <FadeUp delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-bone/85">
                <p>
                  A single, prioritised view of exactly where the right patients gain the confidence to choose you, and where they quietly slip away, ranked by what each moment is worth to you.
                </p>
                <p>
                  It follows a patient the whole way and asks, at every step: do they feel seen, and understand what they are choosing? Is this honestly right for them? Do they believe you, and the evidence behind you? Do they feel safe, and know the risks? And do they trust you will be there after they commit? Wherever one of those slips, a patient you would have served well is quietly lost.
                </p>
              </div>
            </FadeUp>
          </Rail>
        </section>

        {/* ── 6 · From map to results ───────────────────────────────── */}
        <section className="bg-paper py-16 md:py-24 lg:py-28">
          <Rail
            eyebrow={
              <FadeUp>
                <Kicker>From map to results</Kicker>
              </FadeUp>
            }
            label={
              <FadeUp>
                <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.06] tracking-[-0.01em]">
                  A prioritised plan, then accurate execution.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink/85 max-w-[42ch]">
                  The Map does not stop at findings. It ends as a ranked plan: the few moves that matter most, in the order that compounds, so effort and spend go where the confidence is worth the most money, not where it is easiest.
                </p>
              </FadeUp>
            }
          >
            <FadeUp delay={0.12}>
              <ol className="space-y-6">
                {[
                  { n: '01', lead: 'Prioritise.', rest: ' The two or three changes that lift the right conversions first, each with the reason and the likely impact.' },
                  { n: '02', lead: 'Execute accurately.', rest: ' Run it yourself with the plan in hand, or, as a defined and agreed engagement, I build and steer it with you so it lands as intended and is not diluted.' },
                  { n: '03', lead: 'Compound.', rest: ' I re-check the Map on a cadence, so each round of investment is sharper than the last.' },
                ].map((item) => (
                  <li key={item.n} className="flex items-start gap-4 md:gap-5">
                    <span className="font-serif text-[20px] leading-none text-[#7E5E27] w-8 shrink-0 pt-1">{item.n}</span>
                    <p className="text-[17px] md:text-lg leading-relaxed text-ink/85">
                      <span className="text-ink font-medium">{item.lead}</span>
                      {item.rest}
                    </p>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </Rail>
        </section>

        {/* ── 6b · How we can work together (own module) ────────────── */}
        <section className="bg-bone py-16 md:py-24 lg:py-28">
          <Rail
            eyebrow={
              <FadeUp>
                <Kicker>After the Map</Kicker>
              </FadeUp>
            }
            label={
              <FadeUp>
                <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.06] tracking-[-0.01em]">
                  How we can work together
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink/85 max-w-[44ch]">
                  Every engagement is built around one outcome: the confidence that your most important work will land. How far we take it together is your call. Three levels, set by how much of the outcome I hold, not by the hours I bill.
                </p>
              </FadeUp>
            }
          >
            <FadeUp delay={0.1}>
              {/* Escalating ladder: most-held (solid slate) down to entry (outline). */}
              <div className="space-y-4">
                {ways.map((w, i) => {
                  const tier = [
                    { card: 'bg-blue-green', name: 'text-bone', level: 'text-[#EBD4A8]', desc: 'text-bone/85' },
                    { card: 'bg-clay/20', name: 'text-ink', level: 'text-[#7E5E27]', desc: 'text-ink/80' },
                    { card: 'border border-ink/20', name: 'text-ink', level: 'text-[#7E5E27]', desc: 'text-ink/80' },
                  ][i];
                  return (
                    <div key={w.name} className={`rounded-2xl p-6 md:p-7 ${tier.card}`}>
                      <div className="flex items-baseline gap-x-3 gap-y-1 flex-wrap">
                        <h3 className={`font-serif text-[20px] md:text-[22px] tracking-[-0.01em] leading-none ${tier.name}`}>
                          {w.name}
                        </h3>
                        <span className={`eyebrow ${tier.level}`}>{w.level}</span>
                      </div>
                      <p className={`mt-3 text-[16px] leading-relaxed ${tier.desc}`}>{w.desc}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-8 pl-6 md:pl-7 text-[16px] leading-relaxed text-ink/70 max-w-[52ch]">
                Choose the level of ambition that is right for you. Once you know the direction, I will talk you through what each looks like.
              </p>
            </FadeUp>
          </Rail>
        </section>

        {/* ── 7 · What you are left with (emphasis band) ────────────── */}
        <section className="bg-charcoal text-bone py-16 md:py-24 lg:py-28">
          <Rail
            eyebrow={
              <FadeUp>
                <Kicker tone="gold">What you are left with</Kicker>
              </FadeUp>
            }
            label={
              <FadeUp>
                <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[40px] leading-[1.08] tracking-[-0.01em]">
                  Not a one-off report. A foundation you keep building on.
                </h2>
              </FadeUp>
            }
          >
            <FadeUp delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-bone/85">
                <p>
                  The Confidence Map does not expire when the work ends. It becomes your working foundation: a clear, evidence-based baseline you own.
                </p>
                <p>
                  From it, every marketing decision and execution is made with confidence, measured against what it actually moved, and sharpened the next time. Each round builds on the last, so your marketing gets more certain, not more expensive.
                </p>
              </div>
            </FadeUp>
          </Rail>
        </section>

        {/* ── 9 · Close (call to action) ────────────────────────────── */}
        <section className="bg-bone text-ink py-18 md:py-28">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 items-center">
              <div className="lg:col-span-7">
                <FadeUp>
                  {/* Crown (mobile / tablet): small, above the payoff. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/crown-mark.webp"
                    alt=""
                    aria-hidden
                    decoding="async"
                    className="lg:hidden block mb-6 h-11 md:h-13 w-auto select-none"
                  />
                  <h2 className="font-serif text-[26px] sm:text-[34px] md:text-[44px] lg:text-[48px] leading-[1.06] tracking-[-0.01em]">
                    Two hours of your time, mostly talking, for a plan that makes every pound you spend next land better.
                  </h2>
                  <p className="mt-7 md:mt-9 text-lg leading-relaxed text-ink/80 max-w-[52ch]">
                    No decks to prepare, no team to brief, no commitment beyond the conversation. You do not need spare hours or people to make this work, carrying it is my job, not yours. You end up holding a clear, prioritised picture of exactly where to win more of the right patients, and why.
                  </p>

                  <div className="mt-9 md:mt-11">
                    <a
                      href="mailto:darren@dabhands.delivery?subject=The%20Clear%20Path%20%7C%20let%27s%20talk"
                      className="group inline-flex items-center gap-2 rounded-full bg-ink text-bone text-[15px] font-medium tracking-tight px-7 py-3.5 transition-colors hover:bg-blue-green hover:text-[#EBD4A8]"
                    >
                      I like this Darren, let&rsquo;s chat
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>
                  </div>
                </FadeUp>
              </div>

              {/* Crown (desktop): bigger, set to the side, vertically centred, jaunty. */}
              <div className="hidden lg:flex lg:col-span-5 justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/crown-mark.webp"
                  alt=""
                  aria-hidden
                  decoding="async"
                  className="h-[260px] xl:h-[320px] w-auto rotate-[13deg] select-none pointer-events-none"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* ── Footer (minimal, no links) ─────────────────────────────── */}
      <footer className="bg-charcoal border-t border-bone/10 py-8">
        <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[13px] tracking-[0.04em] text-bone/65">
            DAB Hands &middot; Darren Brett
          </p>
          <a
            href="mailto:darren@dabhands.delivery"
            className="text-[13px] tracking-[0.04em] text-bone/65 hover:text-bone transition-colors"
          >
            darren@dabhands.delivery
          </a>
        </Container>
      </footer>
    </>
  );
}
