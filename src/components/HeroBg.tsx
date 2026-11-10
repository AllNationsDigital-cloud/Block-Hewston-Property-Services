'use client';

import { useEffect, useRef } from 'react';
import { images } from '@/content/site';

/** Hero photo: zooms and drifts with scroll. Respects reduced motion (CSS also disables the transform). */
export default function HeroBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tick = false;
    const update = () => {
      tick = false;
      const h = el.parentElement?.offsetHeight || 1;
      el.style.setProperty('--p', Math.min(1, Math.max(0, window.scrollY / h)).toFixed(3));
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={ref} className="hero__bg" style={{ backgroundImage: `url(${images.hero})` }} aria-hidden="true" />;
}
