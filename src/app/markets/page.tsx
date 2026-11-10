import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { Section } from '@/components/Section';
import StateMap from '@/components/StateMap';
import { markets as c, photos } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/markets/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/markets/' },
};

export default function MarketsPage() {
  return (
    <>
      <PageHero {...c.hero} photo={photos.markets} />
      <Section tone="charcoal">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <StateMap className="h-auto w-full" />
          </Reveal>
          <div className="space-y-px bg-iron">
            {c.anchors.map((m, i) => (
              <Reveal key={m.name} delay={i * 130} className="bg-charcoal">
                <div className="p-7">
                  <p className="kicker mb-2">{m.role}</p>
                  <h2 className="display text-3xl">{m.name}</h2>
                  <p className="mt-3 text-sm">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-12 max-w-2xl text-sm">{c.note}</Reveal>
      </Section>
      <CtaBand heading="Your market. Our crew." body="Tell us where the property is. We will tell you how we can help." />
    </>
  );
}
