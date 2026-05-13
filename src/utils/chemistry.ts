export interface Compound { elements: Map<string, number>; charge: number; }

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
      const ic = parseCompound(inner);
      for (const [el, n] of ic.elements) elements.set(el, (elements.get(el) || 0) + n * mult);
    } else if (/[A-Z]/.test(formula[i])) {
      let el = formula[i]; i++;
      while (i < formula.length && /[a-z]/.test(formula[i])) { el += formula[i]; i++; }
      let count = '';
      while (i < formula.length && /\d/.test(formula[i])) { count += formula[i]; i++; }
      elements.set(el, (elements.get(el) || 0) + (count ? parseInt(count) : 1));
    } else { i++; }
  }
  return { elements, charge: 0 };
}

export function balanceEquation(input: string): string | null {
  const parts = input.split(/[=→⟶]/);
  if (parts.length !== 2) return null;
  const reactants = parts[0].split('+').map(s => s.trim()).filter(Boolean);
  const products = parts[1].split('+').map(s => s.trim()).filter(Boolean);
  if (!reactants.length || !products.length) return null;

  const allFormulas = [...reactants, ...products];
  const compounds = allFormulas.map(parseCompound);
  const elArr = Array.from(new Set(compounds.flatMap(c => Array.from(c.elements.keys()))));

  function solve(): number[] | null {
    const n = allFormulas.length;
    const coeffs = new Array(n).fill(1);
    function check(): boolean {
      for (const el of elArr) {
        let lhs = 0, rhs = 0;
        for (let i = 0; i < reactants.length; i++) lhs += coeffs[i] * (compounds[i].elements.get(el) || 0);
        for (let i = 0; i < products.length; i++) rhs += coeffs[reactants.length + i] * (compounds[reactants.length + i].elements.get(el) || 0);
        if (lhs !== rhs) return false;
      }
      return true;
    }
    function dfs(idx: number): boolean {
      if (idx === n) return check();
      for (let c = 1; c <= 12; c++) { coeffs[idx] = c; if (dfs(idx + 1)) return true; }
      return false;
    }
    return dfs(0) ? coeffs : null;
  }

  const result = solve();
  if (!result) return null;
  const lhs = reactants.map((r, i) => (result[i] === 1 ? '' : String(result[i])) + r).join(' + ');
  const rhs = products.map((p, i) => (result[reactants.length + i] === 1 ? '' : String(result[reactants.length + i])) + p).join(' + ');
  return `${lhs} → ${rhs}`;
}

export const VALENCE_DATA: Record<string, number[]> = {
  'H':[1],'He':[0],'Li':[1],'Be':[2],'B':[3],'C':[2,4],'N':[-3,3,5],'O':[-2],'F':[-1],'Ne':[0],
  'Na':[1],'Mg':[2],'Al':[3],'Si':[4],'P':[-3,3,5],'S':[-2,4,6],'Cl':[-1,1,3,5,7],'Ar':[0],
  'K':[1],'Ca':[2],'Sc':[3],'Ti':[3,4],'V':[2,3,4,5],'Cr':[2,3,6],'Mn':[2,4,7],'Fe':[2,3],
  'Co':[2,3],'Ni':[2,3],'Cu':[1,2],'Zn':[2],'Ga':[3],'Ge':[4],'As':[-3,3,5],'Se':[-2,4,6],
  'Br':[-1,1,5],'Kr':[0],'Rb':[1],'Sr':[2],'Ag':[1],'Cd':[2],'In':[3],'Sn':[2,4],'Sb':[3,5],
  'I':[-1,1,5,7],'Xe':[0],'Cs':[1],'Ba':[2],'Pt':[2,4],'Au':[1,3],'Hg':[1,2],'Pb':[2,4],'Bi':[3,5],
};

export const SOLUBILITY_DATA = [
  { ion:'Na⁺',cl:'S',so4:'S',co3:'S',oh:'S',no3:'S' },
  { ion:'K⁺',cl:'S',so4:'S',co3:'S',oh:'S',no3:'S' },
  { ion:'NH₄⁺',cl:'S',so4:'S',co3:'S',oh:'S',no3:'S' },
  { ion:'Mg²⁺',cl:'S',so4:'S',co3:'I',oh:'I',no3:'S' },
  { ion:'Ca²⁺',cl:'S',so4:'s',co3:'I',oh:'s',no3:'S' },
  { ion:'Ba²⁺',cl:'S',so4:'I',co3:'I',oh:'S',no3:'S' },
  { ion:'Fe²⁺',cl:'S',so4:'S',co3:'I',oh:'I',no3:'S' },
  { ion:'Fe³⁺',cl:'S',so4:'S',co3:'—',oh:'I',no3:'S' },
  { ion:'Cu²⁺',cl:'S',so4:'S',co3:'I',oh:'I',no3:'S' },
  { ion:'Zn²⁺',cl:'S',so4:'S',co3:'I',oh:'I',no3:'S' },
  { ion:'Al³⁺',cl:'S',so4:'S',co3:'—',oh:'I',no3:'S' },
  { ion:'Ag⁺',cl:'I',so4:'s',co3:'I',oh:'I',no3:'S' },
  { ion:'Pb²⁺',cl:'s',so4:'I',co3:'I',oh:'I',no3:'S' },
];

export const ACTIVITY_SERIES = [
  { metal:'K',name:'Potassium',nameZh:'钾',reactsWater:true,reactsAcid:true },
  { metal:'Ca',name:'Calcium',nameZh:'钙',reactsWater:true,reactsAcid:true },
  { metal:'Na',name:'Sodium',nameZh:'钠',reactsWater:true,reactsAcid:true },
  { metal:'Mg',name:'Magnesium',nameZh:'镁',reactsWater:true,reactsAcid:true },
  { metal:'Al',name:'Aluminium',nameZh:'铝',reactsWater:false,reactsAcid:true },
  { metal:'Zn',name:'Zinc',nameZh:'锌',reactsWater:false,reactsAcid:true },
  { metal:'Fe',name:'Iron',nameZh:'铁',reactsWater:false,reactsAcid:true },
  { metal:'Sn',name:'Tin',nameZh:'锡',reactsWater:false,reactsAcid:true },
  { metal:'Pb',name:'Lead',nameZh:'铅',reactsWater:false,reactsAcid:true },
  { metal:'Cu',name:'Copper',nameZh:'铜',reactsWater:false,reactsAcid:false },
  { metal:'Hg',name:'Mercury',nameZh:'汞',reactsWater:false,reactsAcid:false },
  { metal:'Ag',name:'Silver',nameZh:'银',reactsWater:false,reactsAcid:false },
  { metal:'Pt',name:'Platinum',nameZh:'铂',reactsWater:false,reactsAcid:false },
  { metal:'Au',name:'Gold',nameZh:'金',reactsWater:false,reactsAcid:false },
];
