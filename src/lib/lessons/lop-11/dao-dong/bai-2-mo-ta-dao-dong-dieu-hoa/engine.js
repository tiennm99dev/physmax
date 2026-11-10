/**
 * A point going round a circle at constant angular speed, projected onto the
 * axis Ox, and the matching game: set A, ω and φ so the oscillation lies on a
 * target graph.
 */
import { phaseRelation, wrapPhase } from '../_shared/oscillation.js';

/** Angular frequencies on offer, in rad/s, with their periods. */
export const OMEGAS = [
  { value: 'pi-2', omega: Math.PI / 2, label: 'π/2 rad/s' },
  { value: 'pi', omega: Math.PI, label: 'π rad/s' },
  { value: '2pi', omega: 2 * Math.PI, label: '2π rad/s' },
];

/**
 * @typedef {{ A: number, omega: number, phi: number }} Oscillation
 */

/** Target oscillations for the matching game: A in cm, ω in rad/s, φ in rad. */
export const TARGETS = /** @type {Oscillation[]} */ ([
  { A: 6, omega: Math.PI, phi: -Math.PI / 2 },
  { A: 4, omega: 2 * Math.PI, phi: Math.PI / 3 },
  { A: 8, omega: Math.PI / 2, phi: Math.PI },
  { A: 5, omega: Math.PI, phi: (-2 * Math.PI) / 3 },
  { A: 3, omega: 2 * Math.PI, phi: Math.PI / 6 },
]);

/**
 * The initial phase for slider step k, in steps of π/6.
 * @param {number} k
 */
export const phiOfStep = (k) => (k * Math.PI) / 6;

/**
 * How the learner's oscillation compares with the target.
 * @param {Oscillation} mine @param {Oscillation} target
 */
export function compare(mine, target) {
  const sameA = Math.abs(mine.A - target.A) < 1e-9;
  const sameOmega = Math.abs(mine.omega - target.omega) < 1e-9;
  const dphi = wrapPhase(mine.phi - target.phi);
  const relation = phaseRelation(dphi);
  return {
    sameA,
    sameOmega,
    samePhase: relation.name === 'cùng pha',
    dphi,
    relation,
    matched: sameA && sameOmega && relation.name === 'cùng pha',
  };
}

/**
 * Position on screen of the turning point M and of its projection P on Ox.
 * @param {number} cx @param {number} cy centre in pixels
 * @param {number} r radius in pixels @param {number} phase ωt + φ
 */
export function projection(cx, cy, r, phase) {
  const mx = cx + r * Math.cos(phase);
  return { m: { x: mx, y: cy - r * Math.sin(phase) }, p: { x: mx, y: cy } };
}
