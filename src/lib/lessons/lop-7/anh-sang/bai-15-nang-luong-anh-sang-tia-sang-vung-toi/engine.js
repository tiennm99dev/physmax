/**
 * Shadows seen from the side. A light source is a vertical segment of
 * half-height `a` centred at (`sx`, `sy`) (a = 0 is a point, the "nguồn sáng
 * hẹp"), an opaque obstacle is a vertical segment of half-height `b` centred
 * at (`ox`, `oy`), and a screen stands at x = `mx`. Light goes in straight
 * lines, so a point on the screen gets the share of the source it can see
 * past the obstacle: none in the umbra (vùng tối), some in the penumbra
 * (vùng nửa tối), all of it outside. Coordinates are SVG units, y down.
 *
 * @typedef {{ sx: number, sy: number, a: number, ox: number, oy: number, b: number, mx: number }} Scene
 * @typedef {{ x: number, y: number }} Pt
 */

/**
 * Where the straight line from source height `s` to the screen point at
 * height `y` crosses the obstacle plane.
 * @param {Scene} sc @param {number} s @param {number} y
 */
function crossing(sc, s, y) {
  const k = (sc.ox - sc.sx) / (sc.mx - sc.sx);
  return s + (y - s) * k;
}

/**
 * Whether the screen point at height `y` gets light from the source point at
 * height `s` (the straight line between them misses the obstacle).
 * @param {Scene} sc @param {number} s @param {number} y
 */
export function seesSourcePoint(sc, s, y) {
  return Math.abs(crossing(sc, s, y) - sc.oy) > sc.b;
}

/**
 * Share of the source, from 0 to 1, that the screen point at height `y`
 * receives light from.
 * @param {Scene} sc @param {number} y
 */
export function litFraction(sc, y) {
  if (sc.a <= 0) {
    const c = crossing(sc, sc.sy, y);
    return Math.abs(c - sc.oy) <= sc.b ? 0 : 1;
  }
  // The crossing height depends linearly on s; find the blocked part of [sy-a, sy+a].
  const k = (sc.ox - sc.sx) / (sc.mx - sc.sx);
  const lo = (sc.oy - sc.b - y * k) / (1 - k);
  const hi = (sc.oy + sc.b - y * k) / (1 - k);
  const blocked = Math.max(0, Math.min(hi, sc.sy + sc.a) - Math.max(lo, sc.sy - sc.a));
  return 1 - blocked / (2 * sc.a);
}

/**
 * The kind of region a screen point lies in.
 * @param {Scene} sc @param {number} y
 * @returns {'toi' | 'nua-toi' | 'sang'}
 */
export function regionAt(sc, y) {
  const f = litFraction(sc, y);
  if (f <= 1e-9) return 'toi';
  if (f >= 1 - 1e-9) return 'sang';
  return 'nua-toi';
}

/**
 * Point where the line through `p` and `q` reaches x = `x`.
 * @param {Pt} p @param {Pt} q @param {number} x
 * @returns {Pt}
 */
export function lineAtX(p, q, x) {
  return { x, y: p.y + ((q.y - p.y) * (x - p.x)) / (q.x - p.x) };
}

/**
 * Where two lines p1q1 and p2q2 meet, or null when parallel.
 * @param {Pt} p1 @param {Pt} q1 @param {Pt} p2 @param {Pt} q2
 * @returns {Pt | null}
 */
export function meet(p1, q1, p2, q2) {
  const d1 = { x: q1.x - p1.x, y: q1.y - p1.y };
  const d2 = { x: q2.x - p2.x, y: q2.y - p2.y };
  const den = d1.x * d2.y - d1.y * d2.x;
  if (Math.abs(den) < 1e-12) return null;
  const t = ((p2.x - p1.x) * d2.y - (p2.y - p1.y) * d2.x) / den;
  return { x: p1.x + t * d1.x, y: p1.y + t * d1.y };
}

/**
 * Outlines of the umbra and the penumbra behind the obstacle, as polygons
 * up to the screen, and their extents on the screen (null when a region does
 * not reach it). The umbra is bounded by the lines from each source end
 * through the obstacle end on the same side; the penumbra's outer edges join
 * each source end to the opposite obstacle end.
 * @param {Scene} sc
 */
export function shadowShape(sc) {
  const sTop = { x: sc.sx, y: sc.sy - sc.a };
  const sBot = { x: sc.sx, y: sc.sy + sc.a };
  const oTop = { x: sc.ox, y: sc.oy - sc.b };
  const oBot = { x: sc.ox, y: sc.oy + sc.b };

  const uTop = lineAtX(sTop, oTop, sc.mx);
  const uBot = lineAtX(sBot, oBot, sc.mx);
  /** @type {Pt[]} */
  let umbra;
  /** @type {[number, number] | null} */
  let umbraOnScreen;
  if (uTop.y <= uBot.y) {
    umbra = [oTop, uTop, uBot, oBot];
    umbraOnScreen = [uTop.y, uBot.y];
  } else {
    // The two edges cross before the screen: the umbra is a closed triangle.
    const tip = meet(sTop, oTop, sBot, oBot) ?? uTop;
    umbra = [oTop, tip, oBot];
    umbraOnScreen = null;
  }

  const pTop = lineAtX(sBot, oTop, sc.mx);
  const pBot = lineAtX(sTop, oBot, sc.mx);
  const penumbra = sc.a > 0 ? [oTop, pTop, pBot, oBot] : [];
  /** @type {[number, number]} */
  const shadowOnScreen = [pTop.y, pBot.y];
  return { umbra, penumbra, umbraOnScreen, shadowOnScreen };
}
