// Generates placeholder SVG illustrations in src/static/img. Replace with real photos (same file names or update the HTML).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'static', 'img');
fs.mkdirSync(dir, { recursive: true });
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function scene({ kind, dirty }) {
  const wall = dirty ? '#d9d2c0' : '#f4f1ea', wall2 = dirty ? '#cbc3ae' : '#ebe6db';
  const floor = dirty ? '#8d7d66' : '#b99f7c', floor2 = dirty ? '#7a6b56' : '#a88d69';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img">`;
  s += `<rect width="1200" height="800" fill="${wall}"/><rect y="0" width="1200" height="40" fill="${wall2}"/>`;
  s += `<rect y="560" width="1200" height="240" fill="${floor}"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="${i * 100}" y="560" width="2" height="240" fill="${floor2}" opacity=".5"/>`;
  s += `<rect y="540" width="1200" height="22" fill="${dirty ? '#bdb4a0' : '#fff'}"/>`;
  if (kind === 'kitchen') {
    const cab = dirty ? '#7d6e58' : '#d9d4c8';
    s += `<rect x="80" y="90" width="460" height="190" fill="${cab}"/><rect x="660" y="90" width="460" height="190" fill="${cab}"/>`;
    s += `<rect x="80" y="330" width="1040" height="30" fill="${dirty ? '#9a9482' : '#e8e4da'}"/><rect x="80" y="360" width="1040" height="200" fill="${cab}"/>`;
    s += `<rect x="560" y="110" width="80" height="170" fill="#b9d3df" opacity=".5"/>`;
    for (const x of [200, 360, 780, 940]) s += `<rect x="${x}" y="400" width="12" height="60" rx="3" fill="${dirty ? '#4b4437' : '#8f8a7d'}"/>`;
    if (dirty) { s += `<rect x="150" y="285" width="90" height="46" fill="#5b5446"/><rect x="900" y="300" width="70" height="32" fill="#6b6354"/>`; for (let i = 0; i < 14; i++) s += `<ellipse cx="${100 + rnd() * 1000}" cy="${380 + rnd() * 170}" rx="${10 + rnd() * 30}" ry="${6 + rnd() * 14}" fill="#3d3524" opacity=".18"/>`; }
  } else {
    s += `<rect x="470" y="110" width="260" height="320" fill="#c9dbe4"/><rect x="470" y="110" width="260" height="320" fill="none" stroke="${dirty ? '#a79e8a' : '#fff'}" stroke-width="12"/><path d="M600 110v320M470 270h260" stroke="${dirty ? '#a79e8a' : '#fff'}" stroke-width="8"/>`;
    if (!dirty) s += `<polygon points="470,430 730,430 900,800 300,800" fill="#fff" opacity=".12"/>`;
    s += `<rect x="920" y="130" width="170" height="410" fill="${dirty ? '#a89d84' : '#e5dfd2'}"/><circle cx="1060" cy="340" r="9" fill="${dirty ? '#5f573f' : '#b79a5b'}"/>`;
  }
  if (dirty) {
    if (kind !== 'kitchen') for (let i = 0; i < 16; i++) s += `<ellipse cx="${rnd() * 1200}" cy="${80 + rnd() * 440}" rx="${12 + rnd() * 36}" ry="${5 + rnd() * 14}" fill="#7a6a4a" opacity=".16"/>`;
    s += `<path d="M120 90l40 30-20 40 30 20" stroke="#8c8068" stroke-width="3" fill="none" opacity=".5"/>`;
    s += `<ellipse cx="330" cy="700" rx="130" ry="36" fill="#3a2f1d" opacity=".25"/><ellipse cx="820" cy="660" rx="90" ry="24" fill="#3a2f1d" opacity=".22"/>`;
    if (kind === 'living' || kind === 'cleanout') {
      const boxes = kind === 'cleanout' ? 9 : 3;
      for (let i = 0; i < boxes; i++) { const x = 90 + rnd() * 900, y = 560 + rnd() * 150, w = 110 + rnd() * 90, h = 80 + rnd() * 90; s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#a17d4f"/><rect x="${x}" y="${y}" width="${w}" height="10" fill="#8a6a40"/>`; }
      if (kind === 'cleanout') s += `<rect x="640" y="430" width="300" height="140" rx="12" fill="#5d5345"/><rect x="650" y="400" width="280" height="50" rx="10" fill="#6c6150"/>`;
    }
  }
  s += `<rect x="20" y="760" width="330" height="26" rx="3" fill="#1d2024" opacity=".72"/><text x="32" y="778" font-family="Arial,sans-serif" font-size="14" fill="#fff" letter-spacing="1.5">PLACEHOLDER — REPLACE WITH REAL PHOTO</text></svg>`;
  return s;
}
for (const kind of ['living', 'kitchen', 'cleanout']) for (const state of ['before', 'after']) {
  fs.writeFileSync(path.join(dir, `${state}-${kind}.svg`), scene({ kind, dirty: state === 'before' }));
}
console.log('placeholders written');
