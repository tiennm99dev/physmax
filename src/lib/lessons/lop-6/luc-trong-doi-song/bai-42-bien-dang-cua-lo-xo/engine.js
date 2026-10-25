/**
 * A spring hung vertically with slotted 50 g masses. Lengths are in
 * centimetres, masses in grams. Within its elastic limit the spring's
 * extension Δl = l − l0 is proportional to the hanging mass and the spring
 * returns to l0 when unloaded. Past the limit it stretches more than in
 * proportion and keeps a permanent set: unloaded, it no longer returns to l0.
 */

/** @typedef {{ id: string, name: string, l0: number, perStep: number, limit: number, set: number }} Spring */

/** Mass of one slotted weight, in grams. */
export const STEP_MASS = 50;
/** Most weights the hanger takes. */
export const MAX_WEIGHTS = 7;

/** @type {Spring[]} */
export const SPRINGS = [
  { id: 'mem', name: 'Lò xo mềm', l0: 10, perStep: 2, limit: 300, set: 1.5 },
  { id: 'cung', name: 'Lò xo cứng hơn', l0: 12, perStep: 1, limit: 300, set: 1 },
];

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/**
 * Length of the spring with `mass` grams hanging from it.
 * @param {Spring} spring @param {number} mass @param {boolean} damaged
 */
export function lengthOf(spring, mass, damaged) {
  const rest = spring.l0 + (damaged ? spring.set : 0);
  const k = spring.perStep / STEP_MASS;
  if (mass <= spring.limit) return tidy(rest + k * mass);
  // Past the elastic limit the spring gives three times as much per gram.
  return tidy(rest + k * spring.limit + 3 * k * (mass - spring.limit));
}

/**
 * Whether hanging `mass` grams overstretches the spring for good.
 * @param {Spring} spring @param {number} mass
 */
export function overLimit(spring, mass) {
  return mass > spring.limit;
}

/**
 * Extension of the spring: Δl = l − l0.
 * @param {number} l @param {number} l0
 */
export function extension(l, l0) {
  return tidy(l - l0);
}

/**
 * Whether a reading typed by the learner matches the length, to within a
 * quarter of the ruler's 0,5 cm division.
 * @param {number} typed @param {number} actual
 */
export function readingOk(typed, actual) {
  return Math.abs(typed - actual) <= 0.125;
}

/**
 * Whether recorded (mass, extension) rows are in proportion: every nonzero
 * row gives the same Δl / m. Needs at least two nonzero masses.
 * @param {Array<{ m: number, dl: number }>} rows
 */
export function proportional(rows) {
  const used = rows.filter((r) => r.m > 0);
  if (used.length < 2) return false;
  const k = used[0].dl / used[0].m;
  return used.every((r) => Math.abs(r.dl / r.m - k) < 1e-9);
}
