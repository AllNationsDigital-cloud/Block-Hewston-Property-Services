/**
 * Simple stylized map of Texas and Louisiana in black and white. Outlines are generalized, not survey-accurate.
 * Coordinates are [longitude, latitude], projected at build time.
 */
type Pt = [number, number];

const TEXAS: Pt[] = [
  [-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-99.2, 34.2], [-97.1, 33.85], [-96.0, 33.8], [-94.5, 33.65],
  [-94.04, 33.55], [-94.04, 31.0], [-93.7, 30.4], [-93.84, 29.7], [-94.7, 29.35], [-95.3, 28.9], [-96.4, 28.3],
  [-97.2, 27.6], [-97.4, 26.9], [-97.15, 25.95], [-98.2, 26.05], [-99.1, 26.4], [-99.5, 27.5], [-100.3, 28.4],
  [-101.0, 29.4], [-102.3, 29.8], [-102.7, 29.7], [-103.15, 28.98], [-104.5, 29.65], [-104.9, 30.6], [-106.5, 31.77],
  [-106.62, 32.0], [-103.06, 32.0],
];
const LOUISIANA: Pt[] = [
  [-94.04, 33.02], [-91.17, 33.0], [-91.1, 32.4], [-91.55, 31.0], [-89.73, 31.0], [-89.6, 30.17], [-89.3, 29.95],
  [-89.1, 29.2], [-89.0, 29.0], [-90.4, 29.1], [-91.3, 29.4], [-92.3, 29.55], [-93.84, 29.7], [-94.04, 31.0],
];
const MARKETS = [
  { name: 'Dallas–Fort Worth', lon: -97.0, lat: 32.8, dx: -16, dy: -14, anchor: 'end' as const },
  { name: 'Houston', lon: -95.37, lat: 29.76, dx: -16, dy: 22, anchor: 'end' as const },
  { name: 'Shreveport–Bossier', lon: -93.75, lat: 32.5, dx: 0, dy: -24, anchor: 'middle' as const },
];

const K = 40;
const X = (lon: number) => (lon + 106.9) * 0.857 * K;
const Y = (lat: number) => (36.8 - lat) * K;
const path = (pts: Pt[]) => pts.map(([lo, la], i) => `${i ? 'L' : 'M'}${X(lo).toFixed(1)} ${Y(la).toFixed(1)}`).join(' ') + 'Z';
const W = Math.ceil(X(-88.6));
const H = Math.ceil(Y(25.7));

export default function StateMap() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="map" role="img" aria-label="Stylized map of Texas and Louisiana marking Dallas–Fort Worth, Houston and Shreveport–Bossier.">
      <path d={path(TEXAS)} fill="#f2f2f2" stroke="#000" strokeWidth="1.5" strokeLinejoin="miter" />
      <path d={path(LOUISIANA)} fill="#000" stroke="#000" strokeWidth="1.5" strokeLinejoin="miter" />
      <text x={X(-101.4)} y={Y(31.2)} fill="#767676" fontSize="14" letterSpacing="7" fontWeight="800">TEXAS</text>
      <text x={X(-92.2)} y={Y(30.55)} fill="#fff" fontSize="11" letterSpacing="3" fontWeight="800" textAnchor="middle">LOUISIANA</text>
      {MARKETS.map((m) => {
        const cx = X(m.lon);
        const cy = Y(m.lat);
        const onBlack = m.name.startsWith('Shreveport');
        return (
          <g key={m.name}>
            <rect x={cx - 6} y={cy - 6} width="12" height="12" fill={onBlack ? '#fff' : '#000'} stroke={onBlack ? '#000' : '#fff'} strokeWidth="1.5" />
            <text x={cx + m.dx} y={cy + m.dy} textAnchor={m.anchor} fill="#000" stroke="#fff" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round" fontSize="12" fontWeight="800" letterSpacing="1.5">
              {m.name.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
