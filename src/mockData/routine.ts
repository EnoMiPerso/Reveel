const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`;

export const routine = {
  score: 7.8,
  morning: [
    { id: 'm1', name: 'Hydrating Cleanser',         brand: 'CeraVe',          category: 'Cleanser',    score: 8.5, image: U('1556228453-efd6c1ff04f6') },
    { id: 'm2', name: 'Niacinamide 10% + Zinc 1%',  brand: 'The Ordinary',    category: 'Serum',       score: 7.5, image: U('1620916566398-39f1143ab7be') },
    { id: 'm3', name: 'Cicaplast Baume B5',          brand: 'La Roche-Posay',  category: 'Moisturiser', score: 9.0, image: U('1598440947619-2c35fc9aa908') },
    { id: 'm4', name: 'Anthelios UVMune 400 SPF 50+',brand: 'La Roche-Posay',  category: 'Sunscreen',   score: 8.8, image: U('1571781926291-c477ebfd024b') },
  ],
  night: [
    { id: 'n1', name: 'Foaming Facial Cleanser',    brand: 'CeraVe',          category: 'Cleanser',    score: 8.7, image: U('1535585209-fd1a8b9d4e0c') },
    { id: 'n2', name: 'Skin Perfecting 2% BHA',     brand: "Paula's Choice",  category: 'Exfoliant',   score: 8.6, image: U('1607346256693-f45d6a8ad044') },
    { id: 'n3', name: 'Glycolic Acid 7% Toning Solution', brand: 'The Ordinary', category: 'Toner',    score: 7.2, image: U('1611080626903-33c73b9a36c8') },
    { id: 'n4', name: 'Moisturising Cream',          brand: 'CeraVe',          category: 'Moisturiser', score: 8.6, image: U('1556228578-8c89e6adf883') },
  ],
  mixConflicts: [
    {
      id: 'c1',
      severity: 'high' as const,
      products: ['Skin Perfecting 2% BHA', 'Glycolic Acid 7% Toning Solution'],
      reason: 'Using BHA with glycolic acid increases irritation and reduces effectiveness of both.',
      advice: 'Alternate nights: BHA odd days, glycolic even days.',
    },
    {
      id: 'c2',
      severity: 'medium' as const,
      products: ['Niacinamide 10%', 'Skin Perfecting 2% BHA'],
      reason: 'Niacinamide may slightly buffer BHA absorption when used together.',
      advice: 'Apply niacinamide first, wait 15 min before exfoliant.',
    },
  ],
  mixOk: [
    { id: 'o1', products: ['Hydrating Cleanser', 'Niacinamide 10%'], reason: 'Great combo — cleanser preps skin for niacinamide absorption.' },
    { id: 'o2', products: ['Cicaplast Baume B5', 'Anthelios UVMune 400 SPF 50+'], reason: 'Applying moisturiser before SPF is the correct order.' },
  ],
  insight: 'Good balance! Your routine supports your skin goals.',
  beauty: [
    { id: 'b1', name: 'Radiant Creamy Concealer',    brand: 'NARS',              category: 'Concealer',  score: 7.8, image: U('1522335789-d472550a3e80') },
    { id: 'b2', name: 'Soft Matte Complete Foundation', brand: 'NARS',           category: 'Foundation', score: 7.2, image: U('1503236823255-94609f598e71') },
    { id: 'b3', name: 'Airbrush Flawless Primer',    brand: 'Charlotte Tilbury', category: 'Primer',     score: 6.8, image: U('1596462502278-27bfdc403348') },
    { id: 'b4', name: 'Roller Lash Curling Mascara', brand: 'Benefit',           category: 'Mascara',    score: 8.1, image: U('1512496015851-cbca30dfef47') },
    { id: 'b5', name: 'Soft Pinch Liquid Blush',     brand: 'Rare Beauty',       category: 'Blush',      score: 8.3, image: U('1487239177913-0cf0e0e589e8') },
    { id: 'b6', name: 'Balmy Tint Hydrating Lip Balm', brand: 'ILIA',            category: 'Lip',        score: 8.7, image: U('1599305020479-9cde55013e66') },
  ],
  beautyMixConflicts: [
    {
      id: 'bc1',
      severity: 'medium' as const,
      products: ['Airbrush Flawless Primer', 'Soft Matte Complete Foundation'],
      reason: 'Silicone-based primer can pill under a water-based foundation.',
      advice: 'Wait 60 seconds after primer before applying foundation.',
    },
  ],
  beautyMixOk: [
    { id: 'bo1', products: ['Radiant Creamy Concealer', 'Soft Matte Complete Foundation'], reason: 'Same formula family — blend seamlessly.' },
    { id: 'bo2', products: ['Roller Lash Curling Mascara', 'Soft Pinch Liquid Blush'], reason: 'No interaction — apply in any order.' },
  ],
};
