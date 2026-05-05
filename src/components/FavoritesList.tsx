import React, { useState } from 'react';
import { favorites as initialFavorites, type FavStatus } from '../mockData/favorites';
import type { Screen } from '../types';
import { scoreColor } from '../utils/score';
import ProductThumb from './ProductThumb';

interface Props { onNavigate: (s: Screen) => void; }

const STATUS_ICONS: Record<FavStatus | 'all', React.ReactNode> = {
  all: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  saved: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  bought: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

const STATUS_TABS: { id: FavStatus | 'all'; label: string }[] = [
  { id: 'all',    label: 'All'    },
  { id: 'saved',  label: 'Saved'  },
  { id: 'bought', label: 'Bought' },
];

const STATUS_STYLE: Record<FavStatus, { label: string; bg: string; color: string }> = {
  saved:  { label: 'Saved',  bg: 'rgba(124,110,208,0.10)', color: '#7c6ed0' },
  bought: { label: 'Bought', bg: 'rgba(13,148,136,0.10)',  color: '#0d9488' },
};

export default function FavoritesList({ onNavigate }: Props) {
  const [items, setItems] = useState(initialFavorites);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FavStatus | 'all'>('all');

  function cycleStatus(id: string) {
    const order: FavStatus[] = ['saved', 'bought'];
    setItems(f => f.map(x => x.id === id
      ? { ...x, status: order[(order.indexOf(x.status) + 1) % order.length] }
      : x
    ));
  }

  const filtered = items
    .filter(f => activeTab === 'all' || f.status === activeTab)
    .filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.brand.toLowerCase().includes(search.toLowerCase())
    );

  if (items.length === 0) {
    return (
      <div className="gc p-8 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,168,212,0.18)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <p className="text-[14px] font-semibold text-[#111827]">No favourites yet</p>
        <p className="text-[12px] text-[#9ca3af] leading-relaxed">Tap the heart when scanning a product to save it here.</p>
        <button onClick={() => onNavigate('scan')}
          className="tap-scale mt-1 px-5 py-2.5 rounded-2xl text-white text-[13px] font-semibold btn-glow"
          style={{ background: 'linear-gradient(145deg, #8b7ed8, #5b4fb0)' }}>
          Scan a product
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {/* Search */}
      <div className="gc-sm flex items-center gap-3 px-4 py-3">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search your favourites…"
          className="flex-1 bg-transparent text-[13px] text-[#111827] placeholder:text-[#9ca3af] outline-none" />
        {search && <button onClick={() => setSearch('')} className="text-[#c4c4cc] tap-scale text-[16px] leading-none">×</button>}
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mt-3">
        {STATUS_TABS.map(t => {
          const count = t.id === 'all' ? items.length : items.filter(x => x.status === t.id).length;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="shrink-0 tap-scale flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all"
              style={activeTab === t.id
                ? { background: 'linear-gradient(145deg,#9b8ee0,#5b4fb0)', color: '#fff', boxShadow: '0 2px 8px rgba(124,110,208,0.25)' }
                : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
              <span className="flex items-center">{STATUS_ICONS[t.id]}</span>
              {t.label}
              <span className="text-[9px] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-[#9ca3af] px-1">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

      <div className="gc overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-[13px] font-semibold text-[#374151]">No results</p>
            <p className="text-[11px] text-[#9ca3af] mt-1">Try a different filter or search term.</p>
          </div>
        ) : filtered.map((fav, i) => {
          const ss = STATUS_STYLE[fav.status];
          return (
            <div key={fav.id}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < filtered.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
              {/* Thumb */}
              <button onClick={() => onNavigate('product-result')} className="tap-scale shrink-0">
                <ProductThumb image={fav.image} size={40} radius={12} type={fav.type ?? 'skincare'} />
              </button>

              {/* Info */}
              <button onClick={() => onNavigate('product-result')} className="flex-1 min-w-0 text-left tap-scale">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: ss.bg, color: ss.color }}>{ss.label}</span>
                </div>
                <p className="text-[13px] font-semibold text-[#111827] leading-tight truncate">{fav.name}</p>
                <p className="text-[10px] text-[#9ca3af] mt-0.5">{fav.brand} · {fav.category}</p>
              </button>

              {/* Score + price */}
              <div className="text-right shrink-0 mr-1">
                <div className="flex items-baseline gap-0.5 justify-end">
                  <span className="text-[15px] font-bold" style={{ color: scoreColor(fav.score) }}>{fav.score}</span>
                  <span className="text-[9px] text-[#c4c4cc]">/10</span>
                </div>
                <p className="text-[11px] font-medium text-[#6b7280] mt-0.5">{fav.currency}{fav.price}</p>
              </div>

              {/* Cycle status button */}
              <button onClick={() => cycleStatus(fav.id)}
                className="tap-scale w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{ background: ss.bg, color: ss.color }}>
                {STATUS_ICONS[fav.status]}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
