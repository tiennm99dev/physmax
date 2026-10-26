/**
 * Measuring speed: a toy car runs at a steady speed along a track with a
 * ruler, past gate A and gate B. The time between A and B is read on a
 * digital timer driven by photogates, or on a hand stopwatch; then v = s/t.
 * A roadside speed camera does the same with two marks a known distance
 * apart. Lengths on the track are in cm, times in s, speeds in m/s.
 */
import { speed, toKmh } from '../_shared/speed.js';

/** Ruler mark (cm) where gate A stands. */
export const GATE_A = 20;

/** Length of the drawn track (cm). */
export const TRACK = 140;

/** Steady speeds (m/s) of the cars the learner can send down the track. */
export const CARS = [0.32, 0.45, 0.27, 0.51, 0.38];

/**
 * True time (s) the car takes to cover `d` cm at `v` m/s.
 * @param {number} d @param {number} v
 */
export function travelTime(d, v) {
  return d / 100 / v;
}

/**
 * Where the car's front is (cm on the ruler) `t` seconds after it passes the
 * start of the track at `v` m/s, capped at the end.
 * @param {number} v @param {number} t
 */
export function frontAt(v, t) {
  if (t <= 0) return 0;
  return Math.min(TRACK, v * 100 * t);
}

/**
 * What the digital timer (scale 9,999 s – 0,001 s) shows for a time `t`:
 * cut to the 0,001 s division, or null past 9,999 s.
 * @param {number} t
 */
export function timerReading(t) {
  if (t > 9.999) return null;
  return Math.floor(t * 1000 + 1e-9) / 1000;
}

/**
 * What a hand stopwatch with a 0,01 s division shows between two presses.
 * @param {number} start @param {number} stop
 */
export function stopwatchReading(start, stop) {
  return Math.floor(Math.max(0, stop - start) * 100 + 1e-9) / 100;
}

/**
 * Speed from a measured distance (cm) and time (s), in m/s.
 * @param {number} dCm @param {number} t
 */
export function measuredSpeed(dCm, t) {
  return speed(dCm / 100, t);
}

/** Distance between the two marks on the road watched by the speed camera (m). */
export const MARKS = 5;

/** Speed limit on that road (km/h). */
export const LIMIT = 60;

/** Times (s) the camera records for the cars that pass, one after another. */
export const CAMERA_TIMES = [0.35, 0.28, 0.32, 0.25, 0.4, 0.3, 0.27];

/**
 * The camera's verdict for a car that takes `t` seconds between the marks.
 * At exactly the limit the car is not speeding.
 * @param {number} t
 */
export function cameraCheck(t) {
  const v = speed(MARKS, t);
  const kmh = toKmh(v);
  return { v, kmh, over: kmh > LIMIT + 1e-9 };
}
