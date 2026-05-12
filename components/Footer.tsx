import Link from 'next/link';
import { Ribbon } from './Ribbon';
import { BoxCTA } from './BoxCTA';
import { mailto } from '@/lib/mailto';

export type FooterVariant = 'default' | 'minimal' | 'none';

export const Footer = ({ variant = 'default' }: { variant?: FooterVariant }) => (
  <>
    {/* Cream contact module */}
    {variant !== 'none' && (
    <section id="contact-cta" className="bg-dab-charcoal text-dab-cream relative overflow-hidden">
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-7 md:py-9 text-center">
        <div className="space-y-4 max-w-[42ch] md:max-w-none mx-auto">
          {variant === 'default' && (
            <p className="text-xl md:text-2xl lg:text-[26px] font-semibold tracking-[-0.022em] leading-snug">
              We help organisations get stronger digital work out into the world.
            </p>
          )}
          <p className="text-xl md:text-2xl lg:text-[26px] font-semibold tracking-[-0.022em] leading-snug">
            If something important needs to move properly,{' '}
            <Link href="/contact" className="text-dab-green underline underline-offset-[6px] decoration-1 hover:decoration-2 transition-all">
              let&rsquo;s talk
            </Link>
            .
          </p>
        </div>
        {variant === 'default' && (
          <div className="mt-10 md:mt-12 flex justify-center">
            <BoxCTA href={mailto()} label="Start a conversation" tone="dark" />
          </div>
        )}
      </div>
    </section>
    )}

    <footer className="bg-dab-charcoal text-dab-cream border-t border-dab-cream/15">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-dab-green" />
            <span className="font-semibold text-[15px] tracking-[-0.02em]">
              <span className="font-bold">Dab</span> Hands
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
                src="/images/logos/linkedin-app-white-icon.webp"
                alt=""
                width={16}
                height={16}
                className="block"
              />
            </a>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-dab-brown">© 2026 Dab Hands</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);
