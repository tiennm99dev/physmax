/**
 * Bricks on sand: the pressing force (áp lực) is the weight of the stack,
 * F = n · P, the pressed area S is the face the bottom brick stands on, and
 * the pressure is p = F / S in N/m² (Pa). The dent in the sand grows with p.
 */
import { tidy } from '#lib/domain/materials.js';

/** One brick: 20 cm × 10 cm × 5 cm, 2 kg, so P = 10m = 20 N. */
export const BRICK = { length: 20, width: 10, thick: 5, weight: 20 };

/**
 * @typedef {'nam' | 'nghieng' | 'dung'} FaceId
 * @typedef {{ id: FaceId, name: string, base: [number, number], height: number }} Face
 * `base` = the two edges (cm) lying on the sand, `height` = the edge standing up.
 */

/** @type {Face[]} */
export const FACES = [
  { id: 'nam', name: 'Đặt nằm', base: [BRICK.length, BRICK.width], height: BRICK.thick },
  { id: 'nghieng', name: 'Đặt nghiêng', base: [BRICK.length, BRICK.thick], height: BRICK.width },
  { id: 'dung', name: 'Đặt đứng', base: [BRICK.width, BRICK.thick], height: BRICK.length },
];

/** Most bricks in a stack. */
export const MAX_BRICKS = 3;

/**
 * @param {FaceId} id
 * @returns {Face}
 */
export function face(id) {
  return FACES.find((f) => f.id === id) ?? FACES[0];
}

/**
 * Pressed area in cm² and m².
 * @param {FaceId} id
 */
export function areaOf(id) {
  const [a, b] = face(id).base;
  const cm2 = a * b;
  return { cm2, m2: tidy(cm2 / 10000) };
}

/**
 * p = F / S.
 * @param {number} force N
 * @param {number} area m²
 */
export function pressure(force, area) {
  if (area <= 0) throw new Error('Area must be positive');
  return tidy(force / area);
}

/**
 * Force, area and pressure for `n` bricks stacked on face `id`.
 * @param {FaceId} id
 * @param {number} n
 */
export function stack(id, n) {
  const force = n * BRICK.weight;
  const area = areaOf(id);
  return { force, area, p: pressure(force, area.m2) };
}

/** Pressures the learner is asked to reach, in Pa. */
export const TARGETS = [4000, 6000, 3000, 8000];

/**
 * Every way (face, number of bricks) to reach the pressure `target`.
 * @param {number} target
 * @returns {Array<{ face: FaceId, n: number }>}
 */
export function waysTo(target) {
  /** @type {Array<{ face: FaceId, n: number }>} */
  const ways = [];
  for (const f of FACES) {
    for (let n = 1; n <= MAX_BRICKS; n += 1) {
      if (stack(f.id, n).p === target) ways.push({ face: f.id, n });
    }
  }
  return ways;
}

/**
 * Depth of the dent in the sand in mm (a model: 1 mm per 400 Pa, at most 30 mm).
 * @param {number} p Pa
 */
export const dentMm = (p) => Math.min(30, tidy(p / 400));
