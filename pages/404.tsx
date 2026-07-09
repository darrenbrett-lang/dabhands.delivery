import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { SeoMeta } from '@/components/SeoMeta';

// Branded 404: warm-stone chrome, a short serif line, two routes back in.
export default function NotFound() {
  return (
    <>
      <SeoMeta
        title="Page not found | DAB Hands"
        description="That page has moved on. Head back to DAB Hands, keeping important work moving."
        path="/404"
        noindex
      />
      <Layout footerVariant="none">
        <section className="relative bg-bone text-ink pt-40 md:pt-52 pb-24 md:pb-32 min-h-[70vh]">
          <div className="u-container text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/crown-mark.webp"
              alt=""
              aria-hidden
              width={467}
              height={367}
              className="rise mx-auto mb-6 md:mb-8 h-10 md:h-12 w-auto select-none"
            />
            <h1 className="rise text-[40px] md:text-[60px] leading-[1.05] max-w-[18ch] mx-auto">
              This page isn’t where it should be.
            </h1>
            <p className="rise mt-6 text-lg md:text-xl text-graphite leading-relaxed max-w-[42ch] mx-auto" style={{ ['--rise-delay' as string]: '0.1s' }}>
              The work, however, is still moving.
            </p>
            <div className="rise mt-10 flex flex-wrap items-center justify-center gap-4" style={{ ['--rise-delay' as string]: '0.18s' }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-[15px] font-medium text-bone transition-colors duration-300 hover:bg-blue-green"
              >
                Back to the homepage
              </Link>
              <Link
                href="/contact"
                className="text-[15px] font-medium text-ink underline decoration-stone underline-offset-[5px] transition-colors hover:decoration-graphite"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
