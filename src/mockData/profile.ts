import type { SkinGoal, SkinType } from '../types';

export const userProfile = {
  name: 'Alex',
  skinType: 'Combination' as SkinType,
  goals: ['Clear skin', 'Hydration', 'Anti-aging'] as SkinGoal[],
  stats: {
    scansTotal: 47,
    savedThisMonth: 18,
    productsSkipped: 12,
    points: 240,
  },
  topIngredients: [
    { name: 'Niacinamide', count: 4, color: '#0d9488' },
    { name: 'Hyaluronic Acid', count: 3, color: '#2563eb' },
    { name: 'Vitamin C', count: 2, color: '#d97706' },
    { name: 'Salicylic Acid', count: 2, color: '#7c3aed' },
  ],
};

export const allGoals: SkinGoal[] = [
  'Clear skin',
  'Hydration',
  'Anti-aging',
  'Brightening',
  'Sensitive skin',
  'Even skin tone',
  'Acne/Breakouts',
];
