import React from 'react';

// Returns a relevant SVG icon based on ingredient name keywords
export function getIngredientIcon(name: string, color: string, size = 16): React.ReactNode {
  const n = name.toLowerCase();

  // Water / hydration → drop
  if (/hyaluronic|glycerin|aqua|water|hydrat|moisture|humectant/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M12 2C8 8 5 12 5 15.5a7 7 0 0 0 14 0C19 12 16 8 12 2z" opacity="0.9"/>
      </svg>
    );

  // Vitamin C / ascorbic → citrus slice
  if (/vitamin c|ascorbic/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="15.46" y1="9.54" x2="19.07" y2="5.93"/>
        <line x1="16" y1="12" x2="21" y2="12"/>
        <line x1="15.46" y1="14.46" x2="19.07" y2="18.07"/>
        <line x1="12" y1="16" x2="12" y2="21"/>
        <line x1="8.54" y1="14.46" x2="4.93" y2="18.07"/>
        <line x1="8" y1="12" x2="3" y2="12"/>
        <line x1="8.54" y1="9.54" x2="4.93" y2="5.93"/>
      </svg>
    );

  // Brightening / kojic / arbutin / azelaic → diamond sparkle
  if (/brightening|kojic|arbutin|azelaic/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M12 2l2.5 7H22l-6 4.5 2.5 7L12 17l-6.5 3.5 2.5-7L2 9h7.5z"/>
      </svg>
    );

  // Retinol / vitamin A / anti-aging → sun
  if (/retinol|retinoid|vitamin a|bakuchiol|peptide|collagen/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </svg>
    );

  // Niacinamide / vitamin B / zinc → hexagon chemistry
  if (/niacinamide|vitamin b|zinc|ceramide|cholesterol/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 20.5 7 20.5 17 12 22 3.5 17 3.5 7"/>
        <line x1="12" y1="2" x2="12" y2="7"/>
        <line x1="12" y1="17" x2="12" y2="22"/>
      </svg>
    );

  // SPF / sun protection → shield
  if (/spf|sunscreen|titanium|zinc oxide|uv filter|octocrylene/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    );

  // Fragrance / parfum / allergen → warning
  if (/fragrance|parfum|allergen|limonene|linalool|eugenol/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    );

  // Preservatives / parabens / phenoxyethanol → lock
  if (/preservative|paraben|phenoxyethanol|methylisothiazolinone|benzyl/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    );

  // Silicones / dimethicone → layers
  if (/silicone|dimethicone|cyclomethicone|cyclopentasiloxane/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    );

  // Acids / exfoliants → lightning
  if (/acid|aha|bha|pha|salicyl|lactic|glycolic|mandelic/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    );

  // Oils / plant extracts / botanical → leaf
  if (/oil|extract|botanical|aloe|centella|green tea|chamomile|calendula/.test(n))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    );

  // Default → molecule (atom)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/>
      <circle cx="12" cy="4" r="1.5"/><circle cx="20" cy="12" r="1.5"/>
      <circle cx="12" cy="20" r="1.5"/><circle cx="4" cy="12" r="1.5"/>
      <line x1="12" y1="5.5" x2="12" y2="10"/><line x1="14" y1="12" x2="18.5" y2="12"/>
      <line x1="12" y1="14" x2="12" y2="18.5"/><line x1="5.5" y1="12" x2="10" y2="12"/>
    </svg>
  );
}
