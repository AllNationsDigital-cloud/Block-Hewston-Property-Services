'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cta, nav, site } from '@/content/site';
import Container from './Container';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center border border-gold font-display text-lg font-bold text-gold-bright">
        B
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold uppercase tracking-[0.08em] text-bone">Block</span>
        <span className="mt-1 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-steel">Development Group</span>
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  const isCurrent = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open ? 'border-iron bg-ink/95 backdrop-blur' : 'border-transparent bg-gradient-to-b from-ink/80 to-transparent'
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label={`${site.name}, home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 min-[1320px]:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isCurrent(n.href) ? 'page' : undefined}
              className={`whitespace-nowrap text-[0.75rem] font-semibold uppercase tracking-[0.13em] transition-colors hover:text-gold-bright ${
                isCurrent(n.href) ? 'text-gold-bright' : 'text-bone'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href={cta.owner.href}
            className="whitespace-nowrap border border-gold px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.13em] text-gold-bright transition-colors hover:bg-gold hover:text-ink"
          >
            {cta.owner.label}
          </Link>
        </nav>

        <div className="flex items-center gap-2 min-[1320px]:hidden">
          <a
            href={`tel:${site.phoneTel}`}
            className="border border-steel-dim px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-bone"
            aria-label={`Call ${site.phone}`}
          >
            Call
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center border border-steel-dim text-bone"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true" className="relative block h-[2px] w-5 bg-current before:absolute before:-top-[7px] before:block before:h-[2px] before:w-5 before:bg-current after:absolute after:top-[7px] after:block after:h-[2px] after:w-5 after:bg-current" />
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-iron bg-ink min-[1320px]:hidden">
          <Container className="flex flex-col py-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isCurrent(n.href) ? 'page' : undefined}
                className="border-b border-iron py-4 font-display text-xl font-bold uppercase tracking-wide text-bone"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href={cta.owner.href}
              className="mt-5 bg-gold px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            >
              {cta.owner.label}
            </Link>
            <Link
              href={cta.investor.href}
              className="mt-3 border border-steel-dim px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-bone"
            >
              {cta.investor.label}
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
