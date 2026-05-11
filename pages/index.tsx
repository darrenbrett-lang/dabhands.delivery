import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

// ============== DATA ==============

const challenges = [
  { label: 'Get a critical initiative back on track', target: 'intervention-0' },
  { label: 'Align teams around important work', target: 'intervention-2' },
  { label: 'Protect a launch or campaign as it goes to market', target: 'intervention-1' },
  { label: 'Bring clarity to a complex programme', target: 'intervention-4' },
  { label: 'Build the right senior team around a key initiative', target: 'intervention-3' },
  { label: 'Increase the impact of existing investment', target: 'intervention-5' },
  { label: 'Move faster without traditional agency overhead', target: 'intervention-4' },
];

const interventions = [
  {
    title: 'Bring critical work back under control',
    body: [
      'When important work starts drifting, confidence drops quickly. Decisions slow down, ownership fragments, and momentum disappears.',
      'DAB Hands steps in to restore clarity, stabilise delivery, and get the work moving again.',
    ],
  },
  {
    title: 'Protect the quality of the work',
    body: [
      'Strong work often loses strength as it moves through teams, approvals, platforms, and timelines.',
      'DAB Hands helps maintain alignment, execution quality, and momentum as the work moves to market.',
    ],
  },
  {
    title: 'Align teams around the work',
    body: [
      'Important initiatives rarely fail because people do not care. They fail because priorities, ownership, and decision-making become disconnected.',
      'DAB Hands creates alignment around the work so teams can move faster and execute more effectively.',
    ],
  },
  {
    title: 'Build the right senior team',
    body: [
      'Some initiatives need additional capability at the right level.',
      'DAB Hands builds small senior teams around critical work to increase capability, sharpen execution, and raise the level of output.',
    ],
  },
  {
    title: 'Improve how the work moves',
    body: [
      'Sometimes the issue is not the strategy or creative. It is how the work is operating.',
      'DAB Hands reduces friction, clarifies ownership, and improves delivery flow across teams and stakeholders.',
    ],
  },
  {
    title: 'Get more from existing investment',
    body: [
      'Most organisations already have strong people, platforms, and ideas in place.',
      'DAB Hands helps bring them together more effectively to increase impact and improve execution quality across the customer experience.',
    ],
  },
];

const clients = [
  'Nike', 'Volkswagen', 'Audi', 'Hugo Boss', 'Tommy Hilfiger', 'Unilever',
  'Johnson & Johnson', 'Royal Mail', 'Parcelforce', 'Post Office',
  'Fortnum & Mason', 'Falabella', 'Palantir',
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
  'Platform and e-commerce.',
  'Digital brand experience.',
  'Campaigns and launches.',
  'Always-on ecosystems.',
  'Membership and lifecycle.',
  'Cross-functional delivery leadership.',
];

const reasons = [
  'Stronger alignment around important work',
  'Faster movement through complex delivery environments',
  'Higher-quality execution across the customer experience',
  'More impact from existing investment',
];

// ============== COMPONENTS ==============

const SignalLines = ({ color = '#121212', opacity = 0.9 }: { color?: string; opacity?: number }) => (
  <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
    {[...Array(14)].map((_, i) => {
      const startY = 40 + i * 30;
      return (
        <motion.path
          key={i}
          d={`M 0 ${startY} Q 400 ${startY} 780 250`}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          opacity={opacity}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.8, delay: i * 0.05, ease: 'easeOut' }}
        />
      );
    })}
  </svg>
);

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-8">
    <span className="w-2 h-2 rounded-full bg-dab-green" />
    <span className="text-xs uppercase tracking-[0.18em] text-dab-taupe font-medium">{children}</span>
  </div>
);

// ============== PAGE ==============

