import { cta } from '@/content/site';
import Button from './Button';
import Container from './Container';
import Reveal from './Reveal';

export default function CtaBand({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="border-t border-iron bg-charcoal py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-4xl sm:text-5xl">{heading}</h2>
            <div className="rule-gold my-6" />
            <p className="text-lg text-steel">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={cta.owner.href}>{cta.owner.label}</Button>
            <Button href={cta.investor.href} variant="outline">
              {cta.investor.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
