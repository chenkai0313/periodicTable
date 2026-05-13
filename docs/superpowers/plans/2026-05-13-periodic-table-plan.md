# Periodic Table Website - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Web3 dark-themed periodic table website with element lookup, detail pages, comparison, and learning tools.

**Architecture:** Astro static site with CSS Grid periodic table layout. All 118 element records in one JSON file. Client-side JS for search, filter, comparison state, equation balancing, and flashcards. Each element gets a static detail page at `/element/[atomicNumber]`.

**Tech Stack:** Astro 5, CSS (variables + glassmorphism + animations), vanilla TypeScript for interactivity, no UI framework.

**File Structure:**
```
src/
├── pages/
│   ├── index.astro                    # Homepage - full periodic table
│   ├── element/
│   │   └── [atomicNumber].astro       # Element detail (static paths for all 118)
│   ├── tools/
│   │   ├── balancer.astro             # Chemical equation balancer
│   │   ├── reference.astro            # Quick reference tables
│   │   └── flashcards.astro           # Memory flashcards
│   └── compare.astro                  # Element comparison page
├── components/
│   ├── Layout.astro                   # Shared page shell (head, navbar, footer)
│   ├── PeriodicTable.astro            # The 18-col grid of ElementTiles
│   ├── ElementTile.astro              # Single element card in the grid
│   ├── SearchBar.astro                # Search input + category filter chips
│   ├── ElementDetail.astro            # Full properties panel for detail page
│   ├── ElectronShell.astro            # Animated concentric shell diagram
│   ├── CompareDrawer.astro            # Slide-out compare tray
│   ├── EquationBalancer.astro         # Balancer widget (client island)
│   ├── ReferenceTables.astro          # Valence, solubility, activity tables
│   ├── FlashcardDeck.astro            # Card deck with filters + flip
│   ├── ParticleBg.astro               # Subtle starfield/particle background
│   └── Navbar.astro                   # Top navigation bar
├── data/
│   └── elements.json                  # All 118 elements with full properties
├── utils/
│   ├── elements.ts                    # Load, search, filter, get by Z
│   ├── chemistry.ts                   # Equation balancer, valence helpers
│   └── compare.ts                     # Compare queue (Set<atomicNumber>)
└── styles/
    └── global.css                     # CSS variables, reset, base, utilities
astro.config.mjs
package.json
tsconfig.json
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: directory structure

- [ ] **Step 1: Scaffold Astro project**

```bash
cd /Users/ck/Documents/go/demo/periodicTable
npm create astro@latest . -- --template minimal --typescript strict --skip-houston
```

- [ ] **Step 2: Create directory structure**

```bash
mkdir -p src/pages/element src/pages/tools
mkdir -p src/components
mkdir -p src/data
mkdir -p src/utils
mkdir -p src/styles
mkdir -p public
```

- [ ] **Step 3: Verify scaffold**

```bash
ls -la src/
npx astro check 2>&1 || true
```

Expected: directory structure exists, no critical errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with directory structure"
```

---

### Task 2: Complete Elements JSON Data

**Files:**
- Create: `src/data/elements.json`

- [ ] **Step 1: Create elements.json with all 118 elements**

Each element record:
```json
{
  "z": 1,
  "symbol": "H",
  "nameEn": "Hydrogen",
  "nameZh": "氢",
  "weight": 1.008,
  "category": "nonmetal",
  "col": 1,
  "row": 1,
  "period": 1,
  "group": 1,
  "block": "s",
  "electronConfig": "1s¹",
  "shells": [1],
  "oxidation": [-1, 1],
  "electronegativity": 2.20,
  "atomicRadius": 53,
  "ionicRadius": null,
  "melting": -259.14,
  "boiling": -252.87,
  "density": 0.00008988,
  "state": "gas",
  "crystal": "hexagonal",
  "year": 1766,
  "discoverer": "Henry Cavendish",
  "country": "England",
  "uses": "Rocket fuel, ammonia production, hydrogenation of oils",
  "mnemonicEn": "The lightest element, number one",
  "mnemonicZh": "最轻元素，宇宙第一",
  "color": "colorless gas"
}
```

Write the complete JSON file with all 118 elements. Key layout mapping:

**Period 1 (row 1):** H(col 1), He(col 18)
**Period 2 (row 2):** Li(1), Be(2), B(13), C(14), N(15), O(16), F(17), Ne(18)
**Period 3 (row 3):** Na(1), Mg(2), Al(13), Si(14), P(15), S(16), Cl(17), Ar(18)
**Period 4 (row 4):** K(1) through Kr(18), all 18 columns
**Period 5 (row 5):** Rb(1) through Xe(18), all 18 columns
**Period 6 (row 6):** Cs(1), Ba(2), La(3),[lanthanides in row 8], Hf(4)-Rn(18)
**Lanthanides (row 8):** Ce(4)-Lu(17), 14 elements
**Period 7 (row 7):** Fr(1), Ra(2), Ac(3),[actinides in row 9], Rf(4)-Og(18)
**Actinides (row 9):** Th(4)-Lr(17), 14 elements

Categories (color key):
- `alkali` - alkali metals (Li, Na, K, Rb, Cs, Fr)
- `alkaline` - alkaline earth (Be, Mg, Ca, Sr, Ba, Ra)
- `transition` - transition metals
- `post-transition` - Al, Ga, In, Sn, Tl, Pb, Bi, Nh, Fl, Mc, Lv
- `metalloid` - B, Si, Ge, As, Sb, Te, Po, At
- `nonmetal` - H, C, N, O, P, S, Se
- `halogen` - F, Cl, Br, I, Ts
- `noble` - He, Ne, Ar, Kr, Xe, Rn, Og
- `lanthanide` - La-Lu
- `actinide` - Ac-Lr

- [ ] **Step 2: Validate JSON is well-formed**

```bash
node -e "const d=require('./src/data/elements.json'); console.log('Elements:', d.length); console.log('First:', d[0].nameEn); console.log('Last:', d[117].nameEn);"
```

Expected: `Elements: 118`, First: `Hydrogen`, Last: `Oganesson`

- [ ] **Step 3: Commit**

```bash
git add src/data/elements.json
git commit -m "feat: add complete 118-element data with IUPAC grid positions"
```

---

### Task 3: Global CSS

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write global CSS with design system tokens**

```css
/* === Reset & Base === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg-root);
  color: var(--text-primary);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* === CSS Variables === */
:root {
  /* Background */
  --bg-root: #060612;
  --bg-surface: #0c0c24;
  --bg-card: rgba(14, 14, 40, 0.65);
  --bg-card-hover: rgba(18, 18, 55, 0.8);

  /* Text */
  --text-primary: #e8e6f0;
  --text-secondary: #9898c0;
  --text-dim: #5a5a80;
  --text-accent: #c4b5fd;

  /* Borders & Glass */
  --border-glass: rgba(255, 255, 255, 0.06);
  --border-glow: rgba(120, 100, 255, 0.2);
  --glass-blur: blur(12px);
  --glass-bg: rgba(10, 10, 40, 0.5);

  /* Category Colors - Neon palette */
  --cat-alkali: #ff5252;
  --cat-alkaline: #ff9100;
  --cat-transition: #40c4ff;
  --cat-post-transition: #69f0ae;
  --cat-metalloid: #ffd740;
  --cat-nonmetal: #7c4dff;
  --cat-halogen: #ff4081;
  --cat-noble: #18ffff;
  --cat-lanthanide: #b2ff59;
  --cat-actinide: #ff6e40;

  /* Glow intensities */
  --glow-weak: 0 0 8px;
  --glow-strong: 0 0 20px;

  /* Typography */
  --font-display: 'Space Grotesk', 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  --font-body: 'Outfit', 'DM Sans', system-ui, sans-serif;

  /* Spacing & Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
}

/* === Typography === */
h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; }
h1 { font-size: 2.5rem; line-height: 1.1; }
h2 { font-size: 1.75rem; }
h3 { font-size: 1.25rem; }

/* === Animations === */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: var(--glow-weak) currentColor; }
  50%      { box-shadow: var(--glow-strong) currentColor; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes orbitRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes starTwinkle {
  0%, 100% { opacity: 0.3; }
  50%      { opacity: 1; }
}

/* === Utility Classes === */
.glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-glass);
}
.glass-glow {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-glow);
}
.text-gradient {
  background: linear-gradient(135deg, #c4b5fd, #7c4dff, #40c4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === Scrollbar === */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg-root); }
::-webkit-scrollbar-thumb { background: rgba(120, 100, 255, 0.3); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(120, 100, 255, 0.5); }

/* === Selection === */
::selection { background: rgba(124, 77, 255, 0.4); color: #fff; }
```

- [ ] **Step 2: Verify CSS parses**

```bash
npx astro check
```
Expected: no CSS errors in build output.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS design system - Web3 dark theme"
```

---

### Task 4: Element Data Utilities

**Files:**
- Create: `src/utils/elements.ts`

- [ ] **Step 1: Write element utility functions**

```typescript
import elementsData from '../data/elements.json';

export interface ElementData {
  z: number;
  symbol: string;
  nameEn: string;
  nameZh: string;
  weight: number;
  category: string;
  col: number;
  row: number;
  period: number;
  group: number;
  block: string;
  electronConfig: string;
  shells: number[];
  oxidation: number[];
  electronegativity: number | null;
  atomicRadius: number | null;
  ionicRadius: number | null;
  melting: number | null;
  boiling: number | null;
  density: number | null;
  state: string;
  crystal: string;
  year: number | null;
  discoverer: string;
  country: string;
  uses: string;
  mnemonicEn: string;
  mnemonicZh: string;
  color: string;
}

const elements: ElementData[] = elementsData as ElementData[];

export function getAllElements(): ElementData[] {
  return elements;
}

export function getElementByZ(z: number): ElementData | undefined {
  return elements.find(e => e.z === z);
}

export function getElementBySymbol(symbol: string): ElementData | undefined {
  return elements.find(e => e.symbol.toLowerCase() === symbol.toLowerCase());
}

