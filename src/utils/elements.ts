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
  uses: string; mnemonicEn: string; mnemonicZh: string; color: string; colorZh: string;
  triviaEn: string; triviaZh: string;
  roomTempNoteEn: string; roomTempNoteZh: string;
  compoundsEn: string; compoundsZh: string;
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
  { key: 'alkali', label: 'Alkali Metals', labelZh: '碱金属', desc: 'Highly reactive, soft metals with 1 valence electron. Explosive in water.', descZh: '高度活泼的软金属，1个价电子，遇水爆炸。' },
  { key: 'alkaline', label: 'Alkaline Earth', labelZh: '碱土金属', desc: 'Reactive metals with 2 valence electrons. Burns with bright colors.', descZh: '较活泼金属，2个价电子，燃烧产生明亮颜色。' },
  { key: 'transition', label: 'Transition Metals', labelZh: '过渡金属', desc: 'Hard, dense metals with multiple oxidation states. Often colorful compounds.', descZh: '坚硬致密金属，多变氧化态，化合物常呈彩色。' },
  { key: 'post-transition', label: 'Post-Transition', labelZh: '后过渡金属', desc: 'Softer, lower-melting metals between transition and metalloid.', descZh: '较软的金属，熔点较低，介于过渡金属和准金属之间。' },
  { key: 'metalloid', label: 'Metalloids', labelZh: '准金属', desc: 'Semiconductors bridging metals and nonmetals. Basis of modern electronics.', descZh: '半导体特性，介于金属与非金属之间，现代电子学基础。' },
  { key: 'nonmetal', label: 'Nonmetals', labelZh: '非金属', desc: 'Poor conductors, essential for life (C, N, O, P, S). Form covalent bonds.', descZh: '不良导体，生命必需元素(C,N,O,P,S)，形成共价键。' },
  { key: 'halogen', label: 'Halogens', labelZh: '卤素', desc: 'Highly reactive nonmetals forming salts with metals. "Salt former".', descZh: '极活泼非金属，与金属形成盐类，"成盐元素"。' },
  { key: 'noble', label: 'Noble Gases', labelZh: '稀有气体', desc: 'Colorless, odorless inert gases. Full valence shell — chemically stable.', descZh: '无色无味惰性气体，满价电子层，化学性质稳定。' },
  { key: 'lanthanide', label: 'Lanthanides', labelZh: '镧系元素', desc: 'Silvery rare-earth metals. Used in magnets, lasers, and phosphors.', descZh: '银白色稀土金属，用于磁铁、激光和荧光粉。' },
  { key: 'actinide', label: 'Actinides', labelZh: '锕系元素', desc: 'Mostly radioactive heavy elements. Includes nuclear fuels U and Pu.', descZh: '大多为放射性重元素，包含核燃料铀和钚。' },
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

export function getCategoryLabel(cat: string): string {
  const c = CATEGORIES.find(x => x.key === cat);
  return c?.label ?? cat;
}
export function getCategoryLabelZh(cat: string): string {
  const c = CATEGORIES.find(x => x.key === cat);
  return c?.labelZh ?? cat;
}

export const STATE_LABELS: Record<string, string> = {
  solid: '固体', gas: '气体', liquid: '液体', synthetic: '人造元素',
};
export const BLOCK_LABELS: Record<string, string> = {
  s: 's区', p: 'p区', d: 'd区', f: 'f区',
};
export const CRYSTAL_LABELS: Record<string, { en: string; zh: string }> = {
  bcc: { en: 'Body-Centered Cubic (BCC)', zh: '体心立方' },
  fcc: { en: 'Face-Centered Cubic (FCC)', zh: '面心立方' },
  hcp: { en: 'Hexagonal Close-Packed (HCP)', zh: '六方密堆积' },
  hexagonal: { en: 'Hexagonal', zh: '六方晶系' },
  cubic: { en: 'Cubic', zh: '立方晶系' },
  orthorhombic: { en: 'Orthorhombic', zh: '正交晶系' },
  rhombohedral: { en: 'Rhombohedral', zh: '菱方晶系' },
  tetragonal: { en: 'Tetragonal', zh: '四方晶系' },
  monoclinic: { en: 'Monoclinic', zh: '单斜晶系' },
  'diamond cubic': { en: 'Diamond Cubic', zh: '金刚石立方' },
};

