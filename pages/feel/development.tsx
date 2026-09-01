import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { SeoMeta } from '@/components/SeoMeta';

/**
 * /feel/development — where the FEEL thinking has got to.
 *
 * The live source of truth while FEEL is still moving. Deliberately first
 * person and provisional. ⚠ The standfirst naming the reader was removed on
 * 1 Sep by the owner: the page carries no addressee above the fold.
 *
 * ⚠ Unlisted like the rest of /feel (noindex meta + X-Robots-Tag route header,
 * absent from nav, sitemap.xml and llms.txt) but NOT gated: anyone with the URL
 * can read it, and it contains open strategy questions and commercial thinking.
 * If that stops being acceptable, put it behind the /feel/method cookie gate in
 * proxy.ts rather than relying on the URL being obscure.
 *
 * Every point is a <details> so the whole state of play is scannable in one
 * screen and opens only where you want detail. Native disclosures: no script,
 * and they print open via the beforeprint handler pattern used on /experience.
 */

const UPDATED = '1 September 2026';

type Point = { lead: string; body: React.ReactNode };

const AGREED: Point[] = [
  {
    lead: 'It isn’t an agency, and it isn’t a SaaS company.',
    body: 'Those are two different businesses with two different shapes, and trying to be either one now would be the wrong move. A software product would need investment and a different kind of company around it.',
  },
  {
    lead: 'The method has to be proprietary to become a product.',
    body: 'Prince2 is the model. It’s a brand as much as a methodology, and that’s what makes it sellable. CX and UX are collections of methods that became categories. There’s an argument that FEEL is the same move for emotional experience.',
  },
  {
    lead: 'The Emotional Spec is the stake in the ground.',
    body: 'It’s the thing everything else gets judged against, and no brand currently defines it. They have values, experience principles and tone of voice, and none of those say what a person should feel. Defining it is a distinct piece of work and it’s ours.',
  },
  {
    lead: 'Neutrality is an asset, not a limitation.',
    body: 'Not chasing the implementation work makes the findings more trusted. We can offer to help afterwards, but the diagnostic has to be able to stand on its own and say uncomfortable things.',
  },
  {
    lead: 'A panel of real people beats one expert.',
    body: 'This was the biggest shift in the call. One person’s opinion invites a client to feel clever disagreeing with it. Ninety per cent consensus from real people is much harder to wave away, and nobody ever challenges “people have said”.',
  },
  {
    lead: 'But not a fixed panel.',
    body: 'Recruited on demand, paid per test, anonymous, one-off. A standing panel would destroy the objectivity that makes the whole thing work.',
  },
  {
    lead: 'Real people, not AI.',
    body: 'At least to begin with.',
  },
  {
    lead: 'Directional, not definitive, and we say so.',
    body: 'The results indicate rather than prove. Being straight about that is a strength, not a weakness, and it’s the difference between us and someone selling false precision.',
  },
  {
    lead: 'Desk research is enough for a single deal.',
    body: 'Roughly seventy per cent of the value at a fraction of the cost. Panel work only earns its cost at scale across many clients.',
  },
  {
    lead: 'And the entry route is subsector benchmarking.',
    body: 'Score five businesses in one subsector, then call the four who came behind. “We benchmarked your four closest competitors” opens a door that a cold approach doesn’t, the research is reusable across the whole subsector, and it costs almost nothing. High-end gym and wellness is the first one.',
  },
];

