// Cloudflare Pages Function: receives the quote + contact forms and emails them via Resend.
// Required env vars (Pages → Settings → Variables and Secrets):
//   RESEND_API_KEY   secret from resend.com (domain blockandhewston.com must be verified there)
//   MAIL_FROM        e.g. "Block & Hewston Website <website@blockandhewston.com>"
//   MAIL_TO          e.g. service@blockandhewston.com (comma-separate for several)
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
const MAX_FILES = 10, MAX_BYTES = 10 * 1024 * 1024;

export async function onRequestPost({ request, env }) {
  let fd;
  try { fd = await request.formData(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
  if (fd.get('bot-field')) return json({ ok: true }); // honeypot: pretend success

  const kind = fd.get('form-name') === 'contact' ? 'contact' : 'quote';
  const v = (k) => (fd.get(k) || '').toString().trim();
  const need = kind === 'quote' ? ['name', 'email', 'phone', 'street', 'zip', 'units', 'move_out_date'] : ['name', 'email', 'message'];
  if (need.some((k) => !v(k)) || !/^\S+@\S+\.\S+$/.test(v('email'))) return json({ ok: false, error: 'Missing fields' }, 400);
  if (!env.RESEND_API_KEY || !env.MAIL_TO || !env.MAIL_FROM) return json({ ok: false, error: 'Mail not configured' }, 500);

  const files = fd.getAll('photos').filter((f) => typeof f !== 'string' && f.size > 0).slice(0, MAX_FILES);
  const attachments = [];
  for (const f of files) {
    if (f.size > MAX_BYTES || !f.type.startsWith('image/')) continue;
    const bytes = new Uint8Array(await f.arrayBuffer());
    let bin = ''; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    attachments.push({ filename: f.name || 'photo.jpg', content: btoa(bin) });
  }

  const lines = kind === 'quote'
    ? [['Name', v('name')], ['Company', v('company')], ['Phone', v('phone')], ['Email', v('email')], ['Best contact', v('contact_preference')],
       ['Property type', v('property_type')], ['Address', `${v('street')}, ${v('city')}, ${v('state') || 'LA'} ${v('zip')}`], ['Units', v('units')],
       ['Services', fd.getAll('services').join(', ')], ['Move-out date', v('move_out_date')], ['Flexibility', v('flexibility')],
       ['Notes', v('notes')], ['Photos attached', String(attachments.length)]]
    : [['Name', v('name')], ['Email', v('email')], ['Phone', v('phone')], ['Message', v('message')]];
  const text = lines.filter(([, val]) => val).map(([k, val]) => `${k}: ${val}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: env.MAIL_TO.split(',').map((s) => s.trim()),
      reply_to: v('email'),
      subject: kind === 'quote' ? `Quote request: ${v('street')} (${v('units')} unit${v('units') === '1' ? '' : 's'})` : `Website message from ${v('name')}`,
      text,
      attachments: attachments.length ? attachments : undefined
    })
  });
  if (!res.ok) { console.error('Resend error', res.status, await res.text()); return json({ ok: false, error: 'Send failed' }, 502); }
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'Method not allowed' }, 405);
