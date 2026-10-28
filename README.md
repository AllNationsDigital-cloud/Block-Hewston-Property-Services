# Block & Hewston Property Services: website

Static, dependency-free marketing site. Plain HTML/CSS/JS (about 6 KB of JS), built from small templates so the header, footer and CTA live in one place.

```
site.config.json     phone, email, hours, address, nav, analytics snippet, form endpoint
build.mjs            node build.mjs  ->  public/   (no npm install needed)
src/layout.html      <head> (SEO/OG/JSON-LD), header, footer
src/partials/        cta.html (final CTA band), sprite.html (icons)
src/pages/*.html     one file per page; first line is a <!--{meta}--> JSON header
src/static/          css/site.css, js/site.js, img/, favicon, _headers (copied as-is)
tools/               placeholder-image + brand-asset generators, local server
```

## Run locally
```bash
npm run dev        # builds, then serves http://localhost:8080
```

## Deploy

**Cloudflare Pages** (Workers & Pages → Create → Connect to Git):

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `node build.mjs` |
| Build output directory | `public` |
| Env var (optional) | `NODE_VERSION` = `22` |

Netlify works with the included `netlify.toml` (and its built-in Forms). Any static host works: run `node build.mjs` and upload `public/`.

After you pick the domain, set `"url"` in `site.config.json` (used for canonical URLs, Open Graph, sitemap, schema). It currently defaults to `https://properties.blockandhewston.com` as a guess.

## Editing content
- **Contact details, hours, nav, analytics:** `site.config.json`.
- **Copy:** edit the HTML in `src/pages/`. Tokens like `{{config.phone}}` are filled at build time.
- **Colors / fonts:** CSS variables at the top of `src/static/css/site.css`.
- **Per-page SEO:** the JSON header on line 1 of each page (`title`, `description`).
- **FAQ:** add a `<details><summary>…</summary><div class="ans">…</div></details>`. FAQPage schema is generated automatically.

## Wiring the forms (quote + contact)
Both forms POST `multipart/form-data` (including photo uploads) via `fetch`.
- **Netlify:** works out of the box (`data-netlify`). Set notification emails in the Netlify dashboard. Uploads are limited to about 8 MB per request there.
- **Formspree / Basin / Getform:** set `"formEndpoint"` in `site.config.json` to the endpoint URL.
- **CRM / email via your own API (Cloudflare Worker, Zapier/Make webhook, HubSpot, etc.):** point `formEndpoint` at it. Fields: `property_type, street, city, state, zip, units, services (repeated), notes, move_out_date, flexibility, photos (files), name, company, phone, email, contact_preference, consent`. A hidden `bot-field` honeypot is included; reject submissions where it is filled.
- On `localhost` with no endpoint set, the form runs in **demo mode** (shows the success state, logs the payload to the console). On any real host with no endpoint, it posts to `/` and shows an error message with your phone/email if that fails. **On Cloudflare Pages you must set `formEndpoint`** (Cloudflare has no built-in form handler).

## Analytics
Paste your snippet (Plausible, GA4, etc.) into `"analytics"` in `site.config.json`. The forms fire `plausible('Form Submit')` / `gtag('event','generate_lead')` if those exist.

## Images
- `src/static/img/*.svg` are **generated placeholders** (`before-/after-` living, kitchen, cleanout). Replace with real photos: keep the same camera position for before/after, 3:2 landscape, about 1600 px wide, compressed JPG/WebP under about 250 KB. Update `src` in `gallery.html` (and the hero image in `index.html`), and rewrite the `alt` text to describe the real photo.
- `og-image.png` (1200×630), `apple-touch-icon.png`, `favicon.svg`, `logo.svg` are simple generated brand assets. Swap in final artwork with the same names.
- `service-area-map.svg` is illustrative. To use a live map instead, replace the `<img>` in `service-area.html` with a Google Maps embed `<iframe title="Map of service area" loading="lazy" …>`.

## Pre-launch checklist: things to fill in or confirm
Find the placeholders: `grep -rn "\[[A-Z]" src/pages site.config.json`
- [ ] Street address, ZIP, founding year, founder/team story (About)
- [ ] Phone: **443 is a Maryland area code.** A local 318 number (even a forwarding line) helps local trust and SEO. Update `site.config.json`.
- [ ] Business days (Mon–Fri assumed; schema also assumes Mon–Fri 8–5)
- [ ] Insurance carrier/limits and COI process; the "Insured" claim must be true at launch
- [ ] Net terms, portfolio discount percentages, deposit/payment/cancellation policies
- [ ] Turnaround times shown (24–48 hrs, 1–2 days, 3–7 days, etc.) are realistic defaults; confirm they match your capacity
- [ ] Carpet-cleaning partner arrangement and how it is billed
- [ ] Outer-parish travel radius
- [ ] Real before/after photos and testimonials (none are included, and none are invented)
- [ ] Privacy Policy and Terms: have a Louisiana attorney review. Also confirm with counsel or the Louisiana State Licensing Board for Contractors that your service mix and the $7,500 scope cap need no license or registration. The site never claims "no license required."
- [ ] Set `"url"` to the final domain; submit `/sitemap.xml` to Google Search Console; create/claim a Google Business Profile (the biggest local-SEO lever)

## Quality notes
- Semantic landmarks, skip link, visible focus, keyboard-operable menu/slider/form, form errors announced via `role="alert"`, color contrast designed for WCAG AA, `prefers-reduced-motion` respected. Run Lighthouse and axe after you swap in real content.
- Works without JS (menu and content show; form steps collapse into one long form; the before/after slider needs JS).
- Fonts load from Google Fonts (Newsreader + Inter). To self-host, download them to `src/static/fonts/` and replace the `<link>` in `src/layout.html`.
- Security headers/caching in `src/static/_headers` (Cloudflare Pages and Netlify both read it).
