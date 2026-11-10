import Link from 'next/link';
import Button from '@/components/Button';
import Container from '@/components/Container';
import CtaBand from '@/components/CtaBand';
import PhotoSlot, { PlaceholderTag } from '@/components/PhotoSlot';
import Reveal from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import StateMap from '@/components/StateMap';
import { cta, home, photos, site } from '@/content/site';

export default function HomePage() {
  const h = home;
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink pb-16 pt-40 sm:pb-24">
        <PhotoSlot label={photos.hero} tag={false} className="absolute inset-0 -z-10" />
        <PlaceholderTag label={photos.hero} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <Container className="relative">
          <Reveal className="max-w-5xl">
            <p className="kicker mb-6">{h.hero.kicker}</p>
            <h1 className="display text-[2.9rem] sm:text-7xl lg:text-[6.5rem]">{h.hero.headline}</h1>
            <div className="rule-gold my-8" />
            <p className="max-w-2xl text-lg text-bone/80 sm:text-xl">{h.hero.sub}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.owner.href}>{cta.owner.label}</Button>
              <Button href={cta.investor.href} variant="outline">
                {cta.investor.label}
              </Button>
            </div>
            <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-iron pt-6 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-steel">
              {h.hero.markets.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* THREE TIERS */}
      <Section tone="charcoal">
        <SectionHeading heading={h.tiersHeading} intro={h.tiersIntro} />
        <div className="mt-14 grid gap-px bg-iron lg:grid-cols-3">
          {h.tiers.map((t, i) => (
            <Reveal key={t.title} delay={i * 140} className="bg-charcoal">
              <Link href={t.href} className="group flex h-full flex-col p-8 transition-colors hover:bg-graphite sm:p-10">
                <PhotoSlot label={photos[t.photo]} className="mb-8 aspect-[4/3] w-full" />
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gold-bright">{t.n}</span>
                <h3 className="display mt-2 text-4xl">{t.title}</h3>
                <p className="mt-4 flex-1 text-steel">{t.body}</p>
                <span className="mt-8 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-bone transition-colors group-hover:text-gold-bright">
                  {t.linkLabel} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* OWNERS + INVESTORS */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="kicker mb-4">{h.owners.kicker}</p>
            <h2 className="display text-4xl sm:text-5xl">{h.owners.heading}</h2>
            <div className="rule-gold my-6" />
            <p className="text-lg">{h.owners.body}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {h.owners.points.map((p) => (
                <li key={p} className="border-l-2 border-gold pl-4 text-bone">
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={cta.owner.href}>{cta.owner.label}</Button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="kicker mb-4">{h.investors.kicker}</p>
            <h2 className="display text-4xl sm:text-5xl">{h.investors.heading}</h2>
            <div className="rule-gold my-6" />
            <p className="text-lg">{h.investors.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={cta.investor.href} variant="outline">
                {cta.investor.label}
              </Button>
              <Button href="/development/" variant="outline">
                The plan
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* MARKETS */}
      <Section tone="graphite">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="kicker mb-4">Markets</p>
            <h2 className="display text-4xl sm:text-5xl">{h.markets.heading}</h2>
            <div className="rule-gold my-6" />
            <p className="text-lg">{h.markets.body}</p>
            <ul className="mt-8 space-y-2 text-bone">
              {h.hero.markets.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-2 w-2 bg-gold-bright" />
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/markets/" variant="outline">
                View markets
              </Button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <StateMap className="h-auto w-full" />
          </Reveal>
        </div>
      </Section>

      <CtaBand heading={h.closing.heading} body={h.closing.body} />
      <p className="sr-only">{site.description}</p>
    </>
  );
}
