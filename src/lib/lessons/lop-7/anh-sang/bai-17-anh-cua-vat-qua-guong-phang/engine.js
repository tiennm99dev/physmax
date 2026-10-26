/**
 * Image in a plane mirror standing upright along the line x = `mx` (SVG
 * coordinates, y down). The image of a point is its mirror image across that
 * line: as far behind the mirror as the point is in front of it. A ray from
 * the point that reaches the eye after reflection meets the mirror where the
 * straight line from the eye to the image crosses it, which is why the eye
 * sees the reflected rays as if they came from the image.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

/**
 * The image of point `p` in the mirror x = `mx`.
 * @param {Pt} p @param {number} mx
 * @returns {Pt}
 */
export function imageOf(p, mx) {
  return { x: 2 * mx - p.x, y: p.y };
}

/**
 * Distance from `p` to the mirror line x = `mx`.
 * @param {Pt} p @param {number} mx
 */
export function distanceToMirror(p, mx) {
  return Math.abs(p.x - mx);
}

/**
 * Point of incidence on the mirror of the ray from `p` that reflects into
 * the eye `e`: where the segment from `e` to the image of `p` crosses the
 * mirror line. Null when `p` or `e` is not in front of the mirror.
 * @param {Pt} p @param {Pt} e @param {number} mx
 * @returns {Pt | null}
 */
export function mirrorHit(p, e, mx) {
  if (!(p.x < mx && e.x < mx)) return null;
  const img = imageOf(p, mx);
  const t = (mx - e.x) / (img.x - e.x);
  return { x: mx, y: e.y + t * (img.y - e.y) };
}

/**
 * Whether the eye sees the image of `p` in a mirror spanning `top` to
 * `bottom` along x = `mx`: the ray must land on the mirror itself.
 * @param {Pt} p @param {Pt} e @param {number} mx @param {number} top @param {number} bottom
 */
export function seesImage(p, e, mx, top, bottom) {
  const k = mirrorHit(p, e, mx);
  return k !== null && k.y >= top && k.y <= bottom;
}

/**
 * Angles of incidence and reflection, in degrees, of the ray p → k → e on a
 * mirror along x = `mx` (the normal is horizontal).
 * @param {Pt} p @param {Pt} k @param {Pt} e
 */
export function anglesAt(p, k, e) {
  const toDeg = (/** @type {number} */ r) => (r * 180) / Math.PI;
  return {
    incidence: toDeg(Math.atan2(Math.abs(k.y - p.y), Math.abs(k.x - p.x))),
    reflection: toDeg(Math.atan2(Math.abs(e.y - k.y), Math.abs(e.x - k.x))),
  };
}
