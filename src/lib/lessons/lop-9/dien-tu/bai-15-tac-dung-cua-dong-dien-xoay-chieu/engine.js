/**
 * An electromagnet fed by a direct or an alternating source, with a compass
 * needle or a hanging iron nail in front of its right end. Currents are
 * fractions of the full current, in [−1, 1]; a positive current makes the
 * right end of the coil a north pole.
 */

/** Currents smaller than this count as no current. */
export const DEAD = 0.04;
/** Largest tilt of the compass needle, degrees (clockwise is toward the right). */
export const NEEDLE_MAX = 60;
/** Largest swing of the hanging nail toward the coil, degrees. */
export const NAIL_MAX = 22;

/**
 * Current through the coil at time `t` seconds.
 * @param {{ source: 'mot-chieu' | 'xoay-chieu', closed: boolean, reversed: boolean, freq: number }} s
 * @param {number} t
 */
export function coilCurrent(s, t) {
  if (!s.closed) return 0;
  if (s.source === 'mot-chieu') return s.reversed ? -1 : 1;
  const i = Math.sin(2 * Math.PI * s.freq * t);
  return Math.abs(i) < 1e-9 ? 0 : i;
}

/**
 * The magnetic pole at the coil's right end.
 * @param {number} i
 * @returns {'N' | 'S' | null}
 */
export function endPole(i) {
  if (i > DEAD) return 'N';
  if (i < -DEAD) return 'S';
  return null;
}

/**
 * Where the compass needle is pushed: a north end of the coil pushes the
 * needle's north tip away (to the right), a south end pulls it in.
 * @param {number} i
 */
export function needleTilt(i) {
  return NEEDLE_MAX * Math.max(-1, Math.min(1, i));
}

/**
 * Where the iron nail is pulled: iron is drawn by either pole, so the pull
 * follows the size of the current, never its direction.
 * @param {number} i
 */
export function nailPull(i) {
  return NAIL_MAX * Math.min(1, Math.abs(i));
}

/**
 * The lamp in series glows with the size of the current, whatever its direction.
 * @param {number} i
 */
export function lampGlow(i) {
  return Math.min(1, Math.abs(i));
}

/**
 * How often per second the coil's end changes pole: twice per cycle.
 * @param {number} freq
 */
export function poleChangesPerSecond(freq) {
  return 2 * freq;
}

/**
 * Moves a drawn angle toward its target with a lag (time constant `tau`),
 * as a needle or nail with inertia does.
 * @param {number} shown @param {number} target @param {number} dt @param {number} [tau]
 */
export function follow(shown, target, dt, tau = 0.06) {
  const next = shown + (target - shown) * (1 - Math.exp(-dt / tau));
  return Math.abs(next - target) < 0.05 ? target : next;
}

/**
 * Appends a sample and drops samples older than `span` seconds.
 * @param {Array<{ t: number, i: number }>} trace
 * @param {number} t @param {number} i @param {number} [span]
 */
export function pushSample(trace, t, i, span = 4) {
  const next = [...trace, { t, i }];
  let from = 0;
  while (from < next.length && next[from].t < t - span) from++;
  return from ? next.slice(from) : next;
}

/**
 * What the object in front of the coil does, for the feedback text.
 * @param {{ source: 'mot-chieu' | 'xoay-chieu', closed: boolean }} s
 * @param {'kim' | 'dinh'} object
 * @returns {'yen' | 'lech' | 'rung' | 'hut'}
 */
export function behaviour(s, object) {
  if (!s.closed) return 'yen';
  if (object === 'dinh') return 'hut';
  return s.source === 'mot-chieu' ? 'lech' : 'rung';
}
