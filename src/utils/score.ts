export function scoreColor(s: number): string {
  if (s >= 9)   return '#0d9488'; // teal    — Excellent
  if (s >= 8)   return '#059669'; // green   — Very Good
  if (s >= 7)   return '#65a30d'; // lime    — Good
  if (s >= 5)   return '#d97706'; // amber   — Average
  if (s >= 2)   return '#e07b2c'; // orange  — Bad
  return '#dc2626';               // red     — Very Bad
}

export type Verdict = 'Excellent' | 'Very Good' | 'Good' | 'Average' | 'Bad' | 'Very Bad';

export function scoreVerdict(s: number): { label: Verdict; color: string } {
  if (s >= 9) return { label: 'Excellent',  color: scoreColor(s) };
  if (s >= 8) return { label: 'Very Good',  color: scoreColor(s) };
  if (s >= 7) return { label: 'Good',       color: scoreColor(s) };
  if (s >= 5) return { label: 'Average',    color: scoreColor(s) };
  if (s >= 2) return { label: 'Bad',        color: scoreColor(s) };
  return        { label: 'Very Bad',        color: '#dc2626' };
}
