import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from './Layout';
import { FadeUp } from './FadeUp';
import { SeoMeta } from './SeoMeta';
import { mailto } from '@/lib/mailto';

/* ── Operator destination template (8-section spine) ──────────────────────────
   DAB Hands as a trusted operating partner, not a consultant. Operator voice:
   recognition over explanation, "I" not "we", situations not services. Built to
   the Destination Page brief. One fixed structure, audience-specific copy. */

export type Accent = 'lavender' | 'peach' | 'sage';

export interface OperatorContent {
  slug: string;
  navLabel: string;
  eyebrow: string; // "For business & agency leaders"
  accent: Accent;
  hero: { headline: string; subline: string; trust: string };
  validation: { heading: string; intro: string; paras: string[] };
  diagnosis: { heading: string; intro?: string; cards?: { heading: string; body: string }[]; paras?: string[] };
  outcomes: { heading: string; paras: string[] };
  transition: { heading: string; subline: string };
  help: { heading: string; situations: { heading: string; body: string }[] };
  proof: { heading: string; quote: string; name: string; role: string };
  close: { heading: string; line?: string };
}

const ACCENT: Record<Accent, { text: string; border: string; tintBg: string; rule: string }> = {
  lavender: { text: 'text-[#6E5A86]', border: 'border-lavender/40', tintBg: 'bg-lavender/[0.10]', rule: 'border-lavender/60' },
  peach: { text: 'text-[#9E5B3A]', border: 'border-peach/40', tintBg: 'bg-peach/[0.10]', rule: 'border-peach/60' },
  sage: { text: 'text-[#5E6B3F]', border: 'border-sage/40', tintBg: 'bg-sage/[0.12]', rule: 'border-sage/60' },
};

const COL = 'mx-auto max-w-5xl px-6 md:px-10';

const Cta = ({ label = 'Start a conversation', full = false }: { label?: string; full?: boolean }) => (
  <a
    href={mailto()}
    className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-ink ${full ? 'w-full' : ''}`}
  >
    {label}
    <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
  </a>
);

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
        <section className="bg-bone text-ink pt-32 md:pt-40 pb-16 md:pb-20">
          <div className={COL}>
            <FadeUp>
              <p className={`eyebrow mb-6 ${a.text}`}>{c.eyebrow}</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] max-w-[19ch]">{c.hero.headline}</h1>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="mt-6 md:mt-7 text-lg md:text-xl text-graphite leading-relaxed max-w-[44ch]">{c.hero.subline}</p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Cta />
                <p className={`rounded-2xl border ${a.border} ${a.tintBg} px-4 py-2.5 text-[13px] leading-snug text-graphite max-w-[42ch]`}>
                  {c.hero.trust}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 2 ── VALIDATION: you've done the hard part ── */}
        <section className="bg-paper text-ink py-16 md:py-24 border-t border-stone/50">
          <div className={COL}>
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[22ch]">{c.validation.heading}</h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-6 text-lg md:text-xl text-ink leading-relaxed max-w-[56ch]">{c.validation.intro}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="mt-5 space-y-4 text-[17px] text-graphite leading-[1.7] max-w-[58ch]">
                {c.validation.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 3 ── DIAGNOSIS: what I see from the middle (4 cards) ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/50">
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

        {/* 4 ── OUTCOMES: what changes when it moves again ── */}
        <section className="bg-paper text-ink py-16 md:py-24 border-t border-stone/50">
          <div className={COL}>
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[22ch]">{c.outcomes.heading}</h2>
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

        {/* 5 ── TRANSITION: that's where I step in ── */}
        <section className="bg-bone text-ink py-16 md:py-24 border-t border-stone/50">
          <div className={COL}>
            <FadeUp>
              <h2 className="font-serif text-[30px] md:text-[48px] leading-[1.1] max-w-[16ch]">{c.transition.heading}</h2>
            </FadeUp>
            <FadeUp delay={0.06}>
              <p className="mt-5 text-lg md:text-xl text-graphite leading-relaxed max-w-[46ch]">{c.transition.subline}</p>
            </FadeUp>
          </div>
        </section>

        {/* 6 ── WHERE I TEND TO HELP: situations, not services (3 cards) ── */}
        <section className="bg-paper text-ink py-16 md:py-24 border-t border-stone/50">
          <div className={COL}>
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[20ch]">{c.help.heading}</h2>
            </FadeUp>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {c.help.situations.map((s, i) => (
                <motion.div
                  key={s.heading}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col rounded-2xl border border-stone bg-bone p-6 md:p-7 transition-colors duration-300 hover:border-ink/30"
                >
                  <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.18] text-ink">{s.heading}</h3>
                  <p className="mt-3 text-graphite leading-relaxed text-[15px]">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 ── TRUST: a quote that shows understanding of the gap ── */}
        <section className="bg-plum text-white py-16 md:py-24">
          <div className={COL}>
            <FadeUp>
              <p className="font-serif text-[22px] md:text-[28px] leading-[1.2] text-white/90 mb-9 max-w-[24ch]">{c.proof.heading}</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <blockquote className={`border-l-2 ${a.rule} pl-6 md:pl-8 max-w-[60ch]`}>
                <p className="font-serif italic text-[24px] md:text-[32px] leading-[1.3] text-white">“{c.proof.quote}”</p>
                <footer className="mt-6 text-[14px] not-italic text-white/65">
                  {c.proof.name}, {c.proof.role}
                </footer>
              </blockquote>
            </FadeUp>
          </div>
        </section>

        {/* 8 ── CLOSE: simple, confident invitation ── */}
        <section className="bg-paper text-ink py-20 md:py-28 border-t border-stone/50">
          <div className={`${COL} text-center`}>
            <FadeUp>
              <h2 className="font-serif text-[32px] md:text-[48px] leading-[1.08] max-w-[20ch] mx-auto">{c.close.heading}</h2>
            </FadeUp>
            {c.close.line && (
              <FadeUp delay={0.06}>
                <p className="mt-5 text-lg text-graphite max-w-[44ch] mx-auto">{c.close.line}</p>
              </FadeUp>
            )}
            <FadeUp delay={0.1}>
              <div className="mt-9 flex justify-center">
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
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-charcoal text-[15px] font-medium text-white"
          >
            Start a conversation
            <span aria-hidden>→</span>
          </a>
        </div>
      </Layout>
    </>
  );
};
