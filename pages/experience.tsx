import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { TickerLogo } from '@/components/TickerLogo';
import { BoxCTA } from '@/components/BoxCTA';
import { Ribbon } from '@/components/Ribbon';
import { HandUnderline } from '@/components/HandUnderline';
import { SeoMeta } from '@/components/SeoMeta';

// All client logos are self-hosted under /public/images/logos/svg/.
// `kind: 'icon'` → square-ish brand mark, sits at full row height.
// `kind: 'wordmark'` → horizontal wordmark, height-capped so icons aren't dwarfed.
// `boost: true` → lift a short wordmark up to icon scale.
const clients: Array<{ name: string; src: string; kind?: 'icon' | 'wordmark'; boost?: boolean }> = [
  { name: 'Nike', src: '/images/logos/svg/nike.svg', kind: 'icon' },
  { name: 'Volkswagen', src: '/images/logos/svg/volkswagen.svg', kind: 'icon' },
  { name: 'Audi', src: '/images/logos/svg/audi.svg', kind: 'icon' },
  { name: 'Hugo Boss', src: '/images/logos/svg/hugo-boss.svg' },
  { name: 'Tommy Hilfiger', src: '/images/logos/svg/tommy-hilfiger-mono.png', boost: true },
  { name: 'Unilever', src: '/images/logos/svg/unilever.svg', kind: 'icon' },
  { name: 'Johnson & Johnson', src: '/images/logos/svg/johnson-and-johnson.svg' },
  { name: 'Royal Mail', src: '/images/logos/svg/royal-mail-mono.png' },
  { name: 'Parcelforce', src: '/images/logos/svg/parcelforce.svg' },
  { name: 'Palantir', src: '/images/logos/svg/palantir.svg', kind: 'icon' },
  { name: 'Post Office', src: '/images/logos/svg/post-office.svg', boost: true },
  { name: 'Fortnum & Mason', src: '/images/logos/svg/fortnum-and-mason.svg' },
  { name: 'Falabella', src: '/images/logos/svg/falabella.svg' },
];

const testimonials = [
  {
    quote: 'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.',
    author: 'Joel Sinnott',
    title: 'Senior Digital Lead, Nike',
  },
  {
    quote: "He doesn't just deliver. He protects the integrity of the work as it moves through the system. That's rare.",
    author: 'Anthony Mahon',
    title: 'Global Membership Director, Hugo Boss',
  },
  {
    quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.',
    author: 'Meher Mumtaz',
    title: 'Digital Brand Director, Western Union',
  },
];

