import type { Metadata, Viewport } from 'next';
import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import '@fontsource-variable/inter';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { home, site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.seo.title, template: '%s' },
  description: home.seo.description,
  applicationName: site.name,
  keywords: [
    'property services Shreveport',
    'rental rehab Texas',
    'make-ready Louisiana',
    'real estate development Dallas',
    'Block Development Group',
    'Block & Hewston',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: home.seo.title,
    description: home.seo.description,
    url: site.url,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#0b0b0c', colorScheme: 'dark' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  telephone: site.phoneTel,
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Dallas', addressRegion: 'TX', addressCountry: 'US' },
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'Louisiana' },
    { '@type': 'City', name: 'Shreveport, LA' },
    { '@type': 'City', name: 'Dallas, TX' },
    { '@type': 'City', name: 'Houston, TX' },
  ],
  parentOrganization: { '@type': 'Organization', name: site.parent.name, url: site.parent.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Analytics placeholder: paste your snippet here (Plausible, GA4, Cloudflare Web Analytics). */}
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 bg-gold px-4 py-3 text-sm font-semibold text-ink focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
