import ScoreRing from '../components/ScoreRing';
import { alternativeProduct, retailers } from '../mockData/products';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }


export default function UnlockScreen({ onNavigate }: Props) {
  const alt = alternativeProduct;

  return (
    <div className="px-4 pb-4">

      {/* ── Header ── */}
      <div className="mb-6 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
        <div className="inline-flex items-center gap-2 gc-purple rounded-full px-3 py-1.5 mb-3">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span className="text-[11px] font-bold text-[#7c6ed0]">Truth revealed</span>
        </div>
        <h2 className="text-[26px] font-bold text-[#111827] leading-tight">Here's the full picture</h2>
        <p className="text-[13px] text-[#9ca3af] mt-1.5">Three honest options — your call.</p>
      </div>

      {/* ── A: Don't Buy — dark card, best advice ── */}
      <div className="gc-dark rounded-3xl p-5 mb-3 seq-enter" style={{ '--delay': '70ms' } as React.CSSProperties}>
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-white/75 font-bold text-[13px]">A</span>
            </div>
            <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#a78bfa] bg-[#a78bfa]/12 rounded-full px-2.5 py-0.5 border border-[#a78bfa]/18 self-center">
              BEST ADVICE
            </span>
          </div>
          <h3 className="text-white font-bold text-[16px] mb-2 leading-snug">
            You're paying for marketing here.
          </h3>
          <p className="text-white/50 text-[13px] leading-relaxed mb-4">
            You already have 2 moisturisers in your routine. Adding a third won't improve your skin — it'll just cost you €42.
          </p>
          <div className="flex gap-2">
            {['CeraVe Cream', 'Avène Cicalfate+'].map((n) => (
              <div key={n} className="flex-1 rounded-xl px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <div className="text-white/30 text-[9px] mb-0.5 font-medium uppercase tracking-wide">Already own</div>
                <div className="text-white text-[11px] font-semibold leading-tight">{n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── B: Same product, better price ── */}
      <div className="gc p-5 mb-3 seq-enter" style={{ '--delay': '150ms' } as React.CSSProperties}>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 rounded-xl bg-black/5 flex items-center justify-center font-bold text-[13px] text-[#6b7280]">B</span>
          <h3 className="text-[14px] font-bold text-[#111827]">Same product, better price</h3>
        </div>
        <div className="space-y-0">
          {retailers.map((r, i) => (
            <div key={r.id}
              className={`flex items-center gap-3 py-3.5 ${i < retailers.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
              <span className="text-[13px] text-[#374151] flex-1 font-medium">{r.name}</span>
              {r.rank === 'top' && (
                <span className="text-[10px] font-bold rounded-full px-2 py-0.5 bg-[#ccfbf1] text-[#0d9488]">
                  Best pick
                </span>
              )}
              <span className="text-[14px] font-bold text-[#111827]">€{r.price}</span>
            </div>
          ))}
        </div>
        <button className="tap-scale w-full mt-3 gc-sm py-3 text-[13px] font-semibold text-[#7c6ed0]">
          View all offers
        </button>
      </div>

      {/* ── C: Better alternative ── */}
      <div className="gc-green p-5 mb-5 seq-enter" style={{ '--delay': '230ms' } as React.CSSProperties}>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 rounded-xl bg-[#0d9488]/12 flex items-center justify-center font-bold text-[13px] text-[#0d9488]">C</span>
          <h3 className="text-[14px] font-bold text-[#111827]">Here's a smarter option</h3>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.80)' }}>
            <svg width="28" height="32" viewBox="0 0 90 100" fill="none">
              <rect x="14" y="22" width="62" height="62" rx="14" fill="rgba(220,252,231,0.9)"/>
              <rect x="22" y="34" width="46" height="36" rx="8" fill="rgba(167,243,208,0.6)"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-[#6b7280] mb-0.5">{alt.brand}</p>
            <p className="text-[13px] font-bold text-[#111827] mb-1 leading-tight">{alt.name}</p>
            <p className="text-[20px] font-bold text-[#111827]">{alt.currency}{alt.price}</p>
          </div>
          <ScoreRing score={alt.scores.forYou} max={10} size="md" showLabel={false} glow animate />
        </div>
        <div className="space-y-2 mb-4">
          {alt.reasons.map((r) => (
            <div key={r} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0d9488] shrink-0" />
              <span className="text-[12px] text-[#374151]">{r}</span>
            </div>
          ))}
        </div>
        <button onClick={() => onNavigate('comparison')}
          className="tap-scale w-full gc-sm py-3 text-[13px] font-bold text-[#0d9488]">
          Compare side by side
        </button>
      </div>

      {/* ── Skip — empowered, primary CTA ── */}
      <button onClick={() => onNavigate('home')}
        className="tap-scale fade-up w-full py-4 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2.5 mb-3"
        style={{
          background: '#111827',
          color: '#ffffff',
          '--delay': '310ms',
        } as React.CSSProperties}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        I'll skip buying — that's smart
      </button>
      <p className="text-center text-[11px] text-[#9ca3af] fade-up" style={{ '--delay': '380ms' } as React.CSSProperties}>
        The most powerful decision is often not to buy.
      </p>

    </div>
  );
}