const experienceAreas = [
  {
    label: 'Digital experiences',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="6" y="8" width="28" height="20" rx="2" />
        <line x1="12" y1="32" x2="28" y2="32" />
        <line x1="18" y1="32" x2="18" y2="28" />
      </svg>
    ),
  },
  {
    label: 'Campaigns and launches',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20 L20 8 L32 20 L28 32 L12 32 Z" />
        <path d="M20 14 L20 26" />
        <path d="M14 20 L26 20" />
      </svg>
    ),
  },
  {
    label: 'Membership and lifecycle',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 18 A12 12 0 1 0 31 25" />
        <path d="M32 11 L32 18 L25 18" />
      </svg>
    ),
  },
  {
    label: 'Platform and ecommerce',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M20 5 L5 13 L20 21 L35 13 Z" />
        <path d="M5 20 L20 28 L35 20" />
        <path d="M5 27 L20 35 L35 27" />
      </svg>
    ),
  },
];

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const tickerDuration = isMobile ? 23.5 : 60;

  return (
    <>
      <SeoMeta
        title="Experience | DAB Hands"
        description="Twenty years helping strong work stay strong as it moves through complex organizational systems. Understanding how people, systems, and technology work together under pressure."
        path="/experience"
      />

      <Layout footerVariant="minimal">
        {/* HERO */}
        <section className="bg-dab-cream text-dab-charcoal pt-36 md:pt-44 pb-20 md:pb-28 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/under-pressure.png"
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none select-none absolute right-0 top-0 bottom-0 h-full w-auto max-w-none opacity-40 sm:opacity-65 md:opacity-90"
            style={{
              maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.2) 100%)',
              WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.2) 100%)',
            }}
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-6 md:mb-8">
                Where I've come from
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch]">
                Experience shaped by complex organisations
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-12 text-xl text-dab-charcoal leading-relaxed max-w-[58ch]">
                I've spent enough time around large brands and inside big agencies to know that great work isn't just about the idea. It's about what happens to that idea as it moves through the organisation.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* EXPERIENCE AREAS */}
        <section className="bg-dab-charcoal text-dab-cream pt-20 md:pt-28 pb-24 md:pb-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp delay={0.08}>
              <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium leading-[1.05] tracking-[-0.03em] mb-14 md:mb-16 md:whitespace-nowrap! pb-5 md:pb-7 border-b border-dab-cream/20">
                Proven across
              </h2>
            </FadeUp>

            <div className="pt-10 md:pt-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-x-8 md:gap-x-6 lg:gap-x-8">
                {experienceAreas.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className={`flex items-center justify-start gap-4 md:items-start md:flex-col md:gap-5 ${i > 0 ? 'md:border-l border-dab-cream/15 md:pl-6' : ''}`}
                  >
                    <div className="text-dab-green flex-shrink-0 md:mb-6 [&_svg]:w-10 [&_svg]:h-10 md:[&_svg]:w-12 md:[&_svg]:h-12">{item.icon}</div>
                    <p style={{ whiteSpace: 'pre-line' }} className="text-xl md:text-2xl lg:text-3xl font-medium leading-tight text-dab-cream max-w-[18ch]">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* WORKED AT SCALE FOR — logo ticker (light) */}
        <section className="bg-white text-dab-charcoal pt-20 md:pt-28 pb-20 md:pb-24 relative">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-12 md:mb-16">
                I've worked at scale for
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="w-full overflow-hidden">
                <motion.ul
                  key={isMobile ? 'mobile' : 'desktop'}
                  aria-label="Clients I've worked with at scale"
                  animate={reduceMotion ? undefined : { x: ['0%', '-33.3333%'] }}
                  transition={reduceMotion ? undefined : { duration: tickerDuration, repeat: Infinity, ease: 'linear' }}
                  className="flex gap-12 md:gap-16 lg:gap-20 w-max list-none p-0 m-0"
                >
                  {[...clients, ...clients, ...clients].map((c, i) => (
                    <li
                      key={`${c.name}-${i}`}
                      aria-hidden={i >= clients.length}
                      className="flex-shrink-0 h-20 md:h-24 flex items-center justify-center"
                    >
                      <TickerLogo name={c.name} src={c.src} kind={c.kind} boost={c.boost} />
                    </li>
                  ))}
                </motion.ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* DARREN BRETT */}
        <section id="about" className="bg-dab-brown-lighter text-dab-charcoal relative overflow-hidden">
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
            <FadeUp className="md:hidden mb-6">
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-4">
                Who am I
              </p>
              <p className="text-2xl md:text-3xl font-semibold">Hi, I'm Darren</p>
            </FadeUp>

            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <FadeUp delay={0.08} className="md:col-span-5">
                <div className="aspect-square bg-dab-charcoal relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/darren-brett_colour_headshot.jpeg"
                    alt="Darren Brett"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </FadeUp>

              <FadeUp delay={0.18} className="md:col-span-7 md:col-start-6">
                <div className="space-y-6 text-xl text-dab-charcoal leading-relaxed max-w-[52ch]">
                  <div className="hidden md:block">
                    <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-6 md:mb-8">
                      Who am I
                    </p>
                    <p className="text-2xl md:text-3xl font-semibold">Hi, I'm Darren</p>
                  </div>
                  <p>For more than 20 years, I've helped important digital work move through complex organisations.</p>
                  <p>I've always been drawn to the spaces between disciplines. The places where strategy meets execution, creativity meets practicality, and ambiguity needs to become action. Much of the value I bring comes from helping people make sense of complexity, align around what matters, and move forward with confidence.</p>
                  <p>Experienced working across complex client, agency, technology, and partner ecosystems, I've spent much of my career helping different teams, perspectives, and priorities work together more effectively around important work.</p>
                  <p>Running an agency while leading operations, delivery, and product has shaped how I manage complexity, bring clarity to difficult decisions, and create the conditions for strong work to succeed. My role is often less about owning a single discipline and more about helping multiple disciplines move together with greater cohesion, momentum, and purpose.</p>
                  <p>I'm fascinated by how great work survives modern organisational systems, and how those systems can be improved to create better outcomes. The challenge is rarely a lack of ambition, talent, or ideas. More often, it's helping those things stay connected as they move through the organisation.</p>
                  <p>Bring me in to bring clarity, composure, and momentum to a critical initiative, or scale through DAB Hands to a trusted senior team built around the work.</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* TEAMS BEHIND THE WORK */}
        <section className="bg-white text-dab-charcoal py-24 md:py-32 border-t border-dab-charcoal/8">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <FadeUp className="md:col-span-5">
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-6 md:mb-8">
                  Scaled when needed
                </p>
                <h2 className="text-[35px] md:text-[48px] lg:text-[56px] font-medium leading-[1.02] tracking-[-0.03em]">
                  Built around the work
                </h2>
              </FadeUp>
              <FadeUp delay={0.16} className="md:col-span-6 md:col-start-7">
                <div className="space-y-6 text-xl text-dab-charcoal leading-relaxed">
                  <p>DAB Hands is supported by a trusted network of senior specialists brought in around the initiative when needed.</p>
                  <p>Capability across strategy, creative, digital experience, platforms, operations, and delivery.</p>
                  <div className="pt-4">
                    {[
                      'People I’ve delivered with for years',
                      'Leaders in their fields',
                      'Experienced operators who know how to move the work forward',
                      'A single point of accountability',
                    ].map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15 last:border-b last:border-dab-charcoal/15 text-dab-charcoal"
                      >
                        <svg className="flex-shrink-0 mt-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-9" />
                        </svg>
                        <p className="text-xl font-medium leading-tight text-dab-charcoal">{line}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* TEAMS — ENGAGEMENT SHAPE */}
        <section className="bg-dab-charcoal text-dab-cream py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/55 mb-6 md:mb-8">
                Engagement shape
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="text-[26px] md:text-[36px] lg:text-[44px] font-medium leading-[1.1] tracking-[-0.022em] text-dab-cream max-w-[36ch]"
                style={{ textWrap: 'balance' }}
              >
                Bringing clarity, composure and momentum to important digital work.
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-6 md:mt-8 text-lg md:text-xl leading-relaxed text-dab-cream max-w-[44ch]">
                Lean activation. Minimal operational overhead. Designed to integrate quickly around the work.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <p className="mt-6 md:mt-8 text-lg md:text-xl font-normal leading-relaxed text-dab-cream/60 max-w-[44ch]">
                From focused interventions to longer-running strategic support.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* TESTIMONIALS — TRUSTED TO LEAD IMPORTANT WORK */}
        <section className="bg-dab-brown-lighter text-dab-charcoal py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[35px] md:text-[51px] lg:text-[59px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch] mb-16 md:mb-20">
                Trusted to lead important work
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-12 md:gap-10">
              {testimonials.map((t, i) => (
                <FadeUp key={t.author} delay={0.08 * i}>
                  <div className="space-y-6 h-full flex flex-col">
                    <div className="h-px w-full bg-dab-charcoal/20" />
                    <div className="font-mono text-[10px] tracking-[0.2em] text-dab-charcoal/40 pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-xl text-dab-charcoal leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div>
                      <span className="block w-8 h-px bg-dab-green mb-4" />
                      <p className="font-semibold text-dab-charcoal text-[15px]">{t.author}</p>
                      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-dab-charcoal/50 mt-1.5">{t.title}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING STATEMENT */}
        <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 relative overflow-hidden">
          <Ribbon
            className="absolute inset-x-0 top-0 w-full"
            opacity={0.22}
            drift={20}
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <div className="mb-8 md:mb-10">
                <img
                  src="/images/dab-hands-crown-mark.svg"
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="mx-auto w-[120px] sm:w-[144px] md:w-[176px] lg:w-[200px] h-auto"
                />
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p style={{ textWrap: 'balance' }} className="text-[28px] md:text-[40px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.026em] max-w-[24ch] mx-auto">
                Keep important work moving
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mt-14 md:mt-20 flex justify-center">
                <BoxCTA href="/contact" label="Start a conversation" />
              </div>
            </FadeUp>
          </div>
        </section>

      </Layout>
    </>
  );
}
