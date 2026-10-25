/**
 * The on-screen stopwatch and the rolling ball. Times are in milliseconds
 * inside the stopwatch and in seconds everywhere a learner sees them. The
 * stopwatch behaves like a real one: Start resumes counting from whatever it
 * shows, so forgetting Reset adds the previous reading to the next one.
 */

/** @typedef {{ running: boolean, since: number, shown: number }} Stopwatch shown: ms counted before `since` */

/** Smallest division of the stopwatch, in seconds. */
export const DIVISION = 0.01;

/** @type {Stopwatch} */
export const ZERO = { running: false, since: 0, shown: 0 };

/** @param {Stopwatch} sw @param {number} now */
export function start(sw, now) {
  return sw.running ? sw : { running: true, since: now, shown: sw.shown };
}

/** @param {Stopwatch} sw @param {number} now */
export function stop(sw, now) {
  return sw.running ? { running: false, since: now, shown: sw.shown + (now - sw.since) } : sw;
}

/** Reset only works while the stopwatch is stopped, as on a real one. @param {Stopwatch} sw */
export function reset(sw) {
  return sw.running ? sw : ZERO;
}

/** Milliseconds on the display. @param {Stopwatch} sw @param {number} now */
export function elapsed(sw, now) {
  return sw.running ? sw.shown + (now - sw.since) : sw.shown;
}

/**
 * Seconds as the stopwatch shows them: cut (not rounded) to its division.
 * @param {number} ms
 */
export function toDisplay(ms) {
  return Math.floor(Math.max(0, ms) / 10) / 100;
}

/** @typedef {{ id: 'it' | 'nhieu', name: string, time: number }} Slope time: true rolling time in s */

/** @type {Slope[]} */
export const SLOPES = [
  { id: 'it', name: 'Máng nghiêng ít', time: 2.64 },
  { id: 'nhieu', name: 'Máng nghiêng nhiều', time: 1.58 },
];

/**
 * Fraction of the track the ball has rolled `t` seconds after release. It
 * starts from rest and speeds up evenly, so the distance grows as t².
 * @param {number} t @param {number} total
 */
export function rolled(t, total) {
  if (t <= 0) return 0;
  return Math.min(1, (t / total) ** 2);
}

/** @typedef {{ measured: number, resetFirst: boolean }} Trial measured in s */

/**
 * Mean of the trials that started from zero, to the stopwatch division, and
 * each one's difference from it. Null mean when there is no such trial.
 * @param {Trial[]} trials
 */
export function summarise(trials) {
  const good = trials.filter((t) => t.resetFirst);
  if (good.length === 0) return { count: 0, mean: null, spread: null };
  const mean = Math.round((good.reduce((s, t) => s + t.measured, 0) / good.length) * 100) / 100;
  const spread = Math.round(Math.max(...good.map((t) => Math.abs(t.measured - mean))) * 100) / 100;
  return { count: good.length, mean, spread };
}

/**
 * Difference between a reading and a reference, in s, to the division.
 * @param {number} a @param {number} b
 */
export function gap(a, b) {
  return Math.round((a - b) * 100) / 100;
}