const HANGING: Point[] = [
  {
    lead: 'The big one: is FEEL a doorway or a business?',
    body: 'A point of view that opens conversations for the consulting work we already do, or a standalone company with a prospectus, an investor and its own P&L. We said both at different points in the call and they lead to very different next six months.',
  },
  {
    lead: 'Where it hits a budget.',
    body: 'Nine out of ten people agree with the diagnosis and don’t buy. That isn’t a pitch problem, it’s a budget problem, because there is rarely new money for this. It has to displace something already committed. We didn’t solve that.',
  },
  {
    lead: 'What FEEL adds beyond a competent UX review.',
    body: 'We’re both convinced there’s a real difference. We haven’t yet written down what it is in a way a sceptical buyer would accept.',
  },
  {
    lead: 'How to fund the first proper piece of research.',
    body: 'Everything credible needs some evidence behind it, and the first evidence has to be paid for before anyone has bought anything.',
  },
  {
    lead: 'Whether long journeys can be tested at all.',
    body: 'Kitchens take months. Healthcare decisions take longer. A panel can’t live inside a twelve-week consideration cycle, and I don’t think we resolved how to get useful indication for those.',
  },
  {
    lead: 'Who the buyer actually is.',
    body: 'Digital marketing director, head of commerce, brand director. All plausible, and they hold different budgets and answer to different pressures.',
  },
  {
    lead: 'And whether anyone would invest.',
    body: 'Not because we need the money, but because willingness to invest is a real test of whether this is a product or an interesting idea that people are being nice about.',
  },
  {
    lead: 'One more that I’ve only seen clearly since.',
    body: (
      <>
        Part of the nine-in-ten problem is that{' '}
        <strong>there is currently nothing concrete to buy.</strong> The method deck runs to
        twenty-two slides and then says “start a conversation”. Someone persuaded by it has nothing
        to say yes to: no first engagement, no shape, no duration, no idea what comes out. That’s a
        much more fixable problem than a budget problem, and I think we should settle it together
        rather than me guessing at it.
      </>
    ),
  },
];

const NEXT: Point[] = [
  {
    lead: 'Draft the prospectus.',
    body: 'The thing that forces us to answer the doorway-or-business question rather than leaving it open.',
  },
  {
    lead: 'Finish the customer-type analysis',
    body: 'for high-end gym and wellness. I have part of it.',
  },
  {
    lead: 'Score the first five.',
    body: 'Build the benchmark, see whether the output is genuinely compelling on a page or whether it needs the panel to have any force.',
  },
  {
    lead: 'Then call the four who came behind.',
    body: 'That’s the cheapest possible test of whether any of this opens doors.',
  },
  {
    lead: 'And decide the standalone question before spending anything meaningful.',
    body: 'The prospectus should settle it rather than defer it.',
  },
];

const Disclosure = ({ p }: { p: Point }) => (
  <details className="fd-item">
    <summary>
      <span className="fd-lead">{p.lead}</span>
      <span aria-hidden className="fd-plus">
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
          <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    </summary>
    <div className="fd-body">{p.body}</div>
  </details>
);

