/**
 * One stage of uniformly accelerated straight-line motion, set by the two ends
 * of its v-t line: v0 at t = 0 and vEnd at t = T. Velocities and displacements
 * are signed along the chosen positive direction.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {{ t: number, v: number }} GraphPoint */
/** @typedef {{ sign: 1 | -1, points: GraphPoint[] }} AreaPiece */

export const V_MIN = -10;
export const V_MAX = 20;
export const T_MIN = 2;
export const T_MAX = 10;

/**
 * Slope of the v-t line.
 * @param {number} v0 @param {number} vEnd @param {number} T
 */
export function accelerationOf(v0, vEnd, T) {
  return tidy((vEnd - v0) / T);
}

/**
 * v = v0 + at.
 * @param {number} v0 @param {number} a @param {number} t
 */
export function velocityAt(v0, a, t) {
  return tidy(v0 + a * t);
}

/**
 * d = v0·t + a·t²/2.
 * @param {number} v0 @param {number} a @param {number} t
 */
export function displacementAt(v0, a, t) {
  return tidy(v0 * t + (a * t * t) / 2);
}

/**
 * The moment the velocity passes through zero strictly before `t`, or null when
 * the body keeps one direction up to `t`.
 * @param {number} v0 @param {number} a @param {number} t
 */
export function turnTime(v0, a, t) {
  if (a === 0 || v0 === 0) return null;
  const tau = -v0 / a;
  return tau > 0 && tau < t ? tau : null;
}

/**
 * Distance travelled up to `t`: both legs count as positive when the body turns.
 * @param {number} v0 @param {number} a @param {number} t
 */
export function distanceAt(v0, a, t) {
  const tau = turnTime(v0, a, t);
  if (tau === null) return Math.abs(displacementAt(v0, a, t));
  const first = displacementAt(v0, a, tau);
  return tidy(Math.abs(first) + Math.abs(displacementAt(v0, a, t) - first));
}

/**
 * The region between the v-t line and the time axis up to `t`, split where it
 * crosses the axis. Above the axis counts positive, below counts negative.
 * @param {number} v0 @param {number} a @param {number} t
 * @returns {AreaPiece[]}
 */
export function areaPieces(v0, a, t) {
  if (t <= 0) return [];
  const end = velocityAt(v0, a, t);
  const tau = turnTime(v0, a, t);
  if (tau === null) {
    if (v0 === 0 && end === 0) return [];
    return [
      {
        sign: v0 + end >= 0 ? 1 : -1,
        points: [
          { t: 0, v: 0 },
          { t: 0, v: v0 },
          { t, v: end },
          { t, v: 0 },
        ],
      },
    ];
  }
  return [
    {
      sign: v0 > 0 ? 1 : -1,
      points: [
        { t: 0, v: 0 },
        { t: 0, v: v0 },
        { t: tau, v: 0 },
      ],
    },
    {
      sign: end > 0 ? 1 : -1,
      points: [
        { t: tau, v: 0 },
        { t, v: end },
        { t, v: 0 },
      ],
    },
  ];
}

/**
 * Signed area of one piece by the shoelace formula, positive above the axis.
 * @param {AreaPiece} piece
 */
export function pieceArea(piece) {
  const { points } = piece;
  let twice = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const q = points[(i + 1) % points.length];
    twice += p.t * q.v - q.t * p.v;
  }
  return tidy(piece.sign * Math.abs(twice / 2));
}

/**
 * The kind of motion at an instant, from the signs of v and a.
 * @param {number} v @param {number} a
 * @returns {'dung-yen' | 'deu' | 'nhanh-dan' | 'cham-dan'}
 */
export function classify(v, a) {
  if (a === 0) return v === 0 ? 'dung-yen' : 'deu';
  if (v === 0) return 'nhanh-dan';
  return a * v > 0 ? 'nhanh-dan' : 'cham-dan';
}

export const KIND_TEXT = /** @type {const} */ ({
  'dung-yen': 'Vật đứng yên: đồ thị trùng trục thời gian.',
  deu: 'Đồ thị nằm ngang nên $a = 0$: vật chuyển động thẳng đều, không phải biến đổi đều.',
  'nhanh-dan': 'Lúc này vật nhanh dần đều: $a$ và $v$ cùng dấu, $|v|$ tăng theo thời gian.',
  'cham-dan': 'Lúc này vật chậm dần đều: $a$ và $v$ trái dấu, $|v|$ giảm theo thời gian.',
});

/**
 * Half a car-road width in metres that keeps the whole motion on the drawing.
 * @param {number} v0 @param {number} a @param {number} T
 */
export function roadExtent(v0, a, T) {
  const tau = turnTime(v0, a, T);
  const reach = Math.max(
    Math.abs(displacementAt(v0, a, T)),
    tau === null ? 0 : Math.abs(displacementAt(v0, a, tau)),
  );
  return Math.max(10, Math.ceil(reach / 10) * 10);
}
