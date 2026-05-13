import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer, FooterVariant } from './Footer';
import { GridToggle } from './GridToggle';

interface LayoutProps {
  children: ReactNode;
  footerVariant?: FooterVariant;
}

export const Layout = ({ children, footerVariant }: LayoutProps) => (
  <>
    <a href="#top" className="skip-link">Skip to content</a>
    <Header />
    <main id="top">{children}</main>
    <Footer variant={footerVariant} />
    <GridToggle />
  </>
);
