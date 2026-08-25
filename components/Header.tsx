import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The three destination pages live under "Who I help". The per-audience colours
// are retired — all three share one palette now. `tint` is the Cloud Pink mobile
// lead dash, `deep` the Deep Blue-Green locator/label colour (legible on the bone
// bar), `block` the faint hover fill behind a dropdown option.
const NAV_TINT = 'var(--color-gold)';
const NAV_DEEP = 'var(--color-blue-green)';
const NAV_BLOCK = 'color-mix(in srgb, var(--color-blue-green) 12%, transparent)';
export const audiences = [
  { href: '/business-and-agency-leaders', label: 'Business & Agency Leaders', role: 'Fractional COO · Operating Partner', context: 'For Business & Agency Leaders', tint: NAV_TINT, deep: NAV_DEEP, block: NAV_BLOCK },
  { href: '/marketing-leaders', label: 'Marketing Leaders', role: 'Programme & Delivery Director', context: 'For Marketing Leaders', tint: NAV_TINT, deep: NAV_DEEP, block: NAV_BLOCK },
  { href: '/growth-stage-businesses', label: 'Growth-Stage Businesses', role: 'Fractional COO', context: 'For Growth-Stage Businesses', tint: NAV_TINT, deep: NAV_DEEP, block: NAV_BLOCK },
];

