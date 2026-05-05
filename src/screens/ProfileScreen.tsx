import React, { useState } from 'react';
import { userProfile } from '../mockData/profile';
import { rewardsData } from '../mockData/rewards';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

function contributorLevel(pts: number) {
  if (pts >= 500) return 'Senior Investigator';
  if (pts >= 200) return 'Marketing Detective';
  if (pts >= 50)  return 'Truth Contributor';
  return           'New Investigator';
}

const menuItems = [
  { label: 'My Skin Profile',  screen: 'skin-goals' as Screen },
  { label: 'Account Settings', screen: null },
  { label: 'Notifications',    screen: null },
  { label: 'Help Center',      screen: null },
  { label: 'About Reveel',     screen: 'transparency' as Screen },
];

export default function ProfileScreen({ onNavigate }: Props) {
  const p = userProfile;
  const r = rewardsData;
  const [tab, setTab] = useState<'profile' | 'rewards'>('profile');

  return (
    <div className="px-4 pt-14 pb-4 space-y-3">

      {/* ── Hero ── */}
      <div className="gc p-5 flex items-center gap-4 pt-6 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
        <div className="relative shrink-0">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ background: 'linear-gradient(145deg, #a78bfa, #7c6ed0)' }}
          >
            {p.name[0]}
          </div>
          {/* Iridescent avatar ring */}
          <div className="absolute inset-[-3px] rounded-full pointer-events-none" style={{
            zIndex: -1,
            background: 'conic-gradient(from 0deg, #a78bfa, #67e8f9, #2dd4bf, #f9a8d4, #a78bfa)',
            opacity: 0.55,
          }} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-[#9ca3af] mb-0.5">Truth seeker ✦</p>
          <p className="text-lg font-bold text-[#111827]">{p.name}</p>
          <p className="text-xs text-[#6b7280] mt-0.5">{contributorLevel(r.points)} · {p.skinType} skin</p>
        </div>
        <button className="gc-sm w-8 h-8 flex items-center justify-center text-[#9ca3af]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-2.5 fade-up" style={{ '--delay': '70ms' } as React.CSSProperties}>
        {[
          { v: p.stats.scansTotal,           l: 'Scans',    c: '#111827' },
          { v: `€${p.stats.savedThisMonth}`, l: 'Saved',    c: '#2d7a3a' },
          { v: p.stats.productsSkipped,      l: 'Skipped',  c: '#7c6ed0' },
        ].map((s) => (
          <div key={s.l} className="gc-sm p-3 text-center">
            <p className="text-lg font-bold leading-none" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] text-[#6b7280] mt-1">{s.l}</p>
          </div>
        ))}
      </div>

      {/* ── Tab switcher ── */}
      <div className="gc-sm flex gap-1 p-1 fade-up" style={{ '--delay': '130ms' } as React.CSSProperties}>
        {([['profile', 'My Profile'], ['rewards', 'Rewards']] as const).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="tap-scale flex-1 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
            style={tab === t
              ? { background: 'linear-gradient(145deg, #9b8ee0, #7c6ed0)', color: '#fff', boxShadow: '0 2px 8px rgba(124,110,208,0.30)' }
              : { color: '#9ca3af' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── My Profile tab ── */}
      {tab === 'profile' && (
        <div className="space-y-3 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>

          <div className="gc overflow-hidden">
            {/* ── Goals row ── */}
            <button
              onClick={() => onNavigate('goals')}
              className="w-full px-4 py-4 text-left tap-scale border-b border-black/5"
            >
              <div className="flex items-center mb-2.5">
                <span className="text-sm font-medium text-[#111827] flex-1">My goals</span>
                <span className="text-[11px] font-semibold mr-2" style={{ color: '#7c6ed0' }}>Edit</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
              {/* Goal chips preview */}
              <div className="flex flex-wrap gap-1.5">
                {p.goals.map(g => (
                  <span key={g} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(124,110,208,0.10)', color: '#7c6ed0' }}>{g}</span>
                ))}
                {['Low CO₂', 'Save on duplicates'].map(g => (
                  <span key={g} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(13,148,136,0.08)', color: '#0d9488' }}>{g}</span>
                ))}
                {['Cheaper alternatives'].map(g => (
                  <span key={g} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(217,119,6,0.09)', color: '#d97706' }}>{g}</span>
                ))}
              </div>
            </button>

            {/* Favourites row */}
            <button
              onClick={() => onNavigate('favourites')}
              className="w-full flex items-center px-4 py-4 text-left tap-scale border-b border-black/5"
            >
              <span className="text-sm font-medium text-[#111827]">Favourites</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(244,114,182,0.45)" stroke="rgba(244,114,182,0.70)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                style={{ marginLeft: 8, animation: 'heartPulse 2.4s ease-in-out infinite' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="flex-1" />
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            {menuItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => item.screen ? onNavigate(item.screen) : undefined}
                className={`w-full flex items-center px-4 py-4 text-left tap-scale ${i < menuItems.length - 1 ? 'border-b border-black/5' : ''}`}
              >
                <span className="text-sm font-medium text-[#111827] flex-1">{item.label}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Rewards tab ── */}
      {tab === 'rewards' && (
        <div className="space-y-3 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>

          {/* Impact Points card */}
          <div className="gc-dark rounded-3xl p-5 irid-sweep">
            <div className="relative z-10">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Your impact points</p>
                  <p className="text-4xl font-bold text-white">{r.points}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40 mb-1">Next reward</p>
                  <p className="text-xl font-bold text-[#2dd4bf]">€5 discount</p>
                </div>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden mb-1.5" style={{ background: 'rgba(255,255,255,0.10)' }}>
                <div
                  className="h-full rounded-full progress-fill"
                  style={{ width: `${(r.points / r.target) * 100}%`, background: 'linear-gradient(to right, #a78bfa, #67e8f9, #2dd4bf)' }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-white/30">{r.points} / {r.target} pts</span>
                <span className="text-[10px] text-[#2dd4bf]/70">{r.target - r.points} pts to go</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="gc p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#111827]">Your badges</span>
              <span className="text-xs font-semibold text-[#7c6ed0]">View all</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {r.badges.map((b, i) => (
                <div
                  key={b.id}
                  className={`flex flex-col items-center gap-1 p-2 rounded-2xl ${b.earned ? 'gc-purple sparkle' : 'opacity-35'}`}
                  style={b.earned ? ({ '--delay': `${i * 80}ms` } as React.CSSProperties) : undefined}
                >
                  <div className="text-xl">{b.icon}</div>
                  <p className="text-[8px] font-semibold text-[#374151] text-center leading-tight">{b.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contributions */}
          <div className="gc p-4">
            <p className="text-sm font-bold text-[#111827] mb-3">Your contributions</p>
            <div className="space-y-2">
              {r.history.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7c6ed0] shrink-0" />
                  <span className="text-xs text-[#374151] flex-1">{item.action}</span>
                  <span className="text-xs font-bold text-[#7c6ed0]">+{item.points}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#9ca3af] mt-3 text-center italic">
              Earn by helping others avoid bad purchases — not by buying more.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
