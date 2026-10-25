/**
 * Temperature scales and simple heat balance. KNTT uses °C and K
 * (T = t + 273), and °F in grade 6 (t°F = 1,8·t°C + 32).
 */
import { clean } from './vector.js';

/** @typedef {'C' | 'F' | 'K'} Scale */

/** Absolute zero in °C. */
export const ABSOLUTE_ZERO_C = -273.15;

/**
 * Converts a temperature between °C, °F and K. `exactKelvin: false` uses the
 * school offset 273 instead of 273,15.
 * @param {number} value
 * @param {Scale} from
 * @param {Scale} to
 * @param {{ exactKelvin?: boolean }} [options]
 */
export function convert(value, from, to, options = {}) {
  const offset = options.exactKelvin === false ? 273 : 273.15;
  const c = from === 'C' ? value : from === 'F' ? (value - 32) / 1.8 : value - offset;
  const out = to === 'C' ? c : to === 'F' ? c * 1.8 + 32 : c + offset;
  return clean(out);
}

/** @type {Record<Scale, string>} */
export const UNIT = { C: '°C', F: '°F', K: 'K' };

/**
 * Final temperature when bodies exchange heat only with each other until they
 * reach equilibrium: Σ m·c·(t − tᵢ) = 0, so t = Σ m·c·tᵢ / Σ m·c.
 * @param {Array<{ mass: number, specificHeat: number, temperature: number }>} bodies
 */
export function equilibriumTemperature(bodies) {
  const capacity = bodies.reduce((n, b) => n + b.mass * b.specificHeat, 0);
  if (!(capacity > 0)) return NaN;
  return clean(bodies.reduce((n, b) => n + b.mass * b.specificHeat * b.temperature, 0) / capacity);
}

/**
 * Heat to warm a body by Δt: Q = m·c·Δt (J for kg, J/(kg·K) and K).
 * @param {number} mass @param {number} specificHeat @param {number} deltaT
 */
export function heat(mass, specificHeat, deltaT) {
  return clean(mass * specificHeat * deltaT);
}

/**
 * Tick values for a thermometer scale from `min` to `max`: major ticks every
 * `major` degrees, minor ticks every `minor`.
 * @param {number} min @param {number} max @param {number} major @param {number} minor
 * @returns {Array<{ value: number, major: boolean }>}
 */
export function scaleTicks(min, max, major, minor) {
  const out = [];
  const first = Math.ceil(min / minor);
  for (let k = first; k * minor <= max + 1e-9; k++) {
    const value = clean(k * minor);
    out.push({ value, major: Math.abs(value / major - Math.round(value / major)) < 1e-9 });
  }
  return out;
}
