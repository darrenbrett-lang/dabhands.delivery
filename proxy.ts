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
 *
 * /feel/method is gated differently: not by a shared password but by a signed
 * cookie issued when someone completes the capture form on /feel. See
 * lib/feelAccess.ts. It redirects rather than returning 401, because the
 * visitor has somewhere to go. The check runs here, at the edge, so the deck
 * is never rendered and then hidden.
 *
 * ⚠ /feel itself is NO LONGER password protected. It is the public (though
 * unlisted and noindexed) capture page. The Basic Auth that used to sit on it
 * was removed when the deck moved to /feel/method.
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
  matcher: ['/for/eterna', '/for/eterna/:path*', '/feel/method'],
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
];

export async function proxy(req: NextRequest) {
  // The FEEL method deck: a signed cookie, not a shared password.
  if (req.nextUrl.pathname === '/feel/method') {
    const ok = await verifyAccess(process.env.FEEL_COOKIE_SECRET, req.cookies.get(FEEL_COOKIE)?.value);
    if (ok) return NextResponse.next();

    // Send them back with a reason. Bouncing someone to an identical-looking
    // page with no explanation is the kind of silent failure this deck is
    // about, and the people who hit it are the ones whose cookie expired or
    // who are on a second device: they had access and think they still do.
    const back = req.nextUrl.clone();
    back.pathname = '/feel';
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
