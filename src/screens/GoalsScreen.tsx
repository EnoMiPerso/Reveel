import { useState } from 'react';
import type { Screen, SkinGoal, SkinType } from '../types';
import { userProfile } from '../mockData/profile';

interface Props { onNavigate: (s: Screen) => void; }

const skinGoals: SkinGoal[] = ['Clear skin', 'Hydration', 'Anti-aging', 'Brightening', 'Sensitive skin', 'Even skin tone', 'Acne/Breakouts'];
const skinTypes: SkinType[] = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];
const planetGoals = ['Low CO₂', 'Eco packaging', 'Local sourcing', 'Cruelty-free', 'Vegan formulas', 'Refillable'];
const walletGoals = ['Save on duplicates', 'Find cheaper alternatives', 'Avoid overpaying', 'Track spending', 'Buy once, buy right', 'Under €15 / product'];

type Section = 'skin' | 'planet' | 'wallet';

export default function GoalsScreen({ onNavigate }: Props) {
  const [section, setSection] = useState<Section>('skin');
  const [skinSelected, setSkinSelected] = useState<Set<SkinGoal>>(new Set(userProfile.goals));
  const [skinType, setSkinType] = useState<SkinType>(userProfile.skinType);
  const [planetSelected, setPlanetSelected] = useState<Set<string>>(new Set(['Low CO₂', 'Eco packaging', 'Local sourcing']));
  const [walletSelected, setWalletSelected] = useState<Set<string>>(new Set(['Save on duplicates', 'Find cheaper alternatives', 'Avoid overpaying']));

  function toggleSkin(g: SkinGoal) {
    setSkinSelected(prev => { const n = new Set(prev); n.has(g) ? n.delete(g) : n.size < 3 && n.add(g); return n; });
  }
  function togglePlanet(g: string) {
    setPlanetSelected(prev => { const n = new Set(prev); n.has(g) ? n.delete(g) : n.add(g); return n; });
  }
  function toggleWallet(g: string) {
    setWalletSelected(prev => { const n = new Set(prev); n.has(g) ? n.delete(g) : n.add(g); return n; });
  }

  const sections: { id: Section; label: string; color: string; bg: string; icon: React.ReactNode }[] = [
    {
      id: 'skin', label: 'Skin', color: '#7c6ed0', bg: 'rgba(124,110,208,0.10)',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c0 0-8-4.5-8-11.8C4 5.9 7.6 3 12 3s8 2.9 8 7.2C20 17.5 12 22 12 22z"/></svg>,
    },
    {
      id: 'planet', label: 'Planet', color: '#0d9488', bg: 'rgba(13,148,136,0.10)',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    },
    {
      id: 'wallet', label: 'Wallet', color: '#d97706', bg: 'rgba(217,119,6,0.10)',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    },
  ];

  const active = sections.find(s => s.id === section)!;

  return (
    <div className="px-4 pb-8 space-y-4">

      {/* Section tabs */}
      <div className="gc-sm flex gap-1 p-1">
        {sections.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className="tap-scale flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold transition-all"
            style={section === s.id
              ? { background: s.color, color: '#fff', boxShadow: `0 2px 8px ${s.color}40` }
              : { color: '#9ca3af' }}>
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {/* Skin section */}
      {section === 'skin' && (
        <div className="space-y-4 fade-up">
          <div>
            <p className="text-[13px] font-bold text-[#111827] mb-1">Skin goals <span className="text-[11px] font-normal text-[#9ca3af]">up to 3</span></p>
            <div className="grid grid-cols-2 gap-2">
              {skinGoals.map(g => {
                const on = skinSelected.has(g);
                return (
                  <button key={g} onClick={() => toggleSkin(g)}
                    className="tap-scale px-4 py-3 rounded-2xl text-left text-[12px] font-semibold transition-all"
                    style={on
                      ? { background: 'rgba(124,110,208,0.14)', color: '#5b4fb0', border: '1.5px solid rgba(124,110,208,0.35)' }
                      : { background: 'rgba(0,0,0,0.04)', color: '#374151', border: '1.5px solid transparent' }}>
                    {on && <span className="mr-1">✓</span>}{g}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#111827] mb-2">Skin type</p>
            <div className="flex gap-2 flex-wrap">
              {skinTypes.map(t => (
                <button key={t} onClick={() => setSkinType(t)}
                  className="tap-scale px-4 py-2 rounded-full text-[12px] font-semibold transition-all"
                  style={skinType === t
                    ? { background: 'linear-gradient(145deg,#9b8ee0,#5b4fb0)', color: '#fff', boxShadow: '0 2px 8px rgba(124,110,208,0.28)' }
                    : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Planet section */}
      {section === 'planet' && (
        <div className="fade-up">
          <p className="text-[13px] font-bold text-[#111827] mb-3">Planet priorities</p>
          <div className="grid grid-cols-2 gap-2">
            {planetGoals.map(g => {
              const on = planetSelected.has(g);
              return (
                <button key={g} onClick={() => togglePlanet(g)}
                  className="tap-scale px-4 py-3 rounded-2xl text-left text-[12px] font-semibold transition-all"
                  style={on
                    ? { background: 'rgba(13,148,136,0.12)', color: '#0f766e', border: '1.5px solid rgba(13,148,136,0.30)' }
                    : { background: 'rgba(0,0,0,0.04)', color: '#374151', border: '1.5px solid transparent' }}>
                  {on && <span className="mr-1">✓</span>}{g}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Wallet section */}
      {section === 'wallet' && (
        <div className="fade-up">
          <p className="text-[13px] font-bold text-[#111827] mb-3">Wallet priorities</p>
          <div className="grid grid-cols-2 gap-2">
            {walletGoals.map(g => {
              const on = walletSelected.has(g);
              return (
                <button key={g} onClick={() => toggleWallet(g)}
                  className="tap-scale px-4 py-3 rounded-2xl text-left text-[12px] font-semibold transition-all"
                  style={on
                    ? { background: 'rgba(217,119,6,0.12)', color: '#b45309', border: '1.5px solid rgba(217,119,6,0.30)' }
                    : { background: 'rgba(0,0,0,0.04)', color: '#374151', border: '1.5px solid transparent' }}>
                  {on && <span className="mr-1">✓</span>}{g}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Save */}
      <button onClick={() => onNavigate('profile')}
        className="tap-scale w-full py-4 rounded-2xl text-white font-bold text-[13px] btn-glow"
        style={{ background: `linear-gradient(145deg, ${active.color}, ${active.color}cc)`, boxShadow: `0 4px 14px ${active.color}40` }}>
        Save {active.label} goals
      </button>

    </div>
  );
}
