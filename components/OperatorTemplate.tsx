import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from './Layout';
import { FadeUp } from './FadeUp';
import { SeoMeta } from './SeoMeta';
import { Trajectory } from './Trajectory';
import { mailto } from '@/lib/mailto';

/* ── Operator destination template (8-section spine) ──────────────────────────
   DAB Hands as a trusted operating partner, not a consultant. Operator voice:
   recognition over explanation, "I" not "we", situations not services. Built to
   the Destination Page brief. One fixed structure, audience-specific copy. */

export type Accent = 'moss' | 'lavender' | 'peach' | 'sage';

export interface OperatorContent {
  slug: string;
  navLabel: string;
  eyebrow: string; // "For business & agency leaders"
  accent: Accent;
  hero: { headline: string; subline: string; trust?: string };
  validation: { heading: string; intro: string; paras: string[]; strong?: boolean };
  diagnosis: { heading: string; intro?: string; cards?: { heading: string; body: string }[]; paras?: string[]; problem?: string[]; context?: string[]; payoff?: string };
  outcomes: { heading: string; paras: string[]; bgImage?: string };
  transition?: { heading: string; subline?: string; paras?: string[] };
  help: { heading: string; situations?: { heading: string; body: string }[]; statement?: string[] };
  proof: { heading: string; quote?: string; name?: string; role?: string; statement?: string[]; testimonials?: { quote: string; name: string; role: string }[]; interval?: number };
  close: { heading: string; line?: string };
}

// Hero washes (Colour System v3): the primary accent fading top-to-bottom.
// Deep Moss leads; text uses the dark accent shade.
// Audience accents: Business=sage, Marketing=peach, Creators=lavender. `full`
// is the solid colour for the strong Situation panel + the Where-I-help cards;
// `wash` is the soft hero fade; `text` the legible deep shade for eyebrows.
const ACCENT: Record<Accent, { text: string; border: string; rule: string; wash: string; traj: string; full: string }> = {
  moss: { text: 'text-moss', border: 'border-moss/40', rule: 'border-moss/60', wash: 'linear-gradient(to bottom, rgba(91,106,88,0.20), rgba(91,106,88,0.14) 60%, rgba(91,106,88,0) 100%)', traj: 'var(--color-moss)', full: 'var(--color-moss)' },
  lavender: { text: 'text-lavender-deep', border: 'border-lavender/40', rule: 'border-lavender/60', wash: 'linear-gradient(to bottom, rgba(199,189,215,0.26), rgba(199,189,215,0.16) 60%, rgba(199,189,215,0) 100%)', traj: 'var(--color-lavender)', full: 'var(--color-lavender)' },
  peach: { text: 'text-peach-deep', border: 'border-peach/40', rule: 'border-peach/60', wash: 'linear-gradient(to bottom, rgba(231,197,175,0.30), rgba(231,197,175,0.18) 60%, rgba(231,197,175,0) 100%)', traj: 'var(--color-peach)', full: 'var(--color-peach)' },
  sage: { text: 'text-sage-deep', border: 'border-sage/40', rule: 'border-sage/60', wash: 'linear-gradient(to bottom, rgba(170,183,165,0.28), rgba(170,183,165,0.16) 60%, rgba(170,183,165,0) 100%)', traj: 'var(--color-sage)', full: 'var(--color-sage)' },
};

// Authored, not a blog. Hero a touch wider; body narrow; the card grid in between.
// Authored reading measures from the shared grid scale (globals.css @theme):
// read = 800, statement = 960. Centred within the page; gutter matches the system.
const COL = 'mx-auto max-w-read px-6 md:px-10';
const COL_HERO = 'mx-auto max-w-statement px-6 md:px-10';
const COL_WIDE = 'mx-auto max-w-statement px-6 md:px-10';

