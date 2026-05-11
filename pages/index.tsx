import { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again, without losing what made it strong.',
    author: 'Joel Sinnott',
    title: 'Senior Digital Lead, Nike',
  },
  {
    quote: "He doesn't just deliver, he protects the integrity of the work as it moves through the system. That's rare.",
    author: 'Anthony Mahon',
    title: 'Global Membership Director, Hugo Boss',
  },
  {
    quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.',
    author: 'Meher Mumtaz',
    title: 'Digital Brand Director, Western Union',
  },
];

const capabilities = [
  { title: 'Platform and', subtitle: 'e-commerce.' },
  { title: 'Brand', subtitle: 'experience.' },
  { title: 'Campaigns.', subtitle: '' },
  { title: 'Always-on,', subtitle: 'membership and lifecycle.' },
];

const outcomes = [
  'More of your best work makes it through',
  'More of it lands with impact',
  'Tier-one thinking and output, without agency weight',
  'More of your investment actually pays off',
];

const interventions = [
  {
    title: 'Bring critical work back under control',
    description:
      'When important work starts drifting, confidence drops quickly. Decisions slow down, ownership fragments, and momentum disappears. DAB Hands steps in to restore clarity, stabilise delivery, and get the work moving again.',
  },
  {
    title: 'Protect the quality of the work',
    description:
      'Strong work often loses strength as it moves through teams, approvals, platforms, and timelines. DAB Hands helps maintain alignment, execution quality, and momentum as the work moves to market.',
  },
  {
    title: 'Align teams around the work',
    description:
      'Important initiatives rarely fail because people do not care. They fail because priorities, ownership, and decision-making become disconnected. DAB Hands creates alignment around the work so teams can move faster and execute more effectively.',
  },
  {
    title: 'Build the right senior team',
    description:
      'Some initiatives need additional capability at the right level. DAB Hands builds small senior teams around critical work to increase capability, sharpen execution, and raise the level of output.',
  },
];

const ConvergingLines = ({ color = '#FAFAFA' }: { color?: string }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {[...Array(11)].map((_, i) => {
      const startY = 50 + i * 30;
      return (
        <path
          key={i}
          d={`M 0 ${startY} Q 200 ${startY} 380 200`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity={0.9}
        />
      );
    })}
  </svg>
);

const LogoMark = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-12 md:h-14">
    <span className="text-dab-cream/90 font-semibold tracking-tight text-base md:text-lg uppercase">
      {name}
    </span>
  </div>
);

