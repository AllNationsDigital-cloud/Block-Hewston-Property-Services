type Tone = 'light' | 'dark';

export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" style={{ display: 'block', flex: 'none' }} fill="currentColor">
      <rect width="64" height="28" />
      <rect y="36" width="40" height="28" />
      <rect x="48" y="36" width="16" height="28" />
    </svg>
  );
}

/** Block Development Group wordmark. `compact` = mark + BLOCK; `horizontal` adds the descriptor line. */
export default function Logo({ variant = 'horizontal', size = 56, tone = 'light', endorsement = false }: { variant?: 'compact' | 'horizontal'; size?: number; tone?: Tone; endorsement?: boolean }) {
  const label = 'Block Development Group';
  return (
    <span className="logo" role="img" aria-label={label} style={{ color: tone === 'dark' ? '#fff' : '#000' }}>
      <span className="logo__row" style={{ gap: size * (variant === 'compact' ? 0.45 : 0.34) }}>
        <LogoMark size={size} />
        <span className="logo__word" style={{ gap: size * 0.14 }}>
          <span className="logo__block" style={{ fontSize: size * 0.82 }}>Block</span>
          {variant === 'horizontal' && <span className="logo__sub" style={{ fontSize: size * 0.18 }}>Development Group</span>}
        </span>
      </span>
      {endorsement && (
        <span className="logo__sub" style={{ fontWeight: 500, letterSpacing: '.2em', fontSize: Math.max(9, size * 0.15), marginTop: size * 0.3, color: '#c4c4c4' }}>
          A Block &amp; Hewston company
        </span>
      )}
    </span>
  );
}
