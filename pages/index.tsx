import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

// ─── DATA ────────────────────────────────────────────────────────────────────

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
    body: ['When important work starts drifting, confidence drops quickly. Decisions slow down, ownership fragments, and momentum disappears.', 'DAB Hands steps in to restore clarity, stabilise delivery, and get the work moving again.'],
  },
  {
    title: 'Protect the quality of the work',
    body: ['Strong work often loses strength as it moves through teams, approvals, platforms, and timelines.', 'DAB Hands helps maintain alignment, execution quality, and momentum as the work moves to market.'],
  },
  {
    title: 'Align teams around the work',
    body: ['Important initiatives rarely fail because people do not care. They fail because priorities, ownership, and decision-making become disconnected.', 'DAB Hands creates alignment around the work so teams can move faster and execute more effectively.'],
  },
  {
    title: 'Build the right senior team',
    body: ['Some initiatives need additional capability at the right level.', 'DAB Hands builds small senior teams around critical work to increase capability, sharpen execution, and raise the level of output.'],
  },
  {
    title: 'Improve how the work moves',
    body: ['Sometimes the issue is not the strategy or creative. It is how the work is operating.', 'DAB Hands reduces friction, clarifies ownership, and improves delivery flow across teams and stakeholders.'],
  },
  {
    title: 'Get more from existing investment',
    body: ['Most organisations already have strong people, platforms, and ideas in place.', 'DAB Hands helps bring them together more effectively to increase impact and improve execution quality across the customer experience.'],
  },
];

const clients = ['Nike', 'Volkswagen', 'Audi', 'Hugo Boss', 'Tommy Hilfiger', 'Unilever', 'Johnson & Johnson', 'Royal Mail', 'Parcelforce', 'Post Office', 'Fortnum & Mason', 'Falabella', 'Palantir'];

