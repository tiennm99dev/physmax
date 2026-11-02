/**
 * Weight, a load hung on ropes and the balance point of a flat plate. Rope
 * angles are measured from the vertical, on either side of the load.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {{ x: number, y: number }} Point */

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** @param {number} deg */
const rad = (deg) => (deg * Math.PI) / 180;

/**
 * P = mg.
 * @param {number} mass
 */
export function weightOf(mass) {
  return tidy(mass * G);
}

/**
 * Tensions in two ropes holding a load of weight `weight` still, solved from
 * T1 sin α = T2 sin β and T1 cos α + T2 cos β = P. Two vertical ropes share the
 * load evenly.
 * @param {number} weight @param {number} alpha @param {number} beta degrees from vertical
 * @returns {{ t1: number, t2: number }}
 */
export function tensions(weight, alpha, beta) {
  const total = Math.sin(rad(alpha + beta));
  if (Math.abs(total) < 1e-9) return { t1: tidy(weight / 2), t2: tidy(weight / 2) };
  return {
    t1: tidy((weight * Math.sin(rad(beta))) / total),
    t2: tidy((weight * Math.sin(rad(alpha))) / total),
  };
}

/**
 * Centre of a uniform flat plate, by the area formula for a simple polygon.
 * @param {Point[]} polygon
 * @returns {Point}
 */
export function centroid(polygon) {
  let area = 0;
  let cx = 0;
  let cy = 0;
  polygon.forEach((p, i) => {
    const q = polygon[(i + 1) % polygon.length];
    const cross = p.x * q.y - q.x * p.y;
    area += cross;
    cx += (p.x + q.x) * cross;
    cy += (p.y + q.y) * cross;
  });
  return { x: tidy(cx / (3 * area)), y: tidy(cy / (3 * area)) };
}

/**
 * Whether a point lies inside a polygon, by ray casting.
 * @param {Point} point @param {Point[]} polygon
 */
export function isInside(point, polygon) {
  let inside = false;
  polygon.forEach((p, i) => {
    const q = polygon[(i + 1) % polygon.length];
    const crosses = p.y > point.y !== q.y > point.y;
    if (crosses && point.x < ((q.x - p.x) * (point.y - p.y)) / (q.y - p.y) + p.x) inside = !inside;
  });
  return inside;
}

/**
 * Degrees to turn a plate about the pin at `hole` (SVG coordinates, y down) so
 * its centre hangs straight below the pin.
 * @param {Point} hole @param {Point} center
 */
export function hangAngle(hole, center) {
  const toCenter = (Math.atan2(center.y - hole.y, center.x - hole.x) * 180) / Math.PI;
  return tidy(90 - toCenter);
}

/**
 * Where `point` lands when the plate hangs from `hole`, with the pin at `pin`.
 * @param {Point} point @param {Point} hole @param {Point} pin @param {number} angle degrees
 * @returns {Point}
 */
export function placed(point, hole, pin, angle) {
  const c = Math.cos(rad(angle));
  const s = Math.sin(rad(angle));
  const dx = point.x - hole.x;
  const dy = point.y - hole.y;
  return { x: tidy(pin.x + dx * c - dy * s), y: tidy(pin.y + dx * s + dy * c) };
}
