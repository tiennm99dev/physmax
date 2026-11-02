/**
 * Two carts on a straight air track, run from the start to just after their
 * collision, and the recoil of a body that throws a part of itself away.
 */
import { tidy } from '#lib/core/number-format.js';
import { collide } from '../_shared/collision.js';

/** Length of the track, in metres. */
export const TRACK = 2;

/** Length of a cart, in metres. */
export const CART = 0.24;

/** Where the centres of the two carts start, in metres. */
export const START = { x1: 0.4, x2: 1.6 };

const MIN = CART / 2;
const MAX = TRACK - CART / 2;

/**
 * @typedef {{
 *   kind: import('../_shared/collision.js').CollisionKind,
 *   m1: number, v1: number, m2: number, v2: number,
 * }} Setup
 */

/**
 * When the carts touch, or null when they never touch on the track.
 * @param {Setup} s
 * @returns {number | null} seconds from the start
 */
export function meetTime(s) {
  if (s.v1 <= s.v2) return null;
  const t = (START.x2 - START.x1 - CART) / (s.v1 - s.v2);
  const x1 = START.x1 + s.v1 * t;
  const x2 = START.x2 + s.v2 * t;
  return x1 < MIN || x2 > MAX ? null : t;
}

/**
 * Time when the run ends: a cart reaches the end of the track, or a moment after
 * the collision when neither is going anywhere near it.
 * @param {Setup} s
 * @returns {number} seconds
 */
export function endTime(s) {
  const meet = meetTime(s);
  if (meet === null) return 0;
  const a = stateAt(s, meet);
  const after = collide(s.kind, s.m1, s.v1, s.m2, s.v2);
  /** @param {number} x @param {number} v */
  const left = (x, v) => (v > 0 ? (MAX - x) / v : v < 0 ? (MIN - x) / v : Infinity);
  return meet + Math.min(left(a.x1, after.v1), left(a.x2, after.v2), 3);
}

/**
 * Where the carts are and how they move at time `t`.
 * @param {Setup} s @param {number} t seconds
 * @returns {{ x1: number, x2: number, v1: number, v2: number, collided: boolean }}
 */
export function stateAt(s, t) {
  const meet = meetTime(s);
  if (meet === null || t <= meet) {
    return {
      x1: START.x1 + s.v1 * t,
      x2: START.x2 + s.v2 * t,
      v1: s.v1,
      v2: s.v2,
      collided: false,
    };
  }
  const after = collide(s.kind, s.m1, s.v1, s.m2, s.v2);
  const x1 = START.x1 + s.v1 * meet;
  const x2 = START.x2 + s.v2 * meet;
  return {
    x1: x1 + after.v1 * (t - meet),
    x2: x2 + after.v2 * (t - meet),
    v1: after.v1,
    v2: after.v2,
    collided: true,
  };
}

/**
 * A body at rest throws a part of mass `m` with speed `v`. The rest, of mass `M`,
 * moves the other way.
 * @param {number} M kg, what is left @param {number} m kg, what is thrown @param {number} v m/s
 * @returns {number} signed speed of what is left, against the direction of `v`
 */
export function recoil(M, m, v) {
  return tidy((-m * v) / M);
}
