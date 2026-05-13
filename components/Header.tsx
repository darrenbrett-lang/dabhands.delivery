import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mailto } from '@/lib/mailto';

const navItems = [
  { href: '/where-we-step-in', label: 'Where we step in' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
];

export const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-dab-charcoal ${scrolled ? 'border-b border-dab-brown/15' : ''}`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-3 group" aria-label="Dab Hands home">
            <span className="brand-dot w-[14px] h-[14px] rounded-full shrink-0" />
            <span className="font-semibold text-[19px] tracking-[-0.02em] text-dab-cream leading-none">
              <span className="font-bold">Dab</span> Hands
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <nav className="flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-mono text-[10px] tracking-[0.22em] uppercase transition-colors ${
                      active ? 'text-dab-cream' : 'text-dab-cream/55 hover:text-dab-cream'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <a
              href={mailto()}
              className="group inline-flex items-center gap-2 border border-dab-cream/40 text-dab-cream text-[12px] font-medium tracking-tight pl-4 pr-3.5 py-1.5 rounded-full hover:bg-dab-cream hover:text-dab-charcoal hover:border-dab-cream transition-colors"
            >
              Start a conversation
              <span aria-hidden className="text-dab-green group-hover:text-dab-charcoal transition-colors">→</span>
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="md:hidden w-8 h-8 flex flex-col items-end justify-center gap-[6px]"
          >
            <span className={`block h-px bg-dab-cream transition-all duration-300 ${menuOpen ? 'w-7 rotate-45 translate-y-[7px]' : 'w-7'}`} />
            <span className={`block h-px bg-dab-cream transition-all duration-300 ${menuOpen ? 'opacity-0 w-7' : 'w-5'}`} />
            <span className={`block h-px bg-dab-cream transition-all duration-300 ${menuOpen ? 'w-7 -rotate-45 -translate-y-[7px]' : 'w-7'}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-dab-charcoal text-dab-cream pt-28 px-8 md:hidden flex flex-col justify-between pb-12"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.span
                  key={item.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-3xl font-semibold tracking-tight py-3 border-b border-dab-brown/20 hover:text-dab-green transition"
                  >
                    {item.label}
                  </Link>
                </motion.span>
              ))}
            </nav>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-brown">
              Dab Hands. Digital Delivery, Handled
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
