import Link from 'next/link';
import { footer, site } from '@/content/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot">
        <div>
          <Logo tone="dark" size={48} />
          <div className="foot__addr">{footer.address}</div>
        </div>
        {footer.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2>Contact</h2>
          <ul>
            <li><a href={`tel:${site.phoneTel}`}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} style={{ wordBreak: 'break-all' }}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="foot__legal">
        <span>
          © Block Development Group. A{' '}
          <a href={site.parent.url} rel="noopener" style={{ textDecoration: 'underline' }}>
            {site.parent.name}
          </a>{' '}
          company.
        </span>
        <span>Texas · Louisiana</span>
      </div>
    </footer>
  );
}
