/**
 * A wire on the Ohm's-law bench: its resistance R = ρl/S from the material,
 * length and cross-section, the current I = U/R it carries, and the I–U
 * graph the learner builds from recorded readings.
 */
import { tidy } from '#lib/core/number-format.js';

/**
 * Alloys from the book's resistivity table (at 20 °C), in Ω·m.
 * @type {{ id: string, name: string, rho: number }[]}
 */
export const MATERIALS = [
  { id: 'nikelin', name: 'nikelin', rho: 0.4e-6 },
  { id: 'constantan', name: 'constantan', rho: 0.5e-6 },
  { id: 'nicrom', name: 'nicrom', rho: 1.1e-6 },
];

/** Wire lengths on the bench, m. */
export const LENGTHS = [1, 2, 3];
/** Cross-sections on the bench, mm². */
export const AREAS = [0.1, 0.2];
/** Axis limits of the I–U graph: U in V, I in A. */
export const U_MAX = 6;
export const I_MAX = 3;

/** @param {string} id */
export function materialById(id) {
  return MATERIALS.find((m) => m.id === id) ?? MATERIALS[0];
}

/**
 * Resistance in Ω of a wire of resistivity `rho` (Ω·m), length `length` (m)
 * and cross-section `areaMm2` (mm²): R = ρl/S with S in m².
 * @param {number} rho @param {number} length @param {number} areaMm2
 */
export function wireResistance(rho, length, areaMm2) {
  return tidy((rho * length) / (areaMm2 * 1e-6), 6);
}

/**
 * Current in A through a resistance `r` (Ω) under a voltage `u` (V): I = U/R.
 * @param {number} u @param {number} r
 */
export function ohmCurrent(u, r) {
  return r > 0 ? tidy(u / r, 6) : Infinity;
}

/**
 * Where the line I = U/R leaves the graph box [0, U_MAX] × [0, I_MAX].
 * @param {number} r
 * @returns {{ u: number, i: number }}
 */
export function lineEnd(r) {
  const i = U_MAX / r;
  return i <= I_MAX ? { u: U_MAX, i: tidy(i, 6) } : { u: tidy(I_MAX * r, 6), i: I_MAX };
}

/**
 * The ratio U/I of every non-zero reading, and whether they all agree (the
 * points lie on one line through the origin).
 * @param {{ u: number, i: number }[]} points
 */
export function ratios(points) {
  const list = points.filter((p) => p.i > 0).map((p) => tidy(p.u / p.i, 6));
  const same = list.length > 0 && list.every((r) => Math.abs(r - list[0]) < 1e-6);
  return { list, same, value: same ? list[0] : null };
}

/**
 * Adds a reading to a list, skipping a voltage already recorded, sorted by U.
 * @param {{ u: number, i: number }[]} points @param {{ u: number, i: number }} p
 */
export function addPoint(points, p) {
  if (points.some((q) => q.u === p.u)) return points;
  return [...points, p].sort((a, b) => a.u - b.u);
}
