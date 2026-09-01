import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { SeoMeta } from '@/components/SeoMeta';

/**
 * /feel — the FEEL hub.
 *
 * A way in to the three FEEL surfaces while the thinking is still moving. It
 * exists because there are now several of them and no obvious front door.
 *
 * ⚠ Unlisted, like everything under /feel: noindex meta, an X-Robots-Tag route
 * header in next.config.ts, and absent from nav, sitemap.xml and llms.txt. The
 * route resolves so a link can be shared directly.
 *
 * The capture experience that used to live at this URL is now /feel/intro; the
 * proxy redirect for a missing deck cookie points there, not here.
 */

const ROUTES: { href: string; label: string; what: string; note: string }[] = [
  {
    href: '/feel/intro',
    label: 'The idea',
    what: 'What FEEL is, and the realisation it is built on.',
    note: 'The introduction. Ends with the form that opens the manifesto.',
  },
  {
    href: '/feel/method?review=1',
    label: 'The manifesto',
    what: 'The method, in full, as a deck.',
    note: 'Open link. No form, no password. Treat the URL as the credential.',
  },
  {
    href: '/feel/development',
    label: 'Where we got to',
    what: 'The live state of the thinking: agreed, open, and next.',
    note: 'Working notes. The source of truth while this is still moving.',
  },
];

export default function FeelHub() {
  return (
    <Layout footerVariant="none" headerVariant="bare">
      <SeoMeta
        title="FEEL | DAB Hands"
        description="FEEL: the idea, the manifesto, and where the thinking has got to."
        path="/feel"
        noindex
      />

      <style>{`
        .fh-doc h1 {
          font-family:var(--font-serif); font-weight:400;
          font-size:clamp(40px,6vw,72px); line-height:1.02; letter-spacing:-2px; margin:0;
        }
        /* Charcoal, not graphite: this is a contents page read at a glance,
           and grey body copy made it recede (owner's call, 1 Sep). The note
           line keeps its subordinate weight through opacity, not a grey. */
        .fh-lede { font-size:19px; line-height:1.6; color:var(--color-ink); margin:22px 0 0; max-width:52ch; }
        .fh-list { margin:56px 0 0; display:grid; gap:0; }
        .fh-item {
          display:block; padding:30px 0; border-top:1px solid var(--color-stone);
          text-decoration:none; color:inherit;
        }
        .fh-item:last-child { border-bottom:1px solid var(--color-stone); }
        .fh-row { display:flex; align-items:baseline; gap:14px; }
        .fh-label {
          font-family:var(--font-serif); font-size:clamp(26px,3.4vw,38px);
          line-height:1.1; letter-spacing:-.7px; color:var(--color-ink);
        }
        .fh-arw { color:var(--color-gold); transition:transform .3s cubic-bezier(.16,1,.3,1); }
        .fh-item:hover .fh-arw { transform:translateX(6px); }
        .fh-what { margin:10px 0 0; font-size:17px; line-height:1.6; color:var(--color-ink); max-width:52ch; }
        .fh-note { margin:8px 0 0; font-size:13.5px; line-height:1.55; color:var(--color-ink); opacity:.68; max-width:52ch; }
        @media (prefers-reduced-motion: reduce) { .fh-arw { transition:none; } }
        @media (max-width:860px) { .fh-item { padding:24px 0; } }
      `}</style>

      <section className="u-container py-20 md:py-28 lg:py-32">
        <div className="fh-doc">
          <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-ink mb-6">FEEL</p>
          <h1>The work in progress.</h1>
          <p className="fh-lede">
            Three surfaces, at three different stages of finished. Shared privately while the
            thinking is still moving.
          </p>

          <div className="fh-list">
            {ROUTES.map((r) => (
              <Link key={r.href} href={r.href} className="fh-item">
                <span className="fh-row">
                  <span className="fh-label">{r.label}</span>
                  <span aria-hidden className="fh-arw">→</span>
                </span>
                <span className="fh-what block">{r.what}</span>
                <span className="fh-note block">{r.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
