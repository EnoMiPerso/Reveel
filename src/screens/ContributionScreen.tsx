import { useState } from 'react';
import type { Screen } from '../types';
interface Props { onNavigate: (s: Screen) => void; }

export default function ContributionScreen({ onNavigate }: Props) {
  const [price, setPrice] = useState('42');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => onNavigate('product-result'), 1600);
  };

  return (
    <div className="px-4 pb-4 space-y-4">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-[#111827] mb-1">Help expose marketing</h2>
        <p className="text-sm text-[#6b7280]">Your price data helps others avoid being overcharged.</p>
      </div>

      <div className="gc p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: 'rgba(237,233,251,0.6)' }}>
          <svg width="18" height="20" viewBox="0 0 90 100" fill="none">
            <rect x="14" y="22" width="62" height="62" rx="14" fill="rgba(237,233,251,0.9)"/>
          </svg>
        </div>
        <div>
          <p className="text-xs text-[#6b7280]">Luminé Paris</p>
          <p className="text-sm font-bold text-[#111827]">HydraLift Anti-Aging Day Cream</p>
        </div>
      </div>

      <div className="gc p-5 space-y-4">
        <p className="text-sm font-bold text-[#111827]">What price do you see in store?</p>
        <div className="gc-sm flex items-center px-5 py-4">
          <span className="text-2xl font-bold text-[#9ca3af] mr-1">€</span>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
            className="flex-1 text-2xl font-bold text-[#111827] bg-transparent outline-none min-w-0"
            inputMode="decimal" />
        </div>
        <div className="flex gap-2">
          {['38', '40', '42', '45'].map((v) => (
            <button key={v} onClick={() => setPrice(v)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold tap-scale transition-all ${
                price === v ? 'text-white' : 'gc-sm text-[#6b7280]'
              }`}
              style={price === v ? { background: 'linear-gradient(145deg, #7c6ed0, #5b4fb0)' } : {}}>
              €{v}
            </button>
          ))}
        </div>
      </div>

      <div className="gc-green p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(145deg, #2dd4bf, #0d9488)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-[#111827]">+15 impact points</p>
          <p className="text-xs text-[#6b7280]">You're helping others avoid overpriced products</p>
        </div>
      </div>

      {!confirmed ? (
        <button onClick={handleConfirm}
          className="tap-scale w-full py-4 rounded-2xl text-white font-semibold text-base btn-glow"
          style={{ background: 'linear-gradient(145deg, #7c6ed0, #5b4fb0)' }}>
          Confirm price
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(145deg, #2dd4bf, #0d9488)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="text-base font-bold text-[#111827]">Thanks! +15 points added</p>
        </div>
      )}
      <button onClick={() => onNavigate('product-result')}
        className="w-full py-3 text-xs text-[#9ca3af] text-center">Skip for now</button>
    </div>
  );
}