export function getElementsByCategory(category: string): ElementData[] {
  return elements.filter(e => e.category === category);
}

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
    alkali: 'var(--cat-alkali)',
    alkaline: 'var(--cat-alkaline)',
    transition: 'var(--cat-transition)',
    'post-transition': 'var(--cat-post-transition)',
    metalloid: 'var(--cat-metalloid)',
    nonmetal: 'var(--cat-nonmetal)',
    halogen: 'var(--cat-halogen)',
    noble: 'var(--cat-noble)',
    lanthanide: 'var(--cat-lanthanide)',
    actinide: 'var(--cat-actinide)',
  };
  return map[category] || 'var(--text-dim)';
}

export function getStateSymbol(state: string): string {
  const map: Record<string, string> = {
    gas: '⬤',
    liquid: '◉',
    solid: '⬤',
    synthetic: '⊗',
  };
  return map[state] || '⬤';
}

export function formatTemperature(c: number | null): string {
  if (c === null) return '—';
  return `${c > 0 ? '+' : ''}${c}°C`;
}

export function formatDensity(d: number | null): string {
  if (d === null) return '—';
  return d < 0.01 ? `${d} g/cm³` : `${d.toFixed(2)} g/cm³`;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/elements.ts
git commit -m "feat: add element data utility functions"
```

---

### Task 5: Chemistry Utilities

**Files:**
- Create: `src/utils/chemistry.ts`

- [ ] **Step 1: Write equation balancer and chemistry helpers**

```typescript
export interface Compound {
  elements: Map<string, number>;
  charge: number;
}

function parseCompound(formula: string): Compound {
  const elements = new Map<string, number>();
  let i = 0;
  while (i < formula.length) {
    if (formula[i] === '(') {
      const close = formula.indexOf(')', i);
      const inner = formula.slice(i + 1, close);
      i = close + 1;
      let count = '';
      while (i < formula.length && /\d/.test(formula[i])) { count += formula[i]; i++; }
      const mult = count ? parseInt(count) : 1;
      const innerCompound = parseCompound(inner);
      for (const [el, n] of innerCompound.elements) {
        elements.set(el, (elements.get(el) || 0) + n * mult);
      }
    } else if (/[A-Z]/.test(formula[i])) {
      let el = formula[i]; i++;
      while (i < formula.length && /[a-z]/.test(formula[i])) { el += formula[i]; i++; }
      let count = '';
      while (i < formula.length && /\d/.test(formula[i])) { count += formula[i]; i++; }
      const n = count ? parseInt(count) : 1;
      elements.set(el, (elements.get(el) || 0) + n);
    } else {
      i++;
    }
  }
  return { elements, charge: 0 };
}

function parseSide(side: string): string[] {
  return side.split('+').map(s => s.trim()).filter(Boolean);
}

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export function balanceEquation(input: string): string | null {
  const parts = input.split(/[→⟶=]/);
  if (parts.length !== 2) return null;
  const reactants = parseSide(parts[0]);
  const products = parseSide(parts[1]);
  if (reactants.length === 0 || products.length === 0) return null;

  const allCompounds = [...reactants, ...products];
  const compounds = allCompounds.map(parseCompound);
  const allElements = new Set<string>();
  compounds.forEach(c => c.elements.forEach((_, el) => allElements.add(el)));
  const elArr = Array.from(allElements);

  // Try brute force coefficients 1-10 for small equations
  function tryCoeffs(): number[] | null {
    const n = allCompounds.length;
    const maxC = 12;
    const coeffs = new Array(n).fill(1);

    function check(): boolean {
      for (const el of elArr) {
        let lhs = 0, rhs = 0;
        for (let i = 0; i < reactants.length; i++) {
          lhs += coeffs[i] * (compounds[i].elements.get(el) || 0);
        }
        for (let i = 0; i < products.length; i++) {
          rhs += coeffs[reactants.length + i] * (compounds[reactants.length + i].elements.get(el) || 0);
        }
        if (lhs !== rhs) return false;
      }
      return true;
    }

    function recurse(idx: number): boolean {
      if (idx === n) return check();
      for (let c = 1; c <= maxC; c++) {
        coeffs[idx] = c;
        if (recurse(idx + 1)) return true;
      }
      return false;
    }
    return recurse(0) ? coeffs : null;
  }

  const result = tryCoeffs();
  if (!result) return null;

  const lhsStr = reactants.map((r, i) => {
    const c = result[i];
    return (c === 1 ? '' : String(c)) + r;
  }).join(' + ');

  const rhsStr = products.map((p, i) => {
    const c = result[reactants.length + i];
    return (c === 1 ? '' : String(c)) + p;
  }).join(' + ');

  return `${lhsStr} → ${rhsStr}`;
}

// Common school-level reference data
export const VALENCE_DATA: Record<string, number[]> = {
  'H': [1], 'He': [0], 'Li': [1], 'Be': [2], 'B': [3], 'C': [2, 4, -4],
  'N': [-3, 3, 5], 'O': [-2], 'F': [-1], 'Ne': [0], 'Na': [1], 'Mg': [2],
  'Al': [3], 'Si': [4, -4], 'P': [-3, 3, 5], 'S': [-2, 4, 6], 'Cl': [-1, 1, 3, 5, 7],
  'Ar': [0], 'K': [1], 'Ca': [2], 'Sc': [3], 'Ti': [3, 4], 'V': [2, 3, 4, 5],
  'Cr': [2, 3, 6], 'Mn': [2, 4, 7], 'Fe': [2, 3], 'Co': [2, 3], 'Ni': [2, 3],
  'Cu': [1, 2], 'Zn': [2], 'Br': [-1, 1, 5], 'Ag': [1], 'I': [-1, 1, 5, 7],
  'Pt': [2, 4], 'Au': [1, 3], 'Hg': [1, 2], 'Pb': [2, 4], 'Sn': [2, 4],
};

export const SOLUBILITY_DATA: Array<{ ion: string; cl: string; so4: string; co3: string; oh: string; no3: string }> = [
  { ion: 'Na⁺', cl: 'S', so4: 'S', co3: 'S', oh: 'S', no3: 'S' },
  { ion: 'K⁺', cl: 'S', so4: 'S', co3: 'S', oh: 'S', no3: 'S' },
  { ion: 'NH₄⁺', cl: 'S', so4: 'S', co3: 'S', oh: 'S', no3: 'S' },
  { ion: 'Mg²⁺', cl: 'S', so4: 'S', co3: 'I', oh: 'I', no3: 'S' },
  { ion: 'Ca²⁺', cl: 'S', so4: 's', co3: 'I', oh: 's', no3: 'S' },
  { ion: 'Ba²⁺', cl: 'S', so4: 'I', co3: 'I', oh: 'S', no3: 'S' },
  { ion: 'Fe²⁺', cl: 'S', so4: 'S', co3: 'I', oh: 'I', no3: 'S' },
  { ion: 'Fe³⁺', cl: 'S', so4: 'S', co3: '—', oh: 'I', no3: 'S' },
  { ion: 'Cu²⁺', cl: 'S', so4: 'S', co3: 'I', oh: 'I', no3: 'S' },
  { ion: 'Zn²⁺', cl: 'S', so4: 'S', co3: 'I', oh: 'I', no3: 'S' },
  { ion: 'Al³⁺', cl: 'S', so4: 'S', co3: '—', oh: 'I', no3: 'S' },
  { ion: 'Ag⁺', cl: 'I', so4: 's', co3: 'I', oh: 'I', no3: 'S' },
  { ion: 'Pb²⁺', cl: 's', so4: 'I', co3: 'I', oh: 'I', no3: 'S' },
];

export const ACTIVITY_SERIES = [
  { metal: 'K', name: 'Potassium', nameZh: '钾', reactsWater: true, reactsAcid: true },
  { metal: 'Ca', name: 'Calcium', nameZh: '钙', reactsWater: true, reactsAcid: true },
  { metal: 'Na', name: 'Sodium', nameZh: '钠', reactsWater: true, reactsAcid: true },
  { metal: 'Mg', name: 'Magnesium', nameZh: '镁', reactsWater: true, reactsAcid: true },
  { metal: 'Al', name: 'Aluminium', nameZh: '铝', reactsWater: false, reactsAcid: true },
  { metal: 'Zn', name: 'Zinc', nameZh: '锌', reactsWater: false, reactsAcid: true },
  { metal: 'Fe', name: 'Iron', nameZh: '铁', reactsWater: false, reactsAcid: true },
  { metal: 'Sn', name: 'Tin', nameZh: '锡', reactsWater: false, reactsAcid: true },
  { metal: 'Pb', name: 'Lead', nameZh: '铅', reactsWater: false, reactsAcid: true },
  { metal: 'Cu', name: 'Copper', nameZh: '铜', reactsWater: false, reactsAcid: false },
  { metal: 'Hg', name: 'Mercury', nameZh: '汞', reactsWater: false, reactsAcid: false },
  { metal: 'Ag', name: 'Silver', nameZh: '银', reactsWater: false, reactsAcid: false },
  { metal: 'Pt', name: 'Platinum', nameZh: '铂', reactsWater: false, reactsAcid: false },
  { metal: 'Au', name: 'Gold', nameZh: '金', reactsWater: false, reactsAcid: false },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/chemistry.ts
git commit -m "feat: add chemistry utilities - balancer, reference data"
```

---

### Task 6: Compare Queue Utility

**Files:**
- Create: `src/utils/compare.ts`

- [ ] **Step 1: Write compare store**

```typescript
const STORAGE_KEY = 'pt-compare';

export function getCompareQueue(): number[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveQueue(queue: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
}

export function addToCompare(z: number): number[] {
  const queue = getCompareQueue();
  if (queue.includes(z)) return queue;
  if (queue.length >= 4) return queue;
  queue.push(z);
  saveQueue(queue);
  window.dispatchEvent(new CustomEvent('compare-updated', { detail: queue }));
  return queue;
}

export function removeFromCompare(z: number): number[] {
  let queue = getCompareQueue();
  queue = queue.filter(n => n !== z);
  saveQueue(queue);
  window.dispatchEvent(new CustomEvent('compare-updated', { detail: queue }));
  return queue;
}

export function clearCompare(): void {
  saveQueue([]);
  window.dispatchEvent(new CustomEvent('compare-updated', { detail: [] }));
}

export function isInCompare(z: number): boolean {
  return getCompareQueue().includes(z);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/compare.ts
git commit -m "feat: add compare queue utility with localStorage"
```

---

### Task 7: ParticleBg Component

**Files:**
- Create: `src/components/ParticleBg.astro`

- [ ] **Step 1: Write animated starfield background**

```astro
---
// ParticleBg.astro - Subtle animated starfield using CSS only
---
<style is:global>
  .particle-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .particle-bg::before {
    content: '';
    position: absolute;
    inset: -50%;
    background-image:
      radial-gradient(1px 1px at 10% 20%, rgba(255, 255, 255, 0.8), transparent),
      radial-gradient(1px 1px at 20% 60%, rgba(180, 160, 255, 0.7), transparent),
      radial-gradient(1px 1px at 35% 15%, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(1.5px 1.5px at 50% 45%, rgba(150, 200, 255, 0.9), transparent),
      radial-gradient(0.8px 0.8px at 65% 75%, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(1.2px 1.2px at 80% 30%, rgba(180, 130, 255, 0.7), transparent),
      radial-gradient(0.6px 0.6px at 15% 85%, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(1px 1px at 40% 90%, rgba(120, 180, 255, 0.8), transparent),
      radial-gradient(1.4px 1.4px at 70% 10%, rgba(255, 255, 255, 0.7), transparent),
      radial-gradient(0.7px 0.7px at 90% 55%, rgba(200, 170, 255, 0.6), transparent),
      radial-gradient(1px 1px at 55% 70%, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(0.9px 0.9px at 25% 40%, rgba(140, 180, 255, 0.7), transparent),
      radial-gradient(1.3px 1.3px at 85% 80%, rgba(255, 255, 255, 0.8), transparent),
      radial-gradient(0.5px 0.5px at 5% 50%, rgba(200, 200, 255, 0.5), transparent),
      radial-gradient(1.1px 1.1px at 45% 25%, rgba(180, 140, 255, 0.6), transparent),
      radial-gradient(1px 1px at 60% 5%, rgba(255, 255, 255, 0.7), transparent),
      radial-gradient(0.8px 0.8px at 75% 95%, rgba(130, 160, 255, 0.5), transparent),
      radial-gradient(1.2px 1.2px at 30% 80%, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(0.7px 0.7px at 95% 35%, rgba(170, 150, 255, 0.7), transparent),
      radial-gradient(1px 1px at 10% 5%, rgba(255, 255, 255, 0.5), transparent);
    background-size: 200% 200%;
    animation: starDrift 120s linear infinite;
  }

  @keyframes starDrift {
    0%   { transform: translate(0, 0); }
    25%  { transform: translate(1%, -0.5%); }
    50%  { transform: translate(0.5%, 1%); }
    75%  { transform: translate(-0.5%, 0.5%); }
    100% { transform: translate(0, 0); }
  }

  .particle-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(124, 77, 255, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, rgba(64, 196, 255, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 0%, rgba(124, 77, 255, 0.05) 0%, transparent 40%);
  }
</style>

<div class="particle-bg" aria-hidden="true"></div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ParticleBg.astro
git commit -m "feat: add CSS-only starfield particle background"
```

---

### Task 8: Navbar Component

**Files:**
- Create: `src/components/Navbar.astro`

- [ ] **Step 1: Write navigation bar**

```astro
---
// Navbar.astro
---
<nav class="navbar glass-glow">
  <div class="nav-inner">
    <a href="/" class="nav-brand">
      <span class="brand-icon">⚛</span>
      <span class="brand-text">PeriodicTable</span>
    </a>
    <div class="nav-links">
      <a href="/" class="nav-link">Table</a>
      <a href="/tools/reference" class="nav-link">Reference</a>
      <a href="/tools/balancer" class="nav-link">Balancer</a>
      <a href="/tools/flashcards" class="nav-link">Flashcards</a>
      <a href="/compare" class="nav-link nav-compare" id="nav-compare-link">
        Compare
        <span class="compare-badge" id="compare-badge" style="display:none">0</span>
      </a>
    </div>
  </div>
</nav>

<script>
  function updateBadge() {
    const raw = localStorage.getItem('pt-compare');
    const queue: number[] = raw ? JSON.parse(raw) : [];
    const badge = document.getElementById('compare-badge');
    if (badge) {
      badge.textContent = String(queue.length);
      badge.style.display = queue.length > 0 ? 'inline-flex' : 'none';
    }
  }
  updateBadge();
  window.addEventListener('compare-updated', updateBadge);
</script>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 0 2rem;
    height: 60px;
  }
  .nav-inner {
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    color: var(--text-primary);
  }
  .brand-icon {
    font-size: 1.5rem;
    filter: drop-shadow(0 0 6px rgba(124, 77, 255, 0.6));
  }
  .brand-text {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .nav-links {
    display: flex;
    gap: 0.25rem;
  }
  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: 0.4rem 0.85rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    position: relative;
  }
  .nav-link:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.04);
  }
  .nav-compare {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .compare-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--cat-nonmetal);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    padding: 0 4px;
    box-shadow: 0 0 10px var(--cat-nonmetal);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: add sticky glass navbar with compare badge"
```

---

### Task 9: Layout Component

**Files:**
- Create: `src/components/Layout.astro`

- [ ] **Step 1: Write shared page layout**

```astro
---
import Navbar from './Navbar.astro';
import ParticleBg from './ParticleBg.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | PeriodicTable</title>
  {description && <meta name="description" content={description} />}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body>
  <ParticleBg />
  <Navbar />
  <main>
    <slot />
  </main>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout.astro
git commit -m "feat: add shared Layout with fonts and particle background"
```

---

### Task 10: ElementTile Component

**Files:**
- Create: `src/components/ElementTile.astro`

- [ ] **Step 1: Write element tile card**

```astro
---
import { getCategoryColor, getStateSymbol } from '../utils/elements';
import type { ElementData } from '../utils/elements';

interface Props {
  element: ElementData;
  style?: string;
}

const { element } = Astro.props;
const e = element;
const glowColor = getCategoryColor(e.category);
const stateIcon = getStateSymbol(e.state);
const isLiquid = e.state === 'liquid';
---

<a
  href={`/element/${e.z}`}
  class="element-tile"
  style={[
    `grid-column: ${e.col};`,
    `grid-row: ${e.row};`,
    `--tile-glow: ${glowColor};`,
    `animation-delay: ${(e.z - 1) * 12}ms;`,
  ].join(' ')}
  data-category={e.category}
  data-z={e.z}
>
  <span class="tile-z">{e.z}</span>
  <span class="tile-symbol">{e.symbol}</span>
  <span class="tile-name-en">{e.nameEn}</span>
  <span class="tile-name-zh">{e.nameZh}</span>
  <span class="tile-state" data-liquid={String(isLiquid)}>{stateIcon}</span>
</a>

<style>
  .element-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4px 3px;
    border-radius: var(--radius-sm);
    background: var(--bg-card);
    border: 1px solid color-mix(in srgb, var(--tile-glow) 20%, transparent);
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    cursor: pointer;
    animation: fadeInUp 0.5s ease-out both;
    min-width: 0;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .element-tile::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: var(--tile-glow);
    opacity: 0;
    transition: opacity 0.25s;
    z-index: -1;
    filter: blur(6px);
  }

  .element-tile:hover,
  .element-tile:focus-visible {
    transform: translateY(-3px) scale(1.08);
    background: var(--bg-card-hover);
    border-color: color-mix(in srgb, var(--tile-glow) 60%, transparent);
    box-shadow: 0 8px 30px color-mix(in srgb, var(--tile-glow) 25%, transparent),
                0 0 20px color-mix(in srgb, var(--tile-glow) 15%, transparent);
    z-index: 10;
  }
  .element-tile:hover::before,
  .element-tile:focus-visible::before {
    opacity: 0.6;
  }
  .element-tile:active {
    transform: scale(0.96);
  }

  .tile-z {
    font-family: var(--font-mono);
    font-size: 0.55rem;
    font-weight: 500;
    color: var(--text-dim);
    line-height: 1;
  }

  .tile-symbol {
    font-family: var(--font-mono);
    font-size: clamp(0.9rem, 1.8vw, 1.3rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--tile-glow);
    text-shadow: 0 0 8px color-mix(in srgb, var(--tile-glow) 40%, transparent);
  }

  .tile-name-en {
    font-size: 0.5rem;
    color: var(--text-secondary);
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .tile-name-zh {
    font-size: 0.6rem;
    color: var(--text-dim);
    line-height: 1.2;
    font-weight: 500;
  }

  .tile-state {
    position: absolute;
    top: 3px;
    right: 4px;
    font-size: 0.35rem;
    color: var(--tile-glow);
    opacity: 0.7;
  }
  .tile-state[data-liquid="true"] {
    color: #18ffff;
  }

  /* Category filter: dim non-matching tiles */
  .category-filtering .element-tile:not(.category-match) {
    opacity: 0.15;
    filter: grayscale(0.8) brightness(0.5);
    pointer-events: none;
  }

  .category-filtering .element-tile.category-match {
    animation: pulseGlow 2s ease-in-out infinite;
  }

  /* Search filter: dim non-matching tiles */
  .search-filtering .element-tile:not(.search-match) {
    opacity: 0.1;
    filter: grayscale(1) brightness(0.4);
    pointer-events: none;
  }
  .search-filtering .element-tile.search-match {
    box-shadow: 0 0 16px color-mix(in srgb, var(--tile-glow) 30%, transparent);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ElementTile.astro
git commit -m "feat: add ElementTile with neon glow, hover lift, filter dimming"
```

---

### Task 11: SearchBar Component

**Files:**
- Create: `src/components/SearchBar.astro`

- [ ] **Step 1: Write search and filter bar**

```astro
---
import { CATEGORIES } from '../utils/elements';
---

<div class="search-bar-wrapper">
  <div class="search-input-wrap">
    <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
    <input
      type="text"
      id="search-input"
      class="search-input"
      placeholder="Search element — symbol, name, number..."
      autocomplete="off"
    />
    <button id="search-clear" class="search-clear" aria-label="Clear search">&times;</button>
  </div>
  <div class="category-chips" id="category-chips">
    {CATEGORIES.map(cat => (
      <button
        class="category-chip"
        data-category={cat.key}
        style={`--chip-color: var(--cat-${cat.key});`}
      >
        {cat.label}
      </button>
    ))}
    <button class="category-chip category-reset is-active" data-category="all">
      All Elements
    </button>
  </div>
</div>

<script>
  function setupSearch() {
    const input = document.getElementById('search-input') as HTMLInputElement;
    const clearBtn = document.getElementById('search-clear') as HTMLButtonElement;
    const chips = document.querySelectorAll('.category-chip');
    const table = document.querySelector('.periodic-table');
    let activeCategory = 'all';

    function applyFilters() {
      const query = input.value.toLowerCase().trim();
      table?.classList.toggle('search-filtering', query.length > 0);
      table?.classList.toggle('category-filtering', activeCategory !== 'all');
      clearBtn.style.display = query ? 'flex' : 'none';

      document.querySelectorAll('.element-tile').forEach(tile => {
        const el = tile as HTMLElement;
        const symbol = el.querySelector('.tile-symbol')?.textContent?.toLowerCase() || '';
        const nameEn = el.querySelector('.tile-name-en')?.textContent?.toLowerCase() || '';
        const nameZh = el.querySelector('.tile-name-zh')?.textContent || '';
        const z = el.dataset.z || '';
        const cat = el.dataset.category || '';

        const matchesSearch = !query ||
          symbol.includes(query) ||
          nameEn.includes(query) ||
          nameZh.includes(query) ||
          z === query;

        const matchesCategory = activeCategory === 'all' || cat === activeCategory;

        el.classList.toggle('search-match', matchesSearch);
        el.classList.toggle('category-match', matchesCategory);
      });
    }

    input.addEventListener('input', applyFilters);
    clearBtn.addEventListener('click', () => { input.value = ''; applyFilters(); });
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        activeCategory = chip.dataset.category || 'all';
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        applyFilters();
      });
    });
  }

  setupSearch();
</script>

<style>
  .search-bar-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    position: sticky;
    top: 60px;
    z-index: 50;
    padding: 1rem 0;
    background: linear-gradient(to bottom, var(--bg-root) 60%, transparent);
    backdrop-filter: blur(8px);
  }
  .search-input-wrap {
    position: relative;
    max-width: 480px;
    width: 100%;
  }
  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-dim);
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    padding: 0.7rem 2.5rem 0.7rem 2.6rem;
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-xl);
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input::placeholder { color: var(--text-dim); }
  .search-input:focus {
    border-color: var(--border-glow);
    box-shadow: 0 0 20px rgba(124, 77, 255, 0.15);
  }
  .search-clear {
    display: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 1.2rem;
    cursor: pointer;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.15s;
  }
  .search-clear:hover { background: rgba(255,255,255,0.06); color: var(--text-primary); }
  .category-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .category-chip {
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-xl);
    border: 1px solid color-mix(in srgb, var(--chip-color) 30%, transparent);
    background: color-mix(in srgb, var(--chip-color) 6%, transparent);
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-family: var(--font-body);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .category-chip:hover {
    background: color-mix(in srgb, var(--chip-color) 15%, transparent);
    border-color: color-mix(in srgb, var(--chip-color) 60%, transparent);
    color: var(--text-primary);
  }
  .category-chip.is-active {
    background: color-mix(in srgb, var(--chip-color) 20%, transparent);
    border-color: var(--chip-color);
    color: #fff;
    box-shadow: 0 0 12px color-mix(in srgb, var(--chip-color) 30%, transparent);
  }
  .category-reset { --chip-color: #fff; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SearchBar.astro
git commit -m "feat: add search bar with fuzzy search and category filter chips"
```

---

### Task 12: PeriodicTable Component

**Files:**
- Create: `src/components/PeriodicTable.astro`

- [ ] **Step 1: Write the full grid layout**

```astro
---
import ElementTile from './ElementTile.astro';
import { getAllElements } from '../utils/elements';

const elements = getAllElements();

// Sort: main table rows 1-7 first, then lanthanides (row 8), then actinides (row 9)
const mainElements = elements.filter(e => e.row <= 7);
const lanthanides = elements.filter(e => e.row === 8);
const actinides = elements.filter(e => e.row === 9);
---

<div class="table-scroll">
  <div class="periodic-table" role="grid" aria-label="Periodic Table of Elements">
    {mainElements.map(e => <ElementTile element={e} />)}
  </div>

  <div class="f-block-label lanthanide-label">
    <span>Lanthanides</span>
    <span class="f-label-zh">镧系</span>
  </div>
  <div class="periodic-table periodic-table-f" role="grid" aria-label="Lanthanides">
    {lanthanides.map(e => <ElementTile element={e} />)}
  </div>

  <div class="f-block-label actinide-label">
    <span>Actinides</span>
    <span class="f-label-zh">锕系</span>
  </div>
  <div class="periodic-table periodic-table-f" role="grid" aria-label="Actinides">
    {actinides.map(e => <ElementTile element={e} />)}
  </div>
</div>

<style>
  .table-scroll {
    overflow-x: auto;
    padding-bottom: 2rem;
    -webkit-overflow-scrolling: touch;
  }

  .periodic-table {
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    grid-template-rows: repeat(7, auto);
    gap: 3px;
    min-width: 1080px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .periodic-table-f {
    grid-template-columns: repeat(18, 1fr);
    grid-template-rows: auto;
    min-width: 1080px;
    max-width: 1400px;
    margin: 0 auto 0.75rem;
  }

  /* Place lanthanides/actinides starting at col 4 */
  .periodic-table-f .element-tile {
    grid-row: 1;
  }
  .periodic-table-f .element-tile:first-child {
    /* Ce at column 4, Th at column 4 */
  }

  /* Period 1-3 empty cell placeholders */
  .periodic-table::before {
    content: '';
    grid-column: 2 / 18;
    grid-row: 1;
  }
  .periodic-table::after {
    content: '';
    grid-column: 3 / 13;
    grid-row: 2;
  }

  .f-block-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0 0.4rem 1rem;
    font-family: var(--font-display);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
    max-width: 1400px;
    margin: 0 auto;
    min-width: 1080px;
  }
  .lanthanide-label { color: var(--cat-lanthanide); }
  .actinide-label { color: var(--cat-actinide); }
  .f-label-zh { font-size: 0.7rem; font-weight: 400; opacity: 0.7; }

  @media (max-width: 1120px) {
    .periodic-table,
    .periodic-table-f,
    .f-block-label {
      min-width: 1080px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PeriodicTable.astro
git commit -m "feat: add CSS Grid periodic table with lanthanide/actinide rows"
```

---

### Task 13: Homepage

**Files:**
- Create: `src/pages/index.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Write favicon**

```bash
cat > public/favicon.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#060612"/>
  <text x="16" y="22" text-anchor="middle" font-size="18" font-family="monospace" font-weight="bold" fill="#7c4dff">Pt</text>
</svg>
SVGEOF
```

- [ ] **Step 2: Write homepage**

```astro
---
import Layout from '../components/Layout.astro';
import PeriodicTable from '../components/PeriodicTable.astro';
import SearchBar from '../components/SearchBar.astro';
---

<Layout
  title="Interactive Periodic Table of Elements"
  description="Explore all 118 elements with properties, electron configurations, and learning tools. Bilingual Chinese-English support."
>
  <div class="home-hero">
    <h1 class="hero-title">
      The <span class="text-gradient">Elements</span>
    </h1>
    <p class="hero-sub">Interactive periodic table — explore, learn, compare</p>
  </div>

  <div class="table-container">
    <SearchBar />
    <PeriodicTable />
  </div>
</Layout>

<style>
  .home-hero {
    text-align: center;
    padding: 2.5rem 1rem 1.5rem;
  }
  .hero-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 0.5rem;
  }
  .hero-sub {
    color: var(--text-secondary);
    font-size: 1.05rem;
    font-weight: 300;
    letter-spacing: 0.02em;
  }
  .table-container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 1.5rem 4rem;
  }
</style>
```

- [ ] **Step 3: Run dev server and verify**

```bash
npx astro dev --port 3000 &
sleep 3
curl -s http://localhost:3000 | head -20
kill %1 2>/dev/null
```

Expected: HTML output with title and periodic table markup.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro public/favicon.svg
git commit -m "feat: add homepage with hero and periodic table"
```

---

### Task 14: ElectronShell Component

**Files:**
- Create: `src/components/ElectronShell.astro`

- [ ] **Step 1: Write animated electron shell diagram**

```astro
---
interface Props {
  shells: number[];
}

const { shells } = Astro.props;
const maxElectrons = [2, 8, 18, 32, 32, 18, 8];
---

<div class="shell-diagram">
  {shells.map((count, i) => (
    <div
      class="shell-ring"
      style={[
        `width: ${(i + 1) * 48 + 24}px;`,
        `height: ${(i + 1) * 48 + 24}px;`,
        `animation-delay: ${i * 0.3}s;`,
      ].join(' ')}
    >
      <span class="shell-label">{count}</span>
      {Array.from({ length: Math.min(count, maxElectrons[i]) }).map((_, j) => (
        <span
          class="shell-electron"
          style={[
            `--orbit-angle: ${(360 / Math.min(count, maxElectrons[i])) * j}deg;`,
            `animation-delay: ${i * 0.3 + j * 0.05}s;`,
          ].join(' ')}
        />
      ))}
    </div>
  ))}
  <div class="shell-nucleus">
    <span class="nucleus-dot"></span>
  </div>
</div>

<style>
  .shell-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 400px;
    height: 400px;
    max-width: 100%;
  }
  .shell-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(124, 77, 255, 0.25);
    animation: shellFadeIn 0.6s ease-out both;
  }
  .shell-label {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-dim);
  }
  .shell-electron {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--cat-nonmetal);
    box-shadow: 0 0 6px var(--cat-nonmetal);
    top: 50%;
    left: 50%;
    animation: electronOrbit 3s linear infinite;
    transform-origin: 0 0;
  }
  @keyframes electronOrbit {
    from { transform: rotate(var(--orbit-angle)) translateX(calc(var(--orbit-radius, 0px))) rotate(0deg); }
    to   { transform: rotate(calc(var(--orbit-angle) + 360deg)) translateX(calc(var(--orbit-radius, 0px))) rotate(-360deg); }
  }
  .shell-nucleus {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: radial-gradient(circle, #ff5252, #b71c1c);
    box-shadow: 0 0 20px rgba(255, 82, 82, 0.5), 0 0 40px rgba(255, 82, 82, 0.2);
  }
  @keyframes shellFadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }
