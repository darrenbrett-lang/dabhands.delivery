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
    body: ['When important work starts drifting, confidence drops quickly. Decisions slow down, ownership fragments, and momentum disappears.', 'DAB hands steps in to restore clarity, stabilise delivery, and get the work moving again.'],
  },
  {
    title: 'Protect the quality of the work',
    body: ['Strong work often loses strength as it moves through teams, approvals, platforms, and timelines.', 'DAB hands helps maintain alignment, execution quality, and momentum as the work moves to market.'],
  },
  {
    title: 'Align teams around the work',
    body: ['Important initiatives rarely fail because people do not care. They fail because priorities, ownership, and decision-making become disconnected.', 'DAB hands creates alignment around the work so teams can move faster and execute more effectively.'],
  },
  {
    title: 'Build the right senior team',
    body: ['Some initiatives need additional capability at the right level.', 'DAB hands builds small senior teams around critical work to increase capability, sharpen execution, and raise the level of output.'],
  },
  {
    title: 'Improve how the work moves',
    body: ['Sometimes the issue is not the strategy or creative. It is how the work is operating.', 'DAB hands reduces friction, clarifies ownership, and improves delivery flow across teams and stakeholders.'],
  },
  {
    title: 'Get more from existing investment',
    body: ['Most organisations already have strong people, platforms, and ideas in place.', 'DAB hands helps bring them together more effectively to increase impact and improve execution quality across the customer experience.'],
  },
];

// Slugs map to Simple Icons CDN: https://cdn.simpleicons.org/{slug}/{hex}.
// Brands not in Simple Icons (e.g. Royal Mail, Parcelforce, Fortnum & Mason)
// will 404 on the CDN and silently drop out via the LogoMark onError.
const clients: Array<{ name: string; slug: string }> = [
  { name: 'Nike', slug: 'nike' },
  { name: 'Volkswagen', slug: 'volkswagen' },
  { name: 'Audi', slug: 'audi' },
  { name: 'Hugo Boss', slug: 'hugoboss' },
  { name: 'Tommy Hilfiger', slug: 'tommyhilfiger' },
  { name: 'Unilever', slug: 'unilever' },
  { name: 'Johnson & Johnson', slug: 'johnsonandjohnson' },
  { name: 'Royal Mail', slug: 'royalmail' },
  { name: 'Parcelforce', slug: 'parcelforce' },
  { name: 'Post Office', slug: 'postoffice' },
  { name: 'Fortnum & Mason', slug: 'fortnumandmason' },
  { name: 'Falabella', slug: 'falabella' },
  { name: 'Palantir', slug: 'palantir' },
];

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

// Primary CTA: neon green background, black text. Used wherever "Start a conversation" appears.
// `inverse` variant flips to charcoal background with green text, for use on green-bg sections.
const ConversationCTA = ({ href = 'mailto:db@dabhands.delivery', className = '', inverse = false }: { href?: string; className?: string; inverse?: boolean }) => (
  <a
    href={href}
    className={`group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase px-6 py-4 transition-colors ${
      inverse
        ? 'bg-dab-charcoal text-dab-green hover:bg-dab-green hover:text-dab-charcoal'
        : 'bg-dab-green text-dab-charcoal hover:bg-dab-charcoal hover:text-dab-green'
    } ${className}`}
  >
    <span>Start a conversation</span>
    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
  </a>
);

// Dev grid overlay for design QA. 12 columns, 32px gutter, 64px outer margin at lg.
// Matches the content container exactly: max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16.
const GridOverlay = ({ visible }: { visible: boolean }) => (
  <div className={`fixed inset-0 z-40 pointer-events-none ${visible ? 'block' : 'hidden'}`} aria-hidden>
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-full">
      <div className="grid grid-cols-12 gap-8 h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-fuchsia-500/15 h-full" />
        ))}
      </div>
    </div>
  </div>
);

