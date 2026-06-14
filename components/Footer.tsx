import Link from 'next/link';
import { BoxCTA } from './BoxCTA';
import { mailto } from '@/lib/mailto';

export type FooterVariant = 'default' | 'minimal' | 'none';

export const Footer = ({ variant = 'default' }: { variant?: FooterVariant }) => (
  <>
    {/* Plum contact module. Pages with their own in-content CTA use variant="none". */}
    {variant !== 'none' && (
      <section id="contact-cta" className="bg-plum text-bone">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24 text-center">
          <div className="space-y-4 max-w-[22ch] md:max-w-none mx-auto">
            {variant === 'default' && (
              <p className="font-serif text-[26px] md:text-[38px] leading-[1.12]">
                I help organisations get their best work into the world, intact.
              </p>
            )}
            <p className="font-serif text-[28px] md:text-[44px] leading-[1.1]">
              If something important needs to move properly,{' '}
              <Link
                href="/contact"
                className="underline decoration-1 underline-offset-[6px] decoration-coral hover:decoration-2 transition-all"
              >
                let’s talk
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

    <footer className="bg-paper text-graphite border-t border-stone">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <Link href="/" className="font-serif text-ink text-[18px] tracking-[-0.01em]" aria-label="DAB Hands, home">
            DAB Hands
          </Link>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/company/dab-hands-delivery/about/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DAB Hands on LinkedIn"
              className="opacity-55 hover:opacity-100 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logos/linkedin-app-white-icon.webp" alt="" width={16} height={16} loading="lazy" decoding="async" className="block" style={{ filter: 'brightness(0)' }} />
            </a>
            <p className="text-[11px] tracking-[0.16em] text-graphite/70">© 2026 DAB Hands</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);