export const COUNTRY_LABELS: Record<string, string> = {
  England: '英国', France: '法国', Germany: '德国', Sweden: '瑞典',
  Scotland: '苏格兰', USA: '美国', Russia: '俄罗斯', Italy: '意大利',
  Denmark: '丹麦', Austria: '奥地利', Switzerland: '瑞士', Finland: '芬兰',
  Mexico: '墨西哥', Japan: '日本', Netherlands: '荷兰', Spain: '西班牙',
  'USA/Russia': '美国/俄罗斯',
  '': '—',
};

export const USES_ZH: Record<string, string> = {
  // Discovery/Common
  'Known to ancients': '古代已知',
  'Known to pre-Columbian Americans': '前哥伦布时期美洲已知',
  Ancient: '古代',
  'Research only': '仅用于研究',
  'Research, neutron detection': '研究用，中子探测',
  'Research, neutron source': '研究用，中子源',
  'Research, space applications': '研究用，太空应用',
  unknown: '未知',

  // Uses
  'Aerospace alloys, stadium lights, sports equipment': '航空航天合金，体育场灯光，运动器材',
  'Aerospace alloys, X-ray windows, nuclear reactors': '航空航天合金，X射线窗口，核反应堆',
  'Aircraft, implants, jewelry, golf clubs, paint pigment': '飞机，植入物，珠宝，高尔夫球杆，油漆颜料',
  'Anti-static devices, heat source for space probes': '防静电装置，太空探测器热源',
  'Atomic clocks, drilling fluid, getter in vacuum tubes': '原子钟，钻井液，真空管吸气剂',
  'Atomic clocks, fireworks, research, glass': '原子钟，烟花，研究，玻璃',
  'Atomic clocks, stress gauges, lasers': '原子钟，应力计，激光',
  'Balloons, cooling MRI magnets, welding shield gas': '气球，冷却MRI磁体，焊接保护气',
  'Batteries, ceramics, glass, mood stabilizer medication': '电池，陶瓷，玻璃，情绪稳定剂药物',
  'Batteries, pigments, solar cells, nuclear control rods': '电池，颜料，太阳能电池，核控制棒',
  'Batteries, superalloys, magnets, vitamin B12': '电池，高温合金，磁铁，维生素B12',
  'Bones, teeth, cement, cheese making, calcium supplements': '骨骼，牙齿，水泥，奶酪制作，钙补充剂',
  'Borosilicate glass, detergents, semiconductors, borax': '硼硅玻璃，洗涤剂，半导体，硼砂',
  'Breathing, combustion, steelmaking, water treatment': '呼吸，燃烧，炼钢，水处理',
  'Camera lenses, hydrogen storage, flint lighters': '相机镜头，储氢，打火石',
  'Cancer radiotherapy (historical), earthquake prediction research': '癌症放疗（历史），地震预测研究',
  'Cans, foil, aircraft, construction, electronics': '罐，铝箔，飞机，建筑，电子',
  'Capacitors in phones, surgical implants, alloys': '手机电容，外科植入物，合金',
  'Car batteries, radiation shielding, ammunition, weights': '汽车电池，辐射屏蔽，弹药，配重',
  'Car headlights, ion thrusters, anesthesia, strobe lights': '汽车大灯，离子推进器，麻醉，频闪灯',
  'Catalytic converters, glass polishing, lighter flints': '催化转换器，玻璃抛光，打火机火石',
  'Catalytic converters, hydrogen storage, jewelry': '催化转换器，储氢，珠宝',
  'Catalytic converters, jewelry plating, sensors': '催化转换器，珠宝电镀，传感器',
  'Computer chips, glass, concrete, solar cells': '计算机芯片，玻璃，混凝土，太阳能电池',
  'Disinfectant, thyroid health, photography, LCD screens': '消毒剂，甲状腺健康，摄影，LCD屏幕',
  'Electrical wiring, plumbing, coins, antimicrobial surfaces': '电线，管道，硬币，抗菌表面',
  'Electronics, catalysts, hard disk drives': '电子，催化剂，硬盘驱动器',
  'Electronics, glass, rat poison (historical)': '电子，玻璃，老鼠药（历史）',
  'Fertilizers, ammonia, cryogenics, food packaging': '肥料，氨，低温技术，食品包装',
  'Fertilizers, matches, detergents, DNA backbone': '肥料，火柴，洗涤剂，DNA骨架',
  'Fertilizers, soap, glass, essential nutrient for plants': '肥料，肥皂，玻璃，植物必需营养素',
  'Fiber optic amplifiers, pink glass, lasers': '光纤放大器，粉色玻璃，激光',
  'Fiber optics, infrared optics, semiconductors': '光纤，红外光学，半导体',
  'Fireworks (red), flares, toothpaste, CRT glass': '烟花（红色），信号弹，牙膏，CRT玻璃',
  'Flame retardants, batteries, semiconductors, alloys': '阻燃剂，电池，半导体，合金',
  'Flame retardants, photography, water treatment': '阻燃剂，摄影，水处理',
  'Fountain pen tips, fingerprint detection, catalysts': '钢笔尖，指纹检测，催化剂',
  'Galvanization, batteries, sunscreen, brass alloy': '镀锌，电池，防晒霜，黄铜合金',
  'Green phosphors, solid-state devices, sonar': '绿色荧光粉，固态器件，声纳',
  'High-speed photography flash, laser, insulation windows': '高速摄影闪光灯，激光，绝缘窗',
  'Historical luminous paint, cancer therapy (historical)': '历史夜光涂料，癌症治疗（历史）',
  'Jet engine superalloys, catalysts, thermocouples': '喷气发动机高温合金，催化剂，热电偶',
  'Jewelry, catalytic converters, chemotherapy drugs': '珠宝，催化转换器，化疗药物',
  'Jewelry, electronics, investments, dentistry': '珠宝，电子，投资，牙科',
  'Jewelry, photography, electronics, mirrors, antibacterial': '珠宝，摄影，电子，镜子，抗菌',
  'Lasers, portable X-ray devices, research': '激光，便携X射线设备，研究',
  'LED phosphors, lasers, superconductors, ceramics': 'LED荧光粉，激光，超导体，陶瓷',
  'Light bulb filaments, cutting tools, armor piercing': '灯泡灯丝，切割工具，穿甲弹',
  'Lightweight alloys, fireworks, flash photography, chlorophyll': '轻质合金，烟花，闪光摄影，叶绿素',
  'Magnets, nuclear control rods, lasers': '磁铁，核控制棒，激光',
  'Magnets, nuclear reactors, lasers': '磁铁，核反应堆，激光',
  'Magnets, yellow glass, lasers, arc lighting': '磁铁，黄色玻璃，激光，弧光灯',
  'Medical imaging, corrosion inhibitor': '医学成像，缓蚀剂',
  'Medical X-ray contrast (barium meal), fireworks (green)': '医用X射线造影（钡餐），烟花（绿色）',
  'MRI contrast agents, nuclear reactors, green phosphors': 'MRI造影剂，核反应堆，绿色荧光粉',
  'Neon signs, high-voltage indicators, lasers': '霓虹灯，高压指示器，激光',
  'Neutron source for starting nuclear reactors, cancer therapy': '核反应堆启动中子源，癌症治疗',
  'Nuclear batteries, luminous paint, research': '核电池，夜光涂料，研究',
  'Nuclear control rods, superalloys, microprocessors': '核控制棒，高温合金，微处理器',
  'Nuclear fuel (potential), gas mantles, welding rods': '核燃料（潜在），煤气灯罩，焊条',
  'Nuclear power, weapons, glass coloring, armor plating': '核能，武器，玻璃着色，装甲板',
  'Nuclear reactors, fake diamonds (CZ), ceramics': '核反应堆，人造钻石（CZ），陶瓷',
  'Nuclear weapons, space probe power (RTG)': '核武器，太空探测器电源（RTG）',
  'Pepto-Bismol, cosmetics, fire sprinklers, non-toxic shot': '胃药，化妆品，消防喷淋，无毒子弹',
  'PET scan detectors, petroleum cracking, research': 'PET扫描探测器，石油裂化，研究',
  'Photocopiers, glass coloring, dandruff shampoo, solar cells': '复印机，玻璃着色，去屑洗发水，太阳能电池',
  'Red phosphor in TV/display screens, anti-counterfeiting': '电视/显示器红色荧光粉，防伪',
  'Research only, potential cancer treatment': '仅用于研究，潜在癌症治疗',
  'Rocket fuel, ammonia production, hydrogenation, fuel cells': '火箭燃料，氨生产，加氢，燃料电池',
  'Semiconductors, LEDs, solar panels, melts in your hand': '半导体，LED，太阳能板，在手中融化',
  'Semiconductors, wood preservative, pesticides (historical)': '半导体，木材防腐剂，杀虫剂（历史）',
  'Smoke detectors, research': '烟雾探测器，研究',
  'Solar panels, rewritable discs, thermoelectrics': '太阳能板，可擦写光盘，热电材料',
  'Spark plugs, crucibles, dinosaur extinction marker': '火花塞，坩埚，恐龙灭绝标记',
  'Stainless steel, chrome plating, dyes, emeralds': '不锈钢，镀铬，染料，祖母绿',
  'Stainless steel, coins, batteries, electroplating': '不锈钢，硬币，电池，电镀',
  'Steel alloy, lubricants, catalysts, plant nutrient': '钢合金，润滑剂，催化剂，植物营养素',
  'Steel alloy, redox flow batteries, catalysts': '钢合金，氧化还原液流电池，催化剂',
  'Steel production, batteries, glass coloring, enzymes': '钢铁生产，电池，玻璃着色，酶',
  'Steel, construction, transport, hemoglobin in blood': '钢铁，建筑，运输，血液中的血红蛋白',
  'Steel, plastics, fuel, diamonds, life itself': '钢铁，塑料，燃料，钻石，生命本身',
  'Strongest magnetic element, lasers, nuclear control': '最强磁性元素，激光，核控制',
  'Sulfuric acid, rubber vulcanization, gunpowder, matches': '硫酸，橡胶硫化，火药，火柴',
  'Super strong magnets, lasers, headphones, microphones': '超强磁铁，激光，耳机，麦克风',
  'Superconducting magnets, steel alloys, jewelry': '超导磁体，钢合金，珠宝',
  'Table salt (NaCl), street lights, industrial chemicals': '食盐（NaCl），路灯，工业化学品',
  'Thermometers, fluorescent lights, gold extraction (historical)': '温度计，荧光灯，黄金提取（历史）',
  'Tin cans, solder, bronze alloy, glass coating': '锡罐，焊料，青铜合金，玻璃涂层',
  'Toothpaste, Teflon, uranium enrichment, refrigerants': '牙膏，特氟龙，铀浓缩，制冷剂',
  'Touch screens, LCD displays, solders, LEDs': '触摸屏，LCD显示器，焊料，LED',
  'Water disinfection, PVC plastic, bleach, swimming pools': '水消毒，PVC塑料，漂白剂，游泳池',
  'Welding shield gas, light bulbs, laser surgery': '焊接保护气，灯泡，激光手术',
};
