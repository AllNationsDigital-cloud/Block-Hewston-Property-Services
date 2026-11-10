import type { ReactNode } from 'react';
import Container from './Container';
import Reveal from './Reveal';

export function Section({
  children,
  tone = 'ink',
  id,
  className = '',
}: {
  children: ReactNode;
  tone?: 'ink' | 'charcoal' | 'graphite';
  id?: string;
  className?: string;
}) {
  const bg = tone === 'ink' ? 'bg-ink' : tone === 'charcoal' ? 'bg-charcoal' : 'bg-graphite';
  return (
    <section id={id} className={`${bg} py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  kicker,
  heading,
  intro,
  className = '',
}: {
  kicker?: string;
  heading: string;
  intro?: string;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      {kicker && <p className="kicker mb-4">{kicker}</p>}
      <h2 className="display text-4xl sm:text-5xl lg:text-6xl">{heading}</h2>
      <div className="rule-gold my-6" />
      {intro && <p className="text-lg text-steel">{intro}</p>}
    </Reveal>
  );
}
