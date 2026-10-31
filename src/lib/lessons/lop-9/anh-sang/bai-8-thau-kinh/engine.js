/**
 * Where the object stands relative to a lens and what kind of image it gives,
 * the way the grade 9 book sorts the cases: for a converging lens d > 2f,
 * d = 2f, f < d < 2f, d = f and d < f; a diverging lens always gives a
 * virtual, upright, smaller image.
 */
import { thinLensImage } from '#lib/domain/optics.js';

/**
 * The zone of the object distance `d` for a lens of focal length `f`
 * (negative for a diverging lens).
 * @param {number} f @param {number} d
 * @returns {'xa' | 'hai-f' | 'giua' | 'tieu-diem' | 'gan' | 'phan-ki'}
 */
export function zoneOf(f, d) {
  if (f < 0) return 'phan-ki';
  const eps = 1e-9;
  if (Math.abs(d - 2 * f) < eps) return 'hai-f';
  if (d > 2 * f) return 'xa';
  if (Math.abs(d - f) < eps) return 'tieu-diem';
  if (d > f) return 'giua';
  return 'gan';
}

/** The zones in words. */
export const ZONE_TEXT = {
  xa: 'Vật ở ngoài khoảng $2f$ ($d > 2f$)',
  'hai-f': 'Vật cách thấu kính $d = 2f$',
  giua: 'Vật trong khoảng $f < d < 2f$',
  'tieu-diem': 'Vật đặt tại tiêu điểm ($d = f$)',
  gan: 'Vật trong khoảng tiêu cự ($d < f$)',
  'phan-ki': 'Thấu kính phân kì: vật ở mọi vị trí',
};

/**
 * @typedef {{ real: boolean, size: 'nho' | 'bang' | 'lon' }} ImageKind
 */

/**
 * Kind of image an object at distance d gives, or null when it is at infinity.
 * @param {number} f @param {number} d
 * @returns {ImageKind | null}
 */
export function imageKind(f, d) {
  const img = thinLensImage(f, d);
  if (img.atInfinity) return null;
  const k = Math.abs(img.magnification);
  const size = Math.abs(k - 1) < 1e-9 ? 'bang' : k > 1 ? 'lon' : 'nho';
  return { real: img.real, size };
}

/** Challenges: make the bench produce an image of this kind. */
export const TARGETS = /** @type {const} */ ([
  { text: 'ảnh thật, ngược chiều, nhỏ hơn vật', real: true, size: 'nho' },
  { text: 'ảnh thật, ngược chiều, bằng vật', real: true, size: 'bang' },
  { text: 'ảnh thật, ngược chiều, lớn hơn vật', real: true, size: 'lon' },
  { text: 'ảnh ảo, cùng chiều, lớn hơn vật', real: false, size: 'lon' },
  { text: 'ảnh ảo, cùng chiều, nhỏ hơn vật', real: false, size: 'nho' },
]);

/**
 * Whether the bench's image matches a target.
 * @param {number} f @param {number} d @param {{ real: boolean, size: string }} target
 */
export function meetsTarget(f, d, target) {
  const k = imageKind(f, d);
  return k !== null && k.real === target.real && k.size === target.size;
}
