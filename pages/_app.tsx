import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div
        className={`${geist.variable} ${geistMono.variable}`}
        style={{ fontFamily: 'var(--font-geist), -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
