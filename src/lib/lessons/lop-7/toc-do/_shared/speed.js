/**
 * Speed helpers shared by the lessons of the chapter: v = s/t and the two
 * units of the book, m/s and km/h (1 m/s = 3,6 km/h).
 */

/** km/h in one m/s: 1 m/s = 3600 m/h = 3,6 km/h. */
export const KMH_PER_MS = 3.6;

/**
 * Speed of a body that covers `s` in time `t` (same units in, matching unit out).
 * @param {number} s @param {number} t
 */
export function speed(s, t) {
  if (!(t > 0)) return NaN;
  return s / t;
}

/** @param {number} v speed in m/s */
export function toKmh(v) {
  return v * KMH_PER_MS;
}

/** @param {number} v speed in km/h */
export function toMs(v) {
  return v / KMH_PER_MS;
}

/**
 * Whether a typed speed matches the true one within `rel` of it (default 1 %)
 * or within `abs`, whichever is larger, so a learner who rounds to two
 * decimals is accepted.
 * @param {number} typed @param {number} truth @param {number} [rel] @param {number} [abs]
 */
export function closeEnough(typed, truth, rel = 0.01, abs = 0.005) {
  if (!Number.isFinite(typed) || !Number.isFinite(truth)) return false;
  return Math.abs(typed - truth) <= Math.max(Math.abs(truth) * rel, abs);
}
