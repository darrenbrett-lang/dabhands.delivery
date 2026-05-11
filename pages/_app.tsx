import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={geist.variable} style={{ fontFamily: 'var(--font-geist), -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
      <Component {...pageProps} />
    </main>
  );
}
