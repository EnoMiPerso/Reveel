import { useState } from 'react';
import ScoreRing from '../components/ScoreRing';
import ProductThumb from '../components/ProductThumb';
import { routine } from '../mockData/routine';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }
type MainTab = 'skincare' | 'beauty';
type TimeTab = 'morning' | 'night' | 'both';

/** Skincare product row — purple accent */
function SkincareRow({ name, brand, category, score, image, onNavigate }: { name: string; brand: string; category: string; score: number; image?: string; onNavigate: (s: Screen) => void }) {
  return (
    <button onClick={() => onNavigate('product-result')} className="w-full flex items-center gap-3 py-3.5 border-b border-black/[0.04] last:border-0 tap-scale text-left">
      <ProductThumb image={image} size={40} radius={12} type="skincare" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#111827] truncate">{name}</p>
        <p className="text-[11px] text-[#9ca3af]">{brand} · {category}</p>
      </div>
      <ScoreRing score={score} max={10} size="sm" showLabel={false} animate />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  );
}

/** Beauty/makeup product row — pink accent */
function BeautyRow({ name, brand, category, score, image, onNavigate }: { name: string; brand: string; category: string; score: number; image?: string; onNavigate: (s: Screen) => void }) {
  return (
    <button onClick={() => onNavigate('product-result')} className="w-full flex items-center gap-3 py-3.5 border-b border-black/[0.04] last:border-0 tap-scale text-left">
      <ProductThumb image={image} size={40} radius={12} type="makeup" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#111827] truncate">{name}</p>
        <p className="text-[11px] text-[#9ca3af]">{brand} · {category}</p>
      </div>
      <ScoreRing score={score} max={10} size="sm" showLabel={false} animate />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  );
}

/** Mix checker inline panel */
function MixPanel({
  conflicts, ok,
}: {
  conflicts: typeof routine.mixConflicts;
  ok: typeof routine.mixOk;
}) {
  return (
    <div className="space-y-2.5 mt-1">
      {conflicts.map((c) => (
        <div key={c.id} className="gc p-4" style={{ borderLeft: `3px solid ${c.severity === 'high' ? '#dc2626' : '#e07b2c'}` }}>
          <span className={`text-[9px] font-bold uppercase tracking-wide rounded-full px-2.5 py-0.5 ${
            c.severity === 'high' ? 'bg-[#fee2e2]/80 text-[#dc2626]' : 'bg-[#fff3e0]/80 text-[#e07b2c]'
          }`}>
            {c.severity === 'high' ? 'Avoid together' : 'Use with care'}
          </span>
          <div className="flex items-center gap-2 mt-2 mb-2 flex-wrap">
            {c.products.map((n, i) => (
              <>
                <span key={n} className="text-[11px] font-semibold text-[#111827] gc-sm px-2.5 py-1">{n}</span>
                {i < c.products.length - 1 && <span className="text-[#9ca3af] text-[11px]">×</span>}
              </>
            ))}
          </div>
          <p className="text-[11px] text-[#6b7280] leading-relaxed mb-1">{c.reason}</p>
          <p className="text-[11px] font-semibold text-[#374151]">Tip: {c.advice}</p>
        </div>
      ))}
      {ok.map((o) => (
        <div key={o.id} className="gc p-4" style={{ borderLeft: '3px solid #0d9488' }}>
          <span className="text-[9px] font-bold uppercase tracking-wide text-[#0d9488] bg-[#ccfbf1]/80 rounded-full px-2.5 py-0.5">
            Compatible
          </span>
          <div className="flex items-center gap-2 mt-2 mb-2 flex-wrap">
            {o.products.map((n, i) => (
              <>
                <span key={n} className="text-[11px] font-semibold text-[#111827] gc-sm px-2.5 py-1">{n}</span>
                {i < o.products.length - 1 && <span className="text-[#9ca3af] text-[11px]">+</span>}
              </>
            ))}
          </div>
          <p className="text-[11px] text-[#6b7280] leading-relaxed">{o.reason}</p>
        </div>
      ))}
    </div>
  );
}

/** Mix checker toggle button */
function MixButton({ open, onToggle, accent }: { open: boolean; onToggle: () => void; accent: string }) {
  return (
    <button
      onClick={onToggle}
      className="tap-scale w-full py-3.5 rounded-2xl font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all"
      style={open
        ? { background: 'rgba(0,0,0,0.04)', color: '#9ca3af', border: '1.5px solid rgba(0,0,0,0.07)' }
        : { background: accent, color: '#fff', boxShadow: '0 4px 20px rgba(124,110,208,0.22)' }
      }
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
      </svg>
      {open ? 'Hide mix checker' : 'Check mix compatibility'}
    </button>
  );
}

