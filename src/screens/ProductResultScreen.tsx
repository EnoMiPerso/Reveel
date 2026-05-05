import React, { useState, useRef } from 'react';
import { scannedProduct, productIngredients, retailers, betterProducts, betterIngredients } from '../mockData/products';
import PrismIcon from '../components/PrismIcon';
import ProductThumb from '../components/ProductThumb';
import type { Screen } from '../types';
import { scoreColor, scoreVerdict } from '../utils/score';
import { getIngredientIcon } from '../utils/ingredientIcon';

export interface AltContext { reason: string; pct: number; comparedTo: string; altName?: string; altBrand?: string; altPrice?: number; altScore?: number; altStore?: string; altId?: string; }
interface Props { onNavigate: (s: Screen) => void; fav?: boolean; onFav?: () => void; onScoreDetail?: (id: string) => void; betterCtx?: AltContext; onAlt?: (ctx: AltContext) => void; fromScan?: boolean; }

export const alternatives = [
  { name: 'Niacinamide 5% Serum',  brand: 'CeraVe',         price: 16.99, score: 9.0, tag: 'goals',  saving: 'Matches your goals',      pct: 45, store: 'Lookfantastic',    altId: 'cerave-niacinamide',        reason: 'Better match for your skin goals — clearer skin & hydration with a gentler formula.' },
  { name: 'Hydra Bright Booster',  brand: "Kiehl's",         price: 42,    score: 8.8, tag: 'goals',  saving: 'Brightening + hydration', pct: 38, store: 'Sephora',          altId: 'kiehls-hydra',              reason: 'Stronger brightening actives, better suited for your goal of an even skin tone.' },
  { name: 'Azelaic Acid 10%',      brand: 'The Ordinary',    price: 8.50,  score: 9.1, tag: 'price',  saving: '€7 cheaper',              pct: 55, store: 'Lookfantastic',    altId: 'ordinary-azelaic',          reason: 'Same efficacy, €7 cheaper per bottle — saves you ~€84/year if used daily.' },
  { name: 'Niacinamide Booster',   brand: "Paula's Choice",  price: 38,    score: 8.8, tag: 'clean',  saving: 'Cleaner formula',         pct: 40, store: "Paula's Choice",   altId: 'paulas-choice-niacinamide', reason: 'No fragrance mix, no silicones — 4 fewer flagged ingredients than this product.' },
  { name: 'Centella Toner',        brand: 'COSRX',           price: 11.5,  score: 8.5, tag: 'planet', saving: 'Lower CO₂',               pct: 33, store: 'YesStyle',         altId: 'cosrx-centella',            reason: 'Locally sourced ingredients, recyclable packaging — 33% lower carbon footprint.' },
];





