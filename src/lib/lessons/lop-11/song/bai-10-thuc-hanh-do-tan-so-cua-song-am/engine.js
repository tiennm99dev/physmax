/**
 * A virtual oscilloscope showing the sound of a tuning fork picked up by a
 * microphone. The screen is DIVS_X divisions wide; the TIME/DIV knob sets how
 * many milliseconds one horizontal division stands for. The learner reads how
 * many divisions some whole number of periods take, works out T and f, and
 * types f to check it.
 */
import { tidy } from '#lib/core/number-format.js';

/** Horizontal and vertical divisions of the screen. */
export const DIVS_X = 10;
export const DIVS_Y = 8;

/** TIME/DIV settings in milliseconds per division. */
export const TIME_DIVS = [0.1, 0.2, 0.5, 1, 2];

/** Tuning forks with hidden frequencies, in Hz. */
export const FORKS = [
  { value: 'a', label: 'Âm thoa 1', frequency: 400 },
  { value: 'b', label: 'Âm thoa 2', frequency: 250 },
  { value: 'c', label: 'Âm thoa 3', frequency: 500 },
  { value: 'd', label: 'Âm thoa 4', frequency: 320 },
];

/** Period in milliseconds. @param {number} frequency Hz */
export const periodMs = (frequency) => tidy(1000 / frequency);

/**
 * How many horizontal divisions one period covers at a TIME/DIV setting.
 * @param {number} frequency Hz @param {number} timeDiv ms per division
 */
export const divisionsPerPeriod = (frequency, timeDiv) => tidy(periodMs(frequency) / timeDiv);

/**
 * The trace on the screen in division units: x from 0 to DIVS_X, y in
 * divisions from the centre line, a sine starting upward at x = 0.
 * @param {number} frequency Hz @param {number} timeDiv ms per division
 * @param {number} height amplitude in divisions
 * @param {number} [samples]
 */
export function trace(frequency, timeDiv, height, samples = 400) {
  const per = divisionsPerPeriod(frequency, timeDiv);
  return Array.from({ length: samples + 1 }, (_, i) => {
    const x = (DIVS_X * i) / samples;
    return { x, y: tidy(height * Math.sin((2 * Math.PI * x) / per)) };
  });
}

/**
 * Whether a TIME/DIV setting shows between one and ten whole periods on the
 * screen, so a reading is possible.
 * @param {number} frequency @param {number} timeDiv
 */
export function readable(frequency, timeDiv) {
  const periods = DIVS_X / divisionsPerPeriod(frequency, timeDiv);
  return periods >= 1 && periods <= 10;
}

/**
 * Judges a typed frequency against the fork: within 3 % is a good reading.
 * @param {number} guess Hz @param {number} frequency Hz
 * @returns {{ ok: boolean, error: number }} error as a percentage
 */
export function judgeFrequency(guess, frequency) {
  const error = tidy((Math.abs(guess - frequency) / frequency) * 100, 2);
  return { ok: error <= 3, error };
}

/**
 * Mean and mean absolute deviation of repeated readings, the book's way of
 * writing a result as f̄ ± Δf.
 * @param {number[]} values
 */
export function meanAndError(values) {
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const delta = values.reduce((s, v) => s + Math.abs(v - mean), 0) / values.length;
  return { mean: tidy(mean), delta: tidy(delta) };
}
