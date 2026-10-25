/**
 * Forces acting on one point-like body: resultant, components and balance.
 * Angles follow `vector.js`: degrees counter-clockwise from +x, y up.
 */
import { clean, fromPolar, sum, toPolar } from './vector.js';

/** @typedef {{ label: string, magnitude: number, angle: number, color?: string }} Force */

/**
 * Horizontal and vertical components of one force.
 * @param {Pick<Force, 'magnitude' | 'angle'>} force
 */
export function components(force) {
  return fromPolar(force.magnitude, force.angle);
}

/**
 * The resultant (hợp lực) of every force, as components and polar form.
 * @param {Array<Pick<Force, 'magnitude' | 'angle'>>} forces
 * @returns {{ x: number, y: number, magnitude: number, angle: number }}
 */
export function resultant(forces) {
  const v = sum(forces.map(components));
  return { ...v, ...toPolar(v) };
}

/**
 * The single force that would balance all the others: equal in size to the
 * resultant and opposite in direction.
 * @param {Array<Pick<Force, 'magnitude' | 'angle'>>} forces
 * @returns {{ magnitude: number, angle: number }}
 */
export function equilibrant(forces) {
  const r = resultant(forces);
  if (r.magnitude === 0) return { magnitude: 0, angle: 0 };
  return { magnitude: r.magnitude, angle: clean((r.angle + 180) % 360) };
}

/**
 * Whether the forces balance (cân bằng lực), within `tolerance` newtons.
 * @param {Array<Pick<Force, 'magnitude' | 'angle'>>} forces
 * @param {number} [tolerance]
 */
export function isBalanced(forces, tolerance = 1e-9) {
  return resultant(forces).magnitude <= tolerance;
}

/**
 * Size of the resultant of two forces at angle `alpha` to each other, by the
 * parallelogram rule: F² = F1² + F2² + 2·F1·F2·cos α.
 * @param {number} f1 @param {number} f2 @param {number} alpha degrees
 */
export function parallelogram(f1, f2, alpha) {
  const c = Math.cos((alpha * Math.PI) / 180);
  return clean(Math.sqrt(Math.max(0, f1 * f1 + f2 * f2 + 2 * f1 * f2 * c)));
}

/**
 * Reading a direction aloud: "sang phải", "lên trên", or the angle for oblique ones.
 * @param {number} angle
 */
export function describeDirection(angle) {
  const a = ((clean(angle) % 360) + 360) % 360;
  /** @type {Record<number, string>} */
  const named = { 0: 'sang phải', 90: 'lên trên', 180: 'sang trái', 270: 'xuống dưới' };
  const shown = Math.round(a * 10) / 10;
  return named[a] ?? `hợp với phương ngang góc ${String(shown).replace('.', ',')}°`;
}
