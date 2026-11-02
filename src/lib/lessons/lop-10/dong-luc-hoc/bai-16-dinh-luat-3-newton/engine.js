/**
 * Two skaters push off each other: the same force acts on each for the whole
 * push, in opposite directions, whoever does the pushing.
 */
import { tidy } from '#lib/core/number-format.js';
import { pushState } from '../_shared/push-motion.js';

/** How long the push lasts, in seconds. */
export const PUSH_TIME = 1;
/** How long a run lasts, in seconds. */
export const RUN_TIME = 3;

/**
 * Accelerations and glide speeds of both skaters.
 * @param {number} force @param {number} massA @param {number} massB
 */
export function outcome(force, massA, massB) {
  return {
    aA: tidy(force / massA),
    aB: tidy(force / massB),
    vA: pushState(force, massA, PUSH_TIME, RUN_TIME).v,
    vB: pushState(force, massB, PUSH_TIME, RUN_TIME).v,
  };
}

/**
 * Signed positions at time `t`: A goes left, B goes right.
 * @param {number} force @param {number} massA @param {number} massB @param {number} t
 * @returns {{ xA: number, xB: number, reading: number }} `reading` is what both
 *   force meters show: the force during the push, 0 before and after it.
 */
export function skatersAt(force, massA, massB, t) {
  const pushing = t > 0 && t < PUSH_TIME;
  return {
    xA: -pushState(force, massA, PUSH_TIME, t).x,
    xB: pushState(force, massB, PUSH_TIME, t).x,
    reading: pushing ? force : 0,
  };
}

/**
 * Where a run with no animation stands after a press of the button: first in
 * the middle of the push, so the force meters can be read, then at the end.
 * @param {number} t
 */
export function stillTime(t) {
  return t > 0 && t < PUSH_TIME ? RUN_TIME : PUSH_TIME / 2;
}

/**
 * Half the width of the rink, in metres, so a whole run stays in view.
 * @param {number} force @param {number} massA @param {number} massB
 */
export function rinkExtent(force, massA, massB) {
  const end = skatersAt(force, massA, massB, RUN_TIME);
  return Math.max(5, Math.abs(end.xA), Math.abs(end.xB));
}
