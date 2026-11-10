import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import { PageHead, Section, SecHead } from '@/components/Sections';
import Tiles from '@/components/Tiles';
import { images, rehab as c } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/rehab-restoration/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/rehab-restoration/' },
};

const pics = [images.turnover, images.repairs, images.painting];

export default function RehabPage() {
  return (
    <>
      <PageHead {...c.hero} />

      <Section>
        <SecHead heading="Three kinds of project." />
        <Tiles cols={3} items={c.types.map((t, i) => ({ title: t.title, body: t.body, img: pics[i] }))} />
      </Section>

      <Section tone="tint">
        <SecHead heading={c.method.heading} />
        <Rail items={c.method.steps} />
        <Reveal>
          <p className="note" style={{ marginTop: '2rem', maxWidth: '40rem' }}>
            {c.note}
          </p>
        </Reveal>
      </Section>

      <CtaBand heading="Bring us the hard ones." body="Distressed, neglected or overdue. Send the address and we will walk it." />
    </>
  );
}
