/**
 * The virtual thermometer. Temperatures are in °C. A liquid thermometer
 * works because the liquid expands when it warms and contracts when it cools;
 * the column takes a little while to reach the temperature of what it is in.
 * A clinical thermometer has a narrow neck above the bulb, so its column only
 * rises: it keeps the highest reading until it is shaken down.
 */
import { convert } from '#lib/domain/temperature.js';

/**
 * @typedef {{
 *   id: 'ruou' | 'thuy-ngan' | 'y-te',
 *   name: string,
 *   min: number,
 *   max: number,
 *   major: number,
 *   division: number,
 *   keepsMax: boolean,
 *   liquid: string,
 * }} Thermometer
 */
/** @typedef {{ id: string, name: string, temp: number }} Sample */

/** @type {Thermometer[]} */
export const THERMOMETERS = [
  {
    id: 'ruou',
    name: 'Nhiệt kế rượu: GHĐ 60 °C, ĐCNN 1 °C',
    min: -30,
    max: 60,
    major: 10,
    division: 1,
    keepsMax: false,
    liquid: '#dc2626',
  },
  {
    id: 'thuy-ngan',
    name: 'Nhiệt kế thuỷ ngân: GHĐ 110 °C, ĐCNN 1 °C',
    min: -10,
    max: 110,
    major: 10,
    division: 1,
    keepsMax: false,
    liquid: '#64748b',
  },
  {
    id: 'y-te',
    name: 'Nhiệt kế y tế: GHĐ 42 °C, ĐCNN 0,1 °C',
    min: 35,
    max: 42,
    major: 1,
    division: 0.1,
    keepsMax: true,
    liquid: '#64748b',
  },
];

/** @type {Sample[]} */
export const SAMPLES = [
  { id: 'nuoc-da', name: 'Nước đá đang tan', temp: 0 },
  { id: 'nuoc-phong', name: 'Nước để lâu trong phòng', temp: 27 },
  { id: 'nuoc-am', name: 'Nước ấm', temp: 45 },
  { id: 'nuoc-soi', name: 'Nước đang sôi', temp: 100 },
  { id: 'nach', name: 'Nách bạn Nam (đang sốt)', temp: 38.6 },
  { id: 'nach-khoe', name: 'Nách bạn Lan (khoẻ mạnh)', temp: 36.8 },
];

/** Room temperature, °C. */
export const ROOM = 27;

/** Time constant of the column, in seconds. */
export const TAU = 1;

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e6) / 1e6;

/**
 * Round a temperature to the nearest division.
 * @param {number} t @param {number} division
 */
export function toDivision(t, division) {
  return tidy(Math.round(tidy(t / division)) * division);
}

/**
 * The column temperature `dt` seconds later, moving toward `target`.
 * @param {Thermometer} th @param {number} level @param {number} target @param {number} dt
 */
export function step(th, level, target, dt) {
  if (th.keepsMax && target <= level) return level;
  const next = target + (level - target) * Math.exp(-dt / TAU);
  return Math.abs(next - target) < 1e-3 ? target : next;
}

/**
 * Where the column starts when a thermometer is picked up: at room
 * temperature, or at the bottom of the scale for a shaken clinical one.
 * @param {Thermometer} th
 */
export function restLevel(th) {
  return th.keepsMax ? th.min : ROOM;
}

/**
 * Whether the thermometer may be put into the sample: never above its range,
 * or the liquid overflows the tube and the glass can crack.
 * @param {Thermometer} th @param {Sample} sample
 */
export function safeFor(th, sample) {
  return sample.temp <= th.max;
}

/** @typedef {'ngoai-ghd' | 'chua-vay' | 'chua-on-dinh' | 'sai-so' | 'dung'} Verdict */

/**
 * Judge a recorded reading (°C) in the order the steps of measuring give.
 * @param {{ th: Thermometer, sample: Sample, level: number, typed: number }} m
 * @returns {Verdict}
 */
export function judge({ th, sample, level, typed }) {
  if (sample.temp < th.min || sample.temp > th.max) return 'ngoai-ghd';
  if (th.keepsMax && level > sample.temp + th.division / 2) return 'chua-vay';
  if (Math.abs(level - sample.temp) > th.division / 2) return 'chua-on-dinh';
  if (Math.abs(typed - toDivision(sample.temp, th.division)) > 1e-9) return 'sai-so';
  return 'dung';
}

/**
 * The same temperature on the Fahrenheit scale and on the Kelvin scale with
 * the school offset 273.
 * @param {number} c
 */
export function otherScales(c) {
  return {
    f: tidy(convert(c, 'C', 'F')),
    k: tidy(convert(c, 'C', 'K', { exactKelvin: false })),
  };
}
