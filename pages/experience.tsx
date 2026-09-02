import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Layout } from '@/components/Layout';
import { SeoMeta } from '@/components/SeoMeta';
import { FadeUp } from '@/components/FadeUp';
import { Testimonials } from '@/components/OperatorTemplate';
import { LogoTicker } from '@/components/LogoTicker';
import { mailto } from '@/lib/mailto';

/* ── Track Record ─────────────────────────────────────────────────────────
   The full career record on one page. Header, a seven-tile scroll rail (each
   tile's outcome behind a one-way "What came of it" disclosure), the full
   record as nine expandable role entries (native <details>, two lines visible,
   the rest behind a one-way "More"), the testimonial rail, and a single CTA.

   Rules (see brief section 8): no money figures anywhere, scale is
   non-financial only; nobody else's difficulty named; British English,
   sentence case, no em dashes. Full-record copy mirrors LinkedIn. One-way
   disclosures use `details[open] > summary { display:none }` so no script and
   no state are needed; a beforeprint handler opens everything for printing. */

// ── Seven-tile rail ────────────────────────────────────────────────────────
interface Tile {
  source: string;
  headline: string;
  role: string;
  stats: { k: string; v: string }[];
  body: string;
  outcome: string | string[];
}

const tiles: Tile[] = [
  {
    source: 'Build · Anchor Leg · Sep 2019 to Jul 2026',
    headline: 'Built a business from nothing and ran it for seven years.',
    role: 'Co-founder, operating as Managing Director. Two of us owned it. My side of the table was operations, delivery, product and commercial performance.',
    stats: [
      { k: 'Years running it', v: '7' },
      { k: 'Projects delivered', v: '350-400' },
      { k: 'People at peak', v: '50' },
    ],
    body: 'I built the operating system behind 350 to 400 projects: estimating models, statements of work, resource planning, time tracking and a weekly reconciliation, run on a monthly cadence with a part-time chief financial officer. I led and coached five to six project managers, flexing specialist teams with demand and tying resource decisions to cash flow and delivery risk. Between us we built a client portfolio spanning Nike, HUGO BOSS, Palantir, Western Union and Tommy Hilfiger, across strategy, experience, production and digital delivery.',
    outcome: 'We held revenue flat for four consecutive years through COVID and repeated client restructures, improved margin on delivered work year on year, and mobilised up to 50 people at peak. Nike became the anchor client across five business areas and European and global teams. I stayed personally involved in the work to the end, including shaping high-level strategy and customer experience for Nike.com.',
  },
  {
    source: 'Transform · Volkswagen · Tribal Worldwide London',
    headline: 'Took over a programme running hard over budget and brought it back under control.',
    role: 'Head of Delivery, taken over mid-programme. Volkswagen UK, Commercial Vehicles, Finance and campaign work, across the full technology estate. This was the agency’s largest client relationship. My remit was the delivery inside it, not the account.',
    stats: [
      { k: 'Position', v: 'Largest client' },
      { k: 'Scope', v: 'Full estate' },
      { k: 'Overrun passed to client', v: 'None' },
    ],
    body: 'I inherited the programme mid-delivery and replaced an unusable hundred-page scope with an executable commercial and delivery plan. Front end, back end, complete API rewrites and content, with data and APIs sequenced a sprint ahead of build. I managed the project management team and client governance across the account. A year in we were running materially over and nobody was saying it out loud, so I put leadership, middle management and the delivery team in one room and had the conversation.',
    outcome: 'The exposure came down materially, the client paid none of it, and I led the successful website relaunch. Across four years I held delivery responsibility on both sides of the agency’s account base and managed the project management teams underneath it, including the Unilever brand digital ecosystem work and the Morrisons app. The chief executive then asked me to design the agency’s first organisation-wide operating framework.',
  },
  {
    source: 'Design · Ways of working · Tribal Worldwide London',
    headline: 'Designed the operating framework a chief executive asked for.',
    role: 'Commissioned directly by the chief executive. Written with the leadership team and the head of operations, not issued to them.',
    stats: [
      { k: 'Disciplines brought together', v: '3' },
      { k: 'Commissioned by', v: 'The CEO' },
      { k: 'Still referenced', v: '8 yrs on' },
    ],
    body: 'Three parts of the agency worked in three different ways. Consultancy, web development and communications were each capable on their own, and none of them handed work over cleanly to the others. I designed the agency’s first organisation-wide way of working, built alongside the leadership team and the head of operations so that people recognised their own practice inside it rather than being handed somebody else’s.',
    outcome: 'It outlasted my time there. A former chief executive still refers to it eight years later, and it is the piece of work I am asked about most. It is also the clearest evidence that what I fix is not only programmes. It is how an organisation works.',
  },
  {
    source: 'Rescue · Fiskars · Mirum (JWT) · Apr to Jun 2018',
    headline: 'Produced the honest number that let a client stop before spending more.',
    role: 'Digital Programme Director, contract. Others had held the role before me without being able to steady it.',
    stats: [
      { k: 'Team re-interviewed', v: '15' },
      { k: 'Time to the finding', v: '6 weeks' },
      { k: 'Outcome', v: 'A decision' },
    ],
    body: 'A multi-market ecommerce build with most of the budget already spent and nobody able to say what finishing would cost. I went to the delivery floor and sat with all fifteen people individually, brought both remaining senior technologists in inside a week, and rebuilt the technical picture, backlog, estimates and plan with the team who would have to build it. Six weeks.',
    outcome: 'The evidence showed the true cost to finish sat far above the budget, and enabled the client to make a defensible decision to stop. JWT’s chief financial officer commended the work. I moved on to a customer experience and service blueprint assignment and was invited to join Mirum permanently.',
  },
  {
    source: 'Win · Falabella · Tribal Worldwide London',
    headline: 'Won a nine-month pitch, built the platform, and left them able to run it.',
    role: 'Led the delivery side of the competitive pitch and the resulting programme. Around twenty of us in London, with the client in Santiago.',
    stats: [
      { k: 'Pitch', v: '9 months' },
      { k: 'Team', v: '20' },
      { k: 'Where it ended', v: 'In-house' },
    ],
    body: 'Six London agencies were invited. What won it, I think, is that we kept turning up. I planned the whole programme sprint by sprint on a wall, every workstream with the risks and dependencies on it, and when they came over after we’d won we negotiated the contract standing in front of it. A complete new commerce platform across several markets and languages, with research, two rounds of desirability testing, design and front-end build. The client sat eight thousand miles away in Santiago, a different language and a working day that only partly overlapped with ours. Day one on site they had most of the business in a room, and it dawned on us that what we’d won was not only a build. It was upskilling their business through the process. That turned out to be the whole engagement, and they took the work in-house afterwards because by then they could run it.',
    outcome: [
      'We scoped the work before we had picked the technical framework. The estimate came back at a quarter of what the build actually needed. We went back to the client, held our hands up and repriced it, recovered about two thirds through a change request and carried the rest ourselves in reduced margin. The project still made money, and it put the agency into ecommerce properly for the first time.',
      'The lesson is one line and I have not broken it since. Don’t scope a build before you have chosen the framework.',
    ],
  },
  {
    source: 'Sustain · Royal Mail Group · Proximity London · 2010 to 2014',
    headline: 'Helped hold a multi-year programme together through seven changes of sponsor.',
    role: 'Project Director, promoted from Senior Project Manager within three months. Royal Mail Group, Parcelforce and the Post Office.',
    stats: [
      { k: 'Years held', v: '4' },
      { k: 'Team at peak', v: '30' },
      { k: 'Sponsors survived', v: '7' },
    ],
    body: 'I led the delivery element of Royal Mail’s digital estate redesign, across corporate, SME and personal audiences. My job was holding it together: strategy, research, UX, design, front-end build and content, sequenced against Capgemini’s back-end delivery. Twenty-one personas, a team of up to 30, and a migration of more than 2,000 pages. Every new head of digital arrived with their own view, and the last one had the home page replanned from the ground up. Not one of those changes was absorbed. Each was evidenced, priced and paid for.',
    outcome: 'Delivery continuity supported subsequent Parcelforce, Royal Mail Group and Post Office engagements, inside an agency that had never done web work at this level before.',
  },
  {
    source: 'Grow · Nike · through Anchor Leg · 2024 to 2025',
    headline: 'Turned one research brief into ownership of Nike.com customer experience strategy.',
    role: 'Shaped, won and led the work. Presented to around twenty Nike leaders including the Head of Digital.',
    stats: [
      { k: 'Won in', v: '2 days' },
      { k: 'Presented to', v: '20 leaders' },
      { k: 'Business areas', v: '5' },
    ],
    body: 'A brief arrived asking for clarity on how Gen Z women experienced Nike’s shopping journey. We won it two days later against one other agency, ran it from December 2024 to April 2025, and presented the findings to around twenty Nike people including the head of digital.',
    outcome: 'It extended what we were trusted with. On the strength of that research we were in the running for the dot com work, and went on to shape high-level strategy and customer experience for Nike.com across navigation, search, the home page and the deeper journeys, handed over as a practical platform playbook.',
  },
];

