'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cta, nav, site } from '@/content/site';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  const current = (href: string) => (pathname === href || pathname === href.replace(/\/$/, '') ? 'page' : undefined);

  return (
    <header className="site-header">
      <div className="wrap bar">
        <div className="logo">
          <a className="logo__mark" href={site.parent.url} rel="noopener" aria-label="Block & Hewston (parent company site)">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-dark.png" width={600} height={274} alt="Block & Hewston" />
          </a>
          <Link className="logo__label" href="/">
            Development Group
          </Link>
        </div>

        <nav className="nav-desktop" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="link" aria-current={current(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>

        <a className="callbtn" href={`tel:${site.phoneTel}`} aria-label={`Call ${site.phone}`}>
          Call
        </a>
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
          <span className="menu-btn__bars" aria-hidden="true" />
          <span className="sr">Menu</span>
        </button>
      </div>

      {open && (
        <nav id="site-nav" className="nav" aria-label="Mobile">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={current(n.href)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={cta.owner.href} className="btn btn--dark nav__cta">
            {cta.owner.label}
          </Link>
          <Link href={cta.investor.href} className="btn nav__cta">
            {cta.investor.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
