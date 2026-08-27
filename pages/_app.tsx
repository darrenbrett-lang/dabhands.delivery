import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Instrument_Serif, Manrope } from "next/font/google";

// Display + quotes. Single weight (400) with a true italic for pull quotes.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Body, navigation, buttons, cards, all interface.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

// Expose the hashed next/font family names at :root. The @theme tokens
// (--font-serif / --font-sans) reference these, and custom properties resolve
// at the element where they are declared — so the references must be visible
// at :root, not only on a nested wrapper, or they collapse to empty.
const rootFontVars = `:root{--font-instrument-serif:${instrumentSerif.style.fontFamily};--font-manrope:${manrope.style.fontFamily};}`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <style dangerouslySetInnerHTML={{ __html: rootFontVars }} />
      </Head>
      {/* reducedMotion="user" makes every framer animation (FadeUp included)
          honour prefers-reduced-motion without per-component wiring. */}
      <MotionConfig reducedMotion="user">
        <div className={`${instrumentSerif.variable} ${manrope.variable}`}>
          <Component {...pageProps} />
        </div>
      </MotionConfig>
      {/* Vercel's own analytics: cookieless, and it does not track individuals
          across sites, so the site still needs no cookie banner. The only
          cookie anywhere here remains the functional FEEL access token. Both
          need enabling in the Vercel dashboard before they collect anything;
          they no-op in development. */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
