/**
 * A body at rest pushed by a constant force for a while, then gliding with no
 * friction: it speeds up uniformly during the push and keeps its velocity after.
 */
import { tidy } from '#lib/core/number-format.js';

/**
 * Velocity and displacement at time `t`.
 * @param {number} force newtons
 * @param {number} mass kilograms
 * @param {number} pushTime seconds the force lasts
 * @param {number} t seconds since the push began
 * @returns {{ v: number, x: number }}
 */
export function pushState(force, mass, pushTime, t) {
  const a = force / mass;
  if (t <= pushTime) return { v: tidy(a * t), x: tidy((a * t * t) / 2) };
  const v = a * pushTime;
  return { v: tidy(v), x: tidy((a * pushTime * pushTime) / 2 + v * (t - pushTime)) };
}
