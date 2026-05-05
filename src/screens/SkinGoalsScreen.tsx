import { useState } from 'react';
import { allGoals, userProfile } from '../mockData/profile';
import type { Screen, SkinGoal, SkinType } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

const goalStyle: Record<SkinGoal, { selected: string; idle: string }> = {
  'Clear skin':     { selected: 'border-[#0d9488] text-[#0d9488] bg-[#f0fdfa]/80', idle: 'border-[#e5e7eb] text-[#374151] bg-white/60' },
  'Hydration':      { selected: 'border-[#2563eb] text-[#2563eb] bg-[#eff6ff]/80', idle: 'border-[#e5e7eb] text-[#374151] bg-white/60' },
  'Anti-aging':     { selected: 'border-[#7c3aed] text-[#7c3aed] bg-[#f5f3ff]/80', idle: 'border-[#e5e7eb] text-[#374151] bg-white/60' },
  'Brightening':    { selected: 'border-[#ca8a04] text-[#ca8a04] bg-[#fefce8]/80', idle: 'border-[#e5e7eb] text-[#374151] bg-white/60' },
  'Sensitive skin': { selected: 'border-[#db2777] text-[#db2777] bg-[#fdf2f8]/80', idle: 'border-[#e5e7eb] text-[#374151] bg-white/60' },
  'Even skin tone': { selected: 'border-[#ea580c] text-[#ea580c] bg-[#fff7ed]/80', idle: 'border-[#e5e7eb] text-[#374151] bg-white/60' },
  'Acne/Breakouts': { selected: 'border-[#dc2626] text-[#dc2626] bg-[#fef2f2]/80', idle: 'border-[#e5e7eb] text-[#374151] bg-white/60' },
};

const skinTypes: SkinType[] = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];

export default function SkinGoalsScreen({ onNavigate }: Props) {
  const [selected, setSelected] = useState<Set<SkinGoal>>(new Set(userProfile.goals));
  const [skinType, setSkinType] = useState<SkinType>(userProfile.skinType);

  const toggle = (g: SkinGoal) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else if (next.size < 3) next.add(g);
      return next;
    });
  };

  return (
    <div className="px-4 pb-4 flex flex-col min-h-full space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-[#111827] mb-1">Your skin goals</h2>
        <p className="text-sm text-[#6b7280]">Select up to 3 — we'll personalise every scan</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {allGoals.map((g) => {
          const on = selected.has(g);
          return (
            <button key={g} onClick={() => toggle(g)}
              className={`relative tap-scale rounded-2xl px-4 py-4 text-left border-2 transition-all ${on ? goalStyle[g].selected : goalStyle[g].idle}`}
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
              {on && (
                <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-current flex items-center justify-center">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
              )}
              <p className="text-sm font-bold">{g}</p>
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-sm font-bold text-[#111827] mb-2.5">Skin type</p>
        <div className="flex gap-2 flex-wrap">
          {skinTypes.map((t) => (
            <button key={t} onClick={() => setSkinType(t)}
              className={`tap-scale px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                skinType === t ? 'border-[#7c6ed0] text-white' : 'gc-sm text-[#6b7280] border-transparent'
              }`}
              style={skinType === t ? { background: 'linear-gradient(145deg, #7c6ed0, #5b4fb0)' } : {}}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <p className="text-xs text-center text-[#9ca3af] mb-4">{selected.size}/3 goals selected</p>
        <button onClick={() => onNavigate('profile')} disabled={selected.size === 0}
          className="tap-scale w-full py-4 rounded-2xl text-white font-semibold text-base disabled:opacity-40 btn-glow"
          style={{ background: 'linear-gradient(145deg, #7c6ed0, #5b4fb0)' }}>
          Save my goals
        </button>
      </div>
    </div>
  );
}
