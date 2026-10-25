/**
 * Harmonic waves on a line. A wave travelling toward +x (direction 1) or −x
 * (direction −1) has displacement u(x, t) = A·cos(2π(t/T ∓ x/λ) + φ); its speed
 * is v = λ/T = λ·f. Lengths and times are in whatever units the caller picks.
 */
import { clean } from './vector.js';

/**
 * @typedef {{
 *   amplitude: number,
 *   wavelength: number,
 *   period: number,
 *   phase?: number,
 *   direction?: 1 | -1,
 * }} Wave
 */

/**
 * Displacement of the wave at position x and time t.
 * @param {Wave} w
 * @param {number} x @param {number} t
 */
export function displacement(w, x, t) {
  const dir = w.direction ?? 1;
  const arg = 2 * Math.PI * (t / w.period - (dir * x) / w.wavelength) + (w.phase ?? 0);
  return clean(w.amplitude * Math.cos(arg));
}

/**
 * Sum of several waves at one point: the superposition principle.
 * @param {Wave[]} waves
 * @param {number} x @param {number} t
 */
export function superpose(waves, x, t) {
  return clean(waves.reduce((n, w) => n + displacement(w, x, t), 0));
}

/**
 * Speed (v = λ/T), frequency (f = 1/T) and angular frequency (ω = 2π/T).
 * @param {Pick<Wave, 'wavelength' | 'period'>} w
 */
export function waveNumbers(w) {
  return {
    speed: clean(w.wavelength / w.period),
    frequency: clean(1 / w.period),
    angularFrequency: clean((2 * Math.PI) / w.period),
  };
}

/**
 * Phase difference between two points Δx apart on the same wave: Δφ = 2π·Δx/λ,
 * reduced to [0, 2π).
 * @param {number} dx @param {number} wavelength
 */
export function phaseDifference(dx, wavelength) {
  const two = 2 * Math.PI;
  return clean((((two * dx) / wavelength) % two) + two) % two;
}

/**
 * `count + 1` samples of u over [from, to], either along x at time `at`
 * (`along: 'x'`, a snapshot of the string) or along t at position `at`
 * (`along: 't'`, the motion of one point).
 * @param {Wave[]} waves
 * @param {{ along: 'x' | 't', from: number, to: number, at: number, count?: number }} range
 * @returns {Array<{ s: number, u: number }>}
 */
export function sampleWaves(waves, range) {
  const { along, from, to, at, count = 120 } = range;
  const out = [];
  for (let i = 0; i <= count; i++) {
    const s = clean(from + ((to - from) * i) / count);
    out.push({ s, u: along === 'x' ? superpose(waves, s, at) : superpose(waves, at, s) });
  }
  return out;
}

/**
 * Positions of the nodes (nút) of a standing wave on a string of length L fixed
 * at both ends, vibrating with k loops: λ = 2L/k, nodes every λ/2.
 * @param {number} length @param {number} loops
 */
export function standingWaveNodes(length, loops) {
  return Array.from({ length: loops + 1 }, (_, i) => clean((length * i) / loops));
}
