import Link from 'next/link';
import type { ReactNode } from 'react';
import { cta } from '@/content/site';
import Reveal from './Reveal';

type Photo = { src: string; alt: string };
const lines = (t: string | readonly string[]) => (Array.isArray(t) ? (t as readonly string[]) : [t as string]);

export function Button({ href, children, tone = 'light', variant = 'primary', arrow = false, external = false }: { href: string; children: ReactNode; tone?: 'light' | 'dark'; variant?: 'primary' | 'secondary' | 'text'; arrow?: boolean; external?: boolean }) {
  const cls = `btn ${variant === 'secondary' ? 'btn--secondary' : variant === 'text' ? 'btn--text' : ''} ${tone === 'dark' ? 'btn--dark' : ''}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <span className="arrow" aria-hidden="true">→</span>}
    </>
  );
  return external ? (
    <a href={href} rel="noopener" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export function Hero({ photo, title, lede, actions, masthead, height, position = 'center' }: { photo: Photo; title: readonly string[]; lede?: string; actions?: ReactNode; masthead: ReactNode; height?: string; position?: string }) {
  return (
    <section className="hero" style={height ? ({ ['--hero-h' as string]: height } as React.CSSProperties) : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero__img" src={photo.src} alt="" style={{ objectPosition: position }} fetchPriority="high" />
      <div className="hero__scrim" />
      {masthead}
      <div className="hero__body">
        <h1 className="display">
          {title.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h1>
        {(lede || actions) && (
          <div className="hero__row">
            {lede && <p className="lead">{lede}</p>}
            {actions && <div className="btns">{actions}</div>}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, lede, action, layout = 'split', dark = false }: { eyebrow?: string; title: string | readonly string[]; lede?: string; action?: ReactNode; layout?: 'split' | 'stacked'; dark?: boolean }) {
  return (
    <Reveal>
      <header className={`sec ${layout === 'stacked' ? 'sec--stacked' : ''} ${dark ? 'on-dark' : ''}`}>
        <div className="sec__title">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2>{lines(title).map((l) => <span key={l}>{l}</span>)}</h2>
        </div>
        {(lede || action) && (
          <div className="sec__right">
            {lede && <p className="lead" style={dark ? { color: '#fff' } : undefined}>{lede}</p>}
            {action}
          </div>
        )}
      </header>
    </Reveal>
  );
}

export function Statement({ lines: ls }: { lines: readonly string[] }) {
  return (
    <Reveal className="statement">
      <p className="display">{ls.map((l) => <span key={l}>{l}</span>)}</p>
    </Reveal>
  );
}

export function Figure({ photo, height = 620, position }: { photo: Photo; height?: number; position?: string }) {
  return (
    <figure className="figure" style={{ ['--fig-h' as string]: `${height}px` } as React.CSSProperties}>
      <div className="figure__box">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: position }} />
      </div>
    </figure>
  );
}

export function ImageCards({ items }: { items: readonly { title: string; meta: string; body: string; href: string; photo: Photo }[] }) {
  return (
    <div className="cards">
      {items.map((c, i) => (
        <Reveal key={c.title} delay={i * 120}>
          <Link href={c.href} className="card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.photo.src} alt="" loading="lazy" />
            <div className="card__scrim" />
            <div className="card__body">
              <div className="card__meta">{c.meta}</div>
              <div className="card__title">
                {c.title}
                <span className="arrow" aria-hidden="true">→</span>
              </div>
              <p className="card__text">{c.body}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function ServiceList({ items }: { items: readonly { id?: string; title: string; body: string; items?: readonly string[] }[] }) {
  return (
    <div>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 60}>
          <div className="svc" id={it.id} style={it.id ? { scrollMarginTop: 'calc(var(--masthead-h) + 16px)' } : undefined}>
            <h3 className="svc__title" style={{ margin: 0 }}>{it.title}</h3>
            <div className="svc__body">
              <p>{it.body}</p>
              {it.items && <div className="svc__tags">{it.items.join(' · ')}</div>}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ProcessSteps({ steps }: { steps: readonly { title: string; body?: string }[] }) {
  return (
    <div className="steps">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 120}>
          <div className="step">
            <h3>{s.title}</h3>
            {s.body && <p>{s.body}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function CTABand({ title, lede, primary }: { title: readonly string[]; lede: string; primary?: { label: string; href: string } }) {
  const a = primary ?? cta.owner;
  return (
    <section className="cta-band">
      <Reveal>
        <h2 className="display">{title.map((l) => <span key={l}>{l}</span>)}</h2>
      </Reveal>
      <Reveal delay={150} className="cta-band__right">
        <p>{lede}</p>
        <div className="btns">
          <Button href={a.href} tone="dark" arrow>{a.label}</Button>
          <Button href={cta.investor.href} tone="dark" variant="secondary">{cta.investor.label}</Button>
        </div>
      </Reveal>
    </section>
  );
}
