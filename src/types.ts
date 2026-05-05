export type Screen =
  | 'home'
  | 'scan'
  | 'scan-confirm'
  | 'product-result'
  | 'ingredients'
  | 'contribution'
  | 'unlock'
  | 'comparison'
  | 'routine'
  | 'discover'
  | 'transparency'
  | 'profile'
  | 'skin-goals'
  | 'notifications'
  | 'favourites'
  | 'ingredient-detail'
  | 'score-detail'
  | 'scan-history'
  | 'buy'
  | 'goals'
  | 'review';

export type SkinGoal = 'Clear skin' | 'Hydration' | 'Anti-aging' | 'Brightening' | 'Sensitive skin' | 'Even skin tone' | 'Acne/Breakouts';
export type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Normal' | 'Sensitive';
export type IngredientStatus = 'good' | 'watchout' | 'avoid';
