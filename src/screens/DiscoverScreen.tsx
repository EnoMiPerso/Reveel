import { useState } from 'react';
import { getIngredientIcon } from '../utils/ingredientIcon';
import FavoritesList from '../components/FavoritesList';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }
type MainTab = 'discover' | 'favorites';

const topIngredients = [
  { name: 'Niacinamide',     color: '#7c6ed0', benefit: 'Pore-minimising',  risk: 'Low' },
  { name: 'Hyaluronic Acid', color: '#2563eb', benefit: 'Deep hydration',   risk: 'Low' },
  { name: 'Vitamin C',       color: '#d97706', benefit: 'Brightening',      risk: 'Low' },
  { name: 'Salicylic Acid',  color: '#dc2626', benefit: 'Exfoliating',      risk: 'Medium' },
  { name: 'Retinol',         color: '#0d9488', benefit: 'Anti-aging',       risk: 'Medium' },
  { name: 'Peptides',        color: '#0891b2', benefit: 'Collagen support', risk: 'Low' },
];

const tips = [
  { tag: 'MYTH BUSTED',    text: '"Oil-free" doesn\'t mean acne-safe. Many oil-free products still contain pore-clogging ingredients.', color: '#7c6ed0' },
  { tag: 'TRUTH',          text: 'SPF in foundations rarely provides enough coverage. You need a dedicated SPF.', color: '#e07b2c' },
  { tag: 'MARKETING TRAP', text: '"Dermatologist-tested" doesn\'t mean dermatologist-approved. Anyone can test and fail.', color: '#dc2626' },
];

const trending = [
  { name: 'Azelaic Acid',      brand: 'The Ordinary', price: 7.90,  score: 9.1, currency: '€' },
  { name: 'Centella Asiatica', brand: 'COSRX',        price: 11.50, score: 8.8, currency: '€' },
  { name: 'Bakuchiol',         brand: 'Pai Skincare', price: 38.00, score: 8.4, currency: '€' },
];

export default function DiscoverScreen({ onNavigate }: Props) {
  const [mainTab, setMainTab] = useState<MainTab>('discover');
  const [search, setSearch] = useState('');

  return (
    <div className="px-4 pt-14 pb-4 space-y-4">

      {/* ── Header + tab switcher ── */}
      <div className="pt-2">
        <h2 className="text-[26px] font-bold text-[#111827] mb-4">Discover</h2>
        <div className="gc-sm flex p-1 gap-1">
          {([['discover', 'Discover'], ['favorites', '♥ Favorites']] as [MainTab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setMainTab(id)}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all tap-scale ${
                mainTab === id ? 'text-[#111827]' : 'text-[#9ca3af]'
              }`}
              style={mainTab === id
                ? { background: 'rgba(255,255,255,0.92)', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                : {}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ FAVORITES TAB ══ */}
      {mainTab === 'favorites' && (
        <FavoritesList onNavigate={onNavigate} />
      )}

      {/* ══ DISCOVER TAB ══ */}
      {mainTab === 'discover' && (<>

        {/* Search */}
        <div className="gc-sm flex items-center gap-3 px-4 py-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients, products…"
            className="flex-1 bg-transparent text-[13px] text-[#111827] placeholder:text-[#9ca3af] outline-none" />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['All', 'Ingredient Guides', 'Tips', 'Trends', 'Marketing Myths'].map((c) => (
            <button key={c}
              className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-semibold tap-scale ${
                c === 'All' ? 'text-white' : 'gc-sm text-[#6b7280]'
              }`}
              style={c === 'All' ? { background: 'linear-gradient(145deg, #7c6ed0, #5b4fb0)', boxShadow: '0 2px 10px rgba(124,110,208,0.22)' } : {}}>
              {c}
            </button>
          ))}
        </div>

        {/* Truth of the day */}
        <div className="gc-dark rounded-3xl px-5 py-4 tap-scale irid-sweep" onClick={() => onNavigate('transparency')}>
          <div className="relative z-10">
            <span className="text-[9px] font-bold tracking-[0.18em] uppercase rounded-full px-2.5 py-0.5 border"
              style={{ color: tips[0].color, background: `${tips[0].color}18`, borderColor: `${tips[0].color}28` }}>
              {tips[0].tag}
            </span>
            <p className="text-white text-[13px] font-medium mt-2.5 leading-relaxed">{tips[0].text}</p>
          </div>
        </div>

        {/* Top ingredients */}
        <div>
          <p className="text-[14px] font-bold text-[#111827] mb-3">Top Ingredients Right Now</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {topIngredients.map((ing) => (
              <button key={ing.name} onClick={() => onNavigate('ingredient-detail')}
                className="gc-sm shrink-0 w-28 p-3 text-center tap-scale cursor-pointer">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-2.5 flex items-center justify-center"
                  style={{ background: `${ing.color}14`, border: `1px solid ${ing.color}22` }}>
                  {getIngredientIcon(ing.name, ing.color, 20)}
                </div>
                <p className="text-[11px] font-bold text-[#111827] leading-tight mb-1">{ing.name}</p>
                <p className="text-[9px] text-[#6b7280]">{ing.benefit}</p>
                <span className={`text-[8px] font-bold rounded-full px-1.5 py-0.5 mt-1 inline-block ${
                  ing.risk === 'Low' ? 'bg-[#ccfbf1] text-[#0d9488]' : 'bg-[#fef3c7] text-[#d97706]'
                }`}>
                  {ing.risk} risk
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending products */}
        <div>
          <p className="text-[14px] font-bold text-[#111827] mb-3">Trending This Week</p>
          <div className="gc overflow-hidden">
            {trending.map((t, i) => (
              <div key={t.name}
                className={`flex items-center gap-3 px-4 py-3.5 tap-scale cursor-pointer ${i < trending.length - 1 ? 'border-b border-black/[0.04]' : ''}`}
                onClick={() => onNavigate('product-result')}
              >
                <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(237,233,251,0.50)' }}>
                  <svg width="14" height="18" viewBox="0 0 52 90" fill="none">
                    <rect x="22" y="2"  width="8"  height="14" rx="4"  fill="rgba(200,195,220,0.85)"/>
                    <rect x="10" y="20" width="32" height="60" rx="10" fill="rgba(245,243,255,0.90)"/>
                    <rect x="14" y="30" width="24" height="38" rx="6"  fill="rgba(237,233,251,0.70)"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#111827] truncate">{t.name}</p>
                  <p className="text-[11px] text-[#9ca3af]">{t.brand}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-bold text-[#111827]">{t.currency}{t.price}</p>
                  <span className="text-[10px] font-bold text-[#0d9488] bg-[#ccfbf1] rounded-full px-2 py-0.5">{t.score}</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div className="gc-sm px-4 py-3 text-center">
          <p className="text-[11px] text-[#9ca3af] italic">Honest. Transparent. Independent. That's our promise to you.</p>
        </div>

      </>)}
    </div>
  );
}
