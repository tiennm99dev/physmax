/**
 * Mechanical energy the way the grade 9 book writes it: weight P = 10·m (N),
 * kinetic energy Wđ = ½·m·v² and gravitational potential energy Wt = P·h,
 * with the ground (or any chosen level) as the zero of height.
 */

/** Newtons of weight per kilogram, the book's P = 10·m. */
export const G = 10;

/**
 * Weight in N of a mass in kg.
 * @param {number} m
 */
export const weight = (m) => G * m;

/**
 * Kinetic energy in J of a mass `m` (kg) moving at `v` (m/s).
 * @param {number} m @param {number} v
 */
export const kinetic = (m, v) => 0.5 * m * v * v;

/**
 * Gravitational potential energy in J of a mass `m` (kg) at height `h` (m)
 * above the zero level.
 * @param {number} m @param {number} h
 */
export const potential = (m, h) => weight(m) * h;

/**
 * Speed in m/s of a mass with kinetic energy `wd` (J); 0 for no energy.
 * @param {number} m @param {number} wd
 */
export const speedFrom = (m, wd) => (wd > 0 && m > 0 ? Math.sqrt((2 * wd) / m) : 0);
