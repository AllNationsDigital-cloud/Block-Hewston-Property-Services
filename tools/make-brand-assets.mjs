// Renders favicon.svg, logo.svg (copied), apple-touch-icon.png and og-image.png using Playwright (Chromium).
// Replace the output files with final brand artwork whenever you have it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const img = path.join(root, 'src', 'static', 'img');
const stat = path.join(root, 'src', 'static');

fs.writeFileSync(path.join(stat, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#1d2024"/><text x="32" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="30" font-weight="600" fill="#c9a867">B<tspan font-size="20" dy="-2">&amp;</tspan><tspan dy="2">H</tspan></text></svg>`);
fs.writeFileSync(path.join(img, 'logo.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 72" role="img" aria-label="Block &amp; Hewston Property Services"><rect width="64" height="64" y="4" rx="4" fill="#1d2024"/><text x="32" y="46" text-anchor="middle" font-family="Georgia,serif" font-size="28" font-weight="600" fill="#c9a867">B<tspan font-size="18" dy="-2">&amp;</tspan><tspan dy="2">H</tspan></text><text x="80" y="38" font-family="Georgia,serif" font-size="30" fill="#1d2024">Block &amp; Hewston</text><text x="81" y="58" font-family="Arial,sans-serif" font-size="12" letter-spacing="4.5" fill="#85692a" font-weight="600">PROPERTY SERVICES</text></svg>`);

// Needs Playwright (npm i -D playwright, or a global install; set NODE_PATH to its parent folder).
import { createRequire } from 'node:module';
const req = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = req('playwright')); } catch { ({ chromium } = createRequire(path.join(process.env.NODE_PATH || '', 'x.js'))('playwright')); }
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(`<body style="margin:0;background:#1d2024;font-family:Georgia,serif;color:#fff;display:flex;flex-direction:column;justify-content:center;height:630px;padding:0 90px;box-sizing:border-box">
<div style="display:flex;align-items:center;gap:22px;margin-bottom:56px"><div style="width:84px;height:84px;background:#c9a867;color:#1d2024;display:grid;place-items:center;font-size:36px;font-weight:600;border-radius:5px">B&amp;H</div><div><div style="font-size:38px">Block &amp; Hewston</div><div style="font:600 15px Arial;letter-spacing:6px;color:#c9a867;margin-top:6px">PROPERTY SERVICES</div></div></div>
<div style="font-size:92px;line-height:1.05;letter-spacing:-2px">Rent-ready, on schedule.</div>
<div style="font:24px Arial;color:#c9ccd1;margin-top:30px">Veteran-led make-ready &amp; turnover · Shreveport–Bossier, Louisiana</div></body>`);
await page.screenshot({ path: path.join(img, 'og-image.png') });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<body style="margin:0;width:180px;height:180px;background:#1d2024;display:grid;place-items:center;font:600 78px Georgia,serif;color:#c9a867">B&amp;H</body>`);
await page.screenshot({ path: path.join(stat, 'apple-touch-icon.png') });
await b.close();
console.log('brand assets written');
