/**
 * Centripetal force: a stone whirled on a string that flies off along the
 * tangent when the string is cut, and a car on a curve held by friction and the
 * tilt of the road.
 */
import { toRad } from '../_shared/circular.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** Half width and half height of the stone's board, in metres. */
export const BOARD = { x: 2.4, y: 2.13 };

/** How close to a target's centre the stone must pass to hit it, in metres. */
export const HIT_RADIUS = 0.3;

/** Targets outside the longest string, in metres from the hand. */
export const TARGETS = [
  { x: 1.9, y: 1.2 },
  { x: -1.9, y: -1.2 },
  { x: 0.3, y: 1.8 },
];

/** Mass of the car on the curve, in kg. */
export const CAR_MASS = 1000;

/** Assumed friction coefficients of the road surfaces. */
export const ROADS = [
  { value: 0.7, label: 'Đường khô' },
  { value: 0.4, label: 'Đường ướt' },
  { value: 0.3, label: 'Đường có bùn' },
];

/** Steepest tilt offered, in degrees; below every friction angle, so no car slides down. */
export const MAX_TILT = 15;

/**
 * @param {number} v m/s @param {number} r metres
 */
export const centripetal = (v, r) => (v * v) / r;

/**
 * @param {number} m kg @param {number} v m/s @param {number} r metres
 */
export const centripetalForce = (m, v, r) => m * centripetal(v, r);

/** @param {number} kmh */
export const toMs = (kmh) => kmh / 3.6;

/**
 * Where the stone leaves the string and the way it then goes, in metres with y
 * up. It turns counter-clockwise.
 * @param {number} theta radians @param {number} r metres
 */
export function cutPoint(theta, r) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
    dx: -Math.sin(theta),
    dy: Math.cos(theta),
  };
}

/**
 * Time until a stone moving from (`x`, `y`) along the unit vector (`dx`, `dy`)
 * at speed `v` reaches the edge of the board.
 * @param {{ x: number, y: number, dx: number, dy: number }} start @param {number} v
 */
export function exitTime({ x, y, dx, dy }, v) {
  const toEdge = (/** @type {number} */ p, /** @type {number} */ d, /** @type {number} */ half) =>
    Math.abs(d) < 1e-9 ? Infinity : ((d > 0 ? half : -half) - p) / d;
  return Math.min(toEdge(x, dx, BOARD.x), toEdge(y, dy, BOARD.y)) / v;
}

/**
 * The stone's straight flight after the cut: when it stops (at a target's edge
 * or the board's edge) and whether it hit.
 * @param {number} theta radians @param {number} r metres @param {number} v m/s
 * @param {{ x: number, y: number }} target
 * @returns {{ hit: boolean, time: number }}
 */
export function flight(theta, r, v, target) {
  const start = cutPoint(theta, r);
  const tx = target.x - start.x;
  const ty = target.y - start.y;
  const along = tx * start.dx + ty * start.dy;
  const off = Math.abs(tx * start.dy - ty * start.dx);
  if (along > 0 && off <= HIT_RADIUS) {
    const entry = along - Math.sqrt(HIT_RADIUS * HIT_RADIUS - off * off);
    return { hit: true, time: entry / v };
  }
  return { hit: false, time: exitTime(start, v) };
}

/**
 * Largest centripetal acceleration the road can give a car without sliding:
 * friction at its limit together with the tilt.
 * @param {number} mu friction coefficient @param {number} tiltDeg degrees
 */
export function maxCentripetal(mu, tiltDeg) {
  const tan = Math.tan(toRad(tiltDeg));
  return (G * (tan + mu)) / (1 - mu * tan);
}

/**
 * A car at `kmh` on a curve of radius `r`, with its needed and available forces.
 * @param {number} kmh @param {number} r metres @param {number} mu @param {number} tiltDeg
 * @returns {{ needed: number, available: number, holds: boolean, maxKmh: number, skidRadius: number }}
 */
export function curve(kmh, r, mu, tiltDeg) {
  const v = toMs(kmh);
  const limit = maxCentripetal(mu, tiltDeg);
  const needed = CAR_MASS * centripetal(v, r);
  const available = CAR_MASS * limit;
  return {
    needed,
    available,
    holds: needed <= available,
    maxKmh: Math.sqrt(limit * r) * 3.6,
    skidRadius: (v * v) / limit,
  };
}

/**
 * How far a path of pixel radius `radius` can turn from the bottom of its circle
 * and stay on a board, in radians, up to a quarter turn.
 * @param {number} radius @param {number} startX @param {number} startY path start
 * @param {number} right @param {number} top limits of the board
 */
export function sweepOnBoard(radius, startX, startY, right, top) {
  const room = Math.min(
    (right - startX) / radius >= 1 ? Math.PI / 2 : Math.asin((right - startX) / radius),
    (startY - top) / radius >= 1 ? Math.PI / 2 : Math.acos(1 - (startY - top) / radius),
  );
  return room;
}
