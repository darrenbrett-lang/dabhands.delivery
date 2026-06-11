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
    <header className="fixed top-0 left-0 right-0 z-50 bg-dab-charcoal">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center">
        <span className="flex items-baseline gap-3">
          <span className="brand-dot w-[14px] h-[14px] rounded-full shrink-0" />
          <span className="font-medium text-[19px] tracking-[-0.02em] text-dab-cream leading-none">
            <span className="font-medium">DAB</span> Hands
          </span>
        </span>
      </div>
    </header>
    <main id="top">{children}</main>
    <div className="bg-dab-charcoal py-6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-cream/60">
          &copy; {new Date().getFullYear()} DAB Hands.
        </p>
        <a
          href="/"
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-dab-cream/60 hover:text-dab-cream transition-colors"
        >
          dabhands.delivery
        </a>
      </div>
    </div>
  </>
);
