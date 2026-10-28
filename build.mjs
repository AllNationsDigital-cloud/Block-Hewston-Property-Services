// Static site build: src/pages/*.html + src/partials + src/layout.html  ->  public/
// No dependencies. Run: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = (...p) => path.join(root, 'src', ...p);
const out = path.join(root, 'public');
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
config.formEndpointAttr = config.formEndpoint ? ` data-endpoint="${config.formEndpoint}"` : '';
const today = new Date().toISOString().slice(0, 10);

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src('static'), out, { recursive: true });

const get = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);

function render(tpl, ctx, label) {
  tpl = tpl.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, n) =>
    render(fs.readFileSync(src('partials', `${n}.html`), 'utf8'), ctx, `partial:${n}`));
  return tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, k) => {
    const v = get(ctx, k);
    if (v === undefined) throw new Error(`Unknown token ${m} in ${label}`);
    return v;
  });
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const stripTags = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function navHtml(active) {
  return config.nav.map((n) => {
    const cur = n.key === active ? ' aria-current="page"' : '';
    const cls = n.more ? ' class="nav__more"' : '';
    return `<li${cls}><a href="${n.href}"${cur}>${n.label}</a></li>`;
  }).join('\n');
}

function schema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${config.url}/#business`,
    name: config.name,
    url: config.url,
    telephone: config.phoneTel,
    email: config.email,
    image: `${config.url}/img/og-image.png`,
    logo: `${config.url}/img/logo-dark.png`,
    description: 'Veteran-led rental turnover cleaning, cleanouts, painting, minor repairs and make-ready for property managers, landlords and investors in Shreveport–Bossier, Louisiana.',
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: 'Shreveport', addressRegion: 'LA', addressCountry: 'US' },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00', closes: '17:00'
    }],
    areaServed: [
      { '@type': 'City', name: 'Shreveport, LA' },
      { '@type': 'City', name: 'Bossier City, LA' },
      { '@type': 'AdministrativeArea', name: 'Caddo Parish, LA' },
      { '@type': 'AdministrativeArea', name: 'Bossier Parish, LA' }
    ],
    parentOrganization: { '@type': 'Organization', name: 'Block & Hewston', url: config.parentUrl },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Property services',
      itemListElement: ['Rental turnover cleaning', 'Junk removal and cleanouts', 'Interior and exterior painting',
        'Minor repairs and handyman work', 'Carpet cleaning coordination', 'Full make-ready between tenants']
        .map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } }))
    }
  });
}

function faqSchema(html) {
  const items = [...html.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)]
    .map((m) => ({
      '@type': 'Question', name: stripTags(m[1]),
      acceptedAnswer: { '@type': 'Answer', text: stripTags(m[2]) }
    }));
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items })}</script>`;
}

const layout = fs.readFileSync(src('layout.html'), 'utf8');
const sitemap = [];

for (const file of fs.readdirSync(src('pages')).filter((f) => f.endsWith('.html'))) {
  const slug = file.replace(/\.html$/, '');
  let raw = fs.readFileSync(src('pages', file), 'utf8');
  const m = raw.match(/^<!--\s*(\{[\s\S]*?\})\s*-->\s*/);
  if (!m) throw new Error(`${file}: missing <!--{meta}--> header`);
  const meta = JSON.parse(m[1]);
  raw = raw.slice(m[0].length);

  const urlPath = slug === 'index' ? '/' : slug === '404' ? '/404.html' : `/${slug}/`;
  const ctx = { config, page: { slug, ...meta }, year: new Date().getFullYear() };
  let content = render(raw, ctx, file);
  const extraHead = meta.faqSchema ? faqSchema(content) : '';

  const html = render(layout, {
    ...ctx,
    content,
    nav: navHtml(meta.nav || slug),
    title: esc(meta.title),
    description: esc(meta.description),
    canonical: config.url + (slug === '404' ? '/' : urlPath),
    robots: meta.noindex ? 'noindex, follow' : 'index, follow',
    schema: schema(),
    extraHead,
    analytics: config.analytics || '<!-- Analytics placeholder: paste your snippet into site.config.json -> "analytics" -->',
    bodyClass: meta.bodyClass || ''
  }, `layout(${file})`);

  const dest = slug === 'index' ? path.join(out, 'index.html')
    : slug === '404' ? path.join(out, '404.html')
    : path.join(out, slug, 'index.html');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  if (!meta.noindex) sitemap.push({ loc: config.url + urlPath, priority: meta.priority || (slug === 'index' ? '1.0' : '0.7') });
}

fs.writeFileSync(path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemap.map((s) => `  <url><loc>${s.loc}</loc><lastmod>${today}</lastmod><priority>${s.priority}</priority></url>`).join('\n') +
  `\n</urlset>\n`);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${config.url}/sitemap.xml\n`);
console.log(`Built ${sitemap.length} indexable pages -> public/`);
