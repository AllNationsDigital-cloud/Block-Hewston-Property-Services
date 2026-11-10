import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import { PageHead, Section, SecHead } from '@/components/Sections';
import Tiles from '@/components/Tiles';
import { images, propertyServices as c } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/property-services/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/property-services/' },
};

const pics = [images.turnover, images.cleanouts, images.painting, images.repairs, images.rooflines];

export default function PropertyServicesPage() {
  return (
    <>
      <PageHead {...c.hero} />

      <Section>
        <SecHead heading="What we do." />
        <Tiles cols={3} items={c.services.map((s, i) => ({ title: s.title, body: s.body, img: pics[i] }))} />
      </Section>

      <Section tone="dark">
        <SecHead kicker={c.remote.kicker} heading={c.remote.heading} intro={c.remote.body} />
        <Reveal>
          <div className="cells cells--4">
            {c.remote.points.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="tint">
        <SecHead heading={c.process.heading} />
        <Rail items={c.process.steps} />
      </Section>

      <CtaBand heading="Request a walkthrough." body="Give us the address and the objective. We take it from there." />
    </>
  );
}
