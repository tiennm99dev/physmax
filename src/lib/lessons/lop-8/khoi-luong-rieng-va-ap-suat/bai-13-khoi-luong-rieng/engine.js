/**
 * Rectangular blocks of one material: the edges change, so the volume and the
 * mass change, but the mass of each cubic centimetre, D = m/V, does not.
 * Lengths are in cm, volumes in cm³, masses in g, densities in kg/m³.
 */
import { material, tidy, toGPerCm3 } from '../_shared/materials.js';

/** Materials offered for the blocks, lightest first. */
export const BLOCK_MATERIALS = ['go', 'nhom', 'sat', 'dong'].map(material);

/** Shortest and longest edge, in cm. */
export const EDGE = { min: 1, max: 10 };

/**
 * @param {number} a @param {number} b @param {number} c edges in cm
 * @returns {number} volume in cm³
 */
export const blockVolume = (a, b, c) => a * b * c;

/**
 * Mass in grams of `volume` cm³ of a material whose density is `density` kg/m³.
 * @param {number} density
 * @param {number} volume
 */
export const blockMass = (density, volume) => tidy(toGPerCm3(density) * volume);

/**
 * D = m/V from a mass in g and a volume in cm³, in both units.
 * @param {number} mass
 * @param {number} volume
 * @returns {{ gPerCm3: number, kgPerM3: number }}
 */
export function densityOf(mass, volume) {
  if (volume <= 0) throw new Error('Volume must be positive');
  const gPerCm3 = tidy(mass / volume);
  return { gPerCm3, kgPerM3: tidy(gPerCm3 * 1000) };
}

/**
 * The block material whose density (kg/m³) is closest to `kgPerM3`.
 * @param {number} kgPerM3
 */
export function closestMaterial(kgPerM3) {
  return BLOCK_MATERIALS.reduce((best, m) =>
    Math.abs(m.density - kgPerM3) < Math.abs(best.density - kgPerM3) ? m : best,
  );
}

/**
 * A measurement row for the record table.
 * @typedef {{ a: number, b: number, c: number, volume: number, mass: number, ratio: number }} Reading
 */

/**
 * Measures a block: its volume, mass and the ratio m/V in g/cm³.
 * @param {number} density kg/m³
 * @param {number} a @param {number} b @param {number} c
 * @returns {Reading}
 */
export function measure(density, a, b, c) {
  const volume = blockVolume(a, b, c);
  const mass = blockMass(density, volume);
  return { a, b, c, volume, mass, ratio: densityOf(mass, volume).gPerCm3 };
}
