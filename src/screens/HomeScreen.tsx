import React, { useState } from 'react';
import type { Screen } from '../types';
import PrismIcon from '../components/PrismIcon';
import ProductThumb from '../components/ProductThumb';
import { scoreColor, scoreVerdict } from '../utils/score';

interface Props { onNavigate: (s: Screen) => void; }

const USER_NAME    = 'Alex';
const POINTS       = 345;
const POINTS_TARGET = 500;
const SCANS_DONE   = 23;
const SCANS_TARGET = 30;
const FEEDBACK_LEFT = 8;
const SCANS_MONTH  = 14;

// Weekly scan counts — last 8 weeks
const SCAN_HISTORY = [4, 7, 5, 9, 6, 11, 8, 14];
const WEEK_LABELS  = ['W1','W2','W3','W4','W5','W6','W7','W8'];

const kpis = [
  {
    id: 'reviewed', value: '18', label: 'Reviewed', sub: 'products', color: '#7c6ed0',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    id: 'bought', value: '8', label: 'Smart buys', sub: 'good-rated bought', color: '#f59e0b',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  },
  {
    id: 'saved', value: '€318', label: 'Saved', sub: 'vs. retail', color: '#0d9488',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
];

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=120&h=120&fit=crop&auto=format&q=80`;
const recentScans = [
  { id: 'r1', brand: 'CeraVe',       name: 'Hydrating Cleanser',        score: 8.5, image: U('1556228453-efd6c1ff04f6'),    type: 'skincare' as const },
  { id: 'r2', brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', score: 6.2, image: U('1620916566398-39f1143ab7be'), type: 'skincare' as const },
  { id: 'r3', brand: 'Rare Beauty',  name: 'Soft Pinch Liquid Blush',   score: 8.3, image: U('1487239177913-0cf0e0e589e8'), type: 'makeup'   as const },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function ScanChart() {
  const [active, setActive] = useState<number | null>(SCAN_HISTORY.length - 1);
  const max  = Math.max(...SCAN_HISTORY);
  const W    = 300;
  const H    = 90;
  const padX = 6;
  const barW = (W - padX * (SCAN_HISTORY.length - 1)) / SCAN_HISTORY.length;

  const cx = (i: number) => i * (barW + padX) + barW / 2;
  const cy = (v: number) => H - (v / max) * (H - 14) - 6;

  // Smooth cubic bezier curve
  const curvePath = SCAN_HISTORY.map((v, i) => {
    const x = cx(i), y = cy(v);
    if (i === 0) return `M ${x} ${y}`;
    const px = cx(i - 1), py = cy(SCAN_HISTORY[i - 1]);
    const cpx = (px + x) / 2;
    return `C ${cpx} ${py} ${cpx} ${y} ${x} ${y}`;
  }).join(' ');

  // Area fill path (close below)
  const areaPath = curvePath + ` L ${cx(SCAN_HISTORY.length - 1)} ${H} L ${cx(0)} ${H} Z`;

  const activeVal = active !== null ? SCAN_HISTORY[active] : null;
  const activeX   = active !== null ? cx(active) : 0;
  const activeY   = active !== null ? cy(SCAN_HISTORY[active]) : 0;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7c6ed0" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#7c6ed0" stopOpacity="0.01"/>
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#0d9488"/>
        </linearGradient>
        <linearGradient id="barActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7c6ed0" stopOpacity="0.90"/>
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.60"/>
        </linearGradient>
        <linearGradient id="barIdle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7c6ed0" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#7c6ed0" stopOpacity="0.05"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Subtle grid lines */}
      {[0.25, 0.5, 0.75, 1].map(t => {
        const y = H - t * (H - 14) - 6;
        return <line key={t} x1="0" y1={y} x2={W} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="3 4"/>;
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGrad)"/>

      {/* Smooth curve */}
      <path d={curvePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Bars */}
      {SCAN_HISTORY.map((v, i) => {
        const bh  = (v / max) * (H - 14);
        const x   = i * (barW + padX);
        const y   = H - bh - 6;
        const sel = active === i;
        return (
          <rect key={i} x={x} y={y} width={barW} height={bh + 6}
            rx="5" fill={sel ? 'url(#barActive)' : 'url(#barIdle)'}
            style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
            onClick={() => setActive(i === active ? null : i)}/>
        );
      })}

      {/* Active indicator line + dot */}
      {active !== null && (
        <>
          <line x1={activeX} y1={activeY + 6} x2={activeX} y2={H}
            stroke="#7c6ed0" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.40"/>
          <circle cx={activeX} cy={activeY} r="5" fill="#7c6ed0" filter="url(#glow)"/>
          <circle cx={activeX} cy={activeY} r="3" fill="white"/>
        </>
      )}

      {/* Tooltip */}
      {activeVal !== null && active !== null && (() => {
        const tx    = Math.min(Math.max(activeX, 22), W - 22);
        const ty    = activeY - 14;
        const label = `${activeVal} scans`;
        return (
          <g>
            <rect x={tx - 24} y={ty - 14} width={48} height={16} rx="6"
              fill="#7c6ed0"/>
            <text x={tx} y={ty - 3} textAnchor="middle"
              fontSize="8.5" fill="white" fontFamily="sans-serif" fontWeight="700">
              {label}
            </text>
          </g>
        );
      })()}

      {/* Week labels */}
      {WEEK_LABELS.map((lbl, i) => (
        <text key={i} x={cx(i)} y={H + 14} textAnchor="middle"
          fontSize="7.5" fill={active === i ? '#7c6ed0' : '#c4c4cc'}
          fontFamily="sans-serif" fontWeight={active === i ? '700' : '400'}
          style={{ cursor: 'pointer' }}
          onClick={() => setActive(i === active ? null : i)}>
          {lbl}
        </text>
      ))}
    </svg>
  );
}

export default function HomeScreen({ onNavigate }: Props) {
  const pointsPct = Math.round((POINTS / POINTS_TARGET) * 100);
  const scansLeft = SCANS_TARGET - SCANS_DONE;
  const totalScans = SCAN_HISTORY.reduce((a, b) => a + b, 0);
  const lastWeek   = SCAN_HISTORY[SCAN_HISTORY.length - 2];
  const thisWeek   = SCAN_HISTORY[SCAN_HISTORY.length - 1];
  const delta      = thisWeek - lastWeek;

  return (
    <div className="relative px-4 pt-14 pb-6 overflow-hidden">

      {/* ── Prismatic background ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '20%',
          width: '220%', height: '60%',
          background: 'linear-gradient(108deg,transparent 0%,rgba(255,210,210,0.09) 12%,rgba(255,240,160,0.07) 24%,rgba(200,255,210,0.07) 38%,rgba(160,225,255,0.09) 53%,rgba(200,170,255,0.09) 68%,rgba(255,170,230,0.07) 82%,transparent 95%)',
          filter: 'blur(50px)', transform: 'rotate(-18deg)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '-20%',
          width: '140%', height: '40%',
          background: 'radial-gradient(ellipse at 70% 50%,rgba(167,139,250,0.08) 0%,rgba(13,148,136,0.05) 50%,transparent 80%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="relative space-y-5" style={{ zIndex: 1 }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <PrismIcon size={30} />
            <span className="font-semibold text-[#111827] text-[17px] tracking-tight">Reveel</span>
          </div>
          <button onClick={() => onNavigate('notifications')}
            className="tap-scale w-10 h-10 gc flex items-center justify-center relative"
            style={{ borderRadius: 14 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
          </button>
        </div>

        {/* ── Greeting ── */}
        <div className="fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
          <p className="text-[13px] text-[#9ca3af] font-medium">{greeting()}, {USER_NAME}.</p>
          <p className="text-[21px] font-bold text-[#111827] leading-snug mt-0.5">
            Scan to reveal what's best for you,<br />the planet and your wallet.
          </p>
        </div>

        {/* ── Scan activity chart ── */}
        <div className="gc px-4 pt-4 pb-3 fade-up" style={{ '--delay': '50ms' } as React.CSSProperties}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[13px] font-bold text-[#111827]">Scan activity</p>
              <p className="text-[10px] text-[#9ca3af] mt-0.5">{totalScans} scans · last 8 weeks</p>
              {delta !== 0 && (
                <p className="text-[10px] font-semibold mt-1" style={{ color: delta > 0 ? '#0d9488' : '#e05c5c' }}>
                  {delta > 0 ? '▲' : '▼'} {Math.abs(delta)} vs last week
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[18px] font-bold text-[#7c6ed0] leading-none">{thisWeek}</p>
                <p className="text-[9px] text-[#9ca3af]">this week</p>
              </div>
              <div className="w-px h-7 bg-black/[0.07]"/>
              <div className="text-right">
                <p className="text-[18px] font-bold text-[#7c6ed0] leading-none">2,848</p>
                <p className="text-[9px] text-[#9ca3af]">since Sep 2023</p>
              </div>
            </div>
          </div>
          <ScanChart />
        </div>

        {/* ── 3 KPI cards ── */}
        <div className="fade-up" style={{ '--delay': '90ms' } as React.CSSProperties}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-bold text-[#111827]">Your impact</p>
            <span className="text-[10px] font-semibold text-[#9ca3af]">All time</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {kpis.map((k) => (
              <div key={k.id} className="gc-kpi px-3 py-3.5 flex flex-col gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: `${k.color}14`, color: k.color }}>
                  {k.icon}
                </div>
                <div>
                  <p className="text-[18px] font-bold leading-none text-[#111827]">{k.value}</p>
                  <p className="text-[10px] font-semibold text-[#374151] mt-0.5">{k.label}</p>
                  <p className="text-[9px] text-[#9ca3af]">{k.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress & rewards ── */}
        <div className="gc p-4 space-y-3 fade-up" style={{ '--delay': '120ms' } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-[#111827]">
                <span style={{ color: '#7c6ed0' }}>{scansLeft} scans</span> to unlock <span style={{ color: '#0d9488' }}>€5 off</span>
              </p>
              <p className="text-[10px] text-[#9ca3af] mt-0.5">
                Expires <span className="font-semibold text-[#d97706]">11 May</span> · keep scanning!
              </p>
            </div>
            <div className="text-right">
              <p className="text-[18px] font-bold text-[#111827]">{POINTS}</p>
              <p className="text-[9px] text-[#9ca3af]">/ {POINTS_TARGET} pts</p>
            </div>
          </div>
          <div>
            <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
              <div className="h-full rounded-full relative overflow-hidden"
                style={{ width: `${pointsPct}%`, background: 'linear-gradient(to right,#a78bfa,#7c6ed0)' }}>
                <span className="absolute inset-0" style={{
                  background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)',
                  animation: 'kpiGlint 2.5s ease-in-out infinite',
                }} />
              </div>
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] text-[#9ca3af]">0</span>
              <span className="text-[9px] font-semibold text-[#7c6ed0]">{pointsPct}%</span>
              <span className="text-[9px] text-[#9ca3af]">{POINTS_TARGET}</span>
            </div>
          </div>
          <div className="border-t border-black/[0.05] pt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-[#111827]">{SCANS_MONTH}</span>
                <span className="text-[10px] text-[#9ca3af]">scans this month</span>
              </div>
              <div className="w-px h-3 bg-black/10" />
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-[#111827]">{FEEDBACK_LEFT}</span>
                <span className="text-[10px] text-[#9ca3af]">feedback left</span>
              </div>
            </div>
            <button onClick={() => onNavigate('transparency')}
              className="tap-scale flex items-center gap-0.5 shrink-0 ml-2">
              <span className="text-[10px] font-semibold text-[#a78bfa]">How?</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Today's insight — white glass ── */}
        <div className="gc px-4 py-4 fade-up" style={{ '--delay': '160ms' } as React.CSSProperties}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(13,148,136,0.10)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-[#0d9488] uppercase tracking-widest mb-1">Today's insight</p>
              <p className="text-[13px] font-semibold text-[#111827] leading-snug">
                Niacinamide pairs poorly with Vitamin C — using them together reduces efficacy.
              </p>
              <button onClick={() => onNavigate('ingredient-detail')}
                className="tap-scale mt-2 text-[11px] font-semibold text-[#7c6ed0] flex items-center gap-1">
                Learn more
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Recent scans ── */}
        <div className="fade-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-[#111827]">Recent scans</span>
            <button onClick={() => onNavigate('scan-history')}
              className="text-[11px] font-semibold text-[#7c6ed0]">See all →</button>
          </div>
          <div className="gc overflow-hidden">
            {recentScans.map((r, i) => {
              const color   = scoreColor(r.score);
              const verdict = scoreVerdict(r.score);
              return (
                <button key={r.id} onClick={() => onNavigate('product-result')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 tap-scale text-left ${
                    i < recentScans.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                  <ProductThumb image={r.image} size={40} radius={12} type={r.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#9ca3af] font-medium">{r.brand}</p>
                    <p className="text-[13px] font-semibold text-[#111827] leading-tight truncate">{r.name}</p>
                    <span className="inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${color}15`, color }}>{verdict.label}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[20px] font-bold" style={{ color }}>{r.score}</span>
                    <span className="text-[10px] text-[#c4c4cc] ml-0.5">/10</span>
                  </div>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
