import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

const paths = ['/', '/assets/', '/property-services/', '/rehab-restoration/', '/development/', '/markets/', '/about/', '/contact/'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date(), priority: p === '/' ? 1 : 0.7 }));
}
