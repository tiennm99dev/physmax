/**
 * A throw with no air drag, in metres and seconds, g = 9,8 m/s². x runs along
 * the ground from the throw, y up from the ground. A horizontal throw has
 * angle 0 and a height; an oblique throw starts on the ground.
 */
import { tidy } from '#lib/core/number-format.js';

export const G = 9.8;
export const TARGETS = [30, 55, 75, 20, 45];
export const HIT_MARGIN = 2;

/** @typedef {{ v0: number, angle: number, height: number }} Throw */

/** @param {number} deg */
const rad = (deg) => (deg * Math.PI) / 180;

/**
 * The two constant parts of the launch velocity.
 * @param {Throw} shot
 */
export function components({ v0, angle }) {
  return { vx: tidy(v0 * Math.cos(rad(angle)), 6), vy0: tidy(v0 * Math.sin(rad(angle)), 6) };
}

/**
 * Time in the air: until y falls back to 0.
 * @param {Throw} shot
 */
export function flightTime(shot) {
  const { vy0 } = components(shot);
  return (vy0 + Math.sqrt(vy0 * vy0 + 2 * G * shot.height)) / G;
}

/**
 * Horizontal reach, L in the book.
 * @param {Throw} shot
 */
export function rangeOf(shot) {
  return tidy(components(shot).vx * flightTime(shot), 6);
}

/**
 * Greatest height above the ground, H in the book for an oblique throw.
 * @param {Throw} shot
 */
export function peakOf(shot) {
  const { vy0 } = components(shot);
  return tidy(shot.height + (vy0 * vy0) / (2 * G), 6);
}

/**
 * Position and velocity at time `t`, clamped to the flight.
 * @param {Throw} shot @param {number} t
 */
export function stateAt(shot, t) {
  const time = Math.max(0, Math.min(t, flightTime(shot)));
  const { vx, vy0 } = components(shot);
  const vy = vy0 - G * time;
  return {
    t: time,
    x: vx * time,
    y: Math.max(0, shot.height + vy0 * time - (G * time * time) / 2),
    vx,
    vy,
    speed: Math.hypot(vx, vy),
  };
}

/**
 * Points of the path from the throw up to time `upTo`.
 * @param {Throw} shot @param {number} upTo @param {number} [count]
 */
export function pathTo(shot, upTo, count = 60) {
  const end = Math.max(0, Math.min(upTo, flightTime(shot)));
  return Array.from({ length: count + 1 }, (_, i) => stateAt(shot, (end * i) / count));
}

/**
 * Height of a body dropped at the same moment from the height of the throw.
 * @param {Throw} shot @param {number} t
 */
export function droppedHeight(shot, t) {
  return Math.max(0, shot.height - (G * t * t) / 2);
}

/**
 * How a finished throw landed against the target, as rich text.
 * @param {number} range @param {number} target
 */
export function landingNote(range, target) {
  const miss = range - target;
  if (Math.abs(miss) <= HIT_MARGIN) return { hit: true, text: 'Trúng bia!' };
  return miss > 0
    ? { hit: false, text: 'Bóng bay quá bia. Giảm $v_0$ hoặc đổi góc ném.' }
    : { hit: false, text: 'Bóng rơi trước bia. Tăng $v_0$ hoặc đưa góc ném lại gần $45^\\circ$.' };
}