export default function FeelDevelopment() {
  return (
    <Layout footerVariant="none">
      <SeoMeta
        title="FEEL · where we got to | DAB Hands"
        description="The live state of the FEEL thinking: what we agreed, what is still open, and what happens next."
        path="/feel/development"
        noindex
      />

      <style>{`
        .fd h1 {
          font-family:var(--font-serif); font-weight:400;
          font-size:clamp(38px,5.4vw,64px); line-height:1.04; letter-spacing:-1.4px; margin:0;
        }
        .fd h2 {
          font-family:var(--font-serif); font-weight:400;
          font-size:clamp(24px,2.8vw,32px); line-height:1.18; letter-spacing:-.6px;
          margin:66px 0 0; padding-top:26px; border-top:1px solid var(--color-stone);
        }
        .fd .fd-meta { margin:22px 0 0; font-size:13.5px; color:var(--color-graphite); }
        .fd p { max-width:64ch; }
        .fd .fd-prose { font-size:17px; line-height:1.68; color:var(--color-graphite); margin:20px 0 0; }
        .fd .fd-prose strong { color:var(--color-ink); font-weight:600; }

        /* Each point is a disclosure so the whole state of play scans in one
           screen. Closed, it is a list of positions; open, it argues them. */
        .fd-item { border-bottom:1px solid var(--color-stone); }
        .fd-item summary {
          list-style:none; cursor:pointer; display:flex; align-items:flex-start; gap:16px;
          padding:17px 0; justify-content:space-between;
        }
        .fd-item summary::-webkit-details-marker { display:none; }
        .fd-lead { font-size:17px; line-height:1.5; color:var(--color-ink); font-weight:600; max-width:56ch; }
        .fd-plus { color:var(--color-gold); flex:none; margin-top:4px; transition:transform .3s cubic-bezier(.16,1,.3,1); }
        .fd-item[open] .fd-plus { transform:rotate(45deg); }
        .fd-item summary:focus-visible { outline:2px solid var(--color-gold); outline-offset:3px; }
        .fd-body {
          margin:0 0 20px; font-size:16.5px; line-height:1.68; color:var(--color-graphite); max-width:62ch;
        }
        .fd-body strong { color:var(--color-ink); font-weight:600; }
        .fd-group { margin-top:26px; border-top:1px solid var(--color-stone); }
        .fd-sign { color:var(--color-ink); }

        .fd-back { display:inline-flex; align-items:center; gap:9px; font-size:13px; color:var(--color-ink); text-decoration:none; margin-bottom:30px; }
        .fd-back .arw { color:var(--color-gold); }
        .fd-back:hover { gap:14px; }
        .fd-back { transition:gap .25s cubic-bezier(.16,1,.3,1); }

        @media (prefers-reduced-motion: reduce) { .fd-plus, .fd-back { transition:none; } }
        @media (max-width:860px) {
          .fd h2 { margin-top:48px; padding-top:22px; }
          .fd-lead { font-size:16px; }
          .fd-body, .fd .fd-prose { font-size:16px; }
        }
      `}</style>

      <section className="u-container py-20 md:py-28 lg:py-32">
        <div className="fd">
          <Link href="/feel" className="fd-back">
            <span aria-hidden className="arw">←</span> All of FEEL
          </Link>

          <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-graphite mb-6">FEEL · development</p>
          <h1>Where we got to.</h1>
          <p className="fd-meta">Last updated: {UPDATED}</p>

          <h2>The question underneath the whole conversation</h2>
          <p className="fd-prose">
            What is FEEL actually selling? Lead generation, a diagnostic product, a method, or a way
            into implementation work.
          </p>
          <p className="fd-prose">
            We circled it for a long time and I think we landed somewhere honest:{' '}
            <strong>FEEL is a point of view with a method behind it, and it is not a finished product yet.</strong>{' '}
            Everything else follows from that.
          </p>

          <h2>What we agreed</h2>
          <div className="fd-group">
            {AGREED.map((p) => <Disclosure key={p.lead} p={p} />)}
          </div>

          <h2>What’s still hanging</h2>
          <div className="fd-group">
            {HANGING.map((p) => <Disclosure key={p.lead} p={p} />)}
          </div>

          <h2>What changes in the method as a result</h2>
          <p className="fd-prose">
            Your panel point has done the most work of anything from the call, and it changes the
            method rather than just the sales story.
          </p>
          <p className="fd-prose">
            <strong>The deck currently treats audience evidence as optional.</strong> It appears
            twice, both times as “where the evidence matters most”, while “the assessor is not the
            customer” sits in the limitations as something FEEL admits about itself. That’s the
            weaker version, and it leaves the best answer to the hardest objection buried in a
            footnote.
          </p>
          <p className="fd-prose">
            <strong>It becomes the architecture instead.</strong> Expert diagnosis forms the
            hypothesis. Audience evidence tests it. Desk diagnosis carries most of the value for a
            single engagement, and the panel is what you add where the exposure or the disagreement
            justifies the cost. Then the method says which depth a finding rests on.
          </p>
          <p className="fd-prose">
            Same two layers we discussed. Stated as design rather than as a caveat.
          </p>
          <p className="fd-prose">
            <strong>Separately, I’ve had the evidence base underneath the method adversarially
            reviewed</strong>, and it threw up one thing worth knowing. The two sources currently
            carrying the founding claim are advertising effectiveness data and a contested piece of
            neuroscience, and neither is about lived experience. There’s a peer-reviewed study in
            the service domain that says exactly what we need said, and it’s going in. Small change,
            and it removes the one place where a well-read sceptic could get a grip.
          </p>

          <h2>Next steps</h2>
          <div className="fd-group">
            {NEXT.map((p) => <Disclosure key={p.lead} p={p} />)}
          </div>

          <h2>One thing I’ve been thinking since</h2>
          <p className="fd-prose">
            The strongest argument for the panel isn’t that it produces better data. It’s that it
            changes what the method <em>is</em>.
          </p>
          <p className="fd-prose">
            <strong>Expert diagnosis is a hypothesis. Audience evidence is a test.</strong> One
            expert reviewing a journey is an opinion, however good, and an opinion invites a client
            to feel clever disagreeing with it. Real people reporting how a moment made them feel is
            something else entirely, and you can’t argue with ninety per cent of them without looking
            foolish, which was your point.
          </p>
          <p className="fd-prose">
            That distinction is what separates a point of view from a product. It’s worth building
            towards even if the first few engagements are done the cheap way, because it’s the thing
            that decides whether this is a business or a very good conversation opener.
          </p>
          <p className="fd-prose fd-sign">Tell me what I’ve missed.</p>
        </div>
      </section>
    </Layout>
  );
}