export default function Home() {
  const [openIntervention, setOpenIntervention] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [logoIndex, setLogoIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setLogoIndex((i) => (i + 1) % clients.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const handleChallengeSelect = (value: string) => {
    setSelectedChallenge(value);
    const challenge = challenges.find((c) => c.label === value);
    if (challenge) {
      setTimeout(() => {
        const el = document.getElementById(challenge.target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const idx = parseInt(challenge.target.split('-')[1], 10);
          setOpenIntervention(idx);
        }
      }, 100);
    }
  };

  return (
    <>
      <Head>
        <title>DAB Hands — Senior-led digital delivery for high-stakes work.</title>
        <meta name="description" content="Small senior teams built around critical digital initiatives. Helping organisations maximise the impact of important work as it moves to market." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-dab-cream text-dab-charcoal antialiased">

        {/* ============== HEADER ============== */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dab-cream/85 backdrop-blur-xl border-b border-dab-charcoal/8' : 'bg-transparent'}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="w-2.5 h-2.5 rounded-full bg-dab-green" />
              <span className="font-semibold text-[15px] tracking-tight">
                <span className="font-bold">DAB</span> hands
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-10">
              <a href="#approach" className="text-sm text-dab-charcoal/80 hover:text-dab-charcoal transition">Approach</a>
              <a href="#about" className="text-sm text-dab-charcoal/80 hover:text-dab-charcoal transition">About</a>
              <a href="#work" className="text-sm text-dab-charcoal/80 hover:text-dab-charcoal transition">Work</a>
              <a href="#interventions" className="text-sm text-dab-charcoal/80 hover:text-dab-charcoal transition">Interventions</a>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium border border-dab-charcoal/80 px-4 py-2 hover:bg-dab-charcoal hover:text-dab-cream transition">
                Start a conversation
              </a>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="md:hidden w-8 h-8 flex flex-col items-end justify-center gap-1.5 hover:opacity-70 transition"
            >
              <span className={`block w-7 h-px bg-dab-charcoal transition-transform ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block w-7 h-px bg-dab-charcoal transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-7 h-px bg-dab-charcoal transition-transform ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </header>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-dab-cream pt-24 px-8 md:hidden"
            >
              <nav className="flex flex-col gap-8 text-3xl font-semibold">
                {[
                  { label: 'Approach', href: '#approach' },
                  { label: 'About', href: '#about' },
                  { label: 'Work', href: '#work' },
                  { label: 'Interventions', href: '#interventions' },
                  { label: 'Start a conversation', href: '#contact' },
                ].map((item, i) => (
                  <motion.a
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-dab-green transition"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="top">

          {/* ============== HERO ============== */}
          <section className="pt-32 md:pt-40 pb-24 md:pb-32 relative">
            {/* Subtle ambient signal lines on right */}
            <div className="absolute right-0 top-32 w-1/3 h-[480px] opacity-[0.06] pointer-events-none hidden md:block">
              <SignalLines color="#121212" opacity={1} />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
              <FadeUp>
                <h1 className="text-[44px] sm:text-[64px] md:text-[88px] lg:text-[108px] font-semibold leading-[0.95] tracking-[-0.04em] max-w-[18ch]">
                  Senior-led digital delivery for high-stakes work.
                </h1>
              </FadeUp>

              <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.1} className="md:col-span-5">
                  <p className="text-xl md:text-2xl font-medium text-dab-charcoal leading-snug tracking-tight">
                    Small senior teams built around critical digital initiatives.
                  </p>
                </FadeUp>

                <FadeUp delay={0.2} className="md:col-span-6 md:col-start-7 space-y-4">
                  <p className="text-base md:text-lg text-dab-charcoal/75 leading-relaxed">
                    Helping organisations maximise the impact of important work as it moves to market.
                  </p>
                  <p className="text-base md:text-lg text-dab-charcoal/75 leading-relaxed">
                    Built to help digital teams move faster, increase quality, and get more from existing investment.
                  </p>
                </FadeUp>
              </div>

              {/* I need to... selector */}
              <FadeUp delay={0.35} className="mt-20 md:mt-24 max-w-2xl">
                <div className="space-y-4">
                  <label htmlFor="challenge" className="block text-xs uppercase tracking-[0.18em] text-dab-taupe font-medium">
                    I need to…
                  </label>
                  <div className="relative">
                    <select
                      id="challenge"
                      value={selectedChallenge}
                      onChange={(e) => handleChallengeSelect(e.target.value)}
                      className="w-full appearance-none bg-transparent border-b-2 border-dab-charcoal text-dab-charcoal text-lg md:text-xl py-4 pr-10 cursor-pointer focus:outline-none focus:border-dab-green transition font-medium"
                    >
                      <option value="">Select an option</option>
                      {challenges.map((c) => (
                        <option key={c.label} value={c.label}>{c.label}</option>
                      ))}
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-dab-charcoal">
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>

                <a href="#contact" className="inline-flex items-center gap-3 text-dab-charcoal font-medium mt-10 group">
                  <span className="border-b border-dab-charcoal pb-1 group-hover:border-dab-green transition">Start a conversation</span>
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                </a>
              </FadeUp>
            </div>
          </section>

          {/* ============== WHERE ARE WE? (DARK) ============== */}
          <section id="approach" className="bg-dab-charcoal text-dab-cream relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36 relative">
              <FadeUp>
                <SectionLabel>01 — Commercial tension</SectionLabel>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-[44px] md:text-[72px] lg:text-[88px] font-semibold leading-[0.95] tracking-[-0.04em] max-w-[14ch]">
                  Where are we?
                </h2>
              </FadeUp>

              <div className="mt-20 md:mt-24 grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.15} className="md:col-span-7 md:col-start-1 space-y-10 max-w-[60ch]">
                  <p className="text-2xl md:text-3xl font-medium leading-[1.2] tracking-tight text-dab-cream">
                    The tools are changing. The problems aren&apos;t.<br/>
                    Complexity is higher than ever.
                  </p>

                  <div className="space-y-5 text-base md:text-lg text-dab-cream/70 leading-relaxed">
                    <p>Inside the business, friction slows the work.</p>
                    <p>Outside, competition for attention is relentless.</p>
                    <p>More of the right work needs to get through.<br/>And more of the budget needs to go into the work itself.</p>
                  </div>
                </FadeUp>

                <FadeUp delay={0.25} className="md:col-span-5 md:col-start-8">
                  <div className="border-l border-dab-green pl-6 md:pl-10 py-2">
                    <p className="text-2xl md:text-3xl font-semibold leading-[1.15] tracking-tight text-dab-cream">
                      Great ideas aren&apos;t the problem.
                      <br/>
                      <span className="text-dab-green">Getting them through is.</span>
                    </p>
                  </div>

                  <div className="mt-10 space-y-4 text-base md:text-lg text-dab-cream/70 leading-relaxed">
                    <p>Teams pull in different directions.</p>
                    <p>Decision-making slows down.</p>
                    <p>Ownership becomes fragmented.</p>
                    <p className="pt-4">What started strong becomes diluted as it moves through the organisation. By the time it reaches the customer, the outcome is weaker than it should have been.</p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ============== WHERE IMPORTANT WORK GETS STRONGER ============== */}
          <section className="bg-dab-cream relative">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36">
              <FadeUp>
                <SectionLabel>02 — Operational truth</SectionLabel>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-[44px] md:text-[72px] lg:text-[88px] font-semibold leading-[0.95] tracking-[-0.04em] max-w-[16ch]">
                  Where important work gets stronger
                </h2>
              </FadeUp>

              <div className="mt-20 md:mt-24 grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.15} className="md:col-span-7 space-y-8 max-w-[60ch]">
                  <p className="text-xl md:text-2xl font-medium text-dab-charcoal leading-[1.3] tracking-tight">
                    DAB Hands steps in to create clarity, alignment, and momentum around critical initiatives.
                  </p>

                  <ul className="space-y-3 text-base md:text-lg text-dab-charcoal/80">
                    {[
                      'Bringing the right people together.',
                      'Strengthening decision-making.',
                      'Reducing friction.',
                      'Raising the quality of execution.',
                    ].map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 * i }}
                        className="flex items-center gap-4"
                      >
                        <span className="w-6 h-px bg-dab-green flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </FadeUp>

                <FadeUp delay={0.25} className="md:col-span-5 space-y-6 text-base md:text-lg text-dab-charcoal/75 leading-relaxed">
                  <p>Keeping momentum high, alignment clear, and the quality of important work intact as it moves through the organisation.</p>
                  <p>Building small senior teams around critical initiatives to increase capability, sharpen execution, and raise the level of the work.</p>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ============== ABOUT / DARREN BRETT ============== */}
          <section id="about" className="bg-dab-cream border-t border-dab-charcoal/10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36">
              <FadeUp>
                <SectionLabel>03 — Senior leadership</SectionLabel>
              </FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
                {/* Photo placeholder */}
                <FadeUp delay={0.1} className="md:col-span-5">
                  <div className="aspect-[4/5] bg-dab-charcoal relative overflow-hidden">
                    {/* Stylised converging-lines portrait placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full opacity-30">
                        <SignalLines color="#B7FF00" opacity={0.6} />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                      <span className="text-xs uppercase tracking-[0.18em] text-dab-cream/60 font-medium mb-2">Darren Brett</span>
                      <span className="text-2xl md:text-3xl font-semibold text-dab-cream tracking-tight">Founder, DAB Hands</span>
                    </div>
                  </div>
                </FadeUp>

                <FadeUp delay={0.2} className="md:col-span-7 md:pt-4 space-y-6">
                  <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-semibold leading-[1] tracking-[-0.03em]">
                    Darren Brett
                  </h2>

                  <div className="space-y-5 text-base md:text-lg text-dab-charcoal/80 leading-relaxed max-w-[55ch]">
                    <p>More than 20 years leading complex digital delivery across global brands, platforms, campaigns, and customer experience programmes.</p>
                    <p>Running an agency and owning operations, delivery, and product has shaped how I align teams, manage complexity, and keep important work moving under pressure.</p>
                    <p>A key strength is the ability to move fluidly between strategic, creative, operational, and executional thinking, bringing the right people together and raising the level of the work around critical initiatives.</p>
                    <p>DAB Hands is built around that model. Senior leadership, specialist capability, and clear accountability focused on the work itself.</p>
                    <p className="pt-2 font-medium text-dab-charcoal">Bring me in to lead delivery around a critical initiative, or scale through DAB Hands to a trusted senior team built around the work.</p>
                  </div>

                  <a href="#contact" className="inline-flex items-center gap-3 text-dab-charcoal font-medium pt-4 group">
                    <span className="border-b border-dab-charcoal pb-1 group-hover:border-dab-green transition">Start a conversation</span>
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                  </a>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ============== TEAMS BEHIND THE WORK ============== */}
          <section className="bg-dab-cream border-t border-dab-charcoal/10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
              <FadeUp>
                <SectionLabel>04 — Capability density</SectionLabel>
              </FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.1} className="md:col-span-6">
                  <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-semibold leading-[0.98] tracking-[-0.03em] max-w-[12ch]">
                    The teams behind the work
                  </h2>
                </FadeUp>

                <FadeUp delay={0.2} className="md:col-span-6 space-y-6 text-base md:text-lg text-dab-charcoal/80 leading-relaxed">
                  <p>DAB Hands is supported by a trusted network of senior operators, strategists, creatives, producers, and specialists.</p>
                  <p>People I have delivered with for years. Leaders in their fields. Brought in around the initiative when needed.</p>
                  <div className="pt-4 grid grid-cols-1 gap-1 text-dab-charcoal font-medium">
                    <span>Small senior teams.</span>
                    <span>Clear accountability.</span>
                    <span>Built around the work itself.</span>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ============== LOGO CAROUSEL (DARK) ============== */}
          <section id="work" className="bg-dab-charcoal text-dab-cream py-20 md:py-24 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-12">
              <FadeUp>
                <SectionLabel>05 — Delivered at scale for</SectionLabel>
              </FadeUp>
            </div>

            {/* Continuous scrolling logo carousel */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-dab-charcoal to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-dab-charcoal to-transparent pointer-events-none" />

              <div className="overflow-hidden" ref={carouselRef}>
                <motion.div
                  className="flex gap-16 md:gap-24 whitespace-nowrap"
                  animate={{ x: [0, -2000] }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                >
                  {[...clients, ...clients, ...clients].map((c, i) => (
                    <div
                      key={`${c}-${i}`}
                      className="text-2xl md:text-3xl font-semibold tracking-tight text-dab-cream/40 hover:text-dab-cream transition-colors duration-300 flex-shrink-0"
                    >
                      {c}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ============== TESTIMONIALS ============== */}
          <section className="bg-dab-cream py-24 md:py-36">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp>
                <SectionLabel>06 — Trusted to lead important work</SectionLabel>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-semibold leading-[0.98] tracking-[-0.03em] max-w-[14ch] mb-16 md:mb-20">
                  Trusted to lead important work
                </h2>
              </FadeUp>

              <div className="grid md:grid-cols-3 gap-12 md:gap-14">
                {testimonials.map((t, i) => (
                  <FadeUp key={t.author} delay={0.1 * i}>
                    <div className="space-y-6">
                      <div className="text-6xl text-dab-green leading-none font-serif -mb-2" aria-hidden>&ldquo;</div>
                      <p className="text-base md:text-lg text-dab-charcoal leading-relaxed">
                        {t.quote}
                      </p>
                      <div className="h-px w-10 bg-dab-green" />
                      <div>
                        <p className="font-semibold text-dab-charcoal text-base">{t.author}</p>
                        <p className="text-xs uppercase tracking-[0.15em] text-dab-taupe mt-1.5">{t.title}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          {/* ============== EXPERIENCE ACROSS ============== */}
          <section className="bg-dab-cream border-t border-dab-charcoal/10 py-24 md:py-32">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp>
                <SectionLabel>07 — Experience across</SectionLabel>
              </FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.1} className="md:col-span-5">
                  <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-semibold leading-[0.98] tracking-[-0.03em]">
                    Experience<br />across
                  </h2>
                </FadeUp>

                <div className="md:col-span-7">
                  <div className="space-y-0">
                    {experienceAreas.map((area, i) => (
                      <motion.div
                        key={area}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        className="flex items-center gap-5 py-5 border-b border-dab-charcoal/15 group"
                      >
                        <span className="text-dab-taupe text-xs tabular-nums tracking-widest w-8">{String(i + 1).padStart(2, '0')}</span>
                        <span className="w-2 h-2 rounded-full bg-dab-green group-hover:scale-150 transition-transform" />
                        <span className="text-lg md:text-xl text-dab-charcoal font-medium">{area}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============== BUILT FOR ============== */}
          <section className="bg-dab-cream py-24 md:py-32">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp>
                <SectionLabel>08 — Built for</SectionLabel>
              </FadeUp>

              <div className="grid md:grid-cols-12 gap-10">
                <FadeUp delay={0.1} className="md:col-span-3">
                  <h2 className="text-[36px] md:text-[56px] font-semibold leading-[0.98] tracking-[-0.03em]">
                    Built for
                  </h2>
                </FadeUp>

                <FadeUp delay={0.2} className="md:col-span-8 md:col-start-5">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-dab-charcoal leading-[1.2] tracking-tight max-w-[26ch]">
                    Complex digital initiatives where strategy, creative, product, platforms, and customer experience need to move together at high quality and pace.
                  </p>

                  <a href="#contact" className="inline-flex items-center gap-3 text-dab-charcoal font-medium pt-10 group">
                    <span className="border-b border-dab-charcoal pb-1 group-hover:border-dab-green transition">Start a conversation</span>
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                  </a>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ============== WHY ORGS BRING DAB HANDS IN (GREEN) ============== */}
          <section className="bg-dab-green text-dab-charcoal py-20 md:py-28">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp>
                <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-semibold leading-[0.98] tracking-[-0.03em] max-w-[18ch] mb-14">
                  Why organisations bring DAB Hands in
                </h2>
              </FadeUp>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {reasons.map((reason, i) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-5 py-4 border-t border-dab-charcoal/20"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="flex-shrink-0 mt-1">
                      <path d="M5 11l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-lg md:text-xl text-dab-charcoal font-medium leading-tight">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ============== INTERVENTIONS ACCORDION ============== */}
          <section id="interventions" className="bg-dab-cream py-24 md:py-36">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp>
                <SectionLabel>09 — Intervention model</SectionLabel>
              </FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-20">
                <FadeUp delay={0.1} className="md:col-span-7">
                  <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-semibold leading-[0.98] tracking-[-0.03em] max-w-[14ch]">
                    Ways DAB Hands steps in
                  </h2>
                </FadeUp>

                <FadeUp delay={0.2} className="md:col-span-5 md:pt-4 space-y-4 text-base md:text-lg text-dab-charcoal/75 leading-relaxed">
                  <p>Usually when important work starts drifting, slowing down, or fragmenting as it moves to market.</p>
                  <p>DAB Hands steps in to restore clarity, alignment, and quality of execution around the work.</p>
                </FadeUp>
              </div>

              <div className="space-y-0">
                {interventions.map((item, i) => {
                  const isOpen = openIntervention === i;
                  return (
                    <motion.div
                      key={i}
                      id={`intervention-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className="border-t border-dab-charcoal/15 last:border-b"
                    >
                      <button
                        onClick={() => setOpenIntervention(isOpen ? null : i)}
                        className="w-full py-7 md:py-8 flex items-center justify-between text-left group gap-6"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-baseline gap-6 md:gap-8 flex-1">
                          <span className="text-xs tabular-nums tracking-widest text-dab-taupe">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-xl md:text-2xl lg:text-3xl font-medium text-dab-charcoal leading-tight tracking-tight group-hover:text-dab-charcoal/70 transition">
                            {item.title}
                          </span>
                        </div>
                        <span
                          className="text-3xl text-dab-charcoal transition-transform duration-300 flex-shrink-0"
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
                            <div className="pb-8 md:pb-10 pl-0 md:pl-[68px] pr-12 space-y-4 text-base md:text-lg text-dab-charcoal/80 leading-relaxed max-w-[60ch]">
                              {item.body.map((p, j) => (
                                <p key={j}>{p}</p>
                              ))}
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

          {/* ============== STATS / EXECUTION (DARK) ============== */}
          <section className="bg-dab-charcoal text-dab-cream py-24 md:py-36 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.04] pointer-events-none">
              <SignalLines color="#B7FF00" opacity={1} />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
              <FadeUp>
                <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-semibold leading-[1] tracking-[-0.03em] max-w-[18ch]">
                  Most businesses don&apos;t lose on intent and ideas.<br/>
                  <span className="text-dab-green">They lose on execution.</span>
                </h2>
              </FadeUp>

              <div className="mt-20 md:mt-24 grid md:grid-cols-2 gap-12 md:gap-20">
                <FadeUp delay={0.15}>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-dab-taupe font-medium">Harvard Business Review</p>
                    <p className="text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight">
                      Only around <span className="text-dab-green">60%</span> of strategic targets are realised.
                    </p>
                  </div>
                </FadeUp>

                <FadeUp delay={0.25}>
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-dab-taupe font-medium">McKinsey &amp; Company</p>
                    <p className="text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight">
                      <span className="text-dab-green">20–30%</span> of revenue is lost to execution inefficiencies.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ============== FINAL CTA (DARK) ============== */}
          <section id="contact" className="bg-dab-charcoal text-dab-cream relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36 relative">
              <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                <div className="md:col-span-7 relative z-10">
                  <FadeUp>
                    <h2 className="text-[44px] md:text-[68px] lg:text-[88px] font-semibold leading-[0.95] tracking-[-0.04em] max-w-[14ch]">
                      When important work needs to <span className="text-dab-green">land properly</span>, bring DAB Hands in.
                    </h2>
                  </FadeUp>

                  <FadeUp delay={0.15}>
                    <div className="mt-12 space-y-4 text-base md:text-lg text-dab-cream/75 leading-relaxed max-w-[50ch]">
                      <p>If a critical initiative is drifting, slowing down, or becoming fragmented, let&apos;s talk.</p>
                      <p>Just a clear conversation about what is getting in the way and what needs to move next.</p>
                    </div>
                  </FadeUp>

                  <FadeUp delay={0.25}>
                    <a
                      href="mailto:db@dabhands.delivery"
                      className="inline-flex items-center gap-3 mt-12 text-dab-green text-lg md:text-xl font-medium group"
                    >
                      <span className="border-b border-dab-green pb-1.5">Start a conversation</span>
                      <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                    </a>
                  </FadeUp>

                  <FadeUp delay={0.35}>
                    <div className="mt-12 pt-8 border-t border-dab-cream/15 flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm text-dab-cream/70">
                      <a href="mailto:db@dabhands.delivery" className="hover:text-dab-green transition flex items-center gap-2">
                        <span>✉</span> db@dabhands.delivery
                      </a>
                      <a href="tel:+447788711433" className="hover:text-dab-green transition flex items-center gap-2">
                        <span>✆</span> 07788 711433
                      </a>
                    </div>
                  </FadeUp>
                </div>

                <div className="md:col-span-5 relative h-80 md:h-[480px]">
                  <SignalLines color="#FAFAFA" opacity={0.9} />
                </div>
              </div>
            </div>
          </section>

          {/* ============== FOOTER ============== */}
          <footer className="bg-dab-charcoal text-dab-cream border-t border-dab-cream/10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-dab-green" />
                  <span className="font-semibold text-[15px] tracking-tight">
                    <span className="font-bold">DAB</span> hands
                  </span>
                </div>
                <p className="text-xs text-dab-taupe">© 2025 DAB Hands. Senior-led digital delivery.</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
