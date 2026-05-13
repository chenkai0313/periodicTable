const KEY = 'pt-compare';

export function getCompareQueue(): number[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

function save(q: number[]) { localStorage.setItem(KEY, JSON.stringify(q)); }

export function addToCompare(z: number): number[] {
  const q = getCompareQueue();
  if (q.includes(z) || q.length >= 4) return q;
  q.push(z); save(q);
  window.dispatchEvent(new CustomEvent('compare-updated', { detail: q }));
  return q;
}

export function removeFromCompare(z: number): number[] {
  const q = getCompareQueue().filter(n => n !== z);
  save(q);
  window.dispatchEvent(new CustomEvent('compare-updated', { detail: q }));
  return q;
}

export function clearCompare(): void {
  save([]);
  window.dispatchEvent(new CustomEvent('compare-updated', { detail: [] }));
}

export function isInCompare(z: number): boolean { return getCompareQueue().includes(z); }
