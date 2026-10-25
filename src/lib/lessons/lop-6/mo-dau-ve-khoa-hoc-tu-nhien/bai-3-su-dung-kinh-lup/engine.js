/**
 * A magnifying glass held close to the eye. The lens has the magnification G
 * written on its frame (3x, 5x, 10x), so its focal length is 25/G cm, where
 * 25 cm is the shortest distance a normal eye sees clearly. With the object
 * nearer than the focal length the lens gives an enlarged upright virtual
 * image; the eye sees it sharply only when that image is at least 25 cm away.
 * Farther than the focal length the light no longer reaches the eye as an
 * image it can focus, so the view blurs.
 */

/** Shortest distance (cm) at which a normal eye sees clearly. */
export const NEAR_POINT = 25;

/** Magnifications offered, as printed on the lens frame. */
export const LENSES = [3, 5, 10];

/** @param {number} g magnification printed on the lens @returns {number} focal length in cm */
export function focalLength(g) {
  return NEAR_POINT / g;
}

/**
 * The lens-to-object distances (cm) that give a sharp image: from the one
 * that puts the image at 25 cm up to the focal length (image far away).
 * @param {number} g
 */
export function sharpRange(g) {
  const f = focalLength(g);
  return { near: (NEAR_POINT * f) / (NEAR_POINT + f), far: f };
}

/** Largest blur (in pixels of the view) drawn by the widget. */
export const MAX_BLUR = 8;

/** @typedef {'qua-gan' | 'ro-net' | 'qua-xa'} Zone */

/**
 * What the eye sees with the lens `d` cm above the object.
 * - `zone`: too close (image nearer than 25 cm), sharp, or too far.
 * - `scale`: how many times larger the image is than the object (1 when the
 *   lens touches the object), capped at G + 1 so the drawing stays on screen.
 * - `blur`: 0 when sharp, growing with the distance from the sharp range.
 * @param {number} d @param {number} g
 * @returns {{ zone: Zone, scale: number, blur: number }}
 */
export function magnifierView(d, g) {
  const f = focalLength(g);
  const { near, far } = sharpRange(g);
  const cap = g + 1;
  const eps = 1e-9;
  if (d >= far - eps && d <= far + eps) return { zone: 'ro-net', scale: cap, blur: 0 };
  if (d > far) {
    const blur = Math.min(MAX_BLUR, 3 + ((d - far) / f) * 2 * MAX_BLUR);
    return { zone: 'qua-xa', scale: cap, blur };
  }
  const scale = Math.min(cap, f / (f - d));
  if (d >= near - eps) return { zone: 'ro-net', scale, blur: 0 };
  return { zone: 'qua-gan', scale, blur: Math.min(MAX_BLUR, 1 + ((near - d) / near) * MAX_BLUR) };
}
