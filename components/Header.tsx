import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The three destination pages live under "Who I help". Each carries its own
// pathway colour (Business=sage, Marketing=peach, Creators=lavender). In the
// desktop dropdown the hovered/active option gets a soft block of that colour
// while the label stays ink; `tint` is the solid accent (mobile lead dash),
// `block` the low-alpha hover fill.
export const audiences = [
  { href: '/business-and-agency-leaders', label: 'Business & agency leaders', context: 'For business & agency leaders', tint: 'var(--color-sage)', deep: 'var(--color-sage-deep)', block: 'color-mix(in srgb, var(--color-sage) 22%, transparent)' },
  { href: '/marketing-leaders', label: 'Marketing leaders', context: 'For marketing leaders', tint: 'var(--color-peach)', deep: 'var(--color-peach-deep)', block: 'color-mix(in srgb, var(--color-peach) 24%, transparent)' },
  { href: '/creators-and-founders', label: 'Creators & founders', context: 'For creators & founders', tint: 'var(--color-lavender)', deep: 'var(--color-lavender-deep)', block: 'color-mix(in srgb, var(--color-lavender) 24%, transparent)' },
];

export const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // mobile sheet
  const [whoOpen, setWhoOpen] = useState(false); // desktop dropdown
  const [hoveredWho, setHoveredWho] = useState<string | null>(null); // dropdown item under cursor
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false); // nav tucks away while actively scrolling
  const [atP2, setAtP2] = useState(false); // true once scrolled to the doorway's second panel (P2)
  const [hideZone, setHideZone] = useState(false); // inside a section that keeps the masthead tucked away (e.g. the work carousel)
  const [peekTop, setPeekTop] = useState(false); // pointer at the top edge — reveal even inside a hide zone
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The nav slides up out of view while the user is actively scrolling and glides
  // back ~1s after scrolling stops. It stays put at the very top of the page. The
  // 1s idle pause + the slower slide-in (see header className) keep it premium.
  // It also tracks "hide zones": sections tagged [data-hide-masthead] (e.g. the
  // work carousel) that keep the nav tucked away while they own the viewport, so
  // the idle-return can't flicker the nav on and off over them.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 10); // hide once we've moved off the top; glides back on idle
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), 1000);
      const zone = document.querySelector('[data-hide-masthead]');
      if (zone) {
        const r = zone.getBoundingClientRect();
        const mid = window.innerHeight / 2;
        setHideZone(r.top < mid && r.bottom > mid); // the zone owns the viewport centre
      } else {
        setHideZone(false);
      }
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

  // Inside a hide zone the nav stays hidden — unless the pointer reaches the top
  // edge of the viewport, which brings it back so the menu is always reachable.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const y = e.clientY;
      setPeekTop((prev) => (y <= 80 ? true : y > 160 ? false : prev));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

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
  const contactActive = router.pathname === '/contact';
  const room = audiences.find((a) => router.pathname === a.href) ?? null;
  const showContext = atP2 && !!room;
  // In a hide zone the nav stays tucked away (no idle flicker); a pointer at the
  // top edge or an open menu always brings it back. Elsewhere it's the normal
  // scroll/idle behaviour.
  const navHidden = menuOpen || whoOpen ? false : hideZone ? !peekTop : hidden;

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
            <Link
              href="/"
              className="font-serif text-ink text-[22px] md:text-[26px] leading-none tracking-[-0.01em]"
              aria-label="DAB Hands, home"
            >
              DAB Hands
            </Link>
            {/* Persistent room locator: fades in beneath the wordmark once the
                second panel is scrolled to. Absolute so it never nudges the
                wordmark; left edge aligns to the wordmark, in the room's deep
                accent (the legible form of the section colour, matching the hero
                eyebrow — the light pastels would vanish on the bone bar). */}
            <AnimatePresence>
              {showContext && room && (
                <motion.span
                  key={room.href}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color: room.deep }}
                  className="absolute left-0 top-full mt-1.5 whitespace-nowrap text-[10px] md:text-[10.5px] uppercase tracking-[0.18em] leading-none"
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
                        const lit = active || hoveredWho === a.href;
                        return (
                          <Link
                            key={a.href}
                            href={a.href}
                            role="menuitem"
                            onMouseEnter={() => setHoveredWho(a.href)}
                            onMouseLeave={() => setHoveredWho(null)}
                            className="block rounded-xl px-3 py-2.5 transition-colors duration-200"
                            style={{ backgroundColor: lit ? a.block : undefined }}
                          >
                            {/* Hovered/active option gets a soft block of the
                                section colour; the label stays ink. */}
                            <span className="text-[14.5px] leading-snug text-ink">{a.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
            className="fixed inset-0 z-40 bg-bone text-ink pt-28 px-8 md:hidden flex flex-col justify-between pb-12"
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
                    <Link href={a.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-4 py-1.5">
                      <span aria-hidden className="block h-px w-6 shrink-0 rounded-full" style={{ backgroundColor: a.tint }} />
                      <span className="font-serif text-[30px] leading-[1.18]">{a.label}</span>
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
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block font-serif text-[30px] leading-[1.18] py-1.5 border-t border-stone pt-6"
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