const testimonials = [
  { quote: 'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.', author: 'Joel Sinnott', title: 'Senior Digital Lead, Nike' },
  { quote: "He doesn't just deliver. He protects the integrity of the work as it moves through the system. That's rare.", author: 'Anthony Mahon', title: 'Global Membership Director, Hugo Boss' },
  { quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.', author: 'Meher Mumtaz', title: 'Digital Brand Director, Western Union' },
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

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Palantir-style monospace section label
const Label = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-10 md:mb-14">
    <span className="font-mono text-[10px] tracking-[0.2em] text-dab-green">{index}</span>
    <span className="w-6 h-px bg-dab-brown" />
    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown">{children}</span>
  </div>
);

// Palantir-style converging signal lines
const SignalLines = ({ color = '#FAFAFA', opacity = 0.12, animated = false }: { color?: string; opacity?: number; animated?: boolean }) => (
  <svg viewBox="0 0 900 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
    {[...Array(16)].map((_, i) => {
      const startY = 20 + i * 34;
      const d = `M 0 ${startY} Q 450 ${startY + (i % 2 === 0 ? 20 : -20)} 880 280`;
      return animated ? (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="1"
          style={{ opacity }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: i * 0.07, ease: 'easeOut' }}
        />
      ) : (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
      );
    })}
  </svg>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [openIntervention, setOpenIntervention] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChallengeSelect = (value: string) => {
    setSelectedChallenge(value);
    const challenge = challenges.find((c) => c.label === value);
    if (!challenge) return;
    setTimeout(() => {
      const el = document.getElementById(challenge.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setOpenIntervention(parseInt(challenge.target.split('-')[1], 10));
      }
    }, 120);
  };

  return (
    <>
      <Head>
        <title>DAB Hands — Senior-led digital delivery for high-stakes work.</title>
        <meta name="description" content="Small senior teams built around critical digital initiatives. Helping organisations maximise the impact of important work as it moves to market." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-dab-cream text-dab-charcoal antialiased">

        {/* ── HEADER ────────────────────────────────── */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-dab-charcoal ${scrolled ? 'border-b border-dab-brown/15' : ''}`}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3 group" aria-label="DAB Hands home">
              <div className="w-[14px] h-[14px] rounded-full bg-dab-green" />
              <span className="font-semibold text-[19px] tracking-[-0.02em] text-dab-cream">
                <span className="font-bold">DAB</span> hands
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
              {[['#approach', 'Approach'], ['#about', 'About'], ['#work', 'Work'], ['#interventions', 'Interventions']].map(([href, label]) => (
                <a key={href} href={href} className="font-mono text-[11px] tracking-[0.15em] uppercase text-dab-cream/60 hover:text-dab-cream transition">{label}</a>
              ))}
              <a href="#contact" className="font-mono text-[11px] tracking-[0.12em] uppercase border border-dab-cream/40 text-dab-cream px-5 py-2.5 hover:bg-dab-cream hover:text-dab-charcoal hover:border-dab-cream transition">
                Start a conversation
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="md:hidden w-8 h-8 flex flex-col items-end justify-center gap-[6px]">
              <span className={`block h-px bg-dab-cream transition-all duration-300 ${menuOpen ? 'w-7 rotate-45 translate-y-[7px]' : 'w-7'}`} />
              <span className={`block h-px bg-dab-cream transition-all duration-300 ${menuOpen ? 'opacity-0 w-7' : 'w-5'}`} />
              <span className={`block h-px bg-dab-cream transition-all duration-300 ${menuOpen ? 'w-7 -rotate-45 -translate-y-[7px]' : 'w-7'}`} />
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-dab-charcoal text-dab-cream pt-28 px-8 md:hidden flex flex-col justify-between pb-12"
            >
              <nav className="flex flex-col gap-2">
                {[['#approach', 'Approach'], ['#about', 'About'], ['#work', 'Work'], ['#interventions', 'Interventions'], ['#contact', 'Start a conversation']].map(([href, label], i) => (
                  <motion.a key={href} href={href} onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06 }}
                    className="text-3xl font-semibold tracking-tight py-3 border-b border-dab-brown/20 hover:text-dab-green transition"
                  >{label}</motion.a>
                ))}
              </nav>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown">DAB Hands — Senior Delivery</p>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="top">

          {/* ── HERO ──────────────────────────────────── */}
          <section className="relative pt-36 md:pt-44 pb-28 md:pb-36 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
              <SignalLines color="#0E0E0E" opacity={1} />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-dab-green/40" />

            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 relative">
              <FadeUp>
                <div className="flex items-center gap-4 mb-10">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-dab-green">DABHANDS.DELIVERY</span>
                  <span className="w-8 h-px bg-dab-green/50" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown">Senior Delivery</span>
                </div>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h1 className="text-[47px] sm:text-[64px] md:text-[84px] lg:text-[106px] xl:text-[121px] font-semibold leading-[0.93] tracking-[-0.042em] max-w-[16ch]">
                  Senior-led digital delivery for high-stakes work.
                </h1>
              </FadeUp>

              {/* Copy block + dropdown side by side */}
              <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16 items-start">

                {/* Left — stacked copy */}
                <FadeUp delay={0.14} className="md:col-span-5 space-y-5">
                  <p className="text-xl md:text-[22px] font-medium leading-snug tracking-[-0.02em] text-dab-charcoal">
                    Small senior teams built around critical digital initiatives.
                  </p>
                  <p className="text-base md:text-[17px] text-dab-charcoal/60 leading-relaxed">
                    Helping organisations maximise the impact of important work as it moves to market.
                  </p>
                  <p className="text-base md:text-[17px] text-dab-charcoal/60 leading-relaxed">
                    Built to help digital teams move faster, increase quality, and get more from existing investment.
                  </p>
                </FadeUp>

                {/* Right — black dropdown panel */}
                <FadeUp delay={0.22} className="md:col-span-5 md:col-start-8">
                  <div className="bg-dab-brown text-dab-charcoal p-7 md:p-8">
                    <label htmlFor="challenge" className="block font-mono text-[10px] tracking-[0.22em] uppercase text-dab-charcoal/50 mb-6">
                      I need to…
                    </label>
                    <div className="relative border-b border-dab-charcoal/25 focus-within:border-dab-charcoal transition-colors">
                      <select
                        id="challenge"
                        value={selectedChallenge}
                        onChange={(e) => handleChallengeSelect(e.target.value)}
                        className="w-full appearance-none bg-transparent text-dab-charcoal text-base md:text-[17px] py-3.5 pr-8 cursor-pointer focus:outline-none font-medium"
                      >
                        <option value="" className="bg-dab-brown">Select an option</option>
                        {challenges.map((c) => (
                          <option key={c.label} value={c.label} className="bg-dab-brown">{c.label}</option>
                        ))}
                      </select>
                      <svg className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-dab-charcoal/60" width="11" height="7" viewBox="0 0 12 7" fill="none">
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="mt-7 pt-6 border-t border-dab-charcoal/15">
                      <a href="#contact" className="inline-flex items-center gap-2.5 group text-dab-charcoal/60 text-sm font-mono tracking-[0.1em] uppercase hover:text-dab-charcoal transition">
                        <span>Start a conversation</span>
                        <span className="text-dab-charcoal group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                      </a>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── WHERE ARE WE? ─────────────────────────── */}
          <section id="approach" className="bg-dab-charcoal text-dab-cream relative overflow-hidden dot-grid">
            {/* Brown accent bar */}
            <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />

            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36 relative">
              <FadeUp><Label index="01">Commercial tension</Label></FadeUp>

              <FadeUp delay={0.08}>
                <h2 className="text-[39px] md:text-[66px] lg:text-[82px] font-semibold leading-[0.95] tracking-[-0.042em] max-w-[12ch]">
                  Where are we?
                </h2>
              </FadeUp>

              <div className="mt-20 md:mt-24 grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.12} className="md:col-span-6 space-y-8 max-w-[58ch]">
                  <p className="text-2xl md:text-3xl font-medium leading-[1.2] tracking-[-0.02em]">
                    The tools are changing. The problems aren&apos;t.<br/>
                    Complexity is higher than ever.
                  </p>
                  <div className="space-y-5 text-[15px] md:text-[17px] text-dab-cream/60 leading-relaxed">
                    <p>Inside the business, friction slows the work. Outside, competition for attention is relentless.</p>
                    <p>More of the right work needs to get through. And more of the budget needs to go into the work itself.</p>
                  </div>
                </FadeUp>

                <FadeUp delay={0.22} className="md:col-span-5 md:col-start-8">
                  {/* Palantir-style callout block with brown border */}
                  <div className="border-l-2 border-dab-brown pl-8 py-2">
                    <p className="text-2xl md:text-3xl font-semibold leading-[1.15] tracking-[-0.02em]">
                      Great ideas aren&apos;t the problem.
                    </p>
                    <p className="text-2xl md:text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-dab-green mt-1">
                      Getting them through is.
                    </p>
                  </div>

                  <div className="mt-10 space-y-4 text-[15px] md:text-[17px] text-dab-cream/60 leading-relaxed">
                    <p>Teams pull in different directions. Decision-making slows down. Ownership becomes fragmented.</p>
                    <p>What started strong becomes diluted as it moves through the organisation. By the time it reaches the customer, the outcome is weaker than it should have been.</p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── WHERE IMPORTANT WORK GETS STRONGER ────── */}
          <section className="bg-dab-cream relative border-t border-dab-charcoal/8">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36">
              <FadeUp><Label index="02">Operational truth</Label></FadeUp>

              <FadeUp delay={0.08}>
                <h2 className="text-[39px] md:text-[66px] lg:text-[82px] font-semibold leading-[0.95] tracking-[-0.042em] max-w-[14ch]">
                  Where important work gets stronger
                </h2>
              </FadeUp>

              <div className="mt-20 md:mt-24 grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.12} className="md:col-span-6 space-y-8">
                  <p className="text-xl md:text-2xl font-medium text-dab-charcoal leading-[1.3] tracking-[-0.02em] max-w-[48ch]">
                    DAB Hands steps in to create clarity, alignment, and momentum around critical initiatives.
                  </p>
                  <ul className="space-y-0">
                    {['Bringing the right people together.', 'Strengthening decision-making.', 'Reducing friction.', 'Raising the quality of execution.'].map((item, i) => (
                      <motion.li key={item} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 * i }}
                        className="flex items-center gap-5 py-4 border-b border-dab-brown/30 last:border-0"
                      >
                        <span className="w-5 h-px bg-dab-green flex-shrink-0" />
                        <span className="text-base md:text-lg text-dab-charcoal/80">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </FadeUp>

                <FadeUp delay={0.22} className="md:col-span-5 md:col-start-8 space-y-6 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed">
                  <p>Keeping momentum high, alignment clear, and the quality of important work intact as it moves through the organisation.</p>
                  <p>Building small senior teams around critical initiatives to increase capability, sharpen execution, and raise the level of the work.</p>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── DARREN BRETT ──────────────────────────── */}
          <section id="about" className="bg-dab-brown-light border-t border-dab-brown/30">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36">
              <FadeUp><Label index="03">Senior leadership</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
                <FadeUp delay={0.08} className="md:col-span-5">
                  <div className="aspect-[4/5] bg-dab-charcoal relative overflow-hidden">
                    <div className="absolute inset-0 opacity-25">
                      <SignalLines color="#B7FF00" opacity={1} animated />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown mb-2">Founder</span>
                      <span className="text-2xl md:text-3xl font-semibold text-dab-cream tracking-tight">Darren Brett</span>
                    </div>
                  </div>
                </FadeUp>

                <FadeUp delay={0.18} className="md:col-span-6 md:col-start-7 space-y-6">
                  <h2 className="text-[35px] md:text-[51px] lg:text-[63px] font-semibold leading-[1] tracking-[-0.032em]">
                    Darren Brett
                  </h2>
                  <div className="space-y-5 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed max-w-[52ch]">
                    <p>More than 20 years leading complex digital delivery across global brands, platforms, campaigns, and customer experience programmes.</p>
                    <p>Running an agency and owning operations, delivery, and product has shaped how I align teams, manage complexity, and keep important work moving under pressure.</p>
                    <p>A key strength is the ability to move fluidly between strategic, creative, operational, and executional thinking, bringing the right people together and raising the level of the work around critical initiatives.</p>
                    <p>DAB Hands is built around that model. Senior leadership, specialist capability, and clear accountability focused on the work itself.</p>
                    <p className="font-medium text-dab-charcoal">Bring me in to lead delivery around a critical initiative, or scale through DAB Hands to a trusted senior team built around the work.</p>
                  </div>
                  <a href="#contact" className="inline-flex items-center gap-3 pt-4 group text-dab-charcoal font-medium">
                    <span className="border-b border-dab-charcoal/40 pb-0.5 group-hover:border-dab-charcoal transition">Start a conversation</span>
                    <span className="text-dab-green group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                  </a>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── TEAMS BEHIND THE WORK ─────────────────── */}
          <section className="bg-dab-cream border-t border-dab-charcoal/8">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
              <FadeUp><Label index="04">Capability density</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.08} className="md:col-span-5">
                  <h2 className="text-[35px] md:text-[51px] lg:text-[59px] font-semibold leading-[1] tracking-[-0.032em]">
                    The teams behind the work
                  </h2>
                </FadeUp>
                <FadeUp delay={0.18} className="md:col-span-6 md:col-start-7 space-y-6 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed">
                  <p>DAB Hands is supported by a trusted network of senior operators, strategists, creatives, producers, and specialists.</p>
                  <p>People I have delivered with for years. Leaders in their fields. Brought in around the initiative when needed.</p>
                  <div className="pt-4 space-y-1 font-medium text-dab-charcoal">
                    <p>Small senior teams.</p>
                    <p>Clear accountability.</p>
                    <p>Built around the work itself.</p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── LOGO CAROUSEL ─────────────────────────── */}
          <section id="work" className="bg-dab-charcoal text-dab-cream py-20 md:py-24 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/20" />
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 mb-12">
              <FadeUp>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown">Delivered at scale for</span>
              </FadeUp>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-dab-charcoal to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-dab-charcoal to-transparent pointer-events-none" />
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-16 md:gap-24 whitespace-nowrap"
                  animate={{ x: [0, -2400] }}
                  transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                >
                  {[...clients, ...clients, ...clients].map((c, i) => (
                    <span key={`${c}-${i}`}
                      className="text-2xl md:text-3xl font-semibold tracking-tight text-dab-cream/25 hover:text-dab-cream/80 transition-colors duration-400 flex-shrink-0 select-none"
                    >{c}</span>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ──────────────────────────── */}
          <section className="bg-dab-brown border-t border-dab-brown py-24 md:py-36">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp><Label index="05">Trusted to lead important work</Label></FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="text-[35px] md:text-[51px] lg:text-[59px] font-semibold leading-[1] tracking-[-0.032em] max-w-[14ch] mb-16 md:mb-20">
                  Trusted to lead important work
                </h2>
              </FadeUp>

              <div className="grid md:grid-cols-3 gap-12 md:gap-10">
                {testimonials.map((t, i) => (
                  <FadeUp key={t.author} delay={0.08 * i}>
                    <div className="space-y-6 h-full flex flex-col">
                      <div className="h-px w-full bg-dab-charcoal/20" />
                      <div className="font-mono text-[10px] tracking-[0.2em] text-dab-charcoal/40 pt-1">{String(i + 1).padStart(2, '0')}</div>
                      <p className="text-[15px] md:text-[17px] text-dab-charcoal leading-relaxed flex-1">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div>
                        <span className="signal-rule mb-4" />
                        <p className="font-semibold text-dab-charcoal text-[15px]">{t.author}</p>
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-dab-charcoal/50 mt-1.5">{t.title}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          {/* ── EXPERIENCE ACROSS ────────────────────── */}
          <section className="bg-dab-cream border-t border-dab-charcoal/8 py-24 md:py-32">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp><Label index="06">Experience across</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.08} className="md:col-span-4">
                  <h2 className="text-[35px] md:text-[51px] font-semibold leading-[1] tracking-[-0.032em]">
                    Experience<br />across
                  </h2>
                </FadeUp>
                <div className="md:col-span-7 md:col-start-6">
                  {experienceAreas.map((area, i) => (
                    <motion.div key={area}
                      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center gap-6 py-5 border-b border-dab-brown/25 group"
                    >
                      <span className="font-mono text-[10px] tabular-nums tracking-widest text-dab-brown w-7 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <span className="w-2 h-2 rounded-full bg-dab-green group-hover:scale-150 transition-transform flex-shrink-0" />
                      <span className="text-lg md:text-xl text-dab-charcoal font-medium">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── BUILT FOR ─────────────────────────────── */}
          <section className="bg-dab-cream border-t border-dab-charcoal/8 py-24 md:py-32">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp><Label index="07">Built for</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-10">
                <FadeUp delay={0.08} className="md:col-span-3">
                  <h2 className="text-[35px] md:text-[51px] font-semibold leading-[1] tracking-[-0.032em]">Built for</h2>
                </FadeUp>
                <FadeUp delay={0.18} className="md:col-span-8 md:col-start-5">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-dab-charcoal leading-[1.2] tracking-[-0.02em] max-w-[26ch]">
                    Complex digital initiatives where strategy, creative, product, platforms, and customer experience need to move together at high quality and pace.
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-3 mt-10 group text-dab-charcoal font-medium">
                    <span className="border-b border-dab-charcoal/40 pb-0.5 group-hover:border-dab-charcoal transition">Start a conversation</span>
                    <span className="text-dab-green group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                  </a>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── WHY ORGS BRING DAB HANDS IN (GREEN) ──── */}
          <section className="bg-dab-green text-dab-charcoal py-20 md:py-28">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp>
                <h2 className="text-[35px] md:text-[51px] lg:text-[63px] font-semibold leading-[1] tracking-[-0.032em] max-w-[18ch] mb-14 md:mb-16">
                  Why organisations bring DAB Hands in
                </h2>
              </FadeUp>
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
                {reasons.map((reason, i) => (
                  <motion.div key={reason}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15"
                  >
                    <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-lg md:text-xl font-medium leading-tight">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── INTERVENTIONS ACCORDION ───────────────── */}
          <section id="interventions" className="bg-dab-cream border-t border-dab-charcoal/8 py-24 md:py-36">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp><Label index="08">Intervention model</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-20">
                <FadeUp delay={0.08} className="md:col-span-7">
                  <h2 className="text-[35px] md:text-[51px] lg:text-[63px] font-semibold leading-[1] tracking-[-0.032em] max-w-[14ch]">
                    Ways DAB Hands steps in
                  </h2>
                </FadeUp>
                <FadeUp delay={0.18} className="md:col-span-5 md:pt-3 space-y-4 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed">
                  <p>Usually when important work starts drifting, slowing down, or fragmenting as it moves to market.</p>
                  <p>DAB Hands steps in to restore clarity, alignment, and quality of execution around the work.</p>
                </FadeUp>
              </div>

              <div>
                {interventions.map((item, i) => {
                  const isOpen = openIntervention === i;
                  return (
                    <motion.div key={i} id={`intervention-${i}`}
                      initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="border-t border-dab-brown/30 last:border-b last:border-b-dab-brown/30"
                    >
                      <button
                        onClick={() => setOpenIntervention(isOpen ? null : i)}
                        className="w-full py-7 md:py-8 flex items-center justify-between text-left group gap-8"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-baseline gap-6 md:gap-8 flex-1">
                          <span className="font-mono text-[10px] tabular-nums tracking-widest text-dab-brown flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-xl md:text-2xl lg:text-[28px] font-medium text-dab-charcoal tracking-tight leading-tight group-hover:text-dab-charcoal/60 transition duration-200">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-2xl text-dab-charcoal/60 flex-shrink-0 transition-transform duration-300"
                          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }} aria-hidden>+</span>
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
                            <div className="pb-8 md:pb-10 pl-0 md:pl-[72px] pr-16 space-y-4 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed max-w-[55ch]">
                              {item.body.map((p, j) => <p key={j}>{p}</p>)}
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

          {/* ── STATS ─────────────────────────────────── */}
          <section className="bg-dab-charcoal text-dab-cream relative overflow-hidden dot-grid">
            <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />

            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36 relative">
              <FadeUp>
                <h2 className="text-[35px] md:text-[51px] lg:text-[63px] font-semibold leading-[1.05] tracking-[-0.032em] max-w-[22ch] mb-20 md:mb-24">
                  Most businesses don&apos;t lose on intent and ideas.{' '}
                  <span className="text-dab-green">They lose on execution.</span>
                </h2>
              </FadeUp>

              {/* Palantir-style large stat callouts */}
              <div className="grid md:grid-cols-2 gap-0 border-t border-dab-brown/20">
                <FadeUp delay={0.1}>
                  <div className="py-12 md:py-16 md:pr-16 md:border-r border-dab-brown/20">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown block mb-6">Harvard Business Review</span>
                    <p className="text-[72px] md:text-[96px] font-semibold leading-none tracking-[-0.04em] text-dab-green">60<span className="text-[48px] md:text-[64px]">%</span></p>
                    <p className="text-[15px] md:text-[17px] text-dab-cream/60 leading-relaxed max-w-[36ch] mt-4">of strategic targets are realised. The rest lost to execution failure.</p>
                  </div>
                </FadeUp>
                <FadeUp delay={0.18}>
                  <div className="py-12 md:py-16 md:pl-16 border-t md:border-t-0 border-dab-brown/20">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown block mb-6">McKinsey &amp; Company</span>
                    <p className="text-[72px] md:text-[96px] font-semibold leading-none tracking-[-0.04em] text-dab-green">30<span className="text-[48px] md:text-[64px]">%</span></p>
                    <p className="text-[15px] md:text-[17px] text-dab-cream/60 leading-relaxed max-w-[36ch] mt-4">of revenue lost to execution inefficiencies. Every year.</p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ─────────────────────────────── */}
          <section id="contact" className="bg-dab-charcoal text-dab-cream relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />

            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36 relative">
              <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
                <div className="md:col-span-7 relative z-10">
                  <FadeUp>
                    <Label index="09">Get in touch</Label>
                    <h2 className="text-[39px] md:text-[59px] lg:text-[74px] font-semibold leading-[0.95] tracking-[-0.042em]">
                      When important work needs to land properly,{' '}
                      <span className="text-dab-green">bring DAB Hands in.</span>
                    </h2>
                  </FadeUp>
                  <FadeUp delay={0.12}>
                    <div className="mt-10 space-y-4 text-[15px] md:text-[17px] text-dab-cream/60 leading-relaxed max-w-[48ch]">
                      <p>If a critical initiative is drifting, slowing down, or becoming fragmented, let&apos;s talk.</p>
                      <p>Just a clear conversation about what is getting in the way and what needs to move next.</p>
                    </div>
                  </FadeUp>
                  <FadeUp delay={0.22}>
                    <a href="mailto:db@dabhands.delivery"
                      className="inline-flex items-center gap-3 mt-12 text-dab-green text-lg md:text-xl font-medium group"
                    >
                      <span className="border-b border-dab-green pb-1">Start a conversation</span>
                      <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                    </a>
                  </FadeUp>
                  <FadeUp delay={0.30}>
                    <div className="mt-10 pt-8 border-t border-dab-brown/25 flex flex-col sm:flex-row gap-5 sm:gap-10">
                      <a href="mailto:db@dabhands.delivery" className="font-mono text-[11px] tracking-[0.15em] text-dab-cream/50 hover:text-dab-green transition">
                        db@dabhands.delivery
                      </a>
                      <a href="tel:+447788711433" className="font-mono text-[11px] tracking-[0.15em] text-dab-cream/50 hover:text-dab-green transition">
                        +44 7788 711433
                      </a>
                    </div>
                  </FadeUp>
                </div>

                {/* Animated signal lines */}
                <div className="md:col-span-5 relative h-72 md:h-[500px] opacity-70">
                  <SignalLines color="#FAFAFA" opacity={0.15} animated />
                </div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ────────────────────────────────── */}
          <footer className="bg-dab-charcoal border-t border-dab-brown/20 text-dab-cream">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-dab-green" />
                  <span className="font-semibold text-[15px] tracking-[-0.02em]">
                    <span className="font-bold">DAB</span> hands
                  </span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-dab-brown">© 2025 DAB Hands</p>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}
