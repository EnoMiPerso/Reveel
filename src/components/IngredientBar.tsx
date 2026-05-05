interface Props {
  good: number;
  watchout: number;
  avoid: number;
  total: number;
}

export default function IngredientBar({ good, watchout, avoid, total }: Props) {
  const gPct = (good / total) * 100;
  const wPct = (watchout / total) * 100;
  const aPct = (avoid / total) * 100;

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-xl font-bold text-[#111827]">{total}</span>
        <span className="text-sm text-[#6b7280]">Total Ingredients</span>
      </div>

      {/* Segmented bar */}
      <div className="w-full h-3 rounded-full flex overflow-hidden gap-0.5 mb-3">
        {gPct > 0 && (
          <div className="h-full rounded-l-full" style={{ width: `${gPct}%`, backgroundColor: '#0d9488' }} />
        )}
        {wPct > 0 && (
          <div className="h-full" style={{ width: `${wPct}%`, backgroundColor: '#e07b2c' }} />
        )}
        {aPct > 0 && (
          <div className="h-full rounded-r-full" style={{ width: `${aPct}%`, backgroundColor: '#dc2626' }} />
        )}
        {aPct === 0 && wPct > 0 && (
          <div className="h-full rounded-r-full bg-transparent" />
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
          <span className="text-xs text-[#374151] font-medium">{good} Good</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#e07b2c' }} />
          <span className="text-xs text-[#374151] font-medium">{watchout} Watch out</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
          <span className="text-xs text-[#374151] font-medium">{avoid} Avoid</span>
        </div>
      </div>
    </div>
  );
}
