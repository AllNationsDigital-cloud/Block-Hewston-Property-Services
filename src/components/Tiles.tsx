import Link from 'next/link';
import type { CSSProperties } from 'react';
import Reveal from './Reveal';

export type Tile = { title: string; body: string; img: string; href?: string; cta?: string };

/** Charcoal cards. A related image fades in on hover or focus. */
export default function Tiles({ items, cols = 3 }: { items: readonly Tile[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={`tiles tiles--${cols}`}>
      {items.map((t, i) => {
        const style = { ['--img' as string]: `url(${t.img})` } as CSSProperties;
        const inner = (
          <>
            <span className="tile__n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
            {t.cta && (
              <span className="tile__go">
                {t.cta} <span aria-hidden="true">→</span>
              </span>
            )}
          </>
        );
        return (
          <Reveal key={t.title} delay={i * 110} className="contents">
            {t.href ? (
              <Link href={t.href} className="tile" style={style}>
                {inner}
              </Link>
            ) : (
              <div className="tile" style={style} tabIndex={0}>
                {inner}
              </div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
