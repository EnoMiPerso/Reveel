import { scoreColor } from './ScoreRing';

interface SubScore {
  label: string;
  score: number;
  icon: React.ReactNode;
}

interface Props {
  scores: SubScore[];
}

export default function SubScoreGrid({ scores }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {scores.map((s) => {
        const color = scoreColor(s.score);
        return (
          <div key={s.label} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#f9fafb] flex items-center justify-center" style={{ color }}>
              {s.icon}
            </div>
            <span className="text-sm font-bold" style={{ color }}>{s.score}</span>
            <span className="text-[9px] text-[#6b7280] text-center leading-tight">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}