export default function RoutineScreen({ onNavigate }: Props) {
  const [mainTab, setMainTab] = useState<MainTab>('skincare');
  const [timeTab, setTimeTab] = useState<TimeTab>('morning');
  const [showSkincareMix, setShowSkincareMix] = useState(false);
  const [showBeautyMix, setShowBeautyMix] = useState(false);
  const [skincareFilter, setSkincareFilter] = useState('All');
  const [beautyFilter, setBeautyFilter] = useState('All');
  const r = routine;

  const allSkincare = timeTab === 'morning' ? r.morning : timeTab === 'night' ? r.night : [...r.morning, ...r.night];
  const skincareCategories = ['All', ...Array.from(new Set(allSkincare.map(p => p.category)))];
  const skincareProducts = skincareFilter === 'All' ? allSkincare : allSkincare.filter(p => p.category === skincareFilter);

  const beautyCategories = ['All', ...Array.from(new Set(r.beauty.map(p => p.category)))];
  const beautyProducts = beautyFilter === 'All' ? r.beauty : r.beauty.filter(p => p.category === beautyFilter);

  const beautyScore = +(r.beauty.reduce((s, p) => s + p.score, 0) / r.beauty.length).toFixed(1);

  return (
    <div className="px-4 pt-14 pb-4 space-y-3">

      {/* ── Page title ── */}
      <div className="pt-2">
        <h2 className="text-[26px] font-bold text-[#111827] mb-4">My Routine</h2>
        {/* ── Main tabs ── */}
        <div className="gc-sm flex p-1 gap-1">
          {([['skincare', 'Skincare'], ['beauty', 'Beauty']] as [MainTab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setMainTab(id)}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all tap-scale ${
                mainTab === id ? 'text-[#111827]' : 'text-[#9ca3af]'
              }`}
              style={mainTab === id ? { background: 'rgba(255,255,255,0.92)', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : {}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ SKINCARE TAB ══ */}
      {mainTab === 'skincare' && (
        <>
          {/* Routine health score */}
          <div className="gc p-5 flex items-center gap-4">
            <ScoreRing score={r.score} max={10} size="lg" showLabel={false} glow animate />
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-[0.15em] mb-1">Routine health</p>
              <p className="text-[15px] font-bold text-[#111827] leading-snug mb-0.5">{r.insight}</p>
              <p className="text-[11px] text-[#9ca3af]">All products compatible · 2 alerts</p>
            </div>
          </div>

          {/* Time filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {([['morning', '☀️ Morning'], ['night', '🌙 Night'], ['both', 'Both']] as [TimeTab, string][]).map(([id, label]) => (
              <button key={id} onClick={() => { setTimeTab(id); setSkincareFilter('All'); }}
                className={`shrink-0 tap-scale px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
                  timeTab === id ? 'text-white' : 'gc-sm text-[#6b7280]'
                }`}
                style={timeTab === id ? { background: 'linear-gradient(145deg, #7c6ed0, #5b4fb0)', boxShadow: '0 2px 10px rgba(124,110,208,0.25)' } : {}}>
                {label}
              </button>
            ))}
          </div>

          {/* Category filter pills */}
          {skincareCategories.length > 2 && (
            <div className="flex gap-2 overflow-x-auto pb-0.5">
              {skincareCategories.map(cat => (
                <button key={cat} onClick={() => setSkincareFilter(cat)}
                  className="shrink-0 tap-scale px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                  style={skincareFilter === cat
                    ? { background: 'rgba(124,110,208,0.14)', color: '#7c6ed0', border: '1px solid rgba(124,110,208,0.25)' }
                    : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Product list */}
          <div className="gc px-4">
            {skincareProducts.map((p) => <SkincareRow key={p.id} {...p} onNavigate={onNavigate} />)}
          </div>

          {/* Conflict alert */}
          {r.mixConflicts.slice(0, 1).map((c) => (
            <div key={c.id} className="gc p-4" style={{ borderLeft: '3px solid #e07b2c' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#e07b2c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                </svg>
                <span className="text-[10px] font-bold text-[#e07b2c] uppercase tracking-wide">Conflict</span>
              </div>
              <p className="text-[12px] text-[#374151] font-semibold mb-0.5">{c.products.join(' + ')}</p>
              <p className="text-[11px] text-[#6b7280] leading-snug">{c.advice}</p>
            </div>
          ))}

          {/* Add product */}
          <button onClick={() => onNavigate('scan')}
            className="tap-scale w-full py-3.5 rounded-2xl text-[#7c6ed0] font-semibold text-[14px] gc-sm flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add product
          </button>

          {/* Mix checker — at end of list */}
          <MixButton
            open={showSkincareMix}
            onToggle={() => setShowSkincareMix(v => !v)}
            accent="linear-gradient(145deg, #7c6ed0, #5b4fb0)"
          />
          {showSkincareMix && (
            <MixPanel conflicts={r.mixConflicts} ok={r.mixOk} />
          )}
        </>
      )}

      {/* ══ BEAUTY TAB ══ */}
      {mainTab === 'beauty' && (
        <>
          {/* Beauty score card */}
          <div className="gc p-5 flex items-center gap-4">
            <ScoreRing score={beautyScore} max={10} size="lg" showLabel={false} glow animate />
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-[0.15em] mb-1">Beauty score</p>
              <p className="text-[15px] font-bold text-[#111827] leading-snug mb-0.5">Good overall formula quality</p>
              <p className="text-[11px] text-[#9ca3af]">{r.beauty.length} products · avg {beautyScore} / 10</p>
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {beautyCategories.map(cat => (
              <button key={cat} onClick={() => setBeautyFilter(cat)}
                className="shrink-0 tap-scale px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                style={beautyFilter === cat
                  ? { background: 'rgba(219,39,119,0.12)', color: '#be185d', border: '1px solid rgba(219,39,119,0.22)' }
                  : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Product list */}
          <div className="gc px-4">
            {beautyProducts.map((p) => <BeautyRow key={p.id} {...p} onNavigate={onNavigate} />)}
          </div>

          {/* Add product */}
          <button onClick={() => onNavigate('scan')}
            className="tap-scale w-full py-3.5 rounded-2xl text-[#be185d] font-semibold text-[14px] gc-sm flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add product
          </button>

          {/* Mix checker — at end of list */}
          <MixButton
            open={showBeautyMix}
            onToggle={() => setShowBeautyMix(v => !v)}
            accent="linear-gradient(145deg, #db2777, #9d174d)"
          />
          {showBeautyMix && (
            <MixPanel conflicts={r.beautyMixConflicts} ok={r.beautyMixOk} />
          )}
        </>
      )}

    </div>
  );
}
