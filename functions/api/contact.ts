/**
 * Cloudflare Pages Function: POST /api/contact
 * Receives the contact form (JSON), validates it and hands it to sendEmail().
 *
 * TODO(email provider): sendEmail() below is a stub. Pick ONE provider and implement it:
 *   - Resend:      POST https://api.resend.com/emails        (env: RESEND_API_KEY)
 *   - Postmark:    POST https://api.postmarkapp.com/email    (env: POSTMARK_TOKEN)
 *   - Cloudflare Email Service / Email Routing send_email binding
 *   - Or forward to a CRM webhook (HubSpot, Zapier, Make) instead of email.
 * Set env vars in Cloudflare Pages: Settings > Variables and Secrets.
 * Until sendEmail() is implemented the endpoint returns 503, and the form on the site
 * falls back to a prefilled mailto: link so no lead is lost.
 */

interface Env {
  CONTACT_TO?: string; // destination, e.g. nico@blockdevelopmentgroup.com
  CONTACT_FROM?: string; // verified sender on your provider, e.g. "Block Development Group <web@blockdevelopmentgroup.com>"
  RESEND_API_KEY?: string; // example only; see TODO above
}

interface Lead {
  type: 'owner' | 'investor';
  name: string;
  email: string;
  phone: string;
  address?: string;
  project: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

async function sendEmail(_lead: Lead, _env: Env): Promise<void> {
  // TODO: implement with your provider. Example (Resend):
  //
  // const res = await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${_env.RESEND_API_KEY}`, 'content-type': 'application/json' },
  //   body: JSON.stringify({
  //     from: _env.CONTACT_FROM,
  //     to: [_env.CONTACT_TO],
  //     reply_to: _lead.email,
  //     subject: _lead.type === 'owner' ? 'Walkthrough request' : 'Partnership inquiry',
  //     text: formatLead(_lead),
  //   }),
  // });
  // if (!res.ok) throw new Error(`Email provider error ${res.status}`);
  throw new Error('Email provider not configured');
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
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

  try {
    await sendEmail(lead, env);
    return json({ ok: true });
  } catch (err) {
    console.error('contact: send failed', err);
    return json({ ok: false, error: 'Not delivered' }, 503);
  }
};

export const onRequest: PagesFunction = async () => json({ ok: false, error: 'Method not allowed' }, 405);
