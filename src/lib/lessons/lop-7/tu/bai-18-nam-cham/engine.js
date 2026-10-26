/**
 * Two bar magnets on a straight track, and a compass on a map. A magnet is
 * described by which pole sits on its left end: 'N' (cực Bắc) or 'S'
 * (cực Nam). Facing poles of the same name push apart, poles of different
 * names pull together; the pull or push grows quickly as the gap shrinks.
 * Compass angles are in degrees, clockwise from the top of the screen.
 */

/** @typedef {'N' | 'S'} Pole */

/** Gap, in pixels, inside which the two magnets visibly move each other. */
export const REACH = 70;

/** The other pole. @param {Pole} p @returns {Pole} */
export function other(p) {
  return p === 'N' ? 'S' : 'N';
}

/**
 * The pole on the right end of a magnet whose left end is `left`.
 * @param {Pole} left
 */
export function rightPole(left) {
  return other(left);
}

/**
 * How two facing poles act on each other: like poles repel, unlike attract.
 * @param {Pole} a @param {Pole} b
 * @returns {'hut' | 'day'}
 */
export function interaction(a, b) {
  return a === b ? 'day' : 'hut';
}

/**
 * Size of the force between the facing poles for a gap in pixels, from 1 at
 * contact down toward 0 far away (an inverse-square fall-off, softened so it
 * stays finite at contact).
 * @param {number} gap
 */
export function strength(gap) {
  const g0 = 25;
  return (g0 * g0) / ((Math.max(0, gap) + g0) * (Math.max(0, gap) + g0));
}

/**
 * Where the right magnet comes to rest after the learner lets go at `gap`:
 * inside REACH it is pulled into contact (attraction) or pushed out to the
 * edge of REACH (repulsion); farther away it stays put.
 * @param {number} gap @param {'hut' | 'day'} kind
 */
export function settle(gap, kind) {
  if (gap >= REACH) return gap;
  return kind === 'hut' ? 0 : REACH + 20;
}

/**
 * Angle in [0, 360).
 * @param {number} a
 */
export function norm(a) {
  return ((a % 360) + 360) % 360;
}

/** Eight compass directions, every 45° clockwise from North. */
export const DIRECTIONS = [
  'Bắc',
  'Đông Bắc',
  'Đông',
  'Đông Nam',
  'Nam',
  'Tây Nam',
  'Tây',
  'Tây Bắc',
];

/**
 * Name of the nearest of the eight directions for a bearing measured
 * clockwise from geographic North.
 * @param {number} bearing
 */
export function directionName(bearing) {
  return DIRECTIONS[Math.round(norm(bearing) / 45) % 8];
}

/**
 * Bearing of a landmark seen at screen angle `screen` when geographic North
 * lies at screen angle `north` (both clockwise from the top of the screen).
 * @param {number} screen @param {number} north
 */
export function bearingOf(screen, north) {
  return norm(screen - north);
}

/**
 * Whether the dial's N mark (turned to screen angle `dial`) lines up with the
 * red end of the needle (at screen angle `north`), within `tol` degrees.
 * @param {number} dial @param {number} north @param {number} [tol]
 */
export function isAligned(dial, north, tol = 4) {
  const d = norm(dial - north);
  return Math.min(d, 360 - d) <= tol;
}

/**
 * Screen angle, clockwise from the top, of point `p` seen from centre `c`
 * (SVG coordinates, y down), snapped to `step` degrees.
 * @param {{ x: number, y: number }} c @param {{ x: number, y: number }} p @param {number} [step]
 */
export function screenAngle(c, p, step = 1) {
  const a = (Math.atan2(p.x - c.x, c.y - p.y) * 180) / Math.PI;
  return norm(Math.round(a / step) * step);
}
