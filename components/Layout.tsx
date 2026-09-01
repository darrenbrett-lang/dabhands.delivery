import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer, FooterVariant } from './Footer';

interface LayoutProps {
  children: ReactNode;
  footerVariant?: FooterVariant;
  /** 'bare' drops the nav links and leaves the lockup alone. */
  headerVariant?: 'full' | 'bare';
}

export const Layout = ({ children, footerVariant, headerVariant }: LayoutProps) => (
  <>
    <a href="#top" className="skip-link">Skip to content</a>
    <Header bare={headerVariant === 'bare'} />
    {/* tabIndex lets the skip link move focus here in browsers that only focus
        focusable anchor targets (older Safari). */}
    <main id="top" tabIndex={-1}>{children}</main>
    <Footer variant={footerVariant} />
  </>
);
