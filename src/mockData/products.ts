import type { IngredientStatus } from '../types';

export interface Ingredient {
  id: string;
  name: string;
  status: IngredientStatus;
  description: string;
  highlight?: boolean;
}

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`;

export const scannedProduct = {
  id: 'niacinamide-001',
  name: 'Niacinamide 10% + Zinc 1%',
  brand: 'The Ordinary',
  category: 'Serum',
  tags: ['Face', '30 ml'],
  price: 7.90,
  currency: '€',
  image: U('1620916566398-39f1143ab7be'),
  matchBadge: 'Average',
  scores: {
    overall:    5.8,
    forYou:     6.2,
    planet:     4.1,
    value:      5.5,
    routineFit: 7.2,
    confidence: 'Medium' as const,
  },
  insight: "This product isn't terrible — but it's basic, overpriced, and not ideal for your skin.",
  impact: {
    co2:     { value: '1.2 kg', level: 'High'   as const },
    water:   { value: '23.7 L', level: 'High'   as const },
    plastic: { value: '32 g',   level: 'High'   as const },
  },
  warnings: [
    { id: 'w1', icon: 'skin',      text: 'May irritate sensitive skin' },
    { id: 'w2', icon: 'plastic',   text: 'Heavy plastic packaging' },
    { id: 'w3', icon: 'duplicate', text: 'You already own a similar product' },
    { id: 'w4', icon: 'conflict',  text: 'Do not combine with your retinol' },
  ],
};

export const productIngredients: Ingredient[] = [
  { id: 'i1',  name: 'Niacinamide',         status: 'good',     description: 'Good for skin · Reduces blemishes',                  highlight: true },
  { id: 'i2',  name: 'Zinc PCA',            status: 'good',     description: 'Regulates sebum · Antimicrobial',                    highlight: true },
  { id: 'i3',  name: 'Glycerin',            status: 'good',     description: 'Powerful humectant · Draws moisture into skin',      highlight: true },
  { id: 'i4',  name: 'Hyaluronic Acid',     status: 'good',     description: 'Deep hydration · Plumping effect' },
  { id: 'i5',  name: 'Pentylene Glycol',    status: 'good',     description: 'Humectant and antimicrobial booster' },
  { id: 'i6',  name: 'Arginine',            status: 'good',     description: 'Amino acid · Helps maintain skin barrier' },
  { id: 'i7',  name: 'Allantoin',           status: 'good',     description: 'Calming · Promotes cell regeneration' },
  { id: 'i8',  name: 'Water',              status: 'good',     description: 'Solvent base for the formula' },
  { id: 'i9',  name: 'Xanthan Gum',        status: 'good',     description: 'Natural thickener from fermentation' },
  { id: 'i10', name: 'Dimethicone',         status: 'watchout', description: 'Non-biodegradable · May clog pores',                 highlight: true },
  { id: 'i11', name: 'Carbomer',            status: 'watchout', description: 'Synthetic thickener · Generally safe' },
  { id: 'i12', name: 'Fragrance (Parfum)',  status: 'avoid',    description: 'Potential irritant · Common allergen',               highlight: true },
  { id: 'i13', name: 'Phenoxyethanol',      status: 'watchout', description: 'Preservative · Safe at low concentrations' },
];

type ImpactLevel = 'Low' | 'Medium' | 'High';
type Confidence  = 'Low' | 'Medium' | 'High';
interface BetterProduct {
  id: string; name: string; brand: string; category: string; tags: string[];
  price: number; currency: string; image: string; matchBadge: string;
  scores: { overall: number; forYou: number; planet: number; value: number; routineFit: number; confidence: Confidence };
  insight: string;
  impact: { co2: { value: string; level: ImpactLevel }; water: { value: string; level: ImpactLevel }; plastic: { value: string; level: ImpactLevel } };
  warnings: { id: string; icon: string; text: string }[];
}
export const betterProducts: Record<string, BetterProduct> = {
  'cerave-niacinamide': {
    id: 'cerave-niacinamide',
    name: 'Niacinamide 5% Serum',
    brand: 'CeraVe',
    category: 'Serum',
    tags: ['Face', '30 ml'],
    price: 16.99,
    currency: '€',
    image: U('1556228453-efd6c1ff04f6'),
    matchBadge: 'Good',
    scores: { overall: 9.0, forYou: 9.2, planet: 8.4, value: 8.8, routineFit: 9.1, confidence: 'High' as const },
    insight: 'Fragrance-free, gentle, and clinically proven for your skin goals. A clear upgrade.',
    impact: { co2: { value: '0.6 kg', level: 'Low' as const }, water: { value: '9.1 L', level: 'Low' as const }, plastic: { value: '14 g', level: 'Low' as const } },
    warnings: [],
  },
  'ordinary-azelaic': {
    id: 'ordinary-azelaic',
    name: 'Azelaic Acid 10%',
    brand: 'The Ordinary',
    category: 'Serum',
    tags: ['Face', '30 ml'],
    price: 8.50,
    currency: '€',
    image: U('1540555700478-4be290a1f41c'),
    matchBadge: 'Good',
    scores: { overall: 9.1, forYou: 8.9, planet: 8.6, value: 9.4, routineFit: 8.8, confidence: 'High' as const },
    insight: 'Same price range, but a significantly cleaner formula with stronger blemish-fighting actives.',
    impact: { co2: { value: '0.5 kg', level: 'Low' as const }, water: { value: '8.3 L', level: 'Low' as const }, plastic: { value: '12 g', level: 'Low' as const } },
    warnings: [],
  },
  'paulas-choice-niacinamide': {
    id: 'paulas-choice-niacinamide',
    name: 'Niacinamide Booster',
    brand: "Paula's Choice",
    category: 'Booster',
    tags: ['Face', '20 ml'],
    price: 38.00,
    currency: '€',
    image: U('1607346256693-f45d6a8ad044'),
    matchBadge: 'Good',
    scores: { overall: 8.8, forYou: 9.0, planet: 7.9, value: 7.8, routineFit: 9.0, confidence: 'High' as const },
    insight: 'No fragrance, no silicones — 4 fewer flagged ingredients. Ideal for sensitive, acne-prone skin.',
    impact: { co2: { value: '0.7 kg', level: 'Low' as const }, water: { value: '11.2 L', level: 'Low' as const }, plastic: { value: '16 g', level: 'Low' as const } },
    warnings: [{ id: 'w1', icon: 'skin', text: 'Premium price — check if goals justify cost' }],
  },
  'cosrx-centella': {
    id: 'cosrx-centella',
    name: 'Centella Toner',
    brand: 'COSRX',
    category: 'Toner',
    tags: ['Face', '150 ml'],
    price: 11.50,
    currency: '€',
    image: U('1598440947619-2c35fc9aa908'),
    matchBadge: 'Good',
    scores: { overall: 8.5, forYou: 8.3, planet: 9.1, value: 9.0, routineFit: 8.4, confidence: 'High' as const },
    insight: 'Locally sourced, minimal packaging, 33% lower carbon footprint — and gentle on skin.',
    impact: { co2: { value: '0.4 kg', level: 'Low' as const }, water: { value: '7.8 L', level: 'Low' as const }, plastic: { value: '10 g', level: 'Low' as const } },
    warnings: [],
  },
  'kiehls-hydra': {
    id: 'kiehls-hydra',
    name: 'Hydra Bright Booster',
    brand: "Kiehl's",
    category: 'Booster',
    tags: ['Face', '28 ml'],
    price: 42.00,
    currency: '€',
    image: U('1487239177913-0cf0e0e589e8'),
    matchBadge: 'Good',
    scores: { overall: 8.6, forYou: 9.1, planet: 7.6, value: 7.2, routineFit: 8.9, confidence: 'High' as const },
    insight: 'Stronger brightening actives, better suited for your even skin tone goal.',
    impact: { co2: { value: '0.8 kg', level: 'Medium' as const }, water: { value: '14.0 L', level: 'Medium' as const }, plastic: { value: '20 g', level: 'Medium' as const } },
    warnings: [{ id: 'w1', icon: 'skin', text: 'Higher price point' }],
  },
};

export const betterIngredients: Record<string, typeof productIngredients> = {
  'cerave-niacinamide': [
    { id: 'i1', name: 'Niacinamide',      status: 'good', description: 'Clinically proven · Reduces blemishes & pores', highlight: true },
    { id: 'i2', name: 'Hyaluronic Acid',  status: 'good', description: 'Deep hydration · Plumping effect',              highlight: true },
    { id: 'i3', name: 'Ceramide NP',      status: 'good', description: 'Strengthens skin barrier · Locks in moisture',  highlight: true },
    { id: 'i4', name: 'Glycerin',         status: 'good', description: 'Powerful humectant' },
    { id: 'i5', name: 'Niacinamide',      status: 'good', description: 'Reduces inflammation' },
    { id: 'i6', name: 'Carbomer',         status: 'watchout', description: 'Synthetic thickener · Generally safe' },
  ],
  'ordinary-azelaic': [
    { id: 'i1', name: 'Azelaic Acid',     status: 'good', description: 'Fights blemishes & hyperpigmentation', highlight: true },
    { id: 'i2', name: 'Glycerin',         status: 'good', description: 'Humectant · Moisture retention',       highlight: true },
    { id: 'i3', name: 'Isoceteth-20',     status: 'good', description: 'Emulsifier · Skin-safe' },
    { id: 'i4', name: 'Dimethicone',      status: 'watchout', description: 'Non-biodegradable silicone' },
  ],
  default: productIngredients.filter(i => i.status === 'good'),
};

export const alternativeProduct = {
  id: 'pureage-001',
  name: 'PureAge Peptide Day Cream',
  brand: 'Aesop',
  category: 'Day Cream',
  price: 36,
  currency: '€',
  scores: { forYou: 8.7, planet: 7.8, value: 7.2 },
  reasons: ['Fragrance-free', 'Better for sensitive skin', 'Lower environmental impact'],
};

export const moreAlternatives = [
  { id: 'a1', name: 'Hyaluronic Acid 2% + B5', brand: 'The Ordinary',   price: 6.80,  score: 8.6, currency: '€' },
  { id: 'a2', name: 'B-Bomb',                   brand: 'Geek & Gorgeous', price: 10.50, score: 8.5, currency: '€' },
  { id: 'a3', name: 'Hyaluronic Acid Serum',    brand: 'The Inkey List', price: 8.99,  score: 8.2, currency: '€' },
];

export const retailers = [
  { id: 'r1', name: 'Lookfantastic', price: 6.90, bg: '#e05c5c', color: '#fff', letter: 'L', inStock: true,  delivery: 'Free shipping',  eco: 9, rank: 'top' as const },
  { id: 'r2', name: 'Amazon',        price: 6.90, bg: '#1a1a1a', color: '#fff', letter: 'a', inStock: true,  delivery: 'Next day',        eco: 5, rank: null },
  { id: 'r3', name: 'Sephora',       price: 7.90, bg: '#000',    color: '#fff', letter: 'S', inStock: true,  delivery: 'Click & collect', eco: 7, rank: null },
  { id: 'r4', name: 'Douglas',       price: 8.99, bg: '#7c3aed', color: '#fff', letter: 'D', inStock: false, delivery: 'Ships in 3–5 days', eco: 6, rank: null },
];
