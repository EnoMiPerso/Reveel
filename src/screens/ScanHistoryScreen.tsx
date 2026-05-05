import { useState } from 'react';
import type { Screen } from '../types';
import { scoreColor } from '../utils/score';
import ProductThumb from '../components/ProductThumb';

interface Props { onNavigate: (s: Screen) => void; }

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=120&h=120&fit=crop&auto=format&q=80`;
const history = [
  { id: 'h1',  brand: 'CeraVe',          name: 'Hydrating Cleanser',               score: 8.5, date: 'Today',       fav: true,  routine: true,  type: 'skincare' as const, image: U('1556228453-efd6c1ff04f6') },
  { id: 'h2',  brand: 'The Ordinary',    name: 'Niacinamide 10% + Zinc 1%',        score: 6.2, date: 'Today',       fav: false, routine: false, type: 'skincare' as const, image: U('1620916566398-39f1143ab7be') },
  { id: 'h3',  brand: 'Rare Beauty',     name: 'Soft Pinch Liquid Blush',          score: 8.3, date: 'Yesterday',   fav: true,  routine: true,  type: 'makeup'   as const, image: U('1487239177913-0cf0e0e589e8') },
  { id: 'h4',  brand: 'NARS',            name: 'Radiant Creamy Concealer',         score: 7.8, date: 'Yesterday',   fav: false, routine: true,  type: 'makeup'   as const, image: U('1522335789-d472550a3e80') },
  { id: 'h5',  brand: "Paula's Choice",  name: 'Skin Perfecting 2% BHA Liquid',    score: 8.9, date: '2 days ago',  fav: true,  routine: true,  type: 'skincare' as const, image: U('1607346256693-f45d6a8ad044') },
  { id: 'h6',  brand: 'COSRX',           name: 'Advanced Snail 96 Mucin Essence',  score: 8.4, date: '3 days ago',  fav: false, routine: false, type: 'skincare' as const, image: U('1611080626903-33c73b9a36c8') },
  { id: 'h7',  brand: 'Charlotte Tilbury',name: 'Airbrush Flawless Primer',        score: 6.8, date: '3 days ago',  fav: false, routine: true,  type: 'makeup'   as const, image: U('1596462502278-27bfdc403348') },
  { id: 'h8',  brand: "Kiehl's",         name: 'Midnight Recovery Concentrate',    score: 7.3, date: '4 days ago',  fav: true,  routine: false, type: 'skincare' as const, image: U('1540555700478-4be290a1f41c') },
  { id: 'h9',  brand: 'Benefit',         name: 'Roller Lash Curling Mascara',      score: 8.1, date: '5 days ago',  fav: false, routine: true,  type: 'makeup'   as const, image: U('1512496015851-cbca30dfef47') },
  { id: 'h10', brand: 'Avène',           name: 'Thermal Spring Water Spray',       score: 9.0, date: 'Last week',   fav: true,  routine: false, type: 'skincare' as const, image: U('1535585209-fd1a8b9d4e0c') },
  { id: 'h11', brand: 'La Roche-Posay',  name: 'Cicaplast Baume B5',               score: 9.0, date: 'Last week',   fav: true,  routine: false, type: 'skincare' as const, image: U('1598440947619-2c35fc9aa908') },
  { id: 'h12', brand: 'ILIA',            name: 'Balmy Tint Hydrating Lip Balm',    score: 8.7, date: 'Last week',   fav: false, routine: false, type: 'makeup'   as const, image: U('1599305020479-9cde55013e66') },
];

type Filter = 'all' | 'favourites' | 'routine';

export default function ScanHistoryScreen({ onNavigate }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const shown = history.filter(h => {
    const matchFilter = filter === 'all' ? true : filter === 'favourites' ? h.fav : h.routine;
    const q = query.trim().toLowerCase();
    const matchSearch = !q || h.name.toLowerCase().includes(q) || h.brand.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const filters: { id: Filter; label: string }[] = [
    { id: 'all',        label: 'All scans' },
    { id: 'favourites', label: '♡ Favourites' },
    { id: 'routine',    label: '✦ In routine' },
  ];

  return (
    <div className="pb-6">
      {/* Search bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products or brands…"
            className="w-full pl-9 pr-9 py-2.5 rounded-2xl text-[13px] text-[#111827] placeholder-[#9ca3af] outline-none"
            style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.07)' }}
          />
          {query && (
            <button onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 tap-scale text-[#9ca3af]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-4 pt-1 pb-3 overflow-x-auto">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className="shrink-0 tap-scale px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all"
            style={filter === f.id
              ? { background: 'linear-gradient(145deg,#9b8ee0,#5b4fb0)', color: '#fff', boxShadow: '0 2px 8px rgba(124,110,208,0.25)' }
              : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="px-4 text-[11px] text-[#9ca3af] mb-2">{shown.length} product{shown.length !== 1 ? 's' : ''}</p>

      {/* List */}
      <div className="px-4">
        {shown.length === 0 && (
          <div className="gc rounded-3xl p-8 flex flex-col items-center gap-2 text-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p className="text-[13px] font-semibold text-[#9ca3af]">No results for "{query}"</p>
            <p className="text-[11px] text-[#c4c4cc]">Try a different name or brand</p>
          </div>
        )}
        <div className="gc overflow-hidden">
          {shown.map((item, i) => (
            <button key={item.id} onClick={() => onNavigate('product-result')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 tap-scale text-left ${i < shown.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>

              {/* Product thumb */}
              <ProductThumb image={item.image} size={40} radius={12} type={item.type} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#9ca3af] font-medium">{item.brand}</p>
                <p className="text-[13px] font-semibold text-[#111827] leading-tight truncate">{item.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-[10px] text-[#9ca3af]">{item.date}</span>
                  {item.fav && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-[#0d9488] bg-[#ccfbf1] rounded-full px-1.5 py-0.5">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="#0d9488" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      Favourite
                    </span>
                  )}
                  {item.routine && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-[#7c6ed0] bg-[rgba(124,110,208,0.10)] rounded-full px-1.5 py-0.5">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                      Routine
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              <div className="text-right shrink-0 flex flex-col items-end">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[18px] font-bold text-[#111827]">{item.score}</span>
                  <span className="text-[10px] text-[#c4c4cc]">/10</span>
                </div>
                <div className="w-8 h-1 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${item.score * 10}%`, background: scoreColor(item.score) }} />
                </div>
              </div>

              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
