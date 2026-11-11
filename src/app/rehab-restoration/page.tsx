import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import { CTABand, Figure, ProcessSteps, SectionHeader, ServiceList } from '@/components/ui';
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
      <Masthead />
      <div className="pad">
        <SectionHeader eyebrow={c.head.eyebrow} title={c.head.title} lede={c.head.lede} />
      </div>
      <Figure photo={photos.timber} height={620} position="center 60%" />
      <div className="pad">
        <ServiceList items={c.types} />
      </div>
      <section className="alt pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={c.method.eyebrow} title={c.method.title} />
          <ProcessSteps steps={c.method.steps} />
          <p className="note">{c.note}</p>
        </div>
      </section>
      <CTABand title={c.cta.title} lede={c.cta.lede} />
    </>
  );
}
