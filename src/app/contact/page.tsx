import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { Section } from '@/components/Section';
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
      <PageHero {...c.hero} />
      <Section tone="charcoal">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={150}>
            <aside className="border border-iron bg-ink p-8">
              <h2 className="display text-3xl">Direct.</h2>
              <div className="rule-gold my-5" />
              <dl className="space-y-6">
                <div>
                  <dt className="kicker mb-1">Phone</dt>
                  <dd>
                    <a href={`tel:${site.phoneTel}`} className="font-display text-2xl font-bold text-bone hover:text-gold-bright">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="kicker mb-1">Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="break-all text-bone hover:text-gold-bright">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="kicker mb-1">Headquarters</dt>
                  <dd className="text-bone">{site.hq}</dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
