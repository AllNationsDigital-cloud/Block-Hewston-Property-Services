import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline';

const styles: Record<Variant, string> = {
  solid: 'bg-gold text-ink hover:bg-gold-bright border border-gold hover:border-gold-bright',
  outline: 'border border-steel-dim text-bone hover:border-gold-bright hover:text-gold-bright',
};

export default function Button({
  href,
  children,
  variant = 'solid',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
