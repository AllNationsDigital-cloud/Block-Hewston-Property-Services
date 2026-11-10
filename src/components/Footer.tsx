import Link from 'next/link';
import { footer, nav, site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div>
          <a href={site.parent.url} rel="noopener" aria-label="Block & Hewston (parent company site)">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-gold.png" width={600} height={274} alt="Block & Hewston" className="foot__logo" />
          </a>
          <p>
            <b>{site.name}</b>
            <br />
            {footer.blurb}
          </p>
        </div>
        <p>
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          {site.hq}
        </p>
        <p>
          {nav.slice(0, 3).map((n) => (
            <span key={n.href}>
              <Link href={n.href}>{n.label}</Link>
              <br />
            </span>
          ))}
        </p>
        <p>
          {nav.slice(3).map((n) => (
            <span key={n.href}>
              <Link href={n.href}>{n.label}</Link>
              <br />
            </span>
          ))}
        </p>
      </div>
      <div className="wrap foot__legal">
        <p>
          © {new Date().getFullYear()} {site.parent.name}. All rights reserved.
        </p>
        <p>
          {footer.legal}{' '}
          <a href={site.parent.url} rel="noopener">
            {site.parent.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
