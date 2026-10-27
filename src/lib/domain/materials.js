/**
 * Densities of the substances this chapter works with, in kg/m³, as rounded
 * in the textbook table, plus the small number helpers its widgets share.
 */
import { fmt, formatNumber } from '#lib/core/number-format.js';

/** @typedef {{ id: string, name: string, density: number }} Material density in kg/m³ */

/** @type {Material[]} */
export const SOLIDS = [
  { id: 'chi', name: 'Chì', density: 11300 },
  { id: 'dong', name: 'Đồng', density: 8900 },
  { id: 'sat', name: 'Sắt', density: 7800 },
  { id: 'nhom', name: 'Nhôm', density: 2700 },
  { id: 'da', name: 'Đá', density: 2600 },
  { id: 'nuoc-da', name: 'Nước đá', density: 900 },
  { id: 'go', name: 'Gỗ tốt', density: 800 },
];

/** @type {Material[]} */
export const LIQUIDS = [
  { id: 'thuy-ngan', name: 'Thủy ngân', density: 13600 },
  { id: 'nuoc-muoi', name: 'Nước muối đặc', density: 1200 },
  { id: 'nuoc', name: 'Nước', density: 1000 },
  { id: 'dau-hoa', name: 'Dầu hỏa', density: 800 },
  { id: 'xang', name: 'Xăng', density: 700 },
];

/**
 * @param {string} id
 * @returns {Material}
 */
export function material(id) {
  const found = [...SOLIDS, ...LIQUIDS].find((m) => m.id === id);
  if (!found) throw new Error(`Unknown material ${id}`);
  return found;
}

/**
 * Rounds away floating-point noise (0.1 + 0.2 → 0.3).
 * @param {number} x
 */
export const tidy = (x) => Math.round(x * 1e9) / 1e9;

/**
 * Density in g/cm³ from kg/m³: 1 g/cm³ = 1000 kg/m³.
 * @param {number} kgPerM3
 */
export const toGPerCm3 = (kgPerM3) => tidy(kgPerM3 / 1000);

/**
 * Specific weight d = 10D (N/m³) from the density D (kg/m³), with P = 10m.
 * @param {number} density
 */
export const specificWeight = (density) => tidy(10 * density);

/**
 * A number as the book prints it: digit groups of three split by a narrow
 * space, a decimal comma, at most `maxDecimals` places: 2697.3 → '2 697,3'.
 * @param {number} value
 * @param {number} [maxDecimals]
 */
export function qty(value, maxDecimals = 2) {
  const text = formatNumber(Math.abs(value), maxDecimals);
  const [int, frac] = text.split(',');
  const grouped = fmt(Number(int.replace(/\./g, '')));
  const sign = value < 0 && text !== '0' ? '−' : '';
  return frac ? `${sign}${grouped},${frac}` : `${sign}${grouped}`;
}
