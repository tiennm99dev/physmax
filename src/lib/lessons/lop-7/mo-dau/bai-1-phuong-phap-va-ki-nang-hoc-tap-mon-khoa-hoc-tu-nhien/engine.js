/**
 * The virtual photogate experiment: a ball released from rest rolls down a
 * track, passes photogate A and then photogate B, and the digital timer in
 * mode A↔B shows the time between the two passes. Distances are in metres and
 * times in seconds.
 */

/** Distance from the release point to photogate A, in m. */
export const GATE_A = 0.1;

/** Length of the drawn track from the release point, in m. */
export const TRACK = 1.2;

/** @typedef {{ id: 'doc' | 'thoai', name: string, accel: number }} Slope accel in m/s² */

/** @type {Slope[]} */
export const SLOPES = [
  { id: 'doc', name: 'Máng dốc', accel: 0.7 },
  { id: 'thoai', name: 'Máng thoải', accel: 0.0075 },
];

/**
 * The two scales of the timer: the largest time it shows (GHĐ) and its
 * smallest division (ĐCNN).
 * @typedef {{ id: 'nho' | 'lon', label: string, max: number, step: number, digits: number }} Scale
 */

/** @type {Scale[]} */
export const SCALES = [
  { id: 'nho', label: '9,999 s – 0,001 s', max: 9.999, step: 0.001, digits: 3 },
  { id: 'lon', label: '99,99 s – 0,01 s', max: 99.99, step: 0.01, digits: 2 },
];

/**
 * Small differences between runs (how the ball is let go), in s, so repeated
 * runs on the finest scale do not all read the same.
 */
const JITTER = [0.002, -0.001, 0.003, -0.002, 0.001, 0, -0.003];

/**
 * Time after release at which the ball has rolled `x` metres: it starts from
 * rest and speeds up evenly, so x = a·t²/2.
 * @param {number} x @param {number} accel
 */
export function timeAt(x, accel) {
  return Math.sqrt((2 * Math.max(0, x)) / accel);
}

/**
 * Distance rolled `t` seconds after release, capped at the end of the track.
 * @param {number} t @param {number} accel
 */
export function rolledAt(t, accel) {
  if (t <= 0) return 0;
  return Math.min(TRACK, (accel * t * t) / 2);
}

/**
 * True time between gate A and gate B when B stands `d` metres after A.
 * @param {number} d @param {number} accel
 */
export function gateTime(d, accel) {
  return timeAt(GATE_A + d, accel) - timeAt(GATE_A, accel);
}

/**
 * Time measured on run number `run` (0-based): the true time plus that run's
 * small difference.
 * @param {number} d @param {number} accel @param {number} run
 */
export function runTime(d, accel, run) {
  return gateTime(d, accel) + JITTER[((run % JITTER.length) + JITTER.length) % JITTER.length];
}

/**
 * What the timer shows for a time `t` on `scale`: cut to the division, or
 * null when the time is longer than the scale can show.
 * @param {number} t @param {Scale} scale
 */
export function reading(t, scale) {
  if (t > scale.max) return null;
  const units = Math.floor(t / scale.step + 1e-9);
  return Number((units * scale.step).toFixed(scale.digits));
}

/** @typedef {{ distance: number, slope: Slope['id'], scale: Scale['id'], time: number }} Trial distance in cm, time in s */

/**
 * Mean of the trials made with the same set-up, rounded to that scale's
 * division, with how many there were and the largest gap from the mean.
 * @param {Trial[]} trials @param {number} distance @param {Slope['id']} slope @param {Scale} scale
 */
export function summarise(trials, distance, slope, scale) {
  const same = trials.filter(
    (t) => t.distance === distance && t.slope === slope && t.scale === scale.id,
  );
  if (same.length === 0) return { count: 0, mean: null, spread: null };
  const k = 10 ** scale.digits;
  const mean = Math.round((same.reduce((s, t) => s + t.time, 0) / same.length) * k) / k;
  const spread = Math.round(Math.max(...same.map((t) => Math.abs(t.time - mean))) * k) / k;
  return { count: same.length, mean, spread };
}

/**
 * The scale a learner should pick for an estimated time: the finer one when
 * the time fits in it, otherwise the larger one.
 * @param {number} estimate
 */
export function bestScale(estimate) {
  return estimate <= SCALES[0].max ? SCALES[0] : SCALES[1];
}
