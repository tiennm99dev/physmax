/**
 * A virtual inclined aluminium track: a steel ball rolls from rest past two
 * photogates E and F. Gate positions are metres measured along the track from
 * the release point. Measured times carry a small seeded scatter, so the same
 * draw number always gives the same reading.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {'AB' | 'A' | 'B'} Mode */

export const BALL = 0.02; // ball diameter, m
export const TRACK = 1; // track length, m
export const GATE_STEP = 0.05;
export const MIN_GAP = 0.05;
export const GATE_E = /** @type {const} */ ({ min: 0.1, max: 0.8 });
export const GATE_F = /** @type {const} */ ({ min: 0.15, max: 0.95 });
export const CLOCK_ERROR = 0.0005; // half of the timer's 0,001 s scale, s
export const RULER_ERROR = 0.0005; // half of the ruler's 1 mm scale, m
export const CALIPER_ERROR = 0.00001; // half of the caliper's 0,02 mm scale, m

const G = 9.8;

/**
 * Acceleration of a ball rolling without slipping down a slope.
 * @param {number} tilt degrees
 */
export function acceleration(tilt) {
  return (5 / 7) * G * Math.sin((tilt * Math.PI) / 180);
}

/**
 * Time from release until the ball has rolled `x` metres.
 * @param {number} x @param {number} tilt
 */
export function timeAt(x, tilt) {
  return Math.sqrt((2 * x) / acceleration(tilt));
}

/**
 * Distance rolled at time `t`, stopped at the end of the track.
 * @param {number} t @param {number} tilt
 */
export function distanceAt(t, tilt) {
  return Math.min(TRACK, (acceleration(tilt) * t * t) / 2);
}

/**
 * The time the digital clock measures in a mode, without scatter. MODE A↔B
 * runs from gate E to gate F; MODE A and MODE B run while the ball blocks
 * gate E or gate F.
 * @param {Mode} mode @param {number} e @param {number} f @param {number} tilt
 */
export function idealTime(mode, e, f, tilt) {
  if (mode === 'AB') return timeAt(f, tilt) - timeAt(e, tilt);
  const gate = mode === 'A' ? e : f;
  return timeAt(gate + BALL, tilt) - timeAt(gate, tilt);
}

/**
 * Seeded scatter in [-1, 1].
 * @param {number} draw
 */
function scatter(draw) {
  const v = Math.sin(draw * 127.1 + 11.7) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}

/**
 * One clock reading, to 0,001 s.
 * @param {number} draw reading number, the seed of its scatter
 * @param {Mode} mode @param {number} e @param {number} f @param {number} tilt
 */
export function reading(draw, mode, e, f, tilt) {
  const spread = mode === 'AB' ? 0.003 : 0.001;
  const t = idealTime(mode, e, f, tilt) + scatter(draw) * spread;
  return Math.max(0.001, tidy(t, 3));
}

/**
 * Length measured in a mode and its instrument error.
 * @param {Mode} mode @param {number} e @param {number} f
 */
export function lengthOf(mode, e, f) {
  return mode === 'AB'
    ? { length: tidy(f - e), error: RULER_ERROR }
    : { length: BALL, error: CALIPER_ERROR };
}

/**
 * Speed and its error from repeated readings, the way the book's lesson on
 * measurement errors does it: delta v = delta s + delta t.
 * @param {number[]} readings at least one
 * @param {number} length @param {number} lengthError
 */
export function analyze(readings, length, lengthError) {
  const n = readings.length;
  const mean = tidy(readings.reduce((sum, t) => sum + t, 0) / n, 3);
  const randomError = readings.reduce((sum, t) => sum + Math.abs(t - mean), 0) / n;
  const timeError = randomError + CLOCK_ERROR;
  const relative = lengthError / length + timeError / mean;
  const speed = length / mean;
  return {
    n,
    mean,
    randomError: tidy(randomError, 6),
    timeError: tidy(timeError, 6),
    relative,
    speed: tidy(speed, 3),
    speedError: Math.max(0.001, tidy(relative * speed, 3)),
  };
}

/**
 * What the three measured speeds show, as rich text; null until all three exist.
 * @param {{ AB?: number, A?: number, B?: number }} speeds
 */
export function compareNote(speeds) {
  if (speeds.AB === undefined || speeds.A === undefined || speeds.B === undefined) return null;
  if (speeds.A < speeds.AB && speeds.AB < speeds.B) {
    return 'Tốc độ tại $E$ < tốc độ trung bình từ $E$ đến $F$ < tốc độ tại $F$: viên bi chạy nhanh dần khi lăn xuống máng.';
  }
  return 'Các tốc độ đang rất gần nhau, sai số che mất sự khác biệt. Thử dời hai cổng ra xa nhau hơn.';
}

/**
 * Keeps gate E inside its range and at least the minimum gap before gate F.
 * @param {number} e @param {number} f
 */
export function clampE(e, f) {
  return tidy(Math.min(GATE_E.max, f - MIN_GAP, Math.max(GATE_E.min, e)));
}

/**
 * Keeps gate F inside its range and at least the minimum gap after gate E.
 * @param {number} f @param {number} e
 */
export function clampF(f, e) {
  return tidy(Math.max(GATE_F.min, e + MIN_GAP, Math.min(GATE_F.max, f)));
}
