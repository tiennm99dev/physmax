/**
 * Useful and wasted energy of light bulbs. Each second a bulb takes in some
 * electrical energy (năng lượng toàn phần); the part turned into light is the
 * useful energy (năng lượng có ích), the rest is wasted, mostly as heat
 * (năng lượng hao phí). Useful + wasted = total, by conservation of energy.
 *
 * The useful fractions are rounded figures for the lesson: about 10 % for a
 * filament bulb, 25 % for a compact fluorescent and 40 % for an LED.
 */

/** @typedef {'soi-dot' | 'compact' | 'led'} BulbId */
/** @typedef {{ id: BulbId, name: string, useful: number }} Bulb */

/** @type {Bulb[]} */
export const BULBS = [
  { id: 'soi-dot', name: 'Đèn sợi đốt', useful: 0.1 },
  { id: 'compact', name: 'Đèn compact', useful: 0.25 },
  { id: 'led', name: 'Đèn LED', useful: 0.4 },
];

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/** @param {BulbId} id @returns {Bulb} */
export function bulb(id) {
  return BULBS.find((b) => b.id === id) ?? BULBS[0];
}

/**
 * Split `total` joules of electrical energy into light and waste.
 * @param {BulbId} id @param {number} total
 */
export function split(id, total) {
  const useful = tidy(total * bulb(id).useful);
  return { total, useful, wasted: tidy(total - useful) };
}

/**
 * Electrical energy a bulb needs to give out `light` joules of light.
 * @param {BulbId} id @param {number} light
 */
export function totalFor(id, light) {
  return tidy(light / bulb(id).useful);
}

/**
 * Wasted energy from the total and the useful energy.
 * @param {number} total @param {number} useful
 */
export function wasted(total, useful) {
  return tidy(total - useful);
}
