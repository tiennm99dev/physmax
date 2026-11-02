/**
 * A cart let go at speed v0 on a level surface whose drag slows it at a constant
 * rate. With no drag the resultant force is zero and the speed never changes.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {{ id: string, label: string, drag: number }} Surface `drag` in m/s². */

/** @type {Surface[]} */
export const SURFACES = [
  { id: 'cat', label: 'Cát', drag: 3 },
  { id: 'tham', label: 'Thảm', drag: 1 },
  { id: 'go', label: 'Gỗ nhẵn', drag: 0.3 },
  { id: 'bang', label: 'Mặt băng', drag: 0.1 },
  { id: 'khong', label: 'Không ma sát', drag: 0 },
];

/** Longest animation, in seconds; a longer slide plays faster than real time. */
export const MAX_PLAY = 8;

/**
 * Seconds until the cart stops; Infinity with no drag.
 * @param {number} v0 @param {number} drag
 */
export function stopTime(v0, drag) {
  return drag === 0 ? Infinity : tidy(v0 / drag);
}

/**
 * Metres slid until it stops: v0²/(2a); Infinity with no drag.
 * @param {number} v0 @param {number} drag
 */
export function stopDistance(v0, drag) {
  return drag === 0 ? Infinity : tidy((v0 * v0) / (2 * drag));
}

/**
 * The cart's velocity and distance at time `t`, resting after it stops.
 * @param {number} v0 @param {number} drag @param {number} t
 * @returns {{ v: number, d: number }}
 */
export function cartAt(v0, drag, t) {
  const moving = Math.min(t, stopTime(v0, drag));
  return { v: tidy(v0 - drag * moving), d: tidy(v0 * moving - (drag * moving * moving) / 2) };
}

/**
 * How many simulated seconds to play per real second.
 * @param {number} v0 @param {number} drag
 */
export function playbackRate(v0, drag) {
  const total = stopTime(v0, drag);
  return Number.isFinite(total) ? Math.max(1, total / MAX_PLAY) : 1;
}

/**
 * Metre marks visible on the road while the camera has moved `offset` metres.
 * @param {number} offset @param {number} span metres in view @param {number} step
 * @returns {number[]}
 */
export function roadMarks(offset, span, step) {
  const marks = [];
  const first = Math.max(0, Math.ceil(offset / step));
  for (let i = first; i * step <= offset + span; i += 1) marks.push(i * step);
  return marks;
}
