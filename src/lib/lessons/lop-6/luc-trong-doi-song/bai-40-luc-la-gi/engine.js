/**
 * The push-and-pull playground. A ball either rests or rolls to the right; a
 * hand gives it one short push or pull. Velocities are in grid squares per
 * time step, x to the right, y up, angles in degrees counter-clockwise from +x.
 * The force adds `strength` squares per step in its own direction, so the
 * learner sees the ball start, speed up, slow down, stop or change direction,
 * and a soft ball squashed while the hand presses on it.
 */
import { add, clean, fromPolar, toPolar } from '#lib/domain/vector.js';

/** @typedef {import('#lib/domain/vector.js').Vec} Vec */
/** @typedef {'bong' | 'bi'} BallId */
/** @typedef {'dung-yen' | 'dang-lan'} StartId */

/** @type {Array<{ id: BallId, name: string, softness: number }>} */
export const BALLS = [
  { id: 'bong', name: 'Quả bóng cao su', softness: 0.12 },
  { id: 'bi', name: 'Hòn bi sắt', softness: 0.004 },
];

/** @type {Array<{ id: StartId, name: string, velocity: Vec }>} */
export const STARTS = [
  { id: 'dung-yen', name: 'Đang đứng yên', velocity: { x: 0, y: 0 } },
  { id: 'dang-lan', name: 'Đang lăn sang phải', velocity: { x: 2, y: 0 } },
];

/** Force strengths: squares per step added to the velocity. */
export const STRENGTHS = [
  { value: 1, name: 'Nhẹ' },
  { value: 2, name: 'Vừa' },
  { value: 3, name: 'Mạnh' },
];

/** The eight directions a force can point, with an arrow and a reading. */
export const DIRECTIONS = [
  { angle: 0, arrow: '→', name: 'sang phải' },
  { angle: 45, arrow: '↗', name: 'chếch lên bên phải' },
  { angle: 90, arrow: '↑', name: 'lên trên' },
  { angle: 135, arrow: '↖', name: 'chếch lên bên trái' },
  { angle: 180, arrow: '←', name: 'sang trái' },
  { angle: 225, arrow: '↙', name: 'chếch xuống bên trái' },
  { angle: 270, arrow: '↓', name: 'xuống dưới' },
  { angle: 315, arrow: '↘', name: 'chếch xuống bên phải' },
];

/**
 * Velocity after a short force of `strength` along `angle`; strength 0 is no force.
 * @param {Vec} u @param {number} angle @param {number} strength
 * @returns {Vec}
 */
export function applyForce(u, angle, strength) {
  if (strength <= 0) return { ...u };
  return add(u, fromPolar(strength, angle));
}

/**
 * @typedef {'dung-yen' | 'khong-doi' | 'bat-dau' | 'dung-lai' | 'nhanh-len' | 'cham-lai' | 'bat-nguoc' | 'doi-huong'} Change
 */

/**
 * How the motion changed from `u` to `v`, in the words of the lesson.
 * @param {Vec} u @param {Vec} v
 * @returns {Change}
 */
export function classify(u, v) {
  const a = toPolar(u).magnitude;
  const b = toPolar(v).magnitude;
  const eps = 1e-9;
  if (a < eps && b < eps) return 'dung-yen';
  if (a < eps) return 'bat-dau';
  if (b < eps) return 'dung-lai';
  const cross = clean(u.x * v.y - u.y * v.x);
  const dot = clean(u.x * v.x + u.y * v.y);
  if (Math.abs(cross) > eps) return 'doi-huong';
  if (dot < 0) return 'bat-nguoc';
  if (Math.abs(b - a) < eps) return 'khong-doi';
  return b > a ? 'nhanh-len' : 'cham-lai';
}

/**
 * How much the ball is squashed while the force acts, as a fraction of its
 * radius: a rubber ball dents clearly, a steel ball too little to see.
 * @param {BallId} ball @param {number} strength
 */
export function squash(ball, strength) {
  const b = BALLS.find((x) => x.id === ball) ?? BALLS[0];
  return clean(b.softness * Math.max(0, strength));
}

/** A dent smaller than this fraction of the radius cannot be seen by eye. */
export const VISIBLE_SQUASH = 0.05;
