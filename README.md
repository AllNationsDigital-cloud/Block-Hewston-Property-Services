# Block Development Group: website

Next.js (App Router) + Tailwind CSS v4, statically exported for Cloudflare Pages. A small Cloudflare Pages Function handles the contact form.

```
src/content/site.ts     ALL COPY lives here: edit text, nav, SEO titles/descriptions, photo notes
src/app/                routes: / , /property-services , /rehab-restoration , /development , /markets , /about , /contact
src/components/         Header, Footer, Button, Section, PageHero, CtaBand, Reveal (scroll motion),
                        PhotoSlot (labelled image placeholders), StateMap (TX + LA), ContactForm
src/app/globals.css     design tokens (colors, fonts) and the reveal motion
functions/api/contact.ts  serverless form handler  <-- TODO: email provider
public/og.png           social share image (replace with final artwork)
```

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy to Cloudflare Pages
Create a Pages project from the Git repo with:

| Setting | Value |
|---|---|
| Framework preset | None (or Next.js, static export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Env var | `NODE_VERSION` = `22` |

The `functions/` folder deploys automatically and serves `POST /api/contact`.
Set `site.url` in `src/content/site.ts` to the final domain (used for canonicals, sitemap, Open Graph, schema).

## Finish the contact form (required before launch)
`functions/api/contact.ts` validates the submission, drops bot submissions via a honeypot, then calls `sendEmail()`, which is a **stub that throws until you implement it**. Until then the endpoint returns 503 and the form shows a prefilled `mailto:` link, so no lead is lost.

To go live: pick a provider (Resend, Postmark, Cloudflare Email Service, or a CRM webhook), implement `sendEmail()` (a Resend example is in the comments), and add the variables in Pages > Settings > Variables and Secrets: `CONTACT_TO`, `CONTACT_FROM`, plus the provider key (for example `RESEND_API_KEY`). Send a test from the live site.

## Replace before launch
- **Photography:** every image is a labelled placeholder (`PhotoSlot`). Notes for the shots you need are in `photos` in `src/content/site.ts`. To use a real photo, swap the `PhotoSlot` for a `next/image` (or a CSS background) in the page file.
- `public/og.png` and `src/app/icon.svg` are simple generated brand assets.
- The state outlines in `StateMap.tsx` are generalized, not survey-accurate.
- Analytics: add your snippet where marked in `src/app/layout.tsx`.

## Content rules baked into the copy
Short declarative sentences. No prices anywhere. No exclamation points or emojis. Veteran-led, never "special forces".

## Notes
- Design: near-black `#0b0b0c`, charcoal, steel gray, one burnished-gold accent. Headlines in Zilla Slab (self-hosted via Fontsource), body in Inter. Scroll motion is a slow fade-up only and is disabled for `prefers-reduced-motion`; content is visible with JavaScript off.
- SEO: per-page titles/descriptions target "property services Shreveport", "rental rehab Texas", "make-ready Louisiana" and "real estate development Dallas"; Organization JSON-LD, sitemap and robots are generated at build.
- Accessibility: skip link, keyboard-operable menu and form, visible focus, labelled fields with inline errors announced via `role="alert"`, gold/bone-on-black contrast above WCAG AA.
