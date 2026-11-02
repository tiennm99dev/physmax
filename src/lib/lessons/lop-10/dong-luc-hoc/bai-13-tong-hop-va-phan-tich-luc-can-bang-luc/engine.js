/**
 * Concurrent forces on one point: tips dragged on a board become forces,
 * resultants follow the parallelogram rule, and a force splits into two
 * perpendicular parts. Angles are degrees counter-clockwise from +x, y up.
 */
import { tidy } from '#lib/core/number-format.js';
import { clamp } from '#lib/core/visuals/svg-math.js';
import { resultant } from '#lib/domain/force-diagram.js';
import { toPolar } from '#lib/domain/vector.js';

/** @typedef {{ magnitude: number, angle: number }} PlaneForce */

/** Largest gap, in newtons, the snapped grid of whole newtons and degrees can leave. */
export const BALANCE_TOLERANCE = 1;

/**
 * Whole newtons and whole degrees, angle in [0, 360).
 * @param {number} magnitude @param {number} angle @param {number} max
 * @returns {PlaneForce}
 */
export function snapForce(magnitude, angle, max) {
  return {
    magnitude: clamp(Math.round(magnitude), 0, max),
    angle: ((Math.round(angle) % 360) + 360) % 360,
  };
}

/**
 * The force whose tip sits at (`x`, `y`) newtons from the point of application.
 * @param {number} x @param {number} y @param {number} max
 * @returns {PlaneForce}
 */
export function forceFromTip(x, y, max) {
  const polar = toPolar({ x, y });
  return snapForce(polar.magnitude, polar.angle, max);
}

/**
 * The angle between two directions, from 0 to 180 degrees.
 * @param {number} a @param {number} b
 */
export function angleBetween(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

/**
 * Whether forces balance as closely as the board can show.
 * @param {PlaneForce[]} forces
 */
export function isBalancedOnBoard(forces) {
  return resultant(forces).magnitude <= BALANCE_TOLERANCE;
}

/**
 * Signed parts of a force along a chosen axis and the axis 90 degrees from it.
 * @param {PlaneForce} force @param {number} axis degrees
 * @returns {{ along: number, across: number }}
 */
export function resolve(force, axis) {
  const turn = ((force.angle - axis) * Math.PI) / 180;
  return {
    along: tidy(force.magnitude * Math.cos(turn)),
    across: tidy(force.magnitude * Math.sin(turn)),
  };
}

/**
 * Weight split on a slope: P1 = P sin α pulls down along it, P2 = P cos α
 * presses into it.
 * @param {number} weight @param {number} alpha degrees
 * @returns {{ along: number, normal: number }}
 */
export function inclineParts(weight, alpha) {
  const rad = (alpha * Math.PI) / 180;
  return { along: tidy(weight * Math.sin(rad)), normal: tidy(weight * Math.cos(rad)) };
}
