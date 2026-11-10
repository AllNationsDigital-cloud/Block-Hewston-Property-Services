/**
 * Placeholder for dark, high-contrast architectural / construction photography.
 * Clearly labelled on screen. Replace with <Image> or a background photo when ready.
 */
export default function PhotoSlot({
  label,
  className = '',
  tag = true,
}: {
  label: string;
  className?: string;
  tag?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`relative overflow-hidden bg-graphite ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 80% 0%, rgba(184,146,74,0.16), transparent 55%), linear-gradient(160deg, #1b1d20 0%, #0e0f10 70%)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.22]" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <pattern id="slot-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#6b7178" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#slot-grid)" />
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="#b8924a" strokeWidth="0.6" />
      </svg>
      {tag && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span className="w-fit border border-gold/60 bg-ink/80 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-bright">
            Placeholder image
          </span>
          <span className="text-xs text-steel">{label}</span>
        </div>
      )}
    </div>
  );
}

/** Standalone placeholder tag for full-bleed backgrounds where a gradient overlay would hide the slot's own tag. */
export function PlaceholderTag({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute right-6 top-24 z-10 hidden max-w-xs flex-col items-end gap-1 text-right sm:flex lg:right-10">
      <span className="border border-gold/60 bg-ink/80 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-bright">
        Placeholder image
      </span>
      <span className="text-xs text-steel">{label}</span>
    </div>
  );
}
