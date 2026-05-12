import Head from 'next/head';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';

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
    label: 'Platform and e-commerce.',
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

const cccItems = [
  {
    label: 'Attention.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="17" cy="17" r="13" />
        <circle cx="17" cy="17" r="7" />
        <circle cx="17" cy="17" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Connection.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="8" cy="17" r="4" />
        <circle cx="26" cy="17" r="4" />
        <line x1="12" y1="17" x2="22" y2="17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Conversion.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 27 L27 7" />
        <path d="M14 7 L27 7 L27 20" />
      </svg>
    ),
  },
];

export default function Experience() {
  return (
    <>
      <Head>
        <title>Experience — Dab Hands</title>
        <meta
          name="description"
          content="Senior-led digital delivery experience across platform, brand, campaigns, and customer experience. Trusted to lead important work."
        />
      </Head>

      <Layout>
        {/* HERO */}
        <section className="bg-dab-cream text-dab-charcoal pt-36 md:pt-44 pb-20 md:pb-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">Experience</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[18ch]">
                Senior delivery across global digital programmes
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-12 text-lg md:text-xl text-dab-charcoal/70 leading-relaxed max-w-[58ch]">
                Two decades leading complex digital delivery for global brands, platforms, campaigns, and customer experience programmes.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* DARREN BRETT */}
        <section id="about" className="bg-dab-brown text-dab-charcoal">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <FadeUp delay={0.08} className="md:col-span-5">
                <div className="aspect-[4/5] bg-dab-charcoal relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/IMG_3912.jpeg"
                    alt="Darren Brett"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 flex flex-col items-start justify-end pt-8 pr-8 pb-5 pl-5 md:pt-10 md:pr-10 md:pb-6 md:pl-6 bg-gradient-to-t from-dab-charcoal/70 via-dab-charcoal/0 to-dab-charcoal/0">
                    <span className="text-2xl md:text-3xl font-semibold text-dab-cream tracking-tight">Darren Brett</span>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.18} className="md:col-span-6 md:col-start-7">
                <div className="space-y-5 text-[15px] md:text-[17px] text-dab-charcoal/80 leading-relaxed max-w-[52ch]">
                  <p>More than 20 years leading complex digital delivery across global brands, platforms, campaigns, and customer experience programmes.</p>
                  <p>Running an agency and owning operations, delivery, and product has shaped how I align teams, manage complexity, and keep important work moving under pressure.</p>
                  <p>A key strength is moving fluidly between strategic, creative, operational, and executional thinking, bringing the right people together and raising the level of the work around critical initiatives.</p>
                  <p>Dab Hands is built around that model. Senior leadership, specialist capability, and clear accountability focused on the work itself.</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* TEAMS BEHIND THE WORK */}
        <section className="bg-dab-cream text-dab-charcoal py-24 md:py-32 border-t border-dab-charcoal/8">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <FadeUp className="md:col-span-5">
                <h2 className="text-[35px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.02] tracking-[-0.028em]">
                  The teams behind the work
                </h2>
              </FadeUp>
              <FadeUp delay={0.16} className="md:col-span-6 md:col-start-7">
                <div className="space-y-6 text-[15px] md:text-[17px] text-dab-charcoal/70 leading-relaxed">
                  <p>Dab Hands is supported by a trusted network of senior operators, strategists, creatives, producers, and specialists.</p>
                  <p>People I have delivered with for years. Leaders in their fields. Brought in around the initiative when needed.</p>
                  <div className="pt-4">
                    {[
                      'Small senior teams.',
                      'Clear accountability.',
                      'Built around the work itself.',
                    ].map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15 text-dab-charcoal"
                      >
                        <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-lg md:text-xl font-medium leading-tight">{line}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — TRUSTED TO LEAD IMPORTANT WORK */}
        <section className="bg-dab-brown text-dab-charcoal py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[35px] md:text-[51px] lg:text-[59px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[18ch] mb-16 md:mb-20">
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
                    <p className="text-[15px] md:text-[17px] text-dab-charcoal leading-relaxed flex-1">
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

        {/* EXPERIENCE AREAS */}
        <section className="bg-dab-charcoal text-dab-cream py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-16">
              <FadeUp delay={0.08} className="md:col-span-7">
                <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-semibold leading-[1.05] tracking-[-0.028em] max-w-[14ch]">
                  Where I&apos;ve worked
                </h2>
              </FadeUp>
              <FadeUp delay={0.16} className="md:col-span-4 md:col-start-9">
                <p className="text-[15px] md:text-[17px] text-dab-cream/70 leading-relaxed md:pt-4">
                  Heavy delivery experience across digital for many global brands and sectors.
                </p>
              </FadeUp>
            </div>

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
                    <p className="text-[15px] md:text-[17px] font-medium leading-tight text-dab-cream max-w-[18ch]">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BUILT FOR */}
        <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 border-t border-dab-charcoal/8">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">Sweet spot</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[14ch] mx-auto">
                We&rsquo;re built for
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-8 text-[16px] md:text-[18px] text-dab-charcoal/75 leading-relaxed max-w-[60ch] mx-auto">
                Complex digital initiatives where strategy, creative, product, platforms, and customer experience need to move together at high quality and pace.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ATTENTION / CONNECTION / CONVERSION */}
        <section className="bg-dab-brown text-dab-charcoal py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10">
              {cccItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`flex items-center justify-center gap-4 md:gap-5 ${
                    i > 0 ? 'md:border-l md:border-dab-charcoal/25 md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'
                  }`}
                >
                  <span className="flex-shrink-0 text-dab-charcoal">{item.icon}</span>
                  <p className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold leading-tight tracking-[-0.025em] text-dab-charcoal">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
