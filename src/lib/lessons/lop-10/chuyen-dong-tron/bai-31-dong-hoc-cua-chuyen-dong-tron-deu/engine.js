/**
 * Uniform circular motion of points on a wheel: one angular speed for the whole
 * wheel, a linear speed that grows with the distance from the centre.
 */
import { tidy } from '#lib/core/number-format.js';
import { TAU } from '../_shared/circular.js';

/** Radius of the wheel on the board, in metres. */
export const WHEEL_RADIUS = 0.5;

/** Speeds the learner is asked to give point A, in m/s. */
export const SPEED_GOALS = [0.6, 1, 0.3, 1.2];

/** @param {number} rpm revolutions per minute */
export const omegaFromRpm = (rpm) => (rpm * TAU) / 60;

/** @param {number} omega rad/s */
export const periodOf = (omega) => TAU / omega;

/** @param {number} omega rad/s */
export const frequencyOf = (omega) => omega / TAU;

/**
 * A point at distance `r` from the axis after turning for `t` seconds.
 * @param {number} r metres @param {number} omega rad/s @param {number} t seconds
 * @returns {{ theta: number, s: number, v: number }}
 */
export function wheelPoint(r, omega, t) {
  const theta = omega * t;
  return { theta, s: r * theta, v: tidy(omega * r) };
}

/**
 * Which of two points on one wheel is faster and by what factor.
 * @param {number} rA @param {number} rB metres, positive
 * @returns {{ faster: 'A' | 'B' | null, ratio: number }}
 */
export function compareSpeeds(rA, rB) {
  if (Math.abs(rA - rB) < 1e-9) return { faster: null, ratio: 1 };
  return rA > rB ? { faster: 'A', ratio: rA / rB } : { faster: 'B', ratio: rB / rA };
}

/**
 * Whole turns finished after turning through `theta`.
 * @param {number} theta radians
 */
export const lapsDone = (theta) => Math.floor(theta / TAU + 1e-9);

/**
 * The angle of a point on the circle within one turn, in [0, 2π).
 * @param {number} dx rightward from the centre @param {number} dy downward, in pixels
 */
export function angleFrom(dx, dy) {
  const a = Math.atan2(-dy, dx);
  return a < 0 ? a + TAU : a;
}
