import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import { CTABand, Figure, SectionHeader, ServiceList } from '@/components/ui';
import { assets as c, photos } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/assets/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/assets/' },
};

export default function AssetsPage() {
  return (
    <>
      <Masthead />
      <div className="pad">
        <SectionHeader eyebrow={c.head.eyebrow} title={c.head.title} lede={c.head.lede} />
      </div>
      <Figure photo={photos.steel} height={560} />
      <div className="pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={c.engage.eyebrow} title={c.engage.title} />
          <ServiceList items={c.engage.items} />
        </div>
      </div>
      <section className="alt pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={c.classes.eyebrow} title={c.classes.title} />
          <ServiceList items={c.classes.items} />
        </div>
      </section>
      <CTABand title={c.cta.title} lede={c.cta.lede} />
    </>
  );
}