</style>

<script>
  // Set orbit radius based on ring size
  document.querySelectorAll('.shell-electron').forEach((el, i) => {
    const ring = el.closest('.shell-ring') as HTMLElement;
    if (ring) {
      const w = ring.offsetWidth;
      (el as HTMLElement).style.setProperty('--orbit-radius', `${w / 2}px`);
    }
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ElectronShell.astro
git commit -m "feat: add animated electron shell orbital diagram"
```

---

### Task 15: ElementDetail Component

**Files:**
- Create: `src/components/ElementDetail.astro`

- [ ] **Step 1: Write element detail property cards**

```astro
---
import ElectronShell from './ElectronShell.astro';
import { getCategoryColor, formatTemperature, formatDensity } from '../utils/elements';
import type { ElementData } from '../utils/elements';

interface Props {
  element: ElementData;
}

const { element: e } = Astro.props;
const glowColor = getCategoryColor(e.category);
---

<article class="detail-root">
  <!-- Header -->
  <div class="detail-header" style={`--accent: ${glowColor};`}>
    <div class="detail-top-row">
      <a href="/" class="back-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to Table
      </a>
      <div class="detail-nav">
        {e.z > 1 && <a href={`/element/${e.z - 1}`} class="nav-arrow">← #{e.z - 1}</a>}
        {e.z < 118 && <a href={`/element/${e.z + 1}`} class="nav-arrow">#{e.z + 1} →</a>}
      </div>
    </div>
    <div class="detail-hero">
      <span class="detail-z">{e.z}</span>
      <h1 class="detail-symbol" style={`color: ${glowColor}; text-shadow: 0 0 30px color-mix(in srgb, ${glowColor} 50%, transparent);`}>
        {e.symbol}
      </h1>
      <div class="detail-names">
        <span class="detail-name-en">{e.nameEn}</span>
        <span class="detail-name-zh">{e.nameZh}</span>
      </div>
    </div>
  </div>

  <!-- Properties Grid -->
  <div class="detail-grid">
    <!-- Basic Info Card -->
    <div class="prop-card glass-glow">
      <h3>Basic Properties</h3>
      <dl class="prop-list">
        <div class="prop-row"><dt>Atomic Number</dt><dd>{e.z}</dd></div>
        <div class="prop-row"><dt>Atomic Weight</dt><dd>{e.weight} u</dd></div>
        <div class="prop-row"><dt>Category</dt><dd style={`color:${glowColor}`}>{e.category.replace('-',' ')}</dd></div>
        <div class="prop-row"><dt>State at STP</dt><dd class="cap">{e.state}</dd></div>
        <div class="prop-row"><dt>Period</dt><dd>{e.period}</dd></div>
        <div class="prop-row"><dt>Group</dt><dd>{e.group}</dd></div>
        <div class="prop-row"><dt>Block</dt><dd class="cap">{e.block}-block</dd></div>
      </dl>
    </div>

    <!-- Physical Properties -->
    <div class="prop-card glass-glow">
      <h3>Physical Properties</h3>
      <dl class="prop-list">
        <div class="prop-row"><dt>Melting Point</dt><dd>{formatTemperature(e.melting)}</dd></div>
        <div class="prop-row"><dt>Boiling Point</dt><dd>{formatTemperature(e.boiling)}</dd></div>
        <div class="prop-row"><dt>Density</dt><dd>{formatDensity(e.density)}</dd></div>
        <div class="prop-row"><dt>Crystal Structure</dt><dd class="cap">{e.crystal}</dd></div>
        <div class="prop-row"><dt>Atomic Radius</dt><dd>{e.atomicRadius ?? '—'} pm</dd></div>
        <div class="prop-row"><dt>Ionic Radius</dt><dd>{e.ionicRadius ?? '—'} pm</dd></div>
        <div class="prop-row"><dt>Electronegativity</dt><dd>{e.electronegativity ?? '—'}</dd></div>
      </dl>
    </div>

    <!-- Electron Config -->
    <div class="prop-card glass-glow">
      <h3>Electron Configuration</h3>
      <dl class="prop-list">
        <div class="prop-row"><dt>Config</dt><dd class="electron-config">{e.electronConfig}</dd></div>
        <div class="prop-row"><dt>Shells</dt><dd>{e.shells.join(', ')}</dd></div>
        <div class="prop-row"><dt>Oxidation States</dt><dd>{e.oxidation.map(o => o > 0 ? `+${o}` : String(o)).join(', ')}</dd></div>
      </dl>
    </div>

    <!-- Shell Diagram -->
    <div class="prop-card glass-glow shell-card">
      <h3>Electron Shells</h3>
      <ElectronShell shells={e.shells} />
    </div>

    <!-- Discovery -->
    <div class="prop-card glass-glow">
      <h3>Discovery</h3>
      <dl class="prop-list">
        <div class="prop-row"><dt>Year</dt><dd>{e.year ?? 'Ancient'}</dd></div>
        <div class="prop-row"><dt>Discoverer</dt><dd>{e.discoverer}</dd></div>
        <div class="prop-row"><dt>Country</dt><dd>{e.country}</dd></div>
      </dl>
    </div>

    <!-- Uses & Memory -->
    <div class="prop-card glass-glow">
      <h3>Uses & Applications</h3>
      <p class="prop-text">{e.uses}</p>
    </div>
    <div class="prop-card glass-glow">
      <h3>Memory Aid</h3>
      <p class="prop-text mnemonic">{e.mnemonicEn}</p>
      <p class="prop-text mnemonic-zh">{e.mnemonicZh}</p>
    </div>
  </div>

  <!-- Compare CTA -->
  <div class="detail-actions">
    <button class="btn-compare glass-glow" id="btn-compare" data-z={String(e.z)}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M21 3l-7 7M3 3l7 7M3 21l7-7M21 21l-7-7"/>
      </svg>
      Add to Compare
    </button>
  </div>
</article>

<script>
  import { addToCompare, removeFromCompare, isInCompare } from '../utils/compare';

  const btn = document.getElementById('btn-compare') as HTMLButtonElement;
  const z = parseInt(btn.dataset.z || '0');

  function updateBtn() {
    if (isInCompare(z)) {
      btn.textContent = '✓ Added';
      btn.classList.add('is-added');
    } else {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M21 3l-7 7M3 3l7 7M3 21l7-7M21 21l-7-7"/></svg> Add to Compare`;
      btn.classList.remove('is-added');
    }
  }

  updateBtn();
  window.addEventListener('compare-updated', updateBtn);

  btn.addEventListener('click', () => {
    if (isInCompare(z)) {
      removeFromCompare(z);
    } else {
      addToCompare(z);
    }
  });
</script>

<style>
  .detail-root { max-width: 1100px; margin: 0 auto; padding: 1rem 1.5rem 4rem; }
  .detail-header {
    text-align: center;
    padding: 2rem 0 3rem;
    position: relative;
  }
  .detail-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }
  .back-btn:hover { color: var(--text-primary); }
  .detail-nav { display: flex; gap: 0.75rem; }
  .nav-arrow {
    color: var(--text-dim);
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-glass);
    transition: all 0.2s;
  }
  .nav-arrow:hover { color: var(--text-primary); border-color: var(--border-glow); }
  .detail-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  .detail-z {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--text-dim);
  }
  .detail-symbol {
    font-family: var(--font-mono);
    font-size: 5rem;
    font-weight: 700;
    line-height: 1;
    animation: fadeInUp 0.6s ease-out;
  }
  .detail-names {
    display: flex;
    gap: 0.75rem;
    align-items: baseline;
  }
  .detail-name-en {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  .detail-name-zh {
    font-size: 1.1rem;
    color: var(--text-secondary);
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .prop-card {
    padding: 1.25rem;
    border-radius: var(--radius-lg);
  }
  .prop-card h3 {
    font-size: 0.85rem;
    color: var(--text-accent);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 600;
  }
  .prop-list { display: flex; flex-direction: column; gap: 0.5rem; }
  .prop-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }
  .prop-row dt { font-size: 0.8rem; color: var(--text-dim); flex-shrink: 0; }
  .prop-row dd {
    font-size: 0.85rem;
    color: var(--text-primary);
    text-align: right;
    font-weight: 500;
  }
  .prop-row dd.cap { text-transform: capitalize; }
  .electron-config { font-family: var(--font-mono); font-size: 0.8rem; }
  .prop-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }
  .mnemonic-zh { font-size: 0.85rem; color: var(--text-dim); margin-top: 0.4rem; }
  .shell-card { display: flex; flex-direction: column; align-items: center; }

  .detail-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 2rem 0;
  }
  .btn-compare {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-xl);
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s;
  }
  .btn-compare:hover {
    border-color: var(--border-glow);
    box-shadow: 0 0 20px rgba(124, 77, 255, 0.2);
    transform: translateY(-1px);
  }
  .btn-compare.is-added {
    border-color: var(--cat-nonmetal);
    box-shadow: 0 0 16px rgba(124, 77, 255, 0.3);
    color: var(--cat-nonmetal);
  }

  @media (max-width: 720px) {
    .detail-symbol { font-size: 3.5rem; }
    .detail-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ElementDetail.astro
git commit -m "feat: add element detail with properties, electron diagram, memory aids"
```

---

### Task 16: Element Detail Page Route

**Files:**
- Create: `src/pages/element/[atomicNumber].astro`

- [ ] **Step 1: Write dynamic route with static paths**

```astro
---
import Layout from '../../components/Layout.astro';
import ElementDetail from '../../components/ElementDetail.astro';
import { getAllElements, getElementByZ } from '../../utils/elements';

export function getStaticPaths() {
  return getAllElements().map(e => ({
    params: { atomicNumber: String(e.z) },
    props: { element: e },
  }));
}

const { element } = Astro.props;
---

<Layout
  title={`${element.symbol} - ${element.nameEn} | PeriodicTable`}
  description={`${element.nameEn} (${element.nameZh}) — atomic number ${element.z}, ${element.category}. Electron config: ${element.electronConfig}. Uses: ${element.uses}`}
>
  <ElementDetail element={element} />
</Layout>
```

- [ ] **Step 2: Build and verify all pages generate**

```bash
npx astro build 2>&1 | tail -5
ls -la dist/element/ | head -10
```

Expected: 118 HTML files in `dist/element/`. Check files exist.

- [ ] **Step 3: Commit**

```bash
git add src/pages/element/
git commit -m "feat: add element detail page with static paths for all 118 elements"
```

---

### Task 17: CompareDrawer Component

**Files:**
- Create: `src/components/CompareDrawer.astro`

- [ ] **Step 1: Write slide-out compare tray**

```astro
---
import { getAllElements } from '../utils/elements';

const allElements = getAllElements();
---

<div class="compare-drawer" id="compare-drawer">
  <div class="compare-handle" id="compare-handle">
    <span class="compare-handle-bar"></span>
  </div>
  <div class="compare-content" id="compare-content">
    <div class="compare-header">
      <h3>Compare Elements</h3>
      <button class="compare-clear" id="compare-clear">Clear All</button>
    </div>
    <div class="compare-slots" id="compare-slots">
      <!-- Filled by JS -->
    </div>
  </div>
</div>

<style>
  .compare-drawer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(calc(100% - 36px));
    z-index: 200;
    width: min(600px, 95vw);
    background: var(--bg-surface);
    border: 1px solid var(--border-glow);
    border-bottom: none;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .compare-drawer.is-open {
    transform: translateX(-50%) translateY(0);
  }
  .compare-handle {
    display: flex;
    justify-content: center;
    padding: 8px 0;
    cursor: pointer;
  }
  .compare-handle-bar {
    width: 36px;
    height: 4px;
    border-radius: 2px;
    background: var(--text-dim);
    transition: background 0.2s;
  }
  .compare-handle:hover .compare-handle-bar { background: var(--text-secondary); }
  .compare-content { padding: 0 1.25rem 1.25rem; display: none; }
  .compare-drawer.is-open .compare-content { display: block; }
  .compare-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .compare-header h3 { font-size: 1rem; }
  .compare-clear {
    background: none;
    border: 1px solid var(--border-glass);
    color: var(--text-dim);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-md);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .compare-clear:hover { border-color: var(--cat-alkali); color: var(--cat-alkali); }
  .compare-slots { display: flex; gap: 0.5rem; }
  .compare-slot {
    flex: 1;
    min-height: 60px;
    border: 1px dashed var(--border-glass);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
  .compare-slot.filled {
    border-style: solid;
    background: var(--bg-card);
    position: relative;
  }
  .compare-slot .slot-symbol {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
  }
  .compare-slot .slot-name {
    font-size: 0.6rem;
    color: var(--text-dim);
  }
  .compare-slot .slot-remove {
    position: absolute;
    top: 2px;
    right: 6px;
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-size: 0.9rem;
  }
</style>

<script>
  import { getCompareQueue, removeFromCompare, clearCompare } from '../utils/compare';
  import { getElementBySymbol } from '../utils/elements';

  const drawer = document.getElementById('compare-drawer')!;
  const handle = document.getElementById('compare-handle')!;
  const slots = document.getElementById('compare-slots')!;
  const clearBtn = document.getElementById('compare-clear')!;

  let isOpen = false;
  handle.addEventListener('click', () => {
    isOpen = !isOpen;
    drawer.classList.toggle('is-open', isOpen);
  });

  function renderSlots() {
    const queue = getCompareQueue();
    const allElements = (window as any).__allElements || [];
    const elMap = new Map(allElements.map((e: any) => [e.z, e]));
    slots.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const z = queue[i];
      const el = z ? elMap.get(z) : null;
      const div = document.createElement('div');
      div.className = `compare-slot${el ? ' filled' : ''}`;
      if (el) {
        div.innerHTML = `
          <span class="slot-symbol" style="color: var(--cat-${el.category})">${el.symbol}</span>
          <span class="slot-name">${el.nameEn}</span>
          <button class="slot-remove" data-z="${el.z}">&times;</button>
        `;
      } else {
        div.innerHTML = '<span style="color:var(--text-dim);font-size:0.7rem;">Select element</span>';
      }
      slots.appendChild(div);
    }
    // Add remove listeners
    slots.querySelectorAll('.slot-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromCompare(parseInt((btn as HTMLElement).dataset.z || '0'));
      });
    });
  }

  renderSlots();
  window.addEventListener('compare-updated', renderSlots);

  clearBtn.addEventListener('click', clearCompare);
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CompareDrawer.astro
git commit -m "feat: add slide-out compare drawer for 2-4 elements"
```

---

### Task 18: Compare Page

**Files:**
- Create: `src/pages/compare.astro`

- [ ] **Step 1: Write full compare page**

```astro
---
import Layout from '../components/Layout.astro';
import { getAllElements } from '../utils/elements';

