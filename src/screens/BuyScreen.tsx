import { useState } from 'react';
import type { Screen } from '../types';

interface RetailerInfo {
  name: string; price: number; currency: string; delivery: string; eco: number;
  productName: string; productBrand: string; pct?: number; comparedTo?: string; comparedToBrand?: string;
  reason?: string; co2Saved?: string; waterSaved?: string;
  bg?: string; color?: string; letter?: string;
}

interface Props { onNavigate: (s: Screen) => void; retailer?: RetailerInfo; }

const DEFAULT: RetailerInfo = {
  name: 'Lookfantastic', price: 6.90, currency: '€', delivery: 'Free shipping · 2–3 business days',
  eco: 9, productName: 'Niacinamide 5% Serum', productBrand: 'CeraVe',
  pct: 45, comparedTo: 'Niacinamide 10% + Zinc 1%', comparedToBrand: 'The Ordinary',
  reason: 'Fragrance-free, gentler formula — better suited for your skin goals.',
  co2Saved: '0.6 kg', waterSaved: '14.6 L',
  bg: '#e05c5c', color: '#fff', letter: 'L',
};

const PREFILL = { firstName: 'Sophie', lastName: 'Martin', street: '12 Rue de Rivoli', zip: '75001', city: 'Paris', addressLine2: '', floor: '', door: '', phone: '', comment: '' };

const IMPACT_TILES = (r: RetailerInfo) => [
  { color: '#0d9488', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ), value: r.co2Saved ?? '0.6 kg', label: 'CO₂ saved' },
  { color: '#0891b2', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ), value: r.waterSaved ?? '14.6 L', label: 'Water saved' },
  { color: '#7c6ed0', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ), value: '20 g', label: 'Less plastic' },
  { color: '#d97706', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ), value: '+50 pts', label: 'Impact score' },
];

