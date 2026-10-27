/**
 * A block hung from a spring balance (lực kế) and lowered into an overflow
 * vessel full of liquid. The liquid pushes it up with F_A = d · V_chìm
 * (d = 10D), equal to the weight of the liquid that overflows. The balance
 * reads P − F_A until the string goes slack: then the block floats.
 * Lengths in cm, volumes in cm³, forces in N, densities in kg/m³.
 */
import { material, specificWeight, tidy } from '#lib/domain/materials.js';

/** The block: 5 cm × 5 cm base, 4 cm tall, so V = 100 cm³. */
export const BLOCK = { base: 25, height: 4 };
export const BLOCK_VOLUME = BLOCK.base * BLOCK.height;

/** How far the block's bottom may go below the surface while hung, in cm. */
export const LOWER = { min: -3, max: 10 };

/** Range of the spring balance, in N. */
export const BALANCE_MAX = 8;

export const BLOCK_MATERIALS = ['sat', 'nhom', 'nuoc-da', 'go'].map(material);
export const BATH_LIQUIDS = ['nuoc', 'dau-hoa', 'nuoc-muoi', 'thuy-ngan'].map(material);

/** cm³ → m³. */
const M3 = 1e-6;

/**
 * Weight of the block, P = d_vật · V.
 * @param {number} density kg/m³
 */
export const weightOf = (density) => tidy(specificWeight(density) * BLOCK_VOLUME * M3);

/**
 * Buoyant force F_A = d · V for a submerged volume `volume` cm³.
 * @param {number} liquidDensity kg/m³
 * @param {number} volume cm³
 */
export const buoyancy = (liquidDensity, volume) =>
  tidy(specificWeight(liquidDensity) * volume * M3);

/**
 * Depth of the block's bottom below the surface when it floats freely, or
 * null when the liquid cannot hold it up (it sinks).
 * @param {number} blockDensity
 * @param {number} liquidDensity
 */
export function floatDepth(blockDensity, liquidDensity) {
  if (blockDensity > liquidDensity) return null;
  return tidy((BLOCK.height * blockDensity) / liquidDensity);
}

/**
 * The deepest the hung block can go: a string only pulls, so a block that
 * floats stops at its floating depth.
 * @param {number} blockDensity
 * @param {number} liquidDensity
 */
export function maxLower(blockDensity, liquidDensity) {
  const f = floatDepth(blockDensity, liquidDensity);
  return f === null || f >= BLOCK.height ? LOWER.max : f;
}

/**
 * Everything the bench shows for a hung block whose bottom is `lower` cm
 * below the surface (negative: still in the air).
 * @param {number} blockDensity
 * @param {number} liquidDensity
 * @param {number} lower
 */
export function hung(blockDensity, liquidDensity, lower) {
  const depth = Math.min(lower, maxLower(blockDensity, liquidDensity));
  const sunk = Math.max(0, Math.min(depth, BLOCK.height));
  const volume = tidy(BLOCK.base * sunk);
  const P = weightOf(blockDensity);
  const FA = buoyancy(liquidDensity, volume);
  const reading = tidy(Math.max(0, P - FA));
  return { depth, sunk, volume, P, FA, reading, slack: reading === 0 && sunk > 0 };
}

/**
 * @typedef {'chim' | 'lo-lung' | 'noi'} Fate
 */

/**
 * What a released block does: compare P with F_A when fully under liquid,
 * which is the same as comparing the densities.
 * @param {number} blockDensity
 * @param {number} liquidDensity
 * @returns {{ fate: Fate, P: number, FAFull: number, depth: number | null }}
 */
export function release(blockDensity, liquidDensity) {
  const P = weightOf(blockDensity);
  const FAFull = buoyancy(liquidDensity, BLOCK_VOLUME);
  /** @type {Fate} */
  const fate = P > FAFull ? 'chim' : P === FAFull ? 'lo-lung' : 'noi';
  return {
    fate,
    P,
    FAFull,
    depth: fate === 'noi' ? floatDepth(blockDensity, liquidDensity) : null,
  };
}