const Cta = ({ label = 'Start a conversation', full = false }: { label?: string; full?: boolean }) => (
  <a
    href={mailto()}
    className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-teal ${full ? 'w-full' : ''}`}
  >
    {label}
    <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
  </a>
);

// Testimonials as cross-cutting evidence on the teal section: open content
// (bone copy, a thin bone left rule, no box), one quote shown at a time and
// crossfaded on change. Interval is per page; rotation pauses for reduced
// motion; the pips stay clickable.
const Testimonials = ({ items, interval = 6000 }: { items: { quote: string; name: string; role: string }[]; interval?: number }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [active, reduce, items.length, interval]);
  return (
    <div className="max-w-[860px]">
      <div className="border-l-2 border-bone/30 pl-6 md:pl-8">
        <motion.figure
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: 'easeInOut' }}
        >
          <blockquote className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-bone max-w-[66ch]">“{items[active].quote}”</blockquote>
          <figcaption className="mt-5 not-italic">
            <span className="block text-[15px] font-medium text-bone">{items[active].name}</span>
            <span className="block text-[13px] text-bone/70">{items[active].role}</span>
          </figcaption>
        </motion.figure>
      </div>
      <div className="mt-7 flex gap-2.5">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-bone' : 'w-2 bg-bone/30 hover:bg-bone/55'}`}
          />
        ))}
      </div>
    </div>
  );
};

