import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { TickerLogo } from '@/components/TickerLogo';
import { BoxCTA } from '@/components/BoxCTA';
import { Ribbon } from '@/components/Ribbon';
import { HandUnderline } from '@/components/HandUnderline';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

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
    label: 'Platform and\ne-commerce.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M20 5 L5 13 L20 21 L35 13 Z" />
        <path d="M5 20 L20 28 L35 20" />
        <path d="M5 27 L20 35 L35 27" />
      </svg>
    ),
  },
  {
    label: 'Digital brand experience.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="6" y="6" width="22" height="22" />
        <rect x="14" y="14" width="22" height="22" />
      </svg>
    ),
  },
  {
    label: 'Campaigns and launches.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="20" cy="20" r="14" />
        <circle cx="20" cy="20" r="8" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Membership and lifecycle.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 18 A12 12 0 1 0 31 25" />
        <path d="M32 11 L32 18 L25 18" />
      </svg>
    ),
  },
  {
    label: 'Cross-functional delivery leadership.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="20" y1="6" x2="20" y2="34" />
        <line x1="6" y1="20" x2="34" y2="20" />
        <circle cx="20" cy="20" r="6" />
      </svg>
    ),
  },
];

export default function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <SeoMeta
        title="Experience — Dab Hands"
        description="Senior-led digital delivery experience across platform, brand, campaigns, and customer experience. Trusted to lead important work."
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
                Experience built under pressure
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-12 text-xl text-dab-charcoal leading-relaxed max-w-[58ch]">
                Large-scale digital delivery experience shaped across global brands, complex platforms, campaigns, and customer experience programmes.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* EXPERIENCE AREAS */}
        <section className="bg-dab-charcoal text-dab-cream pt-20 md:pt-28 pb-24 md:pb-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp delay={0.08}>
              <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium leading-[1.05] tracking-[-0.03em] mb-14 md:mb-16 md:whitespace-nowrap!">
                With deep experience across
              </h2>
            </FadeUp>

            <div className="border-t border-dab-cream/15 pt-10 md:pt-14">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 lg:gap-x-8">
                {experienceAreas.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className={i > 0 ? 'lg:border-l lg:border-dab-cream/15 lg:pl-6' : 'lg:pr-6'}
                  >
                    <div className="text-dab-green mb-6">{item.icon}</div>
                    <p style={{ whiteSpace: 'pre-line' }} className="text-xl font-medium leading-tight text-dab-cream max-w-[18ch]">
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
                  aria-label="Clients I've worked with at scale"
                  animate={reduceMotion ? undefined : { x: ['0%', '-33.3333%'] }}
                  transition={reduceMotion ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}
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
                    src="/images/IMG_0064 _ sq.jpeg"
                    alt="Darren Brett"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                  <div aria-hidden className="absolute inset-0 bg-dab-brown-lighter mix-blend-multiply opacity-60 pointer-events-none" />
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
                  <p>More than 20 years leading complex digital delivery across global brands, platforms, campaigns, and customer experience programmes.</p>
                  <p>Running an agency while leading operations, delivery, and product has shaped how I manage complexity, align teams, and keep important work moving under pressure.</p>
                  <p>A big part of the role is moving fluidly between strategy, creative, platforms, operations, and execution. Understanding how people, systems, and emerging technologies work together under pressure, and helping strong work stay strong as it moves to market.</p>
                  <p>I'm obsessed with how great work survives modern organisational systems and work hard to help them improve their outcomes.</p>
                  <p>Bring me in to lead delivery around a critical initiative, or scale through Dab Hands to a trusted senior team built around the work.</p>
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
                  The teams behind the work
                </h2>
              </FadeUp>
              <FadeUp delay={0.16} className="md:col-span-6 md:col-start-7">
                <div className="space-y-6 text-xl text-dab-charcoal leading-relaxed">
                  <p>Dab Hands is supported by a trusted network of senior specialists brought in around the initiative when needed.</p>
                  <p>Capability across strategy, creative, production, platforms, ecommerce, CRM, content, operations, and delivery.</p>
                  <p>People I have delivered with for years. Leaders in their fields. Built for momentum around important work.</p>
                  <div className="pt-4">
                    {[
                      'Small senior teams.',
                      'Clear accountability.',
                      'Built for momentum around important work.',
                    ].map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15 text-dab-charcoal"
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
                Brought in around critical launches, platform work, operational resets, and embedded delivery leadership.
              </h2>
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
              <p style={{ textWrap: 'balance' }} className="text-[28px] md:text-[40px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.026em] max-w-[24ch] mx-auto">
                Let&rsquo;s get important work moving properly.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mt-14 md:mt-20 flex justify-center">
                <BoxCTA href={mailto()} label="Start a conversation" />
              </div>
            </FadeUp>
          </div>
        </section>

      </Layout>
    </>
  );
}