export const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // mobile sheet
  const [whoOpen, setWhoOpen] = useState(false); // desktop dropdown
  const [hoveredWho, setHoveredWho] = useState<string | null>(null); // dropdown item under cursor
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false); // nav tucks away while actively scrolling
  const [atP2, setAtP2] = useState(false); // true once scrolled to the doorway's second panel (P2)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The nav slides up out of view while the user is actively scrolling and glides
  // back ~1s after scrolling stops — uniformly, everywhere on the page (the old
  // "hide zone" suppression over the carousel/testimonial panels is retired: the
  // owner wants the masthead returning on idle over every section). It stays put
  // at the very top of the page. The 1s idle pause + the slower slide-in (see
  // header className) keep it premium.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 10); // hide once we've moved off the top; glides back on idle
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), 1000);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [router.pathname]);

  // The doorway pages tag their second panel ("The Situation") with [data-p2].
  // Reveal the masthead room locator as soon as we've scrolled to P2, and keep it
  // for the rest of the page. The trigger is scroll-through-the-hero (past half of
  // P1), not P2's viewport position — viewport-fraction would fire at load on tall
  // screens where P2 already peeks in. No P2 on a page (home/contact) → never shows.
  useEffect(() => {
    const onScroll = () => {
      const p2 = document.querySelector('[data-p2]');
      if (!p2) {
        setAtP2(false);
        return;
      }
      const heroHeight = p2.getBoundingClientRect().top + window.scrollY; // P2 offset = P1 height
      setAtP2(window.scrollY > heroHeight * 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [router.pathname]);

  // Close both menus whenever we navigate.
  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setWhoOpen(false);
    };
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);

  // Escape closes the desktop dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWhoOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openWho = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setWhoOpen(true);
  };
  const closeWhoDelayed = () => {
    closeTimer.current = setTimeout(() => setWhoOpen(false), 120);
  };

  const whoActive = audiences.some((a) => router.pathname === a.href);
  const trackActive = router.pathname === '/experience';
  const contactActive = router.pathname === '/contact';
  const room = audiences.find((a) => router.pathname === a.href) ?? null;
  const showContext = atP2 && !!room;
  // An open menu always keeps the nav on screen; otherwise it's the normal
  // scroll/idle behaviour, uniform across the whole page.
  const navHidden = menuOpen || whoOpen ? false : hidden;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[transform,background-color,border-color] motion-reduce:transition-none ${
          navHidden
            ? 'duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] -translate-y-full'
            : 'duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] translate-y-0'
        } ${scrolled ? 'bg-bone/85 backdrop-blur-md border-b border-stone/70' : 'bg-transparent'}`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          <div className="relative">
            {/* The lockup: the drawn crown beside the serif wordmark (owner call,
                2026-08-17). The crown reads slightly taller than the caps, its
                base sitting near the text baseline, like the reference lockup. */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 md:gap-3"
              aria-label="DAB Hands, home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} decoding="async" className="block h-7 md:h-8 w-auto select-none" />
              <span className="font-serif text-ink text-[24px] md:text-[28px] leading-none tracking-[-0.01em]">DAB Hands</span>
            </Link>
            {/* Persistent room locator: fades in beneath the wordmark once the
                second panel is scrolled to. Absolute so it never nudges the
                wordmark; left edge aligns to the wordmark, in Deep Blue-Green
                (the legible accent, matching the hero eyebrow). */}
            <AnimatePresence>
              {showContext && room && (
                <motion.span
                  key={room.href}
                  aria-hidden
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color: room.deep }}
                  className="absolute left-0 top-full mt-[2px] md:mt-1.5 whitespace-nowrap text-[10px] md:text-[10.5px] uppercase tracking-[0.18em] leading-none"
                >
                  {room.context}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11">
            <div className="relative" onMouseEnter={openWho} onMouseLeave={closeWhoDelayed}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={whoOpen}
                onClick={() => setWhoOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 text-[14px] tracking-[-0.01em] transition-colors ${
                  whoActive ? 'text-ink' : 'text-graphite hover:text-ink'
                }`}
              >
                Who I help
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform duration-300 ${whoOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {whoOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full pt-3"
                    role="menu"
                  >
                    <div className="w-[300px] rounded-2xl border border-stone/70 bg-bone/95 backdrop-blur-md p-3 shadow-[0_22px_55px_-34px_rgba(31,31,29,0.4)]">
                      {audiences.map((a) => {
                        const active = router.pathname === a.href;
                        const hovered = hoveredWho === a.href;
                        // The current page sits in a soft grey "you are here"; the
                        // option under the cursor lights up gold (the live selection).
                        const bg = active
                          ? 'color-mix(in srgb, var(--color-stone) 60%, transparent)'
                          : hovered
                            ? 'color-mix(in srgb, var(--color-gold) 38%, transparent)'
                            : undefined;
                        return (
                          <Link
                            key={a.href}
                            href={a.href}
                            role="menuitem"
                            aria-current={active ? 'page' : undefined}
                            onMouseEnter={() => setHoveredWho(a.href)}
                            onMouseLeave={() => setHoveredWho(null)}
                            className="block rounded-xl px-3 py-2.5 transition-colors duration-200"
                            style={{ backgroundColor: bg }}
                          >
                            <span className="block text-[14.5px] leading-snug text-ink">{a.label}</span>
                            {/* Deep accent #7E5E27 rather than --color-gold: at 11px
                                Aged Gold clears neither the bone panel nor the gold
                                hover fill behind it. */}
                            <span className="eyebrow mt-1 block" style={{ color: '#7E5E27' }}>{a.role}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/experience"
              className={`text-[14px] tracking-[-0.01em] transition-colors ${
                trackActive ? 'text-ink' : 'text-graphite hover:text-ink'
              }`}
            >
              Experience
            </Link>

            <Link
              href="/contact"
              className={`text-[14px] tracking-[-0.01em] transition-colors ${
                contactActive ? 'text-ink' : 'text-graphite hover:text-ink'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex flex-col items-end justify-center gap-[6px] text-ink"
          >
            <span className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? 'w-7 rotate-45 translate-y-[7px]' : 'w-7'}`} />
            <span className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0 w-7' : 'w-5'}`} />
            <span className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? 'w-7 -rotate-45 -translate-y-[7px]' : 'w-7'}`} />
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bone text-ink pt-28 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <nav className="flex flex-col">
              <p className="eyebrow text-graphite mb-5">Who I help</p>
              <div className="flex flex-col mb-8">
                {audiences.map((a, i) => (
                  <motion.span
                    key={a.href}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <Link href={a.href} onClick={() => setMenuOpen(false)} className="flex items-start gap-4 py-2">
                      <span aria-hidden className="mt-[18px] block h-px w-6 shrink-0 rounded-full" style={{ backgroundColor: a.tint }} />
                      <span className="block">
                        <span className="block font-serif text-[30px] leading-[1.18]">{a.label}</span>
                        <span className="eyebrow mt-1 block" style={{ color: '#7E5E27' }}>{a.role}</span>
                      </span>
                    </Link>
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + audiences.length * 0.05 }}
              >
                <Link
                  href="/experience"
                  onClick={() => setMenuOpen(false)}
                  className="block font-serif text-[30px] leading-[1.18] py-1.5 border-t border-stone pt-6"
                >
                  Experience
                </Link>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + (audiences.length + 1) * 0.05 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block font-serif text-[30px] leading-[1.18] py-1.5"
                >
                  Contact
                </Link>
              </motion.span>
            </nav>
            <p className="eyebrow text-graphite">DAB Hands</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
