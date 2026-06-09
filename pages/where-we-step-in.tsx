import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { BoxCTA } from '@/components/BoxCTA';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

const cccItems = [
  {
    label: 'Stronger customer experiences',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6" />
        <circle cx="22" cy="12" r="6" />
        <circle cx="17" cy="22" r="6" />
      </svg>
    ),
  },
  {
    label: 'Better execution quality',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18 L13 25 L28 10" />
      </svg>
    ),
  },
  {
    label: 'More commercial impact',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 27 L27 7" />
        <path d="M14 7 L27 7 L27 20" />
      </svg>
    ),
  },
];

const reasons = [
  {
    id: 'get-it-moving',
    label: 'Get it moving',
    summary: 'Important initiatives that are slowing down and need help getting over the line.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 20 H30" />
        <path d="M23 13 L30 20 L23 27" />
        <path d="M5 14 H9" />
        <path d="M5 20 H8" />
        <path d="M5 26 H9" />
      </svg>
    ),
    paragraphs: [
      'Important initiatives rarely slow down because the people involved don\'t care about the outcome.',
      'More often, competing priorities emerge, decision-making becomes harder, and momentum starts to fade. Launches slip. Programmes lose focus. What started as strong work begins to lose its shape as it moves through the organisation.',
      'These moments of hesitation or delay are often signals that the system carrying the work needs attention - not because the work itself isn\'t strong, but because the conditions around it have become harder to navigate.',
      'DAB Hands helps restore clarity, ownership, and momentum. We bring fresh perspective to the obstacles slowing things down, and help important work stay strong as it moves forward.',
    ],
  },
  {
    id: 'bring-it-together',
    label: 'Bring it together',
    summary: 'Complex work involving multiple teams, partners, and moving parts.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="9" r="2.4" />
        <circle cx="32" cy="9" r="2.4" />
        <circle cx="20" cy="33" r="2.4" />
        <circle cx="20" cy="20" r="2.4" />
        <path d="M9.7 10.7 L18.3 18.4" />
        <path d="M30.3 10.7 L21.7 18.4" />
        <path d="M20 22.4 L20 30.6" />
      </svg>
    ),
    paragraphs: [
      'The bigger and more complex the challenge, the harder coordination becomes. Different teams bring different priorities. Multiple agencies, partners, and stakeholders all play important roles, but each comes with their own success metrics, timelines, and constraints.',
      'Without clear alignment around shared outcomes, even strong work can fragment and lose its strength as it moves through the system. Ownership becomes unclear. Decisions get held up. The original intent gets diluted.',
      'These are the moments when the system itself becomes the problem, not the capability of the people involved, but the conditions that prevent them from moving together.',
      'DAB Hands helps create the conditions for teams to move together around shared outcomes, while protecting the integrity and intent of the work itself.',
    ],
  },
  {
    id: 'strengthen-it',
    label: 'Strengthen it',
    summary: 'When an important challenge needs additional leadership, capability, or support.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 5 L31 9 V19 C31 26 20 31 20 31 C20 31 9 26 9 19 V9 Z" />
        <path d="M15 19 L18.5 22.5 L26 14.5" />
      </svg>
    ),
    paragraphs: [
      'Some challenges carry more visibility, more pressure, or more commercial importance than others. These might be critical initiatives, delivery challenges, operational problems, or organisational transformation. Some are about protecting a specific project. Others are about strengthening a whole function or team.',
      'When the stakes are high and the challenge is complex, experienced hands around the work serve two purposes: sharpening the decisions that need to be made, and protecting the original intent and quality of what is being delivered as it moves forward.',
      'Leadership, capability, and support take many forms depending on what the challenge actually needs. Sometimes it is bringing in senior experience to navigate complexity. Sometimes it is adding delivery rigour. Sometimes it is protecting a team\'s focus while the system around them becomes clearer.',
      'DAB Hands brings experienced leadership and trusted capability where it matters most, helping important work, and important teams, stay strong under pressure.',
    ],
  },
  {
    id: 'get-more-from-it',
    label: 'Get more from it',
    summary: 'Good people, good partners, and good ideas that could be working together more effectively.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 26 L16 16 L22 22 L34 10" />
        <path d="M27 10 H34 V17" />
      </svg>
    ),
    paragraphs: [
      'Most organisations already have talented people in place. Good partners and agencies. Significant investment in existing systems and capabilities. The challenge is rarely a shortage of any of these things.',
      'More often, the opportunity lies in how those assets are being coordinated, understood, and deployed together. Small misalignments in how decisions get made. Unclear ownership. Systems that work in isolation instead of in concert. Teams with good intentions that aren\'t quite moving together.',
      'These gaps don\'t usually signal a need for more capability. They signal a need for clearer decision-making, better coordination, and sharper alignment around what matters.',
      'DAB Hands helps unlock more value, and stronger work, from what already exists. By bringing clarity to the system carrying the work, we help good people, good partners, and good ideas move together more effectively.',
    ],
  },
];

