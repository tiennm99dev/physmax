/**
 * A virtual rope shaken at one end: the wave starts at the source x = 0 at
 * t = 0 and its front moves at speed v, so a point at x only starts moving at
 * t = x / v. A two-marker ruler measures distances along the rope and says how
 * the two marked points oscillate relative to each other.
 */
import { tidy } from '#lib/core/number-format.js';

/** Ropes on offer, with the wave speed on each in m/s. */
export const ROPES = [
  { value: 'nhe', label: 'Dây nhẹ', speed: 1.6 },
  { value: 'nang', label: 'Dây nặng', speed: 0.8 },
];

/** Length of the drawn rope, in metres. */
export const ROPE_LENGTH = 2;

/**
 * @typedef {{ amplitude: number, frequency: number, speed: number }} Shake
 */

/** λ = v / f, in metres. @param {Shake} s */
export const wavelengthOf = (s) => tidy(s.speed / s.frequency);

/**
 * Displacement of the rope at x (m) and time t (s). The source moves as
 * u = A sin(2πft) from t = 0, so a point at x repeats it x / v later and is
 * still at rest before the front reaches it.
 * @param {Shake} s @param {number} x @param {number} t
 */
export function ropeAt(s, x, t) {
  const late = t - x / s.speed;
  if (late < 0) return 0;
  return tidy(s.amplitude * Math.sin(2 * Math.PI * s.frequency * late));
}

/**
 * How far the front has travelled at time t, capped at the rope's end.
 * @param {Shake} s @param {number} t
 */
export const frontAt = (s, t) => Math.min(ROPE_LENGTH, tidy(s.speed * t));

/**
 * What a measured distance d means for two points of the wave: a whole number
 * k of wavelengths (cùng pha), an odd number of half wavelengths (ngược pha)
 * or neither. `tolerance` is the reading slack in metres.
 * @param {number} d distance between the markers, m
 * @param {number} wavelength m
 * @param {number} [tolerance]
 * @returns {{ kind: 'same' | 'opposite' | 'other' | 'none', k: number, ratio: number }}
 */
export function judgeRuler(d, wavelength, tolerance = 0.02) {
  const ratio = tidy(d / wavelength, 6);
  if (d < tolerance) return { kind: 'none', k: 0, ratio };
  const whole = Math.round(ratio);
  if (whole >= 1 && Math.abs(d - whole * wavelength) <= tolerance) {
    return { kind: 'same', k: whole, ratio };
  }
  const half = Math.round(ratio - 0.5);
  if (half >= 0 && Math.abs(d - (half + 0.5) * wavelength) <= tolerance) {
    return { kind: 'opposite', k: half, ratio };
  }
  return { kind: 'other', k: 0, ratio };
}

/**
 * Whether the front has passed both markers, so their reading means
 * something.
 * @param {Shake} s @param {number} t @param {number} a @param {number} b
 */
export const reached = (s, t, a, b) => frontAt(s, t) >= Math.max(a, b) - 1e-9;
