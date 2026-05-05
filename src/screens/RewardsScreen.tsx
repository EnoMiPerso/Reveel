import ProgressBar from '../components/ProgressBar';
import { rewardsData } from '../mockData/rewards';

const historyBg: Record<string, string> = {
  'Price confirmation':        'bg-[#eff6ff] text-[#2563eb]',
  'Product review':            'bg-[#f0fdfa] text-[#0d9488]',
  'Misleading product flagged':'bg-[#fff7ed] text-[#ea580c]',
};

/* Contributor level based on points */
function contributorLevel(pts: number) {
  if (pts >= 500) return { title: 'Senior Investigator',  color: 'text-[#7c3aed]', bg: 'bg-[#ede9fe]' };
  if (pts >= 200) return { title: 'Marketing Detective',  color: 'text-[#7c6ed0]', bg: 'bg-[#ede9fb]' };
  if (pts >= 50)  return { title: 'Truth Contributor',    color: 'text-[#2d6a35]', bg: 'bg-[#f0faf1]' };
  return           { title: 'New Investigator',           color: 'text-[#6b7280]', bg: 'bg-[#f3f4f6]' };
}

export default function RewardsScreen() {
  const r = rewardsData;
  const level = contributorLevel(r.points);

  return (
    <div>
      <div className="bg-white px-5 pt-12 pb-5 border-b border-[#e5e7eb]">
        <h2 className="text-xl font-bold text-[#111827] mb-0.5">Impact Points</h2>
        <p className="text-sm text-[#6b7280]">Earn by helping others — not by buying more.</p>
      </div>

      <div className="px-4 pt-4">
        {/* Points card — iridescent dark */}
        <div
          className="truth-card irid-overlay rounded-3xl p-5 mb-4"
        >
          <div className="relative z-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-xs text-white/40 mb-1 uppercase tracking-wider">Impact Points</div>
                <div className="text-4xl font-bold text-white">{r.points}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/40 mb-1">Next reward</div>
                <div className="text-2xl font-bold text-[#2dd4bf]">{r.rewardValue}</div>
                <div className="text-[#2dd4bf]/60 text-xs mt-0.5">{r.target - r.points} pts to go</div>
              </div>
            </div>
            <ProgressBar value={r.points} max={r.target} color="#a78bfa" trackColor="rgba(255,255,255,0.12)" height={10} />

            {/* Level badge */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Contributor level</div>
                <div className="text-sm font-bold text-white">{level.title}</div>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span className="text-[10px] font-bold text-[#a78bfa]">Truth Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-4">
          <div className="text-sm font-bold text-[#111827] mb-3">Badges</div>
          <div className="grid grid-cols-2 gap-3">
            {r.badges.map((b) => (
              <div key={b.id} className={`bg-white rounded-2xl p-4 border ${
                b.earned ? 'border-[#e5e7eb]' : 'border-dashed border-[#d1d5db] opacity-50'
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-base ${
                  b.earned ? 'bg-[#ede9fb]' : 'bg-[#f9fafb]'
                }`}>
                  {b.icon}
                </div>
                <div className="text-xs font-bold text-[#111827] mb-0.5">{b.name}</div>
                <div className="text-[10px] text-[#6b7280] leading-tight">{b.description}</div>
                {b.earned && (
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7c6ed0]" />
                    <span className="text-[10px] text-[#7c6ed0] font-semibold">Earned</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="mb-4">
          <div className="text-sm font-bold text-[#111827] mb-3">Activity</div>
          <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
            {r.history.map((item, i) => (
              <div key={item.id} className={`flex items-center gap-3 px-4 py-3.5 ${i < r.history.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-[10px] font-bold ${historyBg[item.action] ?? 'bg-[#f3f4f6] text-[#6b7280]'}`}>
                  +{item.points}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#111827]">{item.action}</div>
                  <div className="text-[10px] text-[#6b7280] truncate">{item.detail}</div>
                </div>
                <div className="text-[10px] text-[#9ca3af] shrink-0">{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Manifesto */}
        <div className="bg-[#ede9fb] rounded-2xl px-4 py-4 mb-2 border border-[#c4bbf5]">
          <p className="text-xs text-[#7c6ed0] text-center leading-relaxed font-medium italic">
            "Every scan, every price report, every flag — you're making beauty more honest for everyone."
          </p>
        </div>
      </div>
    </div>
  );
}
