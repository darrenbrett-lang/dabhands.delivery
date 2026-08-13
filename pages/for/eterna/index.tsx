import Head from 'next/head';

/*
 * PRIVATE, UNLISTED workspace index for Dr Adeel Khan (Eterna Health).
 *
 * Route: /for/eterna. A small hub that lists the documents shared so far and
 * accumulates more over time. Do not link to it from anywhere on the site; it
 * is kept out of sitemap.xml and llms.txt. The route (and everything under
 * /for/eterna/*) sends an X-Robots-Tag: noindex header (see next.config.ts)
 * alongside the in-page robots meta. No Open Graph tags, so a shared link never
 * leaks the client or contents.
 *
 * To add a document: drop a new page at pages/for/eterna/<slug>.tsx and add a
 * row to the `docs` array below (newest first).
 */

const docs = [
  {
    title: 'Confidence Map Proposal v1',
    date: '13 August 2026',
    href: '/for/eterna/confidence-map',
    summary:
      'The six weeks: where your patients stop, what each stop costs, and the plan to fix it. What you keep, what it costs, and the cost of waiting.',
  },
  {
    title: 'First Response',
    date: '6 July 2026',
    href: '/for/eterna/first-response',
    summary: 'The opening read on Eterna, and the clear path from here to doubling the business.',
  },
];

const css = `
.hub{--stone:#F5F1EA;--ink:#1F1F1D;--graphite:#54504A;--goldink:#7E5E27;--gold:#C0974A;--hair:#D8D3CB;
  background:var(--stone);color:var(--ink);min-height:100vh;
  font-family:var(--font-sans),-apple-system,BlinkMacSystemFont,system-ui,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased;}
.hub-wrap{max-width:660px;margin:0 auto;padding:64px 20px 80px;}
.hub-brand{display:flex;align-items:center;gap:13px;margin-bottom:40px;}
.hub-crown{height:34px;width:auto;display:block;}
.hub-wordmark{font-family:var(--font-serif),Georgia,'Times New Roman',serif;font-size:26px;line-height:1;letter-spacing:-0.01em;color:var(--ink);}
.hub-eyebrow{margin:0;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--goldink);}
.hub-title{margin:14px 0 0;font-family:var(--font-serif),Georgia,'Times New Roman',serif;font-weight:400;font-size:34px;line-height:1.15;letter-spacing:-0.01em;color:var(--ink);}
.hub-intro{margin:14px 0 0;font-size:16px;color:var(--graphite);max-width:46ch;}
.hub-list{list-style:none;margin:40px 0 0;padding:0;}
.hub-item{border-top:1px solid var(--hair);}
.hub-item:last-child{border-bottom:1px solid var(--hair);}
.hub-link{display:grid;grid-template-columns:1fr auto;grid-template-areas:"date go" "name go" "summary go";column-gap:16px;align-items:baseline;padding:22px 4px;min-height:44px;text-decoration:none;color:inherit;}
.hub-date{grid-area:date;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--goldink);}
.hub-name{grid-area:name;font-family:var(--font-serif),Georgia,'Times New Roman',serif;font-size:23px;line-height:1.15;color:var(--ink);margin-top:4px;}
.hub-summary{grid-area:summary;font-size:15px;line-height:1.5;color:var(--graphite);margin-top:7px;max-width:52ch;}
.hub-go{grid-area:go;align-self:center;font-size:13px;font-weight:600;letter-spacing:0.04em;color:var(--goldink);white-space:nowrap;}
.hub-link:hover .hub-name{color:var(--goldink);}
.hub-link:hover .hub-go{color:var(--ink);}
.hub-link:focus-visible{outline:2px solid var(--ink);outline-offset:3px;border-radius:4px;}
.hub-signoff{margin:52px 0 0;font-size:12px;letter-spacing:0.06em;color:var(--graphite);}
@media (min-width:768px){
  .hub-wrap{padding:88px 24px 96px;}
  .hub-title{font-size:42px;}
  .hub-name{font-size:26px;}
}
`;

export default function EternaHub() {
  return (
    <>
      <Head>
        <title>Eterna</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <div className="hub">
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <main className="hub-wrap">
          <header className="hub-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="hub-brand">
              <img className="hub-crown" src="/images/crown-mark.webp" alt="" aria-hidden decoding="async" />
              <span className="hub-wordmark">DAB Hands</span>
            </div>
            <p className="hub-eyebrow">For Eterna</p>
            <h1 className="hub-title">A working space for Eterna Health</h1>
            <p className="hub-intro">Everything shared so far, in one place. New documents are added here as the work moves.</p>
          </header>
          <ol className="hub-list">
            {docs.map((d) => (
              <li className="hub-item" key={d.href}>
                <a className="hub-link" href={d.href}>
                  <span className="hub-date">{d.date}</span>
                  <span className="hub-name">{d.title}</span>
                  <span className="hub-summary">{d.summary}</span>
                  <span className="hub-go" aria-hidden="true">Read</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="hub-signoff">DAB Hands &middot; Keeping important work moving</p>
        </main>
      </div>
    </>
  );
}