export default function WhereWeStepIn() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && reasons.some((r) => r.id === hash)) {
      setOpenId(hash);
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, []);

  return (
    <>
      <SeoMeta
        title="Where DAB Hands steps in"
        description="DAB Hands is built around critical digital initiatives that cannot afford to drift. Senior-led delivery for complex work that needs to move together at pace."
        path="/where-we-step-in"
      />

      <Layout footerVariant="minimal">
        {/* HERO */}
        <section className="bg-dab-cream text-dab-charcoal pt-32 md:pt-44 pb-16 md:pb-32 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sand-ripple.jpg"
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none select-none absolute right-0 bottom-0 h-[80%] w-auto max-w-none opacity-50 sm:opacity-75 md:opacity-100"
            style={{
              maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
              WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
            }}
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch]">
                We believe strong work deserves to stay strong.
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-12 text-xl md:text-2xl text-dab-charcoal leading-relaxed max-w-[50ch]">
                There is rarely a shortage of good ideas. More often, the challenge is helping those ideas survive the complexity of modern organisations.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <p className="mt-6 md:mt-8 text-xl md:text-2xl text-dab-charcoal leading-relaxed max-w-[50ch]">
                DAB Hands helps the right work move from idea to market without losing what made it strong in the first place.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* COMMON REASONS PEOPLE GET IN TOUCH — ACCORDIONS */}
        <section className="bg-dab-brown-lighter text-dab-charcoal pt-14 md:pt-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch] mb-10 md:mb-14">
                Common reasons people get in touch
              </h2>
            </FadeUp>
          </div>

          <FadeUp className="max-w-screen-xl mx-auto border-t border-dab-charcoal/15">
            {reasons.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-28 md:scroll-mt-32 border-b border-dab-charcoal/15 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className={`w-full text-left px-6 md:px-10 lg:px-16 py-8 md:py-10 transition-colors duration-300 ${
                      isOpen ? 'bg-white' : 'bg-dab-brown-lighter'
                    }`}
                  >
                    <div className="flex items-start gap-5 md:gap-6">
                      <span
                        aria-hidden
                        className="flex-shrink-0 mt-1 text-dab-charcoal [&_svg]:w-8 [&_svg]:h-8 md:[&_svg]:w-9 md:[&_svg]:h-9"
                      >
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl md:text-3xl lg:text-[34px] font-medium tracking-[-0.022em] select-text text-dab-charcoal">
                          {item.label}
                        </h3>
                        <p className="mt-2 md:mt-3 text-lg md:text-xl leading-relaxed max-w-[52ch] select-text text-dab-charcoal/70">
                          {item.summary}
                        </p>
                        <span className="mt-5 md:mt-6 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-dab-charcoal/70">
                          {isOpen ? 'Close' : 'Learn more'}
                          <span
                            aria-hidden
                            className="relative w-4 h-4 text-dab-charcoal"
                          >
                            <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                            <span
                              className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300 ${
                                isOpen ? 'scale-y-0' : 'scale-y-100'
                              }`}
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-white"
                  >
                    <div
                      inert={!isOpen || undefined}
                      className="px-6 md:px-10 lg:px-16 pt-7 md:pt-8 pb-10 md:pb-14 max-w-[72ch]"
                    >
                      <div className="space-y-4 md:space-y-5 text-lg md:text-xl leading-relaxed select-text">
                        {item.paragraphs.map((p, idx) => (
                          <p
                            key={idx}
                            className={
                              idx === item.paragraphs.length - 1
                                ? 'font-medium text-dab-charcoal'
                                : 'text-dab-charcoal/75'
                            }
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                      <a
                        href={mailto({ subject: item.label })}
                        className="group/cta inline-flex items-center gap-2 mt-8 md:mt-10 font-mono text-[11px] tracking-[0.18em] uppercase text-dab-charcoal border-b border-dab-charcoal/30 hover:border-dab-charcoal pb-1 transition-colors"
                      >
                        Start a conversation
                        <span aria-hidden className="transition-transform group-hover/cta:translate-x-1">→</span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </FadeUp>
        </section>

        {/* WAYS CLIENTS WORK WITH DAB HANDS */}
        <section className="bg-dab-charcoal text-dab-cream py-14 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-cream/55 mb-6 md:mb-8">
                Engagement models
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[18ch] mb-12 md:mb-16">
                Ways clients typically work with DAB Hands
              </h2>
            </FadeUp>
            <div className="grid md:grid-cols-2 gap-y-10 md:gap-y-0 md:gap-x-10 lg:gap-x-16">
              <FadeUp delay={0.08}>
                <div className="md:pr-8 lg:pr-12">
                  <h3 className="text-2xl md:text-[28px] font-semibold tracking-[-0.02em] text-dab-cream mb-4 md:mb-5">
                    Leadership &amp; Advisory
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-dab-cream/70 max-w-[42ch]">
                    Experienced leadership around important work. Helping organisations navigate complexity, make better decisions, and move forward with confidence.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.16}>
                <div className="md:border-l md:border-dab-cream/15 md:pl-10 lg:pl-16">
                  <h3 className="text-2xl md:text-[28px] font-semibold tracking-[-0.02em] text-dab-cream mb-4 md:mb-5">
                    Trusted Capability
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-dab-cream/70 max-w-[42ch]">
                    Trusted specialists assembled around projects, launches, campaigns, and digital initiatives. Small senior teams built around the work, with a single point of accountability.
                  </p>
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.28}>
              <p className="mt-12 md:mt-16 text-xl md:text-2xl font-medium leading-snug tracking-[-0.015em] text-dab-cream max-w-[36ch]">
                The shape depends on the challenge.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ATTENTION / CONNECTION / CONVERSION */}
        <section className="bg-white text-dab-charcoal py-14 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-6 md:mb-8">
              The outcome
            </p>
            <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[20ch] mb-14 md:mb-20">
              When important work moves together more effectively, you get:
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-6 lg:gap-x-8 list-none p-0 m-0">
              {cccItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`md:col-span-4 flex items-center md:items-start gap-4 md:gap-5 ${
                    i > 0 ? 'md:border-l md:border-dab-charcoal/25 md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'
                  }`}
                >
                  <span className="flex-shrink-0 md:self-start text-dab-charcoal" aria-hidden>{item.icon}</span>
                  <p className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold leading-tight tracking-[-0.025em] text-dab-charcoal md:ml-6 lg:ml-8">
                    {item.label}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* CLOSING STATEMENT */}
        <section className="bg-dab-cream text-dab-charcoal py-16 md:py-40 relative overflow-hidden">
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dab-hands-crown-mark.svg"
                alt=""
                aria-hidden
                draggable={false}
                className="mx-auto mb-8 md:mb-10 w-[120px] sm:w-[144px] md:w-[176px] lg:w-[200px] h-auto"
              />
            </FadeUp>
            <FadeUp>
              <p className="text-[28px] md:text-[40px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[24ch] mx-auto">
                Backed by 20+ years helping important work move through complex organisations.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <div className="mt-14 md:mt-20 flex justify-center">
                <BoxCTA href="/experience" label="Experience" />
              </div>
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
