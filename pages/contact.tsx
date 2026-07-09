import type { CSSProperties } from 'react';
import { Layout } from '@/components/Layout';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

const channels = [
  { label: 'Email', value: 'darren@dabhands.delivery', href: mailto({ subject: 'Important work that needs to create real impact' }), external: false },
  { label: 'Phone', value: '07788 711433', href: 'tel:+447788711433', external: false },
  { label: 'LinkedIn', value: '/dab-hands-delivery', href: 'https://www.linkedin.com/company/dab-hands-delivery/about/', external: true },
];

export default function Contact() {
  return (
    <>
      <SeoMeta
        title="Contact | DAB Hands"
        description="Start a conversation with DAB Hands. Senior operational leadership for important work that needs to create real impact."
        path="/contact"
      />

      <Layout footerVariant="none">
        {/* Warm stone + a soft Clay wash — the same hero vignette as the doorways. */}
        <section
          className="relative overflow-hidden bg-bone text-ink pt-36 md:pt-48 pb-24 md:pb-40 min-h-[78vh]"
          style={{ backgroundImage: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-clay) 42%, transparent), color-mix(in srgb, var(--color-clay) 20%, transparent) 55%, transparent 100%)' }}
        >
          {/* Big crown set jauntily in the right negative space (desktop). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/crown-mark.webp"
            alt=""
            aria-hidden
            width={467}
            height={367}
            decoding="async"
            className="pointer-events-none select-none hidden md:block absolute right-[7%] lg:right-[10%] top-40 h-[240px] lg:h-[320px] w-auto rotate-[15deg]"
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            {/* Entrance is CSS-driven (.rise) so the hero paints before hydration. */}
            <div className="rise">
              {/* Small crown above the heading (mobile only). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/crown-mark.webp" alt="" aria-hidden width={467} height={367} decoding="async" className="md:hidden block mb-5 h-10 w-auto select-none" />
              <h1 className="text-[44px] md:text-[68px] lg:text-[88px] leading-[1.02] max-w-[12ch]">What’s important?</h1>
            </div>

            <div className="rise" style={{ '--rise-delay': '0.12s' } as CSSProperties}>
              <p className="mt-9 md:mt-12 text-lg md:text-xl text-graphite leading-relaxed max-w-[48ch]">
                If you’ve got something important
                <br className="hidden md:block" /> that needs to create real impact, let’s talk.
              </p>
            </div>

            <div className="rise" style={{ '--rise-delay': '0.2s' } as CSSProperties}>
              <div className="mt-16 md:mt-24 flex flex-col sm:flex-row sm:flex-wrap gap-y-10 gap-x-16 md:gap-x-24">
                {channels.map((c) => (
                  <div key={c.label}>
                    <p className="eyebrow text-graphite mb-3">{c.label}</p>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-xl md:text-2xl text-ink tracking-[-0.01em] hover:opacity-60 transition-opacity"
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
