/**
 * A virtual free-fall rig: a steel cylinder held by an electromagnet falls past
 * one photogate placed `s` metres below the release point. Measured times carry
 * a small seeded scatter, so the same draw number always gives the same reading.
 */
import { scatter } from '#lib/domain/scatter.js';
import { tidy } from '#lib/core/number-format.js';

export const LOCAL_G = 9.78; // the true value the rig falls with, m/s²
export const COLUMN = 1.2; // length of the upright rail, m
export const GATE = /** @type {const} */ ({ min: 0.2, max: 1.2, step: 0.1 });
export const MIN_READINGS = 3;
export const MIN_HEIGHTS = 3;

/**
 * Time to fall `s` metres from rest, with no scatter.
 * @param {number} s
 */
export function idealTime(s) {
  return Math.sqrt((2 * s) / LOCAL_G);
}

/**
 * Distance fallen at time `t`, stopped at the foot of the rail.
 * @param {number} t
 */
export function fallenAt(t) {
  return Math.min(COLUMN, (LOCAL_G * t * t) / 2);
}

/**
 * One clock reading, to 0,001 s.
 * @param {number} draw reading number, the seed of its scatter
 * @param {number} s gate distance
 */
export function reading(draw, s) {
  return tidy(idealTime(s) + scatter(draw) * 0.0015, 3);
}

/**
 * g = 2s / t².
 * @param {number} s @param {number} t
 */
export function gravityFrom(s, t) {
  return (2 * s) / (t * t);
}

/**
 * Mean time, its square and the g it gives for one gate position.
 * @param {number} s @param {number[]} times at least one
 */
export function heightRow(s, times) {
  const mean = tidy(times.reduce((sum, t) => sum + t, 0) / times.length, 3);
  return {
    s,
    n: times.length,
    mean,
    tSquared: tidy(mean * mean, 4),
    g: tidy(gravityFrom(s, mean), 3),
  };
}

/**
 * Slope k of the best line s = k·t² through the origin (least squares).
 * @param {Array<{ s: number, tSquared: number }>} rows
 */
export function slopeThroughOrigin(rows) {
  const top = rows.reduce((sum, r) => sum + r.s * r.tSquared, 0);
  const bottom = rows.reduce((sum, r) => sum + r.tSquared * r.tSquared, 0);
  return bottom > 0 ? top / bottom : 0;
}

/**
 * The result over all gate positions: the mean g, the mean absolute deviation
 * as its error, and the g from the slope of the s-t² line.
 * @param {Array<{ s: number, tSquared: number, g: number }>} rows at least one
 */
export function summarize(rows) {
  const n = rows.length;
  const g = tidy(rows.reduce((sum, r) => sum + r.g, 0) / n, 3);
  const error = tidy(rows.reduce((sum, r) => sum + Math.abs(r.g - g), 0) / n, 3);
  const slope = tidy(slopeThroughOrigin(rows), 3);
  return { n, g, error, slope, gFromSlope: tidy(2 * slope, 2) };
}

/**
 * Keeps the gate on a whole step of the rail.
 * @param {number} s
 */
export function snapGate(s) {
  const clamped = Math.min(GATE.max, Math.max(GATE.min, s));
  return tidy(Math.round(clamped / GATE.step) * GATE.step, 1);
}
