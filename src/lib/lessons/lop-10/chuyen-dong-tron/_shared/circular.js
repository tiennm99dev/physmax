/**
 * Geometry of a point going round a circle on an SVG board. Angles are in
 * radians and grow counter-clockwise on screen, as in the book's figures, from
 * the rightward direction.
 */

export const TAU = 2 * Math.PI;

/** @param {number} deg */
export const toRad = (deg) => (deg * Math.PI) / 180;

/** @param {number} rad */
export const toDeg = (rad) => (rad * 180) / Math.PI;

/**
 * Pixel position at angle `a` on a circle, with the SVG y axis pointing down.
 * @param {number} cx @param {number} cy @param {number} radius @param {number} a
 * @returns {{ x: number, y: number }}
 */
export function pointAt(cx, cy, radius, a) {
  return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) };
}

/**
 * Unit vector in pixel space along the counter-clockwise motion at angle `a`.
 * @param {number} a
 * @returns {{ x: number, y: number }}
 */
export function tangentAt(a) {
  return { x: -Math.sin(a), y: -Math.cos(a) };
}

/**
 * SVG path of the arc from angle `start` counter-clockwise to `end`. A sweep of
 * a full turn is drawn as two half arcs, since one arc with equal ends draws
 * nothing, and an empty sweep gives ''.
 * @param {number} cx @param {number} cy @param {number} radius
 * @param {number} start @param {number} end
 */
export function arcPath(cx, cy, radius, start, end) {
  const sweep = end - start;
  if (sweep <= 1e-6) return '';
  const from = pointAt(cx, cy, radius, start);
  if (sweep >= TAU - 1e-6) {
    const half = pointAt(cx, cy, radius, start + Math.PI);
    return `M ${from.x} ${from.y} A ${radius} ${radius} 0 1 0 ${half.x} ${half.y} A ${radius} ${radius} 0 1 0 ${from.x} ${from.y}`;
  }
  const to = pointAt(cx, cy, radius, end);
  return `M ${from.x} ${from.y} A ${radius} ${radius} 0 ${sweep > Math.PI ? 1 : 0} 0 ${to.x} ${to.y}`;
}
