import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import PhotoSlot from '@/components/PhotoSlot';
import Reveal from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { photos, propertyServices as c } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/property-services/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/property-services/' },
};

export default function PropertyServicesPage() {
  return (
    <>
      <PageHero {...c.hero} photo={photos.services} />

      <Section tone="charcoal">
        <SectionHeading heading="What we do." />
        <ol className="mt-14 divide-y divide-iron border-y border-iron">
          {c.services.map((s, i) => (
            <li key={s.title}>
              <Reveal className="grid gap-4 py-8 md:grid-cols-[5rem_1fr_1.4fr] md:items-baseline md:gap-10">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gold-bright">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display text-3xl">{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="kicker mb-4">{c.remote.kicker}</p>
            <h2 className="display text-4xl sm:text-5xl">{c.remote.heading}</h2>
            <div className="rule-gold my-6" />
            <p className="text-lg">{c.remote.body}</p>
            <PhotoSlot label={photos.rehab} className="mt-10 aspect-[16/10] w-full" />
          </Reveal>
          <div className="grid gap-px self-start bg-iron sm:grid-cols-2">
            {c.remote.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} className="bg-ink">
                <div className="h-full p-7">
                  <h3 className="display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="graphite">
        <SectionHeading heading={c.process.heading} />
        <ol className="mt-14 grid gap-px bg-iron sm:grid-cols-2 lg:grid-cols-4">
          {c.process.steps.map((s, i) => (
            <li key={s.n} className="bg-graphite">
              <Reveal delay={i * 120} className="h-full p-8">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gold-bright">{s.n}</span>
                <h3 className="display mt-2 text-3xl">{s.title}</h3>
                <p className="mt-3 text-sm">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand heading="Request a walkthrough." body="Give us the address and the objective. We will take it from there." />
    </>
  );
}
