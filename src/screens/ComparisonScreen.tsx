import { useState } from 'react';
import { scannedProduct, betterProducts } from '../mockData/products';
import { scoreVerdict } from '../utils/score';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

const alt = betterProducts['ordinary-azelaic'];
const orig = scannedProduct;

type RowKey = 'overall' | 'forYou' | 'planet' | 'value' | 'routineFit';

const SCORE_ROWS: { label: string; key: RowKey }[] = [
  { label: 'Overall',     key: 'overall'    },
  { label: 'For you',     key: 'forYou'     },
  { label: 'Planet',      key: 'planet'     },
  { label: 'Value',       key: 'value'      },
  { label: 'Routine fit', key: 'routineFit' },
];

const DETAIL_ROWS = [
  { label: 'Price',       orig: `€${orig.price.toFixed(2)}`,   alt: `€${alt.price.toFixed(2)}`,     origBad: true,  altGood: true  },
  { label: 'Fragrance',   orig: 'Yes',                          alt: 'None',                          origBad: true,  altGood: true  },
  { label: 'CO₂',         orig: orig.impact.co2.value,          alt: alt.impact.co2.value,            origBad: true,  altGood: true  },
  { label: 'Water',       orig: orig.impact.water.value,        alt: alt.impact.water.value,          origBad: true,  altGood: true  },
  { label: 'Packaging',   orig: orig.impact.plastic.value,      alt: alt.impact.plastic.value,        origBad: true,  altGood: true  },
  { label: 'Flags',       orig: '4 issues',                     alt: 'None',                          origBad: true,  altGood: true  },
];

function ScorePill({ score }: { score: number }) {
  const v = scoreVerdict(score);
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: `${v.color}15`, color: v.color }}>
      {score}
    </span>
  );
}