export const OperatorTemplate = ({ content }: { content: OperatorContent }) => {
  const c = content;
  const a = ACCENT[c.accent];

  // Mobile sticky CTA: appears once the hero is scrolled past, hides near the
  // bottom so it never fights the close section's own CTA or the footer.
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 280;
      setSticky(y > 520 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SeoMeta title={`${c.navLabel} | DAB Hands`} description={c.hero.subline} path={`/${c.slug}`} />

      <Layout footerVariant="none">
        {/* 1 ── HERO: recognition + trust + primary CTA, above the fold ── */}
        <section className="relative isolate overflow-hidden bg-bone text-ink pt-32 md:pt-40 pb-16 md:pb-20" style={{ backgroundImage: a.wash }}>
          {/* The single trajectory enters the room — one journey, in the room's accent. */}
          <Trajectory className="pointer-events-none absolute inset-0 h-full w-full" stroke={a.traj} opacity={0.5} />
          <div className={`relative z-10 ${COL_HERO}`}>
            <FadeUp>
              <p className={`eyebrow mb-6 ${a.text}`}>{c.eyebrow}</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] max-w-[19ch]">{c.hero.headline}</h1>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="mt-6 md:mt-7 text-lg md:text-xl text-graphite leading-relaxed max-w-[44ch]">{c.hero.subline}</p>
            </FadeUp>
            {c.hero.trust ? (
              <FadeUp delay={0.16}>
                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                  <p className={`border-l-2 ${a.border} pl-4 text-[14px] leading-relaxed text-graphite max-w-[40ch]`}>
                    {c.hero.trust}
                  </p>
                  <div className="shrink-0">
                    <Cta />
                  </div>
                </div>
              </FadeUp>
            ) : (
              <FadeUp delay={0.16}>
                <div className="mt-8">
                  <Cta />
                </div>
              </FadeUp>
            )}
          </div>
        </section>

        {/* 2 ── VALIDATION: you've done the hard part ── */}
        <section
          data-spine="The situation"
          className={`text-ink py-20 md:py-28 lg:py-32 ${c.validation.strong ? '' : 'bg-bone border-t border-stone/50'}`}
          style={c.validation.strong ? { backgroundColor: a.full } : undefined}
        >
          <div className={COL}>
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[22ch]">{c.validation.heading}</h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-6 text-lg md:text-xl text-ink leading-relaxed max-w-[56ch]">{c.validation.intro}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className={`mt-5 space-y-4 text-[17px] leading-[1.7] max-w-[58ch] ${c.validation.strong ? 'text-ink/80' : 'text-graphite'}`}>
                {c.validation.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 3 ── DIAGNOSIS: what I see from the middle (4 cards) ── */}
        {c.diagnosis.problem && c.diagnosis.context ? (
          // The Challenge as a charcoal two-column module: problem (left),
          // context (right), then a full-width payoff line.
          <section data-spine="The challenge" data-spine-tone="dark" className="bg-charcoal text-bone py-20 md:py-28 lg:py-32">
            <div className={COL_WIDE}>
              <FadeUp>
                <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] max-w-[20ch] text-bone">{c.diagnosis.heading}</h2>
              </FadeUp>
              <div className="mt-9 md:mt-11 grid gap-x-10 gap-y-7 md:grid-cols-2">
                <FadeUp delay={0.06}>
                  <div className="space-y-4 text-[17px] leading-[1.7] text-bone/80">
                    {c.diagnosis.problem.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </FadeUp>
                <FadeUp delay={0.12}>
                  <div className="space-y-4 text-[17px] leading-[1.7] text-bone/80">
                    {c.diagnosis.context.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </FadeUp>
              </div>
              {c.diagnosis.payoff && (
                <FadeUp delay={0.18}>
                  <p className="mt-10 md:mt-12 font-serif text-[24px] md:text-[30px] leading-[1.25] text-bone max-w-[34ch]">{c.diagnosis.payoff}</p>
                </FadeUp>
              )}
            </div>
          </section>
        ) : (
          <section data-spine="The challenge" className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
            <div className={COL}>
              <FadeUp>
                <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[20ch]">{c.diagnosis.heading}</h2>
              </FadeUp>
              {c.diagnosis.intro && (
                <FadeUp delay={0.06}>
                  <p className="mt-5 text-lg text-graphite leading-relaxed max-w-[56ch]">{c.diagnosis.intro}</p>
                </FadeUp>
              )}
              {c.diagnosis.cards && (
                <div className="mt-9 max-w-[66ch]">
                  {c.diagnosis.cards.map((card, i) => (
                    <FadeUp key={i} delay={0.1 + i * 0.05}>
                      <div className={`py-6 ${i < c.diagnosis.cards!.length - 1 ? 'border-b border-stone/60' : ''}`}>
                        <h3 className="text-xl md:text-2xl text-ink leading-[1.2]">{card.heading}</h3>
                        <p className="mt-2.5 text-graphite leading-relaxed max-w-[56ch]">{card.body}</p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              )}
              {c.diagnosis.paras && (
                <FadeUp delay={0.08}>
                  <div className="mt-6 space-y-4 text-lg text-graphite leading-[1.7] max-w-[58ch]">
                    {c.diagnosis.paras.map((p, i) => (
                      <p key={i} className={i === c.diagnosis.paras!.length - 1 ? 'text-ink' : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              )}
            </div>
          </section>
        )}

        {/* 4 ── TRANSITION (optional): the messy middle / where I step in.
            Renders a single subline, or a fuller set of paragraphs. ── */}
        {c.transition && (
          <section data-spine="Where I step in" className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
            <div className={COL}>
              <FadeUp>
                <h2 className="font-serif text-[30px] md:text-[48px] leading-[1.1] max-w-[18ch]">{c.transition.heading}</h2>
              </FadeUp>
              {c.transition.subline && (
                <FadeUp delay={0.06}>
                  <p className="mt-5 text-lg md:text-xl text-graphite leading-relaxed max-w-[48ch]">{c.transition.subline}</p>
                </FadeUp>
              )}
              {c.transition.paras && (
                <FadeUp delay={0.06}>
                  <div className="mt-6 space-y-4 text-lg text-graphite leading-[1.7] max-w-[58ch]">
                    {c.transition.paras.map((p, i) => (
                      <p key={i} className={i === c.transition!.paras!.length - 1 ? 'text-ink' : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              )}
            </div>
          </section>
        )}

        {/* 5 ── OUTCOMES: what changes when it moves ── */}
        <section
          data-spine="What changes"
          className={`relative text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50 ${c.outcomes.bgImage ? 'overflow-hidden' : 'bg-bone'}`}
        >
          {c.outcomes.bgImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.outcomes.bgImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
              <div aria-hidden className="absolute inset-0 bg-bone/35" />
            </>
          )}
          <div className={`relative z-10 ${COL}`}>
            <FadeUp>
              <h2 className="font-serif text-[30px] md:text-[46px] lg:text-[54px] leading-[1.06] tracking-[-0.015em] max-w-[20ch]">{c.outcomes.heading}</h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <div className="mt-6 space-y-4 text-lg text-graphite leading-[1.7] max-w-[56ch]">
                {c.outcomes.paras.map((p, i) => (
                  <p key={i} className={i === c.outcomes.paras.length - 1 ? 'text-ink' : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 6 ── WHERE I TEND TO HELP: situations, not services (3 cards) ── */}
        <section data-spine="Where I help" className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
          <div className={c.help.situations ? COL_WIDE : COL}>
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[20ch]">{c.help.heading}</h2>
            </FadeUp>
            {c.help.situations && (
              <div className="mt-9 grid gap-5 md:grid-cols-3">
                {c.help.situations.map((s, i) => (
                  <motion.div
                    key={s.heading}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col rounded-2xl border border-stone bg-bone p-6 md:p-7 shadow-[0_2px_8px_-4px_rgba(31,31,29,0.10)] transition-colors duration-300 hover:border-ink/30"
                  >
                    <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.18] text-ink">{s.heading}</h3>
                    <p className="mt-3 text-graphite leading-relaxed text-[15px]">{s.body}</p>
                  </motion.div>
                ))}
              </div>
            )}
            {c.help.statement && (
              <FadeUp delay={0.06}>
                <div className="mt-6 space-y-4 text-lg text-graphite leading-[1.7] max-w-[56ch]">
                  {c.help.statement.map((p, i) => (
                    <p key={i} className={i === c.help.statement!.length - 1 ? 'text-ink' : undefined}>
                      {p}
                    </p>
                  ))}
                </div>
              </FadeUp>
            )}
          </div>
        </section>

        {/* 7 ── TRUST: a quote that shows understanding of the gap ── */}
        <section data-spine="Trusted" data-spine-tone="dark" className="bg-teal text-bone py-20 md:py-28 lg:py-32">
          <div className={COL_WIDE}>
            <FadeUp>
              <p className="font-serif text-[20px] md:text-[24px] leading-[1.2] text-bone/90 mb-8 max-w-[26ch]">{c.proof.heading}</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              {c.proof.testimonials ? (
                <Testimonials items={c.proof.testimonials} interval={c.proof.interval} />
              ) : c.proof.quote ? (
                <blockquote className="max-w-[860px] border-l-2 border-bone/30 pl-6 md:pl-8">
                  <p className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-bone max-w-[66ch]">“{c.proof.quote}”</p>
                  {c.proof.name && (
                    <footer className="mt-5 not-italic">
                      <span className="block text-[15px] font-medium text-bone">{c.proof.name}</span>
                      {c.proof.role && <span className="block text-[13px] text-bone/70">{c.proof.role}</span>}
                    </footer>
                  )}
                </blockquote>
              ) : (
                c.proof.statement && (
                  <div className="max-w-[860px] border-l-2 border-bone/30 pl-6 md:pl-8">
                    {c.proof.statement.map((p, i) => (
                      <p
                        key={i}
                        className={i === 0 ? 'font-serif text-[18px] md:text-[20px] leading-[1.6] text-bone max-w-[66ch]' : 'mt-4 text-lg text-bone/80 leading-relaxed'}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )
              )}
            </FadeUp>
          </div>
        </section>

        {/* 8 ── CLOSE: simple, confident invitation ── */}
        <section data-spine="Let’s talk" className="bg-bone text-ink py-14 md:py-20 lg:py-24 border-t border-stone/50">
          <div className={`${COL} text-center`}>
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] max-w-[34ch] mx-auto">{c.close.heading}</h2>
            </FadeUp>
            {c.close.line && (
              <FadeUp delay={0.06}>
                <p className="mt-4 text-lg text-graphite max-w-[62ch] mx-auto">{c.close.line}</p>
              </FadeUp>
            )}
            <FadeUp delay={0.1}>
              <div className="mt-8 flex justify-center">
                <Cta />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Mobile sticky CTA (thumb zone). Hidden on desktop and near page ends. */}
        <div
          className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone/60 bg-bone/95 px-4 py-3 backdrop-blur transition-all duration-300 ${
            sticky ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
          }`}
        >
          <a
            href={mailto()}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-charcoal text-[15px] font-medium text-bone"
          >
            Start a conversation
            <span aria-hidden>→</span>
          </a>
        </div>
      </Layout>
    </>
  );
};
