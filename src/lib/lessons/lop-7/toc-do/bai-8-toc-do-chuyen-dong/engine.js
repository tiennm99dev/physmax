/**
 * The virtual race: each racer covers its own distance s (m) in its own time
 * t (s). Speed v = s/t says who is faster; ranking by v works even when the
 * racers ran different distances for different times.
 */
import { speed, toKmh } from '../_shared/speed.js';

/** @typedef {{ id: string, name: string, color: string, s: number, t: number }} Racer */
/** @typedef {Racer & { v: number, kmh: number, rank: number }} Ranked */

/** @type {Racer[]} */
export const RACERS = [
  { id: 'an', name: 'An', color: '#2563eb', s: 60, t: 10 },
  { id: 'binh', name: 'Bình', color: '#dc2626', s: 60, t: 12 },
  { id: 'chi', name: 'Chi', color: '#16a34a', s: 100, t: 16 },
  { id: 'dung', name: 'Dũng', color: '#d97706', s: 72, t: 16 },
];

/** Whether two speeds are equal up to rounding noise. */
const same = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-9;

/**
 * Racers with their speed in m/s and km/h, fastest first; equal speeds share
 * a rank (1, 1, 3, …).
 * @param {Racer[]} racers
 * @returns {Ranked[]}
 */
export function rank(racers) {
  const withSpeed = racers.map((r) => {
    const v = speed(r.s, r.t);
    return { ...r, v, kmh: toKmh(v), rank: 0 };
  });
  const sorted = [...withSpeed].sort((a, b) => b.v - a.v);
  sorted.forEach((r, i) => {
    r.rank = i > 0 && same(r.v, sorted[i - 1].v) ? sorted[i - 1].rank : i + 1;
  });
  return sorted;
}

/**
 * How to tell which of two racers is faster, in the book's three cases:
 * same distance (compare times), same time (compare distances), or neither
 * (compare s/t).
 * @param {Racer} a @param {Racer} b
 * @returns {{ rule: 'same-s' | 'same-t' | 'speed', faster: Racer | null }}
 */
export function compare(a, b) {
  const va = speed(a.s, a.t);
  const vb = speed(b.s, b.t);
  const faster = same(va, vb) ? null : va > vb ? a : b;
  if (a.s === b.s) return { rule: 'same-s', faster };
  if (a.t === b.t) return { rule: 'same-t', faster };
  return { rule: 'speed', faster };
}

/**
 * Distance covered `time` seconds after the start: the racer moves at its
 * speed and stops at its own finish line.
 * @param {Racer} r @param {number} time
 */
export function coveredAt(r, time) {
  if (time <= 0) return 0;
  return Math.min(r.s, speed(r.s, r.t) * time);
}
