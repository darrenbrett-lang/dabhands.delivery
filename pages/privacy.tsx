import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { SeoMeta } from '@/components/SeoMeta';

/**
 * /privacy — the site-wide privacy notice.
 *
 * ⚠ Site-wide on purpose, not FEEL-specific: analytics runs on every page, so
 * a notice scoped to one form would misdescribe where data is collected. It is
 * linked from the footer of every page and from the FEEL form.
 *
 * Indexable, unlike the FEEL routes. A privacy notice that search engines
 * cannot reach is not much of a notice.
 *
 * ⚠ THREE GAPS remain, marked with .p-gap so the page cannot be published
 * looking finished. Search this file for `p-gap` before going live:
 *   1. the publication date
 *   2. the ICO registration reference (the Z-format one, not the application
 *      number C2017276)
 *   3. the mailbox provider, and the Vercel Functions region
 */

const UPDATED = '[date of publication]';

export default function Privacy() {
  return (
    <Layout footerVariant="none">
      <SeoMeta
        title="Privacy notice | DAB Hands"
        description="How DAB Hands Delivery Ltd collects, uses and protects personal information."
        path="/privacy"
      />

      <style>{`
        .p-doc { --measure:74ch; }
        .p-doc h1 { font-family:var(--font-serif); font-weight:400; font-size:clamp(38px,5.4vw,64px); line-height:1.04; letter-spacing:-1.4px; margin:0; }
        .p-doc h2 {
          font-family:var(--font-serif); font-weight:400; font-size:clamp(24px,2.8vw,32px);
          line-height:1.18; letter-spacing:-.6px; margin:64px 0 0;
          padding-top:26px; border-top:1px solid var(--color-stone);
        }
        .p-doc p, .p-doc li { font-size:17px; line-height:1.65; color:var(--color-graphite); max-width:var(--measure); }
        .p-doc p { margin:18px 0 0; }
        .p-doc strong { color:var(--color-ink); font-weight:600; }
        .p-doc ul { margin:18px 0 0; padding:0; list-style:none; max-width:var(--measure); }
        .p-doc li { position:relative; padding-left:20px; margin:0 0 11px; }
        .p-doc li::before { content:""; position:absolute; left:0; top:11px; width:7px; height:1px; background:var(--color-gold); }
        .p-doc a { color:var(--color-ink); text-decoration:underline; text-underline-offset:3px; text-decoration-color:var(--color-gold); }
        .p-lede { font-size:19px; line-height:1.6; margin:26px 0 0; max-width:64ch; }
        .p-addr { font-style:normal; font-size:17px; line-height:1.75; color:var(--color-graphite); margin:18px 0 0; }

        .p-table { width:100%; border-collapse:collapse; margin:24px 0 0; }
        .p-table th, .p-table td {
          text-align:left; vertical-align:top; padding:15px 20px 15px 0;
          border-bottom:1px solid var(--color-stone); font-size:16px; line-height:1.55;
        }
        .p-table th { font-size:11px; letter-spacing:2px; text-transform:uppercase; font-weight:600; color:var(--color-ink); padding-top:0; }
        .p-table td { color:var(--color-graphite); }
        .p-table td:first-child { color:var(--color-ink); font-weight:600; width:22%; }
        .p-wrap { overflow-x:auto; }

        /* Unfilled. Deliberately loud. */
        .p-gap {
          background:#F6E6C4; color:#5A4212; padding:1px 7px; border-radius:2px;
          font-weight:600; box-decoration-break:clone; -webkit-box-decoration-break:clone;
        }
        .p-note {
          margin:64px 0 0; padding:22px 24px; border:1px solid var(--color-gold);
          border-radius:3px; background:rgba(192,151,74,.07);
        }
        .p-note p { margin:0; font-size:15.5px; max-width:none; }

        @media (max-width:860px) {
          .p-doc p, .p-doc li { font-size:16px; }
          .p-doc h2 { margin-top:46px; padding-top:22px; }
          .p-table th, .p-table td { padding:12px 14px 12px 0; font-size:15px; }
          .p-table td:first-child { width:auto; }
        }
      `}</style>

      <section className="u-container py-20 md:py-28 lg:py-32">
        <div className="p-doc">
          <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-graphite mb-6">Privacy notice</p>
          <h1>How we handle your information.</h1>
          <p className="p-lede">
            Last updated: <span className="p-gap">{UPDATED}</span>
          </p>

          <h2>Who we are</h2>
          <p>DAB Hands Delivery Ltd is the controller of the personal information described in this notice.</p>
          <address className="p-addr">
            <strong>DAB Hands Delivery Ltd</strong><br />
            Company number 17209121<br />
            4 Bray Road, Maidenhead, England, SL6 1UE<br />
            Registered with the Information Commissioner’s Office, reference{' '}
            <span className="p-gap">[ICO registration reference]</span>
          </address>
          <p>
            If you have a question about this notice, or you want to exercise any of the rights
            described below, email <a href="mailto:darren@dabhands.delivery">darren@dabhands.delivery</a>.
          </p>

          <h2>What we collect, and when</h2>
          <p>
            <strong>When you request the FEEL method.</strong> Your email address, which is the only
            thing we ask for. If you choose to give them, your first name, surname, company and job
            title, and anything you write in the optional box describing what you are trying to fix.
            We also record the date of your request and the page or link that brought you to the form.
          </p>
          <p>
            <strong>When you email us, or we email you.</strong> The contents of that correspondence,
            and our record of when it happened.
          </p>
          <p>
            <strong>When you visit the site.</strong> We measure which pages are visited and how
            quickly they load. This is described in full under Cookies and analytics below. We do not
            know who you are from it, and we cannot recognise you on a later visit.
          </p>
          <p>
            We do not buy personal information from third parties, and we do not collect special
            category data. If you send us something sensitive in a free-text field, we will hold it
            under the same terms as everything else, but please do not.
          </p>

          <h2>Why we hold it, and on what basis</h2>
          <p>
            <strong>To send you what you asked for, and to reply.</strong> If you request the FEEL
            method, we use your details to send you access and to respond to what you told us. Our
            lawful basis is legitimate interests: you asked us for something, and we cannot provide
            it without contacting you.
          </p>
          <p>
            <strong>To follow up on your request.</strong> If you told us what you are trying to fix,
            we may reply about it. Our lawful basis is legitimate interests: you approached us about
            our work, and a reply is what you would reasonably expect. You can tell us to stop at any
            time and we will.
          </p>
          <p>
            <strong>To send you Field Notes, if you ask for it.</strong> Our lawful basis is your
            consent, given by opting in from the email we send you. You can withdraw it at any time
            using the link in any issue, or by emailing us.{' '}
            <strong>We will not add you to anything you did not ask for.</strong>
          </p>
          <p>
            <strong>To keep records of our business relationships.</strong> Our lawful basis is
            legitimate interests: knowing who we have spoken to, and about what, is how a
            professional practice operates.
          </p>
          <p>
            <strong>To meet our legal and accounting obligations</strong>, where that applies. Our
            lawful basis is legal obligation.
          </p>
          <p>
            We do not use your information to make automated decisions about you, and we do not
            profile you.
          </p>

          <h2>Who else sees it</h2>
          <p>
            We use a small number of service providers, who process your information on our
            instructions and are not permitted to use it for their own purposes.
          </p>
          <div className="p-wrap">
            <table className="p-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>What they do</th>
                  <th>Where your data sits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HubSpot</td>
                  <td>Customer relationship management. Where enquiries and our record of contact with you are held, and what sends the email confirming your request</td>
                  <td><strong>European Union.</strong> Our account is hosted in the EU data region</td>
                </tr>
                <tr>
                  <td>Vercel</td>
                  <td>Runs this website, processes the form before it reaches HubSpot, and provides the analytics described below</td>
                  <td><strong>United Kingdom.</strong> The form is processed in London</td>
                </tr>
                <tr>
                  <td>Google Workspace</td>
                  <td>Hosts our email, so any correspondence with us sits there</td>
                  <td>European Union and United States</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>We do not use a separate email delivery service.</strong> The email confirming
            your request is sent by HubSpot, which is already listed above.
          </p>
          <p>
            <strong>Your form submission is processed in the United Kingdom and stored in the
            European Union.</strong> It does not leave either. Transfers to the EU are covered by the
            UK’s adequacy regulations.
          </p>
          <p>
            Email correspondence is the one thing that may be handled in the United States, because
            our mailbox is hosted by Google Workspace. Google LLC is certified under the UK Extension
            to the EU-US Data Privacy Framework. Where that does not apply, we rely on the UK
            International Data Transfer Addendum to the European Commission’s standard contractual
            clauses.
          </p>
          <p>
            Our domain registrar does not appear above because it never handles the content of your
            messages or your visit to this site.
          </p>
          <p>
            <strong>We do not sell your information, and we do not share it with anyone for their
            own marketing.</strong>
          </p>
          <p>
            We may disclose information if we are legally required to, or to establish or defend a
            legal claim.
          </p>

          <h2>How long we keep it</h2>
          <p>
            <strong>If you request the FEEL method and do not become a client, we delete your
            information 24 months after our last interaction with you.</strong> Last interaction
            means the most recent point at which you contacted us or opened or responded to something
            we sent.
          </p>
          <p>
            If you become a client, we keep records for as long as the relationship lasts and for six
            years afterwards, which is the period we are required to keep business and accounting
            records.
          </p>
          <p>If you ask us to delete your information sooner, we will, unless we are legally required to keep it.</p>

          <h2>Your rights</h2>
          <p>Under UK data protection law you have the right to:</p>
          <ul>
            <li><strong>Be told</strong> what we hold about you and what we do with it, which is what this notice is for</li>
            <li><strong>Get a copy</strong> of the information we hold about you</li>
            <li><strong>Have it corrected</strong> if it is wrong or incomplete</li>
            <li><strong>Have it deleted</strong>, in most circumstances</li>
            <li><strong>Restrict what we do with it</strong> while a question about it is resolved</li>
            <li><strong>Object</strong> to us processing it on the basis of legitimate interests, including for direct marketing. If you object to direct marketing, we will stop, without exception</li>
            <li><strong>Withdraw consent</strong> at any time, where consent is what we are relying on</li>
            <li><strong>Receive it in a portable format</strong>, where processing is based on consent and carried out by automated means</li>
          </ul>
          <p>
            To exercise any of these, email{' '}
            <a href="mailto:darren@dabhands.delivery">darren@dabhands.delivery</a>. We will respond
            within one month. There is no charge.
          </p>
          <p>
            <strong>If you are not happy with how we have handled your information</strong>, you can
            complain to the Information Commissioner’s Office at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>, or
            call 0303 123 1113. We would rather you told us first so we can put it right, but you do
            not have to.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            <strong>This site sets one cookie.</strong> It is called <code>feel_access</code> and it
            records that you have requested the FEEL method, so that the method page opens for you
            when you return. It contains no personal information, expires after 30 days, and is
            strictly necessary to provide something you asked for. No consent is required for it, and
            this site therefore has no cookie banner.
          </p>
          <p>
            We set no advertising, tracking or profiling cookies, and no third-party service sets
            cookies here.
          </p>
          <p>
            <strong>For analytics we use Vercel Web Analytics and Vercel Speed Insights</strong>, to
            understand which pages are visited and how quickly the site loads. Neither uses cookies.
            A visitor is counted using a value derived from the incoming request, which is valid for
            a single day and then reset, so we cannot recognise you on a later visit, follow you
            between sessions, or identify you. We do not use Google Analytics or any advertising
            analytics.
          </p>

          <h2>Changes to this notice</h2>
          <p>
            If we change how we handle personal information, we will update this notice and change
            the date at the top. If the change is significant and we hold your details, we will tell
            you.
          </p>

          <div className="p-note">
            <p>
              <strong>Not ready to publish.</strong> Two things are still unfilled, marked in
              amber above: the publication date and the ICO registration reference. The Vercel
              Functions region must also be set to <code>lhr1</code> before the transfer wording
              above is true. Remove this box once they are done.{' '}
              <Link href="/feel">The FEEL form</Link> already links here.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
