import { ReactNode } from 'react';
import Link from 'next/link';

interface PrivateLayoutProps {
  children: ReactNode;
}

/**
 * Layout for unlisted /for/<company> pages. No site nav, no links out:
 * the reader stays on the page they were sent. Pair with
 * `<SeoMeta noindex />` and keep the route out of sitemap.xml.
 */
export const PrivateLayout = ({ children }: PrivateLayoutProps) => (
  <>
    <a href="#top" className="skip-link">Skip to content</a>
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center">
        <span className="font-sans font-semibold text-bone text-[20px] md:text-[22px] leading-none tracking-[-0.02em]">
          DAB Hands
        </span>
      </div>
    </header>
    <main id="top">{children}</main>
    <div className="bg-charcoal py-6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between gap-4">
        <p className="text-[11px] tracking-[0.16em] text-bone/60">&copy; {new Date().getFullYear()} DAB Hands.</p>
        <Link href="/" className="text-[11px] tracking-[0.16em] text-bone/60 hover:text-bone transition-colors">
          dabhands.delivery
        </Link>
      </div>
    </div>
  </>
);
