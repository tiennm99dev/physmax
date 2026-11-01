/**
 * Virtual repeated measurement of a ball's diameter: readings snapped to the
 * instrument's smallest division, with random operator scatter and an optional
 * zero error, then the book's error calculation and result line.
 */

import { rng } from '#lib/core/drill.js';
import { formatFixed, formatNumber, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {object} Instrument
 * @property {string} id
 * @property {string} label
 * @property {number} step smallest division, in mm
 * @property {number} places decimals of the smallest division's place
 * @property {number} spread largest random scatter of one reading, in mm
 * @property {number} zeroError shift of every reading when the zero mark is off, in mm
 */

/** @type {Instrument[]} */
export const INSTRUMENTS = [
  { id: 'thuoc', label: 'Thước kẻ (1 mm)', step: 1, places: 0, spread: 0.8, zeroError: 2 },
  { id: 'kep', label: 'Thước kẹp (0,05 mm)', step: 0.05, places: 2, spread: 0.06, zeroError: 0.3 },
  { id: 'panme', label: 'Panme (0,01 mm)', step: 0.01, places: 2, spread: 0.015, zeroError: 0.05 },
];

/** True diameters of the virtual balls, in mm. */
export const BALLS = [15.87, 12.34, 20.02];

/**
 * @param {number} value @param {number} places
 * @returns {number} rounded half up to `places` decimals, free of binary noise
 */
export function roundTo(value, places) {
  const scale = 10 ** places;
  return tidy(Math.round(tidy(value * scale, 6)) / scale, places);
}

/**
 * One reading of a ball. The same `draw` always gives the same reading.
 * @param {number} draw counts the readings taken so far
 * @param {number} diameter true diameter, in mm
 * @param {Instrument} instrument
 * @param {boolean} shifted whether the zero mark is off
 * @returns {number} the reading, in mm
 */
export function reading(draw, diameter, instrument, shifted) {
  const rand = rng(draw * 7919 + 17);
  const scatter = instrument.spread * (2 * rand() - 1);
  const raw = diameter + scatter + (shifted ? instrument.zeroError : 0);
  return tidy(Math.round(raw / instrument.step) * instrument.step, 6);
}

/**
 * The book's calculation for a direct measurement: the mean, each reading's
 * deviation, their mean, the instrument error (half a division), the absolute
 * error rounded to the division's place, and the relative error from the
 * rounded values.
 * @param {number[]} readings at least one reading
 * @param {Instrument} instrument
 */
export function analyze(readings, instrument) {
  const n = readings.length;
  const mean = tidy(readings.reduce((sum, r) => sum + r, 0) / n, 6);
  const deviations = readings.map((r) => tidy(Math.abs(mean - r), 6));
  const meanDeviation = tidy(deviations.reduce((sum, d) => sum + d, 0) / n, 6);
  const toolError = tidy(instrument.step / 2, 6);
  const rawError = tidy(meanDeviation + toolError, 6);
  const error = roundTo(rawError, instrument.places);
  const roundedMean = roundTo(mean, instrument.places);
  const relative = tidy((error / roundedMean) * 100, 6);
  return { n, mean, deviations, meanDeviation, toolError, rawError, error, roundedMean, relative };
}

/** @typedef {ReturnType<typeof analyze>} Analysis */

/**
 * The result line, written the book's way.
 * @param {Analysis} stats @param {Instrument} instrument
 */
export function resultLine(stats, instrument) {
  const { places } = instrument;
  return `d = ${formatFixed(stats.roundedMean, places)} ± ${formatFixed(stats.error, places)} mm`;
}

/**
 * Whether the true value lies in the band of the result.
 * @param {Analysis} stats @param {number} diameter
 */
export function covers(stats, diameter) {
  return Math.abs(tidy(diameter - stats.roundedMean, 6)) <= stats.error;
}

/**
 * What the comparison with the true value means. Only a zero error is
 * systematic; with a good zero mark, a miss comes from too few readings, and
 * with a bad one, a hit comes only from a wide band.
 * @param {boolean} covered whether the band of the result holds the true value
 * @param {boolean} shifted whether the zero mark is off
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function trueValueNote(covered, shifted) {
  if (shifted && !covered) {
    return {
      tone: 'warn',
      text: 'Giá trị thật nằm ngoài khoảng kết quả. Đây là sai số hệ thống do vạch $0$ bị lệch: đo thêm bao nhiêu lần cũng không hết, phải hiệu chỉnh dụng cụ.',
    };
  }
  if (shifted) {
    return {
      tone: 'warn',
      text: 'Lần này khoảng kết quả rộng nên vẫn chứa giá trị thật, nhưng vạch $0$ bị lệch làm mọi số đo lệch về một phía: vẫn phải hiệu chỉnh dụng cụ.',
    };
  }
  if (!covered) {
    return {
      tone: 'warn',
      text: 'Vạch $0$ đúng mà giá trị thật vẫn nằm ngoài khoảng kết quả: với ít lần đo, sai số ngẫu nhiên có thể làm các số đo cùng lệch một phía. Đo thêm vài lần rồi xem lại.',
    };
  }
  return { tone: 'ok', text: 'Giá trị thật nằm trong khoảng kết quả: phép đo đáng tin cậy.' };
}

/**
 * The correct result line among lines with the usual mistakes: unrounded
 * numbers, or the instrument error left out. The position of the correct line
 * moves with the number of readings.
 * @param {Analysis} stats @param {Instrument} instrument
 * @returns {{ options: string[], answer: number }}
 */
export function resultChoices(stats, instrument) {
  const { places } = instrument;
  const correct = resultLine(stats, instrument);
  const candidates = [
    `d = ${formatNumber(stats.mean, 4)} ± ${formatNumber(stats.rawError, 4)} mm`,
    `d = ${formatFixed(stats.roundedMean, places)} ± ${formatNumber(stats.toolError, 4)} mm`,
    `d = ${formatFixed(stats.roundedMean, places + 1)} ± ${formatFixed(stats.error, places)} mm`,
  ];
  const wrong = [...new Set(candidates)].filter((line) => line !== correct);
  const at = stats.n % (wrong.length + 1);
  const options = [...wrong.slice(0, at), correct, ...wrong.slice(at)];
  return { options, answer: at };
}
