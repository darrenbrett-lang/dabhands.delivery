import type { NextApiRequest, NextApiResponse } from 'next';
import { buildAccessCookie, signAccess, FEEL_TTL_SECONDS } from '@/lib/feelAccess';

/**
 * FEEL capture. Submits to HubSpot and, on success, grants access to
 * /feel/method by setting the signed cookie that proxy.ts checks.
 *
 * HubSpot is the database. There is deliberately no local store: a second copy
 * of personal data would have to be secured, backed up and honoured for
 * deletion, and HubSpot is where these contacts need to end up regardless.
 *
 * The Forms API is used rather than the CRM API because it needs no secret
 * token, and because it registers a real form submission, so HubSpot's own
 * reporting, lists and workflows all see it. The portal and form IDs stay
 * server-side rather than shipping in client JavaScript.
 */

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '148807599';
const FORM_GUID = process.env.HUBSPOT_FORM_GUID || 'a48d9b5e-28b5-4e7b-ad68-d4f437740e96';
const ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;

/**
 * The internal property name for the "what are you trying to fix" field. A
 * CUSTOM property, not a HubSpot standard one, confirmed against the property
 * store rather than inferred.
 *
 * ⚠ Do NOT "tidy" this to match the field's label. HubSpot bakes the internal
 * name in at creation and never changes it when the label is edited, so the
 * trailing _optional survives even though the label no longer says it. The
 * mismatch is correct and permanent.
 *
 * A wrong name makes HubSpot reject the WHOLE submission, not just this field,
 * which is why the value is sent only when somebody actually typed in the box.
 */
const ISSUE_FIELD = process.env.HUBSPOT_ISSUE_FIELD || 'what_are_you_trying_to_fix_optional';

/**
 * Recorded against the contact so the basis for the delivery is evidenced.
 * ⚠ This covers the requested, transactional delivery only. Sending these
 * contacts anything else later needs its own consent, captured separately.
 */
export const CONSENT_TEXT =
  'Requested the FEEL method. Details used to send it and to follow up on that request.';

interface Body {
  firstname?: string;
  lastname?: string;
  email?: string;
  company?: string;
  jobtitle?: string;
  issue?: string;
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  website?: string;
}

const clean = (v: unknown): string => (typeof v === 'string' ? v.trim().slice(0, 200) : '');

// Deliberately permissive: the job is to reject obvious nonsense, not to
// adjudicate the RFC. HubSpot is the real validator.
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = (req.body ?? {}) as Body;

  // Silently accept the honeypot so a bot learns nothing from the response.
  if (clean(body.website)) return res.status(200).json({ ok: true });

  const firstname = clean(body.firstname);
  const lastname = clean(body.lastname);
  const email = clean(body.email).toLowerCase();
  const company = clean(body.company);
  const jobtitle = clean(body.jobtitle);
  // Longer than the rest: it is a sentence, not a label.
  const issue = typeof body.issue === 'string' ? body.issue.trim().slice(0, 1000) : '';

  // Email is the only required field, deliberately. Everything else is offered
  // and gratefully received; none of it is worth losing the person over.
  if (!looksLikeEmail(email)) {
    return res.status(400).json({ error: 'Please check your email address.', field: 'email' });
  }

  const secret = process.env.FEEL_COOKIE_SECRET;
  if (!secret) {
    // Fail closed and say so plainly: granting access with an unsigned cookie
    // would make the gate theatre.
    console.error('FEEL_COOKIE_SECRET is not set; refusing to grant access.');
    return res.status(500).json({ error: 'Access is not configured. Please get in touch directly.' });
  }

  // Email first as the dedupe key, then only what was actually given: sending
  // an empty string would overwrite a good value on an existing contact.
  const fields = [
    { name: 'email', value: email },
    ...(firstname ? [{ name: 'firstname', value: firstname }] : []),
    ...(lastname ? [{ name: 'lastname', value: lastname }] : []),
    ...(company ? [{ name: 'company', value: company }] : []),
    ...(jobtitle ? [{ name: 'jobtitle', value: jobtitle }] : []),
    ...(issue ? [{ name: ISSUE_FIELD, value: issue }] : []),
  ];

  try {
    const hs = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: 'https://dabhands.delivery/feel',
          pageName: 'FEEL · The Emotional Experience Method',
        },
        legalConsentOptions: {
          consent: { consentToProcess: true, text: CONSENT_TEXT, communications: [] },
        },
      }),
    });

    if (!hs.ok) {
      const detail = await hs.text();
      console.error('HubSpot rejected the FEEL submission', hs.status, detail.slice(0, 500));
      return res.status(502).json({ error: 'We could not record that. Please try again in a moment.' });
    }
  } catch (err) {
    console.error('HubSpot submission failed', err);
    return res.status(502).json({ error: 'We could not record that. Please try again in a moment.' });
  }

  const token = await signAccess(secret, Math.floor(Date.now() / 1000) + FEEL_TTL_SECONDS);
  res.setHeader('Set-Cookie', buildAccessCookie(token));
  return res.status(200).json({ ok: true });
}
