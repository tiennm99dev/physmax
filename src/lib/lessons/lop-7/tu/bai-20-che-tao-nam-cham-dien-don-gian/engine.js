/**
 * A classroom model of a simple electromagnet: a coil of `turns` turns of
 * insulated copper wire, with or without a soft-iron core, carrying a current
 * in amperes. Its strength grows with the product turns × current (ampe-vòng),
 * and a soft-iron core makes it many times stronger. The number of paper
 * clips it can hold is a rough, made-up scale that keeps those trends; it is
 * not a measured law. With the switch open there is no magnetic field.
 */

/** How many times stronger the coil is with a soft-iron core in this model. */
export const CORE_GAIN = 10;

/** Ampere-turns needed per clip held, with a soft-iron core. */
export const PER_CLIP = 40;

/** Most clips that fit on the tip of the core in the picture. */
export const MAX_CLIPS = 14;

/**
 * @typedef {{ on: boolean, turns: number, current: number, core: boolean }} Magnet
 */

/**
 * Relative strength of the electromagnet, 0 with the switch open.
 * @param {Magnet} m
 */
export function strength(m) {
  if (!m.on || m.current <= 0) return 0;
  return m.turns * m.current * (m.core ? CORE_GAIN : 1);
}

/**
 * Paper clips the electromagnet holds: none when switched off.
 * @param {Magnet} m
 */
export function clipsHeld(m) {
  const n = Math.floor((strength(m) + 1e-9) / (PER_CLIP * CORE_GAIN));
  return Math.max(0, Math.min(MAX_CLIPS, n));
}

/**
 * Poles at the two ends of the coil, or null when no current flows. In the
 * picture the wire is wound so that the normal current makes the right end
 * a north pole; reversing the current swaps the poles.
 * @param {boolean} on @param {boolean} reversed @param {number} [current]
 * @returns {{ left: 'N' | 'S', right: 'N' | 'S' } | null}
 */
export function poles(on, reversed, current = 1) {
  if (!on || current <= 0) return null;
  return reversed ? { left: 'N', right: 'S' } : { left: 'S', right: 'N' };
}
