/**
 * Kinetic and gravitational potential energy on a frictionless roller coaster
 * released from rest at its highest point, and the work-energy theorem for a
 * constant force along a straight road.
 */
import { tidy } from '#lib/core/number-format.js';
import { kinetic } from '#lib/domain/energy.js';

export { kinetic };

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

export const TRACK_LENGTH = 100;

/** Heights in metres of the track at its crests and dips, smoothly joined. */
export const TRACK = [
  { x: 0, h: 30 },
  { x: 30, h: 5 },
  { x: 55, h: 20 },
  { x: 80, h: 8 },
  { x: 100, h: 16 },
];

/** The lowest height on the track, offered as a second zero level. */
export const LOWEST = 5;

/**
 * The stretch of track holding `x`, and how far along it `x` is.
 * @param {number} x
 */
function stretchAt(x) {
  const at = Math.max(0, Math.min(TRACK_LENGTH, x));
  let i = 0;
  while (i < TRACK.length - 2 && at > TRACK[i + 1].x) i += 1;
  const a = TRACK[i];
  const b = TRACK[i + 1];
  return { a, b, u: (at - a.x) / (b.x - a.x) };
}

/**
 * Height of the track in metres.
 * @param {number} x metres along the ground
 */
export function heightAt(x) {
  const { a, b, u } = stretchAt(x);
  return a.h + (b.h - a.h) * u * u * (3 - 2 * u);
}

/**
 * Slope dh/dx of the track.
 * @param {number} x
 */
export function slopeAt(x) {
  const { a, b, u } = stretchAt(x);
  return ((b.h - a.h) * 6 * u * (1 - u)) / (b.x - a.x);
}

/**
 * Speed at `x` of a car released from rest at the top, with no friction.
 * @param {number} x
 */
export const speedAt = (x) => Math.sqrt(Math.max(0, 2 * G * (TRACK[0].h - heightAt(x))));

/**
 * Moves the car along the track. A car at rest at the top gets a small nudge,
 * which is what sets it going.
 * @param {number} x @param {number} dt seconds
 */
export function advance(x, dt) {
  const v = Math.max(speedAt(x), 1.5);
  return Math.min(TRACK_LENGTH, x + (v * dt) / Math.hypot(1, slopeAt(x)));
}

/**
 * The next crest or dip after `x`, for stepping along the track without motion.
 * @param {number} x
 */
export function nextPoint(x) {
  return (TRACK.find((p) => p.x > x + 1e-6) ?? TRACK[TRACK.length - 1]).x;
}

/**
 * Gravitational potential energy in joules, with `h` measured from the zero level.
 * @param {number} m kg @param {number} h m
 */
export const potential = (m, h) => tidy(m * G * h);

/**
 * A constant force along the motion over a distance. A resisting force (F < 0)
 * that uses up all the kinetic energy stops the body early.
 * @param {number} m kg @param {number} v0 m/s @param {number} force N, signed along the motion
 * @param {number} distance m
 * @returns {{ start: number, work: number, end: number, speed: number, travelled: number, stopped: boolean }}
 */
export function afterForce(m, v0, force, distance) {
  const start = kinetic(m, v0);
  const full = force * distance;
  if (start + full < 0) {
    return { start, work: 0 - start, end: 0, speed: 0, travelled: start / -force, stopped: true };
  }
  const end = tidy(start + full);
  return {
    start,
    work: full,
    end,
    speed: Math.sqrt((2 * end) / m),
    travelled: distance,
    stopped: false,
  };
}
