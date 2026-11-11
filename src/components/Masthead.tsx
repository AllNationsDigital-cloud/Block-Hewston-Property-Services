'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cta, nav, site } from '@/content/site';
import Logo from './Logo';

/** `overlay` sits on top of a hero image (white on transparent). Otherwise white bar with a hairline. */
export default function Masthead({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [open]);

  const current = (href: string) => (pathname === href || pathname === href.replace(/\/$/, '') ? 'page' : undefined);

  return (
    <header className={`mast ${overlay ? 'mast--overlay' : ''}`}>
      <Link href="/" className="mast__logo" aria-label={`${site.name}, home`}>
        <Logo variant="compact" size={30} tone={overlay ? 'dark' : 'light'} />
      </Link>

      <nav className="mast__nav" aria-label="Primary">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="link" aria-current={current(n.href)}>
            {n.label}
          </Link>
        ))}
        <Link href={cta.mast.href} className="mast__cta">
          {cta.mast.label}
        </Link>
      </nav>

      <button type="button" className="mast__toggle" aria-expanded={open} aria-controls="mast-panel" onClick={() => setOpen(true)}>
        Menu
      </button>

      {open && (
        <div id="mast-panel" className="mast-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mast-panel__top">
            <Link href="/" aria-label={`${site.name}, home`}>
              <Logo variant="compact" size={30} tone="dark" />
            </Link>
            <button type="button" className="mast__toggle" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <nav aria-label="Mobile">
            {[...nav, { href: cta.mast.href, label: cta.mast.label }].map((n) => (
              <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mast-panel__foot">
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      )}
    </header>
  );
}
