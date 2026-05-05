interface Props {
  size?: number;
  /** 'default' = outlined purple triangle (brand logo) | 'light' = white for dark bg | 'mono' = outline only */
  variant?: 'default' | 'light' | 'mono';
}

/**
 * Reveel logo mark — clean outlined equilateral triangle with glass facets.
 */
export default function PrismIcon({ size = 32, variant = 'default' }: Props) {
  const stroke =
    variant === 'light' ? 'rgba(255,255,255,0.90)'
    : variant === 'mono' ? 'rgba(18,12,50,0.65)'
    : '#7c6ed0';

  const fillMain =
    variant === 'light' ? 'rgba(255,255,255,0.10)'
    : variant === 'mono' ? 'rgba(18,12,50,0.04)'
    : 'rgba(237,233,251,0.72)';

  const fillLeft =
    variant === 'light' ? 'rgba(255,255,255,0.12)'
    : variant === 'mono' ? 'rgba(18,12,50,0.06)'
    : 'rgba(196,181,253,0.28)';

  const facetLine =
    variant === 'light' ? 'rgba(255,255,255,0.35)'
    : variant === 'mono' ? 'rgba(18,12,50,0.20)'
    : 'rgba(124,110,208,0.28)';

  const highlight =
    variant === 'light' ? 'rgba(255,255,255,0.55)'
    : 'rgba(255,255,255,0.65)';

  const h = Math.round(size * 0.9);

  return (
    <svg width={size} height={h} viewBox="0 0 80 72" fill="none">
      {/* Main triangle fill */}
      <polygon
        points="40,4 76,68 4,68"
        fill={fillMain}
      />
      {/* Left facet — slightly more tinted */}
      <polygon
        points="40,4 4,68 26,68"
        fill={fillLeft}
      />
      {/* Apex highlight glint */}
      <polygon
        points="40,4 34,20 46,20"
        fill={highlight}
        opacity={0.7}
      />
      {/* Main outline */}
      <polygon
        points="40,4 76,68 4,68"
        fill="none"
        stroke={stroke}
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Left internal facet line */}
      <line
        x1="40" y1="4" x2="26" y2="44"
        stroke={facetLine}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Right internal facet line (fainter) */}
      <line
        x1="40" y1="4" x2="54" y2="44"
        stroke={facetLine}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity={0.6}
      />
    </svg>
  );
}
