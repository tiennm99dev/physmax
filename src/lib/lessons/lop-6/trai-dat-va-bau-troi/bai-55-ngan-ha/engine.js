/**
 * A journey out from the Earth, measured by how long light takes to cover
 * the distance. Light travels about 300 000 km every second; a light-year is
 * the distance it covers in one year of 365 days:
 *
 *   300 000 km/s × 365 × 24 × 3 600 s = 9 460 800 000 000 km ≈ 9 461 tỉ km.
 *
 * Distances to stars and galaxies are rounded textbook values.
 */

import { fmt, formatNumber } from '#lib/core/number-format.js';

/** Speed of light, km per second (rounded). */
export const LIGHT_KM_S = 300000;
export const SECONDS_PER_DAY = 24 * 3600;
export const SECONDS_PER_YEAR = 365 * SECONDS_PER_DAY;
/** One light-year in km. */
export const LIGHT_YEAR_KM = LIGHT_KM_S * SECONDS_PER_YEAR;

/** @param {number} ly */
export function kmFromLy(ly) {
  return ly * LIGHT_YEAR_KM;
}

/** @param {number} km */
export function lyFromKm(km) {
  return km / LIGHT_YEAR_KM;
}

/**
 * Seconds light needs to travel `km`.
 * @param {number} km
 */
export function lightSeconds(km) {
  return km / LIGHT_KM_S;
}

/**
 * @typedef {'trai-dat-mat-trang' | 'he-mat-troi' | 'cac-sao' | 'ngan-ha' | 'thien-ha'} Scene
 * @typedef {{ id: string, name: string, km: number, note: string, scene: Scene }} Stop
 */

/** Stops of the journey, nearest first. */
/** @type {Stop[]} */
export const STOPS = [
  {
    id: 'mat-trang',
    name: 'Mặt Trăng',
    km: 384400,
    note: 'vệ tinh tự nhiên của Trái Đất',
    scene: 'trai-dat-mat-trang',
  },
  {
    id: 'mat-troi',
    name: 'Mặt Trời',
    km: 150e6,
    note: 'ngôi sao ở trung tâm Hệ Mặt Trời',
    scene: 'he-mat-troi',
  },
  {
    id: 'hai-vuong',
    name: 'Hải Vương tinh',
    km: 30 * 150e6,
    note: 'hành tinh xa nhất của Hệ Mặt Trời, cách Mặt Trời khoảng 30 AU',
    scene: 'he-mat-troi',
  },
  {
    id: 'can-tinh',
    name: 'Cận Tinh',
    km: kmFromLy(4.24),
    note: 'ngôi sao gần Hệ Mặt Trời nhất',
    scene: 'cac-sao',
  },
  {
    id: 'nguu-lang',
    name: 'Sao Ngưu Lang',
    km: kmFromLy(16.7),
    note: 'ngôi sao sáng trong truyện Ngưu Lang Chức Nữ',
    scene: 'cac-sao',
  },
  {
    id: 'tam-ngan-ha',
    name: 'Tâm Ngân Hà',
    km: kmFromLy(26000),
    note: 'Hệ Mặt Trời quay quanh tâm Ngân Hà',
    scene: 'ngan-ha',
  },
  {
    id: 'be-ngang',
    name: 'Bề ngang Ngân Hà',
    km: kmFromLy(100000),
    note: 'đường kính Ngân Hà, khoảng 100 000 năm ánh sáng',
    scene: 'ngan-ha',
  },
  {
    id: 'tien-nu',
    name: 'Thiên hà Tiên Nữ',
    km: kmFromLy(2.5e6),
    note: 'thiên hà lớn gần Ngân Hà nhất',
    scene: 'thien-ha',
  },
];

/** Journey range, as log10 of km. */
export const LOG_MIN = 5;
export const LOG_MAX = 19.5;

/**
 * Distance in km for a slider position 0 to 1000 (logarithmic).
 * @param {number} pos
 */
export function kmAt(pos) {
  const t = Math.min(1000, Math.max(0, pos)) / 1000;
  return Math.pow(10, LOG_MIN + t * (LOG_MAX - LOG_MIN));
}

/**
 * Slider position for a distance in km, rounded up so that the position
 * reaches the distance (a stop jumped to counts as reached).
 * @param {number} km
 */
export function posOf(km) {
  const t = (Math.log10(km) - LOG_MIN) / (LOG_MAX - LOG_MIN);
  return Math.ceil(Math.min(1, Math.max(0, t)) * 1000 - 1e-9);
}

/**
 * The picture to show at a distance: the farthest stop already reached sets
 * the scene, the Earth–Moon scene before that.
 * @param {number} km
 * @returns {Scene}
 */
export function sceneAt(km) {
  if (km >= kmFromLy(1e6)) return 'thien-ha';
  if (km >= kmFromLy(1000)) return 'ngan-ha';
  if (km >= kmFromLy(0.5)) return 'cac-sao';
  if (km >= 5e6) return 'he-mat-troi';
  return 'trai-dat-mat-trang';
}

/**
 * Stops already reached (within 0,5 % to absorb slider rounding).
 * @param {number} km
 */
export function stopsPassed(km) {
  return STOPS.filter((s) => s.km <= km * 1.005);
}

/** @param {number} km */
export function nextStop(km) {
  return STOPS.find((s) => s.km > km * 1.005) ?? null;
}

/**
 * A distance written for a reader: km, triệu km, tỉ km, then light-years.
 * @param {number} km
 */
export function distanceText(km) {
  if (km < 1e6) return `${fmt(Math.round(km))} km`;
  if (km < 1e9) return `${formatNumber(km / 1e6, 1)} triệu km`;
  if (km < 1e12) return `${formatNumber(km / 1e9, 1)} tỉ km`;
  const ly = lyFromKm(km);
  return ly < 1000 ? `${formatNumber(ly, 2)} năm ánh sáng` : `${fmt(Math.round(ly))} năm ánh sáng`;
}

/**
 * How long light takes, in words: '1,3 giây', '8 phút 20 giây', '4,2 giờ',
 * '12 ngày', '4,24 năm', '26 000 năm'.
 * @param {number} seconds
 */
export function durationText(seconds) {
  if (seconds < 60) return `${formatNumber(seconds, 1)} giây`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds - m * 60);
    return s === 0 ? `${m} phút` : s === 60 ? `${m + 1} phút` : `${m} phút ${s} giây`;
  }
  if (seconds < SECONDS_PER_DAY) return `${formatNumber(seconds / 3600, 1)} giờ`;
  if (seconds < SECONDS_PER_YEAR) return `${fmt(Math.round(seconds / SECONDS_PER_DAY))} ngày`;
  const years = seconds / SECONDS_PER_YEAR;
  return years < 1000 ? `${formatNumber(years, 2)} năm` : `${fmt(Math.round(years))} năm`;
}
