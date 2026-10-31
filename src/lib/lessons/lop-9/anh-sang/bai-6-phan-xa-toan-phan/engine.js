/**
 * Total internal reflection: whether a ray reflects totally at a boundary,
 * and the zigzag path of a ray along a straight optical fibre whose core has
 * index n₁ and cladding n₂. Past the critical angle the ray bounces with no
 * loss; below it, part of the light leaks out into the cladding at each hit.
 */
import { criticalAngle, refractionAngle } from '#lib/domain/optics.js';
import { reflectance } from '../_shared/light.js';

const RAD = Math.PI / 180;

/**
 * Whether light going from n1 into n2 at `incidence` reflects totally.
 * @param {number} n1 @param {number} n2 @param {number} incidence degrees
 */
export function isTotal(n1, n2, incidence) {
  const c = criticalAngle(n1, n2);
  return c !== null && incidence >= c - 1e-9;
}

/**
 * Whether a guess at the critical angle is close enough (within `slack`
 * degrees) to the true one; false when there is none.
 * @param {number} n1 @param {number} n2 @param {number} guess @param {number} [slack]
 */
export function criticalGuessOk(n1, n2, guess, slack = 1) {
  const c = criticalAngle(n1, n2);
  return c !== null && Math.abs(guess - c) <= slack;
}

/**
 * @typedef {{ x1: number, y1: number, x2: number, y2: number, intensity: number }} Segment
 * @typedef {{ x: number, y: number, up: boolean, angle: number, intensity: number }} Leak
 */

/**
 * Path of a ray entering a straight fibre on its axis at `theta` degrees to
 * the axis (going up first). The core runs from x = 0 to `length` between
 * y = 0 and y = `width` (y down, like SVG).
 * @param {{ theta: number, n1: number, n2: number, length: number, width: number, minIntensity?: number }} o
 * @returns {{ segments: Segment[], leaks: Leak[], delivered: number, wallIncidence: number, total: boolean }}
 */
export function fibrePath({ theta, n1, n2, length, width, minIntensity = 0.02 }) {
  const wallIncidence = 90 - theta;
  const total = isTotal(n1, n2, wallIncidence);
  const R = reflectance(n1, n2, wallIncidence);
  const r = refractionAngle(n1, n2, wallIncidence);
  /** @type {Segment[]} */
  const segments = [];
  /** @type {Leak[]} */
  const leaks = [];
  let x = 0;
  let y = width / 2;
  let up = true;
  let intensity = 1;
  const t = Math.tan(theta * RAD);
  for (let guard = 0; guard < 400; guard++) {
    if (theta <= 1e-9) {
      segments.push({ x1: x, y1: y, x2: length, y2: y, intensity });
      return { segments, leaks, delivered: intensity, wallIncidence, total: true };
    }
    const yWall = up ? 0 : width;
    const dx = Math.abs(yWall - y) / t;
    if (x + dx >= length) {
      const yEnd = y + (up ? -1 : 1) * (length - x) * t;
      segments.push({ x1: x, y1: y, x2: length, y2: yEnd, intensity });
      return { segments, leaks, delivered: intensity, wallIncidence, total };
    }
    segments.push({ x1: x, y1: y, x2: x + dx, y2: yWall, intensity });
    x += dx;
    y = yWall;
    if (!total && r !== null) leaks.push({ x, y, up, angle: r, intensity: intensity * (1 - R) });
    intensity *= total ? 1 : R;
    up = !up;
    if (intensity < minIntensity) return { segments, leaks, delivered: 0, wallIncidence, total };
  }
  return { segments, leaks, delivered: intensity, wallIncidence, total };
}
