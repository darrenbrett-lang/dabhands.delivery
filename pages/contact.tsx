import { Layout } from '@/components/Layout';
import { FadeUp } from '@/components/FadeUp';
import { SeoMeta } from '@/components/SeoMeta';
import { mailto } from '@/lib/mailto';

const channels = [
  { label: 'Email', value: 'darren@dabhands.delivery', href: mailto({ subject: 'Important work needs to move properly' }), external: false },
  { label: 'Phone', value: '07788 711433', href: 'tel:+447788711433', external: false },
  { label: 'LinkedIn', value: '/dab-hands-delivery', href: 'https://www.linkedin.com/company/dab-hands-delivery/about/', external: true },
];

export default function Contact() {
  return (
    <>
      <SeoMeta
        title="Contact | DAB Hands"
        description="Start a conversation with DAB Hands. I help important work move properly through complex organisations."
        path="/contact"
      />

      <Layout footerVariant="none">
        {/* Warm stone + a soft Clay wash — the same hero vignette as the doorways. */}
        <section
          className="bg-bone text-ink pt-36 md:pt-48 pb-24 md:pb-40 min-h-[78vh]"
          style={{ backgroundImage: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-clay) 42%, transparent), color-mix(in srgb, var(--color-clay) 20%, transparent) 55%, transparent 100%)' }}
        >
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <FadeUp>
              <h1 className="text-[44px] md:text-[68px] lg:text-[88px] leading-[1.02] max-w-[12ch]">What needs moving?</h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="mt-9 md:mt-12 text-lg md:text-xl text-graphite leading-relaxed max-w-[48ch]">
                For critical digital initiatives that need to move properly,
                <br className="hidden md:block" /> reach out directly.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
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
            </FadeUp>
          </div>
        </section>
      </Layout>
    </>
  );
}
