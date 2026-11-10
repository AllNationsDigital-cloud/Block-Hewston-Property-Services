/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives the contact form (JSON), validates it, blocks bots, and emails the lead.
 *
 * Delivery works with NO setup using FormSubmit (formsubmit.co):
 *   - The first real submission triggers a one-time activation email to the destination address.
 *     Click "Activate Form" in that email once. After that, every lead arrives as a normal email.
 *   - Until activated, this endpoint returns 503 and the site shows a prefilled mailto: link, so no lead is lost.
 *
 * Optional upgrade (better deliverability, branded sender): set these in Cloudflare Pages
 * > Settings > Variables and Secrets, and Resend is used instead of FormSubmit:
 *   RESEND_API_KEY   secret from resend.com
 *   CONTACT_FROM     verified sender, e.g. "Block Development Group <web@blockdevelopmentgroup.com>"
 *
 * Other variables (all optional):
 *   CONTACT_TO       destination address(es), comma-separated. Default: DEFAULT_TO below.
 *   SITE_ORIGIN      the site's public origin. Default: the request's Origin header.
 *   FORMSUBMIT_URL   override the FormSubmit endpoint (used for local testing).
 */

interface Env {
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  RESEND_API_KEY?: string;
  SITE_ORIGIN?: string;
  FORMSUBMIT_URL?: string;
}

interface Lead {
  type: 'owner' | 'investor';
  name: string;
  email: string;
  phone: string;
  address: string;
  project: string;
}

const DEFAULT_TO = 'nico@blockdevelopmentgroup.com';
const FALLBACK_ORIGIN = 'https://blockdevelopmentgroup.com';
const MAX_BODY = 20_000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const subjectFor = (l: Lead) =>
  `${l.type === 'owner' ? 'Walkthrough request' : 'Partnership inquiry'} | ${l.name} | Block Development Group`;

function plainText(l: Lead) {
  const lines = [
    `Type: ${l.type === 'owner' ? 'Owner or manager' : 'Investor or partner'}`,
    `Name: ${l.name}`,
    `Email: ${l.email}`,
    `Phone: ${l.phone}`,
  ];
  if (l.address) lines.push(`Property address: ${l.address}`);
  lines.push('', 'Project description:', l.project);
  return lines.join('\n');
}

async function sendWithResend(l: Lead, env: Env, to: string[]) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.CONTACT_FROM, to, reply_to: l.email, subject: subjectFor(l), text: plainText(l) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

async function sendWithFormSubmit(l: Lead, env: Env, to: string, origin: string) {
  const base = env.FORMSUBMIT_URL || 'https://formsubmit.co/ajax/';
  const res = await fetch(`${base}${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      // FormSubmit only accepts submissions that identify the site they come from.
      origin,
      referer: `${origin}/contact/`,
    },
    body: JSON.stringify({
      _subject: subjectFor(l),
      _replyto: l.email,
      _template: 'table',
      _captcha: 'false',
      Type: l.type === 'owner' ? 'Owner or manager' : 'Investor or partner',
      Name: l.name,
      Email: l.email,
      Phone: l.phone,
      'Property address': l.address || 'n/a',
      'Project description': l.project,
    }),
  });
  const out = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  if (!res.ok || String(out.success) === 'false') {
    throw new Error(`FormSubmit ${res.status}: ${out.message ?? 'no message'}`);
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return json({ ok: false, error: 'Too large' }, 413);

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'Invalid request' }, 400);
  }

  // Honeypot: bots fill it. Pretend success, send nothing.
  if (typeof data.company_website === 'string' && data.company_website.trim()) return json({ ok: true });

  const s = (k: string) => String(data[k] ?? '').trim().slice(0, 4000);
  const lead: Lead = {
    type: data.type === 'investor' ? 'investor' : 'owner',
    name: s('name'),
    email: s('email'),
    phone: s('phone'),
    address: s('address'),
    project: s('project'),
  };

  const valid =
    lead.name &&
    /^\S+@\S+\.\S+$/.test(lead.email) &&
    lead.phone.replace(/\D/g, '').length >= 10 &&
    lead.project.length >= 10 &&
    (lead.type === 'investor' || lead.address);
  if (!valid) return json({ ok: false, error: 'Missing or invalid fields' }, 400);

  const to = (env.CONTACT_TO || DEFAULT_TO).split(',').map((x) => x.trim()).filter(Boolean);
  const origin = env.SITE_ORIGIN || request.headers.get('origin') || FALLBACK_ORIGIN;

  try {
    if (env.RESEND_API_KEY && env.CONTACT_FROM) await sendWithResend(lead, env, to);
    else await sendWithFormSubmit(lead, env, to[0], origin);
    return json({ ok: true });
  } catch (err) {
    console.error('contact: delivery failed:', err instanceof Error ? err.message : err);
    return json({ ok: false, error: 'Not delivered' }, 503);
  }
};

export const onRequest: PagesFunction = async () => json({ ok: false, error: 'Method not allowed' }, 405);
