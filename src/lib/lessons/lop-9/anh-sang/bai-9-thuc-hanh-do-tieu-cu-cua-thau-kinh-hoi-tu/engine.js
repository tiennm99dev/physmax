/**
 * A virtual optical bench for measuring the focal length of a converging
 * lens the book's way: move the object and the screen apart until the image
 * is sharp and as tall as the object; then d = d′ = 2f and f = (d + d′) / 4.
 * Lengths in cm. The blur is the size of the light spot one image point
 * makes on a screen that is not at the image: aperture · |d′ − v| / v.
 */

/** Focal lengths of the lenses on the virtual bench, in cm. */
export const LENSES = [8, 10, 12, 15];

/** Diameter of the lens opening, in cm. */
export const APERTURE = 4;

/** Height of the F-shaped object, in cm. */
export const OBJECT_HEIGHT = 3;

/** Largest blur (cm) that still looks sharp. */
export const SHARP_BLUR = 0.12;

/**
 * Distance of the real image behind the lens, or null when there is none
 * (object at or inside the focal length).
 * @param {number} f @param {number} d
 */
export function imageDistance(f, d) {
  if (d <= f + 1e-9) return null;
  return (d * f) / (d - f);
}

/**
 * What the screen at distance `screen` behind the lens shows.
 * @param {number} f @param {number} d object distance @param {number} screen
 * @param {number} [h] object height
 * @returns {{ formed: boolean, blur: number, height: number, sharp: boolean }}
 */
export function screenImage(f, d, screen, h = OBJECT_HEIGHT) {
  const v = imageDistance(f, d);
  if (v === null) return { formed: false, blur: Infinity, height: 0, sharp: false };
  const blur = (APERTURE * Math.abs(screen - v)) / v;
  return { formed: true, blur, height: (h * screen) / d, sharp: blur <= SHARP_BLUR };
}

/**
 * Focal length from a sharp, same-size image: f = (d + d′) / 4.
 * @param {number} d @param {number} d2
 */
export const focalFromSymmetric = (d, d2) => (d + d2) / 4;

/**
 * Whether two heights are equal to the ruler's precision.
 * @param {number} a @param {number} b @param {number} [tolerance]
 */
export const sameHeight = (a, b, tolerance = 0.05) => Math.abs(a - b) <= tolerance;

/**
 * Mean of a list of numbers, 0 for an empty list.
 * @param {number[]} values
 */
export const mean = (values) =>
  values.length ? values.reduce((s, v) => s + v, 0) / values.length : 0;
