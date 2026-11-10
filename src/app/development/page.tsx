import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Rail from '@/components/Rail';
import Reveal from '@/components/Reveal';
import { PageHead, Section, SecHead } from '@/components/Sections';
import { development as c } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/development/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/development/' },
};

export default function DevelopmentPage() {
  return (
    <>
      <PageHead {...c.hero} />

      <Section tone="tint">
        <div className="split split--wide" style={{ alignItems: 'start' }}>
          <SecHead heading={c.vision.heading} />
          <Reveal delay={120}>
            <p className="lede" style={{ maxWidth: 'none' }}>
              {c.vision.body}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SecHead heading="The path." intro="Four stages. Each one funds and informs the next." />
        <Rail items={c.stages.map((s) => ({ title: s.title, body: s.body, icon: s.icon }))} />
      </Section>

      <Section tone="dark">
        <SecHead heading={c.principles.heading} />
        <Reveal>
          <div className="cells cells--2">
            {c.principles.items.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <SecHead heading={c.audiences.heading} />
        <Reveal>
          <div className="cells cells--4 cells--light">
            {c.audiences.items.map((a) => (
              <div key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBand heading="Partner with us." body="If your horizon matches ours, introduce yourself." />
    </>
  );
}
