# Block & Hewston Property Services: website

Static, dependency-free marketing site. Plain HTML/CSS/JS (about 6 KB of JS), built from small templates so the header, footer and CTA live in one place.

```
site.config.json     phone, email, hours, address, nav, analytics snippet, form endpoint
build.mjs            node build.mjs  ->  public/   (no npm install needed)
src/layout.html      <head> (SEO/OG/JSON-LD), header, footer
src/partials/        cta.html (final CTA band), sprite.html (icons)
src/pages/index.html  the whole site (one page, anchored sections); 404.html
src/static/          css/site.css, js/site.js, img/, favicon, _headers (copied as-is)
tools/               local preview server
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

After you pick the domain, set `"url"` in `site.config.json` (used for canonical URLs, Open Graph, sitemap, schema). It currently defaults to `https://service.blockandhewston.com`.

## Editing content
- **Contact details, hours, nav, analytics:** `site.config.json`.
- **Copy:** edit the sections in `src/pages/index.html`. Tokens like `{{config.phone}}` are filled at build time.
- **Colors / fonts:** CSS variables at the top of `src/static/css/site.css`.
- **SEO:** the JSON header on line 1 of `index.html` (`title`, `description`).
- **FAQ:** add a `<details class="faq-item"><summary>…</summary><div class="ans">…</div></details>`. FAQPage schema is generated automatically.

## Forms (quote + contact)
Both forms post to [FormSubmit](https://formsubmit.co), which emails each submission to `service@blockandhewston.com` (the address in `site.config.json`). No account or API key.

**One-time activation:** after deploying, submit a test quote from the live site. FormSubmit emails that inbox an activation link; click it once and all later submissions arrive as normal emails. Check spam if it doesn't show.

Notes: photo attachments are limited by FormSubmit (about 5 MB total on the free plan). If you need more, or want submissions in a CRM, point the forms' `action` at another service. On `localhost` the forms run in demo mode (success state, payload logged to the console).

## Analytics
Paste your snippet (Plausible, GA4, etc.) into `"analytics"` in `site.config.json`. The forms fire `plausible('Form Submit')` / `gtag('event','generate_lead')` if those exist.

## Images
- `src/static/img/services/*.jpg` are the hover images for the six service tiles. They are **placeholders** (4 AI-generated, upscaled; carpet and make-ready are crops). Replace each with a real job photo of the same name, about 1200×800 px. `hero.jpg` is the supplied photo.
- The site has no other photos yet. Add real ones as needed under `src/static/img/` with descriptive alt text.
- `logo-dark/light/gold.png` come from the supplied B&H logo (transparent PNGs). `og-image.png`, `apple-touch-icon.png` and `favicon.png` are built from it; replace with final artwork using the same names (a vector SVG logo would be sharper).
- `service-area-map.svg` is illustrative. To use a live map instead, replace the `<img>` in `service-area.html` with a Google Maps embed `<iframe title="Map of service area" loading="lazy" …>`.

## Before you go live
No bracketed placeholders remain in the page text. Things only you can confirm:
- [ ] The privacy and terms text on the page is general wording. Have a Louisiana attorney review it, and confirm with counsel or the Louisiana State Licensing Board for Contractors that your service mix needs no license or registration.
- [ ] Insurance: the page says you're insured and can provide a certificate on request. That must be true at launch.
- [ ] Activate the form: submit one test quote on the live site and click the activation email sent to `service@blockandhewston.com`.
- [ ] Replace the service hover images in `src/static/img/services/` with real job photos.
- [ ] Phone: 443 is a Maryland area code. A local 318 number helps local trust and SEO (`site.config.json`).
- [ ] Submit `/sitemap.xml` to Google Search Console and claim a Google Business Profile.

## Quality notes
- Semantic landmarks, skip link, visible focus, keyboard-operable menu/slider/form, form errors announced via `role="alert"`, color contrast designed for WCAG AA, `prefers-reduced-motion` respected. Run Lighthouse and axe after you swap in real content.
- Works without JS (menu and content show; form steps collapse into one long form; the before/after slider needs JS).
- Uses the system font stack, so there are no external font requests.
- Security headers/caching in `src/static/_headers` (Cloudflare Pages and Netlify both read it).
