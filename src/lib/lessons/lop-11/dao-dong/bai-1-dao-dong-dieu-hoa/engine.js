/**
 * Three kinds of back-and-forth motion of a spring block, to tell a mechanical
 * oscillation, a periodic one and a harmonic one apart.
 */
import { TAU } from '../_shared/oscillation.js';

/**
 * @typedef {'dieu-hoa' | 'tuan-hoan' | 'tat-dan'} Mode
 */

/** @type {Array<{ value: Mode, label: string }>} */
export const MODES = [
  { value: 'dieu-hoa', label: 'Điều hoà' },
  { value: 'tuan-hoan', label: 'Tuần hoàn' },
  { value: 'tat-dan', label: 'Tắt dần' },
];

/**
 * A triangle wave of period 1 that starts at +1 and reaches −1 at half a
 * period: a block running at constant speed between two walls.
 * @param {number} u time in periods
 */
export function triangle(u) {
  const f = u - Math.floor(u);
  return f < 0.5 ? 1 - 4 * f : -3 + 4 * f;
}

/**
 * Position of the block, released from x = A at t = 0.
 * @param {Mode} mode @param {number} A @param {number} T @param {number} t
 */
export function positionAt(mode, A, T, t) {
  if (mode === 'tuan-hoan') return A * triangle(t / T);
  const x = A * Math.cos((TAU * t) / T);
  return mode === 'tat-dan' ? x * Math.exp(-t / (1.5 * T)) : x;
}

/**
 * Whether the motion repeats itself after equal times.
 * @param {Mode} mode
 */
export const isPeriodic = (mode) => mode !== 'tat-dan';

/**
 * Whether the position is a cosine of time.
 * @param {Mode} mode
 */
export const isHarmonic = (mode) => mode === 'dieu-hoa';

/**
 * Full oscillations finished after t seconds.
 * @param {number} t @param {number} T
 */
export const fullOscillations = (t, T) => Math.floor(t / T + 1e-9);

/**
 * Path length covered after t seconds of a periodic motion released from the
 * end x = A: 4A for each full oscillation, plus A − x on the way out and
 * 2A + (x + A) on the way back.
 * @param {Mode} mode @param {number} A @param {number} T @param {number} t
 */
export function pathLength(mode, A, T, t) {
  const n = fullOscillations(t, T);
  const back = t - n * T >= T / 2;
  const x = positionAt(mode, A, T, t);
  return 4 * A * n + (back ? 3 * A + x : A - x);
}