function SmarterOptions({ onAlt, currency, comparedTo }: { onAlt: (ctx: AltContext) => void; currency: string; comparedTo: string }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = [
    { id: 'all',    label: 'All' },
    { id: 'goals',  label: '✦ Your goals' },
    { id: 'price',  label: '💸 Best price' },
    { id: 'clean',  label: '🌿 Clean' },
    { id: 'planet', label: '🌍 Planet' },
  ];
  const shown = (activeFilter === 'all' ? alternatives : alternatives.filter(a => a.tag === activeFilter))
    .slice().sort((a, b) => b.pct - a.pct);

  // How many top items to highlight
  const highlightCount = shown.length >= 5 ? 3 : shown.length >= 4 ? 2 : shown.length >= 2 ? 1 : 0;

  // Purple tiers: rank 0 = darkest, rank 2 = lightest
  const rankStyles = [
    { bg: 'rgba(59,14,140,0.13)',  color: '#3b0e8c', label: '#1' },
    { bg: 'rgba(91,53,168,0.11)',  color: '#5b35a8', label: '#2' },
    { bg: 'rgba(139,110,208,0.10)', color: '#7c6ed0', label: '#3' },
  ];

  return (
    <div id="smarter-options" className="px-4">
      <p className="text-[14px] font-bold text-[#111827] mb-3">Smarter options</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {filters.map(f => (
          <button key={f.id} onClick={() => setActiveFilter(f.id)}
            className="shrink-0 tap-scale px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all"
            style={activeFilter === f.id
              ? { background: 'linear-gradient(145deg,#9b8ee0,#5b4fb0)', color: '#fff', boxShadow: '0 2px 8px rgba(124,110,208,0.25)' }
              : f.id === 'goals'
              ? { background: 'rgba(124,110,208,0.09)', color: '#7c6ed0', border: '1px solid rgba(124,110,208,0.20)' }
              : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="gc overflow-hidden">
        {shown.map((alt, i) => {
          const isTop = i < highlightCount;
          const rs = isTop ? rankStyles[i] : null;
          return (
            <button key={alt.name} onClick={() => onAlt({ reason: alt.reason, pct: alt.pct, comparedTo, altName: alt.name, altBrand: alt.brand, altPrice: alt.price, altScore: alt.score, altStore: alt.store, altId: alt.altId })}
              className={`w-full flex items-center gap-3 px-4 py-3 tap-scale text-left relative overflow-hidden ${i < shown.length - 1 ? 'border-b border-black/[0.04]' : ''}`}
              style={{}}>  
              {/* Shimmer sweep for top items */}
              {isTop && (
                <span className="absolute pointer-events-none" style={{
                  top: 0, left: '-70%', width: '35%', height: '100%',
                  background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.15) 54%, transparent 100%)',
                  animation: `rankShimmer ${9 + i * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 1.2}s`,
                }} />
              )}
              <ProductThumb size={40} radius={12} type="skincare" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  {isTop && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: rs!.color, color: '#fff' }}>{rs!.label}</span>
                  )}
                  <span className="text-[10px] font-semibold"
                    style={{ color: isTop ? rs!.color : '#111827' }}>{alt.pct}% better</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={isTop
                      ? { background: rs!.bg, color: rs!.color, border: `1px solid ${rs!.color}30` }
                      : { background: 'rgba(0,0,0,0.06)', color: '#6b7280' }}>
                    {alt.saving}
                  </span>
                </div>
                <p className="text-[12px] font-semibold text-[#111827] truncate">{alt.name}</p>
                <p className="text-[10px] text-[#9ca3af]">{alt.brand}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-baseline gap-0.5 justify-end">
                  <span className="text-[14px] font-bold text-[#111827]">{alt.score}</span>
                  <span className="text-[9px] text-[#c4c4cc]">/10</span>
                </div>
                <p className="text-[10px] text-[#9ca3af] mt-0.5">{currency}{alt.price}</p>
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const mockReviews = [
  { id: 'r1', user: 'Sophie M.',  avatar: 'S', rating: 4, time: '2 days ago',  text: 'Good daily serum but stings slightly if I layer it with Vitamin C. Will keep using.' },
  { id: 'r2', user: 'Tomas L.',   avatar: 'T', rating: 5, time: '1 week ago',  text: 'Visibly reduced pores after 3 weeks. Lightweight, no residue.' },
  { id: 'r3', user: 'Amara N.',   avatar: 'A', rating: 3, time: '2 weeks ago', text: 'Works ok. Fragrance Mix I is a concern for me — wish The Ordinary removed it.' },
];

function Stars({ value, size = 12 }: { value: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= value ? '#f59e0b' : 'none'}
          stroke={i <= value ? '#f59e0b' : '#d1d5db'}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

function CommunitySection() {
  const [myRating, setMyRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const avgRating = 4.0;

  function submit() {
    if (!myRating) return;
    setSubmitted(true);
    setShowForm(false);
    setComment('');
  }

  return (
    <div className="px-4">
      <p className="text-[14px] font-bold text-[#111827] mb-3">Community</p>

      {/* Single unified card */}
      <div className="gc overflow-hidden">
        {/* Avg rating row */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-black/[0.04]">
          <div className="flex items-center gap-3">
            <p className="text-[32px] font-bold text-[#111827] leading-none">{avgRating.toFixed(1)}</p>
            <div>
              <Stars value={Math.round(avgRating)} size={12} />
              <p className="text-[10px] text-[#9ca3af] mt-0.5">{mockReviews.length + (submitted ? 1 : 0)} reviews</p>
            </div>
          </div>
          <button
            onClick={() => { setShowForm(v => !v); setTimeout(() => inputRef.current?.focus(), 100); }}
            className="tap-scale gc-sm px-3 py-1.5 text-[11px] font-semibold text-[#7c6ed0]">
            + Rate &amp; review
          </button>
        </div>

        {/* Write review form */}
        {showForm && (
          <div className="px-4 py-4 border-b border-black/[0.04] fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
            <p className="text-[12px] font-semibold text-[#374151] mb-2.5">Your rating</p>
            <div className="flex gap-2 mb-3">
              {[1,2,3,4,5].map(i => (
                <button key={i} onClick={() => setMyRating(i)}
                  className="tap-scale w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={i <= myRating
                    ? { background: 'linear-gradient(145deg,#fbbf24,#f59e0b)', boxShadow: '0 2px 8px rgba(245,158,11,0.30)' }
                    : { background: 'rgba(0,0,0,0.05)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24"
                    fill={i <= myRating ? '#fff' : 'none'}
                    stroke={i <= myRating ? '#fff' : '#d1d5db'}
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
              ))}
            </div>
            <textarea ref={inputRef} value={comment} onChange={e => setComment(e.target.value)}
              placeholder="Share your experience (optional)…" rows={2}
              className="w-full gc-sm px-3 py-2 text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none resize-none bg-transparent rounded-xl" />
            <button onClick={submit} disabled={!myRating}
              className="tap-scale mt-2.5 w-full py-2.5 rounded-xl text-white font-semibold text-[13px] btn-glow disabled:opacity-40"
              style={{ background: 'linear-gradient(145deg,#9b8ee0,#5b4fb0)' }}>
              Submit review
            </button>
          </div>
        )}

        {submitted && (
          <div className="px-4 py-3 flex items-center gap-2.5 border-b border-black/[0.04] fade-up" style={{ '--delay': '0ms', background: 'rgba(196,181,253,0.08)' } as React.CSSProperties}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <p className="text-[11px] text-[#7c6ed0] font-semibold">Thanks! You earned <strong>+25 impact points</strong>.</p>
          </div>
        )}

        {/* Reviews */}
        {mockReviews.map((r, i) => (
          <div key={r.id} className={`px-4 py-3.5 ${i < mockReviews.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                style={{ background: 'linear-gradient(145deg,#a78bfa,#7c6ed0)' }}>
                {r.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#111827]">{r.user}</span>
                  <span className="text-[10px] text-[#c4c4cc]">{r.time}</span>
                </div>
                <Stars value={r.rating} size={11} />
              </div>
            </div>
            <p className="text-[12px] text-[#6b7280] leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



const statusTag: Record<string, { label: string; color: string; bg: string }> = {
  good:     { label: 'Good',      color: '#0d9488', bg: '#ccfbf1' },
  watchout: { label: 'Watch out', color: '#e07b2c', bg: '#fff3e0' },
  avoid:    { label: 'Avoid',     color: '#dc2626', bg: '#fee2e2' },
};

const statusIcon: Record<string, string> = {
  good:     '#0d9488',
  watchout: '#e07b2c',
  avoid:    '#dc2626',
};




export default function ProductResultScreen({ onNavigate, fav = false, onFav, onScoreDetail, betterCtx: betterCtxProp, onAlt, fromScan }: Props) {
  const [betterCtx, setBetterCtx] = useState<AltContext | null>(betterCtxProp ?? null);
  const [scanBanner, setScanBanner] = useState(fromScan ?? false);

  const p = (betterCtx?.altId && betterProducts[betterCtx.altId]) ? betterProducts[betterCtx.altId] : scannedProduct;
  const activeIngredients = (betterCtx?.altId && betterIngredients[betterCtx.altId]) ? betterIngredients[betterCtx.altId] : betterIngredients['default'] ?? productIngredients;

  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const v = scoreVerdict(p.scores.overall);

  const highlightedIngredients = activeIngredients.filter((i) => i.highlight);
  const displayIngredients = showAllIngredients ? activeIngredients : highlightedIngredients;

  const subScores = [
    {
      id: 'foryou', label: 'Your goals', score: p.scores.forYou, color: '#7c6ed0',
      iconBg: 'rgba(196,181,253,0.22)',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c0 0-8-4.5-8-11.8C4 5.9 7.6 3 12 3s8 2.9 8 7.2C20 17.5 12 22 12 22z"/></svg>,
      verdict: scoreVerdict(p.scores.forYou).label,
    },
    {
      id: 'planet', label: 'Planet', score: p.scores.planet, color: '#0d9488',
      iconBg: 'rgba(94,234,212,0.20)',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      verdict: scoreVerdict(p.scores.planet).label,
    },
    {
      id: 'price', label: 'Price', score: p.scores.value, color: '#2563eb',
      iconBg: 'rgba(147,197,253,0.22)',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
      verdict: scoreVerdict(p.scores.value).label,
    },
    {
      id: 'routine', label: 'Routine fit', score: p.scores.routineFit, color: '#be185d',
      iconBg: 'rgba(249,168,212,0.22)',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
      verdict: scoreVerdict(p.scores.routineFit).label,
    },
  ];

  return (
    <div className="pb-6 flex flex-col gap-4">

      {/* ── "Not the right product?" scan banner ── */}
      {scanBanner && (
        <div className="mx-4 mt-6 flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl fade-up"
          style={{ background: 'rgba(124,110,208,0.07)', border: '1px solid rgba(124,110,208,0.15)', '--delay': '0ms' } as React.CSSProperties}>
          <span className="text-[12px] font-medium text-[#374151]">Not the right product?</span>
          <button onClick={() => { setScanBanner(false); onNavigate('scan'); }}
            className="tap-scale text-[12px] font-bold text-[#7c6ed0] ml-auto">
            Scan again →
          </button>
        </div>
      )}

      {/* ── Banner + Hero grouped ── */}
      <div className="flex flex-col gap-4">

      {betterCtx && (
        <div className="mx-4 flex flex-col gap-2 fade-up">
          {/* Why it's better */}
          <div className="gc rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.80)', background: 'rgba(240,253,250,0.55)', boxShadow: '0 2px 12px rgba(13,148,136,0.08), inset 0 1px 0 rgba(255,255,255,0.90)' }}>
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#0d9488] mb-0.5">
                  {betterCtx.pct}% better than "{betterCtx.comparedTo}" — here's why
                </p>
                <p className="text-[11px] text-[#374151] leading-snug">{betterCtx.reason}</p>
              </div>
              <button onClick={() => setBetterCtx(null)} className="shrink-0 text-[#9ca3af] tap-scale ml-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <button onClick={() => onNavigate('comparison')}
              className="tap-scale w-full flex items-center justify-between px-4 py-2.5 border-t"
              style={{ borderColor: 'rgba(13,148,136,0.20)', background: 'linear-gradient(90deg, rgba(13,148,136,0.10), rgba(13,148,136,0.06))' }}>
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                <span className="text-[11px] font-bold text-[#0d9488]">Comparison details</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

        </div>
      )}

      {/* ── Product hero card ── */}
      <div className="px-4">
        <div className="relative overflow-hidden"
          style={{
            borderRadius: 28,
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.90)',
            boxShadow: '0 0 0 4px rgba(167,139,250,0.06), 0 8px 36px rgba(124,110,208,0.10), inset 0 1px 0 rgba(255,255,255,1)',
          }}>
          {/* Pearl shimmer */}
          <span className="absolute pointer-events-none" style={{
            inset: '-80%',
            background: 'conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(220,210,255,0.28) 40deg, rgba(200,240,255,0.20) 80deg, rgba(210,255,230,0.16) 130deg, rgba(255,240,200,0.14) 180deg, rgba(255,210,230,0.18) 230deg, rgba(220,210,255,0.26) 290deg, rgba(255,255,255,0) 360deg)',
            animation: 'kpiPearl 12s linear infinite',
            borderRadius: '50%',
          }} />
          <span className="absolute pointer-events-none" style={{
            top: '-20%', left: '-60%', width: '40%', height: '160%',
            background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.22) 54%, transparent 100%)',
            animation: 'kpiGlint 8s ease-in-out infinite',
          }} />

          {/* Top: photo + info */}
          <div className="flex items-center gap-4 p-5 pb-4 relative z-10">
            <ProductThumb image={p.image} size={112} radius={24} type="skincare" />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[16px] font-bold text-[#111827] leading-tight">{p.brand}</p>
                  <p className="text-[13px] text-[#6b7280] mt-0.5 leading-snug">{p.name}</p>
                </div>
                {/* Heart fav button */}
                <button onClick={onFav}
                  className="tap-scale w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center transition-all"
                  style={{ background: fav ? 'rgba(244,114,182,0.14)' : 'rgba(0,0,0,0.05)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24"
                    fill={fav ? '#f472b6' : 'none'}
                    stroke={fav ? '#f472b6' : '#9ca3af'}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <p className="text-[15px] font-bold text-[#111827] mt-1.5">{p.currency}{p.price} <span className="text-[11px] font-normal text-[#9ca3af]">online avg.</span></p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <span className="gc-sm text-[11px] font-medium text-[#374151] px-2.5 py-1">{p.category}</span>
                {p.tags.map((t) => (
                  <span key={t} className="gc-sm text-[11px] font-medium text-[#374151] px-2.5 py-1">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Score strip inside card ── */}
          <div className="relative z-10 border-t px-5 pt-4 pb-4 flex items-center gap-4" style={{ borderColor: 'rgba(167,139,250,0.14)' }}>
            {/* Ring gauge */}
            <div className="relative w-[80px] h-[80px] shrink-0">
              <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6"/>
                <circle cx="40" cy="40" r="32" fill="none"
                  stroke="url(#scoreGradRing)" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${(p.scores.overall / 10) * 201} 201`}
                  style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' }}/>
                <defs>
                  <linearGradient id="scoreGradRing" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={v.color + 'aa'}/>
                    <stop offset="100%" stopColor={v.color}/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[22px] font-black text-[#111827] leading-none">{p.scores.overall}</span>
                <span className="text-[9px] text-[#9ca3af]">/10</span>
              </div>
            </div>

            {/* Right: label + verdict + description + thumb */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wide mb-1">Overall score</p>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: v.color + '18', color: v.color }}>
                  {v.label}
                </span>
              </div>
              <p className="text-[11px] text-[#6b7280] leading-snug mb-2">
                {p.scores.overall >= 7
                  ? 'Great pick for your skin goals and the planet.'
                  : p.scores.overall >= 4.5
                  ? "It's ok, but you can find better."
                  : 'We recommend skipping this — better options exist.'}
              </p>
              {/* Thumb / CTA */}
              {p.scores.overall >= 7 ? (
                <div className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0d9488" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
                  </svg>
                  <span className="text-[10px] font-bold text-[#0d9488]">Recommended for you</span>
                </div>
              ) : (
                <button
                  onClick={() => { const el = document.getElementById('smarter-options'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="tap-scale flex items-center gap-1 text-[11px] font-semibold text-[#7c6ed0]">
                  See smarter options
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              )}
            </div>
          </div>
          {/* ── Top smarter option strip (original product view) ── */}
          {!betterCtx && (() => {
            const top = [...alternatives].sort((a, b) => b.pct - a.pct)[0];
            const topProduct = betterProducts[top.altId];
            return (
              <div className="relative z-10 border-t flex items-center justify-between px-5 py-3"
                style={{ borderColor: 'rgba(124,110,208,0.15)', background: 'rgba(124,110,208,0.05)' }}>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[9px] font-bold mb-1">
                    <span style={{ color: '#7c6ed0' }}>#1 smarter option</span>
                    <span className="text-[#9ca3af] font-normal"> · {top.brand}</span>
                    <span className="text-[#111827] font-bold"> · €{top.price.toFixed(2)}</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6b7280]">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      {top.pct}% better
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6b7280]">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/></svg>
                      {topProduct?.impact.co2.value ?? '0.5 kg'} CO₂
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6b7280]">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      {scannedProduct.price - top.price > 0 ? `€${(scannedProduct.price - top.price).toFixed(2)} cheaper` : top.saving}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('smarter-options');
                    if (!el) return;
                    const container = el.closest('.overflow-y-auto') as HTMLElement | null;
                    if (container) {
                      const offset = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 12;
                      container.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                  }}
                  className="tap-scale shrink-0 px-4 py-2 rounded-2xl text-[11px] font-semibold"
                  style={{ background: 'rgba(124,110,208,0.10)', color: '#7c6ed0', border: '1px solid rgba(124,110,208,0.22)' }}>
                  View
                </button>
              </div>
            );
          })()}

          {/* ── Buy strip inside hero (recommendation only) ── */}
          {betterCtx && (() => {
            const bestRetailer = retailers.find(r => r.rank === 'top') ?? retailers[0];
            const saving = p.price - bestRetailer.price;
            return (
              <button onClick={() => onNavigate('buy')}
                className="tap-scale w-full relative z-10 border-t flex items-center justify-between px-5 py-3"
                style={{ borderColor: 'rgba(124,110,208,0.15)', background: 'rgba(124,110,208,0.05)' }}>
                <div className="text-left">
                  <p className="text-[9px] font-bold mb-1">
                    <span style={{ color: '#7c6ed0' }}>Best pick</span>
                    <span className="text-[#9ca3af] font-normal"> · {bestRetailer.name}</span>
                    <span className="text-[#111827] font-bold"> · €{bestRetailer.price.toFixed(2)}</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6b7280]">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/></svg>
                      0.6 kg CO₂ saved
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6b7280]">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      {saving > 0 ? `€${saving.toFixed(2)} saved` : 'Best value'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6b7280]">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      +50 pts
                    </span>
                  </div>
                </div>
                <span className="shrink-0 px-4 py-2 rounded-2xl text-[12px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#5b4fb0,#7c6ed0)', boxShadow: '0 3px 10px rgba(124,110,208,0.40)' }}>
                  Buy
                </span>
              </button>
            );
          })()}

        </div>
      </div>
      </div>{/* end banner+hero group */}

      {/* ── All scores: Your objectives · Planet · Price · Routine fit ── */}
      <div className="px-4">
        <div className="gc overflow-hidden">
          {subScores.map((s, i) => {
            const pct = Math.round((s.score / 10) * 100);
            const barColor = scoreColor(s.score);
            return (
              <button key={s.id}
                onClick={() => onScoreDetail?.(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 tap-scale text-left ${i < subScores.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: s.iconBg }}>
                  {s.icon}
                </div>
                <span className="text-[12px] font-medium text-[#374151] w-20 shrink-0">{s.label}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(to right,${barColor}60,${barColor})` }} />
                </div>
                <div className="flex items-baseline gap-0.5 shrink-0 ml-2">
                  <span className="text-[14px] font-bold text-[#111827]">{s.score}</span>
                  <span className="text-[9px] text-[#c4c4cc]">/10</span>
                </div>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {!betterCtx && <SmarterOptions currency={p.currency} onAlt={onAlt ?? (() => {})} comparedTo={`${p.brand} ${p.name}`} />}

      {/* ── Where to buy ── */}
      <div className="px-4">
        <p className="text-[14px] font-bold text-[#111827] mb-3">Where to buy</p>
        <div className="gc overflow-hidden">
          {retailers.map((r, i) => (
            <button key={r.id}
              onClick={() => r.inStock && onNavigate('buy')}
              className={`tap-scale w-full flex items-center gap-3 px-4 py-3 text-left ${i < retailers.length - 1 ? 'border-b border-black/[0.04]' : ''}`}
              style={{ opacity: r.inStock ? 1 : 0.45 }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0"
                style={{ background: r.bg, color: r.color }}>
                {r.letter}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-[#111827]">{r.name}</span>
                  {r.rank === 'top' && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(13,148,136,0.10)', color: '#0d9488' }}>Best pick</span>}
                  {!r.inStock && <span className="text-[9px] text-[#9ca3af]">Out of stock</span>}
                </div>
                <span className="text-[10px] text-[#9ca3af]">{r.delivery} · 🌱 {r.eco}/10</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[14px] font-bold text-[#111827]">{p.currency}{r.price.toFixed(2)}</span>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>


      {/* ── Ingredients analysis ── */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[14px] font-bold text-[#111827]">Ingredients analysis</p>
          <button onClick={() => setShowAllIngredients(v => !v)}
            className="text-[12px] font-semibold text-[#7c6ed0]">
            {showAllIngredients ? 'Show less' : `See all (${activeIngredients.length}) →`}
          </button>
        </div>
        <div className="gc overflow-hidden">
          {displayIngredients.map((ing, i) => (
            <button key={ing.id}
              onClick={() => onNavigate('ingredient-detail')}
              className={`w-full flex items-start gap-3 px-4 py-3.5 tap-scale text-left ${
                i < displayIngredients.length - 1 ? 'border-b border-black/[0.04]' : ''
              }`}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${statusIcon[ing.status]}18` }}>
                {getIngredientIcon(ing.name, statusIcon[ing.status], 14)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#111827] leading-tight">{ing.name}</p>
                <p className="text-[11px] text-[#9ca3af] mt-0.5">{ing.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: statusTag[ing.status].color, background: statusTag[ing.status].bg }}>
                  {statusTag[ing.status].label}
                </span>
                <span className="text-[9px] text-[#c4b8f0]">Tap to learn more →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Community ratings & reviews ── */}
      <CommunitySection />

      {/* ── Reveel Insight — bottom ── */}
      <div className="px-4">
        <div className="gc-dark rounded-3xl px-5 py-4 irid-sweep">
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span className="text-[12px] font-semibold text-[#a78bfa]">Reveel insight</span>
              </div>
              <p className="text-[14px] font-semibold text-white leading-snug">{p.insight}</p>
            </div>
            <div className="shrink-0 mt-1 opacity-80"><PrismIcon size={44} variant="light" /></div>
          </div>
        </div>
      </div>



    </div>
  );
}
