import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Dab Hands</title>
        <meta
          name="description"
          content="Get in touch with Dab Hands. Senior-led digital delivery for high-stakes work."
        />
      </Head>

      <Layout>
        <section className="bg-dab-cream text-dab-charcoal pt-36 md:pt-44 pb-28 md:pb-40 min-h-[80vh]">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dab-charcoal/60 mb-8">
                Contact
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[10ch]">
                Let&rsquo;s talk.
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-12 text-lg md:text-xl text-dab-charcoal/75 leading-relaxed max-w-[48ch]">
                For critical digital initiatives that need to move properly, reach out directly. Most conversations start with one short call.
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-4xl">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-dab-charcoal/55 mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:db@dabhands.delivery"
                    className="text-xl md:text-2xl font-medium tracking-[-0.018em] hover:opacity-60 transition-opacity"
                  >
                    db@dabhands.delivery
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-dab-charcoal/55 mb-3">
                    Phone
                  </p>
                  <a
                    href="tel:+447788711433"
                    className="text-xl md:text-2xl font-medium tracking-[-0.018em] hover:opacity-60 transition-opacity"
                  >
                    07788 711433
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-dab-charcoal/55 mb-3">
                    LinkedIn
                  </p>
                  <a
                    href="https://www.linkedin.com/in/darren-brett-1474403/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl md:text-2xl font-medium tracking-[-0.018em] hover:opacity-60 transition-opacity"
                  >
                    Darren Brett
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
