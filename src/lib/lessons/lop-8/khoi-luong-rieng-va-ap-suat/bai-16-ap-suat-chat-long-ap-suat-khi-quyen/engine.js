/**
 * Liquid and air pressure for the lesson's three widgets: a pressure sensor
 * lowered into a tank (p = d·h, the same whichever way the membrane faces),
 * the communicating vessels whose levels settle to one height, and the
 * glass of water turned over under a sheet of paper.
 */
import { specificWeight, tidy } from '../_shared/materials.js';

/** Depth range of the tank, in cm. */
export const TANK_DEPTH = 100;

/** Atmospheric pressure at sea level, about 101 300 Pa. */
export const ATM = 101300;

/**
 * Pressure of a liquid at a depth, p = d·h with d = 10D (N/m³), h in m.
 * @param {number} density kg/m³
 * @param {number} depthCm
 * @returns {number} Pa
 */
export function liquidPressure(density, depthCm) {
  if (depthCm < 0) throw new Error('Depth must not be negative');
  return tidy((specificWeight(density) * depthCm) / 100);
}

/**
 * Communicating vessels with two branches of equal cross-section, joined at
 * the bottom by a valve. Once it is open, the liquid flows from the higher
 * level to the lower one until both stand at the mean level.
 * @param {number} left level in cm
 * @param {number} right level in cm
 */
export function settledLevel(left, right) {
  return tidy((left + right) / 2);
}

/**
 * Which way the liquid flows through the open valve.
 * @param {number} left
 * @param {number} right
 * @returns {'trai-sang-phai' | 'phai-sang-trai' | 'dung-yen'}
 */
export function flowDirection(left, right) {
  if (Math.abs(left - right) < 1e-6) return 'dung-yen';
  return left > right ? 'trai-sang-phai' : 'phai-sang-trai';
}

/**
 * Moves both levels toward the settled level by at most `step` cm each.
 * @param {number} left
 * @param {number} right
 * @param {number} step
 * @returns {[number, number]}
 */
export function flowStep(left, right, step) {
  const mean = settledLevel(left, right);
  const move = Math.min(step, Math.abs(left - mean));
  if (move === 0) return [left, right];
  const sign = left > right ? -1 : 1;
  const l = tidy(left + sign * move);
  const r = tidy(right - sign * move);
  return Math.abs(l - mean) < 1e-6 ? [mean, mean] : [l, r];
}

/**
 * @typedef {'ngua' | 'nghieng' | 'up'} CupPosition
 * @typedef {{ stays: boolean, reason: string }} CupResult
 */

/**
 * The glass filled with water, maybe covered by a sheet of paper, turned to
 * a position, in normal air or under a bell jar with the air pumped out.
 * @param {CupPosition} position
 * @param {boolean} paper
 * @param {boolean} air
 * @returns {CupResult}
 */
export function cupOutcome(position, paper, air) {
  if (position === 'ngua') {
    return { stays: true, reason: 'Cốc để ngửa: nước nằm yên trong cốc nhờ đáy cốc đỡ.' };
  }
  if (!paper) {
    return { stays: false, reason: 'Không có tờ giấy đậy, nước chảy ra ngay.' };
  }
  if (!air) {
    return {
      stays: false,
      reason:
        'Không còn không khí bên ngoài nên không có áp suất khí quyển đẩy tờ giấy: tờ giấy rơi, nước đổ ra.',
    };
  }
  return {
    stays: true,
    reason:
      'Áp suất khí quyển (khoảng 101 300 Pa) đẩy tờ giấy theo mọi phương, lớn hơn nhiều áp suất của lớp nước trong cốc lên tờ giấy (khoảng 1000 Pa), nên giữ được nước.',
  };
}
