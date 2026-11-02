/**
 * Virtual bench for adding forces: two concurrent forces with the parallelogram
 * rule and a simulated reading, and two parallel forces hung on a bar that
 * rests on two springs, where one load at the right spot reproduces the same
 * stretch of each spring.
 */
import { tidy } from '#lib/core/number-format.js';

/** @param {number} deg */
const rad = (deg) => (deg * Math.PI) / 180;

/**
 * F² = F1² + F2² + 2·F1·F2·cos α.
 * @param {number} f1 @param {number} f2 @param {number} alpha degrees between them
 */
export function resultant(f1, f2, alpha) {
  return tidy(Math.sqrt(f1 * f1 + f2 * f2 + 2 * f1 * f2 * Math.cos(rad(alpha))));
}

/**
 * Angles each force makes with the resultant, in degrees, which add up to `alpha`.
 * @param {number} f1 @param {number} f2 @param {number} alpha
 * @returns {{ a1: number, a2: number }}
 */
export function splitAngles(f1, f2, alpha) {
  const r = rad(alpha);
  const a1 = (Math.atan2(f2 * Math.sin(r), f1 + f2 * Math.cos(r)) * 180) / Math.PI;
  return { a1: tidy(a1), a2: tidy(alpha - a1) };
}

/**
 * What the single spring balance reads: the true value with a small repeatable
 * error of up to one scale division (0.1 N), rounded to the division.
 * @param {number} f1 @param {number} f2 @param {number} alpha
 */
export function balanceReading(f1, f2, alpha) {
  const code = Math.round(f1 * 10) * 7 + Math.round(f2 * 10) * 13 + alpha * 3;
  const error = ((code % 3) - 1) * 0.1;
  return tidy(Math.round((resultant(f1, f2, alpha) + error) * 10) / 10);
}

/**
 * Relative gap between measured and worked-out values, in percent.
 * @param {number} measured @param {number} worked
 */
export function percentGap(measured, worked) {
  return tidy((Math.abs(measured - worked) / worked) * 100);
}

/** @typedef {{ force: number, at: number }} Load */

/**
 * How two end springs share loads hung along a bar of length `length`, from the
 * balance of forces and of moments about one end.
 * @param {number} length @param {Load[]} loads `at` measured from the left end
 * @returns {{ left: number, right: number }}
 */
export function springShares(length, loads) {
  const total = loads.reduce((sum, l) => sum + l.force, 0);
  const right = loads.reduce((sum, l) => sum + l.force * l.at, 0) / length;
  return { left: tidy(total - right), right: tidy(right) };
}

/**
 * Where one load F1 + F2 sits so that it acts like F1 at `a` and F2 at `b`:
 * the point dividing AB with F1·d1 = F2·d2.
 * @param {number} f1 @param {number} a @param {number} f2 @param {number} b
 */
export function parallelPoint(f1, a, f2, b) {
  return tidy((f1 * a + f2 * b) / (f1 + f2));
}
