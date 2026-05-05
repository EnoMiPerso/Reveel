import type { Screen } from '../types';
interface Props {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const HomeIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    {!filled && <polyline points="9 22 9 12 15 12 15 22"/>}
  </svg>
);
const ScanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
);
const RoutineIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {filled
      ? <><path d="M9 11l3 3L22 4" strokeWidth="2.5"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" fill="currentColor" fillOpacity="0.15"/></>
      : <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>}
  </svg>
);
const DiscoverIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    {filled ? <path d="M21 21l-4.35-4.35" strokeWidth="2.5" fill="none"/> : <line x1="21" y1="21" x2="16.65" y2="16.65"/>}
  </svg>
);
const ProfileIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {filled
      ? <><circle cx="12" cy="7" r="4" fill="currentColor" fillOpacity="0.8"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></>
      : <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
  </svg>
);

const navScreens: Screen[] = ['home', 'scan', 'routine', 'discover', 'profile'];

type TabDef = {
  id: Screen;
  label: string;
  Icon: React.FC<{ filled?: boolean }>;
  primary?: boolean;
};

const tabs: TabDef[] = [
  { id: 'home',     label: 'Home',     Icon: HomeIcon },
  { id: 'routine',  label: 'Routine',  Icon: RoutineIcon },
  { id: 'scan',     label: 'Scan',     Icon: ScanIcon, primary: true },
  { id: 'discover', label: 'Discover', Icon: DiscoverIcon },
  { id: 'profile',  label: 'Profile',  Icon: ProfileIcon },
];

export default function BottomNav({ active, onNavigate }: Props) {
  const isActive = (id: Screen) => navScreens.includes(active) && active === id;

  return (
    <div className="nav-pill flex items-end justify-around px-2 h-[62px]">
      {tabs.map(({ id, label, Icon, primary }) => {
        const active_ = isActive(id);

        if (primary) {
          return (
            <button key={id} onClick={() => onNavigate(id)}
              className="flex-1 flex flex-col items-center tap-scale"
              style={{ paddingBottom: 8 }}>

              {/* Orb — lifted above nav bar */}
              <span className="relative flex items-center justify-center rounded-full overflow-hidden"
                style={{
                  width: 62, height: 62,
                  marginTop: -26,
                  marginBottom: 3,
                  background: 'linear-gradient(145deg, rgba(245,243,255,0.96), rgba(225,218,255,0.85))',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  border: '1.5px solid rgba(167,139,250,0.55)',
                  boxShadow: '0 0 0 3px rgba(167,139,250,0.12), 0 4px 22px rgba(124,110,208,0.30), inset 0 1px 0 rgba(255,255,255,0.95)',
                }}>
                {/* Pearl shimmer */}
                <span className="absolute pointer-events-none rounded-full" style={{
                  inset: '-80%',
                  background: 'conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(220,210,255,0.30) 40deg, rgba(200,240,255,0.22) 80deg, rgba(210,255,230,0.18) 130deg, rgba(255,240,200,0.16) 180deg, rgba(255,210,230,0.20) 230deg, rgba(220,210,255,0.28) 290deg, rgba(255,255,255,0) 360deg)',
                  animation: 'kpiPearl 10s linear infinite',
                  borderRadius: '50%',
                }} />
                {/* Glint streak */}
                <span className="absolute pointer-events-none" style={{
                  top: '-20%', left: '-60%',
                  width: '40%', height: '160%',
                  background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.22) 54%, transparent 100%)',
                  animation: 'kpiGlint 6s ease-in-out infinite',
                }} />
                {/* Scan frame icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M7 3H5a2 2 0 0 0-2 2v2"/>
                  <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                  <path d="M17 21h2a2 2 0 0 0 2-2v-2"/>
                </svg>
              </span>

              <span className="text-[9px] font-semibold" style={{ color: active_ ? '#7c6ed0' : '#9ca3af' }}>
                {label}
              </span>
            </button>
          );
        }

        return (
          <button key={id} onClick={() => onNavigate(id)}
            className="flex-1 flex flex-col items-center justify-end gap-0.5 tap-scale"
            style={{ paddingBottom: 8 }}>
            <span style={{ color: active_ ? '#7c6ed0' : '#9ca3af' }}>
              <Icon filled={active_} />
            </span>
            <span className="text-[9px] font-semibold" style={{ color: active_ ? '#7c6ed0' : '#9ca3af' }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