// ── The full record (nine role entries) ─────────────────────────────────────
interface Role {
  org: string;
  title: string;
  dates: string;
  location: string;
  visible: string[]; // always shown
  expand: string[]; // behind the one-way "More"
}

const roles: Role[] = [
  {
    org: 'DAB Hands',
    title: 'Founder and Operating Adviser',
    dates: 'Jun 2026 to present',
    location: 'Remote',
    visible: [
      'Operating leadership for agencies and brands whose digital has to perform.',
      'I help set the direction, then hold every moving part together until the business gets there.',
    ],
    expand: [
      'Engagements start small. A paid diagnostic of two to three weeks, fixed scope, ending in a plan the client owns.',
    ],
  },
  {
    org: 'Anchor Leg',
    title: 'Co-founder, Managing Director',
    dates: 'Sep 2019 to Jul 2026',
    location: 'Remote',
    visible: [
      'Co-founded a digital consultancy and owned the operating side of it. Proposition, operating model, delivery and commercial performance.',
      'Delivered 350 to 400 projects for Nike, HUGO BOSS, Palantir, Western Union and Tommy Hilfiger, across strategy, customer experience, production and digital delivery.',
    ],
    expand: [
      'Built the machinery underneath it, including estimating models, statements of work, resource planning and a weekly reconciliation that surfaced an overburn while there was still a decision to make.',
      'Led and coached five to six project managers, flexed specialist teams to demand up to fifty people at peak, and held revenue flat for four consecutive years through COVID and repeated client restructures.',
      'Nike became the anchor client across five business areas and European and global teams.',
    ],
  },
  {
    org: 'BBH London',
    title: 'Digital Programme Director, contract',
    dates: 'Jul 2018 to Sep 2019',
    location: 'London',
    visible: [
      'Led digital delivery for Audi UK across web business as usual, campaigns, digital experience and a future of mobility consultancy.',
      'Built the multidisciplinary team and operating model behind a newly won account, turning a pitch win into a working capability.',
    ],
    expand: ['Ran the redesign of the Audi UK front end, with a team of around twenty.'],
  },
  {
    org: 'Mirum (JWT)',
    title: 'Digital Programme Director, contract',
    dates: 'Apr to Jun 2018',
    location: 'London',
    visible: [
      'Brought into a multi-market ecommerce build that had lost its centre and could not say what finishing would cost.',
      'Went to the delivery floor, sat with all fifteen people individually, and rebuilt the technical picture, backlog and estimates with the team who would have to build it.',
    ],
    expand: [
      'Six weeks later there was a number nobody had been able to produce before, and the client used it to take a defensible decision.',
      'Invited to join Mirum permanently, and moved on to a customer experience and service blueprint assignment.',
    ],
  },
  {
    org: 'Tribal Worldwide London',
    title: 'Head of Delivery',
    dates: 'Feb 2014 to Mar 2018',
    location: 'London',
    visible: [
      'Held delivery responsibility across both sides of the agency’s account base and managed the project management teams underneath it, across four years. That covered its major programmes, including the Unilever brand digital ecosystem work, the Morrisons app and O2.',
      'Took on Volkswagen, the largest client relationship, mid-programme and across Volkswagen UK, Commercial Vehicles, Finance and campaign work. Replaced an unusable scope with an executable commercial and delivery plan, brought a projected overrun back under control without passing it to the client, and led the platform relaunch.',
    ],
    expand: [
      'Led the delivery side of the pitch that won the agency its first ecommerce build, for Falabella, then delivered it across London and Santiago. Client on another continent, in another language, on a working day that only partly overlapped. One plan both sides worked from, decisions taken inside the hours we shared, travel used only for the conversations that needed a room.',
      'Asked by the chief executive to design the agency’s first organisation-wide operating framework, across consultancy, web development and communications.',
    ],
  },
  {
    org: 'Proximity London',
    title: 'Project Director',
    dates: 'Mar 2010 to Jan 2014',
    location: 'London',
    visible: [
      'Led the delivery element of Royal Mail’s digital estate redesign, across corporate, SME and personal audiences.',
      'Held strategy, research, UX, design, front-end build and content together, sequenced against Capgemini’s back-end delivery. Twenty-one personas, a team of up to thirty, and more than two thousand pages migrated.',
    ],
    expand: [
      'Helped to hold the programme through seven changes of client sponsor. Every change was evidenced, priced and agreed rather than quietly absorbed.',
      'Promoted from Senior Project Manager within three months. The work opened Parcelforce and the Post Office for an agency that had never done web at this level before.',
    ],
  },
  {
    org: 'Redbox Digital',
    title: 'Senior Project Manager',
    dates: 'Nov 2008 to May 2010',
    location: 'London',
    visible: [
      'Delivered ecommerce and digital programmes for Johnson & Johnson and Fortnum & Mason.',
      'First proof that the scrum discipline travelled into an agency that worked nothing like the last one.',
    ],
    expand: [],
  },
  {
    org: 'Conchango',
    title: 'Business Analyst',
    dates: 'Jul 2007 to Nov 2008',
    location: 'London',
    visible: [
      'Sole analyst on the River Island ecommerce redesign.',
      'Translated merchandising rules, product attributes and buyer workflows into the back-end experience, designed the workflow and wrote the functional specification, then sat with the quality assurance team to test what had been built.',
    ],
    expand: ['Learned scrum from the people who brought it into the UK.'],
  },
  {
    org: 'Herbalife Europe',
    title: 'Creative Services Manager, EMEA',
    dates: 'Feb 2002 to Jun 2007',
    location: 'Uxbridge',
    visible: [
      'Ran creative services across more than thirty European markets.',
      'Introduced an asset management system with the adoption guidance behind it.',
    ],
    expand: ['First attempt at building consistency and operational control across a distributed organisation.'],
  },
];

