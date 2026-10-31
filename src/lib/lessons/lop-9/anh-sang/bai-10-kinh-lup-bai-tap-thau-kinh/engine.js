/**
 * Lens problems the way the grade 9 book solves them: the image distance d′
 * and height h′ found from two pairs of similar triangles, and the
 * magnifying power of a magnifying glass, G = 25 / f with f in centimetres.
 * Distances are positive lengths in cm; `f` is negative for a diverging lens.
 */
import { numTex, tidy } from '#lib/core/number-format.js';

/**
 * Magnifying power of a magnifying glass of focal length f (cm).
 * @param {number} f
 */
export function magnifyingPower(f) {
  return tidy(25 / f);
}

/**
 * Focal length (cm) of a magnifying glass marked Gx.
 * @param {number} g
 */
export function focalOfPower(g) {
  return tidy(25 / g);
}

/**
 * @typedef {{
 *   kind: 'that' | 'ao' | 'khong',
 *   distance: number | null,
 *   height: number | null,
 *   steps: string[],
 * }} LensSolution
 */

/**
 * Solve a lens problem: object of height h at distance d from a lens of focal
 * length f (f < 0 for a diverging lens). `kind` is 'khong' when the object
 * sits at the focus and no image forms.
 * @param {number} f @param {number} d @param {number} h
 * @returns {LensSolution}
 */
export function solveLens(f, d, h) {
  const a = Math.abs(f);
  const t = (/** @type {number} */ v) => numTex(tidy(v), 2);
  /** `=` when the value has at most two decimals, else `≈`. */
  const eq = (/** @type {number} */ v) =>
    Math.abs(v * 100 - Math.round(v * 100)) < 1e-6 ? '=' : '\\approx';
  const F = t(a);
  const D = t(d);
  if (f > 0 && Math.abs(d - f) < 1e-9) {
    return {
      kind: 'khong',
      distance: null,
      height: null,
      steps: [
        `$d = f = ${F}$ cm: vật đặt tại tiêu điểm.`,
        'Tia qua quang tâm và tia ló của tia song song với trục chính song song với nhau, không cắt nhau: không có ảnh.',
      ],
    };
  }
  let distance;
  /** @type {string[]} */
  let steps;
  const ratio = `$\\triangle OAB \\backsim \\triangle OA'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{OA'}{OA} = \\dfrac{d'}{d}$.`;
  if (f > 0 && d > f) {
    distance = (d * a) / (d - a);
    steps = [
      `$d = ${D}$ cm $> f = ${F}$ cm: ảnh thật, ở sau thấu kính.`,
      ratio,
      `$OI = AB$, $\\triangle F'OI \\backsim \\triangle F'A'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{F'A'}{OF'} = \\dfrac{d' - f}{f}$.`,
      `Do đó $\\dfrac{d'}{${D}} = \\dfrac{d' - ${F}}{${F}}$, suy ra $d' = \\dfrac{d \\cdot f}{d - f} = \\dfrac{${D} \\cdot ${F}}{${D} - ${F}} ${eq(distance)} ${t(distance)}$ cm.`,
    ];
  } else if (f > 0) {
    distance = (d * a) / (a - d);
    steps = [
      `$d = ${D}$ cm $< f = ${F}$ cm: ảnh ảo, cùng phía với vật.`,
      ratio,
      `$OI = AB$, $\\triangle F'OI \\backsim \\triangle F'A'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{F'A'}{OF'} = \\dfrac{d' + f}{f}$.`,
      `Do đó $\\dfrac{d'}{${D}} = \\dfrac{d' + ${F}}{${F}}$, suy ra $d' = \\dfrac{d \\cdot f}{f - d} = \\dfrac{${D} \\cdot ${F}}{${F} - ${D}} ${eq(distance)} ${t(distance)}$ cm.`,
    ];
  } else {
    distance = (d * a) / (d + a);
    steps = [
      'Thấu kính phân kì: ảnh ảo, cùng phía với vật, trong khoảng tiêu cự.',
      ratio,
      `$OI = AB$, $\\triangle FOI \\backsim \\triangle FA'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{FA'}{FO} = \\dfrac{f - d'}{f}$.`,
      `Do đó $\\dfrac{d'}{${D}} = \\dfrac{${F} - d'}{${F}}$, suy ra $d' = \\dfrac{d \\cdot f}{d + f} = \\dfrac{${D} \\cdot ${F}}{${D} + ${F}} ${eq(distance)} ${t(distance)}$ cm.`,
    ];
  }
  distance = tidy(distance);
  const height = tidy((h * distance) / d);
  steps.push(
    `$h' = h \\cdot \\dfrac{d'}{d} = ${t(h)} \\cdot \\dfrac{${t(distance)}}{${D}} ${eq(distance) === '=' ? eq(height) : '\\approx'} ${t(height)}$ cm.`,
  );
  return { kind: f > 0 && d > f ? 'that' : 'ao', distance, height, steps };
}

/**
 * Whether a typed value is close enough to the exact one: anything that
 * rounds the exact value to one decimal place (or better) is accepted.
 * @param {number | null} typed @param {number} exact
 */
export function closeEnough(typed, exact) {
  return typed !== null && Math.abs(typed - exact) <= 0.05 + 1e-9;
}

/**
 * Ready-made problems for the widget, all with a clean answer.
 * @type {ReadonlyArray<{ lens: 'hoi-tu' | 'phan-ki', f: number, d: number, h: number }>}
 */
export const PRESETS = [
  { lens: 'hoi-tu', f: 12, d: 36, h: 2 },
  { lens: 'hoi-tu', f: 10, d: 15, h: 2 },
  { lens: 'hoi-tu', f: 15, d: 10, h: 1 },
  { lens: 'phan-ki', f: 12, d: 24, h: 3 },
  { lens: 'hoi-tu', f: 8, d: 24, h: 4 },
  { lens: 'phan-ki', f: 20, d: 30, h: 5 },
];
