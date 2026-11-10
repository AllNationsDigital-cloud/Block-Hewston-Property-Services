import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { PageHead, Section } from '@/components/Sections';
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
      <PageHead {...c.hero} />
      <Section tone="dark">
        <div className="split split--wide" style={{ alignItems: 'start' }}>
          <ContactForm />
          <aside className="aside-box">
            <h2>Direct.</h2>
            <span className="rule" />
            <dl>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} style={{ fontSize: '1.2rem', wordBreak: 'break-all' }}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Headquarters</dt>
                <dd>{site.hq}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
