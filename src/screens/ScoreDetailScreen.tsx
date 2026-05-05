import type { Screen } from '../types';
import { scoreColor } from '../utils/score';

interface Props { onNavigate: (s: Screen) => void; scoreId?: string; }

const SCORE_DATA: Record<string, {
  label: string; score: number; color: string;
  tagline: string; description: string;
  how: string[];
  metrics: { label: string; value: string; pct: number; color: string }[];
  objectives: { label: string; match: string; color: string; note: string }[];
}> = {
  foryou: {
    label: 'Your goals', score: 6.2, color: '#7c6ed0',
    tagline: 'How well this product suits your skin goals.',
    description: 'This score combines your skin type, goals, sensitivities, and past scan history to evaluate how suitable this product is specifically for you.',
    how: [
      'We match active ingredients against your declared skin type (combination, sensitive).',
      'We weigh your skin goals (Clear skin, Hydration, Brightening) and check if key actives address them.',
      'Fragrance and irritants are penalised based on your sensitivity flags.',
      'Historical scan patterns are used to detect redundant actives in your routine.',
    ],
    metrics: [
      { label: 'Ingredient match',   value: '7 / 10', pct: 70, color: '#7c6ed0' },
      { label: 'Goals alignment',    value: '6 / 10', pct: 60, color: '#7c6ed0' },
      { label: 'Sensitivity risk',   value: '5 / 10', pct: 50, color: '#e07b2c' },
      { label: 'Redundancy check',   value: '7 / 10', pct: 70, color: '#7c6ed0' },
    ],
    objectives: [
      { label: 'Clear skin',   match: 'Good',      color: '#0d9488', note: 'Niacinamide reduces sebum and breakouts.' },
      { label: 'Hydration',    match: 'Good',      color: '#0d9488', note: 'Hyaluronic acid supports moisture barrier.' },
      { label: 'Brightening',  match: 'Medium',    color: '#e07b2c', note: 'Mild brightening over 4–6 weeks.' },
    ],
  },
  planet: {
    label: 'Planet', score: 7.8, color: '#0d9488',
    tagline: 'Environmental impact of this product.',
    description: 'Evaluates packaging recyclability, brand sustainability commitments, ingredient sourcing, and estimated carbon footprint relative to alternatives.',
    how: [
      'Packaging material and recyclability rating from our ingredient database.',
      'Brand sustainability score based on third-party audits and certifications.',
      'Ingredient sourcing: synthetic vs. naturally derived and biodegradability.',
      'CO₂ estimate based on product weight, origin, and transport distance.',
    ],
    metrics: [
      { label: 'Packaging',        value: '8 / 10', pct: 80, color: '#0d9488' },
      { label: 'Brand practices',  value: '7 / 10', pct: 70, color: '#0d9488' },
      { label: 'Ingredient source',value: '9 / 10', pct: 90, color: '#0d9488' },
      { label: 'Carbon footprint', value: '6 / 10', pct: 60, color: '#e07b2c' },
    ],
    objectives: [
      { label: 'Recyclable packaging', match: 'Yes',    color: '#0d9488', note: 'Glass bottle, widely recyclable.' },
      { label: 'Vegan formula',        match: 'Yes',    color: '#0d9488', note: 'No animal-derived ingredients.' },
      { label: 'Carbon neutral brand', match: 'Partial',color: '#e07b2c', note: 'Brand committed to 2030 target.' },
    ],
  },
  price: {
    label: 'Price', score: 5.5, color: '#be185d',
    tagline: 'Value for money vs. smarter alternatives.',
    description: 'Compares the price per ml, formula complexity, and availability against similar products with equal or better performance scores.',
    how: [
      'Price per ml calculated from average online retail price.',
      'Formula density: number of effective actives at clinically relevant concentrations.',
      'Compared against 3 nearest alternatives by ingredient profile.',
      'Discounts, subscriptions, and bundle availability are factored in.',
    ],
    metrics: [
      { label: 'Price per ml',       value: '4 / 10', pct: 40, color: '#e05c5c' },
      { label: 'Formula density',    value: '6 / 10', pct: 60, color: '#e07b2c' },
      { label: 'vs. alternatives',   value: '5 / 10', pct: 50, color: '#e07b2c' },
      { label: 'Availability',       value: '8 / 10', pct: 80, color: '#0d9488' },
    ],
    objectives: [
      { label: 'Budget friendly',   match: 'No',     color: '#dc2626', note: 'Similar formulas exist from €8.' },
      { label: 'Easy to find',      match: 'Yes',    color: '#0d9488', note: 'Available in 12+ retailers.' },
      { label: 'Subscription deal', match: 'No',     color: '#9ca3af', note: 'No subscription option found.' },
    ],
  },
  routine: {
    label: 'Routine fit', score: 6.2, color: '#be185d',
    tagline: 'How well this integrates with your current routine.',
    description: "Analyses interactions between this product's actives and the products already in your routine, checking for conflicts, redundancies, and synergies.",
    how: [
      'Conflict detection: checks for ingredient pairs that reduce efficacy (e.g. Vitamin C + Niacinamide at high %).',
      'Redundancy check: flags if you already have the same active at similar concentration.',
      'Synergy mapping: identifies beneficial combinations with your existing products.',
      'Step placement: recommends the correct routine step for application.',
    ],
    metrics: [
      { label: 'Hydration fit',    value: '82%', pct: 82, color: '#0d9488' },
      { label: 'Clear skin fit',   value: '76%', pct: 76, color: '#0d9488' },
      { label: 'Brightening fit',  value: '54%', pct: 54, color: '#e07b2c' },
      { label: 'No conflicts',     value: '60%', pct: 60, color: '#e07b2c' },
    ],
    objectives: [
      { label: 'Hydration',    match: 'Good',    color: '#0d9488', note: 'Complements your Cerave moisturiser.' },
      { label: 'Clear skin',   match: 'Good',    color: '#0d9488', note: 'Stacks well with your BHA toner.' },
      { label: 'Brightening',  match: 'Medium',  color: '#e07b2c', note: 'Avoid same step as Vitamin C serum.' },
    ],
  },
};


