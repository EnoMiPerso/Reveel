import { useEffect, useRef } from 'react';
import BottomNav from './BottomNav';
import type { Screen } from '../types';

interface Props {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  onBack?: () => void;
  children: React.ReactNode;
  showBack?: boolean;
  title?: string;
  animKey: number;
  headerRight?: React.ReactNode;
}

export default function AppShell({ screen, onNavigate, onBack, children, showBack, title, animKey, headerRight }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [animKey]);

  return (
    <div className="fixed inset-0 flex items-start justify-center" style={{ background: 'linear-gradient(168deg, #f7f5f2 0%, #f3f1f9 55%, #f0eff6 100%)' }}>
      <div className="relative w-full max-w-[430px] h-full overflow-hidden">

        {/* ── Ambient light blobs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          {/* Violet — top right */}
          <div className="absolute rounded-full" style={{
            width: 340, height: 320, top: -90, right: -70,
            background: 'rgba(167, 139, 250, 0.22)',
            filter: 'blur(90px)',
          }} />
          {/* Cyan — mid left */}
          <div className="absolute rounded-full" style={{
            width: 260, height: 210, top: '36%', left: -80,
            background: 'rgba(103, 232, 249, 0.15)',
            filter: 'blur(80px)',
          }} />
          {/* Pink — bottom right */}
          <div className="absolute rounded-full" style={{
            width: 300, height: 260, bottom: 60, right: -80,
            background: 'rgba(249, 168, 212, 0.16)',
            filter: 'blur(80px)',
          }} />
          {/* Mint — top left */}
          <div className="absolute rounded-full" style={{
            width: 200, height: 200, top: 40, left: -50,
            background: 'rgba(74, 222, 128, 0.10)',
            filter: 'blur(70px)',
          }} />
          {/* Deep violet — center bottom */}
          <div className="absolute rounded-full" style={{
            width: 180, height: 160, top: '60%', right: 10,
            background: 'rgba(124, 110, 208, 0.09)',
            filter: 'blur(60px)',
          }} />
        </div>

        {/* ── Sub-screen header ── */}
        {(showBack || title) && (
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-3 px-4 pt-12 pb-3"
            style={{
              background: 'rgba(245, 243, 240, 0.78)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.6)',
            }}
          >
            {showBack && onBack && (
              <button onClick={onBack}
                className="w-8 h-8 rounded-full flex items-center justify-center tap-scale"
                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            )}
            {title && <span className="text-sm font-bold text-[#111827] flex-1">{title}</span>}
            {headerRight && <div className="ml-auto">{headerRight}</div>}
          </div>
        )}

        {/* ── Scrollable content ── */}
        <div
          ref={scrollRef}
          key={animKey}
          className="absolute inset-0 overflow-y-auto screen-enter"
          style={{
            zIndex: 1,
            paddingTop: showBack || title ? 108 : 0,
            paddingBottom: 96,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>

        {/* ── Bottom nav ── */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5" style={{ zIndex: 20 }}>
          <BottomNav active={screen} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
