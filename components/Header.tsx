import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DabMark } from './DabMark';

// The three destination pages live under "Who I help". Each carries its own
// pathway colour, expressed in the nav as a subtle leading trajectory — never
// as a coloured label.
export const audiences = [
  { href: '/business-and-agency-leaders', label: 'Business & agency leaders', tint: '#B8A2D8' },
  { href: '/marketing-leaders', label: 'Marketing leaders', tint: '#E6B39A' },
  { href: '/creators-and-founders', label: 'Creators & founders', tint: '#B8C2A3' },
];

export const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // mobile sheet
  const [whoOpen, setWhoOpen] = useState(false); // desktop dropdown
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-bone/85 backdrop-blur-md border-b border-stone/70' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-ink"
            aria-label="DAB Hands, home"
          >
            <DabMark className="h-[15px] w-[24px] md:h-[17px] md:w-[28px] text-ink/65 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            <span className="font-serif text-[22px] md:text-[26px] leading-none tracking-[-0.01em]">DAB Hands</span>
          </Link>

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
                    <div className="w-[300px] rounded-2xl border border-stone/70 bg-paper/95 backdrop-blur-md p-3 shadow-[0_22px_55px_-34px_rgba(31,31,29,0.4)]">
                      {audiences.map((a) => {
                        const active = router.pathname === a.href;
                        return (
                          <Link
                            key={a.href}
                            href={a.href}
                            role="menuitem"
                            className="group/path flex items-center rounded-xl px-3 py-3 transition-colors hover:bg-bone/70"
                          >
                            {/* Pathway trajectory: a fine line in the audience
                                colour that extends as the path opens on hover. */}
                            <span
                              aria-hidden
                              className={`block h-px shrink-0 rounded-full transition-all duration-300 ease-out ${
                                active ? 'w-7 opacity-100' : 'w-3 opacity-50 group-hover/path:w-7 group-hover/path:opacity-100'
                              }`}
                              style={{ backgroundColor: a.tint }}
                            />
                            <span
                              className={`ml-3 text-[14.5px] leading-snug transition-colors ${
                                active ? 'text-ink' : 'text-ink/70 group-hover/path:text-ink'
                              }`}
                            >
                              {a.label}
                            </span>
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
