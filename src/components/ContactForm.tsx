'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contact, site } from '@/content/site';

type Kind = 'owner' | 'investor';
type Errors = Partial<Record<'name' | 'email' | 'phone' | 'address' | 'project', string>>;

const field =
  'w-full border border-iron bg-graphite px-4 py-3 text-bone placeholder:text-steel-dim focus:border-gold-bright focus:outline-none focus:ring-1 focus:ring-gold-bright';

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
      <div ref={successRef} tabIndex={-1} role="status" className="scroll-mt-32 border border-gold/50 bg-graphite p-8 sm:p-10 focus:outline-none">
        <h2 className="display text-4xl">{f.successTitle}</h2>
        <div className="rule-gold my-5" />
        <p className="text-lg text-steel">{f.successBody}</p>
        <p className="mt-4 text-bone">
          <a href={`tel:${site.phoneTel}`} className="underline decoration-gold underline-offset-4 hover:text-gold-bright">
            {site.phone}
          </a>
        </p>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm text-[#ff9d8f]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const label = 'mb-2 block text-sm font-semibold text-bone';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className={label}>{f.typeLabel}</legend>
        <div className="grid grid-cols-2 gap-0 border border-iron">
          {f.types.map((t) => (
            <label key={t.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="kind"
                value={t.value}
                checked={kind === t.value}
                onChange={() => setKind(t.value as Kind)}
                className="peer sr-only"
              />
              <span className="block px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-steel transition-colors peer-checked:bg-gold peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-bright">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>{f.nameLabel}</label>
          <input id="name" name="name" autoComplete="name" required className={field} {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="email" className={label}>{f.emailLabel}</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={field} {...aria('email')} />
          {err('email')}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>{f.phoneLabel}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className={field} {...aria('phone')} />
          {err('phone')}
        </div>
        <div>
          <label htmlFor="address" className={label}>
            {f.addressLabel} {kind === 'investor' && <span className="font-normal text-steel-dim">({f.addressHint})</span>}
          </label>
          <input id="address" name="address" autoComplete="street-address" className={field} {...aria('address')} />
          {err('address')}
        </div>
      </div>

      <div>
        <label htmlFor="project" className={label}>
          {f.projectLabel} <span className="font-normal text-steel-dim">({f.projectHint})</span>
        </label>
        <textarea id="project" name="project" rows={6} required className={field} {...aria('project')} />
        {err('project')}
      </div>

      {/* Honeypot: real visitors never see or fill this. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <div role="alert" className="border border-[#ff9d8f]/60 bg-[#2a1716] p-4 text-sm text-[#ffb3aa]">
          {f.errorBody}{' '}
          <a href={mailto} className="font-semibold underline underline-offset-4">
            Email {site.email}
          </a>
          .
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-9 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-bright disabled:opacity-60"
        >
          {status === 'sending' ? f.sending : f.submit}
        </button>
        <p className="text-sm text-steel-dim">{f.consent}</p>
      </div>
    </form>
  );
}