// ── Testimonials ────────────────────────────────────────────────────────────
const testimonials = [
  { quote: 'Darren has a brilliant ability to operationalise strategy. He quickly grasps the intent behind an idea, then builds the practical ways of working that allow an organisation to deliver on it. That’s a capability I’ve always admired.', name: 'Neil Munn', role: 'Former Global CEO, BBH' },
  { quote: 'Darren brings control to complex situations quickly. He aligns teams, simplifies decisions, and gets the work moving again without losing what made it strong.', name: 'Joel Sinnott', role: 'Senior Digital Lead, Nike' },
  { quote: 'Darren’s influence extended far beyond the delivery function. He created and implemented Tribal’s first agency-wide ways-of-working framework, helping teams align around a common approach while strengthening consistency, accountability and performance across the business.', name: 'Tom Roberts', role: 'Former CEO, Tribal Worldwide London' },
  { quote: 'He doesn’t just deliver. He protects the integrity of the work as it moves through the system. That’s rare.', name: 'Anthony Mahon', role: 'Former Global Membership Director, HUGO BOSS' },
  { quote: 'Darren combines operational rigour with a deep understanding of people and creative work. He can bring structure to complexity without losing sight of what the organisation is trying to achieve. It’s a rare combination, and one that makes him particularly effective in environments where change, growth and execution need to happen at the same time.', name: 'Gary Shannon', role: 'Former Managing Partner, Tribal Worldwide London' },
  { quote: 'A calm, experienced operator who knows how to step into complexity, align people, and make things work under pressure.', name: 'Meher Mumtaz', role: 'Former Digital Brand Director, Western Union' },
  { quote: 'Darren walked into a really difficult situation and made sense of it remarkably quickly. Within a few weeks, there was a plan, people understood what they were doing again, and the temperature had dropped considerably. He brings a calmness and momentum that’s incredibly valuable when projects start to drift.', name: 'Dave Wallace', role: 'Former Global COO, Mirum' },
];

