/**
 * Light at a flat boundary between two transparent media, the way the grade 9
 * book treats it: the refraction law sin i / sin r = n₂ / n₁, total internal
 * reflection past the critical angle, and how much of the light is reflected
 * (Fresnel, unpolarised) so a widget can fade the refracted ray as it should.
 * Angles are in degrees, measured from the normal.
 */
import { criticalAngle, refractionAngle } from '#lib/domain/optics.js';

const RAD = Math.PI / 180;

/** Media of the chapter, with the refractive indices the book uses. */
export const MEDIA = /** @type {const} */ ({
  'khong-khi': { name: 'không khí', n: 1 },
  nuoc: { name: 'nước', n: 4 / 3 },
  'thuy-tinh': { name: 'thuỷ tinh', n: 1.5 },
});

/** @typedef {keyof typeof MEDIA} MediumId */

/**
 * Fraction of the light reflected at the boundary (0 to 1): the mean of the
 * s and p Fresnel reflectances, 1 past the critical angle.
 * @param {number} n1 index on the incident side
 * @param {number} n2 index on the other side
 * @param {number} incidence degrees
 */
export function reflectance(n1, n2, incidence) {
  const ci = Math.cos(incidence * RAD);
  const st = (n1 / n2) * Math.sin(incidence * RAD);
  if (st >= 1) return 1;
  const ct = Math.sqrt(1 - st * st);
  const rs = ((n1 * ci - n2 * ct) / (n1 * ci + n2 * ct)) ** 2;
  const rp = ((n1 * ct - n2 * ci) / (n1 * ct + n2 * ci)) ** 2;
  return Math.min(1, (rs + rp) / 2);
}

/**
 * Everything a widget shows about one ray meeting the boundary.
 * @param {number} n1 @param {number} n2 @param {number} incidence degrees
 */
export function boundary(n1, n2, incidence) {
  const r = refractionAngle(n1, n2, incidence);
  const critical = criticalAngle(n1, n2);
  const sinI = Math.sin(incidence * RAD);
  const sinR = r === null ? null : Math.sin(r * RAD);
  return {
    incidence,
    refraction: r,
    critical,
    total: r === null,
    reflected: reflectance(n1, n2, incidence),
    sinI,
    sinR,
    /** sin i / sin r, undefined at normal incidence or with no refracted ray. */
    ratio: sinR && sinR > 1e-9 ? sinI / sinR : null,
  };
}

/**
 * Unit vector from the boundary point toward a ray at `angle` degrees from
 * the normal, in SVG coordinates (y down). `up` picks the upper medium,
 * `right` the side of the normal.
 * @param {number} angle @param {boolean} up @param {boolean} right
 */
export function rayDir(angle, up, right) {
  const s = Math.sin(angle * RAD);
  const c = Math.cos(angle * RAD);
  return { x: right ? s : -s, y: up ? -c : c };
}

/**
 * Angle from the upward normal of a point above a boundary point, in degrees,
 * for dragging a laser that sits in the upper-left quadrant. Clamped to
 * [0, max].
 * @param {{ x: number, y: number }} at boundary point
 * @param {{ x: number, y: number }} p pointer
 * @param {number} max
 */
export function angleFromPointer(at, p, max) {
  const dx = at.x - p.x;
  const dy = at.y - p.y;
  if (dy <= 0) return dx > 0 ? max : 0;
  const deg = Math.atan2(Math.max(0, dx), dy) / RAD;
  return Math.min(max, Math.max(0, deg));
}

/**
 * SVG arc between two directions from a centre, the short way round.
 * @param {{ x: number, y: number }} c centre
 * @param {{ x: number, y: number }} a unit direction
 * @param {{ x: number, y: number }} b unit direction
 * @param {number} radius
 */
export function arcBetween(c, a, b, radius) {
  const sweep = a.x * b.y - a.y * b.x > 0 ? 1 : 0;
  const p = (/** @type {number} */ v) => v.toFixed(1);
  return `M ${p(c.x + a.x * radius)} ${p(c.y + a.y * radius)} A ${radius} ${radius} 0 0 ${sweep} ${p(c.x + b.x * radius)} ${p(c.y + b.y * radius)}`;
}
