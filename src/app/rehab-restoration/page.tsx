import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import PhotoSlot from '@/components/PhotoSlot';
import Reveal from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { photos, rehab as c } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/rehab-restoration/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/rehab-restoration/' },
};

export default function RehabPage() {
  return (
    <>
      <PageHero {...c.hero} photo={photos.rehab} />

      <Section tone="charcoal">
        <SectionHeading heading="Three kinds of project." />
        <div className="mt-14 grid gap-px bg-iron lg:grid-cols-3">
          {c.types.map((t, i) => (
            <Reveal key={t.title} delay={i * 140} className="bg-charcoal">
              <div className="h-full p-8 sm:p-10">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gold-bright">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display mt-2 text-3xl">{t.title}</h3>
                <p className="mt-4">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <PhotoSlot label={photos.rehab} className="aspect-[21/9] w-full" />
        </Reveal>
      </Section>

      <Section>
        <SectionHeading heading={c.method.heading} />
        <ol className="mt-14 grid gap-px bg-iron sm:grid-cols-2 lg:grid-cols-4">
          {c.method.steps.map((s, i) => (
            <li key={s.n} className="bg-ink">
              <Reveal delay={i * 120} className="h-full p-8">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gold-bright">{s.n}</span>
                <h3 className="display mt-2 text-3xl">{s.title}</h3>
                <p className="mt-3 text-sm">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="mt-10 max-w-3xl border-l-2 border-gold pl-5 text-sm">{c.note}</Reveal>
      </Section>

      <CtaBand heading="Bring us the hard ones." body="Distressed, neglected or overdue. Send the address and we will walk it." />
    </>
  );
}