export default function BuyScreen({ onNavigate, retailer }: Props) {
  const r = retailer ?? DEFAULT;
  const [, setPayMethod] = useState<'apple' | 'google' | 'card' | null>(null);
  const [addrOpen,     setAddrOpen]     = useState(false);
  const [firstName,    setFirstName]    = useState(PREFILL.firstName);
  const [lastName,     setLastName]     = useState(PREFILL.lastName);
  const [street,       setStreet]       = useState(PREFILL.street);
  const [addressLine2, setAddressLine2] = useState(PREFILL.addressLine2);
  const [floor,        setFloor]        = useState(PREFILL.floor);
  const [door,         setDoor]         = useState(PREFILL.door);
  const [city,         setCity]         = useState(PREFILL.city);
  const [zip,          setZip]          = useState(PREFILL.zip);
  const [phone,        setPhone]        = useState(PREFILL.phone);
  const [comment,      setComment]      = useState(PREFILL.comment);
  const [cardNum,   setCardNum]   = useState('');
  const [expiry,    setExpiry]    = useState('');
  const [cvv,       setCvv]       = useState('');
  const [cardName,  setCardName]  = useState('');
  const [paid,      setPaid]      = useState(false);

  const canPay = cardNum.replace(/\s/g,'').length === 16 && expiry.length === 5 && cvv.length === 3 && cardName.length > 0;

  function formatCard(v: string)   { return v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim(); }
  function formatExpiry(v: string) { const d = v.replace(/\D/g,'').slice(0,4); return d.length > 2 ? d.slice(0,2) + '/' + d.slice(2) : d; }

  function handlePay(method: 'apple' | 'google' | 'card') {
    setPayMethod(method);
    setPaid(true);
    setTimeout(() => onNavigate('product-result'), 2400);
  }

  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-24 gap-5 fade-up">
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#0d9488,#059669)', boxShadow: '0 8px 32px rgba(13,148,136,0.30)' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p className="text-[22px] font-bold text-[#111827]">Order placed!</p>
        <p className="text-[13px] text-[#6b7280] text-center leading-relaxed">
          Your <span className="font-semibold text-[#111827]">{r.productBrand} {r.productName}</span> is on its way from {r.name}.<br/><br/>
          You earned <span className="font-bold text-[#7c6ed0]">+50 impact points</span> and saved <span className="font-bold text-[#0d9488]">{r.co2Saved} CO₂</span> vs. your previous choice.
        </p>
        <p className="text-[11px] text-[#c4c4cc] mt-2">Returning to product page…</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 space-y-3">

      {/* ── Product hero ── */}
      <div className="gc overflow-hidden" style={{ borderRadius: 24 }}>
        <div className="flex items-start gap-4 px-4 pt-4 pb-3">
          <div className="w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(160deg,rgba(237,233,251,0.80),rgba(220,215,255,0.55))', border: '1px solid rgba(167,139,250,0.18)' }}>
            <svg width="28" height="44" viewBox="0 0 28 48" fill="none">
              <rect x="10" y="1" width="8" height="8" rx="2" fill="rgba(200,195,220,0.85)"/>
              <rect x="5" y="9" width="18" height="36" rx="6" fill="rgba(245,243,255,0.95)" stroke="rgba(167,139,250,0.30)" strokeWidth="1"/>
              <rect x="8" y="16" width="12" height="20" rx="3" fill="rgba(237,233,251,0.75)"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] text-[#9ca3af] font-medium">{r.productBrand}</p>
                <p className="text-[15px] font-bold text-[#111827] leading-tight">{r.productName}</p>
              </div>
              <p className="text-[22px] font-bold text-[#111827] shrink-0 leading-none mt-0.5">{r.currency}{r.price.toFixed(2)}</p>
            </div>
            {r.pct && r.comparedTo && (
              <p className="text-[11px] text-[#6b7280] mt-1.5 leading-snug">
                <span className="font-bold" style={{ color: '#0d9488' }}>{r.pct}% better</span>
                {' '}than {r.comparedToBrand ? `${r.comparedToBrand} ` : ''}{r.comparedTo}
              </p>
            )}
          </div>
        </div>
        {r.reason && (
          <div className="border-t border-black/[0.05] px-4 py-2.5">
            <p className="text-[11px] text-[#6b7280] leading-relaxed">{r.reason}</p>
          </div>
        )}
        {r.pct && r.comparedTo && (
          <button onClick={() => onNavigate('comparison')}
            className="tap-scale w-full border-t flex items-center justify-between px-4 py-2.5"
            style={{ borderColor: 'rgba(124,110,208,0.18)', background: 'linear-gradient(90deg, rgba(124,110,208,0.10), rgba(124,110,208,0.05))' }}>
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              <span className="text-[11px] font-bold" style={{ color: '#7c6ed0' }}>Comparison details</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Store ── */}
      <div className="gc px-4 py-3.5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-[13px] font-bold shrink-0"
          style={{ background: r.bg ?? '#e05c5c', color: r.color ?? '#fff' }}>
          {r.letter ?? r.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-[13px] font-bold text-[#111827]">{r.name}</p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(13,148,136,0.10)', color: '#0d9488' }}>Verified seller</span>
          </div>
          <p className="text-[10px] text-[#9ca3af] mt-0.5">{r.delivery}</p>
        </div>
        <span className="text-[11px] font-bold text-[#0d9488] shrink-0">Free</span>
      </div>

      {/* ── Your impact ── */}
      <div className="gc px-4 py-3" style={{ borderRadius: 24 }}>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[12px] font-bold text-[#111827]">Your impact</p>
          <span className="text-[9px] font-semibold text-[#9ca3af]">vs. original product</span>
        </div>
        {/* Compact single-row stats */}
        <div className="flex items-center gap-3 flex-wrap">
          {IMPACT_TILES(r).map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div style={{ color: s.color }}>{s.icon}</div>
              <span className="text-[11px] font-bold text-[#111827]">{s.value}</span>
              <span className="text-[9px] text-[#9ca3af]">{s.label}</span>
            </div>
          ))}
        </div>
        {/* Skin reason — single line */}
        <p className="text-[10px] text-[#6b7280] mt-2 leading-snug border-t border-black/[0.05] pt-2">
          <span className="font-semibold text-[#7c6ed0]">Skin: </span>
          {r.reason ?? 'Fragrance-free, gentler formula — better for your goals.'}
        </p>
      </div>

      {/* ── Delivery address ── */}
      <button onClick={() => setAddrOpen(o => !o)}
        className="tap-scale gc w-full px-4 py-3.5 flex items-center gap-3 text-left">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(124,110,208,0.10)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-[#111827]">{firstName} {lastName}</p>
          <p className="text-[11px] text-[#9ca3af] truncate">{street}, {zip} {city}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c4c4cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: addrOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {addrOpen && (
        <div className="gc p-4 space-y-2 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
          {/* Name */}
          <div className="flex gap-2">
            <div className="gc-sm flex-1 px-4 py-3">
              <input value={firstName} onChange={e => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
            <div className="gc-sm flex-1 px-4 py-3">
              <input value={lastName} onChange={e => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
          </div>

          {/* Street */}
          <div className="gc-sm flex items-center gap-2 px-4 py-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <input value={street} onChange={e => setStreet(e.target.value)}
              placeholder="Street address"
              className="flex-1 bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
          </div>

          {/* Address line 2 */}
          <div className="gc-sm px-4 py-3">
            <input value={addressLine2} onChange={e => setAddressLine2(e.target.value)}
              placeholder="Address line 2 (optional)"
              className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
          </div>

          {/* Floor + Door */}
          <div className="flex gap-2">
            <div className="gc-sm flex-1 px-4 py-3">
              <input value={floor} onChange={e => setFloor(e.target.value)}
                placeholder="Floor" inputMode="numeric"
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
            <div className="gc-sm flex-1 px-4 py-3">
              <input value={door} onChange={e => setDoor(e.target.value)}
                placeholder="Door / Apt no."
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
          </div>

          {/* Postcode + City */}
          <div className="flex gap-2">
            <div className="gc-sm flex-[1] px-4 py-3">
              <input value={zip} onChange={e => setZip(e.target.value)}
                placeholder="Postcode" inputMode="numeric"
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
            <div className="gc-sm flex-[2] px-4 py-3">
              <input value={city} onChange={e => setCity(e.target.value)}
                placeholder="City"
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
          </div>

          {/* Phone */}
          <div className="gc-sm flex items-center gap-2 px-4 py-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.34a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l1.16-1.16a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <input value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="Phone number" inputMode="tel"
              className="flex-1 bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
          </div>

          {/* Delivery comment */}
          <div className="gc-sm px-4 py-3">
            <textarea value={comment} onChange={e => setComment(e.target.value)}
              placeholder="Delivery instructions (e.g. leave at door, ring twice…)"
              rows={2}
              className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none resize-none leading-relaxed"/>
          </div>
        </div>
      )}

      {/* ── Payment ── */}
      <div className="gc p-4 space-y-3">
        <p className="text-[12px] font-bold text-[#111827]">Pay with</p>

        <button onClick={() => handlePay('apple')}
          className="tap-scale w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-[14px] text-white"
          style={{ background: '#000', boxShadow: '0 4px 14px rgba(0,0,0,0.20)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Apple Pay
        </button>

        <button onClick={() => handlePay('google')}
          className="tap-scale w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-[14px] text-[#111827]"
          style={{ background: '#fff', border: '1.5px solid rgba(0,0,0,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google Pay
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-black/[0.06]"/>
          <span className="text-[10px] text-[#9ca3af] font-medium">or pay by card</span>
          <div className="flex-1 h-px bg-black/[0.06]"/>
        </div>

        <div className="space-y-2">
          <div className="gc-sm flex items-center px-4 py-3 gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <input value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))}
              placeholder="Card number" inputMode="numeric"
              className="flex-1 bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
          </div>
          <div className="flex gap-2">
            <div className="gc-sm flex-1 px-4 py-3">
              <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY" inputMode="numeric"
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
            <div className="gc-sm flex-1 px-4 py-3">
              <input value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,3))}
                placeholder="CVV" inputMode="numeric" type="password"
                className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
            </div>
          </div>
          <div className="gc-sm px-4 py-3">
            <input value={cardName} onChange={e => setCardName(e.target.value)}
              placeholder="Cardholder name"
              className="w-full bg-transparent text-[13px] text-[#111827] placeholder:text-[#c4c4cc] outline-none"/>
          </div>
        </div>

        <button onClick={() => handlePay('card')} disabled={!canPay}
          className="tap-scale w-full py-4 rounded-2xl text-white font-bold text-[14px] btn-glow disabled:opacity-35 transition-all"
          style={{ background: 'linear-gradient(130deg,#5b4fb0,#7c6ed0)', boxShadow: '0 4px 16px rgba(91,79,176,0.30)' }}>
          Pay {r.currency}{r.price.toFixed(2)}
        </button>

        <p className="text-[9px] text-[#c4c4cc] text-center">🔒 Secured · Processed by Stripe</p>
      </div>

    </div>
  );
}
