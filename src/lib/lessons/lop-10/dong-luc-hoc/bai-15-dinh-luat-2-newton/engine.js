/**
 * A cart pulled from rest along a measured track. The timer reads to 0.01 s, so
 * each acceleration comes from a real rounded reading: a = 2d/t².
 */
import { tidy } from '#lib/core/number-format.js';

/** Length of the track, in metres. */
export const TRACK = 1;
export const FORCES = [1, 2, 3, 4, 5];
export const MASSES = [0.5, 1, 1.5, 2, 2.5];

/** @typedef {{ force: number, mass: number, time: number, acceleration: number }} Reading */
/** @typedef {{ x: number, y: number }} DataPoint */

/**
 * Time the cart takes from rest to the end of the track, exact.
 * @param {number} force @param {number} mass
 */
export function travelTime(force, mass) {
  return Math.sqrt((2 * TRACK * mass) / force);
}

/**
 * One run: the timer reading, and the acceleration worked out from it.
 * @param {number} force @param {number} mass
 * @returns {Reading}
 */
export function measure(force, mass) {
  const time = tidy(travelTime(force, mass), 2);
  return { force, mass, time, acceleration: tidy((2 * TRACK) / (time * time), 2) };
}

/**
 * Adds a reading, replacing an earlier run of the same force and mass.
 * @param {Reading[]} readings @param {Reading} reading
 * @returns {Reading[]}
 */
export function record(readings, reading) {
  const others = readings.filter((r) => r.force !== reading.force || r.mass !== reading.mass);
  return [...others, reading];
}

/**
 * Readings at one mass as (F, a) points, by increasing force.
 * @param {Reading[]} readings @param {number} mass
 * @returns {DataPoint[]}
 */
export function forceSeries(readings, mass) {
  return readings
    .filter((r) => r.mass === mass)
    .map((r) => ({ x: r.force, y: r.acceleration }))
    .sort((a, b) => a.x - b.x);
}

/**
 * Readings at one force as (1/m, a) points, by increasing 1/m.
 * @param {Reading[]} readings @param {number} force
 * @returns {DataPoint[]}
 */
export function massSeries(readings, force) {
  return readings
    .filter((r) => r.force === force)
    .map((r) => ({ x: tidy(1 / r.mass, 3), y: r.acceleration }))
    .sort((a, b) => a.x - b.x);
}

/**
 * Least-squares slope of the line through the origin, or null without data.
 * @param {DataPoint[]} points
 */
export function slopeThroughOrigin(points) {
  const xx = points.reduce((sum, p) => sum + p.x * p.x, 0);
  if (xx === 0) return null;
  return points.reduce((sum, p) => sum + p.x * p.y, 0) / xx;
}
