import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`} style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
      <Component {...pageProps} />
    </main>
  );
}
