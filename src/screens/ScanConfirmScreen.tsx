import { useState } from 'react';
import { scannedProduct, productIngredients } from '../mockData/products';
import { scoreColor, scoreVerdict } from '../utils/score';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; onReviewed?: () => void; }

export default function ScanConfirmScreen({ onNavigate }: Props) {
  const p = scannedProduct;
  const [opening, setOpening] = useState(false);
  const [fav, setFav] = useState(false);

  const score   = 6.2;
  const color   = scoreColor(score);
  const verdict = scoreVerdict(score);

  function open() {
    setOpening(true);
    setTimeout(() => onNavigate('product-result'), 500);
  }

  return (
    <div className="px-4 pt-8 pb-6 flex flex-col items-center gap-6">

      {/* ── Detected label ── */}
      <div className="flex items-center gap-2 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
        <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
        <span className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest">Product detected</span>
      </div>

      {/* ── Product card ── */}
      <div className="w-full overflow-hidden relative fade-up"
        style={{
          '--delay': '40ms',
          borderRadius: 32,
          background: opening ? 'rgba(220,252,231,0.55)' : 'rgba(255,255,255,0.80)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: opening ? '1px solid #5eead4' : '1px solid rgba(255,255,255,0.92)',
          boxShadow: '0 0 0 6px rgba(167,139,250,0.05), 0 12px 48px rgba(124,110,208,0.12), inset 0 1px 0 rgba(255,255,255,1)',
        } as React.CSSProperties}>

        {/* Pearl shimmer */}
        <span className="absolute pointer-events-none rounded-3xl" style={{
          inset: '-80%',
          background: 'conic-gradient(from 0deg,rgba(255,255,255,0) 0deg,rgba(220,210,255,0.28) 40deg,rgba(200,240,255,0.20) 80deg,rgba(210,255,230,0.16) 130deg,rgba(255,240,200,0.14) 180deg,rgba(255,210,230,0.18) 230deg,rgba(220,210,255,0.26) 290deg,rgba(255,255,255,0) 360deg)',
          animation: 'kpiPearl 12s linear infinite',
          borderRadius: '50%',
        }} />
        <span className="absolute pointer-events-none" style={{
          top: '-20%', left: '-60%', width: '40%', height: '160%',
          background: 'linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.65) 48%,rgba(255,255,255,0.22) 54%,transparent 100%)',
          animation: 'kpiGlint 7s ease-in-out infinite',
        }} />

        {/* Content */}
        <div className="relative z-10 flex gap-5 p-6 pb-5">
          {/* Product illustration */}
          <div className="w-24 h-24 rounded-3xl shrink-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(160deg,rgba(237,233,251,0.85),rgba(220,215,255,0.60))', border: '1px solid rgba(167,139,250,0.20)' }}>
            <svg width="46" height="72" viewBox="0 0 52 90" fill="none">
              <rect x="22" y="2"  width="8"  height="14" rx="4"  fill="rgba(200,195,220,0.85)"/>
              <rect x="20" y="14" width="12" height="6"  rx="2"  fill="rgba(180,175,210,0.80)"/>
              <rect x="10" y="20" width="32" height="60" rx="10" fill="rgba(245,243,255,0.95)" stroke="rgba(167,139,250,0.30)" strokeWidth="1.2"/>
              <rect x="14" y="30" width="24" height="38" rx="6"  fill="rgba(237,233,251,0.75)"/>
              <rect x="17" y="36" width="18" height="2.5" rx="1.2" fill="rgba(124,110,208,0.60)"/>
              <rect x="17" y="41" width="14" height="2"   rx="1"   fill="rgba(124,110,208,0.35)"/>
              <rect x="17" y="46" width="10" height="2"   rx="1"   fill="rgba(124,110,208,0.20)"/>
              <rect x="11" y="22" width="4"  height="30" rx="2"  fill="rgba(255,255,255,0.50)"/>
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-[#111827] leading-tight">{p.brand}</p>
            <p className="text-[13px] text-[#6b7280] leading-snug mt-0.5">{p.name}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[24px] font-bold text-[#111827] leading-none">{score}</span>
              <span className="text-[12px] text-[#9ca3af]">/10</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: `${color}18`, color }}>{verdict.label}</span>
            </div>
          </div>

          {/* Favourite */}
          <button onClick={() => setFav(f => !f)}
            className="tap-scale w-9 h-9 rounded-full flex items-center justify-center shrink-0 self-start transition-all"
            style={fav ? { background: 'rgba(244,114,182,0.15)' } : { background: 'rgba(0,0,0,0.05)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24"
              fill={fav ? '#f472b6' : 'none'}
              stroke={fav ? '#f472b6' : '#9ca3af'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Quick ingredient preview */}
        <div className="relative z-10 px-6 pb-5 flex gap-1.5 flex-wrap">
          {productIngredients.filter(i => i.highlight).slice(0, 3).map(ing => (
            <span key={ing.id} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(124,110,208,0.09)', color: '#7c6ed0' }}>
              {ing.name}
            </span>
          ))}
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.05)', color: '#9ca3af' }}>
            +{productIngredients.length - 3} more
          </span>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="w-full space-y-2.5 fade-up" style={{ '--delay': '80ms' } as React.CSSProperties}>
        <button onClick={open}
          className="tap-scale w-full py-4 rounded-3xl text-[14px] font-bold text-white"
          style={{
            background: opening
              ? 'linear-gradient(135deg,#0d9488,#14b8a6)'
              : 'linear-gradient(135deg,#5b4fb0,#7c6ed0)',
            boxShadow: '0 6px 24px rgba(124,110,208,0.30)',
          }}>
          {opening ? '✓ Opening analysis…' : 'View full analysis →'}
        </button>
        <button onClick={() => onNavigate('scan')}
          className="tap-scale w-full py-3 rounded-3xl text-[13px] font-medium text-[#9ca3af]"
          style={{ background: 'rgba(0,0,0,0.04)' }}>
          Not the right product? Scan again
        </button>
      </div>

    </div>
  );
}
