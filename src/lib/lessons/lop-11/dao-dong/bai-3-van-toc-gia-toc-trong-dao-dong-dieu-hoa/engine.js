/**
 * Velocity and acceleration of a harmonic oscillator read off three graphs
 * drawn on one time axis: the extreme values, the state at a time (speeding
 * up or slowing down) and the find-the-moment goals.
 */
import { tidy } from '#lib/core/number-format.js';
import { wrapPhase } from '../_shared/oscillation.js';

/**
 * Largest speed and acceleration: v_max = ωA, a_max = ω²A.
 * @param {number} A @param {number} omega
 */
export function extremes(A, omega) {
  return { vMax: omega * A, aMax: omega * omega * A };
}

/**
 * A round axis half-height above `max` and its step, at most three steps.
 * @param {number} max
 * @returns {{ yMax: number, yStep: number }}
 */
export function axisFor(max) {
  const target = max * 1.1;
  const size = 10 ** Math.floor(Math.log10(target / 3));
  const yStep = [1, 2, 5, 10].map((k) => k * size).find((s) => target / s <= 3) ?? 10 * size;
  return { yMax: tidy(Math.ceil(target / yStep) * yStep), yStep: tidy(yStep) };
}

/**
 * The goals of the find-the-moment game: the phase ωt + φ that meets each.
 * @type {Array<{ text: string, phase: number }>}
 */
export const GOALS = [
  {
    text: 'vận tốc đạt cực đại $v = \\omega A$ (vật qua vị trí cân bằng theo chiều dương)',
    phase: -Math.PI / 2,
  },
  { text: 'gia tốc đạt cực đại $a = \\omega^2 A$', phase: Math.PI },
  { text: 'vật qua vị trí cân bằng theo chiều âm', phase: Math.PI / 2 },
  { text: 'vận tốc bằng $0$ và gia tốc âm', phase: 0 },
  { text: 'vật ở li độ $x = \\dfrac{A}{2}$ và đi theo chiều dương', phase: -Math.PI / 3 },
];

/** How close, in radians of phase, a moment must be to count. */
export const PHASE_TOLERANCE = 0.1;

/**
 * Whether the phase at the chosen moment meets the goal.
 * @param {{ phase: number }} goal @param {number} phase
 */
export function reached(goal, phase) {
  return Math.abs(wrapPhase(phase - goal.phase)) <= PHASE_TOLERANCE;
}

/**
 * What the body is doing: at an end, at the equilibrium, or moving towards or
 * away from it (speeding up when v and a point the same way).
 * @param {number} x @param {number} v @param {number} A
 * @returns {'bien' | 'can-bang' | 'nhanh-dan' | 'cham-dan'}
 */
export function motionKind(x, v, A) {
  if (Math.abs(x) >= A * 0.995) return 'bien';
  if (Math.abs(x) <= A * 0.02) return 'can-bang';
  return x * v < 0 ? 'nhanh-dan' : 'cham-dan';
}
