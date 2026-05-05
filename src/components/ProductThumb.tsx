import { useState } from 'react';

interface Props {
  image?: string;
  size?: number;
  radius?: number;
  type?: 'skincare' | 'makeup';
}

export default function ProductThumb({ image, size = 40, radius = 12, type = 'skincare' }: Props) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      <div
        className="shrink-0 overflow-hidden"
        style={{ width: size, height: size, borderRadius: radius, background: 'rgba(237,233,251,0.40)' }}>
        <img
          src={image}
          alt=""
          width={size}
          height={size}
          onError={() => setFailed(true)}
          style={{ width: size, height: size, objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  // SVG fallback
  const isMakeup = type === 'makeup';
  return (
    <div className="shrink-0 flex items-center justify-center"
      style={{
        width: size, height: size, borderRadius: radius,
        background: isMakeup ? 'rgba(253,232,242,0.60)' : 'rgba(237,233,251,0.50)',
        border: `1px solid ${isMakeup ? 'rgba(244,114,182,0.12)' : 'rgba(167,139,250,0.12)'}`,
      }}>
      {isMakeup ? (
        <svg width={size * 0.35} height={size * 0.45} viewBox="0 0 50 70" fill="none">
          <rect x="17" y="2"  width="16" height="20" rx="4"  fill="rgba(249,168,212,0.55)"/>
          <rect x="8"  y="20" width="34" height="44" rx="10" fill="rgba(253,232,242,0.90)"/>
          <rect x="14" y="30" width="22" height="24" rx="6"  fill="rgba(249,168,212,0.45)"/>
        </svg>
      ) : (
        <svg width={size * 0.3} height={size * 0.45} viewBox="0 0 60 80" fill="none">
          <rect x="10" y="4"  width="40" height="10" rx="5"  fill="rgba(200,190,240,0.65)"/>
          <rect x="4"  y="14" width="52" height="58" rx="10" fill="rgba(237,233,251,0.90)"/>
          <rect x="12" y="26" width="36" height="30" rx="7"  fill="rgba(220,215,248,0.70)"/>
        </svg>
      )}
    </div>
  );
}
