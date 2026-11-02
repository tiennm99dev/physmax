/**
 * Head-on collisions of two carts on an air track, with signed velocities along
 * one axis, which is all the chapter's lessons need.
 */
import { tidy } from '#lib/core/number-format.js';
import { kinetic } from '#lib/domain/energy.js';

/** @typedef {'dan-hoi' | 'mem'} CollisionKind */

/**
 * @param {number} m kg @param {number} v signed m/s
 */
export const momentum = (m, v) => tidy(m * v);

/**
 * Velocities just after a head-on collision. An elastic one keeps both momentum
 * and kinetic energy; in a soft one the carts stick together.
 * @param {CollisionKind} kind
 * @param {number} m1 @param {number} v1 @param {number} m2 @param {number} v2
 * @returns {{ v1: number, v2: number }}
 */
export function collide(kind, m1, v1, m2, v2) {
  const total = m1 + m2;
  if (kind === 'mem') {
    const v = tidy((m1 * v1 + m2 * v2) / total);
    return { v1: v, v2: v };
  }
  return {
    v1: tidy(((m1 - m2) * v1 + 2 * m2 * v2) / total),
    v2: tidy(((m2 - m1) * v2 + 2 * m1 * v1) / total),
  };
}

/**
 * Total kinetic energy of the two carts, in joules.
 * @param {number} m1 @param {number} v1 @param {number} m2 @param {number} v2
 */
export const kineticSum = (m1, v1, m2, v2) => tidy(kinetic(m1, v1) + kinetic(m2, v2));
