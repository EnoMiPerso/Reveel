import type { Screen } from '../types';
interface Props { onNavigate: (s: Screen) => void; }

const SCANS_DONE  = 23;
const POINTS      = 345;
const POINTS_MAX  = 500;
const NEXT_REWARD = 155; // points to next reward

const actions = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Scan products',
    pts: '+2 pts / scan',
    desc: 'Every product you scan contributes to the Reveel database and earns you points. The more you scan, the more you know — and the faster you unlock rewards.',
    examples: ['Scan a new product → +2 pts', 'First scan of a new brand → +5 pts bonus', 'Complete 10 scans in a week → +20 pts bonus'],
    color: '#7c6ed0',
    bg: 'rgba(124,110,208,0.08)',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Leave product reviews',
    pts: '+5 pts / review',
    desc: 'After scanning, your honest review (texture, scent, packaging, value) helps the community make smarter decisions. Verified reviews earn double points.',
    examples: ['Rate a product after scanning → +5 pts', 'Write a detailed review (50+ words) → +10 pts', 'Review verified as helpful → +5 pts bonus'],
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.08)',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e07b2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    title: 'Buy smarter options online',
    pts: '+15 pts / purchase',
    desc: 'When you buy a Reveel-recommended product through our partner links, you earn bonus points and help us stay independent. We only link what we\'d genuinely recommend.',
    examples: ['Buy a top-rated alternative → +15 pts', 'Switch to a cleaner product → +10 pts', 'Save money vs. retail → tracked toward €318 total'],
    color: '#e07b2c',
    bg: 'rgba(224,123,44,0.08)',
  },
];

const tiers = [
  { label: 'Explorer',   pts: '0–199',    reward: '—',           color: '#9ca3af' },
  { label: 'Scanner',    pts: '200–399',  reward: '€2 off',      color: '#7c6ed0' },
  { label: 'Advocate',   pts: '400–699',  reward: '€5 off',      color: '#0d9488' },
  { label: 'Champion',   pts: '700–999',  reward: '€10 off',     color: '#e07b2c' },
  { label: 'Legend',     pts: '1000+',    reward: '€20 off',     color: '#dc2626' },
];

export default function TransparencyScreen({ onNavigate }: Props) {
  const pct = Math.round((POINTS / POINTS_MAX) * 100);

  return (
    <div className="px-4 pt-5 pb-6 space-y-4">

      {/* Hero */}
      <div className="gc-dark rounded-3xl p-5">
        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1">Your impact points</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[40px] font-black text-white leading-none">{POINTS}</span>
            <span className="text-[14px] text-white/50">/ {POINTS_MAX} pts</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(to right, #a78bfa, #7c6ed0)' }} />
          </div>
          <p className="text-[11px] text-white/50">{NEXT_REWARD} pts to unlock your next reward · {SCANS_DONE} scans contributed</p>
        </div>
      </div>

      {/* How you earn */}
      <div>
        <p className="text-[13px] font-bold text-[#111827] mb-2">How you earn points</p>
        <div className="space-y-2">
          {actions.map(a => (
            <div key={a.title} className="gc rounded-3xl p-4">
              {/* Icon + pts badge on one line */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl shrink-0 flex items-center justify-center" style={{ background: a.bg }}>
                  <span style={{ transform: 'scale(0.78)', display: 'flex' }}>{a.icon}</span>
                </div>
                <p className="text-[13px] font-bold text-[#111827] flex-1">{a.title}</p>
                <span className="text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0"
                  style={{ color: a.color, background: a.bg }}>{a.pts}</span>
              </div>
              {/* Description left-aligned */}
              <p className="text-[11px] text-[#6b7280] leading-relaxed mb-2">{a.desc}</p>
              <div className="border-t border-black/[0.05] pt-2 space-y-1">
                {a.examples.map(ex => (
                  <div key={ex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                    <p className="text-[10px] text-[#6b7280]">{ex}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward tiers */}
      <div>
        <p className="text-[13px] font-bold text-[#111827] mb-2">Reward tiers</p>
        <div className="gc overflow-hidden">
          {tiers.map((t, i) => {
            const active = POINTS >= parseInt(t.pts.split('–')[0].replace('+',''));
            return (
              <div key={t.label}
                className={`flex items-center gap-3 px-4 py-3 ${i < tiers.length - 1 ? 'border-b border-black/[0.04]' : ''}`}
                style={active ? { background: `${t.color}08` } : {}}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: active ? t.color : '#e5e7eb' }} />
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-[#111827]">{t.label}</p>
                  <p className="text-[10px] text-[#9ca3af]">{t.pts} pts</p>
                </div>
                <span className="text-[11px] font-bold" style={{ color: active ? t.color : '#9ca3af' }}>{t.reward}</span>
                {active && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparency note */}
      <div className="gc p-4">
        <p className="text-[11px] font-bold text-[#111827] mb-1">Our commitment</p>
        <p className="text-[11px] text-[#6b7280] leading-relaxed">
          Discounts are funded by affiliate commissions when you buy through our recommended links — not by brands paying for placement. Rankings are never for sale.
        </p>
      </div>

      <button onClick={() => onNavigate('home')}
        className="tap-scale w-full py-4 rounded-2xl text-white font-semibold text-[14px]"
        style={{ background: 'linear-gradient(145deg, #7c6ed0, #5b4fb0)', boxShadow: '0 4px 14px rgba(124,110,208,0.30)' }}>
        Keep scanning smarter
      </button>

    </div>
  );
}
