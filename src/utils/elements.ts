import elementsData from '../data/elements.json';

export interface ElementData {
  z: number; symbol: string; nameEn: string; nameZh: string;
  weight: number; category: string; col: number; row: number;
  period: number; group: number | null; block: string;
  electronConfig: string; shells: number[]; oxidation: number[];
  electronegativity: number | null; atomicRadius: number | null;
  ionicRadius: number | null; melting: number | null; boiling: number | null;
  density: number | null; state: string; crystal: string | null;
  year: number | null; discoverer: string; country: string;
  uses: string; mnemonicEn: string; mnemonicZh: string; color: string;
}

const elements: ElementData[] = elementsData as ElementData[];

export function getAllElements(): ElementData[] { return elements; }
export function getElementByZ(z: number): ElementData | undefined { return elements.find(e => e.z === z); }
export function getElementBySymbol(symbol: string): ElementData | undefined { return elements.find(e => e.symbol.toLowerCase() === symbol.toLowerCase()); }

export function searchElements(query: string): ElementData[] {
  const q = query.toLowerCase().trim();
  if (!q) return elements;
  return elements.filter(e =>
    e.symbol.toLowerCase().includes(q) ||
    e.nameEn.toLowerCase().includes(q) ||
    e.nameZh.includes(q) ||
    String(e.z) === q
  );
}

export const CATEGORIES = [
  { key: 'alkali', label: 'Alkali Metals', labelZh: '碱金属' },
  { key: 'alkaline', label: 'Alkaline Earth', labelZh: '碱土金属' },
  { key: 'transition', label: 'Transition Metals', labelZh: '过渡金属' },
  { key: 'post-transition', label: 'Post-Transition', labelZh: '后过渡金属' },
  { key: 'metalloid', label: 'Metalloids', labelZh: '准金属' },
  { key: 'nonmetal', label: 'Nonmetals', labelZh: '非金属' },
  { key: 'halogen', label: 'Halogens', labelZh: '卤素' },
  { key: 'noble', label: 'Noble Gases', labelZh: '稀有气体' },
  { key: 'lanthanide', label: 'Lanthanides', labelZh: '镧系元素' },
  { key: 'actinide', label: 'Actinides', labelZh: '锕系元素' },
];

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    alkali: 'var(--cat-alkali)', alkaline: 'var(--cat-alkaline)',
    transition: 'var(--cat-transition)', 'post-transition': 'var(--cat-post-transition)',
    metalloid: 'var(--cat-metalloid)', nonmetal: 'var(--cat-nonmetal)',
    halogen: 'var(--cat-halogen)', noble: 'var(--cat-noble)',
    lanthanide: 'var(--cat-lanthanide)', actinide: 'var(--cat-actinide)',
  };
  return map[category] || 'var(--text-dim)';
}

export function formatTemperature(c: number | null): string {
  if (c === null) return '—';
  return `${c > 0 ? '+' : ''}${c}°C`;
}

export function formatDensity(d: number | null): string {
  if (d === null) return '—';
  return d < 0.01 ? `${d} g/cm³` : `${d.toFixed(2)} g/cm³`;
}
