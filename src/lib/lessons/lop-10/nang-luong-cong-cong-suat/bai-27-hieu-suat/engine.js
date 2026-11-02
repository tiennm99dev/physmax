/**
 * The split of supplied energy into useful and wasted parts, and the flow
 * (Sankey) drawing of that split, band widths proportional to the energy.
 */
import { tidy } from '#lib/core/number-format.js';

/**
 * Devices with what they take in, what they are for, what they waste, and a
 * typical efficiency in percent.
 */
export const DEVICES = [
  {
    value: 'xe',
    label: 'Động cơ xe',
    source: 'Hoá năng của xăng',
    useful: 'Cơ năng quay bánh xe',
    waste: 'Nhiệt thoát ra ngoài',
    typical: 30,
  },
  {
    value: 'quat',
    label: 'Quạt điện',
    source: 'Điện năng',
    useful: 'Động năng của gió',
    waste: 'Nhiệt ở động cơ, ma sát',
    typical: 80,
  },
  {
    value: 'bep',
    label: 'Bếp gas',
    source: 'Hoá năng của gas',
    useful: 'Nhiệt vào nồi nước',
    waste: 'Nhiệt ra không khí',
    typical: 40,
  },
];

export const WASTE_MIN = 5;
export const WASTE_MAX = 95;

/**
 * @param {string} value
 */
export const deviceOf = (value) => DEVICES.find((d) => d.value === value) ?? DEVICES[0];

/**
 * Efficiency in percent from useful and total energy (or power).
 * @param {number} useful @param {number} total
 */
export const efficiency = (useful, total) => (total > 0 ? tidy((useful / total) * 100) : 0);

/**
 * Splits a total energy by the wasted percentage.
 * @param {number} total J @param {number} wastePercent
 * @returns {{ useful: number, waste: number, efficiency: number }}
 */
export function split(total, wastePercent) {
  const waste = tidy((total * wastePercent) / 100);
  const useful = tidy(total - waste);
  return { useful, waste, efficiency: efficiency(useful, total) };
}

/** Where the flow drawing sits, in SVG units. */
export const FLOW = { left: 12, split: 130, right: 348, top: 30, band: 110, drop: 62 };

/**
 * Closed path of a band whose edges run from x0 to x1 and ease between heights.
 * @param {number} x0 @param {number} top0 @param {number} bottom0
 * @param {number} x1 @param {number} top1 @param {number} bottom1
 */
export function bandPath(x0, top0, bottom0, x1, top1, bottom1) {
  const mid = (x0 + x1) / 2;
  return [
    `M ${x0} ${top0}`,
    `C ${mid} ${top0} ${mid} ${top1} ${x1} ${top1}`,
    `L ${x1} ${bottom1}`,
    `C ${mid} ${bottom1} ${mid} ${bottom0} ${x0} ${bottom0}`,
    'Z',
  ].join(' ');
}

/**
 * The three bands of the drawing for a wasted percentage: supply on the left,
 * useful energy carrying straight on, waste dropping away below.
 * @param {number} wastePercent
 */
export function flowBands(wastePercent) {
  const { left, split: at, right, top, band, drop } = FLOW;
  const usefulH = band * (1 - wastePercent / 100);
  const seam = top + usefulH;
  const bottom = top + band;
  return {
    seam,
    usefulH,
    wasteH: band - usefulH,
    supply: bandPath(left, top, bottom, at, top, bottom),
    useful: bandPath(at, top, seam, right, top, seam),
    waste: bandPath(at, seam, bottom, right, seam + drop, bottom + drop),
  };
}

/**
 * The wasted percentage for a seam dragged to height `y`, in whole percent.
 * @param {number} y
 */
export function wasteFromSeam(y) {
  const { top, band } = FLOW;
  const useful = ((y - top) / band) * 100;
  return Math.max(WASTE_MIN, Math.min(WASTE_MAX, Math.round(100 - useful)));
}
