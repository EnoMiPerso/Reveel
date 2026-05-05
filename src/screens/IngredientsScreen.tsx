import { useState } from 'react';
import { productIngredients } from '../mockData/products';
import type { IngredientStatus } from '../types';
import { getIngredientIcon } from '../utils/ingredientIcon';

type Tab = 'all' | IngredientStatus;

const cfg = {
  good:     { label: 'Good',       color: '#0d9488', bg: 'bg-[#ccfbf1]/80', dot: 'bg-[#0d9488]' },
  watchout: { label: 'Watch out',  color: '#e07b2c', bg: 'bg-[#fff3e0]/80', dot: 'bg-[#e07b2c]' },
  avoid:    { label: 'Avoid',      color: '#dc2626', bg: 'bg-[#fee2e2]/80', dot: 'bg-[#dc2626]' },
};

export default function IngredientsScreen() {
  const [tab, setTab] = useState<Tab>('all');
  const [expanded, setExpanded] = useState(false);

  const total    = productIngredients.length;
  const good     = productIngredients.filter((i) => i.status === 'good').length;
  const watchout = productIngredients.filter((i) => i.status === 'watchout').length;
  const avoid    = productIngredients.filter((i) => i.status === 'avoid').length;
  const visible  = tab === 'all' ? productIngredients : productIngredients.filter((i) => i.status === tab);
  const key      = visible.filter((i) => i.highlight);
  const rest     = visible.filter((i) => !i.highlight);

  return (
    <div className="px-4 pt-5 pb-4 space-y-3">
      {/* Overview */}
      <div className="gc p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-[#111827]">{total}</span>
          <span className="text-sm text-[#6b7280]">Total Ingredients</span>
        </div>
        <div className="w-full h-3 rounded-full flex overflow-hidden gap-0.5 mb-3">
          <div className="h-full rounded-l-full" style={{ width: `${(good/total)*100}%`, background: '#0d9488' }} />
          <div className="h-full" style={{ width: `${(watchout/total)*100}%`, background: '#d97706' }} />
          {avoid > 0 && <div className="h-full rounded-r-full" style={{ width: `${(avoid/total)*100}%`, background: '#dc2626' }} />}
        </div>
        <div className="flex items-center gap-4">
          {([['good', good, '#0d9488'], ['watchout', watchout, '#d97706'], ['avoid', avoid, '#dc2626']] as [IngredientStatus, number, string][]).map(([s, n, c]) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: c }} />
              <span className="text-xs font-medium text-[#374151]">{n} {cfg[s].label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {([['all', 'All', total], ['good', 'Good', good], ['watchout', 'Watch Out', watchout], ['avoid', 'Avoid', avoid]] as [Tab, string, number][]).map(([id, label, count]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold tap-scale transition-all ${
              tab === id
                ? id === 'all' ? 'text-white' : ''
                : 'gc-sm text-[#6b7280]'
            }`}
            style={tab === id ? {
              background: id === 'all' ? 'linear-gradient(145deg, #7c6ed0, #5b4fb0)' : `${cfg[id as IngredientStatus]?.color}18`,
              color: id === 'all' ? 'white' : cfg[id as IngredientStatus]?.color,
              border: id !== 'all' ? `1px solid ${cfg[id as IngredientStatus]?.color}30` : undefined,
            } : {}}>
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Key ingredients */}
      {key.length > 0 && (
        <div>
          <p className="text-sm font-bold text-[#111827] mb-2.5">Key Ingredients</p>
          <div className="space-y-2">
            {key.map((ing) => {
              const c = cfg[ing.status];
              return (
                <div key={ing.id} className="gc p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c.color}12`, border: `1px solid ${c.color}20` }}>
                    {getIngredientIcon(ing.name, c.color, 16)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <span className="text-sm font-bold text-[#111827]">+{ing.name}</span>
                      <span className={`text-[9px] font-bold rounded-full px-2 py-0.5 shrink-0 ${c.bg}`} style={{ color: c.color }}>{c.label}</span>
                    </div>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{ing.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full list */}
      {rest.length > 0 && (
        <div>
          <p className="text-sm font-bold text-[#111827] mb-2.5">{tab === 'all' ? 'All Ingredients' : cfg[tab as IngredientStatus]?.label}</p>
          <div className="gc overflow-hidden">
            {(expanded ? rest : rest.slice(0, 4)).map((ing, i, arr) => (
              <div key={ing.id} className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? 'border-b border-black/5' : ''}`}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${cfg[ing.status].color}12` }}>
                  {getIngredientIcon(ing.name, cfg[ing.status].color, 12)}
                </div>
                <span className="text-sm text-[#111827] flex-1">{ing.name}</span>
                <span className="text-[10px] font-semibold" style={{ color: cfg[ing.status].color }}>{cfg[ing.status].label}</span>
              </div>
            ))}
          </div>
          {!expanded && rest.length > 4 && (
            <button onClick={() => setExpanded(true)}
              className="tap-scale w-full gc-sm mt-2.5 py-3.5 text-sm font-semibold text-[#7c6ed0] flex items-center justify-center gap-2">
              See all {total} ingredients
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
