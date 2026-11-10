import Link from 'next/link';
import { footer, nav, site } from '@/content/site';
import Container from './Container';
import { Wordmark } from './Header';

export default function Footer() {
  return (
    <footer className="border-t border-iron bg-ink py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${site.name}, home`}>
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-sm text-sm text-steel">{footer.blurb}</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="kicker mb-4 !font-sans">Navigate</h2>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-bone hover:text-gold-bright">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="kicker mb-4 !font-sans">Contact</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${site.phoneTel}`} className="text-bone hover:text-gold-bright">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-bone hover:text-gold-bright">
                  {site.email}
                </a>
              </li>
              <li className="text-steel">{site.hq}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-iron pt-6 text-xs text-steel-dim sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.parent.name}. All rights reserved.
          </p>
          <p>
            {footer.legal}{' '}
            <a href={site.parent.url} rel="noopener" className="text-steel hover:text-gold-bright">
              {site.parent.name}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
