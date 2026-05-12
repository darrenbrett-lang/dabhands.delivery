import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';

const reasons = [
  'Stronger alignment around important work.',
  'Faster movement through complex delivery environments.',
  'Higher-quality execution across the customer experience.',
  'More impact from existing investment.',
];

const interventions = [
  {
    title: 'Bring critical work back under control',
    body: [
      'When important work starts drifting, confidence drops quickly. Decisions slow down, ownership fragments, and momentum disappears.',
      'Dab Hands steps in to restore clarity, stabilise delivery, and get the work moving again.',
    ],
  },
  {
    title: 'Protect the quality of the work',
    body: [
      'Strong work often loses strength as it moves through teams, approvals, platforms, and timelines.',
      'Dab Hands helps maintain alignment, execution quality, and momentum as the work moves to market.',
    ],
  },
  {
    title: 'Align teams around the work',
    body: [
      'Important initiatives rarely fail because people do not care. They fail because priorities, ownership, and decision-making become disconnected.',
      'Dab Hands creates alignment around the work so teams can move faster and execute more effectively.',
    ],
  },
  {
    title: 'Build the right senior team',
    body: [
      'Some initiatives need additional capability at the right level.',
      'Dab Hands builds small senior teams around critical work to increase capability, sharpen execution, and raise the level of output.',
    ],
  },
  {
    title: 'Improve how the work moves',
    body: [
      'Sometimes the issue is not the strategy or creative. It is how the work is operating.',
      'Dab Hands reduces friction, clarifies ownership, and improves delivery flow across teams and stakeholders.',
    ],
  },
  {
    title: 'Get more from existing investment',
    body: [
      'Most organisations already have strong people, platforms, and ideas in place.',
      'Dab Hands helps bring them together more effectively to increase impact and improve execution quality across the customer experience.',
    ],
  },
];

export default function HowItWorks() {
  const [openIntervention, setOpenIntervention] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>How it works — Dab Hands</title>
        <meta
          name="description"
          content="A senior-led delivery model built around critical digital initiatives. How Dab Hands brings clarity, alignment, and momentum to important work."
        />
      </Head>

      <Layout>
        {/* HERO */}
        <section className="bg-dab-cream text-dab-charcoal pt-36 md:pt-44 pb-20 md:pb-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">How it works</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[18ch]">
                A senior-led delivery model.
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-12 text-lg md:text-xl text-dab-charcoal/75 leading-relaxed max-w-[58ch]">
                Dab Hands is built around critical digital initiatives that cannot afford to drift. Designed to help organisations move faster, increase quality, reduce friction, and create more impact from existing investment.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* WHY ORGS BRING DAB HANDS IN */}
        <section className="bg-dab-white text-dab-charcoal py-28 md:py-40 border-t border-dab-charcoal/8">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[20ch] mx-auto text-center mb-16 md:mb-20">
                Why organisations bring Dab Hands in
              </h2>
            </FadeUp>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-0 max-w-[1024px] mx-auto">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15"
                >
                  <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-lg md:text-xl font-medium leading-tight">{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ACCORDION — WAYS DAB HANDS STEPS IN */}
        <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 border-t border-dab-charcoal/8">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="text-center mb-16 md:mb-20">
              <FadeUp>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">Intervention model</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[16ch] mx-auto">
                  Ways Dab Hands steps in
                </h2>
              </FadeUp>
              <FadeUp delay={0.16}>
                <div className="mt-8 space-y-2 text-[16px] md:text-[18px] text-dab-charcoal/70 leading-relaxed">
                  <p className="lg:whitespace-nowrap">Usually when important work starts drifting, slowing down, or fragmenting as it moves to market.</p>
                  <p className="lg:whitespace-nowrap">Dab Hands steps in to restore clarity, alignment, and quality of execution around the work.</p>
                </div>
              </FadeUp>
            </div>

            <div>
              {interventions.map((item, i) => {
                const isOpen = openIntervention === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="border-t border-dab-brown/30 last:border-b last:border-b-dab-brown/30 -mx-6 md:-mx-10 lg:-mx-16"
                  >
                    <button
                      onClick={() => setOpenIntervention(isOpen ? null : i)}
                      className="w-full py-7 md:py-8 px-6 md:px-10 lg:px-16 flex items-center justify-between text-left group gap-8 hover:bg-dab-green transition-colors duration-200"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-baseline gap-6 md:gap-8 flex-1">
                        <span className="font-mono text-[10px] tabular-nums tracking-widest text-dab-brown group-hover:text-dab-charcoal/70 flex-shrink-0 transition-colors duration-200">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xl md:text-2xl lg:text-[28px] font-medium text-dab-charcoal tracking-tight leading-tight transition-colors duration-200">
                          {item.title}
                        </span>
                      </div>
                      <span
                        className="text-2xl text-dab-charcoal/60 group-hover:text-dab-charcoal flex-shrink-0 transition duration-300"
                        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-10 lg:px-16">
                            <div className="pb-8 md:pb-10 pl-0 md:pl-[72px] pr-16 space-y-4 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed max-w-[55ch]">
                              {item.body.map((p, j) => (
                                <p key={j}>{p}</p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STATS — EXECUTION GAP */}
        <section className="bg-dab-charcoal text-dab-cream py-24 md:py-36 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h2 className="text-[35px] md:text-[51px] lg:text-[63px] font-semibold leading-[1.05] tracking-[-0.032em] max-w-[22ch] mb-20 md:mb-24">
                Most businesses don&rsquo;t lose on intent and ideas.{' '}
                <span className="text-dab-green">They lose on execution.</span>
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-0 border-t border-dab-brown/20">
              <FadeUp delay={0.1}>
                <div className="py-12 md:py-16 md:pr-16 md:border-r border-dab-brown/20">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown block mb-6">
                    Harvard Business Review
                  </span>
                  <p className="text-[72px] md:text-[96px] font-semibold leading-none tracking-[-0.04em] text-dab-green">
                    60<span className="text-[48px] md:text-[64px]">%</span>
                  </p>
                  <p className="text-[15px] md:text-[17px] text-dab-cream/60 leading-relaxed max-w-[36ch] mt-4">
                    of strategic targets are realised. The rest lost to execution failure.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.18}>
                <div className="py-12 md:py-16 md:pl-16 border-t md:border-t-0 border-dab-brown/20">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown block mb-6">
                    McKinsey &amp; Company
                  </span>
                  <p className="text-[72px] md:text-[96px] font-semibold leading-none tracking-[-0.04em] text-dab-green">
                    30<span className="text-[48px] md:text-[64px]">%</span>
                  </p>
                  <p className="text-[15px] md:text-[17px] text-dab-cream/60 leading-relaxed max-w-[36ch] mt-4">
                    of revenue lost to execution inefficiencies. Every year.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
