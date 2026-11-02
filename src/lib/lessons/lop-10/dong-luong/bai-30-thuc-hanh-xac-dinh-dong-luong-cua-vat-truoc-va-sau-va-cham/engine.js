/**
 * Virtual air track with two photogates: cart A is pushed through gate 1 and
 * hits cart B, which rests between the gates. The timer gives each crossing of a
 * shutter plate to the millisecond, with the small errors of a real bench.
 */
import { tidy } from '#lib/core/number-format.js';
import { scatter } from '#lib/domain/scatter.js';
import { collide } from '../_shared/collision.js';

/** Length of the shutter plate, in metres. */
export const SHUTTER = 0.1;

/** Length of the track and places along it, in metres. */
export const TRACK = 2;
export const CART = 0.2;
export const GATE_1 = 0.55;
export const GATE_2 = 1.3;
export const B_START = 1;
export const A_START = 0.15;

/** Speed kept after the collision: the rest goes to the air and the track. */
const KEPT = 0.98;

/** Largest relative error of a reading. */
const NOISE = 0.01;

/** Below this speed a cart counts as stopped and crosses no gate, m/s. */
const STOPPED = 0.01;

/**
 * Timer reading for a plate crossing a gate at speed `v`, in seconds to 1 ms.
 * @param {number} v m/s @param {number} draw reading number
 */
export const reading = (v, draw) =>
  tidy(Math.round((SHUTTER / Math.abs(v)) * (1 + NOISE * scatter(draw)) * 1000) / 1000, 3);

/**
 * @typedef {{
 *   kind: import('../_shared/collision.js').CollisionKind,
 *   mA: number, mB: number, v: number,
 * }} Setup
 */

/**
 * @typedef {{
 *   before: number,
 *   afterA: number | null,
 *   afterB: number,
 *   directionA: 1 | -1 | 0,
 * }} Readings timer readings in s; `afterA` is null when cart A has none of its own
 */

/**
 * The true velocities just after the collision, a little below the ideal ones.
 * @param {Setup} s
 * @returns {{ vA: number, vB: number }}
 */
export function velocitiesAfter(s) {
  const ideal = collide(s.kind, s.mA, s.v, s.mB, 0);
  return { vA: tidy(ideal.v1 * KEPT), vB: tidy(ideal.v2 * KEPT) };
}

/**
 * What the timer shows for one run. After a soft collision the carts cross gate 2
 * as one, so only one reading follows.
 * @param {Setup} s @param {number} run counts the runs, so each one reads differently
 * @returns {Readings}
 */
export function runLab(s, run) {
  const { vA, vB } = velocitiesAfter(s);
  const draw = run * 3;
  const before = reading(s.v, draw + 1);
  const afterB = reading(vB, draw + 2);
  if (s.kind === 'mem' || Math.abs(vA) < STOPPED) {
    return { before, afterA: null, afterB, directionA: s.kind === 'mem' ? 1 : 0 };
  }
  return {
    before,
    afterA: reading(vA, draw + 3),
    afterB,
    directionA: vA > 0 ? 1 : -1,
  };
}

/**
 * Velocity worked out from one reading.
 * @param {number} t seconds
 */
export const speedFrom = (t) => SHUTTER / t;

/**
 * Total momentum before and after worked out from the readings, as a student would.
 * @param {Setup} s @param {Readings} r
 * @returns {{ before: number, after: number, gap: number }} gap in percent
 */
export function worked(s, r) {
  const before = s.mA * speedFrom(r.before);
  const b = speedFrom(r.afterB);
  const after =
    s.kind === 'mem'
      ? (s.mA + s.mB) * b
      : s.mB * b + (r.afterA === null ? 0 : s.mA * r.directionA * speedFrom(r.afterA));
  return { before, after, gap: (Math.abs(before - after) / before) * 100 };
}

/**
 * Where the carts are during the run. Cart B stops at the end of the track; both
 * keep their true speeds. Cart A starts at the left end, with B at rest ahead.
 * @param {Setup} s @param {number} t seconds from the push
 * @returns {{ xA: number, xB: number, collided: boolean }}
 */
export function positions(s, t) {
  const hit = (B_START - CART - A_START) / s.v;
  if (t <= hit) return { xA: A_START + s.v * t, xB: B_START, collided: false };
  const { vA, vB } = velocitiesAfter(s);
  const after = t - hit;
  return {
    xA: B_START - CART + vA * after,
    xB: Math.min(TRACK - CART / 2, B_START + vB * after),
    collided: true,
  };
}

/**
 * Time at which every reading has been taken: A through gate 1, then each cart
 * after the collision through the gate ahead of it.
 * @param {Setup} s
 * @returns {number} seconds
 */
export function runTime(s) {
  const hit = (B_START - CART - A_START) / s.v;
  const { vA, vB } = velocitiesAfter(s);
  const reachB = (GATE_2 - B_START + SHUTTER) / vB;
  const aStart = B_START - CART;
  const reachA =
    Math.abs(vA) < STOPPED
      ? 0
      : vA > 0
        ? (GATE_2 - aStart + SHUTTER) / vA
        : (aStart - GATE_1 + SHUTTER) / -vA;
  return hit + Math.max(reachB, reachA);
}
