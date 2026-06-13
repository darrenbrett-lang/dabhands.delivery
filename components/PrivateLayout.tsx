import { ReactNode } from 'react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-plum">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center">
        <span className="font-serif text-bone text-[22px] md:text-[24px] leading-none tracking-[-0.01em]">
          DAB Hands
        </span>
      </div>
    </header>
    <main id="top">{children}</main>
    <div className="bg-plum py-6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between gap-4">
        <p className="text-[11px] tracking-[0.16em] text-bone/60">&copy; {new Date().getFullYear()} DAB Hands.</p>
        <a href="/" className="text-[11px] tracking-[0.16em] text-bone/60 hover:text-bone transition-colors">
          dabhands.delivery
        </a>
      </div>
    </div>
  </>
);
