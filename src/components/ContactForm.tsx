'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contact, site } from '@/content/site';

type Kind = 'owner' | 'investor' | 'agency';
type Errors = Partial<Record<'name' | 'email' | 'phone' | 'address' | 'project', string>>;

export default function ContactForm() {
  const f = contact.form;
  const [kind, setKind] = useState<Kind>('owner');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mailto, setMailto] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Preselect owner / investor from ?type=
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('type');
    if (t === 'owner' || t === 'investor' || t === 'agency') setKind(t);
  }, []);
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function validate(d: FormData): Errors {
    const e: Errors = {};
    const get = (k: string) => String(d.get(k) ?? '').trim();
    if (!get('name')) e.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(get('email'))) e.email = 'Enter a valid email address.';
    if (get('phone').replace(/\D/g, '').length < 10) e.phone = 'Enter a phone number with area code.';
    if (get('project').length < 10) e.project = 'Describe the project in a sentence or two.';
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget);
    const e = validate(d);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const payload = Object.fromEntries(d.entries());
    payload.type = kind;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out.ok === false) throw new Error(String(res.status));
      setStatus('success');
    } catch {
      const lines = Object.entries(payload)
        .filter(([k, v]) => k !== 'company_website' && String(v).trim())
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      setMailto(
        `mailto:${site.email}?subject=${encodeURIComponent(kind === 'investor' ? 'Partnership inquiry' : kind === 'agency' ? 'Agency inquiry' : 'Inquiry from owner or operator')}&body=${encodeURIComponent(lines)}`,
      );
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="success">
        <div className="display">{f.successTitle}</div>
        <p className="lead">{f.successBody}</p>
        <p style={{ margin: 0, fontSize: 22 }}>
          <a href={`tel:${site.phoneTel}`} style={{ borderBottom: '1.5px solid #000' }}>{site.phone}</a>
        </p>
      </div>
    );
  }

  const field = (k: keyof Errors, label: string, input: React.ReactNode, hint?: string) => (
    <div className="field">
      <label htmlFor={k}>
        <span className="lbl">{label}</span>
      </label>
      <span className={`box ${errors[k] ? 'err' : ''}`}>{input}</span>
      {errors[k] ? (
        <span id={`${k}-err`} role="alert" className="msg">{errors[k]}</span>
      ) : (
        hint && <span className="hint">{hint}</span>
      )}
    </div>
  );
  const aria = (k: keyof Errors) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form">
      <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <legend style={{ marginBottom: 10 }}>{f.typeLabel}</legend>
        <div className="seg">
          {f.types.map((t) => (
            <label key={t.value}>
              <input type="radio" name="kind" value={t.value} checked={kind === t.value} onChange={() => setKind(t.value as Kind)} />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="row">
        {field('name', f.nameLabel, <input id="name" name="name" autoComplete="name" required {...aria('name')} />)}
        {field('email', f.emailLabel, <input id="email" name="email" type="email" autoComplete="email" required {...aria('email')} />)}
      </div>
      <div className="row">
        {field('phone', f.phoneLabel, <input id="phone" name="phone" type="tel" autoComplete="tel" required {...aria('phone')} />)}
        {field('address', f.addressLabel, <input id="address" name="address" autoComplete="off" {...aria('address')} />, f.addressHint)}
      </div>
      {field('project', f.projectLabel, <textarea id="project" name="project" rows={5} required {...aria('project')} />, f.projectHint)}

      {/* Honeypot: real visitors never see or fill this. */}
      <div aria-hidden="true" className="hp">
        <label>
          Website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <div role="alert" className="alert">
          {f.errorBody} <a href={mailto}>Email {site.email}</a>.
        </div>
      )}

      <div className="btns" style={{ alignItems: 'center', gap: 24 }}>
        <button type="submit" disabled={status === 'sending'} className="btn">
          <span>{status === 'sending' ? f.sending : f.submit}</span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
        <span className="note" style={{ margin: 0, fontSize: 16 }}>{f.consent}</span>
      </div>
    </form>
  );
}
