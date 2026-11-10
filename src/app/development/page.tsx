import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import PhotoSlot from '@/components/PhotoSlot';
import Reveal from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { development as c, photos } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/development/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/development/' },
};

export default function DevelopmentPage() {
  return (
    <>
      <PageHero {...c.hero} photo={photos.development} />

      <Section tone="charcoal">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading heading={c.vision.heading} />
          <Reveal delay={120}>
            <p className="text-xl leading-relaxed text-bone/90">{c.vision.body}</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading heading="The path." intro="Four stages. Each one funds and informs the next." />
        <ol className="mt-14 divide-y divide-iron border-y border-iron">
          {c.stages.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 60} className="grid gap-3 py-9 md:grid-cols-[5rem_1fr_1.5fr] md:items-baseline md:gap-10">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gold-bright">{s.n}</span>
                <h3 className="display text-3xl">{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="graphite">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading heading={c.principles.heading} />
            <Reveal className="mt-10">
              <PhotoSlot label={photos.develop} className="aspect-[4/3] w-full" />
            </Reveal>
          </div>
          <div className="grid gap-px self-start bg-iron sm:grid-cols-2">
            {c.principles.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} className="bg-graphite">
                <div className="h-full p-7">
                  <h3 className="display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading heading={c.audiences.heading} />
        <div className="mt-14 grid gap-px bg-iron sm:grid-cols-2 lg:grid-cols-4">
          {c.audiences.items.map((a, i) => (
            <Reveal key={a.title} delay={i * 110} className="bg-ink">
              <div className="h-full p-8">
                <h3 className="display text-3xl">{a.title}</h3>
                <p className="mt-3 text-sm">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand heading="Partner with us." body="If your horizon matches ours, introduce yourself." />
    </>
  );
}
