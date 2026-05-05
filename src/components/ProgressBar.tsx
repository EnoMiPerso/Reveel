interface Props {
  value: number;
  max: number;
  color?: string;
  trackColor?: string;
  height?: number;
}

export default function ProgressBar({ value, max, color = '#2d6a35', trackColor = '#e5e7eb', height = 8 }: Props) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: trackColor }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
