import { NextRequest, NextResponse } from 'next/server';

/*
 * Basic Auth gate for the private Eterna workspace: /for/eterna and every
 * document under it. Without valid credentials the edge returns 401 before any
 * page is served, so these documents cannot be viewed without permission (this
 * is the real access control; the per-page noindex headers are belt-and-braces
 * on top). Nothing else on the site is affected — see the matcher below.
 *
 * Credentials can be overridden per-environment with ETERNA_USER / ETERNA_PASS
 * (e.g. Vercel env vars) without a code change; the fallbacks are the shared
 * login given to the client.
 */

export const config = {
  matcher: ['/for/eterna', '/for/eterna/:path*'],
};

const USER = process.env.ETERNA_USER || 'eternagrowth';
const PASS = process.env.ETERNA_PASS || 'fillthechairs';

export function middleware(req: NextRequest) {
  const header = req.headers.get('authorization');

  if (header?.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(':');
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    } catch {
      // malformed header — fall through to the 401 below
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Eterna", charset="UTF-8"',
    },
  });
}
