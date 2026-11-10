'use client';

import { useEffect, useRef } from 'react';
import Icon, { type IconName } from './Icon';

export type RailItem = { title: string; body: string; icon: IconName };

/** Process rail: the line draws, dots light, cards rise and icons draw themselves when scrolled into view. */
export default function Rail({ items, cols = 4 }: { items: readonly RailItem[]; cols?: 3 | 4 }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            io.disconnect();
          }
        }),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className={`flow flow--${cols}`}>
      {items.map((it, i) => (
        <li key={it.title} style={{ ['--i' as string]: i }}>
          <b>{it.title}</b>
          <span>{it.body}</span>
          <Icon name={it.icon} />
        </li>
      ))}
    </ol>
  );
}
