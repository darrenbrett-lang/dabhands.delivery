import { useEffect, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Layout } from './Layout';
import { FadeUp } from './FadeUp';
import { SeoMeta } from './SeoMeta';
import { mailto } from '@/lib/mailto';
import { withSoftBreaks, withBreaks } from '@/lib/softBreaks';
import { SelectedWork, type SelectedWorkContent } from './SelectedWork';
import { OperatingPatterns, type OperatingPatternsContent } from './OperatingPatterns';
import { EntryProduct, type EntryProductContent } from './EntryProduct';
import { SlatPortrait } from './SlatPortrait';

/* ── Operator destination template (8-section spine) ──────────────────────────
   DAB Hands as a trusted operating partner, not a consultant. Operator voice:
   recognition over explanation, "I" not "we", situations not services.

   Colour rhythm (one restrained palette — the three audience colours retired):
     P1 hero        — warm stone with a soft Cloud Pink wash
     P2 Situation   — a solid Deep Blue-Green panel (bone copy)
     P3 Challenge   — charcoal
     P4 What Changes— the cloud image (bone scrim)
     P5 Where I help— warm stone, soft-grey cards
     Trust          — a solid Deep Blue-Green panel (bone copy)
     Close          — warm stone

   Layout: every section sits on the shared grid — `.u-container` + `.u-grid`. */

export type Accent = 'moss' | 'lavender' | 'peach' | 'sage';

export interface OperatorContent {
  slug: string;
  navLabel: string;
  eyebrow: string; // "For Business & Agency Leaders"
  accent: Accent;
  hero: { headline: string; subline: string; trust?: string; image?: string };
  // Serif heading (+ optional lead), two body-copy columns (paras[0] left, the
  // rest right), serif coda. Statements may carry "\n" for a desktop soft break.
  validation: { heading: string; intro?: string; paras: string[]; coda?: string };
  // "The Challenge", charcoal — homepage Point-of-View form: a large serif thesis
  // (left), an argument that builds (right) and resolves into a serif line.
  diagnosis: { thesis: string; argument: string[]; resolution: string };
  outcomes: { heading: string; paras: string[]; resolution?: string };
  transition?: { heading: string; subline?: string; paras?: string[] };
  help: { heading: string; intro?: string; situations?: { heading: string; body: string; enquiry?: { subject: string; body: string } }[]; statement?: string[] };
  // Optional "Operating Patterns" exhibit — accumulated judgement as a museum
  // wall of operating truths; sits between the engagements and the trust panel.
  patterns?: OperatingPatternsContent;
  // Optional — omit (or comment out in the page data) to hide the trust panel.
  proof?: { heading: string; quote?: string; name?: string; role?: string; statement?: string[]; testimonials?: { quote: string; name: string; role: string }[]; interval?: number };
  close: { heading: string; line?: string };
  // Optional entry product ("The … Read"): a buyable Warm Clay module rendered
  // after the testimonials and before the closing CTA — proof, then the ask.
  product?: EntryProductContent;
  // Optional "Selected Work" carousel, rendered just before the closing CTA.
  work?: SelectedWorkContent;
  email?: { subject: string; body: string }; // pre-fills the CTA mailto for this room's context
  seo?: { description?: string }; // optional richer meta description (falls back to hero.subline)
}

// One restrained palette shared by every room (the three audience colours are
// retired). `color` is the solid Deep Blue-Green panel fill + CTA hover; `wash`
// is the soft Cloud Pink hero vignette; `text` the legible eyebrow accent. The
// per-page `accent` key is kept only so existing values still type-check.
const ROOM = {
  text: 'text-blue-green',
  border: 'border-blue-green/40',
  color: 'var(--color-blue-green)',
  wash: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-clay) 42%, transparent), color-mix(in srgb, var(--color-clay) 20%, transparent) 55%, transparent 100%)',
};
const ACCENT: Record<Accent, typeof ROOM> = { moss: ROOM, lavender: ROOM, peach: ROOM, sage: ROOM };

// withSoftBreaks / withBreaks (two-part headlines) live in @/lib/softBreaks,
// shared with the homepage.

