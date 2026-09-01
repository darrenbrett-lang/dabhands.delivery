import { NextRequest, NextResponse } from 'next/server';
import { FEEL_COOKIE, verifyAccess } from '@/lib/feelAccess';

/*
 * Basic Auth gate for the site's private documents. Without valid credentials
 * the edge returns 401 before any page is served, so these pages cannot be
 * viewed without permission (this is the real access control; the per-page
 * noindex headers are belt-and-braces on top). Nothing else on the site is
 * affected; see the matcher below.
 *
 * Two areas are gated, each with its own credentials and its own realm so a
 * login to one does not open the other:
 *   /for/eterna and everything under it — the private Eterna workspace
 *   /feel and /feel/development — the FEEL hub and the working notes
 *
 * /feel/method is gated differently: not by a shared password but by a signed
 * cookie issued when someone completes the capture form on /feel — plus the
 * open ?review=1 share link described below. See
 * lib/feelAccess.ts. It redirects rather than returning 401, because the
 * visitor has somewhere to go. The check runs here, at the edge, so the deck
 * is never rendered and then hidden.
 *
 * ⚠ /feel and /feel/development ARE password protected again (owner's call,
 * 1 Sep): the hub indexes work in progress and the notes carry open commercial
 * thinking, so neither should rest on the URL being obscure. The capture page
 * /feel/intro is deliberately NOT gated: it is the page people are sent to,
 * and it is where the deck redirects a visitor whose cookie has expired.
 * Gating it would close the funnel and turn that redirect into a 401.
 * (Careful with comments here: a literal double-star-slash ends this block.)
 *
 * This uses the Next 16 `proxy` file convention (the former `middleware` name
 * is deprecated in this version). Credentials can be overridden
 * per-environment with the env vars below (e.g. Vercel env vars) without a
 * code change; the fallbacks are the shared logins given out for each.
 *
 * NOTE: the fallbacks are committed, so they live in the repo's git history.
 * Set the env vars in Vercel and rotate the fallback if a password ever needs
 * to be genuinely secret from anyone with repository access.
 */

export const config = {
  matcher: ['/for/eterna', '/for/eterna/:path*', '/feel', '/feel/development', '/feel/method'],
};

type Gate = {
  realm: string;
  user: string;
  pass: string;
  covers: (pathname: string) => boolean;
};

const GATES: Gate[] = [
  {
    realm: 'Eterna',
    user: process.env.ETERNA_USER || 'eternagrowth',
    pass: process.env.ETERNA_PASS || 'fillthechairs',
    covers: (p) => p === '/for/eterna' || p.startsWith('/for/eterna/'),
  },
  {
    // The hub and the working notes. Deliberately NOT /feel/:path*: /feel/intro
    // stays open, and /feel/method keeps its own cookie gate above.
    realm: 'FEEL',
    user: process.env.FEEL_USER || 'feels',
    pass: process.env.FEEL_PASS || 'gad',
    covers: (p) => p === '/feel' || p === '/feel/development',
  },
];

export async function proxy(req: NextRequest) {
  // The FEEL method deck: a signed cookie from the form, or the reviewer
  // password while the section is still being reviewed.
  if (req.nextUrl.pathname === '/feel/method') {
    const ok = await verifyAccess(process.env.FEEL_COOKIE_SECRET, req.cookies.get(FEEL_COOKIE)?.value);
    if (ok) return NextResponse.next();

    /* ⚠ ?review=1 is now an OPEN share link — no password (owner's call,
       1 Sep). Anyone holding the link reads the deck without filling the form
       or creating a HubSpot contact. The plain /feel/method URL still requires
       the signed cookie, so the visitor journey is unchanged; this is a side
       door for people Darren sends it to directly.
       There is no secret in it any more: treat the link itself as the
       credential, and REMOVE this branch when FEEL goes properly live. */
    if (req.nextUrl.searchParams.get('review') === '1') return NextResponse.next();

    // Send them back with a reason. Bouncing someone to an identical-looking
    // page with no explanation is the kind of silent failure this deck is
    // about, and the people who hit it are the ones whose cookie expired or
    // who are on a second device: they had access and think they still do.
    const back = req.nextUrl.clone();
    back.pathname = '/feel/intro'; // the capture form, not the hub
    back.search = '?from=method';
    return NextResponse.redirect(back);
  }

  const gate = GATES.find((g) => g.covers(req.nextUrl.pathname));

  // Not a gated path: the matcher should have kept us out, but never guess.
  if (!gate) return NextResponse.next();

  const header = req.headers.get('authorization');

  if (header?.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(':');
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === gate.user && pass === gate.pass) {
        return NextResponse.next();
      }
    } catch {
      // malformed header: fall through to the 401 below
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${gate.realm}", charset="UTF-8"`,
    },
  });
}
