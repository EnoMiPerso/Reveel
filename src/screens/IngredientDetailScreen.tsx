import { useState } from 'react';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

// Mock ingredient — in production this would be passed via context/state
const ingredient = {
  name: 'Niacinamide',
  alias: 'Vitamin B3',
  status: 'watchout' as const,
  rating: 7.2,
  description:
    'Niacinamide is a water-soluble form of Vitamin B3. It helps reduce inflammation, minimise pores, regulate sebum, and brighten skin tone. One of the most versatile actives in skincare.',
  concerns: [
    'Can cause flushing at concentrations above 10% in sensitive skin.',
    'When combined with Vitamin C, may form niacin — a compound that can cause redness.',
    'Contains Fragrance Mix I in this formulation — a potential allergen.',
  ],
  benefits: [
    { label: 'Pore-minimising',   color: '#7c6ed0', svg: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9"/></svg> },
    { label: 'Oil control',       color: '#2563eb', svg: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C8 8 5 12 5 15.5a7 7 0 0 0 14 0C19 12 16 8 12 2z"/></svg> },
    { label: 'Brightening',       color: '#d97706', svg: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg> },
    { label: 'Anti-inflammatory', color: '#0d9488', svg: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  ],
  recommendations: [
    { text: 'Use at 5–10% concentration for best results with minimal risk.' },
    { text: 'Avoid layering with pure Vitamin C (ascorbic acid) — use on alternate days or different routines.' },
    { text: 'Suitable for oily, combination, and sensitive skin types.' },
    { text: 'Apply after water-based serums, before moisturiser.' },
  ],
  goalsMatch: [
    { goal: 'Clear skin',      match: 'Good',    color: '#0d9488', note: 'Reduces breakouts and regulates sebum.' },
    { goal: 'Hydration',       match: 'Good',    color: '#0d9488', note: 'Helps reinforce the skin barrier.' },
    { goal: 'Brightening',     match: 'Good',    color: '#0d9488', note: 'Evens skin tone and reduces dark spots.' },
    { goal: 'Sensitive skin',  match: 'Watch out', color: '#e07b2c', note: 'Fine at lower concentrations. Patch test first.' },
  ],
  userGoals: ['Clear skin', 'Brightening'], // mock user goals
  productsContaining: [
    { name: 'Niacinamide 10% + Zinc 1%', brand: 'The Ordinary',   price: 7.90,  score: 6.2, currency: '€' },
    { name: 'Resist 10% Niacinamide Booster', brand: "Paula's Choice", price: 52, score: 9.0, currency: '€' },
    { name: 'Inkey List Niacinamide',    brand: 'The Inkey List',  price: 8.99,  score: 8.1, currency: '€' },
    { name: 'Niacinamide 5% Face Serum', brand: 'CeraVe',          price: 16.99, score: 8.4, currency: '€' },
  ],
};


const statusStyle = {
  good:     { label: 'Good',       bg: '#ccfbf1', color: '#0d9488' },
  watchout: { label: 'Watch out',  bg: '#fff3e0', color: '#e07b2c' },
  avoid:    { label: 'Avoid',      bg: '#fee2e2', color: '#dc2626' },
};

export default function IngredientDetailScreen({ onNavigate }: Props) {
  const ing = ingredient;
  const [tab, setTab] = useState<'overview' | 'products'>('overview');
  const s = statusStyle[ing.status];

  return (
    <div className="px-4 pb-6 space-y-4">

      {/* ── Hero card ── */}
      <div className="gc p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-[22px] font-bold text-[#111827] leading-tight">{ing.name}</p>
            <p className="text-[13px] text-[#9ca3af] mt-0.5">{ing.alias}</p>
          </div>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 mt-1"
            style={{ background: s.bg, color: s.color }}>
            {s.label}
          </span>
        </div>
        <p className="text-[13px] text-[#374151] leading-relaxed mb-4">{ing.description}</p>
        {/* Benefits */}
        <div className="flex flex-wrap gap-2">
          {ing.benefits.map(b => (
            <span key={b.label} className="gc-sm text-[11px] font-semibold px-2.5 py-1 flex items-center gap-1.5"
              style={{ color: b.color }}>
              <span style={{ color: b.color }}>{b.svg}</span>{b.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Fit with your skin goals ── */}
      <div>
        <p className="text-[14px] font-bold text-[#111827] mb-3">Fit with your skin goals</p>
        <div className="gc overflow-hidden">
          {ing.goalsMatch.map((g, i) => {
            const isUserGoal = ing.userGoals.includes(g.goal);
            return (
              <div key={g.goal}
                className={`flex items-start gap-3 px-4 py-3.5 ${i < ing.goalsMatch.length - 1 ? 'border-b border-black/[0.04]' : ''} ${isUserGoal ? 'bg-[rgba(124,110,208,0.04)]' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-[#111827]">{g.goal}</p>
                    {isUserGoal && (
                      <span className="text-[9px] font-bold text-[#7c6ed0] bg-[rgba(124,110,208,0.12)] px-2 py-0.5 rounded-full">Your goal</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">{g.note}</p>
                </div>
                <span className="text-[10px] font-bold shrink-0 mt-0.5 px-2.5 py-1 rounded-full"
                  style={{ color: g.color, background: `${g.color}18` }}>{g.match}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tab switcher ── */}
      <div className="gc-sm flex gap-1 p-1">
        {([['overview', 'Recommendations'], ['products', 'Products with this']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold transition-all tap-scale"
            style={tab === id
              ? { background: 'linear-gradient(145deg,#9b8ee0,#7c6ed0)', color: '#fff', boxShadow: '0 2px 8px rgba(124,110,208,0.28)' }
              : { color: '#9ca3af' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Recommendations tab ── */}
      {tab === 'overview' && (
        <div className="space-y-3 fade-up">
          {/* Concerns */}
          {ing.concerns.length > 0 && (
            <div className="gc overflow-hidden">
              <div className="px-4 pt-3.5 pb-1">
                <p className="text-[12px] font-bold text-[#e07b2c] mb-2.5">⚠ Concerns</p>
              </div>
              {ing.concerns.map((c, i) => (
                <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < ing.concerns.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e07b2c] shrink-0 mt-1.5" />
                  <p className="text-[12px] text-[#374151] leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          )}
          {/* How to use */}
          <div className="gc overflow-hidden">
            <div className="px-4 pt-3.5 pb-1">
              <p className="text-[12px] font-bold text-[#7c6ed0] mb-2.5">✦ How to use it right</p>
            </div>
            {ing.recommendations.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < ing.recommendations.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                <span className="text-[10px] font-bold text-[#7c6ed0] shrink-0 mt-0.5 w-4">{i + 1}.</span>
                <p className="text-[12px] text-[#374151] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Products tab ── */}
      {tab === 'products' && (
        <div className="fade-up">
          <div className="gc overflow-hidden">
            {ing.productsContaining.map((prod, i) => (
              <button key={prod.name} onClick={() => onNavigate('product-result')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 tap-scale text-left ${i < ing.productsContaining.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                <div className="w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(237,233,251,0.55)', border: '1px solid rgba(167,139,250,0.12)' }}>
                  <svg width="14" height="18" viewBox="0 0 52 90" fill="none">
                    <rect x="22" y="2" width="8" height="14" rx="4" fill="rgba(200,195,220,0.85)"/>
                    <rect x="10" y="20" width="32" height="60" rx="10" fill="rgba(245,243,255,0.90)"/>
                    <rect x="14" y="30" width="24" height="38" rx="6" fill="rgba(237,233,251,0.70)"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#9ca3af]">{prod.brand}</p>
                  <p className="text-[13px] font-semibold text-[#111827] truncate">{prod.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12px] font-bold text-[#111827]">{prod.currency}{prod.price}</p>
                  <div className="flex items-baseline gap-0.5 justify-end mt-0.5">
                    <span className="text-[13px] font-bold text-[#111827]">{prod.score}</span>
                    <span className="text-[9px] text-[#c4c4cc]">/10</span>
                  </div>
                </div>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