// Charcoal at rest; on hover it fills Deep Blue-Green (the interactive colour).
// Both are dark, so the bone label stays put.
const Cta = ({ label = 'Start a conversation', full = false, accent, email }: { label?: string; full?: boolean; accent: string; email?: { subject?: string; body?: string } }) => (
  <a
    href={mailto(email)}
    style={{ '--cta-accent': accent } as CSSProperties}
    className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-[var(--cta-accent)] ${full ? 'w-full' : ''}`}
  >
    {label}
    <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">→</span>
  </a>
);

// Testimonials on the Deep Blue-Green Trust panel: bone copy on the dark panel,
// a thin bone left rule, no box. One quote at a time, crossfaded; rotation
// pauses for reduced motion; the pips stay clickable.
export const Testimonials = ({ items, interval = 6000 }: { items: { quote: string; name: string; role: string }[]; interval?: number }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [active, reduce, items.length, interval]);
  return (
    <div>
      {/* All quotes share one grid cell so the block is always the height of the
          tallest testimonial — the pips below never jump as the quote changes,
          and the left rule keeps a constant height. */}
      <div className="grid border-l-2 border-bone/25 pl-6 md:pl-8">
        {items.map((item, i) => (
          <motion.figure
            key={i}
            aria-hidden={i !== active}
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: 'easeInOut' }}
            style={{ gridArea: '1 / 1' }}
            className={i === active ? '' : 'pointer-events-none'}
          >
            <blockquote className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-bone">“{item.quote}”</blockquote>
            <figcaption className="mt-5 not-italic">
              <span className="block text-[15px] font-medium text-bone">{item.name}</span>
              <span className="block text-[13px] text-bone/85">{item.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="mt-6 flex gap-0.5">
        {items.map((_, i) => (
          /* 24px+ touch target (WCAG target-size); the visible pip is the inner span. */
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className="flex h-6 min-w-6 items-center justify-center"
          >
            <span
              aria-hidden
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-bone' : 'w-2 bg-bone/30 hover:bg-bone/55'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export const OperatorTemplate = ({ content }: { content: OperatorContent }) => {
  const c = content;
  const a = ACCENT[c.accent];
  // The Situation's body paragraphs split evenly across the two columns.
  const vMid = Math.ceil(c.validation.paras.length / 2);

  // Mobile sticky CTA: appears once the hero is scrolled past, hides near the
  // bottom so it never fights the close section's own CTA or the footer.
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 280;
      // Hide the sticky CTA while the work carousel owns the view (it sits at the
      // bottom edge and would otherwise cover the carousel's controls).
      const zone = document.querySelector('[data-hide-sticky]');
      const overCarousel = !!zone && (() => { const r = zone.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; })();
      setSticky(y > 520 && !nearBottom && !overCarousel);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SeoMeta title={`${c.navLabel} | DAB Hands`} description={c.seo?.description ?? c.hero.subline} path={`/${c.slug}`} />

      <Layout footerVariant="none">
        {/* 1 ── HERO: warm stone + soft clay wash. The audience's metaphor image sits
            square on the right (lg); a shallow full-width sliver on top below that. ── */}
        <section className="relative isolate overflow-hidden bg-bone text-ink pt-32 md:pt-40 pb-16 md:pb-20" style={{ backgroundImage: a.wash }}>
          <div className="u-container">
            <div className="u-grid items-center gap-y-8 lg:gap-y-0">
              {/* Metaphor image — square on the right (lg); a shallow full-width sliver
                  above the copy on smaller screens, kept deliberately shallow. */}
              {c.hero.image && (
                <div className="col-span-4 md:col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-1">
                  <div className="relative aspect-[5/2] lg:aspect-square overflow-hidden rounded-2xl ring-1 ring-inset ring-ink/10">
                    <Image
                      src={c.hero.image}
                      alt=""
                      fill
                      priority
                      quality={82}
                      sizes="(max-width: 1024px) 92vw, 38vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              {/* Entrance is CSS-driven (.rise) so the hero paints before hydration
                  (keeps LCP at first paint rather than JS boot). */}
              <div className="relative col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1">
                <div className="rise">
                  <p className={`eyebrow mb-6 ${a.text}`}>{c.eyebrow}</p>
                </div>
                <div className="rise" style={{ '--rise-delay': '0.06s' } as CSSProperties}>
                  <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] max-w-[19ch]">{c.hero.headline}</h1>
                </div>
                <div className="rise" style={{ '--rise-delay': '0.12s' } as CSSProperties}>
                  <p className="mt-6 md:mt-7 text-lg md:text-xl text-graphite leading-relaxed max-w-[44ch]">{c.hero.subline}</p>
                </div>
                {c.hero.trust ? (
                  <div className="rise" style={{ '--rise-delay': '0.16s' } as CSSProperties}>
                    <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                      <p className={`border-l-2 ${a.border} pl-4 text-[14px] leading-relaxed text-graphite max-w-[40ch]`}>
                        {c.hero.trust}
                      </p>
                      <div className="shrink-0">
                        <Cta accent={a.color} email={c.email} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rise" style={{ '--rise-delay': '0.16s' } as CSSProperties}>
                    <div className="mt-8 flex flex-col items-start gap-4">
                      <Cta accent={a.color} email={c.email} />
                      {c.work ? (
                        <a
                          href="#selected-work"
                          className="group inline-flex items-center gap-1.5 text-[14px] text-graphite underline decoration-stone underline-offset-[5px] transition-colors hover:text-ink hover:decoration-graphite"
                        >
                          See recent work
                          <span aria-hidden className="text-[15px] leading-none transition-transform group-hover:translate-y-0.5">↓</span>
                        </a>
                      ) : c.patterns ? (
                        <a
                          href="#operating-patterns"
                          className="group inline-flex items-center gap-1.5 text-[14px] text-graphite underline decoration-stone underline-offset-[5px] transition-colors hover:text-ink hover:decoration-graphite"
                        >
                          {c.patterns.heroLink ?? 'See how I think'}
                          <span aria-hidden className="text-[15px] leading-none transition-transform group-hover:translate-y-0.5">↓</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 2 ── VALIDATION ("The Situation" — P2): a solid Deep Blue-Green panel,
            bone copy. Serif heading (+ optional lead), two body-copy columns
            (paras[0] left, the rest right), serif coda. ── */}
        <section data-p2 className="text-bone py-20 md:py-28 lg:py-32" style={{ backgroundColor: a.color }}>
          <div className="u-container">
            <div className="u-grid gap-y-10 md:gap-y-12 md:items-start">
              {/* Serif heading + its optional quiet lead-in, across the top. */}
              <FadeUp className="col-span-4 md:col-span-12">
                <h2 className="font-serif text-[32px] md:text-[44px] lg:text-[50px] leading-[1.05] tracking-[-0.01em] max-w-[24ch]">{c.validation.heading}</h2>
                {c.validation.intro && (
                  <p className="mt-5 text-lg md:text-xl leading-relaxed text-bone/90 max-w-[46ch]">{c.validation.intro}</p>
                )}
              </FadeUp>
              {/* Two body-copy columns: paragraphs split evenly, left then right. */}
              <FadeUp delay={0.08} className="col-span-4 md:col-span-5">
                <div className="space-y-5 border-l-2 border-bone/25 pl-5 md:pl-6 text-[17px] md:text-[18px] leading-[1.75] text-bone/80">
                  {c.validation.paras.slice(0, vMid).map((p, i) => (
                    <p key={i}>{withSoftBreaks(p)}</p>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.14} className="col-span-4 md:col-span-5 md:col-start-8">
                <div className="space-y-5 border-l-2 border-bone/25 pl-5 md:pl-6 text-[17px] md:text-[18px] leading-[1.75] text-bone/80">
                  {c.validation.paras.slice(vMid).map((p, i) => (
                    <p key={i}>{withSoftBreaks(p)}</p>
                  ))}
                </div>
              </FadeUp>
              {/* Coda: the serif footer statement. */}
              {c.validation.coda && (
                <FadeUp delay={0.2} className="col-span-4 md:col-span-12">
                  <p className="font-serif text-[24px] md:text-[30px] lg:text-[34px] leading-[1.28] text-bone max-w-[46ch]">{withSoftBreaks(c.validation.coda)}</p>
                </FadeUp>
              )}
            </div>
          </div>
        </section>

        {/* 3 ── DIAGNOSIS ("The Challenge"): charcoal, in the homepage Point-of-View
            form — a large serif thesis (left), an argument that builds (right) and
            resolves into a serif line. ── */}
        <section className="bg-charcoal text-bone py-20 md:py-28 lg:py-32">
          <div className="u-container">
            <div className="u-grid gap-y-12 lg:items-start">
              {/* Left: the thesis — large, commanding, fills the column. */}
              <FadeUp className="col-span-4 md:col-span-6">
                <h2 className="font-serif text-[46px] sm:text-[62px] lg:text-[76px] xl:text-[88px] leading-[0.98] tracking-[-0.02em] text-balance">{withBreaks(c.diagnosis.thesis)}</h2>
              </FadeUp>
              {/* Right: the argument that builds to the resolution. */}
              <div className="col-span-4 md:col-span-5 md:col-start-8">
                {c.diagnosis.argument.map((p, i) => (
                  <FadeUp key={i} delay={0.1 + i * 0.05}>
                    <p className={`text-lg md:text-xl leading-relaxed text-bone/80 max-w-[42ch] ${i === 0 ? '' : 'mt-5'}`}>{withSoftBreaks(p)}</p>
                  </FadeUp>
                ))}
                <FadeUp delay={0.1 + c.diagnosis.argument.length * 0.05}>
                  <p className="mt-9 md:mt-10 font-serif text-[27px] md:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-0.01em] text-bone max-w-[24ch]">{withSoftBreaks(c.diagnosis.resolution)}</p>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* 4 ── TRANSITION (optional): the messy middle / where I step in. ── */}
        {c.transition && (
          <section className="bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
            <div className="u-container">
              <div className="u-grid gap-y-6 md:gap-y-7">
                <FadeUp className="col-span-4 md:col-span-8">
                  <h2 className="font-serif text-[30px] md:text-[48px] leading-[1.1]">{withBreaks(c.transition.heading)}</h2>
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

        {/* 5 ── OUTCOMES ("What Changes"): warm stone; the doorway portrait with its
            slat reveal on the left, the payoff copy alongside (mirrors the homepage).
            Gains a top rule when a (bone) transition section precedes it. ── */}
        <section className={`bg-bone text-ink py-20 md:py-28 lg:py-32 ${c.transition ? 'border-t border-stone/50' : ''}`}>
          <div className="u-container">
            <div className="u-grid items-start gap-y-12 md:gap-y-16">
              <FadeUp className="col-span-4 md:col-span-6 lg:col-span-6">
                <SlatPortrait />
              </FadeUp>
              <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
                <FadeUp>
                  <h2 className="font-serif text-[30px] md:text-[46px] lg:text-[54px] leading-[1.06] tracking-[-0.015em] text-balance">{withSoftBreaks(c.outcomes.heading)}</h2>
                </FadeUp>
                <FadeUp delay={0.06}>
                  <div className="mt-6 md:mt-7 space-y-4 text-lg text-graphite leading-[1.7]">
                    {c.outcomes.paras.map((p, i) => (
                      <p key={i} className={i === c.outcomes.paras.length - 1 ? 'text-ink' : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
                {c.outcomes.resolution && (
                  <FadeUp delay={0.12}>
                    <p className="mt-8 md:mt-10 border-t border-stone/60 pt-7 md:pt-8 font-serif text-[24px] md:text-[30px] lg:text-[32px] leading-[1.2] tracking-[-0.01em] text-ink max-w-[28ch] text-balance">
                      {withSoftBreaks(c.outcomes.resolution)}
                    </p>
                  </FadeUp>
                )}
                <FadeUp delay={0.18}>
                  <div className="mt-8 md:mt-10">
                    <Cta accent={a.color} email={c.email} />
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* 6 ── WHERE I TEND TO HELP (P5): warm stone, with soft-grey cards.
            The page's doorway image runs full-bleed behind the module at 10%
            opacity over the warm-stone ground; the cards sit solid on top. ── */}
        <section className="relative overflow-hidden bg-bone text-ink py-20 md:py-28 lg:py-32 border-t border-stone/50">
          {c.hero.image && (
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10 select-none">
              <Image src={c.hero.image} alt="" fill sizes="100vw" quality={82} className="object-cover" />
            </div>
          )}
          <div className="u-container relative">
            <FadeUp>
              <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.12] max-w-[20ch]">{c.help.heading}</h2>
              {c.help.intro && (
                <p className="mt-4 text-lg md:text-xl text-graphite leading-relaxed max-w-[46ch]">{withSoftBreaks(c.help.intro)}</p>
              )}
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
                    style={{ backgroundColor: 'var(--color-stone)' }}
                  >
                    <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.18] text-ink text-balance md:min-h-[2lh]">{withSoftBreaks(s.heading)}</h3>
                    <p className="mt-3 text-ink/75 leading-relaxed text-[15px]">{s.body}</p>
                    {s.enquiry && (
                      <div className="mt-auto pt-6">
                        {/* Small ecommerce-style enquiry button (Apple Pay feel): charcoal pill,
                            gold brand dot, opens a pre-filled mail draft for this exact situation. */}
                        <a
                          href={mailto(s.enquiry)}
                          style={{ '--cta-accent': a.color } as CSSProperties}
                          className="inline-flex w-fit items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-[13px] font-medium text-bone transition duration-300 hover:bg-[var(--cta-accent)] active:scale-95"
                          aria-label={`Enquire about ${s.heading.replace(/\n/g, ' ')}`}
                        >
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                          Enquire
                        </a>
                      </div>
                    )}
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

        {/* 6b ── OPERATING PATTERNS (optional): the black exhibit of operating
            truths — proof of judgement, not case studies. ── */}
        {c.patterns && <OperatingPatterns content={c.patterns} />}

        {/* 7 ── SELECTED WORK (optional): silent-chrome phone carousel; the only
            colour comes from inside the screens. Sits ahead of the testimonials so
            the work makes the case before the witnesses speak. ── */}
        {c.work && (
          <div id="selected-work" className="scroll-mt-24">
            <SelectedWork content={c.work} />
          </div>
        )}

        {/* 7.5 ── TRUST ("Trusted by …"): a solid Deep Blue-Green panel, bone copy.
            Optional — pages without `proof` data skip the panel entirely. ── */}
        {c.proof && (
        <section className="text-bone py-20 md:py-28 lg:py-32" style={{ backgroundColor: a.color }}>
          <div className="u-container">
            <div className="u-grid gap-y-8">
              <FadeUp className="col-span-4 md:col-span-12">
                <p className="font-serif text-[20px] md:text-[24px] leading-[1.2] text-bone/80 md:whitespace-nowrap">{c.proof.heading}</p>
              </FadeUp>
              <FadeUp delay={0.08} className="col-span-4 md:col-span-9 md:col-start-1">
                {c.proof.testimonials ? (
                  <Testimonials items={c.proof.testimonials} interval={c.proof.interval} />
                ) : c.proof.quote ? (
                  <blockquote className="border-l-2 border-bone/25 pl-6 md:pl-8">
                    <p className="font-serif text-[18px] md:text-[20px] leading-[1.6] text-bone">“{c.proof.quote}”</p>
                    {c.proof.name && (
                      <footer className="mt-5 not-italic">
                        <span className="block text-[15px] font-medium text-bone">{c.proof.name}</span>
                        {c.proof.role && <span className="block text-[13px] text-bone/85">{c.proof.role}</span>}
                      </footer>
                    )}
                  </blockquote>
                ) : (
                  c.proof.statement && (
                    <div className="border-l-2 border-bone/25 pl-6 md:pl-8">
                      {c.proof.statement.map((p, i) => (
                        <p
                          key={i}
                          className={i === 0 ? 'font-serif text-[18px] md:text-[20px] leading-[1.6] text-bone' : 'mt-4 text-lg text-bone/80 leading-relaxed'}
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
        )}

        {/* 7.75 ── ENTRY PRODUCT (optional): the buyable "Read" — a mid-tone
            Warm Clay band after the testimonials, before the closing CTA. ── */}
        {c.product && <EntryProduct content={c.product} />}

        {/* 8 ── CLOSE: simple, confident invitation — always centred, bone. ── */}
        <section className="bg-bone text-ink py-14 md:py-20 lg:py-24 border-t border-stone/50">
          <div className="u-container">
            <div className="u-grid">
              <div className="col-span-4 md:col-span-8 md:col-start-3 text-center">
                <FadeUp>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} loading="lazy" decoding="async" className="block mx-auto mb-5 md:mb-6 h-9 md:h-10 w-auto select-none" />
                  <h2 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] max-w-[34ch] mx-auto">{c.close.heading}</h2>
                </FadeUp>
                {c.close.line && (
                  <FadeUp delay={0.06}>
                    <p className="mt-4 text-lg text-graphite max-w-[62ch] mx-auto text-balance">{withSoftBreaks(c.close.line)}</p>
                  </FadeUp>
                )}
                <FadeUp delay={0.1}>
                  <div className="mt-8 flex justify-center">
                    <Cta accent={a.color} email={c.email} />
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile sticky CTA (thumb zone). Hidden on desktop and near page ends.
            aria-hidden + tabIndex keep the invisible bar out of the tab order. */}
        <div
          aria-hidden={!sticky}
          className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone/60 bg-bone/95 px-6 py-3 backdrop-blur transition-all duration-300 ${
            sticky ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
          }`}
        >
          <a
            href={mailto(c.email)}
            tabIndex={sticky ? 0 : -1}
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
