/**
 * The joulemeter bench: a 12 V source feeds a heating wire in a calorimeter
 * of water through a joulemeter, which counts the electrical energy the wire
 * receives. All of it becomes thermal energy that warms the water and, a
 * little, the calorimeter, stirrer and wire themselves. Heat lost to the room
 * is left out, so the temperature rise is proportional to the energy.
 */

/** Power of the heating wire on the 12 V source, W. */
export const POWER = 24;

/** Energy to warm 1 g of water by 1 °C, J (4 200 J for 1 kg). */
export const WATER_J_PER_G = 4.2;

/** Energy to warm the calorimeter, wire and stirrer by 1 °C, J. */
export const VESSEL_J_PER_DEGREE = 50;

/** Room temperature the water starts at, °C. */
export const ROOM = 25;

/** @typedef {{ celsius: number, joules: number }} Reading */

/** Rounds away floating-point noise. */
const tidy = (/** @type {number} */ v) => Math.round(v * 1e6) / 1e6;

/**
 * Energy the bench needs for each 1 °C of temperature rise, J.
 * @param {number} grams mass of water
 */
export function joulesPerDegree(grams) {
  return tidy(WATER_J_PER_G * grams + VESSEL_J_PER_DEGREE);
}

/**
 * Water temperature after the wire has received `joules` from the start.
 * @param {number} joules
 * @param {number} grams
 * @param {number} [start]
 */
export function temperatureAfter(joules, grams, start = ROOM) {
  return tidy(start + joules / joulesPerDegree(grams));
}

/**
 * Energy needed to warm the water by `rise` °C, J.
 * @param {number} rise
 * @param {number} grams
 */
export function energyFor(rise, grams) {
  return tidy(rise * joulesPerDegree(grams));
}

/**
 * Energy the wire delivers in `seconds`, J.
 * @param {number} seconds
 * @param {number} [power]
 */
export function energyIn(seconds, power = POWER) {
  return tidy(seconds * power);
}

/**
 * Rows of a results table turned into (temperature rise, energy received)
 * pairs measured from the first row, the "Bắt đầu đo" row.
 * @param {Reading[]} rows
 * @returns {Array<{ rise: number, energy: number }>}
 */
export function increments(rows) {
  if (rows.length === 0) return [];
  const [first] = rows;
  return rows.map((r) => ({
    rise: tidy(r.celsius - first.celsius),
    energy: tidy(r.joules - first.joules),
  }));
}

/**
 * Energy per degree from measured pairs: the slope of the best line through
 * the origin, Σ(rise · energy) / Σ(rise²). NaN without a rise to divide by.
 * @param {Array<{ rise: number, energy: number }>} points
 */
export function slope(points) {
  const xx = points.reduce((s, p) => s + p.rise * p.rise, 0);
  if (!(xx > 0)) return NaN;
  return tidy(points.reduce((s, p) => s + p.rise * p.energy, 0) / xx);
}
