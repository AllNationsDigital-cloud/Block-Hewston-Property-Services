import type { ReactNode } from 'react';
import Reveal from './Reveal';

export function Section({
  children,
  tone = 'light',
  id,
}: {
  children: ReactNode;
  tone?: 'light' | 'tint' | 'dark';
  id?: string;
}) {
  const cls = tone === 'dark' ? 'section section--dark' : tone === 'tint' ? 'section section--tint' : 'section';
  return (
    <section id={id} className={cls}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SecHead({ heading, intro, kicker }: { heading: string; intro?: string; kicker?: string }) {
  return (
    <Reveal className="sec-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{heading}</h2>
      <span className="rule" />
      {intro && <p className="lede">{intro}</p>}
    </Reveal>
  );
}

export function PageHead({ kicker, headline, sub }: { kicker?: string; headline: string; sub: string }) {
  return (
    <header className="page-head">
      <div className="wrap">
        <Reveal>
          {kicker && <p className="kicker">{kicker}</p>}
          <h1>{headline}</h1>
          <p>{sub}</p>
        </Reveal>
      </div>
    </header>
  );
}
