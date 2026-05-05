const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format&q=80`;

export type FavStatus = 'saved' | 'bought';

export const favorites = [
  { id: 'fav1', name: 'Hydrating Cleanser',          brand: 'CeraVe',          category: 'Cleanser',    score: 8.5, price: 9.90,  currency: '€', added: 'Yesterday',   type: 'skincare' as const, image: U('1556228453-efd6c1ff04f6'), status: 'saved'  as FavStatus },
  { id: 'fav2', name: 'Azelaic Acid Suspension 10%', brand: 'The Ordinary',    category: 'Treatment',   score: 9.1, price: 8.50,  currency: '€', added: 'Monday',      type: 'skincare' as const, image: U('1540555700478-4be290a1f41c'), status: 'saved'  as FavStatus },
  { id: 'fav3', name: 'Cicaplast Baume B5',           brand: 'La Roche-Posay', category: 'Moisturiser', score: 9.0, price: 12.90, currency: '€', added: 'Last week',   type: 'skincare' as const, image: U('1598440947619-2c35fc9aa908'), status: 'bought' as FavStatus },
  { id: 'fav4', name: 'Soft Pinch Liquid Blush',      brand: 'Rare Beauty',    category: 'Blush',       score: 8.3, price: 23.00, currency: '€', added: 'Last week',   type: 'makeup'   as const, image: U('1487239177913-0cf0e0e589e8'), status: 'saved'  as FavStatus },
  { id: 'fav5', name: 'Skin Perfecting 2% BHA Liquid',brand: "Paula's Choice", category: 'Exfoliant',   score: 8.9, price: 34.00, currency: '€', added: '2 weeks ago', type: 'skincare' as const, image: U('1607346256693-f45d6a8ad044'), status: 'bought' as FavStatus },
];
