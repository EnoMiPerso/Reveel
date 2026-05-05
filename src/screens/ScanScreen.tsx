import { useState } from 'react';
import type { Screen } from '../types';
import PrismIcon from '../components/PrismIcon';

interface Props { onNavigate: (s: Screen) => void; }

/** Glass prism floating in the dark scan frame */
function ScanPrism({ scanning, found }: { scanning: boolean; found: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Drifting spectrum blobs behind the prism (darker, for dark bg) */}
      <div className="absolute rounded-full orb-blob" style={{ width: 180, height: 180, background: 'rgba(167,139,250,0.20)', filter: 'blur(40px)', animation: 'blobDrift1 9s ease-in-out infinite' }} />
      <div className="absolute rounded-full orb-blob" style={{ width: 150, height: 150, background: 'rgba(103,232,249,0.16)', filter: 'blur(36px)', animation: 'blobDrift2 11s ease-in-out infinite' }} />
      <div className="absolute rounded-full orb-blob" style={{ width: 120, height: 120, background: 'rgba(74,222,128,0.14)',  filter: 'blur(32px)', animation: 'blobDrift3 13s ease-in-out infinite' }} />
      <div className="absolute rounded-full orb-blob" style={{ width: 110, height: 110, background: 'rgba(249,168,212,0.14)', filter: 'blur(30px)', animation: 'blobDrift4 10s ease-in-out infinite' }} />

      {/* Prism illustration — large, animated */}
      <div
        className="relative z-10"
        style={{
          filter: found
            ? 'drop-shadow(0 0 28px rgba(74,222,128,0.60)) drop-shadow(0 6px 18px rgba(0,0,0,0.35))'
            : scanning
            ? 'drop-shadow(0 0 24px rgba(167,139,250,0.55)) drop-shadow(0 6px 18px rgba(0,0,0,0.35))'
            : 'drop-shadow(0 0 18px rgba(167,139,250,0.38)) drop-shadow(0 6px 16px rgba(0,0,0,0.30))',
        }}
      >
        <PrismIcon size={110} variant="default" />
      </div>
    </div>
  );
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rot: Record<string, number> = { tl: 0, tr: 90, bl: -90, br: 180 };
  const position: Record<string, React.CSSProperties> = {
    tl: { top: 20, left: 20 }, tr: { top: 20, right: 20 },
    bl: { bottom: 20, left: 20 }, br: { bottom: 20, right: 20 },
  };
  return (
    <div className="absolute corner-glow" style={{ ...position[pos], transform: `rotate(${rot[pos]}deg)` }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id={`cg-${pos}`} x1="3" y1="28" x2="28" y2="3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67e8f9" />
            <stop offset="0.5" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        <path d="M3 28 L3 3 L28 3" stroke={`url(#cg-${pos})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function ScanScreen({ onNavigate }: Props) {
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState(false);

  const simulate = () => {
    setScanning(true);
    setTimeout(() => setFound(true), 1500);
    setTimeout(() => { setScanning(false); setFound(false); onNavigate('product-result'); }, 2300);
  };

  return (
    <div className="px-4 pt-12 pb-4 flex flex-col gap-4">

      {/* Header */}
      <div className="pt-2 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
        <h2 className="text-2xl font-bold text-[#111827] tracking-tight">Scan any product</h2>
        <p className="text-sm text-[#6b7280] mt-1">We'll reveal what's actually inside.</p>
      </div>

      {/* ── Dark prism viewfinder ── */}
      <div
        className="relative w-full rounded-[32px] overflow-hidden scan-frame-glow fade-up"
        style={{
          aspectRatio: '3/4',
          background: 'linear-gradient(170deg, #0c0818 0%, #0a1214 45%, #0d0a20 100%)',
          '--delay': '60ms',
        } as React.CSSProperties}
      >
        {/* Ambient prismatic atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 240, height: 200, top: -60, right: -60, background: 'rgba(167,139,250,0.14)', filter: 'blur(60px)' }} />
          <div className="absolute rounded-full" style={{ width: 180, height: 160, bottom: -30, left: -50, background: 'rgba(103,232,249,0.12)', filter: 'blur(55px)' }} />
          <div className="absolute rounded-full" style={{ width: 140, height: 120, top: '45%', right: -20, background: 'rgba(74,222,128,0.09)', filter: 'blur(45px)' }} />
        </div>

        {/* Status pill */}
        <div className="absolute top-6 left-0 right-0 flex justify-center z-10">
          {!scanning && (
            <span className="text-white/50 text-[12px] font-medium px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)' }}>
              Point at any product or barcode
            </span>
          )}
          {scanning && !found && (
            <span className="text-[#a78bfa] text-[12px] font-semibold px-4 py-1.5 rounded-full flex items-center gap-2" style={{ background: 'rgba(167,139,250,0.10)', backdropFilter: 'blur(12px)', border: '1px solid rgba(167,139,250,0.22)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] inline-block animate-pulse" />
              Revealing formula…
            </span>
          )}
          {found && (
            <span className="text-[#2dd4bf] text-[12px] font-semibold px-4 py-1.5 rounded-full flex items-center gap-2" style={{ background: 'rgba(74,222,128,0.10)', backdropFilter: 'blur(12px)', border: '1px solid rgba(74,222,128,0.25)' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Truth revealed
            </span>
          )}
        </div>

        {/* Central prism + aura */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanPrism scanning={scanning} found={found} />
        </div>

        {/* Corner brackets */}
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

        {/* Prism scan line — the "beam" sweeping through */}
        {scanning && !found && (
          <div
            className="absolute left-8 right-8 prism-scan-line"
            style={{
              height: 2, top: '4%',
              background: 'linear-gradient(to right, transparent 0%, #a78bfa 25%, #67e8f9 50%, #2dd4bf 75%, transparent 100%)',
              boxShadow: '0 0 14px rgba(167,139,250,0.85), 0 0 28px rgba(103,232,249,0.45)',
            }}
          />
        )}

        {/* Found pulse ring */}
        {found && (
          <div
            className="absolute inset-4 rounded-3xl border-2 animate-pulse"
            style={{ borderColor: 'rgba(74,222,128,0.7)', boxShadow: '0 0 28px rgba(74,222,128,0.30), inset 0 0 28px rgba(74,222,128,0.04)' }}
          />
        )}

        {/* Bottom tagline */}
        <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1">
          <span className="text-white/22 text-[11px] font-medium tracking-wider">Input: scan · Output: truth</span>
        </div>
      </div>

      {/* ── Primary scan CTA ── */}
      <button
        onClick={simulate}
        disabled={scanning}
        className="tap-scale w-full py-4 rounded-2xl text-white font-bold text-[15px] disabled:opacity-50 btn-glow flex items-center justify-center gap-2.5 fade-up"
        style={{ background: 'linear-gradient(145deg, #9b8ee0 0%, #5b4fb0 100%)', '--delay': '130ms' } as React.CSSProperties}
      >
        <PrismIcon size={16} variant="light" />
        {scanning ? 'Identifying product…' : 'Scan product'}
      </button>

      {/* ── Secondary action cards ── */}
      <div className="grid grid-cols-2 gap-3 fade-up" style={{ '--delay': '180ms' } as React.CSSProperties}>

        {/* Send a picture */}
        <label className="gc tap-scale cursor-pointer flex flex-col items-center justify-center gap-3 py-6 text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.20)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="#7c6ed0" stroke="none"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#111827] leading-tight">Send a picture</p>
            <p className="text-[11px] text-[#9ca3af] mt-0.5">From your gallery</p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={() => simulate()} />
        </label>

        {/* Search a product */}
        <button
          onClick={() => onNavigate('discover')}
          className="gc tap-scale flex flex-col items-center justify-center gap-3 py-6 text-center"
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(103,232,249,0.10)', border: '1px solid rgba(103,232,249,0.22)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#111827] leading-tight">Search product</p>
            <p className="text-[11px] text-[#9ca3af] mt-0.5">By name or brand</p>
          </div>
        </button>

      </div>
    </div>
  );
}
