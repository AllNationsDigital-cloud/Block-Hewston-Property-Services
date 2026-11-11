import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import { Button, CTABand, Hero, ProcessSteps, SectionHeader, Statement } from '@/components/ui';
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
      <Hero photo={photos.dallasTrinity} title={c.hero.title} lede={c.hero.lede} masthead={<Masthead overlay />} height="720px" position="center 60%" />
      <div className="pad">
        <SectionHeader title={c.intro.title} lede={c.intro.lede} />
      </div>
      <section className="alt pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={c.values.eyebrow} title={c.values.title} />
          <ProcessSteps steps={c.values.items} />
        </div>
      </section>
      <div className="pad">
        <Statement lines={c.statement} />
      </div>
      <section className="on-dark pad">
        <SectionHeader dark eyebrow={c.parent.eyebrow} title={c.parent.title} lede={c.parent.body} action={<Button href={site.parent.url} tone="dark" variant="secondary" external arrow>{c.parent.link}</Button>} />
      </section>
      <CTABand title={c.cta.title} lede={c.cta.lede} />
    </>
  );
}
