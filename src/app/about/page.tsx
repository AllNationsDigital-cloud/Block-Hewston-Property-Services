import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import PhotoSlot from '@/components/PhotoSlot';
import Reveal from '@/components/Reveal';
import { Section } from '@/components/Section';
import { about as c, photos, site } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/about/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...c.hero} photo={photos.about} />

      <Section tone="charcoal">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-lg">
            {c.story.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className={i === 0 ? 'text-xl text-bone/90' : ''}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <PhotoSlot label={photos.about} className="aspect-[4/5] w-full" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-px bg-iron md:grid-cols-3">
          {c.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 120} className="bg-ink">
              <div className="h-full p-8 sm:p-10">
                <h2 className="display text-3xl">{v.title}</h2>
                <div className="rule-gold my-5" />
                <p>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="graphite">
        <Reveal className="max-w-3xl">
          <h2 className="display text-4xl sm:text-5xl">{c.parent.heading}</h2>
          <div className="rule-gold my-6" />
          <p className="text-lg">{c.parent.body}</p>
          <div className="mt-8">
            <a
              href={site.parent.url}
              rel="noopener"
              className="inline-flex min-h-12 items-center border border-steel-dim px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:border-gold-bright hover:text-gold-bright"
            >
              {c.parent.link}
            </a>
          </div>
        </Reveal>
      </Section>

      <CtaBand heading="Work with a firm that finishes." body="Owners request a walkthrough. Investors open a conversation." />
    </>
  );
}