// ── Horizontal scroll rail (shared by the tiles and the testimonials) ────────
function ScrollRail({ ariaLabel, dark = false, children }: { ariaLabel: string; dark?: boolean; children: ReactNode[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = children.length;

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(count - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="tr-rail-wrap">
      <div
        ref={trackRef}
        onScroll={onScroll}
        role="group"
        aria-label={ariaLabel}
        className="tr-rail work-track flex snap-x snap-mandatory overflow-x-auto"
      >
        {children.map((child, i) => (
          <div key={i} className="work-snap shrink-0 basis-full min-w-full pr-0">
            {child}
          </div>
        ))}
      </div>

      <div className="tr-controls mt-7 flex items-center gap-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${dark ? 'border-bone/40 text-bone hover:border-bone disabled:hover:border-bone/40' : 'border-stone text-ink hover:border-ink disabled:hover:border-stone'}`}
          >
            <span aria-hidden className="text-[17px] leading-none">&larr;</span>
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === count - 1}
            aria-label="Next"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${dark ? 'border-bone/40 text-bone hover:border-bone disabled:hover:border-bone/40' : 'border-stone text-ink hover:border-ink disabled:hover:border-stone'}`}
          >
            <span aria-hidden className="text-[17px] leading-none">&rarr;</span>
          </button>
        </div>
        <div className="flex flex-1 flex-wrap gap-0.5">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              className="flex h-6 min-w-6 items-center justify-center"
            >
              <span
                aria-hidden
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? dark ? 'w-7 bg-bone' : 'w-7 bg-ink'
                    : dark ? 'w-2 bg-bone/30 hover:bg-bone/60' : 'w-2 bg-stone hover:bg-graphite'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrackRecord() {
  // Open every disclosure for print, then restore afterwards.
  useEffect(() => {
    const setAll = (open: boolean) =>
      document.querySelectorAll<HTMLDetailsElement>('.tr-print details').forEach((d) => {
        if (open) d.dataset.wasOpen = d.open ? '1' : '0';
        d.open = open ? true : d.dataset.wasOpen === '1';
      });
    const before = () => setAll(true);
    const after = () => setAll(false);
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  return (
    <>
      <SeoMeta
        title="Experience | DAB Hands"
        description="Twenty years of leading complex digital programmes inside agencies and alongside global brands, and seven years running a consultancy. What I ran, what I was brought in to do, and what came of each one."
        path="/experience"
      />

      <style>{`
        /* One-way disclosures: once open, the trigger is gone (no "Less"). */
        .tr-more[open] > summary { display: none; }
        /* Two-way toggles signal their state by turning: the section's plus
           becomes a cross, the outcome's arrow points back up. */
        .tr-record[open] .tr-record-plus { transform: rotate(45deg); }
        .tr-outcome-arrow { transition: transform .2s ease; }
        .tr-outcome[open] .tr-outcome-arrow { transform: rotate(180deg); }
        .tr-more > div, .tr-outcome > div { animation: tr-reveal .2s ease both; }
        @keyframes tr-reveal { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .tr-more > div, .tr-outcome > div, .tr-record-plus, .tr-outcome-arrow { animation: none; transition: none; }
        }
        @media print {
          .tr-rail { display: block !important; overflow: visible !important; }
          .tr-rail > .work-snap { width: 100% !important; min-width: 0 !important; page-break-inside: avoid; margin-bottom: 28px; }
          .tr-controls { display: none !important; }
        }
      `}</style>

      <Layout footerVariant="none">
        <div className="tr-print">
          {/* 1 ── HEADER: warm stone + the soft Clay wash used on the doorways
              and Contact (this is now a top-level page too). ─────────────── */}
          <section
            className="relative isolate overflow-hidden bg-bone text-ink pt-32 md:pt-40 pb-14 md:pb-16"
            style={{ backgroundImage: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-clay) 42%, transparent), color-mix(in srgb, var(--color-clay) 20%, transparent) 55%, transparent 100%)' }}
          >
            <div className="u-container">
              <div className="u-grid items-center gap-y-8 lg:gap-y-0">
                {/* The headshot: square on the right (lg), a shallow full-width
                    sliver above the copy on smaller screens, same as the
                    doorway heroes. */}
                <div className="col-span-4 md:col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-1">
                  <div className="relative aspect-[5/2] lg:aspect-square overflow-hidden rounded-2xl ring-1 ring-inset ring-ink/10">
                    {/* Two crops cut to shape from the studio frame rather than
                        letting object-cover decide: the square holds the head
                        with headroom at lg, and the 5:2 band keeps it whole in
                        the shallow sliver below it. One accessible name for the
                        pair; the other is hidden from assistive tech. */}
                    <Image
                      src="/images/darren-headshot-studio-wide-1.jpg"
                      alt=""
                      aria-hidden
                      fill
                      priority
                      quality={82}
                      sizes="92vw"
                      className="object-cover lg:hidden"
                    />
                    <Image
                      src="/images/darren-headshot-studio-1.jpg"
                      alt="Darren Brett"
                      fill
                      priority
                      quality={82}
                      sizes="38vw"
                      className="hidden object-cover lg:block"
                    />
                  </div>
                </div>
                <div className="relative col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1">
                  {/* The masthead line: the name in the eyebrow accent, role
                      clue after a middot in the brand gold. It names the person
                      rather than the page, which the nav already does. */}
                  <FadeUp>
                    <p className="eyebrow pt-2 text-blue-green">
                      Darren Brett
                      <span className="font-medium text-gold"> · Fractional COO &amp; Digital Operator</span>
                    </p>
                  </FadeUp>
                  {/* The one Instrument line on this page. Everything beneath it is
                      Manrope, the same rule the homepage intro block follows. */}
                  <FadeUp delay={0.06}>
                    <h1 className="mt-8 font-serif text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] max-w-[18ch]">
                      Operations and delivery leader, digital specialist and entrepreneur’s engine.
                    </h1>
                  </FadeUp>
                  <FadeUp delay={0.12}>
                    <p className="mt-7 md:mt-8 text-lg md:text-xl text-ink leading-relaxed max-w-[46ch]">
                      Twenty years running other people’s programmes. Seven running my own business.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.18}>
                    <p className="mt-4 text-lg md:text-xl text-graphite leading-relaxed max-w-[46ch]">
                      Below is what I ran, what I was brought in to do, and what came of each one.
                    </p>
                  </FadeUp>
                </div>
              </div>
            </div>
          </section>

          {/* 2 ── SEVEN-TILE RAIL ────────────────────────────────── */}
          <section className="bg-charcoal text-bone pb-16 md:pb-24 pt-16 md:pt-24">
            <div className="u-container">
              <FadeUp>
                <p className="eyebrow text-gold mb-8 md:mb-10">Selected leadership impact</p>
              </FadeUp>
              <ScrollRail ariaLabel="Selected leadership impact" dark>
                {tiles.map((t) => (
                  <article key={t.source} className="pr-4 md:pr-10">
                    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 md:items-start lg:gap-x-16">
                      {/* Left column: identity and the numbers. */}
                      <div>
                        <p className="eyebrow text-bone/50">{t.source}</p>
                        <h2 className="mt-4 font-serif text-[28px] md:text-[38px] leading-[1.1] max-w-[20ch] text-bone">{t.headline}</h2>
                        <p className="mt-5 text-[15px] leading-relaxed text-bone/70 max-w-[46ch]">{t.role}</p>
                        <dl className="mt-7 grid grid-cols-3 gap-x-4 gap-y-2 border-t border-bone/20 pt-6">
                          {t.stats.map((s) => (
                            <div key={s.k}>
                              <dd className="font-serif text-[26px] md:text-[30px] leading-none text-bone">{s.v}</dd>
                              <dt className="mt-2 text-[11px] uppercase tracking-[0.14em] text-bone/55 leading-snug">{s.k}</dt>
                            </div>
                          ))}
                        </dl>
                      </div>
                      {/* Right column: the narrative and the payoff. */}
                      <div>
                        <p className="text-[15px] md:text-[16px] leading-[1.7] text-bone/80">{t.body}</p>
                        <details className="tr-outcome mt-6 border-t border-bone/20 pt-4">
                          <summary className="flex cursor-pointer list-none items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-gold [&::-webkit-details-marker]:hidden">
                            What came of it
                            <span aria-hidden className="tr-outcome-arrow inline-block text-[13px] leading-none">&darr;</span>
                          </summary>
                          <div className="mt-4 border-l-2 border-gold pl-5 text-[15px] md:text-[16px] leading-[1.7] text-bone/85">
                            {Array.isArray(t.outcome)
                              ? t.outcome.map((para, i) => (
                                  <p key={para.slice(0, 24)} className={i ? 'mt-3' : undefined}>
                                    {para}
                                  </p>
                                ))
                              : t.outcome}
                          </div>
                        </details>
                      </div>
                    </div>
                  </article>
                ))}
              </ScrollRail>
            </div>
          </section>

          {/* 3 ── THE FULL RECORD ────────────────────────────────── */}
          <section className="bg-paper text-ink py-16 md:py-24 border-t border-stone/50">
            <div className="u-container">
              <details className="tr-record">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block font-serif text-[26px] md:text-[34px] leading-[1.1]">The full record</span>
                    <span className="mt-2 block text-[12px] uppercase tracking-[0.18em] text-graphite">Full working history</span>
                  </span>
                  <span aria-hidden className="tr-record-plus mt-1.5 inline-flex shrink-0 transition-transform duration-300" style={{ color: '#9A7735' }}>
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                  </span>
                </summary>

                <div className="mt-10 md:mt-14 flex flex-col">
                  {roles.map((r, i) => {
                    const all = [...r.visible, ...r.expand];
                    return (
                      <div
                        key={r.org}
                        className={i === 0 ? '' : 'border-t border-stone/60 pt-8 mt-8 md:pt-10 md:mt-10'}
                      >
                        {/* Header: org (gold) with dates and location. */}
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3 className="font-serif text-[24px] md:text-[28px] leading-tight" style={{ color: '#9A7735' }}>{r.org}</h3>
                          <p className="text-[12px] uppercase tracking-[0.14em] text-graphite">{r.dates} · {r.location}</p>
                        </div>
                        <p className="mt-2.5 text-[11px] uppercase tracking-[0.18em] text-blue-green">{r.title}</p>
                        {/* The detail flowed across three columns, balanced by
                            the browser to roughly equal depth (CSS multi-column).
                            Paragraphs stay whole. */}
                        <div className="mt-5 text-[15px] leading-[1.65] text-ink/85 md:columns-3 md:gap-8 [&>p]:mb-3 [&>p]:break-inside-avoid [&>p:last-child]:mb-0">
                          {all.map((line, j) => (
                            <p key={j}>{line}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          </section>

          {/* 4 ── IN THEIR WORDS: the same solid Slate Blue trust panel used on
              the doorway pages, bone copy, auto-rotating with pips. ───────── */}
          <section className="text-bone py-20 md:py-28 lg:py-32" style={{ backgroundColor: 'var(--color-blue-green)' }}>
            <div className="u-container">
              <div className="u-grid gap-y-8">
                <FadeUp className="col-span-4 md:col-span-12">
                  <p className="font-serif text-[20px] md:text-[24px] leading-[1.2] text-bone/80">In their words</p>
                </FadeUp>
                <FadeUp delay={0.08} className="col-span-4 md:col-span-9 md:col-start-1">
                  <Testimonials items={testimonials} interval={7000} />
                </FadeUp>
              </div>
            </div>
          </section>

          {/* 4b ── TRUSTED LOGOS: the homepage "Trusted where the stakes are
              high" marquee, below the testimonials. ─────────────────────── */}
          <section className="bg-bone text-ink py-16 md:py-24">
            <div className="u-container">
              <FadeUp>
                <p className="eyebrow text-graphite mb-10 md:mb-12 text-center">Trusted where the stakes are high</p>
              </FadeUp>
              <FadeUp delay={0.06}>
                <LogoTicker ariaLabel="Brands I’ve worked with" />
              </FadeUp>
            </div>
          </section>

          {/* 5 ── CLOSE: the same centred close used on the doorways — crown,
              serif line, then the charcoal CTA (hover fills slate). ──────── */}
          <section className="bg-bone text-ink py-16 md:py-24 lg:py-28 border-t border-stone/50">
            <div className="u-container">
              <div className="u-grid">
                <div className="col-span-4 md:col-span-8 md:col-start-3 text-center">
                  <FadeUp>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} loading="lazy" decoding="async" className="block mx-auto mb-5 md:mb-6 h-9 md:h-10 w-auto select-none" />
                    <h2 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] max-w-[24ch] mx-auto">Recognise any of it?</h2>
                  </FadeUp>
                  <FadeUp delay={0.06}>
                    <p className="mt-4 text-lg text-graphite max-w-[54ch] mx-auto text-balance">
                      If something on this page sounds like where you are,{' '}
                      <br className="hidden md:block" />
                      that is usually a good place to start.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.1}>
                    <div className="mt-8 flex justify-center">
                      <a
                        href={mailto()}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-[var(--color-blue-green)]"
                      >
                        Start a conversation
                        <span aria-hidden className="text-[17px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                      </a>
                    </div>
                  </FadeUp>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
