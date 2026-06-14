import Link from 'next/link';
import { BoxCTA } from './BoxCTA';
import { DabMark } from './DabMark';
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

    <footer className="bg-plum text-white/80 border-t border-bone/10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <Link href="/" className="group flex items-center gap-2 text-white" aria-label="DAB Hands, home">
            <DabMark className="h-[13px] w-[20px] text-white/65 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            <span className="font-serif text-[18px] tracking-[-0.01em]">DAB Hands</span>
          </Link>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/company/dab-hands-delivery/about/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DAB Hands on LinkedIn"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logos/linkedin-app-white-icon.webp" alt="" width={16} height={16} loading="lazy" decoding="async" className="block" />
            </a>
            <p className="text-[11px] tracking-[0.16em] text-white/65">© 2026 DAB Hands</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);
