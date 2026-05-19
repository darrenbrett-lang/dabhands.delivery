import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { Ribbon } from '@/components/Ribbon';
import { RibbonAccent } from '@/components/RibbonAccent';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

export default function Contact() {
  return (
    <>
      <SeoMeta
        title="Contact | DAB hands"
        description="Get in touch with DAB hands. Senior-led digital delivery for high-stakes work."
        path="/contact"
      />

      <Layout footerVariant="none">
        <section className="bg-dab-cream text-dab-charcoal pt-36 md:pt-44 pb-28 md:pb-40 min-h-[80vh] relative overflow-hidden">
          <Ribbon
            className="absolute inset-x-0 bottom-0 w-full"
            opacity={0.4}
            drift={28}
          />
          <RibbonAccent
            variant={5}
            className="hidden md:block absolute bottom-12 left-[-6%] w-[36%] lg:w-[24%]"
            opacity={0.22}
            drift={12}
            driftDirection="left"
          />

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold leading-[1.02] tracking-[-0.028em] max-w-[10ch]">
                What needs moving?
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mt-10 md:mt-12 text-xl text-dab-charcoal leading-relaxed max-w-[48ch]">
                For critical digital initiatives that need to move properly,<br className="hidden md:block" />
                {' '}reach out directly.
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-4xl">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-dab-charcoal/55 mb-3">
                    Email
                  </p>
                  <a
                    href={mailto({ subject: 'Important work needs to move properly' })}
                    className="text-xl md:text-2xl font-medium tracking-[-0.018em] hover:opacity-60 transition-opacity"
                  >
                    darren@dabhands.delivery
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
