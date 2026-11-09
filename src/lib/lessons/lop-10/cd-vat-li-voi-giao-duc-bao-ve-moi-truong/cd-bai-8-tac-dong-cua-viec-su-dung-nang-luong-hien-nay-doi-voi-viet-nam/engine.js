import { roundToTotal, tidy } from '#lib/core/number-format.js';

/**
 * Sources of electricity with their life-cycle CO2 emission per kWh, the
 * median values of the IPCC (2014) review, rounded.
 * @typedef {{ id: string, label: string, factor: number, color: string, renewable: boolean }} Source
 */

/** @type {Source[]} */
export const SOURCES = [
  { id: 'than', label: 'Nhiệt điện than', factor: 820, color: '#475569', renewable: false },
  { id: 'khi', label: 'Nhiệt điện khí', factor: 490, color: '#f59e0b', renewable: false },
  { id: 'thuy', label: 'Thuỷ điện', factor: 24, color: '#0ea5e9', renewable: true },
  { id: 'mat-troi', label: 'Điện mặt trời', factor: 48, color: '#eab308', renewable: true },
  { id: 'gio', label: 'Điện gió', factor: 11, color: '#10b981', renewable: true },
  { id: 'sinh-khoi', label: 'Điện sinh khối', factor: 230, color: '#a16207', renewable: true },
];

/** Electricity produced in a year, in billion kWh (TWh), rounded. */
export const YEARLY_TWH = 280;

/**
 * A rounded mix close to the electricity Viet Nam produced in recent years,
 * in percent, in the order of `SOURCES`.
 */
export const RECENT_MIX = [47, 9, 30, 10, 3, 1];

/** Hydropower cannot grow much: most of the big rivers are already dammed. */
export const HYDRO_CAP = 30;

/**
 * Move one share to `value` percent and scale the others in proportion so
 * the mix still adds up to 100. Shares stay exact (not rounded), so moving
 * one slider step by step never drifts the others; round them only to show
 * them, with `shownShares`.
 * @param {number[]} mix
 * @param {number} index
 * @param {number} value
 * @returns {number[]}
 */
export function setShare(mix, index, value) {
  const v = Math.min(100, Math.max(0, value));
  const otherTotal = mix.reduce((s, m, i) => (i === index ? s : s + m), 0);
  const left = 100 - v;
  const count = mix.length - 1;
  return mix.map((m, i) => {
    if (i === index) return v;
    return otherTotal <= 1e-12 ? left / count : (m * left) / otherTotal;
  });
}

/**
 * Whole percents that add up to 100, for showing a mix.
 * @param {number[]} mix
 */
export function shownShares(mix) {
  return roundToTotal(mix, 100);
}

/**
 * Average emission of the mix, in g CO2 per kWh.
 * @param {number[]} mix percents
 */
export function intensity(mix) {
  return tidy(mix.reduce((s, p, i) => s + (p / 100) * SOURCES[i].factor, 0));
}

/**
 * CO2 emitted in a year, in million tonnes, for `twh` billion kWh.
 * 1 TWh at 1 g/kWh is 1 000 tonnes, so `twh × g/kWh / 1 000` million tonnes.
 * @param {number[]} mix
 * @param {number} [twh]
 */
export function yearlyMt(mix, twh = YEARLY_TWH) {
  return tidy((twh * intensity(mix)) / 1000);
}

/**
 * Share of renewables in the mix, in percent.
 * @param {number[]} mix
 */
export function renewableShare(mix) {
  return mix.reduce((s, p, i) => s + (SOURCES[i].renewable ? p : 0), 0);
}

/**
 * Whether a mix meets the challenge: emissions at most half of the recent
 * mix, with hydropower kept within what the rivers allow.
 * @param {number[]} mix
 */
export function meetsGoal(mix) {
  return yearlyMt(mix) <= yearlyMt(RECENT_MIX) / 2 && shownShares(mix)[2] <= HYDRO_CAP;
}
