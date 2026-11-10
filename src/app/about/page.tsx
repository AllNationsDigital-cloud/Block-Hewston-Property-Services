import type { Metadata } from 'next';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import { PageHead, Section } from '@/components/Sections';
import { about as c, site } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/about/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <PageHead {...c.hero} />

      <Section>
        <div style={{ maxWidth: '44rem' }}>
          {c.story.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className={i === 0 ? 'lede' : ''}>{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <Reveal>
          <div className="cells cells--3">
            {c.values.map((v) => (
              <div key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="tint">
        <Reveal className="narrow">
          <h2>{c.parent.heading}</h2>
          <span className="rule" />
          <p>{c.parent.body}</p>
          <a className="btn" href={site.parent.url} rel="noopener">
            {c.parent.link}
          </a>
        </Reveal>
      </Section>

      <CtaBand heading="Work with a firm that finishes." body="Owners request a walkthrough. Investors open a conversation." />
    </>
  );
}
