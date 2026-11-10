const PATHS: Record<string, string[]> = {
  house: ['M3 11l9-7 9 7', 'M5 10v10h14V10', 'M10 20v-6h4v6'],
  document: ['M6 3h9l4 4v14H6z', 'M14 3v5h5', 'M9 12h7', 'M9 16h7'],
  roller: ['M5 3h12a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z', 'M18 6h2a1 1 0 011 1v3a1 1 0 01-1 1h-8v3', 'M10 14h4v7h-4z'],
  camera: ['M4 8h3l2-3h6l2 3h3v11H4z', 'M12 11.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z'],
  search: ['M11 4a7 7 0 100 14 7 7 0 000-14z', 'M16 16l5 5'],
  wrench: ['M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a6 6 0 01-7.9 7.9l-6.9 6.9a2.1 2.1 0 01-3-3l6.9-6.9a6 6 0 017.9-7.9z'],
  check: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M7.5 12.5l3 3 6-6.5'],
  building: ['M5 21V5l8-2v18', 'M13 9h6v12', 'M8 8h2', 'M8 12h2', 'M8 16h2'],
  key: ['M8 14a4 4 0 100-8 4 4 0 000 8z', 'M11 11l9 9', 'M16 16l2-2'],
  layers: ['M12 2l10 5-10 5L2 7z', 'M2 12l10 5 10-5', 'M2 17l10 5 10-5'],
  pin: ['M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z', 'M12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000-5z'],
};

export type IconName = keyof typeof PATHS;

/** Gold line icon. Paths use pathLength=1 so the rail can draw them on scroll. */
export default function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name].map((d) => (
        <path key={d} pathLength={1} d={d} />
      ))}
    </svg>
  );
}
