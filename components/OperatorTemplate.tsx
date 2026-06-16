import { useEffect, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from './Layout';
import { FadeUp } from './FadeUp';
import { SeoMeta } from './SeoMeta';
import { mailto } from '@/lib/mailto';

/* ── Operator destination template (8-section spine) ──────────────────────────
   DAB Hands as a trusted operating partner, not a consultant. Operator voice:
   recognition over explanation, "I" not "we", situations not services.

   Colour rhythm per room (the room's accent — Business=Sage Mist,
   Marketing=Dusty Apricot, Creators=Cloud Lavender):
     P1 hero        — a soft vignette of the room colour fading into bone
     P2 Situation   — a solid panel of the room colour
     P3 Challenge   — charcoal (black)
     P4 What Changes— the cloud image (neutral, bone scrim)
     P5 Where I help— bone, with the cards in the room colour
     Trust          — a solid panel of the room colour (dark copy)
     Close          — bone

   Layout: every section sits on the shared grid — `.u-container` + `.u-grid`. */

export type Accent = 'moss' | 'lavender' | 'peach' | 'sage';

export interface OperatorContent {
  slug: string;
  navLabel: string;
  eyebrow: string; // "For business & agency leaders"
  accent: Accent;
  hero: { headline: string; subline: string; trust?: string };
  validation: { heading: string; intro: string; paras: string[]; coda?: string };
  diagnosis: { heading: string; intro?: string; cards?: { heading: string; body: string }[]; paras?: string[]; problem?: string[]; context?: string[]; payoff?: string };
  outcomes: { heading: string; paras: string[] };
  transition?: { heading: string; subline?: string; paras?: string[] };
  help: { heading: string; situations?: { heading: string; body: string }[]; statement?: string[] };
  proof: { heading: string; quote?: string; name?: string; role?: string; statement?: string[]; testimonials?: { quote: string; name: string; role: string }[]; interval?: number };
  close: { heading: string; line?: string };
  email?: { subject: string; body: string }; // pre-fills the CTA mailto for this room's context
}

// Audience accents: Business=Sage Mist, Marketing=Dusty Apricot, Creators=Cloud
// Lavender. `color` is the room's full colour (solid panels, card fills, CTA
// hover); `wash` is the soft hero vignette of it; `text` the legible deep shade
// for the eyebrow.
const ACCENT: Record<Accent, { text: string; border: string; color: string; wash: string }> = {
  moss: { text: 'text-moss', border: 'border-moss/40', color: 'var(--color-moss)', wash: 'linear-gradient(to bottom, rgba(91,106,88,0.20), rgba(91,106,88,0.12) 55%, rgba(91,106,88,0) 100%)' },
  lavender: { text: 'text-lavender-deep', border: 'border-lavender/40', color: 'var(--color-lavender)', wash: 'linear-gradient(to bottom, rgba(205,195,218,0.34), rgba(205,195,218,0.18) 55%, rgba(205,195,218,0) 100%)' },
  peach: { text: 'text-peach-deep', border: 'border-peach/40', color: 'var(--color-peach)', wash: 'linear-gradient(to bottom, rgba(229,200,186,0.36), rgba(229,200,186,0.20) 55%, rgba(229,200,186,0) 100%)' },
  sage: { text: 'text-sage-deep', border: 'border-sage/40', color: 'var(--color-sage)', wash: 'linear-gradient(to bottom, rgba(188,197,184,0.34), rgba(188,197,184,0.18) 55%, rgba(188,197,184,0) 100%)' },
};

// Charcoal at rest; on hover it fills the room colour. Because the accents are
// light, the label flips to charcoal so it stays legible.
const Cta = ({ label = 'Start a conversation', full = false, accent, email }: { label?: string; full?: boolean; accent: string; email?: { subject?: string; body?: string } }) => (
  <a
    href={mailto(email)}
    style={{ '--cta-accent': accent } as CSSProperties}
    className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-[var(--cta-accent)] hover:text-charcoal ${full ? 'w-full' : ''}`}
  >
    {label}
    <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
  </a>
);

// Testimonials on the room-colour Trust panel: dark copy on the light accent, a
// thin charcoal left rule, no box. One quote at a time, crossfaded; rotation
// pauses for reduced motion; the pips stay clickable.
const Testimonials = ({ items, interval = 6000 }: { items: { quote: string; name: string; role: string }[]; interval?: number }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [active, reduce, items.length, interval]);
  return (
    <div>
      <div className="border-l-2 border-ink/25 pl-6 md:pl-8">
        <motion.figure
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: 'easeInOut' }}
        >
          <blockquote className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-ink">“{items[active].quote}”</blockquote>
          <figcaption className="mt-5 not-italic">
            <span className="block text-[15px] font-medium text-ink">{items[active].name}</span>
            <span className="block text-[13px] text-ink/70">{items[active].role}</span>
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
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-ink' : 'w-2 bg-ink/30 hover:bg-ink/55'}`}
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
        {/* 1 ── HERO: a soft vignette of the room colour fading into bone. ── */}
        <section className="bg-bone text-ink pt-32 md:pt-40 pb-16 md:pb-20" style={{ backgroundImage: a.wash }}>
          <div className="u-container">
            <div className="u-grid">
              <div className="col-span-4 md:col-span-10 lg:col-span-9">
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
                        <Cta accent={a.color} email={c.email} />
                      </div>
                    </div>
                  </FadeUp>
                ) : (
                  <FadeUp delay={0.16}>
                    <div className="mt-8">
                      <Cta accent={a.color} email={c.email} />
                    </div>
                  </FadeUp>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 2 ── VALIDATION ("The Situation" — P2): a solid panel of the room
            colour. Same layout as The Challenge below — heading (+ lead) on top,
            two-column body underneath, the serif coda in the left column. ── */}
        <section data-p2 className="text-ink py-20 md:py-28 lg:py-32" style={{ backgroundColor: a.color }}>
          <div className="u-container">
            <div className="u-grid gap-y-10 md:gap-y-12 md:items-start">
              {/* Heading + its quiet lead-in, across the top. */}
              <FadeUp className="col-span-4 md:col-span-12">
                <h2 className="font-serif text-[32px] md:text-[44px] lg:text-[50px] leading-[1.05] tracking-[-0.01em] max-w-[24ch]">{c.validation.heading}</h2>
                <p className="mt-5 text-lg md:text-xl leading-relaxed text-ink/90 max-w-[46ch]">{c.validation.intro}</p>
              </FadeUp>
              {/* Two-column body: first paragraph left, the rest right. */}
              <FadeUp delay={0.08} className="col-span-4 md:col-span-5">
                <p className="text-[17px] md:text-[18px] leading-[1.75] text-ink/80">{c.validation.paras[0]}</p>
              </FadeUp>
              <FadeUp delay={0.14} className="col-span-4 md:col-span-6 md:col-start-7">
                <div className="space-y-5 text-[17px] md:text-[18px] leading-[1.75] text-ink/80">
                  {c.validation.paras.slice(1).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </FadeUp>
              {/* Coda: the payoff line, left column. */}
              {c.validation.coda && (
                <FadeUp delay={0.2} className="col-span-4 md:col-span-12">
                  <p className="font-serif text-[24px] md:text-[30px] lg:text-[34px] leading-[1.28] text-ink max-w-[46ch]">{c.validation.coda}</p>
                </FadeUp>
              )}
            </div>
          </div>
        </section>

        {/* 3 ── DIAGNOSIS ("The Challenge"): charcoal. ── */}
        {c.diagnosis.problem && c.diagnosis.context ? (
          // Charcoal two-column module: problem (left), context (right), payoff.
          <section className="bg-charcoal text-bone py-20 md:py-28 lg:py-32">
            <div className="u-container">
              <div className="u-grid gap-y-10 md:gap-y-12 md:items-start">
                <FadeUp className="col-span-4 md:col-span-12">
                  <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] max-w-[20ch] text-bone">{c.diagnosis.heading}</h2>
                </FadeUp>
                <FadeUp delay={0.06} className="col-span-4 md:col-span-5">
                  <div className="space-y-4 text-[17px] leading-[1.7] text-bone/80">
                    {c.diagnosis.problem.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </FadeUp>
                <FadeUp delay={0.12} className="col-span-4 md:col-span-6 md:col-start-7">
                  <div className="space-y-4 text-[17px] leading-[1.7] text-bone/80">
                    {c.diagnosis.context.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </FadeUp>
                {c.diagnosis.payoff && (
                  <FadeUp delay={0.18} className="col-span-4 md:col-span-12">
                    <p className="font-serif text-[24px] md:text-[30px] leading-[1.25] text-bone max-w-[34ch]">{c.diagnosis.payoff}</p>
                  </FadeUp>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-charcoal text-bone py-20 md:py-28 lg:py-32">
            <div className="u-container">
              <FadeUp>
                <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[20ch] text-bone">{c.diagnosis.heading}</h2>
              </FadeUp>
              {c.diagnosis.intro && (
                <FadeUp delay={0.06}>
                  <p className="mt-5 text-lg text-bone/70 leading-relaxed max-w-[56ch]">{c.diagnosis.intro}</p>
                </FadeUp>
              )}
              {c.diagnosis.cards && (
                <div className="u-grid mt-9">
                  <div className="col-span-4 md:col-span-8">
                    {c.diagnosis.cards.map((card, i) => (
                      <FadeUp key={i} delay={0.1 + i * 0.05}>
                        <div className={`py-6 ${i < c.diagnosis.cards!.length - 1 ? 'border-b border-bone/15' : ''}`}>
                          <h3 className="text-xl md:text-2xl text-bone leading-[1.2]">{card.heading}</h3>
                          <p className="mt-2.5 text-bone/70 leading-relaxed">{card.body}</p>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                </div>
              )}
              {c.diagnosis.paras && (
                <FadeUp delay={0.08}>
                  <div className="mt-6 space-y-4 text-lg text-bone/70 leading-[1.7] max-w-[58ch]">
                    {c.diagnosis.paras.map((p, i) => (
                      <p key={i} className={i === c.diagnosis.paras!.length - 1 ? 'text-bone' : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              )}
            </div>
          </section>
        )}

        {/* 4 ── TRANSITION (optional): the messy middle / where I step in. ── */}
        {c.transition && (
          <section className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
            <div className="u-container">
              <div className="u-grid gap-y-6 md:gap-y-7">
                <FadeUp className="col-span-4 md:col-span-8">
                  <h2 className="font-serif text-[30px] md:text-[48px] leading-[1.1]">{c.transition.heading}</h2>
                </FadeUp>
                {c.transition.subline && (
                  <FadeUp delay={0.06} className="col-span-4 md:col-span-7 md:col-start-1">
                    <p className="text-lg md:text-xl text-graphite leading-relaxed">{c.transition.subline}</p>
                  </FadeUp>
                )}
                {c.transition.paras && (
                  <FadeUp delay={0.06} className="col-span-4 md:col-span-7 md:col-start-1">
                    <div className="space-y-4 text-lg text-graphite leading-[1.7]">
                      {c.transition.paras.map((p, i) => (
                        <p key={i} className={i === c.transition!.paras!.length - 1 ? 'text-ink' : undefined}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </FadeUp>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 5 ── OUTCOMES ("What Changes"): the bold payoff over the cloud image. ── */}
        <section className="relative overflow-hidden text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/clouds.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
          <div aria-hidden className="absolute inset-0 bg-bone/35" />
          <div className="relative z-10 u-container">
            <div className="u-grid gap-y-6 md:gap-y-7">
              <FadeUp className="col-span-4 md:col-span-9">
                <h2 className="font-serif text-[30px] md:text-[46px] lg:text-[54px] leading-[1.06] tracking-[-0.015em]">{c.outcomes.heading}</h2>
              </FadeUp>
              <FadeUp delay={0.06} className="col-span-4 md:col-span-7 md:col-start-1">
                <div className="space-y-4 text-lg text-graphite leading-[1.7]">
                  {c.outcomes.paras.map((p, i) => (
                    <p key={i} className={i === c.outcomes.paras.length - 1 ? 'text-ink' : undefined}>
                      {p}
                    </p>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 6 ── WHERE I TEND TO HELP (P5): bone, with the cards in the room colour. ── */}
        <section className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
          <div className="u-container">
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[20ch]">{c.help.heading}</h2>
            </FadeUp>
            {c.help.situations && (
              <div className="u-grid gap-y-5 mt-9">
                {c.help.situations.map((s, i) => (
                  <motion.div
                    key={s.heading}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="col-span-4 flex h-full flex-col rounded-2xl p-6 md:p-7"
                    style={{ backgroundColor: `color-mix(in srgb, ${a.color} 50%, var(--color-bone))` }}
                  >
                    <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.18] text-ink">{s.heading}</h3>
                    <p className="mt-3 text-ink/75 leading-relaxed text-[15px]">{s.body}</p>
                  </motion.div>
                ))}
              </div>
            )}
            {c.help.statement && (
              <div className="u-grid mt-6">
                <FadeUp className="col-span-4 md:col-span-7">
                  <div className="space-y-4 text-lg text-graphite leading-[1.7]">
                    {c.help.statement.map((p, i) => (
                      <p key={i} className={i === c.help.statement!.length - 1 ? 'text-ink' : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              </div>
            )}
          </div>
        </section>

        {/* 7 ── TRUST ("Trusted by …"): a solid panel of the room colour, dark copy. ── */}
        <section className="text-ink py-20 md:py-28 lg:py-32" style={{ backgroundColor: a.color }}>
          <div className="u-container">
            <div className="u-grid gap-y-8">
              <FadeUp className="col-span-4 md:col-span-12">
                <p className="font-serif text-[20px] md:text-[24px] leading-[1.2] text-ink/80 md:whitespace-nowrap">{c.proof.heading}</p>
              </FadeUp>
              <FadeUp delay={0.08} className="col-span-4 md:col-span-9 md:col-start-1">
                {c.proof.testimonials ? (
                  <Testimonials items={c.proof.testimonials} interval={c.proof.interval} />
                ) : c.proof.quote ? (
                  <blockquote className="border-l-2 border-ink/25 pl-6 md:pl-8">
                    <p className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-ink">“{c.proof.quote}”</p>
                    {c.proof.name && (
                      <footer className="mt-5 not-italic">
                        <span className="block text-[15px] font-medium text-ink">{c.proof.name}</span>
                        {c.proof.role && <span className="block text-[13px] text-ink/70">{c.proof.role}</span>}
                      </footer>
                    )}
                  </blockquote>
                ) : (
                  c.proof.statement && (
                    <div className="border-l-2 border-ink/25 pl-6 md:pl-8">
                      {c.proof.statement.map((p, i) => (
                        <p
                          key={i}
                          className={i === 0 ? 'font-serif text-[18px] md:text-[20px] leading-[1.6] text-ink' : 'mt-4 text-lg text-ink/80 leading-relaxed'}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 8 ── CLOSE: simple, confident invitation (left-aligned on the grid), bone. ── */}
        <section className="bg-bone text-ink py-14 md:py-20 lg:py-24 border-t border-stone/50">
          <div className="u-container">
            <div className="u-grid">
              <div className="col-span-4 md:col-span-8">
                <FadeUp>
                  <h2 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] max-w-[34ch]">{c.close.heading}</h2>
                </FadeUp>
                {c.close.line && (
                  <FadeUp delay={0.06}>
                    <p className="mt-4 text-lg text-graphite max-w-[62ch]">{c.close.line}</p>
                  </FadeUp>
                )}
                <FadeUp delay={0.1}>
                  <div className="mt-8 flex">
                    <Cta accent={a.color} email={c.email} />
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile sticky CTA (thumb zone). Hidden on desktop and near page ends. */}
        <div
          className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone/60 bg-bone/95 px-4 py-3 backdrop-blur transition-all duration-300 ${
            sticky ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
          }`}
        >
          <a
            href={mailto(c.email)}
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
