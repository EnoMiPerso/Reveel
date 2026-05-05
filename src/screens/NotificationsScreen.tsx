import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

interface Notification {
  id: string; type: string; icon: string; brand: string;
  title: string; body: string; time: string; unread: boolean;
  action: Screen; compare?: boolean;
}

const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'alert',
    icon: '⚠️',
    brand: 'La Roche-Posay',
    title: 'Ingredient flagged in your routine',
    body: 'Fragrance Mix I found in your Toleriane Cream may cause irritation.',
    time: '2 min ago',
    unread: true,
    action: 'product-result' as Screen,
    compare: true,
  },
  {
    id: 'n2',
    type: 'saving',
    icon: '💸',
    brand: 'The Ordinary',
    title: 'Save €14 on your last scan',
    body: 'Niacinamide 10% is €6.90 cheaper on Lookfantastic vs. your in-store price.',
    time: '1 h ago',
    unread: true,
    action: 'product-result' as Screen,
    compare: true,
  },
  {
    id: 'n3',
    type: 'reward',
    icon: '✦',
    brand: 'Cetaphil',
    title: 'You earned 25 impact points',
    body: 'Thanks for rating the Hydrating Cleanser. Your data helps others buy smarter.',
    time: '3 h ago',
    unread: false,
    action: 'profile' as Screen,
  },
  {
    id: 'n4',
    type: 'tip',
    icon: '💡',
    brand: '',
    title: 'Did you know?',
    body: '"Hypoallergenic" has no legal definition. Always check ingredients.',
    time: 'Yesterday',
    unread: false,
    action: 'discover' as Screen,
  },
  {
    id: 'n5',
    type: 'routine',
    icon: '🌙',
    brand: 'Routine',
    title: 'Mix conflict in your night routine',
    body: 'Retinol + AHA can over-exfoliate. Consider alternating nights.',
    time: 'Yesterday',
    unread: false,
    action: 'routine' as Screen,
  },
];

const typeColor: Record<string, string> = {
  alert:   '#dc2626',
  saving:  '#0d9488',
  reward:  '#7c6ed0',
  tip:     '#d97706',
  routine: '#2563eb',
};

export default function NotificationsScreen({ onNavigate }: Props) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="pt-2 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-[26px] font-bold text-[#111827]">Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-[12px] text-[#9ca3af] mt-0.5">{unreadCount} unread</p>
          )}
        </div>
        <button className="text-[12px] font-semibold text-[#7c6ed0]">Mark all read</button>
      </div>

      <div className="gc overflow-hidden">
        {notifications.map((n, i) => (
          <div key={n.id} className={i < notifications.length - 1 ? 'border-b border-black/[0.04]' : ''}>
            <button
              onClick={() => onNavigate(n.action)}
              className={`w-full flex items-start gap-3 px-4 py-4 text-left tap-scale transition-colors ${n.unread ? 'bg-[rgba(124,110,208,0.04)]' : ''}`}
            >
              {/* Icon bubble */}
              <div
                className="w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center text-[16px] mt-0.5"
                style={{ background: `${typeColor[n.type]}12` }}
              >
                {n.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  {n.brand ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: `${typeColor[n.type]}12`, color: typeColor[n.type] }}>
                      {n.brand}
                    </span>
                  ) : <span />}
                  <span className="text-[10px] text-[#c4c4cc] shrink-0">{n.time}</span>
                </div>
                <p className="text-[13px] font-semibold text-[#111827] leading-tight">{n.title}</p>
                <p className="text-[12px] text-[#6b7280] leading-relaxed mt-1">{n.body}</p>
              </div>

              {/* Unread dot */}
              {n.unread && (
                <div className="w-2 h-2 rounded-full bg-[#a78bfa] shrink-0 mt-2" />
              )}
            </button>

            {/* Comparison details strip */}
            {n.compare && (
              <button
                onClick={() => onNavigate('comparison')}
                className="tap-scale w-full flex items-center justify-between px-4 py-2.5 border-t"
                style={{ borderColor: `${typeColor[n.type]}22`, background: `linear-gradient(90deg, ${typeColor[n.type]}14, ${typeColor[n.type]}08)` }}>
                <div className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={typeColor[n.type]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                  <span className="text-[11px] font-bold" style={{ color: typeColor[n.type] }}>Comparison details</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={typeColor[n.type]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
