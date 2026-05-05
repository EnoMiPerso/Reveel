export const rewardsData = {
  points: 240,
  target: 500,
  rewardValue: '€5',
  badges: [
    { id: 'b1', name: 'Price Scout', description: 'Confirmed 3+ prices', earned: true, icon: '🔍' },
    { id: 'b2', name: 'Marketing Detective', description: 'Flagged 1+ misleading product', earned: true, icon: '🕵️' },
    { id: 'b3', name: 'Planet Protector', description: 'Chose eco option 3+ times', earned: false, icon: '🌱' },
    { id: 'b4', name: 'Smart Skincare Rebel', description: 'Skipped 5+ unnecessary purchases', earned: false, icon: '✊' },
  ],
  history: [
    { id: 'h1', action: 'Price confirmation', detail: 'HydraLift Cream · Sephora', points: 15, date: 'Today' },
    { id: 'h2', action: 'Price confirmation', detail: 'Niacinamide 10% · ASOS', points: 15, date: 'Yesterday' },
    { id: 'h3', action: 'Product review', detail: 'CeraVe Moisturising Cream', points: 20, date: 'Mon' },
    { id: 'h4', action: 'Misleading product flagged', detail: 'Bio-Collagen Night Cream', points: 30, date: 'Sun' },
    { id: 'h5', action: 'Price confirmation', detail: 'SPF 50 · Boots', points: 15, date: 'Sat' },
    { id: 'h6', action: 'Product review', detail: 'Retinol 0.5% · Paula\'s Choice', points: 20, date: 'Fri' },
  ],
};
