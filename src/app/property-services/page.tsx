import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import { CTABand, Figure, ProcessSteps, SectionHeader, ServiceList } from '@/components/ui';
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
      <Masthead />
      <div className="pad">
        <SectionHeader eyebrow={c.head.eyebrow} title={c.head.title} lede={c.head.lede} />
      </div>
      <Figure photo={photos.steel} height={620} />
      <div className="pad">
        <ServiceList items={c.services} />
      </div>
      <section className="alt pad">
        <div className="stack">
          <SectionHeader eyebrow={c.remote.eyebrow} title={c.remote.title} lede={c.remote.lede} />
          <ProcessSteps steps={c.remote.points} />
        </div>
      </section>
      <div className="pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={c.process.eyebrow} title={c.process.title} />
          <ProcessSteps steps={c.process.steps} />
        </div>
      </div>
      <CTABand title={c.cta.title} lede={c.cta.lede} />
    </>
  );
}