const allElements = getAllElements();
---

<Layout title="Compare Elements" description="Side-by-side comparison of element properties">
  <div class="compare-page">
    <h1 class="compare-title">Element <span class="text-gradient">Comparison</span></h1>
    <p class="compare-sub">Select 2–4 elements to compare their properties side by side</p>

    <div class="compare-table-wrap" id="compare-table-wrap">
      <p class="compare-empty">Add elements from the periodic table or detail pages to start comparing.</p>
    </div>
  </div>
</Layout>

<script>
  import { getCompareQueue } from '../utils/compare';
  import { getElementBySymbol } from '../utils/elements';

  const elMap = new Map((window as any).__allElements?.map((e: any) => [e.z, e]) || []);

  function renderCompare() {
    const queue = getCompareQueue();
    const wrap = document.getElementById('compare-table-wrap')!;

    if (queue.length === 0) {
      wrap.innerHTML = '<p class="compare-empty">Add elements from the periodic table or detail pages to start comparing.</p>';
      return;
    }

    const elements = queue.map(z => elMap.get(z)).filter(Boolean);
    const props = [
      { key: 'z', label: 'Atomic Number' },
      { key: 'weight', label: 'Atomic Weight' },
      { key: 'category', label: 'Category' },
      { key: 'state', label: 'State' },
      { key: 'electronegativity', label: 'Electronegativity' },
      { key: 'atomicRadius', label: 'Atomic Radius' },
      { key: 'melting', label: 'Melting Point' },
      { key: 'boiling', label: 'Boiling Point' },
      { key: 'density', label: 'Density' },
      { key: 'electronConfig', label: 'Electron Config' },
      { key: 'oxidation', label: 'Oxidation States' },
    ];

    let html = '<table class="compare-table"><thead><tr><th>Property</th>';
    for (const el of elements) {
      html += `<th style="color:var(--cat-${el.category})">${el.symbol}<br><small>${el.nameEn}</small></th>`;
    }
    html += '</tr></thead><tbody>';

    for (const prop of props) {
      html += '<tr><td class="prop-label">' + prop.label + '</td>';
      for (const el of elements) {
        let val = (el as any)[prop.key];
        if (Array.isArray(val)) val = val.join(', ');
        if (val === null || val === undefined) val = '—';
        html += `<td>${val}</td>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    wrap.innerHTML = html;
  }

  renderCompare();
  window.addEventListener('compare-updated', renderCompare);
</script>

<style>
  .compare-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }
  .compare-title { text-align: center; margin-bottom: 0.5rem; }
  .compare-sub { text-align: center; color: var(--text-secondary); margin-bottom: 2rem; }
  .compare-empty { text-align: center; color: var(--text-dim); padding: 3rem; }
  .compare-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .compare-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-glass);
    font-family: var(--font-mono);
  }
  .compare-table th small { font-size: 0.65rem; color: var(--text-dim); font-weight: 400; }
  .compare-table td {
    padding: 0.6rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    color: var(--text-secondary);
  }
  .compare-table .prop-label { color: var(--text-dim); font-weight: 500; white-space: nowrap; }
  .compare-table tr:hover td { background: rgba(255,255,255,0.02); }
</style>
```

- [ ] **Step 2: Pass elements to window for compare drawer**

Add to `src/components/Layout.astro` before `</head>`:
```astro
<script is:inline>
  fetch('/elements-data.json').then(r => r.json()).then(data => {
    window.__allElements = data;
  });
</script>
```

And create a static JSON endpoint. Add `src/pages/elements-data.json.ts`:
```typescript
import { getAllElements } from '../utils/elements';

export async function GET() {
  return new Response(JSON.stringify(getAllElements()), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/compare.astro src/pages/elements-data.json.ts
git commit -m "feat: add compare page with side-by-side property table"
```

---

### Task 19: Equation Balancer

**Files:**
- Create: `src/components/EquationBalancer.astro`
- Create: `src/pages/tools/balancer.astro`

- [ ] **Step 1: Write balancer component as client island**

```astro
---
// src/components/EquationBalancer.astro
---
<div class="balancer-widget glass-glow">
  <div class="balancer-input-row">
    <input
      type="text"
      id="eq-input"
      class="balancer-input"
      placeholder="e.g. H2 + O2 = H2O"
      autocomplete="off"
    />
    <button id="eq-balance-btn" class="balance-btn">Balance</button>
  </div>
  <div id="eq-result" class="balancer-result"></div>
  <p class="balancer-hint">Use <code>=</code> or <code>→</code> to separate reactants and products</p>
</div>

<script>
  import { balanceEquation } from '../utils/chemistry';

  const input = document.getElementById('eq-input') as HTMLInputElement;
  const btn = document.getElementById('eq-balance-btn') as HTMLButtonElement;
  const result = document.getElementById('eq-result')!;

  function doBalance() {
    const eq = input.value.trim();
    if (!eq) { result.innerHTML = ''; return; }
    const balanced = balanceEquation(eq);
    if (balanced) {
      result.innerHTML = `<span class="result-ok">${balanced}</span>`;
    } else {
      result.innerHTML = '<span class="result-err">Could not balance. Check your equation format.</span>';
    }
  }

  btn.addEventListener('click', doBalance);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doBalance(); });
</script>

<style>
  .balancer-widget {
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    max-width: 560px;
    margin: 0 auto;
  }
  .balancer-input-row {
    display: flex;
    gap: 0.5rem;
  }
  .balancer-input {
    flex: 1;
    padding: 0.7rem 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .balancer-input:focus {
    border-color: var(--border-glow);
  }
  .balancer-input::placeholder { color: var(--text-dim); font-family: var(--font-body); }
  .balance-btn {
    padding: 0.7rem 1.5rem;
    background: linear-gradient(135deg, rgba(124, 77, 255, 0.3), rgba(64, 196, 255, 0.2));
    border: 1px solid var(--border-glow);
    border-radius: var(--radius-md);
    color: #fff;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .balance-btn:hover {
    background: linear-gradient(135deg, rgba(124, 77, 255, 0.5), rgba(64, 196, 255, 0.35));
    box-shadow: 0 0 20px rgba(124, 77, 255, 0.3);
  }
  .balancer-result {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
  }
  .result-ok {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    color: var(--cat-nonmetal);
    font-weight: 600;
  }
  .result-err { color: var(--cat-alkali); font-size: 0.9rem; }
  .balancer-hint {
    text-align: center;
    color: var(--text-dim);
    font-size: 0.75rem;
    margin-top: 1rem;
  }
  .balancer-hint code {
    background: rgba(255,255,255,0.06);
    padding: 0.1rem 0.4rem;
    border-radius: 3px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }
</style>
```

- [ ] **Step 2: Write balancer page**

```astro
---
import Layout from '../../components/Layout.astro';
import EquationBalancer from '../../components/EquationBalancer.astro';
---

<Layout title="Chemical Equation Balancer" description="Balance chemical equations online — enter reactants and products, get balanced coefficients">
  <div class="tool-page">
    <h1>Equation <span class="text-gradient">Balancer</span></h1>
    <p class="tool-sub">Enter a chemical equation and get the balanced coefficients instantly</p>
    <EquationBalancer />
  </div>
</Layout>

<style>
  .tool-page { max-width: 700px; margin: 0 auto; padding: 3rem 1.5rem 4rem; text-align: center; }
  .tool-sub { color: var(--text-secondary); margin-bottom: 2rem; }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/EquationBalancer.astro src/pages/tools/balancer.astro
git commit -m "feat: add chemical equation balancer tool"
```

---

### Task 20: Reference Tables

**Files:**
- Create: `src/components/ReferenceTables.astro`
- Create: `src/pages/tools/reference.astro`

- [ ] **Step 1: Write reference tables component**

Write the component at `src/components/ReferenceTables.astro`:

```astro
---
import { VALENCE_DATA, SOLUBILITY_DATA, ACTIVITY_SERIES } from '../utils/chemistry';
import { getAllElements } from '../utils/elements';

const elements = getAllElements();
// Map symbols to element data for valence lookup
const symbolMap = new Map(elements.map(e => [e.symbol, e]));
const valenceEntries = Object.entries(VALENCE_DATA).map(([sym, vals]) => {
  const el = symbolMap.get(sym);
  return { symbol: sym, valences: vals, name: el?.nameEn ?? sym };
});
---

<div class="ref-tabs">
  <button class="ref-tab is-active" data-tab="valence">
    Common Valences
  </button>
  <button class="ref-tab" data-tab="solubility">
    Solubility
  </button>
  <button class="ref-tab" data-tab="activity">
    Activity Series
  </button>
</div>

<!-- Valence Table -->
<div class="ref-panel is-visible" id="panel-valence">
  <input type="text" class="ref-search" id="valence-search" placeholder="Search element..." />
  <div class="valence-grid" id="valence-grid">
    {valenceEntries.map(v => (
      <div class="valence-cell glass" data-symbol={v.symbol.toLowerCase()}>
        <span class="valence-symbol">{v.symbol}</span>
        <span class="valence-vals">{v.valences.map(x => x > 0 ? `+${x}` : String(x)).join(', ')}</span>
      </div>
    ))}
  </div>
</div>

<!-- Solubility Table -->
<div class="ref-panel" id="panel-solubility" style="display:none">
  <div class="solubility-wrap">
    <table class="solubility-table">
      <thead>
        <tr>
          <th>Ion</th>
          <th>Cl⁻</th>
          <th>SO₄²⁻</th>
          <th>CO₃²⁻</th>
          <th>OH⁻</th>
          <th>NO₃⁻</th>
        </tr>
      </thead>
      <tbody>
        {SOLUBILITY_DATA.map(row => (
          <tr>
            <td class="ion-cell">{row.ion}</td>
            <td class={`sol-${row.cl.toLowerCase()}`}>{row.cl}</td>
            <td class={`sol-${row.so4.toLowerCase()}`}>{row.so4}</td>
            <td class={`sol-${row.co3.toLowerCase()}`}>{row.co3}</td>
            <td class={`sol-${row.oh.toLowerCase()}`}>{row.oh}</td>
            <td class={`sol-${row.no3.toLowerCase()}`}>{row.no3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div class="solubility-legend">
    <span class="legend-item"><span class="legend-dot sol-s"></span> Soluble</span>
    <span class="legend-item"><span class="legend-dot sol-i"></span> Insoluble</span>
    <span class="legend-item"><span class="legend-dot sol-s2"></span> Slightly</span>
  </div>
</div>

<!-- Activity Series -->
<div class="ref-panel" id="panel-activity" style="display:none">
  <div class="activity-list">
    {ACTIVITY_SERIES.map((m, i) => (
      <div class="activity-row glass" style={`animation-delay:${i * 40}ms`}>
        <span class="activity-rank">{i + 1}</span>
        <span class="activity-symbol">{m.metal}</span>
        <span class="activity-names">{m.name} / {m.nameZh}</span>
        <div class="activity-badges">
          {m.reactsWater && <span class="activity-badge badge-water">H₂O</span>}
          {m.reactsAcid && <span class="activity-badge badge-acid">H⁺</span>}
          {!m.reactsWater && !m.reactsAcid && <span class="activity-badge badge-none">noble</span>}
        </div>
      </div>
    ))}
  </div>
</div>

<style>
  .ref-tabs {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .ref-tab {
    padding: 0.5rem 1.25rem;
    background: none;
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-xl);
    color: var(--text-dim);
    font-family: var(--font-body);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ref-tab:hover { color: var(--text-primary); border-color: var(--text-dim); }
  .ref-tab.is-active {
    background: rgba(124, 77, 255, 0.15);
    border-color: var(--cat-nonmetal);
    color: #fff;
    box-shadow: 0 0 14px rgba(124, 77, 255, 0.2);
  }
  .ref-search {
    width: 100%;
    max-width: 360px;
    padding: 0.55rem 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.85rem;
    margin-bottom: 1rem;
    outline: none;
  }
  .ref-search:focus { border-color: var(--border-glow); }
  .valence-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.4rem;
  }
  .valence-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
  }
  .valence-symbol {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text-primary);
  }
  .valence-vals {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-dim);
  }

  .solubility-wrap { overflow-x: auto; margin-bottom: 1rem; }
  .solubility-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .solubility-table th {
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid var(--border-glass);
    color: var(--text-dim);
    font-weight: 500;
    font-size: 0.8rem;
  }
  .solubility-table td {
    padding: 0.5rem 0.8rem;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    text-align: center;
    font-family: var(--font-mono);
    font-weight: 600;
  }
  .sol-s { color: #69f0ae; }
  .sol-i { color: #ff5252; }
  .sol-z { color: #ffd740; }
  .sol-- { color: var(--text-dim); }
  .ion-cell { text-align: left; color: var(--text-primary); font-weight: 500; }
  .solubility-legend {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    font-size: 0.8rem;
    color: var(--text-dim);
  }
  .legend-item { display: flex; align-items: center; gap: 0.35rem; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
  .legend-dot.sol-s { background: #69f0ae; }
  .legend-dot.sol-i { background: #ff5252; }
  .legend-dot.sol-s2 { background: #ffd740; }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-width: 500px;
    margin: 0 auto;
  }
  .activity-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    border-radius: var(--radius-sm);
    animation: fadeInUp 0.4s ease-out both;
  }
  .activity-rank {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-dim);
    width: 20px;
  }
  .activity-symbol {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-primary);
    width: 30px;
  }
  .activity-names {
    flex: 1;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  .activity-badges { display: flex; gap: 0.3rem; }
  .activity-badge {
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.6rem;
    font-weight: 700;
    font-family: var(--font-mono);
  }
  .badge-water { background: rgba(64, 196, 255, 0.2); color: var(--cat-transition); }
  .badge-acid { background: rgba(255, 145, 0, 0.2); color: var(--cat-alkaline); }
  .badge-none { background: rgba(255,255,255,0.05); color: var(--text-dim); }
</style>

<script>
  // Tab switching
  document.querySelectorAll('.ref-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ref-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.ref-panel').forEach(p => {
        (p as HTMLElement).style.display = 'none';
        p.classList.remove('is-visible');
      });
      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.style.display = '';
        panel.classList.add('is-visible');
      }
    });
  });

  // Valence search filter
  const valenceSearch = document.getElementById('valence-search');
  if (valenceSearch) {
    valenceSearch.addEventListener('input', () => {
      const q = (valenceSearch as HTMLInputElement).value.toLowerCase();
      document.querySelectorAll('.valence-cell').forEach(cell => {
        const el = cell as HTMLElement;
        const sym = el.dataset.symbol || '';
        el.style.display = sym.includes(q) ? '' : 'none';
      });
    });
  }
</script>
```

- [ ] **Step 2: Write reference page**

```astro
---
import Layout from '../../components/Layout.astro';
import ReferenceTables from '../../components/ReferenceTables.astro';
---

<Layout title="Chemistry Reference Tables" description="Quick reference: common valences, solubility rules, and metal activity series">
  <div class="tool-page">
    <h1>Quick <span class="text-gradient">Reference</span></h1>
    <p class="tool-sub">Common valences, solubility table, and metal activity series</p>
    <ReferenceTables />
  </div>
</Layout>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ReferenceTables.astro src/pages/tools/reference.astro
git commit -m "feat: add chemistry reference tables (valence, solubility, activity)"
```

---

### Task 21: Flashcards

**Files:**
- Create: `src/components/FlashcardDeck.astro`
- Create: `src/pages/tools/flashcards.astro`

- [ ] **Step 1: Write flashcard component (client island)**

Write the component at `src/components/FlashcardDeck.astro`:

```astro
---
import { getAllElements, CATEGORIES } from '../utils/elements';

const elements = getAllElements();
---

<div class="flashcard-root">
  <!-- Controls -->
  <div class="flashcard-controls">
    <select id="fc-filter" class="fc-select">
      <option value="all">All Elements</option>
      {CATEGORIES.map(c => (
        <option value={c.key}>{c.label}</option>
      ))}
    </select>
    <label class="fc-toggle">
      <input type="checkbox" id="fc-random" />
      <span>Random</span>
    </label>
    <span class="fc-progress" id="fc-progress">0 / 0</span>
  </div>

  <!-- Card -->
  <div class="fc-card-wrap" id="fc-card-wrap">
    <div class="fc-card glass-glow" id="fc-card">
      <div class="fc-card-front">
        <span class="fc-symbol" id="fc-symbol">—</span>
        <span class="fc-z" id="fc-z">0</span>
      </div>
      <div class="fc-card-back">
        <span class="fc-name-en" id="fc-name-en">—</span>
        <span class="fc-name-zh" id="fc-name-zh">—</span>
        <span class="fc-mnemonic" id="fc-mnemonic">—</span>
        <span class="fc-uses" id="fc-uses">—</span>
      </div>
    </div>
  </div>

  <!-- Actions -->
  <div class="fc-actions">
    <button class="fc-btn" id="fc-prev">&larr; Prev</button>
    <button class="fc-btn fc-btn-primary" id="fc-flip">Flip</button>
    <button class="fc-btn" id="fc-next">Next &rarr;</button>
  </div>
  <p class="fc-hint">Click card or press Space to flip. Arrow keys to navigate.</p>
</div>

<script>
  const allElements = (window as any).__allElements || [];
  const CATS = [
    { key: 'alkali', label: 'Alkali Metals' },
    { key: 'alkaline', label: 'Alkaline Earth' },
    { key: 'transition', label: 'Transition Metals' },
    { key: 'post-transition', label: 'Post-Transition' },
    { key: 'metalloid', label: 'Metalloids' },
    { key: 'nonmetal', label: 'Nonmetals' },
    { key: 'halogen', label: 'Halogens' },
    { key: 'noble', label: 'Noble Gases' },
    { key: 'lanthanide', label: 'Lanthanides' },
    { key: 'actinide', label: 'Actinides' },
  ];

  const card = document.getElementById('fc-card')!;
  const wrap = document.getElementById('fc-card-wrap')!;
  const symbolEl = document.getElementById('fc-symbol')!;
  const zEl = document.getElementById('fc-z')!;
  const nameEnEl = document.getElementById('fc-name-en')!;
  const nameZhEl = document.getElementById('fc-name-zh')!;
  const mnemonicEl = document.getElementById('fc-mnemonic')!;
  const usesEl = document.getElementById('fc-uses')!;
  const progressEl = document.getElementById('fc-progress')!;
  const filterSelect = document.getElementById('fc-filter') as HTMLSelectElement;
  const randomCheck = document.getElementById('fc-random') as HTMLInputElement;

  let deck: typeof allElements = [];
  let currentIdx = 0;
  let flipped = false;

  function buildDeck() {
    const cat = filterSelect.value;
    deck = cat === 'all' ? [...allElements] : allElements.filter((e: any) => e.category === cat);
    if (randomCheck.checked) {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
    currentIdx = 0;
    flipped = false;
    showCard();
  }

  function showCard() {
    if (deck.length === 0) {
      symbolEl.textContent = '—';
      zEl.textContent = '0';
      nameEnEl.textContent = 'No elements';
      nameZhEl.textContent = '';
      mnemonicEl.textContent = '';
      usesEl.textContent = '';
      progressEl.textContent = '0 / 0';
      return;
    }
    const el = deck[currentIdx];
    symbolEl.textContent = el.symbol;
    zEl.textContent = String(el.z);
    nameEnEl.textContent = el.nameEn;
    nameZhEl.textContent = el.nameZh;
    mnemonicEl.textContent = el.mnemonicEn || el.mnemonicZh || '';
    usesEl.textContent = el.uses || '';
    progressEl.textContent = `${currentIdx + 1} / ${deck.length}`;
    card.classList.remove('is-flipped');
    flipped = false;
  }

  function flip() {
    flipped = !flipped;
    card.classList.toggle('is-flipped', flipped);
  }

  card.addEventListener('click', flip);
  document.getElementById('fc-flip')!.addEventListener('click', flip);

  document.getElementById('fc-prev')!.addEventListener('click', () => {
    if (deck.length === 0) return;
    currentIdx = (currentIdx - 1 + deck.length) % deck.length;
    showCard();
  });

  document.getElementById('fc-next')!.addEventListener('click', () => {
    if (deck.length === 0) return;
    currentIdx = (currentIdx + 1) % deck.length;
    showCard();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); flip(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); document.getElementById('fc-prev')!.click(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); document.getElementById('fc-next')!.click(); }
  });

  filterSelect.addEventListener('change', buildDeck);
  randomCheck.addEventListener('change', buildDeck);

  // Wait for elements data if loading async
  function init() {
    if (allElements.length > 0) {
      buildDeck();
    } else {
      setTimeout(init, 100);
    }
  }
  init();
</script>

<style>
  .flashcard-root {
    max-width: 420px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .flashcard-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .fc-select {
    padding: 0.4rem 0.75rem;
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.8rem;
    outline: none;
    cursor: pointer;
  }
  .fc-select:focus { border-color: var(--border-glow); }
  .fc-toggle {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
    cursor: pointer;
  }
  .fc-progress {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-dim);
  }

  .fc-card-wrap { perspective: 800px; width: 100%; }
  .fc-card {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: var(--radius-xl);
    cursor: pointer;
    position: relative;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    user-select: none;
  }
  .fc-card.is-flipped { transform: rotateY(180deg); }
  .fc-card-front, .fc-card-back {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border-radius: inherit;
  }
  .fc-card-front {
    background: var(--bg-card);
    border: 1px solid var(--border-glow);
    gap: 0.5rem;
  }
  .fc-card-back {
    transform: rotateY(180deg);
    background: var(--bg-card);
    border: 1px solid var(--border-glow);
    gap: 0.5rem;
    text-align: center;
  }
  .fc-symbol {
    font-family: var(--font-mono);
    font-size: 4rem;
    font-weight: 700;
    background: linear-gradient(135deg, #c4b5fd, #7c4dff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .fc-z {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--text-dim);
  }
  .fc-name-en {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  .fc-name-zh {
    font-size: 1.2rem;
    color: var(--text-secondary);
  }
  .fc-mnemonic {
    font-size: 0.85rem;
    color: var(--text-accent);
    margin-top: 0.5rem;
    line-height: 1.5;
  }
  .fc-uses {
    font-size: 0.75rem;
    color: var(--text-dim);
    line-height: 1.4;
  }

  .fc-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  .fc-btn {
    padding: 0.6rem 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .fc-btn:hover { border-color: var(--border-glow); background: var(--bg-card-hover); }
  .fc-btn-primary {
    background: linear-gradient(135deg, rgba(124, 77, 255, 0.3), rgba(64, 196, 255, 0.2));
    border-color: var(--border-glow);
    font-weight: 600;
    padding: 0.6rem 1.8rem;
  }
  .fc-btn-primary:hover { box-shadow: 0 0 20px rgba(124, 77, 255, 0.3); }
  .fc-hint {
    text-align: center;
    color: var(--text-dim);
    font-size: 0.7rem;
    margin-top: 1rem;
  }
</style>
```

- [ ] **Step 2: Write flashcards page**

```astro
---
import Layout from '../../components/Layout.astro';
import FlashcardDeck from '../../components/FlashcardDeck.astro';
---

<Layout title="Element Flashcards" description="Memorize element symbols and properties with interactive flashcards">
  <div class="tool-page">
    <h1>Element <span class="text-gradient">Flashcards</span></h1>
    <p class="tool-sub">Flip through elements to memorize symbols, names, and properties</p>
    <FlashcardDeck />
  </div>
</Layout>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FlashcardDeck.astro src/pages/tools/flashcards.astro
git commit -m "feat: add element flashcard deck with flip animation"
```

---

### Task 22: Final Integration & Build

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/components/Layout.astro` (add elements data injection)

- [ ] **Step 1: Update astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://periodic-table.example.com',
  build: {
    format: 'file',
  },
});
```

- [ ] **Step 2: Add elements data endpoint for client-side use**

Create `src/pages/elements-data.json.ts` (if not created in Task 18):

```typescript
import { getAllElements } from '../utils/elements';

export async function GET() {
  return new Response(JSON.stringify(getAllElements()), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

- [ ] **Step 3: Inject elements data into Layout for client components**

Add to `src/components/Layout.astro` before closing `</head>`:

```astro
<script is:inline>
  import('../data/elements.json').then(m => {
    window.__allElements = m.default;
  }).catch(() => {
    fetch('/elements-data.json').then(r => r.json()).then(d => { window.__allElements = d; });
  });
</script>
```

- [ ] **Step 4: Full production build**

```bash
npx astro build
```

Expected: build completes successfully with no errors. Check `dist/` for generated HTML.

- [ ] **Step 5: Verify key pages**

```bash
ls dist/element/ | wc -l          # Should show 118
ls dist/tools/                      # Should show balancer, reference, flashcards
ls dist/compare/                    # Compare page
```

- [ ] **Step 6: Run dev server and manual smoke test**

```bash
npx astro dev --port 3000
```

Verify:
- Homepage loads, grid renders, elements clickable
- Search filters elements correctly
- Category chips dim non-matching elements
- Element detail page shows all properties
- Navigation back/next works
- Compare drawer opens/closes

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: final integration - build config, data endpoint, all pages complete"
```

---

## Completion Checklist

After all tasks:
- [ ] Homepage renders full 18-col IUPAC periodic table
- [ ] Search by symbol/name/number filters elements
- [ ] Category filter dims non-matching tiles
- [ ] 118 element detail pages with properties, electron diagram, memory aids
- [ ] Element comparison (2-4 elements side by side)
- [ ] Chemical equation balancer works
- [ ] Reference tables (valence, solubility, activity) render correctly
- [ ] Flashcards with flip animation
- [ ] Compare drawer (slide-out tray)
- [ ] All pages static-generated (SEO-ready)
- [ ] Responsive on mobile (horizontal scroll for table)
- [ ] No build errors
