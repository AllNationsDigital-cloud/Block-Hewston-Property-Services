import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import { Button, CTABand, Hero, ProcessSteps, SectionHeader, ServiceList } from '@/components/ui';
import { cta, development as c, photos } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/development/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/development/' },
};

export default function DevelopmentPage() {
  return (
    <>
      <Hero
        photo={photos.formwork}
        title={c.hero.title}
        lede={c.hero.lede}
        masthead={<Masthead overlay />}
        height="min(820px,100vh)"
        position="center 35%"
        actions={<Button href={cta.investor.href} tone="dark" arrow>{cta.investor.label}</Button>}
      />
      <div className="pad">
        <SectionHeader title={c.vision.title} lede={c.vision.lede} />
      </div>
      <div className="pad-x" style={{ paddingBottom: 'var(--section)' }}>
        <ServiceList items={c.stages} />
      </div>
      <section className="alt pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={c.principles.eyebrow} title={c.principles.title} />
          <ProcessSteps steps={c.principles.items} />
        </div>
      </section>
      <div className="pad">
        <div className="stack">
          <SectionHeader layout="stacked" eyebrow={c.audiences.eyebrow} title={c.audiences.title} />
          <ProcessSteps steps={c.audiences.items} />
        </div>
      </div>
      <CTABand title={c.cta.title} lede={c.cta.lede} />
    </>
  );
}
