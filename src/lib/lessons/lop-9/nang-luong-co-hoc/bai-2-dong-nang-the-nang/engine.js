/**
 * A body dropped from rest at height h0 with air resistance ignored, and the
 * comparison of two moving bodies' kinetic energies. Energy formulas come
 * from the chapter's `_shared/energy.js` (P = 10·m, so the fall has
 * acceleration 10 m/s²).
 */
import { G, kinetic, potential } from '../_shared/energy.js';
import { tidy } from '#lib/core/number-format.js';

/**
 * Seconds a body takes to fall from rest through `h0` metres.
 * @param {number} h0
 */
export const fallTime = (h0) => (h0 > 0 ? Math.sqrt((2 * h0) / G) : 0);

/** @typedef {{ t: number, h: number, v: number, wd: number, wt: number, landed: boolean }} DropState */

/**
 * Height, speed and both energies of a body of mass `m` (kg) dropped from
 * rest at `h0` (m), `t` seconds after release; it stays on the ground after
 * landing.
 * @param {number} m @param {number} h0 @param {number} t
 * @returns {DropState}
 */
export function dropAt(m, h0, t) {
  const tf = fallTime(h0);
  const tt = Math.min(Math.max(t, 0), tf);
  const h = Math.max(0, h0 - 0.5 * G * tt * tt);
  const v = G * tt;
  return { t: tt, h, v, wd: kinetic(m, v), wt: potential(m, h), landed: tt >= tf };
}

/**
 * How many times body B's kinetic energy is body A's, with the factors from
 * the mass and from the speed: Wđ grows like m and like v².
 * @param {{ m: number, v: number }} a @param {{ m: number, v: number }} b
 */
export function compareKinetic(a, b) {
  const massFactor = tidy(b.m / a.m);
  const speedFactor = tidy(b.v / a.v);
  return {
    wa: kinetic(a.m, a.v),
    wb: kinetic(b.m, b.v),
    massFactor,
    speedFactor,
    ratio: tidy(massFactor * speedFactor * speedFactor),
  };
}