export default function ScoreDetailScreen({ scoreId = 'foryou' }: Props) {
  const d = SCORE_DATA[scoreId] ?? SCORE_DATA.foryou;
  const sc = scoreColor(d.score);

  return (
    <div className="px-4 pb-8 space-y-4">

      {/* ── Hero ── */}
      <div className="gc p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[22px] font-bold text-[#111827]">{d.label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-black leading-none text-[#111827]">{d.score}</span>
            <span className="text-[10px] text-[#c4c4cc]"> / 10</span>
            <span className="ml-2 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: sc, background: sc + '18' }}>
              {d.score >= 7 ? 'Good' : d.score >= 4.5 ? 'Medium' : 'To avoid'}
            </span>
          </div>
        </div>
        <p className="text-[13px] font-semibold text-[#374151] mb-1">{d.tagline}</p>
        <p className="text-[12px] text-[#9ca3af] leading-relaxed">{d.description}</p>
      </div>

      {/* ── Metrics breakdown ── */}
      <div>
        <p className="text-[13px] font-bold text-[#111827] mb-2">Score breakdown</p>
        <div className="gc overflow-hidden">
          {d.metrics.map((m, i) => {
            const barColor = scoreColor(m.pct / 10);
            return (
              <div key={m.label}
                className={`flex items-center gap-3 px-4 py-3 ${i < d.metrics.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                <span className="text-[12px] text-[#374151] w-28 shrink-0">{m.label}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: `linear-gradient(to right,${barColor}60,${barColor})` }} />
                </div>
                <div className="flex items-baseline gap-0.5 shrink-0 ml-2">
                  <span className="text-[13px] font-bold text-[#111827]">{m.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Fit with your objectives ── */}
      <div>
        <p className="text-[13px] font-bold text-[#111827] mb-2">Fit with your objectives</p>
        <div className="gc overflow-hidden">
          {d.objectives.map((o, i) => (
            <div key={o.label}
              className={`flex items-center gap-3 px-4 py-3 ${i < d.objectives.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#111827]">{o.label}</p>
                <p className="text-[11px] text-[#9ca3af] mt-0.5">{o.note}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
                style={{ color: o.color, background: o.color + '18' }}>
                {o.match}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Estimated impact (Planet only) — after score breakdown ── */}
      {scoreId === 'planet' && (
        <div>
          <p className="text-[13px] font-bold text-[#111827] mb-2">Estimated impact</p>
          <div className="gc overflow-hidden">
            {[
              { key: 'co2',     icon: '🌫', label: 'CO₂ footprint', value: '2.4 kg CO₂e',  level: 'High',   levelColor: '#dc2626', levelBg: '#fee2e2' },
              { key: 'water',   icon: '💧', label: 'Water usage',   value: '340 L / bottle', level: 'Medium', levelColor: '#e07b2c', levelBg: '#fff3e0' },
              { key: 'plastic', icon: '♻', label: 'Plastic waste',  value: '0 g',            level: 'Low',    levelColor: '#0d9488', levelBg: '#ccfbf1' },
            ].map((item, i, arr) => (
              <div key={item.key}
                className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
                <span className="text-[18px] shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#9ca3af]">{item.label}</p>
                  <p className="text-[13px] font-bold text-[#111827]">{item.value}</p>
                </div>
                <span className="text-[10px] font-bold rounded-full px-2.5 py-1 shrink-0"
                  style={{ color: item.levelColor, background: item.levelBg }}>
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── How we calculate ── */}
      <div>
        <p className="text-[13px] font-bold text-[#111827] mb-2">How we calculate this</p>
        <div className="gc overflow-hidden">
          {d.how.map((h, i) => (
            <div key={i}
              className={`flex items-start gap-3 px-4 py-3 ${i < d.how.length - 1 ? 'border-b border-black/[0.04]' : ''}`}>
              <span className="text-[10px] font-bold text-[#7c6ed0] shrink-0 mt-0.5 w-4">{i + 1}.</span>
              <p className="text-[12px] text-[#374151] leading-relaxed">{h}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
