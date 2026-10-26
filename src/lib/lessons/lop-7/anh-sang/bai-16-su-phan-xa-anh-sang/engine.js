/**
 * Reflection of light at a horizontal surface, angles in degrees measured
 * from the upward normal: negative to the left, positive to the right. A ray
 * coming in at angle of incidence i from the left leaves at i′ = i on the
 * right of the normal (law of reflection). On a rough surface every small
 * piece (facet) is tilted by its own angle θ; the law still holds about that
 * facet's normal, so the ray leaves at i + 2θ from the vertical and parallel
 * rays scatter in many directions (diffuse reflection). SVG coordinates,
 * y down.
 *
 * @typedef {{ x: number, y: number }} Pt
 */

/** Steepest a scattered ray is drawn, short of grazing the surface. */
export const MAX_OUT = 84;

/**
 * Angle of reflection for a given angle of incidence (law of reflection).
 * @param {number} i
 */
export function reflectionAngle(i) {
  return i;
}

/**
 * Point at distance `r` from `o` in the direction `phi` degrees from the
 * upward normal (positive to the right).
 * @param {Pt} o @param {number} r @param {number} phi
 * @returns {Pt}
 */
export function fromNormal(o, r, phi) {
  const t = (phi * Math.PI) / 180;
  return { x: o.x + r * Math.sin(t), y: o.y - r * Math.cos(t) };
}

/**
 * Angle of incidence of a laser at `p` aimed at the point of incidence `o`,
 * rounded to whole degrees and kept on the left of the normal, 0° to `max`.
 * @param {Pt} o @param {Pt} p @param {number} [max]
 */
export function incidenceFrom(o, p, max = 80) {
  const deg = (Math.atan2(o.x - p.x, o.y - p.y) * 180) / Math.PI;
  return Math.max(0, Math.min(max, Math.round(deg)));
}

/**
 * Tilts of the facets of a rough surface, limited so that no reflected ray
 * dives into the surface for this angle of incidence; whole degrees stay
 * whole.
 * @param {number} i
 * @param {number[]} pattern
 */
export function facetTilts(i, pattern) {
  const lo = Math.ceil((-MAX_OUT - i) / 2);
  const hi = Math.floor((MAX_OUT - i) / 2);
  return pattern.map((t) => Math.max(lo, Math.min(hi, t)));
}

/**
 * Direction, from the upward vertical, of a ray reflected by a facet tilted
 * by `tilt`, and the angles of incidence and reflection about that facet's
 * own normal (equal, by the law of reflection).
 * @param {number} i angle of incidence from the vertical
 * @param {number} tilt facet tilt, positive when its normal leans right
 */
export function reflectOnFacet(i, tilt) {
  const local = Math.abs(i + tilt);
  return { out: i + 2 * tilt, incidence: local, reflection: local };
}

/**
 * The spread of directions of reflected rays from a parallel beam: 0 for a
 * smooth mirror (all leave parallel), large for a rough surface.
 * @param {number} i @param {number[]} tilts
 */
export function spread(i, tilts) {
  const outs = tilts.map((t) => reflectOnFacet(i, t).out);
  return Math.max(...outs) - Math.min(...outs);
}