function MiniRing({ score, size = 52 }: { score: number; size?: number }) {
  const v = scoreVerdict(score);
  const r = (size / 2) - 5;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={v.color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={`${(score / 10) * circ} ${circ}`}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[13px] font-black text-[#111827] leading-none">{score}</span>
      </div>
    </div>
  );
}

type Tab = 'scores' | 'details' | 'ingredients';

export default function ComparisonScreen({ onNavigate }: Props) {
  const [tab, setTab] = useState<Tab>('scores');

  const pctBetter = Math.round(((alt.scores.overall - orig.scores.overall) / orig.scores.overall) * 100);

  return (
    <div className="px-4 pb-8 flex flex-col gap-4">

      {/* ── Verdict banner ── */}
      <div className="fade-up gc-dark rounded-3xl px-5 py-4 irid-sweep" style={{ '--delay': '0ms' } as React.CSSProperties}>
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#2dd4bf] bg-[#2dd4bf]/12 rounded-full px-2.5 py-0.5 border border-[#2dd4bf]/18">
              Reveel verdict
            </span>
            <p className="text-white text-[16px] font-bold mt-2 leading-snug">
              {pctBetter}% better score — same price range.
            </p>
            <p className="text-white/50 text-[11px] mt-1">Fragrance-free · Lower footprint · Zero flags</p>
          </div>
          <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(45,212,191,0.15)', border: '1px solid rgba(45,212,191,0.20)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Product headers ── */}
      <div className="grid grid-cols-2 gap-3 fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>
        {/* Original */}
        <div className="gc p-4 flex flex-col items-center gap-2.5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca3af]">Original</p>
          <MiniRing score={orig.scores.overall} />
          <div className="text-center">
            <p className="text-[10px] text-[#9ca3af]">{orig.brand}</p>
            <p className="text-[12px] font-bold text-[#111827] leading-tight">{orig.name}</p>
          </div>
          <p className="text-[18px] font-bold text-[#111827]">€{orig.price.toFixed(2)}</p>
        </div>
        {/* Better */}
        <div className="gc p-4 flex flex-col items-center gap-2.5 relative"
          style={{ border: '1.5px solid rgba(13,148,136,0.25)', background: 'rgba(204,251,241,0.18)' }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="text-[9px] font-bold text-[#0d9488] bg-[#ccfbf1] rounded-full px-2.5 py-0.5 border border-[#99f6e4] whitespace-nowrap">
              Better pick
            </span>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: '#0d9488' }}>Alternative</p>
          <MiniRing score={alt.scores.overall} />
          <div className="text-center">
            <p className="text-[10px] text-[#9ca3af]">{alt.brand}</p>
            <p className="text-[12px] font-bold text-[#111827] leading-tight">{alt.name}</p>
          </div>
          <p className="text-[18px] font-bold" style={{ color: '#0d9488' }}>€{alt.price.toFixed(2)}</p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="gc-sm flex rounded-2xl p-1 gap-1 fade-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
        {(['scores', 'details', 'ingredients'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-xl text-[11px] font-semibold capitalize transition-all"
            style={tab === t
              ? { background: 'white', color: '#111827', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }
              : { color: '#9ca3af' }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {tab === 'scores' && (
        <div className="gc overflow-hidden fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
          {SCORE_ROWS.map((row, i) => {
            const oScore = orig.scores[row.key];
            const aScore = alt.scores[row.key];
            const maxW = Math.max(oScore, aScore, 1);
            return (
              <div key={row.key}
                className={`px-4 py-3 ${i < SCORE_ROWS.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-medium text-[#9ca3af]">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <ScorePill score={oScore} />
                    <span className="text-[10px] text-[#c4c4cc]">→</span>
                    <ScorePill score={aScore} />
                  </div>
                </div>
                {/* Dual bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 text-right text-[9px] text-[#9ca3af] shrink-0">orig.</div>
                    <div className="flex-1 h-1.5 rounded-full bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(oScore / maxW) * 100}%`, background: scoreVerdict(oScore).color }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 text-right text-[9px] text-[#0d9488] shrink-0 font-semibold">alt.</div>
                    <div className="flex-1 h-1.5 rounded-full bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(aScore / maxW) * 100}%`, background: scoreVerdict(aScore).color }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'details' && (
        <div className="gc overflow-hidden fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
          {/* Column headers */}
          <div className="grid grid-cols-[80px_1fr_1fr] border-b border-black/[0.05] px-4 py-2">
            <span />
            <span className="text-[9px] font-bold text-[#9ca3af] uppercase tracking-widest">{orig.brand}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#0d9488' }}>{alt.brand}</span>
          </div>
          {DETAIL_ROWS.map((row, i) => (
            <div key={row.label}
              className={`grid grid-cols-[80px_1fr_1fr] items-center ${i < DETAIL_ROWS.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
              <div className="px-4 py-3">
                <span className="text-[11px] font-medium text-[#9ca3af]">{row.label}</span>
              </div>
              <div className={`px-3 py-3 ${row.origBad ? 'bg-orange-50/40' : ''}`}>
                <span className={`text-[12px] font-semibold ${row.origBad ? 'text-[#e07b2c]' : 'text-[#374151]'}`}>
                  {row.orig}
                </span>
              </div>
              <div className={`px-3 py-3 ${row.altGood ? 'bg-teal-50/40' : ''}`}>
                <span className={`text-[12px] font-semibold ${row.altGood ? 'text-[#0d9488]' : 'text-[#374151]'}`}>
                  {row.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'ingredients' && (
        <div className="gc overflow-hidden fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
          <div className="grid grid-cols-2 divide-x divide-black/[0.04]">
            {/* Original */}
            <div>
              <div className="px-3 py-2.5 border-b border-black/[0.04]">
                <p className="text-[9px] font-bold text-[#9ca3af] uppercase tracking-widest">{orig.brand}</p>
              </div>
              {[
                { name: 'Niacinamide', ok: true },
                { name: 'Zinc PCA', ok: true },
                { name: 'Dimethicone', ok: false },
                { name: 'Fragrance', ok: false },
                { name: 'Carbomer', ok: false },
              ].map(ing => (
                <div key={ing.name} className="flex items-center gap-2 px-3 py-2 border-b border-black/[0.03]">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: ing.ok ? '#0d9488' : '#ef4444' }} />
                  <span className="text-[11px] text-[#374151]">{ing.name}</span>
                </div>
              ))}
            </div>
            {/* Alternative */}
            <div>
              <div className="px-3 py-2.5 border-b border-black/[0.04]">
                <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#0d9488' }}>{alt.brand}</p>
              </div>
              {[
                { name: 'Azelaic Acid', ok: true },
                { name: 'Glycerin', ok: true },
                { name: 'Isoceteth-20', ok: true },
                { name: 'Dimethicone', ok: false },
              ].map(ing => (
                <div key={ing.name} className="flex items-center gap-2 px-3 py-2 border-b border-black/[0.03]">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: ing.ok ? '#0d9488' : '#ef4444' }} />
                  <span className="text-[11px] text-[#374151]">{ing.name}</span>
                </div>
              ))}
              <div className="px-3 py-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#0d9488]" />
                <span className="text-[10px] font-semibold text-[#0d9488]">3 fewer flagged ingredients</span>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
