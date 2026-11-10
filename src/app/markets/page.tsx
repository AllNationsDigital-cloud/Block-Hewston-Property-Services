import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import { PageHead, Section } from '@/components/Sections';
import StateMap from '@/components/StateMap';
import { markets as c } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/markets/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/markets/' },
};

export default function MarketsPage() {
  return (
    <>
      <PageHead {...c.hero} />
      <Section>
        <div className="split">
          <Reveal className="map">
            <StateMap />
          </Reveal>
          <Reveal delay={150}>
            <div className="cells cells--light">
              {c.anchors.map((m) => (
                <div key={m.name}>
                  <p className="kicker" style={{ marginBottom: '.5rem' }}>
                    {m.role}
                  </p>
                  <h3>{m.name}</h3>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
            <p className="note" style={{ marginTop: '1.25rem' }}>
              {c.note}
            </p>
          </Reveal>
        </div>
      </Section>
      <CtaBand heading="Your market. Our crew." body="Tell us where the property is. We will tell you how we can help." />
    </>
  );
}
