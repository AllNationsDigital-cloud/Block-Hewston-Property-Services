import type { Metadata } from 'next';
import Masthead from '@/components/Masthead';
import Reveal from '@/components/Reveal';
import StateMap from '@/components/StateMap';
import { CTABand, Hero, ServiceList } from '@/components/ui';
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
      <Hero photo={photos.shreveport} title={c.hero.title} lede={c.hero.lede} masthead={<Masthead overlay />} height="min(820px,100vh)" position="center 60%" />
      <div className="pad">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <Reveal>
            <StateMap />
          </Reveal>
          <ServiceList items={c.anchors} />
        </div>
        <p className="note" style={{ marginTop: 40 }}>{c.note}</p>
      </div>
      <CTABand title={c.cta.title} lede={c.cta.lede} />
    </>
  );
}
