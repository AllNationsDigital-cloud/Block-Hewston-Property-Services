'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contact, site } from '@/content/site';

type Kind = 'owner' | 'investor';
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
    if (t === 'owner' || t === 'investor') setKind(t);
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
    if (kind === 'owner' && !get('address')) e.address = 'Enter the property address.';
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
        `mailto:${site.email}?subject=${encodeURIComponent(kind === 'owner' ? 'Walkthrough request' : 'Partnership inquiry')}&body=${encodeURIComponent(lines)}`,
      );
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="success">
        <h2>{f.successTitle}</h2>
        <span className="rule" />
        <p className="lede">{f.successBody}</p>
        <p>
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
        </p>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="field__error">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form">
      <fieldset>
        <legend>{f.typeLabel}</legend>
        <div className="seg">
          {f.types.map((t) => (
            <label key={t.value}>
              <input type="radio" name="kind" value={t.value} checked={kind === t.value} onChange={() => setKind(t.value as Kind)} />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="row row--2">
        <div className="field">
          <label htmlFor="name">{f.nameLabel}</label>
          <input id="name" name="name" autoComplete="name" required {...aria('name')} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="email">{f.emailLabel}</label>
          <input id="email" name="email" type="email" autoComplete="email" required {...aria('email')} />
          {err('email')}
        </div>
      </div>

      <div className="row row--2">
        <div className="field">
          <label htmlFor="phone">{f.phoneLabel}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required {...aria('phone')} />
          {err('phone')}
        </div>
        <div className="field">
          <label htmlFor="address">
            {f.addressLabel} {kind === 'investor' && <span className="hint">({f.addressHint})</span>}
          </label>
          <input id="address" name="address" autoComplete="street-address" {...aria('address')} />
          {err('address')}
        </div>
      </div>

      <div className="field">
        <label htmlFor="project">
          {f.projectLabel} <span className="hint">({f.projectHint})</span>
        </label>
        <textarea id="project" name="project" rows={6} required {...aria('project')} />
        {err('project')}
      </div>

      {/* Honeypot: real visitors never see or fill this. */}
      <div aria-hidden="true" className="hp">
        <label>
          Website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <div role="alert" className="form__alert">
          {f.errorBody}{' '}
          <a href={mailto}>Email {site.email}</a>.
        </div>
      )}

      <div className="form__foot">
        <button type="submit" disabled={status === 'sending'} className="btn btn--gold">
          {status === 'sending' ? f.sending : f.submit}
        </button>
        <p>{f.consent}</p>
      </div>
    </form>
  );
}
