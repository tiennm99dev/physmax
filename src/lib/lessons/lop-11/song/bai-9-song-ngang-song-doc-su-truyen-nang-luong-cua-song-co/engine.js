/**
 * One row of particles carrying a harmonic wave toward +x, drawn two ways: as
 * a transverse wave (each particle moves across the row, like a string) or as
 * a longitudinal wave (each particle moves along the row, like the coils of a
 * spring). Lengths are in particle spacings, times in periods.
 */
import { tidy } from '#lib/core/number-format.js';

/** Number of particles in the row. */
export const COUNT = 25;
/** Wavelength, in particle spacings. */
export const WAVELENGTH = 8;
/** Amplitude, in particle spacings: below λ/2π, so coils never cross. */
export const AMPLITUDE = 0.9;

/** The two ways a particle can move, and the answer the learner picks. */
export const MODES = [
  { value: 'ngang', label: 'Sóng ngang (dây)', across: true },
  { value: 'doc', label: 'Sóng dọc (lò xo)', across: false },
];

/**
 * Displacement of particle i at time t (in periods): u = A cos(2π(t − i/λ)).
 * @param {number} i @param {number} t
 */
export const shiftOf = (i, t) => tidy(AMPLITUDE * Math.cos(2 * Math.PI * (t - i / WAVELENGTH)));

/**
 * Where each particle is drawn, in spacings: across the row for a transverse
 * wave, along it for a longitudinal one.
 * @param {string} mode 'ngang' or 'doc' @param {number} t
 * @returns {Array<{ i: number, x: number, y: number }>}
 */
export function particles(mode, t) {
  return Array.from({ length: COUNT }, (_, i) => {
    const u = shiftOf(i, t);
    return mode === 'ngang' ? { i, x: i, y: u } : { i, x: tidy(i + u), y: 0 };
  });
}

/**
 * Centres of the compressions (vùng nén) of the longitudinal wave at time t:
 * where the strain du/dx is most negative, so neighbours crowd together.
 * For u = A cos(2π(t − x/λ)), du/dx = (2πA/λ) sin(2π(t − x/λ)), least at
 * 2π(t − x/λ) = −π/2, that is x = λ(t + 1/4) + kλ.
 * @param {number} t
 */
export function compressions(t) {
  const out = [];
  const first = WAVELENGTH * (t + 0.25);
  const start = first - Math.floor(first / WAVELENGTH) * WAVELENGTH;
  for (let x = start; x <= COUNT - 1 + 1e-9; x += WAVELENGTH) out.push(tidy(x));
  return out;
}

/** Centres of the rarefactions (vùng dãn): half a wavelength from each compression. @param {number} t */
export function rarefactions(t) {
  return compressions(t + 0.5);
}

/**
 * Whether the learner's choice of oscillation direction is right for a mode.
 * @param {string} mode 'ngang' or 'doc' @param {string} choice 'vuong-goc', 'trung' or ''
 */
export const directionRight = (mode, choice) =>
  mode === 'ngang' ? choice === 'vuong-goc' : choice === 'trung';
