import { useState } from 'react';
import { scannedProduct } from '../mockData/products';

interface Props {
  onClose: () => void;
  hasReviewed?: boolean;
  onReviewed?: () => void;
}

const CRITERIA = [
  { id: 'quality',    label: 'Quality',      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { id: 'texture',    label: 'Texture',      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9"/></svg> },
  { id: 'efficacy',   label: 'Efficacy',     icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
  { id: 'scent',      label: 'Scent',        icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg> },
  { id: 'absorption', label: 'Absorption',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg> },
  { id: 'value',      label: 'Value for €',  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { id: 'packaging',  label: 'Packaging',    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
  { id: 'longevity',  label: 'Longevity',    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

const SKIN_TAGS = [
  'Hydrating', 'Non-greasy', 'Fast-absorbing', 'Fragrance-free', 'Caused breakouts',
  'Reduced pores', 'Improved texture', 'Brightening', 'Irritating', 'Long-lasting',
];

const CONCERNS = ['Acne', 'Dry skin', 'Oily skin', 'Sensitive skin', 'Hyperpigmentation', 'Aging'];

function StarRow({ label, icon, value, onChange }: {
  label: string; icon: React.ReactNode; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-black/[0.04] last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-[#9ca3af]">{icon}</span>
        <span className="text-[13px] font-medium text-[#374151]">{label}</span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map(i => (
          <button key={i} onClick={() => onChange(i)}
            className="tap-scale w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={i <= value
              ? { background: 'linear-gradient(145deg,#9b8ee0,#5b4fb0)', boxShadow: '0 2px 8px rgba(124,110,208,0.30)' }
              : { background: 'rgba(0,0,0,0.06)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24"
              fill={i <= value ? '#fff' : 'none'}
              stroke={i <= value ? '#fff' : '#c4c4cc'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewScreen({ onClose, hasReviewed, onReviewed }: Props) {
  const p = scannedProduct;
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (t: string) => setTags(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);
  const toggleConcern = (c: string) => setConcerns(cs => cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c]);
  const setRating = (id: string, v: number) => setRatings(r => ({ ...r, [id]: v }));
  const hasAny = Object.values(ratings).some(v => v > 0) || tags.length > 0 || review.trim().length > 0;

  function submit() {
    setSubmitted(true);
    onReviewed?.();
    setTimeout(onClose, 1800);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(245,244,255,0.97)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}>

      {/* ── Own header ── */}
      <div className="shrink-0 flex items-center justify-between px-5 pt-14 pb-4 border-b border-black/[0.06]"
        style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(20px)' }}>
        <div>
          <p className="text-[16px] font-bold text-[#111827]">Give feedback</p>
          <p className="text-[11px] text-[#9ca3af] mt-0.5">
            Earn <span className="font-bold text-[#7c6ed0]">+25 pts</span> for your evaluation
          </p>
        </div>
        <button onClick={onClose}
          className="tap-scale w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.06)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">

        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 pt-24 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#5b4fb0,#7c6ed0)', boxShadow: '0 6px 24px rgba(124,110,208,0.35)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-[18px] font-bold text-[#111827]">Thanks! +25 pts earned</p>
            <p className="text-[13px] text-[#9ca3af] text-center leading-relaxed">
              Your review helps the Reveel community make smarter decisions.
            </p>
          </div>

        ) : hasReviewed ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 pt-24 fade-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(124,110,208,0.12)', border: '1px solid rgba(124,110,208,0.20)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c6ed0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <p className="text-[17px] font-bold text-[#111827] text-center">You've already evaluated this product</p>
            <p className="text-[13px] text-[#9ca3af] text-center leading-relaxed">
              Your evaluation is live and helping the community. Thanks for contributing!
            </p>
            <button onClick={onClose}
              className="tap-scale mt-2 px-6 py-3 rounded-2xl text-[13px] font-semibold"
              style={{ background: 'rgba(124,110,208,0.10)', color: '#7c6ed0', border: '1px solid rgba(124,110,208,0.18)' }}>
              Close
            </button>
          </div>

        ) : (
          <div className="px-4 pt-4 pb-10 space-y-3">

            {/* Product pill */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl fade-up"
              style={{ '--delay': '0ms', background: 'rgba(124,110,208,0.07)', border: '1px solid rgba(124,110,208,0.14)' } as React.CSSProperties}>
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(160deg,rgba(237,233,251,0.90),rgba(220,215,255,0.70))' }}>
                <svg width="22" height="34" viewBox="0 0 52 90" fill="none">
                  <rect x="22" y="2"  width="8"  height="14" rx="4"  fill="rgba(200,195,220,0.85)"/>
                  <rect x="20" y="14" width="12" height="6"  rx="2"  fill="rgba(180,175,210,0.80)"/>
                  <rect x="10" y="20" width="32" height="60" rx="10" fill="rgba(245,243,255,0.95)" stroke="rgba(167,139,250,0.30)" strokeWidth="1.2"/>
                  <rect x="14" y="30" width="24" height="38" rx="6"  fill="rgba(237,233,251,0.75)"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-[#111827] truncate">{p.brand}</p>
                <p className="text-[11px] text-[#6b7280] truncate">{p.name}</p>
              </div>
            </div>

            {/* Star ratings */}
            <div className="gc px-4 pt-3 pb-1 fade-up" style={{ '--delay': '30ms' } as React.CSSProperties}>
              <p className="text-[12px] font-bold text-[#111827] mb-1">Rate this product</p>
              {CRITERIA.map(c => (
                <StarRow key={c.id} label={c.label} icon={c.icon}
                  value={ratings[c.id] ?? 0} onChange={v => setRating(c.id, v)} />
              ))}
            </div>

            {/* Experience tags */}
            <div className="gc px-4 py-4 fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>
              <p className="text-[12px] font-bold text-[#111827] mb-3">How did it feel?</p>
              <div className="flex flex-wrap gap-2">
                {SKIN_TAGS.map(t => {
                  const sel = tags.includes(t);
                  return (
                    <button key={t} onClick={() => toggleTag(t)}
                      className="tap-scale px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                      style={sel
                        ? { background: 'linear-gradient(135deg,#5b4fb0,#7c6ed0)', color: '#fff', boxShadow: '0 2px 8px rgba(124,110,208,0.25)' }
                        : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skin concerns */}
            <div className="gc px-4 py-4 fade-up" style={{ '--delay': '80ms' } as React.CSSProperties}>
              <p className="text-[12px] font-bold text-[#111827] mb-1">Your skin concerns</p>
              <p className="text-[10px] text-[#9ca3af] mb-3">Helps us match this product to similar profiles</p>
              <div className="flex flex-wrap gap-2">
                {CONCERNS.map(c => {
                  const sel = concerns.includes(c);
                  return (
                    <button key={c} onClick={() => toggleConcern(c)}
                      className="tap-scale px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                      style={sel
                        ? { background: 'rgba(13,148,136,0.15)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.25)' }
                        : { background: 'rgba(0,0,0,0.05)', color: '#6b7280' }}>
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Would you recommend */}
            <div className="gc px-4 py-4 fade-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
              <p className="text-[12px] font-bold text-[#111827] mb-3">Would you recommend it?</p>
              <div className="flex gap-3">
                {[
                  { val: false, label: 'Not really',       color: '#9ca3af', bg: 'rgba(0,0,0,0.05)' },
                  { val: true,  label: 'Yes, definitely', color: '#0d9488', bg: 'rgba(13,148,136,0.12)' },
                ].map(opt => (
                    <button key={String(opt.val)} onClick={() => setRecommend(opt.val)}
                    className="tap-scale flex-1 py-2.5 rounded-2xl text-[12px] font-semibold transition-all"
                    style={
                      recommend === opt.val && opt.val === true
                        ? { background: 'linear-gradient(135deg,#0d9488,#14b8a6)', color: '#fff', boxShadow: '0 2px 10px rgba(13,148,136,0.28)' }
                        : recommend === opt.val && opt.val === false
                        ? { background: 'rgba(0,0,0,0.08)', color: '#6b7280', border: '1px solid rgba(0,0,0,0.10)' }
                        : { background: 'rgba(0,0,0,0.04)', color: '#9ca3af' }
                    }>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Written review */}
            <div className="gc px-4 py-4 fade-up" style={{ '--delay': '120ms' } as React.CSSProperties}>
              <p className="text-[12px] font-bold text-[#111827] mb-1">Write a review <span className="text-[#c4c4cc] font-normal">(optional)</span></p>
              <p className="text-[10px] text-[#9ca3af] mb-3">Share your experience to help others decide</p>
              <textarea
                rows={4}
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="e.g. I've been using this for 3 weeks and noticed a real difference in pore size…"
                className="w-full px-4 py-3 rounded-2xl text-[12px] text-[#111827] placeholder:text-[#c4c4cc] outline-none resize-none leading-relaxed"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}
              />
            </div>

            {/* Submit */}
            <button onClick={submit} disabled={!hasAny}
              className="tap-scale w-full py-4 rounded-3xl text-[14px] font-bold text-white disabled:opacity-30 transition-all fade-up"
              style={{
                '--delay': '140ms',
                background: 'linear-gradient(135deg,#5b4fb0,#7c6ed0)',
                boxShadow: '0 6px 20px rgba(124,110,208,0.30)',
              } as React.CSSProperties}>
              Save &amp; earn +25 pts
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
