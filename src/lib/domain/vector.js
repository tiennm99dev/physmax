/**
 * Plane vectors for physics: x to the right, y up, angles in degrees measured
 * counter-clockwise from the +x axis. Components turn these into SVG pixels
 * (y down) only when drawing.
 */

/** @typedef {{ x: number, y: number }} Vec */
/** @typedef {{ magnitude: number, angle: number }} Polar */

const RAD = Math.PI / 180;

/**
 * Drops float tails such as 2.0000000000000004, so readouts and tests see the
 * value a student would write.
 * @param {number} v
 */
export function clean(v) {
  return Number(v.toPrecision(12)) + 0;
}

/**
 * @param {number} magnitude
 * @param {number} angle degrees, counter-clockwise from +x
 * @returns {Vec}
 */
export function fromPolar(magnitude, angle) {
  // cos 90° is 6e-17, not 0: drop components that small next to the magnitude.
  const part = (/** @type {number} */ v) =>
    Math.abs(v) < Math.abs(magnitude) * 1e-12 ? 0 : clean(v);
  return { x: part(magnitude * Math.cos(angle * RAD)), y: part(magnitude * Math.sin(angle * RAD)) };
}

/**
 * Magnitude and direction of `v`; the angle is in [0, 360) and 0 for the zero vector.
 * @param {Vec} v
 * @returns {Polar}
 */
export function toPolar(v) {
  const magnitude = clean(Math.hypot(v.x, v.y));
  if (magnitude === 0) return { magnitude: 0, angle: 0 };
  const angle = ((Math.atan2(v.y, v.x) / RAD) % 360) + 360;
  return { magnitude, angle: clean(angle) % 360 };
}

/** @param {Vec} a @param {Vec} b @returns {Vec} */
export function add(a, b) {
  return { x: clean(a.x + b.x), y: clean(a.y + b.y) };
}

/** @param {Vec[]} vs @returns {Vec} */
export function sum(vs) {
  return vs.reduce(add, { x: 0, y: 0 });
}

/** @param {Vec} v @param {number} k @returns {Vec} */
export function scale(v, k) {
  return { x: clean(v.x * k), y: clean(v.y * k) };
}

/** @param {Vec} v */
export function magnitude(v) {
  return clean(Math.hypot(v.x, v.y));
}
