import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
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
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <div className={`${instrumentSerif.variable} ${manrope.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
