/**
 * A block pulled along a floor. At rest, static friction matches the pull up to
 * a greatest value; past it the block slides with the smaller sliding friction
 * μN, whatever the pull, and it stops again if the pull falls short for long
 * enough.
 */
import { tidy } from '#lib/core/number-format.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** Fastest the picture lets the block run, in m/s. */
export const TOP_SPEED = 3;

/**
 * Pairs of surfaces with illustrative coefficients: `mu` for sliding, and
 * `muRest` setting the greatest static friction.
 */
export const SURFACES = [
  { value: 'go', label: 'Gỗ trên gỗ', mu: 0.3, muRest: 0.4 },
  { value: 'cao-su', label: 'Cao su trên bê tông', mu: 0.7, muRest: 0.9 },
  { value: 'bang', label: 'Thép trên băng', mu: 0.05, muRest: 0.1 },
];

/** @typedef {{ normal: number, maxRest: number, sliding: number, mu: number }} Limits */
/** @typedef {{ moving: boolean, v: number, x: number }} Block */

/** A block at rest at the start of the floor. @type {Block} */
export const AT_REST = { moving: false, v: 0, x: 0 };

/**
 * The pressing force and both friction limits on a level floor, where N = mg.
 * @param {string} surface @param {number} mass kg
 * @returns {Limits}
 */
export function limitsOf(surface, mass) {
  const pair = SURFACES.find((s) => s.value === surface) ?? SURFACES[0];
  const normal = mass * G;
  return {
    normal: tidy(normal),
    maxRest: tidy(pair.muRest * normal),
    sliding: tidy(pair.mu * normal),
    mu: pair.mu,
  };
}

/**
 * Sets a resting block sliding once the pull passes the greatest static friction.
 * @param {Block} block @param {number} pull @param {Limits} limits
 * @returns {Block}
 */
export function settle(block, pull, limits) {
  return !block.moving && pull > limits.maxRest ? { ...block, moving: true } : block;
}

/**
 * The pull the block feels, with a sliding block counted as balanced when the
 * slider stops within half a notch of the sliding friction, which it may not be
 * able to hit exactly.
 * @param {Block} block @param {number} pull @param {Limits} limits @param {number} notch slider step
 */
export function effectivePull(block, pull, limits, notch) {
  return block.moving && Math.abs(pull - limits.sliding) <= notch / 2 ? limits.sliding : pull;
}

/**
 * Size of the friction force now.
 * @param {Block} block @param {number} pull @param {Limits} limits
 */
export function frictionOf(block, pull, limits) {
  return block.moving ? limits.sliding : Math.min(pull, limits.maxRest);
}

/**
 * New points for the graph of friction against pull. The moment a block breaks
 * free the line climbs to the greatest static friction and drops to the sliding
 * value, even if the slider jumped straight past it.
 * @param {boolean} wasMoving @param {Block} block @param {number} pull @param {Limits} limits
 * @returns {Array<{ x: number, y: number }>}
 */
export function tracePoints(wasMoving, block, pull, limits) {
  const end = { x: pull, y: frictionOf(block, pull, limits) };
  if (wasMoving || !block.moving) return [end];
  return [{ x: limits.maxRest, y: limits.maxRest }, { x: limits.maxRest, y: limits.sliding }, end];
}

/**
 * Acceleration of the block: zero at rest, (F - F_mst) / m while it slides.
 * @param {Block} block @param {number} pull @param {number} mass @param {Limits} limits
 */
export function accelerationOf(block, pull, mass, limits) {
  return block.moving ? tidy((pull - limits.sliding) / mass) : 0;
}

/**
 * Advances a sliding block by `dt` seconds. A block slowing down stops when its
 * velocity reaches zero, and rests from then on.
 * @param {Block} block @param {number} pull @param {number} mass @param {Limits} limits
 * @param {number} dt seconds
 * @returns {Block}
 */
export function stepBlock(block, pull, mass, limits, dt) {
  if (!block.moving) return block;
  const a = (pull - limits.sliding) / mass;
  const v = Math.min(TOP_SPEED, block.v + a * dt);
  if (v <= 0 && a <= 0) return { moving: false, v: 0, x: block.x };
  return { moving: true, v, x: block.x + v * dt };
}