// Brand logo. Tries /public/images/logos/{slug}.svg first (user-provided),
// then falls back to Simple Icons CDN (CC0 library), then renders null.
// `filter: brightness(0) invert(1)` forces any-colour source SVGs to white.
const LogoMark = ({ name, slug }: { name: string; slug: string }) => {
  const [src, setSrc] = useState(`/images/logos/${slug}.svg`);
  const [errored, setErrored] = useState(false);
  if (errored) return null;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={name}
      className="h-8 md:h-10 lg:h-12 w-auto opacity-65 hover:opacity-100 transition-opacity select-none"
      style={{ filter: 'brightness(0) invert(1)' }}
      onError={() => {
        if (src.startsWith('/images/logos/')) {
          setSrc(`https://cdn.simpleicons.org/${slug}/ffffff`);
        } else {
          setErrored(true);
        }
      }}
      draggable={false}
    />
  );
};

// Palantir-style monospace section label. Tones:
//   default → dark backgrounds (charcoal). Green index pops, brown supporting.
//   onBrown → brown sections. Charcoal index (green has no contrast on brown).
//   onLight → cream/white backgrounds. Charcoal index (green has no contrast on white).
const Label = ({ index, children, tone = 'default' }: { index: string; children: React.ReactNode; tone?: 'default' | 'onBrown' | 'onLight' }) => {
  const palette = {
    default: { index: 'text-dab-cream', line: 'bg-dab-cream/30', text: 'text-dab-cream' },
    onBrown: { index: 'text-dab-charcoal', line: 'bg-dab-charcoal/40', text: 'text-dab-charcoal/70' },
    onLight: { index: 'text-dab-charcoal', line: 'bg-dab-charcoal/30', text: 'text-dab-charcoal/60' },
  }[tone];
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-14">
      <span className={`font-mono text-[10px] tracking-[0.2em] ${palette.index}`}>{index}</span>
      <span className={`w-6 h-px ${palette.line}`} />
      <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${palette.text}`}>{children}</span>
    </div>
  );
};

// Brand motif: thin radial lines converging to a single point on the right.
// Lines pulse outward in a concentric wave (delay scales with distance from the beam).
// Beam is a short green segment starting after the headline so it doesn't overlap copy.
// Convergence point has stacked circles that pulse in colour + opacity.
const BrandMotif = ({ color = '#FAFAFA' }: { color?: string }) => {
  const cx = 860, cy = 450;
  const totalLines = 39;
  const half = (totalLines - 1) / 2;
  const spread = 290;
  const beamStartX = 720; // beam only visible from this x rightward (past headline)

  return (
    <svg viewBox="0 0 900 900" preserveAspectRatio="xMaxYMid slice" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="motifFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="75%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <mask id="motifMask">
          <rect x="0" y="0" width="900" height="900" fill="url(#motifFade)" />
        </mask>
      </defs>

      <g mask="url(#motifMask)">
        {Array.from({ length: totalLines }).map((_, idx) => {
          const i = idx - half;
          if (i === 0) return null; // beam rendered separately
          const y = cy + (spread / half) * i;
          const distRatio = Math.abs(i) / half;
          const baseOpacity = Math.max(0.22, 0.7 - distRatio * 0.3);
          return (
            <motion.line
              key={idx}
              x1="0"
              y1={y}
              x2={cx}
              y2={cy}
              stroke={color}
              strokeWidth={0.55}
              animate={{
                strokeOpacity: [baseOpacity * 0.5, baseOpacity, baseOpacity * 0.5],
              }}
              transition={{
                strokeOpacity: {
                  duration: 4.5,
                  delay: distRatio * 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
          );
        })}
      </g>

      {/* Beam: starts after the headline so it doesn't cut under the green copy */}
      <motion.line
        x1={beamStartX}
        y1={cy}
        x2={cx}
        y2={cy}
        stroke="#B7FF00"
        strokeWidth={1.6}
        strokeLinecap="round"
        animate={{ strokeOpacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Breathing convergence: rings expand + contract, opacity swells, dot brightens */}
      <motion.circle
        cx={cx} cy={cy} fill="#B7FF00"
        animate={{ r: [44, 64, 44], opacity: [0.03, 0.16, 0.03] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={cx} cy={cy} fill="#B7FF00"
        animate={{ r: [24, 34, 24], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={cx} cy={cy} fill="#B7FF00"
        animate={{ r: [12, 17, 12], opacity: [0.32, 0.7, 0.32] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={cx} cy={cy} r={6}
        animate={{ fill: ['#B7FF00', '#E8FF7A', '#B7FF00'] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [openIntervention, setOpenIntervention] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [showGrid, setShowGrid] = useState(false);
  const [showOutlines, setShowOutlines] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem('dab-show-grid') === 'true') setShowGrid(true);
    if (window.localStorage.getItem('dab-show-outlines') === 'true') setShowOutlines(true);
  }, []);

  const toggleGrid = () => {
    setShowGrid((v) => {
      const next = !v;
      if (typeof window !== 'undefined') window.localStorage.setItem('dab-show-grid', String(next));
      return next;
    });
  };

  const toggleOutlines = () => {
    setShowOutlines((v) => {
      const next = !v;
      if (typeof window !== 'undefined') window.localStorage.setItem('dab-show-outlines', String(next));
      return next;
    });
  };

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
        <title>DAB hands. Senior-led digital delivery for high-stakes work.</title>
        <meta name="description" content="Small senior teams built around critical digital initiatives. Helping organisations maximise the impact of important work as it moves to market." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`min-h-screen bg-dab-cream text-dab-charcoal antialiased ${showOutlines ? 'outlines-on' : ''}`}>

        {/* Dev tools: grid overlay + toggle buttons (bottom-right) */}
        <div data-dev-tool>
          <GridOverlay visible={showGrid} />
        </div>
        <div data-dev-tool className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 items-end">
          <button
            onClick={toggleGrid}
            aria-pressed={showGrid}
            className="bg-dab-charcoal text-dab-cream font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-dab-cream/30 hover:bg-dab-cream hover:text-dab-charcoal transition-colors"
          >
            Grid {showGrid ? 'On' : 'Off'}
          </button>
          <button
            onClick={toggleOutlines}
            aria-pressed={showOutlines}
            className="bg-dab-charcoal text-dab-cream font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border border-dab-cream/30 hover:bg-dab-cream hover:text-dab-charcoal transition-colors"
          >
            Outlines {showOutlines ? 'On' : 'Off'}
          </button>
        </div>

        {/* ── HEADER ────────────────────────────────── */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-dab-charcoal ${scrolled ? 'border-b border-dab-brown/15' : ''}`}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
            <a href="#top" className="flex items-baseline gap-3 group" aria-label="DAB hands home">
              <span className="w-[10px] h-[10px] rounded-full shrink-0 bg-dab-cream" />
              <span className="font-semibold text-[19px] tracking-[-0.02em] text-dab-cream leading-none">
                <span className="font-bold">DAB</span> hands
              </span>
            </a>

            {/* Desktop: single CTA on the right */}
            <div className="hidden md:block">
              <ConversationCTA className="py-2.5 px-5" />
            </div>

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
                {[['#approach', 'Approach'], ['#about', 'About'], ['#work', 'Work'], ['#interventions', 'Interventions']].map(([href, label], i) => (
                  <motion.a key={href} href={href} onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06 }}
                    className="text-3xl font-semibold tracking-tight py-3 border-b border-dab-brown/20 hover:text-dab-green transition"
                  >{label}</motion.a>
                ))}
              </nav>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown">DAB hands. Digital Delivery, Handled</p>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="top">

          {/* ── MASTHEAD LOCKUP ──────────────────────── */}
          {/* Headline + lines + circle as a single composition. Circle aligns with the */}
          {/* middle line of the wrapped headline via flex vertical centering + YMid SVG. */}
          <section className="relative bg-dab-cream text-dab-charcoal overflow-hidden min-h-[90vh] flex items-center justify-center">

            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-32 md:py-40 text-center">
              <FadeUp>
                <h1 className="text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] xl:text-[128px] font-semibold leading-[0.98] tracking-[-0.03em] max-w-[15ch] mx-auto">
                  <span className="block">Expert digital delivery</span>
                  <span className="block">for high-stakes work</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.18}>
                <p className="mt-10 md:mt-12 text-lg md:text-xl text-dab-charcoal/60 leading-relaxed max-w-[42ch] mx-auto">
                  Senior-led delivery for the critical initiatives organisations cannot afford to drift.
                </p>
              </FadeUp>
            </div>
          </section>

          {/* ── HERO SUPPORTING ──────────────────────── */}
          {/* White section: numbered label, mid-sized title, supporting copy, inline dropdown right. */}
          <section className="relative bg-dab-cream text-dab-charcoal overflow-hidden border-t border-dab-charcoal/10 py-20 md:py-28">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">

              <FadeUp><Label index="02" tone="onLight">Approach</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">

                <div className="md:col-span-8">
                  <FadeUp delay={0.08}>
                    <h2 className="text-[30px] md:text-[40px] lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.03em] max-w-[22ch] mb-8 md:mb-10">
                      Small senior teams built around important digital work that cannot afford to drift.
                    </h2>
                  </FadeUp>
                  <FadeUp delay={0.14}>
                    <div className="md:grid md:grid-cols-8 md:gap-8">
                      <div className="md:col-span-5 space-y-3 text-[15px] md:text-[17px] text-dab-charcoal/70 leading-relaxed">
                        <p>Helping organisations maximise the impact of critical initiatives as they move to market.</p>
                        <p>Built to help digital teams move faster, increase quality, and get more from existing investment.</p>
                      </div>
                    </div>
                  </FadeUp>
                </div>

                <FadeUp delay={0.20} className="md:col-span-4 md:col-start-9 md:pt-2">
                  <label htmlFor="challenge" className="block font-mono text-[10px] tracking-[0.22em] uppercase text-dab-charcoal mb-4">
                    I need to…
                  </label>
                  <div className="relative border-b border-dab-charcoal/30 focus-within:border-dab-charcoal transition-colors">
                    <select
                      id="challenge"
                      value={selectedChallenge}
                      onChange={(e) => handleChallengeSelect(e.target.value)}
                      className="w-full appearance-none bg-transparent text-dab-charcoal text-lg md:text-xl py-2 pr-8 cursor-pointer focus:outline-none font-medium"
                    >
                      <option value="">Select an option</option>
                      {challenges.map((c) => (
                        <option key={c.label} value={c.label}>{c.label}</option>
                      ))}
                    </select>
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-dab-charcoal" width="13" height="8" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </FadeUp>

              </div>
            </div>
          </section>

          {/* ── WHERE ARE WE? ─────────────────────────── */}
          <section id="approach" className="bg-dab-charcoal text-dab-cream relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/30" />

            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36 relative">
              <FadeUp><Label index="03">Where are we?</Label></FadeUp>

              {/* Three large statements — full width, one per line */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
                }}
                className="mt-16 md:mt-20"
              >
                {[
                  'The tools are changing.',
                  'The problems aren’t.',
                  'Complexity is higher than ever.',
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="text-[32px] md:text-[48px] lg:text-[60px] xl:text-[72px] font-semibold leading-[1.05] tracking-[-0.035em] text-dab-cream mb-5 md:mb-7 last:mb-0"
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>

              {/* Four points — section 10 style: green dot above text, vertical dividers */}
              <div className="border-t border-dab-cream/15 mt-16 md:mt-24 pt-10 md:pt-14">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
                  }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-y-12"
                >
                  {[
                    {
                      text: 'Inside the business, friction slows the work.',
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                          <line x1="4" y1="20" x2="13" y2="20" />
                          <line x1="17" y1="13" x2="17" y2="27" />
                          <line x1="21" y1="20" x2="30" y2="20" />
                          <line x1="34" y1="13" x2="34" y2="27" />
                        </svg>
                      ),
                    },
                    {
                      text: 'Outside, competition for attention is relentless.',
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                          <circle cx="20" cy="20" r="3" />
                          <line x1="20" y1="6" x2="20" y2="11" />
                          <line x1="20" y1="29" x2="20" y2="34" />
                          <line x1="6" y1="20" x2="11" y2="20" />
                          <line x1="29" y1="20" x2="34" y2="20" />
                          <line x1="10" y1="10" x2="13.5" y2="13.5" />
                          <line x1="26.5" y1="26.5" x2="30" y2="30" />
                          <line x1="30" y1="10" x2="26.5" y2="13.5" />
                          <line x1="13.5" y1="26.5" x2="10" y2="30" />
                        </svg>
                      ),
                    },
                    {
                      text: 'More of the right work needs to get through.',
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
                          <path d="M6 8 L34 8 L24 22 L24 33 L16 33 L16 22 Z" />
                        </svg>
                      ),
                    },
                    {
                      text: 'And more of the budget needs to go into the work itself.',
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <rect x="6" y="26" width="6" height="10" />
                          <rect x="17" y="18" width="6" height="18" />
                          <rect x="28" y="10" width="6" height="26" />
                        </svg>
                      ),
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                      }}
                      className={i > 0 ? 'md:border-l md:border-dab-cream/15 md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'}
                    >
                      <div className="text-dab-green mb-7">{item.icon}</div>
                      <p className="text-[15px] md:text-[17px] leading-[1.4] text-dab-cream max-w-[28ch]">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── HOW WORK LOSES STRENGTH ───────────────── */}
          <section className="bg-dab-white text-dab-charcoal relative overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-28 md:py-40 text-center">
              <FadeUp>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">How work loses strength</p>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h2 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[22ch] mx-auto">
                  <span className="block">Great ideas aren&apos;t the problem.</span>
                  <span className="block">Getting them through is.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.18}>
                <div className="mt-12 md:mt-16 space-y-6 text-[16px] md:text-[18px] text-dab-charcoal/70 leading-relaxed max-w-[52ch] mx-auto">
                  <div className="space-y-1">
                    <p>Teams pull in different directions.</p>
                    <p>Decision-making slows down.</p>
                    <p>Ownership becomes fragmented.</p>
                  </div>
                  <div className="space-y-1">
                    <p>What started strong becomes diluted as it moves through the organisation.</p>
                    <p>By the time it reaches the customer, the outcome is weaker than it should have been.</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>

          {/* ── WHERE IMPORTANT WORK GETS STRONGER ────── */}
          <section className="bg-dab-cream relative border-t border-dab-charcoal/8 overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36">
              <FadeUp><Label index="05" tone="onLight">Operational truth</Label></FadeUp>

              <div className="mt-2 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                <FadeUp delay={0.08} className="md:col-span-7">
                  <h2 className="text-[39px] md:text-[66px] lg:text-[82px] font-semibold leading-[0.95] tracking-[-0.042em] max-w-[14ch]">
                    How DAB hands strengthens critical work
                  </h2>
                </FadeUp>

                {/* Flow image — starts at column 8, bleeds to the right viewport edge */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:col-span-5 lg:col-start-8 relative"
                  style={{ marginRight: 'calc((100vw - min(100vw, 1280px)) / -2 - 4rem)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/flow.jpeg"
                    alt=""
                    className="block w-full h-auto pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="mt-20 md:mt-24 grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.12} className="md:col-span-6 space-y-8">
                  <p className="text-xl md:text-2xl font-medium text-dab-charcoal leading-[1.3] tracking-[-0.02em] max-w-[48ch]">
                    DAB hands steps in to create clarity, alignment, and momentum around critical initiatives.
                  </p>
                  <div>
                    {[
                      'Bringing the right people together.',
                      'Strengthening decision-making.',
                      'Reducing friction.',
                      'Raising the quality of execution.',
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="flex items-start gap-5 py-5 border-t border-dab-charcoal/15 text-dab-charcoal"
                      >
                        <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-lg md:text-xl font-medium leading-tight">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </FadeUp>

                <FadeUp delay={0.22} className="md:col-span-5 md:col-start-8 space-y-6 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed">
                  <p>Keeping momentum high, alignment clear, and the quality of important work intact as it moves through the organisation.</p>
                  <p>Building small senior teams around critical initiatives to increase capability, sharpen execution, and raise the level of the work.</p>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── DARREN BRETT ──────────────────────────── */}
          <section id="about" className="bg-dab-brown border-t border-dab-brown/30">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36">
              <FadeUp><Label index="06" tone="onBrown">Senior leadership</Label></FadeUp>

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

                <FadeUp delay={0.18} className="md:col-span-6 md:col-start-7 space-y-6">
                  <div className="space-y-5 text-[15px] md:text-[17px] text-dab-charcoal/75 leading-relaxed max-w-[52ch]">
                    <p>More than 20 years leading complex digital delivery across global brands, platforms, campaigns, and customer experience programmes.</p>
                    <p>Running an agency and owning operations, delivery, and product has shaped how I align teams, manage complexity, and keep important work moving under pressure.</p>
                    <p>A key strength is the ability to move fluidly between strategic, creative, operational, and executional thinking, bringing the right people together and raising the level of the work around critical initiatives.</p>
                    <p>DAB hands is built around that model. Senior leadership, specialist capability, and clear accountability focused on the work itself.</p>
                    <p className="font-medium text-dab-charcoal">Bring me in to lead delivery around a critical initiative, or scale through DAB hands to a trusted senior team built around the work.</p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── TEAMS BEHIND THE WORK ─────────────────── */}
          <section className="bg-dab-cream border-t border-dab-charcoal/8">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
              <FadeUp><Label index="07" tone="onLight">Capability density</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                <FadeUp delay={0.08} className="md:col-span-5">
                  <h2 className="text-[35px] md:text-[51px] lg:text-[59px] font-semibold leading-[1] tracking-[-0.032em]">
                    The teams behind the work
                  </h2>
                </FadeUp>
                <FadeUp delay={0.18} className="md:col-span-6 md:col-start-7 space-y-6 text-[15px] md:text-[17px] text-dab-charcoal/60 leading-relaxed">
                  <p>DAB hands is supported by a trusted network of senior operators, strategists, creatives, producers, and specialists.</p>
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
                          <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-lg md:text-xl font-medium leading-tight">{line}</p>
                      </motion.div>
                    ))}
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ── DELIVERED AT SCALE FOR ────────────────── */}
          <section id="work" className="bg-dab-charcoal text-dab-cream py-20 md:py-28 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-dab-brown/20" />
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp><Label index="08">I&apos;ve delivered at scale for</Label></FadeUp>

              <FadeUp delay={0.08}>
                <div className="mt-14 md:mt-16 flex flex-wrap items-center justify-center md:justify-start gap-x-12 md:gap-x-16 lg:gap-x-20 gap-y-10 md:gap-y-12">
                  {clients.map((c) => (
                    <LogoMark key={c.slug} name={c.name} slug={c.slug} />
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>

          {/* ── TESTIMONIALS ──────────────────────────── */}
          <section className="bg-dab-brown border-t border-dab-brown py-24 md:py-36">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp><Label index="09" tone="onBrown">Trusted to lead important work</Label></FadeUp>
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

          {/* ── WHERE I'VE WORKED ─────────────────────── */}
          <section className="bg-dab-charcoal text-dab-cream border-t border-dab-brown/20 py-24 md:py-32">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp><Label index="10">Experience across</Label></FadeUp>

              <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-16">
                <FadeUp delay={0.08} className="md:col-span-7">
                  <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-semibold leading-[1.05] tracking-[-0.032em] max-w-[14ch]">
                    Where I&apos;ve worked
                  </h2>
                </FadeUp>
                <FadeUp delay={0.16} className="md:col-span-4 md:col-start-9">
                  <p className="text-[15px] md:text-[17px] text-dab-cream/70 leading-relaxed md:pt-4">
                    Heavy delivery experience across digital for many global brands across multiple business sectors.
                  </p>
                </FadeUp>
              </div>

              <div className="border-t border-dab-cream/15 pt-10 md:pt-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
                  {[
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
                      label: 'Brand experience.',
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <rect x="6" y="6" width="22" height="22" />
                          <rect x="14" y="14" width="22" height="22" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Campaigns.',
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <circle cx="20" cy="20" r="14" />
                          <circle cx="20" cy="20" r="8" />
                          <circle cx="20" cy="20" r="2" fill="currentColor" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Always-on, membership and lifecycle.',
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M32 18 A12 12 0 1 0 31 25" />
                          <path d="M32 11 L32 18 L25 18" />
                        </svg>
                      ),
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className={i > 0 ? 'md:border-l md:border-dab-cream/15 md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'}
                    >
                      <div className="text-dab-green mb-7">{item.icon}</div>
                      <p className="text-[17px] md:text-[19px] font-medium leading-tight text-dab-cream max-w-[18ch]">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── MY SWEET SPOT ─────────────────────────── */}
          <section className="bg-dab-cream text-dab-charcoal py-28 md:py-40 border-t border-dab-charcoal/8">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 text-center">
              <FadeUp>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">Sweet spot</p>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h2 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[14ch] mx-auto">
                  My sweet spot
                </h2>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-8 text-[16px] md:text-[18px] text-dab-charcoal/70 leading-relaxed max-w-[52ch] mx-auto">
                  Digital brand experience, where strategy, ideas, product, and creative storytelling need to carry across the ecosystem and cut through in daily living.
                </p>
              </FadeUp>

              <div className="mt-20 md:mt-24 border-t border-dab-charcoal/15 pt-12 md:pt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 text-left">
                  {['Attention.', 'Connection.', 'Conversion.'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className={i > 0 ? 'md:border-l md:border-dab-charcoal/15 md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'}
                    >
                      <p className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold leading-tight tracking-[-0.025em] text-dab-charcoal">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── WHY ORGS BRING DAB HANDS IN ───────────── */}
          <section className="bg-dab-white text-dab-charcoal py-28 md:py-40">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <FadeUp>
                <h2 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[20ch] mx-auto text-center mb-16 md:mb-20">
                  Why organisations bring DAB hands in
                </h2>
              </FadeUp>
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-0 max-w-[1024px] mx-auto">
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
          <section id="interventions" className="bg-dab-cream border-t border-dab-charcoal/8 py-28 md:py-40">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
              <div className="text-center mb-16 md:mb-20">
                <FadeUp>
                  <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">Intervention model</p>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <h2 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[16ch] mx-auto">
                    Ways DAB hands steps in
                  </h2>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <div className="mt-8 space-y-2 text-[16px] md:text-[18px] text-dab-charcoal/70 leading-relaxed max-w-[60ch] mx-auto">
                    <p>Usually when important work starts drifting, slowing down, or fragmenting as it moves to market.</p>
                    <p>DAB hands steps in to restore clarity, alignment, and quality of execution around the work.</p>
                  </div>
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
                        className="w-full py-7 md:py-8 flex items-center justify-between text-left group gap-8 hover:bg-dab-charcoal transition-colors duration-200"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-baseline gap-6 md:gap-8 flex-1">
                          <span className="font-mono text-[10px] tabular-nums tracking-widest text-dab-brown group-hover:text-dab-cream/70 flex-shrink-0 transition-colors duration-200">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-xl md:text-2xl lg:text-[28px] font-medium text-dab-charcoal tracking-tight leading-tight group-hover:text-dab-cream transition-colors duration-200">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-2xl text-dab-charcoal/60 group-hover:text-dab-cream flex-shrink-0 transition duration-300"
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

          {/* ── FOOTER ────────────────────────────────── */}
          <footer id="contact" className="bg-dab-charcoal border-t border-dab-brown/20 text-dab-cream">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-10">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                  <a href="mailto:db@dabhands.delivery" className="font-mono text-[11px] tracking-[0.15em] text-dab-cream/60 hover:text-dab-green transition">
                    db@dabhands.delivery
                  </a>
                  <a href="tel:+447788711433" className="font-mono text-[11px] tracking-[0.15em] text-dab-cream/60 hover:text-dab-green transition">
                    +44 7788 711433
                  </a>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pt-6 border-t border-dab-brown/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-dab-green" />
                    <span className="font-semibold text-[15px] tracking-[-0.02em]">
                      <span className="font-bold">DAB</span> hands
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/in/darren-brett-1474403/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Darren Brett on LinkedIn"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logos/linkedin.png"
                        alt=""
                        width={16}
                        height={16}
                        className="block"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </a>
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-dab-brown">© 2026 DAB hands</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}
