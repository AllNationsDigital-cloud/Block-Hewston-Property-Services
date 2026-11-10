# Block Development Group: website

Next.js (App Router) + Tailwind CSS v4, statically exported for Cloudflare Pages. A small Cloudflare Pages Function handles the contact form.

```
src/content/site.ts     ALL COPY lives here: edit text, nav, SEO titles/descriptions, photo notes
src/app/                routes: / , /property-services , /rehab-restoration , /development , /markets , /about , /contact
src/components/         Header, Footer, Sections (Section, SecHead, PageHead), Tiles (hover images), Rail (animated process rail),
                        HeroBg (scroll-zoom photo), CtaBand, Reveal (scroll motion), Icon, StateMap (TX + LA), ContactForm
src/app/globals.css     the whole visual system (colors, type, components, motion)
functions/api/contact.ts  serverless form handler (FormSubmit by default, Resend optional)
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

## Contact form (works out of the box)
The form posts to `/api/contact`, a Cloudflare Pages Function (`functions/api/contact.ts`). It validates the submission, blocks bots with a honeypot, and emails the lead to `nico@blockdevelopmentgroup.com` (change with the `CONTACT_TO` variable).

**One-time activation (required):** delivery uses [FormSubmit](https://formsubmit.co), which needs no account or API key. After the site is live, submit one test request. FormSubmit emails `nico@blockdevelopmentgroup.com` an activation link; click it once (check spam). Every later lead arrives as a normal email, with the visitor's address as Reply-To.

Until activated (or if the mail service is ever down), the endpoint returns 503 and the form shows a prefilled `mailto:` link, so no lead is lost.

**Optional upgrade, branded sender:** in Cloudflare Pages > Settings > Variables and Secrets set `RESEND_API_KEY` (secret) and `CONTACT_FROM` (a sender verified at resend.com, for example `Block Development Group <web@blockdevelopmentgroup.com>`). When both exist, Resend is used instead of FormSubmit.

Test locally in the real Workers runtime: `npm run preview` (builds, then serves `out/` plus the function at http://localhost:8788). Set `FORMSUBMIT_URL` to a local mock to avoid sending real mail.

## Replace before launch
- **Photography:** the hero uses the supplied toolbag photo (`public/img/hero.jpg`). The hover images on the tiles (`public/img/services/*.jpg`) are **placeholders** (AI-generated stand-ins and crops). Replace each with a real job photo using the same file name, about 1200x800 px. Which tile uses which file is set in `images` in `src/content/site.ts`.
- `public/og.png` and `src/app/icon.svg` are simple generated brand assets. The header and footer use the B&H logo files in `public/img/`.
- The state outlines in `StateMap.tsx` are generalized, not survey-accurate.
- Analytics: add your snippet where marked in `src/app/layout.tsx`.

## Content rules baked into the copy
Short declarative sentences. No prices anywhere. No exclamation points or emojis. Veteran-led, never "special forces".

## Notes
- Design: ported from the live Block & Hewston Property Services site: ivory and charcoal sections, gold hairlines, Cormorant Garamond and Cormorant SC (self-hosted via Fontsource), outlined small-caps buttons. Motion: hero photo zooms with scroll, tiles reveal an image on hover, the process rail draws itself on scroll, sections fade up slowly. All motion is disabled for `prefers-reduced-motion`, and content is visible with JavaScript off.
- SEO: per-page titles/descriptions target "property services Shreveport", "rental rehab Texas", "make-ready Louisiana" and "real estate development Dallas"; Organization JSON-LD, sitemap and robots are generated at build.
- Accessibility: skip link, keyboard-operable menu and form, visible focus, labelled fields with inline errors announced via `role="alert"`, contrast designed for WCAG AA.
