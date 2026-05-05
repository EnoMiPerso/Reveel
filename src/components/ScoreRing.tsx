import { useEffect, useState } from 'react';

interface Props {
  score: number;    /* out of `max` */
  max?: number;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  glow?: boolean;
  animate?: boolean;
}

const sizes = {
  xs: { r: 14, sw: 3,   text: '10px', gap: 2,  outer: 36 },
  sm: { r: 20, sw: 3.5, text: '11px', gap: 3,  outer: 50 },
  md: { r: 28, sw: 4.5, text: '13px', gap: 4,  outer: 68 },
  lg: { r: 38, sw: 5.5, text: '18px', gap: 5,  outer: 90 },
  xl: { r: 52, sw: 7,   text: '26px', gap: 6,  outer: 122 },
};

export function scoreColor(score: number, max = 10): string {
  const p = score / max;
  if (p >= 0.7) return '#0d9488';
  if (p >= 0.5) return '#e07b2c';
  return '#dc2626';
}

export function scoreLabel(score: number, max = 10): string {
  const p = score / max;
  if (p >= 0.8) return 'Excellent';
  if (p >= 0.65) return 'Good';
  if (p >= 0.5) return 'Fair';
  return 'Poor';
}

export default function ScoreRing({
  score, max = 10, label, size = 'md',
  showLabel = true, glow = false, animate = true,
}: Props) {
  const { r, sw, text, outer } = sizes[size];
  const cx = outer / 2;
  const cy = outer / 2;
  const circumference = 2 * Math.PI * r;
  const color = scoreColor(score, max);

  const [progress, setProgress] = useState(animate ? 0 : score);
  const [displayNum, setDisplayNum] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) { setProgress(score); setDisplayNum(score); return; }

    // Ring fill
    const t = setTimeout(() => setProgress(score), 80);

    // Number count-up
    let startTs: number | null = null;
    const duration = 1200;
    let rafId: number;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayNum(parseFloat((eased * score).toFixed(1)));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    const t2 = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 80);

    return () => { clearTimeout(t); clearTimeout(t2); cancelAnimationFrame(rafId); };
  }, [score, animate]);

  const dash = (progress / max) * circumference;

  return (
    <div className="flex flex-col items-center" style={{ gap: 4 }}>
      <div
        className="relative flex items-center justify-center"
        style={{
          width: outer, height: outer,
          filter: glow ? `drop-shadow(0 0 6px ${color}55) drop-shadow(0 0 14px ${color}33)` : undefined,
        }}
      >
        <svg width={outer} height={outer} style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={sw} />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            style={{
              strokeDasharray: `${dash} ${circumference}`,
              transition: animate ? 'stroke-dasharray 1.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          />
        </svg>
        <span className="absolute font-bold leading-none" style={{ fontSize: text, color }}>
          {displayNum % 1 === 0 ? displayNum : displayNum.toFixed(1)}
        </span>
      </div>
      {showLabel && label && (
        <span className="text-center font-medium leading-tight" style={{ fontSize: 9, color: '#6b7280' }}>{label}</span>
      )}
    </div>
  );
}
