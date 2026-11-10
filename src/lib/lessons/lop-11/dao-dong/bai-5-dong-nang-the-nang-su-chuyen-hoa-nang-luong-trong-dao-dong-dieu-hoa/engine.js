/**
 * Energy of a spring pendulum: kinetic and potential energy trade places while
 * their sum stays fixed. Lengths come in cm and are turned into metres here.
 */
import { TAU } from '../_shared/oscillation.js';

/** Furthest the block can be pulled, in cm. */
export const PULL_MAX = 8;

/**
 * ω = √(k/m) and T = 2π√(m/k).
 * @param {number} k N/m @param {number} m kg
 */
export function springMotion(k, m) {
  const omega = Math.sqrt(k / m);
  return { omega, T: TAU / omega };
}

/**
 * Energies, in joules, of a block of amplitude A at position x (both in cm).
 * @param {number} k N/m @param {number} A cm @param {number} x cm
 */
export function energies(k, A, x) {
  const W = 0.5 * k * (A / 100) ** 2;
  const Wt = 0.5 * k * (x / 100) ** 2;
  return { W, Wt, Wd: Math.max(0, W - Wt) };
}

/**
 * Position, in units of A, where Wđ = n·Wt: |x| = A / √(n + 1).
 * @param {number} n
 */
export const ratioSpot = (n) => 1 / Math.sqrt(n + 1);

/**
 * The stop-at goals: where kinetic energy is n times the potential energy.
 * @type {Array<{ n: number, text: string }>}
 */
export const GOALS = [
  { n: 1, text: '$W_đ = W_t$' },
  { n: 3, text: '$W_đ = 3W_t$' },
  { n: 1 / 3, text: '$W_t = 3W_đ$' },
];

/** How close |x| / A must be to the goal spot. */
export const SPOT_TOLERANCE = 0.02;

/**
 * Whether the block at x (amplitude A) stands where the goal asks.
 * @param {{ n: number }} goal @param {number} x @param {number} A
 */
export function meets(goal, x, A) {
  if (A <= 0) return false;
  return Math.abs(Math.abs(x) / A - ratioSpot(goal.n)) <= SPOT_TOLERANCE;
}
