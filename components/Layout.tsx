import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer, FooterVariant } from './Footer';

interface LayoutProps {
  children: ReactNode;
  footerVariant?: FooterVariant;
}

export const Layout = ({ children, footerVariant }: LayoutProps) => (
  <>
    <a href="#top" className="skip-link">Skip to content</a>
    <Header />
    {/* tabIndex lets the skip link move focus here in browsers that only focus
        focusable anchor targets (older Safari). */}
    <main id="top" tabIndex={-1}>{children}</main>
    <Footer variant={footerVariant} />
  </>
);
