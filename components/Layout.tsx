import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer, FooterVariant } from './Footer';

interface LayoutProps {
  children: ReactNode;
  footerVariant?: FooterVariant;
}

export const Layout = ({ children, footerVariant }: LayoutProps) => (
  <>
    <Header />
    <main id="top">{children}</main>
    <Footer variant={footerVariant} />
  </>
);
