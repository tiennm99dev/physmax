/**
 * Read-the-graph drill: a seeded harmonic oscillation drawn as an x–t graph;
 * the learner reads A, T and φ, then gets the equation and the extreme
 * speed and acceleration.
 */
import { int, pick } from '#lib/core/drill.js';
import { TAU, piText } from '../_shared/oscillation.js';

/** Initial phases the drill draws, in rad. */
export const PHASES = [
  0,
  Math.PI / 3,
  Math.PI / 2,
  (2 * Math.PI) / 3,
  Math.PI,
  (-2 * Math.PI) / 3,
  -Math.PI / 2,
  -Math.PI / 3,
];

/** Choices for φ, labelled the book's way. */
export const PHASE_OPTIONS = PHASES.map((phi, i) => ({ value: i, label: piText(phi) }));

const AMPLITUDES = [2, 3, 4, 5, 6, 8];
const PERIODS = [0.4, 0.8, 1, 2];

/**
 * @typedef {{ A: number, T: number, phase: number }} GraphProblem
 *   `phase` indexes PHASES.
 */

/**
 * @param {() => number} rand
 * @returns {GraphProblem}
 */
export function makeProblem(rand) {
  return {
    A: pick(rand, AMPLITUDES),
    T: pick(rand, PERIODS),
    phase: int(rand, 0, PHASES.length - 1),
  };
}

/**
 * @param {GraphProblem} p
 * @param {{ A: number | null, T: number | null, phase: number | null }} given
 */
export function check(p, given) {
  return {
    A: given.A !== null && Math.abs(given.A - p.A) < 1e-9,
    T: given.T !== null && Math.abs(given.T - p.T) < 1e-9,
    phase: given.phase === p.phase,
  };
}

/**
 * Where the body starts and which way it goes, as a hint for φ.
 * @param {GraphProblem} p
 */
export function startHint(p) {
  const phi = PHASES[p.phase];
  const x0 = p.A * Math.cos(phi);
  const way =
    Math.abs(Math.sin(phi)) < 1e-9
      ? 'đang ở vị trí biên'
      : Math.sin(phi) < 0
        ? 'đi lên (chiều dương)'
        : 'đi xuống (chiều âm)';
  return { x0, way };
}

/**
 * Angular frequency, top speed and top acceleration of the drawn motion.
 * @param {GraphProblem} p
 */
export function extremesOf(p) {
  const omega = TAU / p.T;
  return { omega, vMax: omega * p.A, aMax: omega * omega * p.A };
}
