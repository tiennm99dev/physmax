/**
 * Power as the rate of doing work: lifting a person the same height quickly or
 * slowly takes the same work and a different power, and an engine of a given
 * power trades pulling force against speed, P = F·v.
 */
import { tidy } from '#lib/core/number-format.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** Watts in one horsepower, as the book's exercises take it. */
export const HP = 746;

/** Height of one floor of the drawn building, in metres. */
export const FLOOR_H = 3;

/** How many times faster than real time the climb is played. */
export const REPLAY_SPEED = 5;

/**
 * Work to lift a mass steadily through a height, in joules.
 * @param {number} mass kg @param {number} height m
 */
export const liftWork = (mass, height) => tidy(mass * G * height);

/**
 * Average power in watts.
 * @param {number} work J @param {number} time s
 */
export const powerOf = (work, time) => (time > 0 ? tidy(work / time) : 0);

/**
 * Height reached at elapsed time `t` by a climb of `height` lasting `duration`.
 * @param {number} height @param {number} duration @param {number} t
 */
export const heightAt = (height, duration, t) => height * Math.min(1, t / duration);

/** Gears of a car at one engine speed: higher gear, higher road speed. */
export const GEARS = [
  { value: 1, label: 'Số 1', speed: 8 },
  { value: 2, label: 'Số 2', speed: 14 },
  { value: 3, label: 'Số 3', speed: 20 },
  { value: 4, label: 'Số 4', speed: 28 },
  { value: 5, label: 'Số 5', speed: 36 },
];

/** Roads and the steady pull each needs, in newtons. */
export const ROADS = [
  { value: 'bang', label: 'Đường bằng', need: 1500 },
  { value: 'thoai', label: 'Dốc thoải', need: 3000 },
  { value: 'dung', label: 'Dốc đứng', need: 6000 },
];

/**
 * Pulling force of an engine delivering `power` at road speed `speed`.
 * @param {number} power W @param {number} speed m/s
 */
export const pullOf = (power, speed) => tidy(power / speed);

/**
 * The highest gear that still pulls hard enough for the road, or null if none does.
 * @param {number} power W @param {number} need N
 */
export function bestGear(power, need) {
  const able = GEARS.filter((g) => pullOf(power, g.speed) >= need);
  return able.length ? able[able.length - 1] : null;
}
