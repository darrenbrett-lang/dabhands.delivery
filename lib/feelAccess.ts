/**
 * The FEEL access gate.
 *
 * A stateless, signed token rather than a session store: there is no database
 * on this site and one is not worth introducing for a single gate. The token
 * is an expiry timestamp plus an HMAC of it, so `proxy.ts` can verify it at
 * the edge without a round trip to anything.
 *
 * Web Crypto throughout, deliberately: `proxy.ts` runs on the Edge runtime,
 * where node:crypto is unavailable. `crypto.subtle.verify` also compares in
 * constant time, so there is no timing side channel to worry about.
 *
 * ⚠ Fails CLOSED. With no FEEL_COOKIE_SECRET set, nothing verifies and
 * /feel/method stays shut. That is the correct failure direction, but it does
 * mean the gate is inert until the variable exists in the environment.
 */

export const FEEL_COOKIE = 'feel_access';

/** Thirty days, so a visitor can return to the method without re-submitting. */
export const FEEL_TTL_SECONDS = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

const toBase64Url = (bytes: ArrayBuffer): string => {
  const b = new Uint8Array(bytes);
  let s = '';
  for (let i = 0; i < b.length; i += 1) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (value: string): Uint8Array => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const raw = atob(padded);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i);
  return out;
};

const hmacKey = (secret: string) =>
  crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);

/** `<expiry seconds>.<signature>` */
export async function signAccess(secret: string, expiresAtSeconds: number): Promise<string> {
  const payload = String(Math.floor(expiresAtSeconds));
  const signature = await crypto.subtle.sign('HMAC', await hmacKey(secret), encoder.encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

export async function verifyAccess(secret: string | undefined, token: string | undefined): Promise<boolean> {
  if (!secret || !token) return false;

  const split = token.lastIndexOf('.');
  if (split < 1) return false;

  const payload = token.slice(0, split);
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;

  let signature: Uint8Array;
  try {
    signature = fromBase64Url(token.slice(split + 1));
  } catch {
    return false;
  }

  const valid = await crypto.subtle.verify(
    'HMAC',
    await hmacKey(secret),
    signature as unknown as BufferSource,
    encoder.encode(payload),
  );

  // Signature first, then expiry: an expired-but-valid token is still a forgery
  // check we want to have passed before we trust the timestamp at all.
  return valid && Date.now() < expiresAt * 1000;
}

export function buildAccessCookie(token: string): string {
  // ⚠ Secure only in production. A Secure cookie is refused over plain HTTP,
  // which silently breaks every non-HTTPS test: a LAN address for checking on
  // a phone, 127.0.0.1 rather than localhost, or a browser stricter than
  // Chrome about the localhost exemption. The person submits, gets the
  // confirmation, clicks through and is bounced with no clue why. Production
  // on Vercel is always HTTPS, so nothing is given up.
  const parts = [
    `${FEEL_COOKIE}=${token}`,
    'Path=/feel',
    `Max-Age=${FEEL_TTL_SECONDS}`,
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  return parts.join('; ');
}
