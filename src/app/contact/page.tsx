import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Masthead from '@/components/Masthead';
import Reveal from '@/components/Reveal';
import { contact as c, site } from '@/content/site';

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: '/contact/' },
  openGraph: { title: c.seo.title, description: c.seo.description, url: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <Masthead />
      <div className="pad grid-2">
        <Reveal>
          <div className="sec sec--stacked">
            <div className="sec__title">
              <div className="eyebrow">{c.head.eyebrow}</div>
              <h1 className="display" style={{ fontSize: 'clamp(28px,3.6vw,56px)', fontWeight: 800, lineHeight: 1 }}>
                {c.head.title.map((l) => <span key={l}>{l}</span>)}
              </h1>
            </div>
            <p className="lead">{c.head.lede}</p>
          </div>
          <dl className="direct" style={{ marginTop: 48 }}>
            <div>
              <dt>Phone</dt>
              <dd><a href={`tel:${site.phoneTel}`}>{site.phone}</a></dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${site.email}`} style={{ wordBreak: 'break-all' }}>{site.email}</a></dd>
            </div>
            <div>
              <dt>Headquarters</dt>
              <dd>{site.hq}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </>
  );
}