export default function Home() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-dab-cream text-dab-charcoal font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dab-cream/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-6 flex items-center justify-between border-b border-dab-charcoal/10">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-dab-green" />
            <span className="font-semibold text-lg tracking-tight">
              <span className="font-bold">DAB</span> hands
            </span>
          </div>
          <button aria-label="Menu" className="w-8 h-8 flex flex-col items-end justify-center gap-1.5 hover:opacity-70 transition">
            <span className="block w-7 h-px bg-dab-charcoal" />
            <span className="block w-7 h-px bg-dab-charcoal" />
            <span className="block w-7 h-px bg-dab-charcoal" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 pt-20 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[64px] md:text-[88px] lg:text-[112px] font-semibold leading-[0.95] tracking-[-0.04em] max-w-5xl"
        >
          Senior-led<br />
          digital delivery<br />
          for high-stakes<br />
          work.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="mt-16 grid md:grid-cols-2 gap-12 max-w-5xl"
        >
          <div>
            <p className="text-xl md:text-2xl text-dab-charcoal leading-snug font-medium">
              Small senior teams built around critical digital initiatives.
            </p>
          </div>
          <div className="space-y-4 text-dab-taupe text-base leading-relaxed">
            <p>
              Helping organisations maximise the impact of important work as it moves to market.
            </p>
            <p>
              Built to help digital teams move faster, increase quality, and get more from existing investment.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-dab-charcoal font-medium border-b border-dab-charcoal pb-1 hover:border-dab-green hover:text-dab-charcoal transition pt-4">
              Start a conversation
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Trusted by teams at */}
      <section className="bg-dab-charcoal text-dab-cream">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-24">
          <div className="flex items-start justify-between mb-12">
            <h2 className="text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
              Trusted by<br />teams at
            </h2>
            <button aria-label="More clients" className="text-dab-cream hover:text-dab-green transition mt-2">
              <span className="text-2xl">→</span>
            </button>
          </div>
          <div className="h-px bg-dab-cream/15 mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 items-center">
            <LogoMark name="Nike" />
            <LogoMark name="Hugo Boss" />
            <LogoMark name="Volkswagen" />
            <LogoMark name="Audi" />
            <LogoMark name="Unilever" />
            <LogoMark name="Western Union" />
          </div>
          <p className="mt-10 text-xs uppercase tracking-widest text-dab-taupe">+ More</p>
        </div>
      </section>

      {/* What it's like to work with me */}
      <section className="bg-dab-cream">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-24 md:py-32">
          <div className="flex items-start justify-between mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight max-w-2xl">
              What it&apos;s like<br />to work with me
            </h2>
            <a href="#testimonials" className="hidden md:inline-flex items-center gap-2 text-dab-charcoal font-medium border-b border-dab-charcoal pb-1 hover:border-dab-green transition">
              Read more
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="space-y-6">
                <div className="text-5xl text-dab-charcoal leading-none font-serif">&ldquo;</div>
                <p className="text-base text-dab-charcoal leading-relaxed">
                  {t.quote}
                </p>
                <div className="signal-line w-12" />
                <div>
                  <p className="font-semibold text-dab-charcoal">{t.author}</p>
                  <p className="text-xs uppercase tracking-widest text-dab-taupe mt-1">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where I've worked */}
      <section className="bg-dab-charcoal text-dab-cream">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
              Where I&apos;ve<br />worked
            </h2>
            <p className="text-dab-cream/80 text-base leading-relaxed max-w-md md:pt-4">
              Heavy delivery experience across digital for many global brands across multiple business sectors.
            </p>
          </div>

          <div className="h-px bg-dab-cream/15 mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {capabilities.map((c, i) => (
              <div key={i} className="space-y-4">
                <div className="w-8 h-8 text-dab-green">
                  {i === 0 && (
                    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                      <path d="M4 10l12-6 12 6-12 6L4 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M4 16l12 6 12-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M4 22l12 6 12-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {i === 1 && (
                    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                      <rect x="4" y="4" width="18" height="18" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="10" y="10" width="18" height="18" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )}
                  {i === 2 && (
                    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="16" cy="16" r="2" fill="currentColor"/>
                    </svg>
                  )}
                  {i === 3 && (
                    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                      <path d="M27 16a11 11 0 11-3.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M27 5v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-medium leading-tight">{c.title}</p>
                  {c.subtitle && <p className="text-xl md:text-2xl font-medium leading-tight">{c.subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My sweet spot - GREEN block */}
      <section className="bg-dab-green text-dab-charcoal">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
              My sweet spot
            </h2>
            <p className="text-dab-charcoal text-base leading-relaxed max-w-md md:pt-4">
              Digital brand experience — where strategy, ideas, product, and creative storytelling need to carry across the ecosystem and cut through in daily living.
            </p>
          </div>

          <div className="h-px bg-dab-charcoal/20 mb-10" />

          <div className="grid grid-cols-3 gap-6">
            <p className="text-3xl md:text-5xl font-semibold tracking-tight">Attention.</p>
            <p className="text-3xl md:text-5xl font-semibold tracking-tight">Connection.</p>
            <p className="text-3xl md:text-5xl font-semibold tracking-tight">Conversion.</p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-dab-cream">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-20">
          <div className="space-y-0">
            {outcomes.map((outcome, i) => (
              <a
                key={i}
                href="#contact"
                className="flex items-center justify-between py-6 border-b border-dab-charcoal/15 group hover:border-dab-green transition"
              >
                <div className="flex items-center gap-6">
                  <span className="text-dab-green text-2xl leading-none">+</span>
                  <span className="text-lg md:text-xl text-dab-charcoal font-medium">{outcome}</span>
                </div>
                <span className="text-dab-charcoal group-hover:text-dab-green group-hover:translate-x-1 transition-all" aria-hidden>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Interventions Accordion */}
      <section id="interventions" className="bg-dab-cream">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-24 md:py-32">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight mb-6">
              Ways DAB Hands<br />steps in
            </h2>
            <p className="text-dab-taupe text-base leading-relaxed">
              Usually when important work starts drifting, slowing down, or fragmenting as it moves to market. DAB Hands steps in to restore clarity, alignment, and quality of execution around the work.
            </p>
          </div>

          <div className="space-y-0">
            {interventions.map((item, i) => {
              const isOpen = expandedIndex === i;
              return (
                <div key={i} className="border-b border-dab-charcoal/15">
                  <button
                    onClick={() => setExpandedIndex(isOpen ? null : i)}
                    className="w-full py-7 flex items-center justify-between text-left group"
                  >
                    <span className="text-xl md:text-2xl font-medium text-dab-charcoal pr-8 group-hover:text-dab-charcoal/70 transition">
                      {item.title}
                    </span>
                    <span className={`text-2xl text-dab-charcoal transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden>+</span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 pr-12 text-dab-taupe leading-relaxed max-w-3xl">{item.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* When it has to land */}
      <section id="contact" className="bg-dab-charcoal text-dab-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-24 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-tight mb-12">
                When it has<br />to land,<br />
                <span className="text-dab-green">bring me in.</span>
              </h2>

              <a href="mailto:db@dabhands.delivery" className="inline-flex items-center gap-3 text-dab-green border-b border-dab-green pb-1 hover:opacity-80 transition">
                Start a conversation
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="relative h-64 md:h-96">
              <ConvergingLines color="#FAFAFA" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dab-charcoal text-dab-cream border-t border-dab-cream/10">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-dab-green" />
              <span className="font-semibold text-base tracking-tight">
                <span className="font-bold">DAB</span> hands
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-dab-taupe">
              <a href="mailto:db@dabhands.delivery" className="hover:text-dab-green transition">db@dabhands.delivery</a>
              <a href="tel:+447788711433" className="hover:text-dab-green transition">+44 7788 711433</a>
            </div>
            <p className="text-xs text-dab-taupe">© 2025 DAB Hands. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
